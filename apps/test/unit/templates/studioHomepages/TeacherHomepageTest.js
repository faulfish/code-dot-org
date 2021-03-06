import React from 'react';
import { assert, expect } from 'chai';
import { mount } from 'enzyme';
import TeacherHomepage from '@cdo/apps/templates/studioHomepages/TeacherHomepage';

const announcements = [
  {
    heading: "Go beyond an Hour of Code",
    buttonText: "Go Beyond",
    description: "Go Beyond an Hour of Code and explore computer science concepts with your students every week. Code.org offers curriculum, lesson plans, high quality professional learning programs, and tons of great tools for all grade levels - and it's free. No experience required - find the next step that's right for your classroom.",
    link: "http://teacherblog.code.org/post/160703303174/coming-soon-access-your-top-resources-with-the"
  },
  {
    heading: "Check out your new teacher homepage",
    buttonText: "Learn More",
    description: "A redesign is underway so you have better access to your top tools and resources. Your sections, courses and links are all readily accessible. Also, there's more teal than ever!",
    link: "http://teacherblog.code.org/post/160703303174/coming-soon-access-your-top-resources-with-the"
  }
];

const sections = [
  {
    name: "Period 1",
    teacherName: "Ms. Frizzle",
    linkToProgress: "https://code.org/teacher-dashboard#/sections/111111/progress",
    assignedTitle: "Course 1",
    linkToAssigned: "https://studio.code.org/s/course1",
    numberOfStudents: 1,
    linkToStudents: "https://code.org/teacher-dashboard#/sections/111111/manage",
    sectionCode: "ABCDEF"
  },
  {
    name: "Period 2",
    teacherName: "Ms. Frizzle",
    linkToProgress: "https://code.org/teacher-dashboard#/sections/222222/progress",
    assignedTitle: "Course 2",
    linkToAssigned: "https://studio.code.org/s/course2",
    numberOfStudents: 2,
    linkToStudents: "https://code.org/teacher-dashboard#/sections/222222/manage",
    sectionCode: "EEBSKR"
  },
];

const courses = [
  {
    name: "Course 1",
    description: "Start with Course 1 for early readers. Students will create computer programs that will help them learn to collaborate with others, develop problem-solving skills, and persist through difficult tasks. By the end of this course, students create their very own custom game or story that they can share. Recommended for grades K-1.",
    link: "https://studio.code.org/s/course1",
  },
  {
    name: "Course 2",
    description: "Start with Course 2 for students who can read and have no prior programming experience. In this course students will create programs to solve problems and develop interactive games or stories they can share. Recommended for grades 2-5.",
    link: "https://studio.code.org/s/course2",
  },
];

const moreCourses = [
  {
    name: "Course 1",
    description: "Start with Course 1 for early readers. Students will create computer programs that will help them learn to collaborate with others, develop problem-solving skills, and persist through difficult tasks. By the end of this course, students create their very own custom game or story that they can share. Recommended for grades K-1.",
    link: "https://studio.code.org/s/course1",
  },
  {
    name: "Course 2",
    description: "Start with Course 2 for students who can read and have no prior programming experience. In this course students will create programs to solve problems and develop interactive games or stories they can share. Recommended for grades 2-5.",
    link: "https://studio.code.org/s/course2",
  },
  {
    name: "Course 3",
    description: "Start with Course 3 for early readers. Students will create computer programs that will help them learn to collaborate with others, develop problem-solving skills, and persist through difficult tasks. By the end of this course, students create their very own custom game or story that they can share. Recommended for grades K-1.",
    link: "https://studio.code.org/s/course3",
  },
  {
    name: "Course 4",
    description: "Start with Course 4 for students who can read and have no prior programming experience. In this course students will create programs to solve problems and develop interactive games or stories they can share. Recommended for grades 2-5.",
    link: "https://studio.code.org/s/course4",
  },
  {
    name: "Course 5",
    description: "Start with Course 5 for early readers. Students will create computer programs that will help them learn to collaborate with others, develop problem-solving skills, and persist through difficult tasks. By the end of this course, students create their very own custom game or story that they can share. Recommended for grades K-1.",
    link: "https://studio.code.org/s/course5",
  },
  {
    name: "Course 6",
    description: "Start with Course 6 for students who can read and have no prior programming experience. In this course students will create programs to solve problems and develop interactive games or stories they can share. Recommended for grades 2-5.",
    link: "https://studio.code.org/s/course6",
  },
];

