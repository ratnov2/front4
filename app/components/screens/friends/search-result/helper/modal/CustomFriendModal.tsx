import { FC } from 'react'

import { ActivityIndicator, Modal, Text, View } from 'react-native'
import { ICustomFriendModal } from '../../types'
import { useMutateAddFriend } from '../hooks/useMutataAddFriend'
import { StyledButton } from '../../StyledButton'

export const CustomFriendModal: FC<ICustomFriendModal> = ({
	modalVisible,
	setModalVisible,
	userData,
	isLoading,
	onConfirm
}) => {
	// const { addFriend, isLoading, setIsLoading } = useMutateAddFriend(
	// 	userData.friendId,
	// 	userData.status
	// )
	// const handleAddFriend = () => {
	// 	setIsLoading(true)
	// 	addFriend.mutate({
	// 		friendId: userData.friendId,
	// 		status: '0'
	// 	})
	// 	setModalVisible(false)
	// }

	const returnTextByStatus = {
		'1': {
			title1: `Вы уверены, что хотитите отменить запрос в друзья пользователю ${userData.username}?`
		},
		'3': {
			title1: `Вы уверены, что хотитите отменить запрос в друзья пользователю ${userData.username}?`,
			title2: `Вы больше не сможете видеть запись ${userData.username} BePrime, а ваша больше не будет видна.`
		},
		'0': {
			title1: `Вы уверены, что хотите удалить пользователя ${userData.username} из списка ваших друзей?`,
			title2: `Вы больше не сможете видеть запись ${userData.username} BePrime, а ваша больше не будет видна.`
		},
		'2': { title1: '' },
		logout: {
			title1: 'Log out'
		}
	}
	return (
		<Modal
			animationType='fade'
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setModalVisible(!modalVisible)
			}}
		>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'rgba(0, 0, 0, 0.5)'
				}}
				className='px-6 z-[9999999]'
			>
				<View
					style={{
						width: '100%',
						borderRadius: 10,
						alignItems: 'center'
					}}
					className='bg-stone-800 px-10 py-8'
				>
					<Text className='text-white font-bold text-xl text-center'>
						{returnTextByStatus[userData.status]?.title1}
					</Text>
					{userData.status === '3' ||
						(userData.status === '0' && (
							<Text className='mt-2 text-white text-lg text-center'>
								{returnTextByStatus[userData.status]?.title2}
							</Text>
						))}
					<View className='flex-row justify-center mt-5'>
						<View className='flex-1 mr-6'>
							<StyledButton
								styles='close'
								onPress={() => setModalVisible(false)}
							>
								<Text className='text-white text-center font-bold text-xl'>
									Cancel
								</Text>
							</StyledButton>
						</View>
						<View className='flex-1'>
							<StyledButton styles='delete' onPress={() => handleAddFriend()}>
								{isLoading ? (
									<ActivityIndicator className='text-3xl' size={'large'} />
								) : (
									<Text className='text-white text-center font-bold text-xl'>
										Confirm
									</Text>
								)}
							</StyledButton>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	)
}
