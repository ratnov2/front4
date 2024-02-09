import { FC, ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { SearchInput } from '../search-result/SeacrhInput'
import { Invite } from '../ui/Invite'
import Swiper from 'react-native-swiper'
import { FriendsSearchResult } from '../search-result/SearchResult'
import { useSearchingFriends } from '../useSearchingFriends'
import { useAuth } from '@/hooks/useAuth'

interface IShareBody {
	children: ReactNode
	handlerChangeText: (e: string) => void
	value: string
}

export const ShareBody: FC<IShareBody> = ({
	children,
	handlerChangeText,
	value
}) => {
	const { user } = useAuth()
	const { getUserByName } = useSearchingFriends(String(user?._id))
	return (
		<ScrollView className='px-4'>
			<SearchInput value={value} handlerChangeText={handlerChangeText} />

			{getUserByName.data || value ? (
				<FriendsSearchResult />
			) : (
				<View>
					<Invite />
					{children}
				</View>
			)}
		</ScrollView>
	)
}
