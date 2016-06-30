/** @file Component wrapping embedded Piskel editor */
// PISKEL_DEVELOPMENT_MODE is a build flag.  See Gruntfile.js for how to enable it.
/* global PISKEL_DEVELOPMENT_MODE */
import React from 'react';
import {connect} from 'react-redux';
import PiskelApi from '@code-dot-org/piskel';
import {editAnimation} from '../animationListModule';

/**
 * @const {string} domain-relative URL to Piskel index.html
 * In special environment builds, append ?debug flag to get Piskel to load its own debug mode.
 */
const PISKEL_PATH = '/blockly/js/piskel/index.html' +
    (PISKEL_DEVELOPMENT_MODE ? '?debug' : '');

/**
 * The PiskelEditor component is a wrapper for the iframe that contains the
 * embedded Piskel image editor, within the animation tab.  It handles rendering
 * (and never re-rendering!) that iframe, and sending state updates to the
 * iframe.
 */
const PiskelEditor = React.createClass({
  propTypes: {
    // Provided manually
    style: React.PropTypes.object,
    // Provided by Redux
    animationList: React.PropTypes.object.isRequired, // TODO: Shape?
    selectedAnimation: React.PropTypes.string,
    channelId: React.PropTypes.string.isRequired,
    editAnimation: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    /** @private {boolean} Tracks whether Piskel can receive API messages yet. */
    this.isPiskelReady_ = false;

    /** @private {boolean} Track whether we're mid-load so we don't fire save
     *          events during load. */
    this.isLoadingAnimation_ = false;

    /** @private {AnimationKey} reference to animation that is currently loaded
     *          in the editor. */
    this.loadedAnimation_ = null;

    this.piskel = new PiskelApi();
    this.piskel.attachToPiskel(this.iframe);
    this.piskel.onPiskelReady(this.onPiskelReady);
    this.piskel.onStateSaved(this.onAnimationSaved);
  },

  componentWillUnmount() {
    this.piskel.detachFromPiskel();
    this.piskel = undefined;
  },

  componentWillReceiveProps(newProps) {
    if (newProps.selectedAnimation !== this.props.selectedAnimation) {
      this.loadSelectedAnimation_(newProps);
    }
  },

  loadSelectedAnimation_(props) {
    const key = props.selectedAnimation;
    if (!this.isPiskelReady_) {
      return;
    }

    if (key === this.loadedAnimation_) {
      // I wonder if this is ever valid - like we want to load some external edit?
      return;
    }

    if (!key) {
      // TODO: Put Piskel into a 'nothing-selected' state?
      return;
    }

    if (this.isLoadingAnimation_) {
      return;
    }

    const animationProps = props.animationList.propsByKey[key];
    if (!animationProps) {
      throw new Error('No props present for animation with key ' + key);
    }

    this.isLoadingAnimation_ = true;
    this.piskel.loadSpritesheet(
        animationProps.dataURI,
        animationProps.frameSize.x,
        animationProps.frameSize.y,
        animationProps.frameRate,
        () => {
          this.loadedAnimation_ = key;
          this.isLoadingAnimation_ = false;

          // If the selected animation changed out from under us, load again.
          if (this.props.selectedAnimation !== key) {
            this.loadSelectedAnimation_(this.props);
          }
        });
  },

  // We are hosting an embedded application in an iframe; we should never try
  // to re-render it.
  shouldComponentUpdate() {
    return false;
  },

  onPiskelReady() {
    this.isPiskelReady_ = true;
    this.loadSelectedAnimation_(this.props);
  },

  onAnimationSaved(message) {
    if (this.isLoadingAnimation_) {
      return;
    }
    this.props.editAnimation(this.loadedAnimation_, {
      blob: message.blob,
      dataURI: message.dataURI,
      sourceSize: {x: message.sourceSizeX, y: message.sourceSizeY},
      frameSize: {x: message.frameSizeX, y: message.frameSizeY},
      frameCount: message.frameCount,
      frameRate: message.frameRate
    });
  },

  render() {
    return (
      <iframe
        ref={iframe => this.iframe = iframe}
        style={this.props.style}
        src={PISKEL_PATH}
      />
    );
  }
});
export default connect(state => ({
  selectedAnimation: state.animationTab.selectedAnimation,
  animationList: state.animationList,
  channelId: state.pageConstants.channelId
}), dispatch => ({
  editAnimation: (key, props) => dispatch(editAnimation(key, props))
}))(PiskelEditor);
