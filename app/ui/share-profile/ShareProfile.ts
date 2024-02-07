import { FC } from "react"
import { Share, View } from "react-native"

export const shareProfile = async (userId: string) => {
    try {
        const profileLink = getProfileLink(userId)
        await Share.share({
            title: 'App link',
            message: 'Message + link: https://sparc.world',
            url: 'https://sparc.world'
        })
    } catch (error: any) {
        console.error('Ошибка при попытке поделиться:', error.message)
    }
}

export const getProfileLink = (userId: string) => {
	// Здесь должен быть ваш код для формирования ссылки на профиль
	return `https://example.com/profile/${userId}`
}

