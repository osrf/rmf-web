var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
import Vibrant from 'node-vibrant';
import React from 'react';
import { robotHash } from './robots';
function _hash(s) {
  return __awaiter(this, void 0, void 0, function () {
    var encoder, data;
    return __generator(this, function (_a) {
      encoder = new TextEncoder();
      data = encoder.encode(s);
      return [2 /*return*/, crypto.subtle.digest('SHA-256', data)];
    });
  });
}
var ColorManager = /** @class */ (function () {
  function ColorManager() {
    this.conflictHighlight = '#f44336';
    this._robotColorCache = {};
  }
  ColorManager.prototype.robotPrimaryColor = function (fleet, name, model, image) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var key, _b, _c, palette, rgb, colorHolder, e_1;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            key = robotHash(name, fleet);
            if (this._robotColorCache[key]) {
              return [2 /*return*/, this._robotColorCache[key]];
            }
            if (!!image) return [3 /*break*/, 2];
            _b = this._robotColorCache;
            _c = key;
            return [4 /*yield*/, this._robotColorFromId(fleet, name, model)];
          case 1:
            _b[_c] = _d.sent();
            return [2 /*return*/, this._robotColorCache[key]];
          case 2:
            _d.trys.push([2, 4, , 5]);
            return [4 /*yield*/, Vibrant.from(image).getSwatches()];
          case 3:
            palette = _d.sent();
            rgb = (_a = palette.Vibrant) === null || _a === void 0 ? void 0 : _a.getRgb();
            if (rgb) {
              colorHolder = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
              this._robotColorCache[key] = colorHolder;
              return [2 /*return*/, colorHolder];
            }
            return [3 /*break*/, 5];
          case 4:
            e_1 = _d.sent();
            console.warn(
              'unable to get color from image, falling back to color from id (' + e_1.message + ')',
            );
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/, this.robotPrimaryColor(fleet, name, model)];
        }
      });
    });
  };
  ColorManager.prototype.robotColorFromCache = function (fleet, name) {
    var key = robotHash(name, fleet);
    return this._robotColorCache[key] ? this._robotColorCache[key] : null;
  };
  // Gets a light color different than red
  ColorManager._getLightColor = function (firstNumber, secondNumber) {
    // Hue is a degree on the color wheel from 0 to 360. 0 is red, 120 is green, 240 is blue.
    // keep it within a range of 50-270 to prevent red like colors
    var hue = 50 + (firstNumber % 220);
    var satlum = secondNumber % 2500;
    // Saturation is a percentage value; 0% means a shade of gray and 100% is the full color.
    var saturation = 50 + (satlum % 50);
    // Lightness is also a percentage; 0% is black, 100% is white.
    var luminance = 25 + satlum / 50;
    return 'hsl(' + hue + ', ' + saturation + '%, ' + luminance + '%)';
  };
  ColorManager.prototype._robotColorFromId = function (fleet, name, model) {
    return __awaiter(this, void 0, void 0, function () {
      var modelHash, _a, nameHash, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _a = Uint16Array.bind;
            return [4 /*yield*/, _hash(model)];
          case 1:
            modelHash = new (_a.apply(Uint16Array, [void 0, _c.sent()]))();
            _b = Uint16Array.bind;
            return [4 /*yield*/, _hash(name)];
          case 2:
            nameHash = new (_b.apply(Uint16Array, [void 0, _c.sent()]))();
            return [2 /*return*/, ColorManager._getLightColor(modelHash[0], nameHash[0])];
        }
      });
    });
  };
  return ColorManager;
})();
export { ColorManager };
export default ColorManager;
export var ColorContext = React.createContext(new ColorManager());
