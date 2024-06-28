# BotMine

## Descrição

O **BotMine** é um bot para Discord projetado para ajudar no gerenciamento de servidores caseiros de Minecraft. Com ele, você pode iniciar, parar, e monitorar o status do servidor diretamente do seu servidor no Discord.

## Funcionalidades

- Iniciar e parar o servidor;
- Monitorar o status do servidor;
- Fazer ficar de dia no servidor.


## Instalação

### Pré-requisitos

- Node.js;
- npm;
- Uma conta no Discord com permissão para gerenciar bots;
- Bot adicionado ao seu servidor (Caso não saiba fazê-lo e convidá-lo: [https://discordjs.guide/preparations/setting-up-a-bot-application.html])
- Um servidor de Minecraft configurado.

### Passos

1. Clone este repositório:
    ```sh
    git clone https://github.com/vinielias11/BotMine.git
    cd BotMine
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Crie o arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:
    ```env
    DISCORD_TOKEN=seu-token-do-discord
    PASTA_SERVER=/caminho/para/seu/servidor/minecraft
    SERVER_PROPERTIES=/caminho/para/seu/servidor/minecraft/server.properties
    CANAL_GERAL=id-do-canal-que-o-bot-enviara-mensagens
    CLIENT_ID=id-do-bot
    GUILD_ID=id-do-servidor-discord
    ```

4. Execute o arquivo registrarComandos.js. Ele irá adicionar os comandos por barra descritos no arquivo ao seu bot:
    ```sh
        node src/registrarComandos.js
    ```

5. Inicie o bot:
    ```sh
    npm start
    ```


## Deploy

Caso queira inicializar o bot para que ele fique online ao ligar o computador (Windows).

### Passos

1. Instale a biblioteca pm2 de forma global pelo npm;

2. Execute o comando para inicializar o app em forma de processo:
   ```
   pm2 start src/index.js
   ```

3. Execute o comando para salvar esse processo:
   ```
   pm2 save
   ```

4. Crie um atalho para o arquivo exec.bat e coloque-o nos atalhos de inicialização (Win + R > shell:startup).
