import { b as useEvent, C as warningOnce, k as useControlledState, f as useLayoutEffect, c as composeRef, p as pickAttrs, K as KeyCode, l as getDOM, o as omit, u as useMemo, t as toArray$1, n as useId } from "./rc-component__util.mjs";
import { r as reactExports } from "./react.mjs";
import { c as clsx } from "./clsx.mjs";
import { T as Trigger } from "./rc-component__trigger.mjs";
import { F as ForwardOverflow } from "./rc-component__overflow.mjs";
import { L as List } from "./rc-component__virtual-list.mjs";
const useAllowClear = (prefixCls, displayValues, allowClear, clearIcon, disabled = false, mergedSearchValue, mode) => {
  const allowClearConfig = reactExports.useMemo(() => {
    if (typeof allowClear === "boolean") {
      return {
        allowClear
      };
    }
    if (allowClear && typeof allowClear === "object") {
      return allowClear;
    }
    return {
      allowClear: false
    };
  }, [allowClear]);
  return reactExports.useMemo(() => {
    const mergedAllowClear = !disabled && allowClearConfig.allowClear !== false && (displayValues.length || mergedSearchValue) && !(mode === "combobox" && mergedSearchValue === "");
    return {
      allowClear: mergedAllowClear,
      clearIcon: mergedAllowClear ? allowClearConfig.clearIcon || clearIcon || "×" : null
    };
  }, [allowClearConfig, clearIcon, disabled, displayValues.length, mergedSearchValue, mode]);
};
const BaseSelectContext = /* @__PURE__ */ reactExports.createContext(null);
function useBaseProps() {
  return reactExports.useContext(BaseSelectContext);
}
function useLock(duration = 250) {
  const lockRef = reactExports.useRef(null);
  const timeoutRef = reactExports.useRef(null);
  reactExports.useEffect(() => () => {
    window.clearTimeout(timeoutRef.current);
  }, []);
  function doLock(locked) {
    if (locked || lockRef.current === null) {
      lockRef.current = locked;
    }
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      lockRef.current = null;
    }, duration);
  }
  return [() => lockRef.current, doLock];
}
function isInside(elements, target) {
  return elements.filter((element) => element).some((element) => element.contains(target) || element === target);
}
function useSelectTriggerControl(elements, open, triggerOpen, customizedTrigger) {
  const onGlobalMouseDown = useEvent((event) => {
    if (customizedTrigger) {
      return;
    }
    let target = event.target;
    if (target.shadowRoot && event.composed) {
      target = event.composedPath()[0] || target;
    }
    if (event._ori_target) {
      target = event._ori_target;
    }
    if (open && // Marked by SelectInput mouseDown event
    !isInside(elements(), target)) {
      triggerOpen(false);
    }
  });
  reactExports.useEffect(() => {
    window.addEventListener("mousedown", onGlobalMouseDown);
    return () => window.removeEventListener("mousedown", onGlobalMouseDown);
  }, [onGlobalMouseDown]);
}
function _extends$6() {
  _extends$6 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$6.apply(this, arguments);
}
const getBuiltInPlacements = (popupMatchSelectWidth) => {
  const adjustX = popupMatchSelectWidth === true ? 0 : 1;
  return {
    bottomLeft: {
      points: ["tl", "bl"],
      offset: [0, 4],
      overflow: {
        adjustX,
        adjustY: 1
      },
      htmlRegion: "scroll"
    },
    bottomRight: {
      points: ["tr", "br"],
      offset: [0, 4],
      overflow: {
        adjustX,
        adjustY: 1
      },
      htmlRegion: "scroll"
    },
    topLeft: {
      points: ["bl", "tl"],
      offset: [0, -4],
      overflow: {
        adjustX,
        adjustY: 1
      },
      htmlRegion: "scroll"
    },
    topRight: {
      points: ["br", "tr"],
      offset: [0, -4],
      overflow: {
        adjustX,
        adjustY: 1
      },
      htmlRegion: "scroll"
    }
  };
};
const SelectTrigger = (props, ref) => {
  const {
    prefixCls,
    disabled,
    visible,
    children,
    popupElement,
    animation,
    transitionName,
    popupStyle,
    popupClassName,
    direction = "ltr",
    placement,
    builtinPlacements,
    popupMatchSelectWidth,
    popupRender,
    popupAlign,
    getPopupContainer,
    empty,
    onPopupVisibleChange,
    onPopupMouseEnter,
    onPopupMouseDown,
    onPopupBlur,
    ...restProps
  } = props;
  const popupPrefixCls = `${prefixCls}-dropdown`;
  let popupNode = popupElement;
  if (popupRender) {
    popupNode = popupRender(popupElement);
  }
  const mergedBuiltinPlacements = reactExports.useMemo(() => builtinPlacements || getBuiltInPlacements(popupMatchSelectWidth), [builtinPlacements, popupMatchSelectWidth]);
  const mergedTransitionName = animation ? `${popupPrefixCls}-${animation}` : transitionName;
  const isNumberPopupWidth = typeof popupMatchSelectWidth === "number";
  const stretch = reactExports.useMemo(() => {
    if (isNumberPopupWidth) {
      return null;
    }
    return popupMatchSelectWidth === false ? "minWidth" : "width";
  }, [popupMatchSelectWidth, isNumberPopupWidth]);
  let mergedPopupStyle = popupStyle;
  if (isNumberPopupWidth) {
    mergedPopupStyle = {
      ...popupStyle,
      width: popupMatchSelectWidth
    };
  }
  const triggerPopupRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => ({
    getPopupElement: () => triggerPopupRef.current?.popupElement
  }));
  return /* @__PURE__ */ reactExports.createElement(Trigger, _extends$6({}, restProps, {
    showAction: onPopupVisibleChange ? ["click"] : [],
    hideAction: onPopupVisibleChange ? ["click"] : [],
    popupPlacement: placement || (direction === "rtl" ? "bottomRight" : "bottomLeft"),
    builtinPlacements: mergedBuiltinPlacements,
    prefixCls: popupPrefixCls,
    popupMotion: {
      motionName: mergedTransitionName
    },
    popup: /* @__PURE__ */ reactExports.createElement("div", {
      onMouseEnter: onPopupMouseEnter,
      onMouseDown: onPopupMouseDown,
      onBlur: onPopupBlur
    }, popupNode),
    ref: triggerPopupRef,
    stretch,
    popupAlign,
    popupVisible: visible,
    getPopupContainer,
    popupClassName: clsx(popupClassName, {
      [`${popupPrefixCls}-empty`]: empty
    }),
    popupStyle: mergedPopupStyle,
    onPopupVisibleChange
  }), children);
};
const RefSelectTrigger = /* @__PURE__ */ reactExports.forwardRef(SelectTrigger);
function getKey(data, index) {
  const {
    key
  } = data;
  let value;
  if ("value" in data) {
    ({
      value
    } = data);
  }
  if (key !== null && key !== void 0) {
    return key;
  }
  if (value !== void 0) {
    return value;
  }
  return `rc-index-key-${index}`;
}
function isValidCount(value) {
  return typeof value !== "undefined" && !Number.isNaN(value);
}
function fillFieldNames(fieldNames, childrenAsData) {
  const {
    label,
    value,
    options,
    groupLabel
  } = fieldNames || {};
  const mergedLabel = label || (childrenAsData ? "children" : "label");
  return {
    label: mergedLabel,
    value: value || "value",
    options: options || "options",
    groupLabel: groupLabel || mergedLabel
  };
}
function flattenOptions(options, {
  fieldNames,
  childrenAsData
} = {}) {
  const flattenList = [];
  const {
    label: fieldLabel,
    value: fieldValue,
    options: fieldOptions,
    groupLabel
  } = fillFieldNames(fieldNames, false);
  function dig(list, isGroupOption) {
    if (!Array.isArray(list)) {
      return;
    }
    list.forEach((data) => {
      if (isGroupOption || !(fieldOptions in data)) {
        const value = data[fieldValue];
        flattenList.push({
          key: getKey(data, flattenList.length),
          groupOption: isGroupOption,
          data,
          label: data[fieldLabel],
          value
        });
      } else {
        let grpLabel = data[groupLabel];
        if (grpLabel === void 0 && childrenAsData) {
          grpLabel = data.label;
        }
        flattenList.push({
          key: getKey(data, flattenList.length),
          group: true,
          data,
          label: grpLabel
        });
        dig(data[fieldOptions], true);
      }
    });
  }
  dig(options, false);
  return flattenList;
}
function injectPropsWithOption(option) {
  const newOption = {
    ...option
  };
  if (!("props" in newOption)) {
    Object.defineProperty(newOption, "props", {
      get() {
        warningOnce(false, "Return type is option instead of Option instance. Please read value directly instead of reading from `props`.");
        return newOption;
      }
    });
  }
  return newOption;
}
const getSeparatedContent = (text, tokens, end) => {
  if (!tokens || !tokens.length) {
    return null;
  }
  let match = false;
  const separate = (str, [token, ...restTokens]) => {
    if (!token) {
      return [str];
    }
    const list2 = str.split(token);
    match = match || list2.length > 1;
    return list2.reduce((prevList, unitStr) => [...prevList, ...separate(unitStr, restTokens)], []).filter(Boolean);
  };
  const list = separate(text, tokens);
  if (match) {
    return typeof end !== "undefined" ? list.slice(0, end) : list;
  } else {
    return null;
  }
};
function Polite(props) {
  const {
    visible,
    values
  } = props;
  if (!visible) {
    return null;
  }
  const MAX_COUNT = 50;
  return /* @__PURE__ */ reactExports.createElement("span", {
    "aria-live": "polite",
    style: {
      width: 0,
      height: 0,
      position: "absolute",
      overflow: "hidden",
      opacity: 0
    }
  }, `${values.slice(0, MAX_COUNT).map(({
    label,
    value
  }) => ["number", "string"].includes(typeof label) ? label : value).join(", ")}`, values.length > MAX_COUNT ? ", ..." : null);
}
const internalMacroTask = (fn) => {
  const channel = new MessageChannel();
  channel.port1.onmessage = fn;
  channel.port2.postMessage(null);
};
const macroTask = (fn, times = 1) => {
  if (times <= 0) {
    fn();
    return;
  }
  internalMacroTask(() => {
    macroTask(fn, times - 1);
  });
};
function useOpen(defaultOpen, propOpen, onOpen, postOpen) {
  const [rendered, setRendered] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setRendered(true);
  }, []);
  const [stateOpen, internalSetOpen] = useControlledState(defaultOpen, propOpen);
  const [lock, setLock] = reactExports.useState(false);
  const ssrSafeOpen = rendered ? stateOpen : false;
  const mergedOpen = postOpen(ssrSafeOpen);
  const taskIdRef = reactExports.useRef(0);
  const triggerEvent = useEvent((nextOpen) => {
    if (onOpen && mergedOpen !== nextOpen) {
      onOpen(nextOpen);
    }
    internalSetOpen(nextOpen);
  });
  const toggleOpen = useEvent((nextOpen, config = {}) => {
    const {
      cancelFun
    } = config;
    taskIdRef.current += 1;
    const id = taskIdRef.current;
    const nextOpenVal = typeof nextOpen === "boolean" ? nextOpen : !mergedOpen;
    setLock(!nextOpenVal);
    function triggerUpdate() {
      if (
        // Always check if id is match
        id === taskIdRef.current && // Check if need to cancel
        !cancelFun?.()
      ) {
        triggerEvent(nextOpenVal);
        setLock(false);
      }
    }
    if (nextOpenVal) {
      triggerUpdate();
    } else {
      macroTask(() => {
        triggerUpdate();
      });
    }
  });
  return [ssrSafeOpen, mergedOpen, toggleOpen, lock];
}
function Affix(props) {
  const {
    children,
    ...restProps
  } = props;
  if (!children) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", restProps, children);
}
const SelectInputContext = /* @__PURE__ */ reactExports.createContext(null);
function useSelectInputContext() {
  return reactExports.useContext(SelectInputContext);
}
const Input = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    onChange,
    onKeyDown,
    onBlur,
    style,
    syncWidth,
    value,
    className,
    autoComplete,
    ...restProps
  } = props;
  const {
    prefixCls,
    mode,
    onSearch,
    onSearchSubmit,
    onInputBlur,
    autoFocus,
    tokenWithEnter,
    placeholder,
    components: {
      input: InputComponent = "input"
    }
  } = useSelectInputContext();
  const {
    id,
    classNames,
    styles,
    open,
    activeDescendantId,
    role,
    disabled
  } = useBaseProps() || {};
  const inputCls = clsx(`${prefixCls}-input`, classNames?.input, className);
  const compositionStatusRef = reactExports.useRef(false);
  const pastedTextRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => inputRef.current);
  const handleChange = (event) => {
    let {
      value: nextVal
    } = event.target;
    if (tokenWithEnter && pastedTextRef.current && /[\r\n]/.test(pastedTextRef.current)) {
      const replacedText = pastedTextRef.current.replace(/[\r\n]+$/, "").replace(/\r\n/g, " ").replace(/[\r\n]/g, " ");
      nextVal = nextVal.replace(replacedText, pastedTextRef.current);
    }
    pastedTextRef.current = null;
    if (onSearch) {
      onSearch(nextVal, true, compositionStatusRef.current);
    }
    onChange?.(event);
  };
  const handleKeyDown = (event) => {
    const {
      key
    } = event;
    const {
      value: nextVal
    } = event.currentTarget;
    if (key === "Enter" && mode === "tags" && !compositionStatusRef.current && onSearchSubmit) {
      onSearchSubmit(nextVal);
    }
    onKeyDown?.(event);
  };
  const handleBlur = (event) => {
    onInputBlur?.();
    onBlur?.(event);
  };
  const handleCompositionStart = () => {
    compositionStatusRef.current = true;
  };
  const handleCompositionEnd = (event) => {
    compositionStatusRef.current = false;
    if (mode !== "combobox") {
      const {
        value: nextVal
      } = event.currentTarget;
      onSearch?.(nextVal, true, false);
    }
  };
  const handlePaste = (event) => {
    const {
      clipboardData
    } = event;
    const pastedValue = clipboardData?.getData("text");
    pastedTextRef.current = pastedValue || "";
  };
  const [widthCssVar, setWidthCssVar] = reactExports.useState(void 0);
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (syncWidth && input) {
      input.style.width = "0px";
      const scrollWidth = input.scrollWidth;
      setWidthCssVar(scrollWidth);
      input.style.width = "";
    }
  }, [syncWidth, value]);
  const sharedInputProps = {
    id,
    type: mode === "combobox" ? "text" : "search",
    ...restProps,
    ref: inputRef,
    style: {
      ...styles?.input,
      ...style,
      "--select-input-width": widthCssVar
    },
    autoFocus,
    autoComplete: autoComplete || "off",
    className: inputCls,
    disabled,
    value: value || "",
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    onBlur: handleBlur,
    onPaste: handlePaste,
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    // Accessibility attributes
    role: role || "combobox",
    "aria-expanded": open || false,
    "aria-haspopup": "listbox",
    "aria-owns": open ? `${id}_list` : void 0,
    "aria-autocomplete": "list",
    "aria-controls": open ? `${id}_list` : void 0,
    "aria-activedescendant": open ? activeDescendantId : void 0
  };
  if (/* @__PURE__ */ reactExports.isValidElement(InputComponent)) {
    const existingProps = InputComponent.props || {};
    const mergedProps = {
      placeholder: props.placeholder || placeholder,
      ...sharedInputProps,
      ...existingProps
    };
    Object.keys(existingProps).forEach((key) => {
      const existingValue = existingProps[key];
      if (typeof existingValue === "function") {
        mergedProps[key] = (...args) => {
          existingValue(...args);
          sharedInputProps[key]?.(...args);
        };
      }
    });
    mergedProps.ref = composeRef(InputComponent.ref, sharedInputProps.ref);
    return /* @__PURE__ */ reactExports.cloneElement(InputComponent, mergedProps);
  }
  const Component = InputComponent;
  return /* @__PURE__ */ reactExports.createElement(Component, sharedInputProps);
});
function Placeholder(props) {
  const {
    prefixCls,
    placeholder,
    displayValues
  } = useSelectInputContext();
  const {
    classNames,
    styles
  } = useBaseProps();
  const {
    show = true
  } = props;
  if (displayValues.length) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(`${prefixCls}-placeholder`, classNames?.placeholder),
    style: {
      visibility: show ? "visible" : "hidden",
      ...styles?.placeholder
    }
  }, placeholder);
}
const SelectContext = /* @__PURE__ */ reactExports.createContext(null);
function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  return value !== void 0 ? [value] : [];
}
function hasValue(value) {
  return value !== void 0 && value !== null;
}
function isComboNoValue(value) {
  return !value && value !== 0;
}
function isTitleType$1(title) {
  return ["string", "number"].includes(typeof title);
}
function getTitle(item) {
  let title = void 0;
  if (item) {
    if (isTitleType$1(item.title)) {
      title = item.title.toString();
    } else if (isTitleType$1(item.label)) {
      title = item.label.toString();
    }
  }
  return title;
}
function _extends$5() {
  _extends$5 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$5.apply(this, arguments);
}
const SingleContent = /* @__PURE__ */ reactExports.forwardRef(({
  inputProps
}, ref) => {
  const {
    prefixCls,
    searchValue,
    activeValue,
    displayValues,
    maxLength,
    mode
  } = useSelectInputContext();
  const {
    triggerOpen,
    title: rootTitle,
    showSearch,
    classNames,
    styles
  } = useBaseProps();
  const selectContext = reactExports.useContext(SelectContext);
  const [inputChanged, setInputChanged] = reactExports.useState(false);
  const combobox = mode === "combobox";
  const displayValue = displayValues[0];
  const mergedSearchValue = reactExports.useMemo(() => {
    if (combobox && activeValue && !inputChanged && triggerOpen) {
      return activeValue;
    }
    return showSearch ? searchValue : "";
  }, [combobox, activeValue, inputChanged, triggerOpen, searchValue, showSearch]);
  const [optionClassName, optionStyle, optionTitle, hasOptionStyle] = reactExports.useMemo(() => {
    let className;
    let style;
    let titleValue;
    if (displayValue && selectContext?.flattenOptions) {
      const option = selectContext.flattenOptions.find((opt) => opt.value === displayValue.value);
      if (option?.data) {
        className = option.data.className;
        style = option.data.style;
        titleValue = getTitle(option.data);
      }
    }
    if (displayValue && !titleValue) {
      titleValue = getTitle(displayValue);
    }
    if (rootTitle !== void 0) {
      titleValue = rootTitle;
    }
    const nextHasStyle = !!className || !!style;
    return [className, style, titleValue, nextHasStyle];
  }, [displayValue, selectContext?.flattenOptions, rootTitle]);
  reactExports.useEffect(() => {
    if (combobox) {
      setInputChanged(false);
    }
  }, [combobox, activeValue]);
  const showHasValueCls = displayValue && displayValue.label !== null && displayValue.label !== void 0 && String(displayValue.label).trim() !== "";
  const renderValue = displayValue ? hasOptionStyle ? /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(`${prefixCls}-content-value`, optionClassName),
    style: {
      ...mergedSearchValue ? {
        visibility: "hidden"
      } : {},
      ...optionStyle
    },
    title: optionTitle
  }, displayValue.label) : displayValue.label : /* @__PURE__ */ reactExports.createElement(Placeholder, {
    show: !mergedSearchValue
  });
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(`${prefixCls}-content`, showHasValueCls && `${prefixCls}-content-has-value`, mergedSearchValue && `${prefixCls}-content-has-search-value`, hasOptionStyle && `${prefixCls}-content-has-option-style`, classNames?.content),
    style: styles?.content,
    title: hasOptionStyle ? void 0 : optionTitle
  }, renderValue, /* @__PURE__ */ reactExports.createElement(Input, _extends$5({
    ref
  }, inputProps, {
    value: mergedSearchValue,
    maxLength: mode === "combobox" ? maxLength : void 0,
    onChange: (e) => {
      setInputChanged(true);
      inputProps.onChange?.(e);
    }
  })));
});
const TransBtn = (props) => {
  const {
    className,
    style,
    customizeIcon,
    customizeIconProps,
    children,
    onMouseDown,
    onClick
  } = props;
  const icon = typeof customizeIcon === "function" ? customizeIcon(customizeIconProps) : customizeIcon;
  return /* @__PURE__ */ reactExports.createElement("span", {
    className,
    onMouseDown: (event) => {
      event.preventDefault();
      onMouseDown?.(event);
    },
    style: {
      userSelect: "none",
      WebkitUserSelect: "none",
      ...style
    },
    unselectable: "on",
    onClick,
    "aria-hidden": true
  }, icon !== void 0 ? icon : /* @__PURE__ */ reactExports.createElement("span", {
    className: clsx(className.split(/\s+/).map((cls) => `${cls}-icon`))
  }, children));
};
function _extends$4() {
  _extends$4 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$4.apply(this, arguments);
}
function itemKey(value) {
  return value.key ?? value.value;
}
const onPreventMouseDown = (event) => {
  event.preventDefault();
  event.stopPropagation();
};
const MultipleContent = /* @__PURE__ */ reactExports.forwardRef(function MultipleContent2({
  inputProps
}, ref) {
  const {
    prefixCls,
    displayValues,
    searchValue,
    mode,
    onSelectorRemove,
    removeIcon: removeIconFromContext
  } = useSelectInputContext();
  const {
    disabled,
    showSearch,
    triggerOpen,
    rawOpen,
    toggleOpen,
    autoClearSearchValue,
    tagRender: tagRenderFromContext,
    maxTagPlaceholder: maxTagPlaceholderFromContext,
    maxTagTextLength,
    maxTagCount,
    classNames,
    styles
  } = useBaseProps();
  const selectionItemPrefixCls = `${prefixCls}-selection-item`;
  let computedSearchValue = searchValue;
  if (!rawOpen && mode === "multiple" && autoClearSearchValue !== false) {
    computedSearchValue = "";
  }
  const inputValue = showSearch ? computedSearchValue || "" : "";
  const inputEditable = showSearch && !disabled;
  const removeIcon = removeIconFromContext ?? "×";
  const maxTagPlaceholder = maxTagPlaceholderFromContext ?? ((omittedValues) => `+ ${omittedValues.length} ...`);
  const tagRender = tagRenderFromContext;
  const onToggleOpen = (newOpen) => {
    toggleOpen(newOpen);
  };
  const onRemove = (value) => {
    onSelectorRemove?.(value);
  };
  const defaultRenderSelector = (item, content, itemDisabled, closable, onClose) => /* @__PURE__ */ reactExports.createElement("span", {
    title: getTitle(item),
    className: clsx(selectionItemPrefixCls, {
      [`${selectionItemPrefixCls}-disabled`]: itemDisabled
    }, classNames?.item),
    style: styles?.item
  }, /* @__PURE__ */ reactExports.createElement("span", {
    className: clsx(`${selectionItemPrefixCls}-content`, classNames?.itemContent),
    style: styles?.itemContent
  }, content), closable && /* @__PURE__ */ reactExports.createElement(TransBtn, {
    className: clsx(`${selectionItemPrefixCls}-remove`, classNames?.itemRemove),
    style: styles?.itemRemove,
    onMouseDown: onPreventMouseDown,
    onClick: onClose,
    customizeIcon: removeIcon
  }, "×"));
  const customizeRenderSelector = (value, content, itemDisabled, closable, onClose, isMaxTag, info) => {
    const onMouseDown = (e) => {
      onPreventMouseDown(e);
      onToggleOpen(!triggerOpen);
    };
    return /* @__PURE__ */ reactExports.createElement("span", {
      onMouseDown
    }, tagRender({
      label: content,
      value,
      index: info?.index,
      disabled: itemDisabled,
      closable,
      onClose,
      isMaxTag: !!isMaxTag
    }));
  };
  const renderItem = (valueItem, info) => {
    const {
      disabled: itemDisabled,
      label,
      value
    } = valueItem;
    const closable = !disabled && !itemDisabled;
    let displayLabel = label;
    if (typeof maxTagTextLength === "number") {
      if (typeof label === "string" || typeof label === "number") {
        const strLabel = String(displayLabel);
        if (strLabel.length > maxTagTextLength) {
          displayLabel = `${strLabel.slice(0, maxTagTextLength)}...`;
        }
      }
    }
    const onClose = (event) => {
      if (event) {
        event.stopPropagation();
      }
      onRemove(valueItem);
    };
    return typeof tagRender === "function" ? customizeRenderSelector(value, displayLabel, itemDisabled, closable, onClose, void 0, info) : defaultRenderSelector(valueItem, displayLabel, itemDisabled, closable, onClose);
  };
  const renderRest = (omittedValues) => {
    if (!displayValues.length) {
      return null;
    }
    const content = typeof maxTagPlaceholder === "function" ? maxTagPlaceholder(omittedValues) : maxTagPlaceholder;
    return typeof tagRender === "function" ? customizeRenderSelector(void 0, content, false, false, void 0, true) : defaultRenderSelector({
      title: content
    }, content, false);
  };
  return /* @__PURE__ */ reactExports.createElement(ForwardOverflow, {
    prefixCls: `${prefixCls}-content`,
    className: classNames?.content,
    style: styles?.content,
    prefix: !displayValues.length && !inputValue && /* @__PURE__ */ reactExports.createElement(Placeholder, null),
    data: displayValues,
    renderItem,
    renderRest,
    suffix: /* @__PURE__ */ reactExports.createElement(Input, _extends$4({
      ref,
      disabled,
      readOnly: !inputEditable
    }, inputProps, {
      value: inputValue || "",
      syncWidth: true
    })),
    itemKey,
    maxCount: maxTagCount
  });
});
const SelectContent = /* @__PURE__ */ reactExports.forwardRef(function SelectContent2(_, ref) {
  const {
    multiple,
    onInputKeyDown,
    tabIndex
  } = useSelectInputContext();
  const baseProps = useBaseProps();
  const {
    showSearch
  } = baseProps;
  const ariaProps = pickAttrs(baseProps, {
    aria: true
  });
  const sharedInputProps = {
    ...ariaProps,
    onKeyDown: onInputKeyDown,
    readOnly: !showSearch,
    tabIndex
  };
  if (multiple) {
    return /* @__PURE__ */ reactExports.createElement(MultipleContent, {
      ref,
      inputProps: sharedInputProps
    });
  }
  return /* @__PURE__ */ reactExports.createElement(SingleContent, {
    ref,
    inputProps: sharedInputProps
  });
});
function isValidateOpenKey(currentKeyCode) {
  return (
    // Undefined for Edge bug:
    // https://github.com/ant-design/ant-design/issues/51292
    currentKeyCode && // Other keys
    ![
      // System function button
      KeyCode.ESC,
      KeyCode.SHIFT,
      KeyCode.BACKSPACE,
      KeyCode.TAB,
      KeyCode.WIN_KEY,
      KeyCode.ALT,
      KeyCode.META,
      KeyCode.WIN_KEY_RIGHT,
      KeyCode.CTRL,
      KeyCode.SEMICOLON,
      KeyCode.EQUALS,
      KeyCode.CAPS_LOCK,
      KeyCode.CONTEXT_MENU,
      // Arrow keys - should not trigger open when navigating in input
      KeyCode.UP,
      // KeyCode.DOWN,
      KeyCode.LEFT,
      KeyCode.RIGHT,
      // F1-F12
      KeyCode.F1,
      KeyCode.F2,
      KeyCode.F3,
      KeyCode.F4,
      KeyCode.F5,
      KeyCode.F6,
      KeyCode.F7,
      KeyCode.F8,
      KeyCode.F9,
      KeyCode.F10,
      KeyCode.F11,
      KeyCode.F12
    ].includes(currentKeyCode)
  );
}
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$3.apply(this, arguments);
}
const DEFAULT_OMIT_PROPS = ["value", "onChange", "removeIcon", "placeholder", "maxTagCount", "maxTagTextLength", "maxTagPlaceholder", "choiceTransitionName", "onInputKeyDown", "onPopupScroll", "tabIndex", "activeValue", "onSelectorRemove", "focused"];
const SelectInput = /* @__PURE__ */ reactExports.forwardRef(function SelectInput2(props, ref) {
  const {
    // Style
    prefixCls,
    className,
    style,
    // UI
    prefix,
    suffix,
    clearIcon,
    children,
    // Data
    multiple,
    displayValues,
    placeholder,
    mode,
    // Search
    searchValue,
    onSearch,
    onSearchSubmit,
    onInputBlur,
    // Input
    maxLength,
    autoFocus,
    // Events
    onMouseDown,
    onClearMouseDown,
    onInputKeyDown,
    onSelectorRemove,
    // Token handling
    tokenWithEnter,
    // Components
    components,
    ...restProps
  } = props;
  const {
    triggerOpen,
    toggleOpen,
    showSearch,
    disabled,
    loading,
    classNames,
    styles
  } = useBaseProps();
  const rootRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const onInternalInputKeyDown = useEvent((event) => {
    const {
      which
    } = event;
    const isTextAreaElement = inputRef.current instanceof HTMLTextAreaElement;
    if (!isTextAreaElement && triggerOpen && (which === KeyCode.UP || which === KeyCode.DOWN)) {
      event.preventDefault();
    }
    if (onInputKeyDown) {
      onInputKeyDown(event);
    }
    if (isTextAreaElement && !triggerOpen && ~[KeyCode.UP, KeyCode.DOWN, KeyCode.LEFT, KeyCode.RIGHT].indexOf(which)) {
      return;
    }
    const isModifier = event.ctrlKey || event.altKey || event.metaKey;
    if (!isModifier && isValidateOpenKey(which)) {
      toggleOpen(true);
    }
  });
  reactExports.useImperativeHandle(ref, () => {
    return {
      focus: (options) => {
        (inputRef.current || rootRef.current).focus?.(options);
      },
      blur: () => {
        (inputRef.current || rootRef.current).blur?.();
      },
      nativeElement: rootRef.current
    };
  });
  const onInternalMouseDown = useEvent((event) => {
    if (!disabled) {
      const inputDOM = getDOM(inputRef.current);
      event.nativeEvent._ori_target = inputDOM;
      if (inputDOM && event.target !== inputDOM && !inputDOM.contains(event.target)) {
        event.preventDefault();
      }
      const shouldPreventClose = triggerOpen && !multiple && (mode === "combobox" || showSearch);
      if (!event.nativeEvent._select_lazy) {
        inputRef.current?.focus();
        if (!shouldPreventClose) {
          toggleOpen();
        }
      } else if (triggerOpen) {
        toggleOpen(false);
      }
    }
    onMouseDown?.(event);
  });
  const {
    root: RootComponent
  } = components;
  const domProps = omit(restProps, DEFAULT_OMIT_PROPS);
  const ariaProps = pickAttrs(domProps, {
    aria: true
  });
  const ariaKeys = Object.keys(ariaProps);
  const contextValue = {
    ...props,
    onInputKeyDown: onInternalInputKeyDown
  };
  if (RootComponent) {
    if (/* @__PURE__ */ reactExports.isValidElement(RootComponent)) {
      return /* @__PURE__ */ reactExports.cloneElement(RootComponent, {
        ...domProps,
        ref: composeRef(RootComponent.ref, rootRef)
      });
    }
    return /* @__PURE__ */ reactExports.createElement(RootComponent, _extends$3({}, domProps, {
      ref: rootRef
    }));
  }
  return /* @__PURE__ */ reactExports.createElement(SelectInputContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement("div", _extends$3({}, omit(domProps, ariaKeys), {
    // Style
    ref: rootRef,
    className,
    style,
    onMouseDown: onInternalMouseDown
  }), /* @__PURE__ */ reactExports.createElement(Affix, {
    className: clsx(`${prefixCls}-prefix`, classNames?.prefix),
    style: styles?.prefix
  }, prefix), /* @__PURE__ */ reactExports.createElement(SelectContent, {
    ref: inputRef
  }), /* @__PURE__ */ reactExports.createElement(Affix, {
    className: clsx(`${prefixCls}-suffix`, {
      [`${prefixCls}-suffix-loading`]: loading
    }, classNames?.suffix),
    style: styles?.suffix
  }, suffix), clearIcon && /* @__PURE__ */ reactExports.createElement(Affix, {
    className: clsx(`${prefixCls}-clear`, classNames?.clear),
    style: styles?.clear,
    onMouseDown: (e) => {
      e.nativeEvent._select_lazy = true;
      onClearMouseDown?.(e);
    }
  }, clearIcon), children));
});
function useComponents(components, getInputElement, getRawInputElement) {
  return reactExports.useMemo(() => {
    let {
      root,
      input
    } = components || {};
    if (getRawInputElement) {
      root = getRawInputElement();
    }
    if (getInputElement) {
      input = getInputElement();
    }
    return {
      root,
      input
    };
  }, [components, getInputElement, getRawInputElement]);
}
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$2.apply(this, arguments);
}
const isMultiple = (mode) => mode === "tags" || mode === "multiple";
const BaseSelect = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    id,
    prefixCls,
    className,
    styles,
    classNames,
    showSearch,
    tagRender,
    showScrollBar = "optional",
    direction,
    omitDomProps,
    // Value
    displayValues,
    onDisplayValuesChange,
    emptyOptions,
    notFoundContent = "Not Found",
    onClear,
    maxCount,
    placeholder,
    // Mode
    mode,
    // Status
    disabled,
    loading,
    // Customize Input
    getInputElement,
    getRawInputElement,
    // Open
    open,
    defaultOpen,
    onPopupVisibleChange,
    // Active
    activeValue,
    onActiveValueChange,
    activeDescendantId,
    // Search
    searchValue,
    autoClearSearchValue,
    onSearch,
    onSearchSplit,
    tokenSeparators,
    // Icons
    allowClear,
    prefix,
    suffix,
    suffixIcon,
    clearIcon,
    // Dropdown
    OptionList: OptionList2,
    animation,
    transitionName,
    popupStyle,
    popupClassName,
    popupMatchSelectWidth,
    popupRender,
    popupAlign,
    placement,
    builtinPlacements,
    getPopupContainer,
    // Focus
    showAction = [],
    onFocus,
    onBlur,
    // Rest Events
    onKeyUp,
    onKeyDown,
    onMouseDown,
    // Components
    components,
    // Rest Props
    ...restProps
  } = props;
  const multiple = isMultiple(mode);
  const containerRef = reactExports.useRef(null);
  const triggerRef = reactExports.useRef(null);
  const listRef = reactExports.useRef(null);
  const [focused, setFocused] = reactExports.useState(false);
  reactExports.useImperativeHandle(ref, () => ({
    focus: containerRef.current?.focus,
    blur: containerRef.current?.blur,
    scrollTo: (arg) => listRef.current?.scrollTo(arg),
    nativeElement: getDOM(containerRef.current)
  }));
  const mergedComponents = useComponents(components, getInputElement, getRawInputElement);
  const mergedSearchValue = reactExports.useMemo(() => {
    if (mode !== "combobox") {
      return searchValue;
    }
    const val = displayValues[0]?.value;
    return typeof val === "string" || typeof val === "number" ? String(val) : "";
  }, [searchValue, mode, displayValues]);
  const customizeInputElement = mode === "combobox" && typeof getInputElement === "function" && getInputElement() || null;
  const emptyListContent = !notFoundContent && emptyOptions;
  const [rawOpen, mergedOpen, triggerOpen, lockOptions] = useOpen(defaultOpen || false, open, onPopupVisibleChange, (nextOpen) => disabled || emptyListContent ? false : nextOpen);
  const tokenWithEnter = reactExports.useMemo(() => (tokenSeparators || []).some((tokenSeparator) => ["\n", "\r\n"].includes(tokenSeparator)), [tokenSeparators]);
  const onInternalSearch = (searchText, fromTyping, isCompositing) => {
    if (multiple && isValidCount(maxCount) && displayValues.length >= maxCount) {
      return;
    }
    let ret = true;
    let newSearchText = searchText;
    onActiveValueChange?.(null);
    const separatedList = getSeparatedContent(searchText, tokenSeparators, isValidCount(maxCount) ? maxCount - displayValues.length : void 0);
    const patchLabels = isCompositing ? null : separatedList;
    if (mode !== "combobox" && patchLabels) {
      newSearchText = "";
      onSearchSplit?.(patchLabels);
      triggerOpen(false);
      ret = false;
    }
    if (onSearch && mergedSearchValue !== newSearchText) {
      onSearch(newSearchText, {
        source: fromTyping ? "typing" : "effect"
      });
    }
    if (searchText && fromTyping && ret) {
      triggerOpen(true);
    }
    return ret;
  };
  const onInternalSearchSubmit = (searchText) => {
    if (!searchText || !searchText.trim()) {
      return;
    }
    onSearch(searchText, {
      source: "submit"
    });
  };
  reactExports.useEffect(() => {
    if (!rawOpen && !multiple && mode !== "combobox") {
      onInternalSearch("", false, false);
    }
  }, [rawOpen]);
  reactExports.useEffect(() => {
    if (disabled) {
      triggerOpen(false);
      setFocused(false);
    }
  }, [disabled, mergedOpen]);
  const [getClearLock, setClearLock] = useLock();
  const keyLockRef = reactExports.useRef(false);
  const onInternalKeyDown = (event) => {
    const clearLock = getClearLock();
    const {
      key
    } = event;
    const isEnterKey = key === "Enter";
    const isSpaceKey = key === " ";
    if (isEnterKey || isSpaceKey) {
      const isCombobox = mode === "combobox";
      const isEditable = isCombobox || showSearch;
      if (isSpaceKey && !isEditable || isEnterKey && !isCombobox) {
        event.preventDefault();
      }
      if (!mergedOpen) {
        triggerOpen(true);
      }
    }
    setClearLock(!!mergedSearchValue);
    if (key === "Backspace" && !clearLock && multiple && !mergedSearchValue && displayValues.length) {
      const cloneDisplayValues = [...displayValues];
      let removedDisplayValue = null;
      for (let i = cloneDisplayValues.length - 1; i >= 0; i -= 1) {
        const current = cloneDisplayValues[i];
        if (!current.disabled) {
          cloneDisplayValues.splice(i, 1);
          removedDisplayValue = current;
          break;
        }
      }
      if (removedDisplayValue) {
        onDisplayValuesChange(cloneDisplayValues, {
          type: "remove",
          values: [removedDisplayValue]
        });
      }
    }
    if (mergedOpen && (!isEnterKey || !keyLockRef.current) && !isSpaceKey) {
      if (isEnterKey) {
        keyLockRef.current = true;
      }
      listRef.current?.onKeyDown(event);
    }
    onKeyDown?.(event);
  };
  const onInternalKeyUp = (event, ...rest) => {
    if (mergedOpen) {
      listRef.current?.onKeyUp(event, ...rest);
    }
    if (event.key === "Enter") {
      keyLockRef.current = false;
    }
    onKeyUp?.(event, ...rest);
  };
  const onSelectorRemove = useEvent((val) => {
    const newValues = displayValues.filter((i) => i !== val);
    onDisplayValuesChange(newValues, {
      type: "remove",
      values: [val]
    });
  });
  const onInputBlur = () => {
    keyLockRef.current = false;
  };
  const getSelectElements = () => [getDOM(containerRef.current), triggerRef.current?.getPopupElement()];
  useSelectTriggerControl(getSelectElements, mergedOpen, triggerOpen, !!mergedComponents.root);
  const internalMouseDownRef = reactExports.useRef(false);
  const onInternalFocus = (event) => {
    setFocused(true);
    if (!disabled) {
      if (showAction.includes("focus")) {
        triggerOpen(true);
      }
      onFocus?.(event);
    }
  };
  const onRootBlur = () => {
    if (mergedOpen && !internalMouseDownRef.current) {
      triggerOpen(false, {
        cancelFun: () => isInside(getSelectElements(), document.activeElement)
      });
    }
  };
  const onInternalBlur = (event) => {
    setFocused(false);
    if (mergedSearchValue) {
      if (mode === "tags") {
        onSearch(mergedSearchValue, {
          source: "submit"
        });
      } else if (mode === "multiple") {
        onSearch("", {
          source: "blur"
        });
      }
    }
    onRootBlur();
    if (!disabled) {
      onBlur?.(event);
    }
  };
  const onRootMouseDown = (event, ...restArgs) => {
    const {
      target
    } = event;
    const popupElement = triggerRef.current?.getPopupElement();
    if (popupElement?.contains(target) && triggerOpen) {
      triggerOpen(true);
    }
    onMouseDown?.(event, ...restArgs);
    internalMouseDownRef.current = true;
    macroTask(() => {
      internalMouseDownRef.current = false;
    });
  };
  const [, forceUpdate] = reactExports.useState({});
  function onPopupMouseEnter() {
    forceUpdate({});
  }
  let onTriggerVisibleChange;
  if (!!mergedComponents.root) {
    onTriggerVisibleChange = (newOpen) => {
      triggerOpen(newOpen);
    };
  }
  const baseSelectContext = reactExports.useMemo(() => ({
    ...props,
    notFoundContent,
    open: mergedOpen,
    triggerOpen: mergedOpen,
    rawOpen,
    id,
    showSearch,
    multiple,
    toggleOpen: triggerOpen,
    showScrollBar,
    styles,
    classNames,
    lockOptions
  }), [props, notFoundContent, triggerOpen, id, showSearch, multiple, mergedOpen, rawOpen, showScrollBar, styles, classNames, lockOptions]);
  const mergedSuffixIcon = reactExports.useMemo(() => {
    const nextSuffix = suffix ?? suffixIcon;
    if (typeof nextSuffix === "function") {
      return nextSuffix({
        searchValue: mergedSearchValue,
        open: mergedOpen,
        focused,
        showSearch,
        loading
      });
    }
    return nextSuffix;
  }, [suffix, suffixIcon, mergedSearchValue, mergedOpen, focused, showSearch, loading]);
  const onClearMouseDown = () => {
    onClear?.();
    containerRef.current?.focus();
    onDisplayValuesChange([], {
      type: "clear",
      values: displayValues
    });
    onInternalSearch("", false, false);
  };
  const {
    allowClear: mergedAllowClear,
    clearIcon: clearNode
  } = useAllowClear(prefixCls, displayValues, allowClear, clearIcon, disabled, mergedSearchValue, mode);
  const optionList = /* @__PURE__ */ reactExports.createElement(OptionList2, {
    ref: listRef
  });
  const mergedClassName = clsx(prefixCls, className, {
    [`${prefixCls}-focused`]: focused,
    [`${prefixCls}-multiple`]: multiple,
    [`${prefixCls}-single`]: !multiple,
    [`${prefixCls}-allow-clear`]: mergedAllowClear,
    [`${prefixCls}-show-arrow`]: mergedSuffixIcon !== void 0 && mergedSuffixIcon !== null,
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-open`]: mergedOpen,
    [`${prefixCls}-customize-input`]: customizeInputElement,
    [`${prefixCls}-show-search`]: showSearch
  });
  let renderNode = /* @__PURE__ */ reactExports.createElement(SelectInput, _extends$2({}, restProps, {
    // Ref
    ref: containerRef,
    prefixCls,
    className: mergedClassName,
    focused,
    prefix,
    suffix: mergedSuffixIcon,
    clearIcon: clearNode,
    multiple,
    mode,
    displayValues,
    placeholder,
    searchValue: mergedSearchValue,
    activeValue,
    onSearch: onInternalSearch,
    onSearchSubmit: onInternalSearchSubmit,
    onInputBlur,
    onFocus: onInternalFocus,
    onBlur: onInternalBlur,
    onClearMouseDown,
    onKeyDown: onInternalKeyDown,
    onKeyUp: onInternalKeyUp,
    onSelectorRemove,
    tokenWithEnter,
    onMouseDown: onRootMouseDown,
    components: mergedComponents
  }));
  renderNode = /* @__PURE__ */ reactExports.createElement(RefSelectTrigger, {
    ref: triggerRef,
    disabled,
    prefixCls,
    visible: mergedOpen,
    popupElement: optionList,
    animation,
    transitionName,
    popupStyle,
    popupClassName,
    direction,
    popupMatchSelectWidth,
    popupRender,
    popupAlign,
    placement,
    builtinPlacements,
    getPopupContainer,
    empty: emptyOptions,
    onPopupVisibleChange: onTriggerVisibleChange,
    onPopupMouseEnter,
    onPopupMouseDown: onRootMouseDown,
    onPopupBlur: onRootBlur
  }, renderNode);
  return /* @__PURE__ */ reactExports.createElement(BaseSelectContext.Provider, {
    value: baseSelectContext
  }, /* @__PURE__ */ reactExports.createElement(Polite, {
    visible: focused && !mergedOpen,
    values: displayValues
  }), renderNode);
});
const OptGroup = () => null;
OptGroup.isSelectOptGroup = true;
const Option = () => null;
Option.isSelectOption = true;
function isPlatformMac() {
  return /(mac\sos|macintosh)/i.test(navigator.appVersion);
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
function isTitleType(content) {
  return typeof content === "string" || typeof content === "number";
}
const OptionList = (_, ref) => {
  const {
    prefixCls,
    id,
    open,
    multiple,
    mode,
    searchValue,
    toggleOpen,
    notFoundContent,
    onPopupScroll,
    showScrollBar,
    lockOptions
  } = useBaseProps();
  const {
    maxCount,
    flattenOptions: flattenOptions2,
    onActiveValue,
    defaultActiveFirstOption,
    onSelect,
    menuItemSelectedIcon,
    rawValues,
    fieldNames,
    virtual,
    direction,
    listHeight,
    listItemHeight,
    optionRender,
    classNames: contextClassNames,
    styles: contextStyles
  } = reactExports.useContext(SelectContext);
  const itemPrefixCls = `${prefixCls}-item`;
  const memoFlattenOptions = useMemo(() => flattenOptions2, [open, lockOptions], (prev, next) => next[0] && !next[1]);
  const listRef = reactExports.useRef(null);
  const overMaxCount = reactExports.useMemo(() => multiple && isValidCount(maxCount) && rawValues?.size >= maxCount, [multiple, maxCount, rawValues?.size]);
  const onListMouseDown = (event) => {
    event.preventDefault();
  };
  const scrollIntoView = (args) => {
    listRef.current?.scrollTo(typeof args === "number" ? {
      index: args
    } : args);
  };
  const isSelected = reactExports.useCallback((value) => {
    if (mode === "combobox") {
      return false;
    }
    return rawValues.has(value);
  }, [mode, [...rawValues].toString(), rawValues.size]);
  const getEnabledActiveIndex = (index, offset = 1) => {
    const len = memoFlattenOptions.length;
    for (let i = 0; i < len; i += 1) {
      const current = (index + i * offset + len) % len;
      const {
        group,
        data
      } = memoFlattenOptions[current] || {};
      if (!group && !data?.disabled && (isSelected(data.value) || !overMaxCount)) {
        return current;
      }
    }
    return -1;
  };
  const [activeIndex, setActiveIndex] = reactExports.useState(() => getEnabledActiveIndex(0));
  const setActive = (index, fromKeyboard = false) => {
    setActiveIndex(index);
    const info = {
      source: fromKeyboard ? "keyboard" : "mouse"
    };
    const flattenItem = memoFlattenOptions[index];
    if (!flattenItem) {
      onActiveValue(null, -1, info);
      return;
    }
    onActiveValue(flattenItem.value, index, info);
  };
  reactExports.useEffect(() => {
    setActive(defaultActiveFirstOption !== false ? getEnabledActiveIndex(0) : -1);
  }, [memoFlattenOptions.length, searchValue]);
  const isAriaSelected = reactExports.useCallback((value) => {
    if (mode === "combobox") {
      return String(value).toLowerCase() === searchValue.toLowerCase();
    }
    return rawValues.has(value);
  }, [mode, searchValue, [...rawValues].toString(), rawValues.size]);
  reactExports.useEffect(() => {
    let timeoutId;
    if (!multiple && open && rawValues.size === 1) {
      const value = Array.from(rawValues)[0];
      const index = memoFlattenOptions.findIndex(({
        data
      }) => searchValue ? String(data.value).startsWith(searchValue) : data.value === value);
      if (index !== -1) {
        setActive(index);
        timeoutId = setTimeout(() => {
          scrollIntoView(index);
        });
      }
    }
    if (open) {
      listRef.current?.scrollTo(void 0);
    }
    return () => clearTimeout(timeoutId);
  }, [open, searchValue]);
  const onSelectValue = (value) => {
    if (value !== void 0) {
      onSelect(value, {
        selected: !rawValues.has(value)
      });
    }
    if (!multiple) {
      toggleOpen(false);
    }
  };
  reactExports.useImperativeHandle(ref, () => ({
    onKeyDown: (event) => {
      const {
        which,
        ctrlKey
      } = event;
      switch (which) {
        // >>> Arrow keys & ctrl + n/p on Mac
        case KeyCode.N:
        case KeyCode.P:
        case KeyCode.UP:
        case KeyCode.DOWN: {
          let offset = 0;
          if (which === KeyCode.UP) {
            offset = -1;
          } else if (which === KeyCode.DOWN) {
            offset = 1;
          } else if (isPlatformMac() && ctrlKey) {
            if (which === KeyCode.N) {
              offset = 1;
            } else if (which === KeyCode.P) {
              offset = -1;
            }
          }
          if (offset !== 0) {
            const nextActiveIndex = getEnabledActiveIndex(activeIndex + offset, offset);
            scrollIntoView(nextActiveIndex);
            setActive(nextActiveIndex, true);
          }
          break;
        }
        // >>> Select (Tab / Enter)
        case KeyCode.TAB:
        case KeyCode.ENTER: {
          const item = memoFlattenOptions[activeIndex];
          if (!item || item.data.disabled) {
            return onSelectValue(void 0);
          }
          if (!overMaxCount || rawValues.has(item.value)) {
            onSelectValue(item.value);
          } else {
            onSelectValue(void 0);
          }
          if (open) {
            event.preventDefault();
          }
          break;
        }
        // >>> Close
        case KeyCode.ESC: {
          toggleOpen(false);
          if (open) {
            event.stopPropagation();
          }
        }
      }
    },
    onKeyUp: () => {
    },
    scrollTo: (index) => {
      scrollIntoView(index);
    }
  }));
  if (memoFlattenOptions.length === 0) {
    return /* @__PURE__ */ reactExports.createElement("div", {
      role: "listbox",
      id: `${id}_list`,
      className: `${itemPrefixCls}-empty`,
      onMouseDown: onListMouseDown
    }, notFoundContent);
  }
  const omitFieldNameList = Object.keys(fieldNames).map((key) => fieldNames[key]);
  const getLabel = (item) => item.label;
  function getItemAriaProps(item, index) {
    const {
      group
    } = item;
    return {
      role: group ? "presentation" : "option",
      id: `${id}_list_${index}`
    };
  }
  const renderItem = (index) => {
    const item = memoFlattenOptions[index];
    if (!item) {
      return null;
    }
    const itemData = item.data || {};
    const {
      value
    } = itemData;
    const {
      group
    } = item;
    const attrs = pickAttrs(itemData, true);
    const mergedLabel = getLabel(item);
    return item ? /* @__PURE__ */ reactExports.createElement("div", _extends$1({
      "aria-label": typeof mergedLabel === "string" && !group ? mergedLabel : null
    }, attrs, {
      key: index
    }, getItemAriaProps(item, index), {
      "aria-selected": isAriaSelected(value)
    }), value) : null;
  };
  const a11yProps = {
    role: "listbox",
    id: `${id}_list`
  };
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, virtual && /* @__PURE__ */ reactExports.createElement("div", _extends$1({}, a11yProps, {
    style: {
      height: 0,
      width: 0,
      overflow: "hidden"
    }
  }), renderItem(activeIndex - 1), renderItem(activeIndex), renderItem(activeIndex + 1)), /* @__PURE__ */ reactExports.createElement(List, {
    itemKey: "key",
    ref: listRef,
    data: memoFlattenOptions,
    height: listHeight,
    itemHeight: listItemHeight,
    fullHeight: false,
    onMouseDown: onListMouseDown,
    onScroll: onPopupScroll,
    virtual,
    direction,
    innerProps: virtual ? null : a11yProps,
    showScrollBar,
    className: contextClassNames?.popup?.list,
    style: contextStyles?.popup?.list
  }, (item, itemIndex) => {
    const {
      group,
      groupOption,
      data,
      label,
      value
    } = item;
    const {
      key
    } = data;
    if (group) {
      const groupTitle = data.title ?? (isTitleType(label) ? label.toString() : void 0);
      return /* @__PURE__ */ reactExports.createElement("div", {
        className: clsx(itemPrefixCls, `${itemPrefixCls}-group`, data.className),
        title: groupTitle
      }, label !== void 0 ? label : key);
    }
    const {
      disabled,
      title,
      children,
      style,
      className,
      ...otherProps
    } = data;
    const passedProps = omit(otherProps, omitFieldNameList);
    const selected = isSelected(value);
    const mergedDisabled = disabled || !selected && overMaxCount;
    const optionPrefixCls = `${itemPrefixCls}-option`;
    const optionClassName = clsx(itemPrefixCls, optionPrefixCls, className, contextClassNames?.popup?.listItem, {
      [`${optionPrefixCls}-grouped`]: groupOption,
      [`${optionPrefixCls}-active`]: activeIndex === itemIndex && !mergedDisabled,
      [`${optionPrefixCls}-disabled`]: mergedDisabled,
      [`${optionPrefixCls}-selected`]: selected
    });
    const mergedLabel = getLabel(item);
    const iconVisible = !menuItemSelectedIcon || typeof menuItemSelectedIcon === "function" || selected;
    const content = typeof mergedLabel === "number" ? mergedLabel : mergedLabel || value;
    let optionTitle = isTitleType(content) ? content.toString() : void 0;
    if (title !== void 0) {
      optionTitle = title;
    }
    return /* @__PURE__ */ reactExports.createElement("div", _extends$1({}, pickAttrs(passedProps), !virtual ? getItemAriaProps(item, itemIndex) : {}, {
      "aria-selected": virtual ? void 0 : isAriaSelected(value),
      className: optionClassName,
      title: optionTitle,
      onMouseMove: () => {
        if (activeIndex === itemIndex || mergedDisabled) {
          return;
        }
        setActive(itemIndex);
      },
      onClick: () => {
        if (!mergedDisabled) {
          onSelectValue(value);
        }
      },
      style: {
        ...contextStyles?.popup?.listItem,
        ...style
      }
    }), /* @__PURE__ */ reactExports.createElement("div", {
      className: `${optionPrefixCls}-content`
    }, typeof optionRender === "function" ? optionRender(item, {
      index: itemIndex
    }) : content), /* @__PURE__ */ reactExports.isValidElement(menuItemSelectedIcon) || selected, iconVisible && /* @__PURE__ */ reactExports.createElement(TransBtn, {
      className: `${itemPrefixCls}-option-state`,
      customizeIcon: menuItemSelectedIcon,
      customizeIconProps: {
        value,
        disabled: mergedDisabled,
        isSelected: selected
      }
    }, selected ? "✓" : null));
  }));
};
const RefOptionList = /* @__PURE__ */ reactExports.forwardRef(OptionList);
const useCache = ((labeledValues, valueOptions) => {
  const cacheRef = reactExports.useRef({
    values: /* @__PURE__ */ new Map(),
    options: /* @__PURE__ */ new Map()
  });
  const filledLabeledValues = reactExports.useMemo(() => {
    const {
      values: prevValueCache,
      options: prevOptionCache
    } = cacheRef.current;
    const patchedValues = labeledValues.map((item) => {
      if (item.label === void 0) {
        return {
          ...item,
          label: prevValueCache.get(item.value)?.label
        };
      }
      return item;
    });
    const valueCache = /* @__PURE__ */ new Map();
    const optionCache = /* @__PURE__ */ new Map();
    patchedValues.forEach((item) => {
      valueCache.set(item.value, item);
      optionCache.set(item.value, valueOptions.get(item.value) || prevOptionCache.get(item.value));
    });
    cacheRef.current.values = valueCache;
    cacheRef.current.options = optionCache;
    return patchedValues;
  }, [labeledValues, valueOptions]);
  const getOption = reactExports.useCallback((val) => valueOptions.get(val) || cacheRef.current.options.get(val), [valueOptions]);
  return [filledLabeledValues, getOption];
});
function includes(test, search) {
  return toArray(test).join("").toUpperCase().includes(search);
}
const useFilterOptions = ((options, fieldNames, searchValue, filterOption, optionFilterProp) => {
  return reactExports.useMemo(() => {
    if (!searchValue || filterOption === false) {
      return options;
    }
    const {
      options: fieldOptions,
      label: fieldLabel,
      value: fieldValue
    } = fieldNames;
    const filteredOptions = [];
    const customizeFilter = typeof filterOption === "function";
    const upperSearch = searchValue.toUpperCase();
    const filterFunc = customizeFilter ? filterOption : (_, option) => {
      if (optionFilterProp && optionFilterProp.length) {
        return optionFilterProp.some((prop) => includes(option[prop], upperSearch));
      }
      if (option[fieldOptions]) {
        return includes(option[fieldLabel !== "children" ? fieldLabel : "label"], upperSearch);
      }
      return includes(option[fieldValue], upperSearch);
    };
    const wrapOption = customizeFilter ? (opt) => injectPropsWithOption(opt) : (opt) => opt;
    options.forEach((item) => {
      if (item[fieldOptions]) {
        const matchGroup = filterFunc(searchValue, wrapOption(item));
        if (matchGroup) {
          filteredOptions.push(item);
        } else {
          const subOptions = item[fieldOptions].filter((subItem) => filterFunc(searchValue, wrapOption(subItem)));
          if (subOptions.length) {
            filteredOptions.push({
              ...item,
              [fieldOptions]: subOptions
            });
          }
        }
        return;
      }
      if (filterFunc(searchValue, wrapOption(item))) {
        filteredOptions.push(item);
      }
    });
    return filteredOptions;
  }, [options, filterOption, optionFilterProp, searchValue, fieldNames]);
});
function convertNodeToOption(node) {
  const {
    key,
    props: {
      children,
      value,
      ...restProps
    }
  } = node;
  return {
    key,
    value: value !== void 0 ? value : key,
    children,
    ...restProps
  };
}
function convertChildrenToData(nodes, optionOnly = false) {
  return toArray$1(nodes).map((node, index) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(node) || !node.type) {
      return null;
    }
    const {
      type: {
        isSelectOptGroup
      },
      key,
      props: {
        children,
        ...restProps
      }
    } = node;
    if (optionOnly || !isSelectOptGroup) {
      return convertNodeToOption(node);
    }
    return {
      key: `__RC_SELECT_GRP__${key === null ? index : key}__`,
      label: key,
      ...restProps,
      options: convertChildrenToData(children)
    };
  }).filter((data) => data);
}
const useOptions = (options, children, fieldNames, optionFilterProp, optionLabelProp) => {
  return reactExports.useMemo(() => {
    let mergedOptions = options;
    const childrenAsData = !options;
    if (childrenAsData) {
      mergedOptions = convertChildrenToData(children);
    }
    const valueOptions = /* @__PURE__ */ new Map();
    const labelOptions = /* @__PURE__ */ new Map();
    const setLabelOptions = (labelOptionsMap, option, key) => {
      if (key && typeof key === "string") {
        labelOptionsMap.set(option[key], option);
      }
    };
    const dig = (optionList, isChildren = false) => {
      for (let i = 0; i < optionList.length; i += 1) {
        const option = optionList[i];
        if (!option[fieldNames.options] || isChildren) {
          valueOptions.set(option[fieldNames.value], option);
          setLabelOptions(labelOptions, option, fieldNames.label);
          optionFilterProp.forEach((prop) => {
            setLabelOptions(labelOptions, option, prop);
          });
          setLabelOptions(labelOptions, option, optionLabelProp);
        } else {
          dig(option[fieldNames.options], true);
        }
      }
    };
    dig(mergedOptions);
    return {
      options: mergedOptions,
      valueOptions,
      labelOptions
    };
  }, [options, children, fieldNames, optionFilterProp, optionLabelProp]);
};
function useRefFunc(callback) {
  const funcRef = reactExports.useRef();
  funcRef.current = callback;
  const cacheFn = reactExports.useCallback((...args) => {
    return funcRef.current(...args);
  }, []);
  return cacheFn;
}
function useSearchConfig(showSearch, props, mode) {
  const {
    filterOption,
    searchValue,
    optionFilterProp,
    filterSort,
    onSearch,
    autoClearSearchValue
  } = props;
  return reactExports.useMemo(() => {
    const isObject = typeof showSearch === "object";
    const searchConfig = {
      filterOption,
      searchValue,
      optionFilterProp,
      filterSort,
      onSearch,
      autoClearSearchValue,
      ...isObject ? showSearch : {}
    };
    return [isObject || mode === "combobox" || mode === "tags" || mode === "multiple" && showSearch === void 0 ? true : showSearch, searchConfig];
  }, [mode, showSearch, filterOption, searchValue, optionFilterProp, filterSort, onSearch, autoClearSearchValue]);
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
const OMIT_DOM_PROPS = ["inputValue"];
function isRawValue(value) {
  return !value || typeof value !== "object";
}
const Select = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    id,
    mode,
    prefixCls = "rc-select",
    backfill,
    fieldNames,
    // Search
    showSearch,
    searchValue: legacySearchValue,
    onSearch: legacyOnSearch,
    autoClearSearchValue: legacyAutoClearSearchValue,
    filterOption: legacyFilterOption,
    optionFilterProp: legacyOptionFilterProp,
    filterSort: legacyFilterSort,
    // Select
    onSelect,
    onDeselect,
    onActive,
    popupMatchSelectWidth = true,
    optionLabelProp,
    options,
    optionRender,
    children,
    defaultActiveFirstOption,
    menuItemSelectedIcon,
    virtual,
    direction,
    listHeight = 200,
    listItemHeight = 20,
    labelRender,
    // Value
    value,
    defaultValue,
    labelInValue,
    onChange,
    maxCount,
    classNames,
    styles,
    ...restProps
  } = props;
  const searchProps = {
    searchValue: legacySearchValue,
    onSearch: legacyOnSearch,
    autoClearSearchValue: legacyAutoClearSearchValue,
    filterOption: legacyFilterOption,
    optionFilterProp: legacyOptionFilterProp,
    filterSort: legacyFilterSort
  };
  const [mergedShowSearch, searchConfig] = useSearchConfig(showSearch, searchProps, mode);
  const {
    filterOption,
    searchValue,
    optionFilterProp,
    filterSort,
    onSearch,
    autoClearSearchValue = true
  } = searchConfig;
  const normalizedOptionFilterProp = reactExports.useMemo(() => {
    if (!optionFilterProp) return [];
    return Array.isArray(optionFilterProp) ? optionFilterProp : [optionFilterProp];
  }, [optionFilterProp]);
  const mergedId = useId(id);
  const multiple = isMultiple(mode);
  const childrenAsData = !!(!options && children);
  const mergedFilterOption = reactExports.useMemo(() => {
    if (filterOption === void 0 && mode === "combobox") {
      return false;
    }
    return filterOption;
  }, [filterOption, mode]);
  const mergedFieldNames = reactExports.useMemo(
    () => fillFieldNames(fieldNames, childrenAsData),
    /* eslint-disable react-hooks/exhaustive-deps */
    [
      // We stringify fieldNames to avoid unnecessary re-renders.
      JSON.stringify(fieldNames),
      childrenAsData
    ]
    /* eslint-enable react-hooks/exhaustive-deps */
  );
  const [internalSearchValue, setSearchValue] = useControlledState("", searchValue);
  const mergedSearchValue = internalSearchValue || "";
  const parsedOptions = useOptions(options, children, mergedFieldNames, normalizedOptionFilterProp, optionLabelProp);
  const {
    valueOptions,
    labelOptions,
    options: mergedOptions
  } = parsedOptions;
  const convert2LabelValues = reactExports.useCallback((draftValues) => {
    const valueList = toArray(draftValues);
    return valueList.map((val) => {
      let rawValue;
      let rawLabel;
      let rawDisabled;
      let rawTitle;
      if (isRawValue(val)) {
        rawValue = val;
      } else {
        rawLabel = val.label;
        rawValue = val.value;
      }
      const option = valueOptions.get(rawValue);
      if (option) {
        if (rawLabel === void 0) rawLabel = option?.[optionLabelProp || mergedFieldNames.label];
        rawDisabled = option?.disabled;
        rawTitle = option?.title;
      }
      return {
        label: rawLabel,
        value: rawValue,
        key: rawValue,
        disabled: rawDisabled,
        title: rawTitle
      };
    });
  }, [mergedFieldNames, optionLabelProp, valueOptions]);
  const [internalValue, setInternalValue] = useControlledState(defaultValue, value);
  const rawLabeledValues = reactExports.useMemo(() => {
    const newInternalValue = multiple && internalValue === null ? [] : internalValue;
    const values = convert2LabelValues(newInternalValue);
    if (mode === "combobox" && isComboNoValue(values[0]?.value)) {
      return [];
    }
    return values;
  }, [internalValue, convert2LabelValues, mode, multiple]);
  const [mergedValues, getMixedOption] = useCache(rawLabeledValues, valueOptions);
  const displayValues = reactExports.useMemo(() => {
    if (!mode && mergedValues.length === 1) {
      const firstValue = mergedValues[0];
      if (firstValue.value === null && (firstValue.label === null || firstValue.label === void 0)) {
        return [];
      }
    }
    return mergedValues.map((item) => ({
      ...item,
      label: (typeof labelRender === "function" ? labelRender(item) : item.label) ?? item.value
    }));
  }, [mode, mergedValues, labelRender]);
  const rawValues = reactExports.useMemo(() => new Set(mergedValues.map((val) => val.value)), [mergedValues]);
  reactExports.useEffect(() => {
    if (mode === "combobox") {
      const strValue = mergedValues[0]?.value;
      setSearchValue(hasValue(strValue) ? String(strValue) : "");
    }
  }, [mergedValues]);
  const createTagOption = useRefFunc((val, label) => {
    const mergedLabel = label ?? val;
    return {
      [mergedFieldNames.value]: val,
      [mergedFieldNames.label]: mergedLabel
    };
  });
  const filledTagOptions = reactExports.useMemo(() => {
    if (mode !== "tags") {
      return mergedOptions;
    }
    const cloneOptions = [...mergedOptions];
    const existOptions = (val) => valueOptions.has(val);
    [...mergedValues].sort((a, b) => a.value < b.value ? -1 : 1).forEach((item) => {
      const val = item.value;
      if (!existOptions(val)) {
        cloneOptions.push(createTagOption(val, item.label));
      }
    });
    return cloneOptions;
  }, [createTagOption, mergedOptions, valueOptions, mergedValues, mode]);
  const filteredOptions = useFilterOptions(filledTagOptions, mergedFieldNames, mergedSearchValue, mergedFilterOption, normalizedOptionFilterProp);
  const filledSearchOptions = reactExports.useMemo(() => {
    const hasItemMatchingSearch = (item) => {
      if (normalizedOptionFilterProp.length) {
        return normalizedOptionFilterProp.some((prop) => item?.[prop] === mergedSearchValue);
      }
      return item?.value === mergedSearchValue;
    };
    if (mode !== "tags" || !mergedSearchValue || filteredOptions.some((item) => hasItemMatchingSearch(item))) {
      return filteredOptions;
    }
    if (filteredOptions.some((item) => item[mergedFieldNames.value] === mergedSearchValue)) {
      return filteredOptions;
    }
    return [createTagOption(mergedSearchValue), ...filteredOptions];
  }, [createTagOption, normalizedOptionFilterProp, mode, filteredOptions, mergedSearchValue, mergedFieldNames]);
  const sorter = (inputOptions) => {
    const sortedOptions = [...inputOptions].sort((a, b) => filterSort(a, b, {
      searchValue: mergedSearchValue
    }));
    return sortedOptions.map((item) => {
      if (Array.isArray(item.options)) {
        return {
          ...item,
          options: item.options.length > 0 ? sorter(item.options) : item.options
        };
      }
      return item;
    });
  };
  const orderedFilteredOptions = reactExports.useMemo(() => {
    if (!filterSort) {
      return filledSearchOptions;
    }
    return sorter(filledSearchOptions);
  }, [filledSearchOptions, filterSort, mergedSearchValue]);
  const displayOptions = reactExports.useMemo(() => flattenOptions(orderedFilteredOptions, {
    fieldNames: mergedFieldNames,
    childrenAsData
  }), [orderedFilteredOptions, mergedFieldNames, childrenAsData]);
  const triggerChange = (values) => {
    const labeledValues = convert2LabelValues(values);
    setInternalValue(labeledValues);
    if (onChange && // Trigger event only when value changed
    (labeledValues.length !== mergedValues.length || labeledValues.some((newVal, index) => mergedValues[index]?.value !== newVal?.value))) {
      const returnValues = labelInValue ? labeledValues.map(({
        label: l,
        value: v
      }) => ({
        label: l,
        value: v
      })) : labeledValues.map((v) => v.value);
      const returnOptions = labeledValues.map((v) => injectPropsWithOption(getMixedOption(v.value)));
      onChange(
        // Value
        multiple ? returnValues : returnValues[0],
        // Option
        multiple ? returnOptions : returnOptions[0]
      );
    }
  };
  const [activeValue, setActiveValue] = reactExports.useState(null);
  const [accessibilityIndex, setAccessibilityIndex] = reactExports.useState(0);
  const mergedDefaultActiveFirstOption = defaultActiveFirstOption !== void 0 ? defaultActiveFirstOption : mode !== "combobox";
  const activeEventRef = reactExports.useRef();
  const onActiveValue = reactExports.useCallback((active, index, {
    source = "keyboard"
  } = {}) => {
    setAccessibilityIndex(index);
    if (backfill && mode === "combobox" && active !== null && source === "keyboard") {
      setActiveValue(String(active));
    }
    const promise = Promise.resolve().then(() => {
      if (activeEventRef.current === promise) {
        onActive?.(active);
      }
    });
    activeEventRef.current = promise;
  }, [backfill, mode, onActive]);
  const triggerSelect = (val, selected, type) => {
    const getSelectEnt = () => {
      const option = getMixedOption(val);
      return [labelInValue ? {
        label: option?.[mergedFieldNames.label],
        value: val
      } : val, injectPropsWithOption(option)];
    };
    if (selected && onSelect) {
      const [wrappedValue, option] = getSelectEnt();
      onSelect(wrappedValue, option);
    } else if (!selected && onDeselect && type !== "clear") {
      const [wrappedValue, option] = getSelectEnt();
      onDeselect(wrappedValue, option);
    }
  };
  const onInternalSelect = useRefFunc((val, info) => {
    let cloneValues;
    const mergedSelect = multiple ? info.selected : true;
    if (mergedSelect) {
      cloneValues = multiple ? [...mergedValues, val] : [val];
    } else {
      cloneValues = mergedValues.filter((v) => v.value !== val);
    }
    triggerChange(cloneValues);
    triggerSelect(val, mergedSelect);
    if (mode === "combobox") {
      setActiveValue("");
    } else if (!isMultiple || autoClearSearchValue) {
      setSearchValue("");
      setActiveValue("");
    }
  });
  const onDisplayValuesChange = (nextValues, info) => {
    triggerChange(nextValues);
    const {
      type,
      values
    } = info;
    if (type === "remove" || type === "clear") {
      values.forEach((item) => {
        triggerSelect(item.value, false, type);
      });
    }
  };
  const onInternalSearch = (searchText, info) => {
    setSearchValue(searchText);
    setActiveValue(null);
    if (info.source === "submit") {
      const formatted = (searchText || "").trim();
      if (formatted) {
        const newRawValues = Array.from(/* @__PURE__ */ new Set([...rawValues, formatted]));
        triggerChange(newRawValues);
        triggerSelect(formatted, true);
        setSearchValue("");
      }
      return;
    }
    if (info.source !== "blur") {
      if (mode === "combobox") {
        triggerChange(searchText);
      }
      onSearch?.(searchText);
    }
  };
  const onInternalSearchSplit = (words) => {
    let patchValues = words;
    if (mode !== "tags") {
      patchValues = words.map((word) => {
        const opt = labelOptions.get(word);
        return opt?.value;
      }).filter((val) => val !== void 0);
    }
    const newRawValues = Array.from(/* @__PURE__ */ new Set([...rawValues, ...patchValues]));
    triggerChange(newRawValues);
    newRawValues.forEach((newRawValue) => {
      triggerSelect(newRawValue, true);
    });
  };
  const selectContext = reactExports.useMemo(() => {
    const realVirtual = virtual !== false && popupMatchSelectWidth !== false;
    return {
      ...parsedOptions,
      flattenOptions: displayOptions,
      onActiveValue,
      defaultActiveFirstOption: mergedDefaultActiveFirstOption,
      onSelect: onInternalSelect,
      menuItemSelectedIcon,
      rawValues,
      fieldNames: mergedFieldNames,
      virtual: realVirtual,
      direction,
      listHeight,
      listItemHeight,
      childrenAsData,
      maxCount,
      optionRender,
      classNames,
      styles
    };
  }, [maxCount, parsedOptions, displayOptions, onActiveValue, mergedDefaultActiveFirstOption, onInternalSelect, menuItemSelectedIcon, rawValues, mergedFieldNames, virtual, popupMatchSelectWidth, direction, listHeight, listItemHeight, childrenAsData, optionRender, classNames, styles]);
  return /* @__PURE__ */ reactExports.createElement(SelectContext.Provider, {
    value: selectContext
  }, /* @__PURE__ */ reactExports.createElement(BaseSelect, _extends({}, restProps, {
    // >>> MISC
    id: mergedId,
    prefixCls,
    ref,
    omitDomProps: OMIT_DOM_PROPS,
    mode,
    classNames,
    styles,
    displayValues,
    onDisplayValuesChange,
    maxCount,
    direction,
    showSearch: mergedShowSearch,
    searchValue: mergedSearchValue,
    onSearch: onInternalSearch,
    autoClearSearchValue,
    onSearchSplit: onInternalSearchSplit,
    popupMatchSelectWidth,
    OptionList: RefOptionList,
    emptyOptions: !displayOptions.length,
    activeValue,
    activeDescendantId: `${mergedId}_list_${accessibilityIndex}`
  })));
});
const TypedSelect = Select;
TypedSelect.Option = Option;
TypedSelect.OptGroup = OptGroup;
export {
  Option as O,
  TypedSelect as T,
  OptGroup as a
};
