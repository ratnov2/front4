import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Navigation from '@/navigation/Navigation'
import AuthProvider from '@/providers/auth/AuthProvider'
import { ScrollView, StatusBar, Text, View } from 'react-native'
import Toast from '@/ui/Toast'
import {
	QueryClient,
	QueryClientProvider,
	useMutation
} from '@tanstack/react-query'
import { ContactsDataProvider } from '@/providers/contacts/ContactsDataProvider'
import { useEffect, useRef, useState } from 'react'
import { registerForPushNotificationsAsync } from '@/components/screens/profile/PERMISSIONS/Notefications'
import * as Notifications from 'expo-notifications'
import { ProfileService } from '@/services/profile/profile.service'
import { useAuth } from '@/hooks/useAuth'
import { Helper } from '@/components/screens/Helper'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			refetchOnWindowFocus: false
// 		}
// 	}
// })

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true
	})
})
export default function App() {
	const postUrl = process.env.REACT_APP_SERVER_URL
	const [expoPushToken, setExpoPushToken] = useState('')
	const [notification, setNotification] = useState(false)
	const notificationListener = useRef()
	const responseListener = useRef()
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false
					}
				}
			})
	)

	useEffect(() => {
		registerForPushNotificationsAsync().then(token => {
			setExpoPushToken(token)
		})
		//@ts-ignore
		notificationListener.current =
			Notifications.addNotificationReceivedListener(notification => {
				console.log('response', notification)
				//@ts-ignore
				setNotification(notification)
			})

		// 	})
		// })
		//@ts-ignore
		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(response => {
				console.log(response)
			})
		return () => {
			//@ts-ignore
			Notifications.removeNotificationSubscription(notificationListener.current)
			//@ts-ignore
			Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, [])
	//console.log('notification', expoPushToken)

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Helper deviceToken={expoPushToken} />
					<GestureHandlerRootView style={{ flex: 1 }}>
						<ContactsDataProvider>
							<SafeAreaProvider>
								<Navigation />
							</SafeAreaProvider>
						</ContactsDataProvider>
					</GestureHandlerRootView>
				</AuthProvider>
				<StatusBar barStyle='light-content' />
				<Toast />
			</QueryClientProvider>
		</>
	)
}
