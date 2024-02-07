import { Image, Pressable, Text, View } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { Entypo } from '@expo/vector-icons'
import { shareProfile } from '@/ui/share-profile/ShareProfile'
import { WithShareProfile } from '@/ui/share-profile/WithShareProfile'

export const Invite = () => {
	const { user } = useAuth()
	return (
		<View className='mt-4 bg-zinc-800 px-4 py-4 rounded-2xl flex-row'>
			<View>
				{user?.avatar ? (
					<Image className='w-14 h-14' source={{ uri: user?.avatar }} />
				) : (
					<View className='bg-red-600 w-12 h-12 rounded-full flex-row justify-center items-center'>
						<Text className='text-white'>{user?.firstName[0] || 'A'}</Text>
					</View>
				)}
			</View>
			<View className='flex-row justify-between flex-1 items-center ml-4 '>
				<View className='h-12 justify-between '>
					<Text className='text-white font-bold text-base'>
						Invite freinds on BeReal
					</Text>
					<Text className='text-white font-medium text-base'>{`bere.al/${user?.email.split(
						'@'
					)[0]}`}</Text>
				</View>
				<WithShareProfile>
					<Entypo name='share' size={28} color='white' />
				</WithShareProfile>
			</View>
		</View>
	)
}
