package br.com.bolaopinga.bolao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.bolaopinga.bolao.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	public Usuario findByCelular(String celular);
}
