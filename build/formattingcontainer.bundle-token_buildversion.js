webpackJsonp([5],{

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Rangeslider = __webpack_require__(775);

var _Rangeslider2 = _interopRequireDefault(_Rangeslider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Rangeslider2.default;

/***/ }),

/***/ 774:
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(1)),o=a(n(2)),u=a(n(3));function a(e){return e&&e.__esModule?e:{default:e}}var l=function(e){return r.default.createElement(u.default,{name:e.name,max:e.max,min:e.min,value:e.selectedOption,step:e.sliderStepValue,labels:e.sliderLabels,tooltip:e.tooltip,onChangeStart:e.onChangeStart,onChange:function(t){return e.onChange(e.name,t)},onChangeComplete:function(t){return e.onChangeComplete(e.name)}})};l.propTypes={max:o.default.number,min:o.default.number,selectedOption:o.default.number,sliderStepValue:o.default.number,sliderLabels:o.default.string,tooltip:o.default.bool,onChangeStart:o.default.func,onChange:o.default.func,onChangeComplete:o.default.func},l.defaultProps={onChangeStart:function(){},onChangeComplete:function(){}},t.default=l},function(e,t){e.exports=__webpack_require__(0)},function(e,t){e.exports=__webpack_require__(2)},function(e,t){e.exports=__webpack_require__(699)}]);

/***/ }),

/***/ 775:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(177);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resizeObserverPolyfill = __webpack_require__(257);

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _utils = __webpack_require__(776);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-debugger: "warn" */


/**
 * Predefined constants
 * @type {Object}
 */
var constants = {
  orientation: {
    horizontal: {
      dimension: 'width',
      direction: 'left',
      reverseDirection: 'right',
      coordinate: 'x'
    },
    vertical: {
      dimension: 'height',
      direction: 'top',
      reverseDirection: 'bottom',
      coordinate: 'y'
    }
  }
};

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props, context) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props, context));

    _this.handleFormat = function (value) {
      var format = _this.props.format;

      return format ? format(value) : value;
    };

    _this.handleUpdate = function () {
      if (!_this.slider) {
        // for shallow rendering
        return;
      }
      var orientation = _this.props.orientation;

      var dimension = (0, _utils.capitalize)(constants.orientation[orientation].dimension);
      var sliderPos = _this.slider['offset' + dimension];
      var handlePos = _this.handle['offset' + dimension];

      _this.setState({
        limit: sliderPos - handlePos,
        grab: handlePos / 2
      });
    };

    _this.handleStart = function (e) {
      var onChangeStart = _this.props.onChangeStart;

      document.addEventListener('mousemove', _this.handleDrag);
      document.addEventListener('mouseup', _this.handleEnd);
      _this.setState({
        active: true
      }, function () {
        onChangeStart && onChangeStart(e);
      });
    };

    _this.handleDrag = function (e) {
      e.stopPropagation();
      var onChange = _this.props.onChange;
      var _e$target = e.target,
          className = _e$target.className,
          classList = _e$target.classList,
          dataset = _e$target.dataset;

      if (!onChange || className === 'rangeslider__labels') return;

      var value = _this.position(e);

      if (classList && classList.contains('rangeslider__label-item') && dataset.value) {
        value = parseFloat(dataset.value);
      }

      onChange && onChange(value, e);
    };

    _this.handleEnd = function (e) {
      var onChangeComplete = _this.props.onChangeComplete;

      _this.setState({
        active: false
      }, function () {
        onChangeComplete && onChangeComplete(e);
      });
      document.removeEventListener('mousemove', _this.handleDrag);
      document.removeEventListener('mouseup', _this.handleEnd);
    };

    _this.handleKeyDown = function (e) {
      e.preventDefault();
      var keyCode = e.keyCode;
      var _this$props = _this.props,
          value = _this$props.value,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step,
          onChange = _this$props.onChange;

      var sliderValue = void 0;

      switch (keyCode) {
        case 38:
        case 39:
          sliderValue = value + step > max ? max : value + step;
          onChange && onChange(sliderValue, e);
          break;
        case 37:
        case 40:
          sliderValue = value - step < min ? min : value - step;
          onChange && onChange(sliderValue, e);
          break;
      }
    };

    _this.getPositionFromValue = function (value) {
      var limit = _this.state.limit;
      var _this$props2 = _this.props,
          min = _this$props2.min,
          max = _this$props2.max;

      var diffMaxMin = max - min;
      var diffValMin = value - min;
      var percentage = diffValMin / diffMaxMin;
      var pos = Math.round(percentage * limit);

      return pos;
    };

    _this.getValueFromPosition = function (pos) {
      var limit = _this.state.limit;
      var _this$props3 = _this.props,
          orientation = _this$props3.orientation,
          min = _this$props3.min,
          max = _this$props3.max,
          step = _this$props3.step;

      var percentage = (0, _utils.clamp)(pos, 0, limit) / (limit || 1);
      var baseVal = step * Math.round(percentage * (max - min) / step);
      var value = orientation === 'horizontal' ? baseVal + min : max - baseVal;

      return (0, _utils.clamp)(value, min, max);
    };

    _this.position = function (e) {
      var grab = _this.state.grab;
      var _this$props4 = _this.props,
          orientation = _this$props4.orientation,
          reverse = _this$props4.reverse;


      var node = _this.slider;
      var coordinateStyle = constants.orientation[orientation].coordinate;
      var directionStyle = reverse ? constants.orientation[orientation].reverseDirection : constants.orientation[orientation].direction;
      var clientCoordinateStyle = 'client' + (0, _utils.capitalize)(coordinateStyle);
      var coordinate = !e.touches ? e[clientCoordinateStyle] : e.touches[0][clientCoordinateStyle];
      var direction = node.getBoundingClientRect()[directionStyle];
      var pos = reverse ? direction - coordinate - grab : coordinate - direction - grab;
      var value = _this.getValueFromPosition(pos);

      return value;
    };

    _this.coordinates = function (pos) {
      var _this$state = _this.state,
          limit = _this$state.limit,
          grab = _this$state.grab;
      var orientation = _this.props.orientation;

      var value = _this.getValueFromPosition(pos);
      var position = _this.getPositionFromValue(value);
      var handlePos = orientation === 'horizontal' ? position + grab : position;
      var fillPos = orientation === 'horizontal' ? handlePos : limit - handlePos;

      return {
        fill: fillPos,
        handle: handlePos,
        label: handlePos
      };
    };

    _this.renderLabels = function (labels) {
      return _react2.default.createElement(
        'ul',
        {
          ref: function ref(sl) {
            _this.labels = sl;
          },
          className: (0, _classnames2.default)('rangeslider__labels')
        },
        labels
      );
    };

    _this.state = {
      active: false,
      limit: 0,
      grab: 0
    };
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleUpdate();
      var resizeObserver = new _resizeObserverPolyfill2.default(this.handleUpdate);
      resizeObserver.observe(this.slider);
    }

    /**
     * Format label/tooltip value
     * @param  {Number} - value
     * @return {Formatted Number}
     */


    /**
     * Update slider state on change
     * @return {void}
     */


    /**
     * Attach event listeners to mousemove/mouseup events
     * @return {void}
     */


    /**
     * Handle drag/mousemove event
     * @param  {Object} e - Event object
     * @return {void}
     */


    /**
     * Detach event listeners to mousemove/mouseup events
     * @return {void}
     */


    /**
     * Support for key events on the slider handle
     * @param  {Object} e - Event object
     * @return {void}
     */


    /**
     * Calculate position of slider based on its value
     * @param  {number} value - Current value of slider
     * @return {position} pos - Calculated position of slider based on value
     */


    /**
     * Translate position of slider to slider value
     * @param  {number} pos - Current position/coordinates of slider
     * @return {number} value - Slider value
     */


    /**
     * Calculate position of slider based on value
     * @param  {Object} e - Event object
     * @return {number} value - Slider value
     */


    /**
     * Grab coordinates of slider
     * @param  {Object} pos - Position object
     * @return {Object} - Slider fill/handle coordinates
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          orientation = _props.orientation,
          className = _props.className,
          tooltip = _props.tooltip,
          reverse = _props.reverse,
          labels = _props.labels,
          min = _props.min,
          max = _props.max,
          handleLabel = _props.handleLabel;
      var active = this.state.active;

      var dimension = constants.orientation[orientation].dimension;
      var direction = reverse ? constants.orientation[orientation].reverseDirection : constants.orientation[orientation].direction;
      var position = this.getPositionFromValue(value);
      var coords = this.coordinates(position);
      var fillStyle = _defineProperty({}, dimension, coords.fill + 'px');
      var handleStyle = _defineProperty({}, direction, coords.handle + 'px');
      var showTooltip = tooltip && active;

      var labelItems = [];
      var labelKeys = Object.keys(labels);

      if (labelKeys.length > 0) {
        labelKeys = labelKeys.sort(function (a, b) {
          return reverse ? a - b : b - a;
        });

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = labelKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var labelPosition = this.getPositionFromValue(key);
            var labelCoords = this.coordinates(labelPosition);
            var labelStyle = _defineProperty({}, direction, labelCoords.label + 'px');

            labelItems.push(_react2.default.createElement(
              'li',
              {
                key: key,
                className: (0, _classnames2.default)('rangeslider__label-item'),
                'data-value': key,
                onMouseDown: this.handleDrag,
                onTouchStart: this.handleStart,
                onTouchEnd: this.handleEnd,
                style: labelStyle
              },
              this.props.labels[key]
            ));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(s) {
            _this2.slider = s;
          },
          className: (0, _classnames2.default)('rangeslider', 'rangeslider-' + orientation, { 'rangeslider-reverse': reverse }, className),
          onMouseDown: this.handleDrag,
          onMouseUp: this.handleEnd,
          onTouchStart: this.handleStart,
          onTouchEnd: this.handleEnd,
          'aria-valuemin': min,
          'aria-valuemax': max,
          'aria-valuenow': value,
          'aria-orientation': orientation
        },
        _react2.default.createElement('div', { className: 'rangeslider__fill', style: fillStyle }),
        _react2.default.createElement(
          'div',
          {
            ref: function ref(sh) {
              _this2.handle = sh;
            },
            className: 'rangeslider__handle',
            onMouseDown: this.handleStart,
            onTouchMove: this.handleDrag,
            onTouchEnd: this.handleEnd,
            onKeyDown: this.handleKeyDown,
            style: handleStyle,
            tabIndex: 0
          },
          showTooltip ? _react2.default.createElement(
            'div',
            {
              ref: function ref(st) {
                _this2.tooltip = st;
              },
              className: 'rangeslider__handle-tooltip'
            },
            _react2.default.createElement(
              'span',
              null,
              this.handleFormat(value)
            )
          ) : null,
          _react2.default.createElement(
            'div',
            { className: 'rangeslider__handle-label' },
            handleLabel
          )
        ),
        labels ? this.renderLabels(labelItems) : null
      );
    }
  }]);

  return Slider;
}(_react.Component);

Slider.propTypes = {
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  step: _propTypes2.default.number,
  value: _propTypes2.default.number,
  orientation: _propTypes2.default.string,
  tooltip: _propTypes2.default.bool,
  reverse: _propTypes2.default.bool,
  labels: _propTypes2.default.object,
  handleLabel: _propTypes2.default.string,
  format: _propTypes2.default.func,
  onChangeStart: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onChangeComplete: _propTypes2.default.func
};
Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  orientation: 'horizontal',
  tooltip: true,
  reverse: false,
  labels: {},
  handleLabel: ''
};
exports.default = Slider;

/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
exports.clamp = clamp;
/**
 * Capitalize first letter of string
 * @private
 * @param  {string} - String
 * @return {string} - String with first letter capitalized
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

/**
 * Clamp position between a range
 * @param  {number} - Value to be clamped
 * @param  {number} - Minimum value in range
 * @param  {number} - Maximum value in range
 * @return {number} - Clamped value
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _helper = __webpack_require__(7);

var _typeCodes = __webpack_require__(6);

var typeCd = _interopRequireWildcard(_typeCodes);

var _FormattingView = __webpack_require__(795);

var _FormattingView2 = _interopRequireDefault(_FormattingView);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var FormattingContainer = function (_Component) {
  _inherits(FormattingContainer, _Component);

  function FormattingContainer(props, context) {
    _classCallCheck(this, FormattingContainer);

    var _this = _possibleConstructorReturn(this, (FormattingContainer.__proto__ || Object.getPrototypeOf(FormattingContainer)).call(this, props, context));

    _this.getFontOptions = function () {
      var options = [];
      RDL.fonts && RDL.fonts.map(function (font) {
        options.push({ value: font, label: font });
      });
      return options;
    };

    _this.handleChange = function (key, value) {
      _this.updateStateStyles(key, value, false);
    };

    _this.handleChangeComplete = function (key) {
      _this.updateStateStyles(key, _this.state[key], true);
    };

    _this.updateStateStyles = function (styleTypeCD, styleValue) {
      var isUpdateInDB = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      _this.setState(_defineProperty({}, styleTypeCD, styleValue));
      var styles = _this.state.documentObj.docStyles;
      var style = styles.find(function (element) {
        return element.styleTypeCD == styleTypeCD;
      });
      style.value = styleValue;
      if (isUpdateInDB) {
        _this.props.updateDocStyle(styles);
        if (styleTypeCD == _helper.TypeCodes.styleTypeCD.fontFace) _this.setState({ currFont: styleValue });
      } else {
        var tempDoc = JSON.parse(JSON.stringify(_this.state.documentObj));
        tempDoc.docStyles = styles;
        _this.props.styleUpdate(tempDoc);
        _this.setState({ documentObj: tempDoc });
      }
    };

    _this.onFontHoverIn = function (e) {
      var hoveredFont = e.target && e.target.innerText;
      if (!hoveredFont) {
        return;
      }
      _this.updateStateStyles(_helper.TypeCodes.styleTypeCD.fontFace, hoveredFont, false);
    };

    _this.onFontHoverOut = function () {
      var currFont = FormattingContainer.getCurrentFont(_this.props.savedDocumentObj.docStyles);
      _this.updateStateStyles(_helper.TypeCodes.styleTypeCD.fontFace, currFont, false);
    };

    _this.onFontClick = function (event) {
      var _RDL$TrackEvents;

      _this.updateStateStyles(_helper.TypeCodes.styleTypeCD.fontFace, event.value, true);
      RDL.TrackEvents(typeCd.eventTypes.builderUsage, (_RDL$TrackEvents = {}, _defineProperty(_RDL$TrackEvents, typeCd.eventPropsKeys.builderType, typeCd.eventPropsValues.coverLetters), _defineProperty(_RDL$TrackEvents, typeCd.eventPropsKeys.action, typeCd.eventPropsValues.actions.clicked), _defineProperty(_RDL$TrackEvents, typeCd.eventPropsKeys.screenName, typeCd.eventPropsValues.coverLetterEditor), _defineProperty(_RDL$TrackEvents, typeCd.eventPropsKeys.clickOption, typeCd.eventPropsValues.clickOptions.font), _defineProperty(_RDL$TrackEvents, typeCd.eventPropsKeys.flowName, typeCd.eventPropsValues.coverLetterV2React), _RDL$TrackEvents), _this.props.userUid, _this.props.isLoggedIn.toString().toUpperCase());
    };

    _this.openConfirmationPopup = function () {
      _this.setState({ isOpenRestoreConfirmationModal: true });
    };

    _this.closeConfirmationPopup = function () {
      _this.setState({ isOpenRestoreConfirmationModal: false });
    };

    _this.isDefaultDocStyles = function () {
      var isDefault = true;
      _this.state.documentObj.docStyles.map(function (style) {
        if (style.styleTypeCD != _helper.TypeCodes.styleTypeCD.styleDocColor && style.value != _this.props.defaultStyleValues[style.styleTypeCD]) {
          isDefault = false;
          return;
        }
      });
      return isDefault;
    };

    _this.handleRestoreDefault = function () {
      _this.closeConfirmationPopup();
      if (window.RDL.isSetDocStylesFromSkin || window.RDL.blobSkinUrl) _this.props.setDocStylesFromSkin(_this.state.documentObj);else {
        _this.props.resetStyles().then(function (updatedDoc) {
          _this.setState({ currFont: FormattingContainer.getCurrentFont(updatedDoc.docStyles) });
        });
      }
    };

    _this.state = {
      sliders: _this.getSliders(),
      fontLabelOptions: _this.getFontOptions(),
      documentObj: JSON.parse(JSON.stringify(_this.props.documentObj)),
      currFont: FormattingContainer.getCurrentFont(_this.props.savedDocumentObj.docStyles)
    };
    return _this;
  }

  _createClass(FormattingContainer, [{
    key: 'getSliders',
    value: function getSliders() {
      var sliders = typeCd.styleSliders.filter(function (style) {
        return style.isFormattingEnabled == true;
      });
      return sliders;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_FormattingView2.default, {
        sliders: this.state.sliders,
        currFont: this.state.currFont,
        handleChange: this.handleChange,
        handleChangeComplete: this.handleChangeComplete,
        onFontClick: this.onFontClick,
        onFontHoverIn: this.onFontHoverIn,
        onFontHoverOut: this.onFontHoverOut,
        docStyles: this.state.documentObj.docStyles,
        openConfirmationPopup: this.openConfirmationPopup,
        isOpenRestoreConfirmationModal: this.state.isOpenRestoreConfirmationModal,
        handleRestoreDefault: this.handleRestoreDefault,
        closeConfirmationPopup: this.closeConfirmationPopup,
        fontLabelOptions: this.state.fontLabelOptions,
        updateDocStyleSuccess: this.props.updateDocStyleSuccess,
        updateDocStyle: this.props.updateDocStyle,
        isDefaultDocStyles: this.isDefaultDocStyles(),
        defaultStyleValues: this.props.defaultStyleValues
      });
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var state = {};
      state.documentObj = JSON.parse(JSON.stringify(nextProps.documentObj));
      state.currFont = FormattingContainer.getCurrentFont(nextProps.savedDocumentObj.docStyles);
      return state;
    }
  }]);

  return FormattingContainer;
}(_react.Component);

FormattingContainer.getCurrentFont = function (docStyles) {
  var fontStyleObj = docStyles && docStyles.find(function (styles) {
    return styles.styleTypeCD == _helper.TypeCodes.styleTypeCD.fontFace;
  });
  return fontStyleObj && fontStyleObj.value;
};

exports.default = FormattingContainer;

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormattingView;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _formatting = __webpack_require__(796);

var _formatting2 = _interopRequireDefault(_formatting);

var _popup = __webpack_require__(161);

var _popup2 = _interopRequireDefault(_popup);

var _options = __webpack_require__(698);

var _options2 = _interopRequireDefault(_options);

var _typeCodes = __webpack_require__(6);

var typeCd = _interopRequireWildcard(_typeCodes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormattingView(props) {
  return _react2.default.createElement(
    'section',
    { className: 'formatting-container', id: 'formatting-block' },
    _react2.default.createElement(_formatting2.default, {
      sliders: props.sliders,
      currentFont: props.currFont,
      handleChange: props.handleChange,
      handleChangeComplete: props.handleChangeComplete,
      docStyles: props.docStyles,
      onFontClick: props.onFontClick,
      onFontHoverIn: props.onFontHoverIn,
      onFontHoverOut: props.onFontHoverOut,
      fontLabelOptions: props.fontLabelOptions,
      productCD: RDL.PortalSettings.ConfigureProductCd,
      Localization: RDL.Localization,
      openConfirmationPopup: props.openConfirmationPopup,
      fontSelectCustomClass: 'select-fonts',
      options: _options2.default,
      updateDocStyleSuccess: props.updateDocStyleSuccess,
      updateDocStyle: props.updateDocStyle,
      isDefaultDocStyles: props.isDefaultDocStyles,
      defaultStyleValues: props.defaultStyleValues,
      colorPickingEnabled: RDL.colorPickingEnabled
    }),
    _react2.default.createElement(
      _popup2.default,
      {
        isOpen: props.isOpenRestoreConfirmationModal || false,
        title: window.RDL.Localization.lbl_pleaseConfirm,
        subTitle: "",
        btnPrimaryLabel: window.RDL.Localization.lbl_yes,
        btnSecondaryLabel: window.RDL.Localization.lbl_no,
        btnPrimaryId: 'confirm-btn-primary',
        btnSecondaryId: 'confirm-btn-secondary',
        onPrimaryClick: props.handleRestoreDefault,
        onSecondaryClick: props.closeConfirmationPopup,
        shouldCloseOnEsc: true,
        footerBtnSwap: true,
        modalVerticalCenter: true,
        modalHeaderId: 'modal-confirm-header',
        modalContentId: 'modal-confirm-content',
        cssClass: {
          modalDialog: "modal-confirm btn-primary-reduce",
          modalHeader: "",
          btnPrimary: "btn-primary",
          btnSecondary: "btn-secondary",
          modalFooter: "justify-content-between",
          overlayClassName: " modal-vertical-center modal-overlay onboarding-overlay"
        },
        popupDescription: typeCd.PopupDescriptionAriaAttr.ConfirmationModal
      },
      _react2.default.createElement(
        'div',
        { className: 'modal-body' },
        _react2.default.createElement(
          'p',
          { className: 'paragraph' },
          RDL.Localization.lbl_restoreDefaultConfirmation
        )
      )
    )
  );
}

/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(e){function t(n){if(a[n])return a[n].exports;var l=a[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,t),l.l=!0,l.exports}var a={};return t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=6)}([function(e,t){e.exports=__webpack_require__(0)},function(e,t){e.exports=__webpack_require__(797)},function(e,t,a){"use strict";function n(e){var t=e.Localization&&e.Localization.fonts?e.Localization.fonts:["Arial","Bodoni MT","Century Gothic","Courier New","Georgia","Palatino Linotype","Tahoma","Times New Roman","Trebuchet MS","Verdana","Source Sans Pro","Open Sans","Saira Semi Condensed","Fira Sans","PT Sans"],a=[];return t.forEach(function(e){a.push({value:e,label:e})}),a}function l(e){var t=[];t.push({value:0,label:"No Line"});for(var a=e.min;a<=e.max;a++)t.push({value:a,label:a.toString()});return t}function o(e,t){var a="";if(e.length>1){a=e.find(function(e){return e.styleTypeCD==t}).value}return a}function i(e){return{closePreviewTemplateRefine:e.closePreviewTemplateRefine,sliders:e.sliders,currentFont:e.currentFont,handleChange:e.handleChange,handleChangeComplete:e.handleChangeComplete,onFontClick:e.onFontClick,docStyles:e.docStyles,sliderprop:e.sliderprop,Localization:e.Localization,openConfirmationPopup:e.openConfirmationPopup,fontLabelOptions:e.fontLabelOptions,onFontHoverIn:e.onFontHoverIn,onFontHoverOut:e.onFontHoverOut,fontSelectCustomClass:e.fontSelectCustomClass||"",options:e.options,updateDocStyleSuccess:e.updateDocStyleSuccess,updateDocStyle:e.updateDocStyle,defaultStyleValues:e.defaultStyleValues,colorPickingEnabled:e.colorPickingEnabled,formattingControls:e.formattingControls,onSelectClick:e.onSelectClick,onSelectHoverIn:e.onSelectHoverIn,onSelectHoverOut:e.onSelectHoverOut,selectControlCustomClass:e.selectControlCustomClass||"",isDefaultDocStyles:e.isDefaultDocStyles,formattingContainerClass:e.formattingContainerClass,hideFormatting:e.hideFormatting,fontOptions:e.fontOptions,currentFontSize:e.currentFontSize,minFontSize:e.minFontSize,maxFontSize:e.maxFontSize,onFontSizeChange:e.onFontSizeChange,quickFormattingOptions:e.quickFormattingOptions,onQuickFormattingSelect:e.onQuickFormattingSelect,formatingRedesign:e.formatingRedesign,parentClass:e.parentClass,onRestoreClick:e.onRestoreClick,finalizeImprovementExp:e.finalizeImprovementExp,justifyOptions:e.justifyOptions,documentLevelAlignments:e.documentLevelAlignments,onSetDocumentAlignment:e.onSetDocumentAlignment,activeDocumentAlignment:e.activeDocumentAlignment,finalizeReDesign:e.finalizeReDesign,changePaperSize:e.changePaperSize,changePaperA4:e.changePaperA4,changePaperLetter:e.changePaperLetter,paperSize:e.paperSize,showPaperOptions:e.showPaperOptions,formatPlusMinusCounter:e.formatPlusMinusCounter,currLineWeight:e.currLineWeight,hideValidationError:e.hideValidationError,ariaLabelAttributeObject:e.ariaLabelAttributeObject}}Object.defineProperty(t,"__esModule",{value:!0}),t.getFormattingFonts=n,t.getFormattingLineWeight=l,t.getValue=o,t.getFormattingProps=i},function(e,t){e.exports=__webpack_require__(798)},function(e,t){e.exports=__webpack_require__(774)},function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=a(0),s=function(e){return e&&e.__esModule?e:{default:e}}(r),c=function(e){function t(e){n(this,t);var a=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.getColorValueFromDocStyles=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a.props.docStyles,t=e.find(function(e){return"SDCL"===e.styleTypeCD});return t&&t.value},a.getUpdatedDocStyles=function(e){return a.state.docStyles.find(function(e){return"SDCL"===e.styleTypeCD}).value=e,a.state.docStyles},a.handleColorClick=function(e){var t=e.currentTarget.getAttribute("data-clr");a.setState({selectedColor:t}),a.props.updateDocStyle(a.getUpdatedDocStyles(t))},a.handleColorHover=function(e){a.timeOutId&&clearInterval(a.timeOutId),a.props.updateDocStyleSuccess(a.getUpdatedDocStyles(e))},a.handleColorLeave=function(){a.state.selectedColor!==a.getColorValueFromDocStyles()&&(a.timeOutId=setTimeout(function(){a.props.updateDocStyleSuccess(a.getUpdatedDocStyles(a.state.selectedColor))},50))},a.state={docStyles:JSON.parse(JSON.stringify(a.props.docStyles)),selectedColor:a.getColorValueFromDocStyles(),defaultColor:a.props.defaultStyleValues.SDCL},a.timeOutId="",a}return o(t,e),i(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.defaultColor,n=t.selectedColor;return s.default.createElement(s.default.Fragment,null,s.default.createElement("label",null,this.props.Localization.lbl_chooseYourTheme),s.default.createElement("ul",{className:"theme-picker"},s.default.createElement("li",{"data-clr":a,title:"Default Theme",onClick:this.handleColorClick,className:n===a?"active":"",style:{borderColor:n==a?"#fff":""}},s.default.createElement("span",{className:"resetColor"})),this.props.options.ColorSelectorColors.map(function(t,a){return s.default.createElement("li",{"data-clr":t.value,key:a,title:t.key,onMouseEnter:function(){return e.handleColorHover(t.value)},onMouseLeave:e.handleColorLeave,onClick:e.handleColorClick,className:n===t.value?"active":"",style:{borderColor:n===t.value?n:""}},s.default.createElement("span",{style:{background:t.value}}))})))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var a=e.docStyles.find(function(e){return"SDCL"===e.styleTypeCD});if(a){var n={};return a.value!=t.selectedColor&&(n.docStyles=JSON.parse(JSON.stringify(e.docStyles)),a.value===t.defaultColor&&(n.selectedColor=a.value)),e.defaultStyleValues.SDCL!=t.defaultColor&&(n.defaultColor=e.defaultStyleValues.SDCL),n}return null}}]),t}(r.Component);t.default=c},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e){switch(e.productCD){case v.TypeCodes.productCD.CoverLetterBuilder:return e.isMobile?i.default.createElement(p.default,(0,h.getFormattingProps)(e)):i.default.createElement(u.default,(0,h.getFormattingProps)(e));case v.TypeCodes.productCD.MPCBuilder:return e.isMobile?i.default.createElement(C.default,(0,h.getFormattingProps)(e)):i.default.createElement(m.default,(0,h.getFormattingProps)(e));default:return i.default.createElement(s.default,(0,h.getFormattingProps)(e))}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var o=a(0),i=n(o),r=a(7),s=n(r),c=a(11),u=n(c),d=a(12),m=n(d),f=a(13),p=n(f),g=a(14),C=n(g),v=a(3),y=a(15),b=n(y),h=a(2);l.propTypes={docStyles:b.default.array}},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e){function t(e,t,a){m(function(n){return o({},n,{showError:!0,styleCd:e,min:t,max:a})});var n=document.querySelector("."+e+" input")&&document.querySelector("."+e+" input").getBoundingClientRect().left,l=document.querySelector("."+e+" input")&&document.querySelector("."+e+" input").getBoundingClientRect().top-17;b({left:n,top:l})}function a(){e.formatPlusMinusCounter&&u.showError&&m(function(e){return o({},e,{showError:!1,styleCd:"",min:0,max:0})})}var n=(0,r.useState)({showError:!1,styleCd:"",min:0,max:0}),l=i(n,2),u=l[0],m=l[1],g=(0,r.useState)({left:0,top:0}),v=i(g,2),y=v[0],b=v[1];(0,r.useEffect)(function(){e.hideValidationError&&m(function(e){return o({},e,{showError:!1})})},[e.hideValidationError]);var h=e.sliders.map(function(n,l){if(n.code==p.TypeCodes.styleTypeCD.fontFace)return s.default.createElement("li",{className:"form-inline slider-item sel-fonts",key:l,onClick:function(){return a()}},s.default.createElement("div",{className:"slider-title"},n.label),s.default.createElement(d.default,{name:"selectfonts",defaultValue:e.currentFont.value,newUI:!0,onChange:e.onFontClick,optionLabel:(0,c.getFormattingFonts)(e),customClass:"select-fonts",type:"fonts",Localization:e.Localization,isCreatableSelect:!0}));if(n.code==p.TypeCodes.styleTypeCD.pageSize)return"";if("LNWT"==n.code&&e.formatPlusMinusCounter)return s.default.createElement("li",{onClick:function(){return a()},className:"form-inline slider-item format-line-weight "+(n.sideIcon?" format-icon":"")+(n.disable?" disabled":""),key:l},s.default.createElement("div",{className:"slider-title"},n.label),s.default.createElement(d.default,{name:"selectlineweight",defaultValue:parseInt(e.currLineWeight.value),onChange:function(t){return e.onFontClick(t,"LNWT")},optionLabel:(0,c.getFormattingLineWeight)(n),customClass:"select-fonts",type:"lineweight",Localization:o({},e.Localization,{btnSel:"No Line"}),isCreatableSelect:!0}));var i=n.labelsNumber,r=e.formatPlusMinusCounter?(0,c.getValue)(e.docStyles,n.code):parseInt((0,c.getValue)(e.docStyles,n.code)),u=n.code!=p.TypeCodes.styleTypeCD.headingFontSize&&n.code!=p.TypeCodes.styleTypeCD.fontSize||e.finalizeImprovementExp?n.label:n.label+"<span class='slider-viewsize'>"+r+e.Localization.finalFormatsliderFontSize+"</span>";return e.formatPlusMinusCounter?s.default.createElement(C.default,{key:l,element:n,stylelabel:u,styleValue:r,handleChange:e.handleChange,handleChangeComplete:e.handleChangeComplete,showValidationError:t,hideValidationError:a}):s.default.createElement("li",{className:"form-inline slider-item"+(i?" has-label":"")+("PSPC"==n.code||"LNWT"==n.code?" slider-line-weight":""),key:n.code},s.default.createElement("div",{className:"slider-title "+e.sliderprop,dangerouslySetInnerHTML:{__html:u}}),s.default.createElement("div",{className:"slider-line "+e.sliderprop+" "+n.code},s.default.createElement(f.default,{name:n.code,min:parseInt(n.min),max:parseInt(n.max),step:parseInt(n.step),value:r,labels:i,onChange:function(t){return e.handleChange(n.code,t)},onChangeComplete:function(t){return e.handleChangeComplete(n.code,t)}})))});return s.default.createElement("div",{className:"container "+(e.parentClass?e.parentClass:"")},s.default.createElement("ul",{className:"formatting-row clearfix"},h),e.finalizeImprovementExp&&s.default.createElement("button",{className:"btn btn-secondary restore-btn",onClick:e.onRestoreClick},e.Localization.lbl_restoreDefault),e.finalizeReDesign&&s.default.createElement("div",{className:"pageSize-container"},s.default.createElement("label",{className:"pageSize-label"},e.Localization.paperSize_lbl),s.default.createElement("a",{href:"javascript:void(0);",className:"link paper-size",onClick:e.changePaperSize},s.default.createElement("span",null,"letter"==e.paperSize?e.Localization.letterSize_lbl:e.Localization.a4Size_lbl),s.default.createElement("i",{className:"icon-arrow-down"})),s.default.createElement("div",{className:"Select-menu-outer list-view"+(e.showPaperOptions?" slideInUp":" slideOutDown")},s.default.createElement("div",{className:"Select-menu"},s.default.createElement("div",{className:"Select-option",onClick:e.changePaperA4},e.Localization.a4Size_lbl),s.default.createElement("div",{className:"Select-option",onClick:e.changePaperLetter},e.Localization.letterSize_lbl)))),e.formatPlusMinusCounter&&u.showError&&s.default.createElement("div",{className:"invalid-tooltip popover bs-popover-bottom",role:"tooltip",style:{top:y.top,left:y.left}},s.default.createElement("div",{className:"arrow"}),s.default.createElement("div",{className:"popover-header"},s.default.createElement("h1",{className:"popover-heading"},e.Localization.tipPositionHeading),s.default.createElement("p",{className:"popover-subheading",dangerouslySetInnerHTML:{__html:e.Localization.tipPositionSubHeading.replace("{0}",u.min).replace("{1}",u.max)}}))))}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},i=function(){function e(e,t){var a=[],n=!0,l=!1,o=void 0;try{for(var i,r=e[Symbol.iterator]();!(n=(i=r.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){l=!0,o=e}finally{try{!n&&r.return&&r.return()}finally{if(l)throw o}}return a}return function(t,a){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=l;var r=a(0),s=n(r),c=a(2),u=a(1),d=n(u),m=a(8),f=n(m),p=a(3),g=a(9),C=n(g)},function(e,t){e.exports=__webpack_require__(699)},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e){function t(t){if(!(t&&f.value>=e.element.max||!t&&f.value<=e.element.min)){var a=t?f.value+1:f.value-1;p(function(e){return o({},e,{value:a,lastValidValue:a})}),e.handleChange(e.element.code,a,!0),e.hideValidationError()}}function a(e){var t=/^[0-9\b]+$/,a=e.target.value,n=!1;t.test(a)||(a=a.replace(/[^0-9]/g,""),n=!0),a=a&&parseInt(a),p(function(e){return o({},e,{value:a,updateComponentState:n})})}function n(){""===f.value||f.value>e.element.max||f.value<e.element.min?(p(function(e){return o({},e,{value:f.lastValidValue,updateComponentState:!0})}),e.showValidationError(e.element.code,e.element.min,e.element.max)):f.value!=f.lastValidValue&&(e.handleChange(e.element.code,f.value,!0),p(function(e){return o({},e,{lastValidValue:f.value})}),e.hideValidationError())}function l(){e.hideValidationError()}function c(e){13===e.keyCode&&(e.preventDefault(),e.stopPropagation(),e.target.blur())}var d=(0,r.useState)({value:""==e.styleValue?"":parseInt(e.styleValue),lastValidValue:parseInt(e.styleValue),updateComponentState:!1}),m=i(d,2),f=m[0],p=m[1];return s.default.useEffect(function(){parseInt(e.styleValue)!=f.value&&p({value:""==e.styleValue?"":parseInt(e.styleValue),lastValidValue:parseInt(e.styleValue),updateComponentState:!1})},[e.styleValue]),s.default.createElement("li",{className:"form-inline slider-item "+(e.element.code?"format-"+e.element.code:"")+(e.element.sideIcon?" format-icon":"")+(e.element.disable?" disabled":"")+(f.showError?" is-error":""),key:e.element.code},s.default.createElement("div",{className:"slider-title",dangerouslySetInnerHTML:{__html:e.stylelabel}}),s.default.createElement("div",{className:"format-box-form "+e.element.code},s.default.createElement(u.default,{updateComponentState:f.updateComponentState,inputType:{labelName:"",name:e.element.label,value:f.value.toString(),placeholderLabel:e.element.label,maxLength:e.element.maxLength},onChange:a,onBlur:n,onFocus:l,onKeyDown:c,isDisabledTextbox:e.element.disable}),s.default.createElement("button",{type:"button",onClick:function(){return t()},className:"btn btn-icon counter-button-minus"+(e.element.disable||f.value<=e.element.min?" disabled":"")},s.default.createElement("i",{className:"icon icon-minus"})),s.default.createElement("button",{type:"button",onClick:function(){return t(!0)},className:"btn btn-icon counter-button-plus"+(e.element.disable||""==f.value.toString()||f.value>=e.element.max?" disabled":"")},s.default.createElement("i",{className:"icon icon-plus"}))))}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},i=function(){function e(e,t){var a=[],n=!0,l=!1,o=void 0;try{for(var i,r=e[Symbol.iterator]();!(n=(i=r.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){l=!0,o=e}finally{try{!n&&r.return&&r.return()}finally{if(l)throw o}}return a}return function(t,a){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=l;var r=a(0),s=n(r),c=a(10),u=n(c)},function(e,t){e.exports=__webpack_require__(801)},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e){var t=e.sliders.map(function(t){if(t.code==m.TypeCodes.styleTypeCD.fontFace)return i.default.createElement("div",{className:"sel-fonts",key:t.code,onMouseLeave:e.onFontHoverOut},i.default.createElement(c.default,{name:"selectfonts",defaultValue:e.currentFont,newUI:!0,onChange:e.onFontClick,optionLabel:e.fontLabelOptions,customClass:e.fontSelectCustomClass,type:"fonts",onMouseEnter:e.onFontHoverIn,key:t.code,isSearchable:!1,Localization:e.Localization}));if(t.code==m.TypeCodes.styleTypeCD.pageSize)return"";var a=t.labelsNumber,n=parseInt((0,r.getValue)(e.docStyles,t.code));return i.default.createElement("div",{className:"form-group",key:t.code},i.default.createElement("label",{className:"slider-text"},e.Localization["lbl_"+t.code+"font"]),i.default.createElement("div",{className:"rangeslider"},i.default.createElement("div",{className:"slider "+t.code},i.default.createElement(d.default,{name:t.code,min:parseInt(t.min),max:parseInt(t.max),sliderStepValue:parseInt(t.step),selectedOption:n,sliderLabels:a,onChange:e.handleChange,onChangeComplete:e.handleChangeComplete,key:t.code}))))});return i.default.createElement(o.Fragment,null,i.default.createElement("h2",{className:"sidebar-heading"},e.Localization.lbl_Formatting),i.default.createElement("div",{className:"format-wrap left-side-scrollbar"},i.default.createElement("div",{className:"format-panel",id:"format-panel-block"},e.colorPickingEnabled&&i.default.createElement(p.default,{docStyles:e.docStyles,updateDocStyle:e.updateDocStyle,defaultStyleValues:e.defaultStyleValues,updateDocStyleSuccess:e.updateDocStyleSuccess,options:e.options,Localization:e.Localization}),i.default.createElement("label",{className:"slider-text"},e.Localization.lbl_Font),t,i.default.createElement("button",{className:"btn btn-link",id:"btn-restore",disabled:e.isDefaultDocStyles,onClick:e.openConfirmationPopup},e.Localization.lbl_restoreDefault))))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var o=a(0),i=n(o),r=a(2),s=a(1),c=n(s),u=a(4),d=n(u),m=a(3),f=a(5),p=n(f)},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e){var t=e.formatingRedesign,a=e.formattingControls.map(function(a){if(!a.isSelectControl){var n=a.labelsNumber,l=parseInt((0,r.getValue)(e.docStyles,a.code));return t?i.default.createElement("div",{className:"form-inline slider-item",key:a.code},i.default.createElement("div",{className:"slider-title"},e.Localization["lbl_"+a.code+"font"]),i.default.createElement("div",{className:"slider-line",id:a.code},i.default.createElement(d.default,{name:a.code,min:parseInt(a.min),max:parseInt(a.max),sliderStepValue:parseInt(a.step),selectedOption:l,sliderLabels:n,onChange:e.handleChange,onChangeComplete:e.handleChangeComplete,key:a.code}))):i.default.createElement("div",{className:"form-group",key:a.code},i.default.createElement("label",{className:"slider-text"},e.Localization["lbl_"+a.code+"font"]),i.default.createElement("div",{className:"rangeslider"},i.default.createElement("div",{className:"slider "+a.code,id:a.code},i.default.createElement(d.default,{name:a.code,min:parseInt(a.min),max:parseInt(a.max),sliderStepValue:parseInt(a.step),selectedOption:l,sliderLabels:n,onChange:e.handleChange,onChangeComplete:e.handleChangeComplete,key:a.code}))))}}),n=e.formattingControls.map(function(t){if(t.isSelectControl)return i.default.createElement("div",{className:"select-box-wrapper select-"+t.code,key:t.code},i.default.createElement(c.default,{name:"selectfonts",defaultValue:t.selectedVal,newUI:!0,onChange:function(a){e.onSelectClick(a,t.code)},optionLabel:t.options,customClass:e.selectControlCustomClass,type:t.type,onMouseEnter:function(a){e.onSelectHoverIn(a,t.code)},onMouseLeave:function(){e.onSelectHoverOut(t.code)},key:t.code,isSearchable:!1,Localization:e.Localization,labelName:t.labelName}))});return t?i.default.createElement("div",{className:"formating-container"},i.default.createElement("div",{className:"form-inline-group clearfix"},i.default.createElement("div",{className:"form-inline slider-item sel-fonts"},i.default.createElement("div",{className:"slider-title"},e.Localization.lbl_FontFontSize),i.default.createElement("div",{className:"slider-line"},n)),a)):i.default.createElement("div",{className:"format-wrap left-side-scrollbar"},i.default.createElement("div",{className:"format-panel"},e.colorPickingEnabled&&i.default.createElement(p.default,{docStyles:e.docStyles,updateDocStyle:e.updateDocStyle,defaultStyleValues:e.defaultStyleValues,updateDocStyleSuccess:e.updateDocStyleSuccess,options:e.options,Localization:e.Localization}),i.default.createElement("div",{className:"font-container"},n),e.justifyOptions&&e.documentLevelAlignments&&e.documentLevelAlignments.length>0&&function(){return i.default.createElement("div",{className:"form-group f-align-formate"},i.default.createElement("label",{className:"control-label"},e.Localization.lbl_textAlignment),i.default.createElement("span",{className:"f-align-action"},m.DocumentHelper.isAlignmentAvailableInFormattingPanel(e.documentLevelAlignments,m.TypeCodes.AlignmentType.LEFT)&&i.default.createElement("a",{href:"javascript:void(0)",className:"f-align-control"+(e.activeDocumentAlignment==m.TypeCodes.AlignmentType.LEFT?" active":""),id:"f-l-align",title:e.Localization.lbl_leftAlignment,onClick:function(t){e.onSetDocumentAlignment(t,m.TypeCodes.AlignmentType.LEFT)}},i.default.createElement("i",{className:"icon-align-left"})),m.DocumentHelper.isAlignmentAvailableInFormattingPanel(e.documentLevelAlignments,m.TypeCodes.AlignmentType.CENTER)&&i.default.createElement("a",{href:"javascript:void(0)",className:"f-align-control"+(e.activeDocumentAlignment==m.TypeCodes.AlignmentType.CENTER?" active":""),id:"f-c-align",title:e.Localization.lbl_centerAlignment,onClick:function(t){e.onSetDocumentAlignment(t,m.TypeCodes.AlignmentType.CENTER)}},i.default.createElement("i",{className:"icon-align-center"})),m.DocumentHelper.isAlignmentAvailableInFormattingPanel(e.documentLevelAlignments,m.TypeCodes.AlignmentType.RIGHT)&&i.default.createElement("a",{href:"javascript:void(0)",className:"f-align-control"+(e.activeDocumentAlignment==m.TypeCodes.AlignmentType.RIGHT?" active":""),id:"f-r-align",title:e.Localization.lbl_rightAlignment,onClick:function(t){e.onSetDocumentAlignment(t,m.TypeCodes.AlignmentType.RIGHT)}},i.default.createElement("i",{className:"icon-align-right"})),m.DocumentHelper.isAlignmentAvailableInFormattingPanel(e.documentLevelAlignments,m.TypeCodes.AlignmentType.JUSTIFY)&&i.default.createElement("a",{href:"javascript:void(0)",className:"f-align-control"+(e.activeDocumentAlignment==m.TypeCodes.AlignmentType.JUSTIFY?" active":""),id:"f-j-align",title:e.Localization.lbl_justifyAlignment,onClick:function(t){e.onSetDocumentAlignment(t,m.TypeCodes.AlignmentType.JUSTIFY)}},i.default.createElement("i",{className:"icon-align-justify"}))))}(),a,i.default.createElement("div",{className:"restore-defaults"},i.default.createElement("button",{type:"button",className:"restore-defaults-link",disabled:!!e.isDefaultDocStyles,onClick:e.openConfirmationPopup},e.Localization.lbl_restoreDefault))))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var o=a(0),i=n(o),r=a(2),s=a(1),c=n(s),u=a(4),d=n(u),m=a(3),f=a(5),p=n(f)},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e){var t=parseInt(e.currentFontSize);return i.default.createElement("section",{className:"formatting-container animated "+e.formattingContainerClass},i.default.createElement("h6",{className:"format-template-heading"},e.Localization.lbl_format_letter),i.default.createElement("span",{className:"format-template-hading-close",onClick:e.hideFormatting}),i.default.createElement("h6",{className:"formatting-sub-heading"},e.Localization.lbl_quick_formatting),i.default.createElement("div",{className:"quick-formatting"},function(){return e.quickFormattingOptions.map(function(t,a){return i.default.createElement("span",{key:a,className:t.defaultClassName+(t.className||""),onClick:function(){e.onQuickFormattingSelect(t.id)}},t.label)})}()),i.default.createElement("h6",{className:"formatting-sub-heading"},e.Localization.lbl_Font),i.default.createElement(s.default,{name:"selectfonts",defaultValue:e.currentFont,newUI:!0,onChange:e.onFontClick,optionLabel:e.fontOptions,customClass:e.selectControlCustomClass,isSearchable:!1,Localization:e.Localization}),i.default.createElement("h6",{className:"formatting-sub-heading"},e.Localization.lbl_FTSZfont),i.default.createElement("div",{className:"font-restore-wrapper clearfix"},i.default.createElement("div",{className:"font-size-wrapper clearfix"},i.default.createElement("button",{disabled:t==e.minFontSize,className:"btn font-size-minus",onClick:function(){e.onFontSizeChange(t-1)}}),i.default.createElement("span",{className:"font-size-value"},t),i.default.createElement("button",{disabled:t==e.maxFontSize,className:"btn font-size-plus",onClick:function(){e.onFontSizeChange(t+1)}})),i.default.createElement("p",{className:"restore-defaults"},i.default.createElement("button",{className:"btn-link",disabled:!!e.isDefaultDocStyles,onClick:e.openConfirmationPopup},e.Localization.lbl_setToDefaults))))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var o=a(0),i=n(o),r=a(1),s=n(r)},function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e){var t=parseInt(e.currentFontSize);return i.default.createElement("section",{className:"formatting-container animated "+e.formattingContainerClass},i.default.createElement("h6",{className:"format-template-hading clearfix"},e.Localization.lbl_format_letter,i.default.createElement("span",{className:"format-template-hading-close",onClick:e.hideFormatting},e.Localization.lbl_close)),i.default.createElement("h6",{className:"formatting-sub-heading"},e.Localization.lbl_quick_formatting),i.default.createElement("div",{className:"quick-formatting"},function(){return e.quickFormattingOptions.map(function(t,a){return i.default.createElement("span",{key:a,className:"quick-formatting-options "+(t.className||""),onClick:function(){e.onQuickFormattingSelect(t.id)}},t.label)})}()),i.default.createElement("div",{className:"formatting-font-wrapper clearfix"},i.default.createElement("div",{className:"formatting-font"},i.default.createElement("h6",{className:"formatting-sub-heading"},e.Localization.lbl_Font),i.default.createElement(s.default,{name:"selectfonts",defaultValue:e.currentFont,newUI:!0,onChange:e.onFontClick,optionLabel:e.fontOptions,customClass:e.selectControlCustomClass,isSearchable:!1,Localization:e.Localization})),i.default.createElement("div",{className:"formatting-font-size"},i.default.createElement("h6",{className:"formatting-sub-heading"},e.Localization.lbl_FTSZfont),i.default.createElement("div",{className:"font-size-wrapper clearfix"},i.default.createElement("button",{"aria-label":e.ariaLabelAttributeObject.btnMinus,disabled:t==e.minFontSize,className:"btn font-size-minus",onClick:function(){e.onFontSizeChange(t-1)}}),i.default.createElement("span",{className:"font-size-value"},t),i.default.createElement("button",{"aria-label":e.ariaLabelAttributeObject.btnPlus,disabled:t==e.maxFontSize,className:"btn font-size-plus",onClick:function(){e.onFontSizeChange(t+1)}})))),i.default.createElement("p",{className:"restore-defaults"},i.default.createElement("button",{className:"btn-link",disabled:!!e.isDefaultDocStyles,onClick:e.openConfirmationPopup},e.Localization.lbl_restoreDefault)))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var o=a(0),i=n(o),r=a(1),s=n(r)},function(e,t){e.exports=__webpack_require__(2)}]);

/***/ }),

