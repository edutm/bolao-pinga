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
@Table(name = "partida")
public class Partida implements Serializable {

	private static final long serialVersionUID = 1L;
	
	public Partida() {}
	
	public Partida(LocalDateTime data, Equipe mandante, Equipe visitante, Long numero, String fase, Long rodada) {
		super();
		this.data = data;
		this.mandante = mandante;
		this.visitante = visitante;
		this.numero = numero;
		this.fase = fase;
		this.rodada = rodada;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name =  "data")
	private LocalDateTime data;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "equipe_mandante_id")
	private Equipe mandante;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "equipe_visitante_id")
	private Equipe visitante;
	
	@Column(name = "placar_mandante")
	public Long placarMandante = 0L;
	
	@Column(name = "placar_visitante")
	public Long placarVisitante = 0L;
	
	@Column(name = "penalty_mandante")
	public Long penaltyMandante = 0L;
	
	@Column(name = "penalty_visitante")
	public Long penaltyVisitante = 0L;
	
	@Column(name = "encerrada")
	public boolean encerrada = false;
	
	@Column(name = "numero")
	public Long numero;
	
	@Column(name = "fase")
	public String fase;
	
	@Column(name = "rodada")
	public Long rodada;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}

	public Equipe getMandante() {
		return mandante;
	}

	public void setMandante(Equipe mandante) {
		this.mandante = mandante;
	}

	public Equipe getVisitante() {
		return visitante;
	}

	public void setVisitante(Equipe visitante) {
		this.visitante = visitante;
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

	public Long getPenaltyMandante() {
		return penaltyMandante;
	}

	public void setPenaltyMandante(Long penaltyMandante) {
		this.penaltyMandante = penaltyMandante;
	}

	public Long getPenaltyVisitante() {
		return penaltyVisitante;
	}

	public void setPenaltyVisitante(Long penaltyVisitante) {
		this.penaltyVisitante = penaltyVisitante;
	}

	public boolean isEncerrada() {
		return encerrada;
	}

	public void setEncerrado(boolean encerrada) {
		this.encerrada = encerrada;
	}

	public Long getNumero() {
		return numero;
	}

	public void setNumero(Long numero) {
		this.numero = numero;
	}

	public String getFase() {
		return fase;
	}

	public void setFase(String fase) {
		this.fase = fase;
	}

	public Long getRodada() {
		return rodada;
	}

	public void setRodada(Long rodada) {
		this.rodada = rodada;
	}
	
	public static class PartidaBuilder {
		private LocalDateTime data;
		private Equipe mandante;
		private Equipe visitante;
		private Long numero;
		private String fase;
		private Long rodada;
		
		public PartidaBuilder setData(LocalDateTime data) {
			this.data = data;
			return this;
		}
		public PartidaBuilder setMandante(Equipe mandante) {
			this.mandante = mandante;
			return this;
		}
		public PartidaBuilder setVisitante(Equipe visitante) {
			this.visitante = visitante;
			return this;
		}
		public PartidaBuilder setNumero(Long numero) {
			this.numero = numero;
			return this;
		}
		public PartidaBuilder setFase(String fase) {
			this.fase = fase;
			return this;
		}
		public PartidaBuilder setRodada(Long rodada) {
			this.rodada = rodada;
			return this;
		} 
		
		public Partida build() {
			return new Partida(data, mandante, visitante, numero, fase, rodada);
		}
	}

}
