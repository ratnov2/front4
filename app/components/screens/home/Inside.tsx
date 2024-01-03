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
import { ElementPhoto } from './element-photo/ElementPhoto'
import DismissKeyboard from '@/ui/form-elements/field/DismissKeyboard'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const IsTiming = (date: Date) => {
	const current = new Date()
	const userDate = new Date(date)
	const currYear = current.getFullYear()
	const currDay = current.getDate()
	const currHours = current.getHours()
	const currMonth = current.getMonth()
	const year = userDate.getFullYear()
	const day = userDate.getDate()
	const month = userDate.getMonth()
	const hours = userDate.getHours()
	if(!date) return true
	if (currYear >= year && currMonth >= month) {
		if (currDay > day) {
			return true
		} else if (currDay === day && currHours >= 12) {
			return true
		} else {
			return false
		}
	}
}

export const Inside = () => {
	const insets = useSafeAreaInsets()
	const latestPhoto = useQuery(['get-latest-photo'], () =>
		ProfileService.getLatestPhotos()
	)
	//console.log(latestPhoto.data);

	const { user } = useAuth()

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
					<DismissKeyboard>
						{latestPhoto.isLoading ? (
							<View>
								<Text className='text-white'>Loading...</Text>
							</View>
						) : latestPhoto.data && latestPhoto.data.length > 0 ? (
							<View className='h-full mx-10 '>
								{latestPhoto.data?.map((photo, key) => {
									return (
										<ElementPhoto
											photo={photo}
											key={key}
											refetch={() => latestPhoto.refetch()}
										/>
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
					</DismissKeyboard>
				</ScrollView>
			)}
			{user && IsTiming(user.latestPhoto?.created) && !startCamera && (
				<View>
					<View
						style={{ height: 50, flex: 1 }}
						className='absolute bottom-20 left-0 right-0  justify-center items-center '
					>
						<View>
							<TouchableOpacity
								onPress={() => {
									__startCamera()
									takePhoto()
								}}
								style={{
									height: 80
								}}
								className='text-center flex items-center'
							>
								<Feather name='circle' size={80} color='white' />
								<Text className='text-white text-center'>
									Post a Late BeReal
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			)}
			<LinearGradient
				colors={['#00000000', '#111111']}
				style={{
					height: '10%',
					width: '100%',
					position: 'absolute',
					bottom: 0
				}}
			></LinearGradient>
		</View>
	)
}
