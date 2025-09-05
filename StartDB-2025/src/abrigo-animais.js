class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    
    var animais = {
      Rex: {tipo: 'cão', brinquedos: ['RATO', 'BOLA']},
      Mimi: {tipo: 'gato',  brinquedos: ['BOLA', 'LASER']},
      Fofo: {tipo: 'gato',  brinquedos: ['BOLA', 'RATO', 'LASER']},
      Zero: {tipo: 'gato',  brinquedos: ['RATO', 'BOLA']},
      Bola: {tipo: 'cão',  brinquedos: ['CAIXA', 'NOVELO']},
      Bebe: {tipo: 'cão',  brinquedos: ['LASER', 'RATO', 'BOLA']},
      Loco: {tipo: 'jabuti',  brinquedos: ['SKATE', 'RATO']}
    };


    var brinquedosAceitos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']; //brinquedos aceitos 


    //array: armazena vários dados em uma única variável
    var pessoa1 = brinquedosPessoa1.split(',');

    var pessoa2 = brinquedosPessoa2.split(',');

    var listaAnimais = ordemAnimais.split(','); //split: divide a string em varias partes usando a vírgula como separador


    //for (inicialização; condição; incremento)
    for (var i = 0; i < pessoa1.length; i++) pessoa1[i] = pessoa1[i].trim(); 

    for (var i = 0; i < pessoa2.length; i++) pessoa2[i] = pessoa2[i].trim(); 

    for (var i = 0; i < listaAnimais.length; i++) listaAnimais[i] = listaAnimais[i].trim();  //trim(): remove espaços em branco no começo e no fim da string.


    //validar animais
    for (var i = 0; i < listaAnimais.length; i++) {
      if (!animais[listaAnimais[i]]) {
        return { erro: 'Animal inválido.'};
      }
    }  


    //validar todos brinquedos da lista
    function validarBrinquedos(lista) {
      for (var i = 0; i < lista.length; i++) {
        var b = lista[i]; //guarda o brinquedo na variável b

        var valido = false; //inicialmente começa falso

        for (var j = 0; j < brinquedosAceitos.length; j++) {
          if (b === brinquedosAceitos[j]) valido = true;        
        }
        if (!valido) return false;  


        //checar duplicata
        for (var k = i + 1; k < lista.length; k++) {
          if (b === lista[k]) return false;
        }
      }
      return true;
    }

    if (!validarBrinquedos(pessoa1) || !validarBrinquedos(pessoa2)) {
      return {erro: 'Brinquedo inválido. '};
    }  //se alguma das pessoas tiverem um brinquedo inválido o codigo para


    //verificar se todos brinquedos estão na ordem
    function contemnaOrdem(favoritos, listaPessoa) {
      var idx = 0; //brinquedo favorito
      for (var i = 0; i < listaPessoa.length; i++) {
        if (listaPessoa[i] === favoritos[idx]) idx++;
        if(idx === favoritos.length)
          return true;
      }
      return false;
    }

    var resultado = []; //"nome animal - pessoa número ou abrigo"

    var adotados = {pessoa1: [], pessoa2: [] }; //animais que cada pessoa já adotou

    for (var i = 0; i < listaAnimais.length; i++) {
      var animalNome = listaAnimais[i];
      var tipo = animais[animalNome].tipo;
      var brinquedos = animais[animalNome].brinquedos;

      var p1ok = contemnaOrdem(brinquedos, pessoa1); //se a pessoa 1 tem todos os brinquedos favoritos do animal na ordem correta.

      var p2ok = contemnaOrdem(brinquedos, pessoa2);


      //Loco
      if (animalNome === 'Loco') {
        p1ok = false; //inicialmente começa falso
        p2ok = false;

        for (var j = 0; j < pessoa1.length; j++) {
          if (brinquedos.indexOf(pessoa1[j]) >= 0 && adotados.pessoa1.length > 0) p1ok = true; 
        } //verifica se a pessoa tem os briquedos favoritos do Loco e se tem outro animal


        for (var j = 0; j < pessoa2.length; j++) {
          if (brinquedos.indexOf(pessoa2[j]) >= 0 && adotados.pessoa2.length > 0) p2ok = true;
        }
      }

      var destino = 'abrigo';
      if (p1ok && p2ok) destino = 'abrigo';
      else if (p1ok && adotados.pessoa1.length < 3) {
        destino = 'Pessoa 1';
        adotados.pessoa1.push(animalNome);
      } //Se só a pessoa 1 pode adotar e ainda não ultrapassou 3 animais, ela leva o animal.

      
      else if (p2ok && adotados.pessoa2.length < 3) {
        destino = 'Pessoa 2';
        adotados.pessoa2.push(animalNome);
      }

      resultado.push(animalNome + ' - ' + destino);
    }

    // ordenar lista final
    resultado.sort();
    return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
