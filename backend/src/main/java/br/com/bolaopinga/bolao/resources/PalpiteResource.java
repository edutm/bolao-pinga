package br.com.bolaopinga.bolao.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bolaopinga.bolao.dto.PalpiteDto;
import br.com.bolaopinga.bolao.dto.UsuarioDto;
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
		
		response.setData(PalpiteDto.parseToDto(palpites));
		
		return ResponseEntity.ok(response);
	}

}
