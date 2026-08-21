import {
    APIRequestContext,
    APIResponse
} from 'playwright';

type ResponseTypes = {
    response: APIResponse;
    text: string;
    json: unknown;
};

export class TsClient {
    constructor(
        private readonly client: APIRequestContext,
        private readonly uri: string
    ) {}

    async request<T extends keyof ResponseTypes>({
        method,
        url = this.uri,
        body,
        headers,
        responseType = 'response' as T
    }: {
        method: string;
        url?: string;
        body?: unknown;
        headers?: Record<string, string>;
        responseType?: T;
    }): Promise<ResponseTypes[T]> {
        const response = await this.client.fetch(url, {
            method,
            headers,
            data: body
        });

        switch (responseType) {
            case 'text':
                return await response.text() as ResponseTypes[T];

            case 'json':
                return await response.json() as ResponseTypes[T];

            case 'response':
            default:
                return response as ResponseTypes[T];
        }
    }
}