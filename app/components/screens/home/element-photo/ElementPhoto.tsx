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
import { ILatestInside, ILatestPhoto } from '@/shared/types/profile.interface'
import DismissKeyboard from '@/ui/form-elements/field/DismissKeyboard'
import { useStorePhoto } from './useStorePhoto'
import { ImgAvatar } from '../../profile/other-user/OtherUserProfile'
import { normalDate } from '../../comments/CommentElement'

interface IElementPhoto {
	photo: ILatestInside
	refetch: () => void
}

export type BaseExampleProps = {
	className?: string
}

const ShareImageUrl = (photo?: string) => `${BaseImageUrl}${photo}`

export const ElementPhoto: FC<IElementPhoto> = ({ photo, refetch }) => {
	//console.log();

	const navigate = useNavigation()
	const { user } = useAuth()

	const { photos } = photo.latestPhoto
	const { dispatch, store, UnCurrent } = useStorePhoto({ photos })
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

	const [value, setValue] = useState(photo.latestPhoto.comment)
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
	//console.log(photo)

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
						<View className='ml-4'>
							<Link
								to={`/Profile${
									user?._id !== photo._id ? `?id=${photo._id}` : ''
								}`}
							>
								<ImgAvatar avatar={photo.avatar} />
							</Link>
						</View>
						<View className='ml-4'>
							<Text className='text-white font-bold text-base'>{photo.firstName || 'Anonym'}</Text>
							<Text className='text-white/50'>{normalDate(photo.latestPhoto.created)}</Text>
						</View>
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
			<View className='ml-4'>
				{user?._id === photo._id ? (
					!isMessage ? (
						<TouchableOpacity
							onPress={() => {
								setIsMessage(true)
							}}
						>
							<Text className='text-white mt-4'>
								{photo.latestPhoto.comment || '...'}
							</Text>
						</TouchableOpacity>
					) : (
						<View>
							<View
								className={`flex-row items-center mt-4 border-[1px] border-solid border-stone-700 rounded-lg ${
									addMainComment.isLoading && 'bg-stone-900 text-stone-800'
								}`}
								//onPointerDown={() => console.log('@@@')}
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
												created: photo.latestPhoto.created
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
							{photo.latestPhoto.comment || '...'}
						</Text>
					</View>
				)}
				<TouchableOpacity
					className=' rounded-xl mt-1 '
					onPress={() => {
						setIsMessage(false)
						navigate.navigate({
							name: 'Comments' as any,
							params: {
								_id: photo._id,
								created: photo.latestPhoto.created
							}
						} as never)
					}}
				>
					{/* <Link
					to={`/Comments?_id=${photo._id}?created='2022-10-10'`}
					className='items-center flex-row block '
				> */}
					<View className='rounded-xl '>
						<Text className='text-zinc-400'>Add a comments...</Text>
					</View>
					{/* </Link> */}
				</TouchableOpacity>
			</View>
		</View>
	)
}
