import { IProfile } from '@/shared/types/profile.interface'
import { request } from '../api/request.api'
import { getUsersUrl } from '@/config/api.config'

export const FriendsService = {
	async getAllFriends() {
		const response = await request<IFriendsip>({
			url: getUsersUrl('/friends/all-friends'),
			method: 'GET'
		})

		return response
	},
	async addFriend(data: { friendId: string; status: '0' | '1' | '2' | '3' }) {
		const response = await request<IFriendsip[]>({
			url: getUsersUrl('/friends/add-friends'),
			method: 'PUT',
			data
		})

		return response
	}
}

export interface IFriendsip {
	friendship: {
		friends: IProfile
		status: string
	}[]
	_id: string
}
