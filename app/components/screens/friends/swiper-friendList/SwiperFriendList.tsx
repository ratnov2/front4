import Swiper from 'react-native-swiper'
import { ShareBody } from '../share-body/ShareBody'
import { FC, RefObject } from 'react'
import { IFriendsStatus } from '../Friends'
import { useSearchingFriends } from '../useSearchingFriends'
import { useAuth } from '@/hooks/useAuth'
import { SuggestionFriends } from '../SuggestionFriends'
import { MyFriends } from '../MyFriends'
import { RequestFriends } from '../RequestFriends'

interface ISwiperFriendList {
	swiperRef: RefObject<Swiper>
	activeIndex: number
	setActiveIndex: (index: number) => void
	myFriendByStatus: IFriendsStatus
}

export const SwiperFriendList: FC<ISwiperFriendList> = ({
	swiperRef,
	activeIndex,
	setActiveIndex,
	myFriendByStatus
}) => {
	const { user } = useAuth()

	const { setValue, value } = useSearchingFriends(String(user?._id))

	const handlerChangeText = (e: string) => {
		setValue(e)
		if (e === '') {
			setValue(e)
		} else {
			setValue(e)
		}
	}
	const componentsArray = [
		<SuggestionFriends key='suggestion' />,
		<MyFriends key='myFriends' friends={myFriendByStatus.friendStatus3} />,
		<RequestFriends
			key='requestFriends'
			friendsStatus1={myFriendByStatus.friendStatus1}
			friendsStatus2={myFriendByStatus.friendStatus2}
		/>
	]
	return (
		<Swiper
			showsPagination={false}
			ref={swiperRef}
			loop={false}
			index={activeIndex}
			onIndexChanged={(index: number) => {
				setActiveIndex(index)
			}}
			//onScroll={handleScroll}
			//scrollEventThrottle={16}
		>
			{componentsArray.map(component => (
				<ShareBody
					handlerChangeText={handlerChangeText}
					key={component.key}
					value={value}
				>
					{component}
				</ShareBody>
			))}
		</Swiper>
	)
}
