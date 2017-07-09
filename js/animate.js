

'use strict';

var $ = {d: window.document, w: window};

/*
* el - анимируемый элемент
* props - сущность анимации
* opts - характеристики
* cb - коллбэк
*/
$.w.ltAnimate = function (el,props,t_duration, opts, cb) {
	var self = this,
		id = new Date().getTime(); // id анимации

	self._debug = true;
	// проверяем элемент
	if ((typeof el == "string") && el) el = this.ltElem(el);
	if ((typeof el != "object") || !el || (typeof el.nodeType != "number") || (el.nodeType > 1)) {
		doFail("Нет анимируемого элемента");
		return;
	}
	// проверяем аргумент opts
	switch (typeof opts) {
		case "number":
			opts = {duration: opts};
			break;
		case "function":
			opts = {cbDone: opts};
			break;
		case "object":
			if (!opts) opts = {};
			break;
		default:
			opts = {};
	}
	if (typeof cb == "function") opts.cbDone = cb;
	// устанавливаем умолчания
	var defaultOptions = {
		tick : 30,									// период отрисовки нового кадра в миллисекундах, задаётся только здесь
		duration : t_duration,						 	// длительность выполнения анимации
		easing : 'linear',					 	// функция расчёта параметров
		cbDone : function() {					// коллбэк после удачного выполнения
			//if (self._debug) $.w.console.log("Анимация [id: " + id + "] прошла удачно");
		},
		cbFail : function() {						// коллбэк после неудачного выполнения
			//if (self._debug) $.w.console.log("Анимация [id: " + id + "] прошла неудачно");
		}
	}
	// заносим в массив, что будем выполнять
	var instructions = [];
	for (var key in props) {
		if (!props.hasOwnProperty(key)) continue;
		instructions.push([key, props[key]]);
	}
	// если выполнять нечего, выдаём ошибку
	if (instructions.length === 0) {
		doFail("Не сказано, что делать с элементом");
		return;
	}
	// перезаписываем опции клиентскими значениями
	var optionsList = [],
		easing = {linear: 1, swing:1, quad:1, cubic:1};
	for (var key in opts) {
		if (!opts.hasOwnProperty(key)) continue;
		switch (key) {
			case "duration":
 				if (typeof opts[key] != "number") {
					$.w.console.log("ltAnimate(): Внимание! Длительность анимации задаётся числом. Будет применена стандартная длительность");
					continue;
 				}
 				break;
			case "easing":
 				if (typeof easing[opts[key]] == "undefined") {
					$.w.console.log("ltAnimate(): Внимание! Неизвестное значение easing. Будет применена стандартная функция");
					continue;
 				}
				break;
			case "cbDone":
			case "cbFail":
				if (typeof opts[key] != "function") {
					$.w.console.log("ltAnimate(): Внимание! Коллбэк должен быть функцией!");
					continue;
				}
				break;
			default:
				$.w.console.log("ltAnimate(): Внимание! Неизвестный параметр в списке опций!");
				continue;
		}
		optionsList.push([key, opts[key]])
	}

	// формируем options на основе defaultOptions
	var options = defaultOptions;
	if (optionsList.length) {
		for (var i=0; i < optionsList.length; i++) {
			if (optionsList[i][0] == 'duration') options.duration = optionsList[i][1];
			if (optionsList[i][0] == 'easing') options.easing = optionsList[i][1];
			if (optionsList[i][0] == 'cbDone') options.cbDone = optionsList[i][1];
			if (optionsList[i][0] == 'cbFail') options.cbFail = optionsList[i][1];
		}
	}

	// объект, куда будут записываться параметры элемента при старте анимации
	var startParams = {};

	// если вторая или более анимация на этом объекте
	if (el.ltAnimateQueue && el.ltAnimateQueue.length > 0) {

		// смотрим, через сколько её нужно будет попытаться выполнить (точно предугадать нельзя, т.к. несколько мс уходит на исполнение кода)
		var animateEnds = 1,
		 	timeNow = new Date().getTime();

		for (var i=0; i < el.ltAnimateQueue.length; i++) {
			if (i == 0) {
				animateEnds = el.ltAnimateQueue[i][1] - timeNow + el.ltAnimateQueue[i][0];
			} else {
				animateEnds += el.ltAnimateQueue[i][1];
			}
		}

		// заносим анимацию в очередь анимаций
		el.ltAnimateQueue.push([timeNow + animateEnds, options.duration]);

		// через посчитанное время смотрим, действительно ли все предыдущие анимации завершились и можно ли выполнять эту
		var thisTimeout = $.w.setTimeout(function(){
			checkAnimation();
		}, animateEnds);

		// массив таймаутов, которые поставлены для активации анимации, нужен при вызове ltAnimateStop
		if (!el.ltAnimateTimeouts) {
			el.ltAnimateTimeouts = [];
		}
		el.ltAnimateTimeouts.push(thisTimeout);

	// первая анимация на объекте
	} else {
		// создаём очередь выполнения анимаций, если первая анимация на элементе
		el.ltAnimateQueue = [[new Date().getTime(), options.duration]];
		startAnimation();
	}

 	// проверяем, действительно ли никакие анимации не выполняются и можно запускать эту
 	function checkAnimation() {
 		// если никаких анимаций не выполняется, то сразу запускаем
 		if (!el.ltAnimateIsDoing) {
 			startAnimation();
 		} else {
 			// периодически опрашиваем, действительно ли анимации закончились
 			function _check() {
 				if (!el.ltAnimateIsDoing) {
 					$.w.clearInterval(_checking);
 					startAnimation();
 				}
 			}
 			var _checking = $.w.setInterval(_check, 30);
 		}
 	}

 	// запуск анимации
	function startAnimation() {
		// флаг выполнения анимации
		el.ltAnimateIsDoing = true;

		// размеры элемента
		var startStyles = self.ltStyle(el);

		// запоминаем стартовые значения свойств элемента
		startParams.left = parseInt(startStyles.left);
		startParams.right = parseInt(startStyles.right);
		startParams.top = parseInt(startStyles.top) + 0.01;
		startParams.bottom = parseInt(startStyles.bottom) - 0.01;
		startParams.width = parseInt(startStyles.width);
		startParams.height = parseInt(startStyles.height);
		startParams.opacity = parseFloat(startStyles.opacity);
		startParams.marginTop = parseInt(startStyles.marginTop);
		startParams.marginBottom = parseInt(startStyles.marginBottom);
		startParams.marginLeft = parseInt(startStyles.marginLeft);
		startParams.marginRight = parseInt(startStyles.marginRight);
		startParams.parentWidth = parseInt(self.ltStyle(el.parentNode).width);
		startParams.parentHeight = parseInt(self.ltStyle(el.parentNode).height);

		// проверки и подстановки для Chrome и IE
		for (key in startParams) {
			if (key == 'left' && !startParams[key]) {
				 startParams.left = startParams.parentWidth - startParams.right - startParams.width || 0;
			}
			if (key == 'right' && !startParams[key]) {
				startParams.right = startParams.parentWidth - startParams.left - startParams.width || 0;
			}
			if (key == 'bottom' && !startParams[key]) {
				startParams.bottom = startParams.parentHeight - startParams.top - startParams.height || 0;
			}
			if (key == 'top' && !startParams[key]) {
				startParams.top = startParams.parentHeight - startParams.bottom - startParams.height || 0;
			}
		}
		// выполнение анимации
		el.currentAnimation = new doAnimation({
			element : el,
			delay : defaultOptions.delay
		});
	}

	// выполняем анимацию
	function doAnimation(params) {
		var element = params.element,
			self = this,
			stopInterval;	// таймер, применяемый при остановке анимации
		// количество итераций анимации
		var animationLength = options.duration / options.tick,
			counter = 0;
		// выполняемые функции
		var exec = [],
			percent = false;
		for (var i=0; i < instructions.length; i++) {
			// значение параметра
			var val = instructions[i][1].toString();
			// смотрим, задан ли параметр в процентах
			val.match(/\%/) ? percent = true : percent = false;
			val = parseFloat(val);
			var x;
			switch (instructions[i][0]) {
				case 'top' :
					x = function(factor, val, percent) {
						element.style.bottom = '';
						element.style.top = startParams.top - (startParams.top - (percent ? startParams.parentHeight * val / 100 : val))*factor + 'px';
					};
					break;
				case 'bottom' :
					x = function(factor, val, percent) {
						element.style.top = '';
						element.style.bottom = startParams.bottom - (startParams.bottom - (percent ? (startParams.parentHeight * val / 100) : val))*factor + 'px';
					};
					break;
			 	case 'left' :
					x = function(factor, val, percent) {
						element.style.right = '';
						element.style.left = startParams.left - (startParams.left - (percent ? (startParams.parentWidth * val / 100) : val))*factor + 'px';
					};
					break;
				case 'right' :
					x = function(factor, val, percent) {
						element.style.left = '';
						element.style.right = startParams.right - (startParams.right - (percent ? (startParams.parentWidth * val / 100) : val))*factor + 'px';
					};
					break;
				case 'width' :
					x = function(factor, val, percent) {
						element.style.width = startParams.width - (startParams.width - (percent ? (startParams.width * val / 100) : val))*factor + 'px';
					};
					break;
				case 'height' :
					x = function(factor, val, percent) {
						element.style.height = startParams.height - (startParams.height - (percent ? (startParams.height * val / 100) : val))*factor + 'px';
					};
					break;
				case 'opacity' :
					x = function(factor, val, percent) {
						// IE8
						if (!$.w.getComputedStyle) {
							element.style.filter = 'alpha(opacity=' + (startParams.opacity - (startParams.opacity - (percent ? (val / 100) : val))*factor) * 100 + ')';
						} else {
							element.style.opacity = startParams.opacity - (startParams.opacity - (percent ? (val / 100) : val))*factor;
						}
					}
					break;
				case 'marginTop' :
					x = function(factor, val, percent) {
						element.style.marginBottom = 'auto';
						element.style.marginTop = startParams.marginTop - (startParams.marginTop - (percent ? (startParams.height * val / 100) : val))*factor + 'px';
					};
					break;
				case 'marginBottom' :
					x = function(factor, val, percent) {
						element.style.marginTop = 'auto';
						element.style.marginBottom = startParams.marginBottom - (startParams.marginBottom - (percent ? (startParams.height * val / 100) : val))*factor + 'px';
					};
					break;
				case 'marginLeft' :
					x = function(factor, val, percent) {
						element.style.marginRight = 'auto';
						element.style.marginLeft = startParams.marginLeft - (startParams.marginLeft - (percent ? (startParams.width * val / 100) : val))*factor + 'px';
					};
					break;
				case 'marginRight' :
					x = function(factor, val, percent) {
						element.style.marginLeft = 'auto';
						element.style.marginRight = startParams.marginRight - (startParams.marginRight - (percent ? (startParams.width * val / 100) : val))*factor + 'px';
					}
					break;
				// если попытка анимировать неподдерживаемое свойство, просто ничего не делаем
				default : x = function(){};
			}
			// заносим выполняемые функции в массив
			exec.push([x, val, percent]);
		}

		var eLength = exec.length;

		// выполняем анимацию с заданным интервалом
		// номер интервала, который потом можно прервать в stopAnimation
		el.ltAnimateInterval = $.w.setInterval(function(){
			_animating();
		}, options.tick);

		// интерфейс остановки анимации
		el.stopAnimation = function(jumpToEnd, callback) {
			_animating(animationLength, jumpToEnd, callback);
			// очищаем таймауты очереди ожидания анимации
			if (el.ltAnimateTimeouts) {
				for (var i=0; i < el.ltAnimateTimeouts.length; i++) {
					$.w.clearTimeout(el.ltAnimateTimeouts[i])
				}
				el.ltAnimateTimeouts = [];
			}
		}

		// отрисовка
		function _animating(param, jumpToEnd, callback) {
			counter++;
			// переменная принимает значения от 0 до 1
			var progress = counter / animationLength;

			// выключаем анимацию при помощи stopAnimation
			if (param == animationLength) {
				$.w.clearInterval(el.ltAnimateInterval);
				// если нужно завершить в конечной точке
				if (jumpToEnd) _step(getProgress(1));
				// удаляем анимацию из очереди анимаций
				el.ltAnimateQueue.splice(0, 1);
				// выключаем флаг выполнения анимации
				el.ltAnimateIsDoing = false;
				// остановка, если явно не указано по поводу коллбэка
				if (!callback) {
					try {
						options.cbDone();
					} catch(e) {
						doFail(e);
					}
				} else {
					try {
						callback();
					} catch(e) {
						doFail(e);
					}
				}
				return false;
			}
			// выключаем анимацию, если пройдены все шаги
			if (progress > 1) {
				// делаем заключительный шаг, без него анимация чуть не доезжает до финальной точки (progress меняется дискретно, последнее значение 0.99...)
				_step(getProgress(1));
				$.w.clearInterval(el.ltAnimateInterval);
				// удаляем анимацию из очереди анимаций
				el.ltAnimateQueue.splice(0, 1);
				// выключаем флаг выполнения анимации
				el.ltAnimateIsDoing = false;
				try {
					options.cbDone();
				} catch(e) {
					doFail(e);
				}
				return false;
			}
			_step(getProgress(progress));
		}
		function _step(factor) {
			for (var i=0; i < eLength; i++) {
				var s = exec[i][0],
					val = exec[i][1],
					percent = exec[i][2];
					s(factor, val, percent);
			}
		}
		// переменная для счёта, согласно заданным при вызове параметрам
		function getProgress(p) {
			switch (options.easing) {
				case 'linear' : return p; break;
				case 'swing' : return 0.5 - Math.cos(p * Math.PI ) / 2; break
				case 'quad' : return Math.pow(p, 2); break;
				case 'cubic' : return Math.pow(p, 3); break;
				default : return p;
			}
		}

	}
	// обработка ошибок
	function doFail(text) {
		if (self._debug._enabled) {
			if ((typeof text != "string") || !text) text = "С анимацией [id: " + id + "] что-то не так.";
			$.w.console.log("ltAnimate(): Внимание! " + text);
		}
		if (opts.cbFail) {
			try {
				opts.cbFail();
			} catch (e) {
				$.w.console.log("ltAnimate(): Внимание! Ошибка выполнения коллбэка анимации [id: " + id + ", " + e.name + ": " + e.message + "]");
			}
		}
	}
};

