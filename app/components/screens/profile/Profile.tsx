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
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TypeRootStackParamList } from '@/navigation/navigation.types'

type IProfile = NativeStackScreenProps<TypeRootStackParamList, 'Profile'>

const Profile: FC<IProfile> = ({ navigation }) => {
	const { user } = useAuth()
	const { setUser } = useAuth()
	let { params } = useRoute()

	const insets = useSafeAreaInsets()
	const getUser = useQuery(['get-profile'], () => ProfileService.getProfile())
	return (
		<View>
			{user && (
				<View style={{ marginTop: insets.top }} className='relativ '>
					{/* <Pressable
						className='w-40 h-40 bg-white'
						onPress={() => navigation.navigate('Settings')}
					></Pressable> */}
					<ProfileHeader user={getUser} navigation={navigation} />
					<ScrollView className='h-full'>
						{(params as { id: string })?.id !== user._id &&
						(params as { id: string })?.id ? (
							<OtherUserProfile />
						) : (
							<View className='mt-20 px-5'>
								<View>
									<MainProfile />
									<CalendarMin />
									<View className='mb-10' />
								</View>
							</View>
						)}
					</ScrollView>
				</View>
			)}
		</View>
	)
}

export default Profile
