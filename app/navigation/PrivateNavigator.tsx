import { useAuth } from '@/hooks/useAuth'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'
import { View, Text } from 'react-native'
import { TypeRootStackParamList } from './navigation.types'
import { routes, userRoutes } from './user.routes'
import Screen404 from '@/components/screens/system/Screen404'
import Auth from '@/components/screens/auth/Auth'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const PrivateNavigator: FC = () => {
	const { user } = useAuth()
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
