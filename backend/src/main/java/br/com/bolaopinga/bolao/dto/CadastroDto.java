package br.com.bolaopinga.bolao.dto;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CadastroDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	@NotEmpty(message = "Campo nome não pode ser vazio.")
	private String nome;
	@NotEmpty(message = "Campo celular não pode ser vazio.")
	private String celular;
	private String senha;
	private boolean senhaCadastrada;
	private boolean ativo;
	
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
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public boolean isSenhaCadastrada() {
		return senhaCadastrada;
	}
	public void setSenhaCadastrada(boolean senhaCadastrada) {
		this.senhaCadastrada = senhaCadastrada;
	}
	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}
	public boolean isAtivo() {
		return ativo;
	}
}
