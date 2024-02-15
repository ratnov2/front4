import { ProfileService } from '@/services/profile/profile.service'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { IProfile } from '@/shared/types/profile.interface'
import { Link, useNavigation } from '@react-navigation/native'

interface IProfileHeader {
	user: UseQueryResult<IProfile, unknown>
}
export const ProfileHeader: FC<IProfileHeader> = ({ user }) => {
	const navigate = useNavigation()
	return (
		<View className='bg-transparent text-white justify-between flex-row  absolute top-2 left-0 right-0 mx-4 z-10 '>
			<Pressable onPress={() => navigate.goBack()}>
				<FontAwesome name='long-arrow-left' size={24} color='white' />
			</Pressable>
			<Text className='text-white '>{user.data?.email}</Text>
			<Link to={'/Settings'}>
				<Entypo name='dots-three-vertical' size={24} color='white' />
			</Link>
		</View>
	)
}
