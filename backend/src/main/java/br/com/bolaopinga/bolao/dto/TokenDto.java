package br.com.bolaopinga.bolao.dto;

import java.io.Serializable;

public class TokenDto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	public TokenDto(String token, UsuarioDto usuario) {
		this.token = token;
		this.usuario = usuario;
	}

	private String token;
	
	private UsuarioDto usuario;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public UsuarioDto getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioDto usuario) {
		this.usuario = usuario;
	}
	
}
