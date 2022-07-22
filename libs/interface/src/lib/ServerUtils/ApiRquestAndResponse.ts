export interface CheckLoginRequest {
    JWT: string
}

export interface CheckLoginResponse {
    isLogin: boolean,
    userData: {
        name: string,
        loginId: string
    },
    newJWT: string
}