import { Pressable, ScrollView, Text, View } from 'react-native'
import { ProfileHeader } from '../profile/header/Header'
import { MainProfile } from '../profile/main/MainProfile'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { UserInfo } from '../profile/user-info/UserInfo'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
	ProfileService,
	TypeEditProfile
} from '@/services/profile/profile.service'
import EditProfileFields, { IEditProfileFields } from './EditProfileFields'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'

export const EditProfile = () => {
	const insets = useSafeAreaInsets()
	const user = useQuery(['get-user'], () => ProfileService.getProfile())
	const { handleSubmit, reset, control, setValue } =
		useForm<TypeEditProfile>({
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

	const updateProfileInfo = useMutation(
		['update-profile-info'],
		(data: TypeEditProfile) => ProfileService.updateProfileInfo(data)
	)
	const onSubmit: SubmitHandler<TypeEditProfile> = data => {
		return updateProfileInfo.mutate(data)
	}
	return (
		<View
			style={{
				paddingTop: insets.top,
				flex: 1,
				marginLeft: 20,
				marginRight: 20
			}}
		>
			{user.data && (
				<View>
					<ProfileHeader />
					<ScrollView>
						<UserInfo user={user.data} />
						<EditProfileFields control={control} />
						<Pressable
							className='bg-red-700 w-36 p-5 mx-auto mt-10  rounded-2xl'
							onPress={handleSubmit(onSubmit)}
						>
							<Text className='text-white font-bold'>Send changes</Text>
						</Pressable>
					</ScrollView>
				</View>
			)}
		</View>
	)
}
