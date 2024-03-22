import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import { FC } from 'react'
import { Image, Pressable, Text } from 'react-native'
import { View } from 'react-native'
import { TReaction, reactionsData2 } from '../home/element-photo/ElementPhoto'

interface IEmodziComment {
	style?: string
	reactionsData: {
		userId: string
		reactionType: TReaction
		avatar: string
	}[]
}

export const EmodziComment: FC<IEmodziComment> = ({
	style = '',
	reactionsData
}) => {
	return (
		<View className={`mt-4 ${style} `}>
			<View className='flex-row'>
				{reactionsData.map((reaction, key) => (
					<Pressable className='relative' key={key}>
						<Image
							width={55}
							height={55}
							source={{ uri: BaseImageUrl2(reaction?.avatar) }}
							className='rounded-full'
						/>
						<Text className='absolute bottom-0 -right-1'>
							{reactionsData2[reaction.reactionType]}
						</Text>
					</Pressable>
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
