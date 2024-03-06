import {
	Image,
	Pressable,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import { useState } from 'react'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
// import CameraExpo from './CamerExpo'
import { useAuth } from '@/hooks/useAuth'
import { FilesService } from '@/services/files/files.service'
import mime from 'mime'
import { ElementPhoto } from './element-photo/ElementPhoto'
import DismissKeyboard from '@/ui/form-elements/field/DismissKeyboard'
import { AntDesign, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { LayoutOpacityItems } from '@/navigation/ui/LayoutOpacityItems'
import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import { UserAvatar } from '@/ui/user-avatar/UserAvatar'

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
	if (!date) return true
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
	const [frontImage, setFrontImage] = useState<string | null>(null)
	const [backImage, setBackImage] = useState<string | null>(null)
	//const cameraRef = useRef(null);
	// const takeFrontPhoto = async () => {
	// 	if (cameraRef.current) {
	// 	  const { uri } = await cameraRef.current.takePictureAsync();
	// 	  setFrontImage(uri);
	// 	}
	//   };

	const takeBackPhoto = async () => {
		const backPhoto = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 1,
			cameraType: 'back' as any
		})

		if (!backPhoto.canceled) {
			setBackImage(backPhoto.assets[0].uri)
		}
	}
	console.log(backImage)

	const { navigate } = useNavigation<any>()
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
	const { mutate } = useMutation(
		['push-photo'],
		({ form, path }: { form: FormData; path: string }) =>
			FilesService.pushPhoto(form, path)
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
					uri,
					type: 'image/jpeg',
					name: 'photo.jpg'
				})
				mutate({ form: formData, path: 'folder=main&type=frontPhoto' })
				setStartCamera(false)
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
		<View style={{ flex: 1 }}>
			{!startCamera && (
				<LayoutOpacityItems ComponentRender={<HeaderHome />}>
					<DismissKeyboard>
						{latestPhoto.isLoading ? (
							<View>
								<Text className='text-white'>Loading...</Text>
							</View>
						) : latestPhoto.data && latestPhoto.data.length > 0 ? (
							<View className='h-full'>
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
				</LayoutOpacityItems>
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
									takeFrontPhoto()
									//takePhoto()
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

export const HeaderHome = () => {
	const { navigate } = useNavigation<any>()
	const { user } = useAuth()
	return (
		<View className='flex-row justify-between flex-1 items-center relative'>
			<Text className='text-white text-2xl font-bold absolute text-center  w-full'>
				BePrime
			</Text>
			<TouchableOpacity onPress={() => navigate('Friends')}>
				<FontAwesome5 name='user-friends' size={24} color='white' />
			</TouchableOpacity>
			{user && (
				<View className='flex-row'>
					<TouchableOpacity
						onPress={() => navigate('Calendar')}
						className='mr-4'
					>
						<Entypo name='calendar' size={26} color='white' />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigate('Profile')}>
						<UserAvatar avatar={user.avatar} firstName={user.firstName} />
					</TouchableOpacity>
				</View>
			)}
			{/* <TouchableOpacity onPress={() => navigate('Settings')}></TouchableOpacity> */}
		</View>
	)
}
