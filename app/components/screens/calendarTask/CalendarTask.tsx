import {
	ProfileService,
	TypeUpdateFavoritePhoto
} from '@/services/profile/profile.service'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'
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
import { BaseImageUrl } from '@/services/api/interceptors.api'

export const CalendarTask = () => {
	const user = useQuery(['get-user-profile'], () => ProfileService.getProfile()) //@TASK
	const navigate = useNavigation()
	let { params } = useRoute()
	const updateFavoritePhoto = useMutation(
		['update-favorite-photo-calendar'],
		(data: TypeUpdateFavoritePhoto) => ProfileService.updateFavoritePhoto(data),
		{
			onSuccess: () => {
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
	const [modalImg, setModalImg] = useState('')

	return (
		<ScrollView className='mt-20 mx-5'>
			<View className='mx-auto mb-10'>
				<Text className='text-white font-bold text-3xl'>Pin photo</Text>
			</View>
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
					<View className='w-[100%] h-[100%] p-5'>
						<Pressable onPress={() => setModalVisible(!modalVisible)}>
							<Image
								className='w-[100%] h-[90%] rounded-2xl '
								resizeMode='center'
								source={{ uri: `${BaseImageUrl}${modalImg}` }}
							/>
						</Pressable>
						{params && (
							<View className='text-center '>
								<Pressable
									className='border-2 border-white w-32 m-auto p-3 rounded-2xl'
									onPress={() =>
										updateFavoritePhoto.mutate({
											key: params?.['pin' as keyof typeof params] as unknown as
												| 'photoOne'
												| 'photoTwo'
												| 'photoThree',
											photo: modalImg
										})
									}
								>
									{!updateFavoritePhoto.isLoading ? (
										<Text className='text-center text-xl font-bold '>
											Pins photo
										</Text>
									) : (
										<View className=''>
											{/* <SvgUri width={100} height={100} uri={infinitySvg} /> */}
											{/* <Image source={infinitySvg} /> */}
											<Text className='text-white text-center'>Loading...</Text>
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
						let date = new Date()
						let begin = user.data.createdAt.split('T')[0].split('-')
						begin[2] = '1'
						let [lateYear, lateMonth, lateDay] = user.data.calendarPhotos[
							user.data.calendarPhotos.length - 1
						]?.created.split('-') || [100, date.getMonth(), date.getDate()]

						let beginDate = new Date(begin.join('-'))
						let endDate = new Date(+lateYear, +lateMonth + 1, 1)

						let i = 0
						let k = 0

						let dateMassive = []
						while (
							beginDate.getFullYear() < endDate.getFullYear() ||
							beginDate.getMonth() < endDate.getMonth()
						) {
							let obj: { month: string; array: (number | string)[] } = {
								month: '',
								array: []
							}
							let days = daysInMonth(beginDate)
							let beginWhile = 1
							while (beginWhile <= days) {
								const [crYear, crMonth, crDay] = calendarPhotos[
									k
								]?.created.split('-') || [100, date.getMonth(), date.getDate()]
								if (beginDate.getDate() === 1) {
									obj.month = beginDate.toLocaleString('default', {
										month: 'long'
									})
								}
								if (
									beginDate.getDate() === Number(crDay) &&
									beginDate.getMonth() === Number(crMonth) &&
									beginDate.getFullYear() === Number(crYear)
								) {
									obj.array.push(`${calendarPhotos[k]?.photo}`)
									k++
								} else {
									obj.array.push(beginDate.getDate())
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
									<View className='flex-row flex-wrap justify-center'>
										{el.array.map((el, key) => {
											return (
												<View
													key={key}
													className='w-[40px] h-[40px] flex items-center justify-center rounded-lg '
												>
													{String(el) === el ? (
														<View className='border-2 rounded-lg'>
															<Pressable
																onPress={() => {
																	setModalImg(el)
																	setModalVisible(true)
																}}
															>
																<Image
																	width={40}
																	height={40}
																	className='rounded-lg'
																	source={{
																		uri: `http://192.168.233.227:4200${el}`
																	}}
																/>
															</Pressable>
														</View>
													) : (
														<Text className='text-white'>{el}</Text>
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
		</ScrollView>
	)
}

let fillDays = (day: number, length: number) => {
	// for (let i = 0; i < length; i++) {

	// }
	return <Text>{day}</Text>
}
