import { FC, useState } from 'react'
import {
	Image,
	ImageBackground,
	Modal,
	Pressable,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import clsx from 'clsx'
import {
	Link,
	createNavigationContainerRef,
	useNavigation,
	useRoute
} from '@react-navigation/native'
import { BaseImageUrl, BaseImageUrl2 } from '@/services/api/interceptors.api'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NormalDate } from '@/navigation/ui/LayoutOpacityCommenrSwiper'
import {
	ProfileService,
	TypeUpdateFavoritePhoto
} from '@/services/profile/profile.service'
import { DraggableImg } from '@/components/screens/comments/DraggableImg'
import { Draggable } from '@/components/screens/home/Draggable/Draggable'

interface IPinBlock {
	photos: {
		frontPhoto: string
		backPhoto: string
	}
	pin: 'photoOne' | 'photoTwo' | 'photoThree'
	created: string
}
//?pin=${pin}
export const PinBlock: FC<IPinBlock> = ({ photos, pin, created }) => {
	let navigate = useNavigation<any>()
	const [modalVisible, setModalVisible] = useState(false)
	const user = useQuery(['get-profile'])
	const queryClient = useQueryClient()
	const { top } = useSafeAreaInsets()
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
	if (!!photos.backPhoto) {
		return (
			<View
				className={clsx(
					'w-[30%] h-40 border-2 flex-col rounded-2xl justify-center '
				)}
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
											<NormalDate created={created} />
										</View>
										<View />
									</View>
									<View
										className='flex-1 rounded-2xl overflow-hidden border-2 border-white'
										style={{ aspectRatio: 9 / 12 }}
									>
										<Draggable
											img1={photos.frontPhoto}
											img2={photos.backPhoto}
											isVisibleElementsPhoto={true}
										/>
									</View>
								</Pressable>
								<View className='text-center flex-1 mt-5'>
									<Pressable
										className='border-2  m-auto p-3 rounded-2xl bg-white w-full'
										onPress={() =>
											updateFavoritePhoto.mutate({
												key: pin || 'photoOne',
												frontPhoto: null,
												backPhoto: null,
												created: null
											})
										}
									>
										{!updateFavoritePhoto.isLoading ? (
											<Text className='text-center text-xl font-bold '>
												Unpin photo
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
				{/* <Link to={`/CalendarTask?pin=${pin}`} className='block'> */}
				<TouchableOpacity
					onPress={() => {
						if (!!photos.backPhoto) {
							setModalVisible(!modalVisible)
						} else {
							//@ts-ignore
							navigate.navigate(`CalendarTask`, {
								pin: pin
							})
						}
					}}
				>
					<View className='bg-red w-[100%] h-[100%] block w-30 relative'>
						<Image
							className='rounded-2xl flex-1'
							resizeMode='cover'
							source={{ uri: `${BaseImageUrl}${photos.frontPhoto}` }}
						/>
						<View className='absolute bottom-1 left-0.5'>
							<Text className='text-white text-base font-bold'>
								{text(created)}
							</Text>
							<Text className='text-white -mt-1.5'>
								{new Date(created).getFullYear()}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<TouchableOpacity
			onPress={() =>
				//@ts-ignore
				navigate.navigate(`CalendarTask`, {
					pin: pin
				})
			}
			className={clsx(
				'w-[32%] h-40 border-2 flex-col border-dotted border-gray-500 rounded-2xl justify-center'
			)}
		>
			<View className='m-auto'>
				{!photos.backPhoto ? (
					<AntDesign name='plus' size={24} color='white' />
				) : (
					<AntDesign name='lock' size={24} color='#3e3e3e' />
				)}
			</View>
		</TouchableOpacity>
	)
}
const text = (created: string) => {
	const date = new Date(created)
	return `${date.getDate()} ${date.toLocaleString('ru', { month: 'long' })}`
}
