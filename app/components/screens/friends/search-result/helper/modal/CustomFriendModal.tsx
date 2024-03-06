import { FC } from 'react'
import { ActivityIndicator, Modal, Text, View } from 'react-native'
import { ICustomFriendModal } from '../../types'
import { StyledButton } from '../../StyledButton'

export const CustomModal: FC<ICustomFriendModal> = ({
	modalVisible,
	setModalVisible,
	text,
	isLoading = false,
	onConfirm
}) => {
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
						{text.title1}
					</Text>
					{text.title2 && (
						<Text className='mt-2 text-white text-lg text-center'>
							{text.title2}
						</Text>
					)}
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
							<StyledButton styles='delete' onPress={() => onConfirm()}>
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
