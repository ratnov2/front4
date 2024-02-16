import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { LayoutLight } from '@/navigation/ui/LayoutLight'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ItemView, ItemViewWithSwitch } from '../privacy/Privacy'
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons'

type IHelp = NativeStackScreenProps<TypeRootStackParamList, 'Help'>

export const Help: FC<IHelp> = ({ navigation }) => {
	return (
		<LayoutLight
			onGoBack={() => navigation.navigate('Settings')}
			title='Notifications'
		>
			<ItemView
				icon={<AntDesign name='questioncircle' size={24} color='white' />}
				title='Help Center'
			/>
			<ItemView
				icon={<AntDesign name='mail' size={24} color='white' />}
				title='Contact us'
			/>
			<TouchableOpacity className='bg-zinc-800 p-4 rounded-2xl mt-4 w-full'>
				<Text className='text-white font-bold text-center'>Save</Text>
			</TouchableOpacity>
		</LayoutLight>
	)
}
