package br.com.bolaopinga.bolao.resources;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.bolaopinga.bolao.dto.PalpiteDto;
import br.com.bolaopinga.bolao.dto.PartidaDto;
import br.com.bolaopinga.bolao.entities.Palpite;
import br.com.bolaopinga.bolao.entities.Partida;
import br.com.bolaopinga.bolao.entities.Usuario;
import br.com.bolaopinga.bolao.enuns.PerfilEnum;
import br.com.bolaopinga.bolao.repositories.PartidaRepository;
import br.com.bolaopinga.bolao.security.UserHelper;
import br.com.bolaopinga.bolao.util.Response;

@RestController
@RequestMapping("api/partida")
@CrossOrigin(origins = "*")
public class PartidasResource extends BaseResource<Palpite> {
	
	@Autowired
	private PartidaRepository partidaRepository;
	
	@Autowired
	private UserHelper userHelper;
	
	@GetMapping
	private ResponseEntity<?> getLista(@RequestParam(required = false, name = "filtro") String filtro) {
		
		Response<List<PartidaDto>> response = new Response<List<PartidaDto>>();
				
		List<Partida> partidas = partidaRepository.findAll();
		
		response.setData(PartidaDto.parseToDto(partidas.stream().sorted(Comparator.comparing(Partida::getData)).collect(Collectors.toList())));
		
		return ResponseEntity.ok(response);
	}
	
	@PutMapping
	private ResponseEntity<?> salvatPartida(@Valid @RequestBody PartidaDto partidaDto,
			BindingResult result) {
		
		Response<PartidaDto> response = new Response<PartidaDto>();
		
		
		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		
		Partida partida = partidaRepository.findById(partidaDto.getId()).get();
		
		partida.setPlacarMandante(partidaDto.getPlacarMandante());
		partida.setPlacarVisitante(partidaDto.getPlacarVisitante());
		partida.setPenaltyMandante(partidaDto.getPenaltyMandante());
		partida.setPenaltyVisitante(partidaDto.getPenaltyVisitante());
		partida.setEncerrado(partidaDto.isEncerrada());
		partidaRepository.save(partida);
		
		response.setData(PartidaDto.parseToDto(partida));
		return ResponseEntity.ok(response);
	}

}
