//первое задание
function checkLength (line, maxLength) {
  return line.length <= maxLength;
}

checkLength('проверяемая строка', 20);
checkLength('проверяемая строка', 18);
checkLength('проверяемая строка', 10);

//второе задание
function checkPalindrome(line) {
  line = line.toLowerCase();
  line = line.replaceAll(' ', '');
  for (let letter = 0; letter <= line.length/2; letter++) {
    if (!(line[letter] === line[line.length - letter - 1])) {
      return false;
    }
    return true;
  }
}

checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл');

//третье задание
function returnNumber(line) {
  line = String(line);
  let finalNumber = '';
  line = line.replaceAll(' ', '');
  for (let i = 0; i < line.length; i++){
    if (!isNaN(line[i])) {
      finalNumber += line[i];
    }
  }
  return Number(finalNumber);
}
returnNumber('2023 год');
returnNumber('ECMAScript 2022');
returnNumber('1 кефир, 0.5 батона');
returnNumber('агент 007');
returnNumber('а я томат');
returnNumber(2023);
returnNumber(-1);
returnNumber(1.5);
