package br.com.bolaopinga.bolao.dto;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;

public class CadastrarSenhaDto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@NotEmpty(message = "Campo senha não pode ser vazio.")
	private String senha;
	@NotEmpty(message = "Campo confirmaçãoSenha não pode ser vazio.")
	private String confirmacaoSenha;
	
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getConfirmacaoSenha() {
		return confirmacaoSenha;
	}
	public void setConfirmacaoSenha(String confirmacaoSenha) {
		this.confirmacaoSenha = confirmacaoSenha;
	}
	
	

}
