import { request } from '../api/request.api'
import { getUsersUrl } from '@/config/api.config'
import {
	ILatestInside,
	ILatestInside2,
	ILatestPhoto,
	IProfile
} from '@/shared/types/profile.interface'
import instance from '../api/interceptors.api'
import { TReaction } from '@/components/screens/home/element-photo/ElementPhoto'

export const ProfileService = {
	async getProfile() {
		const response = await request<IProfile>({
			url: getUsersUrl('/profile'),
			method: 'GET'
		})

		return response
	},

	async updateFavoritePhoto(data: TypeUpdateFavoritePhoto) {
		console.log(data)

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
	async getLatestPhotosFriends() {
		const response = await request<ILatestInside[]>({
			url: getUsersUrl('/latest-photo-friends'),
			method: 'GET'
		})

		return response
	},
	async getLatestPhotosOther() {
		const response = await request<ILatestInside2[]>({
			url: getUsersUrl('/latest-photo-people'),
			method: 'GET'
		})
		return response
	},
	async getUser(id: string) {
		const response = await request<IProfile>({
			url: getUsersUrl(`/${id}`),
			method: 'GET'
		})
		return response
	},
	async addMainComment(data: { message: string; created: string }) {
		const response = await instance({
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
	},
	async getCronTime() {
		const response = await request<string>({
			url: getUsersUrl(`/cron`),
			method: 'GET'
		})
		return response
	},
	async addReaction(data: {
		userId: string
		reaction: TReaction
		created: string
	}) {
		const response = await request<string>({
			url: getUsersUrl(`/reaction`),
			method: 'POST',
			data
		})
		return response
	},
	async getReactionByLastPhoto(data: { userId: string; created: string }) {
		const response = await request<{
			_id: string
			avatar: string
			reaction: string
		}>({
			url: getUsersUrl(
				`/reaction?userId=${data.userId}&created=${data.created}`
			),
			method: 'GET2'
		})
		return response
	},
	//notifications
	async sendDeviceToken(data: { deviceToken: string; _id: string }) {
		const response = await request<IProfile>({
			url: '/notifications/add-device-token',
			method: 'POST',
			data
		})

		return response
	}
}

export type TypeUpdateFavoritePhoto = {
	key: 'photoOne' | 'photoTwo' | 'photoThree'
	frontPhoto: string | null
	backPhoto: string | null
	created: string | null
}
export type TypeEditProfile = {
	firtsName: string
	lastName: string
	isLoading: boolean
}

export type IPost = {
	_id: string
	avatar: string
	comment: string
	created: string
	firstName: string
}
