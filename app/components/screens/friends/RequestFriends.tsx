import { FriendsService, IFriendsip } from '@/services/friends/friends.service'
import { UseQueryResult, useMutation } from '@tanstack/react-query'
import { FC, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { FriendItem } from './ui/friend-item'
import { NoFriend } from './ui/NoFriends'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import BottomDrawer, {
	BottomDrawerMethods
} from 'react-native-animated-bottom-drawer'
import { IProfile } from '@/shared/types/profile.interface'

interface IMyFriends {
	friends: IProfile[]
}

export const RequestFriends: FC<IMyFriends> = ({ friends }) => {
	const addFriend = useMutation(
		['add-friend'],
		(data: { friendId: string; status: '0' | '1' | '2' | '3' }) =>
			FriendsService.addFriend(data)
	)

	return (
		<View className='mt-7'>
			<View className='mb-4 flex-row text-center justify-between items-center'>
				<Text className='text-lg text-white font-bold uppercase '>
					Request Friends
				</Text>
				<TouchableOpacity className='flex-row items-center'>
					<Text className='text-base text-neutral-600 font-bold pr-1'>Sent</Text>
					<MaterialIcons
						name='arrow-forward-ios'
						size={16}
						color={'rgba(196,196,196,0.6)'}
					/>
				</TouchableOpacity>
			</View>
			{friends && friends.length > 0 ? (
				<View>
					{friends.map((friend, key) => {
						return (
							<FriendItem
								styles={'mb-4 p-0 bg-transparent'}
								avatar={friend.avatar}
								name={friend.firstName}
								body={
									<FriendBody name={friend.firstName} login={friend.email} />
								}
								buttons={
									<ButtonGroup
										deleteFriend={() =>
											addFriend.mutate({
												friendId: friend._id,
												status: '0'
											})
										}
										addFriend={() =>
											addFriend.mutate({
												friendId: friend._id,
												status: '3'
											})
										}
									/>
								}
								key={key}
							/>
						)
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
