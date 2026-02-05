import type { Config } from 'ziggy-js';
import type { Auth, User } from './auth';

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export type SharedData = {
    auth: Auth;
    [key: string]: unknown;
};
