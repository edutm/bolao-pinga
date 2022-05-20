package br.com.bolaopinga.bolao.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import br.com.bolaopinga.bolao.enuns.GrupoEnum;

@Entity
@Table(name = "equipe")
public class Equipe implements Serializable {

	private static final long serialVersionUID = 1L;
	
	public Equipe() {}
	
	public Equipe(String nome, String bandeira, GrupoEnum grupo) {
		super();
		this.nome = nome;
		this.bandeira = bandeira;
		this.grupo = grupo;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nome")
	private String nome;
	
	@Column(name = "bandeira")
	private String bandeira;
	
	@Column(name = "grupo")
	@Enumerated(EnumType.STRING)
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
	
	
}
