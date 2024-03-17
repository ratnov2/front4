import { useReducer } from 'react'

const reducer = (state: State, action: Action): State => {
	const { type } = action
	switch (type) {
		case 'frontPhoto':
			return { ...state, current: 'backPhoto' }
		case 'backPhoto':
			return { ...state, current: 'frontPhoto' }
		default:
			return state
	}
}
interface IUseStorePhoto {
	photos: {
		frontPhoto?:
			| {
					created: Date
					photo: string
					locate: string
			  }
			| undefined
		backPhoto?:
			| {
					created: Date
					photo: string
					locate: string
			  }
			| undefined
	}
}
export const useStorePhoto = ({ photos }: IUseStorePhoto) => {
	const [store, dispatch] = useReducer(
		reducer,
		(() => {
			const result: State = {
				current: null,
				length: 0
			}
			if (photos.frontPhoto?.photo) {
				result.frontPhoto = photos.frontPhoto
				result.current = 'frontPhoto'
				result.length++
			}
			if (photos.backPhoto?.photo) {
				result.backPhoto = photos.backPhoto
				if (result.current !== 'frontPhoto') result.current = 'backPhoto'
				result.length++
			}

			return result
		})()
	)
	const UnCurrent = (type: 'frontPhoto' | 'backPhoto' | null) => {
		if (type === 'frontPhoto') return 'backPhoto'
		else return 'frontPhoto'
	}
	return { store, dispatch, UnCurrent }
}

type State = {
	frontPhoto?:
		| {
				created: Date
				photo: string
				locate: string
		  }
		| undefined
	backPhoto?:
		| {
				created: Date
				photo: string
				locate: string
		  }
		| undefined
	length: 0 | 1 | 2
	current: null | 'frontPhoto' | 'backPhoto'
}

type Action = {
	type: null | 'frontPhoto' | 'backPhoto'
}
