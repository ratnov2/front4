import { Pressable, View } from 'react-native'
import { FriendItem } from '../ui/friend-item'
import { FriendBody } from '../SuggestionFriends'
import { Loader } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import { useSearchingFriends } from '../useSearchingFriends'
import { useAuth } from '@/hooks/useAuth'
import { RenderButton } from './helper/render-button/RenderButton'
import { NotFoundUser } from './helper/ui/NotFoundUser'
import { useModalState } from './helper/modal/useModalState'
import { WithCustomFriendModal } from './helper/modal/WithCustomFriendModal'

export const FriendsSearchResult = () => {
	const { user } = useAuth()

	const { isDebouncing, getUserByName } = useSearchingFriends(String(user?._id))

	const navigate = useNavigation()
	const { handleModalVisible, modalVisible, userDataForModal } = useModalState()
	console.log(JSON.stringify(getUserByName.data, null, 2))

	return (
		<View className='flex-1 w-full z-[20] rounded-xl p-4 mt-6'>
			<WithCustomFriendModal
				modalVisible={modalVisible}
				setModalVisible={() =>
					handleModalVisible('', '', '' as '0' | '1' | '2' | '3')
				}
				userData={userDataForModal}
			/>
			{getUserByName.data?.map(usersByName => (
				<Pressable
					className='flex-1 '
					onPress={() =>
						navigate.navigate({
							name: `Profile`,
							params: {
								id: usersByName._id
							}
						} as never)
					}
					key={usersByName._id}
				>
					<FriendItem
						styles={'mb-4 p-0 bg-transparent flex-1'}
						name={usersByName.firstName}
						avatar={usersByName.avatar}
						buttons={RenderButton(usersByName, user, handleModalVisible)}
						body={<FriendBody name={usersByName.firstName} number='' />}
					/>
				</Pressable>
			))}
			{getUserByName?.data?.length === 0 && <NotFoundUser />}
			{isDebouncing && (
				<View className='absolute top-0 w-full '>
					<Loader />
				</View>
			)}
		</View>
	)
}

// const RazrabTest = ({
// 	title,
// 	id,
// 	status
// }: {
// 	handleFriend?: () => void
// 	title: string
// 	loading: boolean
// 	id: string
// 	status: '0' | '1' | '2' | '3' | 'add_All'
// }) => {
// 	//@ts-ignore
// 	const { addFriend, isLoading, setIsLoading } = useMutateAddFriend(id, status)

// 	return (
// 		<TouchableOpacity
// 			className={`bg-zinc-700 p-2 rounded-full uppercase ${
// 				status === '2' && 'bg-yellow-400'
// 			}`}
// 			onPress={() => {
// 				setIsLoading(true)
// 				//@ts-ignore
// 				addFriend.mutate({ friendId: id, status })
// 			}}
// 		>
// 			{!isLoading ? (
// 				<Text className='text-white font-bold'>{title}</Text>
// 			) : (
// 				<ActivityIndicator size={'small'} className='w-16' />
// 			)}
// 		</TouchableOpacity>
// 	)
// }
{
	/* <RazrabTest
				title='Add friend'
				id={'65587d69dbdf73a8b2a442fc'}
				status='add_All'
				loading
			/> */
}
