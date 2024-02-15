import { FC } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export const ModalButton: FC<{
	setModalVisible: () => void
	text: string
	bg?: string
}> = ({ setModalVisible, text, bg = '' }) => {
	return (
		<TouchableOpacity
			onPress={setModalVisible}
			className={`bg-red-800 p-2 rounded-full uppercase ${bg}`}
		>
			<Text className='text-white font-bold'>{text}</Text>
		</TouchableOpacity>
	)
}
