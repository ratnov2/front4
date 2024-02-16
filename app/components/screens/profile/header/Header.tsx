import { ProfileService } from '@/services/profile/profile.service'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { IProfile } from '@/shared/types/profile.interface'
import { Link, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TypeRootStackParamList } from '@/navigation/navigation.types'

interface IProfileHeader {
	user: UseQueryResult<IProfile, unknown>
	navigation: NativeStackNavigationProp<
		TypeRootStackParamList,
		'Profile',
		undefined
	>
}

export const ProfileHeader: FC<IProfileHeader> = ({ user, navigation }) => {
	return (
		<View className='bg-transparent text-white justify-between flex-row  absolute top-2 left-0 right-0 mx-4 z-10 '>
			<Pressable onPress={() => navigation.navigate('Profile')}>
				<FontAwesome name='long-arrow-left' size={24} color='white' />
			</Pressable>
			<Text className='text-white '>{user.data?.email}</Text>
			<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
				<Entypo name='dots-three-vertical' size={24} color='white' />
			</TouchableOpacity>
		</View>
	)
}
