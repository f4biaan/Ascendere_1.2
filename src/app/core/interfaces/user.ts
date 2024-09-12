type userRol = 'estudiante' | 'tutor';

export interface User {
  id?: string;
  mail: string;
  givenName: string;
  surname: string;
  displayName: string;
  photo_url?: string;
  role: userRol;
  lastEntry?: string;

  dailyGoal?: number; // * minutes // This property is for the daily goal of the user plan
}
