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

const Profile: FC = () => {
	const user = useQuery(['get-user'], () => ProfileService.getProfile())
	const addFriend = useMutation(
		['add-friend'],
		(data: { friendId: string; status: '0' | '1' | '2' }) =>
			FriendsService.addFriend(data)
	)
	const { setUser } = useAuth()
	let { params } = useRoute()
	console.log(params?.id, user.data?._id)

	return (
		<View>
			{user.data && (
				<View>
					{(params as { id: string })?.id !== user.data._id && params ? (
						<OtherUserProfile />
					) : (
						<View className='mt-20 px-5'>
							<View>
								<ProfileHeader />
								<ScrollView>
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
