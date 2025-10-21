DROP TABLE IF EXISTS admin      CASCADE;
DROP TABLE IF EXISTS feedback   CASCADE;
DROP TABLE IF EXISTS partida    CASCADE;
DROP TABLE IF EXISTS ponto      CASCADE;
DROP TABLE IF EXISTS rota       CASCADE;
DROP TABLE IF EXISTS rota_ponto CASCADE;

CREATE TABLE IF NOT EXISTS admin
(
    id    SERIAL PRIMARY KEY UNIQUE,
    nome  VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(60)  NOT NULL
);

CREATE TABLE IF NOT EXISTS rota
(
    id       SERIAL PRIMARY KEY UNIQUE,
    codigo   INT         NOT NULL,
    origem   VARCHAR(30) NOT NULL,
    destino  VARCHAR(30) NOT NULL,
    via      VARCHAR(60),
    admin_id INT         NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES admin
);

CREATE TABLE IF NOT EXISTS feedback
(
    id        SERIAL PRIMARY KEY UNIQUE,
    avaliacao FLOAT NOT NULL,
    nome      VARCHAR(100),
    mensagem  VARCHAR,
    rota_id   INT   NOT NULL,
    FOREIGN KEY (rota_id) REFERENCES rota
);

CREATE TABLE IF NOT EXISTS partida
(
    id         SERIAL PRIMARY KEY UNIQUE,
    hora       SMALLINT NOT NULL,
    minuto     SMALLINT NOT NULL,
    dia_semana SMALLINT NOT NULL,
    rota_id    INT      NOT NULL,
    FOREIGN KEY (rota_id) REFERENCES rota
);

CREATE TABLE IF NOT EXISTS ponto
(
    id       SERIAL PRIMARY KEY UNIQUE,
    endereco VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS rota_ponto
(
    id       SERIAL PRIMARY KEY UNIQUE,
    rota_id  INT NOT NULL,
    ponto_id INT NOT NULL,
    FOREIGN KEY (rota_id) REFERENCES rota,
    FOREIGN KEY (ponto_id) REFERENCES ponto
);