package br.com.bolaopinga.bolao.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import br.com.bolaopinga.bolao.entities.Palpite;

public class PalpiteDto implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private LocalDateTime ultimaAlteracao;
	private PartidaDto partida;
	private UsuarioDto usuario;
	private Long placarMandante;
	private Long placarVisitante;
	
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
	public PartidaDto getPartida() {
		return partida;
	}
	public void setPartida(PartidaDto partida) {
		this.partida = partida;
	}
	public UsuarioDto getUsuario() {
		return usuario;
	}
	public void setUsuario(UsuarioDto usuario) {
		this.usuario = usuario;
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
	
	public static List<PalpiteDto> parseToDto(List<Palpite> listaPalpite) {
		List<PalpiteDto> lista = new ArrayList<PalpiteDto>();
		listaPalpite.forEach(p -> lista.add(parseToDto(p)));
		return lista;
	}
	
	public static PalpiteDto parseToDto(Palpite palpite) {
		PalpiteDto dto = new PalpiteDto();
		dto.setId(palpite.getId());
		dto.setUltimaAlteracao(palpite.getUltimaAlteracao());
		dto.setPartida(PartidaDto.parseToDto(palpite.getPartida()));
		//dto.setUsuario(UsuarioDto.parseToDto(palpite.getUsuario()));
		dto.setPlacarMandante(palpite.getPlacarMandante());
		dto.setPlacarVisitante(palpite.getPlacarVisitante());
		
		return dto;
	}
	
}
