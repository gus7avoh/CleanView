import puppeteer , {Browser, Page} from 'puppeteer';

export class PuppeteerClient {
    private browser!: Browser;
    private page!: Page;

    public async init(): Promise<void> {
        this.browser = await puppeteer.launch({ headless: false });
        this.page = await this.browser.newPage();
    }

    public getPage(): Page {
        return this.page;
    }

    public async get(url: string): Promise<Page> {
        await this.page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 60000
        })

        return this.getPage();
    }

    async close() {
        await this.browser.close();
    }
}