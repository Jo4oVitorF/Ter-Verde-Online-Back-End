# Documentação Técnica - Terê Verde Online #

1. Visão Geral da Arquitetura

O projeto Terê Verde Online utiliza uma arquitetura moderna conhecida como Cliente-Servidor (Client-Server), operando sobre o modelo de API REST.

Embora todos os arquivos estejam no mesmo projeto, existe uma separação lógica muito importante entre "quem pede" e "quem serve" as informações.

## As Três Camadas do Sistema ##

### Front-end (O Cliente / Pasta /public) ###

Responsabilidade: É a "cara" do sistema. É o que aparece na tela do usuário.

Tecnologias: HTML5, CSS3, JavaScript (Vanilla) e Leaflet.js (Mapas).

Comportamento: O Front-end é "burro" em relação aos dados. Ele não sabe quais trilhas existem. Ele apenas sabe desenhar a tela e pedir dados ao servidor.

Comunicação: Usa o comando fetch() para enviar e receber dados em formato JSON.

### Back-end (O Servidor / Arquivo server.js) ###

Responsabilidade: É o "cérebro" do sistema. Ele processa pedidos, aplica regras e protege os dados.

Tecnologias: Node.js com o framework Express.

Comportamento: Ele fica ouvindo pedidos na porta 3000. Quando chega um pedido (ex: "Quero ver as novidades"), ele decide o que fazer.

Segurança: É a única parte do sistema que tem permissão para tocar no Banco de Dados.

### Banco de Dados (Persistência / Arquivo tereverde.db) ###

Responsabilidade: Guardar a informação para sempre.

Tecnologia: SQLite3.

Características: É um banco de dados relacional (SQL) que não precisa de instalação complexa. Ele vive num arquivo .db simples dentro da pasta do projeto.

2. Fluxo de Dados (Como a informação viaja)

Para entender como o sistema funciona, vamos acompanhar o caminho de uma informação, passo a passo.

Cenário: Um Administrador publica um aviso de "Trilha Fechada"

Ação no Front-end:

O administrador preenche o formulário no site e clica em "Publicar".

O JavaScript do navegador captura o texto digitado.

Envio (Requisição HTTP):

O navegador empacota esses dados num formato de texto chamado JSON.

O navegador envia um pedido do tipo POST para o endereço http://localhost:3000/api/novidades.

### Processamento no Back-end: ###

O servidor (Node.js) recebe o pacote.

Ele verifica: "O pedido veio para a rota certa?".

Ele prepara um comando SQL: INSERT INTO novidades (titulo, descricao) VALUES (...).

### Gravação no Banco: ###

O SQLite escreve essa informação fisicamente no disco rígido do computador.

Confirmação (Resposta):

O servidor responde ao navegador com um código 200 OK, dizendo "Recebido e salvo com sucesso".

### Atualização Visual: ###

O navegador recebe o "OK", limpa o formulário e mostra o novo aviso na lista imediatamente.

3. Estrutura de Pastas Explicada

Entenda onde cada peça do quebra-cabeça se encaixa:

/ (Raiz): Contém as configurações do projeto (package.json), o servidor (server.js) e a documentação.

/public: Esta é a pasta "pública". Tudo o que está aqui pode ser acessado por qualquer pessoa que entrar no site.

/public/src/js/app.js: Contém a lógica visual. É aqui que usamos o fetch para chamar o servidor.

/docs: Documentação do projeto (Manuais, Requisitos).

tereverde.db: O arquivo secreto onde seus dados estão salvos. (Gerado automaticamente).

4. Endpoints da API (O "Menu" do Servidor)

Estas são as rotas que o Back-end disponibiliza para o Front-end usar:

Atrações Turísticas

GET /api/atracoes: Pede a lista completa de todas as trilhas e cachoeiras.

POST /api/atracoes: Envia uma nova atração para ser salva.

Novidades e Alertas

GET /api/novidades: Pede a lista de avisos recentes.

POST /api/novidades: Envia um novo aviso para ser salvo.

Eventos

GET /api/eventos: Pede a lista de eventos agendados.

5. Por que usamos SQLite e Node.js?

Facilidade de Instalação (RNF04): O SQLite não exige que você instale um servidor pesado como MySQL ou PostgreSQL. Basta ter o arquivo no projeto e ele funciona.

Mesma Linguagem: Usamos JavaScript tanto no navegador (Front-end) quanto no servidor (Node.js), o que simplifica o desenvolvimento e a manutenção.