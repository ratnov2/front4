import {
	Image,
	ImageBackground,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import { FC, memo, useEffect, useRef, useState } from 'react'
import { Camera } from 'expo-camera'
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
import { ILatestInside, ILatestPhoto } from '@/shared/types/profile.interface'
import { ElementHeaderForCamera } from './ui/ElementHeaderForCamera'
import { CameraComponent } from './relax/Camera'
import { IUser } from '@/shared/types/user.interface'

const IsTiming = (cron?: string, date?: string) => {
	if (!cron || !date) return false
	if (new Date(cron).getTime() > new Date(date).getTime()) return true
	else return false
}

export const Inside = memo(() => {
	const [frontImage, setFrontImage] = useState<string | null>(null)
	const [backImage, setBackImage] = useState<string | null>(null)
	const [isInitialRender, setIsInitialRender] = useState(true)
	const [isMakingPhoto, setIsMakingPhoto] = useState<boolean>(false)
	const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true)
	const [isCompletePhoto, setIsCompletePhoto] = useState(false)
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
		//console.log('takeBackPhoto')
		if (cameraRef.current) {
			//console.log('cameraRef.current')
			const { uri } = await (cameraRef.current as any).takePictureAsync()
			//console.log('uri')
			setBackImage(uri)
			!frontImage && setIsFrontCamera(true)
		}
	}

	useEffect(() => {
		if (!isInitialRender && (frontImage || backImage)) {
			//console.log('isFrontCamera', isFrontCamera)
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
	const latestPhoto = useQuery(['get-latest-friends'], () =>
		ProfileService.getLatestPhotosFriends()
	)
	const latestPhotoOther = useQuery(
		['get-latest-people'],
		() => ProfileService.getLatestPhotosOther(),
		{
			select: data => {
				//console.log('data', data)

				return data.map(el => ({
					latestPhoto: { ...el.latestPhoto },
					avatar: el._id.avatar,
					_id: el._id._id,
					firstName: el._id.firstName
				}))
			}
		}
	)
	//[{"_id": {"_id": "65587d61dbdf73a8b2a442f3", "avatar": "/uploads/avatar/65587d61dbdf73a8b2a442f3/435795e1081764dfc011da2110729610105a.webp", "firstName": "anton"}, "latestPhoto": {"comment": "Qq", "comments": [Array], "created": "2024-03-18T15:15:10.427Z", "photos": [Object]}}
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
		console.log('FEFEFEFFE')

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
	const [typeOfCalendarPhotos, setTypeOfCalendarPhotos] = useState<
		'my_friends' | 'other'
	>('my_friends')

	const cron = useQuery(['get-cron-time'], ProfileService.getCronTime)
	const queryClient = useQueryClient()
	const userQuery = queryClient.getQueryData(['get-profile']) as any

	const latestPhotoUse = {
		latestPhoto: { ...userQuery.latestPhoto },
		avatar: userQuery.avatar,
		_id: userQuery._id,
		firstName: userQuery.firstName
	}

	const [shouldScroll, setShouldScroll] = useState(true)
	const toggleScroll = (scroll: boolean) => {
		setShouldScroll(scroll)
	}
	//console.log(latestPhotoOther.data);

	return (
		<View style={{ flex: 1 }}>
			{/* {backImage && <Image className='w-40 h-40' source={{ uri: backImage }} />}
			{frontImage && (
				<Image className='w-40 h-40' source={{ uri: frontImage }} />
			)} */}

			{startCamera && (
				// <View className='flex-1 bg-black'>
				// 	{cron.data && <ElementHeaderForCamera cron={cron.data} />}
				// 	<View className='mx-2 flex-1 rounded-3xl bg-red-50 overflow-hidden relative'>
				// 		<Camera
				// 			style={{ flex: 1 }}
				// 			className=''
				// 			type={
				// 				isFrontCamera
				// 					? (Camera.Constants.Type as any).front
				// 					: (Camera.Constants.Type as any).back
				// 			}
				// 			ratio='4:3'
				// 			ref={cameraRef}
				// 		></Camera>
				// 		{!frontImage && !backImage && isMakingPhoto && (
				// 			<View
				// 				className={`flex-1 absolute w-full h-full bg-blue-900 z-50`}
				// 			/>
				// 		)}
				// 		{(frontImage || backImage) && (
				// 			<View className='absolute flex-1 h-full w-full bg-black'>
				// 				<Image
				// 					source={{ uri: frontImage as string }}
				// 					className='w-full h-full'
				// 				/>
				// 			</View>
				// 		)}
				// 		{frontImage && backImage && (
				// 			<View className='absolute flex-1 h-full w-full bg-black'>
				// 				<ElementTest img1={frontImage} img2={backImage} />
				// 			</View>
				// 		)}
				// 	</View>

				// 	<View className='h-[23%] bg-black flex justify-center items-center z-[9999999] '>
				// 		{!frontImage && !backImage && !isMakingPhoto ? (
				// 			<View className='flex-row items-center'>
				// 				<Pressable
				// 					onPress={() => setIsFrontCamera(!isFrontCamera)}
				// 					className='p-2'
				// 				>
				// 					<Ionicons name='camera-reverse' size={34} color='white' />
				// 				</Pressable>

				// 				<TouchableOpacity
				// 					onPress={() => {
				// 						isFrontCamera && takeFrontPhoto()
				// 						!isFrontCamera && takeBackPhoto()
				// 					}}
				// 					style={{
				// 						height: 80
				// 					}}
				// 					className='text-center flex items-center'
				// 				>
				// 					<Feather name='circle' size={80} color='white' />
				// 					<Text className='text-white text-center'>
				// 						Post a Late BeReal
				// 					</Text>
				// 				</TouchableOpacity>

				// 				<Pressable
				// 					onPress={() => setIsFrontCamera(!isFrontCamera)}
				// 					className='p-2'
				// 				>
				// 					<Ionicons name='camera-reverse' size={34} color='white' />
				// 				</Pressable>
				// 			</View>
				// 		) : !!frontImage && !!backImage && !isMakingPhoto ? (
				// 			<>
				// 				<TouchableOpacity
				// 					onPress={() => {
				// 						setFrontImage('')
				// 						setBackImage('')
				// 					}}
				// 					className='flex-row justify-center items-center p-2'
				// 				>
				// 					<Text className='text-white font-bold text-2xl mr-4'>
				// 						RETAKE
				// 					</Text>
				// 					<FontAwesome name='undo' size={30} color='white' />
				// 				</TouchableOpacity>
				// 				<TouchableOpacity
				// 					onPress={ff}
				// 					className='flex-row justify-center items-center p-2 z-[999999]'
				// 				>
				// 					<Text className='text-white font-bold text-2xl mr-4'>
				// 						SEND
				// 					</Text>
				// 					<Ionicons name='send-sharp' size={34} color='white' />
				// 				</TouchableOpacity>
				// 			</>
				// 		) : (
				// 			<PhotoLoader />
				// 		)}
				// 	</View>
				// </View>
				<CameraComponent
					backImage={backImage}
					cameraRef={cameraRef}
					ff={ff}
					frontImage={frontImage}
					isFrontCamera={isFrontCamera}
					isMakingPhoto={isMakingPhoto}
					setBackImage={() => setBackImage('')}
					setFrontImage={() => setFrontImage('')}
					setIsFrontCamera={() => setIsFrontCamera(!isFrontCamera)}
					takeBackPhoto={takeBackPhoto}
					takeFrontPhoto={takeFrontPhoto}
					cron={cron.data}
				/>
			)}

			{!startCamera && (
				<LayoutOpacityItems
					ComponentRender={
						<HeaderHome
							setTypeFriends={() => setTypeOfCalendarPhotos('my_friends')}
							setTypeOther={() => setTypeOfCalendarPhotos('other')}
							typeOfCalendarPhotos={typeOfCalendarPhotos}
						/>
					}
					scrollEnabled={shouldScroll}
				>
					<View className='h-10' />
					{typeOfCalendarPhotos === 'my_friends' ? (
						<DismissKeyboard>
							{user && !IsTiming(cron.data, userQuery.created) && (
								<ElementPhoto
									photo={latestPhotoUse as any}
									toggleScroll={toggleScroll}
									refetch={() => latestPhoto.refetch()}
									reactions={userQuery.latestPhoto.photoReactions}
								/>
							)}
							{latestPhoto.isLoading ? (
								<View>
									<Text className='text-white'>Loading...</Text>
								</View>
							) : latestPhoto.data && latestPhoto.data.length > 0 ? (
								<View>
									{latestPhoto.data?.map((photo, key) => {
										return (
											<ElementPhoto
												photo={photo}
												toggleScroll={toggleScroll}
												key={key}
												reactions={photo.latestPhoto.photoReactions}
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
					) : (
						<DismissKeyboard>
							{latestPhotoOther.isLoading ? (
								<View>
									<Text className='text-white'>Loading...</Text>
								</View>
							) : latestPhotoOther.data && latestPhotoOther.data.length > 0 ? (
								<View className='h-full'>
									{latestPhotoOther.data?.map((photo, key) => {
										return (
											<ElementPhoto
												//@ts-ignore
												photo={photo}
												key={key}
												toggleScroll={toggleScroll}
												//@ts-ignore
												reactions={photo.latestPhoto.photoReactions}
												refetch={() => latestPhotoOther.refetch()}
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
					)}
				</LayoutOpacityItems>
			)}
			{!startCamera && user && IsTiming(cron.data, userQuery.created) && (
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
			{/* <LinearGradient
				colors={['#00000000', '#111111']}
				style={{
					height: '10%',
					width: '100%',
					position: 'absolute',
					bottom: 0
				}}
			></LinearGradient> */}
		</View>
	)
})

interface IHeaderHome {
	setTypeFriends: () => void
	setTypeOther: () => void
	typeOfCalendarPhotos: 'my_friends' | 'other'
}

export const HeaderHome: FC<IHeaderHome> = ({
	setTypeFriends,
	setTypeOther,
	typeOfCalendarPhotos
}) => {
	const { navigate } = useNavigation<any>()
	const queryClient = useQueryClient()
	const user = queryClient.getQueryData(['get-profile']) as IUser | undefined
	return (
		<View className='flex-1'>
			<View className='flex-row justify-between flex-1 items-center relative'>
				<Text className='text-white text-2xl font-bold absolute text-center w-full'>
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
			</View>
			<View className='flex-row justify-center mt-3 '>
				<Pressable className='p-2' onPress={setTypeFriends}>
					<Text
						className={`text-white font-bold ${
							typeOfCalendarPhotos === 'other' && 'text-white/70'
						}`}
					>
						My friends
					</Text>
				</Pressable>
				<Pressable onPress={setTypeOther} className='ml-1 p-2'>
					<Text
						className={`text-white font-bold ${
							typeOfCalendarPhotos === 'my_friends' && 'text-white/70'
						}`}
					>
						Other people
					</Text>
				</Pressable>
			</View>
		</View>
	)
}
