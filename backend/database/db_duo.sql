CREATE DATABASE db_duo;

CREATE TABLE t_usuario(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(40) NOT NULL,
	email VARCHAR(40) NOT NULL UNIQUE,
	senha VARCHAR(64) NOT NULL,
	descricao VARCHAR(500) NOT NULL
);

CREATE TABLE t_jogo(
	id INT(3) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(50) NOT NULL
);

CREATE TABLE t_funcao(
	id INT(3) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(30) NOT NULL,
	id_jogo INT(3) UNSIGNED,
	
	FOREIGN KEY (id_jogo) REFERENCES t_jogo(id)
);

CREATE TABLE t_rank(
	id INT(3) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR (30) NOT NULL,
	id_jogo INT(3) UNSIGNED,
	FOREIGN KEY (id_jogo) REFERENCES t_jogo(id)
);

CREATE TABLE t_mapa(
	id INT(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR (30) NOT NULL,
	id_jogo INT(3) UNSIGNED,
	FOREIGN KEY (id_jogo) REFERENCES t_jogo(id)
);

CREATE TABLE t_usuario_jogo(
	id_usuario INT(6) UNSIGNED,
	id_jogo INT(3) UNSIGNED,
	id_funcao INT(3) UNSIGNED,
	id_rank INT(3) UNSIGNED,
	id_mapa INT(2) UNSIGNED,
	nickname VARCHAR (30) NOT NULL,
	PRIMARY KEY (id_usuario, id_jogo),
	FOREIGN KEY (id_usuario) REFERENCES t_usuario(id),
	FOREIGN KEY (id_jogo) REFERENCES t_jogo(id),
	FOREIGN KEY (id_funcao) REFERENCES t_funcao(id),
	FOREIGN KEY (id_rank) REFERENCES t_rank(id),
	FOREIGN KEY (id_mapa) REFERENCES t_mapa(id)
);

CREATE TABLE t_horario_disponivel(
	id_usuario int(6) UNSIGNED,
	dia int(1) UNSIGNED,
	hora_inicio time,
	hora_fim time,

	PRIMARY KEY (id_usuario),
	FOREIGN KEY (id_usuario) REFERENCES t_usuario(id)
);