import { IProfile } from '@/shared/types/profile.interface'
import { shareProfile } from '@/ui/share-profile/ShareProfile'
import { WithShareProfile } from '@/ui/share-profile/WithShareProfile'
import { Entypo } from '@expo/vector-icons'
import { Link } from '@react-navigation/native'
import { FC } from 'react'

import { Text, TouchableOpacity, View } from 'react-native'
// import * as Sharing from 'expo-sharing'
import { Share } from 'react-native'
import { UserAvatar } from './UserAvatar'
interface IUserInfo {
	user: IProfile
}

export const UserInfo: FC<IUserInfo> = ({ user }) => {
	return (
		<View>
			<UserAvatar user={user} />
			<View className='flex-row justify-between items-center mt-4'>
				<Link to={'/EditProfile'} className='bg-red-300'>
					<Text className='text-white text-5xl font-bold'>
						{user.firstName || 'anonym'}
					</Text>
				</Link>
				<WithShareProfile>
					<View className='bg-white rounded-full h-10 w-10 flex justify-center items-center '>
						<Entypo name='share' size={24} color='black' />
					</View>
				</WithShareProfile>
			</View>
		</View>
	)
}

export const JoinedDate = (date: string) => {
	//@TASK
	const normalDate = new Date(date)
	const currentDate = new Date()

	let differenceMonth =
		(currentDate.getFullYear() - normalDate.getFullYear()) * 12

	differenceMonth -= normalDate.getMonth()
	differenceMonth += currentDate.getMonth()
	console.log(differenceMonth)

	if (
		normalDate.getFullYear() === currentDate.getFullYear() &&
		differenceMonth === 0
	) {
		return 'You joined BePrime in current month'
	} else if (differenceMonth >= 1 && differenceMonth <= 12) {
		return `You joined BePrime ${differenceMonth} month ago`
	} else {
		const differenceYear = currentDate.getFullYear() - normalDate.getFullYear()
		return `You joined BePrime ${differenceYear} year and ${
			differenceMonth % 12
		} month ago`
	}
}
