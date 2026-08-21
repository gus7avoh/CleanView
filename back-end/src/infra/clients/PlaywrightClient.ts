import { chromium, Browser, BrowserContext, Page, APIRequestContext } from 'playwright';

export class PlaywrightClient {
    private browser!: Browser;
    private page!: Page;
    private context!: BrowserContext;

    public async init(): Promise<void> {
        this.browser = await chromium.launch({
            headless: false
        });

        this.context = await this.browser.newContext();
        this.page = await this.browser.newPage();
    }

    public getPage(): Page {
        return this.page;
    }

    public async get(url: string): Promise<Page> {
        await this.page.goto(url, {
            waitUntil: 'networkidle',
            timeout: 60000
        });

        return this.getPage();
    }

    public async close(): Promise<void> {
        await this.browser.close();
    }

    public async getCookies() {
        return await this.context.cookies();
    }

    public getRequestContext(): APIRequestContext {
        return this.context.request;
    }
}