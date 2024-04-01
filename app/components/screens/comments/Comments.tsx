import { useAuth } from '@/hooks/useAuth'
import { createConnection } from '@/services/api/socket'
import { IPost, ProfileService } from '@/services/profile/profile.service'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FC, memo, useEffect, useRef, useState } from 'react'
import {
	Animated,
	FlatList,
	ImageBackground,
	NativeScrollEvent,
	NativeSyntheticEvent,
	PanResponder,
	PlatformColor,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CommentElement } from './CommentElement'
import { PhotoComment } from '../home/element-photo/PhotoComment'
import { PhotoUser } from './PhotoUser'
import { BaseImageUrl } from '@/services/api/interceptors.api'
import { Image } from 'react-native'
import { BlurView } from 'expo-blur'
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import { Devider, EmodziComment } from './CommentEmodzi'
import { LinearGradient } from 'expo-linear-gradient'
import { useStorePhoto } from '../home/element-photo/useStorePhoto'
import { ILatestInside, ILatestPhoto } from '@/shared/types/profile.interface'
import { HeaderProfile } from '../profile/Profile'
import { LayoutOpacityComment } from '@/navigation/ui/LayoutOpacityComment'
import { DraggableImg } from './DraggableImg'
import { VirtualizedList } from './FF'

export const Comments = () => {
	// useEffect(() => {
	// 	createConnection()
	// }, [])
	const insets = useSafeAreaInsets()
	const { params } = useRoute()
	const { navigate } = useNavigation<any>()
	const typeParam = params as { created: string; _id: string }
	const [comments, setComments] = useState<IPost[]>([])
	const userPosts = useQuery(
		['profile/user-posts'],
		() =>
			ProfileService.getPostUserByLink({
				created: typeParam?.created,
				userId: typeParam?._id
			}),
		{
			onSuccess: data => {
				const newData = []
				for (let i = 0; i < data.length; i++) {
					newData.push({ ...data[i % 10], IDD: i })
				}
				setComments(newData)
			}
		}
	)
	const addPost = useMutation(
		['add-post'],
		(data: { message: string; created: string; userId: string }) =>
			ProfileService.addUserMessage(data),
		{
			onSuccess: () => {
				userPosts.refetch()
			}
		}
	)
	const sendMessage = (data: {
		message: string
		created: string
		userId: string
	}) => {
		const comment = {
			//@ts-ignore
			_id: dataFromCache?._id,
			//@ts-ignore
			avatar: dataFromCache.avatar,
			comment: data.message,
			created: data.created,
			//@ts-ignore
			firstName: dataFromCache.firstName,
			isLoading: true
		}

		setComments(state => [...state, comment])
		addPost.mutate({
			created: (params as any).created,
			message: value,
			userId: (params as any)._id
		})
		setValue('')
	}
	//console.log(userPosts.isLoading)

	const queryClient = useQueryClient()

	// Предположим, 'myQueryKey' - это ключ вашего запроса
	const queryKey3 = 'get-latest-people'
	const queryKey2 = 'get-latest-friends'
	const queryKey = 'get-profile'

	//Получите данные из кеша по ключу
	const dataFromCache: ILatestInside[] | undefined = queryClient.getQueryData([
		queryKey
	])
	const dataFromCache2: ILatestInside[] | undefined = queryClient.getQueryData([
		queryKey2
	])
	const dataFromCache3: ILatestInside[] | undefined = queryClient.getQueryData([
		queryKey3
	])
	//get-latest-photo
	const [userMainInfo, setUserMainInfo] = useState<ILatestInside>(
		//@ts-ignore
		(() => {
			//console.log("dataFromCache", dataFromCache);
			//@ts-ignore
			const data = dataFromCache?.calendarPhotos?.filter(user => {
				//@ts-ignore
				return user._id === typeParam._id
			})[0]

			if (data && Object.entries(data).length !== 0)
				return {
					...data,
					latestPhoto: { photos: data.photos },
					//@ts-ignore
					avatar: dataFromCache.avatar,
					//@ts-ignore
					_id: dataFromCache._id,
					//@ts-ignore
					firstName: dataFromCache.firstName
				}
			//@ts-ignore
			if (dataFromCache2[0]?._id === typeParam._id) {
				//@ts-ignore
				return dataFromCache2[0]
			}
			//console.log('wefwefwef',dataFromCache2);
			//@ts-ignore
			const data3 = dataFromCache3.filter(user => {
				//@ts-ignore
				return user._id._id === typeParam._id
			})[0]

			//@ts-ignore
			if (Object.entries(data3).length !== 0)
				return {
					...data3,
					//@ts-ignore
					avatar: data3._id.avatar
					//@ts-ignore
				}
			//for other profile
			//console.log(dataFromCache2)
		})()
	)

	//console.log('userMainInfo', userMainInfo, typeParam)
	const [value, setValue] = useState('')

	const scrollFlatRef = useRef<FlatList>(null)

	useEffect(() => {
		scrollToBottom()
	}, [userPosts.data]) // Пересчитывать прокрутку, когда изменяется массив сообщений

	const [offsetScroll, setOffsetScroll] = useState(0)
	const scrollToBottom = () => {
		if (scrollFlatRef.current) {
			scrollFlatRef.current.scrollToOffset({ offset: 555555 })
		}
	}

	const [shouldScroll, setShouldScroll] = useState(true)
	const toggleScroll = (scroll: boolean) => {
		setShouldScroll(scroll)
	}
	//console.log(JSON.stringify(comments, null,2));
	//console.log('wefewf')

	//return null
	if (!userMainInfo || !userMainInfo.latestPhoto) return null

	const [isButtonVisible, setButtonVisible] = useState(true)
	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent
		const distanceToEnd =
			contentSize.height - contentOffset.y - layoutMeasurement.height
		if (distanceToEnd <= 300) {
			setButtonVisible(false)
		} else {
			setButtonVisible(true)
		}
	}
	return (
		<View className='flex-1'>
			<LayoutOpacityComment created={(params as any).created}>
				{userPosts.data && (
					<VirtualizedList shouldScroll={shouldScroll} ref={scrollFlatRef}>
						<ShareHeader
							toggleScroll={toggleScroll}
							userMainInfo={userMainInfo}
						/>
						<FlatList
							onScroll={handleScroll}
							onLayout={event =>
								setOffsetScroll(event.nativeEvent.layout.height)
							}
							data={comments}
							keyExtractor={(item, index) => item.created + index.toString()}
							renderItem={({ item }) => (
								<CommentElement
									message={item.comment}
									avatar={item.avatar}
									created={item.created}
									email={item.firstName}
									key={item.comment}
									firstName={item.firstName}
									id={item._id}
									isLoading={(item as any)?.isLoading}
								/>
							)}
						/>
						{userPosts.data.length === 0 && (
							<View className='mt-7'>
								<Text className='text-center text-2xl font-medium text-neutral-500'>
									No comments yet
								</Text>
							</View>
						)}
						<View className='h-[100px]'></View>
					</VirtualizedList>
				)}
				{/* {!isButtonVisible && ( */}
				{/* <Pressable
					onPress={() => scrollToBottom()}
					style={{ position: 'absolute', right: 10, bottom: 100 }}
					className=''
				>
					<AntDesign name='downcircle' size={44} color='gray' />
				</Pressable> */}
			</LayoutOpacityComment>

			<View className='absolute bottom-0 flex-1 w-full bg-[#111111]'>
				<View className='bg-neutral-600 h-[1px] w-full'></View>
				<View className=' w-full flex-row'>
					<TextInput
						value={value}
						onChangeText={e => setValue(e)}
						className='text-white p-2 flex-1 text-xl'
						placeholder='Add comment...'
					/>
					<TouchableOpacity
						disabled={!value}
						onPress={() =>
							sendMessage({
								created: (params as any).created,
								message: value,
								userId: (params as any)._id
							})
						}
						className='mx-2 flex justify-center bg-inherit'
					>
						<Ionicons name='send' size={24} color={value ? '#ff2' : '#121'} />
					</TouchableOpacity>
				</View>
				<View className='bg-neutral-600 h-[1px] w-full'></View>
				<View className=' w-full' style={{ height: insets.bottom }}></View>
			</View>
		</View>
	)
}

