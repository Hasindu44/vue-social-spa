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