# Serviço que newsletter ao cliente via email
1. Dependencias 
    ```
        package.json
    ```
2. Configuração de conexão e do canal que realiza as tarefas
    ```
        rabbitmq-service.js
    ```
3. require('dotenv').config({ path: path.resolve(__dirname, '.env') }) -> pega as varia. de amb.
    processMessage -> envia a mensagem
    consume -> pega a mensagem enviada no Rabbit para enviar o email
    ```
        app.js
    ```
4. Configura o container da newsletter

    ```
        docker-compose.yml
    ```
5. Instala as dependencias/config. do node

    ```
        Dockerfile
    ```