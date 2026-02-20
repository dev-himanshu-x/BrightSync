import { c as clsx } from "./clsx.mjs";
import { k as useControlledState, x as triggerFocus, o as omit } from "./rc-component__util.mjs";
import { a as React, r as reactExports } from "./react.mjs";
function hasAddon(props) {
  return !!(props.addonBefore || props.addonAfter);
}
function hasPrefixSuffix(props) {
  return !!(props.prefix || props.suffix || props.allowClear);
}
function cloneEvent(event, target, value) {
  const currentTarget = target.cloneNode(true);
  const newEvent = Object.create(event, {
    target: {
      value: currentTarget
    },
    currentTarget: {
      value: currentTarget
    }
  });
  currentTarget.value = value;
  if (typeof target.selectionStart === "number" && typeof target.selectionEnd === "number") {
    currentTarget.selectionStart = target.selectionStart;
    currentTarget.selectionEnd = target.selectionEnd;
  }
  currentTarget.setSelectionRange = (...args) => {
    target.setSelectionRange(...args);
  };
  return newEvent;
}
function resolveOnChange(target, e, onChange, targetValue) {
  if (!onChange) {
    return;
  }
  let event = e;
  if (e.type === "click") {
    event = cloneEvent(e, target, "");
    onChange(event);
    return;
  }
  if (target.type !== "file" && targetValue !== void 0) {
    event = cloneEvent(e, target, targetValue);
    onChange(event);
    return;
  }
  onChange(event);
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
const BaseInput = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    inputElement: inputEl,
    children,
    prefixCls,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    className,
    style,
    disabled,
    readOnly,
    focused,
    triggerFocus: triggerFocus2,
    allowClear,
    value,
    handleReset,
    hidden,
    classes,
    classNames,
    dataAttrs,
    styles,
    components,
    onClear
  } = props;
  const inputElement = children ?? inputEl;
  const AffixWrapperComponent = components?.affixWrapper || "span";
  const GroupWrapperComponent = components?.groupWrapper || "span";
  const WrapperComponent = components?.wrapper || "span";
  const GroupAddonComponent = components?.groupAddon || "span";
  const containerRef = reactExports.useRef(null);
  const onInputClick = (e) => {
    if (containerRef.current?.contains(e.target)) {
      triggerFocus2?.();
    }
  };
  const hasAffix = hasPrefixSuffix(props);
  let element = /* @__PURE__ */ reactExports.cloneElement(inputElement, {
    value,
    className: clsx(inputElement.props?.className, !hasAffix && classNames?.variant) || null
  });
  const groupRef = reactExports.useRef(null);
  React.useImperativeHandle(ref, () => ({
    nativeElement: groupRef.current || containerRef.current
  }));
  if (hasAffix) {
    let clearIcon = null;
    if (allowClear) {
      const needClear = !disabled && !readOnly && value;
      const clearIconCls = `${prefixCls}-clear-icon`;
      const iconNode = typeof allowClear === "object" && allowClear?.clearIcon ? allowClear.clearIcon : "✖";
      clearIcon = /* @__PURE__ */ React.createElement("button", {
        type: "button",
        tabIndex: -1,
        onClick: (event) => {
          handleReset?.(event);
          onClear?.();
        },
        onMouseDown: (e) => e.preventDefault(),
        className: clsx(clearIconCls, {
          [`${clearIconCls}-hidden`]: !needClear,
          [`${clearIconCls}-has-suffix`]: !!suffix
        })
      }, iconNode);
    }
    const affixWrapperPrefixCls = `${prefixCls}-affix-wrapper`;
    const affixWrapperCls = clsx(affixWrapperPrefixCls, {
      [`${prefixCls}-disabled`]: disabled,
      [`${affixWrapperPrefixCls}-disabled`]: disabled,
      // Not used, but keep it
      [`${affixWrapperPrefixCls}-focused`]: focused,
      // Not used, but keep it
      [`${affixWrapperPrefixCls}-readonly`]: readOnly,
      [`${affixWrapperPrefixCls}-input-with-clear-btn`]: suffix && allowClear && value
    }, classes?.affixWrapper, classNames?.affixWrapper, classNames?.variant);
    const suffixNode = (suffix || allowClear) && /* @__PURE__ */ React.createElement("span", {
      className: clsx(`${prefixCls}-suffix`, classNames?.suffix),
      style: styles?.suffix
    }, clearIcon, suffix);
    element = /* @__PURE__ */ React.createElement(AffixWrapperComponent, _extends$1({
      className: affixWrapperCls,
      style: styles?.affixWrapper,
      onClick: onInputClick
    }, dataAttrs?.affixWrapper, {
      ref: containerRef
    }), prefix && /* @__PURE__ */ React.createElement("span", {
      className: clsx(`${prefixCls}-prefix`, classNames?.prefix),
      style: styles?.prefix
    }, prefix), element, suffixNode);
  }
  if (hasAddon(props)) {
    const wrapperCls = `${prefixCls}-group`;
    const addonCls = `${wrapperCls}-addon`;
    const groupWrapperCls = `${wrapperCls}-wrapper`;
    const mergedWrapperClassName = clsx(`${prefixCls}-wrapper`, wrapperCls, classes?.wrapper, classNames?.wrapper);
    const mergedGroupClassName = clsx(groupWrapperCls, {
      [`${groupWrapperCls}-disabled`]: disabled
    }, classes?.group, classNames?.groupWrapper);
    element = /* @__PURE__ */ React.createElement(GroupWrapperComponent, {
      className: mergedGroupClassName,
      ref: groupRef
    }, /* @__PURE__ */ React.createElement(WrapperComponent, {
      className: mergedWrapperClassName
    }, addonBefore && /* @__PURE__ */ React.createElement(GroupAddonComponent, {
      className: addonCls
    }, addonBefore), element, addonAfter && /* @__PURE__ */ React.createElement(GroupAddonComponent, {
      className: addonCls
    }, addonAfter)));
  }
  return /* @__PURE__ */ React.cloneElement(element, {
    className: clsx(element.props?.className, className) || null,
    style: {
      ...element.props?.style,
      ...style
    },
    hidden
  });
});
function useCount(count, showCount) {
  return reactExports.useMemo(() => {
    let mergedConfig = {};
    if (showCount) {
      mergedConfig.show = typeof showCount === "object" && showCount.formatter ? showCount.formatter : !!showCount;
    }
    mergedConfig = {
      ...mergedConfig,
      ...count
    };
    const {
      show,
      ...rest
    } = mergedConfig;
    return {
      ...rest,
      show: !!show,
      showFormatter: typeof show === "function" ? show : void 0,
      strategy: rest.strategy || ((value) => value.length)
    };
  }, [count, showCount]);
}
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
const Input = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    autoComplete,
    onChange,
    onFocus,
    onBlur,
    onPressEnter,
    onKeyDown,
    onKeyUp,
    prefixCls = "rc-input",
    disabled,
    htmlSize,
    className,
    maxLength,
    suffix,
    showCount,
    count,
    type = "text",
    classes,
    classNames,
    styles,
    onCompositionStart,
    onCompositionEnd,
    ...rest
  } = props;
  const [focused, setFocused] = reactExports.useState(false);
  const compositionRef = reactExports.useRef(false);
  const keyLockRef = reactExports.useRef(false);
  const inputRef = reactExports.useRef(null);
  const holderRef = reactExports.useRef(null);
  const focus = (option) => {
    if (inputRef.current) {
      triggerFocus(inputRef.current, option);
    }
  };
  const [value, setValue] = useControlledState(props.defaultValue, props.value);
  const formatValue = value === void 0 || value === null ? "" : String(value);
  const [selection, setSelection] = reactExports.useState(null);
  const countConfig = useCount(count, showCount);
  const mergedMax = countConfig.max || maxLength;
  const valueLength = countConfig.strategy(formatValue);
  const isOutOfRange = !!mergedMax && valueLength > mergedMax;
  reactExports.useImperativeHandle(ref, () => ({
    focus,
    blur: () => {
      inputRef.current?.blur();
    },
    setSelectionRange: (start, end, direction) => {
      inputRef.current?.setSelectionRange(start, end, direction);
    },
    select: () => {
      inputRef.current?.select();
    },
    input: inputRef.current,
    nativeElement: holderRef.current?.nativeElement || inputRef.current
  }));
  reactExports.useEffect(() => {
    if (keyLockRef.current) {
      keyLockRef.current = false;
    }
    setFocused((prev) => prev && disabled ? false : prev);
  }, [disabled]);
  const triggerChange = (e, currentValue, info) => {
    let cutValue = currentValue;
    if (!compositionRef.current && countConfig.exceedFormatter && countConfig.max && countConfig.strategy(currentValue) > countConfig.max) {
      cutValue = countConfig.exceedFormatter(currentValue, {
        max: countConfig.max
      });
      if (currentValue !== cutValue) {
        setSelection([inputRef.current?.selectionStart || 0, inputRef.current?.selectionEnd || 0]);
      }
    } else if (info.source === "compositionEnd") {
      return;
    }
    setValue(cutValue);
    if (inputRef.current) {
      resolveOnChange(inputRef.current, e, onChange, cutValue);
    }
  };
  reactExports.useEffect(() => {
    if (selection) {
      inputRef.current?.setSelectionRange(...selection);
    }
  }, [selection]);
  const onInternalChange = (e) => {
    triggerChange(e, e.target.value, {
      source: "change"
    });
  };
  const onInternalCompositionEnd = (e) => {
    compositionRef.current = false;
    triggerChange(e, e.currentTarget.value, {
      source: "compositionEnd"
    });
    onCompositionEnd?.(e);
  };
  const handleKeyDown = (e) => {
    if (onPressEnter && e.key === "Enter" && !keyLockRef.current && !e.nativeEvent.isComposing) {
      keyLockRef.current = true;
      onPressEnter(e);
    }
    onKeyDown?.(e);
  };
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      keyLockRef.current = false;
    }
    onKeyUp?.(e);
  };
  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e) => {
    if (keyLockRef.current) {
      keyLockRef.current = false;
    }
    setFocused(false);
    onBlur?.(e);
  };
  const handleReset = (e) => {
    setValue("");
    focus();
    if (inputRef.current) {
      resolveOnChange(inputRef.current, e, onChange);
    }
  };
  const outOfRangeCls = isOutOfRange && `${prefixCls}-out-of-range`;
  const getInputElement = () => {
    const otherProps = omit(props, [
      "prefixCls",
      "onPressEnter",
      "addonBefore",
      "addonAfter",
      "prefix",
      "suffix",
      "allowClear",
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      "defaultValue",
      "showCount",
      "count",
      "classes",
      "htmlSize",
      "styles",
      "classNames",
      "onClear"
    ]);
    return /* @__PURE__ */ React.createElement("input", _extends({
      autoComplete
    }, otherProps, {
      onChange: onInternalChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      className: clsx(prefixCls, {
        [`${prefixCls}-disabled`]: disabled
      }, classNames?.input),
      style: styles?.input,
      ref: inputRef,
      size: htmlSize,
      type,
      onCompositionStart: (e) => {
        compositionRef.current = true;
        onCompositionStart?.(e);
      },
      onCompositionEnd: onInternalCompositionEnd
    }));
  };
  const getSuffix = () => {
    const hasMaxLength = Number(mergedMax) > 0;
    if (suffix || countConfig.show) {
      const dataCount = countConfig.showFormatter ? countConfig.showFormatter({
        value: formatValue,
        count: valueLength,
        maxLength: mergedMax
      }) : `${valueLength}${hasMaxLength ? ` / ${mergedMax}` : ""}`;
      return /* @__PURE__ */ React.createElement(React.Fragment, null, countConfig.show && /* @__PURE__ */ React.createElement("span", {
        className: clsx(`${prefixCls}-show-count-suffix`, {
          [`${prefixCls}-show-count-has-suffix`]: !!suffix
        }, classNames?.count),
        style: {
          ...styles?.count
        }
      }, dataCount), suffix);
    }
    return null;
  };
  return /* @__PURE__ */ React.createElement(BaseInput, _extends({}, rest, {
    prefixCls,
    className: clsx(className, outOfRangeCls),
    handleReset,
    value: formatValue,
    focused,
    triggerFocus: focus,
    suffix: getSuffix(),
    disabled,
    classes,
    classNames,
    styles,
    ref: holderRef
  }), getInputElement());
});
export {
  BaseInput as B,
  Input as I,
  resolveOnChange as r,
  useCount as u
};
