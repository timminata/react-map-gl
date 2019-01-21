import {document} from './globals';

const key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5
};

const webkit = [
  'webkitFullscreenEnabled',
  'webkitFullscreenElement',
  'webkitRequestFullscreen',
  'webkitExitFullscreen',
  'webkitfullscreenchange',
  'webkitfullscreenerror'
];

const moz = [
  'mozFullScreenEnabled',
  'mozFullScreenElement',
  'mozRequestFullScreen',
  'mozCancelFullScreen',
  'mozfullscreenchange',
  'mozfullscreenerror'
];

const ms = [
  'msFullscreenEnabled',
  'msFullscreenElement',
  'msRequestFullscreen',
  'msExitFullscreen',
  // Microsoft Edge and beyond
  'fullscreenChange',
  'fullscreenError'
];

/*
 * Fullscreen API with different vendor supported
 */
export default class Fullscreen {
  constructor() {
    this._vendor = (
      ('fullscreenEnabled' in document && Object.keys(key)) ||
      (webkit[0] in document && webkit) ||
      (moz[0] in document && moz) ||
      (ms[0] in document && ms) ||
      []
    );
  }

  addEventListener = (type, handler, options) => {
    const functionType = this._vendor[key[type]];
    document.addEventListener(functionType, handler, options);
  };

  removeEventListener = (type, handler, options) => {
    const functionType = this._vendor[key[type]];
    document.removeEventListener(functionType, handler, options);
  };

  requestFullscreen = (element) => {
    const functionType = this._vendor[key.requestFullscreen];
    return element[functionType]();
  };

  exitFullscreen = () => {
    const functionType = this._vendor[key.exitFullscreen];
    return document[functionType]();
  };

  toggleFullscreen = (element) => {
    if (this.isFullscreen) {
      return this.exitFullscreen();
    }
    return this.requestFullscreen(element);
  };

  get isFullscreen() {
    return Boolean(this.fullscreenElement);
  }

  get fullscreenEnabled() {
    const functionType = this._vendor[key.fullscreenEnabled];
    return Boolean(document[functionType]);
  }

  get fullscreenElement() {
    const functionType = this._vendor[key.fullscreenElement];
    return document[functionType];
  }

  get onfullscreenchange() {
    const functionType = this._vendor[key.fullscreenchange];
    return document[functionType];
  }

  set onfullscreenchange(handler) {
    const functionType = this._vendor[key.fullscreenchange];
    document[functionType] = handler;
  }

  get onfullscreenerror() {
    const functionType = this._vendor[key.fullscreenerror];
    return document[functionType];
  }

  set onfullscreenerror(handler) {
    const functionType = this._vendor[key.fullscreenerror];
    document[functionType] = handler;
  }
}
