class Token {
    private static key: string = 'token';

    static get(): string | null {
        return localStorage.getItem(this.key);
    }

    static set(value: string) {
        localStorage.setItem(Token.key, value)
    }

    static remove() {
        localStorage.removeItem(Token.key);
    }
}

export default Token;


