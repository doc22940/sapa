import { uuid } from "./functions/func";

export class EventChecker {
  constructor(value, split = CHECK_SAPARATOR) {
    this.value = value;
    this.split = split;
  }

  toString() {
    return ` ${this.split} ` + this.value;
  }
}

export class EventAfterRunner {
  constructor(value, split = CHECK_SAPARATOR) {
    this.value = value;
    this.split = split;
  }

  toString() {
    return ` ${this.split} after(${this.value})`;
  }
}

export class EventBeforeRunner {
  constructor(value, split = CHECK_SAPARATOR) {
    this.value = value;
    this.split = split;
  }

  toString() {
    return ` ${this.split} before(${this.value})`;
  }
}

// event name regular expression
export const CHECK_LOAD_PATTERN = /^load (.*)/gi;
export const CHECK_BIND_PATTERN = /^bind (.*)/gi;

const CHECK_CLICK_PATTERN = "click|dblclick";
const CHECK_MOUSE_PATTERN = "mouse(down|up|move|over|out|enter|leave)";
const CHECK_POINTER_PATTERN = "pointer(start|move|end)";
const CHECK_TOUCH_PATTERN = "touch(start|move|end)";
const CHECK_KEY_PATTERN = "key(down|up|press)";
const CHECK_DRAGDROP_PATTERN =
  "drag|drop|drag(start|over|enter|leave|exit|end)";
const CHECK_CONTEXT_PATTERN = "contextmenu";
const CHECK_INPUT_PATTERN = "change|input|focus|blur|focus(in|out)";
const CHECK_CLIPBOARD_PATTERN = "paste";
const CHECK_BEHAVIOR_PATTERN = "resize|scroll|wheel|mousewheel|DOMMouseScroll";
const CHECK_FORM_PATTERN = "submit";

const CHECK_PATTERN_LIST = [
  CHECK_CLICK_PATTERN,
  CHECK_MOUSE_PATTERN,
  CHECK_POINTER_PATTERN,
  CHECK_TOUCH_PATTERN,
  CHECK_KEY_PATTERN,
  CHECK_DRAGDROP_PATTERN,
  CHECK_CONTEXT_PATTERN,
  CHECK_INPUT_PATTERN,
  CHECK_CLIPBOARD_PATTERN,
  CHECK_BEHAVIOR_PATTERN,
  CHECK_FORM_PATTERN
].join("|");

export const CHECK_PATTERN = new RegExp(`^(${CHECK_PATTERN_LIST}\s)`, "ig");

export const NAME_SAPARATOR = ":";
export const CHECK_SAPARATOR = "|";
export const LOAD_SAPARATOR = "load ";
export const BIND_SAPARATOR = "bind ";
export const SAPARATOR = ' ';

// 임의의 값을 저장하기 위한 구조
// 임의의 값은 하나의 id 로 만들어지고 id 를 조회 할 때  값으로 다시 치환
const refManager = {};

const DOM_EVENT_MAKE = (...keys) => {
  var key = keys.join(NAME_SAPARATOR);
  return (...args) => {
    return [key, ...args].join(SAPARATOR);
  };
};

export const CUSTOM = DOM_EVENT_MAKE;

