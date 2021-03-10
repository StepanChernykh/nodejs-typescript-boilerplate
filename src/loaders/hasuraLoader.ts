import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import fetch from 'node-fetch';

import { env } from '../env';

export const hasuraLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.hasura.enabled) {

        const http = new HttpLink({ uri: env.hasura.remote, fetch });
        setContext((request, previousContext) => ({
            headers: {
                'X-Hasura-Admin-Secret': env.hasura.secret,
            },
        })).concat(http);
    }
};
