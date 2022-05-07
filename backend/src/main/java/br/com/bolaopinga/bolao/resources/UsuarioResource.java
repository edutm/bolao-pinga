package br.com.bolaopinga.bolao.resources;

import java.util.Arrays;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bolaopinga.bolao.dto.CadastroDto;
import br.com.bolaopinga.bolao.entities.Usuario;
import br.com.bolaopinga.bolao.repositories.UsuarioRepository;
import br.com.bolaopinga.bolao.util.Response;

@RestController
@RequestMapping("api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioResource extends BaseResource<Usuario> {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	@PostMapping("/cadastrar")
	private ResponseEntity<Response<List<CadastroDto>>> criarUsuario(@Valid 
																	 @RequestBody CadastroDto cadastroDto, 
																	 BindingResult result) {
		
		Response<List<CadastroDto>> response = new Response<List<CadastroDto>>();
		
		Usuario existUsuario = usuarioRepository.findByCelular(cadastroDto.getCelular());
		if (existUsuario != null) {
			result.addError(
					new ObjectError("Cadastrar usuário", "Já existe um usuário cadastrado com este celular"));
		}
		
		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		
		response.setData(Arrays.asList(cadastroDto));
		
		return ResponseEntity.ok(response);
	}
}
