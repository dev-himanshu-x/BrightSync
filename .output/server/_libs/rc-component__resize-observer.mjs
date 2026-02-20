import { r as reactExports } from "./react.mjs";
import { b as useEvent, s as supportRef, g as getNodeRef, e as useComposeRef, l as getDOM, t as toArray } from "./rc-component__util.mjs";
const CollectionContext = /* @__PURE__ */ reactExports.createContext(null);
function Collection({
  children,
  onBatchResize
}) {
  const resizeIdRef = reactExports.useRef(0);
  const resizeInfosRef = reactExports.useRef([]);
  const onCollectionResize = reactExports.useContext(CollectionContext);
  const onResize2 = reactExports.useCallback((size, element, data) => {
    resizeIdRef.current += 1;
    const currentId = resizeIdRef.current;
    resizeInfosRef.current.push({
      size,
      element,
      data
    });
    Promise.resolve().then(() => {
      if (currentId === resizeIdRef.current) {
        onBatchResize?.(resizeInfosRef.current);
        resizeInfosRef.current = [];
      }
    });
    onCollectionResize?.(size, element, data);
  }, [onBatchResize, onCollectionResize]);
  return /* @__PURE__ */ reactExports.createElement(CollectionContext.Provider, {
    value: onResize2
  }, children);
}
const elementListeners = /* @__PURE__ */ new Map();
function onResize(entities) {
  entities.forEach((entity) => {
    const {
      target
    } = entity;
    elementListeners.get(target)?.forEach((listener) => listener(target));
  });
}
let observer;
function ensureResizeObserver() {
  if (!observer) {
    observer = new ResizeObserver(onResize);
  }
  return observer;
}
function observe(element, callback) {
  if (!elementListeners.has(element)) {
    elementListeners.set(element, /* @__PURE__ */ new Set());
    ensureResizeObserver().observe(element);
  }
  elementListeners.get(element).add(callback);
}
function unobserve(element, callback) {
  if (elementListeners.has(element)) {
    elementListeners.get(element).delete(callback);
    if (!elementListeners.get(element).size) {
      ensureResizeObserver().unobserve(element);
      elementListeners.delete(element);
    }
  }
}
function useResizeObserver(enabled, getTarget, onDelayResize, onSyncResize) {
  const sizeRef = reactExports.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  });
  const onInternalResize = useEvent((target) => {
    const {
      width,
      height
    } = target.getBoundingClientRect();
    const {
      offsetWidth,
      offsetHeight
    } = target;
    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);
    if (sizeRef.current.width !== fixedWidth || sizeRef.current.height !== fixedHeight || sizeRef.current.offsetWidth !== offsetWidth || sizeRef.current.offsetHeight !== offsetHeight) {
      const size = {
        width: fixedWidth,
        height: fixedHeight,
        offsetWidth,
        offsetHeight
      };
      sizeRef.current = size;
      const mergedOffsetWidth = offsetWidth === Math.round(width) ? width : offsetWidth;
      const mergedOffsetHeight = offsetHeight === Math.round(height) ? height : offsetHeight;
      const sizeInfo = {
        ...size,
        offsetWidth: mergedOffsetWidth,
        offsetHeight: mergedOffsetHeight
      };
      onSyncResize?.(sizeInfo, target);
      Promise.resolve().then(() => {
        onDelayResize?.(sizeInfo, target);
      });
    }
  });
  const isFuncTarget = typeof getTarget === "function";
  reactExports.useEffect(() => {
    const target = isFuncTarget ? getTarget() : getTarget;
    if (target && enabled) {
      observe(target, onInternalResize);
    }
    return () => {
      if (target) {
        unobserve(target, onInternalResize);
      }
    };
  }, [
    enabled,
    // When is function, no need to watch it
    isFuncTarget ? 0 : getTarget
  ]);
}
function SingleObserver(props, ref) {
  const {
    children,
    disabled,
    onResize: onResize2,
    data
  } = props;
  const elementRef = reactExports.useRef(null);
  const onCollectionResize = reactExports.useContext(CollectionContext);
  const isRenderProps = typeof children === "function";
  const mergedChildren = isRenderProps ? children(elementRef) : children;
  const canRef = !isRenderProps && /* @__PURE__ */ reactExports.isValidElement(mergedChildren) && supportRef(mergedChildren);
  const originRef = canRef ? getNodeRef(mergedChildren) : null;
  const mergedRef = useComposeRef(originRef, elementRef);
  const getDomElement = () => {
    return getDOM(elementRef.current);
  };
  reactExports.useImperativeHandle(ref, () => getDomElement());
  useResizeObserver(!disabled, getDomElement, onResize2, (sizeInfo, target) => {
    onCollectionResize?.(sizeInfo, target, data);
  });
  return canRef ? /* @__PURE__ */ reactExports.cloneElement(mergedChildren, {
    ref: mergedRef
  }) : mergedChildren;
}
const RefSingleObserver = /* @__PURE__ */ reactExports.forwardRef(SingleObserver);
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
const INTERNAL_PREFIX_KEY = "rc-observer-key";
function ResizeObserver$1(props, ref) {
  const {
    children
  } = props;
  const childNodes = typeof children === "function" ? [children] : toArray(children);
  return childNodes.map((child, index) => {
    const key = child?.key || `${INTERNAL_PREFIX_KEY}-${index}`;
    return /* @__PURE__ */ reactExports.createElement(RefSingleObserver, _extends({}, props, {
      key,
      ref: index === 0 ? ref : void 0
    }), child);
  });
}
const RefResizeObserver = /* @__PURE__ */ reactExports.forwardRef(ResizeObserver$1);
RefResizeObserver.Collection = Collection;
export {
  RefResizeObserver as R,
  useResizeObserver as u
};
