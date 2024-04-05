import { useAuth } from '@/hooks/useAuth'
import { BaseImageUrl, BaseImageUrl2 } from '@/services/api/interceptors.api'
import { Link, useNavigation } from '@react-navigation/native'
import { FC, useEffect, useReducer, useRef, useState } from 'react'
//import Draggable from 'react-native-draggable'
import {
	ActivityIndicator,
	Image,
	KeyboardAvoidingView,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import userPng from '@/assets/user.png'
import {
	MaterialCommunityIcons,
	MaterialIcons,
	SimpleLineIcons
} from '@expo/vector-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import {
	ILatestInside,
	ILatestPhoto,
	IProfile
} from '@/shared/types/profile.interface'
import DismissKeyboard from '@/ui/form-elements/field/DismissKeyboard'
import { useStorePhoto } from './useStorePhoto'
import { ImgAvatar } from '../../profile/other-user/OtherUserProfile'
import { normalDate } from '../../comments/CommentElement'
import { Draggable } from '../Draggable/Draggable'
import { IsTiming } from '../IsTiming'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableHighlight } from 'react-native-gesture-handler'

//import { Draggable } from '../Draggable/Draggable'

interface IElementPhoto {
	photo: ILatestInside
	refetch: () => void
	toggleScroll: (scroll: boolean) => any
	reactions: { userId: string; reactionType: TReaction }[]
	startCamera: () => void
}

export type BaseExampleProps = {
	className?: string
}
export type TReaction =
	| 'happy_face'
	| 'laughing'
	| 'kiss'
	| 'straight_face'
	| 'distress'
