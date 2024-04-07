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
	ImageBackground,
	Modal,
	Pressable,
	ScrollView,
	Text,
	View
} from 'react-native'
import { BaseImageUrl, BaseImageUrl2 } from '@/services/api/interceptors.api'
import { Camera, CameraType } from 'expo-camera'
import { LayoutLightOpacity } from '@/navigation/ui/LayoutLightOpacity'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { normalDate } from '../comments/CommentElement'
import { IProfile } from '@/shared/types/profile.interface'
import { Draggable } from '../home/Draggable/Draggable'
import { AntDesign } from '@expo/vector-icons'
import { NormalDate } from '@/navigation/ui/LayoutOpacityCommenrSwiper'
var days = [
	'Воскресенье',
	'Понедельник',
	'Вторник',
	'Среда',
	'Четверг',
	'Пятница',
	'Суббота'
]

export const text = (created: string) => {
	const date = new Date(created)
	return `${days[date.getDay()]}, ${date.getDate()} ${date.toLocaleString(
		'ru',
		{ month: 'long' }
	)} ${date.getFullYear()} г.`
}

export const CalendarTask = () => {
	const queryClient = useQueryClient()
	const user = useQuery<IProfile>(['get-profile'])
	const navigate = useNavigation<any>()
	let { params } = useRoute()
	const updateFavoritePhoto = useMutation(
		['update-favorite-photo-calendar'],
		(data: TypeUpdateFavoritePhoto) => ProfileService.updateFavoritePhoto(data),
		{
			onSuccess: () => {
				queryClient.refetchQueries(['get-profile'])
				setModalVisible(false)
				//@ts-ignore
				navigate.navigate(`Profile`, { pr: '' })
			}
		}
	)
	let daysInMonth = function (date: Date) {
		return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate()
	}

	const [modalVisible, setModalVisible] = useState(false)
	const [modalImg, setModalImg] = useState(0)
	const { top } = useSafeAreaInsets()
	return (
		<LayoutLightOpacity
			title='Pin Photo'
			onGoBack={() => navigate.navigate('Profile')}
			padding='px-2'
		>
			<Modal
				animationType='fade'
				visible={modalVisible}
				transparent={true}
				onRequestClose={() => {
					setModalVisible(!modalVisible)
				}}
			>
				<View className='flex-1 bg-black'>
					<ScrollView
						className='flex-1'
						showsVerticalScrollIndicator={false}
						bounces={false}
					>
						<View className='flex-1'>
							<Pressable className='flex-1'>
								<View
									className='flex-row  justify-between items-center mb-4'
									style={{ marginTop: top }}
								>
									<Pressable onPress={() => setModalVisible(!modalVisible)}>
										<AntDesign name='arrowleft' size={30} color='white' />
									</Pressable>
									<View className='items-center'>
										<NormalDate
											created={
												user.data?.calendarPhotos[modalImg].created || ''
											}
										/>
									</View>
									<View />
								</View>
								<View
									className='flex-1 rounded-2xl overflow-hidden border-2 border-white'
									style={{ aspectRatio: 9 / 12 }}
								>
									<Draggable
										img1={
											user.data?.calendarPhotos[modalImg].photos.frontPhoto
												?.photo || ''
										}
										img2={
											user.data?.calendarPhotos[modalImg].photos.backPhoto
												?.photo || ''
										}
										isVisibleElementsPhoto={true}
									/>
								</View>
							</Pressable>
							<View className='text-center flex-1 mt-5'>
								<Pressable
									className='border-2  m-auto p-3 rounded-2xl bg-white w-full'
									onPress={() =>
										updateFavoritePhoto.mutate({
											key:
												(params?.['pin' as keyof typeof params] as unknown as
													| 'photoOne'
													| 'photoTwo'
													| 'photoThree') || 'photoOne',
											backPhoto:
												user.data?.calendarPhotos[modalImg].photos.backPhoto
													?.photo || '',
											frontPhoto:
												user.data?.calendarPhotos[modalImg].photos.frontPhoto
													?.photo || '',
											created: user.data?.calendarPhotos[modalImg].created || ''
										})
									}
								>
									{!updateFavoritePhoto.isLoading ? (
										<Text className='text-center text-xl font-bold '>
											Pin photo
										</Text>
									) : (
										<View className=''>
											<Text className='text-center text-xl font-bold '>
												Loading...
											</Text>
										</View>
									)}
								</Pressable>
							</View>
						</View>
						<View className='h-4' />
					</ScrollView>
				</View>
			</Modal>
			{user.data && (
				<View>
					{(() => {
						const calendarPhotos = user.data.calendarPhotos
						let beginDate = new Date(user.data.createdAt)

						let getUserDate = new Date(
							user.data.calendarPhotos[
								user.data.calendarPhotos.length - 1
							]?.created
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

								//console.log(dateMassive);

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
									<View className='flex-row flex-wrap justify-around'>
										{el.array.map((el, key) => {
											return (
												<View
													key={key}
													className='w-[40px] h-[50px] flex items-center justify-center rounded-lg mx-1 my-1'
												>
													{el.photo !== -1 ? (
														<View className='border-[1px] rounded-lg  border-white'>
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
																			calendarPhotos[el.photo]?.photos
																				?.frontPhoto?.photo ||
																				calendarPhotos[el.photo]?.photos
																					?.frontPhoto?.photo ||
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
