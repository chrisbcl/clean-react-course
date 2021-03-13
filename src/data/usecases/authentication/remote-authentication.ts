import { HttpPostClient } from 'data/protocols/http/http-post-client';

export class RemoteAuthentication {
    constructor(private readonly url: string, private readonly httpClient: HttpPostClient) {}

    auth(): Promise<void> {
        return this.httpClient.post(this.url);
    }
}
