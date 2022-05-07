package br.com.bolaopinga.bolao.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class SenhaUtils {

	public SenhaUtils () {}
	
	public static String gerarBCrypt(String senha) {
		if (senha == null) {
			return senha;
		}
		
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		return bCryptPasswordEncoder.encode(senha);
	}
	
	public static boolean isSenhaValida(String senha, String senhaEncoded) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		return bCryptPasswordEncoder.matches(senha, senhaEncoded);
	}
}
