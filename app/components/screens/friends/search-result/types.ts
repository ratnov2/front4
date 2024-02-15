import { ReactNode } from 'react'
import { TouchableOpacityProps } from 'react-native'

export interface ICustomFriendModal {
	modalVisible: boolean
	setModalVisible: (bool: boolean) => void
	text: { title1: string; title2?: string }
	isLoading?: boolean
	onConfirm: () => void
}

export interface IStyledButton extends TouchableOpacityProps {
	styles: 'close' | 'delete'
	children: ReactNode
}
