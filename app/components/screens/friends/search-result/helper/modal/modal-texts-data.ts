export const ModalTextByKey = (username: string = '', key: string) => {
	const returnTextByStatus = {
		'1': {
			title1: `Вы уверены, что хотитите отменить запрос в друзья пользователю ${username}?`
		},
		'3': {
			title1: `Вы уверены, что хотитите отменить запрос в друзья пользователю ${username}?`,
			title2: `Вы больше не сможете видеть запись ${username} BePrime, а ваша больше не будет видна.`
		},
		'0': {
			title1: `Вы уверены, что хотите удалить пользователя ${username} из списка ваших друзей?`,
			title2: `Вы больше не сможете видеть запись ${username} BePrime, а ваша больше не будет видна.`
		},
		'2': { title1: '' },
		logout: {
			title1: 'Log out'
		}
	}
	return (
		returnTextByStatus[key as keyof typeof returnTextByStatus] || { title1: '' }
	)
}
