// Реализация формы: заполнение, условия заполнения

const activation = (elemClass) => {
  const element = document.querySelector(elemClass);
  if (element.classList.contains(`${elemClass}--disabled`)) {
    element.classList.remove(`${elemClass}--disabled`);
  }

  const elems = element.querySelectorAll('select, input, textarea, button');
  for (let i = 0; i < elems.length-1; i++) {
    if (elems[i].hasAttribute('disabled')) {
      elems[i].removeAttribute('disabled', 'disabled');
    }
  }
};

const deactivation = (elemClass) => {
  const element = document.querySelector(elemClass);
  if (!element.classList.contains(`${elemClass}--disabled`)) {
    element.classList.add(`${elemClass}--disabled`);
  }
  const elems = element.querySelectorAll('select, input, button, textarea');
  for (let i = 0; i < elems.length-1; i++) {
    if (!elems[i].hasAttribute('disabled')) {
      elems[i].setAttribute('disabled', 'disabled');
    }
  }
};

activation('.ad-form');
activation('.map__filters');

export {activation, deactivation};
