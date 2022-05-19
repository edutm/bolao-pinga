create table equipe (
	id bigserial primary key,
	nome varchar(50) not null,
	bandeira varchar(50),
	grupo varchar(1)
);