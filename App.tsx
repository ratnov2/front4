import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Navigation from '@/navigation/Navigation'
import AuthProvider from '@/providers/auth/AuthProvider'
import { ScrollView, StatusBar, Text, View } from 'react-native'
import Toast from '@/ui/Toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ContactsDataProvider } from '@/providers/contacts/ContactsDataProvider'

import { NotificationsContextProvider } from '@/components/screens/profile/PERMISSIONS/Notefications'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function App() {
	const postUrl = process.env.REACT_APP_SERVER_URL

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<NotificationsContextProvider>
						<ContactsDataProvider>
							<SafeAreaProvider>
								<Navigation />
							</SafeAreaProvider>
						</ContactsDataProvider>
					</NotificationsContextProvider>
				</AuthProvider>
				<StatusBar barStyle='light-content' />
				<Toast />
			</QueryClientProvider>
		</>
	)
}
