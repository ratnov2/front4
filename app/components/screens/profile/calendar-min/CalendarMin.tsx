import { ProfileService } from '@/services/profile/profile.service'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import clsx from 'clsx'
import { Link } from '@react-navigation/native'
import { BaseImageUrl } from '@/services/api/interceptors.api'
declare global {
	interface Date {
		daysInMonth(): number
	}
} //@TASK
export const CalendarMin: FC = () => {
	const [modalVisible, setModalVisible] = useState(false)
	const [modalImg, setModalImg] = useState('')
	const date = new Date()
	const addDate = new Date()
	const user = useQuery(['get-user-234'], () => ProfileService.getProfile())
	Date.prototype.daysInMonth = function () {
		return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate()
	}
	addDate.setDate(addDate.getDate() - 14)
	console.log(modalImg)

	return (
		<View className='bg-gray-700 rounded-xl p-4 mt-5'>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
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
					</View>
				</View>
			</Modal>
			<Text className='text-white mb-4 text-2xl font-bold'>Last 14 days</Text>
			{user.data && (
				<View className='text-white flex-row w-full mx-2 flex-wrap '>
					{(() => {
						let photo: { created: string; photo: string }[] = []
						photo = user.data.calendarPhotos.slice(-7)
						let k = -1

						return Array.from(Array(14)).map((el, key) => {
							let [year, month, day] = photo[k + 1]?.created.split('-') || [
								0, 0, 0
							]
							addDate.setDate(addDate.getDate() + 1)
							let photoImg: string = photo[k + 1]?.photo
							if (
								Number(month) === addDate.getMonth() &&
								Number(day) === addDate.getDate()
							)
								k++

							return (
								<View
									key={key}
									className={clsx(
										'w-10 rounded-lg items-center mb-5 h-10 flex justify-center mx-2',
										date.getDate() === addDate.getDate() &&
											'bg-white text-black'
									)}
								>
									{addDate.getDate() === Number(day) &&
									addDate.getMonth() === Number(month) ? (
										<Pressable
											onPress={() => {
												setModalImg(photoImg)
												setModalVisible(true)
											}}
											className='w-full h-full roundex-2xl'
										>
											<Image
												className='w-full h-full rounded-lg'
												source={{ uri: `${BaseImageUrl}${photoImg}` }}
											/>
										</Pressable>
									) : (
										<Text
											className={clsx(
												'text-white text-xl',
												date.getDate() === addDate.getDate() && ' text-black'
											)}
										>
											{addDate.getDate()}
										</Text>
									)}
								</View>
							)
						})
					})()}
				</View>
			)}
			<View className='mb-10  align-middle mx-auto '>
				<Link to={'/Calendar'} className=''>
					<View className='p-3 rounded-lg border-2 border-white'>
						<Text className='text-white text-xl'>View all my memories</Text>
					</View>
				</Link>
			</View>
		</View>
	)
}
