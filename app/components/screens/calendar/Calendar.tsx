import { LayoutLightOpacity } from '@/navigation/ui/LayoutLightOpacity'
import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import {
	ProfileService,
	TypeUpdateFavoritePhoto
} from '@/services/profile/profile.service'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import {
	Alert,
	Image,
	Modal,
	Pressable,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { text } from '../calendarTask/CalendarTask'
import { ImageBackground } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { normalDate } from '../comments/CommentElement'
import { IProfile } from '@/shared/types/profile.interface'

export const Calendar = () => {
	const queryClient = useQueryClient()
	const user = queryClient.getQueryData(['get-profile']) as IProfile | undefined //@TASK
	const { navigate } = useNavigation<any>()
	let daysInMonth = function (date: Date) {
		return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate()
	}

	const { top } = useSafeAreaInsets()
	const updateFavoritePhoto = useMutation(
		['update-favorite-photo-calendar'],
		(data: TypeUpdateFavoritePhoto) => ProfileService.updateFavoritePhoto(data),
		{
			onSuccess: dataRes => {
				queryClient.refetchQueries(['get-profile'])
				setModalVisible(false)
				//@ts-ignore
				navigate(`Profile`)
			}
		}
	)
	const [modalVisible, setModalVisible] = useState(false)
	const [modalImg, setModalImg] = useState(0)
	return (
		<LayoutLightOpacity
			title='Your Memories'
			onGoBack={() => navigate('Profile')}
			padding='px-2'
		>
			{user && (
				<View className='justify-center'>
					{(() => {
						const calendarPhotos = user.calendarPhotos
						let date = new Date()
						let beginDate = new Date(user.createdAt)

						let getUserDate = new Date(
							user.calendarPhotos[user.calendarPhotos.length - 1]?.created
						)
						const lateYear = getUserDate?.getFullYear()
						const lateMonth = getUserDate?.getMonth()
						const lateDay = getUserDate?.getDate()
						let endDate = new Date(+lateYear, +lateMonth + 1, 1)

						let i = 0
						let k = 0
						beginDate.setDate(1)
						let dateMassive = []
						while (
							beginDate.getFullYear() < endDate.getFullYear() ||
							beginDate.getMonth() < endDate.getMonth()
						) {
							let obj: {
								month: string
								array: { day: number; photo: number }[]
							} = {
								month: '',
								array: []
							}
							let days = daysInMonth(beginDate)
							let beginWhile = 1

							while (beginWhile <= days) {
								const calDPh = new Date(calendarPhotos[k]?.created)
								const nextDate = new Date(calendarPhotos[k + 1]?.created)
								let crYear = calDPh.getFullYear()
								let crMonth = calDPh.getMonth()
								let crDay = calDPh.getDate()
								if (
									nextDate.getDate() === crDay &&
									nextDate.getMonth() === crMonth &&
									nextDate.getFullYear() === crYear
								) {
									crYear = nextDate.getFullYear()
									crMonth = nextDate.getMonth()
									crDay = nextDate.getDate()
									k++
								}
								if (beginDate.getDate() === 1) {
									obj.month = beginDate.toLocaleString('default', {
										month: 'long'
									})
								}
								if (
									beginDate.getDate() === crDay &&
									beginDate.getMonth() === crMonth &&
									beginDate.getFullYear() === crYear
								) {
									let newObj = {
										photo: k,
										day: beginDate.getDate()
									}
									obj.array.push(newObj)
									k++
								} else {
									let newObj = {
										photo: -1,
										day: beginDate.getDate()
									}
									obj.array.push(newObj)
								}

								beginWhile++
								beginDate.setDate(beginDate.getDate() + 1)
							}
							dateMassive.push(obj)

							i++
						}
						return dateMassive.map((el, key) => {
							return (
								<View key={key} className=''>
									<View>
										<Text className='text-white text-center text-2xl'>
											{el.month}
										</Text>
									</View>
									<View className='flex-row flex-wrap justify-center'>
										{el.array.map((el, key) => {
											return (
												<View
													key={key}
													className='w-[40px] h-[50px] flex items-center justify-center mx-1 my-1'
												>
													{el.photo !== -1 ? (
														// <View className='border-[1px] rounded-lg border-white bg-orange-700'>
														<TouchableOpacity
															onPress={() => {
																navigate('SwiperPhotos', {
																	created: calendarPhotos[el.photo].created
																})
															}}
															className='relative flex-1 w-[40px] h-[50px] justify-center '
														>
															<View className='absolute left-0 top-0 rounded-lg border-[1px] border-white overflow-hidden'>
																<Image
																	width={40}
																	height={50}
																	className=''
																	source={{
																		uri: BaseImageUrl2(
																			calendarPhotos[el.photo].photos.frontPhoto
																				?.photo ||
																				calendarPhotos[el.photo].photos
																					.backPhoto?.photo ||
																				''
																		)
																	}}
																/>
															</View>
															<Text className='text-white text-center'>
																{el.day}
															</Text>
														</TouchableOpacity>
													) : (
														// </View>
														// </View>
														<Text className='text-white text-lg'>{el.day}</Text>
													)}
												</View>
											)
										})}
									</View>
								</View>
							)
						})
					})()}
					{}
					{/* {user.data?.calendarPhotos.map((el, key) => {
					const [crYear, crMonth, crDay] = el.created.split('_')
					if (key === 0) {
						if (Number(crDay) > 1) {

						}
					}
					return (
						<View>
							<Text className='text-white'>fw</Text>
						</View>
					)
				})} */}
				</View>
			)}
		</LayoutLightOpacity>
	)
}

let fillDays = (day: number, length: number) => {
	// for (let i = 0; i < length; i++) {

	// }
	return <Text>{day}</Text>
}
