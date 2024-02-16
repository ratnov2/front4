import Home from '@/components/screens/home/Home'
import { IRoute } from './navigation.types'
import Screen404 from '@/components/screens/system/Screen404'
import Profile from '@/components/screens/profile/Profile'
import { Calendar } from '@/components/screens/calendar/Calendar'
import { CalendarTask } from '@/components/screens/calendarTask/CalendarTask'
import { EditProfile } from '@/components/screens/edit-profile/EditProfile'
import { Friends } from '@/components/screens/friends/Friends'
import { Comments } from '@/components/screens/comments/Comments'
import { Settings } from '@/components/screens/settings/Settings'
import { Memories } from '@/components/screens/settings/pages/memories/Memories'
import { Notifications } from '@/components/screens/settings/pages/notifications/Notifications'
import { Privacy } from '@/components/screens/settings/pages/privacy/Privacy'
import { TimeZone } from '@/components/screens/settings/pages/time-zone/TimeZone'
import { Other } from '@/components/screens/settings/pages/other/Other'
import { Help } from '@/components/screens/settings/pages/help/Help'
import { About } from '@/components/screens/settings/pages/About/About'

export const userRoutes: IRoute[] = [
	{
		name: 'Privacy',
		component: Privacy
	},
	{
		name: 'Notifications',
		component: Notifications
	},
	{
		name: 'About',
		component: About
	},
	{
		name: 'Other',
		component: Other
	},
	{
		name: 'Help',
		component: Help
	},
	{
		name: 'Memories_settings',
		component: Memories
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
		name: 'Settings',
		component: Settings
	},
	{
		name: 'TimeZone',
		component: TimeZone
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
