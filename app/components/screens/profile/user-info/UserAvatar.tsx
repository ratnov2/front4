import { BaseImageUrl, BaseImageUrl2 } from '@/services/api/interceptors.api'
import { IProfile } from '@/shared/types/profile.interface'
import { Entypo } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

interface IUserAvatar {
	user: IProfile
	isSetImg?: () => void
}
interface IUserAvatar2 {
	user: IProfile
	isSetImg?: () => void
	chooseAvatar?: string
}

export const UserAvatar: FC<IUserAvatar> = ({ user, isSetImg = undefined }) => {
	return (
		<Pressable className='w-24 h-24 rounded-full bg-red-600 flex justify-center items-center color-white relative'>
			{/* <Link to={'/Home'} className='bg-red-300'> */}
			{user.avatar ? (
				<Image
					source={{ uri: BaseImageUrl2(user.avatar) }}
					width={100}
					height={100}
					className='rounded-full'
				/>
			) : (
				<Text className='text-white uppercase font-bold text-3xl '>
					{(user.firstName || 'anonym')[0]}
				</Text>
			)}
		</Pressable>
	)
}

export const UserAvatar2: FC<IUserAvatar2> = ({
	user,
	isSetImg = undefined,
	chooseAvatar
}) => {
	return (
		<Pressable
			onPress={isSetImg}
			className='w-24 h-24 rounded-full bg-red-600 flex justify-center items-center color-white relative mx-auto'
		>
			{/* <Link to={'/Home'} className='bg-red-300'> */}
			{chooseAvatar ? (
				<Image
					source={{ uri: chooseAvatar }}
					width={100}
					height={100}
					className='rounded-full'
				/>
			) : (
				<Text className='text-white uppercase font-bold text-3xl '>
					{(user.firstName || 'anonym')[0]}
				</Text>
			)}
			{isSetImg && (
				<Pressable className='absolute bottom-0 right-0 bg-white rounded-full p-2'>
					<Entypo name='camera' size={12} color='black' />
				</Pressable>
			)}
		</Pressable>
	)
}
