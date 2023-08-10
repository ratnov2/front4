import { useAuth } from '@/hooks/useAuth'
import { AuthService } from '@/services/auth/auth.service'
import { FC } from 'react'
import { View, Text, Pressable } from 'react-native'

const Profile: FC = () => {
	const { setUser } = useAuth()

	return (
		<View className='mt-20 px-10'>
			<Pressable
				onPress={() => AuthService.logout().then(() => setUser(null))}
				className='opacity-40 items-center flex-row justify-end'
			>
				<Text className='text-white text-lg ml-2'>Logout</Text>
			</Pressable>
		</View>
	)
}

export default Profile
