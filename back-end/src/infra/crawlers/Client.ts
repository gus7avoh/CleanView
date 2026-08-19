type ResponseTypes = {
    response: Response
    text: string
    json: any
}

export class Client {
    uri: string = ''

    constructor(uri: string) {
        this.uri = uri
    }

   async request<T extends keyof ResponseTypes>({
        method,
        url = this.uri,
        body,
        headers,
        responseType = 'response' as T
    }: {
        method: string
        url?: string
        body?: any
        headers?: any
        responseType?: T
    }): Promise<ResponseTypes[T]>{

        try {
            if (!url) {
                url = this.uri
            }

            const data = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined
            })

            switch (responseType) {
                case 'text':
                    return await data.text() as ResponseTypes[T]

                case 'json':
                    return await data.json() as ResponseTypes[T]

                case 'response':
                default:
                    return data as ResponseTypes[T]
            }

        } catch (error) {
            throw error
        }
    }

    async saveCookie() {
        return false
    }

    async getCookies() {
        return false
    }
}