import { c as clsx } from "./clsx.mjs";
import { F as ForwardOverflow } from "./rc-component__overflow.mjs";
import { u as useMemo, i as isEqual, J as getFocusNodeList, K as KeyCode, w as wrapperRaf, C as warningOnce, e as useComposeRef, o as omit, t as toArray, n as useId, k as useControlledState } from "./rc-component__util.mjs";
import { r as reactExports } from "./react.mjs";
import { r as reactDomExports } from "./react-dom.mjs";
import { T as Trigger } from "./rc-component__trigger.mjs";
import { C as CSSMotion } from "./rc-component__motion.mjs";
const IdContext = /* @__PURE__ */ reactExports.createContext(null);
function getMenuId(uuid, eventKey) {
  return `${uuid}-${eventKey}`;
}
function useMenuId(eventKey) {
  const id = reactExports.useContext(IdContext);
  return getMenuId(id, eventKey);
}
const MenuContext = /* @__PURE__ */ reactExports.createContext(null);
function mergeProps(origin, target) {
  const clone = {
    ...origin
  };
  Object.keys(target).forEach((key) => {
    const value = target[key];
    if (value !== void 0) {
      clone[key] = value;
    }
  });
  return clone;
}
function InheritableContextProvider({
  children,
  locked,
  ...restProps
}) {
  const context = reactExports.useContext(MenuContext);
  const inheritableContext = useMemo(() => mergeProps(context, restProps), [context, restProps], (prev, next) => !locked && (prev[0] !== next[0] || !isEqual(prev[1], next[1], true)));
  return /* @__PURE__ */ reactExports.createElement(MenuContext.Provider, {
    value: inheritableContext
  }, children);
}
const EmptyList = [];
const PathRegisterContext = /* @__PURE__ */ reactExports.createContext(null);
function useMeasure() {
  return reactExports.useContext(PathRegisterContext);
}
const PathTrackerContext = /* @__PURE__ */ reactExports.createContext(EmptyList);
function useFullPath(eventKey) {
  const parentKeyPath = reactExports.useContext(PathTrackerContext);
  return reactExports.useMemo(() => eventKey !== void 0 ? [...parentKeyPath, eventKey] : parentKeyPath, [parentKeyPath, eventKey]);
}
const PathUserContext = /* @__PURE__ */ reactExports.createContext(null);
const PrivateContext = /* @__PURE__ */ reactExports.createContext({});
const {
  LEFT,
  RIGHT,
  UP,
  DOWN,
  ENTER,
  ESC,
  HOME,
  END
} = KeyCode;
const ArrowKeys = [UP, DOWN, LEFT, RIGHT];
function getOffset(mode, isRootLevel, isRtl, which) {
  const prev = "prev";
  const next = "next";
  const children = "children";
  const parent = "parent";
  if (mode === "inline" && which === ENTER) {
    return {
      inlineTrigger: true
    };
  }
  const inline = {
    [UP]: prev,
    [DOWN]: next
  };
  const horizontal = {
    [LEFT]: isRtl ? next : prev,
    [RIGHT]: isRtl ? prev : next,
    [DOWN]: children,
    [ENTER]: children
  };
  const vertical = {
    [UP]: prev,
    [DOWN]: next,
    [ENTER]: children,
    [ESC]: parent,
    [LEFT]: isRtl ? children : parent,
    [RIGHT]: isRtl ? parent : children
  };
  const offsets = {
    inline,
    horizontal,
    vertical,
    inlineSub: inline,
    horizontalSub: vertical,
    verticalSub: vertical
  };
  const type = offsets[`${mode}${isRootLevel ? "" : "Sub"}`]?.[which];
  switch (type) {
    case prev:
      return {
        offset: -1,
        sibling: true
      };
    case next:
      return {
        offset: 1,
        sibling: true
      };
    case parent:
      return {
        offset: -1,
        sibling: false
      };
    case children:
      return {
        offset: 1,
        sibling: false
      };
    default:
      return null;
  }
}
function findContainerUL(element) {
  let current = element;
  while (current) {
    if (current.getAttribute("data-menu-list")) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}
function getFocusElement(activeElement, elements) {
  let current = activeElement || document.activeElement;
  while (current) {
    if (elements.has(current)) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}
function getFocusableElements(container, elements) {
  const list = getFocusNodeList(container, true);
  return list.filter((ele) => elements.has(ele));
}
function getNextFocusElement(parentQueryContainer, elements, focusMenuElement, offset = 1) {
  if (!parentQueryContainer) {
    return null;
  }
  const sameLevelFocusableMenuElementList = getFocusableElements(parentQueryContainer, elements);
  const count = sameLevelFocusableMenuElementList.length;
  let focusIndex = sameLevelFocusableMenuElementList.findIndex((ele) => focusMenuElement === ele);
  if (offset < 0) {
    if (focusIndex === -1) {
      focusIndex = count - 1;
    } else {
      focusIndex -= 1;
    }
  } else if (offset > 0) {
    focusIndex += 1;
  }
  focusIndex = (focusIndex + count) % count;
  return sameLevelFocusableMenuElementList[focusIndex];
}
const refreshElements = (keys, id) => {
  const elements = /* @__PURE__ */ new Set();
  const key2element = /* @__PURE__ */ new Map();
  const element2key = /* @__PURE__ */ new Map();
  keys.forEach((key) => {
    const element = document.querySelector(`[data-menu-id='${getMenuId(id, key)}']`);
    if (element) {
      elements.add(element);
      element2key.set(element, key);
      key2element.set(key, element);
    }
  });
  return {
    elements,
    key2element,
    element2key
  };
};
function useAccessibility(mode, activeKey, isRtl, id, containerRef, getKeys, getKeyPath, triggerActiveKey, triggerAccessibilityOpen, originOnKeyDown) {
  const rafRef = reactExports.useRef();
  const activeRef = reactExports.useRef();
  activeRef.current = activeKey;
  const cleanRaf = () => {
    wrapperRaf.cancel(rafRef.current);
  };
  reactExports.useEffect(() => () => {
    cleanRaf();
  }, []);
  return (e) => {
    const {
      which
    } = e;
    if ([...ArrowKeys, ENTER, ESC, HOME, END].includes(which)) {
      const keys = getKeys();
      let refreshedElements = refreshElements(keys, id);
      const {
        elements,
        key2element,
        element2key
      } = refreshedElements;
      const activeElement = key2element.get(activeKey);
      const focusMenuElement = getFocusElement(activeElement, elements);
      const focusMenuKey = element2key.get(focusMenuElement);
      const offsetObj = getOffset(mode, getKeyPath(focusMenuKey, true).length === 1, isRtl, which);
      if (!offsetObj && which !== HOME && which !== END) {
        return;
      }
      if (ArrowKeys.includes(which) || [HOME, END].includes(which)) {
        e.preventDefault();
      }
      const tryFocus = (menuElement) => {
        if (menuElement) {
          let focusTargetElement = menuElement;
          const link = menuElement.querySelector("a");
          if (link?.getAttribute("href")) {
            focusTargetElement = link;
          }
          const targetKey = element2key.get(menuElement);
          triggerActiveKey(targetKey);
          cleanRaf();
          rafRef.current = wrapperRaf(() => {
            if (activeRef.current === targetKey) {
              focusTargetElement.focus();
            }
          });
        }
      };
      if ([HOME, END].includes(which) || offsetObj.sibling || !focusMenuElement) {
        let parentQueryContainer;
        if (!focusMenuElement || mode === "inline") {
          parentQueryContainer = containerRef.current;
        } else {
          parentQueryContainer = findContainerUL(focusMenuElement);
        }
        let targetElement;
        const focusableElements = getFocusableElements(parentQueryContainer, elements);
        if (which === HOME) {
          targetElement = focusableElements[0];
        } else if (which === END) {
          targetElement = focusableElements[focusableElements.length - 1];
        } else {
          targetElement = getNextFocusElement(parentQueryContainer, elements, focusMenuElement, offsetObj.offset);
        }
        tryFocus(targetElement);
      } else if (offsetObj.inlineTrigger) {
        triggerAccessibilityOpen(focusMenuKey);
      } else if (offsetObj.offset > 0) {
        triggerAccessibilityOpen(focusMenuKey, true);
        cleanRaf();
        rafRef.current = wrapperRaf(() => {
          refreshedElements = refreshElements(keys, id);
          const controlId = focusMenuElement.getAttribute("aria-controls");
          const subQueryContainer = document.getElementById(controlId);
          const targetElement = getNextFocusElement(subQueryContainer, refreshedElements.elements);
          tryFocus(targetElement);
        }, 5);
      } else if (offsetObj.offset < 0) {
        const keyPath = getKeyPath(focusMenuKey, true);
        const parentKey = keyPath[keyPath.length - 2];
        const parentMenuElement = key2element.get(parentKey);
        triggerAccessibilityOpen(parentKey, false);
        tryFocus(parentMenuElement);
      }
    }
    originOnKeyDown?.(e);
  };
}
function nextSlice(callback) {
  Promise.resolve().then(callback);
}
const PATH_SPLIT = "__RC_UTIL_PATH_SPLIT__";
const getPathStr = (keyPath) => keyPath.join(PATH_SPLIT);
const getPathKeys = (keyPathStr) => keyPathStr.split(PATH_SPLIT);
const OVERFLOW_KEY = "rc-menu-more";
function useKeyRecords() {
  const [, internalForceUpdate] = reactExports.useState({});
  const key2pathRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const path2keyRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const [overflowKeys, setOverflowKeys] = reactExports.useState([]);
  const updateRef = reactExports.useRef(0);
  const destroyRef = reactExports.useRef(false);
  const forceUpdate = () => {
    if (!destroyRef.current) {
      internalForceUpdate({});
    }
  };
  const registerPath = reactExports.useCallback((key, keyPath) => {
    const connectedPath = getPathStr(keyPath);
    path2keyRef.current.set(connectedPath, key);
    key2pathRef.current.set(key, connectedPath);
    updateRef.current += 1;
    const id = updateRef.current;
    nextSlice(() => {
      if (id === updateRef.current) {
        forceUpdate();
      }
    });
  }, []);
  const unregisterPath = reactExports.useCallback((key, keyPath) => {
    const connectedPath = getPathStr(keyPath);
    path2keyRef.current.delete(connectedPath);
    key2pathRef.current.delete(key);
  }, []);
  const refreshOverflowKeys = reactExports.useCallback((keys) => {
    setOverflowKeys(keys);
  }, []);
  const getKeyPath = reactExports.useCallback((eventKey, includeOverflow) => {
    const fullPath = key2pathRef.current.get(eventKey) || "";
    const keys = getPathKeys(fullPath);
    if (includeOverflow && overflowKeys.includes(keys[0])) {
      keys.unshift(OVERFLOW_KEY);
    }
    return keys;
  }, [overflowKeys]);
  const isSubPathKey = reactExports.useCallback((pathKeys, eventKey) => pathKeys.filter((item) => item !== void 0).some((pathKey) => {
    const pathKeyList = getKeyPath(pathKey, true);
    return pathKeyList.includes(eventKey);
  }), [getKeyPath]);
  const getKeys = () => {
    const keys = [...key2pathRef.current.keys()];
    if (overflowKeys.length) {
      keys.push(OVERFLOW_KEY);
    }
    return keys;
  };
  const getSubPathKeys = reactExports.useCallback((key) => {
    const connectedPath = `${key2pathRef.current.get(key)}${PATH_SPLIT}`;
    const pathKeys = /* @__PURE__ */ new Set();
    [...path2keyRef.current.keys()].forEach((pathKey) => {
      if (pathKey.startsWith(connectedPath)) {
        pathKeys.add(path2keyRef.current.get(pathKey));
      }
    });
    return pathKeys;
  }, []);
  reactExports.useEffect(() => () => {
    destroyRef.current = true;
  }, []);
  return {
    // Register
    registerPath,
    unregisterPath,
    refreshOverflowKeys,
    // Util
    isSubPathKey,
    getKeyPath,
    getKeys,
    getSubPathKeys
  };
}
function useMemoCallback(func) {
  const funRef = reactExports.useRef(func);
  funRef.current = func;
  const callback = reactExports.useCallback((...args) => funRef.current?.(...args), []);
  return func ? callback : void 0;
}
function useActive(eventKey, disabled, onMouseEnter, onMouseLeave) {
  const {
    // Active
    activeKey,
    onActive,
    onInactive
  } = reactExports.useContext(MenuContext);
  const ret = {
    active: activeKey === eventKey
  };
  if (!disabled) {
    ret.onMouseEnter = (domEvent) => {
      onMouseEnter?.({
        key: eventKey,
        domEvent
      });
      onActive(eventKey);
    };
    ret.onMouseLeave = (domEvent) => {
      onMouseLeave?.({
        key: eventKey,
        domEvent
      });
      onInactive(eventKey);
    };
  }
  return ret;
}
function useDirectionStyle(level) {
  const {
    mode,
    rtl,
    inlineIndent
  } = reactExports.useContext(MenuContext);
  if (mode !== "inline") {
    return null;
  }
  const len = level;
  return rtl ? {
    paddingRight: len * inlineIndent
  } : {
    paddingLeft: len * inlineIndent
  };
}
function Icon({
  icon,
  props,
  children
}) {
  let iconNode;
  if (icon === null || icon === false) {
    return null;
  }
  if (typeof icon === "function") {
    iconNode = /* @__PURE__ */ reactExports.createElement(icon, {
      ...props
    });
  } else if (typeof icon !== "boolean") {
    iconNode = icon;
  }
  return iconNode || children || null;
}
function warnItemProp({
  item,
  ...restInfo
}) {
  Object.defineProperty(restInfo, "item", {
    get: () => {
      warningOnce(false, "`info.item` is deprecated since we will move to function component that not provides React Node instance in future.");
      return item;
    }
  });
  return restInfo;
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
class LegacyMenuItem extends reactExports.Component {
  render() {
    const {
      title,
      attribute,
      elementRef,
      ...restProps
    } = this.props;
    const passedProps = omit(restProps, ["eventKey", "popupClassName", "popupOffset", "onTitleClick"]);
    warningOnce(!attribute, "`attribute` of Menu.Item is deprecated. Please pass attribute directly.");
    return /* @__PURE__ */ reactExports.createElement(ForwardOverflow.Item, _extends$6({}, attribute, {
      title: typeof title === "string" ? title : void 0
    }, passedProps, {
      ref: elementRef
    }));
  }
}
const InternalMenuItem = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    style,
    className,
    eventKey,
    warnKey,
    disabled,
    itemIcon,
    children,
    // Aria
    role,
    // Active
    onMouseEnter,
    onMouseLeave,
    onClick,
    onKeyDown,
    onFocus,
    ...restProps
  } = props;
  const domDataId = useMenuId(eventKey);
  const {
    prefixCls,
    onItemClick,
    disabled: contextDisabled,
    overflowDisabled,
    // Icon
    itemIcon: contextItemIcon,
    // Select
    selectedKeys,
    // Active
    onActive
  } = reactExports.useContext(MenuContext);
  const {
    _internalRenderMenuItem
  } = reactExports.useContext(PrivateContext);
  const itemCls = `${prefixCls}-item`;
  const legacyMenuItemRef = reactExports.useRef();
  const elementRef = reactExports.useRef();
  const mergedDisabled = contextDisabled || disabled;
  const mergedEleRef = useComposeRef(ref, elementRef);
  const connectedKeys = useFullPath(eventKey);
  const getEventInfo = (e) => {
    return {
      key: eventKey,
      // Note: For legacy code is reversed which not like other antd component
      keyPath: [...connectedKeys].reverse(),
      item: legacyMenuItemRef.current,
      domEvent: e
    };
  };
  const mergedItemIcon = itemIcon || contextItemIcon;
  const {
    active,
    ...activeProps
  } = useActive(eventKey, mergedDisabled, onMouseEnter, onMouseLeave);
  const selected = selectedKeys.includes(eventKey);
  const directionStyle = useDirectionStyle(connectedKeys.length);
  const onInternalClick = (e) => {
    if (mergedDisabled) {
      return;
    }
    const info = getEventInfo(e);
    onClick?.(warnItemProp(info));
    onItemClick(info);
  };
  const onInternalKeyDown = (e) => {
    onKeyDown?.(e);
    if (e.which === KeyCode.ENTER) {
      const info = getEventInfo(e);
      onClick?.(warnItemProp(info));
      onItemClick(info);
    }
  };
  const onInternalFocus = (e) => {
    onActive(eventKey);
    onFocus?.(e);
  };
  const optionRoleProps = {};
  if (props.role === "option") {
    optionRoleProps["aria-selected"] = selected;
  }
  let renderNode = /* @__PURE__ */ reactExports.createElement(LegacyMenuItem, _extends$6({
    ref: legacyMenuItemRef,
    elementRef: mergedEleRef,
    role: role === null ? "none" : role || "menuitem",
    tabIndex: disabled ? null : -1,
    "data-menu-id": overflowDisabled && domDataId ? null : domDataId
  }, omit(restProps, ["extra"]), activeProps, optionRoleProps, {
    component: "li",
    "aria-disabled": disabled,
    style: {
      ...directionStyle,
      ...style
    },
    className: clsx(itemCls, {
      [`${itemCls}-active`]: active,
      [`${itemCls}-selected`]: selected,
      [`${itemCls}-disabled`]: mergedDisabled
    }, className),
    onClick: onInternalClick,
    onKeyDown: onInternalKeyDown,
    onFocus: onInternalFocus
  }), children, /* @__PURE__ */ reactExports.createElement(Icon, {
    props: {
      ...props,
      isSelected: selected
    },
    icon: mergedItemIcon
  }));
  if (_internalRenderMenuItem) {
    renderNode = _internalRenderMenuItem(renderNode, props, {
      selected
    });
  }
  return renderNode;
});
function MenuItem(props, ref) {
  const {
    eventKey
  } = props;
  const measure = useMeasure();
  const connectedKeyPath = useFullPath(eventKey);
  reactExports.useEffect(() => {
    if (measure) {
      measure.registerPath(eventKey, connectedKeyPath);
      return () => {
        measure.unregisterPath(eventKey, connectedKeyPath);
      };
    }
  }, [connectedKeyPath]);
  if (measure) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(InternalMenuItem, _extends$6({}, props, {
    ref
  }));
}
const MenuItem$1 = /* @__PURE__ */ reactExports.forwardRef(MenuItem);
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
const InternalSubMenuList = ({
  className,
  children,
  ...restProps
}, ref) => {
  const {
    prefixCls,
    mode,
    rtl
  } = reactExports.useContext(MenuContext);
  return /* @__PURE__ */ reactExports.createElement("ul", _extends$5({
    className: clsx(prefixCls, rtl && `${prefixCls}-rtl`, `${prefixCls}-sub`, `${prefixCls}-${mode === "inline" ? "inline" : "vertical"}`, className),
    role: "menu"
  }, restProps, {
    "data-menu-list": true,
    ref
  }), children);
};
const SubMenuList = /* @__PURE__ */ reactExports.forwardRef(InternalSubMenuList);
function parseChildren(children, keyPath) {
  return toArray(children).map((child, index) => {
    if (/* @__PURE__ */ reactExports.isValidElement(child)) {
      const {
        key
      } = child;
      let eventKey = child.props?.eventKey ?? key;
      const emptyKey = eventKey === null || eventKey === void 0;
      if (emptyKey) {
        eventKey = `tmp_key-${[...keyPath, index].join("-")}`;
      }
      const cloneProps = {
        key: eventKey,
        eventKey
      };
      return /* @__PURE__ */ reactExports.cloneElement(child, cloneProps);
    }
    return child;
  });
}
const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};
const placements = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflow
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflow
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflow
  },
  leftBottom: {
    points: ["br", "bl"],
    overflow: autoAdjustOverflow
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflow
  },
  rightBottom: {
    points: ["bl", "br"],
    overflow: autoAdjustOverflow
  }
};
const placementsRtl = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflow
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflow
  },
  rightTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflow
  },
  rightBottom: {
    points: ["br", "bl"],
    overflow: autoAdjustOverflow
  },
  leftTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflow
  },
  leftBottom: {
    points: ["bl", "br"],
    overflow: autoAdjustOverflow
  }
};
function getMotion(mode, motion, defaultMotions) {
  if (motion) {
    return motion;
  }
  if (defaultMotions) {
    return defaultMotions[mode] || defaultMotions.other;
  }
  return void 0;
}
const popupPlacementMap = {
  horizontal: "bottomLeft",
  vertical: "rightTop",
  "vertical-left": "rightTop",
  "vertical-right": "leftTop"
};
function PopupTrigger({
  prefixCls,
  visible,
  children,
  popup,
  popupStyle,
  popupClassName,
  popupOffset,
  disabled,
  mode,
  onVisibleChange
}) {
  const {
    getPopupContainer,
    rtl,
    subMenuOpenDelay,
    subMenuCloseDelay,
    builtinPlacements,
    triggerSubMenuAction,
    forceSubMenuRender,
    rootClassName,
    // Motion
    motion,
    defaultMotions
  } = reactExports.useContext(MenuContext);
  const [innerVisible, setInnerVisible] = reactExports.useState(false);
  const placement = rtl ? {
    ...placementsRtl,
    ...builtinPlacements
  } : {
    ...placements,
    ...builtinPlacements
  };
  const popupPlacement = popupPlacementMap[mode];
  const targetMotion = getMotion(mode, motion, defaultMotions);
  const targetMotionRef = reactExports.useRef(targetMotion);
  if (mode !== "inline") {
    targetMotionRef.current = targetMotion;
  }
  const mergedMotion = {
    ...targetMotionRef.current,
    leavedClassName: `${prefixCls}-hidden`,
    removeOnLeave: false,
    motionAppear: true
  };
  const visibleRef = reactExports.useRef();
  reactExports.useEffect(() => {
    visibleRef.current = wrapperRaf(() => {
      setInnerVisible(visible);
    });
    return () => {
      wrapperRaf.cancel(visibleRef.current);
    };
  }, [visible]);
  return /* @__PURE__ */ reactExports.createElement(Trigger, {
    prefixCls,
    popupClassName: clsx(`${prefixCls}-popup`, {
      [`${prefixCls}-rtl`]: rtl
    }, popupClassName, rootClassName),
    stretch: mode === "horizontal" ? "minWidth" : null,
    getPopupContainer,
    builtinPlacements: placement,
    popupPlacement,
    popupVisible: innerVisible,
    popup,
    popupStyle,
    popupAlign: popupOffset && {
      offset: popupOffset
    },
    action: disabled ? [] : [triggerSubMenuAction],
    mouseEnterDelay: subMenuOpenDelay,
    mouseLeaveDelay: subMenuCloseDelay,
    onPopupVisibleChange: onVisibleChange,
    forceRender: forceSubMenuRender,
    popupMotion: mergedMotion,
    fresh: true
  }, children);
}
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
function InlineSubMenuList({
  id,
  open,
  keyPath,
  children
}) {
  const fixedMode = "inline";
  const {
    prefixCls,
    forceSubMenuRender,
    motion,
    defaultMotions,
    mode
  } = reactExports.useContext(MenuContext);
  const sameModeRef = reactExports.useRef(false);
  sameModeRef.current = mode === fixedMode;
  const [destroy, setDestroy] = reactExports.useState(!sameModeRef.current);
  const mergedOpen = sameModeRef.current ? open : false;
  reactExports.useEffect(() => {
    if (sameModeRef.current) {
      setDestroy(false);
    }
  }, [mode]);
  const mergedMotion = {
    ...getMotion(fixedMode, motion, defaultMotions)
  };
  if (keyPath.length > 1) {
    mergedMotion.motionAppear = false;
  }
  const originOnVisibleChanged = mergedMotion.onVisibleChanged;
  mergedMotion.onVisibleChanged = (newVisible) => {
    if (!sameModeRef.current && !newVisible) {
      setDestroy(true);
    }
    return originOnVisibleChanged?.(newVisible);
  };
  if (destroy) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(InheritableContextProvider, {
    mode: fixedMode,
    locked: !sameModeRef.current
  }, /* @__PURE__ */ reactExports.createElement(CSSMotion, _extends$4({
    visible: mergedOpen
  }, mergedMotion, {
    forceRender: forceSubMenuRender,
    removeOnLeave: false,
    leavedClassName: `${prefixCls}-hidden`
  }), ({
    className: motionClassName,
    style: motionStyle
  }) => {
    return /* @__PURE__ */ reactExports.createElement(SubMenuList, {
      id,
      className: motionClassName,
      style: motionStyle
    }, children);
  }));
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
const InternalSubMenu = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    style,
    className,
    styles,
    classNames: menuClassNames,
    title,
    eventKey,
    warnKey,
    disabled,
    internalPopupClose,
    children,
    // Icons
    itemIcon,
    expandIcon,
    // Popup
    popupClassName,
    popupOffset,
    popupStyle,
    // Events
    onClick,
    onMouseEnter,
    onMouseLeave,
    onTitleClick,
    onTitleMouseEnter,
    onTitleMouseLeave,
    popupRender: propsPopupRender,
    ...restProps
  } = props;
  const domDataId = useMenuId(eventKey);
  const {
    prefixCls,
    mode,
    openKeys,
    // Disabled
    disabled: contextDisabled,
    overflowDisabled,
    // ActiveKey
    activeKey,
    // SelectKey
    selectedKeys,
    // Icon
    itemIcon: contextItemIcon,
    expandIcon: contextExpandIcon,
    // Events
    onItemClick,
    onOpenChange,
    onActive,
    popupRender: contextPopupRender
  } = reactExports.useContext(MenuContext);
  const {
    _internalRenderSubMenuItem
  } = reactExports.useContext(PrivateContext);
  const {
    isSubPathKey
  } = reactExports.useContext(PathUserContext);
  const connectedPath = useFullPath();
  const subMenuPrefixCls = `${prefixCls}-submenu`;
  const mergedDisabled = contextDisabled || disabled;
  const elementRef = reactExports.useRef();
  const popupRef = reactExports.useRef();
  const mergedItemIcon = itemIcon ?? contextItemIcon;
  const mergedExpandIcon = expandIcon ?? contextExpandIcon;
  const originOpen = openKeys.includes(eventKey);
  const open = !overflowDisabled && originOpen;
  const childrenSelected = isSubPathKey(selectedKeys, eventKey);
  const {
    active,
    ...activeProps
  } = useActive(eventKey, mergedDisabled, onTitleMouseEnter, onTitleMouseLeave);
  const [childrenActive, setChildrenActive] = reactExports.useState(false);
  const triggerChildrenActive = (newActive) => {
    if (!mergedDisabled) {
      setChildrenActive(newActive);
    }
  };
  const onInternalMouseEnter = (domEvent) => {
    triggerChildrenActive(true);
    onMouseEnter?.({
      key: eventKey,
      domEvent
    });
  };
  const onInternalMouseLeave = (domEvent) => {
    triggerChildrenActive(false);
    onMouseLeave?.({
      key: eventKey,
      domEvent
    });
  };
  const mergedActive = reactExports.useMemo(() => {
    if (active) {
      return active;
    }
    if (mode !== "inline") {
      return childrenActive || isSubPathKey([activeKey], eventKey);
    }
    return false;
  }, [mode, active, activeKey, childrenActive, eventKey, isSubPathKey]);
  const directionStyle = useDirectionStyle(connectedPath.length);
  const onInternalTitleClick = (e) => {
    if (mergedDisabled) {
      return;
    }
    onTitleClick?.({
      key: eventKey,
      domEvent: e
    });
    if (mode === "inline") {
      onOpenChange(eventKey, !originOpen);
    }
  };
  const onMergedItemClick = useMemoCallback((info) => {
    onClick?.(warnItemProp(info));
    onItemClick(info);
  });
  const onPopupVisibleChange = (newVisible) => {
    if (mode !== "inline") {
      onOpenChange(eventKey, newVisible);
    }
  };
  const onInternalFocus = () => {
    onActive(eventKey);
  };
  const popupId = domDataId && `${domDataId}-popup`;
  const expandIconNode = reactExports.useMemo(() => /* @__PURE__ */ reactExports.createElement(Icon, {
    icon: mode !== "horizontal" ? mergedExpandIcon : void 0,
    props: {
      ...props,
      isOpen: open,
      // [Legacy] Not sure why need this mark
      isSubMenu: true
    }
  }, /* @__PURE__ */ reactExports.createElement("i", {
    className: `${subMenuPrefixCls}-arrow`
  })), [mode, mergedExpandIcon, props, open, subMenuPrefixCls]);
  let titleNode = /* @__PURE__ */ reactExports.createElement("div", _extends$3({
    role: "menuitem",
    style: directionStyle,
    className: `${subMenuPrefixCls}-title`,
    tabIndex: mergedDisabled ? null : -1,
    ref: elementRef,
    title: typeof title === "string" ? title : null,
    "data-menu-id": overflowDisabled && domDataId ? null : domDataId,
    "aria-expanded": open,
    "aria-haspopup": true,
    "aria-controls": popupId,
    "aria-disabled": mergedDisabled,
    onClick: onInternalTitleClick,
    onFocus: onInternalFocus
  }, activeProps), title, expandIconNode);
  const triggerModeRef = reactExports.useRef(mode);
  if (mode !== "inline" && connectedPath.length > 1) {
    triggerModeRef.current = "vertical";
  } else {
    triggerModeRef.current = mode;
  }
  const popupContentTriggerMode = triggerModeRef.current;
  const renderPopupContent = reactExports.useMemo(() => {
    const originNode = /* @__PURE__ */ reactExports.createElement(InheritableContextProvider, {
      classNames: menuClassNames,
      styles,
      mode: popupContentTriggerMode === "horizontal" ? "vertical" : popupContentTriggerMode
    }, /* @__PURE__ */ reactExports.createElement(SubMenuList, {
      id: popupId,
      ref: popupRef
    }, children));
    const mergedPopupRender = propsPopupRender || contextPopupRender;
    if (mergedPopupRender) {
      const node = mergedPopupRender(originNode, {
        item: props,
        keys: connectedPath
      });
      return node;
    }
    return originNode;
  }, [propsPopupRender, contextPopupRender, connectedPath, popupId, children, props, popupContentTriggerMode]);
  if (!overflowDisabled) {
    const triggerMode = triggerModeRef.current;
    titleNode = /* @__PURE__ */ reactExports.createElement(PopupTrigger, {
      mode: triggerMode,
      prefixCls: subMenuPrefixCls,
      visible: !internalPopupClose && open && mode !== "inline",
      popupClassName,
      popupOffset,
      popupStyle,
      popup: renderPopupContent,
      disabled: mergedDisabled,
      onVisibleChange: onPopupVisibleChange
    }, titleNode);
  }
  let listNode = /* @__PURE__ */ reactExports.createElement(ForwardOverflow.Item, _extends$3({
    ref,
    role: "none"
  }, restProps, {
    component: "li",
    style,
    className: clsx(subMenuPrefixCls, `${subMenuPrefixCls}-${mode}`, className, {
      [`${subMenuPrefixCls}-open`]: open,
      [`${subMenuPrefixCls}-active`]: mergedActive,
      [`${subMenuPrefixCls}-selected`]: childrenSelected,
      [`${subMenuPrefixCls}-disabled`]: mergedDisabled
    }),
    onMouseEnter: onInternalMouseEnter,
    onMouseLeave: onInternalMouseLeave
  }), titleNode, !overflowDisabled && /* @__PURE__ */ reactExports.createElement(InlineSubMenuList, {
    id: popupId,
    open,
    keyPath: connectedPath
  }, children));
  if (_internalRenderSubMenuItem) {
    listNode = _internalRenderSubMenuItem(listNode, props, {
      selected: childrenSelected,
      active: mergedActive,
      open,
      disabled: mergedDisabled
    });
  }
  return /* @__PURE__ */ reactExports.createElement(InheritableContextProvider, {
    classNames: menuClassNames,
    styles,
    onItemClick: onMergedItemClick,
    mode: mode === "horizontal" ? "vertical" : mode,
    itemIcon: mergedItemIcon,
    expandIcon: mergedExpandIcon
  }, listNode);
});
const SubMenu = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    eventKey,
    children
  } = props;
  const connectedKeyPath = useFullPath(eventKey);
  const childList = parseChildren(children, connectedKeyPath);
  const measure = useMeasure();
  reactExports.useEffect(() => {
    if (measure) {
      measure.registerPath(eventKey, connectedKeyPath);
      return () => {
        measure.unregisterPath(eventKey, connectedKeyPath);
      };
    }
  }, [connectedKeyPath]);
  let renderNode;
  if (measure) {
    renderNode = childList;
  } else {
    renderNode = /* @__PURE__ */ reactExports.createElement(InternalSubMenu, _extends$3({
      ref
    }, props), childList);
  }
  return /* @__PURE__ */ reactExports.createElement(PathTrackerContext.Provider, {
    value: connectedKeyPath
  }, renderNode);
});
function Divider({
  className,
  style
}) {
  const {
    prefixCls
  } = reactExports.useContext(MenuContext);
  const measure = useMeasure();
  if (measure) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("li", {
    role: "separator",
    className: clsx(`${prefixCls}-item-divider`, className),
    style
  });
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
const InternalMenuItemGroup = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    className,
    title,
    eventKey,
    children,
    ...restProps
  } = props;
  const {
    prefixCls,
    classNames: menuClassNames,
    styles
  } = reactExports.useContext(MenuContext);
  const groupPrefixCls = `${prefixCls}-item-group`;
  return /* @__PURE__ */ reactExports.createElement("li", _extends$2({
    ref,
    role: "presentation"
  }, restProps, {
    onClick: (e) => e.stopPropagation(),
    className: clsx(groupPrefixCls, className)
  }), /* @__PURE__ */ reactExports.createElement("div", {
    role: "presentation",
    className: clsx(`${groupPrefixCls}-title`, menuClassNames?.listTitle),
    style: styles?.listTitle,
    title: typeof title === "string" ? title : void 0
  }, title), /* @__PURE__ */ reactExports.createElement("ul", {
    role: "group",
    className: clsx(`${groupPrefixCls}-list`, menuClassNames?.list),
    style: styles?.list
  }, children));
});
const MenuItemGroup = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    eventKey,
    children
  } = props;
  const connectedKeyPath = useFullPath(eventKey);
  const childList = parseChildren(children, connectedKeyPath);
  const measure = useMeasure();
  if (measure) {
    return childList;
  }
  return /* @__PURE__ */ reactExports.createElement(InternalMenuItemGroup, _extends$2({
    ref
  }, omit(props, ["warnKey"])), childList);
});
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
function convertItemsToNodes(list, components, prefixCls) {
  const {
    item: MergedMenuItem,
    group: MergedMenuItemGroup,
    submenu: MergedSubMenu,
    divider: MergedDivider
  } = components;
  return (list || []).map((opt, index) => {
    if (opt && typeof opt === "object") {
      const {
        label,
        children,
        key,
        type,
        extra,
        ...restProps
      } = opt;
      const mergedKey = key ?? `tmp-${index}`;
      if (children || type === "group") {
        if (type === "group") {
          return /* @__PURE__ */ reactExports.createElement(MergedMenuItemGroup, _extends$1({
            key: mergedKey
          }, restProps, {
            title: label
          }), convertItemsToNodes(children, components, prefixCls));
        }
        return /* @__PURE__ */ reactExports.createElement(MergedSubMenu, _extends$1({
          key: mergedKey
        }, restProps, {
          title: label
        }), convertItemsToNodes(children, components, prefixCls));
      }
      if (type === "divider") {
        return /* @__PURE__ */ reactExports.createElement(MergedDivider, _extends$1({
          key: mergedKey
        }, restProps));
      }
      return /* @__PURE__ */ reactExports.createElement(MergedMenuItem, _extends$1({
        key: mergedKey
      }, restProps, {
        extra
      }), label, (!!extra || extra === 0) && /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-item-extra`
      }, extra));
    }
    return null;
  }).filter((opt) => opt);
}
function parseItems(children, items, keyPath, components, prefixCls) {
  let childNodes = children;
  const mergedComponents = {
    divider: Divider,
    item: MenuItem$1,
    group: MenuItemGroup,
    submenu: SubMenu,
    ...components
  };
  if (items) {
    childNodes = convertItemsToNodes(items, mergedComponents, prefixCls);
  }
  return parseChildren(childNodes, keyPath);
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
const EMPTY_LIST = [];
const Menu = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls = "rc-menu",
    rootClassName,
    style,
    className,
    styles,
    classNames: menuClassNames,
    tabIndex = 0,
    items,
    children,
    direction,
    id,
    // Mode
    mode = "vertical",
    inlineCollapsed,
    // Disabled
    disabled,
    disabledOverflow,
    // Open
    subMenuOpenDelay = 0.1,
    subMenuCloseDelay = 0.1,
    forceSubMenuRender,
    defaultOpenKeys,
    openKeys,
    // Active
    activeKey,
    defaultActiveFirst,
    // Selection
    selectable = true,
    multiple = false,
    defaultSelectedKeys,
    selectedKeys,
    onSelect,
    onDeselect,
    // Level
    inlineIndent = 24,
    // Motion
    motion,
    defaultMotions,
    // Popup
    triggerSubMenuAction = "hover",
    builtinPlacements,
    // Icon
    itemIcon,
    expandIcon,
    overflowedIndicator = "...",
    overflowedIndicatorPopupClassName,
    // Function
    getPopupContainer,
    // Events
    onClick,
    onOpenChange,
    onKeyDown,
    // Deprecated
    openAnimation,
    openTransitionName,
    // Internal
    _internalRenderMenuItem,
    _internalRenderSubMenuItem,
    _internalComponents,
    popupRender,
    ...restProps
  } = props;
  const [childList, measureChildList] = reactExports.useMemo(() => [parseItems(children, items, EMPTY_LIST, _internalComponents, prefixCls), parseItems(children, items, EMPTY_LIST, {}, prefixCls)], [children, items, _internalComponents]);
  const [mounted, setMounted] = reactExports.useState(false);
  const containerRef = reactExports.useRef();
  const uuid = useId(id ? `rc-menu-uuid-${id}` : "rc-menu-uuid");
  const isRtl = direction === "rtl";
  const [innerOpenKeys, setMergedOpenKeys] = useControlledState(defaultOpenKeys, openKeys);
  const mergedOpenKeys = innerOpenKeys || EMPTY_LIST;
  const triggerOpenKeys = (keys, forceFlush = false) => {
    function doUpdate() {
      setMergedOpenKeys(keys);
      onOpenChange?.(keys);
    }
    if (forceFlush) {
      reactDomExports.flushSync(doUpdate);
    } else {
      doUpdate();
    }
  };
  const [inlineCacheOpenKeys, setInlineCacheOpenKeys] = reactExports.useState(mergedOpenKeys);
  const mountRef = reactExports.useRef(false);
  const [mergedMode, mergedInlineCollapsed] = reactExports.useMemo(() => {
    if ((mode === "inline" || mode === "vertical") && inlineCollapsed) {
      return ["vertical", inlineCollapsed];
    }
    return [mode, false];
  }, [mode, inlineCollapsed]);
  const isInlineMode = mergedMode === "inline";
  const [internalMode, setInternalMode] = reactExports.useState(mergedMode);
  const [internalInlineCollapsed, setInternalInlineCollapsed] = reactExports.useState(mergedInlineCollapsed);
  reactExports.useEffect(() => {
    setInternalMode(mergedMode);
    setInternalInlineCollapsed(mergedInlineCollapsed);
    if (!mountRef.current) {
      return;
    }
    if (isInlineMode) {
      setMergedOpenKeys(inlineCacheOpenKeys);
    } else {
      triggerOpenKeys(EMPTY_LIST);
    }
  }, [mergedMode, mergedInlineCollapsed]);
  const [lastVisibleIndex, setLastVisibleIndex] = reactExports.useState(0);
  const allVisible = lastVisibleIndex >= childList.length - 1 || internalMode !== "horizontal" || disabledOverflow;
  reactExports.useEffect(() => {
    if (isInlineMode) {
      setInlineCacheOpenKeys(mergedOpenKeys);
    }
  }, [mergedOpenKeys]);
  reactExports.useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  }, []);
  const {
    registerPath,
    unregisterPath,
    refreshOverflowKeys,
    isSubPathKey,
    getKeyPath,
    getKeys,
    getSubPathKeys
  } = useKeyRecords();
  const registerPathContext = reactExports.useMemo(() => ({
    registerPath,
    unregisterPath
  }), [registerPath, unregisterPath]);
  const pathUserContext = reactExports.useMemo(() => ({
    isSubPathKey
  }), [isSubPathKey]);
  reactExports.useEffect(() => {
    refreshOverflowKeys(allVisible ? EMPTY_LIST : childList.slice(lastVisibleIndex + 1).map((child) => child.key));
  }, [lastVisibleIndex, allVisible]);
  const [mergedActiveKey, setMergedActiveKey] = useControlledState(activeKey || defaultActiveFirst && childList[0]?.key, activeKey);
  const onActive = useMemoCallback((key) => {
    setMergedActiveKey(key);
  });
  const onInactive = useMemoCallback(() => {
    setMergedActiveKey(void 0);
  });
  reactExports.useImperativeHandle(ref, () => {
    return {
      list: containerRef.current,
      focus: (options) => {
        const keys = getKeys();
        const {
          elements,
          key2element,
          element2key
        } = refreshElements(keys, uuid);
        const focusableElements = getFocusableElements(containerRef.current, elements);
        let shouldFocusKey;
        if (mergedActiveKey && keys.includes(mergedActiveKey)) {
          shouldFocusKey = mergedActiveKey;
        } else {
          shouldFocusKey = focusableElements[0] ? element2key.get(focusableElements[0]) : childList.find((node) => !node.props.disabled)?.key;
        }
        const elementToFocus = key2element.get(shouldFocusKey);
        if (shouldFocusKey && elementToFocus) {
          elementToFocus?.focus?.(options);
        }
      },
      findItem: ({
        key: itemKey
      }) => {
        const keys = getKeys();
        const {
          key2element
        } = refreshElements(keys, uuid);
        return key2element.get(itemKey) || null;
      }
    };
  });
  const [internalSelectKeys, setMergedSelectKeys] = useControlledState(defaultSelectedKeys || [], selectedKeys);
  const mergedSelectKeys = reactExports.useMemo(() => {
    if (Array.isArray(internalSelectKeys)) {
      return internalSelectKeys;
    }
    if (internalSelectKeys === null || internalSelectKeys === void 0) {
      return EMPTY_LIST;
    }
    return [internalSelectKeys];
  }, [internalSelectKeys]);
  const triggerSelection = (info) => {
    if (selectable) {
      const {
        key: targetKey
      } = info;
      const exist = mergedSelectKeys.includes(targetKey);
      let newSelectKeys;
      if (multiple) {
        if (exist) {
          newSelectKeys = mergedSelectKeys.filter((key) => key !== targetKey);
        } else {
          newSelectKeys = [...mergedSelectKeys, targetKey];
        }
      } else {
        newSelectKeys = [targetKey];
      }
      setMergedSelectKeys(newSelectKeys);
      const selectInfo = {
        ...info,
        selectedKeys: newSelectKeys
      };
      if (exist) {
        onDeselect?.(selectInfo);
      } else {
        onSelect?.(selectInfo);
      }
    }
    if (!multiple && mergedOpenKeys.length && internalMode !== "inline") {
      triggerOpenKeys(EMPTY_LIST);
    }
  };
  const onInternalClick = useMemoCallback((info) => {
    onClick?.(warnItemProp(info));
    triggerSelection(info);
  });
  const onInternalOpenChange = useMemoCallback((key, open) => {
    let newOpenKeys = mergedOpenKeys.filter((k) => k !== key);
    if (open) {
      newOpenKeys.push(key);
    } else if (internalMode !== "inline") {
      const subPathKeys = getSubPathKeys(key);
      newOpenKeys = newOpenKeys.filter((k) => !subPathKeys.has(k));
    }
    if (!isEqual(mergedOpenKeys, newOpenKeys, true)) {
      triggerOpenKeys(newOpenKeys, true);
    }
  });
  const triggerAccessibilityOpen = (key, open) => {
    const nextOpen = open ?? !mergedOpenKeys.includes(key);
    onInternalOpenChange(key, nextOpen);
  };
  const onInternalKeyDown = useAccessibility(internalMode, mergedActiveKey, isRtl, uuid, containerRef, getKeys, getKeyPath, setMergedActiveKey, triggerAccessibilityOpen, onKeyDown);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  const privateContext = reactExports.useMemo(() => ({
    _internalRenderMenuItem,
    _internalRenderSubMenuItem
  }), [_internalRenderMenuItem, _internalRenderSubMenuItem]);
  const wrappedChildList = internalMode !== "horizontal" || disabledOverflow ? childList : (
    // Need wrap for overflow dropdown that do not response for open
    childList.map((child, index) => (
      // Always wrap provider to avoid sub node re-mount
      /* @__PURE__ */ reactExports.createElement(InheritableContextProvider, {
        key: child.key,
        overflowDisabled: index > lastVisibleIndex,
        classNames: menuClassNames,
        styles
      }, child)
    ))
  );
  const container = /* @__PURE__ */ reactExports.createElement(ForwardOverflow, _extends({
    id,
    ref: containerRef,
    prefixCls: `${prefixCls}-overflow`,
    component: "ul",
    itemComponent: MenuItem$1,
    className: clsx(prefixCls, `${prefixCls}-root`, `${prefixCls}-${internalMode}`, className, {
      [`${prefixCls}-inline-collapsed`]: internalInlineCollapsed,
      [`${prefixCls}-rtl`]: isRtl
    }, rootClassName),
    dir: direction,
    style,
    role: "menu",
    tabIndex,
    data: wrappedChildList,
    renderRawItem: (node) => node,
    renderRawRest: (omitItems) => {
      const len = omitItems.length;
      const originOmitItems = len ? childList.slice(-len) : null;
      return /* @__PURE__ */ reactExports.createElement(SubMenu, {
        eventKey: OVERFLOW_KEY,
        title: overflowedIndicator,
        disabled: allVisible,
        internalPopupClose: len === 0,
        popupClassName: overflowedIndicatorPopupClassName
      }, originOmitItems);
    },
    maxCount: internalMode !== "horizontal" || disabledOverflow ? ForwardOverflow.INVALIDATE : ForwardOverflow.RESPONSIVE,
    ssr: "full",
    "data-menu-list": true,
    onVisibleChange: (newLastIndex) => {
      setLastVisibleIndex(newLastIndex);
    },
    onKeyDown: onInternalKeyDown
  }, restProps));
  return /* @__PURE__ */ reactExports.createElement(PrivateContext.Provider, {
    value: privateContext
  }, /* @__PURE__ */ reactExports.createElement(IdContext.Provider, {
    value: uuid
  }, /* @__PURE__ */ reactExports.createElement(InheritableContextProvider, {
    prefixCls,
    rootClassName,
    classNames: menuClassNames,
    styles,
    mode: internalMode,
    openKeys: mergedOpenKeys,
    rtl: isRtl,
    disabled,
    motion: mounted ? motion : null,
    defaultMotions: mounted ? defaultMotions : null,
    activeKey: mergedActiveKey,
    onActive,
    onInactive,
    selectedKeys: mergedSelectKeys,
    inlineIndent,
    subMenuOpenDelay,
    subMenuCloseDelay,
    forceSubMenuRender,
    builtinPlacements,
    triggerSubMenuAction,
    getPopupContainer,
    itemIcon,
    expandIcon,
    onItemClick: onInternalClick,
    onOpenChange: onInternalOpenChange,
    popupRender
  }, /* @__PURE__ */ reactExports.createElement(PathUserContext.Provider, {
    value: pathUserContext
  }, container), /* @__PURE__ */ reactExports.createElement("div", {
    style: {
      display: "none"
    },
    "aria-hidden": true
  }, /* @__PURE__ */ reactExports.createElement(PathRegisterContext.Provider, {
    value: registerPathContext
  }, measureChildList)))));
});
const ExportMenu = Menu;
ExportMenu.Item = MenuItem$1;
ExportMenu.SubMenu = SubMenu;
ExportMenu.ItemGroup = MenuItemGroup;
ExportMenu.Divider = Divider;
export {
  Divider as D,
  ExportMenu as E,
  MenuItem$1 as M,
  SubMenu as S,
  MenuItemGroup as a,
  useFullPath as u
};
