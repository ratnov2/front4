import { useDebounce } from '@/hooks/useDebounce'
import { FriendsService } from '@/services/friends/friends.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useSearchingFriends = (id: string) => {
	const [isSearching, setIsSearching] = useState(true)
	const [isDebouncing, setIsDebouncing] = useState(true)
	const [value, isValue] = useState('')

	const debouncedSearchTerm = useDebounce(value, 1000)

	//const { push } = useRouter()
	const getUserByName = useQuery(
		['get-user-by-name'],
		() => FriendsService.getUserByName({ name: value, id }),
		{
			onSuccess: () => {
				setIsSearching(false)
				setIsDebouncing(false)
			},
			enabled: isSearching
		}
	)

	useEffect(() => {
		if (value === '') {
			setIsSearching(false)
			getUserByName.remove()
		} else {
			if (debouncedSearchTerm || debouncedSearchTerm === '') {
				setIsSearching(true)
			} else {
				setIsSearching(false)
			}
		}
	}, [debouncedSearchTerm])

	const setValue = (value: string) => {
		if (value !== '') setIsDebouncing(true)

		isValue(value)
	}

	return { setValue, value, getUserByName, isSearching, isDebouncing }
}
