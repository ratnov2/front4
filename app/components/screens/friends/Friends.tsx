import { FriendsService, IFriendsip } from '@/services/friends/friends.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { RefObject, createContext, useContext, useRef, useState } from 'react'
import { Animated, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { IProfile } from '@/shared/types/profile.interface'
import Swiper from 'react-native-swiper'
import { SwiperFriendList } from './swiper-friendList/SwiperFriendList'
import { ListButtonSwiperFriend } from './list-button-swiper-friend/ListButtonSwiperFriend'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

export const MyFriendContext = createContext<{
	myFriendByStatus: IFriendsStatus
	setMyFriendByStatus: any
}>({
	myFriendByStatus: { friendStatus1: [], friendStatus2: [], friendStatus3: [] },
	setMyFriendByStatus: (e: any) => ''
})

export const Friends = () => {
	const insets = useSafeAreaInsets()
	const queryClient = useQueryClient()
	// const suggestions = useQuery(['get-suggestion']()=>'') TASK ADD suggestion

	//////
	////////isFreind === 0  Add Friend
	////////isFriend === 1  (nothing or mutual friends)
	////////isFreind === 2 reqeust sent
	////////isFreind === 3 reqeust can take
	/////

	const refButtonGroup = useRef<View>(null)
	const refButton1 = useRef<TouchableOpacity>(null)
	const refButton2 = useRef<TouchableOpacity>(null)
	const refButton3 = useRef<TouchableOpacity>(null)
	const measureButton = (refButton: RefObject<TouchableOpacity>) => {
		refButton.current?.measure((x, y, width, height, pageX, pageY) => {
			//return width
		})
		let g
		const current = refButton.current?.measure(
			(x, y, width, height, pageX, pageY) => {
				//console.log(width)

				g = width
			}
		)
		return 300
	}

	const measureButtonGroup = () => {
		const current = refButtonGroup.current?.measure(
			(x, y, width, height, pageX, pageY) => {
				return width
			}
		)
		//console.log(current)
		return 100
	}
	const myFriends = useQuery<IFriendsip, Error, IFriendsStatus>(
		['get-my-friends'],
		{
			select: data => {
				const myFriendByStatus: IFriendsStatus = {
					friendStatus1: [],
					friendStatus2: [],
					friendStatus3: []
				}
				data.friendship.map(({ friends, status }) => {
					if (status === '1') {
						myFriendByStatus.friendStatus1.push(friends)
					} else if (status === '2') {
						myFriendByStatus.friendStatus2.push(friends)
					} else if (status === '3') {
						myFriendByStatus.friendStatus3.push(friends)
					}
				})

				return myFriendByStatus
			}
		}
	)

	const [activeIndex, setActiveIndex] = useState(1)
	const animatedValue = new Animated.Value(activeIndex)
	const scrollToPage = (index: number) => {
		if (swiperRef.current) {
			swiperRef.current.scrollTo(index, true)
			Animated.timing(animatedValue, {
				toValue: index,
				duration: 300,
				useNativeDriver: false
			}).start()
		}
	}

	const swiperRef = useRef<Swiper>(null)
	const { navigate } = useNavigation<any>()

	return (
		// <MyFriendContext.Provider value={{ myFriendByStatus, setMyFriendByStatus }}>
		<View className='flex-1'>
			<View className='flex-1 '>
				<Text
					className='text-white text-2xl font-bold text-center left-0 right-0 z-40'
					style={{ top: insets.top, position: 'absolute' }}
				>
					BePrime
				</Text>
				<TouchableOpacity
					style={{ top: insets.top }}
					className='ml-4 z-40'
					onPress={() => navigate('Home')}
				>
					<AntDesign name='arrowleft' size={30} color='white' />
				</TouchableOpacity>
				{myFriends.data && (
					<SwiperFriendList
						activeIndex={activeIndex}
						myFriendByStatus={myFriends.data}
						setActiveIndex={setActiveIndex}
						swiperRef={swiperRef}
					/>
				)}
				<ListButtonSwiperFriend
					animatedValue={animatedValue}
					refButtonGroup={refButtonGroup}
					scrollToPage={scrollToPage}
					requestsToFriends={myFriends.data?.friendStatus2}
					activeIndex={activeIndex}
				/>
			</View>
		</View>
		// </MyFriendContext.Provider>
	)
}

export const MyFriendButton = ({
	deleteFriend
}: {
	deleteFriend?: () => void
}) => {
	return (
		<TouchableOpacity className='bg-zinc-700 p-2 rounded-full uppercase'>
			<Text className='text-white font-bold'>My Friend</Text>
		</TouchableOpacity>
	)
}
// export const RequestSentedButton = ({
// 	deleteFriend
// }: {
// 	deleteFriend?: () => void
// }) => {
// 	return (
// 		<TouchableOpacity className='bg-zinc-700 p-2 rounded-full uppercase'>
// 			<Text className='text-white font-bold'>Request Sented</Text>
// 		</TouchableOpacity>
// 	)
// }
// export const AddFriendButton = ({
// 	deleteFriend
// }: {
// 	deleteFriend?: () => void
// }) => {
// 	return (
// 		<TouchableOpacity className='bg-zinc-700 p-2 rounded-full uppercase'>
// 			<Text className='text-white font-bold'>add Friend</Text>
// 		</TouchableOpacity>
// 	)
// }
// export const SefFriendButton = ({
// 	deleteFriend
// }: {
// 	deleteFriend?: () => void
// }) => {
// 	return (
// 		<TouchableOpacity className='bg-zinc-700 p-2 rounded-full uppercase'>
// 			<Text className='text-white font-bold'>take Friend</Text>
// 		</TouchableOpacity>
// 	)
// }

export interface IFriendsStatus {
	friendStatus1: IProfile[]
	friendStatus2: IProfile[]
	friendStatus3: IProfile[]
}

//handleAddFriend
//IMPORTANT
// {false && (
// 	<View>
// 		<Text>//////</Text>
// 		<Text className='text-white'>Add friends</Text>
// 		{myFriends.data && (
// 			//GET ADD FRIENDS
// 			<View>
// 				{myFriends.data.friendship.map((friend, key) => {
// 					if (friend.status === '2')
// 						return (
// 							<View
// 								className='flex-row  justify-between items-center'
// 								key={key}
// 							>
// 								<View>
// 									<View className='flex-row'>
// 										{friend.friends.avatar ? (
// 											<Image
// 												className='w-14 h-14'
// 												source={img}
// 											/>
// 										) : (
// 											<View className='bg-red-600 h-14 w-14 rounded-full items-center justify-center'>
// 												<Text className='text-white text-xl font-bold'>
// 													{friend.friends.firstName[0] ||
// 														'A'}
// 												</Text>
// 											</View>
// 										)}

// 										<Text className='text-white'>
// 											{friend.friends.email}
// 										</Text>
// 									</View>
// 								</View>
// 								<TouchableOpacity
// 									className='bg-gray-800 p-2 rounded-full h-8 '
// 									onPress={() =>
// 										// handleAddFriend({
// 										// 	friendId: friend.friends._id,
// 										// 	status: '3'
// 										// })
// 										''
// 									}
// 								>
// 									<Text className='text-white font-bold'>
// 										INVITE
// 									</Text>
// 									{/* { <ActivityIndicator size="small" color="#0000ff" />} */}
// 								</TouchableOpacity>
// 							</View>
// 						)
// 				})}
// 			</View>
// 		)}
// 	</View>
// )}
