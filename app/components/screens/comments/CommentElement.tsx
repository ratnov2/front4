import { FC } from 'react'
import { Text, View } from 'react-native'

interface ICommentElement {
	message: string
	avatar: string
	created: string
}

export const CommentElement: FC<ICommentElement> = ({
	message,
	avatar,
	created
}) => {
	let date = new Date(created)

	return (
		<View className='my-6 max-w-[50%] ml-auto relative mr-2 flex-row '>
			<View className='bg-emerald-800  p-2 rounded-lg mr-2'>
				<Text className='color-white'>{message}</Text>
				<Text className='text-white'>{`${date.getMinutes()}/${date.getSeconds()}`}</Text>
			</View>
			<View className='bg-red-600 rounded-full w-10 h-10 flex-row justify-center items-center'>
				<Text className='text-white '>A</Text>
			</View>
		</View>
	)
}
