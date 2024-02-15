import Home from '@/components/screens/home/Home'
import { IRoute } from './navigation.types'
import Auth from '@/components/screens/auth/Auth'
import Screen404 from '@/components/screens/system/Screen404'
import Profile from '@/components/screens/profile/Profile'
import { Calendar } from '@/components/screens/calendar/Calendar'
import { CalendarTask } from '@/components/screens/calendarTask/CalendarTask'
import { EditProfile } from '@/components/screens/edit-profile/EditProfile'
import { Friends } from '@/components/screens/friends/Friends'
import { Comments } from '@/components/screens/comments/Comments'
import { Settings } from '@/components/screens/settings/Settings'

export const userRoutes: IRoute[] = [
	{
		name: 'Settings',
		component: Settings
	},
	{
		name: 'Friends',
		component: Friends
	},
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
		name: 'EditProfile',
		component: EditProfile
	},
	{
		name: 'Profile',
		component: Profile
	},
	{
		name: 'Comments',
		component: Comments
	},
	{
		name: 'Screen404',
		component: Screen404
	}
]

export const routes = [...userRoutes]
