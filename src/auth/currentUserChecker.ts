import { Action } from 'routing-controllers';
import { Connection } from 'typeorm';

import { User } from '../api/models/User';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function currentUserChecker(connection: Connection): (action: Action) => Promise<User | undefined> {
    return async function innerCurrentUserChecker(action: Action): Promise<User | undefined> {
        return action.request.user;
    };
}
