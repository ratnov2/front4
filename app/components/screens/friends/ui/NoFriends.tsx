import { Text, View } from 'react-native'

export const NoFriend = () => (
	<View className='bg-zinc-900 p-5 rounded-2xl '>
		<Text className='text-white text-center mb-2 font-bold text-lg'>No pending requests</Text>
		<Text className='text-zinc-500 text-center text-base font-medium'>You dont have any pending requests</Text>
	</View>
)