/***/ 797:
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(e){var t={};function o(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=3)}([function(e,t){e.exports=__webpack_require__(0)},function(e,t){e.exports=__webpack_require__(2)},function(e,t){e.exports=__webpack_require__(196)},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},a=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var o=[],n=!0,a=!1,r=void 0;try{for(var l,s=e[Symbol.iterator]();!(n=(l=s.next()).done)&&(o.push(l.value),!t||o.length!==t);n=!0);}catch(e){a=!0,r=e}finally{try{!n&&s.return&&s.return()}finally{if(a)throw r}}return o}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),r=o(0),l=c(r),s=c(o(1)),u=o(2),i=c(o(4));function c(e){return e&&e.__esModule?e:{default:e}}var p=function(e){var t=e.showError?e.showError:!(!e.data||!e.data.showError)&&e.data.showError,o=(0,r.useState)(t),s=a(o,2),c=s[0],p=s[1];(0,r.useEffect)(function(){var t=e.showError?e.showError:!(!e.data||!e.data.showError)&&e.data.showError;p(t)},[e.showError]);return l.default.createElement(r.Fragment,null,e.isCreatableSelect?l.default.createElement(i.default,{name:"selectfonts",defaultValue:e.defaultValue,newUI:!0,onChange:e.onChange,optionLabel:e.optionLabel,customClass:"select-fonts",type:"fonts",localization:e.Localization}):l.default.createElement("div",{className:"form-group "+(e.customClass?""+e.customClass:"")+(c?" haserror":"")},e.labelName&&l.default.createElement("label",{className:"control-label"},e.labelName),l.default.createElement(u.Creatable,{className:1==e.hidden?"d-none":"",name:e.name,options:function(){if(e.optionLabel)return e.optionLabel;for(var t=[],o=0;o<e.options.length;o++){var n={name:e.name,value:e.options[o].value?e.options[o].value:e.options[o],label:e.options[o].label?e.options[o].label:e.options[o],className:e.options[o].className||""};t.push(n)}return t}(),disabled:e.isDisabled,onChange:function(t){e.onChangeProps?e.onChange(t,n({},e.onChangeProps)):e.onChange(t)},value:e.defaultValue?e.defaultValue:null,searchable:e.isSearchable,clearable:!1,placeholder:e.placeHolder?e.placeHolder:e.Localization.lbl_select,onOpen:function(){var t=document.getElementsByClassName("is-focused")[1];t&&t.classList.remove("is-focused"),"fonts"==e.type&&document.querySelectorAll(".Select-menu-outer .Select-option").forEach(function(t){t.addEventListener("mouseenter",e.onMouseEnter),t.addEventListener("mouseleave",e.onMouseLeave)});e.onOpen&&e.onOpen()},noResultsText:"","aria-label":e.ariaLabel,scrollMenuIntoView:e.scrollMenuIntoView}),l.default.createElement("span",{className:"error-message"},e.errorMessage)))};p.propTypes={labelName:s.default.string,customClass:s.default.string,optionLabel:s.default.array,options:s.default.array,onChange:s.default.func.isRequired,name:s.default.string.isRequired,errorMessage:s.default.string,defaultValue:s.default.string,isDisabled:s.default.bool,placeHolder:s.default.string,isSearchable:s.default.bool,hidden:s.default.bool},t.default=p},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),a=o(0),r=u(a),l=u(o(1)),s=u(o(2));function u(e){return e&&e.__esModule?e:{default:e}}var i=function(e){function t(e,o){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,o));return n.dropDownValues=function(){if(n.props.optionLabel)return n.props.optionLabel;for(var e=[],t=0;t<n.props.options.length;t++){var o={name:n.props.name,value:n.props.options[t],label:n.props.options[t]};e.push(o)}return e},n.onFocus=function(){n.onBlur()},n.onBlur=function(){n.props.localization.isTablet&&$(".Select-input input").blur()},n.onClick=function(e){n.props.onClick&&n.props.onClick(n.props.name)},n.onChange=function(e){e&&(n.setState({value:e.value}),n.onMouseLeave(),n.props.onChange(e),n.setFontFamily())},n.onMouseEnter=function(e){var t=e.target.innerText,o=document.querySelector("#document");o&&(o.style.fontFamily=t)},n.onMouseLeave=function(e){var t=document.querySelector("#document");t&&(t.style.fontFamily="")},n.onOpen=function(e){"fonts"==n.props.type&&document.querySelectorAll(".Select-menu-outer .Select-option").forEach(function(e){e.addEventListener("mouseenter",n.onMouseEnter),e.addEventListener("mouseleave",n.onMouseLeave)});var t=document.getElementsByClassName("is-focused")[1];t&&t.classList.remove("is-focused")},n.state={value:n.props.defaultValue},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),n(t,[{key:"componentWillReceiveProps",value:function(e){e.defaultValue!=this.state.value&&this.setState({value:e.defaultValue})}},{key:"componentDidMount",value:function(){this.setFontFamily(this.state.value)}},{key:"componentDidUpdate",value:function(){this.setFontFamily(this.state.value)}},{key:"setFontFamily",value:function(e){if("fonts"==this.props.type){var t=document.querySelector("."+this.props.customClass);if(t){var o=t.querySelector(".custom__single-value");o&&(o.style.fontFamily=e)}}}},{key:"render",value:function(){var e=this;return r.default.createElement("div",{className:"form-group "+this.props.customClass,onClick:this.onClick},r.default.createElement("label",{className:"control-label"},this.props.labelName),r.default.createElement(s.default,{classNamePrefix:"custom",className:1==this.props.hidden?"d-none":"select-outer-container",name:this.props.name,options:this.dropDownValues(),isDisabled:this.props.isDisabled,onChange:this.onChange,valueKey:this.props.valueKey?this.props.valueKey:void 0,labelKey:this.props.labelKey?this.props.labelKey:void 0,value:this.state.value&&this.dropDownValues().filter(function(t){return t.value===e.state.value}).length>0?this.dropDownValues().filter(function(t){return t.value===e.state.value})[0]:null,isSearchable:!1,isClearable:!1,onMenuOpen:this.onOpen,placeholder:this.props.placeHolder?this.props.placeHolder:this.props.localization.btnSel,onFocus:this.onFocus,onBlur:this.onBlur,searchable:!1,clearable:!1}),r.default.createElement("span",{className:"invalid-feedback"},this.props.errorMessage))}}]),t}();t.default=i,i.propTypes={labelName:l.default.string,customClass:l.default.string,optionLabel:l.default.array,options:l.default.array,onChange:l.default.func.isRequired,name:l.default.string.isRequired,errorMessage:l.default.string,defaultValue:l.default.string,isDisabled:l.default.bool,placeHolder:l.default.string,isSearchable:l.default.bool,hidden:l.default.bool}}]);

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.maxGraduationYearValue=t.educationDegreeValue=t.educationDegreeSelected=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e};t.guid=h,t.isCurrentExperience=function(e,t,n){var a=["EXPR","EEXP","WRKH","MILI"];n&&""!=n&&a.splice(a.indexOf(n),1);for(var i=[],o=function(n){for(var o=void 0==e?null:e.filter(function(e){return e.sectionTypeCD==a[n]}),s=0;s<o.length;s++)o[s]&&o[s].paragraphs&&o[s].paragraphs.length>0&&o[s].paragraphs.map(function(e,n){if(e.id!=t){var a=e.docDatas.filter(function(e){return e.fieldCD==r.fieldCd.JobEndDate});a&&a.length>0&&i.push(a[0].charValue)}})},s=0;s<a.length;s++)o(s);return!!(i&&i.length>0)&&i.some(function(e){return r.Current===e})},t.openCenteredWindow=C,t.printDocument=function(e,t,n,a,r,i,o){if(t){a&&n(e.User.UserUID,e.Document.id,r,"PDF","eXPT","RbtoHtml2","true","true").then(function(e){a.location=e})}else L(i,b(),o)},t.getWindowReference=function(){return C("",800,640,"location=No,scrollbars=Yes,toolbar=No,resizable=No,directories=No,status=No,menubar=No,hotkeys=No,center=Yes",!1,null)},t.getEmptySections=function(e){var t=[];e&&e.forEach(function(e){var n=!0,a=e.paragraphs;a&&a.forEach(function(e){var t=e.docDatas;t&&t.forEach(function(e){""!=e.charValue&&(n=!1)})}),n&&(e.sectionTypeCD==r.sectionTypeCd.Contact||e.sectionTypeCD==r.sectionTypeCd.Name?-1==t.findIndex(function(e){return"Contact"==e.name})&&t.push({name:"Contact",id:e.id}):t.push({name:e.name,id:e.id}))});return t},t.sideBarOpen=function(e,t,n){document.body.classList.add("sidebar-open"),1==n?(document.body.classList.add("sidebar-inner"),e&&document.body.classList.remove("sidebar-formatting")):e&&(document.body.classList.add("sidebar-inner"),document.body.classList.remove("sidebar-formatting"));t&&document.body.classList.add("sidebar-formatting")},t.sideBarClose=function(){document.body.classList.remove("sidebar-open"),document.body.classList.remove("sidebar-inner"),document.body.classList.remove("sidebar-formatting"),document.getElementsByClassName("js-navbar")[0]&&Array.from(document.getElementsByClassName("js-navbar")[0].children).forEach(function(e){e.classList.remove("active")})},t.getSectionByCD=function(e,t){return void 0==e?null:e.find(function(e){return e.sectionTypeCD==t})},t.isFRFM=function(e){return-1!=["SUBJ","GRTG","OPEN","BODY","CTAC","CLSR","AVLB","CNFD","GAPS","RELO","SLRQ","SUMM","AFIL","ACCM","ADDI","AWAR","CERT","CLNT","COMS","CUST","DISS","SKLL","EXCA","EXFU","INTR","KEYW","LANG","OBJC","PORT","PRES","PRIN","PUBL","REFE","CMSK","ORSK","JRSK","OTSK","PPDT"].indexOf(e)},t.isMultiPara=function(e){return-1!=["EXPR","EEXP","WRKH","MILI","TSKL","EDUC","MTLG","OTLG","ADIF"].indexOf(e)},t.sortByKey=function(e,t){return e.sort(function(e,n){var a=e[t],r=n[t];return a<r?-1:a>r?1:0})},t.getText=function(e){var t=document.createElement("div");return t.innerHTML=e,t.innerText},t.isNullOrWhitespace=S,t.cleanSpecialChars=function(e,t){var n=e;n=t?e?e.replace(/[^\w\s\-']/gi,"").replace(/[_]/gi,""):e:e?e.replace(/[^\w\s']/gi,"").replace(/[_]/gi,""):e;return n},t.getMonth=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=n&&n.shortMonths?n.shortMonths:["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r=n&&n.longMonths?n.longMonths:["","January","February","March","April","May","June","July","August","September","October","November","December"];return t?a[e]:r[e]},t.insertAt=m,t.getCharValue=D,t.OnParaSort=function(e,t,n){var a=Object.assign([],e.paragraphs);return(a=(0,o.arrayMove)(a,t,n)).forEach(function(e,t){e.index=t+1}),e.paragraphs=a,{section:e}},t.ResolveDependency=function(e,t,n){var a=this,r=e.querySelectorAll("[dependency]");Array.prototype.slice.call(r).forEach(function(e){for(var r=e.getAttribute("dependency"),i=r,o=r.split(/[|,+]+/),s="",l=0;l<o.length-1;l++)s+=")";for(var c=1;c<o.length-1;c++){var u=r.indexOf(o[c]);i=m.call(i,u+(c-1),"(")}s.length>0&&(i="("+i+s);for(var d=(r=i).replace(/[+]/g," && ").replace(/[|]/g," || "),p=0;p<o.length;p++)d=d.replace(o[p]," fieldVals['"+o[p]+"'] ");var f=Function("fieldVals","return "+d).call(a,t);f||(n?e.parentNode.removeChild(e):e.style.display="none")})},t.toggleActiveclass1=function(e,t){if(T(),1==t){var n=document.querySelectorAll(".sortable-item");if("mouseenter"==e.type){if(e.currentTarget.classList.add("active"),-1!=e.currentTarget.className.indexOf("paragraph-container")){var a=document.querySelectorAll(".section-container");Array.prototype.slice.call(a).forEach(function(e){-1==e.className.indexOf("sortable-group-item")&&e.classList.remove("active")})}}else"mouseleave"==e.type&&Array.prototype.slice.call(n).forEach(function(e){e.classList.remove("active")})}},t.toggleActiveclass=function(e,t,n){T();var a=null;n&&e.currentTarget&&e.currentTarget.className&&e.currentTarget.className.indexOf("paragraph-container")>-1&&(a=e.currentTarget.closest?e.currentTarget.closest(".section-container"):null);if(1==t){var r=document.querySelectorAll(".sortable-item");if("mouseenter"==e.type||isIPAD()&&"click"==e.type){var i=document.querySelectorAll(".section-container");Array.prototype.slice.call(i).forEach(function(e){e.classList.remove("active")}),e.currentTarget.classList.contains("SECTION_CNTC")||e.currentTarget.classList.contains("SECTION_NAME")?e.currentTarget.parentNode.classList.add("active"):e.currentTarget.classList.contains("section")?e.currentTarget.parentNode.parentNode.classList.add("active"):e.currentTarget.classList.add("active"),n&&a&&a.classList.add("has-active-para")}else"mouseleave"==e.type&&(Array.prototype.slice.call(r).forEach(function(e){e.classList.remove("active")}),n&&a&&a.classList.remove("has-active-para"))}},t.isFRFM_NoTTC=function(e){var t=["REFE","CUST","ADDI","LANG","INTR","PRIN","COMS","OBJC","AWAR","EXCA","PUBL","PRES","PORT","ESUM","CLNT","DISS","SKLL"];"LFR"==(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"").toUpperCase()&&(t=["REFE","CUST","ADDI","LANG","PRIN","COMS","OBJC","AWAR","EXCA","PUBL","PRES","PORT","ESUM","CLNT","DISS","SKLL"]);return-1!=t.indexOf(e)},t.resetDefaultValues=function(e,t,n){var a=n(e),r=JSON.parse(JSON.stringify(t));return r.forEach(function(e){if("PGSZ"==e.styleTypeCD)e.value="Letter";else{var t=a.querySelector("[name= "+e.styleTypeCD+"]");t&&(e.value=t.getAttribute("content"))}}),r},t.overlayDynamicWidth=T,t.findAncestor=v,t.scrollAnimate=y,t.setContentInViewPort=function(e){var t=window.innerHeight,n=t-20*t/100,a=document.getElementsByClassName("editing-state-section")[0],r=document.getElementsByClassName("editing-state")[0],i=document.getElementsByClassName("DraftEditor-root")[0],o=(document.getElementsByTagName("html")[0],a||r);if(o&&!function(e){var t=e.offsetTop,n=e.offsetHeight;for(;e.offsetParent;)e=e.offsetParent,t+=e.offsetTop;return t>=window.pageYOffset+10*window.innerHeight/100&&t+n<=window.pageYOffset+window.innerHeight-10*window.innerHeight/100}(o)){var s=o.offsetHeight,l=P(o),c=0;c=s<n?l-10*t/100-(n-s)/2:e||i&&i.scrollTop<=250?l-15*t/100:l+s-30*t/100-n/2,y(document.scrollingElement||document.documentElement,c,300)}},t.checkElementinViewPort=function(e,t,n){var a=window.scrollY||window.pageYOffset,r=e.getBoundingClientRect().top+a,i={top:a+window.innerHeight*t/100,bottom:a+window.innerHeight-window.innerHeight*n/100},o={top:r,bottom:r+e.clientHeight};return o.bottom>=i.top&&o.bottom<=i.bottom||o.top<=i.bottom&&o.top>=i.top},t.getOffsetTop=P,t.isMaskedInput=function(e,t){return!!N(e,t)},t.isCountryUS=N,t.isCountryCA=function(e,t){return!(!e||"ca"!=e.toLowerCase()||t)},t.redirectToUrl=L,t.validateEmail=function(e){if(e){return/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(e)}return!1},t.isLoggedInUser=b,t.isLegacySection=function(e){return e==r.sectionTypeCd.FreeFormExprience||e==r.sectionTypeCd.SkillSKLL||e==r.sectionTypeCd.Keywords},t.updateExperimentIdAndVariation=function(e,t,n,a,r){!e||""!=a.experimentID&&""!=a.variation&&null!=a.experimentID&&null!=a.variation?""!=r.experimentID&&""!=r.variation&&null!=r.experimentID&&null!=r.variation||(r.experimentID=t,r.variation=n):(a.experimentID=t,a.variation=n)},t.getVisitedIndex=function(e){var t=-1;if(e&&e.preferences&&e.preferences.length>0){var n=e.preferences.findIndex(function(e){return"PREF"==e.docPreferenceTypeCD});n>-1&&(t=e.preferences[n].value)}return t},t.addVisitedIndexInPreference=function(e,t){return R(e,"PREF",t)},t.addDocumentPreference=R,t.showTipOnSection=function(e){return e==r.sectionTypeCd.Experience||e==r.sectionTypeCd.Education||e==r.sectionTypeCd.Skills||e==r.sectionTypeCd.Summary},t.getNameSectionVal=function(e){var t={fName:"",lName:""},n=e.sections.filter(function(e){return e.sectionTypeCD==r.sectionTypeCd.Name})[0];if(n&&n.paragraphs&&n.paragraphs.length&&n.paragraphs[0]){var a=n.paragraphs[0];t.fName=i.getValue(a.docDatas.filter(function(e){return e.fieldCD==r.fieldCd.FirstName})[0]),t.lName=i.getValue(a.docDatas.filter(function(e){return e.fieldCD==r.fieldCd.LastName})[0])}return t},t.getContactSectionVal=function(e){var t={email:"",phone:"",cellPhone:"",strt:"",city:"",state:"",zipc:""},n=e.sections.filter(function(e){return e.sectionTypeCD==r.sectionTypeCd.Contact})[0];if(n&&n.paragraphs&&n.paragraphs.length&&n.paragraphs[0]){var a=n.paragraphs[0];t.email=i.getValue(a.docDatas.filter(function(e){return e.fieldCD==r.fieldCd.Email})[0]),t.phone=i.getValue(a.docDatas.filter(function(e){return e.fieldCD==r.fieldCd.HomePhone})[0]),t.cellPhone=i.getValue(a.docDatas.filter(function(e){return e.fieldCD==r.fieldCd.CellPhone})[0]),t.strt=i.getValue(a.docDatas.filter(function(e){return e.fieldCD==r.fieldCd.Street})[0]),t.city=i.getValue(a.docDatas.filter(function(e){return e.fieldCD==r.fieldCd.City})[0]),t.state=i.getValue(a.docDatas.filter(function(e){return e.fieldCD==r.fieldCd.State})[0]),t.zipc=i.getValue(a.docDatas.filter(function(e){return e.fieldCD==r.fieldCd.ZipCode})[0])}return t},t.readCookie=E,t.createCookie=F,t.deleteCookie=function(e,t){var n="";t&&(n="; domain="+n);var a=new Date;a.setTime(a.getTime()-1);var r="; expires="+a.toGMTString();document.cookie=e+"=;"+r+n+"; path=/;"},t.deleteStorageValue=function(e){if((arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.storageType.sessionStorage)==r.storageType.localStorage&&f)window.localStorage.removeItem(e);else if(p)sessionStorage.removeItem(e);else{var t=E(e);if(t){var n=JSON.parse(t);delete n[e],F(e,JSON.stringify(n))}}},t.setStorageValue=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:r.storageType.sessionStorage;switch(n){case r.storageType.localStorage:f?(t=JSON.stringify(t),localStorage.setItem(e,t)):M(e,t,n);break;case r.storageType.localforage:g?(t=JSON.stringify(t),localStorage.setItem(e,t)):M(e,t,n);break;case r.storageType.sessionStorage:p?(t=JSON.stringify(t),sessionStorage.setItem(e,t)):M(e,t,n)}},t.getStorageValue=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r.storageType.sessionStorage,n="";switch(t){case r.storageType.localStorage:f?(n=localStorage.getItem(e))&&(n=JSON.parse(n)):n=I(e,t);break;case r.storageType.localforage:if(g)return s.getItem(e);n=I(e,t);break;case r.storageType.sessionStorage:p?(n=sessionStorage.getItem(e))&&(n=JSON.parse(n)):n=I(e,t)}return n},t.convertToTitleCase=function(e,t,n){if(!e)return e;var i=[],o={degrees:{words:["of","in"]},fieldofstudy:{words:["of","in"]},school:{words:["of","in"]},city:{words:["of","in"]},jobtitle:{words:["a","an","the","and","but","or","for","nor","on","at","to","by","as","up","of","in","et","al"]}};o[r.fieldCd.JobTitle]={words:[].concat(d(o.jobtitle.words))},o[r.fieldCd.CDEGRE]={words:["of","in"]},o[r.fieldCd.FieldOfExpertise]={words:["of","in"]},o.SCHO={words:["of","in"]},o.scho={words:["of","in"]},n&&(o=a({},o,n));o[t]&&(i=o[t].words);e=(r.fieldCd.State==t||r.autoSuggestType.state==t||r.fieldCd.JobState==t||r.fieldCd.SchoolState==t)&&e.length<3?e.toUpperCase():r.fieldCd.Email==t||r.fieldCd.ZipCode==t?e:r.autoSuggestType.jobtitle==t||r.fieldCd.JobTitle==t?A(e,i,!0):A(e,i);return e},t.splitHTML=function(e,t){var n=(new DOMParser).parseFromString(e,"text/html"),a=[],r=t||2,i={};if(n&&n.body){var o=Math.ceil(n.body.children.length/r);Object.keys(n.body.children).forEach(function(e){a.push(n.body.children[e].outerHTML)});for(var s=0;s<r;s++){var l=o*s,c=Math.min(o*(s+1),n.body.children.length);i[O(s+1)]=a.slice(l,c).join("\n")}}return i},t.SplitHTMLRowwise=function(e,t){var n=(new DOMParser).parseFromString(e,"text/html"),a=[],r=t||2,i={};if(n&&n.body){for(var o=0;o<n.body.children.length;o++)a.push(n.body.children[o].outerHTML);for(var s=0;s<a.length;s++){var l=O(s%r+1);i[l]?i[l]=i[l].concat(a[s]).concat("\n"):i[l]=a[s].concat("\n")}}return i},t.getNumberString=O,t.flattenList=function(e){var t=e.replace(/<ul>|<\/ul>|\n/g,""),n=(new DOMParser).parseFromString(t,"text/html"),a=[];if(n&&n.body&&n.body.children)for(var r=0;r<n.body.children.length;r++)a.push(n.body.children[r].outerHTML);return a},t.formatGradYearDate=x,t.checkGradYearComputation=function(e){var t=void 0,n=!1,a=!0,i=[],o=new Date;return e&&e.constructor==Array&&e.map(function(e,s){var l=x(D(e.docDatas,r.fieldCd.GraduationYear));if(t=e.id,a=!1,n=!1,l)if(l>o)n=!0,a=!1;else if(l<=o){var c=o.getFullYear()-l.getFullYear();o>l&&!(c>10||10==c&&o.getMonth()>l.getMonth())&&(a=!1)}i.push({id:t,isFutureDate:n,isHidden:a})}),i},t.resetGradYearInvalidData=function(e){if(!(e.preferences&&e.preferences.findIndex(function(e){return"FGRYR"==e.docPreferenceTypeCD})>-1)){var t=e.sections.findIndex(function(e){return e.sectionTypeCD==r.sectionTypeCd.Education});if(t>-1){var n=e.sections[t];n.paragraphs.map(function(e,t){var n=D(e.docDatas,r.fieldCd.GraduationYear),a=e.docDatas.findIndex(function(e){return e.fieldCD==r.fieldCd.GraduationYear});if(n&&a>-1){var i=n.split("/");if(2==i.length){var o=!isNaN(i[0])&&(1==i[0].length||2==i[0].length),s=!isNaN(i[1])&&4==i[1].length;o&&s||(e.docDatas[a].charValue="")}else(1!=i.length||isNaN(i[0])||4!=i[0].length)&&(e.docDatas[a].charValue="")}})}e=R(e,"FGRYR",1)}return e},t.getTrackingEventObject=function(e,t,n,a,r,i,o,s,c,u){var d=[];if(o&&o instanceof Object){var p=Object.keys(o);p.forEach(function(e){d.push({Name:e,Value:o[e]})})}return new l.TrackRequest({eventType:n,eventSubType:a,eventContext:r,portalCD:t,clientCD:s,sourceAppUID:c,sourceAppCD:u,userID:e,actionType:i,eventDetails:d})},t.insertAtIndex=G,t.isHTML=w,t.ellipsisPara=k,t.putDotted=function(e,t,n){var a=t,r=k(e,a,n),i=$("<div>"+r+"</div>").text(),o=$("<div>"+e+"</div>").text();if(i.length>0&&o.length>=a){var s=i[i.length-1],l=r.lastIndexOf(s),c=r[r.length-1];if(">"==c){var l=r.lastIndexOf(s+"<");r=G(r,l+1,"...")}else{var l=r.lastIndexOf(s);r=G(r,l+1,"...")}}return r},t.getDocumentName=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",i=arguments[5],o=H(e)+H(t);n=(n=(n=n.replaceAllOccurrences("\\.","")).replaceAllOccurrences("&","")).replaceAllOccurrences("-",""),n=i&&n==n.toUpperCase()?n:n?H(n,null,!0):"";var s=o+n+r.trim(),l=J(a,s),c=Array.isArray(l)&&l.length>0?_(l,s):0,u=0==c?50:c.toString().length>1?46:47;return s=s.slice(0,u),0==c?s:s+"("+c+")"},t.camelizeFunction=H,t.getDocumentsWithPrefix=J,t.getNextSequenceNumber=_,t.identifyAndRemoveVulnerableTextFromDoc=function(e,t,n,a){var r=JSON.parse(JSON.stringify(e)),i={removeVulnerableText:a,isVulnerableTextPresent:!1};if(t)if(n){var o=c.getParagraphsById(r,t,n);o&&o.docDatas&&o.docDatas.length>0&&B(o.docDatas,i)}else{var s=c.getSectionById(r,t);s.paragraphs&&s.paragraphs.length>0&&s.paragraphs.forEach(function(e){e.docDatas&&e.docDatas.length>0&&B(e.docDatas,i)})}else r.sections.forEach(function(e){e.paragraphs&&e.paragraphs.length>0&&e.paragraphs.forEach(function(e){e.docDatas&&e.docDatas.length>0&&B(e.docDatas,i)})});return{isVulnerableTextPresent:i.isVulnerableTextPresent,newDoc:r}},t.identifyAndRemoveVulFrmDocDatas=B,t.decodeData=U,t.identifyAndRemoveVulnerableText=W,t.replaceText=Z,t.getRecentStudy=function(e,t){var n=null,a=null,i=null,o=!1;return e.paragraphs.map(function(e,s){if(t&&D(e.docDatas,r.fieldCd.EnrollStatus)&&(a=D(e.docDatas,r.fieldCd.FieldOfExpertise),o=!0),!o){var l=D(e.docDatas,r.fieldCd.GraduationYear),c=0,u=0;7==l.length?(c=isNaN(parseInt(l.substring(3)))?0:parseInt(l.substring(3)),u=isNaN(parseInt(l.substring(2,0)))?0:parseInt(l.substring(2,0))):4==l.length&&(c=l),(null==n||c>n||c==n&&u>i)&&(n=c,i=u,a=D(e.docDatas,r.fieldCd.FieldOfExpertise))}}),a},t.cutomDateFormat=function(e,t){var n="";if(e&&t){var a=t.getFullYear()?t.getFullYear().toString():"",r=t.getMonth()+1?(t.getMonth()+1).toString():"",i=t.getDate()?t.getDate().toString():"";switch(e){case"dd.mm.yyyy":n=Y(i,2)+"."+Y(r,2)+"."+a}}return n},t.pad=Y,t.saveCountryClaimToStorage=function(e){var t=K("country_claim"),n=t||null;n?n&&n.countryCode!=e.countryCode&&j("country_claim",e):j("country_claim",e)},t.getCountryClaimFromStorage=function(){var e=K("country_claim");return e||null},t.saveLatestResumeDeatils=function(e){var t=K("latest_resume_details"),n=t||null;n?n&&n.dateModified!=e.dateModified&&j("latest_resume_details",e):j("latest_resume_details",e)},t.getLatestResumeDeatilsFromStorage=function(e){var t=K("latest_resume_details");return t||null},t.saveJsonStorage=j,t.getJsonData=K,t.FormattedCount=function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},t.LoadScript=function(e,t){var n=document.createElement("script");n.type="text/javascript",n.readyState?n.onreadystatechange=function(){"loaded"!==n.readyState&&"complete"!==n.readyState||(n.onreadystatechange=null,"function"==typeof t&&t())}:n.onload=function(){"function"==typeof t&&t()};n.src=e,document.getElementsByTagName("head")[0].appendChild(n)},t.IsTagAlreadyLoaded=function(e,t){var n=document.getElementsByTagName(t),a="src";"link"==t&&(a="href");for(var r=0;r<n.length;r++)if(n[r].getAttribute(a)==e)return!0;return!1},t.LoadStyleSheet=function(e){var t=document.getElementsByTagName("HEAD")[0],n=document.createElement("link");if(n.async=!0,n.rel="stylesheet",n.type="text/css",n.href=e,e.indexOf("rcstylesheets")>0){var a,r=document.getElementsByTagName("link");r.forEach(function(e){e.href.indexOf("main.css")>0&&(a=e)}),t.insertBefore(n,a)}else t.appendChild(n)},t.UnloadJsCssfile=function(e,t){for(var n="js"==t?"script":"css"==t?"link":"none",a="js"==t?"src":"css"==t?"href":"none",r=document.getElementsByTagName(n),i=r.length;i>=0;i--)r[i]&&null!=r[i].getAttribute(a)&&-1!=r[i].getAttribute(a).indexOf(e)&&r[i].parentNode.removeChild(r[i])},t.ScrollToTop=function(){window.scroll({top:0,left:0,behavior:"smooth"})},t.LoadScriptWithMutipleAttributes=function(e,t){var n=document.createElement("script");n.type="text/javascript",n.readyState?n.onreadystatechange=function(){"loaded"!==n.readyState&&"complete"!==n.readyState||(n.onreadystatechange=null,"function"==typeof t&&t())}:n.onload=function(){"function"==typeof t&&t()};for(var a=0;a<e.length;a++)n.setAttribute(e[a].key,e[a].value);document.getElementsByTagName("head")[0].appendChild(n)},t.GetDateText=function(e,t){var n=Math.round(Math.abs((new Date).getTime()-new Date(e).getTime())/864e5);if(n>365){var a=Math.round(n/365);n%365!=0&&(a+=1);var r=1==a?t.YEAR:t.YEARS;return a+" "+r+" "+t.AGO}if(n>30){var i=Math.ceil(n/30),o=1==i?t.MONTH:t.MONTHS;return i+" "+o+" "+t.AGO}if(n>=8&&n<=30){var s=Math.round(n/7),l=1==s?t.WEEK:t.WEEKS;return s+" "+l+" "+t.AGO}if(0===n)return t.TODAY;if(1===n)return t.YESTERDAY;return n>0?Math.round(n)+" "+t.DAYS+" "+t.AGO:""};var r=u(n(1)),i=u(n(2)),o=n(4),s=u(n(9)),l=n(5),c=u(n(6));function u(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function d(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var p=function(){var e=window.sessionStorage;try{return e.setItem("test","1"),e.removeItem("test"),!0}catch(e){return!1}}(),f=function(){var e=window.localStorage;try{return e.setItem("test","1"),e.removeItem("test"),!0}catch(e){return!1}}(),g=function(){try{if(s.ready)return!0}catch(e){return!1}}();function h(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}function C(e,t,n,a,r,i){var o=null,s=(640-t)/2,l=(480-n)/2,c="width="+t+",height="+n+",left="+s+",screenX="+s+",top="+l+",screenY="+l+","+a;return(o=e&&""!=e?window.open(e,"_blank",c):window.open("","_blank",c))&&(r?(o.blur(),window.focus()):o.focus()),o}function S(e){return null==e||void 0==e||e.toString().replace(/\s/g,"").length<1}function m(e,t){return this.substr(0,e)+t+this.substr(e)}function D(e,t){var n="";return void 0!=e&&(n=void 0===e.find(function(e){return e.fieldCD==t})?"":e.find(function(e){return e.fieldCD==t}).charValue),n=n||""}function T(){var e=document.getElementById("document");setTimeout(function(){if(e){var t=e.offsetWidth,n=(parseInt(window.getComputedStyle(e,null).getPropertyValue("padding-left")),parseInt(window.getComputedStyle(e,null).getPropertyValue("padding-right"))),a=document.querySelectorAll(".doc-overlay"),r=document.querySelectorAll(".document-tool"),i=e.classList.contains("RBN1"),o=void 0,s=-n-2,l=void 0;if(i){var c=document.getElementsByClassName("separator-main")[0],u=document.getElementsByClassName("separator-left")[0];if(c&&u){var d=c.offsetWidth,p=u.offsetWidth;l=parseInt(window.getComputedStyle(c,null).getPropertyValue("padding-left")),o=t-d-p-n-2}}r&&(i?Array.prototype.slice.call(r).forEach(function(e){e.setAttribute("style","right: "+-o+"px;")}):Array.prototype.slice.call(r).forEach(function(e){e.setAttribute("style","right: "+s+"px;")})),a&&(i?Array.prototype.slice.call(a).forEach(function(e){e.setAttribute("style","left:"+-l+"px; right: "+-o+"px;")}):Array.prototype.slice.call(a).forEach(function(e){var t=v(e,"editing-state-section");v(e,"show-section-button");s=t?-10:-n-2,e.setAttribute("style","left:"+s+"px; right: "+s+"px;")}))}},10)}function v(e,t){for(;(e=e.parentElement)&&!e.classList.contains(t););return e}function y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.scrollingElement||document.documentElement,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:300,a=e.scrollTop,r=t-a,i=+new Date;!function o(){var s=+new Date-i;e.scrollTop=parseInt(function(e,t,n,a){return(e/=a/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t}(s,a,r,n)),s<n?requestAnimationFrame(o):e.scrollTop=t}()}function P(e){var t=0;do{isNaN(e.offsetTop)||(t+=e.offsetTop)}while(e=e.offsetParent);return t}function N(e,t){return!(!e||"us"!=e.toLowerCase()||t)}function L(e,t,n){n("exit builder",{"builder type":"resumes","exit page path":e},null,t),window.location=e}function b(e){return!(!e||"Guest"==e.role)}function R(e,t,n){e.preferences=e.preferences||[];var a=e.preferences.findIndex(function(e){return e.docPreferenceTypeCD==t});if(a>-1)e.preferences[a].value=n;else{var r={docId:0,docPrefId:0,docPreferenceTypeCD:t,documentID:e.id,id:h(),value:n};e.preferences.push(r)}return e}function E(e){for(var t=e+"=",n=document.cookie.split(";"),a=0;a<n.length;a++){for(var r=n[a];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return null}function F(e,t,n,a){var r="";if(n){var i=new Date;i.setTime(i.getTime()+24*n*60*60*1e3),r="; expires="+i.toGMTString()}else r="";var o=e+"="+t+r+"; path=/;";document.cookie=a?o+"domain=."+a:o}function M(e,t,n){var a=E(n),r=a?JSON.parse(a):{};r[e]=t,F(n,JSON.stringify(r))}function I(e,t){var n,a="";(n=E(t))&&(a=JSON.parse(n)[e]||"");return a}function A(e,t,n){return e.split(" ").map(function(e,a){return n&&a<1?S(e)?"":e.charAt(0).toUpperCase()+e.substr(1):S(e)?"":t.includes(e.toLowerCase())?e.charAt(0).toLowerCase()+e.substr(1):e.charAt(0).toUpperCase()+e.substr(1)}).join(" ")}function O(e){var t="";switch(e){case 1:t="first";break;case 2:t="second";break;case 3:t="third"}return t}function x(e){var t=void 0,n=new Date;if(e){var a=e.split("/");if(2==a.length){var r=!isNaN(a[0])&&(1==a[0].length||2==a[0].length),i=!isNaN(a[1])&&4==a[1].length;r&&i&&(a[1]=1==a[1].length?"0"+a[1]:a[1],t=new Date(Date.parse(a[1]+"-"+a[0]+"-01")))}else 1!=a.length||isNaN(a[0])||4!=a[0].length||(t=new Date(Date.parse(a[0]+"-01-01")))}if(t){var o=n.getFullYear()-t.getFullYear();n>t&&(o>10||10==o&&(n.getMonth(),t.getMonth()))}return t}t.educationDegreeSelected=function(e){var t=void 0;return e.paragraphs&&e.paragraphs.length>0&&(t=e.paragraphs.some(function(e){if(D(e.docDatas,r.fieldCd.DegreeEarned))return!0})),t},t.educationDegreeValue=function(e){var t=void 0;return e.paragraphs&&e.paragraphs.length>0&&(t=D(e.paragraphs[0].docDatas,r.fieldCd.DegreeEarned)),t},t.maxGraduationYearValue=function(e){var t=void 0;if(e.paragraphs&&e.paragraphs.length>0){var n=[];e.paragraphs.forEach(function(e){var t=D(e.docDatas,r.fieldCd.GraduationYear);t&&n.push({gradDateDocValue:t,date:x(t)})}),n.length>0&&(t=n.sort(function(e,t){return t.date-e.date})[0].gradDateDocValue)}return t};function G(e,t,n){return e.substr(0,t)+n+e.substr(t)}function w(e){var t=document.createElement("div");t.innerHTML=e;for(var n=t.childNodes,a=n.length;a--;)if(1==n[a].nodeType)return!0;return!1}function k(e,t,n){e=e?e.toString():"";for(var a,r=$.parseHTML(e),i=t,o=$(r).length,s="",l="",c=0,u=0;u<o;u++)if($(r[u]).text().length>t){if(!((a=i-$("<div>"+s+"</div>").text().length)>0))break;if(w($(r[u]).html()))s+="<"+r[u].nodeName.toLowerCase()+">",s+=k($(r[u]).html(),t,n),s+="</"+r[u].nodeName.toLowerCase()+">",i=t;else{var d=$(r[u]).text().substring(0,t);n&&(d=V($(r[u]).text(),t)),r[u].nodeType==Node.TEXT_NODE?s+=d:s+=$("<div/>").append($(r[u]).empty().html(d)).html(),t-=d.length}}else if(l=r[u],c=$(l).text().length,$("<div>"+s+"</div>").text().length+c<=i)s+=$("<div/>").append(l).html(),t-=c;else{if(!((a=t-$("<div>"+s+"</div>").text().length)>0))break;if(w($(l).html()))s+="<"+l.nodeName.toLowerCase()+">",s+=k($(l).html(),a,n),s+="</"+l.nodeName.toLowerCase()+">";else{d=$(l).text().substring(0,a);n&&(d=V($(l).text(),a)),s+=$("<div/>").append($(l).empty().html(d)).html()}}return s}function V(e,t){var n="";return e.split(" ").forEach(function(e){n.length<t&&(n=n+" "+e)}),n}function H(e,t,n,a){if(!e)return"";var r=n?"":" ";return(e=(e=e.replace(/\s+/g," ")).toLowerCase()).split(" ").map(function(e){if(t&&a.find(function(t){return t.toLowerCase()==e}))return e.toUpperCase();var n=e.split("");return n.length>0?(n[0]=n[0].toUpperCase(),n.join("")):""}).join(r)}function J(e,t){return e.filter(function(e){return e&&e.name&&(-1!=e.name.lastIndexOf("(")?e.name.slice(0,e.name.lastIndexOf("(")):e.name)==t})}function _(e,t){var n=1;if(1==e.length){var a=e.filter(function(e){return e&&e.name==t});a&&a.length>0&&(n+=1)}if(1==n){var r=e.filter(function(e){return e&&e.name!=t}),i=(r=r&&r.map(function(e){return e.name.replace(")","").split("(").pop()}))&&r.map(function(e){return parseInt(e,10)});i&&(n=Math.max.apply(Math,d(i))+1)}return n}function B(e,t){var n="";e.forEach(function(e){switch(e.fieldCD){case r.fieldCd.JobDescription:case r.fieldCd.SkillsCollection_1:case r.fieldCd.SkillsCollection_2:case r.fieldCd.SkillsCollection_3:case r.fieldCd.FreeForm_1:case r.fieldCd.FreeForm:n="<ul>,<li>,<span>,<del>,<font>,<i>,<em>,<b>,<strong>,<u>,<p>,<br>"}if(e.charValue){var a=W(U(e.charValue),n,t);e.charValue=a}})}function U(e){return String(e).replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}function W(e,t,n){t=(((t||"")+"").toLowerCase().match(/<[a-z0-9][a-z0-9]*>/g)||[]).join("");return!n.removeVulnerableText&&e.indexOf("--")>-1?(n.isVulnerableTextPresent=!0,e):Z(e,/(--)/gi,t,/<\/?([a-z0-9][a-z0-9]*)\b[^>]*>/gi,n)}function Z(e,t,n,a,r){e.indexOf("--")>-1&&(r.isVulnerableTextPresent=!0);var i=e.replace(t,"").replace(a,function(e,t){return n.indexOf("<"+t.toLowerCase()+">")>-1?e:(r.isVulnerableTextPresent=!0,"")});return r.removeVulnerableText?i:e}function Y(e,t){if(e&&t)for(e=e.toString();e.length<t;)e="0"+e;return e}function j(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch(e){return!1}}function K(e){var t=localStorage.getItem(e);return t?JSON.parse(t):null}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.emptyGuid="00000000-0000-0000-0000-000000000000",t.Current="Current",t.documentTypeCD={coverLetter:"LETR",resume:"RSME"},t.fieldCd={Accomplishments:"ACCM",AdditionalLink1:"LNK1",AdditionalLink2:"LNK2",AdditionalLink3:"LNK3",Alerts:"ALRT",AuthorizeToWork:"AUTW",BestTimeToContact:"BSCN",CareerField:"CRFL",CareerLevel:"CRLV",CareerSpecailaity:"SPCL",CellPhone:"CPHN",CertificationDateReceived:"DATE",CertificationName:"CERT",CertificationSummary:"CSUM",City:"CITY",Company:"COMP",CompanyDescription:"CDES",CompanyLocation:"COLO",Country:"CNTY",DegreeEarned:"DGRE",Email:"EMAI",EmploymentStatus:"EMPS",EmploymentType:"ETYP",EducationDegreeType:"EDTP",EducationGraduate:"EGRD",EnrollStatus:"ENST",FaxPhone:"FPHN",FieldOfExpertise:"STUY",FirstName:"FNAM",FreeFormat:"FRFM",FromDate:"FRDT",GradePointAverage:"GRPA",GraduationYear:"GRYR",GraduationDate:"GRDT",GraduationStartDate:"GRST",GraduationEndDate:"GRED",GraduationDateFormat:"GDFM",HeadLine:"HDLN",HighestLevelOfEducation:"HLED",HomePhone:"HPHN",HourlySalaryRange:"HSLR",InstituteName:"INST",JobCity:"JCIT",JobDescription:"JDES",JobEndDate:"EDDT",JobStartDate:"JSTD",JobStartMonth:"JSTM",JobStartYear:"JSTY",JobEndMonth:"JETM",JobEndYear:"JETY",JobCountry:"JCNT",JobState:"JSTA",JobTitle:"JTIT",JobType:"JTYP",JobDateFormat:"JDFM",Keyword:"KWRD",Language:"LNGU",LastName:"LNAM",Location:"LOCN",MainTitle:"MTTL",NewJobStart:"NJST",NumberOfYearsSkillUsed:"SKYR",OfficePhone:"OPHN",OtherPhone:"OPHN",PhotoURL:"PURL",Proficiencylevel:"PRLV",Password:"PSWD",ProfessionalTitle:"PTIT",Relocate:"RELC",ResumeTitle:"RTTL",SchoolCity:"SCIT",SchoolCountry:"SCNT",SchoolLocation:"SCLO",SchoolName:"SCHO",SchoolState:"SSTA",Skill:"SKIL",SkillLastUsed:"SLST",SkillLevel:"SKLV",SkillName:"SKIL",SkillRating:"SKRT",SkillsCollection_1:"SKC1",SkillsCollection_2:"SKC2",SkillsCollection_3:"SKC3",State:"STAT",Street:"STRT",Subject:"SUBJ",SubTitle1:"TTL1",SubTitle2:"TTL2",SubTitle3:"TTL3",Summary:"SUMM",supplementaryInfo:"IDOB",TargetSalaryRange:"SLRN",Telecommute:"TCOM",ToDate:"TODT",UserPicture:"UPCT",USMilitryVeteran:"USML",USSecurityClearence:"SCLR",Website:"WEBS",ZipCode:"ZIPC",IndustryName:"INNA",External_Link1:"LNK1",External_Link2:"LNK2",External_Link3:"LNK3",FROM:"FROM",ListeningLevel:"LSLV",ReadingLevel:"RDLV",SpokenInteractionLevel:"SILV",SpokenProdLevel:"SPLV",WritingLevel:"WRLV",OtherLanguage:"OTHL",MotherLanguage:"MOTL",DrivingLicence_AM:"D0AM",DrivingLicence_A1:"D0A1",DrivingLicence_A2:"D0A2",DrivingLicence_A:"D00A",DrivingLicence_B1:"D0B1",DrivingLicence_B:"D00B",DrivingLicence_BE:"D0BE",DrivingLicence_C1:"D0C1",DrivingLicence_C1E:"DC1E",DrivingLicence_C:"D00C",DrivingLicence_CE:"D0CE",DrivingLicence_D1:"D0D1",DrivingLicence_D1E:"DD1E",DrivingLicence_D:"D00D",DrivingLicence_DE:"D0DE",InformationProcessing:"INFP",Communication:"COMM",ContentCreation:"CONC",ProblemSolving:"PRSO",Safety:"SFTY",AdditionalInfoCategory:"AICT",CDEGRE:"CDEGRE",FreeForm:"FRFM",FreeForm_1:"FRM1",DocumentTitle:"DCTL",RatingValue:"RATV",RatingText:"RATT",RatingGrade:"RATG",SocialLink:"SOCL",Date:"DATE",SignatureName:"SNAM",SignatureURL:"SURL",HorizontalLeft:"HLEF",HorizontalMid:"HMID",HorizontalRight:"HRIG",SignatureDate:"SDAT",SignaturePlace:"PLAC",SignatureFontFamily:"SIFF",SignatureFontSize:"SIFS",SignatureFontStyle:"SIST",SignatureFontColor:"SICL",SignatureHeight:"SIHT",SignatureWidth:"SIWD",SignatureCategory:"STYP",SignatureContrast:"SICT",BirthDate:"DOB1",Nationality:"NTLY",IDNumber:"IDNV",DateFormat:"DFRM",IDNumberType:"IDNT",NumberValue:"NMBR",Neighbourhood:"NBHD",MZip:"MZIP",MaritalStatus:"MSTA",ContactAddress:"ADDR",SocialWebsiteLink:"WEB1",TypeOfContract:"JCTR",Driving_Info:"DRIV",Availability:"AVAI",Additional_Info:"ADIF",GradCurrentlyEnrolled:"GRIP",GraduationHonours:"GRHN",GradStartMonth:"GRSTM",GradStartYear:"GRSTY",GradEndMonth:"GREDM",GradEndYear:"GREDY",BtnText:"BTXT",BtnUrl:"BURL",FreeFormText:"FTXT"},t.sectionTypeCd={Contact:"CNTC",Education:"EDUC",Experience:"EXPR",ExecutiveResumeTitle:"ERTL",Languages:"LANG",Name:"NAME",NameContact:"PRFL",Skills:"HILT",RatingSkills:"SKLI",Summary:"SUMM",Affiliations:"AFIL",Awards:"AWAR",Volunteer:"VLTR",Community_Service:"COMS",Publications:"PUBL",Other:"OTHR",Additional_Information:"ADDI",Accomplishments:"ACCM",Certification:"CERT",External_Links:"ALNK",ResumeTitle:"RTTL",FreeFormExprience:"EXFU",Executive_Experience:"EEXP",Military_Experience:"MILI",Work_History:"WRKH",Custom:"CUST",Technical_Skills:"TSKL",Executive_Summary:"ESUM",SkillSKLL:"SKLL",Keywords:"KEYW",Final_Resume:"FNLZ",Date:"DATE",Recipient:"RCNT",Subject:"SUBJ",Greetings:"GRTG",Opener:"OPEN",Body:"BODY",CallToAction:"CTAC",Closer:"CLSR",Gaps:"GAPS",Relocation:"RELO",Confidentiality:"CNFD",Availablity:"AVLB",SalaryRuquirements:"SLRQ",Photo:"PICT",CProfile:"CPFL",MotherLanguage:"MTLG",OtherLanguage:"OTLG",Driving_Licence:"DRLI",Additional_Info:"ADIF",Signature:"SGTR",Interests:"INTR",Softwares:"SFTR",Personal_Data:"PPDT",Language:"LNGG",Overview:"OVVW",Quote:"QUOT",Timeline:"TIME",References:"REFE",Button:"BUTN",Foot:"FOOT",Objective:"OBJC"},t.docZoneTypeCd={BODY:"BODY",FOOTER:"FOOT",HEAD:"HEAD"},t.AppConst={CurrentYear:(new Date).getFullYear().toString()},t.UserSignInResponse={Success:"success",UserSwap:"userswap",InvalidPassword:"invalidpassword",UserDeactivated:"userdeactivated",TechnicalFault:"technicalfault",InvalidUser:"invaliduser",PasswordExpired:"password_expired"},t.SocialLogin={GoogleCD:"GGLE",FacebookCD:"FCBK"},t.styleTypeCD={fontFace:"FTFC",headingFontSize:"HDSZ",fontSize:"FTSZ",topBottomMargins:"VMRG",sideMargins:"HMRG",paragraphIndent:"PIND",sectionSpacing:"SSPC",lineSpacing:"LNSP",lineWeight:"LNWT",paragraphSpacing:"PSPC",pageSize:"PGSZ",hMargin:"HMRG",styleDocColor:"SDCL"},t.styleSliders=[{code:"FTFC",min:"",max:"",step:"",label:"Font"},{code:"HDSZ",min:"8",max:"24",step:"1",label:"Heading Font Size:",labelsNumber:{8:"8",12:"12",16:"16",20:"20",24:"24"}},{code:"FTSZ",min:"8",max:"14",step:"1",label:"Font Size: ",labelsNumber:{8:"8",10:"10",12:"12",14:"14"}},{code:"VMRG",min:"0",max:"50",step:"2",label:"Top and Bottom Margins: "},{code:"HMRG",min:"0",max:"100",step:"4",label:"Side Margins: "},{code:"PIND",min:"0",max:"100",step:"4",label:"Paragraph Indent: "},{code:"SSPC",min:"0",max:"20",step:"1",label:"Section Spacing: "},{code:"PSPC",min:"0",max:"20",step:"1",label:"Paragraph Spacing: "},{code:"LNSP",min:"0",max:"20",step:"1",label:"Line Spacing: "},{code:"LNWT",min:"0",max:"4",step:"1",label:"Line Weight: "},{code:"PGSZ",min:"",max:"",step:"",label:"Paper:"}],t.autoSuggestType={city:"city",state:"state",school:"school",country:"country",jobtitlewithoutids:"jobtitlewithoutids",jobtitle:"jobtitle",jobtitleOrIndustry:"jobtitleorindustry",jobtitlewithspellcheck:"jobtitlewithspellcheck",companywithoutids:"companywithoutids",googlePlaces:"googleplaces",degrees:"degrees",fieldofstudy:"fieldofstudy",streetAddress:"streetAddress",company:"company",zip:"zip",email:"email",motherLanguage:"MOTL",otherLanguage:"OTHL",skills:"skills",search:"search"},t.PopupModel={title:"",isOpen:!1,hasHeader:!1,hideBorderRadius:!1,onPrimaryClick:"",onSecondaryClick:"",btnPrimaryLabel:"",btnSecondaryLabel:"",closeModal:"",btnCancelLabel:"",hasFooter:"",cssClass:{modalDialog:"",btnPrimary:"",btnSecondary:"",modalFooter:""}},t.resultTypes={Success:1,Error:0},t.userRoles={Guest:"Guest",User:"User"},t.documentFormat={AdobePDF:"PDF",MSWord:"WORDX",RichText:"RTF",PlainText:"TXT",WebPage:"HTML",DOCX:"DOCX",SVG:"SVG",JPEG:"JPEG",GIF:"GIF",PNG:"PNG"},t.finishLetterTypes={print:"print",email:"email",finish:"finish",download:"download"},t.SEE_EXAMPLES_SNIPPET="",t.SomeOtherDegree="Some College (No Degree)",t.productCD={ResumeBuilder:"RSM",CoverLetterBuilder:"CLB",MPCBuilder:"MPC",ResumeWizard:"RWZ"},t.storageType={localStorage:"localStorage",sessionStorage:"sessionStorage",localforage:"localforage"},t.recommendationServiceAttr={UserRegistrationStatus:"UserRegistrationStatus",TargetJobTitle:"TargetJobTitle",TargetMajorFunction:"TargetMajorFunction",TargetMinorFunction:"TargetMinorFunction",TargetOccupation:"TargetOccupation",UserMostRecentJobTitle:"UserMostRecentJobTitle",ExperienceLevel:"ExperienceLevel",TotalYearsOfExperience:"TotalYearsOfExperience",YearsOfExperience:"YearsOfExperience",UserEmploymentStatus:"UserEmploymentStatus",HighestEducationLevel:"HighestEducationLevel",ResumeUploadOrSratch:"ResumeUploadOrSratch",ResumeTemplateSelected:"ResumeTemplateSelected",ResumeStrengthScore:"ResumeStrengthScore",ContactStrengthScore:"ContactStrengthScore",WorkHistoryStrengthScore:"WorkHistoryStrengthScore",EducationStrengthScore:"EducationStrengthScore",SummaryStrengthScore:"SummaryStrengthScore",SkillsStrengthScore:"SkillsStrengthScore",HighestEducationLevelStatus:"HighestEducationLevelStatus",SectionCompletionStatus:"SectionCompletionStatus"},t.JobTitleTipType={Student:"Student",Ambiguous:"Ambiguous",Slash:"Slash",NoWork:"NoWork",Gibberish:"Gibberish"},t.AlignmentType={LEFT:"L",RIGHT:"R",CENTER:"C",JUSTIFY:"J"},t.AgreementCD={PrivacyPolicy:"PRYPCY",TermsOfUse:"TMOUSR"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getValueInner=o,t.getCharValue=function(e,t){var n="";void 0!=e&&(n=void 0===e.find(function(e){return e.fieldCD==t})?"":e.find(function(e){return e.fieldCD==t}).charValue,a.isNullOrWhitespace(n)&&(n=""));return n},t.getErrorMessage=function(e,t){var n="";void 0!=e&&(n=void 0===e.find(function(e){return e.fieldCD==t})?"":e.find(function(e){return e.fieldCD==t}).errorMessage);return n},t.fieldExists=function(e,t){return e.findIndex(function(e){return e.fieldCD==t})>=0},t.isFieldValid=function(e,t){var n=!0;void 0!=e&&(n=void 0===e.find(function(e){return e.fieldCD==t})?"":e.find(function(e){return e.fieldCD==t}).isValid);return void 0==n||n},t.IsCurrentlyWorkHere=s,t.getExperienceEndDate=function(e,t,n){return s(e,t,n)?n?n.current_Text:"":l(e,t)},t.getDateTimeValue=function(e,t,n){if(1==s(e,t,n))return n?n.current_Text:"Current";void 0===e.find(function(e){return e.fieldCD==t})||e.find(function(e){return e.fieldCD==t}).dateTimeValue;return""},t.getMonth=function(e,t){var n="",a=void 0===e.find(function(e){return e.fieldCD==t})?"":e.find(function(e){return e.fieldCD==t}).dateTimeValue;null!=a&&""!=a&&(n=i(new Date(a),"mmm"));return n},t.getYear=l,t.getValue=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"mmmm";if(e){var s="";return a?o(s=e.charValue,t,n):(e.dateTimeValue&&(s=i(new Date(e.dateTimeValue),r)),o(s,t,n))}return""},t.generatePresentDate=function(){var e=new Date,t=r.json.month[e.getMonth()+1],n=e.getFullYear();return{dateTimeValue:new Date(Date.parse(t+" 5, "+n)).toISOString().slice(0,19),charValue:"Present"}},t.generatePresentStartDate=function(){var e=new Date,t=r.jsonmonth[e.getMonth()+1],n=e.getFullYear(),a=new Date(Date.parse(t+" 5, "+n));return{dateTimeValue:a.toISOString().slice(0,19),charValue:a.getMonth()+1+" "+a.getFullYear()}},t.areFieldsEmpty=function(e,t){var n=!0;if(void 0==e||null==e)return n;return e.map(function(e,a){t&&t.findIndex(function(t){return t==e.fieldCD})>=0||""!=(""!=e.charValue?e.charValue:e.dateTimeValue)&&n&&(n=!1)}),n},t.isLocalStorageSupported=function(){var e=window.localStorage;try{return e.setItem("test","1"),e.removeItem("test"),!0}catch(e){return!1}},t.removeTrailingSpaces=function(e){return e.split("<p>").forEach(function(t){var n=e;n==(e=e.replace(/(<p><br><\/p>\s*)+$/,""))&&n==(e=e.replace(/(<p>\s*(&nbsp;)+<\/p>\s*)+$/,""))&&(e=e.replace(/((&nbsp;)+<\/p>\s*)+$/,"</p>"))}),e},t.isFutureDate=function(e,t){if(!e)return!1;var n=e.split(t)[0],a=e.split(t)[1],r=new Date((new Date).getFullYear(),(new Date).getMonth()+1),i=n&&a?new Date(Date.parse(n+" /01/"+a)):"";return!!i&&i>r};var a=n(0),r=n(3),i=n(8);function o(e,t,n){var a=!0;if(n&&n.length>0){a=!1;for(var r=0;r<n.length;r++)if(null!=n[r]&&(n[r].charValue||n[r].dateTimeValue)){a=!0;break}}return e?t?a?e+t:e+"":e:""}function s(e,t,n){var a=!1,r="",i=n.current_Text?n.current_Text:"Current",o=n.present_Text?n.present_Text:"Present",s=n.oldCurrent_Text?n.oldCurrent_Text:i;return void 0!=e&&(r=void 0===e.find(function(e){return e.fieldCD==t})?"":e.find(function(e){return e.fieldCD==t}).charValue,n&&r&&(r.toLowerCase()==i.toLowerCase()||r.toLowerCase()==o.toLowerCase()||r.toLowerCase()==s.toLowerCase())&&(a=!0)),a}function l(e,t){var n="",a=void 0===e.find(function(e){return e.fieldCD==t})?"":e.find(function(e){return e.fieldCD==t}).dateTimeValue;return null!=a&&""!=a&&(n=i(new Date(a),"yyyy")),n}},function(e,t,n){"use strict";t.json={state:["State","Alabama ","Alaska ","Arizona ","Arkansas ","California ","Colorado ","Connecticut ","Delaware ","Florida ","Georgia ","Hawaii ","Idaho ","Illinois Indiana ","Iowa ","Kansas ","Kentucky ","Louisiana ","Maine ","Maryland ","Massachusetts ","Michigan ","Minnesota ","Mississippi ","Missouri ","Montana Nebraska ","Nevada ","New Hampshire ","New Jersey ","New Mexico ","New York ","North Carolina ","North Dakota ","Ohio ","Oklahoma ","Oregon ","Pennsylvania Rhode Island ","South Carolina ","South Dakota ","Tennessee ","Texas ","Utah ","Vermont "],month:["Month","January","February","March","April","May","June","July","August","September","October","November","December"],shortMonth:["None","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],year:["2020","2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003","2002","2001","2000","1999","1998","1997","1996","1995","1994","1993","1992","1991","1990","1989","1988","1987","1986","1985","1984","1983","1982","1981","1980","1979","1978","1977","1976","1975","1974","1973","1972","1971","1970","1969","1968","1967","1966","1965","1964","1963","1962","1961","1960","1959","1958","1957","1956","1955","1954","1953","1952","1951","1950","1949","1948","1947","1946","1945","1944","1943","1942","1941","1940","1939","1938","1937","1936","1935","1934","1933","1932","1931","1930","1929","1928","1927","1926","1925","1924","1923","1922","1921","1920","1919","1918"],degree:[{name:"DGRE",value:"",label:"Select..."},{name:"DGRE",value:"High School Diploma",label:"High School Diploma"},{name:"DGRE",value:"GED",label:"GED"},{name:"DGRE",value:"-1",disabled:!0,label:"----------------------------------------------"},{name:"DGRE",value:"Associate of Arts",label:"Associate of Arts"},{name:"DGRE",value:"Associate of Science",label:"Associate of Science"},{name:"DGRE",value:"Associate of Applied Science",label:"Associate of Applied Science"},{name:"DGRE",value:"-1",disabled:!0,label:"----------------------------------------------"},{name:"DGRE",value:"Bachelor of Arts",label:"Bachelor of Arts"},{name:"DGRE",value:"Bachelor of Science",label:"Bachelor of Science"},{name:"DGRE",value:"BBA",label:"BBA"},{name:"DGRE",value:"-1",disabled:!0,label:"----------------------------------------------"},{name:"DGRE",value:"Master of Arts",label:"Master of Arts"},{name:"DGRE",value:"Master of Science",label:"Master of Science"},{name:"DGRE",value:"MBA",label:"MBA"},{name:"DGRE",value:"-1",disabled:!0,label:"----------------------------------------------"},{name:"DGRE",value:"J.D.",label:"J.D."},{name:"DGRE",value:"M.D.",label:"M.D."},{name:"DGRE",value:"Ph.D.",label:"Ph.D."},{name:"DGRE",value:"-1",disabled:!0,label:"----------------------------------------------"},{name:"DGRE",value:"-2",label:"Type your own"}],degreeQualityBuilder:[{name:"DGRE",value:"",label:"Select Degree"},{name:"DGRE",value:"High School Diploma",label:"High School Diploma"},{name:"DGRE",value:"GED",label:"GED"},{name:"DGRE",value:"-1",disabled:!0,label:"----------------------------------------------"},{name:"DGRE",value:"Associate of Arts",label:"Associate of Arts"},{name:"DGRE",value:"Associate of Science",label:"Associate of Science"},{name:"DGRE",value:"Associate of Applied Science",label:"Associate of Applied Science"},{name:"DGRE",value:"-1",disabled:!0,label:"----------------------------------------------"},{name:"DGRE",value:"Bachelor of Arts",label:"Bachelor of Arts"},{name:"DGRE",value:"Bachelor of Science",label:"Bachelor of Science"},{name:"DGRE",value:"BBA",label:"BBA"},{name:"DGRE",value:"-1",disabled:!0,label:"----------------------------------------------"},{name:"DGRE",value:"Master of Arts",label:"Master of Arts"},{name:"DGRE",value:"Master of Science",label:"Master of Science"},{name:"DGRE",value:"MBA",label:"MBA"},{name:"DGRE",value:"-1",disabled:!0,label:"----------------------------------------------"},{name:"DGRE",value:"J.D.",label:"J.D."},{name:"DGRE",value:"M.D.",label:"M.D."},{name:"DGRE",value:"Ph.D.",label:"Ph.D."},{name:"DGRE",value:"-1",disabled:!0,label:"----------------------------------------------"},{name:"DGRE",value:"-2",label:"Type your own"}],documentScale:[{label:"Fit Width",value:"0"},{label:"Actual Size",value:"1"},{label:"150%",value:"1.5"},{label:"200%",value:"2"}],hMarginMapping:[{className:"mrg-small",value:".75",size:'.75"',text:"Condensed"},{className:"mrg-default",value:"1",size:'1"',text:"Standard"},{className:"mrg-large",value:"1.25",size:'1.25"',text:"Expanded"}],resumeFmt:[{value:"File Format",label:"File_Format"},{value:"PDF",label:"ResumeFormat_Pdf_Upper"},{value:"HTML",label:"ResumeFormat_Html_Upper"},{value:"RTF",label:"ResumeFormat_RTF_Upper"},{value:"TXT",label:"ResumeFormat_Txt_Upper"},{value:"DOCX",label:"ResumeFormat_Doc_Upper"}],skinData:[{code:"cbg1",name:"SkinName_Monochrome",title:"Professional",skinContent:"cbg1Content"},{code:"cbg2",name:"SkinName_Monogram",title:"Refined",skinContent:"cbg2Content"},{code:"upt1",name:"SkinName_Minimalist",title:"Artistic",skinContent:"upt1Content"},{code:"upt2",name:"SkinName_Minimalist",title:"Charismatic",skinContent:"upt2Content"},{code:"pcf1",name:"SkinName_Minimalist",title:"Pacific",skinContent:"pcf1Content"},{code:"mtp1",name:"SkinName_Minimalist",title:"Modern",skinContent:"mtp1Content"},{code:"mtp2",name:"SkinName_Minimalist",title:"Contempo",skinContent:"mtp2Content"},{code:"hrt1",name:"SkinName_Centered",title:"Executive",skinContent:"hrt1Content"},{code:"hrt2",name:"SkinName_Timeless",title:"Deluxe",skinContent:"hrt2Content"},{code:"cbg3",name:"SkinName_Progressive",title:"Pinstripe",skinContent:"cbg3Content"},{code:"cnt1",name:"SkinName_Pacific",title:"Whitespace",skinContent:"cnt1Content"},{code:"cnt3",name:"SkinName_Modular",title:"Blueprint",skinContent:"cnt3Content"}],mixpaneldata:[{Key:"JobTitle",Value:""},{Key:"Currently Employed",Value:""}],SkinFontStyle:["Arial","Bodoni MT","Century Gothic","Courier New","Georgia","Palatino Linotype","Tahoma","Times New Roman","Trebuchet MS","Verdana"],JobSearchPeriod:["I haven’t started my job search yet","Less than one month","1 - 2 months","3+ months"],JobLookingFor:["Step-by-step guidance in building my resume","Good resume examples in my industry","Industry-specific keywords and phrases","Resume tips and advice","Resume design templates","Professional review of my resume"],CareerField:["Accounting and Finance","Administrative Support","Architecture","Art, Fashion and Design","Banking and Financial Services","Beauty and Spa"],CareerSubField:["Accountants","Accounts Payable/Receivable","Auditors","Banking","Bookkeepers","Collections"],ExperienceSectionTips:["<h1 class='h3 heading'>Tips for Work History</h1><ul class='tips square'><li>Enter basic information about your previous jobs so employers can see where you've worked. </li><li>Don't abbreviate job titles. Using your full title looks more professional and is easier for managers to understand. </li><li>Include start and end dates for each position. Leaving off dates will make employers think you're hiding something. </li></ul>"],EducationSectionTips:["<h1 class='h3 heading'>Tips for Education</h1><ul class='tips square'><li>List the schools you’ve attended and any degrees you’ve earned, starting with your most recent.  </li><li>List high school only if you didn't go to college.  </li><li>Coursework is optional. List relevant courses if you don't have much work experience.  </li></ul>"],SkillsSectionTips:["<h1 class='h3 heading'>Tips for Skills</h1><ul class='tips square'><li>Highlight 6-8 skills that are most relevant to your desired job.</li><li>If you don’t have much experience, consider listing soft skills like 'Fast learner', 'Highly dependable' or 'Excellent attention to detail'.  </li><li>Use short bulleted phrases – 3 words or less. No need to use a period (.) at the end.  </li></ul>"],SummarySectionTips:["<h1 class='h3 heading'>Tips for Summary</h1><ul class='tips square'><li>Write a career overview so that hiring managers can immediately see the value that you bring.</li><li>Not sure how to write this? Choose one of our examples and edit it to match your background.  </li><li>Make your summary sound stronger by writing it in the present tense. Focus on what you can do for a company, rather than what you did in the past. </li></ul>"],SkinFormatting:[{SkinCd:"CBG1",Large:{FTFC:"Palatino Linotype",VMRG:"18",HMRG:"48",PIND:"0",SSPC:"12",PSPC:"12",LNSP:"8",LNWT:"1",FTSZ:"12",HDSZ:"14"},Normal:{FTFC:"Palatino Linotype",VMRG:"14",HMRG:"30",PIND:"0",SSPC:"12",PSPC:"10",LNSP:"5",LNWT:"1",FTSZ:"12",HDSZ:"14"},Small:{FTFC:"Palatino Linotype",VMRG:"10",HMRG:"16",PIND:"0",SSPC:"10",PSPC:"10",LNSP:"2",LNWT:"1",FTSZ:"11",HDSZ:"13"}},{SkinCd:"CBG2",Large:{FTFC:"Times New Roman",VMRG:"22",HMRG:"48",PIND:"0",SSPC:"14",PSPC:"16",LNSP:"8",LNWT:"0",FTSZ:"12",HDSZ:"16"},Normal:{FTFC:"Times New Roman",VMRG:"20",HMRG:"30",PIND:"0",SSPC:"12",PSPC:"12",LNSP:"6",LNWT:"0",FTSZ:"12",HDSZ:"16"},Small:{FTFC:"Times New Roman",VMRG:"10",HMRG:"15",PIND:"0",SSPC:"10",PSPC:"10",LNSP:"4",LNWT:"0",FTSZ:"12",HDSZ:"15"}},{SkinCd:"CBG3",Large:{FTFC:"Times New Roman",VMRG:"18",HMRG:"50",PIND:"0",SSPC:"14",PSPC:"14",LNSP:"4",LNWT:"0",FTSZ:"12",HDSZ:"14"},Normal:{FTFC:"Times New Roman",VMRG:"14",HMRG:"30",PIND:"0",SSPC:"12",PSPC:"12",LNSP:"4",LNWT:"0",FTSZ:"12",HDSZ:"14"},Small:{FTFC:"Times New Roman",VMRG:"10",HMRG:"20",PIND:"0",SSPC:"10",PSPC:"10",LNSP:"2",LNWT:"0",FTSZ:"12",HDSZ:"14"}},{SkinCd:"CNT1",Large:{FTFC:"Palatino Linotype",VMRG:"40",HMRG:"52",PIND:"0",SSPC:"12",PSPC:"16",LNSP:"6",LNWT:"1",FTSZ:"11",HDSZ:"14"},Normal:{FTFC:"Palatino Linotype",VMRG:"40",HMRG:"48",PIND:"0",SSPC:"8",PSPC:"14",LNSP:"6",LNWT:"1",FTSZ:"11",HDSZ:"14"},Small:{FTFC:"Palatino Linotype",VMRG:"30",HMRG:"40",PIND:"0",SSPC:"6",PSPC:"5",LNSP:"6",LNWT:"1",FTSZ:"11",HDSZ:"14"}},{SkinCd:"CNT3",Large:{FTFC:"Verdana",VMRG:"30",HMRG:"60",PIND:"0",SSPC:"13",PSPC:"20",LNSP:"6",LNWT:"1",FTSZ:"11",HDSZ:"13"},Normal:{FTFC:"Verdana",VMRG:"30",HMRG:"50",PIND:"0",SSPC:"10",PSPC:"16",LNSP:"6",LNWT:"1",FTSZ:"11",HDSZ:"13"},Small:{FTFC:"Verdana",VMRG:"30",HMRG:"40",PIND:"0",SSPC:"10",PSPC:"15",LNSP:"4",LNWT:"1",FTSZ:"11",HDSZ:"13"}},{SkinCd:"HRT1",Large:{FTFC:"Times New Roman",VMRG:"22",HMRG:"48",PIND:"45",SSPC:"15",PSPC:"16",LNSP:"8",LNWT:"1",FTSZ:"12",HDSZ:"14"},Normal:{FTFC:"Times New Roman",VMRG:"20",HMRG:"30",PIND:"45",SSPC:"14",PSPC:"14",LNSP:"6",LNWT:"1",FTSZ:"12",HDSZ:"14"},Small:{FTFC:"Times New Roman",VMRG:"10",HMRG:"15",PIND:"45",SSPC:"10",PSPC:"10",LNSP:"4",LNWT:"1",FTSZ:"12",HDSZ:"14"}},{SkinCd:"HRT2",Large:{FTFC:"Georgia",VMRG:"22",HMRG:"45",PIND:"40",SSPC:"16",PSPC:"16",LNSP:"8",LNWT:"1",FTSZ:"11",HDSZ:"13"},Normal:{FTFC:"Georgia",VMRG:"20",HMRG:"34",PIND:"40",SSPC:"14",PSPC:"14",LNSP:"6",LNWT:"1",FTSZ:"11",HDSZ:"13"},Small:{FTFC:"Georgia",VMRG:"12",HMRG:"25",PIND:"40",SSPC:"12",PSPC:"10",LNSP:"4",LNWT:"1",FTSZ:"11",HDSZ:"13"}},{SkinCd:"MTP1",Large:{FTFC:"Tahoma",VMRG:"22",HMRG:"50",PIND:"0",SSPC:"15",PSPC:"15",LNSP:"10",LNWT:"1",FTSZ:"11",HDSZ:"14"},Normal:{FTFC:"Tahoma",VMRG:"20",HMRG:"30",PIND:"0",SSPC:"14",PSPC:"14",LNSP:"8",LNWT:"1",FTSZ:"11",HDSZ:"14"},Small:{FTFC:"Tahoma",VMRG:"10",HMRG:"20",PIND:"0",SSPC:"10",PSPC:"10",LNSP:"6",LNWT:"1",FTSZ:"11",HDSZ:"14"}},{SkinCd:"MTP2",Large:{FTFC:"Century Gothic",VMRG:"22",HMRG:"40",PIND:"0",SSPC:"14",PSPC:"12",LNSP:"10",LNWT:"1",FTSZ:"11",HDSZ:"14"},Normal:{FTFC:"Century Gothic",VMRG:"20",HMRG:"30",PIND:"0",SSPC:"12",PSPC:"12",LNSP:"8",LNWT:"1",FTSZ:"11",HDSZ:"14"},Small:{FTFC:"Century Gothic",VMRG:"10",HMRG:"15",PIND:"0",SSPC:"10",PSPC:"10",LNSP:"5",LNWT:"1",FTSZ:"11",HDSZ:"14"}},{SkinCd:"PCF1",Large:{FTFC:"Arial",VMRG:"22",HMRG:"36",PIND:"0",SSPC:"14",PSPC:"14",LNSP:"7",LNWT:"1",FTSZ:"11",HDSZ:"12"},Normal:{FTFC:"Arial",VMRG:"20",HMRG:"30",PIND:"0",SSPC:"14",PSPC:"10",LNSP:"6",LNWT:"1",FTSZ:"11",HDSZ:"12"},Small:{FTFC:"Arial",VMRG:"10",HMRG:"15",PIND:"0",SSPC:"10",PSPC:"10",LNSP:"4",LNWT:"1",FTSZ:"11",HDSZ:"12"}},{SkinCd:"UPT1",Large:{FTFC:"Times New Roman",VMRG:"22",HMRG:"42",PIND:"0",SSPC:"15",PSPC:"16",LNSP:"8",LNWT:"1",FTSZ:"12",HDSZ:"14"},Normal:{FTFC:"Times New Roman",VMRG:"20",HMRG:"30",PIND:"0",SSPC:"14",PSPC:"14",LNSP:"7",LNWT:"1",FTSZ:"12",HDSZ:"14"},Small:{FTFC:"Times New Roman",VMRG:"10",HMRG:"15",PIND:"0",SSPC:"10",PSPC:"10",LNSP:"4",LNWT:"1",FTSZ:"11",HDSZ:"14"}},{SkinCd:"UPT2",Large:{FTFC:"Century Gothic",VMRG:"22",HMRG:"39",PIND:"0",SSPC:"15",PSPC:"15",LNSP:"9",LNWT:"1",FTSZ:"11",HDSZ:"14"},Normal:{FTFC:"Century Gothic",VMRG:"20",HMRG:"30",PIND:"0",SSPC:"14",PSPC:"14",LNSP:"7",LNWT:"1",FTSZ:"11",HDSZ:"14"},Small:{FTFC:"Century Gothic",VMRG:"10",HMRG:"15",PIND:"0",SSPC:"10",PSPC:"10",LNSP:"4",LNWT:"1",FTSZ:"11",HDSZ:"14"}}],galist:[{popupname:"RESUME_OPTIONS",ganame:"resumeoptions"},{popupname:"NAME",ganame:"name"},{popupname:"LOGIN",ganame:"login"},{popupname:"updatename",ganame:"updatename"},{popupname:"contactInfo",ganame:"contactinfo"},{popupname:"additionalSection",ganame:"freeformsection"},{popupname:"skillSection",ganame:"skillsection"},{popupname:"executiveSummarySection",ganame:"executivesummary"},{popupname:"educationSection",ganame:"educationsection"},{popupname:"experienceSection",ganame:"experiencesection"},{popupname:"spellCheck",ganame:"spellcheck"},{popupname:"resumeCheck",ganame:"resumecheck"},{popupname:"titleSection",ganame:"titlesection"},{popupname:"deleteView",ganame:"deletesection"}]}},function(e,t){e.exports=__webpack_require__(61)},function(e,t){e.exports=__webpack_require__(799)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateDocumentWithSkinCD=u,t.isParagraphEmpty=function(e){return!(!e||!e.docDatas)&&e.docDatas.filter(function(e){return""!=e.charValue}).length<1},t.updateDocumentWithDocStyles=d,t.addUpdateParagraph=p,t.removeParagraph=function(e,t,n){var a=JSON.parse(JSON.stringify(e)),r=C(a,t);if(!r)return null;var i=r.paragraphs.findIndex(function(e){return e.id==n});return-1==i?null:(r.paragraphs.splice(i,1),r.paragraphs=h(r.paragraphs),a)},t.onParaSort=function(e,t,n,a,r,i){var o=t.findIndex(function(e){return e.id==n.id});t=Object.assign([],t);var s=JSON.parse(JSON.stringify(t[o]));s=f(s,a,r,i),t[o]=s;var l=JSON.parse(JSON.stringify(e));return l.sections=t,{document:l,section:s}},t.ParaSort=f,t.removeSection=g,t.addSection=function(e,t,n,a,r,o){var s=JSON.parse(JSON.stringify(e)),c=new i.Section({id:l.guid(),documentID:s.id,docZoneTypeCD:n,index:a,name:t,paragraphs:[],sectionTypeCD:r,topPadding:o});return s.sections.splice(a-1,0,c),s.sections=h(s.sections),s},t.reorderArrayItems=h,t.getSectionById=C,t.getParagraphsById=S,t.getParagraphsByIdFromSection=m,t.getDocDatasForNewPara=D,t.getEmptyDocData=T,t.editItem=function(e,t,n){var a={},r=C(e,t);if(n)a.document=e,a.activeSection=r,a.activePara=S(e,t,n);else if(0==l.isMultiPara(r.sectionTypeCD)&&0==r.paragraphs.length||1==l.isMultiPara(r.sectionTypeCD)){var i=D(r.sectionTypeCD);a=p(e,t,"",i,0)}else a.document=e,a.activeSection=r,a.activePara=r.paragraphs[0];return a},t.createParagraphsForNameContact=function(e){var t=JSON.parse(JSON.stringify(e)),n=t.sections.map(function(e){return e.sectionTypeCD}).indexOf(a.sectionTypeCd.Name),r=t.sections.map(function(e){return e.sectionTypeCD}).indexOf(a.sectionTypeCd.Contact);if(n>-1&&0==t.sections[n].paragraphs.length){var i=v(t.sections[n],t.userId);t.sections[n].paragraphs.push(i)}if(r>-1&&0==t.sections[r].paragraphs.length){var o=v(t.sections[r],t.userId);t.sections[r].paragraphs.push(o)}return t},t.createFirstPara=v,t.getFirstParagraph=function(e,t){var n=C(e,t);return n&&n.paragraphs.length>0?n.paragraphs[0]:null},t.deleteEmptyParagrah=function(e){var t=JSON.parse(JSON.stringify(e));return t.sections.map(function(e){e.sectionTypeCD!=a.sectionTypeCd.Contact&&e.sectionTypeCD!=a.sectionTypeCd.Photo&&e.sectionTypeCD!=a.sectionTypeCd.Name&&JSON.parse(JSON.stringify(e.paragraphs)).map(function(t){t.docDatas.filter(function(e){return""!=e.charValue}).length<1&&(e.paragraphs.splice(e.paragraphs.findIndex(function(e){return e.id==t.id}),1),e.paragraphs=h(e.paragraphs))})}),t},t.setTTCPreferencesInDocument=function(e,t,n,a){var r="jobTitle"==(n=n||"jobTitle")?"J":t,i="jobTitle"==n?t:a;e.preferences=e.preferences||[];var o=e.preferences.map(function(e){return e.docPreferenceTypeCD}).indexOf("STYP"),s=e.preferences.map(function(e){return e.docPreferenceTypeCD}).indexOf("SSTR");if(o>-1)e.preferences[o].value=r,s>-1&&(e.preferences[s].value=i);else{var c={docId:0,docPrefId:0,docPreferenceTypeCD:"STYP",documentID:e.id,id:l.guid(),value:r},u={docId:0,docPrefId:0,docPreferenceTypeCD:"SSTR",documentID:e.id,id:l.guid(),value:i};e.preferences.push(c),s>-1?e.preferences[s].value=i:e.preferences.push(u)}return e},t.createDummySectionWithParagraph=y,t.getMonthinNumber=P,t.updateDocData=function(e,t,n,r){if(e&&e.length>0&&t&&t.length>0)return t.map(function(t,o){var s=e[0].paragraphID,c=e[0].userId,u=e.findIndex(function(e){return e.fieldCD==t.fieldCd}),d=e.find(function(e){return e.fieldCD==t.fieldCd});if((d=Object.assign({},d)).charValue=t.value,t.fieldCd==a.fieldCd.JobStartDate||t.fieldCd==a.fieldCd.JobEndDate||t.fieldCd==a.fieldCd.GraduationStartDate||t.fieldCd==a.fieldCd.GraduationEndDate){if(d.dateTimeValue="",t.value){var p=t.value.indexOf("/")>-1?"/":" ",f=t.value.split(p);if(2==f.length&&f[0]&&f[1]){var g=new Date(P(f[0],n)+"/5/"+f[1]);d.dateTimeValue=g}}if(r&&t.dateObj){var h=l.cutomDateFormat(r,t.dateObj,n);d.docDataInfo=h}}if(t.fieldCd==a.fieldCd.SocialLink){e=e.filter(function(e){return e.fieldCD!==a.fieldCd.SocialLink});var C=1;t.value.forEach(function(t){if(t.socialTypeValue&&t.socialTypeValue.trim()){var n=new i.DocData({id:l.guid(),paragraphID:s,userId:c,fieldCD:a.fieldCd.SocialLink,charValue:t.socialTypeValue,category:"Social",docDataInfo:t.socialTypeCode,index:C});e.push(n),C++}})}else e[u]=d}),e;return e},t.updateDocumentParagraph=function(e,t,n){var a=JSON.parse(JSON.stringify(e)),r=a.sections.map(function(e){return e.id}).indexOf(t),i=Object.assign({},a.sections[r]),o=i.paragraphs.map(function(e){return e.id}).indexOf(n.id);return i.paragraphs[o]=Object.assign({},n),a.sections[r]=i,{newDocument:a,section:i}},t.updateDocumentSkinandStyles=function(e,t,n,a){var r=u(e,t),i=l.resetDefaultValues(t,e.docStyles,n);r=d(r,i),a||r.sections.map(function(e){return e.sectionContainerIndex=0,e});return r},t.isEmptyParagraphExists=function(e){var t=!1;return e.paragraphs.map(function(e,n){e.docDatas.filter(function(e){return""!=e.charValue}).length<1&&(t=!0)}),t},t.addUpdateDocResponses=function(e,t){var n=Object.assign([],e.docResponses);return t.forEach(function(t){var a=n.findIndex(function(e){return e.questionCD==t.questionCD}),r={documentID:e.id,questionCD:t.questionCD,responseCD:t.responseCD};t.responseCD?a>=0?n.splice(a,1,r):n.push(r):n.splice(a,1)}),e=c(e,{docResponses:{$set:n}})},t.addUpdateDocResponsesForQID=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=Object.assign([],e.docResponses);return t.forEach(function(t){var r=n?a.findIndex(function(e){return e.questionID==t.questionID}):a.findIndex(function(e){return e.questionCD==t.questionCD}),i={documentID:e.id,surveyResponseId:t.responseID,responseCD:t.responseCD,questionID:t.questionID,questionCD:t.questionCD};t.responseCD?r>=0?a.splice(r,1,i):a.push(i):a.splice(r,1)}),e=c(e,{docResponses:{$set:a}})},t.setDocumentPreferences=function(e,t){var n=JSON.parse(JSON.stringify(e));return n.preferences=t,n},t.updateDocumentWithSections=function(e,t){var n=JSON.parse(JSON.stringify(e));return n.sections=t,n},t.addUpdateDocDataField=function(e,t,n,a){var r=void 0,o=void 0;-1!=(r=e.findIndex(function(e){return e.fieldCD==t}))?((o=e[r]).charValue=n,e[r]=o):(o=new i.DocData({userId:a,fieldCD:t,charValue:n}),e.push(o));return e},t.UpdateProfileSection=function(e){var t=e,n=void 0;if(e&&e.sections&&e.sections.length>0){var r=e.sections.find(function(e){return e.sectionTypeCD==a.sectionTypeCd.Name}),i=e.sections.find(function(e){return e.sectionTypeCD==a.sectionTypeCd.Contact}),o=e.sections.find(function(e){return e.sectionTypeCD==a.sectionTypeCd.NameContact}),l=[],c=o&&o.paragraphs&&o.paragraphs.length>0?o.paragraphs[0]:v(o);r&&o&&r.paragraphs&&r.paragraphs.length>0&&(l=[].concat(s(l),s(r.paragraphs[0].docDatas))),i&&i.paragraphs&&i.paragraphs.length>0&&(l=[].concat(s(l),s(i.paragraphs[0].docDatas))),c&&c.docDatas&&c.docDatas.find(function(e){return e.fieldCD==a.fieldCd.PhotoURL})&&(l=[].concat(s(l),[c.docDatas.find(function(e){return e.fieldCD==a.fieldCd.PhotoURL})])),l&&l.length>0&&(n=p(e,o.id,c.id,l,c.index)),n&&n.document&&(t=n.document)}return t},t.GetDefaultSectionContainerIndexes=N,t.GetSectionContainerIndex=L,t.GetOrderedSectionsArray=function(e,t){var n=void 0,a=[],r=["PICT","NAME","CNTC","PRFL"];t&&t.length>0&&r.push.apply(r,s(t));(n=e.filter(function(e){return r.includes(e.sectionTypeCD)})).sort(function(e,t){return r.indexOf(e.sectionTypeCD)-r.indexOf(t.sectionTypeCD)}),n&&n.length>0&&n.forEach(function(e,t){e.index=t+1});var i=n.length;(a=e.filter(function(e){return!r.includes(e.sectionTypeCD)}))&&a.length>0&&a.forEach(function(e,t){e.index=i+t+1});return[].concat(s(n),s(a))},t.addMissingDocDatas=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return D(e,n).map(function(e){-1==t.findIndex(function(t){return t.fieldCD==e.fieldCD})&&t.push(e)}),t},t.portLegacyDocument=function(e,t,n,r,i,o){var s=e,l=void 0;if(s&&s.sections&&s.sections.length>0){var c=r(n),u=i(n),d=s.sections.find(function(e){return e.sectionTypeCD==a.sectionTypeCd.Name}),f=s.sections.find(function(e){return e.sectionTypeCD==a.sectionTypeCd.Contact}),C=s.sections.find(function(e){return e.sectionTypeCD==a.sectionTypeCd.Photo}),S=s.sections.find(function(e){return e.sectionTypeCD==a.sectionTypeCd.NameContact}),m=s.sections.find(function(e){return e.sectionTypeCD==a.sectionTypeCd.Experience}),D=s.sections.find(function(e){return e.sectionTypeCD==a.sectionTypeCd.Work_History}),T=[],P=0;void 0!==C&&C||(P=L("PICT",c,u),C=y("PICT",1,s.id,t,P,o),s.sections.splice(0,0,C)),void 0!==d&&d||(P=L("NAME",c,u),d=y("NAME",2,s.id,t,P,o),s.sections.splice(1,0,d)),void 0!==f&&f||(P=L("CNTC",c,u),f=y("CNTC",3,s.id,t,P,o),s.sections.splice(2,0,f)),s.sections=h(s.sections);var N=C&&C.paragraphs&&C.paragraphs.length>0?C.paragraphs[0]:v(C,t),b=d&&d.paragraphs&&d.paragraphs.length>0?d.paragraphs[0]:v(d,t),R=f&&f.paragraphs&&f.paragraphs.length>0?f.paragraphs[0]:v(f,t);C&&N&&S&&S.paragraphs&&S.paragraphs.length>0&&((T=S.paragraphs[0].docDatas.filter(function(e){return"PURL"==e.fieldCD}))&&T.length>0&&(l=p(s,C.id,N.id,T,N.index)),s=l&&l.document?l.document:s),d&&b&&S&&S.paragraphs&&S.paragraphs.length>0&&((T=S.paragraphs[0].docDatas.filter(function(e){return"FNAM"==e.fieldCD||"LNAM"==e.fieldCD}))&&T.length>0&&(l=p(s,d.id,b.id,T,b.index)),s=l&&l.document?l.document:s),f&&R&&S&&S.paragraphs&&S.paragraphs.length>0&&((T=S.paragraphs[0].docDatas.filter(function(e){return"FNAM"!=e.fieldCD&&"LNAM"!=e.fieldCD&&"PURL"!=e.fieldCD}))&&T.length>0&&(l=p(s,f.id,R.id,T,R.index)),s=l&&l.document?l.document:s),m&&D&&D.paragraphs&&D.paragraphs.length>0&&D.paragraphs.map(function(e){l=p(s,m.id,"",e.docDatas,-1),s=l&&l.document?l.document:s}),D&&(s=g(s,D.id))}return s},t.DeleteEmptyParagrahFromSection=function(e){return(e=JSON.parse(JSON.stringify(e))).paragraphs.map(function(t,n){t.docDatas.filter(function(e){return""!=e.charValue}).length<1&&(e.paragraphs.splice(n,1),e.paragraphs=h(e.paragraphs))}),e},t.trackTTCEvents=function(e,t,n){var a=[];if(n&&n.length>0)return n.forEach(function(n){var r=new i.TrackRequest({eventType:"ttc",eventSubType:"clicked",eventContext:"track",portalCD:t,userID:e,actionType:0,eventDetails:n});a.push(r)}),a},t.setNewDocIdInDocument=function(e,t){var n=JSON.parse(JSON.stringify(e)),a=t||l.guid();return n.id=a,n.docStyles=n.docStyles.map(function(e){return e.documentID=a,e}),n.preferences=n.preferences.map(function(e){return e.documentID=a,e}),n.sections=n.sections.map(function(e){return e.documentID=a,e}),n},t.SetDefaultSectionContainerIndexes=function(e,t){var n=Object.assign([],t.sections),a=N(e,t.sections);n&&n.length>0&&a&&a.length>0&&n.forEach(function(e){var t=a.find(function(t){return t.sectionCode==e.sectionTypeCD});t&&(e.sectionContainerIndex=t.value)});return t.sections=n,t},t.updateSkillSection=function(e,t){var n=e.findIndex(function(e){return e.sectionTypeCD==a.sectionTypeCd.Skills}),i=e[n];if(i&&i.paragraphs&&i.paragraphs.length>0){var o=i.paragraphs[0],s=r.getCharValue(i.paragraphs[0].docDatas,a.fieldCd.SkillsCollection_1),c=r.getCharValue(i.paragraphs[0].docDatas,a.fieldCd.SkillsCollection_2),u=r.getCharValue(i.paragraphs[0].docDatas,a.fieldCd.SkillsCollection_3),d=l.splitHTML((s+c+u).replace(/<ul>|<\/ul>|\n/g,""),t?3:2);d.first=d.first?b(d.first):"",d.second=d.second?b(d.second):"";var p=o.docDatas.findIndex(function(e){return e.fieldCD==a.fieldCd.SkillsCollection_1}),f=o.docDatas.findIndex(function(e){return e.fieldCD==a.fieldCd.SkillsCollection_2});if(o.docDatas[p].charValue=d.first,o.docDatas[f].charValue=d.second,t){r.fieldExists(o.docDatas,a.fieldCd.SkillsCollection_3)||o.docDatas.push(T(a.fieldCd.SkillsCollection_3));var g=o.docDatas.findIndex(function(e){return e.fieldCD==a.fieldCd.SkillsCollection_3});d.third=d.third?b(d.third):"",o.docDatas[g].charValue=d.third}else o.docDatas=R(o.docDatas,a.fieldCd.SkillsCollection_3);i.paragraphs[0]=o,e[n]=i}return e},t.updateAccmSection=function(e,t){var n=e.findIndex(function(e){return e.sectionTypeCD==a.sectionTypeCd.Accomplishments});if(n>-1){var i=e[n],o=i.paragraphs[0];if(i&&i.paragraphs&&i.paragraphs.length>0){var s=r.getCharValue(i.paragraphs[0].docDatas,a.fieldCd.FreeForm),c=r.getCharValue(i.paragraphs[0].docDatas,a.fieldCd.FreeForm_1),u=l.splitHTML((s+c).replace(/<ul>|<\/ul>|\n/g,""),t?2:1);u.first=u.first?b(u.first):"";var d=o.docDatas.findIndex(function(e){return e.fieldCD==a.fieldCd.FreeForm});if(o.docDatas[d].charValue=u.first,t){r.fieldExists(o.docDatas,a.fieldCd.FreeForm_1)||o.docDatas.push(T(a.fieldCd.FreeForm_1));var p=o.docDatas.findIndex(function(e){return e.fieldCD==a.fieldCd.FreeForm_1});u.second=u.second?b(u.second):"",o.docDatas[p].charValue=u.second}else o.docDatas=R(o.docDatas,a.fieldCd.FreeForm_1);i.paragraphs[0]=o,e[n]=i}}return e},t.GetProperHtml=b,t.RemoveDocData=R,t.getAlignmentOptions=function(e){var t=[];if(e){var n=e.querySelectorAll("alignOption");Array.prototype.slice.call(n).forEach(function(e){if(e&&e.attributes){var n=e.attributes.options?e.attributes.options.value:"",a=e.attributes.sections?e.attributes.sections.value:"",r=a?a.toString().split(","):[];Array.prototype.slice.call(r).forEach(function(e){t.push({sectionCD:e,optAlignment:n})})}})}return t},t.getDefaultAlignment=E,t.getSectionPreference=F,t.getActiveSectionAlignmentValue=function(e,t){var n=null;if(e){var a=JSON.parse(JSON.stringify(e)),r=F(a,"textAlign");r?r.value&&(n=r.value):t&&(n=E(t,a.sectionTypeCD))}return n},t.getSignatureAlignmentValues=function(e,t){var n="1",r="0",i="0";switch(e){case"L":n="1",r="0",i="0";break;case"C":n="0",r="1",i="0";break;case"R":n="0",r="0",i="1";break;default:n=t&&t.docDatas&&!l.isNullOrWhitespace(l.getCharValue(t.docDatas,a.fieldCd.HorizontalLeft))?l.getCharValue(t.docDatas,a.fieldCd.HorizontalLeft):"1",r=t&&t.docDatas&&!l.isNullOrWhitespace(l.getCharValue(t.docDatas,a.fieldCd.HorizontalMid))?l.getCharValue(t.docDatas,a.fieldCd.HorizontalMid):"0",i=t&&t.docDatas&&!l.isNullOrWhitespace(l.getCharValue(t.docDatas,a.fieldCd.HorizontalRight))?l.getCharValue(t.docDatas,a.fieldCd.HorizontalRight):"0"}return{signHLeft:n,signHMid:r,signHRight:i}},t.AddUpdateSectionPreference=function(e,t,n){if(e){var a=JSON.parse(JSON.stringify(e));a.preferences=a.preferences||[];var r=a.preferences.findIndex(function(e){return e.typeCD==t});if(r>-1)a.preferences[r].value=n;else{var i={typeCD:t,value:n};a.preferences.push(i)}return a}return null},t.updateDocumentSection=function(e,t){if(e){var n=JSON.parse(JSON.stringify(e)),a=n.sections.findIndex(function(e){return e.sectionTypeCD==t.sectionTypeCD});return a>-1&&(n.sections[a]=t),n}return null},t.isAlignmentAvailableInFormattingPanel=function(e,t){var n=!1;if(e&&t){var a=e.indexOf(t);a>-1&&(n=!0)}return n},t.isAlignmentAvailable=function(e,t,n){var r=!0;if(e&&t&&n){var i=null;n==a.AlignmentType.LEFT?i=e.left:n==a.AlignmentType.RIGHT?i=e.right:n==a.AlignmentType.CENTER?i=e.center:n==a.AlignmentType.JUSTIFY&&(i=e.justify),i&&i.length>0&&i.indexOf(t)>-1&&(r=!1)}return r},t.UpdateFootFromSignatureSection=function(e){var t=e,n=void 0;if(e&&e.sections&&e.sections.length>0){var r=e.sections.find(function(e){return e.sectionTypeCD==a.sectionTypeCd.Signature}),i=e.sections.find(function(e){return e.sectionTypeCD==a.sectionTypeCd.Foot}),o=[],l=void 0;if(r&&r.paragraphs&&r.paragraphs.length>0&&(l=r.paragraphs[0]),l&&l.docDatas&&l.docDatas.length>0){var c=l.docDatas.filter(function(e){return e.fieldCD==a.fieldCd.SignatureDate||e.fieldCD==a.fieldCd.SignaturePlace||e.fieldCD==a.fieldCd.FreeFormText});o=[].concat(s(o),s(c))}o&&o.length>0&&i&&(n=p(e,i.id,i.id,o,i.index)),n&&n.document&&(t=n.document)}return t},t.SanitizeSectionByRemovingEmptyPara=function(e){e&&e.paragraphs&&e.paragraphs.map(function(t,n){var a=t.docDatas.filter(function(e){return""!=e.charValue}).length<1;a&&(e.paragraphs.splice(n,1),e.paragraphs=h(e.paragraphs))});return e},t.addUpdateParagraphOnSection=function(e,t,n,a,r){var o=JSON.parse(JSON.stringify(t));if(!o)return null;var s=new i.Paragraph({id:n||l.guid(),sectionID:o.id,index:r>0?r:o.paragraphs.length});s.docDatas=a.map(function(t){return t.id=l.guid(),t.paragraphID=s.id,t.userId=e,t});var c=s.index;n&&(c=o.paragraphs.findIndex(function(e){return e.id==n}));return o.paragraphs.splice(c,n?1:0,s),o.paragraphs=h(o.paragraphs,!0,l.isMultiPara(o.sectionTypeCD)),o},t.GetLocationFromDocument=function(e){var t="";return(t=function(e){var t="";if(e&&e.sections){var n=e.sections.filter(function(e){return"CNTC"===e.sectionTypeCD});if(n&&n.length){var a=n[0].paragraphs;a&&a.length&&a.forEach(function(e){if(e.docDatas&&e.docDatas.length){var n=e.docDatas.filter(function(e){return"CITY"===e.fieldCD})?e.docDatas.filter(function(e){return"CITY"===e.fieldCD})[0]:null,a=null!=n&&null!==n.charValue?n.charValue:"",r=e.docDatas.filter(function(e){return"STAT"===e.fieldCD})?e.docDatas.filter(function(e){return"STAT"===e.fieldCD})[0]:null,i=null!=r&&null!==r.charValue?r.charValue:"";""!==a&&(t=a),""!==a&&""!==i&&(t=a+","+i),""===a&&""!==i&&(t=i)}})}}return t}(e))&&t.trim().length?t:null},t.GetLatestJobTitleFromDocument=function(e){var t="";return(t=function(e){var t="";if(e&&e.sections){var n=e.sections.filter(function(e){return"EXPR"==e.sectionTypeCD});if(n&&n.length){var a=n[0].paragraphs,r=[];a&&a.length&&a.forEach(function(e){if(e.docDatas&&e.docDatas.length){var t=e.docDatas.filter(function(e){return"JTIT"==e.fieldCD})[0],n=null!=t?t.charValue:"",a=e.docDatas.filter(function(e){return"JSTD"==e.fieldCD})[0],i=null!=a?a.dateTimeValue:"";if(n&&i){var o={title:n,date:i};r.push(o)}}}),t=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n="",a=e.sort(function(e,n){var a=new Date(e.date),r=new Date(n.date);return t?r-a:a-r});return a&&a.length&&(n=a[0].title),n}(r)}}return t}(e))&&t.trim().length?t:null};var a=o(n(1)),r=o(n(2)),i=n(5);function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function s(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var l=n(0),c=(n(4),n(10));function u(e,t){var n=JSON.parse(JSON.stringify(e));return n&&(n.skinCD=t),n}function d(e,t){var n=JSON.parse(JSON.stringify(e));return n&&(n.docStyles=t),n}function p(e,t,n,a,r){var o=JSON.parse(JSON.stringify(e)),s=Object.assign({},C(o,t));if(!s)return null;var c=new i.Paragraph({id:n||l.guid(),sectionID:s.id,index:r>0?r:s.paragraphs.length});c.docDatas=a.map(function(e){return e.id=l.guid(),e.paragraphID=c.id,e.userId=o.userId,e});var u=c.index;n&&(u=s.paragraphs.findIndex(function(e){return e.id==n})),s.paragraphs.splice(u,n?1:0,c),s.paragraphs=h(s.paragraphs,!0,l.isMultiPara(s.sectionTypeCD));var d={},p=o.sections.findIndex(function(e){return e.id==t});return o.sections[p]=s,d.document=o,d.activeSection=s,d.activePara=c,d}function f(e,t,n,a){var r=Object.assign([],e.paragraphs);return(r=a(r,t,n)).forEach(function(e,t){e.index=t+1}),e.paragraphs=r,e}function g(e,t){var n=JSON.parse(JSON.stringify(e)),a=n.sections.findIndex(function(e){return e.id==t});return-1==a?n:(n.sections.splice(a,1),n.sections=h(n.sections),n)}function h(e,t,n){return e.map(function(e,a){return e.index=t&&n?a:a+1,e})}function C(e,t){if(e){var n=e.sections;return void 0==n?null:n.find(function(e){return e.id==t})}}function S(e,t,n){return m(C(e,t),n)}function m(e,t){return e?e.paragraphs.find(function(e){return e.id==t}):null}function D(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=[];return l.isFRFM(e)?n.push(T(a.fieldCd.FreeFormat)):e==a.sectionTypeCd.Education?(n.push(T(a.fieldCd.DegreeEarned)),n.push(T(a.fieldCd.FieldOfExpertise)),n.push(T(a.fieldCd.SchoolName)),n.push(T(a.fieldCd.SchoolCity)),n.push(T(a.fieldCd.SchoolState)),n.push(T(a.fieldCd.SchoolCountry)),n.push(T(a.fieldCd.GraduationYear)),n.push(T(a.fieldCd.SchoolLocation)),n.push(T(a.fieldCd.FreeFormat)),n.push(T(a.fieldCd.GraduationStartDate)),n.push(T(a.fieldCd.GraduationEndDate)),n.push(T(a.fieldCd.EducationDegreeType)),n.push(T(a.fieldCd.EducationGraduate)),n.push(T(a.fieldCd.EnrollStatus)),n.push(T(a.fieldCd.GraduationDateFormat)),n.push(T(a.fieldCd.GraduationHonours)),n.push(T(a.fieldCd.GradCurrentlyEnrolled)),n.push(T(a.fieldCd.GradePointAverage))):e==a.sectionTypeCd.Executive_Summary?(n.push(T(a.fieldCd.FreeFormat)),n.push(T(a.fieldCd.SkillsCollection_1)),n.push(T(a.fieldCd.SkillsCollection_2))):e==a.sectionTypeCd.Experience||e==a.sectionTypeCd.Military_Experience?(n.push(T(a.fieldCd.JobStartDate)),n.push(T(a.fieldCd.JobEndDate)),n.push(T(a.fieldCd.Company)),n.push(T(a.fieldCd.JobTitle)),n.push(T(a.fieldCd.JobCity)),n.push(T(a.fieldCd.JobState)),n.push(T(a.fieldCd.JobCountry)),n.push(T(a.fieldCd.JobDescription)),n.push(T(a.fieldCd.TypeOfContract)),n.push(T(a.fieldCd.JobDateFormat))):e==a.sectionTypeCd.Work_History?(n.push(T(a.fieldCd.JobStartDate)),n.push(T(a.fieldCd.JobEndDate)),n.push(T(a.fieldCd.Company)),n.push(T(a.fieldCd.JobTitle)),n.push(T(a.fieldCd.JobCity)),n.push(T(a.fieldCd.JobState))):e==a.sectionTypeCd.Executive_Experience?(n.push(T(a.fieldCd.Company)),n.push(T(a.fieldCd.CompanyDescription)),n.push(T(a.fieldCd.JobTitle)),n.push(T(a.fieldCd.JobCity)),n.push(T(a.fieldCd.JobState)),n.push(T(a.fieldCd.JobStartDate)),n.push(T(a.fieldCd.JobEndDate)),n.push(T(a.fieldCd.JobDescription))):e==a.sectionTypeCd.Contact?(n.push(T(a.fieldCd.Street)),n.push(T(a.fieldCd.State)),n.push(T(a.fieldCd.City)),n.push(T(a.fieldCd.ZipCode)),n.push(T(a.fieldCd.Country)),n.push(T(a.fieldCd.HomePhone)),n.push(T(a.fieldCd.CellPhone)),n.push(T(a.fieldCd.Email)),t&&n.push(T(a.fieldCd.supplementaryInfo)),n.push(T(a.fieldCd.SocialWebsiteLink))):e==a.sectionTypeCd.Name?(n.push(T(a.fieldCd.FirstName)),n.push(T(a.fieldCd.LastName))):e==a.sectionTypeCd.Skills?(n.push(T(a.fieldCd.SkillsCollection_1)),n.push(T(a.fieldCd.SkillsCollection_2)),n.push(T(a.fieldCd.RatingValue)),n.push(T(a.fieldCd.RatingText))):e==a.sectionTypeCd.External_Links?(n.push(T(a.fieldCd.External_Link1)),n.push(T(a.fieldCd.External_Link2)),n.push(T(a.fieldCd.External_Link3))):e==a.sectionTypeCd.ExecutiveResumeTitle?(n.push(T(a.fieldCd.MainTitle)),n.push(T(a.fieldCd.SubTitle1)),n.push(T(a.fieldCd.SubTitle2)),n.push(T(a.fieldCd.SubTitle3))):e==a.sectionTypeCd.Technical_Skills?(n.push(T(a.fieldCd.Skill)),n.push(T(a.fieldCd.SkillRating)),n.push(T(a.fieldCd.NumberOfYearsSkillUsed)),n.push(T(a.fieldCd.SkillLastUsed))):e==a.sectionTypeCd.ResumeTitle?n.push(T(a.fieldCd.ResumeTitle)):e==a.sectionTypeCd.Photo?n.push(T(a.fieldCd.PhotoURL)):e==a.sectionTypeCd.NameContact?(n.push(T(a.fieldCd.FirstName)),n.push(T(a.fieldCd.LastName)),n.push(T(a.fieldCd.DocumentTitle)),n.push(T(a.fieldCd.HomePhone)),n.push(T(a.fieldCd.CellPhone)),n.push(T(a.fieldCd.Email)),n.push(T(a.fieldCd.supplementaryInfo)),n.push(T(a.fieldCd.PhotoURL))):e==a.sectionTypeCd.Signature?(n.push(T(a.fieldCd.SignatureName)),n.push(T(a.fieldCd.SignatureURL)),n.push(T(a.fieldCd.HorizontalLeft)),n.push(T(a.fieldCd.HorizontalMid)),n.push(T(a.fieldCd.HorizontalRight)),n.push(T(a.fieldCd.SignatureDate)),n.push(T(a.fieldCd.SignaturePlace)),n.push(T(a.fieldCd.SignatureFontFamily)),n.push(T(a.fieldCd.SignatureFontSize)),n.push(T(a.fieldCd.SignatureFontStyle)),n.push(T(a.fieldCd.SignatureFontColor)),n.push(T(a.fieldCd.SignatureHeight)),n.push(T(a.fieldCd.SignatureWidth)),n.push(T(a.fieldCd.SignatureCategory)),n.push(T(a.fieldCd.SignatureContrast))):e==a.sectionTypeCd.Softwares?(n.push(T(a.fieldCd.FreeForm)),n.push(T(a.fieldCd.RatingValue))):e==a.sectionTypeCd.Overview?(n.push(T(a.fieldCd.NumberValue)),n.push(T(a.fieldCd.FreeForm))):e==a.sectionTypeCd.Button?(n.push(T(a.fieldCd.BtnText)),n.push(T(a.fieldCd.BtnUrl))):e==a.sectionTypeCd.Foot?(n.push(T(a.fieldCd.SignatureDate)),n.push(T(a.fieldCd.SignaturePlace))):e==a.sectionTypeCd.Language&&(n.push(T(a.fieldCd.FreeForm)),n.push(T(a.fieldCd.RatingGrade)),n.push(T(a.fieldCd.RatingText)),n.push(T(a.fieldCd.RatingValue))),n}function T(e){return new i.DocData({fieldCD:e,charValue:""})}function v(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=D(e.sectionTypeCD,n),r=new i.Paragraph({id:l.guid(),sectionID:e.id,index:0});return r.docDatas=a.map(function(e){return e.id=l.guid(),e.paragraphID=r.id,e.userId=t,e}),r}function y(e,t,n,a){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=arguments[5],s=void 0;o&&(s=o.filter(function(t){return t.sectionTypeCd==e})[0]);var c=new i.Section({id:l.guid(),documentID:n,docZoneTypeCD:s?s.doczonetypecd:"",index:t,name:s?s.name:"",paragraphs:[],sectionTypeCD:e,topPadding:0,sectionContainerIndex:r}),u=v(c,a);return c.paragraphs[0]=u,c}function P(e,t){return isNaN(e)&&t&&t.shortMonth?t.shortMonth.indexOf(e):e}function N(e,t){var n=[],a=Object.assign([],t);return a&&a.forEach(function(t){var a=L(t.sectionTypeCD,e),r={sectionCode:t.sectionTypeCD,key:t.sectionId,value:a};n.push(r)}),n}function L(e,t,n){var r=0,i=Array.from(t&&t.querySelectorAll("container")),o=[];if((n=!!(n||i.length>0))&&(o=i.sort(function(e,t){return parseInt(e.getAttribute("index"))-parseInt(t.getAttribute("index"))})),n){var s=!(!t||!t.querySelector("#SECTION_"+e));if(e!=a.sectionTypeCd.Photo&&e!=a.sectionTypeCd.NameContact&&e!=a.sectionTypeCd.Name&&e!=a.sectionTypeCd.Contact||s){var l=o.find(function(t){return-1!==t.getAttribute("value").toLowerCase().indexOf(e.toLowerCase())});l?r=parseInt(l.getAttribute("index")):(l=o.find(function(e){return"*"==e.getAttribute("value")}),r=parseInt(l.getAttribute("index")))}else r=i?i.length+1:0}return r}function b(e){return"<ul>"+e.replace(/<ul>/g,"").replace(/<\/ul>/g,"")+"</ul>"}function R(e,t){var n=e.findIndex(function(e){return e.fieldCD==t});return n>-1&&e.splice(n,1),e}function E(e,t){var n=a.AlignmentType.LEFT;if(e){var r=e.querySelectorAll("aligndefaults");Array.prototype.slice.call(r).forEach(function(e){e&&e.attributes&&Array.prototype.slice.call(e.attributes).forEach(function(e){if(e&&e.value&&e.value.indexOf(t)>-1){var r=e.name?e.name.toString().toLowerCase():"";n="c"==r[0]?a.AlignmentType.CENTER:"r"==r[0]?a.AlignmentType.RIGHT:"j"==r[0]?a.AlignmentType.JUSTIFY:a.AlignmentType.LEFT}else;})})}return n}function F(e,t){var n=null,a=JSON.parse(JSON.stringify(e));if(a&&a.preferences){var r=a.preferences.findIndex(function(e){return e.typeCD==t});r>-1&&(n=a.preferences[r])}return n}},function(e,t,n){"use strict";var a=n(0),r=n(2),i=n(1),o=n(6),s=n(3);e.exports={CommonHelper:a,FieldHelper:r,TypeCodes:i,DocumentHelper:o,Options:s}},function(e,t){e.exports=__webpack_require__(62)},function(e,t){e.exports=__webpack_require__(10)},function(e,t){e.exports=__webpack_require__(800)}]);

/***/ }),

/***/ 799:
/***/ (function(module, exports) {

module.exports=function(t){var i={};function e(o){if(i[o])return i[o].exports;var s=i[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,e),s.l=!0,s.exports}return e.m=t,e.c=i,e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";var o=e(1),s=e(2),n=e(3),a=e(4),r=e(5),d=e(6),c=e(7),h=e(8),u=e(9),l=e(10),v=e(11),p=e(12);t.exports={DocData:s,Content:o,Employer:n,JobTitle:a,Paragraph:r,School:d,Section:c,Survey:h,SurveyResponse:u,User:l,TrackRequest:v,UploadDocument:p}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.htmlString,o=void 0===e?"":e,s=i.identifier,n=void 0===s?"":s,a=i.searchItemType,r=void 0===a?"":a,d=i.contentItemUID,c=void 0===d?"":d,h=i.contentTypeCD,u=void 0===h?"":h,l=i.documentTypeCD,v=void 0===l?"":l,p=i.isCore,f=void 0===p?"":p,D=i.tagText,y=void 0===D?"":D,m=i.tagType,C=void 0===m?"":m;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.HTMLString=o,this.identifier=n,this.searchItemType=r,this.contentItemUID=c,this.ContentTypeCD=u,this.DocumentTypeCD=v,this.isCore=f,this.tagText=y,this.tagType=C}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.id,o=void 0===e?"":e,s=i.paragraphID,n=void 0===s?"":s,a=i.fieldCD,r=void 0===a?"":a,d=i.userId,c=void 0===d?"":d,h=i.charValue,u=void 0===h?"":h,l=i.dateTimeValue,v=void 0===l?"":l,p=i.docDataInfo,f=void 0===p?"":p,D=i.index,y=void 0===D?1:D,m=i.category,C=void 0===m?"":m,T=i.isValid,I=void 0===T||T,x=i.errorMessage,g=void 0===x?"":x;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=o,this.paragraphID=n,this.fieldCD=r,this.userId=c,this.charValue=u,this.dateTimeValue=v,this.isValid=I,this.category=C,this.docDataInfo=f,this.index=y,this.errorMessage=g}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.displayValue,o=void 0===e?"":e,s=i.selectedValue,n=void 0===s?"":s,a=i.address,r=void 0===a?{city:"",state:"",stateCD:"",countryCD:"",country:""}:a,d=i.sno,c=void 0===d?"":d;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.displayValue=o,this.selectedValue=n,this.address=r,this.sno=c}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.displayValue,o=void 0===e?"":e,s=i.selectedValue,n=void 0===s?"":s,a=i.rank,r=void 0===a?"":a,d=i.relatedJobTitles,c=void 0===d?[]:d,h=i.occupation,u=void 0===h?[]:h,l=i.isAmbiguous,v=void 0===l?"":l,p=i.majorFunction,f=void 0===p?"":p,D=i.minorFunction,y=void 0===D?"":D,m=i.riasec,C=void 0===m?"":m,T=i.primaryJobTitle,I=void 0===T?"":T,x=i.selectedJobGender,g=void 0===x?"":x;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.displayValue=o,this.selectedValue=n,this.rank=r,this.relatedJobTitles=c,this.occupation=u,this.isAmbiguous=v,this.majorFunction=f,this.minorFunction=y,this.riasec=C,this.primaryJobTitle=I,this.selectedJobGender=g}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.id,o=void 0===e?"":e,s=i.sectionID,n=void 0===s?"":s,a=i.index,r=void 0===a?0:a,d=i.paragraphTemplateCD,c=void 0===d?"":d,h=i.topPadding,u=void 0===h?0:h,l=i.docDatas,v=void 0===l?[]:l;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=o,this.sectionID=n,this.index=r,this.paragraphTemplateCD=c,this.docDatas=v,this.topPadding=u}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.typeAheadDisplayName,o=void 0===e?"":e,s=i.name,n=void 0===s?"":s,a=i.city,r=void 0===a?"":a,d=i.state,c=void 0===d?"":d,h=i.stateCD,u=void 0===h?"":h,l=i.country,v=void 0===l?"":l;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.typeAheadDisplayName=o,this.country=v,this.city=r,this.state=c,this.name=n,this.stateCD=u}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.id,o=void 0===e?"":e,s=i.documentID,n=void 0===s?"":s,a=i.index,r=void 0===a?"":a,d=i.sectionTypeCD,c=void 0===d?"":d,h=i.name,u=void 0===h?"":h,l=i.docZoneTypeCD,v=void 0===l?"":l,p=i.topPadding,f=void 0===p?0:p,D=i.paragraphs,y=void 0===D?[]:D,m=i.sectionContainerIndex,C=void 0===m?0:m;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=o,this.documentID=n,this.index=r,this.sectionTypeCD=c,this.name=u,this.docZoneTypeCD=v,this.paragraphs=y,this.topPadding=f,this.sectionContainerIndex=C}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.questionID,o=void 0===e?0:e,s=i.surveyID,n=void 0===s?0:s,a=i.documentID,r=void 0===a?0:a,d=i.userUID,c=void 0===d?0:d,h=i.surveyResponses,u=void 0===h?[]:h;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.SurveyID=n,this.QuestionID=o,this.SurveyResponses=u,this.UserUID=c,this.DocumentID=r}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.displayText,o=void 0===e?"":e,s=i.responseCD,n=void 0===s?"":s,a=i.responseID,r=void 0===a?"":a,d=i.sortOrder,c=void 0===d?0:d;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.DisplayText=o,this.ResponseCD=n,this.ResponseID=r,this.SortOrder=c}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.token,o=void 0===e?"":e,s=i.firstName,n=void 0===s?"":s,a=i.lastName,r=void 0===a?"":a,d=i.emailAddress,c=void 0===d?"":d,h=i.phoneNumber,u=void 0===h?"":h,l=i.mobileNumber,v=void 0===l?"":l,p=i.userUID,f=void 0===p?"":p,D=i.partyID,y=void 0===D?0:D,m=i.sessionIdentity,C=void 0===m?0:m,T=i.role,I=void 0===T?"":T,x=i.city,g=void 0===x?"":x,w=i.postalcd,E=void 0===w?"":w,S=i.state,b=void 0===S?"":S,N=i.country,U=void 0===N?"":N,k=i.reset_passWord,P=void 0!==k&&k,A=(i.portalcd,i.createdOn),R=void 0===A?new Date:A,V=i.socialToken,O=void 0===V?"":V,J=i.PUID,M=void 0===J?"":J,F=i.addressLine1,j=void 0===F?"":F,L=i.userOptins,_=void 0===L?[]:L,q=i.userPreferences,z=void 0===q?[]:q;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.Token=o,this.FirstName=n,this.LastName=r,this.EmailAddress=c,this.PhoneNumber=u,this.MobileNumber=v,this.UserUID=f,this.PartyID=y,this.SessionIdentity=C,this.Role=I,this.City=g,this.PostalCD=E,this.State=b,this.Country=U,this.Reset_Password=P,this.PortalCD=this.portalcd,this.CreatedOn=R,this.SocialToken=O,this.PUID=M,this.AddressLine1=j,this.UserOptins=_,this.UserPreferences=z}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.eventType,o=void 0===e?"ttc":e,s=i.eventSubType,n=void 0===s?"clicked":s,a=i.eventContext,r=void 0===a?"track":a,d=i.portalCD,c=void 0===d?"":d,h=i.userID,u=void 0===h?"":h,l=i.actionType,v=void 0===l?0:l,p=i.clientCD,f=void 0===p?"":p,D=i.sourceAppUID,y=void 0===D?"":D,m=i.sourceAppCD,C=void 0===m?"":m,T=i.eventDetails,I=void 0===T?[]:T;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.EventType=o,this.EventSubType=n,this.EventContext=r,this.PortalCD=c,this.UserID=u,this.ActionType=v,this.EventDetails=I,this.ClientCD=f,this.SourceAppUID=y,this.SourceAppCD=C}},function(t,i,e){"use strict";t.exports=function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=i.data,o=void 0===e?[]:e,s=i.uploadFileTypeCD,n=void 0===s?"":s,a=i.templateID,r=void 0===a?0:a,d=i.cultureCD,c=void 0===d?"":d,h=i.sectionTypesToExclude,u=void 0===h?[]:h,l=i.sortJobExperience,v=void 0!==l&&l,p=i.sortEducation,f=void 0!==p&&p,D=i.preserveBullets,y=void 0!==D&&D,m=i.includeCanonSkills,C=void 0!==m&&m,T=i.skipTextExtractionAndSimilarityMeasure,I=void 0!==T&&T,x=i.portalID,g=void 0===x?0:x,w=i.uploadOriginalResumeSampleRate,E=void 0===w?0:w,S=i.uploadedResumeCounter,b=void 0===S?0:S,N=i.userUID,U=void 0===N?"":N,k=i.skinCD,P=void 0===k?"":k,A=i.portalCD,R=void 0===A?"":A,V=i.isIntl,O=void 0!==V&&V,J=i.firstName,M=void 0===J?"":J,F=i.lastName,j=void 0===F?"":F,L=i.localizedDocumentText,_=void 0===L?"":L,q=i.isChangeSectionNames,z=void 0!==q&&q,B=i.sectionNameTemplateId,G=void 0===B?0:B,Z=i.skinColor,H=void 0===Z?"":Z,Q=i.flowName,W=void 0===Q?"":Q,K=i.uploadMethod,X=void 0===K?"":K,Y=i.docStyles,$=void 0===Y?[]:Y,tt=i.documentName,it=void 0===tt?"":tt,et=i.country,ot=void 0===et?{}:et;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.data=o,this.uploadFileTypeCD=n,this.templateID=r,this.cultureCD=c,this.sectionTypesToExclude=u,this.sortJobExperience=v,this.sortEducation=f,this.preserveBullets=y,this.includeCanonSkills=C,this.skipTextExtractionAndSimilarityMeasure=I,this.portalID=g,this.uploadOriginalResumeSampleRate=E,this.uploadedResumeCounter=b,this.userUID=U,this.skinCD=P,this.portalCD=R,this.isIntl=O,this.firstName=M,this.lastName=j,this.localizedDocumentText=_,this.isChangeSectionNames=z,this.sectionNameTemplateId=G,this.skinColor=H,this.flowName=W,this.uploadMethod=X,this.docStyles=$,this.documentName=it,this.country=ot}}]);

/***/ }),

/***/ 800:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _assign = __webpack_require__(8);
var hasOwnProperty = {}.hasOwnProperty;

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

function shallowCopy(x) {
  if (Array.isArray(x)) {
    return x.concat();
  } else if (x && typeof x === 'object') {
    return _assign(new x.constructor(), x);
  } else {
    return x;
  }
}

var COMMAND_PUSH = '$push';
var COMMAND_UNSHIFT = '$unshift';
var COMMAND_SPLICE = '$splice';
var COMMAND_SET = '$set';
var COMMAND_MERGE = '$merge';
var COMMAND_APPLY = '$apply';

var ALL_COMMANDS_LIST = [
  COMMAND_PUSH,
  COMMAND_UNSHIFT,
  COMMAND_SPLICE,
  COMMAND_SET,
  COMMAND_MERGE,
  COMMAND_APPLY
];

var ALL_COMMANDS_SET = {};

ALL_COMMANDS_LIST.forEach(function(command) {
  ALL_COMMANDS_SET[command] = true;
});

function invariantArrayCase(value, spec, command) {
  invariant(
    Array.isArray(value),
    'update(): expected target of %s to be an array; got %s.',
    command,
    value
  );
  var specValue = spec[command];
  invariant(
    Array.isArray(specValue),
    'update(): expected spec of %s to be an array; got %s. ' +
      'Did you forget to wrap your parameter in an array?',
    command,
    specValue
  );
}

/**
 * Returns a updated shallow copy of an object without mutating the original.
 * See https://facebook.github.io/react/docs/update.html for details.
 */
function update(value, spec) {
  invariant(
    typeof spec === 'object',
    'update(): You provided a key path to update() that did not contain one ' +
      'of %s. Did you forget to include {%s: ...}?',
    ALL_COMMANDS_LIST.join(', '),
    COMMAND_SET
  );

  if (hasOwnProperty.call(spec, COMMAND_SET)) {
    invariant(
      Object.keys(spec).length === 1,
      'Cannot have more than one key in an object with %s',
      COMMAND_SET
    );

    return spec[COMMAND_SET];
  }

  var nextValue = shallowCopy(value);

  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
    var mergeObj = spec[COMMAND_MERGE];
    invariant(
      mergeObj && typeof mergeObj === 'object',
      "update(): %s expects a spec of type 'object'; got %s",
      COMMAND_MERGE,
      mergeObj
    );
    invariant(
      nextValue && typeof nextValue === 'object',
      "update(): %s expects a target of type 'object'; got %s",
      COMMAND_MERGE,
      nextValue
    );
    _assign(nextValue, spec[COMMAND_MERGE]);
  }

  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
    invariantArrayCase(value, spec, COMMAND_PUSH);
    spec[COMMAND_PUSH].forEach(function(item) {
      nextValue.push(item);
    });
  }

  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
    spec[COMMAND_UNSHIFT].forEach(function(item) {
      nextValue.unshift(item);
    });
  }

  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
    invariant(
      Array.isArray(value),
      'Expected %s target to be an array; got %s',
      COMMAND_SPLICE,
      value
    );
    invariant(
      Array.isArray(spec[COMMAND_SPLICE]),
      'update(): expected spec of %s to be an array of arrays; got %s. ' +
        'Did you forget to wrap your parameters in an array?',
      COMMAND_SPLICE,
      spec[COMMAND_SPLICE]
    );
    spec[COMMAND_SPLICE].forEach(function(args) {
      invariant(
        Array.isArray(args),
        'update(): expected spec of %s to be an array of arrays; got %s. ' +
          'Did you forget to wrap your parameters in an array?',
        COMMAND_SPLICE,
        spec[COMMAND_SPLICE]
      );
      nextValue.splice.apply(nextValue, args);
    });
  }

  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
    invariant(
      typeof spec[COMMAND_APPLY] === 'function',
      'update(): expected spec of %s to be a function; got %s.',
      COMMAND_APPLY,
      spec[COMMAND_APPLY]
    );
    nextValue = spec[COMMAND_APPLY](nextValue);
  }

  for (var k in spec) {
    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
      nextValue[k] = update(value[k], spec[k]);
    }
  }

  return nextValue;
}

