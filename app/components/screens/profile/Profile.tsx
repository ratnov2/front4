import { useAuth } from '@/hooks/useAuth'
import { AuthService } from '@/services/auth/auth.service'
import { FC } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { ProfileHeader } from './header/Header'
import { MainProfile } from './main/MainProfile'
import { CalendarMin } from './calendar-min/CalendarMin'
import { Joined } from './ui/Joined'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import { useRoute } from '@react-navigation/native'
import { OtherUserProfile } from './other-user/OtherUserProfile'
import { FriendsService } from '@/services/friends/friends.service'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Profile: FC = () => {
	const { user } = useAuth()
	const { setUser } = useAuth()
	let { params } = useRoute()
	const insets = useSafeAreaInsets()
	return (
		<View  style={{marginBottom:insets.bottom + 220}}>
			{user && (
				<View >
					{(params as { id: string })?.id !== user._id &&
					(params as { id: string })?.id ? (
						<OtherUserProfile />
					) : (
						<View className='mt-20 px-5 ' >
							<View>
								<ProfileHeader />
								<ScrollView >
									<Pressable
										onPress={() =>
											AuthService.logout().then(() => setUser(null))
										}
										className='opacity-40 items-center flex-row justify-end'
									>
										<Text className='text-white text-lg ml-2'>Logout</Text>
									</Pressable>
									<MainProfile />

									<CalendarMin />
								</ScrollView>
							</View>
						</View>
					)}
				</View>
			)}
		</View>
	)
}

export default Profile
