import { TypeFeatherIconNames } from '@/shared/types/icons.types'
import { PressableProps } from 'react-native'

export interface IButton extends PressableProps {
	className?: string
	icon?: TypeFeatherIconNames
}
