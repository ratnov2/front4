import Home from '@/components/screens/home/Home'
import { IRoute } from './navigation.types'
import Auth from '@/components/screens/auth/Auth'
import Screen404 from '@/components/screens/system/Screen404'

export const userRoutes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Auth',
		component: Auth
	},
	{
		name: 'Screen404',
		component: Screen404
	}
]
