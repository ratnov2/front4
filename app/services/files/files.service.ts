import { request } from '../api/request.api'
import { getFilesUrl, getUsersUrl } from '@/config/api.config'
import { IProfile } from '@/shared/types/profile.interface'
import instance, { $files } from '../api/interceptors.api'
import axios from 'axios'

export const FilesService = {
	async pushPhoto(photo: FormData, folder: string = '') {
		const response = await instance.post(`/files?${folder}`, photo, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		return response
	},
	async pushTwoPhoto(photo: FormData) {
		//console.log('E@',);
		//console.log(photo);
		const response = await instance.post(
			`/files/two?folder=main&type=frontPhoto_backPhoto`,
			photo,
			{
				headers: { 'Content-Type': 'multipart/form-data' }
			}
		)
		//console.log("RESPONSE",response);
		
		return response
	}
}
