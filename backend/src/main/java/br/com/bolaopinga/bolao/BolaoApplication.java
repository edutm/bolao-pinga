package br.com.bolaopinga.bolao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import br.com.bolaopinga.bolao.entities.Usuario;
import br.com.bolaopinga.bolao.enuns.PerfilEnum;
import br.com.bolaopinga.bolao.repositories.UsuarioRepository;
import br.com.bolaopinga.bolao.util.SenhaUtils;

@SpringBootApplication
public class BolaoApplication {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(BolaoApplication.class, args);
	}
	
	@Component
	public class CommandLineAppStartupRunner implements CommandLineRunner {

		@Override
		public void run(String...args) throws Exception {
			
			Usuario usuarioAdm = usuarioRepository.findByCelular("11968382928");
			if (usuarioAdm == null) {
				Usuario usuario = new Usuario();
				usuario.setNome("Eduardo Teixeira Monteiro");
				usuario.setCelular("11968382928");
				usuario.setPerfil(PerfilEnum.ROLE_ADMIN);
				usuario.setSenha(SenhaUtils.gerarBCrypt("eduva000"));
				usuario.setAtivo(true);
				usuario.setSenhaCadastrada(true);
				usuarioRepository.save(usuario);
			}
		}
	}

}
