import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState
} from 'react'
import * as Contacts from 'expo-contacts'
import { IContextContact } from './contacts-proviedret'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ContactContext = createContext({} as IContextContact)

export const ContactsDataProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    const [contactUsers, setContactUsers] = useState<Contacts.Contact[] | null>(null)

	useEffect(() => {
		const loadContacts = async () => {
		  let cachedContacts = await AsyncStorage.getItem('cachedContacts');
	
		  if (cachedContacts) {
			setContactUsers(JSON.parse(cachedContacts));
		  } 
		};
		loadContacts();

	  }, []);

	return (
		<ContactContext.Provider  value={{contact:contactUsers}}>
			{children}
		</ContactContext.Provider>
	) 
}


