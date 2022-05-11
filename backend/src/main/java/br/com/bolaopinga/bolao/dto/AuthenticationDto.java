package br.com.bolaopinga.bolao.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class AuthenticationDto {

	public AuthenticationDto() {}
	
	@NotEmpty(message = "celular não pode ser vazio.")
	private String celular;
	
	@NotEmpty(message = "senha não pode ser vazia.")
	private String senha;

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
