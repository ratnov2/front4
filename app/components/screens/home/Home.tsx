import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Pressable, Text, View } from 'react-native'

const Home = () => {
	const { navigate } = useTypedNavigation()
	return (
		<View>
			<Text>Home</Text>
			<Pressable onPress={() => navigate('Auth')}>
				<Text className='text-white'>Go to Login2</Text>
			</Pressable>
		</View>
	)
}
export default Home
