import { FC, useState } from 'react'
import {
	ActivityIndicator,
	Pressable,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { FriendItem } from '../ui/friend-item'
import { FriendBody } from '../SuggestionFriends'
import { Loader } from '@/ui'
import {
	UseQueryResult,
	useMutation,
	useQueryClient
} from '@tanstack/react-query'
import { IProfile } from '@/shared/types/profile.interface'
import { useNavigation } from '@react-navigation/native'
import { FriendsService } from '@/services/friends/friends.service'
import { useSearchingFriends } from '../useSearchingFriends'
import { useAuth } from '@/hooks/useAuth'

interface IFriendsSearchResult {}

export const FriendsSearchResult: FC<IFriendsSearchResult> = ({}) => {
	const addFriend = useMutation(
		['add-friend'],
		(data: { friendId: string; status: '0' | '1' | '2' | '3' }) =>
			FriendsService.addFriend(data),
		{
			onSuccess: () => {
				const currentData = useQueryClient().getQueryData(['get-user-by-name'])
			}
		}
	)
	const { user } = useAuth()
	const { isDebouncing, setValue, value, getUserByName, isSearching } =
		useSearchingFriends(String(user?._id))
	const navigate = useNavigation()
	return (
		<View className='flex-1 w-full z-[20] rounded-xl p-4 mt-6'>
			{getUserByName?.data?.map(e => (
				<Pressable
					className='flex-1 '
					onPress={() =>
						navigate.navigate({
							name: `Profile`,
							params: {
								id: ''
							}
						} as never)
					}
					key={e._id}
				>
					<FriendItem
						styles={'mb-4 p-0 bg-transparent flex-1'}
						name={e.firstName}
						avatar={e.avatar}
						buttons={
							e.friendship[0]?.status === '1' ? (
								<HandleFriendButton
									title='Request is sended'
									id={e._id}
									status='1'
									loading
								/>
							) : e.friendship[0]?.status === '2' ? (
								<HandleFriendButton
									title='Take friend'
									id={e._id}
									status='1'
									loading
								/>
							) : e.friendship[0]?.status === '3' ? (
								<HandleFriendButton
									title='My friend'
									id={e._id}
									status='1'
									loading
								/>
							) : e._id === user?._id ? (
								<View></View>
							) : (
								<HandleFriendButton
									title='Add friend'
									loading={addFriend.isLoading}
									id={e._id}
									status='1'
								/>
							)
						}
						body={<FriendBody name={e.firstName} number='' />}
					/>
				</Pressable>
				// <View>
				// 	<Text className='text-white'>{e._id}</Text>
				// </View>
			))}
			{getUserByName?.data?.length === 0 && (
				<View className='bg-zinc-600 p-10 rounded-2xl'>
					<Text className='text-white font-bold'>
						По вашему запросу ничего не найдено
					</Text>
				</View>
			)}
			{isDebouncing && (
				<View className='absolute top-0 w-full '>
					<Loader />
				</View>
			)}
		</View>
	)
}

const HandleFriendButton = ({
	title,
	id,
	status
}: {
	handleFriend?: () => void
	title: string
	loading: boolean
	id: string
	status: '0' | '1' | '2' | '3'
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const queryClient = useQueryClient()
	const addFriend = useMutation(
		[id],
		(data: { friendId: string; status: '0' | '1' | '2' | '3' }) =>
			FriendsService.addFriend(data),
		{
			onSuccess: e => {
				//myFriends.refetch()
				setTimeout(() => {
					setIsLoading(false)
				}, 500)
				//@ts-ignore
				queryClient.setQueryData(['get-user-by-name'], (prevData: any[]) => {
					if (!prevData) {
						return prevData
					}

					//prevData = queryClient.getQueryData(['get-user-by-name'])
					const updatedIndex = prevData.findIndex(
						//@ts-ignore
						(item: { _id: any }) => item._id === e._id
					)
					//currentData.map((e: any)=>)
					if (updatedIndex !== -1) {
						// Создайте новый массив данных с обновленной строкой
						const newData = [...prevData]
						newData[updatedIndex] = e
						return newData
					}

					return prevData
				})
			}
		}
	)
	return (
		<TouchableOpacity
			className='bg-zinc-700 p-2 rounded-full uppercase'
			onPress={() => {
				setIsLoading(true)
				addFriend.mutate({ friendId: id, status })
			}}
		>
			{!isLoading ? (
				<Text className='text-white font-bold'>{title}</Text>
			) : (
				<ActivityIndicator size={'small'} className='w-16' />
			)}
		</TouchableOpacity>
	)
}
