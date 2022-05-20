package br.com.bolaopinga.bolao.resources;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.bolaopinga.bolao.dto.AuthenticationDto;
import br.com.bolaopinga.bolao.dto.TokenDto;
import br.com.bolaopinga.bolao.dto.UsuarioDto;
import br.com.bolaopinga.bolao.entities.Usuario;
import br.com.bolaopinga.bolao.repositories.UsuarioRepository;
import br.com.bolaopinga.bolao.security.JwtTokenUtil;
import br.com.bolaopinga.bolao.util.Response;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class LoginResource extends BaseResource<TokenDto>{
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@PostMapping
	public ResponseEntity<Response<TokenDto>> gerarTokenJwt(@Valid @RequestBody AuthenticationDto authenticationDto,
																										BindingResult result) throws AuthenticationException {
		Response<TokenDto> response = new Response<TokenDto>();
		
		Usuario usuario = usuarioRepository.findByCelular(authenticationDto.getCelular());
		
		if (usuario == null) {
			result.addError(new ObjectError("Login", "celular não cadastrado no sistema."));
		} else {
			if (!usuario.isAtivo()) {
				result.addError(new ObjectError("Login", "Usuário nao está ativo."));
			}
		}
		
		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		
		Authentication authentication = 
				authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(authenticationDto.getCelular(), authenticationDto.getSenha()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationDto.getCelular());
		
		String token = jwtTokenUtil.obterToken(userDetails);
		response.setData(new TokenDto(token, UsuarioDto.parseToDto(usuario)));
		return ResponseEntity.ok(response);
	}
	

}
