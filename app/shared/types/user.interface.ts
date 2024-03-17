import { ILatestPhoto } from './profile.interface'

export interface IUser {
	_id: string
	email: string
	password: string
	friendship: { status: '0' | '1' | '2' | '3'; _id: string }[]
	firstName: string
	lastName: string
	avatar: string
	favoritePhotos: {
		photoOne: string | null
		photoTwo: string | null
		photoThree: string | null
	}
	latestPhoto: {
		created: string
		photos: {
			frontPhoto?: {
				created: Date
				photo: string
				locate: string
			}
			backPhoto?: {
				created: Date
				photo: string
				locate: string
			}
		}
		comment: string
		comments: {
			_id: string
			message: string
		}[]
	}
}
