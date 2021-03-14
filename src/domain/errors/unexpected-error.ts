export class UnexpectedError extends Error {
    constructor() {
        super('Something went wrong, try again soon')
        this.name = 'UnexpectedError'
    }
}