export const normalDate = (date: string) => {
	const currentDate = new Date()
	const userDate = new Date(date)

	const hour = userDate.getHours()
	const seconds = userDate.getSeconds()
	const minutes = userDate.getMinutes()

	const difference = hour - currentDate.getHours()
	const dateStr = `${hour} : ${minutes} : ${seconds} - ${difference} hours late`
	return dateStr
}

interface IHeaderComponent {
	userMainInfo: ILatestInside
	toggleScroll: (scroll: boolean) => void
}

 const HeaderComponent: FC<IHeaderComponent> = memo(
	({ userMainInfo, toggleScroll }) => {
		const { top } = useSafeAreaInsets()
		return (
			<View className='flex-1' style={{ aspectRatio: 9 / 14 }}>
				<View style={{ height: top + 20 }} />
				<ImageBackground
					source={{
						uri: `${BaseImageUrl}${userMainInfo.latestPhoto.photos.backPhoto?.photo}`
					}}
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%'
					}}
				/>

				<BlurView
					intensity={60}
					style={{
						...{
							position: 'absolute',
							width: '100%',
							height: '100%'
						}
					}}
				/>
				<View className='mx-4 flex-1 rounded-xl overflow-hidden'>
					<DraggableImg
						img1={userMainInfo.latestPhoto.photos.frontPhoto?.photo || ''}
						img2={userMainInfo.latestPhoto.photos.backPhoto?.photo || ''}
						toggleScroll={toggleScroll}
					/>
				</View>
				<View className='h-20' />
			</View>
		)
	}
)

const ShareHeader: FC<IHeaderComponent> = memo(
	({ toggleScroll, userMainInfo }) => {
		return (
			<View className='flex-1'>
				<HeaderComponent
					userMainInfo={userMainInfo}
					toggleScroll={toggleScroll}
				/>
				<EmodziComment
					//@ts-ignore
					reactionsData={userMainInfo.latestPhoto.photoReactions}
				/>
			</View>
		)
	}
)
