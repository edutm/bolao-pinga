package br.com.bolaopinga.bolao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import br.com.bolaopinga.bolao.entities.Equipe;
import br.com.bolaopinga.bolao.entities.Palpite;
import br.com.bolaopinga.bolao.entities.Partida;
import br.com.bolaopinga.bolao.entities.Partida.PartidaBuilder;
import br.com.bolaopinga.bolao.entities.Usuario;
import br.com.bolaopinga.bolao.enuns.GrupoEnum;
import br.com.bolaopinga.bolao.enuns.PerfilEnum;
import br.com.bolaopinga.bolao.repositories.EquipeRepository;
import br.com.bolaopinga.bolao.repositories.PalpiteRepository;
import br.com.bolaopinga.bolao.repositories.PartidaRepository;
import br.com.bolaopinga.bolao.repositories.UsuarioRepository;
import br.com.bolaopinga.bolao.util.SenhaUtils;

@SpringBootApplication
public class BolaoApplication {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private EquipeRepository equipeRepository;
	
	@Autowired
	private PartidaRepository partidaRepository;
	
	@Autowired
	private PalpiteRepository palpiteRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(BolaoApplication.class, args);
	}
	
	@Component
	public class CommandLineAppStartupRunner implements CommandLineRunner {

		@Override
		public void run(String...args) throws Exception {
			
			criarEquipesEPartidas();
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
				criarPalpitesUsuario(usuario);
			}
			
			
		}
		
		private void criarPalpitesUsuario(Usuario usuario) {
			List<Partida> partidas = partidaRepository.findAll();
			partidas.forEach(partida -> {
				Palpite palpite = new Palpite();
				palpite.setPartida(partida);
				palpite.setUsuario(usuario);
				palpite.setUltimaAlteracao(LocalDateTime.now());
				palpiteRepository.save(palpite);
			});
		}
		
		public void criarEquipesEPartidas() {
			List<Equipe> equipes = equipeRepository.findAll();
			if(equipes.isEmpty()) {
				
				Equipe catar = equipeRepository.save(new Equipe("Catar", "catar", GrupoEnum.A));
				Equipe equador = equipeRepository.save(new Equipe("Equador", "equador", GrupoEnum.A));
				Equipe senegal = equipeRepository.save(new Equipe("Senegal", "senegal", GrupoEnum.A));
				Equipe holanda = equipeRepository.save(new Equipe("Holanda", "holanda", GrupoEnum.A));
				
				Equipe inglaterra = equipeRepository.save(new Equipe("Inglaterra", "inglaterra", GrupoEnum.B));
				Equipe ira = equipeRepository.save(new Equipe("Irã", "ira", GrupoEnum.B));
				Equipe estadosUnidos = equipeRepository.save(new Equipe("Estados Unidos", "estados_unidos", GrupoEnum.B));
				Equipe galesEscociaUcrania = equipeRepository.save(new Equipe("Gales/Escocia/Ucrânia", "bandeira", GrupoEnum.B));
				
				Equipe argentina = equipeRepository.save(new Equipe("Argentina", "argentina", GrupoEnum.C));
				Equipe arabiaSaudita = equipeRepository.save(new Equipe("Arábia Saudita", "arabia_saudita", GrupoEnum.C));
				Equipe mexico = equipeRepository.save(new Equipe("México", "mexico", GrupoEnum.C));
				Equipe polonia = equipeRepository.save(new Equipe("Polônia", "polonia", GrupoEnum.C));
				
				Equipe franca = equipeRepository.save(new Equipe("França", "catfrancar", GrupoEnum.D));
				Equipe peruEmiradosArabisAustralia = equipeRepository.save(new Equipe("Peru/Emirados Arabes/Australia", "bandeira", GrupoEnum.D));
				Equipe dinamarca = equipeRepository.save(new Equipe("Dinamarca", "dinamarca", GrupoEnum.D));
				Equipe tunisia = equipeRepository.save(new Equipe("Tunísia", "tunisia", GrupoEnum.D));
				
				Equipe espanha = equipeRepository.save(new Equipe("Espanha", "espanha", GrupoEnum.E));
				Equipe costaRicaNovaZelandia = equipeRepository.save(new Equipe("Costa Rica/Nova Zelandia", "bandeira", GrupoEnum.E));
				Equipe alemanha = equipeRepository.save(new Equipe("Alemanha", "alemanha", GrupoEnum.E));
				Equipe japao = equipeRepository.save(new Equipe("Japão", "japao", GrupoEnum.E));
				
				Equipe belgica = equipeRepository.save(new Equipe("Bélgica", "belgica", GrupoEnum.F));
				Equipe canada = equipeRepository.save(new Equipe("Canadá", "canada", GrupoEnum.F));
				Equipe marrocos = equipeRepository.save(new Equipe("Marrocos", "marrocos", GrupoEnum.F));
				Equipe croacia = equipeRepository.save(new Equipe("Croácia", "croacia", GrupoEnum.F));
				
				Equipe brasil = equipeRepository.save(new Equipe("Brasil", "brasil", GrupoEnum.G));
				Equipe servia = equipeRepository.save(new Equipe("Sérvia", "servia", GrupoEnum.G));
				Equipe suica = equipeRepository.save(new Equipe("Suíça", "suica", GrupoEnum.G));
				Equipe camaroes = equipeRepository.save(new Equipe("Camarões", "camaroes", GrupoEnum.G));
				
				Equipe portugal = equipeRepository.save(new Equipe("Portugal", "portugal", GrupoEnum.H));
				Equipe gana = equipeRepository.save(new Equipe("Gana", "gana", GrupoEnum.H));
				Equipe uruguai = equipeRepository.save(new Equipe("Uruguai", "uruguai", GrupoEnum.H));
				Equipe coreiaDoSul = equipeRepository.save(new Equipe("Coreia do Sul", "coreia_do_sul", GrupoEnum.H));
				
				//data 21/11
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 21, 7, 0))
						.setMandante(senegal)
						.setVisitante(holanda)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(1L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 21, 10, 0))
						.setMandante(inglaterra)
						.setVisitante(ira)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(2L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 21, 13, 0))
						.setMandante(catar)
						.setVisitante(equador)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(3L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 21, 16, 0))
						.setMandante(estadosUnidos)
						.setVisitante(galesEscociaUcrania)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(4L)
						.build());
				
				//data 22/11
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 22, 7, 0))
						.setMandante(argentina)
						.setVisitante(arabiaSaudita)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(5L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 22, 10, 0))
						.setMandante(dinamarca)
						.setVisitante(tunisia)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(6L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 22, 13, 0))
						.setMandante(mexico)
						.setVisitante(polonia)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(7L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 22, 16, 0))
						.setMandante(franca)
						.setVisitante(peruEmiradosArabisAustralia)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(8L)
						.build());
				
				
				//data 23/11
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 23, 7, 0))
						.setMandante(marrocos)
						.setVisitante(croacia)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(9L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 23, 10, 0))
						.setMandante(alemanha)
						.setVisitante(japao)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(10L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 23, 13, 0))
						.setMandante(espanha)
						.setVisitante(costaRicaNovaZelandia)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(11L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 23, 16, 0))
						.setMandante(belgica)
						.setVisitante(canada)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(12L)
						.build());
				
				//data 24/11
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 24, 7, 0))
						.setMandante(suica)
						.setVisitante(camaroes)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(13L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 24, 10, 0))
						.setMandante(uruguai)
						.setVisitante(coreiaDoSul)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(14L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 24, 13, 0))
						.setMandante(portugal)
						.setVisitante(gana)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(15L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 24, 16, 0))
						.setMandante(brasil)
						.setVisitante(servia)
						.setFase("grupo")
						.setRodada(1L)
						.setNumero(16L)
						.build());
				
				//data 25/11
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 25, 7, 0))
						.setMandante(galesEscociaUcrania)
						.setVisitante(ira)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(17L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 25, 10, 0))
						.setMandante(catar)
						.setVisitante(senegal)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(18L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 25, 13, 0))
						.setMandante(holanda)
						.setVisitante(equador)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(19L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 25, 16, 0))
						.setMandante(inglaterra)
						.setVisitante(estadosUnidos)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(20L)
						.build());
				
				//data 26/11
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 26, 7, 0))
						.setMandante(tunisia)
						.setVisitante(peruEmiradosArabisAustralia)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(21L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 26, 10, 0))
						.setMandante(polonia)
						.setVisitante(arabiaSaudita)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(22L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 26, 13, 0))
						.setMandante(franca)
						.setVisitante(dinamarca)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(23L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 26, 16, 0))
						.setMandante(argentina)
						.setVisitante(mexico)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(24L)
						.build());
				
				//data 27/11
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 27, 7, 0))
						.setMandante(japao)
						.setVisitante(costaRicaNovaZelandia)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(25L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 27, 10, 0))
						.setMandante(belgica)
						.setVisitante(marrocos)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(26L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 27, 13, 0))
						.setMandante(croacia)
						.setVisitante(canada)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(27L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 27, 16, 0))
						.setMandante(espanha)
						.setVisitante(alemanha)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(28L)
						.build());
				
				//data 28/11
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 28, 7, 0))
						.setMandante(camaroes)
						.setVisitante(servia)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(29L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 28, 10, 0))
						.setMandante(coreiaDoSul)
						.setVisitante(gana)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(30L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 28, 13, 0))
						.setMandante(brasil)
						.setVisitante(suica)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(31L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 28, 16, 0))
						.setMandante(portugal)
						.setVisitante(uruguai)
						.setFase("grupo")
						.setRodada(2L)
						.setNumero(32L)
						.build());
				
				//data 29/11
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 29, 12, 0))
						.setMandante(holanda)
						.setVisitante(catar)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(33L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 29, 12, 0))
						.setMandante(equador)
						.setVisitante(senegal)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(34L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 29, 16, 0))
						.setMandante(galesEscociaUcrania)
						.setVisitante(inglaterra)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(35L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 29, 16, 0))
						.setMandante(ira)
						.setVisitante(estadosUnidos)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(36L)
						.build());
				
				//data 30/11
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 30, 12, 0))
						.setMandante(tunisia)
						.setVisitante(franca)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(37L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 30, 12, 0))
						.setMandante(peruEmiradosArabisAustralia)
						.setVisitante(dinamarca)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(38L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 30, 16, 0))
						.setMandante(polonia)
						.setVisitante(argentina)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(39L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 11, 30, 16, 0))
						.setMandante(arabiaSaudita)
						.setVisitante(mexico)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(40L)
						.build());
				
				//data 01/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 1, 12, 0))
						.setMandante(croacia)
						.setVisitante(belgica)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(41L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 1, 12, 0))
						.setMandante(canada)
						.setVisitante(marrocos)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(42L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 1, 16, 0))
						.setMandante(japao)
						.setVisitante(espanha)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(43L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 1, 16, 0))
						.setMandante(costaRicaNovaZelandia)
						.setVisitante(alemanha)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(44L)
						.build());
				
				//data 02/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 2, 12, 0))
						.setMandante(coreiaDoSul)
						.setVisitante(portugal)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(45L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 2, 12, 0))
						.setMandante(gana)
						.setVisitante(uruguai)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(46L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 2, 16, 0))
						.setMandante(camaroes)
						.setVisitante(brasil)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(47L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 2, 16, 0))
						.setMandante(servia)
						.setVisitante(suica)
						.setFase("grupo")
						.setRodada(3L)
						.setNumero(48L)
						.build());
				
				//data 03/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 3, 12, 0))
						.setFase("oitavas")
						.setNumero(49L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 3, 16, 0))
						.setFase("oitavas")
						.setNumero(50L)
						.build());
				
				//data 04/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 4, 12, 0))
						.setFase("oitavas")
						.setNumero(51L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 4, 16, 0))
						.setFase("oitavas")
						.setNumero(52L)
						.build());
				
				//data 05/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 5, 12, 0))
						.setFase("oitavas")
						.setNumero(53L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12,5, 16, 0))
						.setFase("oitavas")
						.setNumero(54L)
						.build());
				
				//data 06/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 6, 12, 0))
						.setFase("oitavas")
						.setNumero(55L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 6, 16, 0))
						.setFase("oitavas")
						.setNumero(56L)
						.build());
				
				//data 09/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 9, 12, 0))
						.setFase("quartas")
						.setNumero(57L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 9, 16, 0))
						.setFase("quartas")
						.setNumero(58L)
						.build());
				
				//data 10/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 10, 12, 0))
						.setFase("quartas")
						.setNumero(59L)
						.build());
				
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 10, 16, 0))
						.setFase("quartas")
						.setNumero(60L)
						.build());
				
				//data 13/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 13, 16, 0))
						.setFase("semi")
						.setNumero(61L)
						.build());
				
				//data 14/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 14, 16, 0))
						.setFase("semi")
						.setNumero(62L)
						.build());
				
				//data 17/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 17, 12, 0))
						.setFase("terceiro")
						.setNumero(63L)
						.build());
				
				//data 18/12
				partidaRepository.save(new PartidaBuilder()
						.setData(LocalDateTime.of(2022, 12, 18, 12, 0))
						.setFase("final")
						.setNumero(64L)
						.build());
			}
			
			
		}
		

	}

}
