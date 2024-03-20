import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View
} from 'react-native'
import { MainProfile } from '../profile/main/MainProfile'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { UserInfo } from '../profile/user-info/UserInfo'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	ProfileService,
	TypeEditProfile
} from '@/services/profile/profile.service'
import EditProfileFields, { IEditProfileFields } from './EditProfileFields'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { InsideLayout } from '@/ui/inside-layout/InsideLayout'
import { LayoutOpacityItems } from '@/navigation/ui/LayoutOpacityItems'
import { HeaderProfile } from '../profile/Profile'
import { UserAvatar, UserAvatar2 } from '../profile/user-info/UserAvatar'
import { LayoutLightOpacity } from '@/navigation/ui/LayoutLightOpacity'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { FilesService } from '@/services/files/files.service'
import mime from 'mime'
import { BaseImageUrl2 } from '@/services/api/interceptors.api'

export const EditProfile = () => {
	const insets = useSafeAreaInsets()
	const { navigate } = useNavigation<any>()
	const [delayedIsLoading, setDelayedIsLoading] = useState(false)
	const user = useQuery(['get-profile'], () => ProfileService.getProfile())
	const { handleSubmit, reset, control, setValue } = useForm<TypeEditProfile>({
		mode: 'onChange',
		defaultValues: {}
	})

	useEffect(() => {
		if (user.data) {
			reset({
				//@ts-ignore
				firstName: user.data.firstName,
				lastName: user.data.lastName,
				avatar: user.data.avatar
			})
		}
	}, [user.data])
	const queryCLient = useQueryClient()
	const updateProfileInfo = useMutation(
		['update-profile-info'],
		(data: TypeEditProfile) => ProfileService.updateProfileInfo(data),
		{
			onSuccess: () => {
				setTimeout(() => setDelayedIsLoading(false), 500)
				queryCLient.refetchQueries(['get-profile'])
			},
			onError: () => setTimeout(() => setDelayedIsLoading(false), 500)
		}
	)
	const onSubmit: SubmitHandler<TypeEditProfile> = data => {
		setDelayedIsLoading(true)
		return updateProfileInfo.mutate(data)
	}
	const [chooseAvatar, setChooseAvatar] = useState(
		user.data && user.data.avatar ? BaseImageUrl2(user.data.avatar) : ''
	)
	//console.log(chooseAvatar);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		})

		if (!result.canceled) {
			// Обработка выбранного изображения
			//console.log(result.uri)
			setChooseAvatar(result.assets[0].uri)
			//console.log(result.assets[0].uri)
			const formData = new FormData()
			//@ts-ignore
			formData.append('image', {
				uri: result.assets[0].uri,
				type: 'image/jpeg', 
				name: 'photo.jpg'
			})
			mutate({ form: formData, path: 'folder=avatar' })
		}
	}
	const { mutate, data } = useMutation(
		['push-photo'],
		({ form, path }: { form: FormData; path: string }) =>
			FilesService.pushPhoto(form, path)
	)

	return (
		<View className='flex-1'>
			{user.data && (
				<LayoutLightOpacity
					onGoBack={() => navigate('Profile')}
					title='Edit Profile'
				>
					<View className='flex-1 relative'>
						<UserAvatar2
							user={user.data}
							isSetImg={pickImage}
							chooseAvatar={chooseAvatar}
						/>
						<Text className='text-white text-center text-base font-bold mt-1'>
							Set profile picture
						</Text>
						<EditProfileFields control={control} isLoading={delayedIsLoading} />
						<Pressable
							className='bg-red-700 w-full h-14 mx-auto mt-10  rounded-2xl flex justify-center'
							onPress={handleSubmit(onSubmit)}
						>
							{delayedIsLoading ? (
								<ActivityIndicator size={'large'} />
							) : (
								<Text className='text-white font-bold text-center'>
									Send changes
								</Text>
							)}
						</Pressable>
					</View>
				</LayoutLightOpacity>
			)}
		</View>
	)
}
