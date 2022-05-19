package br.com.bolaopinga.bolao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.bolaopinga.bolao.entities.Equipe;

public interface EquipeRepository extends JpaRepository<Equipe, Long> {

}
