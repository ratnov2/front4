import { ProfileService } from '@/services/profile/profile.service'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
export const ProfileHeader: FC = () => {
	const user = useQuery(['get-profile'], () => ProfileService.getProfile())
	return (
		<View className='bg-transparent text-white justify-between flex-row  absolute top-2 left-0 right-0 mx-4'>
			<FontAwesome name='long-arrow-left' size={24} color='white' />
			<Text className='text-white '>{user.data?.email}</Text>
			<Entypo name='dots-three-vertical' size={24} color='white' />
		</View>
	)
}
