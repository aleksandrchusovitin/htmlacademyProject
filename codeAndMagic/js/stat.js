'use strict';

(function () {
  var BAR_X = 140;
  var BAR_Y = 265;
  var FONT_GAP = 5;
  var FONT_HEIGHT = 16;
  var BAR_MAX_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;

  var renderCloud = function (ctx) {
    // Отрисовка тени
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.beginPath();
    ctx.moveTo(130, 20);
    ctx.lineTo(510, 20);
    ctx.bezierCurveTo(520, 22, 530, 30, 530, 40);
    ctx.lineTo(530, 270);
    ctx.bezierCurveTo(530, 280, 520, 290, 510, 290);
    ctx.lineTo(130, 290);
    ctx.bezierCurveTo(120, 288, 110, 280, 110, 270);
    ctx.lineTo(110, 40);
    ctx.closePath();
    ctx.fill();

    // Отрисовка облака
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '2b65e3';
    ctx.beginPath(); // ШИРИНА 420, ВЫСОТА 270
    ctx.moveTo(120, 10); // Начало верх лево, первая точка ::: X = 120, Y = 10 *
    ctx.lineTo(500, 10); // Верхняя прямая линия ::: X = 500, Y = 10 *
    ctx.bezierCurveTo(510, 12, 520, 20, 520, 30); // правый кругляш верхний ::: X = 520, Y = 30
    ctx.lineTo(520, 260); // правая прямая линия ::: X = 520, Y = 260 *
    ctx.bezierCurveTo(520, 270, 510, 280, 500, 280); // правый кругляш нижний ::: X = 500, Y = 280
    ctx.lineTo(120, 280); // нижняя прямая линия ::: X = 120, Y = 280 *
    ctx.bezierCurveTo(110, 278, 100, 270, 100, 260); // левый кругляш нижний ::: X = 100, Y = 260
    ctx.lineTo(100, 30); // левая прямая линия ::: X = 10, Y = 30 *
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  var renderText = function (ctx, x, y, text, color, font) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  };

  var renderBar = function (ctx, x, y, color, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  var getMaxElement = function (arr) {
    if (arr.length === 0) {
      return null;
    }

    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  var isArraysLengthEqual = function (array1, array2) {
    return array1.length === array2.length;
  };

  var getEqualsPlayersAndTimes = function (players, times) {
    if (!isArraysLengthEqual(players, times)) {
      var playersLength = players.length;
      var timesLength = times.length;
      var difference = Math.abs(playersLength - timesLength);

      for (var j = 0; j < difference; j++) {
        if (playersLength > timesLength) {
          times.push(0);
        } else if (timesLength > playersLength) {
          players.push('unknown');
        }
      }
    }
  };

  window.renderStatistics = function (ctx, players, times) {
    /* renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');*/

    renderCloud(ctx);
    renderText(ctx, 120, 40, 'Ура вы победили!', '#000', '16px PT Mono');
    renderText(ctx, 120, 60, 'Список результатов:', '#000', '16px PT Mono');

    // Проверка входящих массивов players и times на равенство и если НЕ равны исправление данной ситуации
    getEqualsPlayersAndTimes(players, times);

    var maxTime = getMaxElement(times);
    var fontText = '16px PT Mono';
    var colorText = '#000';
    var colorBar;
    var barHeight;

    for (var i = 0; i < players.length; i++) {

      if (players[i] === 'Вы') {
        colorBar = 'rgba(255, 0, 0, 1)';
      } else {
        var saturation = (Math.ceil(Math.random() * 10)) / 10;
        colorBar = 'rgba(0, 0, 255, ' + saturation + ')';
      }

      barHeight = BAR_MAX_HEIGHT * times[i] / maxTime;

      renderText(ctx, BAR_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y, players[i], colorText, fontText);
      renderBar(ctx, BAR_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y - FONT_HEIGHT - FONT_GAP - barHeight, colorBar, BAR_WIDTH, barHeight);
      renderText(ctx, BAR_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y - FONT_HEIGHT - (FONT_GAP * 3) - barHeight, Math.round(times[i]), colorText, fontText);
    }
  };

})();
