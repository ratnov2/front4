import { FC } from 'react'
import { Image, Text } from 'react-native'
import { View } from 'react-native'

interface IEmodziComment {
	style?: string
}

export const EmodziComment: FC<IEmodziComment> = ({ style = '' }) => {
	return (
		<View className={`mt-4 ${style} `}>
			<View className='flex-row'>
				{emodzi.map((emodzi, key) => (
					<View key={key} className='text-center mr-8 ml-2'>
						<View className='relative '>
							<Image
								source={{ uri: emodzi.source }}
								className='w-14 h-14 rounded-full'
							/>
							{/* emodzi */}
						</View>
						<Text className='mt-2 text-white text-center font-bold'>
							{emodzi.firstName}
						</Text>
					</View>
				))}
			</View>
			<Devider style='mt-4' />
		</View>
	)
}

interface IDevider {
	style?: string
}

export const Devider: FC<IDevider> = ({ style = '' }) => {
	return <View className={`w-full bg-zinc-700 h-[0.5px] ${style}`} />
}

const emodzi = [
	{
		firstName: 'hello',
		source:
			'https://fonoteka.top/uploads/posts/2022-09/1663777799_5-phonoteka-org-p-emodzhi-bez-fona-instagram-13.jpg'
	},
	{
		firstName: 'hello',
		source:
			'https://fonoteka.top/uploads/posts/2022-09/1663777799_5-phonoteka-org-p-emodzhi-bez-fona-instagram-13.jpg'
	},
	{
		firstName: 'hello',
		source:
			'https://fonoteka.top/uploads/posts/2022-09/1663777799_5-phonoteka-org-p-emodzhi-bez-fona-instagram-13.jpg'
	},
	{
		firstName: 'hello',
		source:
			'https://fonoteka.top/uploads/posts/2022-09/1663777799_5-phonoteka-org-p-emodzhi-bez-fona-instagram-13.jpg'
	}
]
