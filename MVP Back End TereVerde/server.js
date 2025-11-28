const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

const db = new sqlite3.Database('./tereverde.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Conectado ao banco de dados SQLite.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS atracoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        tipo TEXT,
        descricao TEXT,
        imagem TEXT,
        dificuldade TEXT,
        tempo TEXT,
        lat REAL,
        lng REAL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS novidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        descricao TEXT,
        tipo TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS eventos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        data TEXT,
        local TEXT,
        descricao TEXT,
        lat REAL,
        lng REAL
    )`);

    db.get("SELECT count(*) as count FROM atracoes", (err, row) => {
        if (row.count === 0) {
            console.log("Inserindo dados iniciais...");

            const stmtA = db.prepare("INSERT INTO atracoes (titulo, tipo, descricao, imagem, dificuldade, tempo, lat, lng) VALUES (?,?,?,?,?,?,?,?)");
            stmtA.run(
                "Trilha da Pedra da Tartaruga",
                "Trilha", 
                "Uma trilha com uma vista incrível da cidade e da \"Mulher de Pedra\".", 
                "src/assets/img/mirante-tartaruga.jpg", 
                "Moderada", 
                "1h 30min", -22.372, -42.986);

            stmtA.run(
                "Cachoeira dos Frades",
                "Cachoeira",
                "Uma bela queda d'água acessível por uma trilha leve. Ótima para banho.",
                "src/assets/img/cachu-frades.jpg",
                "Fácil",
                "20min", -22.339, -42.801);

            stmtA.run(
                "Mirante do Soberbo",
                "Mirante",
                "Vista clássica do 'Dedo de Deus'. Acesso fácil de carro, dentro dos limites do parque.",
                "src/assets/img/mirante-soberbo.jpg",
                "Muito Fácil",
                "N/A", -22.462, -42.986);

            stmtA.run(
                "Trilha da Pedra do Elefante",
                "Trilha",
                "Ótimo local para apreciar o nascer do sol. A vista do parque é belíssima, e do mirante se destacam pontos como o Dedo de Deus e a Baía da Guanabara.",
                "src/assets/img/trilha-elefante.jpg",
                "Moderada",
                "1h 50min", -22.465, -42.982);

            stmtA.run(
                "Trilha Pico do Urubu",
                "Trilha",
                "É uma excelente opção para quem busca um desafio leve com uma bela recompensa no topo, o percurso atravessa trechos de mata e mirantes naturais até alcançar o cume, de onde se tem uma vista ampla da região serrana de Teresópolis.",
                "src/assets/img/pico-urubu.jpg",
                "Moderada/Dificil",
                "4h", -22.450, -42.934);

            stmtA.run(
                "Trilha Suspensa",
                "Trilha",
                "Uma das grandes atrações do PARNASO, a trilha possui piso de madeira e corrimão, permitindo acesso até a cadeirantes. Esta trilha corta um trecho de Mata Atlântica em nível elevado em relação ao terreno, permitindo ao visitante uma observação mais próxima da copa das árvores.",
                "src/assets/img/trilha-suspensa.jpg",
                "Fácil",
                "1h", -22.451, -43.001);

            stmtA.run(
                "Trilha Mozart Catão",
                "Trilha",
                "Esta trilha cruza pequenos cursos d'água e floresta de encosta até chegar ao Mirante Alexandre Oliveira, com vista para a cidade de Teresópolis e o Parque Estadual dos Três Picos, ao fundo.",
                "src/assets/img/trilha-mozart.jpg",
                "Fácil/Moderada",
                "1h 30min", -22.451, -42.986);

            stmtA.run(
                "Trilha Cartão Postal",
                "Trilha",
                "Esta bela trilha cruza área de floresta, com belas vistas da montanha e dá acesso a um mirante voltado para a cadeia de montanhas da Serra dos Órgãos, proporcionando ao visitante um novo ângulo de observação do Dedo de Deus do meio da floresta.",
                "src/assets/img/trilha-cartao-postal.jpg",
                "Moderada",
                "2h", -22.461, -42.995);

            stmtA.run(
                "Trilha 360",
                "Trilha",
                "Esta trilha faz a junção da Cartão Postal com a Mozart Catão pela crista da montanha, possui um lindo mirante para Serra dos Órgãos e para cidade do Rio de Janeiro, o mirante Borandá é uma opção de descanso e contemplação com uma vista imperdível!",
                "src/assets/img/trilha-360.jpg",
                "Moderada",
                "2h 30min", -22.461, -42.995);
            stmtA.finalize();

            const stmtN = db.prepare("INSERT INTO novidades (titulo, descricao, tipo) VALUES (?,?,?)");
            stmtN.run("Trilha da Tartaruga reaberta!", "A trilha está aberta após manutenção.", "info");
            stmtN.run("Risco de Chuvas", "Cuidado com trombas d'água.", "aviso");
            stmtN.finalize();

            const stmtE = db.prepare("INSERT INTO eventos (titulo, data, local, descricao) VALUES (?,?,?,?)");
            stmtE.run("Observação de Aves", "25 Dez, 08:00", "Parque Montanhas", "Traga seu binóculo.");
            stmtE.finalize();
        }
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/atracoes', (req, res) => {
    db.all("SELECT * FROM atracoes", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/atracoes', (req, res) => {
    const { titulo, tipo, descricao, imagem, dificuldade, tempo } = req.body;
    db.run(
        `INSERT INTO atracoes (titulo, tipo, descricao, imagem, dificuldade, tempo) VALUES (?,?,?,?,?,?)`,
        [titulo, tipo, descricao, imagem, dificuldade, tempo],
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

app.get('/api/novidades', (req, res) => {
    db.all("SELECT * FROM novidades ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/novidades', (req, res) => {
    const { titulo, descricao, tipo } = req.body;
    db.run(
        `INSERT INTO novidades (titulo, descricao, tipo) VALUES (?,?,?)`,
        [titulo, descricao, tipo],
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

app.get('/api/eventos', (req, res) => {
    db.all("SELECT * FROM eventos", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get(/('*')/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});