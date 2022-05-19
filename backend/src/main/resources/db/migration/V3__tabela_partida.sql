create table partida (
	id bigserial primary key,
	data timestamp not null,
	equipe_mandante_id bigint,
	equipe_visitante_id bigint,
	placar_mandante bigint default 0,
	placar_visitante bigint default 0,
	penalty_mandante bigint default 0,
	penalty_visitante bigint default 0,
	encerrada boolean not null default false,
	numero bigint,
	fase varchar(30),
	rodada bigint,
	CONSTRAINT mandante_equipe_fk FOREIGN KEY (equipe_mandante_id) REFERENCES equipe (id),
	CONSTRAINT visitante_equipe_fk FOREIGN KEY (equipe_visitante_id) REFERENCES equipe (id)
);