'use strict';

// Инициализируем массивы
var otherPictures = [];
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
];
var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

// Функция для проверки равенства 2 строк
var isEqualStrings = function (item1, item2) {
  return item1 === item2;
};

// Функция генерирует случайный индекс массива
var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// Функция для генерирования случайного значения из массива, возвращает 1 элемент
var getRandomItem = function (arr) {
  return arr[getRandomIndex(arr)];
};

// Функция для генерации массива из 1 или двух (в зависимости от параметра oneOrTwo) случайных элементов
var getRandomArrayItem = function (arr, oneOrTwo) {
  if (oneOrTwo) {
    return [arr[getRandomIndex(arr)]];
  }

  var value1;
  var value2;
  do {
    value1 = arr[getRandomIndex(arr)];
    value2 = arr[getRandomIndex(arr)];
  } while (isEqualStrings(value1, value2));

  return [value1, value2];

};

// Функция генерирует 25 объектов фотографий с рандомными значениями свойств и заполняет ими массив
var createOtherPictures = function () {
  var oneOrTwo;
  for (var i = 0; i < 25; i++) {
    oneOrTwo = Math.round(Math.random());

    otherPictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: Math.floor(15 + Math.random() * 186),
      comments: getRandomArrayItem(comments, oneOrTwo),
      description: getRandomItem(descriptions)
    };
  }
};

createOtherPictures();

// Шаблон(template) для фотографий
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Получаем блок для вставки фотографий
var similarListElement = document.querySelector('.pictures');

// Функция которая возвращает готовый элемент фотографии для отрисовки
var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();

  return pictureElement;
};

// Функция которая формирует ФРАГМЕНТ с картинками
var addPicturesToFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < otherPictures.length; i++) {
    fragment.append(renderPicture(otherPictures[i]));
  }

  return fragment;
};

// Добавляем весь фрагмент с фотографиями в DOM
similarListElement.append(addPicturesToFragment());

// Создаем элемент комментария
var createElementComments = function (comment) {
  var elementComment = document.createElement('li');
  elementComment.classList.add('social__comment');
  elementComment.classList.add('social__comment--text');
  var img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = 'img/avatar-' + Math.floor(1 + Math.random() * 6) + '.svg';
  img.alt = 'Аватар комментатора фотографии';
  img.width = 35;
  img.height = 35;
  var p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment;
  elementComment.appendChild(img);
  elementComment.appendChild(p);

  return elementComment;
};

// Функция для удаления стандартных комментариев
var deleteDefaultComments = function () {
  var defaultComments = Array.from(document.querySelectorAll('.social__comment'));
  for (var i = 0; i < defaultComments.length; i++) {
    defaultComments[i].remove();
  }
};

// Функция для добавления сгенерированных комментариев в блок комментариев в UL
var addComments = function (picture) {
  var commentsBlock = document.querySelector('.social__comments');
  for (var i = 0; i < picture.comments.length; i++) {
    commentsBlock.appendChild(createElementComments(picture.comments[i]));
  }
};

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comments-loader').classList.add('visually-hidden');

// Функция для отображения элемента big-picture и заполнения его согласно свойствам мини изображения
var showOverlay = function (picture) {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.big-picture__img img').src = picture.url;
  document.querySelector('.likes-count').textContent = picture.likes;
  document.querySelector('.comments-count').textContent = picture.comments.length.toString();
  document.querySelector('.social__caption').textContent = picture.description;
  deleteDefaultComments();
  addComments(picture);
  document.addEventListener('keydown', onLoadBigPicEscPress);
};
var closeOverlay = function () {
  document.querySelector('.big-picture').classList.add('hidden');
};

// Раздел для показа большого изображения маленьких картинок
var miniImages = document.querySelectorAll('.picture');

miniImages.forEach(function (img, key) {
  img.addEventListener('click', function () {
    showOverlay(otherPictures[key]);
  });

  img.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      showOverlay(otherPictures[key]);
    }
  });
});

var onLoadBigPicEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeOverlay();
  }
};
var bigPicCancel = document.querySelector('.big-picture__cancel');
bigPicCancel.addEventListener('click', function () {
  closeOverlay();
  document.removeEventListener('keydown', onLoadBigPicEscPress);
});

// раздел для загрузки новых изображений
var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('#upload-cancel');

var onLoadOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeLoadOverlayHandler();
  }
};

var openLoadOverlayHandler = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onLoadOverlayEscPress);
};

var closeLoadOverlayHandler = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onLoadOverlayEscPress);
  uploadFile.value = '';
};

uploadFile.addEventListener('change', openLoadOverlayHandler);

uploadFile.addEventListener('change', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openLoadOverlayHandler();
  }
});

uploadCancel.addEventListener('click', closeLoadOverlayHandler);

uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closeLoadOverlayHandler();
  }
});

// Раздел для ESC и хештегов и комментариев из формы
var inputHash = document.querySelector('.text__hashtags');
var inputComment = document.querySelector('.text__description');
inputHash.addEventListener('focus', function () {
  document.removeEventListener('keydown', onLoadOverlayEscPress);
});

inputHash.addEventListener('blur', function () {
  document.addEventListener('keydown', onLoadOverlayEscPress);
});

inputComment.addEventListener('blur', function () {
  document.addEventListener('keydown', onLoadOverlayEscPress);
});

inputComment.addEventListener('focus', function () {
  document.removeEventListener('keydown', onLoadOverlayEscPress);
});

// Глубина эффекта ползунок. Начало
var effectLvlPin = document.querySelector('.effect-level__pin');
var imageUploadPreview = document.querySelector('.img-upload__preview');
var effectLvlValue = document.querySelector('.effect-level__value');

var saturationChrome;
var saturationSepia;
var saturationMarvin;
var saturationFobos;
var saturationZnoi;

// Логика определения уровня насыщенности
var getSaturation = function () {
  var value = effectLvlValue.getAttribute('value');
  saturationChrome = value / 10;
  saturationSepia = value / 10;
  saturationMarvin = value + '%';
  saturationFobos = 3 * value / 100;
  saturationZnoi = (2 * value / 100) + 1 + 'px';
};
effectLvlPin.addEventListener('mouseup', function () {

});

// Валидность данных при загрузке новой фотографии
var hashTagInput = document.querySelector('.text__hashtags');


