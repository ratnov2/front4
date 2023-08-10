import { FC } from 'react'
import { View, Text, Pressable } from 'react-native'
import { IMenuItem, TypeNavigate } from './bottom-menu.interface'
import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { Feather } from '@expo/vector-icons'
import { getColor } from '@/components/config/colors.config'

interface IMenuItemProps {
	item: IMenuItem
	nav: TypeNavigate
	currentRoute?: string
}

const MenuItem: FC<IMenuItemProps> = ({ item, nav, currentRoute }) => {
	const isActive = currentRoute === item.path

	return (
		<Pressable className='items-center w-[20%]' onPress={() => nav(item.path)}>
			<Feather
				name={item.iconName}
				size={26}
				color={isActive ? getColor('primary') : getColor('gray.400')}
			/>
		</Pressable>
	)
}

export default MenuItem
