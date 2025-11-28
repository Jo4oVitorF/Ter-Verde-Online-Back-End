# 🌿 Terê Verde Online #

Plataforma Web para gestão e promoção do ecoturismo nos parques municipais de Teresópolis.

Este repositório contém o MVP (Produto Mínimo Viável) de uma aplicação Full-Stack desenvolvida para conectar visitantes às belezas naturais da região, oferecendo funcionalidades interativas e gestão de conteúdo.

Este projeto foi desenvolvido como parte de uma atividade acadêmica, visando criar uma solução tecnológica para promover o turismo ecológico na região.

## 👥 Integrante ##

João Vitor Ferreira Féo - 06002081

## 🎯 Situação-Problema ##

Identificamos que visitantes e moradores locais muitas vezes têm dificuldade em encontrar informações atualizadas sobre as opções de ecoturismo nos parques municipais.

A falta de uma plataforma acessível dificulta a descoberta de trilhas, cachoeiras e a participação em eventos ambientais. O Terê Verde Online surge para resolver isso, conectando as pessoas à rica biodiversidade da região de forma simples, interativa e digital.

## 📱 Descrição do MVP ##

O MVP entregue é um Sistema Web Desktop Full-Stack que opera na arquitetura Cliente-Servidor. Diferente de um site estático comum, este sistema possui um banco de dados real que permite a persistência das informações.

### Principais Funcionalidades: ###

Catálogo Dinâmico: Listagem de atrações (trilhas e cachoeiras) carregadas diretamente do banco de dados.

Mapa Interativo: Visualização geográfica dos pontos turísticos com marcadores.

Painel Administrativo: Área restrita onde administradores podem publicar "Novidades" e alertas em tempo real.

Persistência de Dados: Uso do banco SQLite para garantir que notícias e cadastros fiquem salvos mesmo após reiniciar o servidor.

API REST: Comunicação estruturada entre o Front-end e o Back-end.

## 🛠️ Tecnologias Utilizadas ##

Front-end: HTML5, CSS3, JavaScript e Leaflet.js (para mapas).

Back-end: Node.js com framework Express.

Banco de Dados: SQLite3 (Serverless e local).

## 🚀 Como executar o projeto localmente ##

Como este é um projeto Full-Stack (utiliza Node.js e Banco de Dados), ele não funcionará se você apenas clicar duas vezes no arquivo HTML. É necessário rodar o servidor localmente para que o navegador consiga buscar os dados.

1. Pré-requisitos

Antes de começar, certifique-se de ter instalado:

Node.js (Versão LTS recomendada).

Para verificar se já tem, abra o terminal e digite node -v. Se aparecer um número (ex: v18.16.0), está tudo certo.

2. Baixando e Configurando

Baixe o projeto como ZIP (Botão verde "Code" -> "Download ZIP") e extraia a pasta em um local de fácil acesso (ex: Área de Trabalho).

Abra o Terminal na Pasta:

Entre na pasta do projeto (onde está o arquivo server.js).

Windows: Clique com o botão direito em um espaço vazio da pasta e selecione "Abrir no Terminal" (ou PowerShell/Git Bash).

Mac/Linux: Clique com o botão direito na pasta e selecione "Novo Terminal na Pasta".

Instale as Dependências:

No terminal aberto, digite o comando abaixo e aperte Enter:

npm install


Aguarde alguns instantes. Isso criará uma pasta chamada node_modules com as bibliotecas necessárias (Express e SQLite).

3. Rodando a Aplicação

Inicie o Servidor:

Ainda no terminal, execute:

node server.js


Se tudo der certo, você verá a mensagem:

Conectado ao banco de dados SQLite.
Servidor rodando em http://localhost:3000

Acesse no Navegador:

Abra seu navegador preferido (Chrome, Edge, Firefox).

Digite na barra de endereços: http://localhost:3000

### Dicas Importantes ###

Como Parar: Para desligar o servidor, volte ao terminal e pressione as teclas Ctrl + C.

Dados Iniciais: Na primeira vez que você rodar, o sistema criará automaticamente o banco de dados (tereverde.db) e irá preenchê-lo com dados de exemplo (trilhas e cachoeiras).

Reiniciando: Se você alterar o código do arquivo server.js, precisará parar e iniciar o servidor novamente para ver as mudanças.


## ℹ️ Informações Adicionais ##

Login de Admin: Para testar a área administrativa, utilize:

Usuário: admin

Senha: 1234

Licença: Este projeto está sob a licença MIT.
