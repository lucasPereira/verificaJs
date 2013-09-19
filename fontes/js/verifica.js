/*global Ambiente*/
/*global Classe*/
/*global JSHINT*/
/*global Linda*/

(function (global) {
	"use strict";

	var Verifica = Classe.criar({
		inicializar: function (arquivos) {
			this.arquivos = arquivos;
			this.opcoes = {
				bitwise: true,
				camelcase: true,
				curly: true,
				eqeqeq: true,
				forin: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				noempty: true,
				nonew: false,
				plusplus: false,
				quotmark: "double",
				regexp: true,
				undef: true,
				unused: true,
				strict: true,
				trailing: true,
				indent: 4,
				asi: false,
				boss: false,
				debug: false,
				eqnull: false,
				es5: true,
				esnext: false,
				evil: true,
				expr: false,
				funcscope: false,
				globalstrict: false,
				iterator: false,
				lastsemic: false,
				laxbreak: false,
				laxcomma: false,
				loopfunc: false,
				multistr: false,
				proto: false,
				scripturl: false,
				smarttabs: false,
				shadow: false,
				sub: false,
				supernew: false,
				nomen: true,
				onevar: false,
				passfail: false,
				browser: true
			};
		},

		verificar: function () {
			var listaSecaoDeErros = this.criarListaSecaoDeErros();
			this.arquivos.paraCada(function (arquivo) {
				JSHINT(this.obterArquivo(arquivo), this.opcoes);
				var erros = JSHINT.errors;
				var listaErros = this.criarListaErros(arquivo, listaSecaoDeErros);
				erros.paraCada(function (erro) {
					if (!Linda.nulo(erro)) {
						this.criarItemErro(erro, listaErros);
					}
				},this);
			}, this);
			Ambiente.selecionar("div.verificaJs").appendChild(listaSecaoDeErros);
		},

		obterArquivo: function (nome) {
			var requisicao = new XMLHttpRequest();
			requisicao.open("GET", nome, false);
			requisicao.send();
			return requisicao.responseText;
		},

		criarListaSecaoDeErros: function () {
			var listaSecaoDeErros = Ambiente.criarElemento("ul");
			return listaSecaoDeErros;
		},

		criarListaErros: function (nome, listaSecaoDeErros) {
			var itemSecaoDeErros = Ambiente.criarElemento("li");
			var tituloSecaoDeErros = Ambiente.criarElemento("h1");
			var listaErros = Ambiente.criarElemento("ul");
			tituloSecaoDeErros.textContent = nome;
			itemSecaoDeErros.appendChild(tituloSecaoDeErros);
			itemSecaoDeErros.appendChild(listaErros);
			listaSecaoDeErros.appendChild(itemSecaoDeErros);
			return listaErros;
		},

		criarItemErro: function(erro, listaErros) {
			var itemErro = Ambiente.criarElemento("li");
			var textoLinhaErro = Ambiente.criarElemento("span");
			var textoRazaoErro = Ambiente.criarElemento("span");
			var textoEvidenciaErro = Ambiente.criarElemento("span");
			textoLinhaErro.textContent = erro.line;
			textoRazaoErro.textContent = erro.reason;
			textoEvidenciaErro.textContent = erro.evidence;
			textoLinhaErro.classList.add("linha");
			textoRazaoErro.classList.add("razao");
			textoEvidenciaErro.classList.add("evidencia");
			itemErro.appendChild(textoLinhaErro);
			itemErro.appendChild(textoRazaoErro);
			itemErro.appendChild(textoEvidenciaErro);
			listaErros.appendChild(itemErro);
		}
	});

	global.Verifica = Verifica;
}(this));
