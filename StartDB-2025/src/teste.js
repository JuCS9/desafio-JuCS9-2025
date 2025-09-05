import { AbrigoAnimais } from './abrigo-animais.js';
const abrigo = new AbrigoAnimais();

// Teste 1: caso válido
console.log(abrigo.encontraPessoas('RATO,BOLA','RATO,NOVELO','Rex,Fofo,Loco'));

// Teste 2: animal inválido
console.log(abrigo.encontraPessoas('CAIXA,RATO','RATO,BOLA','Lulu'));

// Teste 3: brinquedo inválido ou duplicado
console.log(abrigo.encontraPessoas('RATO,RATO','BOLA,LASER','Mimi'));
