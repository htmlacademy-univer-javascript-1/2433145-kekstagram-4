const NAMES = [
  'Артём',
  'Саша',
  'Настя',
  'Стас',
  'Марина',
  'Ксюша',
  'Вера',
  'Полина',
  'Игорь'
];

const SENTANCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'описание фото',
  'моя ласточка',
  'Отдыхаю',
  'Мой хозяин идиот',
  'Ласточка деда',
  'Закат',
  'Якобы мой завтрак',
  'Мой питомец',
  'Скучно',
  'Рассвет',
  'Пришлось идти пешком...'
];

const photos = [];
const photosUrl = [];
const photosID = [];
const commentID = [];

function getRandomNumber (max, min){
  return Math.round(Math.random() * (+max - +min + 1) + min);
}

function getUniqRandomNumber (max, min, arr) {
  let current = Math.random() * (+max - +min + 1) + min;
  while (arr.includes(current)){
    current = Math.random() * (+max - +min + 1) + min;
  }
  arr.push(current);
  return Math.round(current);
}

function getComments () {
  const comments = [];
  const quantity = getRandomNumber(1, 30);
  for (let i = 0; i < quantity; i++){
    comments.push({
      id: getUniqRandomNumber(1, 1000, commentID),
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: SENTANCES[getRandomNumber(0, 5)],
      name: NAMES[getRandomNumber(0, 8)],
    });
  }
  return comments;
}

function getPhoto () {
  return {
    id: getUniqRandomNumber(1, 25, photosID),
    url: `photos/${getUniqRandomNumber(1, 25, photosUrl)}.jpg`,
    description: DESCRIPTIONS[getRandomNumber(0, 10)],
    likes: getRandomNumber(15, 200),
    comments: getComments()
  };
}

for (let index = 0; index < 25; index++){
  photos.push(getPhoto());
}
