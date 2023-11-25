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
		const response = await instance.put(
			getUsersUrl('/profile/favorite-photos'),
			data
		)
		return response
	},
	async updateProfileInfo(data: TypeEditProfile) {
		const response = await instance.put(getUsersUrl('/profile/info'), data)
		return response
	},
	async getLatestPhotos() {
		const response = await request<ILatestPhoto[]>({
			url: getUsersUrl('/latest-photo'),
			method: 'GET'
		})
		//console.log(response)

		return response
	},
	async getUser(id: string) {
		const response = await request<IProfile>({
			url: getUsersUrl(`/${id}`),
			method: 'GET'
		})
		return response
	},
	async addMainComment(data: { message: string; created: Date }) {
		const response = await request({
			url: getUsersUrl(`/profile/main-message`),
			method: 'POST',
			data
		})
		return response
	},
	async addUserMessage(data: {
		message: string
		created: string
		userId: string
	}) {
		const response = await request({
			url: getUsersUrl(`/profile/user-message`),
			method: 'POST',
			data
		})
		return response
	},
	async getPostUserByLink(data: { created: string; userId: string }) {
		const response = await request<IPost[]>({
			url: getUsersUrl(`/profile/user-posts`),
			method: 'POST',
			data
		})
		return response
	}
}

export type TypeUpdateFavoritePhoto = {
	key: 'photoOne' | 'photoTwo' | 'photoThree'
	photo: string
}
export type TypeEditProfile = {
	firtsName: string
	lastName: string
	avatar: string
}

export type IPost = {
	_id: string
	avatar: string
	message: string
	created:string
}
