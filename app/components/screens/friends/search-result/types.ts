import { ReactNode } from "react"
import { TouchableOpacityProps } from "react-native"

export interface ICustomFriendModal {
	modalVisible: boolean
	setModalVisible: (bool: boolean) => void
	userData: {
		username: string
		friendId: string
		status: '0' | '1' | '2' | '3'
	}
}

export interface IStyledButton extends TouchableOpacityProps {
	styles: 'close' | 'delete'
	children: ReactNode
}