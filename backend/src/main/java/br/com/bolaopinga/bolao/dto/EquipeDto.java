package br.com.bolaopinga.bolao.dto;

import java.io.Serializable;

import br.com.bolaopinga.bolao.entities.Equipe;
import br.com.bolaopinga.bolao.enuns.GrupoEnum;

public class EquipeDto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String nome;
	private String bandeira;
	private GrupoEnum grupo;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getBandeira() {
		return bandeira;
	}
	public void setBandeira(String bandeira) {
		this.bandeira = bandeira;
	}
	public GrupoEnum getGrupo() {
		return grupo;
	}
	public void setGrupo(GrupoEnum grupo) {
		this.grupo = grupo;
	}
	
	public static EquipeDto parseToDto(Equipe equipe) {
		EquipeDto equipeDto = new EquipeDto();
		equipeDto.setId(equipe.getId());
		equipeDto.setNome(equipe.getNome());
		equipeDto.setBandeira(equipe.getBandeira());
		equipeDto.setGrupo(equipe.getGrupo());
		return equipeDto;
	}
}
