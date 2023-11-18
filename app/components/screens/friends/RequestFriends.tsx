import { FriendsService, IFriendsip } from '@/services/friends/friends.service'
import { UseQueryResult, useMutation } from '@tanstack/react-query'
import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { FriendItem } from './ui/friend-item'
import { NoFriend } from './ui/NoFriends'
import { Entypo } from '@expo/vector-icons'

interface IMyFriends {
	friends: UseQueryResult<IFriendsip, unknown>
}

export const RequestFriends: FC<IMyFriends> = ({ friends }) => {
	const addFriend = useMutation(
		['add-friend'],
		(data: { friendId: string; status: '0' | '1' | '2' | '3' }) =>
			FriendsService.addFriend(data)
	)

	return (
		<View className='mt-7'>
			<Text className='text-lg text-white font-bold uppercase mb-4'>
				My Friends
			</Text>
			{friends.data && friends.data.friendship.length > 0 ? (
				<View>
					{friends.data.friendship.map((friend, key) => {
						if (friend.status === '1') {
							return (
								<FriendItem
									styles={'mb-4 p-0 bg-transparent'}
									avatar={friend.friends.avatar}
									name={friend.friends.firstName}
									body={
										<FriendBody
											name={friend.friends.firstName}
											login={friend.friends.email}
										/>
									}
									buttons={
										<ButtonGroup
											deleteFriend={() =>
												addFriend.mutate({
													friendId: friend.friends._id,
													status: '0'
												})
											}
											addFriend={() =>
												addFriend.mutate({
													friendId: friend.friends._id,
													status: '3'
												})
											}
										/>
									}
									key={key}
								/>
							)
						} else return null
					})}
				</View>
			) : (
				<NoFriend />
			)}
		</View>
	)
}
interface IFriendBody {
	name: string
	login: string
}
const FriendBody: FC<IFriendBody> = ({ name, login }) => (
	<View>
		<Text className='text-white text-lg font-bold'>{name || 'Anonym'}</Text>
		<Text className='text-stone-400 font-bold '>{login.split('@')[0]}</Text>
	</View>
)

// const GroupButtons = () => {
// 	return (
// 		<View>
// 			<DeleteButton />
// 		</View>
// 	)
// }
interface IButtonGroup {
	deleteFriend: () => void
	addFriend: () => void
}
const ButtonGroup: FC<IButtonGroup> = ({ deleteFriend, addFriend }) => {
	return (
		<View>
			<TouchableOpacity onPress={deleteFriend}>
				<Entypo name='cross' size={28} color='white' />
			</TouchableOpacity>
			<TouchableOpacity onPress={addFriend}>
				<Text className='text-white'>add</Text>
			</TouchableOpacity>
		</View>
	)
}
