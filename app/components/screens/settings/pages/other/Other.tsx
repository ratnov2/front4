import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { LayoutLight } from '@/navigation/ui/LayoutLight'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ItemView, ItemViewWithSwitch } from '../privacy/Privacy'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

type IOther = NativeStackScreenProps<TypeRootStackParamList, 'Other'>

export const Other: FC<IOther> = ({ navigation }) => {
	return (
		<LayoutLight
			onGoBack={() => navigation.navigate('Settings')}
			title='Notifications'
		>
			<ItemView
				icon={<Entypo name='squared-cross' size={24} color='white' />}
				title='Clear cache'
			/>
			<ItemViewWithSwitch
				icon={<MaterialIcons name='vibration' size={24} color='white' />}
				title='Enable haptic feedback'
			/>
			<TouchableOpacity className='bg-zinc-800 p-4 rounded-2xl mt-4 w-full'>
				<Text className='text-white font-bold text-center'>Save</Text>
			</TouchableOpacity>
		</LayoutLight>
	)
}
