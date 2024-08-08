type TypeCourse =
  | 'misionalidad'
  | 'innovación y emprendimiento'
  | 'educación digital'
  | 'investigación';

export interface Course {
  id: string;
  assessmentCriteria: string;
  authorTeacher: string;
  introduction: string;
  learningOutcomes: string;
  methodology: string;
  typeCourse: TypeCourse;
  title: string;
  units: Unit;
  welcomeVideo: string; // check to download form other site or from backend
}

export interface CourseCard {
  id: string;
  title: string;
  introduction: string;
}

export interface Unit {
  activity: string;
  contents: string;
  headerName: string;
  test: string;
  title: string;
  unitObjective: string;
  video: string; // check to download from other site or from backend
}
