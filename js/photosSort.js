const picturesContainer = document.querySelector('.pictures');
const imgUpload = document.querySelector('.img-upload');
const filterContainer = document.querySelector('.img-filters');
const filter = filterContainer.querySelector('.img-filters__form');
const PHOTO_COUNT = 10;

const comparePhotos = (photoA, photoB) => {
  const rankA = photoA.querySelector('.picture__comments').innerHTML;
  const rankB = photoB.querySelector('.picture__comments').innerHTML;
  return rankB - rankA;
};

function sortPhotos (callback) {
  const originPosts = Array.from(picturesContainer.querySelectorAll('.picture'));
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
  let newPhotos;

  filter.addEventListener('click', (evt) => {
    filter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    if (evt.target.id.includes('filter-random')) {
      newPhotos = randomSort(originPosts);
    }
    if (evt.target.id.includes('filter-discussed')) {
      newPhotos = discussedSort(originPosts);
    }
    if (evt.target.id.includes('filter-default')) {
      newPhotos = returnToDefault(originPosts);
    }
    callback(newPhotos);
  });
}

function returnToDefault (originPosts) {
  picturesContainer.innerHTML = '';
  picturesContainer.append(imgUpload);
  return originPosts;
}

function discussedSort (originPosts) {
  const picturesArr = Array.from(originPosts);
  picturesContainer.innerHTML = '';
  picturesContainer.append(imgUpload);
  return picturesArr.slice(0).sort(comparePhotos);
}

function randomSort (originPosts) {
  const picturesArr = originPosts.slice(0).sort(() => Math.random() - 0.5);
  const alreadyUsed = [];
  const newArr = [];
  let counter = 0;
  picturesContainer.innerHTML = '';
  picturesContainer.append(imgUpload);
  picturesArr.forEach((pic) => {
    const address = pic.querySelector('.picture__img').src;
    if (!(address in alreadyUsed) && (counter < PHOTO_COUNT)) {
      counter++;
      alreadyUsed.push(address);
      newArr.push(pic);
    }
  });
  return newArr;
}

export {sortPhotos};
