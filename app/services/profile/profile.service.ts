import { request } from '../api/request.api'
import { getUsersUrl } from '@/config/api.config'
import { IProfile } from '@/shared/types/profile.interface'
import instance from '../api/interceptors.api'

export const ProfileService = {
	async getProfile() {
		const response = await request<IProfile>({
			url: getUsersUrl('/profile'),
			method: 'GET'
		})
		return response
	},
	async updateFavoritePhoto(){
		const response = await instance.put(getUsersUrl('/profile/favorite-photos'),{key:'photoOne',photo:'HWIJHFDWJHWFIWDFHGIGWF'})
		return response
	}
}
