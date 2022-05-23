package br.com.bolaopinga.bolao.resources;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
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
import org.springframework.web.bind.annotation.RestController;

import br.com.bolaopinga.bolao.dto.AuthenticationDto;
import br.com.bolaopinga.bolao.dto.PalpiteDto;
import br.com.bolaopinga.bolao.entities.Palpite;
import br.com.bolaopinga.bolao.entities.Usuario;
import br.com.bolaopinga.bolao.repositories.PalpiteRepository;
import br.com.bolaopinga.bolao.security.UserHelper;
import br.com.bolaopinga.bolao.util.Response;

@RestController
@RequestMapping("api/palpite")
@CrossOrigin(origins = "*")
public class PalpiteResource extends BaseResource<Palpite> {
	
	@Autowired
	private PalpiteRepository palpiteRepository;
	
	@Autowired
	private UserHelper userHelper;
	
	@GetMapping
	private ResponseEntity<?> getLista() {
		
		Response<List<PalpiteDto>> response = new Response<List<PalpiteDto>>();
		
		Usuario usuario = userHelper.getUserLogged();
		List<Palpite> palpites = palpiteRepository.findByUsuario(usuario);
		
		response.setData(PalpiteDto.parseToDto(palpites.stream().sorted(Comparator.comparing(Palpite::getId)).collect(Collectors.toList())));
		
		return ResponseEntity.ok(response);
	}
	
	@PutMapping
	private ResponseEntity<?> salvatPalpite(@Valid @RequestBody PalpiteDto palpiteDto,
			BindingResult result) {
		
		Response<PalpiteDto> response = new Response<PalpiteDto>();
		
		
		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		
		Palpite palpite = palpiteRepository.findById(palpiteDto.getId()).get();
		
		if (LocalDateTime.now().isAfter(palpite.getPartida().getData())) {
			result.addError(new ObjectError("Salvar Palpite", "Não é possivel alterar o placar, passou da hora mané!"));
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		
		palpite.setPlacarMandante(palpiteDto.getPlacarMandante());
		palpite.setPlacarVisitante(palpiteDto.getPlacarVisitante());
		palpite.setUltimaAlteracao(LocalDateTime.now());
		palpiteRepository.save(palpite);
		
		response.setData(PalpiteDto.parseToDto(palpite));
		return ResponseEntity.ok(response);
	}

}
