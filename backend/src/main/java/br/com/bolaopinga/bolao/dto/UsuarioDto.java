package br.com.bolaopinga.bolao.dto;

import java.io.Serializable;

import br.com.bolaopinga.bolao.entities.Usuario;

public class UsuarioDto implements Serializable {

	private static final long serialVersionUID = 1L;

	public UsuarioDto() {}
	
	public UsuarioDto(String nome, String celular, String perfil) {
		this.nome = nome;
		this.celular = celular;
		this.perfil = perfil;
	}
	
	private Long id;
	private String nome;
	private String celular;
	private String perfil;
	private boolean ativo;
	private boolean senhaCadastrada;
	private Long pontos;
	
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
	public String getPerfil() {
		return perfil;
	}
	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public boolean isAtivo() {
		return ativo;
	}
	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}
	public void setSenhaCadastrada(boolean senhaCadastrada) {
		this.senhaCadastrada = senhaCadastrada;
	}
	public boolean isSenhaCadastrada() {
		return senhaCadastrada;
	}
	public Long getPontos() {
		return pontos;
	}
	public void setPontos(Long pontos) {
		this.pontos = pontos;
	}
	
	public static UsuarioDto parseToDto(Usuario usuario) {
		UsuarioDto dto = new UsuarioDto();
		dto.setId(usuario.getId());
		dto.setNome(usuario.getNome());
		dto.setCelular(usuario.getCelular());
		dto.setPerfil(usuario.getPerfil().toString());
		dto.setAtivo(usuario.isAtivo());
		dto.setSenhaCadastrada(usuario.isSenhaCadastrada());
		return dto;
	}

}
