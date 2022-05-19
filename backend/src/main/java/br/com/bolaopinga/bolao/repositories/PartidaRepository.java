package br.com.bolaopinga.bolao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.bolaopinga.bolao.entities.Partida;

public interface PartidaRepository extends JpaRepository<Partida, Long> {

}
