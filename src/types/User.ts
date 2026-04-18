export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
  company: {
    title: string
  }
}

export interface UserResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
  company: {
    department: string;
    title: string;
  };
  address: {
    city: string;
  };
}