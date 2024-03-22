import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Navigation from '@/navigation/Navigation'
import AuthProvider from '@/providers/auth/AuthProvider'
import { ScrollView, StatusBar, Text, View } from 'react-native'
import Toast from '@/ui/Toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ContactsDataProvider } from '@/providers/contacts/ContactsDataProvider'
import { useEffect, useRef, useState } from 'react'
import { registerForPushNotificationsAsync } from '@/components/screens/profile/PERMISSIONS/Notefications'
import * as Notifications from 'expo-notifications'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function App() {
	const postUrl = process.env.REACT_APP_SERVER_URL
	const [expoPushToken, setExpoPushToken] = useState('')
	const [notification, setNotification] = useState(false)
	const notificationListener = useRef()
	const responseListener = useRef()

	// useEffect(() => {
	// 	registerForPushNotificationsAsync().then(token => setExpoPushToken(token))
	// 	notificationListener.current =
	// 		Notifications.addNotificationReceivedListener(notification => {
	// 			setNotification(notification)
	// 		})
	// 	responseListener.current =
	// 		Notifications.addNotificationResponseReceivedListener(response => {
	// 			console.log(response)
	// 		})
	// 	return () => {
	// 		Notifications.removeNotificationSubscription(notificationListener.current)
	// 		Notifications.removeNotificationSubscription(responseListener.current)
	// 	}
	// }, [])
	//console.log(notification)

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					{/* <Text>Your expo push token: {expoPushToken}</Text> */}

					<ContactsDataProvider>
						<SafeAreaProvider>
							<Navigation />
						</SafeAreaProvider>
					</ContactsDataProvider>
				</AuthProvider>
				<StatusBar barStyle='light-content' />
				<Toast />
			</QueryClientProvider>
		</>
	)
}
