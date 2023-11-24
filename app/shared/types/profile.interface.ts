export interface IProfile {
	_id: string
	email: string
	calendarPhotos: { created: string; photo: string }[]
	createdAt: string
	favoritePhotos: { photoOne: string; photoTwo: string; photoThree: string }
	firstName: string
	friendship: {
		_id: string
		status: '0' | '1' | '2'
	}[]
	lastName: string
	avatar: string
}

export interface IFriend {
	friendship: {
		_id: string
		status: '0' | '1' | '2'
	}[]
}

export interface ILatestPhoto {
	calendarPhotos: {
		created: Date
		photos:{
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
	name: string
	_id: string
}
