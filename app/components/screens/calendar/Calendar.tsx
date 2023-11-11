import { ProfileService } from '@/services/profile/profile.service'
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

	let daysInMonth = function (date: Date) {
		return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate()
	}
	const [modalVisible, setModalVisible] = useState(false)
	const [modalImg, setModalImg] = useState('')
	return (
		<ScrollView className='mt-20 mx-5'>
			<View className='mx-auto mb-10'>
				<Text className='text-white font-bold text-3xl'>Your memories</Text>
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
							<Image className='w-[100%] h-[100%] rounded-2xl ' resizeMode='center' source={{ uri: modalImg }} />
						</Pressable>
					</View>
				</View>
			</Modal>
			{user.data && (
				<View>
					{(() => {
						const calendarPhotos = user.data.calendarPhotos
						let begin = user.data.createdAt.split('T')[0].split('-')
						begin[2] = '1'
						let [lateYear, lateMonth, lateDay] =
							user.data.calendarPhotos[
								user.data.calendarPhotos.length - 1
							].created.split('-')

						let beginDate = new Date(begin.join('-'))
						let endDate = new Date(+lateYear, +lateMonth + 1, 1)

						let i = 0
						let k = 0

						const [crYear, crMonth, crDay] =
							calendarPhotos[k].created.split('-')
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
									obj.array.push(
										`http://192.168.233.227:4200${calendarPhotos[k].photo}`
									)
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
										{el.array.map((el, key) => (
											<View
												key={key}
												className='w-[40px] h-[40px] flex items-center justify-center rounded-lg '
											>
												{String(el) === el ? (
													<View className='border-2 rounded-lg'>
														<Pressable
															onPress={() => {
																setModalImg(
																	`http://192.168.233.227:4200${calendarPhotos[k].photo}`
																)
																setModalVisible(true)
															}}
														>
															<Image
																width={40}
																height={40}
																className='rounded-lg'
																source={{
																	uri: `http://192.168.233.227:4200${calendarPhotos[k].photo}`
																}}
															/>
														</Pressable>
													</View>
												) : (
													<Text className='text-white'>{el}</Text>
												)}
											</View>
										))}
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
