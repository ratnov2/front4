import { request } from '../api/request.api'
import { getUsersUrl } from '@/config/api.config'
import { ILatestPhoto, IProfile } from '@/shared/types/profile.interface'
import instance from '../api/interceptors.api'

export const ProfileService = {
	async getProfile() {
		const response = await request<IProfile>({
			url: getUsersUrl('/profile'),
			method: 'GET'
		})

		return response
	},

	async updateFavoritePhoto(data: TypeUpdateFavoritePhoto) {
		console.log('222', data)

		const response = await instance.put(
			getUsersUrl('/profile/favorite-photos'),
			data
		)
		return response
	},
	async getLatestPhotos() {
		const response = await request<ILatestPhoto[]>({
			url: getUsersUrl('/latest-photo'),
			method: 'GET'
		})
		console.log('response',response);
		
		return response
	}
}

export type TypeUpdateFavoritePhoto = {
	key: 'photoOne' | 'photoTwo' | 'photoThree'
	photo: string
}
