import { UserSettings, AppRoles } from './user-settings';

export const USERS:  UserSettings[] = [
    {
        id: 1,
        name: 'john_smith',
        contact: 'john_smith@example.com',
        role: AppRoles.user,
        theme: 'hazy-day-theme',
        session: '',
        locale: 'en'
    }, {
        id: 2,
        name: 'aemashev',
        contact: 'aemashev@example.com',
        role: AppRoles.user,
        theme: 'black-watch-theme',
        session: '',
        locale: 'ru'
    }, {
        id: 3,
        name: 'jane_doe',
        contact: 'jane_doe@example.com',
        role: AppRoles.user,
        theme: 'black-watch-theme',
        session: '',
        locale: 'en'
    }
];