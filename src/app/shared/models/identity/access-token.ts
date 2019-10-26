 class AccessToken {
    accessToken: Token;
    refreshToken: String;
    success: boolean;
}

class Token {
    constructor() {}
    token: string;
    expiresIn: number;
}
