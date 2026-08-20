import {Client} from './clients/Client'
import {PuppeteerClient} from './clients/PuppeteerClient'
import {Page} from 'puppeteer';
import readline from 'readline';

import { writeFile } from 'fs/promises'

const puppeteerClient = new PuppeteerClient()

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function login() {
    await puppeteerClient.init();
    const response: Page = await puppeteerClient.get('https://login.kroton.com.br/');

    await sleep(3000);
}

login();