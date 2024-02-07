import { IContact } from '@/shared/types/contact.interface'
import { IUser } from '@/shared/types/user.interface'
import { Dispatch, SetStateAction } from 'react'
import * as Contacts from 'expo-contacts'
export type TypeContactState = Contacts.Contact[] | null

export interface IContextContact {
	contact: TypeContactState
}
