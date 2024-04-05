import { FriendsService } from '@/services/friends/friends.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { onSuccessSetUserByName } from './on-success-set-user-by-name'

export const useMutateAddFriend = (
	id: string,
	status: '0' | '1' | '2' | '3'
) => {
	const [isLoading, setIsLoading] = useState(false)
	const queryClient = useQueryClient()
	const addFriend = useMutation(
		[id, status],
		(data: { friendId: string; status: '0' | '1' | '2' | '3' }) =>
			FriendsService.addFriend(data),
			
		{
			onSuccess: userInfo => {
				setTimeout(() => {
					setIsLoading(false)
				}, 500)
				onSuccessSetUserByName(queryClient, userInfo)
			},
			onError: () =>
				setTimeout(() => {
					setIsLoading(false)
				}, 500)
		}
	)
	return { isLoading, setIsLoading, addFriend }
}
