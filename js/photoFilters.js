const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const containerPreview = document.querySelector('.img-upload__preview');
const imgPreview = containerPreview.querySelector('img');
const sliderValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.effect-level__slider');
const filterItems = document.querySelectorAll('.effects__item');
let filterName = '';
const scaleStep = 25;
sliderContainer.parentNode.classList.add('hidden');

scaleSmallerBtn.addEventListener('click', () => {
  const scaleInputValue = Number(scaleInput.value.split('%')[0]);
  if (scaleInputValue - scaleStep  >= 0) {
    scaleInput.value = `${scaleInputValue - scaleStep}%`;
    imgPreview.style.transform = `scale(${Number(scaleInput.value.split('%')[0])/100})`;
  }
});

scaleBiggerBtn.addEventListener('click', () => {
  const scaleInputValue = Number(scaleInput.value.split('%')[0]);
  if (scaleInputValue + scaleStep  <= 100) {
    scaleInput.value = `${scaleInputValue + scaleStep}%`;
    imgPreview.style.transform = `scale(${Number(scaleInput.value.split('%')[0])/100})`;
  }
});

noUiSlider.create(sliderContainer, {
  start: 1,
  connect: 'lower',
  step: 0.1,
  range: {
    'min': 0,
    'max': 1
  }
});

sliderContainer.noUiSlider.on('update', () => {
  sliderValue.value = sliderContainer.noUiSlider.get();
  imgPreview.style.filter = `${filterName.split(' ')[0]}(${sliderValue.value}${filterName.split(' ')[1]})`;
});

filterItems.forEach((filter) => {
  const filterValue = filter.querySelector('input').value;
  switch (filterValue) {
    case 'none':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.add('hidden');
        filterName = 'none ';
      });
      break;
    case 'chrome':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        filterName = 'grayscale ';
        sliderContainer.noUiSlider.updateOptions({ start: 1 });
      });
      break;
    case 'sepia':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        filterName = 'sepia ';
        sliderContainer.noUiSlider.updateOptions({ start: 1 });
      });
      break;
    case 'marvin':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        filterName = 'invert %';
        sliderContainer.noUiSlider.updateOptions({
          step: 1,
          start: 100,
          range: { 'min': 0, 'max': 100 }
        });
      });
      break;
    case 'phobos':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        filterName = 'blur px';
        sliderContainer.noUiSlider.updateOptions({
          start: 3,
          range: { 'min': 0, 'max': 3 }
        });
      });
      break;
    case 'heat':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        filterName = 'brightness ';
        sliderContainer.noUiSlider.updateOptions({
          start: 3,
          range: { 'min': 1, 'max': 3}
        });
      });
      break;
  }
});
