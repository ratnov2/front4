import { FC } from 'react'
import { Text, View } from 'react-native'

interface ICommentElement {
	message: string
	avatar: string
	created: string
	email: string
	firstName: string
}

export const CommentElement: FC<ICommentElement> = ({
	message,
	avatar,
	created,
	email,
	firstName
}) => {
	let date = new Date(created)

	return (
		<View className='my-6  relative mr-2 flex-row '>
			<View className='bg-red-600 rounded-full w-10 h-10 flex-row justify-center items-center'>
				<Text className='text-white '>{firstName[0] || 'A'}</Text>
			</View>
			<View className='pl-2 rounded-lg mr-2'>
				<View className='flex-row text-center'>
					<Text className='color-white font-bold mb-0.5 '>{email}</Text>
					<Text className='text-neutral-700 text-xs text-bold ml-2 '>{normalDate(created)}</Text>
				</View>
				<Text className='color-white mb-1'>{message}</Text> 
			</View>
		</View>
	)
}
const normalDate = (date: string) => {
	const commentDate = new Date(date)
	const hours = commentDate.getHours()
	const minutes = commentDate.getMinutes()
	const seconds = commentDate.getSeconds()
	return `${hours} : ${minutes} : ${seconds}`
}
