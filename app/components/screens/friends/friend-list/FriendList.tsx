import { TouchableOpacity, View } from 'react-native'

export const FriendList = () => {
	return (
		<View
			className='bg-slate-800 rounded-full p-2 flex-row justify-between items-center z-40'
			style={{
				alignSelf: 'center',
				position: 'absolute',
				bottom: insets.bottom
			}}
		>
			<TouchableOpacity
				className={`${
					typeFriend === 'suggestion' && 'bg-slate-500'
				} p-2 rounded-full`}
				onPress={() => setTypeFriend('suggestion')}
			>
				<Text className='text-white'>Suggestion</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className={`${
					typeFriend === 'friends' && 'bg-slate-500'
				} p-2 rounded-full ml-1`}
				onPress={() => setTypeFriend('friends')}
			>
				<Text className='text-white'>Friends</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className={`${
					typeFriend === 'requests' && 'bg-slate-500'
				} p-2 rounded-full ml-1`}
				onPress={() => setTypeFriend('requests')}
			>
				<Text className='text-white'>Requests</Text>
			</TouchableOpacity>
		</View>
	)
}
