package br.com.bolaopinga.bolao.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import br.com.bolaopinga.bolao.entities.Palpite;
import br.com.bolaopinga.bolao.entities.Partida;

public class PalpiteDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotNull(message = "Campo id não pode ser vazio.")
	private Long id;
	
	private LocalDateTime ultimaAlteracao;

	private PartidaDto partida;
	
	private UsuarioDto usuario;
	
	@NotNull(message = "Campo placarMandante não pode ser vazio.")
	private Long placarMandante;
	
	@NotNull(message = "Campo placarVisitante não pode ser vazio.")
	private Long placarVisitante;
	
	private Long pontos = 0L;
	
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
	public Long getPontos() {
		return pontos;
	}
	public void setPontos(Long pontos) {
		this.pontos = pontos;
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
		dto.setPontos(calcularPontos(dto));
		
		return dto;
	}
	
	public static Long calcularPontos(PalpiteDto palpite) {
		Long pontos = 0L;
		
		
		PartidaDto partida = palpite.getPartida();
		if(partida.isEncerrada()) {
			if(palpite.getPlacarMandante() == partida.getPlacarMandante()
					&& palpite.getPlacarVisitante() == partida.getPlacarVisitante()) {
				if("final".equals(partida.getFase())) {
					pontos = 10L;
				} else {
					pontos = 5L;					
				}
			} else {
				boolean isPalpiteVitoriaMandante = palpite.getPlacarMandante() > palpite.getPlacarVisitante();
				boolean isPalpiteVitoriavisitante = palpite.getPlacarVisitante() > palpite.getPlacarMandante();
				boolean isPalpiteEmpate = palpite.getPlacarVisitante() == palpite.getPlacarMandante();
				if((partida.getPlacarMandante() > partida.getPlacarVisitante() && isPalpiteVitoriaMandante) ||
						(partida.getPlacarVisitante() > partida.getPlacarMandante() && isPalpiteVitoriavisitante) ||
							(partida.getPlacarVisitante() == partida.getPlacarMandante() && isPalpiteEmpate)) {
					pontos = 3L;
				}
			}
		}
		
		return pontos;
	}
	
}
