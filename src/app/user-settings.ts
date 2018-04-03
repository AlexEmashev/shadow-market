/**
 * User roles.
 */
export enum AppRoles {
  /**
   * Full admin rights.
   */
  admin,
  /**
   * User can manage their's items.
   */
  user,
  /**
   * User can only view catalog.
   */
  guest
}

/**
 * Application themes.
 */
export enum AppThemes {
  default
}

/**
 * Class represents user settings.
 */
export class UserSettings {
  /**
   * User unique id.
   */
  id: number;
  /**
   * User name.
   */
  name: string;
  /**
   * Application theme.
   */
  theme: AppThemes;
  /**
   * User role.
   */
  role: AppRoles;
  /**
   * Session hash.
   */
  session: string;
}
