import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { LayoutLight } from '@/navigation/ui/LayoutLight'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ItemView, ItemViewWithSwitch } from '../privacy/Privacy'
import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'

type IAbout = NativeStackScreenProps<TypeRootStackParamList, 'About'>

export const About: FC<IAbout> = ({ navigation }) => {
	return (
		<LayoutLight
			onGoBack={() => navigation.navigate('Settings')}
			title='Notifications'
		>
			<ItemView
				icon={<Ionicons name='document-text' size={24} color='white' />}
				title='Terms of Service'
			/>
			<ItemView
				icon={<Ionicons name='document-text' size={24} color='white' />}
				title='Privacy Police'
			/>
			<ItemView
				icon={<Entypo name='suitcase' size={24} color='white' />}
				title='Join us'
			/>
			<TouchableOpacity className='bg-zinc-800 p-4 rounded-2xl mt-4 w-full'>
				<Text className='text-white font-bold text-center'>Save</Text>
			</TouchableOpacity>
		</LayoutLight>
	)
}
