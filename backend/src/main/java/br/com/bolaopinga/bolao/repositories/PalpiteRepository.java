package br.com.bolaopinga.bolao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.bolaopinga.bolao.entities.Palpite;

public interface PalpiteRepository extends JpaRepository<Palpite, Long> {

}
