import { useAuth } from '@/hooks/useAuth'
import { BaseImageUrl } from '@/services/api/interceptors.api'
import { Link, useNavigation } from '@react-navigation/native'
import { FC, useReducer, useRef, useState } from 'react'
import {
	ActivityIndicator,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import userPng from '@/assets/user.png'
import { MaterialIcons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import { ILatestPhoto } from '@/shared/types/profile.interface'
import DismissKeyboard from '@/ui/form-elements/field/DismissKeyboard'
import { useStorePhoto } from './useStorePhoto'

interface IElementPhoto {
	photo: ILatestPhoto
	refetch: () => void
}

export type BaseExampleProps = {
	className?: string
}

const ShareImageUrl = (photo?: string) => `${BaseImageUrl}${photo}`

export const ElementPhoto: FC<IElementPhoto> = ({ photo, refetch }) => {
	const navigate = useNavigation()
	const { user } = useAuth()

	const photosUser = photo.calendarPhotos.photos
	const { dispatch, store, UnCurrent } = useStorePhoto({ photosUser })
	// const [photos, setPhotos] = useState(
	// 	(() => {
	// 		const current =
	// 			photosUser.frontPhoto?.photo || photosUser.backPhoto?.photo
	// 		const unCurrent =
	// 			!photosUser.frontPhoto?.photo || !photosUser.backPhoto?.photo
	// 		return current
	// 	})()
	// )
	// console.log(photos)

	const [value, setValue] = useState(photo.calendarPhotos.comment)
	const [isMessage, setIsMessage] = useState(false)
	//console.log(photo.calendarPhotos)

	const addMainComment = useMutation(
		['add-main-comment'],
		(data: { message: string; created: Date }) =>
			ProfileService.addMainComment(data),
		{
			onSuccess: () => {
				setIsMessage(false)
				refetch()
			}
		}
	)
	console.log(photo)

	return (
		<View className='' style={{ marginBottom: 70 }}>
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
									user?._id !== photo._id ? `?id=${photo._id}` : ''
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
						<Text style={{ marginLeft: 10 }} className='text-white'>
							{photo.name || 'Anonym'}
						</Text>
					</View>
					<View style={{ aspectRatio: 9 / 16 }} className='relative'>
						<Image
							className='rounded-2xl'
							style={{
								resizeMode: 'cover',
								flex: 1,
								aspectRatio: 9 / 16,
								borderRadius: 20
							}}
							source={{
								uri: ShareImageUrl(store[store.current || 'backPhoto']?.photo)
							}}
						/>
						{store.length === 2 && (
							<TouchableOpacity
								className='absolute left-4 top-4 border-2 border-solid border-stone-900 rounded-xl overflow-hidden'
								onPress={() => dispatch({ type: store.current })}
							>
								<View className=''>
									<Image
										className='w-32 h-36'
										style={{ aspectRatio: 13 / 17 }}
										source={{
											uri: ShareImageUrl(store[UnCurrent(store.current)]?.photo)
										}}
									/>
								</View>
							</TouchableOpacity>
						)}
					</View>
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
							{photo.calendarPhotos.comment || '...'}
						</Text>
					</TouchableOpacity>
				) : (
					<View>
						<View
							className={`flex-row items-center mt-4 border-[1px] border-solid border-stone-700 rounded-lg ${
								addMainComment.isLoading && 'bg-stone-900 text-stone-800'
							}`}
							onPointerDown={() => console.log('@@@')}
						>
							<TextInput
								value={value}
								onChangeText={e => setValue(e)}
								className={`p-2 rounded-lg flex-1 color-white ${
									addMainComment.isLoading && ' text-stone-600'
								}`}
								pointerEvents={addMainComment.isLoading ? 'none' : 'auto'}
								placeholder='input text'
								keyboardType='default'
								onBlur={() => setIsMessage(false)}
							/>

							{!addMainComment.isLoading ? (
								<TouchableOpacity
									className='mx-2'
									onPress={() => {
										addMainComment.mutate({
											message: value,
											created: photo.calendarPhotos.created
										})
									}}
								>
									<MaterialIcons name='send' size={24} color='white' />
								</TouchableOpacity>
							) : (
								<ActivityIndicator className='mx-2' size={24} color='white' />
							)}
						</View>
						<TouchableOpacity
							className='bg-cyan-400 text-center rounded-xl'
							onPress={() => setIsMessage(false)}
						>
							<Text className='text-stone-950 text-center p-2 font-bold'>
								Close
							</Text>
						</TouchableOpacity>
					</View>
				)
			) : (
				<View>
					<Text className='text-white mt-4'>
						{photo.calendarPhotos.comment || '...'}
					</Text>
				</View>
			)}
			<TouchableOpacity
				className='text-center rounded-xl flex-row items-center justify-center mt-5 '
				onPress={() => {
					setIsMessage(false)
					navigate.navigate({
						name: 'Comments' as any,
						params: {
							_id: photo._id,
							created: photo.calendarPhotos.created
						}
					} as never)
				}}
			>
				{/* <Link
					to={`/Comments?_id=${photo._id}?created='2022-10-10'`}
					className='items-center flex-row block '
				> */}
				<View className='text-center rounded-xl flex-row items-center justify-center mt-5'>
					<MaterialIcons name='comment' size={24} color='white' />
					<Text className='text-white text-center p-2 font-bold'>
						Add comments
					</Text>
				</View>
				{/* </Link> */}
			</TouchableOpacity>
		</View>
	)
}
