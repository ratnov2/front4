import { useAuth } from '@/hooks/useAuth'
import { FriendsService } from '@/services/friends/friends.service'
import { Link, useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import {
	ActivityIndicator,
	Image,
	Modal,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	Touchable,
	TouchableOpacity,
	View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Contacts from 'expo-contacts'
import img from '@/assets/loading.gif'
import { Loader } from '@/ui'
import {
	FriendBody,
	InviteButton,
	SuggestionFriends
} from './SuggestionFriends'
import { Invite } from './ui/Invite'
import { MyFriends } from './MyFriends'
import { RequestFriends } from './RequestFriends'
import BottomDrawer, {
	BottomDrawerMethods
} from 'react-native-animated-bottom-drawer'
import { FriendItem } from './ui/friend-item'

export const Friends = () => {
	const insets = useSafeAreaInsets()
	// const suggestions = useQuery(['get-suggestion']()=>'') TASK ADD suggestion
	const myFriends = useQuery(['get-my-friends'], () =>
		FriendsService.getAllFriends()
	)
	const { user } = useAuth()
	const addFriend = useMutation(
		['add-friend'],
		(data: { friendId: string; status: '0' | '1' | '2' | '3' }) =>
			FriendsService.addFriend(data),
		{
			onSuccess: () => myFriends.refetch()
		}
	)
	const getUserByName = useMutation(
		['add-friend'],
		(data: { name: string; id?: string }) =>
			FriendsService.getUserByName((data = { ...data, id: user?._id }))
	)
	const navigate = useNavigation()
	//isFreind === 0  Add Friend
	//isFriend === 1  (nothing or mutual friends)
	//isFreind === 2 reqeust sent
	//isFreind === 3 reqeust can take

	const [typeFriend, setTypeFriend] = useState<
		'suggestion' | 'friends' | 'requests'
	>('requests')
	// useEffect(() => {
	// 	if (!myFriends.isLoading) {
	// 		myFriends.refetch()
	// 	}
	// }, [typeFriend])
	//const [isFriend, setIsFriend] = useState<'0' | '1' | '2' | '3' | null>(null)
	// useEffect(() => {
	// 	if (!myFriends.isLoading && myFriends.data && user) {
	// 		for (let i = 0; i < user.friendship.length; i++) {
	// 			if (myFriends.data._id === user.friendship[i]._id) {
	// 				setIsFriend(user.friendship[i].status)
	// 			}
	// 		}
	// 	}
	// }, [myFriends])

	// const handlePressFreind = () => {

	//}
	const handleAddFriend = (data: {
		friendId: string
		status: '0' | '1' | '2' | '3'
	}) => {
		if (!addFriend.isLoading) {
			addFriend.mutate(data)
		}
	}

	const [value, setValue] = useState('')
	const handlerChangeText = (e: string) => {
		setValue(e)

		if (e === '') {
			getUserByName.reset()
		} else {
			getUserByName.mutate({ name: e })
		}
		setModalVisible(true)
	}
	//console.log(getUserByName.data)
	const ref: any = useRef()
	const [modalVisible, setModalVisible] = useState(false)
	const bottomDrawerRef = useRef<BottomDrawerMethods>(null)
	const [openOnMount, setOpenOnMount] = useState(false)

	return (
		<View className='flex-1 mx-4 '>
			<Text
				className='text-white text-2xl font-bold text-center left-0 right-0 z-40'
				style={{ top: insets.top, position: 'absolute' }}
			>
				BePrime
			</Text>
			<ScrollView className='mb-14'>
				<View className='relative z-20' style={{ marginTop: insets.top + 50 }}>
					<TextInput
						className='bg-zinc-800 p-4 rounded-2xl text-white'
						placeholder='Add or search friends'
						value={value}
						onChangeText={e => handlerChangeText(e)}
					/>
					{/* <Modal
						animationType='slide'
						transparent={true}
						visible={modalVisible}
					></Modal> */}
					{/* && getUserByName.data.length > 0 && */}
				</View>
				{getUserByName.data ? (
					<View className='flex-1 w-full  z-[20] rounded-xl p-4 mt-6' ref={ref}>
						{getUserByName.data.map(e => (
							<Pressable
								className='flex-1'
								onPress={() =>
									navigate.navigate({
										name: `Profile`,
										params: {
											id: ''
										}
									} as never)
								}
							>
								<FriendItem
									styles={'mb-4 p-0 bg-transparent flex-1'}
									name={e.firstName}
									avatar={e.avatar}
									buttons={<InviteButton deleteFriend={() => ''} />}
									body={<FriendBody name={e.firstName} number='' />}
								/>
							</Pressable>
							// <View>
							// 	<Text className='text-white'>{e._id}</Text>
							// </View>
						))}
					</View>
				) : (
					<View>
						<Invite />
						{typeFriend === 'suggestion' && <SuggestionFriends />}
						{typeFriend === 'friends' && <MyFriends friends={myFriends} />}
						{typeFriend === 'requests' && (
							<RequestFriends friends={myFriends} />
						)}
						{typeFriend === 'suggestion' && (
							<View>
								<Text>//////</Text>
								<Text className='text-white'>Add friends</Text>
								{myFriends.data && (
									//GET ADD FRIENDS
									<View>
										{myFriends.data.friendship.map(friend => {
											if (friend.status === '2')
												return (
													<View className='flex-row  justify-between items-center'>
														<View>
															<View className='flex-row'>
																{friend.friends.avatar ? (
																	<Image className='w-14 h-14' source={img} />
																) : (
																	<View className='bg-red-600 h-14 w-14 rounded-full items-center justify-center'>
																		<Text className='text-white text-xl font-bold'>
																			{friend.friends.firstName[0] || 'A'}
																		</Text>
																	</View>
																)}

																<Text className='text-white'>
																	{friend.friends.email}
																</Text>
															</View>
														</View>
														<TouchableOpacity
															className='bg-gray-800 p-2 rounded-full h-8 '
															onPress={() =>
																handleAddFriend({
																	friendId: friend.friends._id,
																	status: '3'
																})
															}
														>
															<Text className='text-white font-bold'>
																INVITE
															</Text>
															{/* { <ActivityIndicator size="small" color="#0000ff" />} */}
														</TouchableOpacity>
													</View>
												)
										})}
									</View>
								)}
							</View>
						)}
					</View>
				)}
			</ScrollView>
			<View
				className='bg-slate-800 rounded-full p-2 flex-row justify-between items-center z-40'
				style={{
					alignSelf: 'center',
					position: 'absolute',
					bottom: insets.bottom
				}}
			>
				<TouchableOpacity
					className={`${
						typeFriend === 'suggestion' && 'bg-slate-500'
					} p-2 rounded-full`}
					onPress={() => setTypeFriend('suggestion')}
				>
					<Text className='text-white'>Suggestion</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className={`${
						typeFriend === 'friends' && 'bg-slate-500'
					} p-2 rounded-full ml-1`}
					onPress={() => setTypeFriend('friends')}
				>
					<Text className='text-white'>Friends</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className={`${
						typeFriend === 'requests' && 'bg-slate-500'
					} p-2 rounded-full ml-1`}
					onPress={() => setTypeFriend('requests')}
				>
					<Text className='text-white'>Requests</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
