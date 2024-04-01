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
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.')
					setModalVisible(!modalVisible)
				}}
			>
				<View className='bg-red-400  flex-1 justify-center items-center'>
					<View className='flex-1 w-full bg-black px-10 '>
						<Pressable
							onPress={() => setModalVisible(!modalVisible)}
							className='flex-1'
						>
							<View className='h-[15%] items-center' style={{ marginTop: top }}>
								<Text className='text-white font-bold text-xl'>
									{user && text(user?.calendarPhotos[modalImg]?.created || '')}
								</Text>
								<Text className='text-white/70 text-base -mt-1'>
									{normalDate(user?.calendarPhotos[modalImg]?.created || '')}
								</Text>
							</View>
							<View className='flex-1 bg-white rounded-2xl overflow-hidden border-2 border-white'>
								<ImageBackground
									className='h-full w-full rounded-2xl'
									source={{
										uri: BaseImageUrl2(
											user?.calendarPhotos[modalImg]?.photos?.frontPhoto
												?.photo ||
												user?.calendarPhotos[modalImg]?.photos?.backPhoto
													?.photo ||
												''
										)
									}}
								/>
							</View>
						</Pressable>
						{'params' && (
							<View className='text-center h-[25%]'>
								<Pressable
									className='border-2  m-auto p-3 rounded-2xl bg-white w-full'
									onPress={() =>
										updateFavoritePhoto.mutate({
											key: 'photoOne',
											photo:
												user?.calendarPhotos[modalImg].photos.frontPhoto
													?.photo ||
												user?.calendarPhotos[modalImg].photos.backPhoto
													?.photo ||
												'',
											created:
												user?.calendarPhotos[modalImg].photos.frontPhoto
													?.created ||
												user?.calendarPhotos[modalImg].photos.backPhoto
													?.created ||
												''
										})
									}
								>
									{!updateFavoritePhoto.isLoading ? (
										<Text className='text-center text-xl font-bold'>
											Pin photo
										</Text>
									) : (
										<View className=''>
											{/* <SvgUri width={100} height={100} uri={infinitySvg} /> */}
											{/* <Image source={infinitySvg} /> */}
											<Text className='text-center text-xl font-bold '>
												Loading...
											</Text>
										</View>
									)}
								</Pressable>
							</View>
						)}
					</View>
				</View>
			</Modal>
			{user && (
				<View>
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
								const crYear = calDPh.getFullYear()
								const crMonth = calDPh.getMonth()
								const crDay = calDPh.getDate()
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
								<View key={key}>
									<View>
										<Text className='text-white text-center text-2xl'>
											{el.month}
										</Text>
									</View>
									<View className='flex-row flex-wrap justify-around '>
										{el.array.map((el, key) => {
											return (
												<View
													key={key}
													className='w-[40px] h-[50px] flex items-center justify-center rounded-lg mx-1 my-1'
												>
													{el.photo !== -1 ? (
														<View className='border-[1px] rounded-lg border-white'>
															<Pressable
																onPress={() => {
																	setModalImg(el.photo)
																	setModalVisible(true)
																}}
															>
																<Image
																	width={40}
																	height={50}
																	className='rounded-lg'
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
																<Text className='absolute left-3 top-4 text-white'>
																	{el.day}
																</Text>
															</Pressable>
														</View>
													) : (
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
