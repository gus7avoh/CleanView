const Client = {
    uri: '',

    async request(
        url: string,
        method: string,
        body?: any,
        headers?: any
    ): Promise<any> {

        let data  =  fetch(url, {
            method,
            headers,
            body: JSON.stringify(body)
        })
        return data

    }
}