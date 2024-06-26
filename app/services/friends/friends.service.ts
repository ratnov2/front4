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

		const response = await request<IProfile>({
			url: getUsersUrl('/friends/add-friends'),
			method: 'PUT',
			data
		})

		return response
	},
	async getUserByName(data: { name: string; id?: string }) {
		const response = await request<IGetUserByName[]>({
			url: getUsersUrl('/user-by-name'),
			method: 'POST',
			data: {
				...data,
				id: data.id || ''
			}
		})

		return response
	}
}

export interface IFriendsip {
	friendship: {
		friends: IProfile
		status: '0' | '1' | '2' | '3'
	}[]
	_id: string
}

export interface IGetUserByName
	extends Pick<IProfile, '_id' | 'avatar' | 'firstName'> {
	friendship:
		| {
				_id: string
				status: '0' | '1' | '2' | '3'
		  }[]
		| null
}
