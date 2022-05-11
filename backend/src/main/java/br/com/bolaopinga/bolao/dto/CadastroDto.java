package br.com.bolaopinga.bolao.dto;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class CadastroDto implements Serializable {

	private static final long serialVersionUID = 1L;
	@NotEmpty(message = "Campo nome não pode ser vazio.")
	private String nome;
	@NotEmpty(message = "Campo celular não pode ser vazio.")
	private String celular;
	@NotEmpty(message = "Campo senha não pode ser vazio.")
	private String senha;
	
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
}
