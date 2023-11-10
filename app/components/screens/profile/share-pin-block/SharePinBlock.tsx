import { PinBlock } from '@/entities/profile'
import { IProfile } from '@/shared/types/profile.interface'
import { FC } from 'react'
import { Text, View } from 'react-native'

interface ISharePinBlock {
	user: IProfile
}

export const SharePinBlock: FC<ISharePinBlock> = ({ user }) => {
	return (
		<View>
			<View className='flex-row justify-between my-4 items-center'>
				<Text className='text-white text-2xl font-bold'>Pins</Text>
				<Text className=' text-gray-500'>Visible to your friends</Text>
			</View>
			<View>
				<View className='flex-row justify-between'>
					<PinBlock img={user.favoritePhotos.photoOne} pin='photoOne' />
					<PinBlock img={user.favoritePhotos.photoTwo} pin='photoTwo' />
					<PinBlock img={user.favoritePhotos.photoThree} pin='photoThree' />
				</View>
			</View>
		</View>
	)
}
