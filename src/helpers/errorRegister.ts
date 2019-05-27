export default class errorRegister extends Error {

    status: number;
    message: string;

    constructor(message: string, status: number) {
        super(message);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);

        this.status = status || 500;
    }
}