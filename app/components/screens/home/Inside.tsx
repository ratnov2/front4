import {
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CameraComp } from './Camera'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Camera } from 'expo-camera'
import userPng from '@/assets/user.png'
import * as ImagePicker from 'expo-image-picker'
// import CameraExpo from './CamerExpo'
import { Link } from '@react-navigation/native'
import { useAuth } from '@/hooks/useAuth'
import { FilesService } from '@/services/files/files.service'
import mime from 'mime'
import { BaseImageUrl } from '@/services/api/interceptors.api'

export const Inside = () => {
	const insets = useSafeAreaInsets()
	const latestPhoto = useQuery(['get-latest-photo'], () =>
		ProfileService.getLatestPhotos()
	)
	const { user } = useAuth()
	const [latestPhotoState, setLatestPhotoState] = useState()
	const [startCamera, setStartCamera] = useState(false)
	const __startCamera = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()

		if (status === 'granted') {
			setStartCamera(true)
		} else {
		}
	}
	////
	const [permission, requestPermission] = ImagePicker.useCameraPermissions()
	const [files, setFiles] = useState([])
	const { mutate } = useMutation(['push-photo'], (form: FormData) =>
		FilesService.pushPhoto(form)
	)

	const takePhoto = async () => {
		try {
			const cameraResp = await ImagePicker.launchCameraAsync({
				allowsEditing: false,
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				quality: 1
			})

			if (!cameraResp.canceled) {
				const { uri } = cameraResp.assets[0]
				const fileName = uri.split('/').pop()
				const formData = new FormData()
				//@ts-ignore
				formData.append('image', {
					uri: uri,
					type: mime.getType(uri),
					name: uri.split('/').pop()
				})
				mutate(formData)

				// const uploadResp = await uploadToFirebase(uri, fileName, (v) =>
				//   console.log(v)
				// );
				// console.log(uploadResp);

				// listFiles().then((listResp) => {
				//   const files = listResp.map((value) => {
				//     return { name: value.fullPath };
				//   });

				//   setFiles(files);
				// });
			}
		} catch (e) {
			//   Alert.alert("Error Uploading Image " + e.message);
		}
	}
	////
	const [isMessage, setIsMessage] = useState(false)
	const [value, setValue] = useState('')
	return (
		<View style={{ paddingTop: insets.top, flex: 1 }}>
			{!startCamera && (
				<View
					className='absolute left-1/2 z-30'
					style={{
						position: 'absolute',
						top: insets.top + 15,
						left: 0,
						right: 0,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text className='text-white text-2xl font-bold'>BePrime</Text>
				</View>
			)}
			{/* <CameraExpo /> */}

			{!startCamera && (
				<ScrollView
					style={{ paddingTop: insets.top, paddingBottom: 400 }}
					// contentContainerStyle={{ flexGrow: 1 }}
					// showsVerticalScrollIndicator={false}
					// showsHorizontalScrollIndicator={false}
				>
					{latestPhoto.isLoading ? (
						<View>
							<Text className='text-white'>Loading...</Text>
						</View>
					) : latestPhoto.data && latestPhoto.data.length > 0 ? (
						<View className='h-full mx-10 '>
							{latestPhoto.data?.map((photo, key) => {
								console.log(user?._id === photo._id)

								const photoStr = `${BaseImageUrl}${photo.calendarPhotos.photo}`
								const [value, setValue] = useState(photo.calendarPhotos.comment)
								return (
									<View className='' style={{ marginBottom: 70 }} key={key}>
										{photo && (
											<View style={{ flex: 1 }}>
												<View
													style={{
														display: 'flex',
														flexDirection: 'row',
														alignItems: 'center',
														marginBottom: 10
													}}
												>
													<View>
														<Link
															to={`/Profile${
																user?._id !== photo._id
																	? `?id=${photo._id}`
																	: ''
															}`}
														>
															<Image
																source={userPng}
																style={{
																	width: 30,
																	height: 30,
																	backgroundColor: '#fff',
																	borderRadius: 100
																}}
															/>
														</Link>
													</View>
													<Text
														style={{ marginLeft: 10 }}
														className='text-white'
													>
														{' '}
														fe
													</Text>
												</View>
												<Image
													className='rounded-2xl'
													style={{
														resizeMode: 'cover',
														flex: 1,
														aspectRatio: 9 / 16,
														borderRadius: 20
													}}
													source={{
														uri: photoStr
													}}
													// source={{
													// 	uri: 'https://sun9-23.userapi.com/impf/c636420/v636420339/2f8/mEInMCYFfUI.jpg?size=640x512&quality=96&sign=34a9d640a547d663a0f0e55ef2aa4f40&c_uniq_tag=XAjjwBc58g9NQ16xv9-345VibwQmIFlYxdNvG9hr-DY&type=album'
													// }}
												/>
											</View>
										)}
										{user?._id === photo._id ? (
											!isMessage ? (
												<TouchableOpacity
													onPress={() => {
														setIsMessage(true)
													}}
												>
													<Text className='text-white mt-4'>
														{photo.calendarPhotos.comment || 'Anonym'}
													</Text>
												</TouchableOpacity>
											) : (
												<TextInput
													value={value}
													onChange={e => {
														console.log(e.currentTarget);
														
													}}
												/>
											)
										) : (
											<View>
												<Text className='text-white mt-4'>
													{photo.calendarPhotos.comment || 'Anonym'}
												</Text>
											</View>
										)}
									</View>
								)
							})}
						</View>
					) : (
						<View
							style={{
								justifyContent: 'center',
								flex: 1,
								alignItems: 'center'
							}}
						>
							<View>
								<Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
									Здесь пока ничего нет
								</Text>
							</View>
						</View>
					)}
					<View className='pb-28'></View>
				</ScrollView>
			)}
			{!startCamera && (
				<View
					style={{ height: 50, flex: 1 }}
					className='bg-transparent absolute bottom-6 left-0 right-0  justify-center items-center'
				>
					<View
					// style={{
					// 	justifyContent: 'center',
					// 	alignItems: 'center',
					// 	position: 'absolute',
					// 	left: 0,
					// 	right: 0,
					// 	bottom: 10
					// }}
					// className='bg-transparent'
					>
						<TouchableOpacity
							onPress={() => {
								__startCamera()
								takePhoto()
							}}
							style={{
								width: 130,
								borderRadius: 4,
								backgroundColor: '#14274e',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								height: 40
							}}
						>
							<Text
								style={{
									color: '#fff',
									fontWeight: 'bold',
									textAlign: 'center'
								}}
							>
								Take picture
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	)
}
