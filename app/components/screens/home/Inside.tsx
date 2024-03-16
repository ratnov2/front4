import {
	Image,
	ImageBackground,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import { useEffect, useRef, useState } from 'react'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import bg from '@/assets/bg-red.jpg'
import bg2 from '@/assets/user.png'
// import CameraExpo from './CamerExpo'
import { useAuth } from '@/hooks/useAuth'
import { FilesService } from '@/services/files/files.service'
import mime from 'mime'
import { ElementPhoto } from './element-photo/ElementPhoto'
import DismissKeyboard from '@/ui/form-elements/field/DismissKeyboard'
import {
	AntDesign,
	Entypo,
	Feather,
	FontAwesome,
	FontAwesome5,
	Ionicons,
	MaterialIcons
} from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { LayoutOpacityItems } from '@/navigation/ui/LayoutOpacityItems'
import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import { UserAvatar } from '@/ui/user-avatar/UserAvatar'
import { PhotoLoader } from '@/ui/photo-loader/PhotoLoader'
import { PanResponder } from 'react-native'
import { ElementTest } from './ElementTest'

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
	const [isInitialRender, setIsInitialRender] = useState(true)
	const [isMakingPhoto, setIsMakingPhoto] = useState<boolean>(false)
	const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true)
	const [isCompletePhoto, setIsCompletePhoto] = useState(false)
	const backCameraRef = useRef(null)
	const cameraRef = useRef(null)

	const takeFrontPhoto = async () => {
		setIsMakingPhoto(true)
		if (cameraRef.current) {
			const { uri } = await (cameraRef.current as any).takePictureAsync()
			setFrontImage(uri)
			!backImage && setIsFrontCamera(false)
		}
	}

	const takeBackPhoto = async () => {
		setIsMakingPhoto(true)
		console.log('takeBackPhoto')
		if (cameraRef.current) {
			console.log('cameraRef.current')
			const { uri } = await (cameraRef.current as any).takePictureAsync()
			console.log('uri')
			setBackImage(uri)
			!frontImage && setIsFrontCamera(true)
		}
	}

	useEffect(() => {
		if (!isInitialRender && (frontImage || backImage)) {
			console.log('isFrontCamera', isFrontCamera)
			!backImage && takeBackPhoto()
			!frontImage && takeFrontPhoto()
		} else {
			setIsInitialRender(false)
		}
	}, [isFrontCamera])

	useEffect(() => {
		if (frontImage && backImage) {
			setIsMakingPhoto(false)
			//setStartCamera(false)
		}
	}, [frontImage, backImage])

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
	useEffect(() => {}, [startCamera])
	const ff = () => {
		if (frontImage && backImage && !isLoading) {
			const formData = new FormData()
			console.log('frontImage', backImage)
			console.log('backImage', frontImage)
			//@ts-ignore
			formData.append('files', {
				uri: frontImage,
				type: 'image/jpeg',
				name: 'photo.jpg'
			})
			//@ts-ignore
			formData.append('files', {
				uri: backImage,
				type: 'image/jpeg',
				name: 'photo2.jpg'
			})
			mutate(formData)
			//setStartCamera(false)
		}
	}

	const { mutate, isLoading, data } = useMutation(
		['push-photo'],
		(form: FormData) => FilesService.pushTwoPhoto(form),
		{
			onSuccess: () => setStartCamera(false)
			
		}
	)

	///

	///
	return (
		<View style={{ flex: 1 }}>
			{/* {backImage && <Image className='w-40 h-40' source={{ uri: backImage }} />}
			{frontImage && (
				<Image className='w-40 h-40' source={{ uri: frontImage }} />
			)} */}
			{startCamera && (
				<View className='flex-1'>
					<View className='h-[13%] bg-black justify-center'>
						<Text className='text-white text-2xl font-bold text-center justify-center '>
							My BePrime
						</Text>
					</View>
					<View className='mx-2 flex-1 rounded-3xl bg-red-50 overflow-hidden relative'>
						<Camera
							style={{ flex: 1 }}
							className=''
							type={
								isFrontCamera
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							}
							ratio='4:3'
							ref={cameraRef}
						></Camera>
						{!frontImage && !backImage && isMakingPhoto && (
							<View
								className={`flex-1 absolute w-full h-full bg-blue-900 z-50`}
							/>
						)}
						{(frontImage || backImage) && (
							<View className='absolute flex-1 h-full w-full bg-black'>
								<Image
									source={{ uri: frontImage as string }}
									className='w-full h-full'
								/>
							</View>
						)}
						{frontImage && backImage && (
							<View className='absolute flex-1 h-full w-full bg-black'>
								<ElementTest img1={frontImage} img2={backImage} />
							</View>
						)}
					</View>
					<View className='h-[23%] bg-black flex justify-center items-center z-[99999]'>
						{!frontImage && !backImage && !isMakingPhoto ? (
							<View className='flex-row items-center'>
								<Pressable
									onPress={() => setIsFrontCamera(!isFrontCamera)}
									className='p-2'
								>
									<Ionicons name='camera-reverse' size={34} color='white' />
								</Pressable>

								<TouchableOpacity
									onPress={() => {
										isFrontCamera && takeFrontPhoto()
										!isFrontCamera && takeBackPhoto()
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

								<Pressable
									onPress={() => setIsFrontCamera(!isFrontCamera)}
									className='p-2'
								>
									<Ionicons name='camera-reverse' size={34} color='white' />
								</Pressable>
							</View>
						) : !!frontImage && !!backImage && !isMakingPhoto ? (
							<>
								<TouchableOpacity
									onPress={() => {
										setFrontImage('')
										setBackImage('')
									}}
									className='flex-row justify-center items-center p-2'
								>
									<Text className='text-white font-bold text-2xl mr-4'>
										RETAKE
									</Text>
									<FontAwesome name='undo' size={30} color='white' />
								</TouchableOpacity>
								<TouchableOpacity
									onPress={ff}
									className='flex-row justify-center items-center p-2'
								>
									<Text className='text-white font-bold text-2xl mr-4'>
										SEND
									</Text>
									<Ionicons name='send-sharp' size={34} color='white' />
								</TouchableOpacity>
							</>
						) : (
							<PhotoLoader />
						)}
					</View>
				</View>
			)}

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
			{!startCamera && user && IsTiming(user.latestPhoto?.created) && (
				<View>
					<View
						style={{ height: 50, flex: 1 }}
						className='absolute bottom-20 left-0 right-0  justify-center items-center '
					>
						<View className='flex-row justify-around'>
							{startCamera && (
								<Pressable
									onPress={() => setIsFrontCamera(!isFrontCamera)}
									className='justify-around'
								>
									<Ionicons name='camera-reverse' size={34} color='white' />
								</Pressable>
							)}
							<TouchableOpacity
								onPress={() => {
									!startCamera && __startCamera()
									startCamera && isFrontCamera && takeFrontPhoto()
									startCamera && !isFrontCamera && takeBackPhoto()
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
							{startCamera && (
								<View className='justify-around'>
									<Ionicons name='camera-reverse' size={34} color='white' />
								</View>
							)}
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
