import { LayoutLightOpacity } from '@/navigation/ui/LayoutLightOpacity'
import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import { ProfileService } from '@/services/profile/profile.service'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
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

export const Calendar = () => {
	const user = useQuery(['get-user-profile'], () => ProfileService.getProfile()) //@TASK
	const { navigate } = useNavigation<any>()
	let daysInMonth = function (date: Date) {
		return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate()
	}
	const [modalVisible, setModalVisible] = useState(false)
	const [modalImg, setModalImg] = useState('')
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
					<View className='w-[100%] h-[100%] p-5'>
						<Pressable onPress={() => setModalVisible(!modalVisible)}>
							<Image
								className='w-[100%] h-[100%] rounded-2xl '
								resizeMode='center'
								source={{ uri: modalImg }}
							/>
						</Pressable>
					</View>
				</View>
			</Modal>
			{user.data && (
				<View>
					{(() => {
						const calendarPhotos = user.data.calendarPhotos
						let date = new Date()
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
								array: { day: number; photo: string }[]
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
										photo: `${
											calendarPhotos[k].photos.frontPhoto?.photo ||
											calendarPhotos[k].photos.backPhoto?.photo
										}`,
										day: beginDate.getDate()
									}
									obj.array.push(newObj)
									k++
								} else {
									let newObj = {
										photo: '',
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
													className='w-[40px] h-[50px] flex items-center justify-center rounded-lg '
												>
													{el.photo ? (
														<View className='border-[1px] rounded-lg border-white'>
															<Pressable
																onPress={() => {
																	setModalImg(BaseImageUrl2(el.photo))
																	setModalVisible(true)
																}}
															>
																<Image
																	width={40}
																	height={50}
																	className='rounded-lg'
																	source={{
																		uri: BaseImageUrl2(el.photo)
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