//😁 || 😂 || 😍 || 😐 || 🤮
export const ElementPhoto: FC<IElementPhoto> = ({
	photo,
	refetch,
	toggleScroll,
	reactions,
	startCamera
}) => {
	const queryClient = useQueryClient()
	const cron = queryClient.getQueryData(['get-cron-time'])

	const navigate = useNavigation()
	const [isVisibleElementsPhoto, setIsVisibleElementsPhoto] = useState(true)
	const [value, setValue] = useState(photo.latestPhoto.comment)
	const [isMessage, setIsMessage] = useState(false)

	const user = useQuery<IProfile>(['get-profile'])

	const addMainComment = useMutation(
		['add-main-comment'],
		(data: { message: string; created: string }) =>
			ProfileService.addMainComment(data),

		{
			onMutate: async newF => {
				queryClient.cancelQueries({ queryKey: ['get-profile'] })
				const previous = queryClient.getQueryData(['get-profile'])
				queryClient.setQueryData(['get-profile'], (data2?: IProfile) => {
					if (!data2) return data2
					const newDate = JSON.parse(JSON.stringify(data2))
					newDate.latestPhoto.comment = newF.message
					return newDate
				})
			},
			onSuccess: dataRes => {
				queryClient.setQueryData(['get-profile'], (data?: IProfile) => {
					if (!data) return data
					const newDate = JSON.parse(JSON.stringify(data))
					queryClient.cancelQueries(['get-profile'])
					newDate.latestPhoto.comment = dataRes.data
					queryClient.invalidateQueries(['get-profile'])
					return newDate
				})

				setIsMessage(false)
			}
		}
	)
	const textInputRef = useRef<TextInput>(null)
	const handleButtonPress = () => {
		setIsMessage(true)
	}
	useEffect(() => {
		if (isMessage && textInputRef.current) {
			textInputRef.current.focus()
		}
	}, [isMessage])

	return (
		<View style={{ marginBottom: 70 }}>
			{photo && (
				<View style={{ flex: 1 }} className='relative'>
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
									user.data?._id !== photo._id ? `?id=${photo._id}` : ''
								}`}
							>
								<ImgAvatar avatar={photo.avatar} />
							</Link>
						</View>
						<View className='ml-4'>
							<Text className='text-white font-bold text-base'>
								{photo.firstName || 'Anonym'}
							</Text>
							<Text className='text-white/50'>
								{normalDate(photo.latestPhoto.created)}
							</Text>
						</View>
					</View>
					<View
						style={{ aspectRatio: 9 / 12 }}
						className='rounded-xl overflow-hidden'
					>
						<Draggable
							img1={
								(photo.latestPhoto.photos.frontPhoto?.photo || '') as string
							}
							img2={(photo.latestPhoto.photos.backPhoto?.photo || '') as string}
							toggleScroll={toggleScroll}
							setIsVisibleElementsPhoto={(type: boolean) =>
								setIsVisibleElementsPhoto(type)
							}
							isVisibleElementsPhoto={isVisibleElementsPhoto}
						/>
						{isVisibleElementsPhoto && (
							<View className='absolute bottom-0 w-full'>
								<Reactions
									reactions={reactions}
									userId={photo._id}
									created={photo.latestPhoto.created}
								/>
							</View>
						)}
						{!IsTiming(cron, user.data?.latestPhoto?.created || null) && (
							<View className='bg-neutral-700 w-full h-full top-0 left-0 flex justify-center items-center'>
								<Pressable
									className='bg-white rounded-2xl p-2 border-[2px] border-black'
									onPress={startCamera}
								>
									<Text className='text-neutral-800 text-2xl font-bold'>
										Post BePrime
									</Text>
								</Pressable>
							</View>
						)}
					</View>
				</View>
			)}
			{/* {!IsTiming(cron.data, user2?.data?.latestPhoto?.created) && */}
			<View className=''>
				{user.data?._id === photo._id && !isMessage ? (
					<TouchableOpacity onPress={handleButtonPress}>
						<Text className='text-white mt-4'>
							{user.data?.latestPhoto.comment || '...'}
						</Text>
					</TouchableOpacity>
				) : (
					user.data?._id === photo._id &&
					isMessage && (
						<View>
							<View
								className={`flex-row items-center mt-4 border-[1px] border-solid border-stone-700 rounded-lg ${
									addMainComment.isLoading && 'bg-stone-900 text-stone-800'
								}`}
								//onPointerDown={() => console.log('@@@')}
							>
								<TextInput
									ref={textInputRef}
									value={value}
									onChangeText={e => setValue(e)}
									className={`p-2 rounded-lg flex-1 color-white  ${
										addMainComment.isLoading && ' text-stone-600'
									}`}
									pointerEvents={addMainComment.isLoading ? 'none' : 'auto'}
									placeholder='input text'
									onBlur={() => {
										!addMainComment.isLoading && setIsMessage(false)
									}}
									onSubmitEditing={() =>
										addMainComment.mutate({
											message: value,
											created: photo.latestPhoto.created
										})
									}
								>
									{/* <View className='bg-yellow-300 w-20 h-20 absolute right-0 bottom-0'></View> */}
								</TextInput>

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
						</View>
					)
				)}
				{IsTiming(cron, user.data?.latestPhoto?.created || null) &&
					user.data?._id !== photo._id && (
						<View>
							<Text className='text-white mt-4'>
								{photo.latestPhoto.comment}
							</Text>
						</View>
					)}

				{IsTiming(cron, user.data?.latestPhoto?.created || null) && (
					<TouchableOpacity
						className='rounded-xl mt-1 bg-white p-3'
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
						<View className='rounded-xl flex-row justify-between items-center'>
							{user.data?._id === photo._id ? (
								<Text className='text-zinc-600 text-base'>
									{user.data.latestPhoto.comments.length > 0
										? `${user.data.latestPhoto.comments.length} комменатариев`
										: 'Комментировать'}
								</Text>
							) : (
								<Text className='text-zinc-900'>
									{photo.latestPhoto.comments.length > 0
										? `${photo.latestPhoto.comments.length} комменатариев`
										: 'Комментировать'}
								</Text>
							)}
							<SimpleLineIcons name='arrow-right' size={18} color='black' />
						</View>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}
export interface IReactions {
	reactions: { userId: string; reactionType: TReaction }[]
	userId: string
	created: string
}

const Reactions: FC<IReactions> = ({ reactions, userId, created }) => {
	const queryClient = useQueryClient()
	const [isVisibleSmile, setIsVisibleSmile] = useState(false)
	const [size, setSize] = useState({ height: 0, width: 0, x: 0, y: 0 })
	//const [stateReaction, setStateReactions] = useState(reactions)
	const user = useQuery<IProfile>(['get-profile'])
	const addReaction = useMutation(
		['add-reaction'],
		(reaction: TReaction) =>
			ProfileService.addReaction({ userId, reaction, created }),
		{
			onSuccess: newData => {
				// queryClient.setQueryData(['get-profile'], (data: any) => {
				// 	const latestPhotoCopy = { ...data.latestPhoto }
				// 	latestPhotoCopy.photoReactions = newData
				// 	setStateReactions([...newData])
				// 	setIsVisibleSmile(!isVisibleSmile)
				// 	return {
				// 		...data,
				// 		latestPhoto: latestPhotoCopy
				// 	}
				// })

				queryClient.refetchQueries(['get-profile'])
				queryClient.refetchQueries(['get-latest-people'])
				queryClient.refetchQueries(['get-latest-friends'])

				setIsVisibleSmile(!isVisibleSmile)
				// queryClient.setQueryData(['get-latest-people'], (data: any) => {
				// 	for (let i = 0; i < data.length; i++) {
				// 		// if(data._id._id === ){
				// 		// 	break
				// 		// }
				// 	}
				// 	// const latestPhotoCopy = { ...data.latestPhoto }
				// 	// latestPhotoCopy.photoReactions = newData
				// 	// setStateReactions([...newData])
				// 	// setIsVisibleSmile(!isVisibleSmile)
				// 	// return {
				// 	// 	...data,
				// 	// 	latestPhoto: latestPhotoCopy
				// 	// }
				// })
			}
		}
	)
	console.log(reactions)

	return (
		<View
			className='flex-1 flex-row justify-between pb-4 relative'
			onLayout={e => setSize(e.nativeEvent.layout)}
		>
			<View className='flex-1'>
				{!isVisibleSmile && (
					<View className='flex-1 mx-4 flex-row'>
						{reactions.slice(0, 7).map((reaction, key) => (
							<Pressable
								className={`relative ${reactions.length > 4 && key !== 0 && '-ml-4'} border-stone-200 border-[1px] rounded-full`}
								key={key}
							>
								<ImgAvatar avatar={reaction?.avatar} size='reaction-main' />
								<Text className='absolute bottom-0 -left-1'>
									{reactionsData2[reaction.reactionType]}
								</Text>
							</Pressable>
						))}
					</View>
				)}
			</View>

			<Pressable
				className={`pr-4 ${isVisibleSmile ? 'pb-14' : ''}`}
				onPress={() => setIsVisibleSmile(!isVisibleSmile)}
			>
				<MaterialCommunityIcons name='dots-circle' size={49} color='white' />
			</Pressable>
			{isVisibleSmile && (
				<View
					className={`absolute items-center w-full bg-white/10 flex-row justify-between bottom-0`}
				>
					{['😁', '😂', '😍', '😐', '🤮'].map((smile, key) => {
						return (
							<Pressable
								onPress={() => addReaction.mutate(reactionsData[key])}
								key={key}
							>
								<Text style={{ fontSize: size.width / 7 }}>{smile}</Text>
							</Pressable>
						)
					})}
				</View>
			)}
		</View>
	)
}
export const reactionsData2 = {
	happy_face: '😁',
	laughing: '😂',
	kiss: '😍',
	straight_face: '😐',
	distress: '🤮'
}
const reactionsData = [
	'happy_face',
	'laughing',
	'kiss',
	'straight_face',
	'distress'
] as TReaction[]
