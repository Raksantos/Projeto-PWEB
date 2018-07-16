CREATE DATABASE db_duo;

CREATE TABLE t_usuario(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
	descricao VARCHAR(500) NOT NULL,
    horariodisp VARCHAR(10) NOT NULL
);

CREATE TABLE t_jogo(
	id INT(3) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE t_funcao(
	id INT(3) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(10) NOT NULL,
	id_jogo INT(3) UNSIGNED,
	
	FOREIGN KEY (id_jogo) REFERENCES t_jogo(id)
);

CREATE TABLE t_rank(
	id INT(3) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR (10) NOT NULL,
	id_jogo INT(3) UNSIGNED,
	
	FOREIGN KEY (id_jogo) REFERENCES t_jogo(id)
);

CREATE TABLE t_mapa(
	id INT(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR (10) NOT NULL,
	id_jogo INT(3) UNSIGNED,
	
	FOREIGN KEY (id_jogo) REFERENCES t_jogo(id)
);

CREATE TABLE t_usuario_jogo(
	id_usuario INT(6) UNSIGNED,
    id_jogo INT(3) UNSIGNED,
    id_funcao INT(1) UNSIGNED,
    id_rank INT(3) UNSIGNED,
	id_mapa INT(2) UNSIGNED,
    
    PRIMARY KEY (id_usario, id_jogo),
    FOREIGN KEY (id_usuario) REFERENCES t_usuario(id),
    FOREIGN KEY (id_jogo) REFERENCES t_jogo(id),
    FOREIGN KEY (id_funcao) REFERENCES t_funcao(id),
    FOREIGN KEY (id_rank) REFERENCES t_rank(id),
	FOREIGN KEY (id_mapa) REFERENCES t_mapa(id)
);
