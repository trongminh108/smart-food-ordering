import React from 'react';

export interface CHILDREN {
    children: React.ReactNode;
}

export interface REGISTER {}

export interface AUTH_STATE {
    token?: string;
    user?: any;
    username?: string;
    authenticated?: boolean;
    id_agent?: string;
}

export interface AUTH_CONTEXT_TYPE {
    onRegister: (username: string, password: string, gmail: string) => void;
    onLogin: (username: string, password: string) => Promise<any>;
    onLogout: () => void;
    authState: AUTH_STATE;
    onSetUserInfo: (user: object) => void;
}
