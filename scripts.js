/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
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
  let encodedstr = '';
  for (let i = 0; i < str.length; i += 1) {
    if (alphabet.indexOf(str[i]) !== -1) {
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
  const alength = alphabet.length;
  let decodedstr = '';
  for (let i = 0; i < str.length; i += 1) {
    if (alphabet.indexOf(str[i]) !== -1) {
      decodedstr += alphabet[(alphabet.indexOf(str[i]) - hlidrun + alength) % alength];
    }
  }
  return decodedstr;
}

/**
 * Athugar hvort það eigi að kóða eða afkóða streng
 *
 * @param  {string} str      Strengurinn sem á að kóða eða afkóða
 * @param  {number} n        Hversu mikið skal hliðra [0, lengd stafrófs]
 * @param  {string} alphabet Hvaða stafir eru í viðeigandi stafrófi
 * @param  {string} type     Hvort á eigi að kóða eða afkóða
 * @return {string}          Afkóðaði eða kóðaði strengurinn
 */
function encodeordecode(str, n, alphabet = '', type) {
  if (type === 'encode') {
    return encode(str, n, alphabet);
  }
  return decode(str, n, alphabet);
}

const Caesar = (() => {
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';
  let type = 'encode';
  let shift = 3;
  let str = '';

  const resultBar = document.querySelector('.result');
  const shiftBar = document.querySelector('input[name="shift"]');
  const shiftValue = document.querySelector('.shiftValue');

  function init(el) {
    // Event handlerar (kalla á annað hvort encode eða decode eftir type)
    el.alphabet.addEventListener('input', (e) => {
      alphabet = e.target.value;
      shiftBar.max = alphabet.length;
      resultBar.innerText = encodeordecode(str, Number.parseInt(shift, 10), alphabet, type);
    });

    el.querySelector('.radio').addEventListener('change', (e) => {
      type = e.target.value;
      resultBar.innerText = encodeordecode(str, Number.parseInt(shift, 10), alphabet, type);
    });

    el.querySelector('.range').addEventListener('input', (e) => {
      shift = e.target.value;
      shiftValue.innerText = shift;
      resultBar.innerText = encodeordecode(str, Number.parseInt(shift, 10), alphabet, type);
    });

    el.input.addEventListener('input', (e) => {
      str = e.target.value.toLocaleUpperCase();
      resultBar.innerText = encodeordecode(str, Number.parseInt(shift, 10), alphabet, type);
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
