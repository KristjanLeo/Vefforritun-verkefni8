/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n, alphabet = '') {
  const hlidrun = n < alphabet.length ? n : alphabet.length - 1;
  var encodedstr = "";
  for(let i = 0; i < str.length; i++){
    if(alphabet.indexOf(str[i]) != -1){
      encodedstr += alphabet[(alphabet.indexOf(str[i]) + hlidrun) % alphabet.length];
    }
  }
  return encodedstr;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  const hlidrun = n < alphabet.length ? n : alphabet.length - 1;
  var decodedstr = "";
  for(let i = 0; i < str.length; i++){
    if(alphabet.indexOf(str[i]) != -1){
      decodedstr += alphabet[(alphabet.indexOf(str[i]) - hlidrun + alphabet.length) % alphabet.length];
    }
  }
  return decodedstr;
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  let shift = 3;

  // Default strengur
  let str = '';

  let resultBar = document.querySelector('.result');

  function init(el) {
    // Setja event handlera á viðeigandi element
    el.alphabet.addEventListener('input', (e) => {
      alphabet = e.target.value;
      el.children[2].children[1].children[0].max = alphabet.length;
      if(type === 'encode'){
        resultBar.innerText = encode(str, Number.parseInt(shift), alphabet);
      }else{
        resultBar.innerText = decode(str, Number.parseInt(shift), alphabet);
      }
    });

    el.children[1].addEventListener('change', (e) => {
      type = e.target.value;
      if(type === 'encode'){
        resultBar.innerText = encode(str, Number.parseInt(shift), alphabet);
      }else{
        resultBar.innerText = decode(str, Number.parseInt(shift), alphabet);
      }
    });

    el.children[2].addEventListener('input', (e) => {
      shift = e.target.value;
      el.children[2].children[1].children[1].innerText = shift;
      if(type === 'encode'){
        resultBar.innerText = encode(str, Number.parseInt(shift), alphabet);
      }else{
        resultBar.innerText = decode(str, Number.parseInt(shift), alphabet);
      }
    });

    el.input.addEventListener('input', (e) => {
      str = e.target.value.toLocaleUpperCase();
      if(type === 'encode'){
        resultBar.innerText = encode(str, Number.parseInt(shift), alphabet);
      }else{
        resultBar.innerText = decode(str, Number.parseInt(shift), alphabet);
      }
    });
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');

  Caesar.init(ceasarForm);
});
