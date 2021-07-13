const ALERT_SHOW_TIME = 5000;
const ESC_CODE = 27;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successContainer = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorContainer = errorTemplate.cloneNode(true);
const errorButton = errorTemplate.querySelector('.error__button');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const keyDownCallbackSuccess = (evt) => {
  if (evt.key === 'Escape' || evt.key === ESC_CODE) {
    successContainer.remove();
  }
};

const clickCallbackSuccess = () => {
  successContainer.remove();
};

const showSuccess = () => {
  document.body.append(successContainer);
  document.body.addEventListener('keydown', keyDownCallbackSuccess, {once: true});
  document.body.addEventListener('click', clickCallbackSuccess, {once: true});
};

const keyDownCallbackError = (evt) => {
  if (evt.key === 'Escape' || evt.key === ESC_CODE) {
    errorContainer.remove();
  }
};

const clickCallbackError = () => {
  errorContainer.remove();
};

const callbackErrorButton = () => {
  errorContainer.remove();
};

const showError = () => {
  document.body.append(errorContainer);

  document.body.addEventListener('keydown', keyDownCallbackError, {once: true});

  document.body.addEventListener('click', clickCallbackError, {once: true});

  errorButton.addEventListener('click', callbackErrorButton, {once: true});
};

export {showAlert, showSuccess, showError};
