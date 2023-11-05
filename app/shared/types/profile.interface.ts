export interface IProfile {
	email: string
	calendarPhotos: { created: string; photo: string }[]
	createdAt: string
	favoritePhotos: { photoOne: string; photoTwo: string; photoThree: string }
}
export interface ILatestPhoto {
	calendarPhotos: {
		created: string
		photo: string
	}
	name: string
}
