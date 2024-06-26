import { useAuth } from '@/hooks/useAuth'
import { BaseImageUrl, BaseImageUrl2 } from '@/services/api/interceptors.api'
import { Link, useNavigation } from '@react-navigation/native'
import { FC, forwardRef, useEffect, useReducer, useRef, useState } from 'react'
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
	AntDesign,
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
import Animated, {
	Keyframe,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming
} from 'react-native-reanimated'
import { AnimationReaction } from './AnimationReaction'

//import { Draggable } from '../Draggable/Draggable'

interface IElementPhoto {
	photo: ILatestInside
	refetch: () => void
	toggleScroll: (scroll: boolean) => any
	reactions: { userId: string; reactionType: TReaction }[]
	startCamera: () => void
	cron: string | undefined
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
	startCamera,
	cron
}) => {
	const queryClient = useQueryClient()

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
	const opacity = useSharedValue(1)
	useEffect(() => {
		if (isVisibleElementsPhoto) {
			opacity.value = withTiming(1)
		} else {
			opacity.value = withTiming(0)
		}
	}, [isVisibleElementsPhoto])
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

						<Animated.View
							className='absolute bottom-0 w-full'
							style={{ opacity }}
						>
							<Reactions
								reactions={reactions}
								userId={photo._id}
								created={photo.latestPhoto.created}
								isVisibleElementsPhoto={isVisibleElementsPhoto}
							/>
						</Animated.View>

						{cron &&
							!IsTiming(cron, user.data?.latestPhoto?.created || null) && (
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
						{user.data?.latestPhoto.comment ? (
							<Text className='text-white mt-2'>
								{user.data?.latestPhoto.comment || '...'}
							</Text>
						) : (
							<View className='mt-2 mx-2 mb-2 flex-row items-center justify-between  flex-1'>
								<Text className='text-white'>Add comment</Text>
								<AntDesign name='pluscircle' size={34} color='white' />
							</View>
						)}
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
									{user.data.latestPhoto.comments > 0
										? `${user.data.latestPhoto.comments} комменатариев`
										: 'Комментировать'}
								</Text>
							) : (
								<Text className='text-zinc-900'>
									{photo.latestPhoto.comments > 0
										? `${photo.latestPhoto.comments} комменатариев`
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
	isVisibleElementsPhoto: boolean
}

const Reactions: FC<IReactions> = ({ reactions, userId, created }) => {
	const queryClient = useQueryClient()
	const [isVisibleSmile, setIsVisibleSmile] = useState(false)
	//const [isVisibleReactions, setIsReactions] = useState(false)
	const [size, setSize] = useState({ height: 0, width: 0, x: 0, y: 0 })
	//const [stateReaction, setStateReactions] = useState(reactions)
	const user = useQuery<IProfile>(['get-profile'])
	const addReaction = useMutation(
		['add-reaction'],
		(reaction: TReaction) =>
			ProfileService.addReaction({ userId, reaction, created }),
		{
			onSuccess: newData => {
				queryClient.refetchQueries(['get-profile'])
				queryClient.refetchQueries(['get-latest-people'])
				queryClient.refetchQueries(['get-latest-friends'])
				show()
				//setIsVisibleSmile(!isVisibleSmile)
			}
		}
	)
	const DURATION = 500
	const DELAY = 100

	const opacity = [
		useSharedValue(0),
		useSharedValue(0),
		useSharedValue(0),
		useSharedValue(0),
		useSharedValue(0)
	]
	const translate = [
		useSharedValue(100),
		useSharedValue(100),
		useSharedValue(100),
		useSharedValue(100),
		useSharedValue(100)
	]
	const show = () => {
		if (isVisibleSmile) {
			opacity.map((el, key) => {
				el.value = withDelay(key * DELAY, withTiming(0, { duration: DURATION }))
			})
			translate.map((el, key) => {
				el.value = withDelay(
					key * DELAY,
					withTiming(100, { duration: DURATION })
				)
			})
		} else {
			opacity.map((el, key) => {
				el.value = withDelay(key * DELAY, withTiming(1, { duration: DURATION }))
			})
			translate.map((el, key) => {
				el.value = withDelay(
					key * DELAY,
					withTiming(-10, { duration: DURATION })
				)
			})
		}

		setIsVisibleSmile(!isVisibleSmile)
	}

	// const enteringAnimation = new Keyframe({
	// 	0: {
	// 		transform: [{ translateY: 0 }],
	// 		opacity: 0
	// 	},

	// 	100: {
	// 		transform: [{ translateY: -100 }],
	// 		opacity: 1
	// 	}
	// })
	// const exitingAnimation = new Keyframe({
	// 	0: {
	// 		transform: [{ translateY: -100 }],
	// 		opacity: 1
	// 	},

	// 	100: {
	// 		transform: [{ translateY: 0 }],
	// 		opacity: 0
	// 	}
	// })

	return (
		<View
			className='flex-1 flex-row justify-between pb-4 relative '
			onLayout={e => setSize(e.nativeEvent.layout)}
		>
			<View className='flex-1'>
				<View className='flex-1 mx-4 flex-row'>
					{reactions.slice(0, 7).map((reaction, key) => {
						return (
							<AnimationReaction
								avatar={reaction?.avatar || ''}
								index={key}
								key={key}
								reactionType={reactionsData2[reaction.reactionType]}
								reactionsLength={reactions.length}
								isVisibleSmile={isVisibleSmile}
							/>
						)
					})}
				</View>
			</View>

			{/* {isVisibleSmile && ( */}

			<View className='absolute -bottom-[10px] flex-row'>
				{['😁', '😂', '😍', '😐', '🤮'].map((smile, key) => {
					return (
						<Animated.View
							style={{
								opacity: opacity[key],
								transform: [{ translateY: translate[key] }]
							}}
							key={key}
						>
							<Pressable
								onPress={() => addReaction.mutate(reactionsData[key])}
								key={key}
							>
								<Text style={{ fontSize: size.width / 8 }}>{smile}</Text>
							</Pressable>
						</Animated.View>
					)
				})}
				<Pressable onPress={show} style={{ transform: [{ translateY: -15 }] }}>
					<MaterialCommunityIcons
						name='lightning-bolt-circle'
						size={size.width / 6}
						color='white'
					/>
				</Pressable>
			</View>

			{/* )} */}
			{/* </View> */}
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
