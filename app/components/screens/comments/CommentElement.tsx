import { UserAvatar } from '@/ui/user-avatar/UserAvatar'
import { useNavigation } from '@react-navigation/native'
import { FC, memo } from 'react'
import { Pressable, Text, Touchable, View } from 'react-native'
import { ImgAvatar } from '../profile/other-user/OtherUserProfile'
import { useQuery } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'

interface ICommentElement {
	message: string
	avatar: string
	created: string
	email: string
	firstName: string
	id: string
	isLoading: boolean
}

export const CommentElement: FC<ICommentElement> = memo(
	({ message, avatar, created, email, firstName, id, isLoading }) => {
		const { navigate } = useNavigation<any>()
		return (
			<View className='my-6 relative mr-10 flex-row'>
				<Pressable onPress={() => navigate('Profile', { id })}>
					<ImgAvatar avatar={avatar} size='small-photo' />
				</Pressable>
				<View className='pl-2 rounded-lg mr-2'>
					<View className='flex-row text-center'>
						<Text className='color-white font-bold mb-0.5'>
							{email || 'Anonym'}
						</Text>
						<Text className='text-neutral-700 text-xs text-bold ml-2 '>
							{!isLoading ? normalDate(created) : 'Loading'}
						</Text>
					</View>
					<Text className='color-white mb-1'>{message}</Text>
				</View>
			</View>
		)
	}
)
export const normalDate = (date: string) => {
	const commentDate = new Date(date)
	const hours = commentDate.getHours()
	const minutes = commentDate.getMinutes()
	const seconds = commentDate.getSeconds()
	return `${hours < 10 ? `0${hours}` : hours} : ${
		minutes < 10 ? `0${minutes}` : minutes
	} : ${seconds < 10 ? `0${seconds}` : seconds}`
}
