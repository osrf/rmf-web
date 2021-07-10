import Debug from 'debug';
import EventEmitter from 'eventemitter3';
import Keycloak_, { KeycloakInstance } from 'keycloak-js';
import { AuthConfig, Authenticator, AuthenticatorEventType } from './authenticator';
import { User } from './user';
import { BASE_PATH, getUrl } from './utils/url';

const debug = Debug('authenticator');

export default class KeycloakAuthenticator
  extends EventEmitter<AuthenticatorEventType>
  implements Authenticator {
  get user(): User | undefined {
    return this._user;
  }

  get token(): string | undefined {
    return this._inst.token;
  }

  constructor(config: AuthConfig, redirectUri?: string) {
    super();
    this._inst = Keycloak_(config);
    this._redirectUri = redirectUri;
  }

  private _getUser(): User {
    const tokenRoles =
      this._inst.clientId &&
      this._inst.resourceAccess &&
      this._inst.resourceAccess[this._inst.clientId]
        ? this._inst.resourceAccess[this._inst.clientId].roles
        : [];

    const roles: string[] = [];
    const groups: string[] = [];
    tokenRoles.forEach((role) => {
      if (role.startsWith('_rmf_')) {
        roles.push(role);
      } else if (role.startsWith('rmf_')) {
        groups.push(role);
      }
    });
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      username: (this._inst.idTokenParsed as any).preferred_username,
      token: this._inst.token || '',
      roles,
      groups,
    };
  }

  async init(): Promise<void> {
    if (this._initialized) {
      debug('already initialized');
      return;
    }

    debug('initializing authenticator');

    this._inst.onAuthSuccess = async () => {
      this._user = this._getUser();
      debug('authenticated as', this._user.username);
      this.emit('userChanged', this._user);
    };

    this._inst.onAuthLogout = () => {
      debug('logout');
      this._user = undefined;
      this.emit('userChanged', null);
    };

    await this._inst.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: getUrl(`${BASE_PATH}/silent-check-sso.html`),
      redirectUri: this._redirectUri,
    });
    try {
      const refreshed = await this._inst.updateToken(30);
      refreshed && debug('token refreshed');
    } catch {
      debug('token not refreshed');
    }

    this._user = this._inst.tokenParsed && this._getUser();
    this._initialized = true;
  }

  async refreshToken(): Promise<void> {
    // check and update the token 5 seconds prior to expiry
    if (this._initialized) {
      const refreshed = await this._inst.updateToken(5);
      if (refreshed) {
        this._user = this._getUser();
        this.emit('tokenRefresh', null);
      } else {
        debug('token not refreshed');
      }
    }
    return;
  }

  async login(successRedirectUri: string): Promise<never> {
    await this._inst.login({
      redirectUri: successRedirectUri,
    });
    throw new Error('should not reach here');
  }

  async logout(): Promise<never> {
    await this._inst.logout();
    throw new Error('should not reach here');
  }

  private _initialized = false;
  private _inst: KeycloakInstance;
  private _redirectUri?: string;
  private _user?: User;
}
