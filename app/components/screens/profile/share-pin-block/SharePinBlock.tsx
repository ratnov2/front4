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
					<PinBlock
						photos={{
							frontPhoto: user.favoritePhotos.photoOne?.frontPhoto || '',
							backPhoto: user.favoritePhotos.photoOne?.backPhoto || ''
						}}
						pin='photoOne'
						created={user.favoritePhotos.photoOne?.created || ''}
					/>
					<PinBlock
						photos={{
							frontPhoto: user.favoritePhotos.photoTwo?.frontPhoto || '',
							backPhoto: user.favoritePhotos.photoTwo?.backPhoto || ''
						}}
						pin='photoTwo'
						created={user.favoritePhotos.photoTwo?.created || ''}
					/>
					<PinBlock
						photos={{
							frontPhoto: user.favoritePhotos.photoThree?.frontPhoto || '',
							backPhoto: user.favoritePhotos.photoThree?.backPhoto || ''
						}}
						pin='photoThree'
						created={user.favoritePhotos.photoThree?.created || ''}
					/>
				</View>
			</View>
		</View>
	)
}
