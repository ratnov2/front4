import { ComponentType } from 'react'

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
	isAdmin?: boolean
}

export type TypeRootStackParamList = {
	Auth: undefined
	Home: undefined
	Screen404: undefined
	Home2: undefined
	Home3: undefined
	Home4: undefined
	Home5: undefined
} & TypeRootStackAdminList

type TypeRootStackAdminList = {
	Admin: undefined
}
