import { FriendsService } from '@/services/friends/friends.service'
import { useMutation } from '@tanstack/react-query'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { FriendItem } from './ui/friend-item'
import { NoFriend } from './ui/NoFriends'
import { IProfile } from '@/shared/types/profile.interface'

import { useModalState } from './search-result/helper/modal/useModalState'
import { ModalButton } from './search-result/helper/modal/ModalButton'
import { WithCustomFriendModal } from './search-result/helper/modal/WithCustomFriendModal'
import { useNavigation } from '@react-navigation/native'

interface IMyFriends {
	friends: IProfile[]
}

export const MyFriends: FC<IMyFriends> = ({ friends }) => {
	const { handleModalVisible, modalVisible, userDataForModal } = useModalState()
	const navigate = useNavigation()
	return (
		<View className='mt-7'>
			<WithCustomFriendModal
				modalVisible={modalVisible}
				setModalVisible={() =>
					handleModalVisible('', '', '' as '0' | '1' | '2' | '3')
				}
				userData={userDataForModal}
			/>
			<Text className='text-lg text-white font-bold uppercase mb-4'>
				My Friends
			</Text>

			{friends.length > 0 ? (
				<View>
					{friends.map((friend, key) => {
						return (
							<Pressable
								className='flex-1 '
								onPress={() =>
									navigate.navigate({
										name: `Profile`,
										params: {
											id: friend._id
										}
									} as never)
								}
								key={friend._id}
							>
								<FriendItem
									styles={'mb-4 p-0 bg-transparent'}
									avatar={friend.avatar}
									name={friend.firstName}
									body={
										<FriendBody name={friend.firstName} login={friend.email} />
									}
									buttons={
										<ModalButton
											setModalVisible={() =>
												handleModalVisible(friend.firstName, friend._id, '0')
											}
											text='Delete friend'
										/>
									}
									key={key}
								/>
							</Pressable>
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
