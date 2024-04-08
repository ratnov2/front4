import {
	ProfileService,
	TypeUpdateFavoritePhoto
} from '@/services/profile/profile.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import clsx from 'clsx'
import { Link, useNavigation } from '@react-navigation/native'
import { BaseImageUrl, BaseImageUrl2 } from '@/services/api/interceptors.api'
import { ILatestPhoto, IPhotos } from '@/shared/types/profile.interface'
import { ImageBackground } from 'react-native'
import { normalDate } from '../../comments/CommentElement'
import { text } from '../../calendarTask/CalendarTask'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
declare global {
	interface Date {
		daysInMonth(): number
	}
} //@TASK
export const CalendarMin: FC = () => {
	const [modalVisible, setModalVisible] = useState(false)
	const [modalImg, setModalImg] = useState(0)
	const addDate = new Date()
	const { navigate } = useNavigation<any>()
	const user = useQuery(['get-profile'], () => ProfileService.getProfile(), {
		select: data => {
			const calendarPhotos = data.calendarPhotos.slice(-14)
			return { ...data, calendarPhotos }
		}
	})

	Date.prototype.daysInMonth = function () {
		return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate()
	}

	addDate.setDate(addDate.getDate() - 13)

	//console.log(user.data?.calendarPhotos);
	
	return (
		<View className='bg-zinc-900 rounded-xl p-4 mt-5'>
			<Text className='text-white mb-3 text-xl font-bold'>Last 14 days</Text>
			{user.data && (
				<View className='text-white flex-row w-full mx-[1px] flex-wrap justify-center'>
					{(() => {
						let photo: IPhotos[] = []
						photo = user.data.calendarPhotos
						let k = 0
						const realDate = new Date()
						while (k < 13) {
							let date = new Date(photo[k]?.created)
							const day = date.getDate()
							const month = date.getMonth()
							const year = date.getFullYear()
							if (
								addDate.getFullYear() >= year &&
								addDate.getMonth() >= month &&
								addDate.getDate() > day
							) {
								k++
							} else {
								break
							}
						}
						
					
						//photo.map(photo => console.log(JSON.stringify(photo.created)))
						return Array.from(Array(14)).map((_, key) => {
							const date = new Date(photo[k]?.created)
							let day = date.getDate()
							let month = date.getMonth()
							let year = date.getFullYear()

							let photoImg: number = k
							const nextDate = new Date(photo[k + 1]?.created)
							if (
								nextDate.getDate() === day &&
								nextDate.getFullYear() === year &&
								nextDate.getMonth() === month
							) {
								photoImg++
								k++
							}
							const provPhoto =
								month === addDate.getMonth() &&
								day === addDate.getDate() &&
								year === addDate.getFullYear()
							if (provPhoto) k++
							const currentDate = new Date()
							currentDate.setDate(currentDate.getDate() + key - 13)
							addDate.setDate(addDate.getDate() + 1)

							return (
								<View
									key={key}
									className={clsx(
										'w-10 rounded-lg items-center mb-5 h-10 flex justify-center mx-2',
										provPhoto && 'bg-white text-black'
									)}
								>
									{provPhoto ? (
										<Pressable
											onPress={() => {
												navigate('SwiperPhotos', {
													created: user.data?.calendarPhotos[photoImg].created
												})
											}}
											className='w-full h-full roundex-2xl relative flex justify-center'
										>
											<Image
												className='w-full h-full rounded-lg absolute'
												source={{
													uri: `${BaseImageUrl2(
														photo[photoImg]?.photos.frontPhoto?.photo || ''
													)}`
												}}
											/>
											<Text className='text-white text-xl text-center'>
												{currentDate.getDate()}
											</Text>
										</Pressable>
									) : (
										<View
											className={clsx(
												currentDate.getDate() === realDate.getDate() &&
													'bg-white rounded-full w-8 h-8 flex items-center justify-center'
											)}
										>
											<Text
												className={clsx(
													'text-white text-xl',
													currentDate.getDate() === realDate.getDate() &&
														'text-black '
												)}
											>
												{currentDate.getDate()}
											</Text>
										</View>
									)}
								</View>
							)
						})
					})()}
				</View>
			)}
			<View className='mb-2 align-middle mx-auto'>
				<Link to={'/Calendar'} className=''>
					<View className='p-3 rounded-lg border-2 border-white'>
						<Text className='text-white text-xl'>View all my memories</Text>
					</View>
				</Link>
			</View>
		</View>
	)
}
