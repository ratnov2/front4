import { request } from '../api/request.api'
import { getUsersUrl } from '@/config/api.config'
import { IProfile } from '@/shared/types/profile.interface'

export const ProfileService = {
	async getProfile() {
		const response = await request<IProfile>({
			url: getUsersUrl('/profile'),
			method: 'GET'
		})
		return response
	}
}
