const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form__field  input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const photoChooser = document.querySelector('.ad-form__upload input');
const photoPreview = document.querySelector('.ad-form__photo img');


const uploadPhotos = (input, container) => {
  input.addEventListener('change', () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        container.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
};

export {uploadPhotos, avatarChooser, avatarPreview, photoChooser, photoPreview};
