import { NavigatorScreenParams } from '@react-navigation/native'
import { ComponentType } from 'react'

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
	isAdmin?: boolean
}

export type TypeRootStackParamList = {
	Auth: undefined
	Help: undefined
	Home: undefined
	Other: undefined
	TimeZone: undefined
	EditProfile: undefined
	Notifications: undefined
	Privacy: undefined
	About: undefined
	Comments: undefined
	CalendarTask: undefined
	Friends: undefined
	Screen404: undefined
	Calendar: undefined
	Settings: undefined
	Memories_settings: undefined
	Profile: undefined
} & TypeRootStackAdminList

export type RootStackParamList = {
	Home: NavigatorScreenParams<TypeRootStackParamList>
	Help: NavigatorScreenParams<TypeRootStackParamList>
	EditProfile: NavigatorScreenParams<TypeRootStackParamList>
	Privacy: NavigatorScreenParams<TypeRootStackParamList>
	Comments: NavigatorScreenParams<TypeRootStackParamList>
	CalendarTask: NavigatorScreenParams<TypeRootStackParamList>
	Friends: NavigatorScreenParams<TypeRootStackParamList>
	Screen404: NavigatorScreenParams<TypeRootStackParamList>
	Calendar: NavigatorScreenParams<TypeRootStackParamList>
	Notifications: NavigatorScreenParams<TypeRootStackParamList>
	Settings: NavigatorScreenParams<TypeRootStackParamList>
	Memories_settings: NavigatorScreenParams<TypeRootStackParamList>
	Profile: NavigatorScreenParams<TypeRootStackParamList>
}

type TypeRootStackAdminList = {
	Admin: undefined
}
