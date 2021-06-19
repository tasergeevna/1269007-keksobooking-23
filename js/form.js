// Реализация формы: заполнение, условия заполнения

const activation = (elemClass, isActive) => {
  const element = document.querySelector(elemClass);

  if (isActive) {
    if (element.classList.contains(`${elemClass}--disabled`)) {
      element.classList.remove(`${elemClass}--disabled`);
    }

    const elems = element.querySelectorAll('select, input, textarea, button');
    for (let i = 0; i < elems.length-1; i++) {
      if (elems[i].hasAttribute('disabled')) {
        elems[i].removeAttribute('disabled', 'disabled');
      }
    }
  } else {
    if (!element.classList.contains(`${elemClass}--disabled`)) {
      element.classList.add(`${elemClass}--disabled`);
    }
    const elems = element.querySelectorAll('select, input, button');
    for (let i = 0; i < elems.length-1; i++) {
      if (!elems[i].hasAttribute('disabled')) {
        elems[i].setAttribute('disabled', 'disabled');
      }
    }
  }
};

activation('.ad-form', false);
activation('.map__filters', false);

export{activation};
