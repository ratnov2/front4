import Home from '@/components/screens/home/Home'
import { IRoute } from './navigation.types'
import Auth from '@/components/screens/auth/Auth'
import Screen404 from '@/components/screens/system/Screen404'
import Profile from '@/components/screens/profile/Profile'
import { Calendar } from '@/components/screens/calendar/Calendar'
import { CalendarTask } from '@/components/screens/calendarTask/CalendarTask'

export const userRoutes: IRoute[] = [
	{
		name: 'CalendarTask',
		component: CalendarTask
	},
	{
		name: 'Calendar',
		component: Calendar
	},

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
