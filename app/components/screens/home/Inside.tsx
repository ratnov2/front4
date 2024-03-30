import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import { FC, memo, useEffect, useRef, useState } from 'react'
import { Camera } from 'expo-camera'
// import CameraExpo from './CamerExpo'
import { useAuth } from '@/hooks/useAuth'
import { FilesService } from '@/services/files/files.service'
import { ElementPhoto } from './element-photo/ElementPhoto'
import DismissKeyboard from '@/ui/form-elements/field/DismissKeyboard'
import { Entypo, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LayoutOpacityItems } from '@/navigation/ui/LayoutOpacityItems'
import { UserAvatar } from '@/ui/user-avatar/UserAvatar'
import { CameraComponent } from './relax/Camera'
import { IUser } from '@/shared/types/user.interface'
import { IsTiming } from './IsTiming'

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
			setStartCamera(false)
			mutate(formData)
			//setStartCamera(false)
		}
	}

	const { mutate, isLoading, data } = useMutation(
		['push-photo'],
		(form: FormData) => FilesService.pushTwoPhoto(form),
		{
			onSuccess: () => {
				setStartCamera(false)
				queryClient.refetchQueries({
					queryKey: ['get-profile'],
					type: 'active'
				})
			}
		}
	)
	///
	//console.log(data);

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
	//console.log('userQuery', userQuery)

	const [shouldScroll, setShouldScroll] = useState(true)
	const toggleScroll = (scroll: boolean) => {
		setShouldScroll(scroll)
	}

	return (
		<View style={{ flex: 1 }}>
			<Text className='text-white text-4xl'>{isLoading && 'ISLOADING'}</Text>
			{startCamera && (
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
							{!!userQuery?.latestPhoto &&
								IsTiming(cron.data, userQuery.latestPhoto.created || null) && (
									<ElementPhoto
										photo={latestPhotoUse as any}
										toggleScroll={toggleScroll}
										refetch={() => latestPhoto.refetch()}
										reactions={userQuery.latestPhoto?.photoReactions}
										startCamera={() => __startCamera()}
									/>
								)}
							{latestPhoto?.isLoading ? (
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
												startCamera={() => __startCamera()}
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
											Здесь пока нет фото пользователей
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
												startCamera={() => __startCamera()}
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
											Здесь пока нет фото пользователей
										</Text>
									</View>
								</View>
							)}
							<View className='pb-28'></View>
						</DismissKeyboard>
					)}
				</LayoutOpacityItems>
			)}
			{!startCamera &&
				user &&
				!IsTiming(cron.data, userQuery.latestPhoto?.created || null) && (
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
