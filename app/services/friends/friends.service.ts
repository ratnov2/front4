import { request } from '../api/request.api'
import { getUsersUrl } from '@/config/api.config'
import { ILatestPhoto, IProfile } from '@/shared/types/profile.interface'
import instance from '../api/interceptors.api'

export const FriendsService = {
	async getAllFriends() {
		const response = await request<IProfile>({
			url: getUsersUrl('/friends/all-friends'),
			method: 'GET'
		})

		return response
	},
	async addFriend(data: { friendId: string; status: '0' | '1' | '2' }) {
		const response = await request<IProfile>({
			url: getUsersUrl('/friends/add-friends'),
			method: 'PUT',
			data
		})

		return response
	}
}
