import { FC } from "react"
import { Text, TouchableOpacity } from "react-native"

export const ModalButton: FC<{
	setModalVisible: () => void
	text: string
}> = ({ setModalVisible, text }) => {
	return (
		<TouchableOpacity
			onPress={setModalVisible}
			className='bg-red-800 p-2 rounded-full uppercase'
		>
			<Text className='text-white font-bold'>{text}</Text>
		</TouchableOpacity>
	)
}