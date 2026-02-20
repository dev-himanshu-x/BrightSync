import { r as reactExports, a as React } from "./react.mjs";
import { C as CheckCircleFilled$1, a as CloseCircleFilled$1, b as CloseOutlined$1, E as ExclamationCircleFilled$1, I as InfoCircleFilled$1, L as LoadingOutlined$1, R as RightOutlined$1, c as CheckOutlined$1, D as DownOutlined$1, S as SearchOutlined$1, d as LeftOutlined$1, B as BarsOutlined$1, e as EllipsisOutlined$1, Q as QuestionCircleOutlined$1, f as EyeInvisibleOutlined$1, g as EyeOutlined$1, h as LogoutOutlined$1 } from "./ant-design__icons-svg.mjs";
import { c as clsx } from "./clsx.mjs";
import { B as getShadowRoot, z as updateCSS, C as warningOnce } from "./rc-component__util.mjs";
import { g as generate$1, b as blue } from "./ant-design__colors.mjs";
const IconContext = /* @__PURE__ */ reactExports.createContext({});
function camelCase(input) {
  return input.replace(/-(.)/g, (match, g) => g.toUpperCase());
}
function warning(valid, message) {
  warningOnce(valid, `[@ant-design/icons] ${message}`);
}
function isIconDefinition(target) {
  return typeof target === "object" && typeof target.name === "string" && typeof target.theme === "string" && (typeof target.icon === "object" || typeof target.icon === "function");
}
function normalizeAttrs(attrs = {}) {
  return Object.keys(attrs).reduce((acc, key) => {
    const val = attrs[key];
    switch (key) {
      case "class":
        acc.className = val;
        delete acc.class;
        break;
      default:
        delete acc[key];
        acc[camelCase(key)] = val;
    }
    return acc;
  }, {});
}
function generate(node, key, rootProps) {
  if (!rootProps) {
    return /* @__PURE__ */ React.createElement(node.tag, {
      key,
      ...normalizeAttrs(node.attrs)
    }, (node.children || []).map((child, index) => generate(child, `${key}-${node.tag}-${index}`)));
  }
  return /* @__PURE__ */ React.createElement(node.tag, {
    key,
    ...normalizeAttrs(node.attrs),
    ...rootProps
  }, (node.children || []).map((child, index) => generate(child, `${key}-${node.tag}-${index}`)));
}
function getSecondaryColor(primaryColor) {
  return generate$1(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}
const iconStyles = `
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
  vertical-align: inherit;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;
const useInsertStyles = (eleRef) => {
  const {
    csp,
    prefixCls,
    layer
  } = reactExports.useContext(IconContext);
  let mergedStyleStr = iconStyles;
  if (prefixCls) {
    mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
  }
  if (layer) {
    mergedStyleStr = `@layer ${layer} {
${mergedStyleStr}
}`;
  }
  reactExports.useEffect(() => {
    const ele = eleRef.current;
    const shadowRoot = getShadowRoot(ele);
    updateCSS(mergedStyleStr, "@ant-design-icons", {
      prepend: !layer,
      csp,
      attachTo: shadowRoot
    });
  }, []);
};
const twoToneColorPalette = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: false
};
function setTwoToneColors({
  primaryColor,
  secondaryColor
}) {
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return {
    ...twoToneColorPalette
  };
}
const IconBase = (props) => {
  const {
    icon,
    className,
    onClick,
    style,
    primaryColor,
    secondaryColor,
    ...restProps
  } = props;
  const svgRef = reactExports.useRef(null);
  let colors = twoToneColorPalette;
  if (primaryColor) {
    colors = {
      primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }
  useInsertStyles(svgRef);
  warning(isIconDefinition(icon), `icon should be icon definiton, but got ${icon}`);
  if (!isIconDefinition(icon)) {
    return null;
  }
  let target = icon;
  if (target && typeof target.icon === "function") {
    target = {
      ...target,
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    };
  }
  return generate(target.icon, `svg-${target.name}`, {
    className,
    onClick,
    style,
    "data-icon": target.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true",
    ...restProps,
    ref: svgRef
  });
};
IconBase.displayName = "IconReact";
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
function setTwoToneColor(twoToneColor) {
  const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);
  return IconBase.setTwoToneColors({
    primaryColor,
    secondaryColor
  });
}
function getTwoToneColor() {
  const colors = IconBase.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}
function _extends$h() {
  _extends$h = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$h.apply(this, arguments);
}
setTwoToneColor(blue.primary);
const Icon = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    // affect outter <i>...</i>
    className,
    // affect inner <svg>...</svg>
    icon,
    spin,
    rotate,
    tabIndex,
    onClick,
    // other
    twoToneColor,
    ...restProps
  } = props;
  const {
    prefixCls = "anticon",
    rootClassName
  } = reactExports.useContext(IconContext);
  const classString = clsx(rootClassName, prefixCls, {
    [`${prefixCls}-${icon.name}`]: !!icon.name,
    [`${prefixCls}-spin`]: !!spin || icon.name === "loading"
  }, className);
  let iconTabIndex = tabIndex;
  if (iconTabIndex === void 0 && onClick) {
    iconTabIndex = -1;
  }
  const svgStyle = rotate ? {
    msTransform: `rotate(${rotate}deg)`,
    transform: `rotate(${rotate}deg)`
  } : void 0;
  const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);
  return /* @__PURE__ */ reactExports.createElement("span", _extends$h({
    role: "img",
    "aria-label": icon.name
  }, restProps, {
    ref,
    tabIndex: iconTabIndex,
    onClick,
    className: classString
  }), /* @__PURE__ */ reactExports.createElement(IconBase, {
    icon,
    primaryColor,
    secondaryColor,
    style: svgStyle
  }));
});
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
function _extends$g() {
  _extends$g = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$g.apply(this, arguments);
}
const CheckCircleFilled = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$g({}, props, {
  ref,
  icon: CheckCircleFilled$1
}));
const RefIcon$g = /* @__PURE__ */ reactExports.forwardRef(CheckCircleFilled);
function _extends$f() {
  _extends$f = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$f.apply(this, arguments);
}
const CloseCircleFilled = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$f({}, props, {
  ref,
  icon: CloseCircleFilled$1
}));
const RefIcon$f = /* @__PURE__ */ reactExports.forwardRef(CloseCircleFilled);
function _extends$e() {
  _extends$e = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$e.apply(this, arguments);
}
const CloseOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$e({}, props, {
  ref,
  icon: CloseOutlined$1
}));
const RefIcon$e = /* @__PURE__ */ reactExports.forwardRef(CloseOutlined);
function _extends$d() {
  _extends$d = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$d.apply(this, arguments);
}
const ExclamationCircleFilled = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$d({}, props, {
  ref,
  icon: ExclamationCircleFilled$1
}));
const RefIcon$d = /* @__PURE__ */ reactExports.forwardRef(ExclamationCircleFilled);
function _extends$c() {
  _extends$c = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$c.apply(this, arguments);
}
const InfoCircleFilled = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$c({}, props, {
  ref,
  icon: InfoCircleFilled$1
}));
const RefIcon$c = /* @__PURE__ */ reactExports.forwardRef(InfoCircleFilled);
function _extends$b() {
  _extends$b = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$b.apply(this, arguments);
}
const LoadingOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$b({}, props, {
  ref,
  icon: LoadingOutlined$1
}));
const RefIcon$b = /* @__PURE__ */ reactExports.forwardRef(LoadingOutlined);
function _extends$a() {
  _extends$a = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$a.apply(this, arguments);
}
const RightOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$a({}, props, {
  ref,
  icon: RightOutlined$1
}));
const RefIcon$a = /* @__PURE__ */ reactExports.forwardRef(RightOutlined);
function _extends$9() {
  _extends$9 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$9.apply(this, arguments);
}
const CheckOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$9({}, props, {
  ref,
  icon: CheckOutlined$1
}));
const RefIcon$9 = /* @__PURE__ */ reactExports.forwardRef(CheckOutlined);
function _extends$8() {
  _extends$8 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$8.apply(this, arguments);
}
const DownOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$8({}, props, {
  ref,
  icon: DownOutlined$1
}));
const RefIcon$8 = /* @__PURE__ */ reactExports.forwardRef(DownOutlined);
function _extends$7() {
  _extends$7 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$7.apply(this, arguments);
}
const SearchOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$7({}, props, {
  ref,
  icon: SearchOutlined$1
}));
const RefIcon$7 = /* @__PURE__ */ reactExports.forwardRef(SearchOutlined);
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
const LeftOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$6({}, props, {
  ref,
  icon: LeftOutlined$1
}));
const RefIcon$6 = /* @__PURE__ */ reactExports.forwardRef(LeftOutlined);
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
const BarsOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$5({}, props, {
  ref,
  icon: BarsOutlined$1
}));
const RefIcon$5 = /* @__PURE__ */ reactExports.forwardRef(BarsOutlined);
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
const EllipsisOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$4({}, props, {
  ref,
  icon: EllipsisOutlined$1
}));
const RefIcon$4 = /* @__PURE__ */ reactExports.forwardRef(EllipsisOutlined);
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
const QuestionCircleOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$3({}, props, {
  ref,
  icon: QuestionCircleOutlined$1
}));
const RefIcon$3 = /* @__PURE__ */ reactExports.forwardRef(QuestionCircleOutlined);
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
const EyeInvisibleOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$2({}, props, {
  ref,
  icon: EyeInvisibleOutlined$1
}));
const RefIcon$2 = /* @__PURE__ */ reactExports.forwardRef(EyeInvisibleOutlined);
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
const EyeOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends$1({}, props, {
  ref,
  icon: EyeOutlined$1
}));
const RefIcon$1 = /* @__PURE__ */ reactExports.forwardRef(EyeOutlined);
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
const LogoutOutlined = (props, ref) => /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
  ref,
  icon: LogoutOutlined$1
}));
const RefIcon = /* @__PURE__ */ reactExports.forwardRef(LogoutOutlined);
export {
  IconContext as I,
  RefIcon$e as R,
  RefIcon$b as a,
  RefIcon$d as b,
  RefIcon$f as c,
  RefIcon$g as d,
  RefIcon$c as e,
  RefIcon$9 as f,
  RefIcon$7 as g,
  RefIcon$8 as h,
  RefIcon$5 as i,
  RefIcon$6 as j,
  RefIcon$a as k,
  RefIcon$4 as l,
  RefIcon$3 as m,
  RefIcon$1 as n,
  RefIcon$2 as o,
  RefIcon as p
};
