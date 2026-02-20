import { u as useCount, B as BaseInput, r as resolveOnChange } from "./rc-component__input.mjs";
import { k as useControlledState, f as useLayoutEffect, w as wrapperRaf } from "./rc-component__util.mjs";
import { c as clsx } from "./clsx.mjs";
import { r as reactExports, a as React } from "./react.mjs";
import { R as RefResizeObserver } from "./rc-component__resize-observer.mjs";
const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
  pointer-events: none !important;
`;
const SIZING_STYLE = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "font-variant", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing", "word-break", "white-space"];
const computedStyleCache = {};
let hiddenTextarea;
function calculateNodeStyling(node, useCache = false) {
  const nodeRef = node.getAttribute("id") || node.getAttribute("data-reactid") || node.getAttribute("name");
  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }
  const style = window.getComputedStyle(node);
  const boxSizing = style.getPropertyValue("box-sizing") || style.getPropertyValue("-moz-box-sizing") || style.getPropertyValue("-webkit-box-sizing");
  const paddingSize = parseFloat(style.getPropertyValue("padding-bottom")) + parseFloat(style.getPropertyValue("padding-top"));
  const borderSize = parseFloat(style.getPropertyValue("border-bottom-width")) + parseFloat(style.getPropertyValue("border-top-width"));
  const sizingStyle = SIZING_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(";");
  const nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing
  };
  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }
  return nodeInfo;
}
function calculateAutoSizeStyle(uiTextNode, useCache = false, minRows = null, maxRows = null) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tab-index", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    hiddenTextarea.setAttribute("name", "hiddenTextarea");
    document.body.appendChild(hiddenTextarea);
  }
  if (uiTextNode.getAttribute("wrap")) {
    hiddenTextarea.setAttribute("wrap", uiTextNode.getAttribute("wrap"));
  } else {
    hiddenTextarea.removeAttribute("wrap");
  }
  const {
    paddingSize,
    borderSize,
    boxSizing,
    sizingStyle
  } = calculateNodeStyling(uiTextNode, useCache);
  hiddenTextarea.setAttribute("style", `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || "";
  let minHeight = void 0;
  let maxHeight = void 0;
  let overflowY;
  let height = hiddenTextarea.scrollHeight;
  if (boxSizing === "border-box") {
    height += borderSize;
  } else if (boxSizing === "content-box") {
    height -= paddingSize;
  }
  if (minRows !== null || maxRows !== null) {
    hiddenTextarea.value = " ";
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === "border-box") {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === "border-box") {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      overflowY = height > maxHeight ? "" : "hidden";
      height = Math.min(maxHeight, height);
    }
  }
  const style = {
    height,
    overflowY,
    resize: "none"
  };
  if (minHeight) {
    style.minHeight = minHeight;
  }
  if (maxHeight) {
    style.maxHeight = maxHeight;
  }
  return style;
}
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$1.apply(this, arguments);
}
const RESIZE_START = 0;
const RESIZE_MEASURING = 1;
const RESIZE_STABLE = 2;
const ResizableTextArea = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls,
    defaultValue,
    value,
    autoSize,
    onResize,
    className,
    style,
    disabled,
    onChange,
    // Test only
    onInternalAutoSize,
    ...restProps
  } = props;
  const [internalValue, setMergedValue] = useControlledState(defaultValue, value);
  const mergedValue = internalValue ?? "";
  const onInternalChange = (event) => {
    setMergedValue(event.target.value);
    onChange?.(event);
  };
  const textareaRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, () => ({
    textArea: textareaRef.current
  }));
  const [minRows, maxRows] = reactExports.useMemo(() => {
    if (autoSize && typeof autoSize === "object") {
      return [autoSize.minRows, autoSize.maxRows];
    }
    return [];
  }, [autoSize]);
  const needAutoSize = !!autoSize;
  const [resizeState, setResizeState] = reactExports.useState(RESIZE_STABLE);
  const [autoSizeStyle, setAutoSizeStyle] = reactExports.useState();
  const startResize = () => {
    setResizeState(RESIZE_START);
  };
  useLayoutEffect(() => {
    if (needAutoSize) {
      startResize();
    }
  }, [value, minRows, maxRows, needAutoSize]);
  useLayoutEffect(() => {
    if (resizeState === RESIZE_START) {
      setResizeState(RESIZE_MEASURING);
    } else if (resizeState === RESIZE_MEASURING) {
      const textareaStyles = calculateAutoSizeStyle(textareaRef.current, false, minRows, maxRows);
      setResizeState(RESIZE_STABLE);
      setAutoSizeStyle(textareaStyles);
    } else ;
  }, [resizeState]);
  const resizeRafRef = reactExports.useRef();
  const cleanRaf = () => {
    wrapperRaf.cancel(resizeRafRef.current);
  };
  const onInternalResize = (size) => {
    if (resizeState === RESIZE_STABLE) {
      onResize?.(size);
      if (autoSize) {
        cleanRaf();
        resizeRafRef.current = wrapperRaf(() => {
          startResize();
        });
      }
    }
  };
  reactExports.useEffect(() => cleanRaf, []);
  const mergedAutoSizeStyle = needAutoSize ? autoSizeStyle : null;
  const mergedStyle = {
    ...style,
    ...mergedAutoSizeStyle
  };
  if (resizeState === RESIZE_START || resizeState === RESIZE_MEASURING) {
    mergedStyle.overflowY = "hidden";
    mergedStyle.overflowX = "hidden";
  }
  return /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize: onInternalResize,
    disabled: !(autoSize || onResize)
  }, /* @__PURE__ */ reactExports.createElement("textarea", _extends$1({}, restProps, {
    ref: textareaRef,
    style: mergedStyle,
    className: clsx(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled
    }),
    disabled,
    value: mergedValue,
    onChange: onInternalChange
  })));
});
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
const TextArea = /* @__PURE__ */ React.forwardRef(({
  defaultValue,
  value: customValue,
  onFocus,
  onBlur,
  onChange,
  allowClear,
  maxLength,
  onCompositionStart,
  onCompositionEnd,
  suffix,
  prefixCls = "rc-textarea",
  showCount,
  count,
  className,
  style,
  disabled,
  hidden,
  classNames,
  styles,
  onResize,
  onClear,
  onPressEnter,
  readOnly,
  autoSize,
  onKeyDown,
  ...rest
}, ref) => {
  const [value, setValue] = useControlledState(defaultValue, customValue);
  const formatValue = value === void 0 || value === null ? "" : String(value);
  const [focused, setFocused] = React.useState(false);
  const compositionRef = React.useRef(false);
  const [textareaResized, setTextareaResized] = React.useState(null);
  const holderRef = reactExports.useRef(null);
  const resizableTextAreaRef = reactExports.useRef(null);
  const getTextArea = () => resizableTextAreaRef.current?.textArea;
  const focus = () => {
    getTextArea().focus();
  };
  reactExports.useImperativeHandle(ref, () => ({
    resizableTextArea: resizableTextAreaRef.current,
    focus,
    blur: () => {
      getTextArea().blur();
    },
    nativeElement: holderRef.current?.nativeElement || getTextArea()
  }));
  reactExports.useEffect(() => {
    setFocused((prev) => !disabled && prev);
  }, [disabled]);
  const [selection, setSelection] = React.useState(null);
  React.useEffect(() => {
    if (selection) {
      getTextArea().setSelectionRange(...selection);
    }
  }, [selection]);
  const countConfig = useCount(count, showCount);
  const mergedMax = countConfig.max ?? maxLength;
  const hasMaxLength = Number(mergedMax) > 0;
  const valueLength = countConfig.strategy(formatValue);
  const isOutOfRange = !!mergedMax && valueLength > mergedMax;
  const triggerChange = (e, currentValue) => {
    let cutValue = currentValue;
    if (!compositionRef.current && countConfig.exceedFormatter && countConfig.max && countConfig.strategy(currentValue) > countConfig.max) {
      cutValue = countConfig.exceedFormatter(currentValue, {
        max: countConfig.max
      });
      if (currentValue !== cutValue) {
        setSelection([getTextArea().selectionStart || 0, getTextArea().selectionEnd || 0]);
      }
    }
    setValue(cutValue);
    resolveOnChange(e.currentTarget, e, onChange, cutValue);
  };
  const onInternalCompositionStart = (e) => {
    compositionRef.current = true;
    onCompositionStart?.(e);
  };
  const onInternalCompositionEnd = (e) => {
    compositionRef.current = false;
    triggerChange(e, e.currentTarget.value);
    onCompositionEnd?.(e);
  };
  const onInternalChange = (e) => {
    triggerChange(e, e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onPressEnter && !e.nativeEvent.isComposing) {
      onPressEnter(e);
    }
    onKeyDown?.(e);
  };
  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };
  const handleReset = (e) => {
    setValue("");
    focus();
    resolveOnChange(getTextArea(), e, onChange);
  };
  let suffixNode = suffix;
  let dataCount;
  if (countConfig.show) {
    if (countConfig.showFormatter) {
      dataCount = countConfig.showFormatter({
        value: formatValue,
        count: valueLength,
        maxLength: mergedMax
      });
    } else {
      dataCount = `${valueLength}${hasMaxLength ? ` / ${mergedMax}` : ""}`;
    }
    suffixNode = /* @__PURE__ */ React.createElement(React.Fragment, null, suffixNode, /* @__PURE__ */ React.createElement("span", {
      className: clsx(`${prefixCls}-data-count`, classNames?.count),
      style: styles?.count
    }, dataCount));
  }
  const handleResize = (size) => {
    onResize?.(size);
    if (getTextArea()?.style.height) {
      setTextareaResized(true);
    }
  };
  const isPureTextArea = !autoSize && !showCount && !allowClear;
  return /* @__PURE__ */ React.createElement(BaseInput, {
    ref: holderRef,
    value: formatValue,
    allowClear,
    handleReset,
    suffix: suffixNode,
    prefixCls,
    classNames: {
      ...classNames,
      affixWrapper: clsx(classNames?.affixWrapper, {
        [`${prefixCls}-show-count`]: showCount,
        [`${prefixCls}-textarea-allow-clear`]: allowClear
      })
    },
    disabled,
    focused,
    className: clsx(className, isOutOfRange && `${prefixCls}-out-of-range`),
    style: {
      ...style,
      ...textareaResized && !isPureTextArea ? {
        height: "auto"
      } : {}
    },
    dataAttrs: {
      affixWrapper: {
        "data-count": typeof dataCount === "string" ? dataCount : void 0
      }
    },
    hidden,
    readOnly,
    onClear
  }, /* @__PURE__ */ React.createElement(ResizableTextArea, _extends({}, rest, {
    autoSize,
    maxLength,
    onKeyDown: handleKeyDown,
    onChange: onInternalChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onCompositionStart: onInternalCompositionStart,
    onCompositionEnd: onInternalCompositionEnd,
    className: clsx(classNames?.textarea),
    style: {
      resize: style?.resize,
      ...styles?.textarea
    },
    disabled,
    prefixCls,
    onResize: handleResize,
    ref: resizableTextAreaRef,
    readOnly
  })));
});
export {
  TextArea as T
};
