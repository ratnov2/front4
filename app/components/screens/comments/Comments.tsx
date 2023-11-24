import { useAuth } from '@/hooks/useAuth'
import { createConnection } from '@/services/api/socket'
import { ProfileService } from '@/services/profile/profile.service'
import { useRoute } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CommentElement } from './CommentElement'

export const Comments = () => {
	// useEffect(() => {
	// 	createConnection()
	// }, [])
	const insets = useSafeAreaInsets()
	const { params } = useRoute()
	const userPosts = useQuery(['profile/user-posts'], () =>
		ProfileService.getPostUserByLink({
			created: (params as any)?.created,
			userId: (params as any)?._id
		})
	)
	const addPost = useMutation(
		['add-post'],
		(data: { message: string; created: string; userId: string }) =>
			ProfileService.addUserMessage(data),
		{
			onSuccess: () => userPosts.refetch()
		}
	)
	const { user } = useAuth()
	console.log(userPosts.data);
	
	// console.log(userPosts.data)
	// console.log(params)

	return (
		<View style={{ marginTop: insets.top }} className='flex-1'>
			{userPosts && (
				<View>
					{/* {userPosts.data?.map((post, key) => (
					<CommentElement
						message={post.message}
						key={key}
						avatar={post.avatar}
					/>
				))} */}
					<FlatList
						data={userPosts.data}
						inverted
						contentContainerStyle={{ flexDirection: 'column-reverse' }}
						renderItem={({ item }) => (
							<CommentElement
								message={item.message}
								avatar={item.avatar}
								created={item.created}
							/>
						)}
					/>
				</View>
			)}
			<TouchableOpacity
				onPress={() =>
					addPost.mutate({
						created: (params as any).created,
						message: '!!!@##',
						userId: (params as any)._id
					})
				}
				className='absolute bottom-0 bg-red-700 w-full p-4'
			>
				<Text className='text-white text-center'>ADD MESSAGE</Text>
			</TouchableOpacity>
		</View>
	)
}
