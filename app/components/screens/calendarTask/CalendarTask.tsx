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
	const user = useQuery(['get-user-profile'], () => ProfileService.getProfile()) //@TASK
	const navigate = useNavigation<any>()
	let { params } = useRoute()
	const updateFavoritePhoto = useMutation(
		['update-favorite-photo-calendar'],
		(data: TypeUpdateFavoritePhoto) => ProfileService.updateFavoritePhoto(data),
		{
			onSuccess: () => {
				setModalVisible(false)
				queryClient.refetchQueries(['get-user'])
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
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					//Alert.alert('Modal has been closed.')
					setModalVisible(!modalVisible)
				}}
			>
				<View className='flex-1 justify-center items-center'>
					<View className='flex-1 w-full bg-black px-10 '>
						<Pressable
							onPress={() => setModalVisible(!modalVisible)}
							className='flex-1'
						>
							<View className='h-[15%] items-center' style={{ marginTop: top }}>
								<Text className='text-white font-bold text-xl'>
									{user.data &&
										text(user.data?.calendarPhotos[modalImg].created || '')}
								</Text>
								<Text className='text-white/70 text-base -mt-1'>
									{normalDate(
										user.data?.calendarPhotos[modalImg].created || ''
									)}
								</Text>
							</View>
							<View className='flex-1 bg-white rounded-2xl overflow-hidden border-2 border-white'>
								<ImageBackground
									className='h-full w-full rounded-2xl'
									source={{
										uri: BaseImageUrl2(
											user.data?.calendarPhotos[modalImg].photos.frontPhoto
												?.photo ||
												user.data?.calendarPhotos[modalImg].photos.backPhoto
													?.photo ||
												''
										)
									}}
								/>
							</View>
						</Pressable>
						{params && (
							<View className='text-center h-[25%]'>
								<Pressable
									className='border-2  m-auto p-3 rounded-2xl bg-white w-full'
									onPress={() =>
										updateFavoritePhoto.mutate({
											key: params?.['pin' as keyof typeof params] as unknown as
												| 'photoOne'
												| 'photoTwo'
												| 'photoThree',
											photo:
												user.data?.calendarPhotos[modalImg].photos.frontPhoto
													?.photo ||
												user.data?.calendarPhotos[modalImg].photos.backPhoto
													?.photo ||
												'',
											created:
												user.data?.calendarPhotos[modalImg].photos.frontPhoto
													?.created ||
												user.data?.calendarPhotos[modalImg].photos.backPhoto
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
			{user.data && (
				<View>
					{(() => {
						const calendarPhotos = user.data.calendarPhotos
						let beginDate = new Date(user.data.createdAt)

						let getUserDate = new Date(
							user.data.calendarPhotos[user.data.calendarPhotos.length - 1]
								?.created
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

								//console.log(dateMassive);

								beginWhile++
								beginDate.setDate(beginDate.getDate() + 1)
							}
							dateMassive.push(obj)

							i++
						}
						for (let i = 3; i <= dateMassive.length; i++) {
							console.log(i, dateMassive[i])
						}
						//console.log(dateMassive);

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
													className='w-[40px] h-[50px] flex items-center justify-center rounded-lg '
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
