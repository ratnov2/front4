export interface IProfile {
	_id:string
	email: string
	calendarPhotos: { created: string; photo: string }[]
	createdAt: string
	favoritePhotos: { photoOne: string; photoTwo: string; photoThree: string }
	firstName: string
	lastName: string
	avatar: string
}

export interface ILatestPhoto {
	calendarPhotos: {
		created: string
		photo: string
	}
	name: string
}
