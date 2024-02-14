import { FriendsService, IFriendsip } from '@/services/friends/friends.service'
import { UseQueryResult, useMutation } from '@tanstack/react-query'
import { FC, useRef, useState } from 'react'
import {
	Dimensions,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { FriendItem } from './ui/friend-item'
import { NoFriend } from './ui/NoFriends'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

import { IProfile } from '@/shared/types/profile.interface'
import BottomDrawer, {
	BottomDrawerMethods
} from '@/ui/bottom-driwer/bottomDrawer'
import { HandleFriendButton } from './search-result/helper/render-button/HandleFriendButton'
import { CustomFriendModal } from './search-result/helper/modal/CustomFriendModal'
import { useModalState } from './search-result/helper/modal/useModalState'
import { ModalButton } from './search-result/helper/modal/ModalButton'

interface IMyFriends {
	friendsStatus1: IProfile[]
	friendsStatus2: IProfile[]
}

export const RequestFriends: FC<IMyFriends> = ({
	friendsStatus1,
	friendsStatus2
}) => {
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
				<View className='flex-1'>
					<CustomFriendModal
						modalVisible={modalVisible}
						setModalVisible={() =>
							handleModalVisible('', '', '' as '0' | '1' | '2' | '3')
						}
						userData={userDataForModal}
					/>
					{friendsStatus1 && friendsStatus1.length > 0 ? (
						<ScrollView className='mx-4 py-5 flex-1'>
							{friendsStatus1.map((friend, key) => {
								return (
									<FriendItem
										styles={'mb-4 p-0 bg-transparent'}
										avatar={friend.avatar}
										name={friend.firstName}
										body={
											<FriendBody
												name={friend.firstName}
												login={friend.email}
											/>
										}
										buttons={
											<ModalButton
												setModalVisible={() =>
													handleModalVisible(friend.firstName, friend._id, '1')
												}
												text='request is sented'
											/>
										}
										key={key}
									/>
								)
							})}
						</ScrollView>
					) : (
						<NoFriend />
					)}
				</View>
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
			{friendsStatus2 && friendsStatus2.length > 0 ? (
				<View>
					{friendsStatus2.map((friend, key) => {
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
										handleModalVisible={() =>
											handleModalVisible(friend.firstName, friend._id, '1')
										}
										id={friend._id}
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
	id: string
	handleModalVisible: () => void
}
const ButtonGroup: FC<IButtonGroup> = ({ handleModalVisible, id }) => {
	return (
		<View className='flex-row'>
			<View className='mr-4'>
				<HandleFriendButton id={id} loading status='3' title='Add friend' />
			</View>
			<ModalButton
				setModalVisible={() => handleModalVisible()}
				text='Cancel the request'
			/>
		</View>
	)
}
