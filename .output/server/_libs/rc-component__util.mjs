import { r as reactExports, a as React, R as React$1 } from "./react.mjs";
import { r as reactIsExports } from "./react-is.mjs";
import { c as clientExports } from "./react-dom.mjs";
function useEvent(callback) {
  const fnRef = reactExports.useRef(callback);
  fnRef.current = callback;
  const memoFn = reactExports.useCallback((...args) => fnRef.current?.(...args), []);
  return memoFn;
}
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
const useInternalLayoutEffect = canUseDom() ? reactExports.useLayoutEffect : reactExports.useEffect;
const useLayoutEffect = (callback, deps) => {
  const firstMountRef = reactExports.useRef(true);
  useInternalLayoutEffect(() => {
    return callback(firstMountRef.current);
  }, deps);
  useInternalLayoutEffect(() => {
    firstMountRef.current = false;
    return () => {
      firstMountRef.current = true;
    };
  }, []);
};
const useSafeState = (defaultValue) => {
  const destroyRef = reactExports.useRef(false);
  const [value, setValue] = reactExports.useState(defaultValue);
  reactExports.useEffect(() => {
    destroyRef.current = false;
    return () => {
      destroyRef.current = true;
    };
  }, []);
  function safeSetState(updater, ignoreDestroy) {
    if (ignoreDestroy && destroyRef.current) {
      return;
    }
    setValue(updater);
  }
  return [value, safeSetState];
};
function useControlledState(defaultStateValue, value) {
  const [innerValue, setInnerValue] = reactExports.useState(defaultStateValue);
  const mergedValue = value !== void 0 ? value : innerValue;
  useLayoutEffect((mount) => {
    if (!mount) {
      setInnerValue(value);
    }
  }, [value]);
  return [
    // Value
    mergedValue,
    // Update function
    setInnerValue
  ];
}
function useMemo(getValue, condition, shouldUpdate) {
  const cacheRef = reactExports.useRef({});
  if (!("value" in cacheRef.current) || shouldUpdate(cacheRef.current.condition, condition)) {
    cacheRef.current.value = getValue();
    cacheRef.current.condition = condition;
  }
  return cacheRef.current.value;
}
const REACT_ELEMENT_TYPE_18 = /* @__PURE__ */ Symbol.for("react.element");
const REACT_ELEMENT_TYPE_19 = /* @__PURE__ */ Symbol.for("react.transitional.element");
const REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
function isFragment(object) {
  return (
    // Base object type
    object && typeof object === "object" && // React Element type
    (object.$$typeof === REACT_ELEMENT_TYPE_18 || object.$$typeof === REACT_ELEMENT_TYPE_19) && // React Fragment type
    object.type === REACT_FRAGMENT_TYPE
  );
}
const ReactMajorVersion = Number(reactExports.version.split(".")[0]);
const fillRef = (ref, node) => {
  if (typeof ref === "function") {
    ref(node);
  } else if (typeof ref === "object" && ref && "current" in ref) {
    ref.current = node;
  }
};
const composeRef = (...refs) => {
  const refList = refs.filter(Boolean);
  if (refList.length <= 1) {
    return refList[0];
  }
  return (node) => {
    refs.forEach((ref) => {
      fillRef(ref, node);
    });
  };
};
const useComposeRef = (...refs) => {
  return useMemo(
    () => composeRef(...refs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
    (prev, next) => prev.length !== next.length || prev.every((ref, i) => ref !== next[i])
  );
};
const supportRef = (nodeOrComponent) => {
  if (!nodeOrComponent) {
    return false;
  }
  if (isReactElement(nodeOrComponent) && ReactMajorVersion >= 19) {
    return true;
  }
  const type = reactIsExports.isMemo(nodeOrComponent) ? nodeOrComponent.type.type : nodeOrComponent.type;
  if (typeof type === "function" && !type.prototype?.render && type.$$typeof !== reactIsExports.ForwardRef) {
    return false;
  }
  if (typeof nodeOrComponent === "function" && !nodeOrComponent.prototype?.render && nodeOrComponent.$$typeof !== reactIsExports.ForwardRef) {
    return false;
  }
  return true;
};
function isReactElement(node) {
  return /* @__PURE__ */ reactExports.isValidElement(node) && !isFragment(node);
}
const getNodeRef = (node) => {
  if (node && isReactElement(node)) {
    const ele = node;
    return ele.props.propertyIsEnumerable("ref") ? ele.props.ref : ele.ref;
  }
  return null;
};
function get(entity, path) {
  let current = entity;
  for (let i = 0; i < path.length; i += 1) {
    if (current === null || current === void 0) {
      return void 0;
    }
    current = current[path[i]];
  }
  return current;
}
function internalSet(entity, paths, value, removeIfUndefined) {
  if (!paths.length) {
    return value;
  }
  const [path, ...restPath] = paths;
  let clone;
  if (!entity && typeof path === "number") {
    clone = [];
  } else if (Array.isArray(entity)) {
    clone = [...entity];
  } else {
    clone = {
      ...entity
    };
  }
  if (removeIfUndefined && value === void 0 && restPath.length === 1) {
    delete clone[path][restPath[0]];
  } else {
    clone[path] = internalSet(clone[path], restPath, value, removeIfUndefined);
  }
  return clone;
}
function set(entity, paths, value, removeIfUndefined = false) {
  if (paths.length && removeIfUndefined && value === void 0 && !get(entity, paths.slice(0, -1))) {
    return entity;
  }
  return internalSet(entity, paths, value, removeIfUndefined);
}
function isObject(obj) {
  return typeof obj === "object" && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
}
function createEmpty(source) {
  return Array.isArray(source) ? [] : {};
}
const keys = typeof Reflect === "undefined" ? Object.keys : Reflect.ownKeys;
function mergeWith(sources, config = {}) {
  const {
    prepareArray
  } = config;
  const finalPrepareArray = prepareArray || (() => []);
  let clone = createEmpty(sources[0]);
  sources.forEach((src) => {
    function internalMerge(path, parentLoopSet) {
      const loopSet = new Set(parentLoopSet);
      const value = get(src, path);
      const isArr = Array.isArray(value);
      if (isArr || isObject(value)) {
        if (!loopSet.has(value)) {
          loopSet.add(value);
          const originValue = get(clone, path);
          if (isArr) {
            clone = set(clone, path, finalPrepareArray(originValue, value));
          } else if (!originValue || typeof originValue !== "object") {
            clone = set(clone, path, createEmpty(value));
          }
          keys(value).forEach((key) => {
            if (Object.getOwnPropertyDescriptor(value, key).enumerable) {
              internalMerge([...path, key], loopSet);
            }
          });
        }
      } else {
        clone = set(clone, path, value);
      }
    }
    internalMerge([]);
  });
  return clone;
}
function merge(...sources) {
  return mergeWith(sources);
}
let warned = {};
const preMessage = (fn) => {
};
function warning(valid, message) {
}
function note(valid, message) {
}
function resetWarned() {
  warned = {};
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning, valid, message);
}
function noteOnce(valid, message) {
  call(note, valid, message);
}
warningOnce.preMessage = preMessage;
warningOnce.resetWarned = resetWarned;
warningOnce.noteOnce = noteOnce;
function omit(obj, fields) {
  const clone = Object.assign({}, obj);
  if (Array.isArray(fields)) {
    fields.forEach((key) => {
      delete clone[key];
    });
  }
  return clone;
}
function toArray(children, option = {}) {
  let ret = [];
  React.Children.forEach(children, (child) => {
    if ((child === void 0 || child === null) && !option.keepEmpty) {
      return;
    }
    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });
  return ret;
}
function isDOM(node) {
  return node instanceof HTMLElement || node instanceof SVGElement;
}
function getDOM(node) {
  if (node && typeof node === "object" && isDOM(node.nativeElement)) {
    return node.nativeElement;
  }
  if (isDOM(node)) {
    return node;
  }
  return null;
}
let raf = (callback) => +setTimeout(callback, 16);
let caf = (num) => clearTimeout(num);
if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
  raf = (callback) => window.requestAnimationFrame(callback);
  caf = (handle) => window.cancelAnimationFrame(handle);
}
let rafUUID = 0;
const rafIds = /* @__PURE__ */ new Map();
function cleanup(id) {
  rafIds.delete(id);
}
const wrapperRaf = (callback, times = 1) => {
  rafUUID += 1;
  const id = rafUUID;
  function callRef(leftTimes) {
    if (leftTimes === 0) {
      cleanup(id);
      callback();
    } else {
      const realId = raf(() => {
        callRef(leftTimes - 1);
      });
      rafIds.set(id, realId);
    }
  }
  callRef(times);
  return id;
};
wrapperRaf.cancel = (id) => {
  const realId = rafIds.get(id);
  cleanup(id);
  return caf(realId);
};
function contains(root, n) {
  if (!root) {
    return false;
  }
  if (root.contains) {
    return root.contains(n);
  }
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
const APPEND_ORDER = "data-rc-order";
const APPEND_PRIORITY = "data-rc-priority";
const MARK_KEY = `rc-util-key`;
const containerCache = /* @__PURE__ */ new Map();
function getMark({
  mark
} = {}) {
  if (mark) {
    return mark.startsWith("data-") ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  const head = document.querySelector("head");
  return head || document.body;
}
function getOrder(prepend) {
  if (prepend === "queue") {
    return "prependQueue";
  }
  return prepend ? "prepend" : "append";
}
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter((node) => node.tagName === "STYLE");
}
function injectCSS(css, option = {}) {
  if (!canUseDom()) {
    return null;
  }
  const {
    csp,
    prepend,
    priority = 0
  } = option;
  const mergedOrder = getOrder(prepend);
  const isPrependQueue = mergedOrder === "prependQueue";
  const styleNode = document.createElement("style");
  styleNode.setAttribute(APPEND_ORDER, mergedOrder);
  if (isPrependQueue && priority) {
    styleNode.setAttribute(APPEND_PRIORITY, `${priority}`);
  }
  if (csp?.nonce) {
    styleNode.nonce = csp?.nonce;
  }
  styleNode.innerHTML = css;
  const container = getContainer(option);
  const {
    firstChild
  } = container;
  if (prepend) {
    if (isPrependQueue) {
      const existStyle = (option.styles || findStyles(container)).filter((node) => {
        if (!["prepend", "prependQueue"].includes(node.getAttribute(APPEND_ORDER))) {
          return false;
        }
        const nodePriority = Number(node.getAttribute(APPEND_PRIORITY) || 0);
        return priority >= nodePriority;
      });
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
        return styleNode;
      }
    }
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
function findExistNode(key, option = {}) {
  let {
    styles
  } = option;
  styles ||= findStyles(getContainer(option));
  return styles.find((node) => node.getAttribute(getMark(option)) === key);
}
function removeCSS(key, option = {}) {
  const existNode = findExistNode(key, option);
  if (existNode) {
    const container = getContainer(option);
    container.removeChild(existNode);
  }
}
function syncRealContainer(container, option) {
  const cachedRealContainer = containerCache.get(container);
  if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
    const placeholderStyle = injectCSS("", option);
    const {
      parentNode
    } = placeholderStyle;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}
function updateCSS(css, key, originOption = {}) {
  const container = getContainer(originOption);
  const styles = findStyles(container);
  const option = {
    ...originOption,
    styles
  };
  syncRealContainer(container, option);
  const existNode = findExistNode(key, option);
  if (existNode) {
    if (option.csp?.nonce && existNode.nonce !== option.csp?.nonce) {
      existNode.nonce = option.csp?.nonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  const newNode = injectCSS(css, option);
  newNode.setAttribute(getMark(option), key);
  return newNode;
}
function isEqual(obj1, obj2, shallow = false) {
  const refSet = /* @__PURE__ */ new Set();
  function deepEqual(a, b, level = 1) {
    const circular = refSet.has(a);
    warningOnce(!circular, "Warning: There may be circular references");
    if (circular) {
      return false;
    }
    if (a === b) {
      return true;
    }
    if (shallow && level > 1) {
      return false;
    }
    refSet.add(a);
    const newLevel = level + 1;
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i], newLevel)) {
          return false;
        }
      }
      return true;
    }
    if (a && b && typeof a === "object" && typeof b === "object") {
      const keys2 = Object.keys(a);
      if (keys2.length !== Object.keys(b).length) {
        return false;
      }
      return keys2.every((key) => deepEqual(a[key], b[key], newLevel));
    }
    return false;
  }
  return deepEqual(obj1, obj2);
}
function getRoot(ele) {
  return ele?.getRootNode?.();
}
function inShadow(ele) {
  return getRoot(ele) instanceof ShadowRoot;
}
function getShadowRoot(ele) {
  return inShadow(ele) ? getRoot(ele) : null;
}
function useSyncState(defaultValue) {
  const [, forceUpdate] = reactExports.useReducer((x) => x + 1, 0);
  const currentValueRef = reactExports.useRef(defaultValue);
  const getValue = useEvent(() => {
    return currentValueRef.current;
  });
  const setValue = useEvent((updater) => {
    currentValueRef.current = typeof updater === "function" ? updater(currentValueRef.current) : updater;
    forceUpdate();
  });
  return [getValue, setValue];
}
const attributes = `accept acceptCharset accessKey action allowFullScreen allowTransparency
    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
    charSet checked classID className colSpan cols content contentEditable contextMenu
    controls coords crossOrigin data dateTime default defer dir disabled download draggable
    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity
    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media
    mediaGroup method min minLength multiple muted name noValidate nonce open
    optimum pattern placeholder poster preload radioGroup readOnly rel required
    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected
    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style
    summary tabIndex target title type useMap value width wmode wrap`;
