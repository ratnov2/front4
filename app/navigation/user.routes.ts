import Home from '@/components/screens/home/Home'
import { IRoute } from './navigation.types'
import Auth from '@/components/screens/auth/Auth'
import Screen404 from '@/components/screens/system/Screen404'
import Profile from '@/components/screens/profile/Profile'

export const userRoutes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Profile',
		component: Profile
	},
	{
		name: 'Screen404',
		component: Screen404
	}
]

export const routes = [...userRoutes]
