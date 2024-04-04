import { IFriendsStatus } from '@/components/screens/friends/Friends'
import { FriendsService, IFriendsip } from '@/services/friends/friends.service'
import { useQuery } from '@tanstack/react-query'

export const useGetData = () => {
	const myFriends = useQuery<IFriendsip, Error, IFriendsStatus>(
		['get-my-friends'],
		() => FriendsService.getAllFriends(),
		{
			onSuccess: data => {
				if (!data) return false
				//@ts-ignore
				data.friendship = [] //CHECK
			},
			select: data => {
				const myFriendByStatus: IFriendsStatus = {
					friendStatus1: [],
					friendStatus2: [],
					friendStatus3: []
				}
				data.friendship.map(({ friends, status }) => {
					if (status === '1') {
						myFriendByStatus.friendStatus1.push(friends)
					} else if (status === '2') {
						myFriendByStatus.friendStatus2.push(friends)
					} else if (status === '3') {
						myFriendByStatus.friendStatus3.push(friends)
					}
				})

				return myFriendByStatus
			}
		}
	)
}
