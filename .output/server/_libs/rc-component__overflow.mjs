import { k as _extends } from "./babel__runtime.mjs";
import { r as reactExports, a as React } from "./react.mjs";
import { c as clsx } from "./clsx.mjs";
import { R as RefResizeObserver } from "./rc-component__resize-observer.mjs";
import { w as wrapperRaf, b as useEvent, f as useLayoutEffect } from "./rc-component__util.mjs";
import { r as reactDomExports } from "./react-dom.mjs";
const UNDEFINED = void 0;
function InternalItem(props, ref) {
  const {
    prefixCls,
    invalidate,
    item,
    renderItem,
    responsive,
    responsiveDisabled,
    registerSize,
    itemKey,
    className,
    style,
    children,
    display,
    order,
    component: Component = "div",
    ...restProps
  } = props;
  const mergedHidden = responsive && !display;
  function internalRegisterSize(width) {
    registerSize(itemKey, width);
  }
  reactExports.useEffect(() => () => {
    internalRegisterSize(null);
  }, []);
  const childNode = renderItem && item !== UNDEFINED ? renderItem(item, {
    index: order
  }) : children;
  let overflowStyle;
  if (!invalidate) {
    overflowStyle = {
      opacity: mergedHidden ? 0 : 1,
      height: mergedHidden ? 0 : UNDEFINED,
      overflowY: mergedHidden ? "hidden" : UNDEFINED,
      order: responsive ? order : UNDEFINED,
      pointerEvents: mergedHidden ? "none" : UNDEFINED,
      position: mergedHidden ? "absolute" : UNDEFINED
    };
  }
  const overflowProps = {};
  if (mergedHidden) {
    overflowProps["aria-hidden"] = true;
  }
  let itemNode = /* @__PURE__ */ reactExports.createElement(Component, _extends({
    className: clsx(!invalidate && prefixCls, className),
    style: {
      ...overflowStyle,
      ...style
    }
  }, overflowProps, restProps, {
    ref
  }), childNode);
  if (responsive) {
    itemNode = /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
      onResize: ({
        offsetWidth
      }) => {
        internalRegisterSize(offsetWidth);
      },
      disabled: responsiveDisabled
    }, itemNode);
  }
  return itemNode;
}
const Item = /* @__PURE__ */ reactExports.forwardRef(InternalItem);
function channelUpdate(callback) {
  if (typeof MessageChannel === "undefined") {
    wrapperRaf(callback);
  } else {
    const channel = new MessageChannel();
    channel.port1.onmessage = () => callback();
    channel.port2.postMessage(void 0);
  }
}
function useBatcher() {
  const updateFuncRef = reactExports.useRef(null);
  const notifyEffectUpdate = (callback) => {
    if (!updateFuncRef.current) {
      updateFuncRef.current = [];
      channelUpdate(() => {
        reactDomExports.unstable_batchedUpdates(() => {
          updateFuncRef.current.forEach((fn) => {
            fn();
          });
          updateFuncRef.current = null;
        });
      });
    }
    updateFuncRef.current.push(callback);
  };
  return notifyEffectUpdate;
}
function useEffectState(notifyEffectUpdate, defaultValue) {
  const [stateValue, setStateValue] = reactExports.useState(defaultValue);
  const setEffectVal = useEvent((nextValue) => {
    notifyEffectUpdate(() => {
      setStateValue(nextValue);
    });
  });
  return [stateValue, setEffectVal];
}
const OverflowContext = /* @__PURE__ */ React.createContext(null);
const InternalRawItem = (props, ref) => {
  const context = reactExports.useContext(OverflowContext);
  if (!context) {
    const {
      component: Component = "div",
      ...restProps2
    } = props;
    return /* @__PURE__ */ reactExports.createElement(Component, _extends({}, restProps2, {
      ref
    }));
  }
  const {
    className: contextClassName,
    ...restContext
  } = context;
  const {
    className,
    ...restProps
  } = props;
  return /* @__PURE__ */ reactExports.createElement(OverflowContext.Provider, {
    value: null
  }, /* @__PURE__ */ reactExports.createElement(Item, _extends({
    ref,
    className: clsx(contextClassName, className)
  }, restContext, restProps)));
};
const RawItem = /* @__PURE__ */ reactExports.forwardRef(InternalRawItem);
const RESPONSIVE = "responsive";
const INVALIDATE = "invalidate";
function defaultRenderRest(omittedItems) {
  return `+ ${omittedItems.length} ...`;
}
function Overflow(props, ref) {
  const {
    prefixCls = "rc-overflow",
    data = [],
    renderItem,
    renderRawItem,
    itemKey,
    itemWidth = 10,
    ssr,
    style,
    className,
    maxCount,
    renderRest,
    renderRawRest,
    prefix,
    suffix,
    component: Component = "div",
    itemComponent,
    onVisibleChange,
    ...restProps
  } = props;
  const fullySSR = ssr === "full";
  const notifyEffectUpdate = useBatcher();
  const [containerWidth, setContainerWidth] = useEffectState(notifyEffectUpdate, null);
  const mergedContainerWidth = containerWidth || 0;
  const [itemWidths, setItemWidths] = useEffectState(notifyEffectUpdate, /* @__PURE__ */ new Map());
  const [prevRestWidth, setPrevRestWidth] = useEffectState(notifyEffectUpdate, 0);
  const [restWidth, setRestWidth] = useEffectState(notifyEffectUpdate, 0);
  const [prefixWidth, setPrefixWidth] = useEffectState(notifyEffectUpdate, 0);
  const [suffixWidth, setSuffixWidth] = useEffectState(notifyEffectUpdate, 0);
  const [suffixFixedStart, setSuffixFixedStart] = reactExports.useState(null);
  const [displayCount, setDisplayCount] = reactExports.useState(null);
  const mergedDisplayCount = reactExports.useMemo(() => {
    if (displayCount === null && fullySSR) {
      return Number.MAX_SAFE_INTEGER;
    }
    return displayCount || 0;
  }, [displayCount, containerWidth]);
  const [restReady, setRestReady] = reactExports.useState(false);
  const itemPrefixCls = `${prefixCls}-item`;
  const mergedRestWidth = Math.max(prevRestWidth, restWidth);
  const isResponsive = maxCount === RESPONSIVE;
  const shouldResponsive = data.length && isResponsive;
  const invalidate = maxCount === INVALIDATE;
  const showRest = shouldResponsive || typeof maxCount === "number" && data.length > maxCount;
  const mergedData = reactExports.useMemo(() => {
    let items = data;
    if (shouldResponsive) {
      if (containerWidth === null && fullySSR) {
        items = data;
      } else {
        items = data.slice(0, Math.min(data.length, mergedContainerWidth / itemWidth));
      }
    } else if (typeof maxCount === "number") {
      items = data.slice(0, maxCount);
    }
    return items;
  }, [data, itemWidth, containerWidth, maxCount, shouldResponsive]);
  const omittedItems = reactExports.useMemo(() => {
    if (shouldResponsive) {
      return data.slice(mergedDisplayCount + 1);
    }
    return data.slice(mergedData.length);
  }, [data, mergedData, shouldResponsive, mergedDisplayCount]);
  const getKey = reactExports.useCallback((item, index) => {
    if (typeof itemKey === "function") {
      return itemKey(item);
    }
    return (itemKey && item?.[itemKey]) ?? index;
  }, [itemKey]);
  const mergedRenderItem = reactExports.useCallback(renderItem || ((item) => item), [renderItem]);
  function updateDisplayCount(count, suffixFixedStartVal, notReady) {
    if (displayCount === count && (suffixFixedStartVal === void 0 || suffixFixedStartVal === suffixFixedStart)) {
      return;
    }
    setDisplayCount(count);
    if (!notReady) {
      setRestReady(count < data.length - 1);
      onVisibleChange?.(count);
    }
    if (suffixFixedStartVal !== void 0) {
      setSuffixFixedStart(suffixFixedStartVal);
    }
  }
  function onOverflowResize(_, element) {
    setContainerWidth(element.clientWidth);
  }
  function registerSize(key, width) {
    setItemWidths((origin) => {
      const clone = new Map(origin);
      if (width === null) {
        clone.delete(key);
      } else {
        clone.set(key, width);
      }
      return clone;
    });
  }
  function registerOverflowSize(_, width) {
    setRestWidth(width);
    setPrevRestWidth(restWidth);
  }
  function registerPrefixSize(_, width) {
    setPrefixWidth(width);
  }
  function registerSuffixSize(_, width) {
    setSuffixWidth(width);
  }
  function getItemWidth(index) {
    return itemWidths.get(getKey(mergedData[index], index));
  }
  useLayoutEffect(() => {
    if (mergedContainerWidth && typeof mergedRestWidth === "number" && mergedData) {
      let totalWidth = prefixWidth + suffixWidth;
      const len = mergedData.length;
      const lastIndex = len - 1;
      if (!len) {
        updateDisplayCount(0, null);
        return;
      }
      for (let i = 0; i < len; i += 1) {
        let currentItemWidth = getItemWidth(i);
        if (fullySSR) {
          currentItemWidth = currentItemWidth || 0;
        }
        if (currentItemWidth === void 0) {
          updateDisplayCount(i - 1, void 0, true);
          break;
        }
        totalWidth += currentItemWidth;
        if (
          // Only one means `totalWidth` is the final width
          lastIndex === 0 && totalWidth <= mergedContainerWidth || // Last two width will be the final width
          i === lastIndex - 1 && totalWidth + getItemWidth(lastIndex) <= mergedContainerWidth
        ) {
          updateDisplayCount(lastIndex, null);
          break;
        } else if (totalWidth + mergedRestWidth > mergedContainerWidth) {
          updateDisplayCount(i - 1, totalWidth - currentItemWidth - suffixWidth + restWidth);
          break;
        }
      }
      if (suffix && getItemWidth(0) + suffixWidth > mergedContainerWidth) {
        setSuffixFixedStart(null);
      }
    }
  }, [mergedContainerWidth, itemWidths, restWidth, prefixWidth, suffixWidth, getKey, mergedData]);
  const displayRest = restReady && !!omittedItems.length;
  let suffixStyle = {};
  if (suffixFixedStart !== null && shouldResponsive) {
    suffixStyle = {
      position: "absolute",
      left: suffixFixedStart,
      top: 0
    };
  }
  const itemSharedProps = {
    prefixCls: itemPrefixCls,
    responsive: shouldResponsive,
    component: itemComponent,
    invalidate
  };
  const internalRenderItemNode = renderRawItem ? (item, index) => {
    const key = getKey(item, index);
    return /* @__PURE__ */ reactExports.createElement(OverflowContext.Provider, {
      key,
      value: {
        ...itemSharedProps,
        order: index,
        item,
        itemKey: key,
        registerSize,
        display: index <= mergedDisplayCount
      }
    }, renderRawItem(item, index));
  } : (item, index) => {
    const key = getKey(item, index);
    return /* @__PURE__ */ reactExports.createElement(Item, _extends({}, itemSharedProps, {
      order: index,
      key,
      item,
      renderItem: mergedRenderItem,
      itemKey: key,
      registerSize,
      display: index <= mergedDisplayCount
    }));
  };
  const restContextProps = {
    order: displayRest ? mergedDisplayCount : Number.MAX_SAFE_INTEGER,
    className: `${itemPrefixCls}-rest`,
    registerSize: registerOverflowSize,
    display: displayRest
  };
  const mergedRenderRest = renderRest || defaultRenderRest;
  const restNode = renderRawRest ? /* @__PURE__ */ reactExports.createElement(OverflowContext.Provider, {
    value: {
      ...itemSharedProps,
      ...restContextProps
    }
  }, renderRawRest(omittedItems)) : /* @__PURE__ */ reactExports.createElement(Item, _extends({}, itemSharedProps, restContextProps), typeof mergedRenderRest === "function" ? mergedRenderRest(omittedItems) : mergedRenderRest);
  const overflowNode = /* @__PURE__ */ reactExports.createElement(Component, _extends({
    className: clsx(!invalidate && prefixCls, className),
    style,
    ref
  }, restProps), prefix && /* @__PURE__ */ reactExports.createElement(Item, _extends({}, itemSharedProps, {
    responsive: isResponsive,
    responsiveDisabled: !shouldResponsive,
    order: -1,
    className: `${itemPrefixCls}-prefix`,
    registerSize: registerPrefixSize,
    display: true
  }), prefix), mergedData.map(internalRenderItemNode), showRest ? restNode : null, suffix && /* @__PURE__ */ reactExports.createElement(Item, _extends({}, itemSharedProps, {
    responsive: isResponsive,
    responsiveDisabled: !shouldResponsive,
    order: mergedDisplayCount,
    className: `${itemPrefixCls}-suffix`,
    registerSize: registerSuffixSize,
    display: true,
    style: suffixStyle
  }), suffix));
  return isResponsive ? /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize: onOverflowResize,
    disabled: !shouldResponsive
  }, overflowNode) : overflowNode;
}
const ForwardOverflow = /* @__PURE__ */ reactExports.forwardRef(Overflow);
ForwardOverflow.Item = RawItem;
ForwardOverflow.RESPONSIVE = RESPONSIVE;
ForwardOverflow.INVALIDATE = INVALIDATE;
export {
  ForwardOverflow as F
};
