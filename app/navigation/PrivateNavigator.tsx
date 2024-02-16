import { useAuth } from '@/hooks/useAuth'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'
import { TypeRootStackParamList } from './navigation.types'
import { routes } from './user.routes'
import Auth from '@/components/screens/auth/Auth'
import { Settings } from '@/components/screens/settings/Settings'
import Home from '@/components/screens/home/Home'
import { Friends } from '@/components/screens/friends/Friends'
import Profile from '@/components/screens/profile/Profile'
import { EditProfile } from '@/components/screens/edit-profile/EditProfile'
import { Memories } from '@/components/screens/settings/pages/memories/Memories'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigator: FC = () => {
	const { user } = useAuth()
	function Root() {
		return (
			<Stack.Navigator>
				{/* <Stack.Screen name="Profile" component={Profile} /> */}
				<Stack.Screen name='Settings' component={Settings} />
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='Friends' component={Friends} />
				<Stack.Screen name='Profile' component={Profile} />
				<Stack.Screen name='EditProfile' component={EditProfile} />
				<Stack.Screen name='Memories_settings' component={Memories} />
				{/* <Stack.Screen name='Settings' component={Settings} />
				<Stack.Screen name='Settings' component={Settings} />
				<Stack.Screen name='Settings' component={Settings} /> */}
			</Stack.Navigator>
		)
	}
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: '#111111'
				}
			}}
		>
			{user ? (
				routes.map(route => <Stack.Screen key={route.name} {...route} />)
			) : (
				<Stack.Screen name='Auth' component={Auth} />
				// <Stack.Screen key='Screen404' name='Screen404' component={Screen404} />
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator
