class Token {
    private static key: string = 'token';

    static get(): string | null {
        return localStorage.getItem(this.key);
    }

    static set(value: string) {
        localStorage.setItem(Token.key, value)
    }
}

export default Token;


