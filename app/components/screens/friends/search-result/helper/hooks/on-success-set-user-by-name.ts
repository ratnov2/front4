import { IProfile } from "@/shared/types/profile.interface"
import { QueryClient } from "@tanstack/react-query"

export const onSuccessSetUserByName = (
	queryClient: QueryClient,
	userInfo: IProfile
) => {
	queryClient.setQueryData(
		['get-user-by-name'],
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