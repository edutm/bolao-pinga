create table usuario (
	id bigserial primary key,
	nome varchar(50),
	celular integer,
	ativo boolean, 
	data_criacao timestamp,
	perfil varchar(30)	
);