import {Client} from './Client'
import { writeFile } from 'fs/promises'


const cliente  = new Client( 'https://login.kroton.com.br/')

async function login() {
    let response = await cliente.request({
        method: 'GET',
        responseType: 'text'
    })

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:155.0) Gecko/20100101 Firefox/155.0',
        'Accept': '*/*',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Referer': 'https://login.kroton.com.br/',
        'ocp-apim-subscription-key': '54eabefa0d5f4fc2927b3444049abf22',
        'x-correlation-id': 'a328ee3a-086b-4c78-a036-513113ea3bab',
        'x-device-fingerprint': '5e20270e30771ec87b490499cceb70bfb9d9bebd0839dd77b72bb2a53145183e',
        'x-pii-cpf': '10807562645',
        'x-xsrf-token': 'CfDJ8Cal4f-94OBBo-eHSstPPKIrVi9U6Fp-_1gy1hh0pngJCE6CPxCsMHocBG0AIL3hGdr-kIL--h5GKVQSfHB14ccsDXcTZggg_MY19z8iimBTjeOGxrpN-98bLD2Y4JiPEZyF46ZbnO6hG30ARqvlQ-E',
        'Origin': 'https://login.kroton.com.br/',
        'Cookie': '.AspNetCore.Antiforgery.gBflQa3kSiI=CfDJ8Cal4f-94OBBo-eHSstPPKIjbgroRJuq8Eg2HAyQYWHnIbD8YuzRuf7UlNtdS4GYoYYYID37Pb6e830LpJ0rUBohVwGB60t95bY8OmBf6CrqeoO0YJQv_jhkY1gt1hnH_blkTf_3C0YRPsZPPc6x0EI',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors'
    }

    let send_cpf = await cliente.request({
        url: 'https://olimpo-api-br.kroton.com.br/loginapi/api/v2/Autenticacao',
        method:  'POST',
        headers:  headers,
    })

    await writeFile('index.html', response)
}

login()