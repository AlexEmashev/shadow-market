// Auxiliary class for user settings

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
export interface UserSettings {
  /**
   * User unique id.
   */
  id: number;
  /**
   * User name.
   */
  name: string;
  /**
   * Contact info
   */
  contact: string;
  /**
   * Application theme.
   */
  theme: string;
  /**
   * User role.
   */
  role: AppRoles;
  /**
   * Session hash.
   */
  session: string;
  /**
   * Current user locale.
   */
  locale: string;
}
