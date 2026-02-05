import type { Config } from 'ziggy-js';
import type { Auth } from './auth';

export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export type SharedData = {
    name: string;
    auth: Auth;
    [key: string]: unknown;
};
