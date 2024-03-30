import { useMutation, useQuery } from '@tanstack/react-query'
import { Image, ImageBackground, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import img from '@/assets/adaptive-icon.png'
import { LinearGradient } from 'expo-linear-gradient'
import { FriendsService } from '@/services/friends/friends.service'
import { FC, useEffect, useState } from 'react'
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
	//console.log(getUser.data);

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
				</View>
			)}
		</View>
	)
}

type TSizeAvatar = 'small-photo' | 'profile' | 'friends-pal' | 'friends-item' | 'reaction-main'

const sizeAvatar = {
	'small-photo': {
		w: 30,
		h: 30,
		fontSize: 15,
		left: 10,
		top: 4
	},
	profile: {
		w: 100,
		h: 100,
		fontSize: 35,
		left: 37,
		top: 28
	},
	'friends-pal': {
		w: 70,
		h: 70,
		fontSize: 25,
		left: 26,
		top: 19
	},
	'friends-item': {
		w: 35,
		h: 35,
		fontSize: 15,
		left: 12,
		top: 8.5
	},
	'reaction-main': {
		w: 50,
		h: 50,
		fontSize: 15,
		left: 21,
		top: 17
	}
}

interface IImgAvatar {
	avatar: string
	size?: TSizeAvatar
	name?: string
}
export const ImgAvatar: FC<IImgAvatar> = ({ avatar, size, name }) => {
	const [error, setError] = useState(false)
	size = !size ? 'small-photo' : size
	name = !name ? 'Anonym' : name
	//console.log(avatar)

	return (
		<View
			className='rounded-full overflow-hidden relative '
			style={{ width: sizeAvatar[size].w, height: sizeAvatar[size].h }}
		>
			<ImageBackground
				style={{ position: 'relative' }}
				className='flex-1'
				source={
					!error
						? {
								uri: BaseImageUrl2(avatar)
							}
						: bgImage
				}
				onError={() => {
					setError(true)
				}}
			/>
			{(error || !avatar) && (
				<Text
					className='absolute flex-1 justify-center items-center text-white font-bold uppercase'
					style={{
						left: sizeAvatar[size].left,
						top: sizeAvatar[size].top,
						fontSize: sizeAvatar[size].fontSize
					}}
				>
					{name[0]}
				</Text>
			)}
		</View>
	)
}
