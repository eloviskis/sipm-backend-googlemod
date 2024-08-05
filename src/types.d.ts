/// <reference types="node" />

import { Request } from 'express';
import { IUser } from './models/user';

// Extender a interface do Express Request para incluir a propriedade user
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

// Definição da interface AuthRequest
export interface AuthRequest extends Request {
    user?: IUser;
}

// Declaração de módulos para bibliotecas não tipadas
declare module 'passport-google-oauth20' {
    import { Request } from 'express';
    import { Strategy as PassportStrategy } from 'passport';

    interface Profile {
        id: string;
        displayName: string;
        name?: {
            familyName: string;
            givenName: string;
        };
        emails?: Array<{ value: string }>;
        photos?: Array<{ value: string }>;
        provider: string;
        _raw: string;
        _json: any;
    }

    interface StrategyOptions {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        passReqToCallback?: false;
        scope?: string[];
    }

    interface StrategyOptionsWithRequest extends Omit<StrategyOptions, 'passReqToCallback'> {
        passReqToCallback: true;
    }

    interface VerifyFunction {
        (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void): void;
    }

    interface VerifyFunctionWithRequest {
        (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void): void;
    }

    class Strategy extends PassportStrategy {
        constructor(options: StrategyOptions, verify: VerifyFunction);
        constructor(options: StrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);
        name: string;
    }
}

declare module 'passport-facebook' {
    import { Request } from 'express';
    import { Strategy as PassportStrategy } from 'passport';

    interface Profile {
        id: string;
        displayName: string;
        name?: {
            familyName: string;
            givenName: string;
        };
        emails?: Array<{ value: string }>;
        photos?: Array<{ value: string }>;
        provider: string;
        _raw: string;
        _json: any;
    }

    interface StrategyOptions {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        profileFields?: string[];
    }

    interface StrategyOptionsWithRequest extends StrategyOptions {
        passReqToCallback: true;
    }

    interface VerifyFunction {
        (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void): void;
    }

    interface VerifyFunctionWithRequest {
        (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void): void;
    }

    class Strategy extends PassportStrategy {
        constructor(options: StrategyOptions, verify: VerifyFunction);
        constructor(options: StrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);
        name: string;
    }
}

declare module 'passport-linkedin-oauth2' {
    import { Request } from 'express';
    import { Strategy as PassportStrategy } from 'passport';

    interface Profile {
        id: string;
        displayName: string;
        name?: {
            familyName: string;
            givenName: string;
        };
        emails?: Array<{ value: string }>;
        photos?: Array<{ value: string }>;
        provider: string;
        _raw: string;
        _json: any;
    }

    interface StrategyOptions {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        scope?: string[];
        state?: boolean;
        passReqToCallback?: boolean;
    }

    interface VerifyFunction {
        (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void): void;
    }

    interface VerifyFunctionWithRequest {
        (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void): void;
    }

    class Strategy extends PassportStrategy {
        constructor(options: StrategyOptions, verify: VerifyFunction);
        constructor(options: StrategyOptions & { passReqToCallback: true }, verify: VerifyFunctionWithRequest);
        name: string;
    }
}
