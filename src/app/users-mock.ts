import { UserSettings, AppRoles } from './user-settings';

export const USERS:  UserSettings[] = [
    {
        id: 1,
        name: 'john_smith',
        role: AppRoles.user,
        theme: 'black-watch-theme',
        session: '',
        locale: 'en'
    }, {
        id: 2,
        name: 'aemashev',
        role: AppRoles.user,
        theme: 'black-watch-theme',
        session: '',
        locale: 'ru'
    }, {
        id: 3,
        name: 'jane_doe',
        role: AppRoles.user,
        theme: 'black-watch-theme',
        session: '',
        locale: 'en'
    }
];