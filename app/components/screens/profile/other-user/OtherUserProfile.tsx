import { useQuery } from '@tanstack/react-query'
import { Image, ImageBackground, Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import img from '@/assets/adaptive-icon.png'
import { LinearGradient } from 'expo-linear-gradient'

export const OtherUserProfile = () => {
	const user = useQuery([''], () => '')
	return (
		<View>
			<View className='z-10'>
				<ImageBackground
					style={{ aspectRatio: 1, position: 'relative' }}
					source={{
						uri: 'https://sun9-23.userapi.com/impf/c636420/v636420339/2f8/mEInMCYFfUI.jpg?size=640x512&quality=96&sign=34a9d640a547d663a0f0e55ef2aa4f40&c_uniq_tag=XAjjwBc58g9NQ16xv9-345VibwQmIFlYxdNvG9hr-DY&type=album'
					}}
				>
					<LinearGradient
						colors={['#00000000', '#111111']}
						style={{
							height: '50%',
							width: '100%',
							position: 'absolute',
							bottom: 0
						}}
					></LinearGradient>
					<LinearGradient
						colors={['#111111','#00000000', ]}
						style={{
							height: '25%',
							width: '100%',
							position: 'absolute',
							top: 0
						}}
					></LinearGradient>
					<View style={{ position: 'absolute', bottom: 20, left: 20 }}>
						<Text className='text-3xl text-white font-bold'>wwlefnkewnfef</Text>
					</View>
				</ImageBackground>
				<TouchableOpacity className='flex-row justify-center mt-4 bg-white p-4 rounded-2xl'>
					<Text className='font-bold text-2xl mr-2'>+</Text>
					<Text className='font-bold text-2xl'>Add Friend</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
