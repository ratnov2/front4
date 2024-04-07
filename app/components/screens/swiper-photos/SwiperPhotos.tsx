import { IProfile } from '@/shared/types/profile.interface'
import { useQuery } from '@tanstack/react-query'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Gesture } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'
import Swiper from 'react-native-swiper'
import { Draggable } from '../home/Draggable/Draggable'
import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import { LayoutOpacityComment } from '@/navigation/ui/LayoutOpacityCommenrSwiper'
export const SwiperPhotos = () => {
	const { params } = useRoute<any>()
	const [initIndex, setInitIndex] = useState<null | number>(null)
	const [currentIndex, setCurrentIndex] = useState(initIndex)
	useEffect(() => {
		const calendarPhotos = user.data?.calendarPhotos
		if (calendarPhotos) {
			for (let i = 0; i < calendarPhotos?.length || 0; i++) {
				if (calendarPhotos[i].created === params?.created) {
					setInitIndex(i)
					return setCurrentIndex(i)
				}
			}
		}
	}, [])
	const user = useQuery<IProfile>(['get-profile'])

	return (
		<>
			{initIndex !== null && currentIndex !== null ? (
				<Swiper
					loop={false}
					index={initIndex}
					onIndexChanged={index => setCurrentIndex(index)}
				>
					{user.data?.calendarPhotos.map(photo => (
						<LayoutOpacityComment
							created={photo.created}
							key={photo.created}
							index={currentIndex}
						>
							<ScrollView className='mx-2'>
								<HeaderComponent
									frontPhoto={photo.photos.frontPhoto?.photo || ''}
									backPhoto={photo.photos.backPhoto?.photo || ''}
								/>
							</ScrollView>
						</LayoutOpacityComment>
					))}
				</Swiper>
			) : (
				<View></View>
			)}
		</>
	)
}
const styles = StyleSheet.create({
	box: {
		height: 120,
		width: 120,
		backgroundColor: '#b58df1',
		borderRadius: 20,
		marginBottom: 30,
		position: 'absolute'
	}
})
