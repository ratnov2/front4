import {
	ProfileService,
	TypeUpdateFavoritePhoto
} from '@/services/profile/profile.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import clsx from 'clsx'
import { Link } from '@react-navigation/native'
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

	const user = useQuery(['get-profile'], () => ProfileService.getProfile(), {
		select: data => {
			const calendarPhotos = data.calendarPhotos.slice(-14)
			return { ...data, calendarPhotos }
		}
	})

	Date.prototype.daysInMonth = function () {
		return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate()
	}
	const queryClient = useQueryClient()
	const updateFavoritePhoto = useMutation(
		['update-favorite-photo-calendar'],
		(data: TypeUpdateFavoritePhoto) => ProfileService.updateFavoritePhoto(data),
		{
			onSuccess: () => {
				setModalVisible(false)
				queryClient.refetchQueries(['get-profile'])
			}
		}
	)

	addDate.setDate(addDate.getDate() - 13)

	//console.log(user.data?.calendarPhotos);
	const { top } = useSafeAreaInsets()
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
				<View className='flex-1 justify-center items-center'>
					<View className='flex-1 w-full bg-black px-10 '>
						<Pressable
							onPress={() => setModalVisible(!modalVisible)}
							className='flex-1'
						>
							<View className='h-[15%] items-center' style={{ marginTop: top }}>
								<Text className='text-white font-bold text-xl'>
									{user.data &&
										text(user.data?.calendarPhotos[modalImg]?.created || '')}
								</Text>
								<Text className='text-white/70 text-base -mt-1'>
									{normalDate(
										user.data?.calendarPhotos[modalImg]?.created || ''
									)}
								</Text>
							</View>
							<View className='flex-1 bg-white rounded-2xl overflow-hidden border-2 border-white'>
								<ImageBackground
									className='h-full w-full rounded-2xl'
									source={{
										uri: BaseImageUrl2(
											user.data?.calendarPhotos[modalImg]?.photos?.frontPhoto
												?.photo ||
												user.data?.calendarPhotos[modalImg]?.photos?.backPhoto
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
							const day = date.getDate()
							const month = date.getMonth()
							const year = date.getFullYear()

							let photoImg: number = k
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
												setModalImg(photoImg)
												setModalVisible(true)
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
