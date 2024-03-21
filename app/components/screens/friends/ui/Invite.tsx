import { Image, Pressable, Text, View } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { Entypo } from '@expo/vector-icons'
import { shareProfile } from '@/ui/share-profile/ShareProfile'
import { WithShareProfile } from '@/ui/share-profile/WithShareProfile'
import { ImgAvatar } from '../../profile/other-user/OtherUserProfile'
import { useQueryClient } from '@tanstack/react-query'

export const Invite = () => {
	const queryClient = useQueryClient()
	const userQuery = queryClient.getQueryData(['get-profile']) as any
	return (
		<View className='mt-4 bg-zinc-800 px-4 py-4 rounded-2xl flex-row'>
			<View>
				<ImgAvatar
					avatar={userQuery.avatar}
					size='friends-pal'
					name={userQuery.firstName}
				/>
			</View>
			<View className='flex-row justify-between flex-1 items-center ml-4 '>
				<View className='h-12 justify-between '>
					<Text className='text-white font-bold text-base'>
						Invite freinds on BeReal
					</Text>
					<Text className='text-white font-medium text-base'>{`bere.al/${userQuery?.email.split(
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
