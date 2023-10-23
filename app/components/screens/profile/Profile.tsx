import { useAuth } from '@/hooks/useAuth'
import { AuthService } from '@/services/auth/auth.service'
import { FC } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { ProfileHeader } from './header/Header'
import { MainProfile } from './main/MainProfile'
import { CalendarMin } from './calendar-min/CalendarMin'

const Profile: FC = () => {
	const { setUser } = useAuth()

	return (
		<View className='mt-20 px-5'>
			<ProfileHeader />
			<ScrollView>
				<Pressable
					onPress={() => AuthService.logout().then(() => setUser(null))}
					className='opacity-40 items-center flex-row justify-end'
				>
					<Text className='text-white text-lg ml-2'>Logout</Text>
				</Pressable>
				<MainProfile />
				<CalendarMin />
			</ScrollView>
		</View>
	)
}

export default Profile
