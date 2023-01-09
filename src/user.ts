export interface UserD {
  firstName: string
  lastName: string
  age: number
  isValid: boolean
}

export function getFullName(user: UserD) {
  return `${user.firstName} ${user.lastName}`
}