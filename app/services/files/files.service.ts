import { request } from '../api/request.api'
import { getFilesUrl, getUsersUrl } from '@/config/api.config'
import { IProfile } from '@/shared/types/profile.interface'
import instance, { $files } from '../api/interceptors.api'

export const FilesService = {
	async pushPhoto(photo: FormData, path: string = '') {
		const response = await instance.post(`/files?folder=${path}`, photo, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		return response
	}
}
