import { BaseImageUrl } from '@/services/api/interceptors.api'
import { FC, useRef } from 'react'
import { Animated, Image, View } from 'react-native'

interface IPhotoUser {
	photo: {
		comment: string
		photos: {
			backPhoto: {
				photo: string
			}
		}
	}
}

export const PhotoUser: FC<IPhotoUser> = ({ photo }) => {


	return (
		<View>
			<Image
				source={{ uri: `${BaseImageUrl}${photo.photos.backPhoto.photo}` }}
			/>
		</View>
	)
}
