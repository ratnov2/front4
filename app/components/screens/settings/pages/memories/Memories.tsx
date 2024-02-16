import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { LayoutLight } from '@/navigation/ui/LayoutLight'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type IMemories = NativeStackScreenProps<
	TypeRootStackParamList,
	'Memories_settings'
>

export const Memories: FC<IMemories> = ({ navigation }) => {
	const insets = useSafeAreaInsets()

	return (
		<LayoutLight
			onGoBack={() => navigation.navigate('Settings')}
			title='Memories'
		>
			<Text className='text-white text-2xl font-bold'>
				Your Memories are activated
			</Text>
			<Text className='text-white text-xl font-medium mt-4'>
				All your BeReal are automatically added to your Memories and only
				visible to you.
			</Text>
			<View className='mt-6 border-2 border-solid border-red-500 rounded-xl p-3 bg-red-500/5'>
				<Text className='text-white text-2xl font-bold'>
					Your Memories are activated
				</Text>
				<Text className='text-white text-base font-medium mt-2'>
					If you deactivate your Memories, all your BeReal will be permanently
					deleted and unrecoverable. All your future BeReal won't be saved in
					Memories and will be automatically deleted as well.
				</Text>
				<TouchableOpacity className='bg-zinc-800 p-4 rounded-2xl mt-4'>
					<Text className='text-red-500 font-bold '>
						Deactivate and delete Memories
					</Text>
				</TouchableOpacity>
			</View>
		</LayoutLight>
	)
}
