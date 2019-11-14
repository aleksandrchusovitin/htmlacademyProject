'use strict';

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

// Получаем диалоговое окно с привествиями и элемент для его открытия и инпут
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

// Добавим функции для открытия и закрытия окна приветствия
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeSetupHandler();
  }
};

var openSetupHandler = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closeSetupHandler = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Обработчик событий для аватарки, чтобы открывалось окно по нажатию энтер
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openSetupHandler();
  }
});

// Обработчик событий для закрытия окна с клавиатуры
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closeSetupHandler();
  }
});

// добавляем обработчик события на иконку с аватаром
setupOpen.addEventListener('click', openSetupHandler);

// Добавляем обработчик событий для закрытия окна по клику на крестик
setupClose.addEventListener('click', closeSetupHandler);

// Обработчик ошибок для инпута
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// обработчики для того, чтобы когда поле имя было в фокусе не выходило на esc
userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});
// Получаем элементы для плаща, глаз и фаербола волшебника и ставим на них обработчики
var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var fireballWrap = document.querySelector('.setup-fireball-wrap');
var inputCoat = document.querySelector('input[name=coat-color]');
var inputEyes = document.querySelector('input[name=eyes-color]');
var inputFireball = document.querySelector('input[name=fireball-color]');

var changeCoatColorHandler = function () {
  var colorCoat = getRandomItem(WIZARDS_COAT_COLORS);
  wizardCoat.style.fill = colorCoat;
  inputCoat.value = colorCoat;
};
var changeEyesColorHandler = function () {
  var colorEyes = getRandomItem(WIZARDS_EYES_COLORS);
  wizardEyes.style.fill = colorEyes;
  inputEyes.value = colorEyes;
};
var changeFireballHandler = function () {
  var colorFireball = getRandomItem(FIREBALL_COLORS);
  fireballWrap.style.backgroundColor = colorFireball;
  inputFireball.value = colorFireball;
};

wizardCoat.addEventListener('click', changeCoatColorHandler);
wizardEyes.addEventListener('click', changeEyesColorHandler);
setupWizard.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    changeCoatColorHandler();
    changeEyesColorHandler();
  }
});
fireballWrap.addEventListener('click', changeFireballHandler);
fireballWrap.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    changeFireballHandler();
  }
});

// Получаем блок для вставки волшебников
var similarListElement = setup.querySelector('.setup-similar-list');

// Шаблон(template) для волшебников
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Массивы константных свойств волшебников
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// Массив рандомных волшебников
var wizards = [];

// Функция для выбора случайного элемента из массива
var getRandomItem = function (arr) {
  var randomItem = Math.floor(Math.random() * arr.length);
  return arr[randomItem];
};

// Функция для генерации волшебника
var getRandomWizard = function () {
  var firstName = Math.round(Math.random());

  return {
    name: firstName ? getRandomItem(WIZARDS_NAMES) + ' ' + getRandomItem(WIZARDS_SURNAMES) : getRandomItem(WIZARDS_SURNAMES) + ' ' + getRandomItem(WIZARDS_NAMES),
    coatColor: getRandomItem(WIZARDS_COAT_COLORS),
    eyesColor: getRandomItem(WIZARDS_EYES_COLORS)
  };

};

// Формируем 4 случайных волшебника и заполняем ими массив
for (var i = 0; i < 4; i++) {
  wizards[i] = getRandomWizard();
}

// Функция которая возвращает готовый элемент волшебника для отрисовки
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Функция которая формирует ФРАГМЕНТ с волшебниками
var addWizardsToFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < wizards.length; j++) {
    fragment.append(renderWizard(wizards[j]));
  }

  return fragment;
};

// Добавляем весь фрагмент с волшебниками в DOM
similarListElement.append(addWizardsToFragment());

// Отображаем окно со списком волшебников
setup.querySelector('.setup-similar').classList.remove('hidden');
