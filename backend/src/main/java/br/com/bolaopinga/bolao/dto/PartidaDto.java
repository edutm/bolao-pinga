package br.com.bolaopinga.bolao.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import br.com.bolaopinga.bolao.entities.Equipe;
import br.com.bolaopinga.bolao.entities.Partida;

public class PartidaDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long numero;
	private String fase;
	private Long rodada;
	private LocalDateTime data;
	private Long placarMandante = 0L;
	private Long placarVisitante = 0L;
	private Long penaltyMandante = 0L;
	private Long penaltyVisitante = 0L;
	private boolean encerrada = false;
	private EquipeDto mandante;
	private EquipeDto visitante;
	
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
	public EquipeDto getMandante() {
		return mandante;
	}
	public void setMandante(EquipeDto mandante) {
		this.mandante = mandante;
	}
	public EquipeDto getVisitante() {
		return visitante;
	}
	public void setVisitante(EquipeDto visitante) {
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
	public void setEncerrada(boolean encerrada) {
		this.encerrada = encerrada;
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
	public Long getNumero() {
		return numero;
	}
	public void setNumero(Long numero) {
		this.numero = numero;
	}
	
	public static List<PartidaDto> parseToDto(List<Partida> listaPartida) {
		List<PartidaDto> lista = new ArrayList<PartidaDto>();
		listaPartida.forEach(p -> lista.add(parseToDto(p)));
		return lista;
	}
	
	public static PartidaDto parseToDto(Partida partida) {
		PartidaDto dto = new PartidaDto();
		dto.setId(partida.getId());
		dto.setData(partida.getData());
		
		Equipe mandante = partida.getMandante();
		dto.setMandante(mandante != null ? EquipeDto.parseToDto(mandante) : null);
		
		Equipe visitante = partida.getVisitante();
		dto.setVisitante(visitante != null ? EquipeDto.parseToDto(visitante) : null);
		
		dto.setPlacarMandante(partida.getPlacarMandante());
		dto.setPlacarVisitante(partida.getPlacarVisitante());
		dto.setPenaltyMandante(partida.getPenaltyMandante());
		dto.setPenaltyVisitante(partida.getPenaltyVisitante());
		dto.setEncerrada(partida.isEncerrada());
		dto.setNumero(partida.getNumero());
		dto.setFase(partida.getFase());
		dto.setRodada(partida.getRodada());
		
		return dto;
	}
	
	
	
}
