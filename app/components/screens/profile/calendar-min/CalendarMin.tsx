import { ProfileService } from '@/services/profile/profile.service'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import clsx from 'clsx'
import { Link } from '@react-navigation/native'
import { BaseImageUrl, BaseImageUrl2 } from '@/services/api/interceptors.api'
import { ILatestPhoto, IPhotos } from '@/shared/types/profile.interface'
declare global {
	interface Date {
		daysInMonth(): number
	}
} //@TASK
export const CalendarMin: FC = () => {
	const [modalVisible, setModalVisible] = useState(false)
	const [modalImg, setModalImg] = useState('')
	const addDate = new Date()
	const user = useQuery(['get-user-234'], () => ProfileService.getProfile())
	Date.prototype.daysInMonth = function () {
		return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate()
	}
	addDate.setDate(addDate.getDate() - 14)

	return (
		<View className='bg-zinc-900 rounded-xl p-4 mt-5'>
			<Modal
				animationType='fade'
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
								source={{ uri: `${BaseImageUrl2(modalImg)}` }}
							/>
						</Pressable>
					</View>
				</View>
			</Modal>
			<Text className='text-white mb-3 text-xl font-bold'>Last 14 days</Text>
			{user.data && (
				<View className='text-white flex-row w-full mx-[2px] flex-wrap '>
					{(() => {
						let photo: IPhotos[] = []
						photo = user.data.calendarPhotos.slice(-7)
						//console.log(photo);

						let k = -1
						//console.log('@',photo[0]);

						return Array.from(Array(14)).map((el, key) => {
							const date = new Date(photo[k + 1]?.created)
							const currentDate = new Date()
							const day = date.getDate()
							const month = date.getMonth()
							const year = date.getFullYear()
							addDate.setDate(addDate.getDate() + 1)
							let photoImg: string =
								photo[k + 1]?.photos.frontPhoto?.photo ||
								photo[k + 1]?.photos.backPhoto?.photo ||
								''

							const provPhoto =
								month === addDate.getMonth() &&
								day === addDate.getDate() &&
								year === addDate.getFullYear()
							if (provPhoto) k++

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
												setModalImg(photoImg)
												setModalVisible(true)
											}}
											className='w-full h-full roundex-2xl relative'
										>
											<Image
												className='w-full h-full rounded-lg'
												source={{ uri: `${BaseImageUrl2(photoImg)}` }}
											/>
											<Text
												className='text-white absolute text-xl'
												style={{
													top: '50%',
													left: '50%',
													transform: [{ translateX: -11 }, { translateY: -13 }]
												}}
											>
												{addDate.getDate()}
											</Text>
										</Pressable>
									) : (
										<View
											className={clsx(
												currentDate.getDate() === addDate.getDate() &&
													'bg-white rounded-full w-8 h-8 flex items-center justify-center'
											)}
										>
											<Text
												className={clsx(
													'text-white text-xl',
													currentDate.getDate() === addDate.getDate() &&
														'text-black '
												)}
											>
												{addDate.getDate()}
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
