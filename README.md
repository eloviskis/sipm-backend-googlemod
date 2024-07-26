# SIPM Backend

## Visão Geral
Este é o backend para o Sistema Integrado de Prontuário Médico (SIPM), desenvolvido em Node.js e TypeScript. Ele inclui autenticação, integração com calendários, envio de mensagens via WhatsApp, e muito mais.

## Requisitos
- Node.js
- NPM
- MongoDB

## Configuração
1. Clone o repositório:
    ```bash
    git clone https://github.com/eloviskis/sipm-backend.git
    cd sipm-backend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
    ```env
    MONGODB_URI=<sua-uri-do-mongodb>
    JWT_SECRET=<sua-chave-secreta-jwt>
    GOOGLE_CLIENT_ID=<seu-google-client-id>
    GOOGLE_CLIENT_SECRET=<seu-google-client-secret>
    GOOGLE_REDIRECT_URI=<seu-google-redirect-uri>
    GOOGLE_REFRESH_TOKEN=<seu-google-refresh-token>
    OUTLOOK_CLIENT_ID=<seu-outlook-client-id>
    OUTLOOK_AUTHORITY=<sua-outlook-authority>
    OUTLOOK_CLIENT_SECRET=<seu-outlook-client-secret>
    TWILIO_ACCOUNT_SID=<seu-twilio-account-sid>
    TWILIO_AUTH_TOKEN=<seu-twilio-auth-token>
    TWILIO_WHATSAPP_FROM=<seu-twilio-whatsapp-from>
    ```

4. Execute a aplicação:
    ```bash
    npm run build
    npm start
    ```

## Scripts
- `npm run build`: Compila o projeto TypeScript para JavaScript.
- `npm start`: Inicia o servidor.

## Estrutura do Projeto
- `src/`
  - `config/`: Arquivos de configuração (banco de dados, autenticação).
  - `controllers/`: Controladores para as rotas.
  - `models/`: Modelos Mongoose.
  - `routes/`: Definições de rotas.
  - `middlewares/`: Middlewares para autenticação, logging, etc.
  - `services/`: Serviços para lógica de negócios.
  - `utils/`: Utilitários (ex: logger).

## Contribuição
Sinta-se à vontade para fazer um fork deste repositório e enviar pull requests. Agradecemos suas contribuições!

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
