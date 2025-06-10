//declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Altere para o número total de cartas
const TOTAL_CARTAS = 8;
const MAX_TENTATIVAS = 5;

//captura os botoes pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

//funçao que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  //mostra o botao jogarnovamente alterando a classe css (className)
  btnJogarNovamente.className = 'visivel';
  //oculta o botao reiniciar alterando a classe css (className)
  btnReiniciar.className = 'invisivel';
}

// Função utilitária para limpar imagem e número antigos de uma carta
function limparCarta(obj) {
  let imgAntiga = obj.querySelector("#imagem");
  if (imgAntiga) imgAntiga.remove();
  let numAntigo = obj.querySelector(".numero-carta");
  if (numAntigo) numAntigo.remove();
}

//função para criar container de carta com número e imagem
function criarCarta(numero, srcImg, classeCarta) {
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = "100%";
  container.style.height = "100%";

  const span = document.createElement("span");
  span.className = "numero-carta";
  span.textContent = numero;
  container.appendChild(span);

  const img = document.createElement("img");
  img.id = "imagem";
  img.width = 100;
  img.src = srcImg;
  img.style.display = "block";
  img.style.margin = "0 auto";
  img.style.position = "relative";
  img.style.zIndex = "1";
  container.appendChild(img);

  return container;
}

//funçao executada quando o jogador acertou
function acertou(obj, numero) {
  obj.className = "acertou";
  obj.style.display = "";
  obj.style.alignItems = "";
  obj.style.justifyContent = "";
  limparCarta(obj);
  obj.appendChild(criarCarta(numero, "caneta.webp", "acertou"));
}

//função executada quando o jogador errou
function errou(obj, numero) {
  obj.className = "errou";
  obj.style.display = "";
  obj.style.alignItems = "";
  obj.style.justifyContent = "";
  limparCarta(obj);
  obj.appendChild(criarCarta(numero, "pust.jpeg", "errou"));
}

//função executada para mostrar a carta correta quando o jogador errou
function errouCerta(obj, numero) {
  obj.className = "acertou";
  obj.style.display = "";
  obj.style.alignItems = "";
  obj.style.justifyContent = "";
  limparCarta(obj);
  obj.appendChild(criarCarta(numero, "caneta.webp", "acertou"));
}

//funçao jogar novamente
function jogarNovamente() {
  jogar = true;//variável jogar volta a ser verdadeira
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    // Verifica se o id é um número entre 0 e TOTAL_CARTAS-1
    if (!isNaN(divis[i].id) && Number(divis[i].id) >= 0 && Number(divis[i].id) < TOTAL_CARTAS) {
      divis[i].className = "inicial";
      // Limpa todo o conteúdo da carta e repõe o número
      limparCarta(divis[i]);
      divis[i].innerHTML = divis[i].id;
    }
  }

  // Remove imagem extra se existir fora das cartas
  let imagem = document.getElementById("imagem");
  if (imagem && imagem.parentNode && imagem.parentNode.id >= 0 && imagem.parentNode.id < TOTAL_CARTAS) {
    // já removido acima
  } else if (imagem) {
    imagem.remove();
  }
}

//funçao que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  //calcula o desempenho em porcentagem
  desempenho = (acertos / tentativas) * 100;
  //escreve o placar com os valores atualizados (innerHTML)
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";

}

//Função que sorteia um número aleatório entre 0 e TOTAL_CARTAS-1 e verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;
    if (tentativas == MAX_TENTATIVAS) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }
    let sorteado = Math.floor(Math.random() * TOTAL_CARTAS);
    if (obj.id == sorteado.toString()) {
      acertou(obj, sorteado);
      acertos++;
    } else {
      errou(obj, sorteado);
      const objSorteado = document.getElementById(sorteado.toString());
      // Só mostra a imagem na carta correta se ela não for a mesma carta clicada
      if (objSorteado !== obj) {
        errouCerta(objSorteado, sorteado);
      }
    }
    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);