/*
* Остановкка анимации: элемент, переход в конечную точку (true/false) и остановить ли выполнение коллбэка (true/false), два последних необязательно
*/
$.w.ltAnimateStop = function(el, jumpToEnd, callback) {
	// останавливаем анимацию элемента, если она уже есть
	if (!el.ltAnimateInterval) return false;
	el.stopAnimation(jumpToEnd, callback);
};


/**
* Получение всех стилей элемента (если подан только el) либо значения конкретного стиля (в styleName передаётся строка).
* opts - объект, свойство computed по умолчанию равно true. Если да, возвращает конечный стиль элемента, если false - инлайновый.
* Если элемент подан неявно (например, тег div) и при поиске выясняется, что подобных элементов на странице несколько, возвращается пустая строка.
* Для IE8 выполняется преобразование %, auto, thin/medium/thick в нормальный вид.
* Opacity для IE8 возвращается в нормальном виде (от 0 до 1)
*
* @param {DOM} el - обрабатываемый элемент
* @param {string} style - название стиля, значение которого нужно получить
* @param {Object} opts - дополнительные опции операции
*
* @returns {(number|string)} value - вычисленное значение
*/
$.w.ltStyle = function(el, styleName, opts) {
	if (!opts || typeof opts != 'object' || typeof opts.computed != 'boolean') opts = {computed : true};
	if (typeof el == 'string') el = this.ltElem(el);
	// если возвращается массив (NodeList), то возвращаем пустую строку
	if (!el || !el.nodeType || (el.nodeType != 1)) return '';
	var _style;
	// в IE8 вместо getComputedStyle есть currentStyle
	if (!$.w.getComputedStyle) {
		var __style = el.currentStyle,
			_style = {};
		for (var i in __style) {
			_style[i] = __style[i];
		}
		// стили, для которых в IE8 существуют родные стили: pixelLeft, pixelRight и так далее - их можно взять напрямую, не считая
		var pixel = {
			left: 1,
			right: 1,
			width: 1,
			height: 1,
			top: 1,
			bottom: 1
		};
		// для этих стилей используем хак http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
		var other = {
			paddingLeft: 1,
			paddingRight: 1,
			paddingTop: 1,
			paddingBottom: 1,
			marginLeft: 1,
			marginRight: 1,
			marginTop: 1,
			marginBottom: 1
		};
		var leftCopy = el.style.left;
		var runtimeLeftCopy = el.runtimeStyle.left;
		// для всех стилей сразу
		if (!styleName) {
			// толщина границ в IE8 приходит в виде прилагательных, приводим в нормальный вид
			for (c in _style) {
				if (!_style.hasOwnProperty(c)) continue;
				if (c.indexOf("border") !== 0) continue;
				switch (_style[c]) {
					case "thin":
						_style[c] = 2;
						break;
					case "medium":
						_style[c] = 4;
						break;
					case "thick":
						_style[c] = 6;
						break;
					default:
						_style[c] = 0;
				}
			}
			//pixel
			for (var key in pixel) {
				_style[key] = el.style["pixel" + key.charAt(0).toUpperCase() + key.replace(key.charAt(0), "")];
			}
			// вариант замены getComputedStyle для некоторых параметров
			for (var key in other) {
				el.runtimeStyle.left = el.currentStyle.left;
				el.style.left = _style[key];
				_style[key] = el.style.pixelLeft;
				el.style.left = leftCopy;
				el.runtimeStyle.left = runtimeLeftCopy;
			}
		// для одного выбранного стиля
		} else {
			if (_style[styleName]) {
				if (style.indexOf("border") === 0)
					switch (_style[styleName]) {
						case "thin":
							_style[styleName] = 2;
							break;
						case "medium":
							_style[styleName] = 4;
							break;
						case "thick":
							_style[styleName] = 6;
							break;
						default:
							_style[styleName] = 0;
					}
				} else {
					if (pixel[styleName]) {
						_style[styleName] = el.style["pixel" + key.charAt(0).toUpperCase() + key.replace(key.charAt(0), "")];
					} else {
						el.runtimeStyle.left = el.currentStyle.left;
						el.style.left = _style[styleName];
						_style[styleName] = el.style.pixelLeft;
						el.style.left = leftCopy;
						el.runtimeStyle.left = runtimeLeftCopy;
					}
				}
		}
		// костыль для opacity IE8
		if (_style.filter.match('alpha')) {
			_style.opacity = _style.filter.substr(14);
			_style.opacity = parseInt(_style.opacity.substring(0, _style.opacity.length - 1)) / 100;
		} else {
			_style.opacity = 1;
		}
	// нормальные браузеры
	} else {
		if (opts.computed) {
			_style = $.w.getComputedStyle(el, null);
		} else {
			_style = el.style.styleName;
		}
	}
	if (!styleName) {
		return _style || '';
	} else {
		return _style[styleName] || '';
	}
};

/*
var el1 = document.getElementById("left_panel");
var m_content = document.getElementsByClassName('main_content')[0];

el1.onclick = function(){
	$.w.ltAnimate(el1, {width: '50px'},150);
  $.w.ltAnimate(m_content,{width: '1240px'},150)
}
*/
