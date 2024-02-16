import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { LayoutLight } from '@/navigation/ui/LayoutLight'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type INotifications = NativeStackScreenProps<
	TypeRootStackParamList,
	'Notifications'
>

export const Notifications: FC<INotifications> = ({ navigation }) => {
	return (
		<View className='flex-1 relative'>
			<LayoutLight
				onGoBack={() => navigation.navigate('Settings')}
				title='Notifications'
			>
				<View className='bg-white'>
					<Text>wefewf</Text>
				</View>
			</LayoutLight>
			<TouchableOpacity className='bg-zinc-800 p-4 rounded-2xl mt-4 absolute bottom-[10px] w-full'>
				<Text className='text-white font-bold text-center'>Save</Text>
			</TouchableOpacity>
		</View>
		// <LayoutLight
		// 	onGoBack={() => navigation.navigate('Settings')}
		// 	title='Notifications'
		// >
		// 	<View className='bg-white flex-1'></View>
		// 	<TouchableOpacity className='bg-zinc-800 p-4 rounded-2xl mt-4 absolute bottom-[0px] w-full'>
		// 		<Text className='text-white font-bold text-center'>Save</Text>
		// 	</TouchableOpacity>
		// </LayoutLight>
	)
}
