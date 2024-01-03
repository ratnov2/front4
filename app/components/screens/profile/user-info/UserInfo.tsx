import { IProfile } from '@/shared/types/profile.interface'
import { Entypo } from '@expo/vector-icons'
import { Link } from '@react-navigation/native'
import { FC } from 'react'

import { Text, TouchableOpacity, View } from 'react-native'
// import * as Sharing from 'expo-sharing'
import { Share } from 'react-native'
interface IUserInfo {
	user: IProfile
}
const getProfileLink = (userId: string) => {
	// Здесь должен быть ваш код для формирования ссылки на профиль
	return `https://example.com/profile/${userId}`
}

export const UserInfo: FC<IUserInfo> = ({ user }) => {
	const shareProfile = async (userId: string) => {
		try {
			const profileLink = getProfileLink(userId)
			await Share.share({
				title: 'App link',
				message: 'Message + link: https://sparc.world',
				url: 'https://sparc.world'
			})
		} catch (error: any) {
			console.error('Ошибка при попытке поделиться:', error.message)
		}
	}

	return (
		<View>
			<View className='w-20 h-20 rounded-full bg-red-600 flex justify-center items-center color-white'>
				{/* <Link to={'/Home'} className='bg-red-300'> */}
				<Text className='text-white uppercase font-bold text-3xl '>
					{(user.firstName || 'anonym')[0]}
				</Text>
				{/* </Link> */}
			</View>
			<View className='flex-row justify-between items-center mt-4'>
				<Link to={'/EditProfile'} className='bg-red-300'>
					<Text className='text-white text-5xl font-bold'>
						{user.firstName || 'anonym'}
					</Text>
				</Link>
				<TouchableOpacity
					onPress={() => shareProfile('123')}
					className='bg-white rounded-full h-10 w-10 flex justify-center items-center '
				>
					<Entypo name='share' size={24} color='black' />
				</TouchableOpacity>
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
