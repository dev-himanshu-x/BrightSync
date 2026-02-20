import { T as Trigger } from "./rc-component__trigger.mjs";
import { n as useId } from "./rc-component__util.mjs";
import { c as clsx } from "./clsx.mjs";
import { r as reactExports } from "./react.mjs";
const Popup = (props) => {
  const {
    children,
    prefixCls,
    id,
    classNames,
    styles,
    className,
    style
  } = props;
  return /* @__PURE__ */ reactExports.createElement("div", {
    id,
    className: clsx(`${prefixCls}-container`, classNames?.container, className),
    style: {
      ...styles?.container,
      ...style
    },
    role: "tooltip"
  }, typeof children === "function" ? children() : children);
};
const autoAdjustOverflowTopBottom = {
  shiftX: 64,
  adjustY: 1
};
const autoAdjustOverflowLeftRight = {
  adjustX: 1,
  shiftY: true
};
const targetOffset = [0, 0];
const placements = {
  left: {
    points: ["cr", "cl"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [-4, 0],
    targetOffset
  },
  right: {
    points: ["cl", "cr"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [4, 0],
    targetOffset
  },
  top: {
    points: ["bc", "tc"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, -4],
    targetOffset
  },
  bottom: {
    points: ["tc", "bc"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, 4],
    targetOffset
  },
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, -4],
    targetOffset
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [-4, 0],
    targetOffset
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, -4],
    targetOffset
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [4, 0],
    targetOffset
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, 4],
    targetOffset
  },
  rightBottom: {
    points: ["bl", "br"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [4, 0],
    targetOffset
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflowTopBottom,
    offset: [0, 4],
    targetOffset
  },
  leftBottom: {
    points: ["br", "bl"],
    overflow: autoAdjustOverflowLeftRight,
    offset: [-4, 0],
    targetOffset
  }
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
const Tooltip = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    trigger = ["hover"],
    mouseEnterDelay = 0,
    mouseLeaveDelay = 0.1,
    prefixCls = "rc-tooltip",
    children,
    onVisibleChange,
    afterVisibleChange,
    motion,
    placement = "right",
    align = {},
    destroyOnHidden = false,
    defaultVisible,
    getTooltipContainer,
    arrowContent,
    overlay,
    id,
    showArrow = true,
    classNames,
    styles,
    ...restProps
  } = props;
  const mergedId = useId(id);
  const triggerRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => triggerRef.current);
  const extraProps = {
    ...restProps
  };
  if ("visible" in props) {
    extraProps.popupVisible = props.visible;
  }
  const mergedArrow = reactExports.useMemo(() => {
    if (!showArrow) {
      return false;
    }
    const arrowConfig = showArrow === true ? {} : showArrow;
    return {
      ...arrowConfig,
      className: clsx(arrowConfig.className, classNames?.arrow),
      style: {
        ...arrowConfig.style,
        ...styles?.arrow
      },
      content: arrowConfig.content ?? arrowContent
    };
  }, [showArrow, classNames?.arrow, styles?.arrow, arrowContent]);
  const getChildren = ({
    open
  }) => {
    const child = reactExports.Children.only(children);
    const ariaProps = {
      "aria-describedby": overlay && open ? mergedId : void 0
    };
    return /* @__PURE__ */ reactExports.cloneElement(child, ariaProps);
  };
  return /* @__PURE__ */ reactExports.createElement(Trigger, _extends({
    popupClassName: classNames?.root,
    prefixCls,
    popup: /* @__PURE__ */ reactExports.createElement(Popup, {
      key: "content",
      prefixCls,
      id: mergedId,
      classNames,
      styles
    }, overlay),
    action: trigger,
    builtinPlacements: placements,
    popupPlacement: placement,
    ref: triggerRef,
    popupAlign: align,
    getPopupContainer: getTooltipContainer,
    onOpenChange: onVisibleChange,
    afterOpenChange: afterVisibleChange,
    popupMotion: motion,
    defaultPopupVisible: defaultVisible,
    autoDestroy: destroyOnHidden,
    mouseLeaveDelay,
    popupStyle: styles?.root,
    mouseEnterDelay,
    arrow: mergedArrow,
    uniqueContainerClassName: classNames?.uniqueContainer,
    uniqueContainerStyle: styles?.uniqueContainer
  }, extraProps), getChildren);
});
export {
  Popup as P,
  Tooltip as T
};
