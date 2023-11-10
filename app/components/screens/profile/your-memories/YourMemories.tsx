import { Text, View } from 'react-native'

export const YourMemories = () => {
	return (
		<View>
			<View className='flex-row justify-between items-center mt-6'>
				<Text className='text-white text-2xl font-bold'>Your memories</Text>
				<Text className='text-gray-500'>Only visible to you</Text>
			</View>
		</View>
	)
}
