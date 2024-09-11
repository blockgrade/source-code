# BlockGrade

Instruções de instalação para rodar localmente usando o Ganache como blockchain.

0. Usando o node 18, rode o comando `npm install` da raiz do projeto. 
1. Ligue o Ganache
2. Crie um .env compatível com .env.example

```
API_URL=HTTP://0.0.0.0:7545
PRIVATE_KEY=5a63bf93818e0a65acfa5a4a80f09d5d7e35486acb9ff0f806db9c03f88e0adf
```

3. Faça deploy do contrato com o comando abaixo:

```
npx hardhat run ./scripts/deploy.js --network localganache
```

4. Pegue o endereço do contrado que foi mostrado no console e inclua no .env e no arquivo `src/context/grade.provider.jsx` na variável ` const contractAddress = `.

```
CONTRACT_ADDRESS=
```

5. Rodar o client. Faça a alteração no package.json para este valor `"type":"module",`.
6. `npm i` na pasta `api`.
7. Desta pasta rode: `node server.js`. Isto inicializará o IPFS.


8. Inicializar o front-end
9. `npm i` na pasta client e depois `npm run dev` na mesma pasta.
