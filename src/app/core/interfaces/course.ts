export interface Course {
  assessmentCriteria: string;
  authorTeacher: string;
  introduction: string;
  learningOutcomes: string;
  methodology: string;
  title: string;
  units: Unit;
  welcomeVideo: string; // check to download form other site or from backend
}

export interface Unit {
  activity: string;
  contents: string;
  headerName: string;
  test: string;
  title: string;
  unitObjective: string;
  video: string; // check to download form other site or from backend
}
