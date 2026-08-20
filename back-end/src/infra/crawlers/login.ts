import { PlaywrightClient } from './clients/PlaywrightClient';
import { Page } from 'playwright';
import dotenv from 'dotenv';

dotenv.config();

const playwrightClient = new PlaywrightClient();

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function login() {
    try{
        await playwrightClient.init();
    
        const page: Page = await playwrightClient.get(
            'https://login.kroton.com.br/'
        );
    
        const cpf: string = process.env.USER!
        const senha: string = process.env.PASSWORD!
    
        await page.locator('#username').waitFor();
        await page.locator('#username').fill(cpf);
        await page.getByRole('button', { name: 'Avançar' }).click();
    
        await page.locator('#login-pass').fill(senha)
        await page.getByRole('button', { name: 'Entrar' }).click();
    
        const skip2Af: boolean = await page.getByRole('button', { name: 'Pular por enquanto' }).count() > 0;
        if (skip2Af) {
            await page.getByRole('button', { name: 'Pular por enquanto' }).click();
            await page.locator('span', { hasText: 'Quadro de Horários' }).waitFor();
        }

        const closeBtn: boolean = await page.locator('button:has(img[alt="close"])').count() > 0;
        if (closeBtn) {
            await page.locator('button:has(img[alt="close"])').click();
        }
    
        await sleep(3000);
    }catch(e){
        throw new Error("Erro ao logar :" + e);
    }
}


function main(){
    try{
        login();
        
    }catch(e){
        console.log(e);
    }
}

main();