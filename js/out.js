(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/vanilla-tilt/lib/vanilla-tilt.js
  var require_vanilla_tilt = __commonJS({
    "node_modules/vanilla-tilt/lib/vanilla-tilt.js"(exports, module) {
      "use strict";
      var classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };
      var VanillaTilt2 = function() {
        function VanillaTilt3(element) {
          var settings = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          classCallCheck(this, VanillaTilt3);
          if (!(element instanceof Node)) {
            throw "Can't initialize VanillaTilt because " + element + " is not a Node.";
          }
          this.width = null;
          this.height = null;
          this.clientWidth = null;
          this.clientHeight = null;
          this.left = null;
          this.top = null;
          this.gammazero = null;
          this.betazero = null;
          this.lastgammazero = null;
          this.lastbetazero = null;
          this.transitionTimeout = null;
          this.updateCall = null;
          this.event = null;
          this.updateBind = this.update.bind(this);
          this.resetBind = this.reset.bind(this);
          this.element = element;
          this.settings = this.extendSettings(settings);
          this.reverse = this.settings.reverse ? -1 : 1;
          this.resetToStart = VanillaTilt3.isSettingTrue(this.settings["reset-to-start"]);
          this.glare = VanillaTilt3.isSettingTrue(this.settings.glare);
          this.glarePrerender = VanillaTilt3.isSettingTrue(this.settings["glare-prerender"]);
          this.fullPageListening = VanillaTilt3.isSettingTrue(this.settings["full-page-listening"]);
          this.gyroscope = VanillaTilt3.isSettingTrue(this.settings.gyroscope);
          this.gyroscopeSamples = this.settings.gyroscopeSamples;
          this.elementListener = this.getElementListener();
          if (this.glare) {
            this.prepareGlare();
          }
          if (this.fullPageListening) {
            this.updateClientSize();
          }
          this.addEventListeners();
          this.reset();
          if (this.resetToStart === false) {
            this.settings.startX = 0;
            this.settings.startY = 0;
          }
        }
        VanillaTilt3.isSettingTrue = function isSettingTrue(setting) {
          return setting === "" || setting === true || setting === 1;
        };
        VanillaTilt3.prototype.getElementListener = function getElementListener() {
          if (this.fullPageListening) {
            return window.document;
          }
          if (typeof this.settings["mouse-event-element"] === "string") {
            var mouseEventElement = document.querySelector(this.settings["mouse-event-element"]);
            if (mouseEventElement) {
              return mouseEventElement;
            }
          }
          if (this.settings["mouse-event-element"] instanceof Node) {
            return this.settings["mouse-event-element"];
          }
          return this.element;
        };
        VanillaTilt3.prototype.addEventListeners = function addEventListeners() {
          this.onMouseEnterBind = this.onMouseEnter.bind(this);
          this.onMouseMoveBind = this.onMouseMove.bind(this);
          this.onMouseLeaveBind = this.onMouseLeave.bind(this);
          this.onWindowResizeBind = this.onWindowResize.bind(this);
          this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);
          this.elementListener.addEventListener("mouseenter", this.onMouseEnterBind);
          this.elementListener.addEventListener("mouseleave", this.onMouseLeaveBind);
          this.elementListener.addEventListener("mousemove", this.onMouseMoveBind);
          if (this.glare || this.fullPageListening) {
            window.addEventListener("resize", this.onWindowResizeBind);
          }
          if (this.gyroscope) {
            window.addEventListener("deviceorientation", this.onDeviceOrientationBind);
          }
        };
        VanillaTilt3.prototype.removeEventListeners = function removeEventListeners() {
          this.elementListener.removeEventListener("mouseenter", this.onMouseEnterBind);
          this.elementListener.removeEventListener("mouseleave", this.onMouseLeaveBind);
          this.elementListener.removeEventListener("mousemove", this.onMouseMoveBind);
          if (this.gyroscope) {
            window.removeEventListener("deviceorientation", this.onDeviceOrientationBind);
          }
          if (this.glare || this.fullPageListening) {
            window.removeEventListener("resize", this.onWindowResizeBind);
          }
        };
        VanillaTilt3.prototype.destroy = function destroy() {
          clearTimeout(this.transitionTimeout);
          if (this.updateCall !== null) {
            cancelAnimationFrame(this.updateCall);
          }
          this.reset();
          this.removeEventListeners();
          this.element.vanillaTilt = null;
          delete this.element.vanillaTilt;
          this.element = null;
        };
        VanillaTilt3.prototype.onDeviceOrientation = function onDeviceOrientation(event) {
          if (event.gamma === null || event.beta === null) {
            return;
          }
          this.updateElementPosition();
          if (this.gyroscopeSamples > 0) {
            this.lastgammazero = this.gammazero;
            this.lastbetazero = this.betazero;
            if (this.gammazero === null) {
              this.gammazero = event.gamma;
              this.betazero = event.beta;
            } else {
              this.gammazero = (event.gamma + this.lastgammazero) / 2;
              this.betazero = (event.beta + this.lastbetazero) / 2;
            }
            this.gyroscopeSamples -= 1;
          }
          var totalAngleX = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
          var totalAngleY = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;
          var degreesPerPixelX = totalAngleX / this.width;
          var degreesPerPixelY = totalAngleY / this.height;
          var angleX = event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
          var angleY = event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);
          var posX = angleX / degreesPerPixelX;
          var posY = angleY / degreesPerPixelY;
          if (this.updateCall !== null) {
            cancelAnimationFrame(this.updateCall);
          }
          this.event = {
            clientX: posX + this.left,
            clientY: posY + this.top
          };
          this.updateCall = requestAnimationFrame(this.updateBind);
        };
        VanillaTilt3.prototype.onMouseEnter = function onMouseEnter() {
          this.updateElementPosition();
          this.element.style.willChange = "transform";
          this.setTransition();
        };
        VanillaTilt3.prototype.onMouseMove = function onMouseMove(event) {
          if (this.updateCall !== null) {
            cancelAnimationFrame(this.updateCall);
          }
          this.event = event;
          this.updateCall = requestAnimationFrame(this.updateBind);
        };
        VanillaTilt3.prototype.onMouseLeave = function onMouseLeave() {
          this.setTransition();
          if (this.settings.reset) {
            requestAnimationFrame(this.resetBind);
          }
        };
        VanillaTilt3.prototype.reset = function reset() {
          this.onMouseEnter();
          if (this.fullPageListening) {
            this.event = {
              clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,
              clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight
            };
          } else {
            this.event = {
              clientX: this.left + (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width,
              clientY: this.top + (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height
            };
          }
          var backupScale = this.settings.scale;
          this.settings.scale = 1;
          this.update();
          this.settings.scale = backupScale;
          this.resetGlare();
        };
        VanillaTilt3.prototype.resetGlare = function resetGlare() {
          if (this.glare) {
            this.glareElement.style.transform = "rotate(180deg) translate(-50%, -50%)";
            this.glareElement.style.opacity = "0";
          }
        };
        VanillaTilt3.prototype.getValues = function getValues() {
          var x = void 0, y = void 0;
          if (this.fullPageListening) {
            x = this.event.clientX / this.clientWidth;
            y = this.event.clientY / this.clientHeight;
          } else {
            x = (this.event.clientX - this.left) / this.width;
            y = (this.event.clientY - this.top) / this.height;
          }
          x = Math.min(Math.max(x, 0), 1);
          y = Math.min(Math.max(y, 0), 1);
          var tiltX = (this.reverse * (this.settings.max - x * this.settings.max * 2)).toFixed(2);
          var tiltY = (this.reverse * (y * this.settings.max * 2 - this.settings.max)).toFixed(2);
          var angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);
          return {
            tiltX,
            tiltY,
            percentageX: x * 100,
            percentageY: y * 100,
            angle
          };
        };
        VanillaTilt3.prototype.updateElementPosition = function updateElementPosition() {
          var rect = this.element.getBoundingClientRect();
          this.width = this.element.offsetWidth;
          this.height = this.element.offsetHeight;
          this.left = rect.left;
          this.top = rect.top;
        };
        VanillaTilt3.prototype.update = function update() {
          var values = this.getValues();
          this.element.style.transform = "perspective(" + this.settings.perspective + "px) rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")";
          if (this.glare) {
            this.glareElement.style.transform = "rotate(" + values.angle + "deg) translate(-50%, -50%)";
            this.glareElement.style.opacity = "" + values.percentageY * this.settings["max-glare"] / 100;
          }
          this.element.dispatchEvent(new CustomEvent("tiltChange", {
            "detail": values
          }));
          this.updateCall = null;
        };
        VanillaTilt3.prototype.prepareGlare = function prepareGlare() {
          if (!this.glarePrerender) {
            var jsTiltGlare = document.createElement("div");
            jsTiltGlare.classList.add("js-tilt-glare");
            var jsTiltGlareInner = document.createElement("div");
            jsTiltGlareInner.classList.add("js-tilt-glare-inner");
            jsTiltGlare.appendChild(jsTiltGlareInner);
            this.element.appendChild(jsTiltGlare);
          }
          this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
          this.glareElement = this.element.querySelector(".js-tilt-glare-inner");
          if (this.glarePrerender) {
            return;
          }
          Object.assign(this.glareElementWrapper.style, {
            "position": "absolute",
            "top": "0",
            "left": "0",
            "width": "100%",
            "height": "100%",
            "overflow": "hidden",
            "pointer-events": "none",
            "border-radius": "inherit"
          });
          Object.assign(this.glareElement.style, {
            "position": "absolute",
            "top": "50%",
            "left": "50%",
            "pointer-events": "none",
            "background-image": "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
            "transform": "rotate(180deg) translate(-50%, -50%)",
            "transform-origin": "0% 0%",
            "opacity": "0"
          });
          this.updateGlareSize();
        };
        VanillaTilt3.prototype.updateGlareSize = function updateGlareSize() {
          if (this.glare) {
            var glareSize = (this.element.offsetWidth > this.element.offsetHeight ? this.element.offsetWidth : this.element.offsetHeight) * 2;
            Object.assign(this.glareElement.style, {
              "width": glareSize + "px",
              "height": glareSize + "px"
            });
          }
        };
        VanillaTilt3.prototype.updateClientSize = function updateClientSize() {
          this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        };
        VanillaTilt3.prototype.onWindowResize = function onWindowResize() {
          this.updateGlareSize();
          this.updateClientSize();
        };
        VanillaTilt3.prototype.setTransition = function setTransition() {
          var _this = this;
          clearTimeout(this.transitionTimeout);
          this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;
          if (this.glare)
            this.glareElement.style.transition = "opacity " + this.settings.speed + "ms " + this.settings.easing;
          this.transitionTimeout = setTimeout(function() {
            _this.element.style.transition = "";
            if (_this.glare) {
              _this.glareElement.style.transition = "";
            }
          }, this.settings.speed);
        };
        VanillaTilt3.prototype.extendSettings = function extendSettings(settings) {
          var defaultSettings = {
            reverse: false,
            max: 15,
            startX: 0,
            startY: 0,
            perspective: 1e3,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            scale: 1,
            speed: 300,
            transition: true,
            axis: null,
            glare: false,
            "max-glare": 1,
            "glare-prerender": false,
            "full-page-listening": false,
            "mouse-event-element": null,
            reset: true,
            "reset-to-start": true,
            gyroscope: true,
            gyroscopeMinAngleX: -45,
            gyroscopeMaxAngleX: 45,
            gyroscopeMinAngleY: -45,
            gyroscopeMaxAngleY: 45,
            gyroscopeSamples: 10
          };
          var newSettings = {};
          for (var property in defaultSettings) {
            if (property in settings) {
              newSettings[property] = settings[property];
            } else if (this.element.hasAttribute("data-tilt-" + property)) {
              var attribute = this.element.getAttribute("data-tilt-" + property);
              try {
                newSettings[property] = JSON.parse(attribute);
              } catch (e2) {
                newSettings[property] = attribute;
              }
            } else {
              newSettings[property] = defaultSettings[property];
            }
          }
          return newSettings;
        };
        VanillaTilt3.init = function init(elements, settings) {
          if (elements instanceof Node) {
            elements = [elements];
          }
          if (elements instanceof NodeList) {
            elements = [].slice.call(elements);
          }
          if (!(elements instanceof Array)) {
            return;
          }
          elements.forEach(function(element) {
            if (!("vanillaTilt" in element)) {
              element.vanillaTilt = new VanillaTilt3(element, settings);
            }
          });
        };
        return VanillaTilt3;
      }();
      if (typeof document !== "undefined") {
        window.VanillaTilt = VanillaTilt2;
        VanillaTilt2.init(document.querySelectorAll("[data-tilt]"));
      }
      module.exports = VanillaTilt2;
    }
  });

  // node_modules/@mojs/core/dist/mo.umd.js
  var require_mo_umd = __commonJS({
    "node_modules/@mojs/core/dist/mo.umd.js"(exports, module) {
      var t2;
      var e2;
      t2 = self, e2 = () => (() => {
        var t3 = { 50: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => n2 });
          var r3 = s3(2), i2 = { _sample: function(t5) {
            var e5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4, s4 = (0, r3.Z)(e5), n3 = {};
            if ("number" === s4) {
              var a = 0, o2 = Math.pow(10, e5), l = 1 / o2;
              n3[0] = t5(0);
              for (var h = 0; h < o2 - 1; h++)
                a += l, n3[parseFloat(a.toFixed(e5))] = t5(a);
              n3[1] = t5(1), n3.base = e5;
            } else
              "object" === s4 ? n3 = e5 : "string" === s4 && (n3 = JSON.parse(e5));
            return i2._sample._proximate(n3);
          }, _proximate: function(t5) {
            var e5 = t5.base, s4 = 1 / Math.pow(10, e5), r4 = function(r5) {
              var i3, n3, a = function(t6, e6) {
                e6 = +e6 || 0;
                var s5 = Math.pow(10, e6);
                return Math.round(t6 * s5) / s5;
              }(r5, e5), o2 = t5[a.toString()];
              if (Math.abs(r5 - a) < s4)
                return o2;
              var l = (n3 = r5 > a ? t5[i3 = a + s4] : t5[i3 = a - s4]) - o2;
              return l < s4 ? o2 : o2 + (r5 - a) / (i3 - a) * (n3 > o2 ? -1 : 1) * l;
            };
            return r4.getSamples = function() {
              return t5;
            }, r4;
          } };
          i2._sample._proximate = i2._proximate;
          const n2 = i2._sample;
        }, 973: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => l });
          var r3 = s3(2), i2 = s3(671), n2 = s3(144), a = s3(52), o2 = s3.n(a);
          const l = function() {
            function t5() {
              var e5 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              (0, i2.Z)(this, t5), this._o = e5, this._index = this._o.index || 0, this._arrayPropertyMap = { strokeDashoffset: 1, strokeDasharray: 1, origin: 1 }, this._skipPropsDelta = { timeline: 1, prevChainModule: 1, callbacksContext: 1 }, this._declareDefaults(), this._extendDefaults(), this._vars(), this._render();
            }
            return (0, n2.Z)(t5, [{ key: "_declareDefaults", value: function() {
              this._defaults = {};
            } }, { key: "_vars", value: function() {
              this._progress = 0, this._strokeDasharrayBuffer = [];
            } }, { key: "_render", value: function() {
            } }, { key: "_setProp", value: function(t6, e5) {
              if ("object" === (0, r3.Z)(t6))
                for (var s4 in t6)
                  this._assignProp(s4, t6[s4]);
              else
                this._assignProp(t6, e5);
            } }, { key: "_assignProp", value: function(t6, e5) {
              this._props[t6] = e5;
            } }, { key: "_show", value: function() {
              var t6 = this._props;
              this.el && (t6.isSoftHide ? this._showByTransform() : this.el.style.display = "block", this._isShown = true);
            } }, { key: "_hide", value: function() {
              this.el && (this._props.isSoftHide ? o2().setPrefixedStyle(this.el, "transform", "scale(0)") : this.el.style.display = "none", this._isShown = false);
            } }, { key: "_showByTransform", value: function() {
            } }, { key: "_parseOptionString", value: function(t6) {
              return "string" == typeof t6 && t6.match(/stagger/) && (t6 = o2().parseStagger(t6, this._index)), "string" == typeof t6 && t6.match(/rand/) && (t6 = o2().parseRand(t6)), t6;
            } }, { key: "_parsePositionOption", value: function(t6, e5) {
              return o2().unitOptionMap[t6] && (e5 = o2().parseUnit(e5).string), e5;
            } }, { key: "_parseStrokeDashOption", value: function(t6, e5) {
              var s4 = e5;
              if (this._arrayPropertyMap[t6])
                switch (s4 = [], (0, r3.Z)(e5)) {
                  case "number":
                    s4.push(o2().parseUnit(e5));
                    break;
                  case "string":
                    for (var i3 = e5.split(" "), n3 = 0; n3 < i3.length; n3++)
                      s4.push(o2().parseUnit(i3[n3]));
                }
              return s4;
            } }, { key: "_isDelta", value: function(t6) {
              var e5 = o2().isObject(t6);
              return !(!(e5 = e5 && !t6.unit) || o2().isArray(t6) || o2().isDOM(t6));
            } }, { key: "_getDelta", value: function(t6, e5) {
              var s4;
              if ("left" !== t6 && "top" !== t6 || this._o.ctx || o2().warn("Consider to animate x/y properties instead of left/top,\n        as it would be much more performant", e5), !this._skipPropsDelta || !this._skipPropsDelta[t6]) {
                null != (s4 = o2().parseDelta(t6, e5, this._index)).type && (this._deltas[t6] = s4);
                var i3 = "object" === (0, r3.Z)(s4.end) ? 0 === s4.end.value ? 0 : s4.end.string : s4.end;
                this._props[t6] = i3;
              }
            } }, { key: "_extendDefaults", value: function() {
              for (var t6 in this._props = {}, this._deltas = {}, this._defaults) {
                var e5 = null != this._o[t6] ? this._o[t6] : this._defaults[t6];
                this._parseOption(t6, e5);
              }
            } }, { key: "_tuneNewOptions", value: function(t6) {
              for (var e5 in this._hide(), t6)
                t6 && delete this._deltas[e5], this._o[e5] = t6[e5], this._parseOption(e5, t6[e5]);
            } }, { key: "_parseOption", value: function(t6, e5) {
              if (this._isDelta(e5) && !this._skipPropsDelta[t6]) {
                this._getDelta(t6, e5);
                var s4 = o2().getDeltaEnd(e5);
                return this._assignProp(t6, this._parseProperty(t6, s4));
              }
              this._assignProp(t6, this._parseProperty(t6, e5));
            } }, { key: "_parsePreArrayProperty", value: function(t6, e5) {
              return e5 = this._parseOptionString(e5), this._parsePositionOption(t6, e5);
            } }, { key: "_parseProperty", value: function(t6, e5) {
              return "parent" === t6 ? o2().parseEl(e5) : (e5 = this._parsePreArrayProperty(t6, e5), this._parseStrokeDashOption(t6, e5));
            } }, { key: "_parseDeltaValues", value: function(t6, e5) {
              var s4 = {};
              for (var r4 in e5) {
                var i3 = e5[r4], n3 = this._parsePreArrayProperty(t6, i3);
                s4[this._parsePreArrayProperty(t6, r4)] = n3;
              }
              return s4;
            } }, { key: "_preparsePropValue", value: function(t6, e5) {
              return this._isDelta(e5) ? this._parseDeltaValues(t6, e5) : this._parsePreArrayProperty(t6, e5);
            } }, { key: "_calcCurrentProps", value: function(t6, e5) {
              for (var s4 in this._deltas) {
                var r4 = this._deltas[s4], i3 = !!r4.curve, n3 = null == r4.easing || i3 ? t6 : r4.easing(e5);
                if ("array" === r4.type) {
                  var a2;
                  o2().isArray(this._props[s4]) ? (a2 = this._props[s4]).length = 0 : a2 = [];
                  for (var l2 = i3 ? r4.curve(e5) : null, h = 0; h < r4.delta.length; h++) {
                    var u = r4.delta[h], p = i3 ? l2 * (r4.start[h].value + e5 * u.value) : r4.start[h].value + n3 * u.value;
                    a2.push({ string: "".concat(p).concat(u.unit), value: p, unit: u.unit });
                  }
                  this._props[s4] = a2;
                } else if ("number" === r4.type)
                  this._props[s4] = i3 ? r4.curve(e5) * (r4.start + e5 * r4.delta) : r4.start + n3 * r4.delta;
                else if ("unit" === r4.type) {
                  var c = i3 ? r4.curve(e5) * (r4.start.value + e5 * r4.delta) : r4.start.value + n3 * r4.delta;
                  this._props[s4] = "".concat(c).concat(r4.end.unit);
                } else if ("color" === r4.type) {
                  var d, _, f, v;
                  if (i3) {
                    var y = r4.curve(e5);
                    d = parseInt(y * (r4.start.r + e5 * r4.delta.r), 10), _ = parseInt(y * (r4.start.g + e5 * r4.delta.g), 10), f = parseInt(y * (r4.start.b + e5 * r4.delta.b), 10), v = parseFloat(y * (r4.start.a + e5 * r4.delta.a));
                  } else
                    d = parseInt(r4.start.r + n3 * r4.delta.r, 10), _ = parseInt(r4.start.g + n3 * r4.delta.g, 10), f = parseInt(r4.start.b + n3 * r4.delta.b, 10), v = parseFloat(r4.start.a + n3 * r4.delta.a);
                  this._props[s4] = "rgba(".concat(d, ",").concat(_, ",").concat(f, ",").concat(v, ")");
                }
              }
            } }, { key: "_setProgress", value: function(t6, e5) {
              this._progress = t6, this._calcCurrentProps(t6, e5);
            } }]), t5;
          }();
        }, 623: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => c });
          var r3 = s3(2), i2 = s3(671), n2 = s3(144), a = s3(340), o2 = s3(963), l = s3(120), h = s3(52), u = s3.n(h);
          function p(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s4, r4 = (0, l.Z)(t5);
              if (e5) {
                var i3 = (0, l.Z)(this).constructor;
                s4 = Reflect.construct(r4, arguments, i3);
              } else
                s4 = r4.apply(this, arguments);
              return (0, o2.Z)(this, s4);
            };
          }
          const c = function(t5) {
            (0, a.Z)(s4, t5);
            var e5 = p(s4);
            function s4() {
              return (0, i2.Z)(this, s4), e5.apply(this, arguments);
            }
            return (0, n2.Z)(s4, [{ key: "_declareDefaults", value: function() {
              this._defaults = { ns: "http://www.w3.org/2000/svg", tag: "ellipse", parent: document.body, ratio: 1, radius: 50, radiusX: null, radiusY: null, stroke: "hotpink", "stroke-dasharray": "", "stroke-dashoffset": "", "stroke-linecap": "", "stroke-width": 2, "stroke-opacity": 1, fill: "transparent", "fill-opacity": 1, width: 0, height: 0 }, this._drawMap = ["stroke", "stroke-width", "stroke-opacity", "stroke-dasharray", "fill", "stroke-dashoffset", "stroke-linecap", "fill-opacity", "transform"];
            } }, { key: "_vars", value: function() {
              this._state = {}, this._drawMapLength = this._drawMap.length;
            } }, { key: "_render", value: function() {
              this._isRendered || (this._isRendered = true, this._createSVGCanvas(), this._setCanvasSize(), this._props.parent.appendChild(this._canvas));
            } }, { key: "_createSVGCanvas", value: function() {
              var t6 = this._props;
              this._canvas = document.createElementNS(t6.ns, "svg"), this.el = document.createElementNS(t6.ns, t6.tag), this._canvas.appendChild(this.el);
            } }, { key: "_setCanvasSize", value: function() {
              var t6 = this._canvas.style;
              t6.display = "block", t6.width = "100%", t6.height = "100%", t6.left = "0px", t6.top = "0px";
            } }, { key: "_draw", value: function() {
              this._props.length = this._getLength();
              for (var t6 = this._drawMapLength; t6--; ) {
                var e6 = this._drawMap[t6];
                switch (e6) {
                  case "stroke-dasharray":
                  case "stroke-dashoffset":
                    this.castStrokeDash(e6);
                }
                this._setAttrIfChanged(e6, this._props[e6]);
              }
              this._state.radius = this._props.radius;
            } }, { key: "castStrokeDash", value: function(t6) {
              var e6 = this._props;
              if (u().isArray(e6[t6])) {
                for (var s5 = "", i3 = 0; i3 < e6[t6].length; i3++) {
                  var n3 = e6[t6][i3], a2 = "%" === n3.unit ? this.castPercent(n3.value) : n3.value;
                  s5 += "".concat(a2, " ");
                }
                return e6[t6] = "0 " === s5 ? s5 = "" : s5, e6[t6] = s5;
              }
              "object" === (0, r3.Z)(e6[t6]) && (s5 = "%" === e6[t6].unit ? this.castPercent(e6[t6].value) : e6[t6].value, e6[t6] = 0 === s5 ? s5 = "" : s5);
            } }, { key: "castPercent", value: function(t6) {
              return t6 * (this._props.length / 100);
            } }, { key: "_setAttrIfChanged", value: function(t6, e6) {
              this._state[t6] !== e6 && (this.el.setAttribute(t6, e6), this._state[t6] = e6);
            } }, { key: "_getLength", value: function() {
              var t6 = this._props;
              return this.el && this.el.getTotalLength && this.el.getAttribute("d") ? this.el.getTotalLength() : 2 * (null != t6.radiusX ? t6.radiusX : t6.radius);
            } }, { key: "_getPointsPerimiter", value: function(t6) {
              for (var e6 = 0, s5 = 1; s5 < t6.length; s5++)
                e6 += this._pointsDelta(t6[s5 - 1], t6[s5]);
              return e6 += this._pointsDelta(t6[0], u().getLastItem(t6));
            } }, { key: "_pointsDelta", value: function(t6, e6) {
              var s5 = Math.abs(t6.x - e6.x), r4 = Math.abs(t6.y - e6.y);
              return Math.sqrt(s5 * s5 + r4 * r4);
            } }, { key: "_setSize", value: function(t6, e6) {
              var s5 = this._props;
              s5.width = t6, s5.height = e6, this._draw();
            } }]), s4;
          }(s3(973).Z);
        }, 472: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => u });
          var r3 = s3(671), i2 = s3(144), n2 = s3(752), a = s3(340), o2 = s3(963), l = s3(120);
          function h(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s4, r4 = (0, l.Z)(t5);
              if (e5) {
                var i3 = (0, l.Z)(this).constructor;
                s4 = Reflect.construct(r4, arguments, i3);
              } else
                s4 = r4.apply(this, arguments);
              return (0, o2.Z)(this, s4);
            };
          }
          const u = function(t5) {
            (0, a.Z)(s4, t5);
            var e5 = h(s4);
            function s4() {
              return (0, r3.Z)(this, s4), e5.apply(this, arguments);
            }
            return (0, i2.Z)(s4, [{ key: "_declareDefaults", value: function() {
              (0, n2.Z)((0, l.Z)(s4.prototype), "_declareDefaults", this).call(this), this._defaults.tag = "path";
            } }, { key: "_draw", value: function() {
              (0, n2.Z)((0, l.Z)(s4.prototype), "_draw", this).call(this);
              var t6 = this._props, e6 = null != t6.radiusX ? t6.radiusX : t6.radius, r4 = null != t6.radiusY ? t6.radiusY : t6.radius, i3 = e6 === this._prevRadiusX, a2 = r4 === this._prevRadiusY, o3 = t6.points === this._prevPoints;
              if (!(i3 && a2 && o3)) {
                var h2 = t6.width / 2, u2 = t6.height / 2, p = h2 + e6, c = "M".concat(h2 - e6, " ").concat(u2, " Q ").concat(h2, " ").concat(u2 - 2 * r4, " ").concat(p, " ").concat(u2);
                this.el.setAttribute("d", c), this._prevPoints = t6.points, this._prevRadiusX = e6, this._prevRadiusY = r4;
              }
            } }, { key: "_getLength", value: function() {
              var t6 = this._props, e6 = null != t6.radiusX ? t6.radiusX : t6.radius, s5 = null != t6.radiusY ? t6.radiusY : t6.radius, r4 = e6 + s5, i3 = Math.sqrt((3 * e6 + s5) * (e6 + 3 * s5));
              return 0.5 * Math.PI * (3 * r4 - i3);
            } }]), s4;
          }(s3(623).Z);
        }, 854: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => u });
          var r3 = s3(671), i2 = s3(144), n2 = s3(752), a = s3(340), o2 = s3(963), l = s3(120);
          function h(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s4, r4 = (0, l.Z)(t5);
              if (e5) {
                var i3 = (0, l.Z)(this).constructor;
                s4 = Reflect.construct(r4, arguments, i3);
              } else
                s4 = r4.apply(this, arguments);
              return (0, o2.Z)(this, s4);
            };
          }
          const u = function(t5) {
            (0, a.Z)(s4, t5);
            var e5 = h(s4);
            function s4() {
              return (0, r3.Z)(this, s4), e5.apply(this, arguments);
            }
            return (0, i2.Z)(s4, [{ key: "_declareDefaults", value: function() {
              (0, n2.Z)((0, l.Z)(s4.prototype), "_declareDefaults", this).call(this), this._defaults.tag = "path", this._defaults.parent = null;
              for (var t6 = 0; t6 < this._drawMap.length; t6++)
                "stroke-width" === this._drawMap[t6] && this._drawMap.splice(t6, 1);
            } }, { key: "getShape", value: function() {
              return "";
            } }, { key: "getLength", value: function() {
              return 100;
            } }, { key: "_draw", value: function() {
              var t6 = this._props, e6 = this._state, r4 = e6.radiusX !== t6.radiusX, i3 = e6.radiusY !== t6.radiusY, a2 = e6.radius !== t6.radius;
              (r4 || i3 || a2) && (this.el.setAttribute("transform", this._getScale()), e6.radiusX = t6.radiusX, e6.radiusY = t6.radiusY, e6.radius = t6.radius), this._setAttrIfChanged("stroke-width", t6["stroke-width"] / t6.maxScale), (0, n2.Z)((0, l.Z)(s4.prototype), "_draw", this).call(this);
            } }, { key: "_render", value: function() {
              if (!this._isRendered) {
                this._isRendered = true, this._length = this.getLength();
                var t6 = this._props;
                t6.parent.innerHTML = '<svg id="js-mojs-shape-canvas" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><g id="js-mojs-shape-el">'.concat(this.getShape(), "</g></svg>"), this._canvas = t6.parent.querySelector("#js-mojs-shape-canvas"), this.el = t6.parent.querySelector("#js-mojs-shape-el"), this._setCanvasSize();
              }
            } }, { key: "_getScale", value: function() {
              var t6 = this._props, e6 = t6.radiusX ? t6.radiusX : t6.radius, s5 = t6.radiusY ? t6.radiusY : t6.radius;
              t6.scaleX = 2 * e6 / 100, t6.scaleY = 2 * s5 / 100, t6.maxScale = Math.max(t6.scaleX, t6.scaleY), t6.shiftX = t6.width / 2 - 50 * t6.scaleX, t6.shiftY = t6.height / 2 - 50 * t6.scaleY;
              var r4 = "translate(".concat(t6.shiftX, ", ").concat(t6.shiftY, ")");
              return "".concat(r4, " scale(").concat(t6.scaleX, ", ").concat(t6.scaleY, ")");
            } }, { key: "_getLength", value: function() {
              return this._length;
            } }]), s4;
          }(s3(623).Z);
        }, 342: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => d });
          var r3 = s3(671), i2 = s3(144), n2 = s3(340), a = s3(963), o2 = s3(752), l = s3(120), h = s3(52), u = s3.n(h), p = s3(755);
          function c(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s4, r4 = (0, l.Z)(t5);
              if (e5) {
                var i3 = (0, l.Z)(this).constructor;
                s4 = Reflect.construct(r4, arguments, i3);
              } else
                s4 = r4.apply(this, arguments);
              return (0, a.Z)(this, s4);
            };
          }
          const d = function(t5) {
            (0, n2.Z)(s4, t5);
            var e5 = c(s4);
            function s4() {
              var t6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return (0, r3.Z)(this, s4), e5.call(this, t6);
            }
            return (0, i2.Z)(s4, [{ key: "add", value: function() {
              for (var t6 = arguments.length, e6 = new Array(t6), s5 = 0; s5 < t6; s5++)
                e6[s5] = arguments[s5];
              return this._pushTimelineArray(e6), this._calcDimentions(), this;
            } }, { key: "append", value: function() {
              for (var t6 = arguments.length, e6 = new Array(t6), s5 = 0; s5 < t6; s5++)
                e6[s5] = arguments[s5];
              for (var r4 = 0, i3 = e6; r4 < i3.length; r4++) {
                var n3 = i3[r4];
                u().isArray(n3) ? this._appendTimelineArray(n3) : this._appendTimeline(n3, this._timelines.length), this._calcDimentions();
              }
              return this;
            } }, { key: "stop", value: function(t6) {
              return (0, o2.Z)((0, l.Z)(s4.prototype), "stop", this).call(this, t6), this._stopChildren(t6), this;
            } }, { key: "reset", value: function() {
              return (0, o2.Z)((0, l.Z)(s4.prototype), "reset", this).call(this), this._resetChildren(), this;
            } }, { key: "_resetChildren", value: function() {
              for (var t6 = 0; t6 < this._timelines.length; t6++)
                this._timelines[t6].reset();
            } }, { key: "_stopChildren", value: function(t6) {
              for (var e6 = this._timelines.length - 1; e6 >= 0; e6--)
                this._timelines[e6].stop(t6);
            } }, { key: "_appendTimelineArray", value: function(t6) {
              for (var e6 = t6.length, s5 = this._props.repeatTime - this._props.delay, r4 = this._timelines.length; e6--; )
                this._appendTimeline(t6[e6], r4, s5);
            } }, { key: "_appendTimeline", value: function(t6, e6, r4) {
              t6.timeline instanceof s4 && (t6 = t6.timeline), t6.tween instanceof p.Z && (t6 = t6.tween);
              var i3 = null != r4 ? r4 : this._props.duration;
              i3 += t6._props.shiftTime || 0, t6.index = e6, this._pushTimeline(t6, i3);
            } }, { key: "_pushTimelineArray", value: function(t6) {
              for (var e6 = 0; e6 < t6.length; e6++) {
                var s5 = t6[e6];
                u().isArray(s5) ? this._pushTimelineArray(s5) : this._pushTimeline(s5);
              }
            } }, { key: "_pushTimeline", value: function(t6, e6) {
              t6.timeline instanceof s4 && (t6 = t6.timeline), t6.tween instanceof p.Z && (t6 = t6.tween), null != e6 && t6._setProp({ shiftTime: e6 }), this._timelines.push(t6), this._recalcDuration(t6);
            } }, { key: "_setProgress", value: function(t6, e6, s5) {
              this._updateChildren(t6, e6, s5), p.Z.prototype._setProgress.call(this, t6, e6);
            } }, { key: "_updateChildren", value: function(t6, e6, s5) {
              var r4 = e6 > this._prevTime ? -1 : 1;
              this._props.isYoyo && s5 && (r4 *= -1);
              for (var i3 = this._props.startTime + t6 * this._props.duration, n3 = i3 + r4, a2 = this._timelines.length, o3 = 0; o3 < a2; o3++) {
                var l2 = i3 > n3 ? o3 : a2 - 1 - o3;
                this._timelines[l2]._update(i3, n3, this._prevYoyo, this._onEdge);
              }
              this._prevYoyo = s5;
            } }, { key: "_recalcDuration", value: function(t6) {
              var e6 = t6._props, s5 = e6.repeatTime / e6.speed + (e6.shiftTime || 0) + t6._negativeShift;
              this._props.duration = Math.max(s5, this._props.duration);
            } }, { key: "_recalcTotalDuration", value: function() {
              var t6 = this._timelines.length;
              for (this._props.duration = 0; t6--; ) {
                var e6 = this._timelines[t6];
                e6._recalcTotalDuration && e6._recalcTotalDuration(), this._recalcDuration(e6);
              }
              this._calcDimentions();
            } }, { key: "_setStartTime", value: function(t6) {
              var e6 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              (0, o2.Z)((0, l.Z)(s4.prototype), "_setStartTime", this).call(this, t6), this._startTimelines(this._props.startTime, e6);
            } }, { key: "_startTimelines", value: function(t6) {
              var e6 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], s5 = "stop" === this._state;
              null == t6 && (t6 = this._props.startTime);
              for (var r4 = 0; r4 < this._timelines.length; r4++) {
                var i3 = this._timelines[r4];
                i3._setStartTime(t6, e6), e6 || null == i3._prevTime || s5 || (i3._prevTime = i3._normPrevTimeForward());
              }
            } }, { key: "_refresh", value: function(t6) {
              for (var e6 = this._timelines.length, r4 = 0; r4 < e6; r4++)
                this._timelines[r4]._refresh(t6);
              (0, o2.Z)((0, l.Z)(s4.prototype), "_refresh", this).call(this, t6);
            } }, { key: "_declareDefaults", value: function() {
              null != this._o.duration && (u().error('Duration can not be declared on Timeline, but "'.concat(this._o.duration, '" is. You probably want to use Tween instead.')), this._o.duration = 0), (0, o2.Z)((0, l.Z)(s4.prototype), "_declareDefaults", this).call(this), this._defaults.duration = 0, this._defaults.easing = "Linear.None", this._defaults.backwardEasing = "Linear.None", this._defaults.nameBase = "Timeline";
            } }, { key: "_vars", value: function() {
              this._timelines = [], (0, o2.Z)((0, l.Z)(s4.prototype), "_vars", this).call(this);
            } }]), s4;
          }(p.Z);
        }, 755: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => _ });
          var r3 = s3(671), i2 = s3(144), n2 = s3(326), a = s3(752), o2 = s3(340), l = s3(963), h = s3(120), u = s3(47), p = s3(283), c = s3.n(p);
          function d(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s4, r4 = (0, h.Z)(t5);
              if (e5) {
                var i3 = (0, h.Z)(this).constructor;
                s4 = Reflect.construct(r4, arguments, i3);
              } else
                s4 = r4.apply(this, arguments);
              return (0, l.Z)(this, s4);
            };
          }
          const _ = function(t5) {
            (0, o2.Z)(s4, t5);
            var e5 = d(s4);
            function s4() {
              var t6, i3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return (0, r3.Z)(this, s4), null == (t6 = e5.call(this, i3))._props.name && t6._setSelfName(), (0, l.Z)(t6, (0, n2.Z)(t6));
            }
            return (0, i2.Z)(s4, [{ key: "_declareDefaults", value: function() {
              this._defaults = { duration: 350, delay: 0, repeat: 0, speed: 1, isYoyo: false, easing: "Sin.Out", backwardEasing: null, name: null, nameBase: "Tween", onProgress: null, onStart: null, onRefresh: null, onComplete: null, onRepeatStart: null, onRepeatComplete: null, onFirstUpdate: null, onUpdate: null, isChained: false, onPlaybackStart: null, onPlaybackPause: null, onPlaybackStop: null, onPlaybackComplete: null, callbacksContext: null };
            } }, { key: "play", value: function() {
              var t6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return "play" === this._state && this._isRunning || (this._props.isReversed = false, this._subPlay(t6, "play"), this._setPlaybackState("play")), this;
            } }, { key: "playBackward", value: function() {
              var t6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return "reverse" === this._state && this._isRunning || (this._props.isReversed = true, this._subPlay(t6, "reverse"), this._setPlaybackState("reverse")), this;
            } }, { key: "pause", value: function() {
              return "pause" === this._state || "stop" === this._state || (this._removeFromTweener(), this._setPlaybackState("pause")), this;
            } }, { key: "stop", value: function(t6) {
              if ("stop" === this._state)
                return this;
              this._wasUknownUpdate = void 0;
              var e6 = null != t6 ? t6 : "reverse" === this._state ? 1 : 0;
              return this.setProgress(e6), this.reset(), this;
            } }, { key: "replay", value: function() {
              var t6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return this.reset(), this.play(t6), this;
            } }, { key: "replayBackward", value: function() {
              var t6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return this.reset(), this.playBackward(t6), this;
            } }, { key: "resume", value: function() {
              var t6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              if ("pause" !== this._state)
                return this;
              switch (this._prevState) {
                case "play":
                  this.play(t6);
                  break;
                case "reverse":
                  this.playBackward(t6);
              }
              return this;
            } }, { key: "setProgress", value: function(t6) {
              var e6 = this._props;
              return !e6.startTime && this._setStartTime(), this._playTime = null, t6 < 0 && (t6 = 0), t6 > 1 && (t6 = 1), this._update(e6.startTime - e6.delay + t6 * e6.repeatTime), this;
            } }, { key: "setSpeed", value: function(t6) {
              return this._props.speed = t6, "play" !== this._state && "reverse" !== this._state || this._setResumeTime(this._state), this;
            } }, { key: "reset", value: function() {
              return this._removeFromTweener(), this._setPlaybackState("stop"), this._progressTime = 0, this._isCompleted = false, this._isStarted = false, this._isFirstUpdate = false, this._wasUknownUpdate = void 0, this._prevTime = void 0, this._prevYoyo = void 0, this._props.isReversed = false, this;
            } }, { key: "_subPlay", value: function() {
              var t6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e6 = arguments.length > 1 ? arguments[1] : void 0, s5 = this._props, r4 = this._state, i3 = this._prevState, n3 = "pause" === r4, a2 = ("play" === r4 || n3 && "play" === i3) && "reverse" === e6 || ("reverse" === r4 || n3 && "reverse" === i3) && "play" === e6;
              return this._progressTime = this._progressTime >= s5.repeatTime ? 0 : this._progressTime, a2 && (this._progressTime = s5.repeatTime - this._progressTime), this._setResumeTime(e6, t6), u.Z.add(this), this;
            } }, { key: "_setResumeTime", value: function(t6) {
              var e6 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              this._resumeTime = performance.now();
              var s5 = this._resumeTime - Math.abs(e6) - this._progressTime;
              this._setStartTime(s5, false), null != this._prevTime && (this._prevTime = "play" === t6 ? this._normPrevTimeForward() : this._props.endTime - this._progressTime);
            } }, { key: "_normPrevTimeForward", value: function() {
              var t6 = this._props;
              return t6.startTime + this._progressTime - t6.delay;
            } }, { key: "_setSelfName", value: function() {
              var t6 = "_".concat(this._props.nameBase, "s");
              u.Z[t6] = null == u.Z[t6] ? 1 : ++u.Z[t6], this._props.name = "".concat(this._props.nameBase, " ").concat(u.Z[t6]);
            } }, { key: "_setPlaybackState", value: function(t6) {
              this._prevState = this._state, this._state = t6;
              var e6 = "pause" === this._prevState, s5 = "stop" === this._prevState, r4 = "play" === this._prevState, i3 = "reverse" === this._prevState, n3 = r4 || i3;
              "play" !== t6 && "reverse" !== t6 || !(s5 || e6) || this._playbackStart(), "pause" === t6 && n3 && this._playbackPause(), "stop" === t6 && (n3 || e6) && this._playbackStop();
            } }, { key: "_vars", value: function() {
              return this.progress = 0, this._prevTime = void 0, this._progressTime = 0, this._negativeShift = 0, this._state = "stop", this._props.delay < 0 && (this._negativeShift = this._props.delay, this._props.delay = 0), this._calcDimentions();
            } }, { key: "_calcDimentions", value: function() {
              this._props.time = this._props.duration + this._props.delay, this._props.repeatTime = this._props.time * (this._props.repeat + 1);
            } }, { key: "_extendDefaults", value: function() {
              this._callbackOverrides = this._o.callbackOverrides || {}, delete this._o.callbackOverrides, (0, a.Z)((0, h.Z)(s4.prototype), "_extendDefaults", this).call(this);
              var t6 = this._props;
              t6.easing = c().parseEasing(t6.easing), t6.easing._parent = this, null != t6.backwardEasing && (t6.backwardEasing = c().parseEasing(t6.backwardEasing), t6.backwardEasing._parent = this);
            } }, { key: "_setStartTime", value: function(t6) {
              var e6 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], s5 = this._props, r4 = s5.shiftTime || 0;
              e6 && (this._isCompleted = false, this._isRepeatCompleted = false, this._isStarted = false);
              var i3 = null == t6 ? performance.now() : t6;
              return s5.startTime = i3 + s5.delay + this._negativeShift + r4, s5.endTime = s5.startTime + s5.repeatTime - s5.delay, this._playTime = null != this._resumeTime ? this._resumeTime : i3 + r4, this._resumeTime = null, this;
            } }, { key: "_update", value: function(t6, e6, s5, r4) {
              var i3 = this._props;
              null == this._prevTime && null != e6 && (this._props.speed && this._playTime && (this._prevTime = this._playTime + this._props.speed * (e6 - this._playTime)), this._wasUknownUpdate = true);
              var n3 = i3.startTime - i3.delay;
              if (i3.speed && this._playTime && (t6 = this._playTime + i3.speed * (t6 - this._playTime)), Math.abs(i3.endTime - t6) < 1e-8 && (t6 = i3.endTime), r4 && null != s5) {
                var a2 = this._getPeriod(t6), o3 = !(!i3.isYoyo || !this._props.repeat || a2 % 2 != 1);
                if (this._timelines)
                  for (var l2 = 0; l2 < this._timelines.length; l2++)
                    this._timelines[l2]._update(t6, e6, s5, r4);
                1 === r4 ? s5 ? (this._prevTime = t6 + 1, this._repeatStart(t6, o3), this._start(t6, o3)) : (this._prevTime = t6 - 1, this._repeatComplete(t6, o3), this._complete(t6, o3)) : -1 === r4 && (s5 ? (this._prevTime = t6 - 1, this._repeatComplete(t6, o3), this._complete(t6, o3)) : this._prevTime >= i3.startTime && this._prevTime <= i3.endTime && (this._prevTime = t6 + 1, this._repeatStart(t6, o3), this._start(t6, o3), this._isCompleted = true)), this._prevTime = void 0;
              }
              return t6 > n3 && t6 < i3.endTime ? this._progressTime = t6 - n3 : t6 <= n3 ? this._progressTime = 0 : t6 >= i3.endTime && (this._progressTime = i3.repeatTime + 1e-11), i3.isReversed && (t6 = i3.endTime - this._progressTime), null == this._prevTime ? (this._prevTime = t6, this._wasUknownUpdate = true, false) : (t6 >= n3 && t6 <= i3.endTime && this._progress((t6 - n3) / i3.repeatTime, t6), t6 >= i3.startTime && t6 <= i3.endTime ? this._updateInActiveArea(t6) : this._isInActiveArea ? this._updateInInactiveArea(t6) : this._isRefreshed || t6 < i3.startTime && 0 !== this.progress && (this._refresh(true), this._isRefreshed = true), this._prevTime = t6, t6 >= i3.endTime || t6 <= n3);
            } }, { key: "_updateInInactiveArea", value: function(t6) {
              if (this._isInActiveArea) {
                var e6 = this._props;
                if (t6 > e6.endTime && !this._isCompleted) {
                  this._progress(1, t6);
                  var s5 = this._getPeriod(e6.endTime), r4 = e6.isYoyo && s5 % 2 == 0;
                  this._setProgress(r4 ? 0 : 1, t6, r4), this._repeatComplete(t6, r4), this._complete(t6, r4);
                }
                t6 < this._prevTime && t6 < e6.startTime && !this._isStarted && !this._isCompleted && (this._progress(0, t6, false), this._setProgress(0, t6, false), this._isRepeatStart = false, this._repeatStart(t6, false), this._start(t6, false)), this._isInActiveArea = false;
              }
            } }, { key: "_updateInActiveArea", value: function(t6) {
              var e6 = this._props, s5 = e6.delay + e6.duration, r4 = e6.startTime - e6.delay, i3 = (t6 - e6.startTime + e6.delay) % s5, n3 = Math.round((e6.endTime - e6.startTime + e6.delay) / s5), a2 = this._getPeriod(t6), o3 = this._delayT, l2 = this._getPeriod(this._prevTime), h2 = this._delayT, u2 = e6.isYoyo && a2 % 2 == 1, p2 = e6.isYoyo && l2 % 2 == 1, c2 = u2 ? 1 : 0;
              if (t6 === e6.endTime)
                return this._wasUknownUpdate = false, u2 = e6.isYoyo && (a2 - 1) % 2 == 1, this._setProgress(u2 ? 0 : 1, t6, u2), t6 > this._prevTime && (this._isRepeatCompleted = false), this._repeatComplete(t6, u2), this._complete(t6, u2);
              if (this._isCompleted = false, this._isRefreshed = false, r4 + i3 >= e6.startTime) {
                this._isInActiveArea = true, this._isRepeatCompleted = false, this._isRepeatStart = false, this._isStarted = false;
                var d2 = (t6 - e6.startTime) % s5 / e6.duration, _2 = a2 > 0 && l2 < a2, f = l2 > a2;
                if (this._onEdge = 0, _2 && (this._onEdge = 1), f && (this._onEdge = -1), this._wasUknownUpdate && (t6 > this._prevTime && (this._start(t6, u2), this._repeatStart(t6, u2), this._firstUpdate(t6, u2)), t6 < this._prevTime && (this._complete(t6, u2), this._repeatComplete(t6, u2), this._firstUpdate(t6, u2), this._isCompleted = false)), _2) {
                  if (1 !== this.progress) {
                    var v = e6.isYoyo && (a2 - 1) % 2 == 1;
                    this._repeatComplete(t6, v);
                  }
                  l2 >= 0 && this._repeatStart(t6, u2);
                }
                t6 > this._prevTime && (!this._isStarted && this._prevTime <= e6.startTime && (this._start(t6, u2), this._repeatStart(t6, u2), this._isStarted = false, this._isRepeatStart = false), this._firstUpdate(t6, u2)), f && (0 !== this.progress && 1 !== this.progress && l2 != n3 && this._repeatStart(t6, p2), l2 !== n3 || this._wasUknownUpdate || (this._complete(t6, u2), this._repeatComplete(t6, u2), this._firstUpdate(t6, u2), this._isCompleted = false), this._repeatComplete(t6, u2)), "delay" === l2 && (a2 < h2 && this._repeatComplete(t6, u2), a2 === h2 && a2 > 0 && this._repeatStart(t6, u2)), t6 > this._prevTime ? (0 === d2 && this._repeatStart(t6, u2), t6 !== e6.endTime && this._setProgress(u2 ? 1 - d2 : d2, t6, u2)) : (t6 !== e6.endTime && this._setProgress(u2 ? 1 - d2 : d2, t6, u2), 0 === d2 && this._repeatStart(t6, u2)), t6 === e6.startTime && this._start(t6, u2);
              } else if (this._isInActiveArea) {
                var y = "delay" === a2 ? o3 : a2, m = t6 > this._prevTime;
                m && y--, c2 = e6.isYoyo && y % 2 == 1 ? 1 : 0, t6 < this._prevTime && (this._setProgress(c2, t6, 1 === c2), this._repeatStart(t6, 1 === c2)), this._setProgress(m ? 1 - c2 : c2, t6, 1 === c2), t6 > this._prevTime && (0 === this.progress && 1 !== c2 || this._repeatComplete(t6, 1 === c2)), this._isInActiveArea = false;
              }
              this._wasUknownUpdate = false;
            } }, { key: "_removeFromTweener", value: function() {
              return u.Z.remove(this), this;
            } }, { key: "_getPeriod", value: function(t6) {
              var e6 = this._props, s5 = e6.delay + e6.duration, r4 = e6.delay + t6 - e6.startTime, i3 = r4 / s5, n3 = t6 < e6.endTime ? r4 % s5 : 0;
              return i3 = t6 >= e6.endTime ? Math.round(i3) : Math.floor(i3), t6 > e6.endTime ? i3 = Math.round((e6.endTime - e6.startTime + e6.delay) / s5) : n3 > 0 && n3 < e6.delay && (this._delayT = i3, i3 = "delay"), i3;
            } }, { key: "_setProgress", value: function(t6, e6, s5) {
              var r4 = this._props, i3 = r4.wasYoyo !== s5, n3 = e6 > this._prevTime;
              if (this.progress = t6, n3 && !s5 || !n3 && s5)
                this.easedProgress = r4.easing(t6);
              else if (!n3 && !s5 || n3 && s5) {
                var a2 = null != r4.backwardEasing ? r4.backwardEasing : r4.easing;
                this.easedProgress = a2(t6);
              }
              return (r4.prevEasedProgress !== this.easedProgress || i3) && null != r4.onUpdate && "function" == typeof r4.onUpdate && r4.onUpdate.call(r4.callbacksContext || this, this.easedProgress, this.progress, n3, s5), r4.prevEasedProgress = this.easedProgress, r4.wasYoyo = s5, this;
            } }, { key: "_start", value: function(t6, e6) {
              if (!this._isStarted) {
                var s5 = this._props;
                null != s5.onStart && "function" == typeof s5.onStart && s5.onStart.call(s5.callbacksContext || this, t6 > this._prevTime, e6), this._isCompleted = false, this._isStarted = true, this._isFirstUpdate = false;
              }
            } }, { key: "_playbackStart", value: function() {
              var t6 = this._props;
              null != t6.onPlaybackStart && "function" == typeof t6.onPlaybackStart && t6.onPlaybackStart.call(t6.callbacksContext || this);
            } }, { key: "_playbackPause", value: function() {
              var t6 = this._props;
              null != t6.onPlaybackPause && "function" == typeof t6.onPlaybackPause && t6.onPlaybackPause.call(t6.callbacksContext || this);
            } }, { key: "_playbackStop", value: function() {
              var t6 = this._props;
              null != t6.onPlaybackStop && "function" == typeof t6.onPlaybackStop && t6.onPlaybackStop.call(t6.callbacksContext || this);
            } }, { key: "_playbackComplete", value: function() {
              var t6 = this._props;
              null != t6.onPlaybackComplete && "function" == typeof t6.onPlaybackComplete && t6.onPlaybackComplete.call(t6.callbacksContext || this);
            } }, { key: "_complete", value: function(t6, e6) {
              if (!this._isCompleted) {
                var s5 = this._props;
                null != s5.onComplete && "function" == typeof s5.onComplete && s5.onComplete.call(s5.callbacksContext || this, t6 > this._prevTime, e6), this._isCompleted = true, this._isStarted = false, this._isFirstUpdate = false, this._prevYoyo = void 0;
              }
            } }, { key: "_firstUpdate", value: function(t6, e6) {
              if (!this._isFirstUpdate) {
                var s5 = this._props;
                null != s5.onFirstUpdate && "function" == typeof s5.onFirstUpdate && (s5.onFirstUpdate.tween = this, s5.onFirstUpdate.call(s5.callbacksContext || this, t6 > this._prevTime, e6)), this._isFirstUpdate = true;
              }
            } }, { key: "_repeatComplete", value: function(t6, e6) {
              if (!this._isRepeatCompleted) {
                var s5 = this._props;
                null != s5.onRepeatComplete && "function" == typeof s5.onRepeatComplete && s5.onRepeatComplete.call(s5.callbacksContext || this, t6 > this._prevTime, e6), this._isRepeatCompleted = true;
              }
            } }, { key: "_repeatStart", value: function(t6, e6) {
              if (!this._isRepeatStart) {
                var s5 = this._props;
                null != s5.onRepeatStart && "function" == typeof s5.onRepeatStart && s5.onRepeatStart.call(s5.callbacksContext || this, t6 > this._prevTime, e6), this._isRepeatStart = true;
              }
            } }, { key: "_progress", value: function(t6, e6) {
              var s5 = this._props;
              null != s5.onProgress && "function" == typeof s5.onProgress && s5.onProgress.call(s5.callbacksContext || this, t6, e6 > this._prevTime);
            } }, { key: "_refresh", value: function(t6) {
              var e6 = this._props;
              if (null != e6.onRefresh) {
                var s5 = e6.callbacksContext || this, r4 = t6 ? 0 : 1;
                e6.onRefresh.call(s5, t6, e6.easing(r4), r4);
              }
            } }, { key: "_onTweenerRemove", value: function() {
            } }, { key: "_onTweenerFinish", value: function() {
              this._setPlaybackState("stop"), this._playbackComplete();
            } }, { key: "_setProp", value: function(t6, e6) {
              (0, a.Z)((0, h.Z)(s4.prototype), "_setProp", this).call(this, t6, e6), this._calcDimentions();
            } }, { key: "_assignProp", value: function(t6, e6) {
              null == e6 && (e6 = this._defaults[t6]), "easing" === t6 && ((e6 = c().parseEasing(e6))._parent = this);
              var r4 = this._callbackOverrides[t6], i3 = !e6 || !e6.isMojsCallbackOverride;
              r4 && i3 && (e6 = this._overrideCallback(e6, r4)), (0, a.Z)((0, h.Z)(s4.prototype), "_assignProp", this).call(this, t6, e6);
            } }, { key: "_overrideCallback", value: function(t6, e6) {
              var s5 = t6 && "function" == typeof t6, r4 = function() {
                s5 && t6.apply(this, arguments), e6.apply(this, arguments);
              };
              return r4.isMojsCallbackOverride = true, r4;
            } }]), s4;
          }(s3(973).Z);
        }, 47: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => n2 });
          var r3 = s3(671), i2 = s3(144);
          const n2 = new (function() {
            function t5() {
              return (0, r3.Z)(this, t5), this._vars(), this._listenVisibilityChange(), this;
            }
            return (0, i2.Z)(t5, [{ key: "_vars", value: function() {
              this.tweens = [], this._savedTweens = [], this._loop = this._loop.bind(this), this._onVisibilityChange = this._onVisibilityChange.bind(this);
            } }, { key: "_loop", value: function() {
              return !!this._isRunning && (this._update(window.performance.now()), this.tweens.length ? (requestAnimationFrame(this._loop), this) : this._isRunning = false);
            } }, { key: "_startLoop", value: function() {
              this._isRunning || (this._isRunning = true, requestAnimationFrame(this._loop));
            } }, { key: "_stopLoop", value: function() {
              this._isRunning = false;
            } }, { key: "_update", value: function(t6) {
              for (var e5 = this.tweens.length; e5--; ) {
                var s4 = this.tweens[e5];
                s4 && true === s4._update(t6) && (this.remove(s4), s4._onTweenerFinish(), s4._prevTime = void 0);
              }
            } }, { key: "add", value: function(t6) {
              t6._isRunning || (t6._isRunning = true, this.tweens.push(t6), this._startLoop());
            } }, { key: "removeAll", value: function() {
              this.tweens.length = 0;
            } }, { key: "remove", value: function(t6) {
              var e5 = "number" == typeof t6 ? t6 : this.tweens.indexOf(t6);
              -1 !== e5 && (t6 = this.tweens[e5]) && (t6._isRunning = false, this.tweens.splice(e5, 1), t6._onTweenerRemove());
            } }, { key: "_listenVisibilityChange", value: function() {
              void 0 !== document.hidden ? (this._visibilityHidden = "hidden", this._visibilityChange = "visibilitychange") : void 0 !== document.mozHidden ? (this._visibilityHidden = "mozHidden", this._visibilityChange = "mozvisibilitychange") : void 0 !== document.msHidden ? (this._visibilityHidden = "msHidden", this._visibilityChange = "msvisibilitychange") : void 0 !== document.webkitHidden && (this._visibilityHidden = "webkitHidden", this._visibilityChange = "webkitvisibilitychange"), document.addEventListener(this._visibilityChange, this._onVisibilityChange, false);
            } }, { key: "_onVisibilityChange", value: function() {
              document[this._visibilityHidden] ? this._savePlayingTweens() : this._restorePlayingTweens();
            } }, { key: "_savePlayingTweens", value: function() {
              this._savedTweens = this.tweens.slice(0);
              for (var t6 = 0; t6 < this._savedTweens.length; t6++)
                this._savedTweens[t6].pause();
            } }, { key: "_restorePlayingTweens", value: function() {
              for (var t6 = 0; t6 < this._savedTweens.length; t6++)
                this._savedTweens[t6].resume();
            } }]), t5;
          }())();
        }, 977: (t4, e4, s3) => {
          var r3, i2;
          i2 = s3(52), r3 = new class {
            constructor(t5) {
              return this.vars(), this.generate;
            }
            vars() {
              return this.generate = i2.bind(this.generate, this);
            }
            generate(t5, e5, s4, r4) {
              var i3, n2, a, o2, l, h, u, p, c, d, _, f, v, y, m, g, k, w;
              if (arguments.length < 4)
                return this.error("Bezier function expects 4 arguments");
              for (f = v = 0; v < 4; f = ++v)
                if ("number" != typeof (o2 = arguments[f]) || isNaN(o2) || !isFinite(o2))
                  return this.error("Bezier function expects 4 arguments");
              return t5 < 0 || t5 > 1 || s4 < 0 || s4 > 1 ? this.error("Bezier x values should be > 0 and < 1") : (y = 0.1, c = !!Float32Array, i3 = function(t6, e6) {
                return 1 - 3 * e6 + 3 * t6;
              }, n2 = function(t6, e6) {
                return 3 * e6 - 6 * t6;
              }, a = function(t6) {
                return 3 * t6;
              }, h = function(t6, e6, s5) {
                return ((i3(e6, s5) * t6 + n2(e6, s5)) * t6 + a(e6)) * t6;
              }, d = function(t6, e6, s5) {
                return 3 * i3(e6, s5) * t6 * t6 + 2 * n2(e6, s5) * t6 + a(e6);
              }, g = function(e6, r5) {
                var i4;
                for (f = 0; f < 4; ) {
                  if (0 === (i4 = d(r5, t5, s4)))
                    return r5;
                  r5 -= (h(r5, t5, s4) - e6) / i4, ++f;
                }
                return r5;
              }, u = function() {
                for (f = 0; f < 11; )
                  m[f] = h(f * y, t5, s4), ++f;
              }, l = function(e6, r5, i4) {
                var n3, a2;
                for (a2 = void 0, n3 = void 0, f = 0; (a2 = h(n3 = r5 + (i4 - r5) / 2, t5, s4) - e6) > 0 ? i4 = n3 : r5 = n3, Math.abs(a2) > 1e-7 && ++f < 10; )
                  ;
                return n3;
              }, _ = function(e6) {
                var r5, i4, n3, a2, o3, h2;
                for (h2 = 0, r5 = 1; 10 !== r5 && m[r5] <= e6; )
                  h2 += y, ++r5;
                return --r5, i4 = m[r5 + 1] - m[r5], n3 = (e6 - m[r5]) / i4, (o3 = d(a2 = h2 + n3 * y, t5, s4)) >= 1e-3 ? g(e6, a2) : 0 === o3 ? a2 : l(e6, h2, h2 + y);
              }, k = function() {
                if (t5 !== e5 || s4 !== r4)
                  return u();
              }, m = c ? new Float32Array(11) : new Array(11), w = "bezier(" + [t5, e5, s4, r4] + ")", (p = function(i4) {
                return k(), t5 === e5 && s4 === r4 ? i4 : 0 === i4 ? 0 : 1 === i4 ? 1 : h(_(i4), e5, r4);
              }).toStr = function() {
                return w;
              }, p);
            }
            error(t5) {
              return i2.error(t5);
            }
          }(), t4.exports = r3;
        }, 283: function(t4, e4, s3) {
          var r3, i2, n2, a, o2, l, h, u, p;
          h = s3(52), o2 = s3(977), n2 = s3(162), u = s3(440), a = s3(50).Z, p = Math.sin, i2 = Math.PI, r3 = function() {
            class t5 {
              inverse(t6) {
                return 1 - t6;
              }
              parseEasing(t6) {
                var e5;
                return null == t6 && (t6 = "linear.none"), "string" == typeof t6 ? "m" === t6.charAt(0).toLowerCase() ? this.path(t6) : (e5 = this[(t6 = this._splitEasing(t6))[0]]) ? e5[t6[1]] : (h.error(`Easing with name "${t6[0]}" was not found, fallback to "linear.none" instead`), this.linear.none) : h.isArray(t6) ? this.bezier.apply(this, t6) : t6;
              }
              _splitEasing(t6) {
                var e5;
                return "function" == typeof t6 ? t6 : "string" == typeof t6 && t6.length ? [(e5 = t6.split("."))[0].toLowerCase() || "linear", e5[1].toLowerCase() || "none"] : ["linear", "none"];
              }
            }
            return t5.prototype.bezier = o2, t5.prototype.PathEasing = n2, t5.prototype.path = new n2("creator").create, t5.prototype.approximate = a, t5.prototype.linear = { none: function(t6) {
              return t6;
            } }, t5.prototype.ease = { in: o2.apply(t5, [0.42, 0, 1, 1]), out: o2.apply(t5, [0, 0, 0.58, 1]), inout: o2.apply(t5, [0.42, 0, 0.58, 1]) }, t5.prototype.sin = { in: function(t6) {
              return 1 - Math.cos(t6 * i2 / 2);
            }, out: function(t6) {
              return p(t6 * i2 / 2);
            }, inout: function(t6) {
              return 0.5 * (1 - Math.cos(i2 * t6));
            } }, t5.prototype.quad = { in: function(t6) {
              return t6 * t6;
            }, out: function(t6) {
              return t6 * (2 - t6);
            }, inout: function(t6) {
              return (t6 *= 2) < 1 ? 0.5 * t6 * t6 : -0.5 * (--t6 * (t6 - 2) - 1);
            } }, t5.prototype.cubic = { in: function(t6) {
              return t6 * t6 * t6;
            }, out: function(t6) {
              return --t6 * t6 * t6 + 1;
            }, inout: function(t6) {
              return (t6 *= 2) < 1 ? 0.5 * t6 * t6 * t6 : 0.5 * ((t6 -= 2) * t6 * t6 + 2);
            } }, t5.prototype.quart = { in: function(t6) {
              return t6 * t6 * t6 * t6;
            }, out: function(t6) {
              return 1 - --t6 * t6 * t6 * t6;
            }, inout: function(t6) {
              return (t6 *= 2) < 1 ? 0.5 * t6 * t6 * t6 * t6 : -0.5 * ((t6 -= 2) * t6 * t6 * t6 - 2);
            } }, t5.prototype.quint = { in: function(t6) {
              return t6 * t6 * t6 * t6 * t6;
            }, out: function(t6) {
              return --t6 * t6 * t6 * t6 * t6 + 1;
            }, inout: function(t6) {
              return (t6 *= 2) < 1 ? 0.5 * t6 * t6 * t6 * t6 * t6 : 0.5 * ((t6 -= 2) * t6 * t6 * t6 * t6 + 2);
            } }, t5.prototype.expo = { in: function(t6) {
              return 0 === t6 ? 0 : Math.pow(1024, t6 - 1);
            }, out: function(t6) {
              return 1 === t6 ? 1 : 1 - Math.pow(2, -10 * t6);
            }, inout: function(t6) {
              return 0 === t6 ? 0 : 1 === t6 ? 1 : (t6 *= 2) < 1 ? 0.5 * Math.pow(1024, t6 - 1) : 0.5 * (2 - Math.pow(2, -10 * (t6 - 1)));
            } }, t5.prototype.circ = { in: function(t6) {
              return 1 - Math.sqrt(1 - t6 * t6);
            }, out: function(t6) {
              return Math.sqrt(1 - --t6 * t6);
            }, inout: function(t6) {
              return (t6 *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t6 * t6) - 1) : 0.5 * (Math.sqrt(1 - (t6 -= 2) * t6) + 1);
            } }, t5.prototype.back = { in: function(t6) {
              var e5;
              return t6 * t6 * ((1 + (e5 = 1.70158)) * t6 - e5);
            }, out: function(t6) {
              var e5;
              return --t6 * t6 * ((1 + (e5 = 1.70158)) * t6 + e5) + 1;
            }, inout: function(t6) {
              var e5;
              return e5 = 2.5949095, (t6 *= 2) < 1 ? t6 * t6 * ((e5 + 1) * t6 - e5) * 0.5 : 0.5 * ((t6 -= 2) * t6 * ((e5 + 1) * t6 + e5) + 2);
            } }, t5.prototype.elastic = { in: function(t6) {
              return 0 === t6 ? 0 : 1 === t6 ? 1 : -1 * Math.pow(2, 10 * (t6 -= 1)) * Math.sin((t6 - 0.1) * (2 * Math.PI) / 0.4);
            }, out: function(t6) {
              return 0 === t6 ? 0 : 1 === t6 ? 1 : 1 * Math.pow(2, -10 * t6) * Math.sin((t6 - 0.1) * (2 * Math.PI) / 0.4) + 1;
            }, inout: function(t6) {
              return 0 === t6 ? 0 : 1 === t6 ? 1 : (t6 *= 2) < 1 ? 1 * Math.pow(2, 10 * (t6 -= 1)) * Math.sin((t6 - 0.1) * (2 * Math.PI) / 0.4) * -0.5 : 1 * Math.pow(2, -10 * (t6 -= 1)) * Math.sin((t6 - 0.1) * (2 * Math.PI) / 0.4) * 0.5 + 1;
            } }, t5.prototype.bounce = { in: function(t6) {
              return 1 - l.bounce.out(1 - t6);
            }, out: function(t6) {
              return t6 < 1 / 2.75 ? 7.5625 * t6 * t6 : t6 < 2 / 2.75 ? 7.5625 * (t6 -= 1.5 / 2.75) * t6 + 0.75 : t6 < 2.5 / 2.75 ? 7.5625 * (t6 -= 2.25 / 2.75) * t6 + 0.9375 : 7.5625 * (t6 -= 2.625 / 2.75) * t6 + 0.984375;
            }, inout: function(t6) {
              return t6 < 0.5 ? 0.5 * l.bounce.in(2 * t6) : 0.5 * l.bounce.out(2 * t6 - 1) + 0.5;
            } }, t5;
          }.call(this), (l = new r3()).mix = u(l), t4.exports = l;
        }, 440: (t4) => {
          var e4, s3, r3, i2, n2, a;
          s3 = null, n2 = function(t5) {
            return "number" == typeof t5.value ? t5.value : s3.parseEasing(t5.value);
          }, a = function(t5, e5) {
            var s4;
            return t5.value = n2(t5), e5.value = n2(e5), s4 = 0, t5.to < e5.to && (s4 = -1), t5.to > e5.to && (s4 = 1), s4;
          }, r3 = function(t5, e5) {
            var s4, r4, i3;
            for (s4 = r4 = 0, i3 = t5.length; r4 < i3; s4 = ++r4)
              if (t5[s4].to > e5)
                return s4;
          }, i2 = function(...t5) {
            return t5.length > 1 ? t5 = t5.sort(a) : t5[0].value = n2(t5[0]), function(e5) {
              var s4, i3;
              return void 0 === (s4 = r3(t5, e5)) ? 1 : -1 !== s4 ? (i3 = t5[s4].value, s4 === t5.length - 1 && e5 > t5[s4].to ? 1 : "function" == typeof i3 ? i3(e5) : i3) : void 0;
            };
          }, e4 = function(t5) {
            return s3 = t5, i2;
          }, t4.exports = e4;
        }, 162: (t4, e4, s3) => {
          var r3, i2;
          i2 = s3(52), r3 = class t5 {
            _vars() {
              return this._precompute = i2.clamp(this.o.precompute || 1450, 100, 1e4), this._step = 1 / this._precompute, this._rect = this.o.rect || 100, this._approximateMax = this.o.approximateMax || 5, this._eps = this.o.eps || 1e-3, this._boundsPrevProgress = -1;
            }
            constructor(t6, e5 = {}) {
              if (this.o = e5, "creator" !== t6) {
                if (this.path = i2.parsePath(t6), null == this.path)
                  return i2.error("Error while parsing the path");
                this._vars(), this.path.setAttribute("d", this._normalizePath(this.path.getAttribute("d"))), this.pathLength = this.path.getTotalLength(), this.sample = i2.bind(this.sample, this), this._hardSample = i2.bind(this._hardSample, this), this._preSample();
              }
            }
            _preSample() {
              var t6, e5, s4, r4, i3, n2, a;
              for (this._samples = [], a = [], t6 = e5 = 0, n2 = this._precompute; 0 <= n2 ? e5 <= n2 : e5 >= n2; t6 = 0 <= n2 ? ++e5 : --e5)
                i3 = t6 * this._step, s4 = this.pathLength * i3, r4 = this.path.getPointAtLength(s4), a.push(this._samples[t6] = { point: r4, length: s4, progress: i3 });
              return a;
            }
            _findBounds(t6, e5) {
              var s4, r4, i3, n2, a, o2, l, h, u, p, c, d, _;
              if (e5 === this._boundsPrevProgress)
                return this._prevBounds;
              for (null == this._boundsStartIndex && (this._boundsStartIndex = 0), o2 = t6.length, this._boundsPrevProgress > e5 ? (l = 0, r4 = "reverse") : (l = o2, r4 = "forward"), "forward" === r4 ? (d = t6[0], i3 = t6[t6.length - 1]) : (d = t6[t6.length - 1], i3 = t6[0]), n2 = a = p = this._boundsStartIndex, c = l; p <= c ? a < c : a > c; n2 = p <= c ? ++a : --a) {
                if (u = (_ = t6[n2]).point.x / this._rect, h = e5, "reverse" === r4 && (s4 = u, u = h, h = s4), !(u < h)) {
                  i3 = _;
                  break;
                }
                d = _, this._boundsStartIndex = n2;
              }
              return this._boundsPrevProgress = e5, this._prevBounds = { start: d, end: i3 };
            }
            sample(t6) {
              var e5, s4;
              return t6 = i2.clamp(t6, 0, 1), e5 = this._findBounds(this._samples, t6), null != (s4 = this._checkIfBoundsCloseEnough(t6, e5)) ? s4 : this._findApproximate(t6, e5.start, e5.end);
            }
            _checkIfBoundsCloseEnough(t6, e5) {
              var s4;
              return null != (s4 = this._checkIfPointCloseEnough(t6, e5.start.point)) ? s4 : this._checkIfPointCloseEnough(t6, e5.end.point);
            }
            _checkIfPointCloseEnough(t6, e5) {
              if (i2.closeEnough(t6, e5.x / this._rect, this._eps))
                return this._resolveY(e5);
            }
            _approximate(t6, e5, s4) {
              var r4, i3;
              return r4 = e5.point.x - t6.point.x, i3 = (s4 - t6.point.x / this._rect) / (r4 / this._rect), t6.length + i3 * (e5.length - t6.length);
            }
            _findApproximate(t6, e5, s4, r4 = this._approximateMax) {
              var n2, a, o2, l, h;
              return n2 = this._approximate(e5, s4, t6), h = (l = this.path.getPointAtLength(n2)).x / this._rect, i2.closeEnough(t6, h, this._eps) || --r4 < 1 ? this._resolveY(l) : (o2 = { point: l, length: n2 }, a = t6 < h ? [t6, e5, o2, r4] : [t6, o2, s4, r4], this._findApproximate.apply(this, a));
            }
            _resolveY(t6) {
              return 1 - t6.y / this._rect;
            }
            _normalizePath(t6) {
              var e5, s4, r4, i3;
              return i3 = /[M|L|H|V|C|S|Q|T|A]/gim, (r4 = t6.split(i3)).shift(), e5 = t6.match(i3), r4[0] = this._normalizeSegment(r4[0]), r4[s4 = r4.length - 1] = this._normalizeSegment(r4[s4], this._rect || 100), this._joinNormalizedPath(e5, r4);
            }
            _joinNormalizedPath(t6, e5) {
              var s4, r4, i3, n2;
              for (n2 = "", s4 = r4 = 0, i3 = t6.length; r4 < i3; s4 = ++r4)
                n2 += `${0 === s4 ? "" : " "}${t6[s4]}${e5[s4].trim()}`;
              return n2;
            }
            _normalizeSegment(t6, e5 = 0) {
              var s4, r4, i3, n2, a, o2, l, h;
              if (t6 = t6.trim(), a = /(-|\+)?((\d+(\.(\d|\e(-|\+)?)+)?)|(\.?(\d|\e|(\-|\+))+))/gim, h = (i3 = (o2 = this._getSegmentPairs(t6.match(a)))[o2.length - 1])[0], Number(h) !== e5)
                for (t6 = "", i3[0] = e5, s4 = r4 = 0, n2 = o2.length; r4 < n2; s4 = ++r4)
                  t6 += `${0 === s4 ? "" : " "}${(l = o2[s4])[0]},${l[1]}`;
              return t6;
            }
            _getSegmentPairs(t6) {
              var e5, s4, r4, n2, a;
              for (t6.length % 2 != 0 && i2.error("Failed to parse the path - segment pairs are not even.", t6), n2 = [], e5 = s4 = 0, r4 = t6.length; s4 < r4; e5 = s4 += 2)
                t6[e5], a = [t6[e5], t6[e5 + 1]], n2.push(a);
              return n2;
            }
            create(e5, s4) {
              var r4;
              return (r4 = new t5(e5, s4)).sample.path = r4.path, r4.sample;
            }
          }, t4.exports = r3;
        }, 52: function(t4) {
          var e4, s3;
          e4 = function() {
            class t5 {
              constructor() {
                this.vars();
              }
              vars() {
                var t6;
                return this.prefix = this.getPrefix(), this.getRemBase(), this.isFF = "moz" === this.prefix.lowercase, this.isIE = "ms" === this.prefix.lowercase, t6 = navigator.userAgent, this.isOldOpera = t6.match(/presto/gim), this.isSafari = t6.indexOf("Safari") > -1, this.isChrome = t6.indexOf("Chrome") > -1, this.isOpera = t6.toLowerCase().indexOf("op") > -1, this.isChrome && this.isSafari && (this.isSafari = false), t6.match(/PhantomJS/gim) && (this.isSafari = false), this.isChrome && this.isOpera && (this.isChrome = false), this.is3d = this.checkIf3d(), this.uniqIDs = -1, this.div = document.createElement("div"), document.body.appendChild(this.div), this.defaultStyles = this.computedStyle(this.div);
              }
              cloneObj(t6, e5) {
                var s4, r3, i2, n2;
                for (n2 = {}, s4 = (i2 = Object.keys(t6)).length; s4--; )
                  r3 = i2[s4], null != e5 && e5[r3] || (n2[r3] = t6[r3]);
                return n2;
              }
              extend(t6, e5) {
                var s4;
                for (s4 in e5)
                  e5[s4], null == t6[s4] && (t6[s4] = e5[s4]);
                return t6;
              }
              getRemBase() {
                var t6, e5;
                return t6 = document.querySelector("html"), e5 = getComputedStyle(t6), this.remBase = parseFloat(e5.fontSize);
              }
              clamp(t6, e5, s4) {
                return t6 < e5 ? e5 : t6 > s4 ? s4 : t6;
              }
              setPrefixedStyle(t6, e5, s4) {
                return "transform" === e5 && (t6.style[`${this.prefix.css}${e5}`] = s4), t6.style[e5] = s4;
              }
              style(t6, e5, s4) {
                var r3, i2, n2, a;
                if ("object" == typeof e5) {
                  for (n2 = (i2 = Object.keys(e5)).length, a = []; n2--; )
                    s4 = e5[r3 = i2[n2]], a.push(this.setPrefixedStyle(t6, r3, s4));
                  return a;
                }
                return this.setPrefixedStyle(t6, e5, s4);
              }
              prepareForLog(t6) {
                return (t6 = Array.prototype.slice.apply(t6)).unshift("::"), t6.unshift(this.logBadgeCss), t6.unshift("%cmo\xB7js%c"), t6;
              }
              log() {
                if (false !== mojs.isDebug)
                  return console.log.apply(console, this.prepareForLog(arguments));
              }
              warn() {
                if (false !== mojs.isDebug)
                  return console.warn.apply(console, this.prepareForLog(arguments));
              }
              error() {
                if (false !== mojs.isDebug)
                  return console.error.apply(console, this.prepareForLog(arguments));
              }
              parseUnit(t6) {
                var e5, s4, r3, i2, n2;
                return "number" == typeof t6 ? { unit: "px", isStrict: false, value: t6, string: 0 === t6 ? `${t6}` : `${t6}px` } : "string" == typeof t6 ? (i2 = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin|deg/gim, s4 = true, (n2 = null != (r3 = t6.match(i2)) ? r3[0] : void 0) || (n2 = "px", s4 = false), { unit: n2, isStrict: s4, value: e5 = parseFloat(t6), string: 0 === e5 ? `${e5}` : `${e5}${n2}` }) : t6;
              }
              bind(t6, e5) {
                var s4, r3;
                return r3 = function() {
                  var r4, i2;
                  return r4 = Array.prototype.slice.call(arguments), i2 = s4.concat(r4), t6.apply(e5, i2);
                }, s4 = Array.prototype.slice.call(arguments, 2), r3;
              }
              getRadialPoint(t6 = {}) {
                var e5, s4, r3;
                return e5 = 0.017453292519943295 * (t6.rotate - 90), s4 = null != t6.radiusX ? t6.radiusX : t6.radius, r3 = null != t6.radiusY ? t6.radiusY : t6.radius, { x: t6.center.x + Math.cos(e5) * s4, y: t6.center.y + Math.sin(e5) * r3 };
              }
              getPrefix() {
                var t6, e5, s4;
                return s4 = window.getComputedStyle(document.documentElement, ""), t6 = (Array.prototype.slice.call(s4).join("").match(/-(moz|webkit|ms)-/) || "" === s4.OLink && ["", "o"])[1], { dom: null != (e5 = "WebKit|Moz|MS|O".match(new RegExp("(" + t6 + ")", "i"))) ? e5[1] : void 0, lowercase: t6, css: "-" + t6 + "-", js: (null != t6 ? t6[0].toUpperCase() : void 0) + (null != t6 ? t6.substr(1) : void 0) };
              }
              strToArr(t6) {
                var e5;
                return e5 = [], "number" != typeof t6 || isNaN(t6) ? (t6.trim().split(/\s+/gim).forEach((t7) => e5.push(this.parseUnit(this.parseIfRand(t7)))), e5) : (e5.push(this.parseUnit(t6)), e5);
              }
              calcArrDelta(t6, e5) {
                var s4, r3, i2, n2;
                for (s4 = [], r3 = i2 = 0, n2 = t6.length; i2 < n2; r3 = ++i2)
                  t6[r3], s4[r3] = this.parseUnit(`${e5[r3].value - t6[r3].value}${e5[r3].unit}`);
                return s4;
              }
              isArray(t6) {
                return t6 instanceof Array;
              }
              normDashArrays(t6, e5) {
                var s4, r3, i2, n2, a, o2, l, h, u, p;
                if ((s4 = t6.length) > (r3 = e5.length))
                  for (l = s4 - r3, p = e5.length, n2 = a = 0, h = l; 0 <= h ? a < h : a > h; n2 = 0 <= h ? ++a : --a)
                    i2 = n2 + p, e5.push(this.parseUnit(`0${t6[i2].unit}`));
                else if (r3 > s4)
                  for (l = r3 - s4, p = t6.length, n2 = o2 = 0, u = l; 0 <= u ? o2 < u : o2 > u; n2 = 0 <= u ? ++o2 : --o2)
                    i2 = n2 + p, t6.push(this.parseUnit(`0${e5[i2].unit}`));
                return [t6, e5];
              }
              makeColorObj(t6) {
                var e5, s4, r3, i2, n2, a, o2, l;
                return "#" === t6[0] && (r3 = {}, (o2 = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(t6)) && (a = 2 === o2[1].length ? o2[1] : o2[1] + o2[1], i2 = 2 === o2[2].length ? o2[2] : o2[2] + o2[2], s4 = 2 === o2[3].length ? o2[3] : o2[3] + o2[3], r3 = { r: parseInt(a, 16), g: parseInt(i2, 16), b: parseInt(s4, 16), a: 1 })), "#" !== t6[0] && ((n2 = "r" === t6[0] && "g" === t6[1] && "b" === t6[2]) && (l = t6), n2 || (l = this.shortColors[t6] ? this.shortColors[t6] : (this.div.style.color = t6, this.computedStyle(this.div).color)), o2 = new RegExp("^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$", "gi").exec(l), r3 = {}, e5 = parseFloat(o2[4] || 1), o2 && (r3 = { r: parseInt(o2[1], 10), g: parseInt(o2[2], 10), b: parseInt(o2[3], 10), a: null == e5 || isNaN(e5) ? 1 : e5 })), r3;
              }
              computedStyle(t6) {
                return getComputedStyle(t6);
              }
              capitalize(t6) {
                if ("string" != typeof t6)
                  throw Error("String expected - nothing to capitalize");
                return t6.charAt(0).toUpperCase() + t6.substring(1);
              }
              parseRand(t6) {
                var e5, s4, r3;
                return s4 = t6.split(/rand\(|\,|\)/), r3 = this.parseUnit(s4[2]), e5 = this.rand(parseFloat(s4[1]), parseFloat(s4[2])), r3.unit && s4[2].match(r3.unit) ? e5 + r3.unit : e5;
              }
              parseStagger(t6, e5) {
                var s4, r3, i2, n2, a, o2;
                return i2 = (o2 = t6.split(/stagger\(|\)$/)[1].toLowerCase()).split(/(rand\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/gim), o2 = i2.length > 3 ? (s4 = this.parseUnit(this.parseIfRand(i2[1])), i2[3]) : (s4 = this.parseUnit(0), i2[1]), o2 = this.parseIfRand(o2), r3 = e5 * (a = this.parseUnit(o2)).value + s4.value, (n2 = s4.isStrict ? s4.unit : a.isStrict ? a.unit : "") ? `${r3}${n2}` : r3;
              }
              parseIfStagger(t6, e5) {
                return "string" == typeof t6 && t6.match(/stagger/g) ? this.parseStagger(t6, e5) : t6;
              }
              parseIfRand(t6) {
                return "string" == typeof t6 && t6.match(/rand\(/) ? this.parseRand(t6) : t6;
              }
              parseDelta(t6, e5, s4) {
                var r3, i2, n2, a, o2, l, h, u, p, c, d, _;
                if (null != (n2 = (e5 = this.cloneObj(e5)).easing) && (n2 = mojs.easing.parseEasing(n2)), delete e5.easing, null != (r3 = e5.curve) && (r3 = mojs.easing.parseEasing(r3)), delete e5.curve, a = e5[c = Object.keys(e5)[0]], i2 = { start: c }, !isNaN(parseFloat(c)) || c.match(/rand\(/) || c.match(/stagger\(/))
                  if ("strokeDasharray" === t6 || "strokeDashoffset" === t6 || "origin" === t6) {
                    for (d = this.strToArr(c), o2 = this.strToArr(a), this.normDashArrays(d, o2), h = u = 0, p = d.length; u < p; h = ++u)
                      c = d[h], a = o2[h], this.mergeUnits(c, a, t6);
                    i2 = { type: "array", name: t6, start: d, end: o2, delta: this.calcArrDelta(d, o2), easing: n2, curve: r3 };
                  } else
                    this.callbacksMap[t6] || this.tweenOptionMap[t6] || (this.unitOptionMap[t6] ? (a = this.parseUnit(this.parseStringOption(a, s4)), c = this.parseUnit(this.parseStringOption(c, s4)), this.mergeUnits(c, a, t6), i2 = { type: "unit", name: t6, start: c, end: a, delta: a.value - c.value, easing: n2, curve: r3 }) : (a = parseFloat(this.parseStringOption(a, s4)), i2 = { type: "number", name: t6, start: c = parseFloat(this.parseStringOption(c, s4)), end: a, delta: a - c, easing: n2, curve: r3 }));
                else {
                  if ("strokeLinecap" === t6)
                    return this.warn(`Sorry, stroke-linecap property is not animatable yet, using the start(${c}) value instead`, e5), i2;
                  i2 = { type: "color", name: t6, start: _ = this.makeColorObj(c), end: l = this.makeColorObj(a), easing: n2, curve: r3, delta: { r: l.r - _.r, g: l.g - _.g, b: l.b - _.b, a: l.a - _.a } };
                }
                return i2;
              }
              mergeUnits(t6, e5, s4) {
                return !e5.isStrict && t6.isStrict ? (e5.unit = t6.unit, e5.string = `${e5.value}${e5.unit}`) : e5.isStrict && !t6.isStrict ? (t6.unit = e5.unit, t6.string = `${t6.value}${t6.unit}`) : e5.isStrict && t6.isStrict && e5.unit !== t6.unit ? (t6.unit = e5.unit, t6.string = `${t6.value}${t6.unit}`, this.warn(`Two different units were specified on "${s4}" delta property, mo \xB7 js will fallback to end "${e5.unit}" unit `)) : void 0;
              }
              rand(t6, e5) {
                return Math.random() * (e5 - t6) + t6;
              }
              isDOM(t6) {
                var e5;
                return null != t6 && (e5 = "number" == typeof t6.nodeType && "string" == typeof t6.nodeName, "object" == typeof t6 && e5);
              }
              getChildElements(t6) {
                var e5, s4, r3;
                for (s4 = [], r3 = (e5 = t6.childNodes).length; r3--; )
                  1 === e5[r3].nodeType && s4.unshift(e5[r3]);
                return s4;
              }
              delta(t6, e5) {
                var s4, r3, i2, n2, a;
                if (a = typeof e5, s4 = "string" == (n2 = typeof t6) || "number" === n2 && !isNaN(t6), r3 = "string" === a || "number" === a && !isNaN(e5), s4 && r3)
                  return (i2 = {})[t6] = e5, i2;
                this.error(`delta method expects Strings or Numbers at input but got - ${t6}, ${e5}`);
              }
              getUniqID() {
                return ++this.uniqIDs;
              }
              parsePath(t6) {
                var e5;
                return "string" == typeof t6 ? "m" === t6.charAt(0).toLowerCase() ? ((e5 = document.createElementNS(this.NS, "path")).setAttributeNS(null, "d", t6), e5) : document.querySelector(t6) : t6.style ? t6 : void 0;
              }
              closeEnough(t6, e5, s4) {
                return Math.abs(t6 - e5) < s4;
              }
              checkIf3d() {
                var t6, e5, s4;
                return t6 = document.createElement("div"), this.style(t6, "transform", "translateZ(0)"), "" !== (null != (s4 = t6.style)[e5 = `${this.prefix.css}transform`] ? s4[e5] : s4.transform);
              }
              isObject(t6) {
                return null !== t6 && "object" == typeof t6;
              }
              getDeltaEnd(t6) {
                return t6[Object.keys(t6)[0]];
              }
              getDeltaStart(t6) {
                return Object.keys(t6)[0];
              }
              isTweenProp(t6) {
                return this.tweenOptionMap[t6] || this.callbacksMap[t6];
              }
              parseStringOption(t6, e5 = 0) {
                return "string" == typeof t6 && (t6 = this.parseIfStagger(t6, e5), t6 = this.parseIfRand(t6)), t6;
              }
              getLastItem(t6) {
                return t6[t6.length - 1];
              }
              parseEl(t6) {
                return s3.isDOM(t6) || ("string" == typeof t6 && (t6 = document.querySelector(t6)), null === t6 && s3.error("Can't parse HTML element: ", t6)), t6;
              }
              force3d(t6) {
                return this.setPrefixedStyle(t6, "backface-visibility", "hidden"), t6;
              }
              isDelta(t6) {
                return !(!this.isObject(t6) || t6.unit || this.isArray(t6) || this.isDOM(t6));
              }
            }
            return t5.prototype.NS = "http://www.w3.org/2000/svg", t5.prototype.logBadgeCss = "background:#3A0839;color:#FF512F;border-radius:5px; padding: 1px 5px 2px; border: 1px solid #FF512F;", t5.prototype.shortColors = { transparent: "rgba(0,0,0,0)", none: "rgba(0,0,0,0)", aqua: "rgb(0,255,255)", black: "rgb(0,0,0)", blue: "rgb(0,0,255)", fuchsia: "rgb(255,0,255)", gray: "rgb(128,128,128)", green: "rgb(0,128,0)", lime: "rgb(0,255,0)", maroon: "rgb(128,0,0)", navy: "rgb(0,0,128)", olive: "rgb(128,128,0)", purple: "rgb(128,0,128)", red: "rgb(255,0,0)", silver: "rgb(192,192,192)", teal: "rgb(0,128,128)", white: "rgb(255,255,255)", yellow: "rgb(255,255,0)", orange: "rgb(255,128,0)" }, t5.prototype.chainOptionMap = {}, t5.prototype.callbacksMap = { onRefresh: 1, onStart: 1, onComplete: 1, onFirstUpdate: 1, onUpdate: 1, onProgress: 1, onRepeatStart: 1, onRepeatComplete: 1, onPlaybackStart: 1, onPlaybackPause: 1, onPlaybackStop: 1, onPlaybackComplete: 1 }, t5.prototype.tweenOptionMap = { duration: 1, delay: 1, speed: 1, repeat: 1, easing: 1, backwardEasing: 1, isYoyo: 1, shiftTime: 1, isReversed: 1, callbacksContext: 1 }, t5.prototype.unitOptionMap = { left: 1, top: 1, x: 1, y: 1, rx: 1, ry: 1 }, t5.prototype.RAD_TO_DEG = 180 / Math.PI, t5;
          }.call(this), s3 = new e4(), t4.exports = s3;
        }, 291: function(t4, e4, s3) {
          var r3, i2, n2, a, o2;
          a = s3(52), o2 = s3(247), n2 = s3(755).Z, i2 = s3(342).Z, r3 = function() {
            class t5 {
              constructor(t6 = {}) {
                this.calcHeight = this.calcHeight.bind(this), this.o = t6, this.vars() || this.createTween();
              }
              vars() {
                return this.getScaler = a.bind(this.getScaler, this), this.resize = o2, this.props = a.cloneObj(this.defaults), this.extendOptions(this.o), this.isMotionBlurReset = a.isSafari || a.isIE, this.isMotionBlurReset && (this.props.motionBlur = 0), this.history = [a.cloneObj(this.props)], this.postVars();
              }
              curveToPath(t6) {
                var e5, s4, r4, i3, n3, o3, l, h, u, p, c, d;
                return u = document.createElementNS(a.NS, "path"), h = { x: (d = t6.start).x + t6.shift.x, y: d.x + t6.shift.y }, e5 = t6.curvature, o3 = t6.shift.x, l = t6.shift.y, p = Math.sqrt(o3 * o3 + l * l) / 100, c = Math.atan(l / o3) * (180 / Math.PI) + 90, t6.shift.x < 0 && (c += 180), s4 = "%" === (s4 = a.parseUnit(e5.x)).unit ? s4.value * p : s4.value, n3 = a.getRadialPoint({ center: { x: d.x, y: d.y }, radius: s4, rotate }), r4 = "%" === (r4 = a.parseUnit(e5.y)).unit ? r4.value * p : r4.value, i3 = a.getRadialPoint({ center: { x: n3.x, y: n3.y }, radius: r4, rotate: c + 90 }), u.setAttribute("d", `M${d.x},${d.y} Q${i3.x},${i3.y} ${h.x},${h.y}`), u;
              }
              postVars() {
                return this.props.pathStart = a.clamp(this.props.pathStart, 0, 1), this.props.pathEnd = a.clamp(this.props.pathEnd, this.props.pathStart, 1), this.rotate = 0, this.speedX = 0, this.speedY = 0, this.blurX = 0, this.blurY = 0, this.prevCoords = {}, this.blurAmount = 20, this.props.motionBlur = a.clamp(this.props.motionBlur, 0, 1), this.onUpdate = this.props.onUpdate, this.o.el ? (this.el = this.parseEl(this.props.el), this.props.motionBlur > 0 && this.createFilter(), this.path = this.getPath(), this.path.getAttribute("d") ? (this.len = this.path.getTotalLength(), this.slicedLen = this.len * (this.props.pathEnd - this.props.pathStart), this.startLen = this.props.pathStart * this.len, this.fill = this.props.fill, null != this.fill && (this.container = this.parseEl(this.props.fill.container), this.fillRule = this.props.fill.fillRule || "all", this.getScaler(), null != this.container) ? (this.removeEvent(this.container, "onresize", this.getScaler), this.addEvent(this.container, "onresize", this.getScaler)) : void 0) : (a.error("Path has no coordinates to work with, aborting"), true)) : (a.error('Missed "el" option. It could be a selector, DOMNode or another module.'), true);
              }
              addEvent(t6, e5, s4) {
                return t6.addEventListener(e5, s4, false);
              }
              removeEvent(t6, e5, s4) {
                return t6.removeEventListener(e5, s4, false);
              }
              createFilter() {
                var t6, e5;
                return t6 = document.createElement("div"), this.filterID = `filter-${a.getUniqID()}`, t6.innerHTML = `<svg id="svg-${this.filterID}"
    style="visibility:hidden; width:0px; height:0px">
  <filter id="${this.filterID}" y="-20" x="-20" width="40" height="40">
    <feOffset
      id="blur-offset" in="SourceGraphic"
      dx="0" dy="0" result="offset2"></feOffset>
    <feGaussianblur
      id="blur" in="offset2"
      stdDeviation="0,0" result="blur2"></feGaussianblur>
    <feMerge>
      <feMergeNode in="SourceGraphic"></feMergeNode>
      <feMergeNode in="blur2"></feMergeNode>
    </feMerge>
  </filter>
</svg>`, e5 = t6.querySelector(`#svg-${this.filterID}`), this.filter = e5.querySelector("#blur"), this.filterOffset = e5.querySelector("#blur-offset"), document.body.insertBefore(e5, document.body.firstChild), this.el.style.filter = `url(#${this.filterID})`, this.el.style[`${a.prefix.css}filter`] = `url(#${this.filterID})`;
              }
              parseEl(t6) {
                return "string" == typeof t6 ? document.querySelector(t6) : t6 instanceof HTMLElement ? t6 : null != t6._setProp ? (this.isModule = true, t6) : void 0;
              }
              getPath() {
                return a.parsePath(this.props.path) || (this.props.path.x || this.props.path.y ? this.curveToPath({ start: { x: 0, y: 0 }, shift: { x: this.props.path.x || 0, y: this.props.path.y || 0 }, curvature: { x: this.props.curvature.x || this.defaults.curvature.x, y: this.props.curvature.y || this.defaults.curvature.y } }) : void 0);
              }
              getScaler() {
                var t6, e5, s4;
                switch (this.cSize = { width: this.container.offsetWidth || 0, height: this.container.offsetHeight || 0 }, s4 = this.path.getPointAtLength(0), t6 = this.path.getPointAtLength(this.len), e5 = {}, this.scaler = {}, e5.width = t6.x >= s4.x ? t6.x - s4.x : s4.x - t6.x, e5.height = t6.y >= s4.y ? t6.y - s4.y : s4.y - t6.y, this.fillRule) {
                  case "all":
                    return this.calcWidth(e5), this.calcHeight(e5);
                  case "width":
                    return this.calcWidth(e5), this.scaler.y = this.scaler.x;
                  case "height":
                    return this.calcHeight(e5), this.scaler.x = this.scaler.y;
                }
              }
              calcWidth(t6) {
                return this.scaler.x = this.cSize.width / t6.width, !isFinite(this.scaler.x) && (this.scaler.x = 1);
              }
              calcHeight(t6) {
                return this.scaler.y = this.cSize.height / t6.height, !isFinite(this.scaler.y) && (this.scaler.y = 1);
              }
              run(t6) {
                var e5, s4;
                if (t6) {
                  for (e5 in this.history[0], t6)
                    s4 = t6[e5], a.callbacksMap[e5] || a.tweenOptionMap[e5] ? (a.warn(`the property "${e5}" property can not be overridden on run yet`), delete t6[e5]) : this.history[0][e5] = s4;
                  this.tuneOptions(t6);
                }
                return this.startTween();
              }
              createTween() {
                return this.tween = new n2({ duration: this.props.duration, delay: this.props.delay, yoyo: this.props.yoyo, repeat: this.props.repeat, easing: this.props.easing, onStart: () => {
                  var t6;
                  return null != (t6 = this.props.onStart) ? t6.apply(this) : void 0;
                }, onComplete: () => {
                  var t6;
                  return this.props.motionBlur && this.setBlur({ blur: { x: 0, y: 0 }, offset: { x: 0, y: 0 } }), null != (t6 = this.props.onComplete) ? t6.apply(this) : void 0;
                }, onUpdate: (t6) => this.setProgress(t6), onFirstUpdate: (t6, e5) => {
                  if (!t6)
                    return this.history.length > 1 && this.tuneOptions(this.history[0]);
                } }), this.timeline = new i2(), this.timeline.add(this.tween), !this.props.isRunLess && this.startTween(), this.props.isPresetPosition && this.setProgress(0, true);
              }
              startTween() {
                return setTimeout(() => {
                  var t6;
                  return null != (t6 = this.timeline) ? t6.play() : void 0;
                }, 1);
              }
              setProgress(t6, e5) {
                var s4, r4, i3, n3;
                return s4 = this.startLen + (this.props.isReverse ? (1 - t6) * this.slicedLen : t6 * this.slicedLen), i3 = (r4 = this.path.getPointAtLength(s4)).x + this.props.offsetX, n3 = r4.y + this.props.offsetY, this._getCurrentRotation(r4, s4, t6), this._setTransformOrigin(t6), this._setTransform(i3, n3, t6, e5), this.props.motionBlur && this.makeMotionBlur(i3, n3);
              }
              setElPosition(t6, e5, s4) {
                var r4;
                return r4 = `translate(${t6}px,${e5}px) ${0 !== this.rotate ? `rotate(${this.rotate}deg)` : ""} ${this.props.isCompositeLayer && a.is3d ? "translateZ(0)" : ""}`, a.setPrefixedStyle(this.el, "transform", r4);
              }
              setModulePosition(t6, e5) {
                return this.el._setProp({ shiftX: `${t6}px`, shiftY: `${e5}px`, rotate: this.rotate }), this.el._draw();
              }
              _getCurrentRotation(t6, e5, s4) {
                var r4, i3, n3, o3, l;
                return i3 = "function" == typeof this.props.transformOrigin, this.props.isRotation || null != this.props.rotationOffset || i3 ? (n3 = this.path.getPointAtLength(e5 - 1), o3 = t6.y - n3.y, l = t6.x - n3.x, r4 = Math.atan(o3 / l), !isFinite(r4) && (r4 = 0), this.rotate = r4 * a.RAD_TO_DEG, "function" != typeof this.props.rotationOffset ? this.rotate += this.props.rotationOffset || 0 : this.rotate = this.props.rotationOffset.call(this, this.rotate, s4)) : this.rotate = 0;
              }
              _setTransform(t6, e5, s4, r4) {
                var i3;
                return this.scaler && (t6 *= this.scaler.x, e5 *= this.scaler.y), i3 = null, r4 || (i3 = "function" == typeof this.onUpdate ? this.onUpdate(s4, { x: t6, y: e5, rotate: this.rotate }) : void 0), this.isModule ? this.setModulePosition(t6, e5) : "string" != typeof i3 ? this.setElPosition(t6, e5, s4) : a.setPrefixedStyle(this.el, "transform", i3);
              }
              _setTransformOrigin(t6) {
                var e5;
                if (this.props.transformOrigin)
                  return e5 = "function" == typeof this.props.transformOrigin ? this.props.transformOrigin(this.rotate, t6) : this.props.transformOrigin, a.setPrefixedStyle(this.el, "transform-origin", e5);
              }
              makeMotionBlur(t6, e5) {
                var s4, r4, i3, n3, o3, l, h;
                return h = 0, o3 = 1, l = 1, null == this.prevCoords.x || null == this.prevCoords.y ? (this.speedX = 0, this.speedY = 0) : (i3 = t6 - this.prevCoords.x, n3 = e5 - this.prevCoords.y, i3 > 0 && (o3 = -1), o3 < 0 && (l = -1), this.speedX = Math.abs(i3), this.speedY = Math.abs(n3), h = Math.atan(n3 / i3) * (180 / Math.PI) + 90), s4 = h - this.rotate, r4 = this.rotToCoords(s4), this.blurX = a.clamp(this.speedX / 16 * this.props.motionBlur, 0, 1), this.blurY = a.clamp(this.speedY / 16 * this.props.motionBlur, 0, 1), this.setBlur({ blur: { x: 3 * this.blurX * this.blurAmount * Math.abs(r4.x), y: 3 * this.blurY * this.blurAmount * Math.abs(r4.y) }, offset: { x: 3 * o3 * this.blurX * r4.x * this.blurAmount, y: 3 * l * this.blurY * r4.y * this.blurAmount } }), this.prevCoords.x = t6, this.prevCoords.y = e5;
              }
              setBlur(t6) {
                if (!this.isMotionBlurReset)
                  return this.filter.setAttribute("stdDeviation", `${t6.blur.x},${t6.blur.y}`), this.filterOffset.setAttribute("dx", t6.offset.x), this.filterOffset.setAttribute("dy", t6.offset.y);
              }
              extendDefaults(t6) {
                var e5, s4, r4;
                for (e5 in s4 = [], t6)
                  r4 = t6[e5], s4.push(this[e5] = r4);
                return s4;
              }
              extendOptions(t6) {
                var e5, s4, r4;
                for (e5 in s4 = [], t6)
                  r4 = t6[e5], s4.push(this.props[e5] = r4);
                return s4;
              }
              then(t6) {
                var e5, s4, r4, i3, o3;
                for (s4 in r4 = {}, i3 = this.history[this.history.length - 1])
                  o3 = i3[s4], !a.callbacksMap[s4] && !a.tweenOptionMap[s4] || "duration" === s4 ? null == t6[s4] && (t6[s4] = o3) : null == t6[s4] && (t6[s4] = void 0), a.tweenOptionMap[s4] && (r4[s4] = "duration" !== s4 || null != t6[s4] ? t6[s4] : i3[s4]);
                return this.history.push(t6), e5 = this, r4.onUpdate = (t7) => this.setProgress(t7), r4.onStart = () => {
                  var t7;
                  return null != (t7 = this.props.onStart) ? t7.apply(this) : void 0;
                }, r4.onComplete = () => {
                  var t7;
                  return null != (t7 = this.props.onComplete) ? t7.apply(this) : void 0;
                }, r4.onFirstUpdate = function() {
                  return e5.tuneOptions(e5.history[this.index]);
                }, r4.isChained = !t6.delay, this.timeline.append(new n2(r4)), this;
              }
              tuneOptions(t6) {
                return this.extendOptions(t6), this.postVars();
              }
              rotToCoords(t6) {
                var e5, s4, r4;
                return e5 = ((t6 %= 360) - 90) * Math.PI / 180, s4 = Math.cos(e5), r4 = Math.sin(e5), { x: 1.428571429 * (s4 = s4 < 0 ? Math.max(s4, -0.7) : Math.min(s4, 0.7)), y: 1.428571429 * (r4 = r4 < 0 ? Math.max(r4, -0.7) : Math.min(r4, 0.7)) };
              }
            }
            return t5.prototype.defaults = { path: null, curvature: { x: "75%", y: "50%" }, isCompositeLayer: true, delay: 0, duration: 1e3, easing: null, repeat: 0, yoyo: false, onStart: null, onComplete: null, onUpdate: null, offsetX: 0, offsetY: 0, rotationOffset: null, pathStart: 0, pathEnd: 1, motionBlur: 0, transformOrigin: null, isRotation: false, isReverse: false, isRunLess: false, isPresetPosition: true }, t5;
          }.call(this), t4.exports = r3;
        }, 785: (t4, e4, s3) => {
          var r3, i2;
          r3 = s3(623).Z, i2 = class extends r3 {
            _declareDefaults() {
              return super._declareDefaults(), this._defaults.shape = "ellipse";
            }
            _draw() {
              var t5, e5;
              return t5 = null != this._props.radiusX ? this._props.radiusX : this._props.radius, e5 = null != this._props.radiusY ? this._props.radiusY : this._props.radius, this._setAttrIfChanged("rx", t5), this._setAttrIfChanged("ry", e5), this._setAttrIfChanged("cx", this._props.width / 2), this._setAttrIfChanged("cy", this._props.height / 2), super._draw();
            }
            _getLength() {
              var t5, e5;
              return t5 = null != this._props.radiusX ? this._props.radiusX : this._props.radius, e5 = null != this._props.radiusY ? this._props.radiusY : this._props.radius, 2 * Math.PI * Math.sqrt((t5 * t5 + e5 * e5) / 2);
            }
          }, t4.exports = i2;
        }, 158: (t4, e4, s3) => {
          var r3, i2;
          r3 = s3(623).Z, i2 = class extends r3 {
            _declareDefaults() {
              return super._declareDefaults(), this._defaults.tag = "path";
            }
            _draw() {
              var t5, e5, s4, r4, i3, n2, a;
              if (super._draw(), this._props, r4 = null != this._props.radiusX ? this._props.radiusX : this._props.radius, i3 = null != this._props.radiusY ? this._props.radiusY : this._props.radius, e5 = r4 === this._prevRadiusX, s4 = i3 === this._prevRadiusY, !e5 || !s4)
                return t5 = `M${(n2 = this._props.width / 2) - r4},${a = this._props.height / 2} L${n2 + r4},${a} M${n2},${a - i3} L${n2},${a + i3}`, this.el.setAttribute("d", t5), this._prevRadiusX = r4, this._prevRadiusY = i3;
            }
            _getLength() {
              return 2 * ((null != this._props.radiusX ? this._props.radiusX : this._props.radius) + (null != this._props.radiusY ? this._props.radiusY : this._props.radius));
            }
          }, t4.exports = i2;
        }, 153: (t4, e4, s3) => {
          var r3, i2;
          r3 = s3(623).Z, i2 = class extends r3 {
            _declareDefaults() {
              return super._declareDefaults(), this._defaults.tag = "path", this._defaults.points = 2;
            }
            _draw() {
              var t5, e5, s4, r4, i3, n2, a, o2, l, h, u, p, c, d, _, f;
              if (super._draw(), a = this._props, this._props.points && (o2 = null != this._props.radiusX ? this._props.radiusX : this._props.radius, l = null != this._props.radiusY ? this._props.radiusY : this._props.radius, r4 = o2 === this._prevRadiusX, i3 = l === this._prevRadiusY, s4 = a.points === this._prevPoints, !(r4 && i3 && s4))) {
                for (u = this._props.width / 2, d = this._props.height / 2, p = u - o2, c = u + o2, t5 = "", f = 2 * l / (this._props.points - 1), _ = d - l, e5 = n2 = 0, h = this._props.points; 0 <= h ? n2 < h : n2 > h; e5 = 0 <= h ? ++n2 : --n2)
                  t5 += `M${p}, ${d = `${e5 * f + _}`} L${c}, ${d} `;
                return this.el.setAttribute("d", t5), this._prevPoints = a.points, this._prevRadiusX = o2, this._prevRadiusY = l;
              }
            }
            _getLength() {
              return 2 * (null != this._props.radiusX ? this._props.radiusX : this._props.radius);
            }
          }, t4.exports = i2;
        }, 786: (t4, e4, s3) => {
          var r3, i2;
          r3 = s3(623).Z, i2 = class extends r3 {
            _declareDefaults() {
              return super._declareDefaults(), this._defaults.tag = "line";
            }
            _draw() {
              var t5, e5, s4;
              return t5 = null != this._props.radiusX ? this._props.radiusX : this._props.radius, e5 = this._props.width / 2, s4 = this._props.height / 2, this._setAttrIfChanged("x1", e5 - t5), this._setAttrIfChanged("x2", e5 + t5), this._setAttrIfChanged("y1", s4), this._setAttrIfChanged("y2", s4), super._draw();
            }
          }, t4.exports = i2;
        }, 878: (t4, e4, s3) => {
          var r3, i2, n2;
          n2 = s3(52), r3 = s3(623).Z, i2 = class extends r3 {
            _declareDefaults() {
              return super._declareDefaults(), this._defaults.tag = "path", this._defaults.points = 3;
            }
            _draw() {
              var t5, e5, s4, r4, i3, a, o2, l, h, u, p, c, d, _, f;
              if (h = this._props, p = null != this._props.radiusX ? this._props.radiusX : this._props.radius, c = null != this._props.radiusY ? this._props.radiusY : this._props.radius, r4 = p === this._prevRadiusX, i3 = c === this._prevRadiusY, s4 = h.points === this._prevPoints, !(r4 && i3 && s4)) {
                for (f = 360 / this._props.points, null == this._radialPoints ? this._radialPoints = [] : this._radialPoints.length = 0, e5 = a = 0, d = this._props.points; 0 <= d ? a < d : a > d; e5 = 0 <= d ? ++a : --a)
                  this._radialPoints.push(n2.getRadialPoint({ radius: this._props.radius, radiusX: this._props.radiusX, radiusY: this._props.radiusY, rotate: e5 * f, center: { x: h.width / 2, y: h.height / 2 } }));
                for (t5 = "", e5 = o2 = 0, l = (_ = this._radialPoints).length; o2 < l; e5 = ++o2)
                  t5 += `${0 === e5 ? "M" : "L"}${(u = _[e5]).x.toFixed(4)},${u.y.toFixed(4)} `;
                this._prevPoints = h.points, this._prevRadiusX = p, this._prevRadiusY = c, this.el.setAttribute("d", t5 += "z");
              }
              return super._draw();
            }
            _getLength() {
              return this._getPointsPerimiter(this._radialPoints);
            }
          }, t4.exports = i2;
        }, 979: (t4, e4, s3) => {
          var r3, i2;
          r3 = s3(623).Z, i2 = class extends r3 {
            _declareDefaults() {
              return super._declareDefaults(), this._defaults.tag = "rect", this._defaults.rx = 0, this._defaults.ry = 0;
            }
            _draw() {
              var t5, e5, s4;
              return super._draw(), e5 = null != (t5 = this._props).radiusX ? t5.radiusX : t5.radius, s4 = null != t5.radiusY ? t5.radiusY : t5.radius, this._setAttrIfChanged("width", 2 * e5), this._setAttrIfChanged("height", 2 * s4), this._setAttrIfChanged("x", t5.width / 2 - e5), this._setAttrIfChanged("y", t5.height / 2 - s4), this._setAttrIfChanged("rx", t5.rx), this._setAttrIfChanged("ry", t5.ry);
            }
            _getLength() {
              return 2 * (2 * (null != this._props.radiusX ? this._props.radiusX : this._props.radius) + 2 * (null != this._props.radiusY ? this._props.radiusY : this._props.radius));
            }
          }, t4.exports = i2;
        }, 806: function(t4, e4, s3) {
          var r3, i2, n2, a, o2, l, h, u, p, c, d, _;
          _ = s3(52), r3 = s3(623).Z, l = s3(854).Z, n2 = s3(785), u = s3(786), d = s3(322), c = s3(979), p = s3(878), a = s3(158), o2 = s3(472).Z, h = s3(153), i2 = function() {
            class t5 {
              constructor() {
                this.addShape = _.bind(this.addShape, this);
              }
              getShape(t6) {
                return this[t6] || _.error(`no "${t6}" shape available yet, please choose from this list:`, ["circle", "line", "zigzag", "rect", "polygon", "cross", "equal", "curve"]);
              }
              addShape(t6, e5) {
                return this[t6] = e5;
              }
            }
            return t5.prototype.bit = r3, t5.prototype.custom = l, t5.prototype.circle = n2, t5.prototype.line = u, t5.prototype.zigzag = d, t5.prototype.rect = c, t5.prototype.polygon = p, t5.prototype.cross = a, t5.prototype.equal = h, t5.prototype.curve = o2, t5;
          }.call(this), t4.exports = new i2();
        }, 322: (t4, e4, s3) => {
          var r3, i2;
          r3 = s3(623).Z, i2 = class extends r3 {
            _declareDefaults() {
              return super._declareDefaults(), this._defaults.tag = "path", this._defaults.points = 3;
            }
            _draw() {
              var t5, e5, s4, r4, i3, n2, a, o2, l, h, u, p, c, d, _, f;
              if (super._draw(), l = this._props, this._props.points && (u = null != this._props.radiusX ? this._props.radiusX : this._props.radius, p = null != this._props.radiusY ? this._props.radiusY : this._props.radius, i3 = u === this._prevRadiusX, n2 = p === this._prevRadiusY, r4 = l.points === this._prevPoints, !(i3 && n2 && r4))) {
                for (t5 = l.width / 2 - u, e5 = _ = l.height / 2, d = 2 * u / (l.points - 1), f = -1, o2 = -(s4 = Math.sqrt(d * d + p * p)), h = `M${t5}, ${_} `, a = 0, c = l.points; 0 <= c ? a < c : a > c; 0 <= c ? ++a : --a)
                  h += `L${t5}, ${e5} `, t5 += d, o2 += s4, e5 = -1 === f ? _ - p : _, f = -f;
                return this._length = o2, this.el.setAttribute("d", h), this._prevPoints = l.points, this._prevRadiusX = u, this._prevRadiusY = p;
              }
            }
            _getLength() {
              return this._length;
            }
          }, t4.exports = i2;
        }, 247: (t4, e4) => {
          var s3, r3;
          r3 = class {
            constructor(t5 = {}) {
              this.o = t5, window.isAnyResizeEventInited || (this.vars(), this.redefineProto());
            }
            vars() {
              return window.isAnyResizeEventInited = true, this.allowedProtos = [HTMLDivElement, HTMLFormElement, HTMLLinkElement, HTMLBodyElement, HTMLParagraphElement, HTMLFieldSetElement, HTMLLegendElement, HTMLLabelElement, HTMLButtonElement, HTMLUListElement, HTMLOListElement, HTMLLIElement, HTMLHeadingElement, HTMLQuoteElement, HTMLPreElement, HTMLBRElement, HTMLFontElement, HTMLHRElement, HTMLModElement, HTMLParamElement, HTMLMapElement, HTMLTableElement, HTMLTableCaptionElement, HTMLImageElement, HTMLTableCellElement, HTMLSelectElement, HTMLInputElement, HTMLTextAreaElement, HTMLAnchorElement, HTMLObjectElement, HTMLTableColElement, HTMLTableSectionElement, HTMLTableRowElement], this.timerElements = { img: 1, textarea: 1, input: 1, embed: 1, object: 1, svg: 1, canvas: 1, tr: 1, tbody: 1, thead: 1, tfoot: 1, a: 1, select: 1, option: 1, optgroup: 1, dl: 1, dt: 1, br: 1, basefont: 1, font: 1, col: 1, iframe: 1 };
            }
            redefineProto() {
              var t5, e5, s4;
              return e5 = this, function() {
                var r4, i2, n2, a;
                for (n2 = this.allowedProtos, a = [], t5 = r4 = 0, i2 = n2.length; r4 < i2; t5 = ++r4)
                  null != (s4 = n2[t5]).prototype && a.push(function(t6) {
                    return function(s5) {
                      var r5;
                      r5 = function() {
                        return this === window && this === document || "onresize" === arguments[0] && !this.isAnyResizeEventInited && e5.handleResize({ args: arguments, that: this }), s5.apply(this, arguments);
                      }, t6.prototype.addEventListener ? t6.prototype.addEventListener = r5 : t6.prototype.attachEvent && (t6.prototype.attachEvent = r5);
                    }(t6.prototype.addEventListener || t6.prototype.attachEvent), function(e6) {
                      var s5;
                      return s5 = function() {
                        return this.isAnyResizeEventInited = false, this.iframe && this.removeChild(this.iframe), e6.apply(this, arguments);
                      }, t6.prototype.removeEventListener ? t6.prototype.removeEventListener = s5 : t6.prototype.detachEvent ? t6.prototype.detachEvent = wrappedListener : void 0;
                    }(t6.prototype.removeEventListener || t6.prototype.detachEvent);
                  }(s4));
                return a;
              }.call(this);
            }
            handleResize(t5) {
              var e5, s4, r4, i2, n2, a, o2;
              return s4 = t5.that, this.timerElements[s4.tagName.toLowerCase()] ? this.initTimer(s4) : (r4 = document.createElement("iframe"), s4.appendChild(r4), r4.style.width = "100%", r4.style.height = "100%", r4.style.position = "absolute", r4.style.zIndex = -999, r4.style.opacity = 0, r4.style.top = 0, r4.style.left = 0, e5 = window.getComputedStyle ? getComputedStyle(s4) : s4.currentStyle, n2 = "" === s4.style.position, a = "static" === e5.position && n2, i2 = "" === e5.position && "" === s4.style.position, (a || i2) && (s4.style.position = "relative"), null != (o2 = r4.contentWindow) && (o2.onresize = (t6) => this.dispatchEvent(s4)), s4.iframe = r4), s4.isAnyResizeEventInited = true;
            }
            initTimer(t5) {
              var e5, s4;
              return s4 = 0, e5 = 0, this.interval = setInterval(() => {
                var r4, i2;
                if (i2 = t5.offsetWidth, r4 = t5.offsetHeight, i2 !== s4 || r4 !== e5)
                  return this.dispatchEvent(t5), s4 = i2, e5 = r4;
              }, this.o.interval || 62.5);
            }
            dispatchEvent(t5) {
              var e5;
              return document.createEvent ? ((e5 = document.createEvent("HTMLEvents")).initEvent("onresize", false, false), t5.dispatchEvent(e5)) : !!document.createEventObject && (e5 = document.createEventObject(), t5.fireEvent("onresize", e5));
            }
            destroy() {
              var t5, e5, s4, r4, i2, n2;
              for (clearInterval(this.interval), this.interval = null, window.isAnyResizeEventInited = false, n2 = [], t5 = e5 = 0, s4 = (i2 = this.allowedProtos).length; e5 < s4; t5 = ++e5)
                null != (r4 = i2[t5]).prototype && n2.push(function(t6) {
                  return t6.prototype.addEventListener || t6.prototype.attachEvent, t6.prototype.addEventListener ? t6.prototype.addEventListener = Element.prototype.addEventListener : t6.prototype.attachEvent && (t6.prototype.attachEvent = Element.prototype.attachEvent), t6.prototype.removeEventListener ? t6.prototype.removeEventListener = Element.prototype.removeEventListener : t6.prototype.detachEvent ? t6.prototype.detachEvent = Element.prototype.detachEvent : void 0;
                }(r4));
              return n2;
            }
          }, void 0 === (s3 = function() {
            return new r3();
          }.apply(e4, [])) || (t4.exports = s3);
        }, 326: (t4, e4, s3) => {
          "use strict";
          function r3(t5) {
            if (void 0 === t5)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t5;
          }
          s3.d(e4, { Z: () => r3 });
        }, 671: (t4, e4, s3) => {
          "use strict";
          function r3(t5, e5) {
            if (!(t5 instanceof e5))
              throw new TypeError("Cannot call a class as a function");
          }
          s3.d(e4, { Z: () => r3 });
        }, 144: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => n2 });
          var r3 = s3(142);
          function i2(t5, e5) {
            for (var s4 = 0; s4 < e5.length; s4++) {
              var i3 = e5[s4];
              i3.enumerable = i3.enumerable || false, i3.configurable = true, "value" in i3 && (i3.writable = true), Object.defineProperty(t5, (0, r3.Z)(i3.key), i3);
            }
          }
          function n2(t5, e5, s4) {
            return e5 && i2(t5.prototype, e5), s4 && i2(t5, s4), Object.defineProperty(t5, "prototype", { writable: false }), t5;
          }
        }, 752: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => i2 });
          var r3 = s3(120);
          function i2() {
            return i2 = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(t5, e5, s4) {
              var i3 = function(t6, e6) {
                for (; !Object.prototype.hasOwnProperty.call(t6, e6) && null !== (t6 = (0, r3.Z)(t6)); )
                  ;
                return t6;
              }(t5, e5);
              if (i3) {
                var n2 = Object.getOwnPropertyDescriptor(i3, e5);
                return n2.get ? n2.get.call(arguments.length < 3 ? t5 : s4) : n2.value;
              }
            }, i2.apply(this, arguments);
          }
        }, 120: (t4, e4, s3) => {
          "use strict";
          function r3(t5) {
            return r3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t6) {
              return t6.__proto__ || Object.getPrototypeOf(t6);
            }, r3(t5);
          }
          s3.d(e4, { Z: () => r3 });
        }, 340: (t4, e4, s3) => {
          "use strict";
          function r3(t5, e5) {
            return r3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t6, e6) {
              return t6.__proto__ = e6, t6;
            }, r3(t5, e5);
          }
          function i2(t5, e5) {
            if ("function" != typeof e5 && null !== e5)
              throw new TypeError("Super expression must either be null or a function");
            t5.prototype = Object.create(e5 && e5.prototype, { constructor: { value: t5, writable: true, configurable: true } }), Object.defineProperty(t5, "prototype", { writable: false }), e5 && r3(t5, e5);
          }
          s3.d(e4, { Z: () => i2 });
        }, 963: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => n2 });
          var r3 = s3(2), i2 = s3(326);
          function n2(t5, e5) {
            if (e5 && ("object" === (0, r3.Z)(e5) || "function" == typeof e5))
              return e5;
            if (void 0 !== e5)
              throw new TypeError("Derived constructors may only return object or undefined");
            return (0, i2.Z)(t5);
          }
        }, 142: (t4, e4, s3) => {
          "use strict";
          s3.d(e4, { Z: () => i2 });
          var r3 = s3(2);
          function i2(t5) {
            var e5 = function(t6, e6) {
              if ("object" !== (0, r3.Z)(t6) || null === t6)
                return t6;
              var s4 = t6[Symbol.toPrimitive];
              if (void 0 !== s4) {
                var i3 = s4.call(t6, e6 || "default");
                if ("object" !== (0, r3.Z)(i3))
                  return i3;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === e6 ? String : Number)(t6);
            }(t5, "string");
            return "symbol" === (0, r3.Z)(e5) ? e5 : String(e5);
          }
        }, 2: (t4, e4, s3) => {
          "use strict";
          function r3(t5) {
            return r3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t6) {
              return typeof t6;
            } : function(t6) {
              return t6 && "function" == typeof Symbol && t6.constructor === Symbol && t6 !== Symbol.prototype ? "symbol" : typeof t6;
            }, r3(t5);
          }
          s3.d(e4, { Z: () => r3 });
        } }, e3 = {};
        function s2(r3) {
          var i2 = e3[r3];
          if (void 0 !== i2)
            return i2.exports;
          var n2 = e3[r3] = { exports: {} };
          return t3[r3].call(n2.exports, n2, n2.exports, s2), n2.exports;
        }
        s2.n = (t4) => {
          var e4 = t4 && t4.__esModule ? () => t4.default : () => t4;
          return s2.d(e4, { a: e4 }), e4;
        }, s2.d = (t4, e4) => {
          for (var r3 in e4)
            s2.o(e4, r3) && !s2.o(t4, r3) && Object.defineProperty(t4, r3, { enumerable: true, get: e4[r3] });
        }, s2.o = (t4, e4) => Object.prototype.hasOwnProperty.call(t4, e4);
        var r2 = {};
        return (() => {
          "use strict";
          s2.d(r2, { default: () => ht });
          var t4 = s2(52), e4 = s2.n(t4), i2 = s2(806), n2 = s2.n(i2), a = s2(671), o2 = s2(144), l = s2(340), h = s2(963), u = s2(120), p = s2(342), c = s2(142);
          function d(t5, e5, s3) {
            return (e5 = (0, c.Z)(e5)) in t5 ? Object.defineProperty(t5, e5, { value: s3, enumerable: true, configurable: true, writable: true }) : t5[e5] = s3, t5;
          }
          var _ = s2(752), f = s2(755), v = s2(973);
          function y(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s3, r3 = (0, u.Z)(t5);
              if (e5) {
                var i3 = (0, u.Z)(this).constructor;
                s3 = Reflect.construct(r3, arguments, i3);
              } else
                s3 = r3.apply(this, arguments);
              return (0, h.Z)(this, s3);
            };
          }
          const m = function(t5) {
            (0, l.Z)(s3, t5);
            var e5 = y(s3);
            function s3() {
              var t6, r3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return (0, a.Z)(this, s3), (t6 = e5.call(this, r3))._transformTweenOptions(), !t6._o.isTweenLess && t6._makeTween(), !t6._o.isTimelineLess && t6._makeTimeline(), t6;
            }
            return (0, o2.Z)(s3, [{ key: "play", value: function() {
              return this.timeline.play.apply(this.timeline, arguments), this;
            } }, { key: "playBackward", value: function() {
              return this.timeline.playBackward.apply(this.timeline, arguments), this;
            } }, { key: "pause", value: function() {
              return this.timeline.pause.apply(this.timeline, arguments), this;
            } }, { key: "stop", value: function() {
              return this.timeline.stop.apply(this.timeline, arguments), this;
            } }, { key: "reset", value: function() {
              return this.timeline.reset.apply(this.timeline, arguments), this;
            } }, { key: "replay", value: function() {
              return this.timeline.replay.apply(this.timeline, arguments), this;
            } }, { key: "replayBackward", value: function() {
              return this.timeline.replayBackward.apply(this.timeline, arguments), this;
            } }, { key: "resume", value: function() {
              return this.timeline.resume.apply(this.timeline, arguments), this;
            } }, { key: "setProgress", value: function() {
              return this.timeline.setProgress.apply(this.timeline, arguments), this;
            } }, { key: "setSpeed", value: function() {
              return this.timeline.setSpeed.apply(this.timeline, arguments), this;
            } }, { key: "_transformTweenOptions", value: function() {
            } }, { key: "_makeTween", value: function() {
              this._o.callbacksContext = this._o.callbacksContext || this, this.tween = new f.Z(this._o), this._o.isTimelineLess && (this.timeline = this.tween);
            } }, { key: "_makeTimeline", value: function() {
              this._o.timeline = this._o.timeline || {}, this._o.timeline.callbacksContext = this._o.callbacksContext || this, this.timeline = new p.Z(this._o.timeline), this._isTimeline = true, this.tween && this.timeline.add(this.tween);
            } }]), s3;
          }(v.Z);
          function g(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s3, r3 = (0, u.Z)(t5);
              if (e5) {
                var i3 = (0, u.Z)(this).constructor;
                s3 = Reflect.construct(r3, arguments, i3);
              } else
                s3 = r3.apply(this, arguments);
              return (0, h.Z)(this, s3);
            };
          }
          var k = function(t5) {
            (0, l.Z)(r3, t5);
            var s3 = g(r3);
            function r3() {
              return (0, a.Z)(this, r3), s3.apply(this, arguments);
            }
            return (0, o2.Z)(r3, [{ key: "then", value: function(t6) {
              if (null == t6 || !Object.keys(t6).length)
                return 1;
              var e5 = this._history[this._history.length - 1], s4 = this._mergeThenOptions(e5, t6);
              this._resetMergedFlags(s4);
              var r4 = new this.constructor(s4);
              return r4._masterModule = this, this._modules.push(r4), this.timeline.append(r4), this;
            } }, { key: "_resetMergedFlags", value: function(t6) {
              return t6.isTimelineLess = true, t6.isShowStart = false, t6.isRefreshState = false, t6.callbacksContext = this._props.callbacksContext || this, t6.prevChainModule = e4().getLastItem(this._modules), t6.masterModule = this, t6;
            } }, { key: "_vars", value: function() {
              (0, _.Z)((0, u.Z)(r3.prototype), "_vars", this).call(this), this._masterModule = this._o.masterModule, this._isChained = !!this._masterModule;
              var t6 = e4().cloneObj(this._props);
              for (var s4 in this._arrayPropertyMap)
                if (this._o[s4]) {
                  var i3 = this._parsePreArrayProperty(s4, this._o[s4]);
                  t6[s4] = i3;
                }
              this._history = [t6], this._modules = [this], this._nonMergeProps = { shape: 1 };
            } }, { key: "_mergeThenOptions", value: function(t6, e5) {
              var s4 = {};
              return this._mergeStartLoop(s4, t6), this._mergeEndLoop(s4, t6, e5), this._history.push(s4), s4;
            } }, { key: "_checkStartValue", value: function(t6, e5) {
              return e5;
            } }, { key: "_mergeStartLoop", value: function(t6, s4) {
              for (var r4 in s4) {
                var i3 = s4[r4];
                null != s4[r4] && (e4().isTweenProp(r4) && "duration" !== r4 || (this._isDelta(i3) ? t6[r4] = e4().getDeltaEnd(i3) : t6[r4] = i3));
              }
            } }, { key: "_mergeEndLoop", value: function(t6, e5, s4) {
              for (var r4 in s4)
                if ("parent" != r4) {
                  var i3 = s4[r4], n3 = null != e5[r4] ? e5[r4] : this._defaults[r4];
                  if (n3 = this._checkStartValue(r4, n3), null != i3) {
                    var a2 = "radiusX" === r4 || "radiusY" === r4;
                    a2 && null == n3 && (n3 = e5.radius), (a2 = "scaleX" === r4 || "scaleY" === r4) && null == n3 && (n3 = e5.scale), t6[r4] = this._mergeThenProperty(r4, n3, i3);
                  }
                } else
                  t6[r4] = s4[r4];
            } }, { key: "_mergeThenProperty", value: function(t6, s4, r4) {
              var i3, n3, a2 = "boolean" == typeof r4;
              if (e4().isTweenProp(t6) || this._nonMergeProps[t6] || a2)
                return r4;
              if (e4().isObject(r4) && null != r4.to && (i3 = r4.curve, n3 = r4.easing, r4 = r4.to), this._isDelta(r4))
                return this._parseDeltaValues(t6, r4);
              var o3, l2, h2 = this._parsePreArrayProperty(t6, r4);
              return this._isDelta(s4) ? (d(o3 = {}, e4().getDeltaEnd(s4), h2), d(o3, "easing", n3), d(o3, "curve", i3), o3) : (d(l2 = {}, s4, h2), d(l2, "easing", n3), d(l2, "curve", i3), l2);
            } }, { key: "_getArrayLength", value: function(t6) {
              return e4().isArray(t6) ? t6.length : -1;
            } }, { key: "_isDelta", value: function(t6) {
              var s4 = e4().isObject(t6);
              return !(!(s4 = s4 && !t6.unit) || e4().isArray(t6) || e4().isDOM(t6));
            } }, { key: "_isFirstInChain", value: function() {
              return !this._masterModule;
            } }, { key: "_isLastInChain", value: function() {
              var t6 = this._masterModule;
              return t6 ? this === e4().getLastItem(t6._modules) : 1 === this._modules.length;
            } }]), r3;
          }(m);
          const w = k;
          function b(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s3, r3 = (0, u.Z)(t5);
              if (e5) {
                var i3 = (0, u.Z)(this).constructor;
                s3 = Reflect.construct(r3, arguments, i3);
              } else
                s3 = r3.apply(this, arguments);
              return (0, h.Z)(this, s3);
            };
          }
          var S = function(t5) {
            (0, l.Z)(r3, t5);
            var s3 = b(r3);
            function r3() {
              return (0, a.Z)(this, r3), s3.apply(this, arguments);
            }
            return (0, o2.Z)(r3, [{ key: "tune", value: function(t6) {
              if (t6 && Object.keys(t6).length) {
                for (var s4 in this._transformHistory(t6), this._tuneNewOptions(t6), this._history[0] = e4().cloneObj(this._props), this._arrayPropertyMap)
                  null != t6[s4] && (this._history[0][s4] = this._preparsePropValue(s4, t6[s4]));
                this._tuneSubModules(), this._resetTweens();
              }
              return this;
            } }, { key: "generate", value: function() {
              return this.tune(this._o);
            } }, { key: "_transformHistory", value: function(t6) {
              for (var e5 in t6) {
                var s4 = t6[e5];
                this._transformHistoryFor(e5, this._preparsePropValue(e5, s4));
              }
            } }, { key: "_transformHistoryFor", value: function(t6, e5) {
              for (var s4 = 0; s4 < this._history.length && null != (e5 = this._transformHistoryRecord(s4, t6, e5)); s4++)
                ;
            } }, { key: "_transformHistoryRecord", value: function(t6, s4, r4, i3, n3) {
              if (null == r4)
                return null;
              i3 = null == i3 ? this._history[t6] : i3, n3 = null == n3 ? this._history[t6 + 1] : n3;
              var a2 = i3[s4], o3 = null == n3 ? null : n3[s4];
              if (0 === t6) {
                if (i3[s4] = r4, e4().isTweenProp(s4) && "duration" !== s4)
                  return null;
                var l2 = this._isRewriteNext(a2, o3), h2 = this._isDelta(r4) ? e4().getDeltaEnd(r4) : r4;
                return l2 ? h2 : null;
              }
              return this._isDelta(a2) ? (i3[s4] = d({}, r4, e4().getDeltaEnd(a2)), null) : (i3[s4] = r4, this._isRewriteNext(a2, o3) ? r4 : null);
            } }, { key: "_isRewriteNext", value: function(t6, s4) {
              if (null == s4 && null != t6)
                return false;
              var r4 = t6 === s4, i3 = this._isDelta(s4), n3 = false, a2 = false;
              return this._isDelta(t6) && i3 ? e4().getDeltaEnd(t6) == e4().getDeltaStart(s4) && (a2 = true) : i3 && (n3 = e4().getDeltaStart(s4) === "".concat(t6)), r4 || n3 || a2;
            } }, { key: "_tuneSubModules", value: function() {
              for (var t6 = 1; t6 < this._modules.length; t6++)
                this._modules[t6]._tuneNewOptions(this._history[t6]);
            } }, { key: "_resetTweens", value: function() {
              var t6 = 0, e5 = this.timeline._timelines;
              if (null != e5) {
                for (var s4 = 0; s4 < e5.length; s4++) {
                  var r4 = e5[s4], i3 = e5[s4 - 1];
                  t6 += i3 ? i3._props.repeatTime : 0, this._resetTween(r4, this._history[s4], t6);
                }
                this.timeline._setProp(this._props.timeline), this.timeline._recalcTotalDuration();
              }
            } }, { key: "_resetTween", value: function(t6, e5) {
              var s4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
              e5.shiftTime = s4, t6._setProp(e5);
            } }]), r3;
          }(w);
          const P = S;
          function T(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s3, r3 = (0, u.Z)(t5);
              if (e5) {
                var i3 = (0, u.Z)(this).constructor;
                s3 = Reflect.construct(r3, arguments, i3);
              } else
                s3 = r3.apply(this, arguments);
              return (0, h.Z)(this, s3);
            };
          }
          var x = function(t5) {
            (0, l.Z)(r3, t5);
            var s3 = T(r3);
            function r3(t6, e5) {
              var i3;
              return (0, a.Z)(this, r3), i3 = s3.call(this), (0, h.Z)(i3, i3._init(t6, e5));
            }
            return (0, o2.Z)(r3, [{ key: "then", value: function(t6) {
              if (null == t6)
                return this;
              for (var e5 = 0; e5 < this._modules.length; e5++)
                this._modules[e5].then(this._getOptionByIndex(e5, t6));
              return this.timeline._recalcTotalDuration(), this;
            } }, { key: "tune", value: function(t6) {
              if (null == t6)
                return this;
              for (var e5 = 0; e5 < this._modules.length; e5++)
                this._modules[e5].tune(this._getOptionByIndex(e5, t6));
              return this.timeline._recalcTotalDuration(), this;
            } }, { key: "generate", value: function() {
              for (var t6 = 0; t6 < this._modules.length; t6++)
                this._modules[t6].generate();
              return this.timeline._recalcTotalDuration(), this;
            } }, { key: "_getOptionByMod", value: function(t6, s4, r4) {
              var i3 = r4[t6];
              i3 + "" != "[object NodeList]" && i3 + "" != "[object HTMLCollection]" || (i3 = Array.prototype.slice.call(i3, 0));
              var n3 = e4().isArray(i3) ? i3[s4 % i3.length] : i3;
              return e4().parseIfStagger(n3, s4);
            } }, { key: "_getOptionByIndex", value: function(t6, e5) {
              var s4 = this, r4 = {};
              return Object.keys(e5).forEach(function(i3) {
                return r4[i3] = s4._getOptionByMod(i3, t6, e5);
              }), r4;
            } }, { key: "_getChildQuantity", value: function(t6, s4) {
              if ("number" == typeof t6)
                return t6;
              var r4 = s4[t6];
              return e4().isArray(r4) || r4 + "" == "[object NodeList]" ? r4.length : r4 + "" == "[object HTMLCollection]" ? Array.prototype.slice.call(r4, 0).length : r4 instanceof HTMLElement || "string" == typeof r4 ? 1 : void 0;
            } }, { key: "_init", value: function(t6, e5) {
              var s4 = this._getChildQuantity(t6.quantifier || "el", t6);
              this._createTimeline(t6), this._modules = [];
              for (var r4 = 0; r4 < s4; r4++) {
                var i3 = this._getOptionByIndex(r4, t6);
                i3.isRunLess = true, i3.index = r4;
                var n3 = new e5(i3);
                this._modules.push(n3), this.timeline.add(n3);
              }
              return this;
            } }, { key: "_createTimeline", value: function() {
              var t6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              this.timeline = new p.Z(t6.timeline);
            } }, { key: "_makeTween", value: function() {
            } }, { key: "_makeTimeline", value: function() {
            } }]), r3;
          }(P), C = s2(47), O = s2(283), M = s2.n(O);
          function Z(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s3, r3 = (0, u.Z)(t5);
              if (e5) {
                var i3 = (0, u.Z)(this).constructor;
                s3 = Reflect.construct(r3, arguments, i3);
              } else
                s3 = r3.apply(this, arguments);
              return (0, h.Z)(this, s3);
            };
          }
          var D = function(t5) {
            (0, l.Z)(r3, t5);
            var s3 = Z(r3);
            function r3() {
              return (0, a.Z)(this, r3), s3.apply(this, arguments);
            }
            return (0, o2.Z)(r3, [{ key: "_declareDefaults", value: function() {
              this._defaults = { parent: document.body, className: "", shape: "circle", stroke: "transparent", strokeOpacity: 1, strokeLinecap: "", strokeWidth: 2, strokeDasharray: 0, strokeDashoffset: 0, fill: "deeppink", fillOpacity: 1, isSoftHide: true, isForce3d: false, left: "50%", top: "50%", x: 0, y: 0, rotate: 0, scale: 1, scaleX: null, scaleY: null, origin: "50% 50%", opacity: 1, rx: 0, ry: 0, points: 3, radius: 50, radiusX: null, radiusY: null, isShowStart: false, isShowEnd: true, isRefreshState: true, duration: 400, width: null, height: null, isWithShape: true, callbacksContext: this };
            } }, { key: "tune", value: function(t6) {
              return (0, _.Z)((0, u.Z)(r3.prototype), "tune", this).call(this, t6), this._getMaxSizeInChain(), this;
            } }, { key: "then", value: function(t6) {
              return (0, _.Z)((0, u.Z)(r3.prototype), "then", this).call(this, t6), this._getMaxSizeInChain(), this;
            } }, { key: "_vars", value: function() {
              return (0, _.Z)((0, u.Z)(r3.prototype), "_vars", this).call(this), this._lastSet = {}, this._prevChainModule = this._o.prevChainModule, this.isForeign = !!this._o.ctx, this.isForeignBit = !!this._o.shape;
            } }, { key: "_render", value: function() {
              return this._isRendered || this._isChained ? this._isChained && (this.el = this._masterModule.el, this.shapeModule = this._masterModule.shapeModule) : (this.el = document.createElement("div"), this.el.setAttribute("data-name", "mojs-shape"), this.el.setAttribute("class", this._props.className), this._createShape(), this._props.parent.appendChild(this.el), this._setElStyles(), this._setProgress(0, 0), this._props.isShowStart ? this._show() : this._hide(), this._isRendered = true), this;
            } }, { key: "_setElStyles", value: function() {
              if (this.el) {
                var t6 = this._props, s4 = this.el.style, r4 = t6.shapeWidth, i3 = t6.shapeHeight;
                if (s4.position = "absolute", this._setElSizeStyles(r4, i3), t6.isForce3d) {
                  var n3 = "backface-visibility";
                  s4["".concat(n3)] = "hidden", s4["".concat(e4().prefix.css).concat(n3)] = "hidden";
                }
              }
            } }, { key: "_setElSizeStyles", value: function(t6, e5) {
              var s4 = this.el.style;
              s4.width = "".concat(t6, "px"), s4.height = "".concat(e5, "px"), s4["margin-left"] = "".concat(-t6 / 2, "px"), s4["margin-top"] = "".concat(-e5 / 2, "px");
            } }, { key: "_draw", value: function() {
              if (this.shapeModule) {
                var t6 = this._props, e5 = this.shapeModule._props;
                e5.rx = t6.rx, e5.ry = t6.ry, e5.stroke = t6.stroke, e5["stroke-width"] = t6.strokeWidth, e5["stroke-opacity"] = t6.strokeOpacity, e5["stroke-dasharray"] = t6.strokeDasharray, e5["stroke-dashoffset"] = t6.strokeDashoffset, e5["stroke-linecap"] = t6.strokeLinecap, e5.fill = t6.fill, e5["fill-opacity"] = t6.fillOpacity, e5.radius = t6.radius, e5.radiusX = t6.radiusX, e5.radiusY = t6.radiusY, e5.points = t6.points, this.shapeModule._draw(), this._drawEl();
              }
            } }, { key: "_drawEl", value: function() {
              if (null == this.el)
                return true;
              var t6 = this._props, s4 = this.el.style;
              if (this._isPropChanged("opacity") && (s4.opacity = t6.opacity), !this.isForeign) {
                this._isPropChanged("left") && (s4.left = t6.left), this._isPropChanged("top") && (s4.top = t6.top);
                var r4 = this._isPropChanged("x"), i3 = this._isPropChanged("y"), n3 = r4 || i3, a2 = this._isPropChanged("scaleX"), o3 = this._isPropChanged("scaleY"), l2 = this._isPropChanged("scale"), h2 = this._isPropChanged("rotate");
                if (l2 = l2 || a2 || o3, n3 || l2 || h2) {
                  var u2 = this._fillTransform();
                  s4["".concat(e4().prefix.css, "transform")] = u2, s4.transform = u2;
                }
                if (this._isPropChanged("origin") || this._deltas.origin) {
                  var p2 = this._fillOrigin();
                  s4["".concat(e4().prefix.css, "transform-origin")] = p2, s4["transform-origin"] = p2;
                }
              }
            } }, { key: "_isPropChanged", value: function(t6) {
              return null == this._lastSet[t6] && (this._lastSet[t6] = {}), this._lastSet[t6].value !== this._props[t6] && (this._lastSet[t6].value = this._props[t6], true);
            } }, { key: "_tuneNewOptions", value: function(t6) {
              if ((0, _.Z)((0, u.Z)(r3.prototype), "_tuneNewOptions", this).call(this, t6), null == t6 || !Object.keys(t6).length)
                return 1;
              this._setElStyles();
            } }, { key: "_getMaxRadius", value: function(t6) {
              var e5;
              return e5 = this._getRadiusSize("radius"), this._getRadiusSize(t6, e5);
            } }, { key: "_increaseSizeWithEasing", value: function() {
              var t6 = this._props, e5 = this._o.easing;
              switch (e5 && "string" == typeof e5 && e5.toLowerCase()) {
                case "elastic.out":
                case "elastic.inout":
                  t6.size *= 1.25;
                  break;
                case "back.out":
                case "back.inout":
                  t6.size *= 1.1;
              }
            } }, { key: "_getRadiusSize", value: function(t6) {
              var e5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, s4 = this._deltas[t6];
              return null != s4 ? Math.max(Math.abs(s4.end), Math.abs(s4.start)) : null != this._props[t6] ? parseFloat(this._props[t6]) : e5;
            } }, { key: "_getShapeSize", value: function() {
              var t6 = this._props, e5 = this._getMaxStroke();
              t6.shapeWidth = null != t6.width ? t6.width : 2 * this._getMaxRadius("radiusX") + e5, t6.shapeHeight = null != t6.height ? t6.height : 2 * this._getMaxRadius("radiusY") + e5;
            } }, { key: "_createShape", value: function() {
              if (this._getShapeSize(), this._props.isWithShape) {
                var t6 = this._props, e5 = n2().getShape(this._props.shape);
                this.shapeModule = new e5({ width: t6.shapeWidth, height: t6.shapeHeight, parent: this.el });
              }
            } }, { key: "_getMaxSizeInChain", value: function() {
              for (var t6 = 0, e5 = 0, s4 = 0; s4 < this._modules.length; s4++)
                this._modules[s4]._getShapeSize(), t6 = Math.max(t6, this._modules[s4]._props.shapeWidth), e5 = Math.max(e5, this._modules[s4]._props.shapeHeight);
              this.shapeModule && this.shapeModule._setSize(t6, e5), this._setElSizeStyles(t6, e5);
            } }, { key: "_getMaxStroke", value: function() {
              var t6 = this._props, e5 = this._deltas.strokeWidth;
              return null != e5 ? Math.max(e5.start, e5.end) : t6.strokeWidth;
            } }, { key: "_setProgress", value: function(t6, e5) {
              v.Z.prototype._setProgress.call(this, t6, e5), this._draw(t6);
            } }, { key: "_applyCallbackOverrides", value: function(t6) {
              var e5 = this, s4 = this._props;
              t6.callbackOverrides = { onUpdate: function(t7, s5) {
                return e5._setProgress(t7, s5);
              }, onStart: function(t7) {
                e5._isChained || (t7 ? e5._show() : s4.isShowStart || e5._hide());
              }, onComplete: function(t7) {
                e5._isLastInChain() && (t7 ? s4.isShowEnd || e5._hide() : e5._show());
              }, onRefresh: function(t7) {
                s4.isRefreshState && t7 && e5._refreshBefore();
              } };
            } }, { key: "_transformTweenOptions", value: function() {
              this._applyCallbackOverrides(this._o);
            } }, { key: "_fillTransform", value: function() {
              var t6 = this._props, e5 = null != t6.scaleX ? t6.scaleX : t6.scale, s4 = null != t6.scaleY ? t6.scaleY : t6.scale, r4 = "".concat(e5, ", ").concat(s4);
              return "translate(".concat(t6.x, ", ").concat(t6.y, ") rotate(").concat(t6.rotate, "deg) scale(").concat(r4, ")");
            } }, { key: "_fillOrigin", value: function() {
              for (var t6 = this._props, e5 = "", s4 = 0; s4 < t6.origin.length; s4++)
                e5 += "".concat(t6.origin[s4].string, " ");
              return e5;
            } }, { key: "_refreshBefore", value: function() {
              this._setProgress(this.tween._props.easing(0), 0), this._props.isShowStart ? this._show() : this._hide();
            } }, { key: "_showByTransform", value: function() {
              this._lastSet.scale = null, this._drawEl();
            } }]), r3;
          }(P);
          const R = D;
          function E(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s3, r3 = (0, u.Z)(t5);
              if (e5) {
                var i3 = (0, u.Z)(this).constructor;
                s3 = Reflect.construct(r3, arguments, i3);
              } else
                s3 = r3.apply(this, arguments);
              return (0, h.Z)(this, s3);
            };
          }
          const L = function(t5) {
            (0, l.Z)(r3, t5);
            var s3 = E(r3);
            function r3() {
              return (0, a.Z)(this, r3), s3.apply(this, arguments);
            }
            return (0, o2.Z)(r3, [{ key: "_declareDefaults", value: function() {
              (0, _.Z)((0, u.Z)(r3.prototype), "_declareDefaults", this).call(this), this._defaults.isSwirl = true, this._defaults.swirlSize = 10, this._defaults.swirlFrequency = 3, this._defaults.pathScale = 1, this._defaults.degreeShift = 0, this._defaults.radius = 5, this._defaults.x = 0, this._defaults.y = 0, this._defaults.scale = { 1: 0 }, this._defaults.direction = 1;
            } }, { key: "_extendDefaults", value: function() {
              (0, _.Z)((0, u.Z)(r3.prototype), "_extendDefaults", this).call(this), this._calcPosData();
            } }, { key: "_tuneNewOptions", value: function(t6) {
              null != t6 && ((0, _.Z)((0, u.Z)(r3.prototype), "_tuneNewOptions", this).call(this, t6), null == t6.x && null == t6.y || this._calcPosData());
            } }, { key: "_calcPosData", value: function() {
              var t6 = this._getPosValue("x"), s4 = this._getPosValue("y"), r4 = 90 + Math.atan(s4.delta / t6.delta || 0) * e4().RAD_TO_DEG;
              this._posData = { radius: Math.sqrt(t6.delta * t6.delta + s4.delta * s4.delta), rotate: t6.delta < 0 ? r4 + 180 : r4, x: t6, y: s4 };
            } }, { key: "_getPosValue", value: function(t6) {
              var s4 = this._deltas[t6];
              if (s4)
                return delete this._deltas[t6], { start: s4.start.value, end: s4.end.value, delta: s4.delta, units: s4.end.unit };
              var r4 = e4().parseUnit(this._props[t6]);
              return { start: r4.value, end: r4.value, delta: 0, units: r4.unit };
            } }, { key: "_setProgress", value: function(t6, e5) {
              this._progress = t6, this._calcCurrentProps(t6, e5), this._calcSwirlXY(t6), this._draw(t6);
            } }, { key: "_calcSwirlXY", value: function(t6) {
              var s4 = this._props, r4 = this._posData.rotate + s4.degreeShift, i3 = e4().getRadialPoint({ rotate: s4.isSwirl ? r4 + this._getSwirl(t6) : r4, radius: t6 * this._posData.radius * s4.pathScale, center: { x: this._posData.x.start, y: this._posData.y.start } }), n3 = i3.x, a2 = i3.y, o3 = 1e-6;
              n3 > 0 && n3 < o3 && (n3 = o3), a2 > 0 && a2 < o3 && (a2 = o3), n3 < 0 && n3 > -1e-6 && (n3 = -1e-6), a2 < 0 && a2 > -1e-6 && (a2 = -1e-6), s4.x = this._o.ctx ? n3 : "".concat(n3).concat(this._posData.x.units), s4.y = this._o.ctx ? a2 : "".concat(a2).concat(this._posData.y.units);
            } }, { key: "_getSwirl", value: function(t6) {
              var e5 = this._props;
              return e5.direction * e5.swirlSize * Math.sin(e5.swirlFrequency * t6);
            } }, { key: "_draw", value: function() {
              var t6 = this._props.isWithShape ? "_draw" : "_drawEl";
              R.prototype[t6].call(this);
            } }]), r3;
          }(R);
          function A(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s3, r3 = (0, u.Z)(t5);
              if (e5) {
                var i3 = (0, u.Z)(this).constructor;
                s3 = Reflect.construct(r3, arguments, i3);
              } else
                s3 = r3.apply(this, arguments);
              return (0, h.Z)(this, s3);
            };
          }
          var I = function(t5) {
            (0, l.Z)(r3, t5);
            var s3 = A(r3);
            function r3() {
              return (0, a.Z)(this, r3), s3.apply(this, arguments);
            }
            return (0, o2.Z)(r3, [{ key: "_declareDefaults", value: function() {
              this._defaults = { count: 5, degree: 360, radius: { 0: 50 }, radiusX: null, radiusY: null, width: 0, height: 0 };
            } }, { key: "then", value: function(t6) {
              this._removeTweenProperties(t6);
              var e5 = this._masterThen(t6), s4 = this._childThen(t6);
              return this._setSwirlDuration(e5, this._calcPackTime(s4)), this.timeline._recalcTotalDuration(), this;
            } }, { key: "tune", value: function(t6) {
              return null == t6 || (this._saveTimelineOptions(t6), this.timeline._setProp(this._timelineOptions), this._removeTweenProperties(t6), this._tuneNewOptions(t6), this.masterSwirl.tune(t6), this._tuneSwirls(t6), this._recalcModulesTime()), this;
            } }, { key: "_extendDefaults", value: function() {
              this._removeTweenProperties(this._o), (0, _.Z)((0, u.Z)(r3.prototype), "_extendDefaults", this).call(this);
            } }, { key: "_removeTweenProperties", value: function(t6) {
              for (var s4 in e4().tweenOptionMap)
                null == this._defaults[s4] && delete t6[s4];
            } }, { key: "_recalcModulesTime", value: function() {
              for (var t6 = this.masterSwirl._modules, e5 = this._swirls, s4 = 0, r4 = 0; r4 < t6.length; r4++) {
                var i3 = t6[r4].tween, n3 = this._calcPackTime(e5[r4]);
                i3._setProp({ duration: n3, shiftTime: s4 }), s4 += n3;
              }
              this.timeline._recalcTotalDuration();
            } }, { key: "_tuneSwirls", value: function(t6) {
              for (var e5 = this._swirls[0], s4 = 0; s4 < e5.length; s4++) {
                var r4 = e5[s4], i3 = this._getChildOption(t6 || {}, s4), n3 = null != i3.degreeShift;
                n3 || (i3.degreeShift = this._swirls[0][s4]._props.degreeShift), this._addBurstProperties(i3, s4), n3 || delete i3.degreeShift, r4.tune(i3), this._refreshBurstOptions(r4._modules, s4);
              }
            } }, { key: "_refreshBurstOptions", value: function(t6, e5) {
              for (var s4 = 1; s4 < t6.length; s4++) {
                var r4 = t6[s4], i3 = {};
                this._addBurstProperties(i3, e5, s4), r4._tuneNewOptions(i3);
              }
            } }, { key: "_masterThen", value: function(t6) {
              this.masterSwirl.then(t6);
              var s4 = e4().getLastItem(this.masterSwirl._modules);
              return this._masterSwirls.push(s4), s4;
            } }, { key: "_childThen", value: function(t6) {
              for (var s4 = this._swirls[0], r4 = [], i3 = 0; i3 < s4.length; i3++) {
                var n3 = this._getChildOption(t6, i3), a2 = s4[i3];
                n3.parent = this.el, this._addBurstProperties(n3, i3, this._masterSwirls.length - 1), a2.then(n3), r4.push(e4().getLastItem(a2._modules));
              }
              return this._swirls[this._masterSwirls.length - 1] = r4, r4;
            } }, { key: "_vars", value: function() {
              (0, _.Z)((0, u.Z)(r3.prototype), "_vars", this).call(this), this._bufferTimeline = new p.Z();
            } }, { key: "_render", value: function() {
              this._o.isWithShape = false, this._o.isSwirl = this._props.isSwirl, this._o.callbacksContext = this, this._saveTimelineOptions(this._o), this.masterSwirl = new Y(this._o), this._masterSwirls = [this.masterSwirl], this.el = this.masterSwirl.el, this._renderSwirls();
            } }, { key: "_renderSwirls", value: function() {
              for (var t6 = this._props, e5 = [], s4 = 0; s4 < t6.count; s4++) {
                var r4 = this._getChildOption(this._o, s4);
                e5.push(new j(this._addOptionalProps(r4, s4)));
              }
              this._swirls = { 0: e5 }, this._setSwirlDuration(this.masterSwirl, this._calcPackTime(e5));
            } }, { key: "_saveTimelineOptions", value: function(t6) {
              this._timelineOptions = t6.timeline, delete t6.timeline;
            } }, { key: "_calcPackTime", value: function(t6) {
              for (var e5 = 0, s4 = 0; s4 < t6.length; s4++) {
                var r4 = t6[s4].tween._props;
                e5 = Math.max(r4.repeatTime / r4.speed, e5);
              }
              return e5;
            } }, { key: "_setSwirlDuration", value: function(t6, e5) {
              t6.tween._setProp("duration", e5), t6.timeline && t6.timeline._recalcTotalDuration && t6.timeline._recalcTotalDuration();
            } }, { key: "_getChildOption", value: function(t6, e5) {
              var s4 = {};
              for (var r4 in t6.children)
                s4[r4] = this._getPropByMod(r4, e5, t6.children);
              return s4;
            } }, { key: "_getPropByMod", value: function(t6, s4) {
              var r4 = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {})[t6];
              return e4().isArray(r4) ? r4[s4 % r4.length] : r4;
            } }, { key: "_addOptionalProps", value: function(t6, e5) {
              return t6.index = e5, t6.parent = this.masterSwirl.el, this._addBurstProperties(t6, e5), t6;
            } }, { key: "_addBurstProperties", value: function(t6, e5, s4) {
              var r4 = this._index;
              this._index = e5;
              var i3 = this._parseProperty("degreeShift", t6.degreeShift || 0);
              this._index = r4;
              var n3 = this._props, a2 = n3.degree % 360 == 0 ? n3.count : n3.count - 1 || 1, o3 = n3.degree / a2, l2 = this._getSidePoint("start", e5 * o3 + i3, s4), h2 = this._getSidePoint("end", e5 * o3 + i3, s4);
              t6.x = this._getDeltaFromPoints("x", l2, h2), t6.y = this._getDeltaFromPoints("y", l2, h2), t6.rotate = this._getBitRotation(t6.rotate || 0, i3, e5);
            } }, { key: "_getBitRotation", value: function() {
              var t6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, s4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r4 = arguments.length > 2 ? arguments[2] : void 0, i3 = this._props, n3 = i3.degree % 360 == 0 ? i3.count : i3.count - 1 || 1, a2 = r4 * (i3.degree / n3) + 90;
              if (a2 += s4, this._isDelta(t6)) {
                var o3 = {}, l2 = Object.keys(t6)[0], h2 = t6[l2];
                l2 = e4().parseStringOption(l2, r4), h2 = e4().parseStringOption(h2, r4), o3[parseFloat(l2) + a2] = parseFloat(h2) + a2, t6 = o3;
              } else
                t6 += a2;
              return t6;
            } }, { key: "_getSidePoint", value: function(t6, s4, r4) {
              var i3 = this._getSideRadius(t6, r4);
              return e4().getRadialPoint({ radius: i3.radius, radiusX: i3.radiusX, radiusY: i3.radiusY, rotate: s4, center: { x: 0, y: 0 } });
            } }, { key: "_getSideRadius", value: function(t6, e5) {
              return { radius: this._getRadiusByKey("radius", t6, e5), radiusX: this._getRadiusByKey("radiusX", t6, e5), radiusY: this._getRadiusByKey("radiusY", t6, e5) };
            } }, { key: "_getRadiusByKey", value: function(t6, e5) {
              var s4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, r4 = this._masterSwirls[s4], i3 = r4._deltas, n3 = r4._props;
              return null != i3[t6] ? i3[t6][e5] : null != n3[t6] ? n3[t6] : void 0;
            } }, { key: "_getDeltaFromPoints", value: function(t6, e5, s4) {
              var r4 = {};
              return e5[t6] === s4[t6] ? r4 = e5[t6] : r4[e5[t6]] = s4[t6], r4;
            } }, { key: "_makeTimeline", value: function() {
              this._o.timeline = this._timelineOptions, (0, _.Z)((0, u.Z)(r3.prototype), "_makeTimeline", this).call(this), this.timeline.add(this.masterSwirl, this._swirls[0]);
            } }, { key: "_makeTween", value: function() {
            } }, { key: "_hide", value: function() {
            } }, { key: "_show", value: function() {
            } }]), r3;
          }(P), j = function(t5) {
            (0, l.Z)(s3, t5);
            var e5 = A(s3);
            function s3() {
              return (0, a.Z)(this, s3), e5.apply(this, arguments);
            }
            return (0, o2.Z)(s3, [{ key: "_declareDefaults", value: function() {
              (0, _.Z)((0, u.Z)(s3.prototype), "_declareDefaults", this).call(this), this._defaults.isSwirl = false, this._o.duration = null != this._o.duration ? this._o.duration : 700;
            } }, { key: "_calcSwirlXY", value: function(t6) {
              var e6 = this._props.degreeShift;
              this._props.degreeShift = 0, (0, _.Z)((0, u.Z)(s3.prototype), "_calcSwirlXY", this).call(this, t6), this._props.degreeShift = e6;
            } }]), s3;
          }(L), Y = function(t5) {
            (0, l.Z)(s3, t5);
            var e5 = A(s3);
            function s3() {
              return (0, a.Z)(this, s3), e5.apply(this, arguments);
            }
            return (0, o2.Z)(s3, [{ key: "_declareDefaults", value: function() {
              (0, _.Z)((0, u.Z)(s3.prototype), "_declareDefaults", this).call(this), this._defaults.scale = 1, this._defaults.width = 0, this._defaults.height = 0, this._defaults.radius = { 25: 75 };
            } }]), s3;
          }(j);
          I.ChildSwirl = j, I.MainSwirl = Y;
          const B = I;
          var X = function() {
            function t5() {
              var e5 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              (0, a.Z)(this, t5), this._o = e5, this._createTween(e5.tweenOptions), !this._o.isChained && this.refresh(true);
            }
            return (0, o2.Z)(t5, [{ key: "refresh", value: function(t6) {
              this._previousValues = [];
              for (var e5 = this._o.deltas, s3 = 0; s3 < e5.length; s3++) {
                var r3 = e5[s3].name;
                this._previousValues.push({ name: r3, value: this._o.props[r3] });
              }
              return this.tween._refresh(t6), this;
            } }, { key: "restore", value: function() {
              for (var t6 = this._previousValues, e5 = 0; e5 < t6.length; e5++) {
                var s3 = t6[e5];
                this._o.props[s3.name] = s3.value;
              }
              return this;
            } }, { key: "_createTween", value: function() {
              var t6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e5 = this;
              t6.callbackOverrides = { onUpdate: function(t7, s3) {
                e5._calcCurrentProps(t7, s3);
              } }, this._o.isChained || (t6.callbackOverrides.onRefresh = function(t7, s3, r3) {
                e5._calcCurrentProps(s3, r3);
              }), t6.callbacksContext = this._o.callbacksContext, this.tween = new f.Z(t6);
            } }, { key: "_calcCurrentProps", value: function(t6, e5) {
              for (var s3 = this._o.deltas, r3 = 0; r3 < s3.length; r3++) {
                var i3 = s3[r3].type;
                this["_calcCurrent_".concat(i3)](s3[r3], t6, e5);
              }
            } }, { key: "_calcCurrent_color", value: function(t6, e5, s3) {
              var r3, i3, n3, a2, o3 = t6.start, l2 = t6.delta;
              if (t6.curve) {
                var h2 = t6.curve(s3);
                r3 = parseInt(h2 * (o3.r + s3 * l2.r), 10), i3 = parseInt(h2 * (o3.g + s3 * l2.g), 10), n3 = parseInt(h2 * (o3.b + s3 * l2.b), 10), a2 = parseFloat(h2 * (o3.a + s3 * l2.a));
              } else
                r3 = parseInt(o3.r + e5 * l2.r, 10), i3 = parseInt(o3.g + e5 * l2.g, 10), n3 = parseInt(o3.b + e5 * l2.b, 10), a2 = parseFloat(o3.a + e5 * l2.a);
              this._o.props[t6.name] = "rgba(".concat(r3, ",").concat(i3, ",").concat(n3, ",").concat(a2, ")");
            } }, { key: "_calcCurrent_number", value: function(t6, e5, s3) {
              this._o.props[t6.name] = t6.curve ? t6.curve(s3) * (t6.start + s3 * t6.delta) : t6.start + e5 * t6.delta;
            } }, { key: "_calcCurrent_unit", value: function(t6, e5, s3) {
              var r3 = t6.curve ? t6.curve(s3) * (t6.start.value + s3 * t6.delta) : t6.start.value + e5 * t6.delta;
              this._o.props[t6.name] = "".concat(r3).concat(t6.end.unit);
            } }, { key: "_calcCurrent_array", value: function(t6, e5, s3) {
              for (var r3 = t6.name, i3 = this._o.props, n3 = "", a2 = t6.curve ? t6.curve(s3) : null, o3 = 0; o3 < t6.delta.length; o3++) {
                var l2 = t6.delta[o3], h2 = t6.curve ? a2 * (t6.start[o3].value + s3 * l2.value) : t6.start[o3].value + e5 * l2.value;
                n3 += "".concat(h2).concat(l2.unit, " ");
              }
              i3[r3] = n3;
            } }]), t5;
          }();
          const F = X;
          function U(t5, e5) {
            var s3 = Object.keys(t5);
            if (Object.getOwnPropertySymbols) {
              var r3 = Object.getOwnPropertySymbols(t5);
              e5 && (r3 = r3.filter(function(e6) {
                return Object.getOwnPropertyDescriptor(t5, e6).enumerable;
              })), s3.push.apply(s3, r3);
            }
            return s3;
          }
          function $(t5) {
            for (var e5 = 1; e5 < arguments.length; e5++) {
              var s3 = null != arguments[e5] ? arguments[e5] : {};
              e5 % 2 ? U(Object(s3), true).forEach(function(e6) {
                d(t5, e6, s3[e6]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(s3)) : U(Object(s3)).forEach(function(e6) {
                Object.defineProperty(t5, e6, Object.getOwnPropertyDescriptor(s3, e6));
              });
            }
            return t5;
          }
          var H = {};
          f.Z.prototype._declareDefaults.call(H);
          for (var z = Object.keys(H._defaults), N = 0; N < z.length; N++)
            H._defaults[z[N]] = 1;
          H._defaults.timeline = 1;
          var q = H._defaults, V = function() {
            function t5() {
              var e5 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              (0, a.Z)(this, t5), this._o = e5, this._shortColors = { transparent: "rgba(0,0,0,0)", none: "rgba(0,0,0,0)", aqua: "rgb(0,255,255)", black: "rgb(0,0,0)", blue: "rgb(0,0,255)", fuchsia: "rgb(255,0,255)", gray: "rgb(128,128,128)", green: "rgb(0,128,0)", lime: "rgb(0,255,0)", maroon: "rgb(128,0,0)", navy: "rgb(0,0,128)", olive: "rgb(128,128,0)", purple: "rgb(128,0,128)", red: "rgb(255,0,0)", silver: "rgb(192,192,192)", teal: "rgb(0,128,128)", white: "rgb(255,255,255)", yellow: "rgb(255,255,0)", orange: "rgb(255,128,0)" }, this._ignoreDeltasMap = { prevChainModule: 1, masterModule: 1 }, this._parseDeltas(e5.options), this._createDeltas(), this._createTimeline(this._mainTweenOptions);
            }
            return (0, o2.Z)(t5, [{ key: "refresh", value: function(t6) {
              for (var e5 = 0; e5 < this._deltas.length; e5++)
                this._deltas[e5].refresh(t6);
              return this;
            } }, { key: "restore", value: function() {
              for (var t6 = 0; t6 < this._deltas.length; t6++)
                this._deltas[t6].restore();
              return this;
            } }, { key: "_createTimeline", value: function() {
              this.timeline = new p.Z(), this.timeline.add(this._deltas);
            } }, { key: "_createDeltas", value: function() {
              this._deltas = [], this._deltas.push(this._createDelta(this._mainDeltas, this._mainTweenOptions));
              for (var t6 = 0; t6 < this._childDeltas.length; t6++) {
                var e5 = this._childDeltas[t6];
                this._deltas.push(this._createDelta([e5.delta], e5.tweenOptions));
              }
            } }, { key: "_createDelta", value: function(t6, e5) {
              var s3 = this._o;
              return new F({ deltas: t6, tweenOptions: e5, props: s3.props, isChained: s3.isChained, callbacksContext: s3.callbacksContext });
            } }, { key: "_parseDeltas", value: function(t6) {
              var e5 = this._splitTweenOptions(t6), s3 = e5.delta;
              this._mainTweenOptions = e5.tweenOptions, this._mainDeltas = [], this._childDeltas = [];
              for (var r3 = Object.keys(s3), i3 = 0; i3 < r3.length; i3++) {
                var n3 = r3[i3];
                if (this._isDelta(s3[n3]) && !this._ignoreDeltasMap[n3]) {
                  var a2 = this._splitAndParseDelta(n3, s3[n3]);
                  a2.tweenOptions ? this._childDeltas.push(a2) : this._mainDeltas.push(a2.delta);
                }
              }
            } }, { key: "_splitAndParseDelta", value: function(t6, e5) {
              var s3 = this._splitTweenOptions(e5);
              return s3.delta = this._parseDelta(t6, s3.delta), s3;
            } }, { key: "_parseDelta", value: function(t6, e5, s3) {
              return this._o.customProps && null != this._o.customProps[t6] ? this._parseDeltaByCustom(t6, e5, s3) : this._parseDeltaByGuess(t6, e5, s3);
            } }, { key: "_parseDeltaByCustom", value: function(t6, e5, s3) {
              return this._parseNumberDelta(t6, e5, s3);
            } }, { key: "_parseDeltaByGuess", value: function(t6, e5, s3) {
              var r3 = this._preparseDelta(e5).start, i3 = this._o;
              return !isNaN(parseFloat(r3)) || r3.match(/rand\(/) || r3.match(/stagger\(/) ? i3.arrayPropertyMap && i3.arrayPropertyMap[t6] ? this._parseArrayDelta(t6, e5) : i3.numberPropertyMap && i3.numberPropertyMap[t6] ? this._parseNumberDelta(t6, e5, s3) : this._parseUnitDelta(t6, e5, s3) : this._parseColorDelta(t6, e5);
            } }, { key: "_splitTweenOptions", value: function(t6) {
              t6 = $({}, t6);
              for (var e5 = Object.keys(t6), s3 = {}, r3 = null, i3 = 0; i3 < e5.length; i3++) {
                var n3 = e5[i3];
                q[n3] && (null != t6[n3] && (s3[n3] = t6[n3], r3 = true), delete t6[n3]);
              }
              return { delta: t6, tweenOptions: r3 ? s3 : void 0 };
            } }, { key: "_isDelta", value: function(t6) {
              var s3 = e4().isObject(t6);
              return !(!(s3 = s3 && !t6.unit) || e4().isArray(t6) || e4().isDOM(t6));
            } }, { key: "_parseColorDelta", value: function(t6, s3) {
              if ("strokeLinecap" === t6)
                return e4().warn("Sorry, stroke-linecap property is not animatable yet, using the start(#{start}) value instead", s3), {};
              var r3 = this._preparseDelta(s3), i3 = this._makeColorObj(r3.start), n3 = this._makeColorObj(r3.end);
              return { type: "color", name: t6, start: i3, end: n3, curve: r3.curve, delta: { r: n3.r - i3.r, g: n3.g - i3.g, b: n3.b - i3.b, a: n3.a - i3.a } };
            } }, { key: "_parseArrayDelta", value: function(t6, s3) {
              var r3 = this._preparseDelta(s3), i3 = this._strToArr(r3.start), n3 = this._strToArr(r3.end);
              e4().normDashArrays(i3, n3);
              for (var a2 = 0; a2 < i3.length; a2++) {
                var o3 = n3[a2];
                e4().mergeUnits(i3[a2], o3, t6);
              }
              return { type: "array", name: t6, start: i3, end: n3, delta: e4().calcArrDelta(i3, n3), curve: r3.curve };
            } }, { key: "_parseUnitDelta", value: function(t6, s3, r3) {
              var i3 = this._preparseDelta(s3), n3 = e4().parseUnit(e4().parseStringOption(i3.end, r3)), a2 = e4().parseUnit(e4().parseStringOption(i3.start, r3));
              return e4().mergeUnits(a2, n3, t6), { type: "unit", name: t6, start: a2, end: n3, delta: n3.value - a2.value, curve: i3.curve };
            } }, { key: "_parseNumberDelta", value: function(t6, s3, r3) {
              var i3 = this._preparseDelta(s3), n3 = parseFloat(e4().parseStringOption(i3.end, r3)), a2 = parseFloat(e4().parseStringOption(i3.start, r3));
              return { type: "number", name: t6, start: a2, end: n3, delta: n3 - a2, curve: i3.curve };
            } }, { key: "_preparseDelta", value: function(t6) {
              var e5 = (t6 = $({}, t6)).curve;
              null != e5 && ((e5 = M().parseEasing(e5))._parent = this), delete t6.curve;
              var s3 = Object.keys(t6)[0];
              return { start: s3, end: t6[s3], curve: e5 };
            } }, { key: "_makeColorObj", value: function(t6) {
              var s3 = {};
              if ("#" === t6[0]) {
                var r3 = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(t6);
                if (r3) {
                  var i3 = 2 === r3[1].length ? r3[1] : r3[1] + r3[1], n3 = 2 === r3[2].length ? r3[2] : r3[2] + r3[2], a2 = 2 === r3[3].length ? r3[3] : r3[3] + r3[3];
                  s3 = { r: parseInt(i3, 16), g: parseInt(n3, 16), b: parseInt(a2, 16), a: 1 };
                }
              }
              if ("#" !== t6[0]) {
                var o3, l2 = "r" === t6[0] && "g" === t6[1] && "b" === t6[2];
                l2 && (o3 = t6), l2 || (this._shortColors[t6] ? o3 = this._shortColors[t6] : (e4().div.style.color = t6, o3 = e4().computedStyle(e4().div).color));
                var h2 = new RegExp("^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$", "gi").exec(o3), u2 = parseFloat(h2[4] || 1);
                h2 && (s3 = { r: parseInt(h2[1], 10), g: parseInt(h2[2], 10), b: parseInt(h2[3], 10), a: null == u2 || isNaN(u2) ? 1 : u2 });
              }
              return s3;
            } }, { key: "_strToArr", value: function(t6) {
              var s3 = [];
              return "number" != typeof t6 || isNaN(t6) ? (t6.trim().split(/\s+/gim).forEach(function(t7) {
                s3.push(e4().parseUnit(e4().parseIfRand(t7)));
              }), s3) : (s3.push(e4().parseUnit(t6)), s3);
            } }]), t5;
          }();
          const W = V;
          function G(t5, e5) {
            var s3 = Object.keys(t5);
            if (Object.getOwnPropertySymbols) {
              var r3 = Object.getOwnPropertySymbols(t5);
              e5 && (r3 = r3.filter(function(e6) {
                return Object.getOwnPropertyDescriptor(t5, e6).enumerable;
              })), s3.push.apply(s3, r3);
            }
            return s3;
          }
          function Q(t5) {
            for (var e5 = 1; e5 < arguments.length; e5++) {
              var s3 = null != arguments[e5] ? arguments[e5] : {};
              e5 % 2 ? G(Object(s3), true).forEach(function(e6) {
                d(t5, e6, s3[e6]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t5, Object.getOwnPropertyDescriptors(s3)) : G(Object(s3)).forEach(function(e6) {
                Object.defineProperty(t5, e6, Object.getOwnPropertyDescriptor(s3, e6));
              });
            }
            return t5;
          }
          function K(t5) {
            var e5 = function() {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return false;
              if (Reflect.construct.sham)
                return false;
              if ("function" == typeof Proxy)
                return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                })), true;
              } catch (t6) {
                return false;
              }
            }();
            return function() {
              var s3, r3 = (0, u.Z)(t5);
              if (e5) {
                var i3 = (0, u.Z)(this).constructor;
                s3 = Reflect.construct(r3, arguments, i3);
              } else
                s3 = r3.apply(this, arguments);
              return (0, h.Z)(this, s3);
            };
          }
          var J = {};
          f.Z.prototype._declareDefaults.call(J);
          for (var tt = Object.keys(J._defaults), et = 0; et < tt.length; et++)
            J._defaults[tt[et]] = 1;
          J._defaults.timeline = 1;
          var st = J._defaults, rt = function(t5) {
            (0, l.Z)(r3, t5);
            var s3 = K(r3);
            function r3() {
              return (0, a.Z)(this, r3), s3.apply(this, arguments);
            }
            return (0, o2.Z)(r3, [{ key: "_declareDefaults", value: function() {
              this._defaults = { x: 0, y: 0, z: 0, skewX: 0, skewY: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, scaleX: 1, scaleY: 1, isSoftHide: true, isShowStart: true, isShowEnd: true, isForce3d: false, isRefreshState: true }, this._drawExclude = { el: 1 }, this._3dProperties = ["rotateX", "rotateY", "z"], this._arrayPropertyMap = { transformOrigin: 1, backgroundPosition: 1 }, this._numberPropertyMap = { opacity: 1, scale: 1, scaleX: 1, scaleY: 1, rotateX: 1, rotateY: 1, rotateZ: 1, skewX: 1, skewY: 1 }, this._prefixPropertyMap = { transform: 1, transformOrigin: 1 }, this._prefix = e4().prefix.css;
            } }, { key: "then", value: function(t6) {
              if (null == t6 || !Object.keys(t6).length)
                return 1;
              var s4 = e4().getLastItem(this._modules);
              return s4.deltas.refresh(false), this._history[this._history.length - 1] = s4._o, (0, _.Z)((0, u.Z)(r3.prototype), "then", this).call(this, t6), s4.deltas.restore(), this;
            } }, { key: "_checkStartValue", value: function(t6, s4) {
              return null == s4 ? null != this._defaults[t6] ? this._defaults[t6] : null != this._customProps[t6] ? this._customProps[t6] : null != e4().defaultStyles[t6] ? e4().defaultStyles[t6] : 0 : s4;
            } }, { key: "_draw", value: function() {
              for (var t6 = this._props, e5 = 0; e5 < this._drawProps.length; e5++) {
                var s4 = this._drawProps[e5];
                this._setStyle(s4, t6[s4]);
              }
              this._drawTransform(), this._customDraw && this._customDraw(this._props.el, this._props);
            } }, { key: "_drawTransform", value: function() {
              var t6 = this._props, e5 = this._is3d ? "translate3d(".concat(t6.x, ", ").concat(t6.y, ", ").concat(t6.z, ") rotateX(").concat(t6.rotateX, "deg) rotateY(").concat(t6.rotateY, "deg) rotateZ(").concat(t6.rotateZ, "deg) skew(").concat(t6.skewX, "deg, ").concat(t6.skewY, "deg) scale(").concat(t6.scaleX, ", ").concat(t6.scaleY, ")") : "translate(".concat(t6.x, ", ").concat(t6.y, ") rotate(").concat(t6.rotateZ, "deg) skew(").concat(t6.skewX, "deg, ").concat(t6.skewY, "deg) scale(").concat(t6.scaleX, ", ").concat(t6.scaleY, ")");
              this._setStyle("transform", e5);
            } }, { key: "_render", value: function() {
              if (!this._o.prevChainModule) {
                for (var t6 = this._props, e5 = 0; e5 < this._renderProps.length; e5++) {
                  var s4 = this._renderProps[e5], r4 = t6[s4];
                  r4 = "number" == typeof r4 ? "".concat(r4, "px") : r4, this._setStyle(s4, r4);
                }
                this._draw(), t6.isShowStart || this._hide();
              }
            } }, { key: "_setStyle", value: function(t6, e5) {
              if (this._state[t6] !== e5) {
                var s4 = this._props.el.style;
                s4[t6] = e5, this._prefixPropertyMap[t6] && (s4["".concat(this._prefix).concat(t6)] = e5), this._state[t6] = e5;
              }
            } }, { key: "_extendDefaults", value: function() {
              this._props = this._o.props || {}, this._renderProps = [], this._drawProps = [], this._saveCustomProperties(this._o);
              var t6 = Q({}, this._o);
              t6 = this._addDefaults(t6);
              for (var s4 = Object.keys(t6), r4 = 0; r4 < s4.length; r4++) {
                var i3 = s4[r4], n3 = !this._drawExclude[i3] && null == this._defaults[i3] && !st[i3], a2 = this._customProps[i3];
                e4().isDelta(t6[i3]) || st[i3] ? n3 && !a2 && this._drawProps.push(i3) : (this._parseOption(i3, t6[i3]), "el" === i3 && (this._props.el = e4().parseEl(t6.el), this.el = this._props.el), n3 && !a2 && this._renderProps.push(i3));
              }
              this._createDeltas(t6);
            } }, { key: "_saveCustomProperties", value: function() {
              var t6 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              this._customProps = t6.customProperties || {}, this._customProps = Q({}, this._customProps), this._customDraw = this._customProps.draw, delete this._customProps.draw, delete t6.customProperties, this._copyDefaultCustomProps();
            } }, { key: "_copyDefaultCustomProps", value: function() {
              for (var t6 in this._customProps)
                null == this._o[t6] && (this._o[t6] = this._customProps[t6]);
            } }, { key: "_resetMergedFlags", value: function(t6) {
              return (0, _.Z)((0, u.Z)(r3.prototype), "_resetMergedFlags", this).call(this, t6), t6.props = this._props, t6.customProperties = this._customProps, t6;
            } }, { key: "_parseOption", value: function(t6, s4) {
              (0, _.Z)((0, u.Z)(r3.prototype), "_parseOption", this).call(this, t6, s4);
              var i3 = this._props[t6];
              e4().isArray(i3) && (this._props[t6] = this._arrToString(i3));
            } }, { key: "_arrToString", value: function(t6) {
              for (var e5 = "", s4 = 0; s4 < t6.length; s4++)
                e5 += "".concat(t6[s4].string, " ");
              return e5;
            } }, { key: "_addDefaults", value: function(t6) {
              for (var e5 in this._is3d = false, this._defaults)
                null == t6[e5] ? t6[e5] = "scaleX" === e5 || "scaleY" === e5 ? null != t6.scale ? t6.scale : this._defaults.scale : this._defaults[e5] : -1 !== this._3dProperties.indexOf(e5) && (this._is3d = true);
              return this._o.isForce3d && (this._is3d = true), t6;
            } }, { key: "_vars", value: function() {
              this.deltas.refresh(false), (0, _.Z)((0, u.Z)(r3.prototype), "_vars", this).call(this), this._state = {}, this.deltas.restore(false);
            } }, { key: "_createDeltas", value: function(t6) {
              this.deltas = new W({ options: t6, props: this._props, arrayPropertyMap: this._arrayPropertyMap, numberPropertyMap: this._numberPropertyMap, customProps: this._customProps, callbacksContext: t6.callbacksContext || this, isChained: !!this._o.prevChainModule }), this._o.prevChainModule && (this.timeline = this.deltas.timeline);
            } }, { key: "_makeTween", value: function() {
            } }, { key: "_makeTimeline", value: function() {
              this._o.prevChainModule || (this._o.timeline = this._o.timeline || {}, this._addCallbackOverrides(this._o.timeline), (0, _.Z)((0, u.Z)(r3.prototype), "_makeTimeline", this).call(this), this.timeline.add(this.deltas));
            } }, { key: "_addCallbackOverrides", value: function(t6) {
              var e5 = this, s4 = this._props;
              t6.callbackOverrides = { onUpdate: this._draw, onRefresh: this._props.isRefreshState ? this._draw : void 0, onStart: function(t7) {
                e5._isChained || (t7 && !s4.isShowStart ? e5._show() : s4.isShowStart || e5._hide());
              }, onComplete: function(t7) {
                e5._isChained || (t7 ? s4.isShowEnd || e5._hide() : s4.isShowEnd || e5._show());
              } };
            } }, { key: "_showByTransform", value: function() {
              this._drawTransform();
            } }, { key: "_mergeThenProperty", value: function(t6, s4, r4) {
              var i3 = "boolean" == typeof r4;
              if (e4().isTweenProp(t6) || this._nonMergeProps[t6] || i3)
                return r4;
              var n3 = {};
              if (e4().isObject(r4) && null != r4.to) {
                for (var a2 in r4)
                  (st[a2] || "curve" === a2) && (n3[a2] = r4[a2], delete r4[a2]);
                r4 = r4.to;
              }
              if (this._isDelta(r4)) {
                var o3 = {};
                for (var l2 in r4)
                  (st[l2] || "curve" === l2) && (o3[l2] = r4[l2], delete r4[l2]);
                return Q(Q({}, this._parseDeltaValues(t6, r4)), o3);
              }
              var h2 = this._parsePreArrayProperty(t6, r4);
              return this._isDelta(s4) ? Q(d({}, e4().getDeltaEnd(s4), h2), n3) : Q(d({}, s4, h2), n3);
            } }]), r3;
          }(w);
          const it = rt, nt = function() {
            function t5() {
              var s3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return (0, a.Z)(this, t5), this.o = s3, this.o.el ? (this._vars(), this._declareDefaults(), this._extendDefaults(), this._parseFrames(), this._frames.length <= 2 && e4().warn("Spriter: only ".concat(this._frames.length, " frames found")), this._frames.length < 1 && e4().error("Spriter: there is no frames to animate, aborting"), this._createTween(), this) : e4().error('No "el" option specified, aborting');
            }
            return (0, o2.Z)(t5, [{ key: "_declareDefaults", value: function() {
              this._defaults = { duration: 500, delay: 0, easing: "linear.none", repeat: 0, yoyo: false, isRunLess: false, isShowEnd: false, onStart: null, onUpdate: null, onComplete: null };
            } }, { key: "_vars", value: function() {
              this._props = e4().cloneObj(this.o), this.el = this.o.el, this._frames = [];
            } }, { key: "run", value: function() {
              return this.timeline.play();
            } }, { key: "_extendDefaults", value: function() {
              return e4().extend(this._props, this._defaults);
            } }, { key: "_parseFrames", value: function() {
              this._frames = Array.prototype.slice.call(this.el.children, 0), this._frames.forEach(function(t6) {
                return t6.style.opacity = 0;
              }), this._frameStep = 1 / this._frames.length;
            } }, { key: "_createTween", value: function() {
              var t6 = this;
              this._tween = new f.Z({ duration: this._props.duration, delay: this._props.delay, yoyo: this._props.yoyo, repeat: this._props.repeat, easing: this._props.easing, onStart: function() {
                return t6._props.onStart && t6._props.onStart();
              }, onComplete: function() {
                return t6._props.onComplete && t6._props.onComplete();
              }, onUpdate: function(e5) {
                return t6._setProgress(e5);
              } }), this.timeline = new p.Z(), this.timeline.add(this._tween), this._props.isRunLess || this._startTween();
            } }, { key: "_startTween", value: function() {
              var t6 = this;
              setTimeout(function() {
                return t6.timeline.play();
              }, 1);
            } }, { key: "_setProgress", value: function(t6) {
              var e5 = Math.floor(t6 / this._frameStep);
              if (this._prevFrame != this._frames[e5]) {
                this._prevFrame && (this._prevFrame.style.opacity = 0);
                var s3 = 1 === t6 && this._props.isShowEnd ? e5 - 1 : e5;
                this._frames[s3] && (this._frames[s3].style.opacity = 1), this._prevFrame = this._frames[e5];
              }
              this._props.onUpdate && this._props.onUpdate(t6);
            } }]), t5;
          }();
          var at = s2(291), ot = s2.n(at), lt = { revision: "1.6.0", isDebug: false, helpers: e4(), Shape: R, ShapeSwirl: L, Burst: B, Html: it, stagger: function(t5) {
            return function(e5) {
              return new x(e5, t5);
            };
          }, Spriter: nt, MotionPath: ot(), Tween: f.Z, Timeline: p.Z, Tweenable: m, Thenable: w, Tunable: P, Module: v.Z, tweener: C.Z, easing: M(), shapesMap: n2(), _pool: { Delta: F, Deltas: W }, h: e4(), delta: e4().delta, addShape: n2().addShape, CustomShape: n2().custom, Transit: R, Swirl: L };
          "undefined" != typeof window && (window.mojs = lt);
          const ht = lt;
        })(), r2 = r2.default;
      })(), "object" == typeof exports && "object" == typeof module ? module.exports = e2() : "function" == typeof define && define.amd ? define("mojs", [], e2) : "object" == typeof exports ? exports.mojs = e2() : t2.mojs = e2();
    }
  });

  // node_modules/@studio-freight/lenis/dist/lenis.modern.mjs
  function t() {
    return t = Object.assign ? Object.assign.bind() : function(t2) {
      for (var e2 = 1; e2 < arguments.length; e2++) {
        var i2 = arguments[e2];
        for (var s2 in i2)
          Object.prototype.hasOwnProperty.call(i2, s2) && (t2[s2] = i2[s2]);
      }
      return t2;
    }, t.apply(this, arguments);
  }
  function e(t2, e2, i2) {
    return Math.max(t2, Math.min(e2, i2));
  }
  var i = class {
    advance(t2) {
      var i2;
      if (!this.isRunning)
        return;
      let s2 = false;
      if (this.lerp)
        this.value = (o2 = this.value, n2 = this.to, (1 - (r2 = 1 - Math.exp(-60 * this.lerp * t2))) * o2 + r2 * n2), Math.round(this.value) === this.to && (this.value = this.to, s2 = true);
      else {
        this.currentTime += t2;
        const i3 = e(0, this.currentTime / this.duration, 1);
        s2 = i3 >= 1;
        const o3 = s2 ? 1 : this.easing(i3);
        this.value = this.from + (this.to - this.from) * o3;
      }
      var o2, n2, r2;
      null == (i2 = this.onUpdate) || i2.call(this, this.value, { completed: s2 }), s2 && this.stop();
    }
    stop() {
      this.isRunning = false;
    }
    fromTo(t2, e2, { lerp: i2 = 0.1, duration: s2 = 1, easing: o2 = (t3) => t3, onUpdate: n2 }) {
      this.from = this.value = t2, this.to = e2, this.lerp = i2, this.duration = s2, this.easing = o2, this.currentTime = 0, this.isRunning = true, this.onUpdate = n2;
    }
  };
  var s = class {
    constructor({ wrapper: t2, content: e2, autoResize: i2 = true } = {}) {
      if (this.resize = () => {
        this.onWrapperResize(), this.onContentResize();
      }, this.onWrapperResize = () => {
        this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
      }, this.onContentResize = () => {
        this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth;
      }, this.wrapper = t2, this.content = e2, i2) {
        const t3 = function(t4, e3) {
          let i3;
          return function() {
            let e4 = arguments, s2 = this;
            clearTimeout(i3), i3 = setTimeout(function() {
              t4.apply(s2, e4);
            }, 250);
          };
        }(this.resize);
        this.wrapper !== window && (this.wrapperResizeObserver = new ResizeObserver(t3), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(t3), this.contentResizeObserver.observe(this.content);
      }
      this.resize();
    }
    destroy() {
      var t2, e2;
      null == (t2 = this.wrapperResizeObserver) || t2.disconnect(), null == (e2 = this.contentResizeObserver) || e2.disconnect();
    }
    get limit() {
      return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
    }
  };
  var o = () => ({ events: {}, emit(t2, ...e2) {
    let i2 = this.events[t2] || [];
    for (let t3 = 0, s2 = i2.length; t3 < s2; t3++)
      i2[t3](...e2);
  }, on(t2, e2) {
    var i2;
    return (null == (i2 = this.events[t2]) ? void 0 : i2.push(e2)) || (this.events[t2] = [e2]), () => {
      var i3;
      this.events[t2] = null == (i3 = this.events[t2]) ? void 0 : i3.filter((t3) => e2 !== t3);
    };
  } });
  var n = class {
    constructor(t2, { wheelMultiplier: i2 = 1, touchMultiplier: s2 = 2, normalizeWheel: n2 = false }) {
      this.onTouchStart = (t3) => {
        const { clientX: e2, clientY: i3 } = t3.targetTouches ? t3.targetTouches[0] : t3;
        this.touchStart.x = e2, this.touchStart.y = i3, this.lastDelta = { x: 0, y: 0 };
      }, this.onTouchMove = (t3) => {
        const { clientX: e2, clientY: i3 } = t3.targetTouches ? t3.targetTouches[0] : t3, s3 = -(e2 - this.touchStart.x) * this.touchMultiplier, o2 = -(i3 - this.touchStart.y) * this.touchMultiplier;
        this.touchStart.x = e2, this.touchStart.y = i3, this.lastDelta = { x: s3, y: o2 }, this.emitter.emit("scroll", { type: "touch", deltaX: s3, deltaY: o2, event: t3 });
      }, this.onTouchEnd = (t3) => {
        this.emitter.emit("scroll", { type: "touch", inertia: true, deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t3 });
      }, this.onWheel = (t3) => {
        let { deltaX: i3, deltaY: s3 } = t3;
        this.normalizeWheel && (i3 = e(-100, i3, 100), s3 = e(-100, s3, 100)), i3 *= this.wheelMultiplier, s3 *= this.wheelMultiplier, this.emitter.emit("scroll", { type: "wheel", deltaX: i3, deltaY: s3, event: t3 });
      }, this.element = t2, this.wheelMultiplier = i2, this.touchMultiplier = s2, this.normalizeWheel = n2, this.touchStart = { x: null, y: null }, this.emitter = o(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
    }
    on(t2, e2) {
      return this.emitter.on(t2, e2);
    }
    destroy() {
      this.emitter.events = {}, this.element.removeEventListener("wheel", this.onWheel, { passive: false }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.removeEventListener("touchend", this.onTouchEnd, { passive: false });
    }
  };
  var r = class {
    constructor({ direction: e2, gestureDirection: r2, mouseMultiplier: l, smooth: h, wrapper: a = window, content: c = document.documentElement, wheelEventsTarget: u = a, smoothWheel: p = null == h || h, smoothTouch: m = false, syncTouch: d = false, syncTouchLerp: v = 0.1, touchInertiaMultiplier: g = 35, duration: S, easing: w = (t2) => Math.min(1, 1.001 - Math.pow(2, -10 * t2)), lerp: f = S ? null : 0.1, infinite: y = false, orientation: T = null != e2 ? e2 : "vertical", gestureOrientation: z = null != r2 ? r2 : "vertical", touchMultiplier: M = 1, wheelMultiplier: L = null != l ? l : 1, normalizeWheel: E = false, autoResize: b = true } = {}) {
      this.onVirtualScroll = ({ type: e3, inertia: i2, deltaX: s2, deltaY: o2, event: n2 }) => {
        if (n2.ctrlKey)
          return;
        const r3 = "touch" === e3, l2 = "wheel" === e3;
        if ("vertical" === this.options.gestureOrientation && 0 === o2 || "horizontal" === this.options.gestureOrientation && 0 === s2 || r3 && "vertical" === this.options.gestureOrientation && 0 === this.scroll && !this.options.infinite && o2 <= 0)
          return;
        if (n2.composedPath().find((t2) => (null == t2 || null == t2.hasAttribute ? void 0 : t2.hasAttribute("data-lenis-prevent")) || r3 && (null == t2 || null == t2.hasAttribute ? void 0 : t2.hasAttribute("data-lenis-prevent-touch")) || l2 && (null == t2 || null == t2.hasAttribute ? void 0 : t2.hasAttribute("data-lenis-prevent-wheel"))))
          return;
        if (this.isStopped || this.isLocked)
          return void n2.preventDefault();
        if (this.isSmooth = (this.options.smoothTouch || this.options.syncTouch) && r3 || this.options.smoothWheel && l2, !this.isSmooth)
          return this.isScrolling = false, void this.animate.stop();
        n2.preventDefault();
        let h2 = o2;
        "both" === this.options.gestureOrientation ? h2 = Math.abs(o2) > Math.abs(s2) ? o2 : s2 : "horizontal" === this.options.gestureOrientation && (h2 = s2);
        const a2 = r3 && this.options.syncTouch, c2 = r3 && i2 && Math.abs(h2) > 1;
        c2 && (h2 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + h2, t({ programmatic: false }, a2 && { lerp: c2 ? this.syncTouchLerp : 0.4 }));
      }, this.onScroll = () => {
        if (!this.isScrolling) {
          const t2 = this.animatedScroll;
          this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - t2), this.emit();
        }
      }, e2 && console.warn("Lenis: `direction` option is deprecated, use `orientation` instead"), r2 && console.warn("Lenis: `gestureDirection` option is deprecated, use `gestureOrientation` instead"), l && console.warn("Lenis: `mouseMultiplier` option is deprecated, use `wheelMultiplier` instead"), h && console.warn("Lenis: `smooth` option is deprecated, use `smoothWheel` instead"), window.lenisVersion = "1.0.15", a !== document.documentElement && a !== document.body || (a = window), this.options = { wrapper: a, content: c, wheelEventsTarget: u, smoothWheel: p, smoothTouch: m, syncTouch: d, syncTouchLerp: v, touchInertiaMultiplier: g, duration: S, easing: w, lerp: f, infinite: y, gestureOrientation: z, orientation: T, touchMultiplier: M, wheelMultiplier: L, normalizeWheel: E, autoResize: b }, this.dimensions = new s({ wrapper: a, content: c, autoResize: b }), this.rootElement.classList.add("lenis"), this.velocity = 0, this.isStopped = false, this.isSmooth = p || m, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.animate = new i(), this.emitter = o(), this.options.wrapper.addEventListener("scroll", this.onScroll, { passive: false }), this.virtualScroll = new n(u, { touchMultiplier: M, wheelMultiplier: L, normalizeWheel: E }), this.virtualScroll.on("scroll", this.onVirtualScroll);
    }
    destroy() {
      this.emitter.events = {}, this.options.wrapper.removeEventListener("scroll", this.onScroll, { passive: false }), this.virtualScroll.destroy(), this.dimensions.destroy(), this.rootElement.classList.remove("lenis"), this.rootElement.classList.remove("lenis-smooth"), this.rootElement.classList.remove("lenis-scrolling"), this.rootElement.classList.remove("lenis-stopped");
    }
    on(t2, e2) {
      return this.emitter.on(t2, e2);
    }
    off(t2, e2) {
      var i2;
      this.emitter.events[t2] = null == (i2 = this.emitter.events[t2]) ? void 0 : i2.filter((t3) => e2 !== t3);
    }
    setScroll(t2) {
      this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
    }
    resize() {
      this.dimensions.resize();
    }
    emit() {
      this.emitter.emit("scroll", this);
    }
    reset() {
      this.isLocked = false, this.isScrolling = false, this.velocity = 0, this.animate.stop();
    }
    start() {
      this.isStopped = false, this.reset();
    }
    stop() {
      this.isStopped = true, this.animate.stop(), this.reset();
    }
    raf(t2) {
      const e2 = t2 - (this.time || t2);
      this.time = t2, this.animate.advance(1e-3 * e2);
    }
    scrollTo(t2, { offset: i2 = 0, immediate: s2 = false, lock: o2 = false, duration: n2 = this.options.duration, easing: r2 = this.options.easing, lerp: l = !n2 && this.options.lerp, onComplete: h = null, force: a = false, programmatic: c = true } = {}) {
      if (!this.isStopped || a) {
        if (["top", "left", "start"].includes(t2))
          t2 = 0;
        else if (["bottom", "right", "end"].includes(t2))
          t2 = this.limit;
        else {
          var u;
          let e2;
          if ("string" == typeof t2 ? e2 = document.querySelector(t2) : null != (u = t2) && u.nodeType && (e2 = t2), e2) {
            if (this.options.wrapper !== window) {
              const t3 = this.options.wrapper.getBoundingClientRect();
              i2 -= this.isHorizontal ? t3.left : t3.top;
            }
            const s3 = e2.getBoundingClientRect();
            t2 = (this.isHorizontal ? s3.left : s3.top) + this.animatedScroll;
          }
        }
        if ("number" == typeof t2) {
          if (t2 += i2, t2 = Math.round(t2), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : t2 = e(0, t2, this.limit), s2)
            return this.animatedScroll = this.targetScroll = t2, this.setScroll(this.scroll), this.reset(), this.emit(), void (null == h || h());
          if (!c) {
            if (t2 === this.targetScroll)
              return;
            this.targetScroll = t2;
          }
          this.animate.fromTo(this.animatedScroll, t2, { duration: n2, easing: r2, lerp: l, onUpdate: (t3, { completed: e2 }) => {
            o2 && (this.isLocked = true), this.isScrolling = true, this.velocity = t3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t3, this.setScroll(this.scroll), c && (this.targetScroll = t3), e2 && (o2 && (this.isLocked = false), requestAnimationFrame(() => {
              this.isScrolling = false;
            }), this.velocity = 0, null == h || h()), this.emit();
          } });
        }
      }
    }
    get rootElement() {
      return this.options.wrapper === window ? this.options.content : this.options.wrapper;
    }
    get limit() {
      return this.isHorizontal ? this.dimensions.limit.x : this.dimensions.limit.y;
    }
    get isHorizontal() {
      return "horizontal" === this.options.orientation;
    }
    get actualScroll() {
      return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
    }
    get scroll() {
      return this.options.infinite ? (this.animatedScroll % (t2 = this.limit) + t2) % t2 : this.animatedScroll;
      var t2;
    }
    get progress() {
      return 0 === this.limit ? 1 : this.scroll / this.limit;
    }
    get isSmooth() {
      return this.__isSmooth;
    }
    set isSmooth(t2) {
      this.__isSmooth !== t2 && (this.rootElement.classList.toggle("lenis-smooth", t2), this.__isSmooth = t2);
    }
    get isScrolling() {
      return this.__isScrolling;
    }
    set isScrolling(t2) {
      this.__isScrolling !== t2 && (this.rootElement.classList.toggle("lenis-scrolling", t2), this.__isScrolling = t2);
    }
    get isStopped() {
      return this.__isStopped;
    }
    set isStopped(t2) {
      this.__isStopped !== t2 && (this.rootElement.classList.toggle("lenis-stopped", t2), this.__isStopped = t2);
    }
  };

  // js/index.js
  var import_vanilla_tilt = __toESM(require_vanilla_tilt());

  // js/utils.js
  var qs = (selector, searchElement = document) => {
    return searchElement.querySelector(selector);
  };
  var qsa = (selector, searchElement = document) => {
    return searchElement.querySelectorAll(selector);
  };

  // node_modules/html-to-image/es/util.js
  function resolveUrl(url, baseUrl) {
    if (url.match(/^[a-z]+:\/\//i)) {
      return url;
    }
    if (url.match(/^\/\//)) {
      return window.location.protocol + url;
    }
    if (url.match(/^[a-z]+:/i)) {
      return url;
    }
    const doc = document.implementation.createHTMLDocument();
    const base = doc.createElement("base");
    const a = doc.createElement("a");
    doc.head.appendChild(base);
    doc.body.appendChild(a);
    if (baseUrl) {
      base.href = baseUrl;
    }
    a.href = url;
    return a.href;
  }
  var uuid = (() => {
    let counter = 0;
    const random = () => (
      // eslint-disable-next-line no-bitwise
      `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
    );
    return () => {
      counter += 1;
      return `u${random()}${counter}`;
    };
  })();
  function toArray(arrayLike) {
    const arr = [];
    for (let i2 = 0, l = arrayLike.length; i2 < l; i2++) {
      arr.push(arrayLike[i2]);
    }
    return arr;
  }
  function px(node, styleProperty) {
    const win = node.ownerDocument.defaultView || window;
    const val = win.getComputedStyle(node).getPropertyValue(styleProperty);
    return val ? parseFloat(val.replace("px", "")) : 0;
  }
  function getNodeWidth(node) {
    const leftBorder = px(node, "border-left-width");
    const rightBorder = px(node, "border-right-width");
    return node.clientWidth + leftBorder + rightBorder;
  }
  function getNodeHeight(node) {
    const topBorder = px(node, "border-top-width");
    const bottomBorder = px(node, "border-bottom-width");
    return node.clientHeight + topBorder + bottomBorder;
  }
  function getImageSize(targetNode, options = {}) {
    const width = options.width || getNodeWidth(targetNode);
    const height = options.height || getNodeHeight(targetNode);
    return { width, height };
  }
  function getPixelRatio() {
    let ratio;
    let FINAL_PROCESS;
    try {
      FINAL_PROCESS = process;
    } catch (e2) {
    }
    const val = FINAL_PROCESS && FINAL_PROCESS.env ? FINAL_PROCESS.env.devicePixelRatio : null;
    if (val) {
      ratio = parseInt(val, 10);
      if (Number.isNaN(ratio)) {
        ratio = 1;
      }
    }
    return ratio || window.devicePixelRatio || 1;
  }
  var canvasDimensionLimit = 16384;
  function checkCanvasDimensions(canvas) {
    if (canvas.width > canvasDimensionLimit || canvas.height > canvasDimensionLimit) {
      if (canvas.width > canvasDimensionLimit && canvas.height > canvasDimensionLimit) {
        if (canvas.width > canvas.height) {
          canvas.height *= canvasDimensionLimit / canvas.width;
          canvas.width = canvasDimensionLimit;
        } else {
          canvas.width *= canvasDimensionLimit / canvas.height;
          canvas.height = canvasDimensionLimit;
        }
      } else if (canvas.width > canvasDimensionLimit) {
        canvas.height *= canvasDimensionLimit / canvas.width;
        canvas.width = canvasDimensionLimit;
      } else {
        canvas.width *= canvasDimensionLimit / canvas.height;
        canvas.height = canvasDimensionLimit;
      }
    }
  }
  function canvasToBlob(canvas, options = {}) {
    if (canvas.toBlob) {
      return new Promise((resolve) => {
        canvas.toBlob(resolve, options.type ? options.type : "image/png", options.quality ? options.quality : 1);
      });
    }
    return new Promise((resolve) => {
      const binaryString = window.atob(canvas.toDataURL(options.type ? options.type : void 0, options.quality ? options.quality : void 0).split(",")[1]);
      const len = binaryString.length;
      const binaryArray = new Uint8Array(len);
      for (let i2 = 0; i2 < len; i2 += 1) {
        binaryArray[i2] = binaryString.charCodeAt(i2);
      }
      resolve(new Blob([binaryArray], {
        type: options.type ? options.type : "image/png"
      }));
    });
  }
  function createImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.decode = () => resolve(img);
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.src = url;
    });
  }
  async function svgToDataURL(svg) {
    return Promise.resolve().then(() => new XMLSerializer().serializeToString(svg)).then(encodeURIComponent).then((html) => `data:image/svg+xml;charset=utf-8,${html}`);
  }
  async function nodeToDataURL(node, width, height) {
    const xmlns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xmlns, "svg");
    const foreignObject = document.createElementNS(xmlns, "foreignObject");
    svg.setAttribute("width", `${width}`);
    svg.setAttribute("height", `${height}`);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    foreignObject.setAttribute("width", "100%");
    foreignObject.setAttribute("height", "100%");
    foreignObject.setAttribute("x", "0");
    foreignObject.setAttribute("y", "0");
    foreignObject.setAttribute("externalResourcesRequired", "true");
    svg.appendChild(foreignObject);
    foreignObject.appendChild(node);
    return svgToDataURL(svg);
  }
  var isInstanceOfElement = (node, instance) => {
    if (node instanceof instance)
      return true;
    const nodePrototype = Object.getPrototypeOf(node);
    if (nodePrototype === null)
      return false;
    return nodePrototype.constructor.name === instance.name || isInstanceOfElement(nodePrototype, instance);
  };

  // node_modules/html-to-image/es/clone-pseudos.js
  function formatCSSText(style) {
    const content = style.getPropertyValue("content");
    return `${style.cssText} content: '${content.replace(/'|"/g, "")}';`;
  }
  function formatCSSProperties(style) {
    return toArray(style).map((name) => {
      const value = style.getPropertyValue(name);
      const priority = style.getPropertyPriority(name);
      return `${name}: ${value}${priority ? " !important" : ""};`;
    }).join(" ");
  }
  function getPseudoElementStyle(className, pseudo, style) {
    const selector = `.${className}:${pseudo}`;
    const cssText = style.cssText ? formatCSSText(style) : formatCSSProperties(style);
    return document.createTextNode(`${selector}{${cssText}}`);
  }
  function clonePseudoElement(nativeNode, clonedNode, pseudo) {
    const style = window.getComputedStyle(nativeNode, pseudo);
    const content = style.getPropertyValue("content");
    if (content === "" || content === "none") {
      return;
    }
    const className = uuid();
    try {
      clonedNode.className = `${clonedNode.className} ${className}`;
    } catch (err) {
      return;
    }
    const styleElement = document.createElement("style");
    styleElement.appendChild(getPseudoElementStyle(className, pseudo, style));
    clonedNode.appendChild(styleElement);
  }
  function clonePseudoElements(nativeNode, clonedNode) {
    clonePseudoElement(nativeNode, clonedNode, ":before");
    clonePseudoElement(nativeNode, clonedNode, ":after");
  }

  // node_modules/html-to-image/es/mimes.js
  var WOFF = "application/font-woff";
  var JPEG = "image/jpeg";
  var mimes = {
    woff: WOFF,
    woff2: WOFF,
    ttf: "application/font-truetype",
    eot: "application/vnd.ms-fontobject",
    png: "image/png",
    jpg: JPEG,
    jpeg: JPEG,
    gif: "image/gif",
    tiff: "image/tiff",
    svg: "image/svg+xml",
    webp: "image/webp"
  };
  function getExtension(url) {
    const match = /\.([^./]*?)$/g.exec(url);
    return match ? match[1] : "";
  }
  function getMimeType(url) {
    const extension = getExtension(url).toLowerCase();
    return mimes[extension] || "";
  }

  // node_modules/html-to-image/es/dataurl.js
  function getContentFromDataUrl(dataURL) {
    return dataURL.split(/,/)[1];
  }
  function isDataUrl(url) {
    return url.search(/^(data:)/) !== -1;
  }
  function makeDataUrl(content, mimeType) {
    return `data:${mimeType};base64,${content}`;
  }
  async function fetchAsDataURL(url, init, process2) {
    const res = await fetch(url, init);
    if (res.status === 404) {
      throw new Error(`Resource "${res.url}" not found`);
    }
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onloadend = () => {
        try {
          resolve(process2({ res, result: reader.result }));
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsDataURL(blob);
    });
  }
  var cache = {};
  function getCacheKey(url, contentType, includeQueryParams) {
    let key = url.replace(/\?.*/, "");
    if (includeQueryParams) {
      key = url;
    }
    if (/ttf|otf|eot|woff2?/i.test(key)) {
      key = key.replace(/.*\//, "");
    }
    return contentType ? `[${contentType}]${key}` : key;
  }
  async function resourceToDataURL(resourceUrl, contentType, options) {
    const cacheKey = getCacheKey(resourceUrl, contentType, options.includeQueryParams);
    if (cache[cacheKey] != null) {
      return cache[cacheKey];
    }
    if (options.cacheBust) {
      resourceUrl += (/\?/.test(resourceUrl) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
    }
    let dataURL;
    try {
      const content = await fetchAsDataURL(resourceUrl, options.fetchRequestInit, ({ res, result }) => {
        if (!contentType) {
          contentType = res.headers.get("Content-Type") || "";
        }
        return getContentFromDataUrl(result);
      });
      dataURL = makeDataUrl(content, contentType);
    } catch (error) {
      dataURL = options.imagePlaceholder || "";
      let msg = `Failed to fetch resource: ${resourceUrl}`;
      if (error) {
        msg = typeof error === "string" ? error : error.message;
      }
      if (msg) {
        console.warn(msg);
      }
    }
    cache[cacheKey] = dataURL;
    return dataURL;
  }

  // node_modules/html-to-image/es/clone-node.js
  async function cloneCanvasElement(canvas) {
    const dataURL = canvas.toDataURL();
    if (dataURL === "data:,") {
      return canvas.cloneNode(false);
    }
    return createImage(dataURL);
  }
  async function cloneVideoElement(video, options) {
    if (video.currentSrc) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
      ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL2 = canvas.toDataURL();
      return createImage(dataURL2);
    }
    const poster = video.poster;
    const contentType = getMimeType(poster);
    const dataURL = await resourceToDataURL(poster, contentType, options);
    return createImage(dataURL);
  }
  async function cloneIFrameElement(iframe) {
    var _a;
    try {
      if ((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body) {
        return await cloneNode(iframe.contentDocument.body, {}, true);
      }
    } catch (_b) {
    }
    return iframe.cloneNode(false);
  }
  async function cloneSingleNode(node, options) {
    if (isInstanceOfElement(node, HTMLCanvasElement)) {
      return cloneCanvasElement(node);
    }
    if (isInstanceOfElement(node, HTMLVideoElement)) {
      return cloneVideoElement(node, options);
    }
    if (isInstanceOfElement(node, HTMLIFrameElement)) {
      return cloneIFrameElement(node);
    }
    return node.cloneNode(false);
  }
  var isSlotElement = (node) => node.tagName != null && node.tagName.toUpperCase() === "SLOT";
  async function cloneChildren(nativeNode, clonedNode, options) {
    var _a, _b;
    let children = [];
    if (isSlotElement(nativeNode) && nativeNode.assignedNodes) {
      children = toArray(nativeNode.assignedNodes());
    } else if (isInstanceOfElement(nativeNode, HTMLIFrameElement) && ((_a = nativeNode.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) {
      children = toArray(nativeNode.contentDocument.body.childNodes);
    } else {
      children = toArray(((_b = nativeNode.shadowRoot) !== null && _b !== void 0 ? _b : nativeNode).childNodes);
    }
    if (children.length === 0 || isInstanceOfElement(nativeNode, HTMLVideoElement)) {
      return clonedNode;
    }
    await children.reduce((deferred, child) => deferred.then(() => cloneNode(child, options)).then((clonedChild) => {
      if (clonedChild) {
        clonedNode.appendChild(clonedChild);
      }
    }), Promise.resolve());
    return clonedNode;
  }
  function cloneCSSStyle(nativeNode, clonedNode) {
    const targetStyle = clonedNode.style;
    if (!targetStyle) {
      return;
    }
    const sourceStyle = window.getComputedStyle(nativeNode);
    if (sourceStyle.cssText) {
      targetStyle.cssText = sourceStyle.cssText;
      targetStyle.transformOrigin = sourceStyle.transformOrigin;
    } else {
      toArray(sourceStyle).forEach((name) => {
        let value = sourceStyle.getPropertyValue(name);
        if (name === "font-size" && value.endsWith("px")) {
          const reducedFont = Math.floor(parseFloat(value.substring(0, value.length - 2))) - 0.1;
          value = `${reducedFont}px`;
        }
        if (isInstanceOfElement(nativeNode, HTMLIFrameElement) && name === "display" && value === "inline") {
          value = "block";
        }
        if (name === "d" && clonedNode.getAttribute("d")) {
          value = `path(${clonedNode.getAttribute("d")})`;
        }
        targetStyle.setProperty(name, value, sourceStyle.getPropertyPriority(name));
      });
    }
  }
  function cloneInputValue(nativeNode, clonedNode) {
    if (isInstanceOfElement(nativeNode, HTMLTextAreaElement)) {
      clonedNode.innerHTML = nativeNode.value;
    }
    if (isInstanceOfElement(nativeNode, HTMLInputElement)) {
      clonedNode.setAttribute("value", nativeNode.value);
    }
  }
  function cloneSelectValue(nativeNode, clonedNode) {
    if (isInstanceOfElement(nativeNode, HTMLSelectElement)) {
      const clonedSelect = clonedNode;
      const selectedOption = Array.from(clonedSelect.children).find((child) => nativeNode.value === child.getAttribute("value"));
      if (selectedOption) {
        selectedOption.setAttribute("selected", "");
      }
    }
  }
  function decorate(nativeNode, clonedNode) {
    if (isInstanceOfElement(clonedNode, Element)) {
      cloneCSSStyle(nativeNode, clonedNode);
      clonePseudoElements(nativeNode, clonedNode);
      cloneInputValue(nativeNode, clonedNode);
      cloneSelectValue(nativeNode, clonedNode);
    }
    return clonedNode;
  }
  async function ensureSVGSymbols(clone, options) {
    const uses = clone.querySelectorAll ? clone.querySelectorAll("use") : [];
    if (uses.length === 0) {
      return clone;
    }
    const processedDefs = {};
    for (let i2 = 0; i2 < uses.length; i2++) {
      const use = uses[i2];
      const id = use.getAttribute("xlink:href");
      if (id) {
        const exist = clone.querySelector(id);
        const definition = document.querySelector(id);
        if (!exist && definition && !processedDefs[id]) {
          processedDefs[id] = await cloneNode(definition, options, true);
        }
      }
    }
    const nodes = Object.values(processedDefs);
    if (nodes.length) {
      const ns = "http://www.w3.org/1999/xhtml";
      const svg = document.createElementNS(ns, "svg");
      svg.setAttribute("xmlns", ns);
      svg.style.position = "absolute";
      svg.style.width = "0";
      svg.style.height = "0";
      svg.style.overflow = "hidden";
      svg.style.display = "none";
      const defs = document.createElementNS(ns, "defs");
      svg.appendChild(defs);
      for (let i2 = 0; i2 < nodes.length; i2++) {
        defs.appendChild(nodes[i2]);
      }
      clone.appendChild(svg);
    }
    return clone;
  }
  async function cloneNode(node, options, isRoot) {
    if (!isRoot && options.filter && !options.filter(node)) {
      return null;
    }
    return Promise.resolve(node).then((clonedNode) => cloneSingleNode(clonedNode, options)).then((clonedNode) => cloneChildren(node, clonedNode, options)).then((clonedNode) => decorate(node, clonedNode)).then((clonedNode) => ensureSVGSymbols(clonedNode, options));
  }

  // node_modules/html-to-image/es/embed-resources.js
  var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
  var URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
  var FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
  function toRegex(url) {
    const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, "g");
  }
  function parseURLs(cssText) {
    const urls = [];
    cssText.replace(URL_REGEX, (raw, quotation, url) => {
      urls.push(url);
      return raw;
    });
    return urls.filter((url) => !isDataUrl(url));
  }
  async function embed(cssText, resourceURL, baseURL, options, getContentFromUrl) {
    try {
      const resolvedURL = baseURL ? resolveUrl(resourceURL, baseURL) : resourceURL;
      const contentType = getMimeType(resourceURL);
      let dataURL;
      if (getContentFromUrl) {
        const content = await getContentFromUrl(resolvedURL);
        dataURL = makeDataUrl(content, contentType);
      } else {
        dataURL = await resourceToDataURL(resolvedURL, contentType, options);
      }
      return cssText.replace(toRegex(resourceURL), `$1${dataURL}$3`);
    } catch (error) {
    }
    return cssText;
  }
  function filterPreferredFontFormat(str, { preferredFontFormat }) {
    return !preferredFontFormat ? str : str.replace(FONT_SRC_REGEX, (match) => {
      while (true) {
        const [src, , format] = URL_WITH_FORMAT_REGEX.exec(match) || [];
        if (!format) {
          return "";
        }
        if (format === preferredFontFormat) {
          return `src: ${src};`;
        }
      }
    });
  }
  function shouldEmbed(url) {
    return url.search(URL_REGEX) !== -1;
  }
  async function embedResources(cssText, baseUrl, options) {
    if (!shouldEmbed(cssText)) {
      return cssText;
    }
    const filteredCSSText = filterPreferredFontFormat(cssText, options);
    const urls = parseURLs(filteredCSSText);
    return urls.reduce((deferred, url) => deferred.then((css) => embed(css, url, baseUrl, options)), Promise.resolve(filteredCSSText));
  }

  // node_modules/html-to-image/es/embed-images.js
  async function embedProp(propName, node, options) {
    var _a;
    const propValue = (_a = node.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue(propName);
    if (propValue) {
      const cssString = await embedResources(propValue, null, options);
      node.style.setProperty(propName, cssString, node.style.getPropertyPriority(propName));
      return true;
    }
    return false;
  }
  async function embedBackground(clonedNode, options) {
    if (!await embedProp("background", clonedNode, options)) {
      await embedProp("background-image", clonedNode, options);
    }
    if (!await embedProp("mask", clonedNode, options)) {
      await embedProp("mask-image", clonedNode, options);
    }
  }
  async function embedImageNode(clonedNode, options) {
    const isImageElement = isInstanceOfElement(clonedNode, HTMLImageElement);
    if (!(isImageElement && !isDataUrl(clonedNode.src)) && !(isInstanceOfElement(clonedNode, SVGImageElement) && !isDataUrl(clonedNode.href.baseVal))) {
      return;
    }
    const url = isImageElement ? clonedNode.src : clonedNode.href.baseVal;
    const dataURL = await resourceToDataURL(url, getMimeType(url), options);
    await new Promise((resolve, reject) => {
      clonedNode.onload = resolve;
      clonedNode.onerror = reject;
      const image = clonedNode;
      if (image.decode) {
        image.decode = resolve;
      }
      if (image.loading === "lazy") {
        image.loading = "eager";
      }
      if (isImageElement) {
        clonedNode.srcset = "";
        clonedNode.src = dataURL;
      } else {
        clonedNode.href.baseVal = dataURL;
      }
    });
  }
  async function embedChildren(clonedNode, options) {
    const children = toArray(clonedNode.childNodes);
    const deferreds = children.map((child) => embedImages(child, options));
    await Promise.all(deferreds).then(() => clonedNode);
  }
  async function embedImages(clonedNode, options) {
    if (isInstanceOfElement(clonedNode, Element)) {
      await embedBackground(clonedNode, options);
      await embedImageNode(clonedNode, options);
      await embedChildren(clonedNode, options);
    }
  }

  // node_modules/html-to-image/es/apply-style.js
  function applyStyle(node, options) {
    const { style } = node;
    if (options.backgroundColor) {
      style.backgroundColor = options.backgroundColor;
    }
    if (options.width) {
      style.width = `${options.width}px`;
    }
    if (options.height) {
      style.height = `${options.height}px`;
    }
    const manual = options.style;
    if (manual != null) {
      Object.keys(manual).forEach((key) => {
        style[key] = manual[key];
      });
    }
    return node;
  }

  // node_modules/html-to-image/es/embed-webfonts.js
  var cssFetchCache = {};
  async function fetchCSS(url) {
    let cache3 = cssFetchCache[url];
    if (cache3 != null) {
      return cache3;
    }
    const res = await fetch(url);
    const cssText = await res.text();
    cache3 = { url, cssText };
    cssFetchCache[url] = cache3;
    return cache3;
  }
  async function embedFonts(data, options) {
    let cssText = data.cssText;
    const regexUrl = /url\(["']?([^"')]+)["']?\)/g;
    const fontLocs = cssText.match(/url\([^)]+\)/g) || [];
    const loadFonts = fontLocs.map(async (loc) => {
      let url = loc.replace(regexUrl, "$1");
      if (!url.startsWith("https://")) {
        url = new URL(url, data.url).href;
      }
      return fetchAsDataURL(url, options.fetchRequestInit, ({ result }) => {
        cssText = cssText.replace(loc, `url(${result})`);
        return [loc, result];
      });
    });
    return Promise.all(loadFonts).then(() => cssText);
  }
  function parseCSS(source) {
    if (source == null) {
      return [];
    }
    const result = [];
    const commentsRegex = /(\/\*[\s\S]*?\*\/)/gi;
    let cssText = source.replace(commentsRegex, "");
    const keyframesRegex = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
    while (true) {
      const matches = keyframesRegex.exec(cssText);
      if (matches === null) {
        break;
      }
      result.push(matches[0]);
    }
    cssText = cssText.replace(keyframesRegex, "");
    const importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
    const combinedCSSRegex = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})";
    const unifiedRegex = new RegExp(combinedCSSRegex, "gi");
    while (true) {
      let matches = importRegex.exec(cssText);
      if (matches === null) {
        matches = unifiedRegex.exec(cssText);
        if (matches === null) {
          break;
        } else {
          importRegex.lastIndex = unifiedRegex.lastIndex;
        }
      } else {
        unifiedRegex.lastIndex = importRegex.lastIndex;
      }
      result.push(matches[0]);
    }
    return result;
  }
  async function getCSSRules(styleSheets, options) {
    const ret = [];
    const deferreds = [];
    styleSheets.forEach((sheet) => {
      if ("cssRules" in sheet) {
        try {
          toArray(sheet.cssRules || []).forEach((item, index2) => {
            if (item.type === CSSRule.IMPORT_RULE) {
              let importIndex = index2 + 1;
              const url = item.href;
              const deferred = fetchCSS(url).then((metadata) => embedFonts(metadata, options)).then((cssText) => parseCSS(cssText).forEach((rule) => {
                try {
                  sheet.insertRule(rule, rule.startsWith("@import") ? importIndex += 1 : sheet.cssRules.length);
                } catch (error) {
                  console.error("Error inserting rule from remote css", {
                    rule,
                    error
                  });
                }
              })).catch((e2) => {
                console.error("Error loading remote css", e2.toString());
              });
              deferreds.push(deferred);
            }
          });
        } catch (e2) {
          const inline = styleSheets.find((a) => a.href == null) || document.styleSheets[0];
          if (sheet.href != null) {
            deferreds.push(fetchCSS(sheet.href).then((metadata) => embedFonts(metadata, options)).then((cssText) => parseCSS(cssText).forEach((rule) => {
              inline.insertRule(rule, sheet.cssRules.length);
            })).catch((err) => {
              console.error("Error loading remote stylesheet", err);
            }));
          }
          console.error("Error inlining remote css file", e2);
        }
      }
    });
    return Promise.all(deferreds).then(() => {
      styleSheets.forEach((sheet) => {
        if ("cssRules" in sheet) {
          try {
            toArray(sheet.cssRules || []).forEach((item) => {
              ret.push(item);
            });
          } catch (e2) {
            console.error(`Error while reading CSS rules from ${sheet.href}`, e2);
          }
        }
      });
      return ret;
    });
  }
  function getWebFontRules(cssRules) {
    return cssRules.filter((rule) => rule.type === CSSRule.FONT_FACE_RULE).filter((rule) => shouldEmbed(rule.style.getPropertyValue("src")));
  }
  async function parseWebFontRules(node, options) {
    if (node.ownerDocument == null) {
      throw new Error("Provided element is not within a Document");
    }
    const styleSheets = toArray(node.ownerDocument.styleSheets);
    const cssRules = await getCSSRules(styleSheets, options);
    return getWebFontRules(cssRules);
  }
  async function getWebFontCSS(node, options) {
    const rules = await parseWebFontRules(node, options);
    const cssTexts = await Promise.all(rules.map((rule) => {
      const baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
      return embedResources(rule.cssText, baseUrl, options);
    }));
    return cssTexts.join("\n");
  }
  async function embedWebFonts(clonedNode, options) {
    const cssText = options.fontEmbedCSS != null ? options.fontEmbedCSS : options.skipFonts ? null : await getWebFontCSS(clonedNode, options);
    if (cssText) {
      const styleNode = document.createElement("style");
      const sytleContent = document.createTextNode(cssText);
      styleNode.appendChild(sytleContent);
      if (clonedNode.firstChild) {
        clonedNode.insertBefore(styleNode, clonedNode.firstChild);
      } else {
        clonedNode.appendChild(styleNode);
      }
    }
  }

  // node_modules/html-to-image/es/index.js
  async function toSvg(node, options = {}) {
    const { width, height } = getImageSize(node, options);
    const clonedNode = await cloneNode(node, options, true);
    await embedWebFonts(clonedNode, options);
    await embedImages(clonedNode, options);
    applyStyle(clonedNode, options);
    const datauri = await nodeToDataURL(clonedNode, width, height);
    return datauri;
  }
  async function toCanvas(node, options = {}) {
    const { width, height } = getImageSize(node, options);
    const svg = await toSvg(node, options);
    const img = await createImage(svg);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const ratio = options.pixelRatio || getPixelRatio();
    const canvasWidth = options.canvasWidth || width;
    const canvasHeight = options.canvasHeight || height;
    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;
    if (!options.skipAutoScale) {
      checkCanvasDimensions(canvas);
    }
    canvas.style.width = `${canvasWidth}`;
    canvas.style.height = `${canvasHeight}`;
    if (options.backgroundColor) {
      context.fillStyle = options.backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
  async function toPng(node, options = {}) {
    const canvas = await toCanvas(node, options);
    return canvas.toDataURL();
  }
  async function toBlob(node, options = {}) {
    const canvas = await toCanvas(node, options);
    const blob = await canvasToBlob(canvas);
    return blob;
  }

  // js/generator.js
  var import_core = __toESM(require_mo_umd());
  var currentQuoteInfo = {};
  var likeCurrentQuote = false;
  var isLiked = (quote2 = currentQuoteInfo) => {
    return !!localStorage.getItem(quote2.q);
  };
  var getRandomQuote = async () => {
    numberOfQuoteFiles = 14440;
    index = numberOfQuoteFiles.length * Math.random() | 0;
    return fetch(
      `../QuoteData/quote_${index}.json`
    ).then((response) => response.json()).then((responseJson) => {
      return responseJson;
    }).catch((error) => {
      console.error("Error:", error);
    });
  };
  var generateQuote = async () => {
    card.classList.add("hidden");
    setTimeout(async () => {
      currentQuoteInfo = await getRandomQuote();
      likeCurrentQuote = isLiked(currentQuoteInfo);
      quote.textContent = currentQuoteInfo.q;
      author.textContent = currentQuoteInfo.a;
      card.classList.remove("hidden");
      iconWrapper.classList.toggle("liked", likeCurrentQuote);
    }, 300);
  };
  var filter = (node) => {
    return !node.classList?.contains("btn-wrapper");
  };
  var shareOrDownload = async (blob, fileName, title, text) => {
    if (webShareSupported) {
      const data = {
        files: [
          new File([blob], fileName, {
            type: blob.type
          })
        ],
        title,
        text
      };
      if (navigator.canShare(data)) {
        try {
          await navigator.share(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.name, err.message);
          }
        } finally {
          return;
        }
      }
    }
    const a = document.createElement("a");
    a.download = fileName;
    a.style.display = "none";
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", () => {
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 1e3);
    });
    document.body.append(a);
    a.click();
  };
  var iconWrapper = document.querySelector("[data-like]");
  var icon = iconWrapper.querySelector("svg");
  var iconHeight = icon.clientHeight;
  var accentColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--clr-tertiary"
  );
  iconWrapper.addEventListener("click", () => {
    if (likeCurrentQuote) {
      localStorage.removeItem(currentQuoteInfo.q);
      likeCurrentQuote = false;
      iconWrapper.classList.remove("liked");
      return;
    }
    localStorage.setItem(currentQuoteInfo.q, currentQuoteInfo.q);
    likeCurrentQuote = true;
    iconWrapper.classList.add("liked");
    const RADIUS = iconHeight;
    const circle = new import_core.mojs.Shape({
      parent: iconWrapper,
      stroke: { transparent: accentColor },
      strokeWidth: { [1.005 * RADIUS]: 0 },
      fill: "none",
      scale: { 0: 1, easing: "quad.out" },
      radius: RADIUS,
      duration: 600
    }).generate().play();
    const burst = new import_core.mojs.Burst({
      parent: iconWrapper,
      count: 10,
      degree: 360,
      radius: { [RADIUS / 2]: [RADIUS * 2] },
      speed: 6,
      angle: 45,
      children: {
        shape: "line",
        stroke: { accentColor },
        strokeDasharray: "100%",
        strokeDashoffset: { "-100%": "100%" },
        easing: "quad.out",
        fill: "null",
        radius: 3,
        scale: { 2: 1 },
        angle: 0,
        speed: 2,
        duration: 600
      }
    }).generate().play();
  });
  var webShareSupported = "canShare" in navigator;
  qs("[data-share]").addEventListener("click", async () => {
    toBlob(qs("section#quote"), { filter }).then(async (blob) => {
      await shareOrDownload(
        blob,
        "Dragon Quotes - Quote.png",
        "An amazing quote",
        "Just and amazing quote generated by Dragon Quotes"
      );
    });
  });
  qs("[data-save]").addEventListener("click", () => {
    toPng(qs("section#quote"), {
      filter
    }).then((dataUrl) => {
      let link = document.createElement("a");
      link.download = "Dragon Quotes.png";
      link.href = dataUrl;
      link.click();
    });
  });
  var quote = qs("[data-quote]");
  var author = qs("[data-quote-author]");
  var card = qs("[data-quote-container]");
  window.onload = generateQuote;
  var generateButton = qs("[data-generate]");
  var generateIcon = qs("svg", generateButton);
  var generateButtonRotationAngle = 360;
  generateButton.addEventListener("click", async () => {
    generateIcon.style.rotate = `${generateButtonRotationAngle}deg`;
    generateButtonRotationAngle += 360;
    generateQuote();
  });

  // node_modules/animejs/lib/anime.es.js
  var defaultInstanceSettings = {
    update: null,
    begin: null,
    loopBegin: null,
    changeBegin: null,
    change: null,
    changeComplete: null,
    loopComplete: null,
    complete: null,
    loop: 1,
    direction: "normal",
    autoplay: true,
    timelineOffset: 0
  };
  var defaultTweenSettings = {
    duration: 1e3,
    delay: 0,
    endDelay: 0,
    easing: "easeOutElastic(1, .5)",
    round: 0
  };
  var validTransforms = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"];
  var cache2 = {
    CSS: {},
    springs: {}
  };
  function minMax(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
  function stringContains(str, text) {
    return str.indexOf(text) > -1;
  }
  function applyArguments(func, args) {
    return func.apply(null, args);
  }
  var is = {
    arr: function(a) {
      return Array.isArray(a);
    },
    obj: function(a) {
      return stringContains(Object.prototype.toString.call(a), "Object");
    },
    pth: function(a) {
      return is.obj(a) && a.hasOwnProperty("totalLength");
    },
    svg: function(a) {
      return a instanceof SVGElement;
    },
    inp: function(a) {
      return a instanceof HTMLInputElement;
    },
    dom: function(a) {
      return a.nodeType || is.svg(a);
    },
    str: function(a) {
      return typeof a === "string";
    },
    fnc: function(a) {
      return typeof a === "function";
    },
    und: function(a) {
      return typeof a === "undefined";
    },
    nil: function(a) {
      return is.und(a) || a === null;
    },
    hex: function(a) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
    },
    rgb: function(a) {
      return /^rgb/.test(a);
    },
    hsl: function(a) {
      return /^hsl/.test(a);
    },
    col: function(a) {
      return is.hex(a) || is.rgb(a) || is.hsl(a);
    },
    key: function(a) {
      return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== "targets" && a !== "keyframes";
    }
  };
  function parseEasingParameters(string) {
    var match = /\(([^)]+)\)/.exec(string);
    return match ? match[1].split(",").map(function(p) {
      return parseFloat(p);
    }) : [];
  }
  function spring(string, duration2) {
    var params = parseEasingParameters(string);
    var mass = minMax(is.und(params[0]) ? 1 : params[0], 0.1, 100);
    var stiffness = minMax(is.und(params[1]) ? 100 : params[1], 0.1, 100);
    var damping = minMax(is.und(params[2]) ? 10 : params[2], 0.1, 100);
    var velocity = minMax(is.und(params[3]) ? 0 : params[3], 0.1, 100);
    var w0 = Math.sqrt(stiffness / mass);
    var zeta = damping / (2 * Math.sqrt(stiffness * mass));
    var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
    var a = 1;
    var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
    function solver(t2) {
      var progress = duration2 ? duration2 * t2 / 1e3 : t2;
      if (zeta < 1) {
        progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
      } else {
        progress = (a + b * progress) * Math.exp(-progress * w0);
      }
      if (t2 === 0 || t2 === 1) {
        return t2;
      }
      return 1 - progress;
    }
    function getDuration() {
      var cached = cache2.springs[string];
      if (cached) {
        return cached;
      }
      var frame = 1 / 6;
      var elapsed = 0;
      var rest = 0;
      while (true) {
        elapsed += frame;
        if (solver(elapsed) === 1) {
          rest++;
          if (rest >= 16) {
            break;
          }
        } else {
          rest = 0;
        }
      }
      var duration3 = elapsed * frame * 1e3;
      cache2.springs[string] = duration3;
      return duration3;
    }
    return duration2 ? solver : getDuration;
  }
  function steps(steps2) {
    if (steps2 === void 0)
      steps2 = 10;
    return function(t2) {
      return Math.ceil(minMax(t2, 1e-6, 1) * steps2) * (1 / steps2);
    };
  }
  var bezier = function() {
    var kSplineTableSize = 11;
    var kSampleStepSize = 1 / (kSplineTableSize - 1);
    function A(aA1, aA2) {
      return 1 - 3 * aA2 + 3 * aA1;
    }
    function B(aA1, aA2) {
      return 3 * aA2 - 6 * aA1;
    }
    function C(aA1) {
      return 3 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
      return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
      var currentX, currentT, i2 = 0;
      do {
        currentT = aA + (aB - aA) / 2;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
      } while (Math.abs(currentX) > 1e-7 && ++i2 < 10);
      return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
      for (var i2 = 0; i2 < 4; ++i2) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0) {
          return aGuessT;
        }
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }
    function bezier2(mX1, mY1, mX2, mY2) {
      if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
        return;
      }
      var sampleValues = new Float32Array(kSplineTableSize);
      if (mX1 !== mY1 || mX2 !== mY2) {
        for (var i2 = 0; i2 < kSplineTableSize; ++i2) {
          sampleValues[i2] = calcBezier(i2 * kSampleStepSize, mX1, mX2);
        }
      }
      function getTForX(aX) {
        var intervalStart = 0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }
        --currentSample;
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= 1e-3) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
      }
      return function(x) {
        if (mX1 === mY1 && mX2 === mY2) {
          return x;
        }
        if (x === 0 || x === 1) {
          return x;
        }
        return calcBezier(getTForX(x), mY1, mY2);
      };
    }
    return bezier2;
  }();
  var penner = function() {
    var eases = { linear: function() {
      return function(t2) {
        return t2;
      };
    } };
    var functionEasings = {
      Sine: function() {
        return function(t2) {
          return 1 - Math.cos(t2 * Math.PI / 2);
        };
      },
      Circ: function() {
        return function(t2) {
          return 1 - Math.sqrt(1 - t2 * t2);
        };
      },
      Back: function() {
        return function(t2) {
          return t2 * t2 * (3 * t2 - 2);
        };
      },
      Bounce: function() {
        return function(t2) {
          var pow2, b = 4;
          while (t2 < ((pow2 = Math.pow(2, --b)) - 1) / 11) {
          }
          return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t2, 2);
        };
      },
      Elastic: function(amplitude, period) {
        if (amplitude === void 0)
          amplitude = 1;
        if (period === void 0)
          period = 0.5;
        var a = minMax(amplitude, 1, 10);
        var p = minMax(period, 0.1, 2);
        return function(t2) {
          return t2 === 0 || t2 === 1 ? t2 : -a * Math.pow(2, 10 * (t2 - 1)) * Math.sin((t2 - 1 - p / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p);
        };
      }
    };
    var baseEasings = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
    baseEasings.forEach(function(name, i2) {
      functionEasings[name] = function() {
        return function(t2) {
          return Math.pow(t2, i2 + 2);
        };
      };
    });
    Object.keys(functionEasings).forEach(function(name) {
      var easeIn = functionEasings[name];
      eases["easeIn" + name] = easeIn;
      eases["easeOut" + name] = function(a, b) {
        return function(t2) {
          return 1 - easeIn(a, b)(1 - t2);
        };
      };
      eases["easeInOut" + name] = function(a, b) {
        return function(t2) {
          return t2 < 0.5 ? easeIn(a, b)(t2 * 2) / 2 : 1 - easeIn(a, b)(t2 * -2 + 2) / 2;
        };
      };
      eases["easeOutIn" + name] = function(a, b) {
        return function(t2) {
          return t2 < 0.5 ? (1 - easeIn(a, b)(1 - t2 * 2)) / 2 : (easeIn(a, b)(t2 * 2 - 1) + 1) / 2;
        };
      };
    });
    return eases;
  }();
  function parseEasings(easing, duration2) {
    if (is.fnc(easing)) {
      return easing;
    }
    var name = easing.split("(")[0];
    var ease = penner[name];
    var args = parseEasingParameters(easing);
    switch (name) {
      case "spring":
        return spring(easing, duration2);
      case "cubicBezier":
        return applyArguments(bezier, args);
      case "steps":
        return applyArguments(steps, args);
      default:
        return applyArguments(ease, args);
    }
  }
  function selectString(str) {
    try {
      var nodes = document.querySelectorAll(str);
      return nodes;
    } catch (e2) {
      return;
    }
  }
  function filterArray(arr, callback) {
    var len = arr.length;
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    var result = [];
    for (var i2 = 0; i2 < len; i2++) {
      if (i2 in arr) {
        var val = arr[i2];
        if (callback.call(thisArg, val, i2, arr)) {
          result.push(val);
        }
      }
    }
    return result;
  }
  function flattenArray(arr) {
    return arr.reduce(function(a, b) {
      return a.concat(is.arr(b) ? flattenArray(b) : b);
    }, []);
  }
  function toArray2(o2) {
    if (is.arr(o2)) {
      return o2;
    }
    if (is.str(o2)) {
      o2 = selectString(o2) || o2;
    }
    if (o2 instanceof NodeList || o2 instanceof HTMLCollection) {
      return [].slice.call(o2);
    }
    return [o2];
  }
  function arrayContains(arr, val) {
    return arr.some(function(a) {
      return a === val;
    });
  }
  function cloneObject(o2) {
    var clone = {};
    for (var p in o2) {
      clone[p] = o2[p];
    }
    return clone;
  }
  function replaceObjectProps(o1, o2) {
    var o3 = cloneObject(o1);
    for (var p in o1) {
      o3[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
    }
    return o3;
  }
  function mergeObjects(o1, o2) {
    var o3 = cloneObject(o1);
    for (var p in o2) {
      o3[p] = is.und(o1[p]) ? o2[p] : o1[p];
    }
    return o3;
  }
  function rgbToRgba(rgbValue) {
    var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
    return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
  }
  function hexToRgba(hexValue) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hexValue.replace(rgx, function(m, r3, g2, b2) {
      return r3 + r3 + g2 + g2 + b2 + b2;
    });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r2 = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return "rgba(" + r2 + "," + g + "," + b + ",1)";
  }
  function hslToRgba(hslValue) {
    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
    var h = parseInt(hsl[1], 10) / 360;
    var s2 = parseInt(hsl[2], 10) / 100;
    var l = parseInt(hsl[3], 10) / 100;
    var a = hsl[4] || 1;
    function hue2rgb(p2, q2, t2) {
      if (t2 < 0) {
        t2 += 1;
      }
      if (t2 > 1) {
        t2 -= 1;
      }
      if (t2 < 1 / 6) {
        return p2 + (q2 - p2) * 6 * t2;
      }
      if (t2 < 1 / 2) {
        return q2;
      }
      if (t2 < 2 / 3) {
        return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
      }
      return p2;
    }
    var r2, g, b;
    if (s2 == 0) {
      r2 = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s2) : l + s2 - l * s2;
      var p = 2 * l - q;
      r2 = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return "rgba(" + r2 * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
  }
  function colorToRgb(val) {
    if (is.rgb(val)) {
      return rgbToRgba(val);
    }
    if (is.hex(val)) {
      return hexToRgba(val);
    }
    if (is.hsl(val)) {
      return hslToRgba(val);
    }
  }
  function getUnit(val) {
    var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
    if (split) {
      return split[1];
    }
  }
  function getTransformUnit(propName) {
    if (stringContains(propName, "translate") || propName === "perspective") {
      return "px";
    }
    if (stringContains(propName, "rotate") || stringContains(propName, "skew")) {
      return "deg";
    }
  }
  function getFunctionValue(val, animatable) {
    if (!is.fnc(val)) {
      return val;
    }
    return val(animatable.target, animatable.id, animatable.total);
  }
  function getAttribute(el, prop) {
    return el.getAttribute(prop);
  }
  function convertPxToUnit(el, value, unit) {
    var valueUnit = getUnit(value);
    if (arrayContains([unit, "deg", "rad", "turn"], valueUnit)) {
      return value;
    }
    var cached = cache2.CSS[value + unit];
    if (!is.und(cached)) {
      return cached;
    }
    var baseline = 100;
    var tempEl = document.createElement(el.tagName);
    var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
    parentEl.appendChild(tempEl);
    tempEl.style.position = "absolute";
    tempEl.style.width = baseline + unit;
    var factor = baseline / tempEl.offsetWidth;
    parentEl.removeChild(tempEl);
    var convertedUnit = factor * parseFloat(value);
    cache2.CSS[value + unit] = convertedUnit;
    return convertedUnit;
  }
  function getCSSValue(el, prop, unit) {
    if (prop in el.style) {
      var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || "0";
      return unit ? convertPxToUnit(el, value, unit) : value;
    }
  }
  function getAnimationType(el, prop) {
    if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) {
      return "attribute";
    }
    if (is.dom(el) && arrayContains(validTransforms, prop)) {
      return "transform";
    }
    if (is.dom(el) && (prop !== "transform" && getCSSValue(el, prop))) {
      return "css";
    }
    if (el[prop] != null) {
      return "object";
    }
  }
  function getElementTransforms(el) {
    if (!is.dom(el)) {
      return;
    }
    var str = el.style.transform || "";
    var reg = /(\w+)\(([^)]*)\)/g;
    var transforms = /* @__PURE__ */ new Map();
    var m;
    while (m = reg.exec(str)) {
      transforms.set(m[1], m[2]);
    }
    return transforms;
  }
  function getTransformValue(el, propName, animatable, unit) {
    var defaultVal = stringContains(propName, "scale") ? 1 : 0 + getTransformUnit(propName);
    var value = getElementTransforms(el).get(propName) || defaultVal;
    if (animatable) {
      animatable.transforms.list.set(propName, value);
      animatable.transforms["last"] = propName;
    }
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
  function getOriginalTargetValue(target, propName, unit, animatable) {
    switch (getAnimationType(target, propName)) {
      case "transform":
        return getTransformValue(target, propName, animatable, unit);
      case "css":
        return getCSSValue(target, propName, unit);
      case "attribute":
        return getAttribute(target, propName);
      default:
        return target[propName] || 0;
    }
  }
  function getRelativeValue(to, from) {
    var operator = /^(\*=|\+=|-=)/.exec(to);
    if (!operator) {
      return to;
    }
    var u = getUnit(to) || 0;
    var x = parseFloat(from);
    var y = parseFloat(to.replace(operator[0], ""));
    switch (operator[0][0]) {
      case "+":
        return x + y + u;
      case "-":
        return x - y + u;
      case "*":
        return x * y + u;
    }
  }
  function validateValue(val, unit) {
    if (is.col(val)) {
      return colorToRgb(val);
    }
    if (/\s/g.test(val)) {
      return val;
    }
    var originalUnit = getUnit(val);
    var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
    if (unit) {
      return unitLess + unit;
    }
    return unitLess;
  }
  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
  function getCircleLength(el) {
    return Math.PI * 2 * getAttribute(el, "r");
  }
  function getRectLength(el) {
    return getAttribute(el, "width") * 2 + getAttribute(el, "height") * 2;
  }
  function getLineLength(el) {
    return getDistance(
      { x: getAttribute(el, "x1"), y: getAttribute(el, "y1") },
      { x: getAttribute(el, "x2"), y: getAttribute(el, "y2") }
    );
  }
  function getPolylineLength(el) {
    var points = el.points;
    var totalLength = 0;
    var previousPos;
    for (var i2 = 0; i2 < points.numberOfItems; i2++) {
      var currentPos = points.getItem(i2);
      if (i2 > 0) {
        totalLength += getDistance(previousPos, currentPos);
      }
      previousPos = currentPos;
    }
    return totalLength;
  }
  function getPolygonLength(el) {
    var points = el.points;
    return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
  }
  function getTotalLength(el) {
    if (el.getTotalLength) {
      return el.getTotalLength();
    }
    switch (el.tagName.toLowerCase()) {
      case "circle":
        return getCircleLength(el);
      case "rect":
        return getRectLength(el);
      case "line":
        return getLineLength(el);
      case "polyline":
        return getPolylineLength(el);
      case "polygon":
        return getPolygonLength(el);
    }
  }
  function setDashoffset(el) {
    var pathLength = getTotalLength(el);
    el.setAttribute("stroke-dasharray", pathLength);
    return pathLength;
  }
  function getParentSvgEl(el) {
    var parentEl = el.parentNode;
    while (is.svg(parentEl)) {
      if (!is.svg(parentEl.parentNode)) {
        break;
      }
      parentEl = parentEl.parentNode;
    }
    return parentEl;
  }
  function getParentSvg(pathEl, svgData) {
    var svg = svgData || {};
    var parentSvgEl = svg.el || getParentSvgEl(pathEl);
    var rect = parentSvgEl.getBoundingClientRect();
    var viewBoxAttr = getAttribute(parentSvgEl, "viewBox");
    var width = rect.width;
    var height = rect.height;
    var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(" ") : [0, 0, width, height]);
    return {
      el: parentSvgEl,
      viewBox,
      x: viewBox[0] / 1,
      y: viewBox[1] / 1,
      w: width,
      h: height,
      vW: viewBox[2],
      vH: viewBox[3]
    };
  }
  function getPath(path, percent) {
    var pathEl = is.str(path) ? selectString(path)[0] : path;
    var p = percent || 100;
    return function(property) {
      return {
        property,
        el: pathEl,
        svg: getParentSvg(pathEl),
        totalLength: getTotalLength(pathEl) * (p / 100)
      };
    };
  }
  function getPathProgress(path, progress, isPathTargetInsideSVG) {
    function point(offset) {
      if (offset === void 0)
        offset = 0;
      var l = progress + offset >= 1 ? progress + offset : 0;
      return path.el.getPointAtLength(l);
    }
    var svg = getParentSvg(path.el, path.svg);
    var p = point();
    var p0 = point(-1);
    var p1 = point(1);
    var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
    var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
    switch (path.property) {
      case "x":
        return (p.x - svg.x) * scaleX;
      case "y":
        return (p.y - svg.y) * scaleY;
      case "angle":
        return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    }
  }
  function decomposeValue(val, unit) {
    var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
    var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + "";
    return {
      original: value,
      numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
      strings: is.str(val) || unit ? value.split(rgx) : []
    };
  }
  function parseTargets(targets) {
    var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray2) : toArray2(targets)) : [];
    return filterArray(targetsArray, function(item, pos, self2) {
      return self2.indexOf(item) === pos;
    });
  }
  function getAnimatables(targets) {
    var parsed = parseTargets(targets);
    return parsed.map(function(t2, i2) {
      return { target: t2, id: i2, total: parsed.length, transforms: { list: getElementTransforms(t2) } };
    });
  }
  function normalizePropertyTweens(prop, tweenSettings) {
    var settings = cloneObject(tweenSettings);
    if (/^spring/.test(settings.easing)) {
      settings.duration = spring(settings.easing);
    }
    if (is.arr(prop)) {
      var l = prop.length;
      var isFromTo = l === 2 && !is.obj(prop[0]);
      if (!isFromTo) {
        if (!is.fnc(tweenSettings.duration)) {
          settings.duration = tweenSettings.duration / l;
        }
      } else {
        prop = { value: prop };
      }
    }
    var propArray = is.arr(prop) ? prop : [prop];
    return propArray.map(function(v, i2) {
      var obj = is.obj(v) && !is.pth(v) ? v : { value: v };
      if (is.und(obj.delay)) {
        obj.delay = !i2 ? tweenSettings.delay : 0;
      }
      if (is.und(obj.endDelay)) {
        obj.endDelay = i2 === propArray.length - 1 ? tweenSettings.endDelay : 0;
      }
      return obj;
    }).map(function(k) {
      return mergeObjects(k, settings);
    });
  }
  function flattenKeyframes(keyframes) {
    var propertyNames = filterArray(flattenArray(keyframes.map(function(key) {
      return Object.keys(key);
    })), function(p) {
      return is.key(p);
    }).reduce(function(a, b) {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }
      return a;
    }, []);
    var properties = {};
    var loop = function(i3) {
      var propName = propertyNames[i3];
      properties[propName] = keyframes.map(function(key) {
        var newKey = {};
        for (var p in key) {
          if (is.key(p)) {
            if (p == propName) {
              newKey.value = key[p];
            }
          } else {
            newKey[p] = key[p];
          }
        }
        return newKey;
      });
    };
    for (var i2 = 0; i2 < propertyNames.length; i2++)
      loop(i2);
    return properties;
  }
  function getProperties(tweenSettings, params) {
    var properties = [];
    var keyframes = params.keyframes;
    if (keyframes) {
      params = mergeObjects(flattenKeyframes(keyframes), params);
    }
    for (var p in params) {
      if (is.key(p)) {
        properties.push({
          name: p,
          tweens: normalizePropertyTweens(params[p], tweenSettings)
        });
      }
    }
    return properties;
  }
  function normalizeTweenValues(tween, animatable) {
    var t2 = {};
    for (var p in tween) {
      var value = getFunctionValue(tween[p], animatable);
      if (is.arr(value)) {
        value = value.map(function(v) {
          return getFunctionValue(v, animatable);
        });
        if (value.length === 1) {
          value = value[0];
        }
      }
      t2[p] = value;
    }
    t2.duration = parseFloat(t2.duration);
    t2.delay = parseFloat(t2.delay);
    return t2;
  }
  function normalizeTweens(prop, animatable) {
    var previousTween;
    return prop.tweens.map(function(t2) {
      var tween = normalizeTweenValues(t2, animatable);
      var tweenValue = tween.value;
      var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
      var toUnit = getUnit(to);
      var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
      var previousValue = previousTween ? previousTween.to.original : originalValue;
      var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
      var fromUnit = getUnit(from) || getUnit(originalValue);
      var unit = toUnit || fromUnit;
      if (is.und(to)) {
        to = previousValue;
      }
      tween.from = decomposeValue(from, unit);
      tween.to = decomposeValue(getRelativeValue(to, from), unit);
      tween.start = previousTween ? previousTween.end : 0;
      tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
      tween.easing = parseEasings(tween.easing, tween.duration);
      tween.isPath = is.pth(tweenValue);
      tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
      tween.isColor = is.col(tween.from.original);
      if (tween.isColor) {
        tween.round = 1;
      }
      previousTween = tween;
      return tween;
    });
  }
  var setProgressValue = {
    css: function(t2, p, v) {
      return t2.style[p] = v;
    },
    attribute: function(t2, p, v) {
      return t2.setAttribute(p, v);
    },
    object: function(t2, p, v) {
      return t2[p] = v;
    },
    transform: function(t2, p, v, transforms, manual) {
      transforms.list.set(p, v);
      if (p === transforms.last || manual) {
        var str = "";
        transforms.list.forEach(function(value, prop) {
          str += prop + "(" + value + ") ";
        });
        t2.style.transform = str;
      }
    }
  };
  function setTargetsValue(targets, properties) {
    var animatables = getAnimatables(targets);
    animatables.forEach(function(animatable) {
      for (var property in properties) {
        var value = getFunctionValue(properties[property], animatable);
        var target = animatable.target;
        var valueUnit = getUnit(value);
        var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
        var unit = valueUnit || getUnit(originalValue);
        var to = getRelativeValue(validateValue(value, unit), originalValue);
        var animType = getAnimationType(target, property);
        setProgressValue[animType](target, property, to, animatable.transforms, true);
      }
    });
  }
  function createAnimation(animatable, prop) {
    var animType = getAnimationType(animatable.target, prop.name);
    if (animType) {
      var tweens = normalizeTweens(prop, animatable);
      var lastTween = tweens[tweens.length - 1];
      return {
        type: animType,
        property: prop.name,
        animatable,
        tweens,
        duration: lastTween.end,
        delay: tweens[0].delay,
        endDelay: lastTween.endDelay
      };
    }
  }
  function getAnimations(animatables, properties) {
    return filterArray(flattenArray(animatables.map(function(animatable) {
      return properties.map(function(prop) {
        return createAnimation(animatable, prop);
      });
    })), function(a) {
      return !is.und(a);
    });
  }
  function getInstanceTimings(animations, tweenSettings) {
    var animLength = animations.length;
    var getTlOffset = function(anim) {
      return anim.timelineOffset ? anim.timelineOffset : 0;
    };
    var timings = {};
    timings.duration = animLength ? Math.max.apply(Math, animations.map(function(anim) {
      return getTlOffset(anim) + anim.duration;
    })) : tweenSettings.duration;
    timings.delay = animLength ? Math.min.apply(Math, animations.map(function(anim) {
      return getTlOffset(anim) + anim.delay;
    })) : tweenSettings.delay;
    timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function(anim) {
      return getTlOffset(anim) + anim.duration - anim.endDelay;
    })) : tweenSettings.endDelay;
    return timings;
  }
  var instanceID = 0;
  function createNewInstance(params) {
    var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
    var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
    var properties = getProperties(tweenSettings, params);
    var animatables = getAnimatables(params.targets);
    var animations = getAnimations(animatables, properties);
    var timings = getInstanceTimings(animations, tweenSettings);
    var id = instanceID;
    instanceID++;
    return mergeObjects(instanceSettings, {
      id,
      children: [],
      animatables,
      animations,
      duration: timings.duration,
      delay: timings.delay,
      endDelay: timings.endDelay
    });
  }
  var activeInstances = [];
  var engine = function() {
    var raf2;
    function play() {
      if (!raf2 && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) {
        raf2 = requestAnimationFrame(step);
      }
    }
    function step(t2) {
      var activeInstancesLength = activeInstances.length;
      var i2 = 0;
      while (i2 < activeInstancesLength) {
        var activeInstance = activeInstances[i2];
        if (!activeInstance.paused) {
          activeInstance.tick(t2);
          i2++;
        } else {
          activeInstances.splice(i2, 1);
          activeInstancesLength--;
        }
      }
      raf2 = i2 > 0 ? requestAnimationFrame(step) : void 0;
    }
    function handleVisibilityChange() {
      if (!anime.suspendWhenDocumentHidden) {
        return;
      }
      if (isDocumentHidden()) {
        raf2 = cancelAnimationFrame(raf2);
      } else {
        activeInstances.forEach(
          function(instance) {
            return instance._onDocumentVisibility();
          }
        );
        engine();
      }
    }
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
    return play;
  }();
  function isDocumentHidden() {
    return !!document && document.hidden;
  }
  function anime(params) {
    if (params === void 0)
      params = {};
    var startTime = 0, lastTime = 0, now = 0;
    var children, childrenLength = 0;
    var resolve = null;
    function makePromise(instance2) {
      var promise2 = window.Promise && new Promise(function(_resolve) {
        return resolve = _resolve;
      });
      instance2.finished = promise2;
      return promise2;
    }
    var instance = createNewInstance(params);
    var promise = makePromise(instance);
    function toggleInstanceDirection() {
      var direction = instance.direction;
      if (direction !== "alternate") {
        instance.direction = direction !== "normal" ? "normal" : "reverse";
      }
      instance.reversed = !instance.reversed;
      children.forEach(function(child) {
        return child.reversed = instance.reversed;
      });
    }
    function adjustTime(time) {
      return instance.reversed ? instance.duration - time : time;
    }
    function resetTime() {
      startTime = 0;
      lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
    }
    function seekChild(time, child) {
      if (child) {
        child.seek(time - child.timelineOffset);
      }
    }
    function syncInstanceChildren(time) {
      if (!instance.reversePlayback) {
        for (var i2 = 0; i2 < childrenLength; i2++) {
          seekChild(time, children[i2]);
        }
      } else {
        for (var i$1 = childrenLength; i$1--; ) {
          seekChild(time, children[i$1]);
        }
      }
    }
    function setAnimationsProgress(insTime) {
      var i2 = 0;
      var animations = instance.animations;
      var animationsLength = animations.length;
      while (i2 < animationsLength) {
        var anim = animations[i2];
        var animatable = anim.animatable;
        var tweens = anim.tweens;
        var tweenLength = tweens.length - 1;
        var tween = tweens[tweenLength];
        if (tweenLength) {
          tween = filterArray(tweens, function(t2) {
            return insTime < t2.end;
          })[0] || tween;
        }
        var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
        var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
        var strings = tween.to.strings;
        var round = tween.round;
        var numbers = [];
        var toNumbersLength = tween.to.numbers.length;
        var progress = void 0;
        for (var n2 = 0; n2 < toNumbersLength; n2++) {
          var value = void 0;
          var toNumber = tween.to.numbers[n2];
          var fromNumber = tween.from.numbers[n2] || 0;
          if (!tween.isPath) {
            value = fromNumber + eased * (toNumber - fromNumber);
          } else {
            value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
          }
          if (round) {
            if (!(tween.isColor && n2 > 2)) {
              value = Math.round(value * round) / round;
            }
          }
          numbers.push(value);
        }
        var stringsLength = strings.length;
        if (!stringsLength) {
          progress = numbers[0];
        } else {
          progress = strings[0];
          for (var s2 = 0; s2 < stringsLength; s2++) {
            var a = strings[s2];
            var b = strings[s2 + 1];
            var n$1 = numbers[s2];
            if (!isNaN(n$1)) {
              if (!b) {
                progress += n$1 + " ";
              } else {
                progress += n$1 + b;
              }
            }
          }
        }
        setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
        anim.currentValue = progress;
        i2++;
      }
    }
    function setCallback(cb) {
      if (instance[cb] && !instance.passThrough) {
        instance[cb](instance);
      }
    }
    function countIteration() {
      if (instance.remaining && instance.remaining !== true) {
        instance.remaining--;
      }
    }
    function setInstanceProgress(engineTime) {
      var insDuration = instance.duration;
      var insDelay = instance.delay;
      var insEndDelay = insDuration - instance.endDelay;
      var insTime = adjustTime(engineTime);
      instance.progress = minMax(insTime / insDuration * 100, 0, 100);
      instance.reversePlayback = insTime < instance.currentTime;
      if (children) {
        syncInstanceChildren(insTime);
      }
      if (!instance.began && instance.currentTime > 0) {
        instance.began = true;
        setCallback("begin");
      }
      if (!instance.loopBegan && instance.currentTime > 0) {
        instance.loopBegan = true;
        setCallback("loopBegin");
      }
      if (insTime <= insDelay && instance.currentTime !== 0) {
        setAnimationsProgress(0);
      }
      if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) {
        setAnimationsProgress(insDuration);
      }
      if (insTime > insDelay && insTime < insEndDelay) {
        if (!instance.changeBegan) {
          instance.changeBegan = true;
          instance.changeCompleted = false;
          setCallback("changeBegin");
        }
        setCallback("change");
        setAnimationsProgress(insTime);
      } else {
        if (instance.changeBegan) {
          instance.changeCompleted = true;
          instance.changeBegan = false;
          setCallback("changeComplete");
        }
      }
      instance.currentTime = minMax(insTime, 0, insDuration);
      if (instance.began) {
        setCallback("update");
      }
      if (engineTime >= insDuration) {
        lastTime = 0;
        countIteration();
        if (!instance.remaining) {
          instance.paused = true;
          if (!instance.completed) {
            instance.completed = true;
            setCallback("loopComplete");
            setCallback("complete");
            if (!instance.passThrough && "Promise" in window) {
              resolve();
              promise = makePromise(instance);
            }
          }
        } else {
          startTime = now;
          setCallback("loopComplete");
          instance.loopBegan = false;
          if (instance.direction === "alternate") {
            toggleInstanceDirection();
          }
        }
      }
    }
    instance.reset = function() {
      var direction = instance.direction;
      instance.passThrough = false;
      instance.currentTime = 0;
      instance.progress = 0;
      instance.paused = true;
      instance.began = false;
      instance.loopBegan = false;
      instance.changeBegan = false;
      instance.completed = false;
      instance.changeCompleted = false;
      instance.reversePlayback = false;
      instance.reversed = direction === "reverse";
      instance.remaining = instance.loop;
      children = instance.children;
      childrenLength = children.length;
      for (var i2 = childrenLength; i2--; ) {
        instance.children[i2].reset();
      }
      if (instance.reversed && instance.loop !== true || direction === "alternate" && instance.loop === 1) {
        instance.remaining++;
      }
      setAnimationsProgress(instance.reversed ? instance.duration : 0);
    };
    instance._onDocumentVisibility = resetTime;
    instance.set = function(targets, properties) {
      setTargetsValue(targets, properties);
      return instance;
    };
    instance.tick = function(t2) {
      now = t2;
      if (!startTime) {
        startTime = now;
      }
      setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
    };
    instance.seek = function(time) {
      setInstanceProgress(adjustTime(time));
    };
    instance.pause = function() {
      instance.paused = true;
      resetTime();
    };
    instance.play = function() {
      if (!instance.paused) {
        return;
      }
      if (instance.completed) {
        instance.reset();
      }
      instance.paused = false;
      activeInstances.push(instance);
      resetTime();
      engine();
    };
    instance.reverse = function() {
      toggleInstanceDirection();
      instance.completed = instance.reversed ? false : true;
      resetTime();
    };
    instance.restart = function() {
      instance.reset();
      instance.play();
    };
    instance.remove = function(targets) {
      var targetsArray = parseTargets(targets);
      removeTargetsFromInstance(targetsArray, instance);
    };
    instance.reset();
    if (instance.autoplay) {
      instance.play();
    }
    return instance;
  }
  function removeTargetsFromAnimations(targetsArray, animations) {
    for (var a = animations.length; a--; ) {
      if (arrayContains(targetsArray, animations[a].animatable.target)) {
        animations.splice(a, 1);
      }
    }
  }
  function removeTargetsFromInstance(targetsArray, instance) {
    var animations = instance.animations;
    var children = instance.children;
    removeTargetsFromAnimations(targetsArray, animations);
    for (var c = children.length; c--; ) {
      var child = children[c];
      var childAnimations = child.animations;
      removeTargetsFromAnimations(targetsArray, childAnimations);
      if (!childAnimations.length && !child.children.length) {
        children.splice(c, 1);
      }
    }
    if (!animations.length && !children.length) {
      instance.pause();
    }
  }
  function removeTargetsFromActiveInstances(targets) {
    var targetsArray = parseTargets(targets);
    for (var i2 = activeInstances.length; i2--; ) {
      var instance = activeInstances[i2];
      removeTargetsFromInstance(targetsArray, instance);
    }
  }
  function stagger(val, params) {
    if (params === void 0)
      params = {};
    var direction = params.direction || "normal";
    var easing = params.easing ? parseEasings(params.easing) : null;
    var grid = params.grid;
    var axis = params.axis;
    var fromIndex = params.from || 0;
    var fromFirst = fromIndex === "first";
    var fromCenter = fromIndex === "center";
    var fromLast = fromIndex === "last";
    var isRange = is.arr(val);
    var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
    var val2 = isRange ? parseFloat(val[1]) : 0;
    var unit = getUnit(isRange ? val[1] : val) || 0;
    var start = params.start || 0 + (isRange ? val1 : 0);
    var values = [];
    var maxValue = 0;
    return function(el, i2, t2) {
      if (fromFirst) {
        fromIndex = 0;
      }
      if (fromCenter) {
        fromIndex = (t2 - 1) / 2;
      }
      if (fromLast) {
        fromIndex = t2 - 1;
      }
      if (!values.length) {
        for (var index2 = 0; index2 < t2; index2++) {
          if (!grid) {
            values.push(Math.abs(fromIndex - index2));
          } else {
            var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
            var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
            var toX = index2 % grid[0];
            var toY = Math.floor(index2 / grid[0]);
            var distanceX = fromX - toX;
            var distanceY = fromY - toY;
            var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (axis === "x") {
              value = -distanceX;
            }
            if (axis === "y") {
              value = -distanceY;
            }
            values.push(value);
          }
          maxValue = Math.max.apply(Math, values);
        }
        if (easing) {
          values = values.map(function(val3) {
            return easing(val3 / maxValue) * maxValue;
          });
        }
        if (direction === "reverse") {
          values = values.map(function(val3) {
            return axis ? val3 < 0 ? val3 * -1 : -val3 : Math.abs(maxValue - val3);
          });
        }
      }
      var spacing = isRange ? (val2 - val1) / maxValue : val1;
      return start + spacing * (Math.round(values[i2] * 100) / 100) + unit;
    };
  }
  function timeline(params) {
    if (params === void 0)
      params = {};
    var tl2 = anime(params);
    tl2.duration = 0;
    tl2.add = function(instanceParams, timelineOffset) {
      var tlIndex = activeInstances.indexOf(tl2);
      var children = tl2.children;
      if (tlIndex > -1) {
        activeInstances.splice(tlIndex, 1);
      }
      function passThrough(ins2) {
        ins2.passThrough = true;
      }
      for (var i2 = 0; i2 < children.length; i2++) {
        passThrough(children[i2]);
      }
      var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
      insParams.targets = insParams.targets || params.targets;
      var tlDuration = tl2.duration;
      insParams.autoplay = false;
      insParams.direction = tl2.direction;
      insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
      passThrough(tl2);
      tl2.seek(insParams.timelineOffset);
      var ins = anime(insParams);
      passThrough(ins);
      children.push(ins);
      var timings = getInstanceTimings(children, params);
      tl2.delay = timings.delay;
      tl2.endDelay = timings.endDelay;
      tl2.duration = timings.duration;
      tl2.seek(0);
      tl2.reset();
      if (tl2.autoplay) {
        tl2.play();
      }
      return tl2;
    };
    return tl2;
  }
  anime.version = "3.2.1";
  anime.speed = 1;
  anime.suspendWhenDocumentHidden = true;
  anime.running = activeInstances;
  anime.remove = removeTargetsFromActiveInstances;
  anime.get = getOriginalTargetValue;
  anime.set = setTargetsValue;
  anime.convertPx = convertPxToUnit;
  anime.path = getPath;
  anime.setDashoffset = setDashoffset;
  anime.stagger = stagger;
  anime.timeline = timeline;
  anime.easing = parseEasings;
  anime.penner = penner;
  anime.random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var anime_es_default = anime;

  // js/onscroll.js
  var duration = 1500;
  var tl = anime_es_default.timeline({
    easing: "easeInOutCubic",
    duration
  });
  tl.add({
    targets: "h1 span:first-child",
    translateY: ["-50%", "0%"],
    opacity: [0, 1]
  }).add(
    {
      targets: "h1 span:last-child",
      translateY: ["-50%", "0%"],
      opacity: [0, 1]
    },
    "-=500"
  ).add(
    {
      targets: [".burger-wrapper", ".chevron-container"],
      opacity: [0, 1]
    },
    "-=500"
  );
  var slideInElements = qsa(".benefit, .technology, .quote-wrapper");
  var observer = new IntersectionObserver(
    (entries, observer2) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime_es_default({
            targets: entry.target,
            translateY: ["-20%", "0%"],
            opacity: [0, 1],
            duration
          });
          observer2.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "-10%" }
  );
  slideInElements.forEach((toAnimate) => {
    observer.observe(toAnimate);
  });

  // js/index.js
  var lenis = new r({
    smoothWheel: true,
    lerp: 0.09
  });
  var raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  if (window.versions) {
    qs("[data-node]").textContent = `Node v${window.versions.node()}`;
    qs("[data-chrome]").textContent = `Chrome v${window.versions.chrome()}`;
    qs("[data-electron]").textContent = `Electron v${window.versions.electron()}`;
  }
  [qs(".burger-wrapper"), ...qsa("nav#menu a")].forEach((toggler) => {
    toggler.addEventListener("click", () => {
      if (document.body.classList.contains("checked")) {
        document.body.classList.remove("checked");
        lenis.start();
      } else {
        document.body.classList.add("checked");
        lenis.stop();
      }
    });
  });
  qsa('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      lenis.scrollTo(link.hash, {
        duration: 2
      });
    });
  });
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./serviceWorker.js");
  }
})();
/*! Bundled license information:

@mojs/core/dist/mo.umd.js:
  (*!
    @mojs/core – The motion graphics toolbelt for the web
    Oleg Solomka @legomushroom 2023 MIT
    1.6.0
  *)
*/
