import { FriendsService, IFriendsip } from '@/services/friends/friends.service'
import { UseQueryResult, useMutation } from '@tanstack/react-query'
import { FC, useRef, useState } from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { FriendItem } from './ui/friend-item'
import { NoFriend } from './ui/NoFriends'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

import { IProfile } from '@/shared/types/profile.interface'
import BottomDrawer, {
	BottomDrawerMethods
} from '@/ui/bottom-driwer/bottomDrawer'

interface IMyFriends {
	friends: IProfile[]
}
const renderContent = () => (
	<View style={{ alignItems: 'center', justifyContent: 'center' }}>
		{/* Ваш кастомный компонент рядом с иконкой */}
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			{/* Ваш кастомный компонент */}
			<Text>Sent requests</Text>
			{/* Иконка для перетаскивания */}
			<Text>🔽</Text>
		</View>
		{/* Другие элементы внутри BottomDrawer */}
		<Text>Содержимое нижнего ящика</Text>
	</View>
)
export const RequestFriends: FC<IMyFriends> = ({ friends }) => {
	const addFriend = useMutation(
		['add-friend'],
		(data: { friendId: string; status: '0' | '1' | '2' | '3' }) =>
			FriendsService.addFriend(data)
	)
	const screenHeight = Dimensions.get('window').height
	const bottomDrawerRef = useRef<BottomDrawerMethods>(null)
	const openDrawer = () => {
		if (bottomDrawerRef.current) {
			bottomDrawerRef.current.open()
		}
	}
	return (
		<View className='mt-7'>
			<BottomDrawer
				ref={bottomDrawerRef}
				initialHeight={screenHeight - 120}
				customStyles={{ container: { backgroundColor: 'rgb(24 24 27)' } }}
				renderHandle={
					<View>
						<View className='mt-4 mx-auto h-1 bg-white w-16 rounded-lg'></View>
						<Text className='mt-4 text-white text-center text-xl font-bold'>
							Sent requests
						</Text>
						<View className='mt-5 w-[100%] h-[2px] bg-stone-700' />
					</View>
				}
			>
				<View></View>
			</BottomDrawer>
			<View className='mb-4 flex-row text-center justify-between items-center'>
				<Text className='text-lg text-white font-bold uppercase '>
					Request Friends
				</Text>
				<TouchableOpacity
					className='flex-row items-center'
					onPress={() => openDrawer()}
				>
					<Text className='text-base text-neutral-600 font-bold pr-1'>
						Sent
					</Text>
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
		<View className='flex-row'>
			<TouchableOpacity
				onPress={addFriend}
				className='bg-stone-800 w-16 flex justify-center rounded-2xl h-8 mr-2'
			>
				<Text className='text-white text-center uppercase font-bold'>add</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={deleteFriend}>
				<Entypo name='cross' size={28} color='white' />
			</TouchableOpacity>
		</View>
	)
}
