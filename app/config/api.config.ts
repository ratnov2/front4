export const SERVER_URL = process.env.REACT_APP_SERVER_URL
//export const API_URL = `${process.env.REACT_APP_SERVER_URL}/api`

//http://localhost:4200
export const API_URL = 'http://localhost:4200/api'
export const getAuthUrl = (string: string) => `/auth${string}`
export const getUsersUrl = (string: string) => `/users${string}`
export const getFilesUrl = (string: string) => `/files${string}`
