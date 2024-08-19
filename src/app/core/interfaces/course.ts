import { Teacher } from './teachers';

type TypeCourse =
  | 'misionalidad'
  | 'innovación y emprendimiento'
  | 'educación digital'
  | 'investigación';

export interface Course {
  id: string;
  assessmentCriteria: string;
  authorTeacher: string[];
  introduction: string;
  learningOutcomes: string;
  methodology: string;
  typeCourse: TypeCourse;
  title: string;
  units: Unit[];
  welcomeVideo: string;
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
  id: string;
  test: string;
  title: string;
  unitObjective: string;
  video: string; // check to download from other site or from backend
}

export interface CourseUnitTab {
  id: string;
  headerName: string;
}

// Inicio
export interface CourseStartPage {
  title: string;
  teachers: Teacher[];
  idCourse: string;
  assessmentCriteria: string;
  authorTeacher: string[];
  introduction: string;
  learningOutcomes: string;
  methodology: string;
  welcomeVideo: string;
}
// Units
/* export interface CourseUnitPage {
  idCourse: string;
  idUnit: string;
  activity: string;
  contents: string;
  headerName: string;
  test: string; // url
  title: string;
  unitObjective: string;
  video: string;
}
 */
