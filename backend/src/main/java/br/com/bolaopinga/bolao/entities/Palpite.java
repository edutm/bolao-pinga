package br.com.bolaopinga.bolao.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "palpite")
public class Palpite implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name =  "ultima_alteracao")
	private LocalDateTime ultimaAlteracao;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "usuario_id")
	private Usuario usuario;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "partida_id")
	private Partida partida;
	
	@Column(name = "placar_mandante")
	public Long placarMandante = 0L;
	
	@Column(name = "placar_visitante")
	public Long placarVisitante = 0L;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getUltimaAlteracao() {
		return ultimaAlteracao;
	}

	public void setUltimaAlteracao(LocalDateTime ultimaAlteracao) {
		this.ultimaAlteracao = ultimaAlteracao;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Partida getPartida() {
		return partida;
	}

	public void setPartida(Partida partida) {
		this.partida = partida;
	}

	public Long getPlacarMandante() {
		return placarMandante;
	}

	public void setPlacarMandante(Long placarMandante) {
		this.placarMandante = placarMandante;
	}

	public Long getPlacarVisitante() {
		return placarVisitante;
	}

	public void setPlacarVisitante(Long placarVisitante) {
		this.placarVisitante = placarVisitante;
	}
}