module.exports = update;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){e.exports=__webpack_require__(0)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var s,i=e[Symbol.iterator]();!(n=(s=i.next()).done)&&(r.push(s.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{!n&&i.return&&i.return()}finally{if(o)throw a}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(0),l=g(i),p=g(r(2)),u=g(r(3)),c=g(r(4)),d=g(r(5)),f=g(r(6));function g(e){return e&&e.__esModule?e:{default:e}}function m(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function h(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var v=function(e){function t(e,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var s=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));return s.setFocus=function(){s.inputEle.focus()},s.validateKeyDown=function(e){s.props.isValidateKeyDown&&e&&s.props.inputType.regEx&&1==e.key.length&&!s.props.inputType.regEx.test(e.key)&&e.preventDefault()},s.removeAngularBrackets=function(e){var t=e;return t&&(t=t.replace(/[<>]/g,"")),t},s.doesTextContainsLocalization=function(e){var t=!1;return s.state.inlineSuggestionList&&s.state.inlineSuggestionList.length&&s.state.inlineSuggestionList.map(function(r){e.includes(r.Message)&&(t=!0)}),t},s.onBlur=function(e){if(s.setState({isFocus:!1}),document.body.classList.remove("keyboard-open"),s.props.onBlur){if(s.props.showSuggPaneOnHoverInTextBox){if(e.target.getAttribute("data-paraID")==s.props.paraID){var t=document.getElementById(s.props.paraID),r=s.props.paraID?t.innerText:e.target.innerText;s.doesTextContainsLocalization(r)&&(r=e.target.innerText);var n=s.checkForBlueText(e.target);n&&n.length&&n.map(function(e){var t='<span class="ttc_token" style="color:#0000ff">'+e+"</span>";r=r.replace(e,t)});var o={value:r,target:{value:r}};s.setState({value:r}),s.props.onBlur(o)}}else s.props.onBlur(e)}else{var a=s.props.inputType,i=!!a.required&&a.required;a.regEx&&""!=a.value?a.regEx.test(a.value)?(a.showError=!1,s.props.changeState&&s.props.changeState(e.target.name,a),s.props.setValidationError&&s.props.setValidationError(!1,a.name)):(s.props.setValidationError&&s.props.setValidationError(!0,a.name),a.showError=!0,s.props.changeState&&s.props.changeState(e.target.name,a)):""===a.value&&i?(s.props.setValidationError&&s.props.setValidationError(!0,a.name),a.showError=!0,s.props.changeState&&s.props.changeState(e.target.name,a)):(a.showError=!1,s.props.changeState&&s.props.changeState(e.target.name,a),s.props.setValidationError&&s.props.setValidationError(!1,a.name)),s.props.clearAllValidation&&s.props.clearAllValidation()}},s.onFocus=function(e){s.setState({isFocus:!0}),s.props.onFocus?s.props.onFocus(e,s.props.inputType):document.body.classList.contains("isMobile")&&document.body.classList.add("keyboard-open")},s.onChange=function(e){var t={target:Object.assign({},e.target,{name:e.target.name},{value:e.target.value})};t.target.value=t.target.value?t.target.value.replace(/^\s+/g,""):"",t.target.parentElement=e.target.parentElement;var r=s.removeAngularBrackets(t.target.value);s.setState({value:r}),s.props.onChange&&s.props.onChange(t)},s.assignRef=function(e){s.inputEle=e},s.getMask=function(e){return"1"==e.substring(0,1)?[/\d/,"-",/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/,/\d/]:[/[0-9]/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/,/\d/,/\d/]},s.onKeyDown=function(e){var t={isValidateKeyDown:s.props.isValidateKeyDown,fieldName:s.props.inputType&&s.props.inputType.name};s.props.onKeyDown&&s.props.onKeyDown(e,t)},s.getHtmlOnlyPropsForInput=function(){var e={type:s.props.inputType.type||"text",tabIndex:s.props.inputType.tabIndex,name:s.props.inputType.name,placeholder:s.props.hidePlaceholderonFocus&&s.state.isFocus?"":s.props.inputType.placeholderLabel,maxLength:s.props.inputType.maxLength,title:s.props.inputType.title,className:s.props.inputType.inputclassName&&""!=s.props.inputType.inputclassName?s.props.inputType.inputclassName+" form-control":"form-control",onChange:s.props.showSuggPaneOnHoverInTextBox?function(){}:s.onChange,id:s.props.inputType.id,onBlur:s.onBlur,onFocus:s.onFocus,onClick:s.props.onClick,onKeyDown:s.onKeyDown,autoComplete:s.props.autoComplete,disabled:s.props.isDisabledTextbox,autoFocus:!s.props.showSuggPaneOnHoverInTextBox&&(s.props.inputType.autoFocus||s.props.autoFocus)};return e.value=s.state.value||"",s.props.inputType.autocompleteAttr&&(e.autoComplete=s.props.inputType.autocompleteAttr),s.props.inputType.readonly&&(e.readOnly=s.props.inputType.readonly),s.props.isValidateKeyDown&&(e.onKeyPress=s.validateKeyDown),e},s.renderInputControl=function(){var e=s.getHtmlOnlyPropsForInput();return s.props.maskedInput?l.default.createElement(u.default,a({className:e.className,id:e.id},e,{guide:!1,mask:s.getMask})):s.props.isMultiLine?l.default.createElement("textarea",e):l.default.createElement("input",a({},e,{"aria-label":e.name}))},s.closePopover=function(){s.props.closePopover&&s.props.closePopover(s.props.inputType.name)},s.checkForBlueText=function(e){var t=[],r=e.getElementsByClassName("ttc_token");return r&&r.length&&Array.from(r).forEach(function(e){t.push(e.innerText)}),t},s.onRawValueChange=function(e,t){if(t&&(e.target=e,e.currentTarget=e),e.currentTarget.getAttribute("data-paraID")==s.props.paraID||t){var r=document.getElementById(s.props.paraID),n="";n=t?e.target.innerText:s.props.paraID?r.innerText:e.target.innerText,s.doesTextContainsLocalization(n)&&(n=e.target.innerText);var o=s.checkForBlueText(e.target);o&&o.length&&o.map(function(e){var t='<span class="ttc_token" style="color:#0000ff">'+e+"</span>";n=n.replace(e,t)});var a={value:n,target:{value:n}};s.setState({value:n}),s.props.onChange&&s.props.onChange(a)}},s.getInputProps=function(){var e,t=(h(e={isFocussed:s.state.isFocus,showInvalidPwdError:s.props.showInvalidPwdError,isEmailForm:s.props.isEmailForm,inputIcon:s.props.inputIcon,isValid:s.props.inputType.isValid,parentClass:s.props.inputType.parentClass},"isEmailForm",s.props.isEmailForm),h(e,"onIconClick",s.props.onIconClick),h(e,"errorMessage",s.props.inputType.errorMessage),h(e,"autoFocus",!s.props.showSuggPaneOnHoverInTextBox&&(s.props.inputType.autoFocus||s.props.autoFocus)),h(e,"focuslabelName",s.props.focuslabelName),h(e,"labelName",s.props.inputType.labelName),h(e,"isNullOrWhitespace",s.isNullOrWhitespace),h(e,"passwordTip",s.props.passwordTip),h(e,"renderInputControl",s.renderInputControl),h(e,"showRule",s.props.showRule),h(e,"showFieldTip",s.props.inputType.showFieldTip),h(e,"tipTitle",s.props.inputType.tipTitle),h(e,"tipBody",s.props.inputType.tipBody),h(e,"closePopover",s.closePopover),h(e,"shouldValidateonFocus",s.props.shouldValidateonFocus),e);s.props.shouldValidateonFocus&&(t.shouldValidateonFocus=s.props.shouldValidateonFocus),s.props.inputType.autocompleteAttr&&(t.autoComplete=s.props.inputType.autocompleteAttr),s.props.inputType.readonly&&(t.readOnly=s.props.inputType.readonly),s.props.isshowPromotionalMsgforEmail&&(t.isshowPromotionalMsgforEmail=s.props.isshowPromotionalMsgforEmail,t.showPromotionalMessage=s.props.showPromotionalMessage,t.promotionalMessage=s.props.promotionalMessage),s.props.isshowPromotionalMsgforEmail&&(t.isshowPromotionalMsgforEmail=s.props.isshowPromotionalMsgforEmail,t.showPromotionalMsgforEmailonPopup=s.props.showPromotionalMsgforEmailonPopup),s.props.wrapperClassName&&(t.wrapperClassName=s.props.wrapperClassName),s.props.isValidateKeyDown&&(t.onKeyPress=s.validateKeyDown);var r=s.props.isJoshuaTree?s.props.inputType.showError||s.props.inputType.bShowError:s.props.inputType.showError;return t.showError=r,t=a({},t,s.getHtmlOnlyPropsForInput())},s.addClassToWrapperOnFocus=function(e){document.querySelectorAll("input.form-control.textbox,textarea.form-control.textbox").forEach(function(t,r,n){t.addEventListener("focus",function(){this.value||this.parentElement.classList.add(e)}),t.addEventListener("blur",function(){this.value||this.parentElement.classList.remove(e)})})},s.displayInlineSuggestions=function(e){var t=s.props.displayInlineSuggestions;t&&"function"==typeof t&&t(e)},s.getInlineSuggestionList=function(e){var t=[];return e&&"object"===(void 0===e?"undefined":o(e))&&Object.entries(e)&&Object.entries(e).length>0?Object.entries(e).forEach(function(e){var r=n(e,2),o=(r[0],r[1]);Array.isArray(o)&&(t=[].concat(m(t),m(o)))}):e&&Array.isArray(e)&&(t=e),t},s.getCorrectionsArrayForInlineSuggestions=function(e){return e},s.inlineSuggestionsDisplayed=function(e){s.setState({inlineSuggestionList:e}),s.props.inlineSuggestionsDisplayed&&"function"==typeof s.props.inlineSuggestionsDisplayed&&s.props.inlineSuggestionsDisplayed(e)},s.state={value:s.removeAngularBrackets(s.props.inputType.value),isFocus:!1,valueProps:s.removeAngularBrackets(s.props.inputType.value),inlineSuggestionList:[]},s.inputEle=null,s.inputProps={},s}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),s(t,[{key:"componentDidMount",value:function(){if(this.props.isRWZMobile&&this.addClassToWrapperOnFocus("custom-placeholder-focus"),this.props.inputType.id&&this.props.autoFocus&&!this.props.showSuggPaneOnHoverInTextBox){var e=document.getElementById(this.props.inputType.id);e&&!e.offsetWidth&&setTimeout(function(){e.focus()},100)}}},{key:"isNullOrWhitespace",value:function(e){return null==e||void 0==e||e.replace(/\s/g,"").length<1}},{key:"render",value:function(){var e=this.props,t=e.showInlineSuggestions,r=e.StrengthErrorSuggestionsList,n=e.paraID,o=e.showSuggPaneOnHoverInTextBox,s=[],i=!1,p=[],u={};return t&&(i=(s=this.getInlineSuggestionList(r))&&Array.isArray(s)&&s.length>0,p=this.getCorrectionsArrayForInlineSuggestions(s)),o&&(u=this.props.allParaErrorList&&n&&this.props.allParaErrorList.paragraphs&&this.props.allParaErrorList.paragraphs.length>0&&this.props.allParaErrorList.paragraphs.find(function(e){return e.paraID==n})),this.inputProps=this.getInputProps(),o?l.default.createElement(f.default,a({},this.inputProps,{hasStrengthError:i,showInlineSuggestions:t,InlineCorrectionsArrayToHighlight:p,displayInlineSuggestions:this.displayInlineSuggestions,paraID:n,errorsToHighlightInline:this.props.errorsToHighlightInline,rawInputValue:this.props.rawInputValue,completeErrorList:u,allParaErrorList:this.props.allParaErrorList,inlineSuggestionList:this.state.inlineSuggestionList,inlineSuggestionsDisplayed:this.inlineSuggestionsDisplayed,onInlineIgnore:this.props.onInlineIgnore,fixStrengthSuggestions:this.props.fixStrengthSuggestions,localization:this.props.textBoxSuggestionLocalization,rawValueChange:this.onRawValueChange})):this.props.isRWZMobile?l.default.createElement(d.default,a({},this.inputProps,{isMobileJoshuaRedesign:this.props.isMobileJoshuaRedesign})):l.default.createElement(c.default,a({},this.inputProps,{hasStrengthError:i,showInlineSuggestions:t,InlineCorrectionsArrayToHighlight:p,displayInlineSuggestions:this.displayInlineSuggestions,paraID:n}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){if(e.inputType.value!=t.valueProps||e.updateComponentState){var r=e.inputType.value?e.inputType.value.replace(/[<>]/g,""):e.inputType.value;return{value:r,valueProps:r}}return null}}]),t}();t.default=v,v.defaultProps={isContentInViewPort:!0},v.propTypes={inputType:p.default.object,isValidateKeyDown:p.default.bool,focusInput:p.default.bool,txtOnChange:p.default.func,onBlur:p.default.func,onFocus:p.default.func,onClick:p.default.func,onIconClick:p.default.func,isContentInViewPort:p.default.bool,inputIcon:p.default.string,wrapperClassName:p.default.string}},function(e,t){e.exports=__webpack_require__(2)},function(e,t){e.exports=__webpack_require__(186)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e&&e.__esModule?e:{default:e}}(r(0));t.default=function(e){return n.default.createElement("div",{className:"form-group placeholder-wrap "+(e.name?" bold-"+e.name:"")+(e.isFocussed?" is-focus ":"")+(e.disabled?" disabled ":"")+(e.parentClass?e.parentClass:"")+(e.isEmailForm?" form-group-inline ":"")+(e.labelName?"":" no-label ")+(e.value&&e.value.trim().length?" is-filled ":" ")+(!e.showError&&!e.showInvalidPwdError||e.shouldValidateonFocus&&e.isFocussed?" is-valid":"  is-invalid")},e.labelName&&n.default.createElement("label",{className:"control-label "+(e.isEmailForm?"fs-15":""),htmlFor:e.id},e.labelName,e.showInlineSuggestions&&e.hasStrengthError&&n.default.createElement("i",{id:"icon-sugg-"+e.name,"data-paraid":e.paraID,"data-fieldcd":e.name,"data-uniqueidentifier":"icon-sugg-"+e.name,class:"icon-error exclamation-error icon-inline-sugg",onClick:e.displayInlineSuggestions})),e.inputIcon&&n.default.createElement("i",{className:e.inputIcon,onClick:e.onIconClick&&e.onIconClick}),e.renderInputControl(e),(e.showError||e.showInvalidPwdError)&&!(e.shouldValidateonFocus&&e.isFocussed)&&n.default.createElement("i",{className:"icon-error"}),e.isValid&&!e.showError&&!e.isFocussed&&n.default.createElement("i",{className:"icon-success"}),e.showPromotionalMessage?n.default.createElement("div",{className:"email-opt-in-msg"},e.promotionalMessage):(e.showError||e.showRule)&&!e.showPromotionalMsgforEmailonPopup&&n.default.createElement("label",{className:"invalid-feedback",id:"invalid-"+e.type},e.errorMessage),e.showFieldTip&&n.default.createElement("div",{className:"popover bs-popover-bottom field-tip ",role:"tooltip"},n.default.createElement("div",{className:"arrow"}),n.default.createElement("div",{className:"popover-header"},n.default.createElement("h3",{className:"popover-heading"},e.tipTitle),n.default.createElement("button",{type:"button",className:"close","aria-label":"Close",onClick:e.closePopover},n.default.createElement("i",{className:"icon-close",role:"button","aria-hidden":"true"}))),n.default.createElement("div",{className:"popover-body"},n.default.createElement("div",{dangerouslySetInnerHTML:{__html:e.tipBody}}))),e.showInlineSuggestions&&n.default.createElement("div",{className:"inline-sugg-input-wrap",dangerouslySetInnerHTML:{__html:function(e,t){var r=e.replace(/\s/g,"&nbsp;");return t&&Array.isArray(t)&&t.map(function(e){var t=[];e&&e.corrections&&Array.isArray(e.corrections)&&(t=e.corrections),t.sort(function(e,t){return parseInt(e.offset)-parseInt(t.offset)}).map(function(e){var t="";if(e&&!isNaN(parseInt(e.offset))&&!isNaN(parseInt(e.index))&&e.expression){var n=e.expression.replace(" ","&nbsp;");t='<span class="error-highlight">'+n+"</span>",r=r.replace(n,t),t.length,n.length}return t})}),r}(e.value,e.InlineCorrectionsArrayToHighlight)}}))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e&&e.__esModule?e:{default:e}}(r(0));t.default=function(e){var t=(e.isNullOrWhitespace(e.className),e.className),r=["form-group","custom-placeholder-wrap"];return e.wrapperClassName&&r.push(e.wrapperClassName),e.value&&r.push("custom-placeholder-focus"),!e.showError&&!e.showInvalidPwdError||e.shouldValidateonFocus&&e.isFocussed||r.push("input-error"),n.default.createElement("div",{className:r.join(" ")},n.default.createElement("input",{"aria-label":e.id,type:e.type||"text",name:e.name,value:e.value,placeholder:e.placeholder,maxLength:e.maxLength,className:t+" textbox",disabled:e.disabled,onChange:e.onChange,id:"text"+e.name,"data-validate":e["data-validate"],onBlur:e.onBlur,onFocus:e.onFocus,autoComplete:e.autoComplete,onKeyPress:e.onKeyDown}),e.labelName&&n.default.createElement("label",{htmlFor:"text"+e.name},e.focuslabelName&&((void 0).state.isFocus||e.value.length>0)?e.focuslabelName:e.labelName),e.isMobileJoshuaRedesign&&(e.showError||e.showInvalidPwdError)&&!(e.shouldValidateonFocus&&e.isFocussed)&&n.default.createElement("i",{className:"icon-error"}),e.isMobileJoshuaRedesign&&e.isValid&&!e.showError&&!e.isFocussed&&n.default.createElement("i",{className:"icon-success"}),e.passwordTip&&n.default.createElement("span",{className:"form-text"},e.passwordTip),e.showError?n.default.createElement("div",{className:"alert-danger",role:"alert"},e.errorMessage):e.isshowPromotionalMsgforEmail?n.default.createElement("div",{className:"email-opt-in-msg"},e.showPromotionalMessage?e.promotionalMessage:""):"")}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var s,i=e[Symbol.iterator]();!(n=(s=i.next()).done)&&(r.push(s.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{!n&&i.return&&i.return()}finally{if(o)throw a}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=r(0),s=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default=function(e){var t=(0,a.useState)(!1),r=o(t,2),l=r[0],p=r[1],u=(0,a.useState)({}),c=o(u,2),d=c[0],f=c[1],g=(0,a.useState)({}),m=o(g,2),h=m[0],v=m[1],y=(0,a.useState)(null),E=o(y,2),b=E[0],I=E[1],w=(0,a.useState)([]),T=o(w,2),S=T[0],x=T[1],P=(0,a.useState)(null),C=o(P,2),N=C[0],F=C[1],L=(0,a.useRef)(null);function D(t){e.rawValueChange(t)}function A(t){var r=t.currentTarget;if(r&&r.parentElement&&r.parentElement.parentElement){var n=r.parentElement.parentElement.getAttribute("data-paraID");if(e.paraID==n){var o=window.getSelection();o.removeAllRanges();var a=document.createRange();a.setStartBefore(r),a.setEndAfter(r),o.addRange(a),r.style.removeProperty("color"),r.classList.remove("ttc_token"),r.children&&r.children.length>0&&(r.children[0].classList.remove("error-highlight"),r.children[0].removeEventListener("mouseover",_),r.children[0].removeEventListener("mouseleave",M)),r.setAttribute("tabindex","0"),e.rawValueChange(r.parentElement.parentElement,r.innerText)}}}(0,a.useEffect)(function(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.value;var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.errorsToHighlightInline,r=function(t,r){var n=e.paraID,o=e.allParaErrorList&&n&&e.allParaErrorList.paragraphs&&e.allParaErrorList.paragraphs.length>0&&e.allParaErrorList.paragraphs.find(function(e){return e.paraID==n}),a=[];(o=j(o)).forEach(function(e){a.findIndex(function(t){return t.offset==e.offset})<=-1&&a.push(e)});var s=0;return a.sort(function(e,t){return parseInt(e.offset)-parseInt(t.offset)}).map(function(n){var o=n.expression,i=n.offset+s,l="",p="";if(i>=0){var u=R(n.expression,n.offset,a);if(u&&u.length){var c="inlinesuggv2-"+o.replace(/\s/g,"&nbsp;")+"-"+n.offset,d=u.join("-");r.map(function(e){d.indexOf(e)>=0&&(p=" inline-sugg-v2-hover")}),l=c&&u&&u.length?'<span class="error-highlight'+p+'" data-sugg-word-info='+c+" data-errcodes="+d+" data-paraid="+e.paraID+">"+o.replace(/\s/g,"&nbsp;")+"</span>":"<span> "+o.replace(/\s/g,"&nbsp;")+"  </span>";var f=t.replaceAt(i,o,l);f!=t&&(s=s+l.length-o.length,t=f)}else{l="<span> "+o.replace(/\s/g,"&nbsp;")+"  </span>";var g=t.replaceAt(i,o,l);g!=t&&(s=s+l.length-o.length,t=g)}}}),t=function(e){for(var t=1;t<10;t++){for(var r="&nbsp;",n=" ",o=1;o<=t;o++)r+="&nbsp;",n+=" ";e=e.split(n).join(r)}return e}(t=function(e){for(var t=1;t<10;t++){for(var r="",n="",o=1;o<=t;o++)r+="&nbsp;",n+=" ";var a="</span>"+n+"<span";r="</span>"+r+"<span",e=e.split(a).join(r)}return e}(t))}(e.rawInputValue,t);I(r)},[e.completeErrorList&&e.errorsToHighlightInline]),(0,a.useEffect)(function(){var e=setInterval(function(){var t=document.getElementsByClassName("error-highlight");if(t&&t.length>0)for(clearInterval(e),i=0;i<t.length;i++)t[i].addEventListener("mouseover",_),t[i].addEventListener("mouseleave",M)},10),t=setInterval(function(){var e=document.getElementsByClassName("inline-text");if(e&&e.length>0)for(clearInterval(t),i=0;i<e.length;i++)e[i].addEventListener("input",D)},10)},[e.completeErrorList&&e.errorsToHighlightInline]),(0,a.useEffect)(function(){var e=setInterval(function(){var t=document.getElementsByClassName("inline-text");if(t&&t.length>0)for(clearInterval(e),i=0;i<t.length;i++)t[i].addEventListener("input",D)},10),t=setInterval(function(){var e=document.getElementsByClassName("ttc_token");if(e&&e.length>0)for(clearInterval(t),i=0;i<e.length;i++)e[i].addEventListener("click",A)},10)},[]);var k=function(e){var t=e&&1===e.length?e[0].errors:[];return t.sort(function(e,t){var r=0,n=0;return e&&e.corrections&&e.corrections.length>0&&(r=e.corrections.length),t&&t.corrections&&t.corrections.length>0&&(n=t.corrections.length),n-r}),t};function M(t){t&&t.preventDefault();var r=document.querySelectorAll(".inline-sugg-v2-hover");r&&r.length>0&&r.forEach(function(t){var r=t.getAttribute("data-errcodes"),n=!0;r&&(r=r.split("-").map(function(e){return parseInt(e)}),e.errorsToHighlightInline.every(function(e){return!(r.indexOf(e)>=0&&(n=!1,1))})),n&&t.classList&&t.classList.remove("inline-sugg-v2-hover")}),p(!1)}function O(e,t){if(e){var r=document.querySelectorAll("[data-errcodes]");r&&r.forEach(function(r){r.dataset&&r.dataset.errcodes&&r.dataset.paraid==t&&r.dataset.errcodes.includes(""+e)&&r.classList.add("inline-sugg-v2-hover")})}}function B(e){V(e,!0)}function V(t){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t.preventDefault();var n=t.currentTarget.getAttribute("data-errorcode"),o=t.currentTarget.getAttribute("data-fieldcd"),a=t.currentTarget.getAttribute("data-expression"),s=t.currentTarget.getAttribute("data-offset"),i=t.currentTarget.getAttribute("data-paragraphID"),l=e.allParaErrorList&&i&&e.allParaErrorList.paragraphs&&e.allParaErrorList.paragraphs.length>0&&e.allParaErrorList.paragraphs.find(function(e){return e.paraID==i}),p=(l=j(l)).filter(function(e){return e.expression.replace(/\s/g,"&nbsp;")==a.replace(/\s/g,"&nbsp;")&&e.offset==s}),u=null;if(p=p&&1===p.length?p[0]:null){u=(u=p.errors.filter(function(e){return e.ErrorCode==n&&e.FieldCD===o}))&&1===u.length?u[0]:null;var c=null;!r&&u&&u.corrections&&u.corrections.length>0?(c=(c=u.corrections.find(function(e){return e.expression.replace(/\s/g,"&nbsp;")===a.replace(/\s/g,"&nbsp;")&&e.offset==s}))||null,e.onInlineIgnore&&"function"==typeof e.onInlineIgnore&&e.onInlineIgnore(t,u,c)):r&&u&&u.corrections&&u.corrections.length>0&&e.onInlineIgnore&&"function"==typeof e.onInlineIgnore&&e.onInlineIgnore(t,u,u.corrections)}}function _(t){t.preventDefault();var r=[],n=t.currentTarget.getAttribute("data-sugg-word-info"),o=t.currentTarget.getAttribute("data-paraid"),a="",s="";if(n&&o==e.paraID){if(n){F(o),n=n.split("-"),a=n[1]?n[1]:"",s=n[2]?n[2]:"";var i=e.allParaErrorList&&o&&e.allParaErrorList.paragraphs&&e.allParaErrorList.paragraphs.length>0&&e.allParaErrorList.paragraphs.find(function(e){return e.paraID==o}),l=(i=j(i)).filter(function(e){return e.expression.replace(/\s/g,"&nbsp;")==a.replace(/\s/g,"&nbsp;")&&e.offset==s});r=k(l)}e.inlineSuggestionsDisplayed&&"function"==typeof e.inlineSuggestionsDisplayed&&e.inlineSuggestionsDisplayed(r);var p=r&&r.length>0?r[0].ErrorCode:null;K(t.target,p,o),x(p),f({expression:a,offset:s})}}var j=function(e){return e?e.FreeFormInlineErrors:[]},H=function(e){return e?e.FreeFormReviewedText:""},R=function(e,t,r){var n=r.find(function(r){return r.expression.replace(/\s/g,"&nbsp;")==e.replace(/\s/g,"&nbsp;")&&r.offset==t}),o=[];return n&&n.errors&&n.errors.length&&n.errors.map(function(e){!e.isIgnored&&o.push(e.ErrorCode)}),o};String.prototype.replaceAt=function(e,t,r){return 0==this.slice(e).indexOf(t)?this.slice(0,e)+this.slice(e).replace(t,r):this.slice(0)};var K=function(e,t,r){var o=e;q(L&&L.current,o).then(function(e){e&&"object"===(void 0===e?"undefined":n(e))&&Object.entries(e).length>0&&(v(Object.assign({},e)),p(!0),O(t,r))})};var q=function(e,t){return new Promise(function(r){setTimeout(function(){if(t&&e){var n=t.getBoundingClientRect(),o=e.getBoundingClientRect(),a=(n.top,o.height,n.left+"px"),s="",i=+window.innerHeight+window.scrollY/window.innerHeight-n.top+20;i+o.height>window.innerHeight?(i=i-o.height-n.height-40,s="top"):s="bottom",r({bottom:i+"px",left:a,arrow:s})}else r({visibility:"hidden",left:"",bottom:"",arrow:""})},1)})};return s.default.createElement("div",{id:e.paraID,className:"form-group placeholder-wrap "+(e.paraID==N&&l?"form-group-highlight":"")+(e.name?" bold-"+e.name:"")+(e.isFocussed?" is-focus ":"")+(e.disabled?" disabled ":"")+(e.parentClass?e.parentClass:"")+(e.isEmailForm?" form-group-inline ":"")+(e.labelName?"":" no-label ")+(e.value&&e.value.trim().length?" is-filled ":" ")+(e.showError||e.showInvalidPwdError?"  is-invalid":" is-valid")},e.labelName&&s.default.createElement("label",{className:"control-label "+(e.isEmailForm?"fs-15":""),htmlFor:e.id},e.labelName,e.showInlineSuggestions&&e.hasStrengthError&&s.default.createElement("i",{id:"icon-sugg-"+e.name,"data-paraid":e.paraID,"data-fieldcd":e.name,"data-uniqueidentifier":"icon-sugg-"+e.name,class:"icon-error exclamation-error icon-inline-sugg",onClick:e.displayInlineSuggestions})),e.inputIcon&&s.default.createElement("i",{className:e.inputIcon,onClick:e.onIconClick&&e.onIconClick}),e.renderInputControl(e),(e.showError||e.showInvalidPwdError)&&s.default.createElement("i",{className:"icon-error"}),e.isValid&&!e.showError&&!e.isFocussed&&s.default.createElement("i",{className:"icon-success"}),(e.showError||e.showRule)&&s.default.createElement("label",{className:"invalid-feedback",id:"invalid-"+e.type},e.errorMessage),e.showFieldTip&&s.default.createElement("div",{className:"popover bs-popover-bottom field-tip ",role:"tooltip"},s.default.createElement("div",{className:"arrow"}),s.default.createElement("div",{className:"popover-header"},s.default.createElement("h1",{className:"popover-heading"},e.tipTitle),s.default.createElement("button",{type:"button",className:"close",onClick:e.closePopover},s.default.createElement("i",{className:"icon-close",role:"button"}))),s.default.createElement("div",{className:"popover-body"},s.default.createElement("div",{dangerouslySetInnerHTML:{__html:e.tipBody}}))),e.showInlineSuggestions&&s.default.createElement("div",{"data-paraid":e.paraID,className:"inline-sugg-input-wrap inline-text",contentEditable:"true",onBlur:function(){e.onBlur(event)},dangerouslySetInnerHTML:{__html:b}}),s.default.createElement(s.default.Fragment,null,s.default.createElement("div",{className:(l?"":"d-none")+" tooltip-suggestion-content "+("bottom"==h.arrow?" bottom-arrow":" top-arrow"),style:h,ref:L,onMouseLeave:M,onMouseOver:function(){O(S,N),p(!0)}},s.default.createElement("div",{className:"tooltip-suggestion-inner-content"},e.inlineSuggestionList&&e.inlineSuggestionList.map(function(t,r){return s.default.createElement("div",{key:t.Key+"_"+r},s.default.createElement("i",{class:"icon-error exclamation-error"}),s.default.createElement("h6",null,t.MessageHeading),s.default.createElement("p",null,t.Message),s.default.createElement("div",null,s.default.createElement("button",{id:t.errorID,className:"btn btn-link-secondary","data-errorcode":t.ErrorCode,"data-fieldcd":t.FieldCD,"data-paragraphID":t.ParagraphId,"data-expression":d?d.expression:"","data-offset":d?d.offset:"",onClick:V},e.localization.ignore),s.default.createElement("button",{className:"btn btn-link-secondary","data-errorcode":t.ErrorCode,"data-fieldcd":t.FieldCD,"data-paragraphID":t.ParagraphId,"data-expression":d?d.expression:"","data-offset":d?d.offset:"",onClick:B},e.localization.ignoreAllSuggestion),t.fixCTALabel&&s.default.createElement("button",{className:"btn btn-link-secondary","data-paragraphID":t.ParagraphId,onClick:function(r){!function(t,r){t.stopPropagation();var n=t.currentTarget.getAttribute("data-paragraphID"),o=e.allParaErrorList&&n&&e.allParaErrorList.paragraphs&&e.allParaErrorList.paragraphs.length>0&&e.allParaErrorList.paragraphs.find(function(e){return e.paraID==n});o=H(o),e.fixStrengthSuggestions&&"function"==typeof e.fixStrengthSuggestions&&e.fixStrengthSuggestions(t,r,o)}(r,t)}},e.localization.fixAllSugg)))})))))}}]);

/***/ })

});