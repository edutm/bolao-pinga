create table palpite (
	id bigserial primary key,
	ultima_alteracao timestamp not null,
	partida_id bigint,
	usuario_id bigint,
	placar_mandante bigint default 0,
	placar_visitante bigint default 0,
	CONSTRAINT palpite_partida_fk FOREIGN KEY (partida_id) REFERENCES partida (id),
	CONSTRAINT palpite_usuario_fk FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);