const eventsName = `onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`;
const propList = `${attributes} ${eventsName}`.split(/[\s\n]+/);
const ariaPrefix = "aria-";
const dataPrefix = "data-";
function match(key, prefix) {
  return key.indexOf(prefix) === 0;
}
function pickAttrs(props, ariaOnly = false) {
  let mergedConfig;
  if (ariaOnly === false) {
    mergedConfig = {
      aria: true,
      data: true,
      attr: true
    };
  } else if (ariaOnly === true) {
    mergedConfig = {
      aria: true
    };
  } else {
    mergedConfig = {
      ...ariaOnly
    };
  }
  const attrs = {};
  Object.keys(props).forEach((key) => {
    if (
      // Aria
      mergedConfig.aria && (key === "role" || match(key, ariaPrefix)) || // Data
      mergedConfig.data && match(key, dataPrefix) || // Attr
      mergedConfig.attr && propList.includes(key)
    ) {
      attrs[key] = props[key];
    }
  });
  return attrs;
}
function measureScrollbarSize(ele) {
  const randomId = `rc-scrollbar-measure-${Math.random().toString(36).substring(7)}`;
  const measureEle = document.createElement("div");
  measureEle.id = randomId;
  const measureStyle = measureEle.style;
  measureStyle.position = "absolute";
  measureStyle.left = "0";
  measureStyle.top = "0";
  measureStyle.width = "100px";
  measureStyle.height = "100px";
  measureStyle.overflow = "scroll";
  let fallbackWidth;
  let fallbackHeight;
  if (ele) {
    const targetStyle = getComputedStyle(ele);
    measureStyle.scrollbarColor = targetStyle.scrollbarColor;
    measureStyle.scrollbarWidth = targetStyle.scrollbarWidth;
    const webkitScrollbarStyle = getComputedStyle(ele, "::-webkit-scrollbar");
    const width = parseInt(webkitScrollbarStyle.width, 10);
    const height = parseInt(webkitScrollbarStyle.height, 10);
    try {
      const widthStyle = width ? `width: ${webkitScrollbarStyle.width};` : "";
      const heightStyle = height ? `height: ${webkitScrollbarStyle.height};` : "";
      updateCSS(`
#${randomId}::-webkit-scrollbar {
${widthStyle}
${heightStyle}
}`, randomId);
    } catch (e) {
      console.error(e);
      fallbackWidth = width;
      fallbackHeight = height;
    }
  }
  document.body.appendChild(measureEle);
  const scrollWidth = ele && fallbackWidth && !isNaN(fallbackWidth) ? fallbackWidth : measureEle.offsetWidth - measureEle.clientWidth;
  const scrollHeight = ele && fallbackHeight && !isNaN(fallbackHeight) ? fallbackHeight : measureEle.offsetHeight - measureEle.clientHeight;
  document.body.removeChild(measureEle);
  removeCSS(randomId);
  return {
    width: scrollWidth,
    height: scrollHeight
  };
}
function getTargetScrollBarSize(target) {
  if (typeof document === "undefined" || !target || !(target instanceof Element)) {
    return {
      width: 0,
      height: 0
    };
  }
  return measureScrollbarSize(target);
}
function getUseId() {
  const fullClone = {
    ...React$1
  };
  return fullClone.useId;
}
let uuid = 0;
const useOriginId = getUseId();
const useId = useOriginId ? (
  // Use React `useId`
  (function useId2(id) {
    const reactId = useOriginId();
    if (id) {
      return id;
    }
    return reactId;
  })
) : (
  // Use compatible of `useId`
  (function useCompatId(id) {
    const [innerId, setInnerId] = reactExports.useState("ssr-id");
    reactExports.useEffect(() => {
      const nextId = uuid;
      uuid += 1;
      setInnerId(`rc_unique_${nextId}`);
    }, []);
    if (id) {
      return id;
    }
    return innerId;
  })
);
const isVisible = ((element) => {
  if (!element) {
    return false;
  }
  if (element instanceof Element) {
    if (element.offsetParent) {
      return true;
    }
    if (element.getBBox) {
      const {
        width,
        height
      } = element.getBBox();
      if (width || height) {
        return true;
      }
    }
    if (element.getBoundingClientRect) {
      const {
        width,
        height
      } = element.getBoundingClientRect();
      if (width || height) {
        return true;
      }
    }
  }
  return false;
});
const KeyCode = {
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * TAB
   */
  TAB: 9,
  // NUMLOCK on FF/Safari Mac
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * ALT
   */
  ALT: 18,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  /**
   * ESC
   */
  ESC: 27,
  // also NUM_NORTH_WEST
  /**
   * LEFT
   */
  LEFT: 37,
  // also NUM_WEST
  /**
   * UP
   */
  UP: 38,
  // also NUM_NORTH
  /**
   * RIGHT
   */
  RIGHT: 39,
  // also NUM_EAST
  /**
   * DOWN
   */
  DOWN: 40,
  /**
   * N
   */
  N: 78,
  /**
   * P
   */
  P: 80,
  /**
   * META
   */
  META: 91,
  // WIN_KEY_LEFT
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * F1
   */
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122,
  /**
   * F12
   */
  F12: 123,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186,
  // needs localization
  /**
   * EQUALS
   */
  EQUALS: 187,
  // needs localization
  /**
   * WIN_KEY
   */
  WIN_KEY: 224
};
const MARK = "__rc_react_root__";
function render(node, container) {
  const root = container[MARK] || clientExports.createRoot(container);
  root.render(node);
  container[MARK] = root;
}
async function unmount(container) {
  return Promise.resolve().then(() => {
    container[MARK]?.unmount();
    delete container[MARK];
  });
}
function focusable(node, includePositive = false) {
  if (isVisible(node)) {
    const nodeName = node.nodeName.toLowerCase();
    const isFocusableElement = (
      // Focusable element
      ["input", "select", "textarea", "button"].includes(nodeName) || // Editable element
      node.isContentEditable || // Anchor with href element
      nodeName === "a" && !!node.getAttribute("href")
    );
    const tabIndexAttr = node.getAttribute("tabindex");
    const tabIndexNum = Number(tabIndexAttr);
    let tabIndex = null;
    if (tabIndexAttr && !Number.isNaN(tabIndexNum)) {
      tabIndex = tabIndexNum;
    } else if (isFocusableElement && tabIndex === null) {
      tabIndex = 0;
    }
    if (isFocusableElement && node.disabled) {
      tabIndex = null;
    }
    return tabIndex !== null && (tabIndex >= 0 || includePositive && tabIndex < 0);
  }
  return false;
}
function getFocusNodeList(node, includePositive = false) {
  const res = [...node.querySelectorAll("*")].filter((child) => {
    return focusable(child, includePositive);
  });
  if (focusable(node, includePositive)) {
    res.unshift(node);
  }
  return res;
}
function triggerFocus(element, option) {
  if (!element) return;
  element.focus(option);
  const {
    cursor
  } = option || {};
  if (cursor && (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
    const len = element.value.length;
    switch (cursor) {
      case "start":
        element.setSelectionRange(0, 0);
        break;
      case "end":
        element.setSelectionRange(len, len);
        break;
      default:
        element.setSelectionRange(0, len);
    }
  }
}
let lastFocusElement = null;
let focusElements = [];
const idToElementMap = /* @__PURE__ */ new Map();
const ignoredElementMap = /* @__PURE__ */ new Map();
function getLastElement() {
  return focusElements[focusElements.length - 1];
}
function isIgnoredElement(element) {
  const lastElement = getLastElement();
  if (element && lastElement) {
    let lockId;
    for (const [id, ele] of idToElementMap.entries()) {
      if (ele === lastElement) {
        lockId = id;
        break;
      }
    }
    const ignoredEle = ignoredElementMap.get(lockId);
    return !!ignoredEle && (ignoredEle === element || ignoredEle.contains(element));
  }
  return false;
}
function hasFocus(element) {
  const {
    activeElement
  } = document;
  return element === activeElement || element.contains(activeElement);
}
function syncFocus() {
  const lastElement = getLastElement();
  const {
    activeElement
  } = document;
  if (isIgnoredElement(activeElement)) {
    return;
  }
  if (lastElement && !hasFocus(lastElement)) {
    const focusableList = getFocusNodeList(lastElement);
    const matchElement = focusableList.includes(lastFocusElement) ? lastFocusElement : focusableList[0];
    matchElement?.focus({
      preventScroll: true
    });
  } else {
    lastFocusElement = activeElement;
  }
}
function onWindowKeyDown(e) {
  if (e.key === "Tab") {
    const {
      activeElement
    } = document;
    const lastElement = getLastElement();
    const focusableList = getFocusNodeList(lastElement);
    const last = focusableList[focusableList.length - 1];
    if (e.shiftKey && activeElement === focusableList[0]) {
      lastFocusElement = last;
    } else if (!e.shiftKey && activeElement === last) {
      lastFocusElement = focusableList[0];
    }
  }
}
function lockFocus(element, id) {
  if (element) {
    idToElementMap.set(id, element);
    focusElements = focusElements.filter((ele) => ele !== element);
    focusElements.push(element);
    window.addEventListener("focusin", syncFocus);
    window.addEventListener("keydown", onWindowKeyDown, true);
    syncFocus();
  }
  return () => {
    lastFocusElement = null;
    focusElements = focusElements.filter((ele) => ele !== element);
    idToElementMap.delete(id);
    ignoredElementMap.delete(id);
    if (focusElements.length === 0) {
      window.removeEventListener("focusin", syncFocus);
      window.removeEventListener("keydown", onWindowKeyDown, true);
    }
  };
}
function useLockFocus(lock, getElement) {
  const id = useId();
  reactExports.useEffect(() => {
    if (lock) {
      const element = getElement();
      if (element) {
        return lockFocus(element, id);
      }
    }
  }, [lock, id]);
  const ignoreElement = (ele) => {
    if (ele) {
      ignoredElementMap.set(id, ele);
    }
  };
  return [ignoreElement];
}
export {
  removeCSS as A,
  getShadowRoot as B,
  warningOnce as C,
  useSyncState as D,
  getTargetScrollBarSize as E,
  isDOM as F,
  useLockFocus as G,
  contains as H,
  mergeWith as I,
  KeyCode as K,
  unmount as a,
  useEvent as b,
  composeRef as c,
  isVisible as d,
  useComposeRef as e,
  useLayoutEffect as f,
  getNodeRef as g,
  useSafeState as h,
  isEqual as i,
  canUseDom as j,
  useControlledState as k,
  getDOM as l,
  merge as m,
  useId as n,
  omit as o,
  pickAttrs as p,
  get as q,
  render as r,
  supportRef as s,
  toArray as t,
  useMemo as u,
  set as v,
  wrapperRaf as w,
  triggerFocus as x,
  warning as y,
  updateCSS as z
};
