'use strict';

// Валидация хэштегов и комментариев при загрузке нового фото на сайт
var MAX_HASHTAGS = 5;
var MAX_HASHTAG_LENGTH = 20;
var MIN_HASHTAG_LENGTH = 2;
var MAX_COMMENT_LENGTH = 140;
var inputHash = document.querySelector('.text__hashtags');
var inputComment = document.querySelector('.text__description');

var checkHashtags = function (userInput) {

  if (userInput === '') {
    return '';
  }

  var hashtags = userInput.toLowerCase().split(' ');

  if (hashtags.length > MAX_HASHTAGS) {
    return 'Максимальное кол-во хэштегов - 5';
  }

  for (var i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i];

    if (hashtag[0] !== '#') {
      return 'Все хэштеги должны начинаться со знака "#"';
    }

    if (hashtag === '#') {
      return 'Хэштег не может состоять только из "#"';
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return 'Хэштег не может быть длиннее 20 символов учитывая "#"';
    }

    if (hashtag.length < MIN_HASHTAG_LENGTH) {
      return 'Хэштег не может быть короче 2 символов учитывая "#"';
    }

    if (hashtags.indexOf(hashtag) !== i) {
      return 'Хэштеги не должны повторяться';
    }

    var cutHashtag = hashtag.slice(1);
    if (cutHashtag.indexOf('#') !== -1) {
      return 'Хэштеги должны быть разделены пробелами';
    }
  }

  return '';
};
var checkComment = function (userInput) {
  if (userInput === '') {
    return '';
  }

  if (userInput.length > MAX_COMMENT_LENGTH) {
    return 'Длина комментария не должна превышать 140 символов';
  }
  return '';
};

inputHash.addEventListener('change', function () {
  var hashTagError = checkHashtags(inputHash.value);
  inputHash.setCustomValidity(hashTagError);
});

inputComment.addEventListener('change', function () {
  var commentError = checkComment(inputComment.value);
  inputComment.setCustomValidity(commentError);
});