export const CLICK = DOM_EVENT_MAKE("click");
export const DOUBLECLICK = DOM_EVENT_MAKE("dblclick");
export const MOUSEDOWN = DOM_EVENT_MAKE("mousedown");
export const MOUSEUP = DOM_EVENT_MAKE("mouseup");
export const MOUSEMOVE = DOM_EVENT_MAKE("mousemove");
export const MOUSEOVER = DOM_EVENT_MAKE("mouseover");
export const MOUSEOUT = DOM_EVENT_MAKE("mouseout");
export const MOUSEENTER = DOM_EVENT_MAKE("mouseenter");
export const MOUSELEAVE = DOM_EVENT_MAKE("mouseleave");
export const TOUCHSTART = DOM_EVENT_MAKE("touchstart");
export const TOUCHMOVE = DOM_EVENT_MAKE("touchmove");
export const TOUCHEND = DOM_EVENT_MAKE("touchend");
export const KEYDOWN = DOM_EVENT_MAKE("keydown");
export const KEYUP = DOM_EVENT_MAKE("keyup");
export const KEYPRESS = DOM_EVENT_MAKE("keypress");
export const DRAG = DOM_EVENT_MAKE("drag");
export const DRAGSTART = DOM_EVENT_MAKE("dragstart");
export const DROP = DOM_EVENT_MAKE("drop");
export const DRAGOVER = DOM_EVENT_MAKE("dragover");
export const DRAGENTER = DOM_EVENT_MAKE("dragenter");
export const DRAGLEAVE = DOM_EVENT_MAKE("dragleave");
export const DRAGEXIT = DOM_EVENT_MAKE("dragexit");
export const DRAGOUT = DOM_EVENT_MAKE("dragout");
export const DRAGEND = DOM_EVENT_MAKE("dragend");
export const CONTEXTMENU = DOM_EVENT_MAKE("contextmenu");
export const CHANGE = DOM_EVENT_MAKE("change");
export const INPUT = DOM_EVENT_MAKE("input");
export const FOCUS = DOM_EVENT_MAKE("focus");
export const FOCUSIN = DOM_EVENT_MAKE("focusin");
export const FOCUSOUT = DOM_EVENT_MAKE("focusout");
export const BLUR = DOM_EVENT_MAKE("blur");
export const PASTE = DOM_EVENT_MAKE("paste");
export const RESIZE = DOM_EVENT_MAKE("resize");
export const SCROLL = DOM_EVENT_MAKE("scroll");
export const SUBMIT = DOM_EVENT_MAKE("submit");
export const POINTERSTART = CUSTOM("mousedown", "touchstart");
export const POINTERMOVE = CUSTOM("mousemove", "touchmove");
export const POINTEREND = CUSTOM("mouseup", "touchend");
export const CHANGEINPUT = CUSTOM("change", "input");
export const WHEEL = CUSTOM("wheel", "mousewheel", "DOMMouseScroll");

// Predefined CHECKER
export const CHECKER = (value, split = CHECK_SAPARATOR) => new EventChecker(value, split)
export const AFTER = (value, split = CHECK_SAPARATOR) => new EventAfterRunner(value, split)
export const BEFORE = (value, split = CHECK_SAPARATOR) => new EventBeforeRunner(value, split)

export const IF = CHECKER;

export const ARROW_UP = CHECKER('ArrowUp');
export const ARROW_DOWN = CHECKER('ArrowDown');
export const ARROW_LEFT = CHECKER('ArrowLeft');
export const ARROW_RIGHT = CHECKER('ArrowRight');
export const ENTER = CHECKER('Enter');
export const SPACE = CHECKER('Space');

export const ALT = CHECKER("isAltKey");
export const SHIFT = CHECKER("isShiftKey");
export const META = CHECKER("isMetaKey");
export const CONTROL = CHECKER("isCtrlKey");
export const SELF = CHECKER("self");

// event config method
export const DEBOUNCE = (t = 100) => CHECKER(`debounce(${t})`)
export const THROTTLE = (t = 100) => CHECKER(`throttle(${t})`)
export const CAPTURE = CHECKER("capture()");

// event config method

// before method

// after method
export const MOVE = (method = "move") => AFTER(`bodyMouseMove ${method}`)
export const END = (method = "end") => AFTER(`bodyMouseUp ${method}`)

export const PREVENT = AFTER(`preventDefault`);
export const STOP = AFTER(`stopPropagation`);

export const createRef = value => {
  if (value === '') return '';

  var id = uuid();
  refManager[id] = value;

  return id;
};

export const getRef = id => refManager[id] || ''

export const BIND_CHECK_FUNCTION = field => {
  return function() {
    return this.prevState[field] != this.state[field];
  };
};

export const BIND_CHECK_DEFAULT_FUNCTION = () => true

// Predefined LOADER
export const LOAD = (value = "$el") => LOAD_SAPARATOR + value
export const BIND = (value = "$el", checkFieldOrCallback = '') => {
  return (
    BIND_SAPARATOR + value + ( 
      checkFieldOrCallback ?  CHECK_SAPARATOR + createRef(checkFieldOrCallback) : '' 
    ) 
  );
};

export const Event = {
  addEvent(dom, eventName, callback, useCapture = false) {
    if (dom) {
      dom.addEventListener(eventName, callback, useCapture);
    }
  },

  removeEvent(dom, eventName, callback) {
    if (dom) {
      dom.removeEventListener(eventName, callback);
    }
  },

  pos(e) {
    if (e.touches && e.touches[0]) {
      return e.touches[0];
    }

    return e;
  },

  posXY(e) {
    var pos = this.pos(e);
    return {
      x: pos.pageX,
      y: pos.pageY
    };
  }
};
