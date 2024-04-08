export const IsTiming = (cron?: string, date?: string | null) => {

	if (!cron || date === null) return false
	if (new Date(cron).getTime() < new Date(date).getTime()) return true
	else return false
}
