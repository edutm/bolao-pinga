package br.com.bolaopinga.bolaopinga.resources;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/teste")
@CrossOrigin(origins = "*")
public class TesteResource {

	@GetMapping
	public ResponseEntity<String> teste() {
	
		return ResponseEntity.ok("teste  s");
	}
}
