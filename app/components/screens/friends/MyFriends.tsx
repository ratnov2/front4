import { FriendsService } from '@/services/friends/friends.service'
import { useMutation } from '@tanstack/react-query'
import { FC } from 'react'
import { Text, View } from 'react-native'
import { FriendItem } from './ui/friend-item'
import { NoFriend } from './ui/NoFriends'
import { IProfile } from '@/shared/types/profile.interface'
import { CustomFriendModal } from './search-result/helper/modal/CustomFriendModal'
import { useModalState } from './search-result/helper/modal/useModalState'
import { ModalButton } from './search-result/helper/modal/ModalButton'

interface IMyFriends {
	friends: IProfile[]
}

export const MyFriends: FC<IMyFriends> = ({ friends }) => {
	const { handleModalVisible, modalVisible, userDataForModal } = useModalState()

	return (
		<View className='mt-7'>
			<CustomFriendModal
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
