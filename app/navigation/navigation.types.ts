import { ComponentType } from 'react'

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
	isAdmin?: boolean
}

export type TypeRootStackParamList = {
	Auth: undefined
	Home: undefined
	EditProfile: undefined
	Comments: string
	CalendarTask: undefined
	Friends: undefined
	Screen404: undefined
	Calendar: undefined
	Settings:undefined
	Home2: undefined
	Home3: undefined
	Home4: undefined
	Profile: undefined
} & TypeRootStackAdminList

type TypeRootStackAdminList = {
	Admin: undefined
}
