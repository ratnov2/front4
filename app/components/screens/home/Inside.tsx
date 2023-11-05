import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CameraComp } from './Camera'
import { useQuery } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Camera } from 'expo-camera'
import userPng from '@/assets/user.png'
import loading from '@/assets/loading.gif'
import CameraExpo from './CamerExpo'

export const Inside = () => {
	const insets = useSafeAreaInsets()
	const latestPhoto = useQuery(['get-latest-photo'], () =>
		ProfileService.getLatestPhotos()
	)
	const [latestPhotoState, setLatestPhotoState] = useState()
	const [startCamera, setStartCamera] = useState(false)
	const __startCamera = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		console.log(status)
		if (status === 'granted') {
			setStartCamera(true)
		} else {
		}
	}

	useEffect(() => {}, [])
	return (
		<View style={{ paddingTop: insets.top, flex: 1 }}>
			{startCamera && (
				// <CameraComp
				// 	setStartCamera={setStartCamera}
				// 	__startCamera={__startCamera}
				// 	startCamera={startCamera}
				// />
				<CameraExpo />
			)}
			{!startCamera && (
				<ScrollView
					className='bg-slate-600'
					// contentContainerStyle={{ flexGrow: 1 }}
					// showsVerticalScrollIndicator={false}
					// showsHorizontalScrollIndicator={false}
				>
					{latestPhoto.isLoading ? (
						<View>
							<Text className='text-white'>Loading...</Text>
						</View>
					) : !latestPhoto.data?.length ? (
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
					) : (
						<View className='h-full mx-10 '>
							{latestPhoto.data?.map((photo, key) => (
								<View
									className=''
									style={{ flexDirection: 'row', marginBottom: 70 }}
									key={key}
								>
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
													<Image
														source={userPng}
														style={{
															width: 30,
															height: 30,
															backgroundColor: '#fff',
															borderRadius: 100
														}}
													/>
												</View>
												<Text style={{ marginLeft: 10 }}> fe</Text>
											</View>
											<Image
												className='rounded-2xl'
												style={{
													resizeMode: 'cover',
													flex: 1,
													aspectRatio: 1,
													borderRadius: 20,
													backgroundColor: '#ffffff'
												}}
												// source={{ uri: `${BaseImageUrl}${photo.photo}` }}
												source={{
													uri: 'https://sun9-23.userapi.com/impf/c636420/v636420339/2f8/mEInMCYFfUI.jpg?size=640x512&quality=96&sign=34a9d640a547d663a0f0e55ef2aa4f40&c_uniq_tag=XAjjwBc58g9NQ16xv9-345VibwQmIFlYxdNvG9hr-DY&type=album'
												}}
											/>
										</View>
									)}
								</View>
							))}
						</View>
					)}
				</ScrollView>
			)}
			{!startCamera && (
				<View style={{ height: 50 }}>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							position: 'absolute',
							left: 0,
							right: 0,
							bottom: 10
						}}
					>
						<TouchableOpacity
							onPress={__startCamera}
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
