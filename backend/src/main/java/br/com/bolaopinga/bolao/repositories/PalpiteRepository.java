package br.com.bolaopinga.bolao.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.bolaopinga.bolao.entities.Palpite;
import br.com.bolaopinga.bolao.entities.Usuario;

public interface PalpiteRepository extends JpaRepository<Palpite, Long> {

	public List<Palpite> findByUsuario(Usuario usuario);
}
