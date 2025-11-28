# 📘 Manual do Usuário - Terê Verde Online #

Bem-vindo ao manual de utilização da plataforma Terê Verde Online. Este documento tem como objetivo orientar visitantes e administradores sobre como navegar e utilizar todas as funcionalidades do sistema.

## 1. Primeiros Passos ##

### 1.1. Acessando o Sistema ###

Como este é um sistema web, você não precisa instalar nada no seu celular ou computador além de um navegador (Chrome, Edge, Firefox, etc.).

Certifique-se de que o servidor está rodando (O terminal deve estar aberto mostrando a mensagem "Servidor rodando").

Abra o seu navegador.

Digite o endereço na barra superior: http://localhost:3000

## 2. Guia para Visitantes (Público Geral) ##

A área de visitantes é aberta e não requer senha. Aqui você pode explorar as belezas naturais de Teresópolis.

### 2.1. Visualizando Destaques e Novidades ###

Destaques: Assim que abrir o site, você verá uma imagem de destaque no topo.

Novidades: Logo abaixo, há uma lista de avisos recentes (ex: "Trilha Fechada", "Novo Evento"). Fique atento às cores:

🔵 Azul: Informação geral.

🟡 Amarelo: Aviso ou atenção.

🔴 Vermelho: Perigo ou proibição.

### 2.2. Explorando Atrações (Trilhas e Cachoeiras) ###

No menu de navegação (inferior no celular ou superior no computador), clique em "Explorar".

Você verá uma galeria de fotos dos locais disponíveis.

Cada cartão mostra:

Nome do local.

Tipo (Trilha ou Cachoeira).

Nível de Dificuldade (Fácil, Moderado, Difícil).

Tempo estimado de percurso.

### 2.3. Usando o Mapa Interativo ###

Clique no botão "Mapa" no menu.

O mapa mostrará a região dos parques.

Procure pelos marcadores coloridos:

📍 Marcador Verde: Indica uma Trilha.

📍 Marcador Azul: Indica uma Cachoeira ou Rio.

Clique sobre um marcador para ver o nome do local.

### 2.4. Consultando Eventos ###

Clique no botão "Eventos" no menu.

Veja a lista de atividades programadas com data, horário e local de encontro.

## 3. Guia para Administradores (Gestão) ##

Esta área é restrita para funcionários ou gestores do parque.

### 3.1. Fazendo Login ###

No canto superior direito da tela, clique no botão "Admin".

Uma janela de login aparecerá.

Insira as credenciais de acesso:

Usuário: admin

Senha: 1234

Clique em "Entrar".

Sucesso: O botão "Admin" mudará para um botão vermelho "Sair", indicando que você está logado.

### 3.2. Painel Administrativo ###

Ao fazer login, você será redirecionado para o Painel Admin. Aqui você encontra as ferramentas de gestão.

Adicionar uma Novidade (Notícia/Alerta)

Esta função permite publicar avisos que aparecem na página inicial para todos os visitantes.

No Painel, clique no botão azul "Adicionar Novidade".

Preencha o formulário:

Título: O resumo do aviso (ex: "Trilha da Pedra Fechada").

Descrição: Detalhes completos (ex: "Fechada para manutenção devido à queda de árvore...").

Tipo de Alerta: Escolha a cor adequada (Info, Aviso ou Perigo).

Clique em "Publicar".

O sistema salvará a informação no Banco de Dados e ela aparecerá instantaneamente na página inicial.

Definir Horários

No Painel, clique em "Definir Horários".

Visualize e edite os horários de funcionamento dos parques (Funcionalidade demonstrativa).

### 3.3. Saindo do Sistema (Logout) ###

Sempre que terminar de usar o painel administrativo, clique no botão vermelho "Sair" no topo da tela para garantir a segurança.

## 4. Solução de Problemas Comuns ##

O site não carrega (Tela branca ou erro de conexão)

Verifique se o terminal preto (Node.js) ainda está aberto. Se ele foi fechado, o servidor parou.

Abra o terminal novamente e digite node server.js.

As imagens não aparecem

Verifique se as imagens estão na pasta correta: public/src/assets/img/.

Confirme se o nome do arquivo no código é exatamente igual ao nome real (maiúsculas e minúsculas importam).

Fiz uma alteração no código, mas não mudou no site

Tente recarregar a página segurando a tecla Shift + F5 para limpar o cache do navegador.

Se alterou o server.js, você precisa reiniciar o servidor no terminal.