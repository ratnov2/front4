import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import { FC } from 'react'
import { Image, Text, View } from 'react-native'

interface IUserAvatar {
	avatar?: string
	firstName?: string
}

export const UserAvatar: FC<IUserAvatar> = ({ avatar, firstName }) => {
	return (
		<>
			{avatar ? (
				<Image
					source={{ uri: BaseImageUrl2(avatar) }}
					width={29}
					height={29}
					className='rounded-full'
				/>
			) : (
				<View className='bg-red-600 rounded-full p-[15px] relative'>
					<Text className='text-white uppercase font-bold text-base absolute left-[9.5px] top-[2px]'>
						{(firstName || 'anonym')[0]}
					</Text>
				</View>
			)}
		</>
	)
}