describe('TeacherHomepage', () => {

  it('shows a non-extended Header Banner that says Home', () => {
    const wrapper = mount(
      <TeacherHomepage
        announcements={[]}
        courses={[]}
        sections={[]}
        codeOrgUrlPrefix="http://localhost:3000/"
        isRtl={false}
      />
    );
    const headerBanner = wrapper.childAt(0);
    assert.equal(headerBanner.name(),'HeaderBanner');
    assert.equal(headerBanner.props().headingText, 'Home');
    assert.equal(headerBanner.props().extended, false);
  });

  it('references ProtectedStatefulDiv for the terms reminder', () => {
    const wrapper = mount(
      <TeacherHomepage
        announcements={[]}
        courses={[]}
        sections={[]}
        codeOrgUrlPrefix="http://localhost:3000/"
        isRtl={false}
      />
    );
    const termsReminderRef = wrapper.childAt(1);
    assert.equal(termsReminderRef.name(),'ProtectedStatefulDiv');
  });

  it('shows one announcement', () => {
    const wrapper = mount(
      <TeacherHomepage
        announcements={[announcements[0]]}
        courses={[]}
        sections={[]}
        codeOrgUrlPrefix="http://localhost:3000/"
        isRtl={false}
      />
    );
    const announcementsContainer = wrapper.childAt(3).childAt(0);
    assert.equal(announcementsContainer.name(), 'Notification');
    // Check if Announcements receives correct props.
    const announcement = announcementsContainer.props();
    assert.equal(announcement.notice, announcements[0].heading);
    assert.equal(announcement.buttonText, announcements[0].buttonText);
    assert.equal(announcement.details, announcements[0].description);
    assert.equal(announcement.buttonLink, announcements[0].link);
  });

  it('if there are sections, Sections component shows a SectionsTable', () => {
    const wrapper = mount(
      <TeacherHomepage
        announcements={[]}
        courses={[]}
        sections={sections}
        codeOrgUrlPrefix="http://localhost:3000/"
        isRtl={false}
      />
    );
    // Check if Sections receives correct props.
    const sectionsContainer = wrapper.childAt(3);
    assert.equal(sectionsContainer.name(),'Sections');
    assert.equal(sectionsContainer.props().sections.length, 2);
    const section1 = sectionsContainer.props().sections[0];
    assert.equal(section1.name, sections[0].name);
    assert.equal(section1.linkToProgress, sections[0].linkToProgress);
    assert.equal(section1.assignedTitle, sections[0].assignedTitle);
    assert.equal(section1.linkToAssigned, sections[0].linkToAssigned);
    assert.equal(section1.numberOfStudents, 1);
    assert.equal(section1.linkToStudents, sections[0].linkToStudents);
    assert.equal(section1.sectionCode, sections[0].sectionCode);
    const section2 = sectionsContainer.props().sections[1];
    assert.equal(section2.name, sections[1].name);
    assert.equal(section2.linkToProgress, sections[1].linkToProgress);
    assert.equal(section2.assignedTitle, sections[1].assignedTitle);
    assert.equal(section2.linkToAssigned, sections[1].linkToAssigned);
    assert.equal(section2.numberOfStudents, 2);
    assert.equal(section2.linkToStudents, sections[1].linkToStudents);
    assert.equal(section2.sectionCode, sections[1].sectionCode);
    // Check if a ContentContainer is rendered.
    const sectionsContentContainer = sectionsContainer.childAt(0);
    assert.equal(sectionsContentContainer.name(), 'ContentContainer');
    assert.equal(sectionsContentContainer.props().heading, 'Classroom Sections');
    assert.equal(sectionsContentContainer.props().linkText, 'Manage sections');
    assert.equal(sectionsContentContainer.props().link, 'http://localhost:3000//teacher-dashboard#/sections');
    assert.equal(sectionsContentContainer.props().showLink, true);
    // Check if a SectionsTable is rendered.
    const sectionsTable = sectionsContentContainer.childAt(1).childAt(0);
    assert.equal(sectionsTable.name(), 'SectionsTable');
    assert.equal(sectionsTable.childAt(0).name(), 'thead');
    const column1 = sectionsTable.childAt(0).childAt(0).childAt(0);
    assert.equal(column1.text(), 'Section Name');
    const column2 = sectionsTable.childAt(0).childAt(0).childAt(1);
    assert.equal(column2.text(), 'Course');
    const column3 = sectionsTable.childAt(0).childAt(0).childAt(2);
    assert.equal(column3.text(), 'Students');
    const column4 = sectionsTable.childAt(0).childAt(0).childAt(3);
    assert.equal(column4.text(), 'Section Code');
    assert.equal(sectionsTable.childAt(1).name(), 'tbody');
    // Check if a row in the SectionTable is rendered for each section.
    const row1 = sectionsTable.childAt(1).childAt(0);
    assert.equal(row1.childAt(0).text(), sections[0].name);
    assert.equal(row1.childAt(1).text(), sections[0].assignedTitle);
    assert.equal(row1.childAt(2).text(), sections[0].numberOfStudents);
    assert.equal(row1.childAt(3).text(), sections[0].sectionCode);
    const row2 = sectionsTable.childAt(1).childAt(1);
    assert.equal(row2.childAt(0).text(), sections[1].name);
    assert.equal(row2.childAt(1).text(), sections[1].assignedTitle);
    assert.equal(row2.childAt(2).text(), sections[1].numberOfStudents);
    assert.equal(row2.childAt(3).text(), sections[1].sectionCode);
  });

  it('if there are no sections, Sections component shows SetUpMessage', () => {
    const wrapper = mount(
      <TeacherHomepage
        announcements={[]}
        courses={[]}
        sections={[]}
        codeOrgUrlPrefix="http://localhost:3000/"
        isRtl={false}
      />
    );
    // Check if Sections receives correct props.
    const sectionsContainer = wrapper.childAt(3);
    assert.equal(sectionsContainer.name(),'Sections');
    assert.equal(sectionsContainer.props().sections.length, 0);
    // Check if a ContentContainer is rendered.
    const sectionsContentContainer = sectionsContainer.childAt(0);
    assert.equal(sectionsContentContainer.name(), 'ContentContainer');
    assert.equal(sectionsContentContainer.props().heading, 'Classroom Sections');
    assert.equal(sectionsContentContainer.props().linkText, 'Manage sections');
    assert.equal(sectionsContentContainer.props().link, 'http://localhost:3000//teacher-dashboard#/sections');
    assert.equal(sectionsContentContainer.props().showLink, true);
    // Check if a sections SetUpMessage is rendered.
    const sectionsSetUpMessage = sectionsContentContainer.childAt(2).childAt(0);
    assert.equal(sectionsSetUpMessage.name(), 'SetUpMessage');
    assert.equal(sectionsSetUpMessage.props().type, 'sections');
    assert.equal(sectionsSetUpMessage.childAt(0).text(), 'Set up your classroom');
    assert.equal(sectionsSetUpMessage.childAt(1).text(), 'Create a new classroom section to start assigning courses and seeing your student progress.');
    assert.equal(sectionsSetUpMessage.childAt(2).name(), 'ProgressButton');
    assert.equal(sectionsSetUpMessage.childAt(2).props().href, 'http://localhost:3000//teacher-dashboard#/sections');
    assert.equal(sectionsSetUpMessage.childAt(2).props().text, 'Create section');
  });

  it('if there are less than 4 courses, RecentCourses component shows CourseCards for each course', () => {
    const wrapper = mount(
      <TeacherHomepage
        announcements={[]}
        courses={courses}
        sections={[]}
        codeOrgUrlPrefix="http://localhost:3000/"
        isRtl={false}
      />
    );
    const recentCourses = wrapper.childAt(4);
    assert.equal(recentCourses.name(),'RecentCourses');
    assert.equal(recentCourses.props().showAllCoursesLink, true);
    assert.equal(recentCourses.props().heading, 'Recent Courses');
    assert.equal(recentCourses.props().isTeacher, true);
    assert.equal(recentCourses.props().courses.length, 2);
    // Check if RecentCourses receives correct props.
    const course1 = recentCourses.props().courses[0];
    assert.equal(course1.name, courses[0].name);
    assert.equal(course1.description, courses[0].description);
    assert.equal(course1.link, courses[0].link);
    const course2 = recentCourses.props().courses[1];
    assert.equal(course2.name, courses[1].name);
    assert.equal(course2.description, courses[1].description);
    assert.equal(course2.link, courses[1].link);
    // Check if a ContentContainer is rendered.
    const coursesContentContainer = recentCourses.childAt(0);
    assert.equal(coursesContentContainer.name(), 'ContentContainer');
    assert.equal(coursesContentContainer.props().heading, 'Recent Courses');
    assert.equal(coursesContentContainer.props().linkText, 'Find a course');
    assert.equal(coursesContentContainer.props().link, '/courses');
    assert.equal(coursesContentContainer.props().showLink, true);
    // Check if a CourseCards are rendered for each course.
    const course1Card = coursesContentContainer.childAt(2).childAt(0).childAt(0);
    assert.equal(course1Card.name(), 'CourseCard');
    assert.equal(course1Card.childAt(0).type(), 'img');
    assert.equal(course1Card.childAt(1).text(), courses[0].name);
    expect(course1Card.childAt(2).text()).to.contain(courses[0].description);
    expect(course1Card.childAt(2).text()).to.contain('View course');
    const course2Card = coursesContentContainer.childAt(3).childAt(0).childAt(0);
    assert.equal(course2Card.name(), 'CourseCard');
    assert.equal(course2Card.childAt(1).text(), courses[1].name);
    expect(course2Card.childAt(2).text()).to.contain(courses[1].description);
    expect(course2Card.childAt(2).text()).to.contain('View course');
  });

  it('if there are more than 4 courses, RecentCourses component shows CourseCards for the first 4 and a SeeMoreCourses component', () => {
    const wrapper = mount(
      <TeacherHomepage
        announcements={[]}
        courses={moreCourses}
        sections={[]}
        codeOrgUrlPrefix="http://localhost:3000/"
        isRtl={false}
      />
    );
    const recentCourses = wrapper.childAt(4);
    assert.equal(recentCourses.name(),'RecentCourses');
    assert.equal(recentCourses.props().showAllCoursesLink, true);
    assert.equal(recentCourses.props().heading, 'Recent Courses');
    assert.equal(recentCourses.props().isTeacher, true);
    assert.equal(recentCourses.props().courses.length, 6);
    // Check if RecentCourses receives correct props.
    const course1 = recentCourses.props().courses[0];
    assert.equal(course1.name, moreCourses[0].name);
    assert.equal(course1.description, moreCourses[0].description);
    assert.equal(course1.link, moreCourses[0].link);
    const course2 = recentCourses.props().courses[1];
    assert.equal(course2.name, moreCourses[1].name);
    assert.equal(course2.description, moreCourses[1].description);
    assert.equal(course2.link, moreCourses[1].link);
    const course3 = recentCourses.props().courses[2];
    assert.equal(course3.name, moreCourses[2].name);
    assert.equal(course3.description, moreCourses[2].description);
    assert.equal(course3.link, moreCourses[2].link);
    const course4 = recentCourses.props().courses[3];
    assert.equal(course4.name, moreCourses[3].name);
    assert.equal(course4.description, moreCourses[3].description);
    assert.equal(course4.link, moreCourses[3].link);
    const course5 = recentCourses.props().courses[4];
    assert.equal(course5.name, moreCourses[4].name);
    assert.equal(course5.description, moreCourses[4].description);
    assert.equal(course5.link, moreCourses[4].link);
    const course6 = recentCourses.props().courses[5];
    assert.equal(course6.name, moreCourses[5].name);
    assert.equal(course6.description, moreCourses[5].description);
    assert.equal(course6.link, moreCourses[5].link);
    // Check if a ContentContainer is rendered.
    const coursesContentContainer = recentCourses.childAt(0);
    assert.equal(coursesContentContainer.name(), 'ContentContainer');
    assert.equal(coursesContentContainer.props().heading, 'Recent Courses');
    assert.equal(coursesContentContainer.props().linkText, 'Find a course');
    assert.equal(coursesContentContainer.props().link, '/courses');
    assert.equal(coursesContentContainer.props().showLink, true);
    // Check if a CourseCards are rendered for first 4 courses.
    const course1Card = coursesContentContainer.childAt(2).childAt(0).childAt(0);
    assert.equal(course1Card.name(), 'CourseCard');
    assert.equal(course1Card.childAt(0).type(), 'img');
    assert.equal(course1Card.childAt(1).text(), moreCourses[0].name);
    expect(course1Card.childAt(2).text()).to.contain(moreCourses[0].description);
    expect(course1Card.childAt(2).text()).to.contain('View course');
    const course2Card = coursesContentContainer.childAt(3).childAt(0).childAt(0);
    assert.equal(course2Card.name(), 'CourseCard');
    assert.equal(course2Card.childAt(1).text(), moreCourses[1].name);
    expect(course2Card.childAt(2).text()).to.contain(moreCourses[1].description);
    expect(course2Card.childAt(2).text()).to.contain('View course');
    const course3Card = coursesContentContainer.childAt(4).childAt(0).childAt(0);
    assert.equal(course3Card.childAt(1).text(), moreCourses[2].name);
    expect(course3Card.childAt(2).text()).to.contain(moreCourses[2].description);
    const course4Card = coursesContentContainer.childAt(5).childAt(0).childAt(0);
    assert.equal(course4Card.childAt(1).text(), moreCourses[3].name);
    expect(course4Card.childAt(2).text()).to.contain(moreCourses[3].description);
    // Check if SeeMoreCourses is rendered.
    const seeMoreCourses = coursesContentContainer.childAt(6).childAt(0);
    assert.equal(seeMoreCourses.name(), 'SeeMoreCourses');
    const viewMoreButton = seeMoreCourses.childAt(0);
    assert.equal(viewMoreButton.name(), 'ProgressButton');
    assert.equal(viewMoreButton.props().text, 'View more');
  });

  it('if there are no courses, RecentCourses component shows a SetUpMessage', () => {
    const wrapper = mount(
      <TeacherHomepage
        announcements={[]}
        courses={[]}
        sections={[]}
        codeOrgUrlPrefix="http://localhost:3000/"
        isRtl={false}
      />
    );
    const recentCourses = wrapper.childAt(4);
    assert.equal(recentCourses.name(),'RecentCourses');
    assert.equal(recentCourses.props().showAllCoursesLink, true);
    assert.equal(recentCourses.props().heading, 'Recent Courses');
    assert.equal(recentCourses.props().isTeacher, true);
    assert.equal(recentCourses.props().courses.length, 0);
    // Check if a ContentContainer is rendered.
    const coursesContentContainer = recentCourses.childAt(0);
    assert.equal(coursesContentContainer.name(), 'ContentContainer');
    assert.equal(coursesContentContainer.props().heading, 'Recent Courses');
    assert.equal(coursesContentContainer.props().linkText, 'Find a course');
    assert.equal(coursesContentContainer.props().link, '/courses');
    assert.equal(coursesContentContainer.props().showLink, true);
    // Check if a courses SetUpMessage is rendered.
    const coursesSetUpMessage = coursesContentContainer.childAt(5).childAt(0);
    assert.equal(coursesSetUpMessage.name(), 'SetUpMessage');
    assert.equal(coursesSetUpMessage.props().type, 'courses');
    assert.equal(coursesSetUpMessage.childAt(0).text(), 'Start learning');
    assert.equal(coursesSetUpMessage.childAt(1).text(), 'Assign a course to your classroom or start your own course.');
    assert.equal(coursesSetUpMessage.childAt(2).name(), 'ProgressButton');
    assert.equal(coursesSetUpMessage.childAt(2).props().href, '/courses');
    assert.equal(coursesSetUpMessage.childAt(2).props().text, 'Find a course');
  });
});
