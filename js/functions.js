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

//доп задание
function TimeVisitAnswer(dayStart, dayEnd, visitStart, visitLength) {
  dayEnd = dayEnd.split(':');
  dayStart = dayStart.split(':');
  visitStart = visitStart.split(':');
  const probably = visitStart[0]*60 + +visitStart[1] + +visitLength;
  if (dayStart[0]*60 + +dayStart[1] > visitStart[0]*60 + +visitStart[1]) {
    return false;
  }
  return probably <= (dayEnd[0]*60 + +dayEnd[1]);
}

TimeVisitAnswer('08:00', '17:30', '14:00', 90);
TimeVisitAnswer('8:0', '10:0', '8:0', 120);
TimeVisitAnswer('08:00', '14:30', '14:00', 90);
TimeVisitAnswer('14:00', '17:30', '08:0', 90);
TimeVisitAnswer('8:00', '17:30', '08:00', 900);
