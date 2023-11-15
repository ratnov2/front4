import { IFriendsip } from '@/services/friends/friends.service'
import { UseQueryResult } from '@tanstack/react-query'
import { FC } from 'react'
import { View } from 'react-native'
import { FriendItem } from './ui/friend-item'

interface IMyFriends {
	friends: UseQueryResult<IFriendsip, unknown>
}

export const MyFriends: FC<IMyFriends> = ({ friends }) => {
	return (
		<View>
			{friends.data && (
				<View>
					{friends.data.friendship.map(friend => {
						if (friend.status === '3') {
							return (
								<FriendItem
									avatar={friend.friends.avatar}
									name={friend.friends.firstName}
								/>
							)
						} else return null
					})}
				</View>
			)}
		</View>
	)
}
