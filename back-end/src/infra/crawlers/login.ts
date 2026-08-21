import { PlaywrightClient } from '../clients/PlaywrightClient';
import { TsClient } from '../clients/TsClient';
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
    
        const cpf: string = await process.env.USER!
        const senha: string = await process.env.PASSWORD!
    
        await page.locator('#username').waitFor();
        await page.locator('#username').fill(cpf);
        await page.getByRole('button', { name: 'Avançar' }).click();
    
        await page.locator('#login-pass').fill(senha)
        await page.getByRole('button', { name: 'Entrar' }).click();
    
        await page.getByRole('button', { name: 'Pular por enquanto' }).waitFor();

        await page.getByRole('button', { name: 'Pular por enquanto' }).click();
        await page.locator('#meu_curso').waitFor();

        await page.locator('button:has(img[alt="close"])').waitFor();
        await page.locator('button:has(img[alt="close"])').click();
    
        return await playwrightClient.getCookies();
    }catch(e){
        throw new Error("Erro ao logar :" + e);
    }
}

async function getQuadroHorarios(tsClient: TsClient) {
    return await tsClient.request({
        method: 'GET',
        url: 'https://alunodigital.anhanguera.com/quadro-horarios',
        responseType: 'text'
    });
}

async function main() {
    try {
        await login();

        const tsClient = new TsClient(
            playwrightClient.getRequestContext(),
            'https://alunodigital.anhanguera.com'
        );

        const materias = await getQuadroHorarios(tsClient);
        

        console.log(materias);
    } catch (error) {
        console.error(error);
    }
}

void main();
main();