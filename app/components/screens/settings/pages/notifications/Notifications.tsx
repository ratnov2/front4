import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const Notifications = () => {
	const insets = useSafeAreaInsets()
	return (
		<View
			style={{ marginTop: insets.top + 50 }}
			className='mx-2 relative flex-1'
		>
			<TouchableOpacity className='bg-zinc-800 p-4 rounded-2xl mt-4 absolute bottom-[10px] w-full'>
				<Text className='text-white font-bold text-center'>Save</Text>
			</TouchableOpacity>
		</View>
	)
}
