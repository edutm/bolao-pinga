package br.com.bolaopinga.bolao.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import br.com.bolaopinga.bolao.entities.Usuario;
import br.com.bolaopinga.bolao.repositories.UsuarioRepository;

@Component
public class UserHelper {
	
	@Autowired UsuarioRepository usuarioRepository;
	
	public Usuario getUserLogged() {
		
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		String username;
		if (principal instanceof UserDetails) {
		  username = ((UserDetails)principal).getUsername();
		} else {
		  username = principal.toString();
		}
		
		Usuario usuario = usuarioRepository.findByCelular(username);
		return usuario;
	}

}
