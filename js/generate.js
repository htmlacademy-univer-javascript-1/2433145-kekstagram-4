import {getRandomNumber, getUniqRandomNumber} from './util.js';
import {DESCRIPTIONS, SENTANCES, NAMES} from './data.js';

const photos = [];
const photosUrl = [];
const photosID = [];
const commentID = [];

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

function createPhoto () {
  for (let index = 0; index < 25; index++){
    photos.push(getPhoto());
  }
}

export {createPhoto};

