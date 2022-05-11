package br.com.bolaopinga.bolao.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import br.com.bolaopinga.bolao.enuns.PerfilEnum;

@Entity
@Table(name = "usuario")
public class Usuario {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nome")
	private String nome;
	
	@Column(name = "celular")
	private String celular;
	
	@Column(name = "senha")
	private String senha;
	
	@Column(name = "ativo")
	private boolean ativo = false;
	
	@Column(name = "senha_cadastrada")
	private boolean senhaCadastrada = false;
	
	@Column(name = "data_criacao")
	private LocalDateTime dataCriação = LocalDateTime.now();
	
	@Enumerated(EnumType.STRING)
	@Column(name = "perfil")
	private PerfilEnum perfil  = PerfilEnum.ROLE_USUARIO;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

	public LocalDateTime getDataCriação() {
		return dataCriação;
	}

	public void setDataCriação(LocalDateTime dataCriação) {
		this.dataCriação = dataCriação;
	}

	public PerfilEnum getPerfil() {
		return perfil;
	}

	public void setPerfil(PerfilEnum perfil) {
		this.perfil = perfil;
	}
	
	public boolean isSenhaCadastrada() {
		return senhaCadastrada;
	}
	
	public void setSenhaCadastrada(boolean senhaCadastrada) {
		this.senhaCadastrada = senhaCadastrada;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
