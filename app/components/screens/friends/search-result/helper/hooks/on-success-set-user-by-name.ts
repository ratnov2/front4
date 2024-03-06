import { IProfile } from '@/shared/types/profile.interface'
import { QueryClient } from '@tanstack/react-query'

export const onSuccessSetUserByName = (
	queryClient: QueryClient,
	userInfo: IProfile
) => {
	//const { setMyFriendByStatus } = useContext(MyFriendContext)
	queryClient.setQueryData(
		['get-user-by-name'],
		(prevData: IProfile[] | undefined) => {
			if (!prevData) {
				return prevData
			}
			//console.log(JSON.stringify(userInfo, null, 2))

			const updatedIndex = prevData.findIndex(
				(item: { _id: string }) => item._id === userInfo._id
			)
			if (updatedIndex !== -1) {
				const newData = [...prevData]
				newData[updatedIndex] = userInfo
				return newData
			}
			return prevData
		}
	)
	console.log('@R');
	
	queryClient.refetchQueries(["get-my-friends"])
	//queryClient.refetchQueries(["get-my-friends"])
	// queryClient.setQueryData(
	// 	['get-my-friends'],
	// 	(prevData: IFriendsip | undefined) => {
	// 		if (!prevData) {
	// 			return prevData
	// 		}

	// 		const updatedIndex = prevData.friendship.findIndex(
	// 			item => item.friends._id === userInfo._id
	// 		)

	// 		if (updatedIndex !== -1) {
	// 			console.log(userInfo)
	// 			const newMassive = [...prevData.friendship]
	// 			newMassive[updatedIndex] = { friends: userInfo, status: '1' }
	// 			const newData = {
	// 				friendship: [...newMassive],
	// 				_id: prevData._id
	// 			}
	// 		} else {
	// 			let newData = [...prevData.friendship]
	// 			let newObj = { ...prevData, friendship: [...newData] }
	// 			newObj.friendship.push(userInfo)
	// 			console.log(JSON.stringify(prevData, null, 2))
	// 			console.log(JSON.stringify(newObj, null, 2));
				

	// 			return newObj
	// 		}
	// 		//prevData
	// 		// 	// newData.friendship[updatedIndex].friends = userInfo
	// 		// 	// newData.friendship[updatedIndex].status = '0'
	// 		// 	return newData
	// 		// }
	// 		return prevData
	// 	}
	// )
	//setMyFriendByStatus('')
}
export const onSuccessSetUserByName2 = (
	queryClient: QueryClient,
	userInfo: IProfile
) => {
	queryClient.setQueryData(
		['get-my-friends'],
		(prevData: IProfile[] | undefined) => {
			if (!prevData) {
				return prevData
			}
			const updatedIndex = prevData.findIndex(
				(item: { _id: any }) => item._id === userInfo._id
			)
			if (updatedIndex !== -1) {
				const newData = [...prevData]
				newData[updatedIndex] = userInfo
				return newData
			}
			return prevData
		}
	)
}
//get-my-friends
