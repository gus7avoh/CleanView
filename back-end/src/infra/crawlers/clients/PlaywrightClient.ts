import { chromium, Browser, Page } from 'playwright';

export class PlaywrightClient {
    private browser!: Browser;
    private page!: Page;

    public async init(): Promise<void> {
        this.browser = await chromium.launch({
            headless: false
        });

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
}