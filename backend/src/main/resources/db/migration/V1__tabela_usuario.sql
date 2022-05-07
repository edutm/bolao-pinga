create table usuario (
	id bigserial primary key,
	nome varchar(50) not null,
	celular bigint not null,
	senha varchar(300) not null,
	ativo boolean not null default false, 
	senha_cadastrada boolean not null default false, 
	data_criacao timestamp not null,
	perfil varchar(30) not null	
);