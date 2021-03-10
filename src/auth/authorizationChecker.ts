import { Action } from 'routing-controllers';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Logger } from '../lib/logger';
import { AuthService } from './AuthService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function authorizationChecker(connection: Connection): (action: Action, roles: any[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        const credentials = await authService.parseApiKeyAuthFromRequest(action.request);
        if (credentials === false) {
            log.warn('authorizationChecker:innerAuthorizationChecker', { message: 'no credentials' });
            return false;
        }

        log.info('authorizationChecker:innerAuthorizationChecker', { message: 'succesful' });
        return true;

    };
}
