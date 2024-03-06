import { useMutation, useQuery } from '@tanstack/react-query'
import { Image, ImageBackground, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import img from '@/assets/adaptive-icon.png'
import { LinearGradient } from 'expo-linear-gradient'
import { FriendsService } from '@/services/friends/friends.service'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ProfileService } from '@/services/profile/profile.service'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useModalState } from '../../friends/search-result/helper/modal/useModalState'
import { WithCustomFriendModal } from '../../friends/search-result/helper/modal/WithCustomFriendModal'
import { RenderButton } from './RenderButton'
import bgImage from '@/assets/bg-red.jpg'
import { BaseImageUrl2 } from '@/services/api/interceptors.api'

export const OtherUserProfile = () => {
	const { params } = useRoute<any>()

	// let params = { id: '65587d67dbdf73a8b2a442f9' }
	const { user } = useAuth()
	const addFriend = useMutation(
		['add-friend'],
		(data: { friendId: string; status: '0' | '1' | '2' }) =>
			FriendsService.addFriend(data)
	)

	const getUser = useQuery(['get-user-by-by-id'], () =>
		ProfileService.getUser(params?.id)
	)

	const getMe = useQuery(['get-me'], () =>
		ProfileService.getUser(String(user?._id))
	)

	const myFriends = useQuery(['get-my-friends'], () => {
		return FriendsService.getAllFriends()
	})
	const [typeFriend, setTypeFriend] = useState<'0' | '1' | '2' | '3' | null>(
		null
	)
	//console.log(getUser.data?.friendship);

	useEffect(() => {
		if (
			!myFriends.isLoading &&
			myFriends.data &&
			!getMe.isLoading &&
			getMe.data
		) {
			for (let i = 0; i < myFriends.data.friendship.length; i++) {
				if (myFriends.data.friendship[i]?.friends._id === params.id) {
					setTypeFriend(myFriends.data.friendship[i].status)
					break
				}
				setTypeFriend(null)
			}
		}
	}, [myFriends.data, getMe.data, myFriends.isFetched])
	const navigate = useNavigation()
	const { handleModalVisible, modalVisible, userDataForModal } = useModalState()
	const [error, setError] = useState(false)
	return (
		<View>
			<WithCustomFriendModal
				modalVisible={modalVisible}
				setModalVisible={() =>
					handleModalVisible('', '', '' as '0' | '1' | '2' | '3')
				}
				userData={userDataForModal}
			/>
			{myFriends.data && getUser.data && (
				<View className='z-10'>
					<ImageBackground
						style={{ aspectRatio: 1, position: 'relative' }}
						source={
							!error
								? {
										uri: BaseImageUrl2(getUser.data.avatar)
								  }
								: bgImage
						}
						onError={() => {
							setError(true)
						}}
						// blurRadius={0}
					>
						<LinearGradient
							colors={['#00000000', '#111111']}
							style={{
								height: '50%',
								width: '100%',
								position: 'absolute',
								bottom: 0
							}}
						></LinearGradient>
						<LinearGradient
							colors={['#111111', '#00000000']}
							style={{
								height: '25%',
								width: '100%',
								position: 'absolute',
								top: 0
							}}
						></LinearGradient>
						<View style={{ position: 'absolute', bottom: 20, left: 20 }}>
							<Text className='text-3xl text-white font-bold'>
								{getUser.data.firstName || 'Anonym'}
							</Text>
						</View>
					</ImageBackground>
					{RenderButton(typeFriend, getUser.data, handleModalVisible)}
					{/* {typeFriend === null ? (
						<TouchableOpacity
							onPress={() =>
								addFriend.mutate({
									friendId: getUser.data._id,
									status: '1'
								})
							}
							className='flex-row justify-center mt-4 bg-white p-4 rounded-2xl'
						>
							<Text className='font-bold text-2xl mr-2'>+</Text>
							<Text className='font-bold text-2xl'>Add Friend</Text>
						</TouchableOpacity>
					) : typeFriend === '2' ? (
						<View className='flex-row justify-center mt-4 bg-white p-4 rounded-2xl'>
							<Text className='font-bold text-2xl'>Invite was sented</Text>
						</View>
					) : typeFriend === '1' ? (
						<View></View>
					) : (
						<View></View>
					)} */}
				</View>
			)}
		</View>
	)
}
