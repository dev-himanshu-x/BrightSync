import { P as Portal } from "./rc-component__portal.mjs";
import { r as reactExports, a as React } from "./react.mjs";
import { c as clsx } from "./clsx.mjs";
import { e as useComposeRef, G as useLockFocus, p as pickAttrs, n as useId, H as contains } from "./rc-component__util.mjs";
import { C as CSSMotion } from "./rc-component__motion.mjs";
const RefContext = /* @__PURE__ */ reactExports.createContext({});
function getMotionName(prefixCls, transitionName, animationName) {
  let motionName = transitionName;
  if (!motionName && animationName) {
    motionName = `${prefixCls}-${animationName}`;
  }
  return motionName;
}
function getScroll(w, top) {
  let ret = w[`page${top ? "Y" : "X"}Offset`];
  const method = `scroll${top ? "Top" : "Left"}`;
  if (typeof ret !== "number") {
    const d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== "number") {
      ret = d.body[method];
    }
  }
  return ret;
}
function offset(el) {
  const rect = el.getBoundingClientRect();
  const pos = {
    left: rect.left,
    top: rect.top
  };
  const doc = el.ownerDocument;
  const w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  pos.top += getScroll(w, true);
  return pos;
}
const MemoChildren = /* @__PURE__ */ reactExports.memo(({
  children
}) => children, (_, {
  shouldUpdate
}) => !shouldUpdate);
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
const Panel = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    prefixCls,
    className,
    style,
    title,
    ariaId,
    footer,
    closable,
    closeIcon,
    onClose,
    children,
    bodyStyle,
    bodyProps,
    modalRender,
    onMouseDown,
    onMouseUp,
    holderRef,
    visible,
    forceRender,
    width,
    height,
    classNames: modalClassNames,
    styles: modalStyles,
    isFixedPos,
    focusTrap
  } = props;
  const {
    panel: panelRef
  } = React.useContext(RefContext);
  const internalRef = reactExports.useRef(null);
  const mergedRef = useComposeRef(holderRef, panelRef, internalRef);
  const [ignoreElement] = useLockFocus(visible && isFixedPos && focusTrap !== false, () => internalRef.current);
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      internalRef.current?.focus({
        preventScroll: true
      });
    }
  }));
  const contentStyle = {};
  if (width !== void 0) {
    contentStyle.width = width;
  }
  if (height !== void 0) {
    contentStyle.height = height;
  }
  const footerNode = footer ? /* @__PURE__ */ React.createElement("div", {
    className: clsx(`${prefixCls}-footer`, modalClassNames?.footer),
    style: {
      ...modalStyles?.footer
    }
  }, footer) : null;
  const headerNode = title ? /* @__PURE__ */ React.createElement("div", {
    className: clsx(`${prefixCls}-header`, modalClassNames?.header),
    style: {
      ...modalStyles?.header
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: clsx(`${prefixCls}-title`, modalClassNames?.title),
    id: ariaId,
    style: {
      ...modalStyles?.title
    }
  }, title)) : null;
  const closableObj = reactExports.useMemo(() => {
    if (typeof closable === "object" && closable !== null) {
      return closable;
    }
    if (closable) {
      return {
        closeIcon: closeIcon ?? /* @__PURE__ */ React.createElement("span", {
          className: `${prefixCls}-close-x`
        })
      };
    }
    return {};
  }, [closable, closeIcon, prefixCls]);
  const ariaProps = pickAttrs(closableObj, true);
  const closeBtnIsDisabled = typeof closable === "object" && closable.disabled;
  const closerNode = closable ? /* @__PURE__ */ React.createElement("button", _extends$4({
    type: "button",
    onClick: onClose,
    "aria-label": "Close"
  }, ariaProps, {
    className: `${prefixCls}-close`,
    disabled: closeBtnIsDisabled
  }), closableObj.closeIcon) : null;
  const content = /* @__PURE__ */ React.createElement("div", {
    className: clsx(`${prefixCls}-container`, modalClassNames?.container),
    style: modalStyles?.container
  }, closerNode, headerNode, /* @__PURE__ */ React.createElement("div", _extends$4({
    className: clsx(`${prefixCls}-body`, modalClassNames?.body),
    style: {
      ...bodyStyle,
      ...modalStyles?.body
    }
  }, bodyProps), children), footerNode);
  return /* @__PURE__ */ React.createElement("div", {
    key: "dialog-element",
    role: "dialog",
    "aria-labelledby": title ? ariaId : null,
    "aria-modal": "true",
    ref: mergedRef,
    style: {
      ...style,
      ...contentStyle
    },
    className: clsx(prefixCls, className),
    onMouseDown,
    onMouseUp,
    tabIndex: -1,
    onFocus: (e) => {
      ignoreElement(e.target);
    }
  }, /* @__PURE__ */ React.createElement(MemoChildren, {
    shouldUpdate: visible || forceRender
  }, modalRender ? modalRender(content) : content));
});
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
const Content = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls,
    title,
    style,
    className,
    visible,
    forceRender,
    destroyOnHidden,
    motionName,
    ariaId,
    onVisibleChanged,
    mousePosition
  } = props;
  const dialogRef = reactExports.useRef(null);
  const panelRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => ({
    ...panelRef.current,
    inMotion: dialogRef.current.inMotion,
    enableMotion: dialogRef.current.enableMotion
  }));
  const [transformOrigin, setTransformOrigin] = reactExports.useState();
  const contentStyle = {};
  if (transformOrigin) {
    contentStyle.transformOrigin = transformOrigin;
  }
  function onPrepare() {
    if (!dialogRef.current?.nativeElement) {
      return;
    }
    const elementOffset = offset(dialogRef.current.nativeElement);
    setTransformOrigin(mousePosition && (mousePosition.x || mousePosition.y) ? `${mousePosition.x - elementOffset.left}px ${mousePosition.y - elementOffset.top}px` : "");
  }
  return /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    visible,
    onVisibleChanged,
    onAppearPrepare: onPrepare,
    onEnterPrepare: onPrepare,
    forceRender,
    motionName,
    removeOnLeave: destroyOnHidden,
    ref: dialogRef
  }, ({
    className: motionClassName,
    style: motionStyle
  }, motionRef) => /* @__PURE__ */ reactExports.createElement(Panel, _extends$3({}, props, {
    ref: panelRef,
    title,
    ariaId,
    prefixCls,
    holderRef: motionRef,
    style: {
      ...motionStyle,
      ...style,
      ...contentStyle
    },
    className: clsx(className, motionClassName)
  })));
});
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
const Mask = (props) => {
  const {
    prefixCls,
    style,
    visible,
    maskProps,
    motionName,
    className
  } = props;
  return /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    key: "mask",
    visible,
    motionName,
    leavedClassName: `${prefixCls}-mask-hidden`
  }, ({
    className: motionClassName,
    style: motionStyle
  }, ref) => /* @__PURE__ */ reactExports.createElement("div", _extends$2({
    ref,
    style: {
      ...motionStyle,
      ...style
    },
    className: clsx(`${prefixCls}-mask`, motionClassName, className)
  }, maskProps)));
};
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
const Dialog = (props) => {
  const {
    prefixCls = "rc-dialog",
    zIndex,
    visible = false,
    focusTriggerAfterClose = true,
    wrapStyle,
    wrapClassName,
    wrapProps,
    onClose,
    afterOpenChange,
    afterClose,
    // Dialog
    transitionName,
    animation,
    closable = true,
    // Mask
    mask = true,
    maskTransitionName,
    maskAnimation,
    maskClosable = true,
    maskStyle,
    maskProps,
    rootClassName,
    rootStyle,
    classNames: modalClassNames,
    styles: modalStyles
  } = props;
  const lastOutSideActiveElementRef = reactExports.useRef(null);
  const wrapperRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [animatedVisible, setAnimatedVisible] = reactExports.useState(visible);
  const [isFixedPos, setIsFixedPos] = reactExports.useState(false);
  const ariaId = useId();
  function saveLastOutSideActiveElementRef() {
    if (!contains(wrapperRef.current, document.activeElement)) {
      lastOutSideActiveElementRef.current = document.activeElement;
    }
  }
  function focusDialogContent() {
    if (!contains(wrapperRef.current, document.activeElement)) {
      contentRef.current?.focus();
    }
  }
  function doClose() {
    setAnimatedVisible(false);
    if (mask && lastOutSideActiveElementRef.current && focusTriggerAfterClose) {
      try {
        lastOutSideActiveElementRef.current.focus({
          preventScroll: true
        });
      } catch (e) {
      }
      lastOutSideActiveElementRef.current = null;
    }
    if (animatedVisible) {
      afterClose?.();
    }
  }
  function onDialogVisibleChanged(newVisible) {
    if (newVisible) {
      focusDialogContent();
    } else {
      doClose();
    }
    afterOpenChange?.(newVisible);
  }
  function onInternalClose(e) {
    onClose?.(e);
  }
  const mouseDownOnMaskRef = reactExports.useRef(false);
  let onWrapperClick = null;
  if (maskClosable) {
    onWrapperClick = (e) => {
      if (wrapperRef.current === e.target && mouseDownOnMaskRef.current) {
        onInternalClose(e);
      }
    };
  }
  function onWrapperMouseDown(e) {
    mouseDownOnMaskRef.current = e.target === wrapperRef.current;
  }
  reactExports.useEffect(() => {
    if (visible) {
      mouseDownOnMaskRef.current = false;
      setAnimatedVisible(true);
      saveLastOutSideActiveElementRef();
      if (wrapperRef.current) {
        const computedWrapStyle = getComputedStyle(wrapperRef.current);
        setIsFixedPos(computedWrapStyle.position === "fixed");
      }
    } else if (animatedVisible && contentRef.current.enableMotion() && !contentRef.current.inMotion()) {
      doClose();
    }
  }, [visible]);
  const mergedStyle = {
    zIndex,
    ...wrapStyle,
    ...modalStyles?.wrapper,
    display: !animatedVisible ? "none" : null
  };
  return /* @__PURE__ */ reactExports.createElement("div", _extends$1({
    className: clsx(`${prefixCls}-root`, rootClassName),
    style: rootStyle
  }, pickAttrs(props, {
    data: true
  })), /* @__PURE__ */ reactExports.createElement(Mask, {
    prefixCls,
    visible: mask && visible,
    motionName: getMotionName(prefixCls, maskTransitionName, maskAnimation),
    style: {
      zIndex,
      ...maskStyle,
      ...modalStyles?.mask
    },
    maskProps,
    className: modalClassNames?.mask
  }), /* @__PURE__ */ reactExports.createElement("div", _extends$1({
    className: clsx(`${prefixCls}-wrap`, wrapClassName, modalClassNames?.wrapper),
    ref: wrapperRef,
    onClick: onWrapperClick,
    onMouseDown: onWrapperMouseDown,
    style: mergedStyle
  }, wrapProps), /* @__PURE__ */ reactExports.createElement(Content, _extends$1({}, props, {
    isFixedPos,
    ref: contentRef,
    closable,
    ariaId,
    prefixCls,
    visible: visible && animatedVisible,
    onClose: onInternalClose,
    onVisibleChanged: onDialogVisibleChanged,
    motionName: getMotionName(prefixCls, transitionName, animation)
  }))));
};
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
const DialogWrap = (props) => {
  const {
    visible,
    getContainer,
    forceRender,
    destroyOnHidden = false,
    afterClose,
    closable,
    panelRef,
    keyboard = true,
    onClose
  } = props;
  const [animatedVisible, setAnimatedVisible] = reactExports.useState(visible);
  const refContext = reactExports.useMemo(() => ({
    panel: panelRef
  }), [panelRef]);
  const onEsc = ({
    top,
    event
  }) => {
    if (top && keyboard) {
      event.stopPropagation();
      onClose?.(event);
      return;
    }
  };
  reactExports.useEffect(() => {
    if (visible) {
      setAnimatedVisible(true);
    }
  }, [visible]);
  if (!forceRender && destroyOnHidden && !animatedVisible) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(RefContext.Provider, {
    value: refContext
  }, /* @__PURE__ */ reactExports.createElement(Portal, {
    open: visible || forceRender || animatedVisible,
    onEsc,
    autoDestroy: false,
    getContainer,
    autoLock: visible || animatedVisible
  }, /* @__PURE__ */ reactExports.createElement(Dialog, _extends({}, props, {
    destroyOnHidden,
    afterClose: () => {
      const closableObj = closable && typeof closable === "object" ? closable : {};
      const {
        afterClose: closableAfterClose
      } = closableObj || {};
      closableAfterClose?.();
      afterClose?.();
      setAnimatedVisible(false);
    }
  }))));
};
export {
  DialogWrap as D,
  Panel as P
};
