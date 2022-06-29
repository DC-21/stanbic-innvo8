export interface User {
  status: string;
  resetPasswordToken: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  userType: string;
  gender: string;
  branch: string;
  createdAt: Date;
  isActive: boolean;
  updatedAt: Date;
  __v: number;
  password: string;
}
