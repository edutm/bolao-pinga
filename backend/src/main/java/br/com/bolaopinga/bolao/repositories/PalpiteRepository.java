package br.com.bolaopinga.bolao.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.bolaopinga.bolao.entities.Palpite;
import br.com.bolaopinga.bolao.entities.Usuario;

public interface PalpiteRepository extends JpaRepository<Palpite, Long> {

	public List<Palpite> findByUsuario(Usuario usuario);
	
	@Query(value = "select DISTINCT p from Palpite p where DATE(p.partida.data) = :data and p.usuario = :usuario")
	public List<Palpite> findPalpitesByData(@Param("data") LocalDate data, @Param("usuario") Usuario usuario);
	
	@Query(value = "select DISTINCT p from Palpite p where p.partida.fase = :fase and p.usuario = :usuario")
	public List<Palpite> findPalpitesByFase(@Param("fase") String fase, @Param("usuario") Usuario usuario);
}
