package br.com.bolaopinga.bolao.resources;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bolaopinga.bolao.dto.CadastroDto;
import br.com.bolaopinga.bolao.dto.UsuarioDto;
import br.com.bolaopinga.bolao.entities.Usuario;
import br.com.bolaopinga.bolao.repositories.UsuarioRepository;
import br.com.bolaopinga.bolao.services.UsuarioService;
import br.com.bolaopinga.bolao.util.Response;
import br.com.bolaopinga.bolao.util.SenhaUtils;

@RestController
@RequestMapping("api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioResource extends BaseResource<Usuario> {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	@PostMapping("/cadastrar")
	private ResponseEntity<?> criarUsuario(@Valid @RequestBody CadastroDto cadastroDto, 
																	 BindingResult result) {
		
		Response<UsuarioDto> response = new Response<UsuarioDto>();
		
		Usuario existUsuario = usuarioRepository.findByCelular(cadastroDto.getCelular());
		if (existUsuario != null) {
			result.addError(
					new ObjectError("Cadastrar usuário", "Já existe um usuário cadastrado com este celular"));
		}
		
		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		
		Usuario usuario = new Usuario();
		usuario.setNome(cadastroDto.getNome());
		usuario.setCelular(cadastroDto.getCelular());
		usuario.setSenha(SenhaUtils.gerarBCrypt(cadastroDto.getSenha()));
		usuarioRepository.save(usuario);
		
		
		response.setData(UsuarioDto.parseToDto(usuario));
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/lista")
	private ResponseEntity<?> listarUsuario() {
		
		List<Usuario> usuarios = usuarioRepository.findAll();
		
		Response<List<UsuarioDto>> response = new Response<List<UsuarioDto>>();
		List<UsuarioDto> usuariosDto = new ArrayList<UsuarioDto>();
		
		usuarios.forEach(u -> usuariosDto.add(UsuarioDto.parseToDto(u)));
		
		response.setData(usuariosDto);
		return ResponseEntity.ok(response);
	}
	
	@PutMapping("/ativar/{id}")
	private ResponseEntity<?> ativarUsuario(@PathVariable("id") Long id) {
		
		Response<UsuarioDto> response = new Response<UsuarioDto>();
		
		Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
		if (!optionalUsuario.isPresent()) {
			response.getErrors().add("Não existe usuario com id informado");
			return ResponseEntity.badRequest().body(response);
		}
		
		Usuario usuario = optionalUsuario.get();
		usuario.setAtivo(!usuario.isAtivo());
		usuarioRepository.save(usuario);
		response.setData(UsuarioDto.parseToDto(usuario));
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/{id}")
	private ResponseEntity<?> buscarrUsuario(@PathVariable("id") Long id) {
		
		Response<UsuarioDto> response = new Response<UsuarioDto>();
		
		Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
		if (!optionalUsuario.isPresent()) {
			response.getErrors().add("Não existe usuario com id informado");
			return ResponseEntity.badRequest().body(response);
		}
		
		Usuario usuario = optionalUsuario.get();
		response.setData(UsuarioDto.parseToDto(usuario));
		
		return ResponseEntity.ok(response);
	}
}
