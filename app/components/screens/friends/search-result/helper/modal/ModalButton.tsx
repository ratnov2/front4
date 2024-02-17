import { FC, ReactNode } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export const ModalButton: FC<{
	setModalVisible: () => void
	text?: string
	style?: string
	children?: ReactNode
}> = ({ setModalVisible, text = '', style = '', children = undefined }) => {
	return (
		<TouchableOpacity
			onPress={setModalVisible}
			className={`bg-red-800 p-2 rounded-full uppercase ${style}`}
		>
			{children ? (
				children
			) : (
				<Text className='text-white font-bold text-center'>{text}</Text>
			)}
		</TouchableOpacity>
	)
}
