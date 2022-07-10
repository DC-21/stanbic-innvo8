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

export interface Teams {
  _id: string;
  name: string;
  description: string;
  leadId: User;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Application {
  _id: string;
  title: string;
  category: string;
  problem: string;
  proposedSolution: string;
  status: string;
  teamId: Teams;
  votes: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
