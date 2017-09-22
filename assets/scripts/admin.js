/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {

    $(function () {

        var $container = $('.awpp-settings-wrap ');
        var $trigger = $container.find('a#scan-page');
        var $loader = $container.find('.loader');
        var action = $trigger.attr('data-action');
        var ajaxUrl = $trigger.attr('data-ajaxurl');

        $trigger.on('click', function () {
            $loader.fadeIn();

            jQuery.ajax({
                url: ajaxUrl,
                type: 'POST',
                dataType: 'json',
                data: 'action=' + action
            }).done(function (data) {

                if (data['type'] === null || data['type'] !== 'success') {

                    /**
                     * error
                     */

                    var msg_content = data['message'];
                    if (msg_content === '' || msg_content === undefined) {
                        msg_content = 'Error';
                    }

                    alert(msg_content);
                } else {

                    console.log(data['add']);
                    $.each(data['add'], function (key, data) {
                        if (key !== 'styles' && key !== 'scripts') {
                            return true;
                        }
                        var $list = $('ul.files-list#' + key);
                        var $last = $list.find('li.no-items');
                        $.each(data, function (id, url) {
                            if ($list.find('li#' + id).length) {
                                return true;
                            }
                            $('<li id="' + id + '"><label title="' + url + '"><input type="checkbox" name="awpp-option[serverpush_files][' + key + '][' + id + ']"/> ' + id + '</label></li>').insertBefore($last);
                        });
                    });
                }

                $loader.fadeOut();
            });
        });
    });
})(jQuery);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {

    $(function () {

        var $container = $('.awpp-settings-wrap');
        var $loadCSS = $container.find('input#loadcss');
        var $ServerPush = $container.find('select#serverpush');

        $loadCSS.on('click', function () {
            var $ccss_container = $(this).next('.settings-critical-css-container');
            if ($(this).prop('checked')) {
                $ccss_container.slideDown();
            } else {
                $ccss_container.slideUp();
            }
        });

        $ServerPush.on('change', function () {
            var $htaccess_container = $(this).next('.settings-htaccess-push-container');
            if ($(this).val() === 'htaccess') {
                $htaccess_container.slideDown();
            } else {
                $htaccess_container.slideUp();
            }
        });
    });
})(jQuery);

/***/ })
/******/ ]);