import { r as reactExports, a as React } from "./react.mjs";
import { C as CSSMotion, M as MotionProvider, a as CSSMotionList } from "./rc-component__motion.mjs";
import { c as clsx } from "./clsx.mjs";
import { c as createTheme, u as useCacheToken, a as unit, b as useStyleRegister, S as StyleContext, K as Keyframe } from "./ant-design__cssinjs.mjs";
import { g as genStyleUtils, m as merge$1 } from "./ant-design__cssinjs-utils.mjs";
import { D as Divider, M as MenuItem$1, u as useFullPath, S as SubMenu$1, E as ExportMenu, a as MenuItemGroup } from "./rc-component__menu.mjs";
import { R as RefIcon, I as IconContext, a as RefIcon$1, b as RefIcon$2, c as RefIcon$3, d as RefIcon$4, e as RefIcon$5, f as RefIcon$6, g as RefIcon$7, h as RefIcon$8, i as RefIcon$9, j as RefIcon$a, k as RefIcon$b, l as RefIcon$c, m as RefIcon$d, n as RefIcon$e, o as RefIcon$f } from "./ant-design__icons.mjs";
import { p as pickAttrs, u as useMemo, i as isEqual, m as merge, r as render, w as wrapperRaf, a as unmount, c as composeRef, b as useEvent, s as supportRef, g as getNodeRef, d as isVisible, t as toArray$1, e as useComposeRef, f as useLayoutEffect, o as omit, h as useSafeState, j as canUseDom, k as useControlledState, l as getDOM, n as useId, q as get, v as set, x as triggerFocus } from "./rc-component__util.mjs";
import { F as FastColor } from "./ant-design__fast-color.mjs";
import { l as locale$2, R as RefPanelPicker, g as generateConfig } from "./rc-component__picker.mjs";
import { C as Checkbox } from "./rc-component__checkbox.mjs";
import { T as TypedSelect, O as Option, a as OptGroup } from "./rc-component__select.mjs";
import { _ as _toConsumableArray, a as _createClass, b as _classCallCheck } from "./babel__runtime.mjs";
import { F as FormProvider$1, u as useForm$1, R as RefForm, C as Context, L as ListContext, W as WrapperField, a as List, b as useWatch } from "./rc-component__form.mjs";
import { e } from "./scroll-into-view-if-needed.mjs";
import { P as Popup, T as Tooltip$1 } from "./rc-component__tooltip.mjs";
import { I as Input$2 } from "./rc-component__input.mjs";
import { T as TextArea$1 } from "./rc-component__textarea.mjs";
import { N as Notify, u as useNotification, a as NotificationProvider } from "./rc-component__notification.mjs";
import { l as locale$3 } from "./rc-component__pagination.mjs";
import { U as UniqueProvider$1 } from "./rc-component__trigger.mjs";
import { g as generate, p as presetPrimaryColors, a as presetPalettes } from "./ant-design__colors.mjs";
import { C as Color } from "./rc-component__color-picker.mjs";
import { D as DialogWrap, P as Panel } from "./rc-component__dialog.mjs";
const WarningContext = /* @__PURE__ */ reactExports.createContext({});
const defaultPrefixCls = "ant";
const defaultIconPrefixCls = "anticon";
const Variants = ["outlined", "borderless", "filled", "underlined"];
const defaultGetPrefixCls = (suffixCls, customizePrefixCls) => {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
};
const ConfigContext = /* @__PURE__ */ reactExports.createContext({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,
  iconPrefixCls: defaultIconPrefixCls
});
const {
  Consumer: ConfigConsumer
} = ConfigContext;
const EMPTY_OBJECT = {};
function useComponentConfig(propName) {
  const context = reactExports.useContext(ConfigContext);
  const {
    getPrefixCls,
    direction,
    getPopupContainer,
    renderEmpty
  } = context;
  const propValue = context[propName];
  return {
    classNames: EMPTY_OBJECT,
    styles: EMPTY_OBJECT,
    ...propValue,
    getPrefixCls,
    direction,
    getPopupContainer,
    renderEmpty
  };
}
const PresetColors = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];
function getLineHeight(fontSize) {
  return (fontSize + 8) / fontSize;
}
function getFontSizes(base) {
  const fontSizes = Array.from({
    length: 10
  }).map((_, index) => {
    const i = index - 1;
    const baseSize = base * Math.E ** (i / 5);
    const intSize = index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize);
    return Math.floor(intSize / 2) * 2;
  });
  fontSizes[1] = base;
  return fontSizes.map((size) => ({
    size,
    lineHeight: getLineHeight(size)
  }));
}
const version = "6.3.0";
const defaultPresetColors = {
  blue: "#1677FF",
  purple: "#722ED1",
  cyan: "#13C2C2",
  green: "#52C41A",
  magenta: "#EB2F96",
  /**
   * @deprecated Use magenta instead
   */
  pink: "#EB2F96",
  red: "#F5222D",
  orange: "#FA8C16",
  yellow: "#FADB14",
  volcano: "#FA541C",
  geekblue: "#2F54EB",
  gold: "#FAAD14",
  lime: "#A0D911"
};
const seedToken = {
  // preset color palettes
  ...defaultPresetColors,
  // Color
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorInfo: "#1677ff",
  colorLink: "",
  colorTextBase: "",
  colorBgBase: "",
  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
  fontSize: 14,
  // Line
  lineWidth: 1,
  lineType: "solid",
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
  motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
  motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
  motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  // Radius
  borderRadius: 6,
  // Size
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  // Control Base
  controlHeight: 32,
  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1e3,
  // Image
  opacityImage: 1,
  // Wireframe
  wireframe: false,
  // Motion
  motion: true
};
function genColorMapToken(seed, {
  generateColorPalettes: generateColorPalettes2,
  generateNeutralColorPalettes: generateNeutralColorPalettes2
}) {
  const {
    colorSuccess: colorSuccessBase,
    colorWarning: colorWarningBase,
    colorError: colorErrorBase,
    colorInfo: colorInfoBase,
    colorPrimary: colorPrimaryBase,
    colorBgBase,
    colorTextBase
  } = seed;
  const primaryColors = generateColorPalettes2(colorPrimaryBase);
  const successColors = generateColorPalettes2(colorSuccessBase);
  const warningColors = generateColorPalettes2(colorWarningBase);
  const errorColors = generateColorPalettes2(colorErrorBase);
  const infoColors = generateColorPalettes2(colorInfoBase);
  const neutralColors = generateNeutralColorPalettes2(colorBgBase, colorTextBase);
  const colorLink = seed.colorLink || seed.colorInfo;
  const linkColors = generateColorPalettes2(colorLink);
  const colorErrorBgFilledHover = new FastColor(errorColors[1]).mix(new FastColor(errorColors[3]), 50).toHexString();
  const presetColorTokens = {};
  PresetColors.forEach((colorKey) => {
    const colorBase = seed[colorKey];
    if (colorBase) {
      const colorPalette = generateColorPalettes2(colorBase);
      presetColorTokens[`${colorKey}Hover`] = colorPalette[5];
      presetColorTokens[`${colorKey}Active`] = colorPalette[7];
    }
  });
  return {
    ...neutralColors,
    colorPrimaryBg: primaryColors[1],
    colorPrimaryBgHover: primaryColors[2],
    colorPrimaryBorder: primaryColors[3],
    colorPrimaryBorderHover: primaryColors[4],
    colorPrimaryHover: primaryColors[5],
    colorPrimary: primaryColors[6],
    colorPrimaryActive: primaryColors[7],
    colorPrimaryTextHover: primaryColors[8],
    colorPrimaryText: primaryColors[9],
    colorPrimaryTextActive: primaryColors[10],
    colorSuccessBg: successColors[1],
    colorSuccessBgHover: successColors[2],
    colorSuccessBorder: successColors[3],
    colorSuccessBorderHover: successColors[4],
    colorSuccessHover: successColors[4],
    colorSuccess: successColors[6],
    colorSuccessActive: successColors[7],
    colorSuccessTextHover: successColors[8],
    colorSuccessText: successColors[9],
    colorSuccessTextActive: successColors[10],
    colorErrorBg: errorColors[1],
    colorErrorBgHover: errorColors[2],
    colorErrorBgFilledHover,
    colorErrorBgActive: errorColors[3],
    colorErrorBorder: errorColors[3],
    colorErrorBorderHover: errorColors[4],
    colorErrorHover: errorColors[5],
    colorError: errorColors[6],
    colorErrorActive: errorColors[7],
    colorErrorTextHover: errorColors[8],
    colorErrorText: errorColors[9],
    colorErrorTextActive: errorColors[10],
    colorWarningBg: warningColors[1],
    colorWarningBgHover: warningColors[2],
    colorWarningBorder: warningColors[3],
    colorWarningBorderHover: warningColors[4],
    colorWarningHover: warningColors[4],
    colorWarning: warningColors[6],
    colorWarningActive: warningColors[7],
    colorWarningTextHover: warningColors[8],
    colorWarningText: warningColors[9],
    colorWarningTextActive: warningColors[10],
    colorInfoBg: infoColors[1],
    colorInfoBgHover: infoColors[2],
    colorInfoBorder: infoColors[3],
    colorInfoBorderHover: infoColors[4],
    colorInfoHover: infoColors[4],
    colorInfo: infoColors[6],
    colorInfoActive: infoColors[7],
    colorInfoTextHover: infoColors[8],
    colorInfoText: infoColors[9],
    colorInfoTextActive: infoColors[10],
    colorLinkHover: linkColors[4],
    colorLink: linkColors[6],
    colorLinkActive: linkColors[7],
    ...presetColorTokens,
    colorBgMask: new FastColor("#000").setA(0.45).toRgbString(),
    colorWhite: "#fff"
  };
}
const genRadius = (radiusBase) => {
  let radiusLG = radiusBase;
  let radiusSM = radiusBase;
  let radiusXS = radiusBase;
  let radiusOuter = radiusBase;
  if (radiusBase < 6 && radiusBase >= 5) {
    radiusLG = radiusBase + 1;
  } else if (radiusBase < 16 && radiusBase >= 6) {
    radiusLG = radiusBase + 2;
  } else if (radiusBase >= 16) {
    radiusLG = 16;
  }
  if (radiusBase < 7 && radiusBase >= 5) {
    radiusSM = 4;
  } else if (radiusBase < 8 && radiusBase >= 7) {
    radiusSM = 5;
  } else if (radiusBase < 14 && radiusBase >= 8) {
    radiusSM = 6;
  } else if (radiusBase < 16 && radiusBase >= 14) {
    radiusSM = 7;
  } else if (radiusBase >= 16) {
    radiusSM = 8;
  }
  if (radiusBase < 6 && radiusBase >= 2) {
    radiusXS = 1;
  } else if (radiusBase >= 6) {
    radiusXS = 2;
  }
  if (radiusBase > 4 && radiusBase < 8) {
    radiusOuter = 4;
  } else if (radiusBase >= 8) {
    radiusOuter = 6;
  }
  return {
    borderRadius: radiusBase,
    borderRadiusXS: radiusXS,
    borderRadiusSM: radiusSM,
    borderRadiusLG: radiusLG,
    borderRadiusOuter: radiusOuter
  };
};
function genCommonMapToken(token) {
  const {
    motionUnit,
    motionBase,
    borderRadius,
    lineWidth
  } = token;
  return {
    // motion
    motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
    // line
    lineWidthBold: lineWidth + 1,
    // radius
    ...genRadius(borderRadius)
  };
}
const genControlHeight = (token) => {
  const {
    controlHeight
  } = token;
  return {
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25
  };
};
const genFontMapToken = (fontSize) => {
  const fontSizePairs = getFontSizes(fontSize);
  const fontSizes = fontSizePairs.map((pair) => pair.size);
  const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);
  const fontSizeMD = fontSizes[1];
  const fontSizeSM = fontSizes[0];
  const fontSizeLG = fontSizes[2];
  const lineHeight = lineHeights[1];
  const lineHeightSM = lineHeights[0];
  const lineHeightLG = lineHeights[2];
  return {
    fontSizeSM,
    fontSize: fontSizeMD,
    fontSizeLG,
    fontSizeXL: fontSizes[3],
    fontSizeHeading1: fontSizes[6],
    fontSizeHeading2: fontSizes[5],
    fontSizeHeading3: fontSizes[4],
    fontSizeHeading4: fontSizes[3],
    fontSizeHeading5: fontSizes[2],
    lineHeight,
    lineHeightLG,
    lineHeightSM,
    fontHeight: Math.round(lineHeight * fontSizeMD),
    fontHeightLG: Math.round(lineHeightLG * fontSizeLG),
    fontHeightSM: Math.round(lineHeightSM * fontSizeSM),
    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2]
  };
};
function genSizeMapToken(token) {
  const {
    sizeUnit,
    sizeStep
  } = token;
  return {
    sizeXXL: sizeUnit * (sizeStep + 8),
    // 48
    sizeXL: sizeUnit * (sizeStep + 4),
    // 32
    sizeLG: sizeUnit * (sizeStep + 2),
    // 24
    sizeMD: sizeUnit * (sizeStep + 1),
    // 20
    sizeMS: sizeUnit * sizeStep,
    // 16
    size: sizeUnit * sizeStep,
    // 16
    sizeSM: sizeUnit * (sizeStep - 1),
    // 12
    sizeXS: sizeUnit * (sizeStep - 2),
    // 8
    sizeXXS: sizeUnit * (sizeStep - 3)
    // 4
  };
}
const getAlphaColor$1 = (baseColor, alpha) => new FastColor(baseColor).setA(alpha).toRgbString();
const getSolidColor = (baseColor, brightness) => {
  const instance = new FastColor(baseColor);
  return instance.darken(brightness).toHexString();
};
const generateColorPalettes = (baseColor) => {
  const colors = generate(baseColor);
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[4],
    6: colors[5],
    7: colors[6],
    8: colors[4],
    9: colors[5],
    10: colors[6]
  };
};
const generateNeutralColorPalettes = (bgBaseColor, textBaseColor) => {
  const colorBgBase = bgBaseColor || "#fff";
  const colorTextBase = textBaseColor || "#000";
  return {
    colorBgBase,
    colorTextBase,
    colorText: getAlphaColor$1(colorTextBase, 0.88),
    colorTextSecondary: getAlphaColor$1(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor$1(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor$1(colorTextBase, 0.25),
    colorFill: getAlphaColor$1(colorTextBase, 0.15),
    colorFillSecondary: getAlphaColor$1(colorTextBase, 0.06),
    colorFillTertiary: getAlphaColor$1(colorTextBase, 0.04),
    colorFillQuaternary: getAlphaColor$1(colorTextBase, 0.02),
    colorBgSolid: getAlphaColor$1(colorTextBase, 1),
    colorBgSolidHover: getAlphaColor$1(colorTextBase, 0.75),
    colorBgSolidActive: getAlphaColor$1(colorTextBase, 0.95),
    colorBgLayout: getSolidColor(colorBgBase, 4),
    colorBgContainer: getSolidColor(colorBgBase, 0),
    colorBgElevated: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getAlphaColor$1(colorTextBase, 0.85),
    colorBgBlur: "transparent",
    colorBorder: getSolidColor(colorBgBase, 15),
    colorBorderDisabled: getSolidColor(colorBgBase, 15),
    colorBorderSecondary: getSolidColor(colorBgBase, 6)
  };
};
function derivative(token) {
  presetPrimaryColors.pink = presetPrimaryColors.magenta;
  presetPalettes.pink = presetPalettes.magenta;
  const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
    const colors = token[colorKey] === presetPrimaryColors[colorKey] ? presetPalettes[colorKey] : generate(token[colorKey]);
    return Array.from({
      length: 10
    }, () => 1).reduce((prev, _, i) => {
      prev[`${colorKey}-${i + 1}`] = colors[i];
      prev[`${colorKey}${i + 1}`] = colors[i];
      return prev;
    }, {});
  }).reduce((prev, cur) => {
    prev = {
      ...prev,
      ...cur
    };
    return prev;
  }, {});
  return {
    ...token,
    ...colorPalettes,
    // Colors
    ...genColorMapToken(token, {
      generateColorPalettes,
      generateNeutralColorPalettes
    }),
    // Font
    ...genFontMapToken(token.fontSize),
    // Size
    ...genSizeMapToken(token),
    // Height
    ...genControlHeight(token),
    // Others
    ...genCommonMapToken(token)
  };
}
const defaultTheme = createTheme(derivative);
const defaultConfig = {
  token: seedToken,
  override: {
    override: seedToken
  },
  hashed: true
};
const DesignTokenContext = /* @__PURE__ */ React.createContext(defaultConfig);
function isStableColor(color) {
  return color >= 0 && color <= 255;
}
function getAlphaColor(frontColor, backgroundColor) {
  const {
    r: fR,
    g: fG,
    b: fB,
    a: originAlpha
  } = new FastColor(frontColor).toRgb();
  if (originAlpha < 1) {
    return frontColor;
  }
  const {
    r: bR,
    g: bG,
    b: bB
  } = new FastColor(backgroundColor).toRgb();
  for (let fA = 0.01; fA <= 1; fA += 0.01) {
    const r = Math.round((fR - bR * (1 - fA)) / fA);
    const g = Math.round((fG - bG * (1 - fA)) / fA);
    const b = Math.round((fB - bB * (1 - fA)) / fA);
    if (isStableColor(r) && isStableColor(g) && isStableColor(b)) {
      return new FastColor({
        r,
        g,
        b,
        a: Math.round(fA * 100) / 100
      }).toRgbString();
    }
  }
  return new FastColor({
    r: fR,
    g: fG,
    b: fB,
    a: 1
  }).toRgbString();
}
function formatToken(derivativeToken) {
  const {
    override,
    ...restToken
  } = derivativeToken;
  const overrideTokens = {
    ...override
  };
  Object.keys(seedToken).forEach((token) => {
    delete overrideTokens[token];
  });
  const mergedToken = {
    ...restToken,
    ...overrideTokens
  };
  const screenXS = 480;
  const screenSM = 576;
  const screenMD = 768;
  const screenLG = 992;
  const screenXL = 1200;
  const screenXXL = 1600;
  const screenXXXL = 1920;
  if (mergedToken.motion === false) {
    const fastDuration = "0s";
    mergedToken.motionDurationFast = fastDuration;
    mergedToken.motionDurationMid = fastDuration;
    mergedToken.motionDurationSlow = fastDuration;
  }
  const aliasToken = {
    ...mergedToken,
    // ============== Background ============== //
    colorFillContent: mergedToken.colorFillSecondary,
    colorFillContentHover: mergedToken.colorFill,
    colorFillAlter: mergedToken.colorFillQuaternary,
    colorBgContainerDisabled: mergedToken.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: mergedToken.colorBgContainer,
    colorSplit: getAlphaColor(mergedToken.colorBorderSecondary, mergedToken.colorBgContainer),
    // ============== Text ============== //
    colorTextPlaceholder: mergedToken.colorTextQuaternary,
    colorTextDisabled: mergedToken.colorTextQuaternary,
    colorTextHeading: mergedToken.colorText,
    colorTextLabel: mergedToken.colorTextSecondary,
    colorTextDescription: mergedToken.colorTextTertiary,
    colorTextLightSolid: mergedToken.colorWhite,
    colorHighlight: mergedToken.colorError,
    colorBgTextHover: mergedToken.colorFillSecondary,
    colorBgTextActive: mergedToken.colorFill,
    colorIcon: mergedToken.colorTextTertiary,
    colorIconHover: mergedToken.colorText,
    colorErrorOutline: getAlphaColor(mergedToken.colorErrorBg, mergedToken.colorBgContainer),
    colorWarningOutline: getAlphaColor(mergedToken.colorWarningBg, mergedToken.colorBgContainer),
    // Font
    fontSizeIcon: mergedToken.fontSizeSM,
    // Line
    lineWidthFocus: mergedToken.lineWidth * 3,
    // Control
    lineWidth: mergedToken.lineWidth,
    controlOutlineWidth: mergedToken.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: mergedToken.controlHeight / 2,
    controlItemBgHover: mergedToken.colorFillTertiary,
    controlItemBgActive: mergedToken.colorPrimaryBg,
    controlItemBgActiveHover: mergedToken.colorPrimaryBgHover,
    controlItemBgActiveDisabled: mergedToken.colorFill,
    controlTmpOutline: mergedToken.colorFillQuaternary,
    controlOutline: getAlphaColor(mergedToken.colorPrimaryBg, mergedToken.colorBgContainer),
    lineType: mergedToken.lineType,
    borderRadius: mergedToken.borderRadius,
    borderRadiusXS: mergedToken.borderRadiusXS,
    borderRadiusSM: mergedToken.borderRadiusSM,
    borderRadiusLG: mergedToken.borderRadiusLG,
    fontWeightStrong: 600,
    opacityLoading: 0.65,
    linkDecoration: "none",
    linkHoverDecoration: "none",
    linkFocusDecoration: "none",
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    paddingXXS: mergedToken.sizeXXS,
    paddingXS: mergedToken.sizeXS,
    paddingSM: mergedToken.sizeSM,
    padding: mergedToken.size,
    paddingMD: mergedToken.sizeMD,
    paddingLG: mergedToken.sizeLG,
    paddingXL: mergedToken.sizeXL,
    paddingContentHorizontalLG: mergedToken.sizeLG,
    paddingContentVerticalLG: mergedToken.sizeMS,
    paddingContentHorizontal: mergedToken.sizeMS,
    paddingContentVertical: mergedToken.sizeSM,
    paddingContentHorizontalSM: mergedToken.size,
    paddingContentVerticalSM: mergedToken.sizeXS,
    marginXXS: mergedToken.sizeXXS,
    marginXS: mergedToken.sizeXS,
    marginSM: mergedToken.sizeSM,
    margin: mergedToken.size,
    marginMD: mergedToken.sizeMD,
    marginLG: mergedToken.sizeLG,
    marginXL: mergedToken.sizeXL,
    marginXXL: mergedToken.sizeXXL,
    boxShadow: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    screenXS,
    screenXSMin: screenXS,
    screenXSMax: screenSM - 1,
    screenSM,
    screenSMMin: screenSM,
    screenSMMax: screenMD - 1,
    screenMD,
    screenMDMin: screenMD,
    screenMDMax: screenLG - 1,
    screenLG,
    screenLGMin: screenLG,
    screenLGMax: screenXL - 1,
    screenXL,
    screenXLMin: screenXL,
    screenXLMax: screenXXL - 1,
    screenXXL,
    screenXXLMin: screenXXL,
    screenXXLMax: screenXXXL - 1,
    screenXXXL,
    screenXXXLMin: screenXXXL,
    boxShadowPopoverArrow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
    boxShadowCard: `
      0 1px 2px -2px ${new FastColor("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new FastColor("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new FastColor("rgba(0, 0, 0, 0.09)").toRgbString()}
    `,
    boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)",
    // Override AliasToken
    ...overrideTokens
  };
  return aliasToken;
}
const unitless = {
  lineHeight: true,
  lineHeightSM: true,
  lineHeightLG: true,
  lineHeightHeading1: true,
  lineHeightHeading2: true,
  lineHeightHeading3: true,
  lineHeightHeading4: true,
  lineHeightHeading5: true,
  opacityLoading: true,
  fontWeightStrong: true,
  zIndexPopupBase: true,
  zIndexBase: true,
  opacityImage: true
};
const ignore = {
  motionBase: true,
  motionUnit: true
};
const preserve = {
  screenXS: true,
  screenXSMin: true,
  screenXSMax: true,
  screenSM: true,
  screenSMMin: true,
  screenSMMax: true,
  screenMD: true,
  screenMDMin: true,
  screenMDMax: true,
  screenLG: true,
  screenLGMin: true,
  screenLGMax: true,
  screenXL: true,
  screenXLMin: true,
  screenXLMax: true,
  screenXXL: true,
  screenXXLMin: true
};
const getComputedToken = (originToken, overrideToken, theme) => {
  const derivativeToken = theme.getDerivativeToken(originToken);
  const {
    override,
    ...components
  } = overrideToken;
  let mergedDerivativeToken = {
    ...derivativeToken,
    override
  };
  mergedDerivativeToken = formatToken(mergedDerivativeToken);
  if (components) {
    Object.entries(components).forEach(([key, value]) => {
      const {
        theme: componentTheme,
        ...componentTokens
      } = value;
      let mergedComponentToken = componentTokens;
      if (componentTheme) {
        mergedComponentToken = getComputedToken({
          ...mergedDerivativeToken,
          ...componentTokens
        }, {
          override: componentTokens
        }, componentTheme);
      }
      mergedDerivativeToken[key] = mergedComponentToken;
    });
  }
  return mergedDerivativeToken;
};
function useToken() {
  const {
    token: rootDesignToken,
    hashed,
    theme,
    override,
    cssVar: ctxCssVar,
    zeroRuntime
  } = React.useContext(DesignTokenContext);
  const cssVar = {
    prefix: ctxCssVar?.prefix ?? "ant",
    key: ctxCssVar?.key ?? "css-var-root"
  };
  const salt = `${version}-${hashed || ""}`;
  const mergedTheme = theme || defaultTheme;
  const [token, hashId, realToken] = useCacheToken(mergedTheme, [seedToken, rootDesignToken], {
    salt,
    override,
    getComputedToken,
    cssVar: {
      ...cssVar,
      unitless,
      ignore,
      preserve
    }
  });
  return [mergedTheme, realToken, hashed ? hashId : "", token, cssVar, !!zeroRuntime];
}
const textEllipsis = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
};
const resetComponent = (token, needInheritFontFamily = false) => ({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  color: token.colorText,
  fontSize: token.fontSize,
  // font-variant: @font-variant-base;
  lineHeight: token.lineHeight,
  listStyle: "none",
  // font-feature-settings: @font-feature-settings-base;
  fontFamily: needInheritFontFamily ? "inherit" : token.fontFamily
});
const resetIcon = () => ({
  display: "inline-flex",
  alignItems: "center",
  color: "inherit",
  fontStyle: "normal",
  lineHeight: 0,
  textAlign: "center",
  textTransform: "none",
  // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
  verticalAlign: "-0.125em",
  textRendering: "optimizeLegibility",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  "> *": {
    lineHeight: 1
  },
  svg: {
    display: "inline-block"
  }
});
const clearFix = () => ({
  // https://github.com/ant-design/ant-design/issues/21301#issuecomment-583955229
  "&::before": {
    display: "table",
    content: '""'
  },
  "&::after": {
    // https://github.com/ant-design/ant-design/issues/21864
    display: "table",
    clear: "both",
    content: '""'
  }
});
const genLinkStyle = (token) => ({
  a: {
    color: token.colorLink,
    textDecoration: token.linkDecoration,
    backgroundColor: "transparent",
    // remove the gray background on active links in IE 10.
    outline: "none",
    cursor: "pointer",
    transition: `color ${token.motionDurationSlow}`,
    "-webkit-text-decoration-skip": "objects",
    // remove gaps in links underline in iOS 8+ and Safari 8+.
    "&:hover": {
      color: token.colorLinkHover
    },
    "&:active": {
      color: token.colorLinkActive
    },
    "&:active, &:hover": {
      textDecoration: token.linkHoverDecoration,
      outline: 0
    },
    // https://github.com/ant-design/ant-design/issues/22503
    "&:focus": {
      textDecoration: token.linkFocusDecoration,
      outline: 0
    },
    "&[disabled]": {
      color: token.colorTextDisabled,
      cursor: "not-allowed"
    }
  }
});
const genCommonStyle = (token, componentPrefixCls, rootCls, resetFont) => {
  const prefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
  const rootPrefixSelector = rootCls ? `.${rootCls}` : prefixSelector;
  const resetStyle = {
    boxSizing: "border-box",
    "&::before, &::after": {
      boxSizing: "border-box"
    }
  };
  let resetFontStyle = {};
  if (resetFont !== false) {
    resetFontStyle = {
      fontFamily: token.fontFamily,
      fontSize: token.fontSize
    };
  }
  return {
    [rootPrefixSelector]: {
      ...resetFontStyle,
      ...resetStyle,
      [prefixSelector]: resetStyle
    }
  };
};
const genFocusOutline = (token, offset) => ({
  outline: `${unit(token.lineWidthFocus)} solid ${token.colorPrimaryBorder}`,
  outlineOffset: 1,
  transition: [`outline-offset`, `outline`].map((prop) => `${prop} 0s`).join(", ")
});
const genFocusStyle = (token, offset) => ({
  "&:focus-visible": genFocusOutline(token)
});
const genIconStyle = (iconPrefixCls) => ({
  [`.${iconPrefixCls}`]: {
    ...resetIcon(),
    [`.${iconPrefixCls} .${iconPrefixCls}-icon`]: {
      display: "block"
    }
  }
});
const {
  genStyleHooks,
  genComponentStyleHook,
  genSubStyleComponent
} = genStyleUtils({
  usePrefix: () => {
    const {
      getPrefixCls,
      iconPrefixCls
    } = reactExports.useContext(ConfigContext);
    const rootPrefixCls = getPrefixCls();
    return {
      rootPrefixCls,
      iconPrefixCls
    };
  },
  useToken: () => {
    const [theme, realToken, hashId, token, cssVar, zeroRuntime] = useToken();
    return {
      theme,
      realToken,
      hashId,
      token,
      cssVar,
      zeroRuntime
    };
  },
  useCSP: () => {
    const {
      csp
    } = reactExports.useContext(ConfigContext);
    return csp ?? {};
  },
  getResetStyles: (token, config) => {
    const linkStyle = genLinkStyle(token);
    return [linkStyle, {
      "&": linkStyle
    }, genIconStyle(config?.prefix.iconPrefixCls ?? defaultIconPrefixCls)];
  },
  getCommonStyle: genCommonStyle,
  getCompUnitless: () => unitless
});
const genCssVar = (antCls, component) => {
  const cssPrefix = `--${antCls.replace(/\./g, "")}-${component}-`;
  const varName = (name) => {
    return `${cssPrefix}${name}`;
  };
  const varRef = (name, fallback) => {
    return fallback ? `var(${cssPrefix}${name}, ${fallback})` : `var(${cssPrefix}${name})`;
  };
  return [varName, varRef];
};
function genPresetColor(token, genCss) {
  return PresetColors.reduce((prev, colorKey) => {
    const lightColor = token[`${colorKey}1`];
    const lightBorderColor = token[`${colorKey}3`];
    const darkColor = token[`${colorKey}6`];
    const textColor = token[`${colorKey}7`];
    return {
      ...prev,
      ...genCss(colorKey, {
        lightColor,
        lightBorderColor,
        darkColor,
        textColor
      })
    };
  }, {});
}
const useResetIconStyle = (iconPrefixCls, csp) => {
  useToken();
  return useStyleRegister({
    hashId: "",
    path: ["ant-design-icons", iconPrefixCls],
    nonce: () => csp?.nonce,
    layer: {
      name: "antd"
    }
  }, () => genIconStyle(iconPrefixCls));
};
const locale$1 = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
const locale = {
  lang: {
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"],
    ...locale$2
  },
  timePickerLocale: {
    ...locale$1
  }
};
const typeTemplate = "${label} is not a valid ${type}";
const localeValues = {
  locale: "en",
  Pagination: locale$3,
  DatePicker: locale,
  TimePicker: locale$1,
  Calendar: locale,
  global: {
    placeholder: "Please select",
    close: "Close",
    sortable: "sortable"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    filterCheckAll: "Select all items",
    filterSearchPlaceholder: "Search in filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Tour: {
    Next: "Next",
    Previous: "Previous",
    Finish: "Finish"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    deselectAll: "Deselect all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand",
    collapse: "Collapse"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  QRCode: {
    expired: "QR code expired",
    refresh: "Refresh",
    scanned: "Scanned"
  },
  ColorPicker: {
    presetEmpty: "Empty",
    transparent: "Transparent",
    singleColor: "Single",
    gradientColor: "Gradient"
  }
};
let runtimeLocale = {
  ...localeValues.Modal
};
let localeList = [];
const generateLocale = () => localeList.reduce((merged, locale2) => ({
  ...merged,
  ...locale2
}), localeValues.Modal);
function changeConfirmLocale(newLocale) {
  if (newLocale) {
    const cloneLocale = {
      ...newLocale
    };
    localeList.push(cloneLocale);
    runtimeLocale = generateLocale();
    return () => {
      localeList = localeList.filter((locale2) => locale2 !== cloneLocale);
      runtimeLocale = generateLocale();
    };
  }
  runtimeLocale = {
    ...localeValues.Modal
  };
}
function getConfirmLocale() {
  return runtimeLocale;
}
const LocaleContext = /* @__PURE__ */ reactExports.createContext(void 0);
const useLocale = (componentName, defaultLocale) => {
  const fullLocale = reactExports.useContext(LocaleContext);
  const getLocale = reactExports.useMemo(() => {
    const locale2 = defaultLocale || localeValues[componentName];
    const localeFromContext = fullLocale?.[componentName] ?? {};
    return {
      ...typeof locale2 === "function" ? locale2() : locale2,
      ...localeFromContext || {}
    };
  }, [componentName, defaultLocale, fullLocale]);
  const getLocaleCode = reactExports.useMemo(() => {
    const localeCode = fullLocale?.locale;
    if (fullLocale?.exist && !localeCode) {
      return localeValues.locale;
    }
    return localeCode;
  }, [fullLocale]);
  return [getLocale, getLocaleCode];
};
const ANT_MARK = "internalMark";
const LocaleProvider = (props) => {
  const {
    locale: locale2 = {},
    children,
    _ANT_MARK__
  } = props;
  reactExports.useEffect(() => {
    const clearLocale = changeConfirmLocale(locale2?.Modal);
    return clearLocale;
  }, [locale2]);
  const getMemoizedContextValue = reactExports.useMemo(() => ({
    ...locale2,
    exist: true
  }), [locale2]);
  return /* @__PURE__ */ reactExports.createElement(LocaleContext.Provider, {
    value: getMemoizedContextValue
  }, children);
};
function mergeProps(...items) {
  const ret = {};
  items.forEach((item) => {
    if (item) {
      Object.keys(item).forEach((key) => {
        if (item[key] !== void 0) {
          ret[key] = item[key];
        }
      });
    }
  });
  return ret;
}
const isNonNullable = (val) => {
  return val !== void 0 && val !== null;
};
const pickClosable = (context) => {
  if (!context) {
    return void 0;
  }
  const {
    closable,
    closeIcon
  } = context;
  return {
    closable,
    closeIcon
  };
};
const EmptyFallbackCloseCollection = {};
const computeClosableConfig = (closable, closeIcon) => {
  if (!closable && (closable === false || closeIcon === false || closeIcon === null)) {
    return false;
  }
  if (closable === void 0 && closeIcon === void 0) {
    return null;
  }
  let closableConfig = {
    closeIcon: typeof closeIcon !== "boolean" && closeIcon !== null ? closeIcon : void 0
  };
  if (closable && typeof closable === "object") {
    closableConfig = {
      ...closableConfig,
      ...closable
    };
  }
  return closableConfig;
};
const mergeClosableConfigs = (propConfig, contextConfig, fallbackConfig) => {
  if (propConfig === false) {
    return false;
  }
  if (propConfig) {
    return mergeProps(fallbackConfig, contextConfig, propConfig);
  }
  if (contextConfig === false) {
    return false;
  }
  if (contextConfig) {
    return mergeProps(fallbackConfig, contextConfig);
  }
  return fallbackConfig.closable ? fallbackConfig : false;
};
const computeCloseIcon = (mergedConfig, fallbackCloseCollection, closeLabel) => {
  const {
    closeIconRender
  } = fallbackCloseCollection;
  const {
    closeIcon,
    ...restConfig
  } = mergedConfig;
  let finalCloseIcon = closeIcon;
  const ariaOrDataProps = pickAttrs(restConfig, true);
  if (isNonNullable(finalCloseIcon)) {
    if (closeIconRender) {
      finalCloseIcon = closeIconRender(finalCloseIcon);
    }
    finalCloseIcon = /* @__PURE__ */ React.isValidElement(finalCloseIcon) ? /* @__PURE__ */ React.cloneElement(finalCloseIcon, {
      "aria-label": closeLabel,
      ...finalCloseIcon.props,
      ...ariaOrDataProps
    }) : /* @__PURE__ */ React.createElement("span", {
      "aria-label": closeLabel,
      ...ariaOrDataProps
    }, finalCloseIcon);
  }
  return [finalCloseIcon, ariaOrDataProps];
};
const computeClosable = (propCloseCollection, contextCloseCollection, fallbackCloseCollection = EmptyFallbackCloseCollection, closeLabel = "Close") => {
  const propConfig = computeClosableConfig(propCloseCollection?.closable, propCloseCollection?.closeIcon);
  const contextConfig = computeClosableConfig(contextCloseCollection?.closable, contextCloseCollection?.closeIcon);
  const mergedFallback = {
    closeIcon: /* @__PURE__ */ React.createElement(RefIcon, null),
    ...fallbackCloseCollection
  };
  const mergedConfig = mergeClosableConfigs(propConfig, contextConfig, mergedFallback);
  const closeBtnIsDisabled = typeof mergedConfig !== "boolean" ? !!mergedConfig?.disabled : false;
  if (mergedConfig === false) {
    return [false, null, closeBtnIsDisabled, {}];
  }
  const [closeIcon, ariaProps] = computeCloseIcon(mergedConfig, mergedFallback, closeLabel);
  return [true, closeIcon, closeBtnIsDisabled, ariaProps];
};
const useClosable = (propCloseCollection, contextCloseCollection, fallbackCloseCollection = EmptyFallbackCloseCollection) => {
  const [contextLocale] = useLocale("global", localeValues.global);
  return React.useMemo(() => {
    return computeClosable(propCloseCollection, contextCloseCollection, {
      closeIcon: /* @__PURE__ */ React.createElement(RefIcon, null),
      ...fallbackCloseCollection
    }, contextLocale.close);
  }, [propCloseCollection, contextCloseCollection, fallbackCloseCollection, contextLocale.close]);
};
const useForceUpdate = () => {
  return React.useReducer((ori) => ori + 1, 0);
};
const normalizeMaskConfig = (mask, maskClosable) => {
  let maskConfig = {};
  if (mask && typeof mask === "object") {
    maskConfig = mask;
  }
  if (typeof mask === "boolean") {
    maskConfig = {
      enabled: mask
    };
  }
  if (maskConfig.closable === void 0 && maskClosable !== void 0) {
    maskConfig.closable = maskClosable;
  }
  return maskConfig;
};
const useMergedMask = (mask, contextMask, prefixCls, maskClosable) => {
  return reactExports.useMemo(() => {
    const maskConfig = normalizeMaskConfig(mask, maskClosable);
    const contextMaskConfig = normalizeMaskConfig(contextMask);
    const mergedConfig = {
      blur: false,
      ...contextMaskConfig,
      ...maskConfig,
      closable: maskConfig.closable ?? maskClosable ?? contextMaskConfig.closable ?? true
    };
    const className = mergedConfig.blur ? `${prefixCls}-mask-blur` : void 0;
    return [mergedConfig.enabled !== false, {
      mask: className
    }, !!mergedConfig.closable];
  }, [mask, contextMask, prefixCls, maskClosable]);
};
const mergeClassNames = (schema, ...classNames) => {
  const mergedSchema = schema || {};
  return classNames.filter(Boolean).reduce((acc, cur) => {
    Object.keys(cur || {}).forEach((key) => {
      const keySchema = mergedSchema[key];
      const curVal = cur[key];
      if (keySchema && typeof keySchema === "object") {
        if (curVal && typeof curVal === "object") {
          acc[key] = mergeClassNames(keySchema, acc[key], curVal);
        } else {
          const {
            _default: defaultField
          } = keySchema;
          if (defaultField) {
            acc[key] = acc[key] || {};
            acc[key][defaultField] = clsx(acc[key][defaultField], curVal);
          }
        }
      } else {
        acc[key] = clsx(acc[key], curVal);
      }
    });
    return acc;
  }, {});
};
const useSemanticClassNames = (schema, ...classNames) => {
  return reactExports.useMemo(() => mergeClassNames.apply(void 0, [schema].concat(classNames)), [schema].concat(classNames));
};
const mergeStyles = (...styles) => {
  return styles.filter(Boolean).reduce((acc, cur = {}) => {
    Object.keys(cur).forEach((key) => {
      acc[key] = {
        ...acc[key],
        ...cur[key]
      };
    });
    return acc;
  }, {});
};
const useSemanticStyles = (...styles) => {
  return reactExports.useMemo(() => mergeStyles.apply(void 0, styles), [].concat(styles));
};
const fillObjectBySchema = (obj, schema) => {
  const newObj = {
    ...obj
  };
  Object.keys(schema).forEach((key) => {
    if (key !== "_default") {
      const nestSchema = schema[key];
      const nextValue = newObj[key] || {};
      newObj[key] = nestSchema ? fillObjectBySchema(nextValue, nestSchema) : nextValue;
    }
  });
  return newObj;
};
const resolveStyleOrClass = (value, info) => {
  return typeof value === "function" ? value(info) : value;
};
const useMergeSemantic = (classNamesList, stylesList, info, schema) => {
  const resolvedClassNamesList = classNamesList.map((classNames) => classNames ? resolveStyleOrClass(classNames, info) : void 0);
  const resolvedStylesList = stylesList.map((styles) => styles ? resolveStyleOrClass(styles, info) : void 0);
  const mergedClassNames = useSemanticClassNames.apply(void 0, [schema].concat(_toConsumableArray(resolvedClassNamesList)));
  const mergedStyles = useSemanticStyles.apply(void 0, _toConsumableArray(resolvedStylesList));
  return reactExports.useMemo(() => {
    if (!schema) {
      return [mergedClassNames, mergedStyles];
    }
    return [fillObjectBySchema(mergedClassNames, schema), fillObjectBySchema(mergedStyles, schema)];
  }, [mergedClassNames, mergedStyles, schema]);
};
const isValidOrientation = (orientation) => {
  return orientation === "horizontal" || orientation === "vertical";
};
const useOrientation = (orientation, vertical, legacyDirection) => {
  return reactExports.useMemo(() => {
    const validOrientation = isValidOrientation(orientation);
    let mergedOrientation;
    if (validOrientation) {
      mergedOrientation = orientation;
    } else if (typeof vertical === "boolean") {
      mergedOrientation = vertical ? "vertical" : "horizontal";
    } else {
      const validLegacyDirection = isValidOrientation(legacyDirection);
      mergedOrientation = validLegacyDirection ? legacyDirection : "horizontal";
    }
    return [mergedOrientation, mergedOrientation === "vertical"];
  }, [legacyDirection, orientation, vertical]);
};
const usePatchElement = () => {
  const [elements, setElements] = reactExports.useState([]);
  const patchElement = reactExports.useCallback((element) => {
    setElements((originElements) => [].concat(_toConsumableArray(originElements), [element]));
    return () => {
      setElements((originElements) => originElements.filter((ele) => ele !== element));
    };
  }, []);
  return [elements, patchElement];
};
const ZIndexContext = /* @__PURE__ */ React.createContext(void 0);
const CONTAINER_OFFSET = 100;
const CONTAINER_OFFSET_MAX_COUNT = 10;
const CONTAINER_MAX_OFFSET = CONTAINER_OFFSET * CONTAINER_OFFSET_MAX_COUNT;
const containerBaseZIndexOffset = {
  Modal: CONTAINER_OFFSET,
  Drawer: CONTAINER_OFFSET,
  Popover: CONTAINER_OFFSET,
  Popconfirm: CONTAINER_OFFSET,
  Tooltip: CONTAINER_OFFSET,
  Tour: CONTAINER_OFFSET,
  FloatButton: CONTAINER_OFFSET
};
const consumerBaseZIndexOffset = {
  SelectLike: 50,
  Dropdown: 50,
  DatePicker: 50,
  Menu: 50,
  ImagePreview: 1
};
const isContainerType = (type) => {
  return type in containerBaseZIndexOffset;
};
const useZIndex = (componentType, customZIndex) => {
  const [, token] = useToken();
  const parentZIndex = React.useContext(ZIndexContext);
  const isContainer = isContainerType(componentType);
  let result;
  if (customZIndex !== void 0) {
    result = [customZIndex, customZIndex];
  } else {
    let zIndex = parentZIndex ?? 0;
    if (isContainer) {
      zIndex += // Use preset token zIndex by default but not stack when has parent container
      (parentZIndex ? 0 : token.zIndexPopupBase) + // Container offset
      containerBaseZIndexOffset[componentType];
    } else {
      zIndex += consumerBaseZIndexOffset[componentType];
    }
    result = [parentZIndex === void 0 ? customZIndex : zIndex, zIndex];
  }
  return result;
};
const useCSSVarCls = (prefixCls) => `${prefixCls}-css-var`;
const ValidateMessagesContext = /* @__PURE__ */ reactExports.createContext(void 0);
function isFragment(child) {
  return child && /* @__PURE__ */ React.isValidElement(child) && child.type === React.Fragment;
}
const replaceElement = (element, replacement, props) => {
  if (!/* @__PURE__ */ React.isValidElement(element)) {
    return replacement;
  }
  return /* @__PURE__ */ React.cloneElement(element, typeof props === "function" ? props(element.props || {}) : props);
};
function cloneElement(element, props) {
  return replaceElement(element, element, props);
}
const MotionContent = ({
  children
}) => {
  const {
    getPrefixCls
  } = React.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  if (!/* @__PURE__ */ React.isValidElement(children)) {
    return children;
  }
  return /* @__PURE__ */ React.createElement(CSSMotion, {
    visible: true,
    motionName: `${rootPrefixCls}-fade`,
    motionAppear: true,
    motionEnter: true,
    motionLeave: false,
    removeOnLeave: false
  }, ({
    style: motionStyle,
    className: motionClassName
  }) => {
    return cloneElement(children, (oriProps) => ({
      className: clsx(oriProps.className, motionClassName),
      style: {
        ...oriProps.style,
        ...motionStyle
      }
    }));
  });
};
const cachedPlacements = [null, null];
function uniqueBuiltinPlacements(ori) {
  if (cachedPlacements[0] !== ori) {
    const target = {};
    Object.keys(ori).forEach((placement) => {
      target[placement] = {
        ...ori[placement],
        dynamicInset: false
      };
    });
    cachedPlacements[0] = ori;
    cachedPlacements[1] = target;
  }
  return cachedPlacements[1];
}
const UniqueProvider = ({
  children
}) => {
  const renderPopup = (options) => {
    const {
      id,
      builtinPlacements,
      popup
    } = options;
    const popupEle = typeof popup === "function" ? popup() : popup;
    const parsedPlacements = uniqueBuiltinPlacements(builtinPlacements);
    return {
      ...options,
      getPopupContainer: null,
      arrow: false,
      popup: /* @__PURE__ */ React.createElement(MotionContent, {
        key: id
      }, popupEle),
      builtinPlacements: parsedPlacements
    };
  };
  return /* @__PURE__ */ React.createElement(UniqueProvider$1, {
    postTriggerProps: renderPopup
  }, children);
};
const DisabledContext = /* @__PURE__ */ reactExports.createContext(false);
const DisabledContextProvider = ({
  children,
  disabled
}) => {
  const originDisabled = reactExports.useContext(DisabledContext);
  return /* @__PURE__ */ reactExports.createElement(DisabledContext.Provider, {
    value: disabled ?? originDisabled
  }, children);
};
const SizeContext = /* @__PURE__ */ reactExports.createContext(void 0);
const SizeContextProvider = ({
  children,
  size
}) => {
  const originSize = reactExports.useContext(SizeContext);
  return /* @__PURE__ */ reactExports.createElement(SizeContext.Provider, {
    value: size || originSize
  }, children);
};
function useConfig() {
  const componentDisabled = reactExports.useContext(DisabledContext);
  const componentSize = reactExports.useContext(SizeContext);
  return {
    componentDisabled,
    componentSize
  };
}
function useTheme(theme, parentTheme, config) {
  const themeConfig = theme || {};
  const parentThemeConfig = themeConfig.inherit === false || !parentTheme ? {
    ...defaultConfig,
    hashed: parentTheme?.hashed ?? defaultConfig.hashed,
    cssVar: parentTheme?.cssVar
  } : parentTheme;
  const themeKey = reactExports.useId();
  return useMemo(() => {
    if (!theme) {
      return parentTheme;
    }
    const mergedComponents = {
      ...parentThemeConfig.components
    };
    Object.keys(theme.components || {}).forEach((componentName) => {
      mergedComponents[componentName] = {
        ...mergedComponents[componentName],
        ...theme.components[componentName]
      };
    });
    const cssVarKey = `css-var-${themeKey.replace(/:/g, "")}`;
    const mergedCssVar = {
      prefix: config?.prefixCls,
      // Same as prefixCls by default
      ...parentThemeConfig.cssVar,
      ...themeConfig.cssVar,
      key: themeConfig.cssVar?.key || cssVarKey
    };
    return {
      ...parentThemeConfig,
      ...themeConfig,
      token: {
        ...parentThemeConfig.token,
        ...themeConfig.token
      },
      components: mergedComponents,
      cssVar: mergedCssVar
    };
  }, [themeConfig, parentThemeConfig], (prev, next) => prev.some((prevTheme, index) => {
    const nextTheme = next[index];
    return !isEqual(prevTheme, nextTheme, true);
  }));
}
const MotionCacheContext = /* @__PURE__ */ reactExports.createContext(true);
function MotionWrapper(props) {
  const parentMotion = reactExports.useContext(MotionCacheContext);
  const {
    children
  } = props;
  const [, token] = useToken();
  const {
    motion
  } = token;
  const needWrapMotionProviderRef = reactExports.useRef(false);
  needWrapMotionProviderRef.current || (needWrapMotionProviderRef.current = parentMotion !== motion);
  if (needWrapMotionProviderRef.current) {
    return /* @__PURE__ */ reactExports.createElement(MotionCacheContext.Provider, {
      value: motion
    }, /* @__PURE__ */ reactExports.createElement(MotionProvider, {
      motion
    }, children));
  }
  return children;
}
const PropWarning = () => null;
const IconStyle = ({
  iconPrefixCls,
  csp
}) => {
  useResetIconStyle(iconPrefixCls, csp);
  return null;
};
const PASSED_PROPS = ["getTargetContainer", "getPopupContainer", "renderEmpty", "input", "pagination", "form", "select", "button"];
let globalPrefixCls;
let globalIconPrefixCls;
let globalTheme;
let globalHolderRender;
function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls;
}
function getGlobalIconPrefixCls() {
  return globalIconPrefixCls || defaultIconPrefixCls;
}
const setGlobalConfig = (props) => {
  const {
    prefixCls,
    iconPrefixCls,
    theme,
    holderRender
  } = props;
  if (prefixCls !== void 0) {
    globalPrefixCls = prefixCls;
  }
  if (iconPrefixCls !== void 0) {
    globalIconPrefixCls = iconPrefixCls;
  }
  if ("holderRender" in props) {
    globalHolderRender = holderRender;
  }
  if (theme) {
    globalTheme = theme;
  }
};
const globalConfig = () => ({
  getPrefixCls: (suffixCls, customizePrefixCls) => {
    if (customizePrefixCls) {
      return customizePrefixCls;
    }
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
  },
  getIconPrefixCls: getGlobalIconPrefixCls,
  getRootPrefixCls: () => {
    if (globalPrefixCls) {
      return globalPrefixCls;
    }
    return getGlobalPrefixCls();
  },
  getTheme: () => globalTheme,
  holderRender: globalHolderRender
});
const ProviderChildren = (props) => {
  const {
    children,
    csp: customCsp,
    autoInsertSpaceInButton,
    alert,
    affix,
    anchor,
    app,
    form,
    locale: locale2,
    componentSize,
    direction,
    space,
    splitter,
    virtual,
    dropdownMatchSelectWidth,
    popupMatchSelectWidth,
    popupOverflow,
    legacyLocale,
    parentContext,
    iconPrefixCls: customIconPrefixCls,
    theme,
    componentDisabled,
    segmented,
    statistic,
    spin,
    calendar,
    carousel,
    cascader,
    collapse,
    typography,
    checkbox,
    descriptions,
    divider,
    drawer,
    skeleton,
    steps,
    image,
    layout,
    list,
    mentions,
    modal,
    progress,
    result,
    slider,
    breadcrumb,
    masonry,
    menu,
    pagination,
    input,
    textArea,
    otp,
    empty,
    badge,
    radio,
    rate,
    ribbon,
    switch: SWITCH,
    transfer,
    avatar,
    message: message2,
    tag,
    table,
    card,
    cardMeta,
    tabs,
    timeline,
    timePicker,
    upload,
    notification,
    tree,
    colorPicker,
    datePicker,
    rangePicker,
    flex,
    wave,
    dropdown,
    warning: warningConfig,
    tour,
    tooltip,
    popover,
    popconfirm,
    qrcode,
    floatButton,
    floatButtonGroup,
    variant,
    inputNumber,
    treeSelect,
    watermark
  } = props;
  const getPrefixCls = reactExports.useCallback((suffixCls, customizePrefixCls) => {
    const {
      prefixCls
    } = props;
    if (customizePrefixCls) {
      return customizePrefixCls;
    }
    const mergedPrefixCls = prefixCls || parentContext.getPrefixCls("");
    return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
  }, [parentContext.getPrefixCls, props.prefixCls]);
  const iconPrefixCls = customIconPrefixCls || parentContext.iconPrefixCls || defaultIconPrefixCls;
  const csp = customCsp || parentContext.csp;
  const mergedTheme = useTheme(theme, parentContext.theme, {
    prefixCls: getPrefixCls("")
  });
  const baseConfig = {
    csp,
    autoInsertSpaceInButton,
    alert,
    affix,
    anchor,
    app,
    locale: locale2 || legacyLocale,
    direction,
    space,
    splitter,
    virtual,
    popupMatchSelectWidth: popupMatchSelectWidth ?? dropdownMatchSelectWidth,
    popupOverflow,
    getPrefixCls,
    iconPrefixCls,
    theme: mergedTheme,
    segmented,
    statistic,
    spin,
    calendar,
    carousel,
    cascader,
    collapse,
    typography,
    checkbox,
    descriptions,
    divider,
    drawer,
    skeleton,
    steps,
    image,
    input,
    textArea,
    otp,
    layout,
    list,
    mentions,
    modal,
    progress,
    result,
    slider,
    breadcrumb,
    masonry,
    menu,
    pagination,
    empty,
    badge,
    radio,
    rate,
    ribbon,
    switch: SWITCH,
    transfer,
    avatar,
    message: message2,
    tag,
    table,
    card,
    cardMeta,
    tabs,
    timeline,
    timePicker,
    upload,
    notification,
    tree,
    colorPicker,
    datePicker,
    rangePicker,
    flex,
    wave,
    dropdown,
    warning: warningConfig,
    tour,
    tooltip,
    popover,
    popconfirm,
    qrcode,
    floatButton,
    floatButtonGroup,
    variant,
    inputNumber,
    treeSelect,
    watermark
  };
  const config = {
    ...parentContext
  };
  Object.keys(baseConfig).forEach((key) => {
    if (baseConfig[key] !== void 0) {
      config[key] = baseConfig[key];
    }
  });
  PASSED_PROPS.forEach((propName) => {
    const propValue = props[propName];
    if (propValue) {
      config[propName] = propValue;
    }
  });
  if (typeof autoInsertSpaceInButton !== "undefined") {
    config.button = {
      autoInsertSpace: autoInsertSpaceInButton,
      ...config.button
    };
  }
  const memoedConfig = useMemo(() => config, config, (prevConfig, currentConfig) => {
    const prevKeys = Object.keys(prevConfig);
    const currentKeys = Object.keys(currentConfig);
    return prevKeys.length !== currentKeys.length || prevKeys.some((key) => prevConfig[key] !== currentConfig[key]);
  });
  const {
    layer
  } = reactExports.useContext(StyleContext);
  const memoIconContextValue = reactExports.useMemo(() => ({
    prefixCls: iconPrefixCls,
    csp,
    layer: layer ? "antd" : void 0
  }), [iconPrefixCls, csp, layer]);
  let childNode = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(IconStyle, {
    iconPrefixCls,
    csp
  }), /* @__PURE__ */ reactExports.createElement(PropWarning, {
    dropdownMatchSelectWidth
  }), children);
  const validateMessages = reactExports.useMemo(() => merge(localeValues.Form?.defaultValidateMessages || {}, memoedConfig.locale?.Form?.defaultValidateMessages || {}, memoedConfig.form?.validateMessages || {}, form?.validateMessages || {}), [memoedConfig, form?.validateMessages]);
  if (Object.keys(validateMessages).length > 0) {
    childNode = /* @__PURE__ */ reactExports.createElement(ValidateMessagesContext.Provider, {
      value: validateMessages
    }, childNode);
  }
  if (locale2) {
    childNode = /* @__PURE__ */ reactExports.createElement(LocaleProvider, {
      locale: locale2,
      _ANT_MARK__: ANT_MARK
    }, childNode);
  }
  {
    childNode = /* @__PURE__ */ reactExports.createElement(IconContext.Provider, {
      value: memoIconContextValue
    }, childNode);
  }
  if (componentSize) {
    childNode = /* @__PURE__ */ reactExports.createElement(SizeContextProvider, {
      size: componentSize
    }, childNode);
  }
  childNode = /* @__PURE__ */ reactExports.createElement(MotionWrapper, null, childNode);
  if (tooltip?.unique) {
    childNode = /* @__PURE__ */ reactExports.createElement(UniqueProvider, null, childNode);
  }
  const memoTheme = reactExports.useMemo(() => {
    const {
      algorithm,
      token,
      components,
      cssVar,
      ...rest
    } = mergedTheme || {};
    const themeObj = algorithm && (!Array.isArray(algorithm) || algorithm.length > 0) ? createTheme(algorithm) : defaultTheme;
    const parsedComponents = {};
    Object.entries(components || {}).forEach(([componentName, componentToken]) => {
      const parsedToken = {
        ...componentToken
      };
      if ("algorithm" in parsedToken) {
        if (parsedToken.algorithm === true) {
          parsedToken.theme = themeObj;
        } else if (Array.isArray(parsedToken.algorithm) || typeof parsedToken.algorithm === "function") {
          parsedToken.theme = createTheme(parsedToken.algorithm);
        }
        delete parsedToken.algorithm;
      }
      parsedComponents[componentName] = parsedToken;
    });
    const mergedToken = {
      ...seedToken,
      ...token
    };
    return {
      ...rest,
      theme: themeObj,
      token: mergedToken,
      components: parsedComponents,
      override: {
        override: mergedToken,
        ...parsedComponents
      },
      cssVar
    };
  }, [mergedTheme]);
  if (theme) {
    childNode = /* @__PURE__ */ reactExports.createElement(DesignTokenContext.Provider, {
      value: memoTheme
    }, childNode);
  }
  if (memoedConfig.warning) {
    childNode = /* @__PURE__ */ reactExports.createElement(WarningContext.Provider, {
      value: memoedConfig.warning
    }, childNode);
  }
  if (componentDisabled !== void 0) {
    childNode = /* @__PURE__ */ reactExports.createElement(DisabledContextProvider, {
      disabled: componentDisabled
    }, childNode);
  }
  return /* @__PURE__ */ reactExports.createElement(ConfigContext.Provider, {
    value: memoedConfig
  }, childNode);
};
const ConfigProvider = (props) => {
  const context = reactExports.useContext(ConfigContext);
  const antLocale = reactExports.useContext(LocaleContext);
  return /* @__PURE__ */ reactExports.createElement(ProviderChildren, {
    parentContext: context,
    legacyLocale: antLocale,
    ...props
  });
};
ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.SizeContext = SizeContext;
ConfigProvider.config = setGlobalConfig;
ConfigProvider.useConfig = useConfig;
Object.defineProperty(ConfigProvider, "SizeContext", {
  get: () => {
    return SizeContext;
  }
});
const genMessageStyle = (token) => {
  const {
    componentCls,
    iconCls,
    boxShadow,
    colorText,
    colorSuccess,
    colorError,
    colorWarning,
    colorInfo,
    fontSizeLG,
    motionEaseInOutCirc,
    motionDurationSlow,
    marginXS,
    paddingXS,
    borderRadiusLG,
    zIndexPopup,
    // Custom token
    contentPadding,
    contentBg
  } = token;
  const noticeCls = `${componentCls}-notice`;
  const messageMoveIn = new Keyframe("MessageMoveIn", {
    "0%": {
      padding: 0,
      transform: "translateY(-100%)",
      opacity: 0
    },
    "100%": {
      padding: paddingXS,
      transform: "translateY(0)",
      opacity: 1
    }
  });
  const messageMoveOut = new Keyframe("MessageMoveOut", {
    "0%": {
      maxHeight: token.height,
      padding: paddingXS,
      opacity: 1
    },
    "100%": {
      maxHeight: 0,
      padding: 0,
      opacity: 0
    }
  });
  const noticeStyle = {
    padding: paddingXS,
    textAlign: "center",
    [`${componentCls}-custom-content`]: {
      display: "flex",
      alignItems: "center"
    },
    [`${componentCls}-custom-content > ${iconCls}`]: {
      marginInlineEnd: marginXS,
      // affected by ltr or rtl
      fontSize: fontSizeLG
    },
    [`${noticeCls}-content`]: {
      display: "inline-block",
      padding: contentPadding,
      background: contentBg,
      borderRadius: borderRadiusLG,
      boxShadow,
      pointerEvents: "all"
    },
    [`${componentCls}-success > ${iconCls}`]: {
      color: colorSuccess
    },
    [`${componentCls}-error > ${iconCls}`]: {
      color: colorError
    },
    [`${componentCls}-warning > ${iconCls}`]: {
      color: colorWarning
    },
    [`${componentCls}-info > ${iconCls},
      ${componentCls}-loading > ${iconCls}`]: {
      color: colorInfo
    }
  };
  return [
    // ============================ Holder ============================
    {
      [componentCls]: {
        ...resetComponent(token),
        color: colorText,
        position: "fixed",
        top: marginXS,
        width: "100%",
        pointerEvents: "none",
        zIndex: zIndexPopup,
        [`${componentCls}-move-up`]: {
          animationFillMode: "forwards"
        },
        [`
        ${componentCls}-move-up-appear,
        ${componentCls}-move-up-enter
      `]: {
          animationName: messageMoveIn,
          animationDuration: motionDurationSlow,
          animationPlayState: "paused",
          animationTimingFunction: motionEaseInOutCirc
        },
        [`
        ${componentCls}-move-up-appear${componentCls}-move-up-appear-active,
        ${componentCls}-move-up-enter${componentCls}-move-up-enter-active
      `]: {
          animationPlayState: "running"
        },
        [`${componentCls}-move-up-leave`]: {
          animationName: messageMoveOut,
          animationDuration: motionDurationSlow,
          animationPlayState: "paused",
          animationTimingFunction: motionEaseInOutCirc
        },
        [`${componentCls}-move-up-leave${componentCls}-move-up-leave-active`]: {
          animationPlayState: "running"
        },
        "&-rtl": {
          direction: "rtl",
          span: {
            direction: "rtl"
          }
        }
      }
    },
    // ============================ Notice ============================
    {
      [componentCls]: {
        [`${noticeCls}-wrapper`]: {
          ...noticeStyle
        }
      }
    },
    // ============================= Pure =============================
    {
      [`${componentCls}-notice-pure-panel`]: {
        ...noticeStyle,
        padding: 0,
        textAlign: "start"
      }
    }
  ];
};
const prepareComponentToken$c = (token) => ({
  zIndexPopup: token.zIndexPopupBase + CONTAINER_MAX_OFFSET + 10,
  contentBg: token.colorBgElevated,
  contentPadding: `${(token.controlHeightLG - token.fontSize * token.lineHeight) / 2}px ${token.paddingSM}px`
});
const useStyle$l = genStyleHooks("Message", (token) => {
  const combinedToken = merge$1(token, {
    height: 150
  });
  return genMessageStyle(combinedToken);
}, prepareComponentToken$c);
const TypeIcon = {
  info: /* @__PURE__ */ reactExports.createElement(RefIcon$5, null),
  success: /* @__PURE__ */ reactExports.createElement(RefIcon$4, null),
  error: /* @__PURE__ */ reactExports.createElement(RefIcon$3, null),
  warning: /* @__PURE__ */ reactExports.createElement(RefIcon$2, null),
  loading: /* @__PURE__ */ reactExports.createElement(RefIcon$1, null)
};
const PureContent = (props) => {
  const {
    prefixCls,
    type,
    icon,
    children,
    classNames: pureContentClassNames,
    styles
  } = props;
  const iconElement = icon || type && TypeIcon[type];
  const iconNode = cloneElement(iconElement, (currentProps) => {
    const mergedStyle = {
      ...currentProps?.style,
      ...styles?.icon
    };
    return {
      className: clsx(currentProps.className, pureContentClassNames?.icon),
      style: mergedStyle
    };
  });
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(`${prefixCls}-custom-content`, `${prefixCls}-${type}`)
  }, iconNode, /* @__PURE__ */ reactExports.createElement("span", {
    className: pureContentClassNames?.content,
    style: styles?.content
  }, children));
};
const PurePanel$4 = (props) => {
  const {
    prefixCls: staticPrefixCls,
    className,
    style,
    type,
    icon,
    content,
    classNames: messageClassNames,
    styles,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("message");
  const prefixCls = staticPrefixCls || getPrefixCls("message");
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle$l(prefixCls, rootCls);
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, messageClassNames], [contextStyles, styles], {
    props
  });
  return /* @__PURE__ */ reactExports.createElement(Notify, {
    ...restProps,
    prefixCls,
    className: clsx(contextClassName, mergedClassNames.root, className, hashId, `${prefixCls}-notice-pure-panel`, cssVarCls, rootCls),
    style: {
      ...mergedStyles.root,
      ...contextStyle,
      ...style
    },
    eventKey: "pure",
    duration: null,
    content: /* @__PURE__ */ reactExports.createElement(PureContent, {
      prefixCls,
      type,
      icon,
      classNames: mergedClassNames,
      styles: mergedStyles
    }, content)
  });
};
function getMotion(prefixCls, transitionName) {
  return {
    motionName: transitionName ?? `${prefixCls}-move-up`
  };
}
function wrapPromiseFn(openFn) {
  let closeFn;
  const closePromise = new Promise((resolve) => {
    closeFn = openFn(() => {
      resolve(true);
    });
  });
  const result = () => {
    closeFn?.();
  };
  result.then = (filled, rejected) => closePromise.then(filled, rejected);
  result.promise = closePromise;
  return result;
}
const DEFAULT_OFFSET = 8;
const DEFAULT_DURATION = 3;
const Wrapper = ({
  children,
  prefixCls
}) => {
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle$l(prefixCls, rootCls);
  return /* @__PURE__ */ reactExports.createElement(NotificationProvider, {
    classNames: {
      list: clsx(hashId, cssVarCls, rootCls)
    }
  }, children);
};
const renderNotifications = (node, {
  prefixCls,
  key
}) => /* @__PURE__ */ reactExports.createElement(Wrapper, {
  prefixCls,
  key
}, node);
const Holder = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    top,
    prefixCls: staticPrefixCls,
    getContainer: staticGetContainer,
    maxCount,
    duration = DEFAULT_DURATION,
    rtl,
    transitionName,
    onAllRemoved,
    pauseOnHover = true
  } = props;
  const {
    getPrefixCls,
    direction,
    getPopupContainer
  } = useComponentConfig("message");
  const {
    message: message2
  } = reactExports.useContext(ConfigContext);
  const prefixCls = staticPrefixCls || getPrefixCls("message");
  const getStyle = () => ({
    left: "50%",
    transform: "translateX(-50%)",
    top: top ?? DEFAULT_OFFSET
  });
  const getClassName = () => clsx({
    [`${prefixCls}-rtl`]: rtl ?? direction === "rtl"
  });
  const getNotificationMotion = () => getMotion(prefixCls, transitionName);
  const [mergedClassNames, mergedStyles] = useMergeSemantic([props?.classNames, message2?.classNames], [props?.styles, message2?.styles], {
    props
  });
  const [api, holder] = useNotification({
    prefixCls,
    style: getStyle,
    className: getClassName,
    motion: getNotificationMotion,
    // closable=false requires-no closeIcon
    closable: false,
    duration,
    getContainer: () => staticGetContainer?.() || getPopupContainer?.() || document.body,
    maxCount,
    onAllRemoved,
    renderNotifications,
    pauseOnHover
  });
  reactExports.useImperativeHandle(ref, () => ({
    ...api,
    prefixCls,
    message: message2,
    classNames: mergedClassNames,
    styles: mergedStyles
  }));
  return holder;
});
let keyIndex = 0;
function useInternalMessage(messageConfig) {
  const holderRef = reactExports.useRef(null);
  const wrapAPI = reactExports.useMemo(() => {
    const close = (key) => {
      holderRef.current?.close(key);
    };
    const open2 = (config) => {
      if (!holderRef.current) {
        const fakeResult = () => {
        };
        fakeResult.then = () => {
        };
        return fakeResult;
      }
      const {
        open: originOpen,
        prefixCls,
        message: message2,
        classNames: originClassNames,
        styles: originStyles
      } = holderRef.current;
      const contextClassName = message2?.className || {};
      const contextStyle = message2?.style || {};
      const rawContextClassNames = message2?.classNames || {};
      const rawContextStyles = message2?.styles || {};
      const noticePrefixCls = `${prefixCls}-notice`;
      const {
        content,
        icon,
        type,
        key,
        className,
        style,
        onClose,
        classNames: configClassNames = {},
        styles = {},
        ...restConfig
      } = config;
      let mergedKey = key;
      if (!isNonNullable(mergedKey)) {
        keyIndex += 1;
        mergedKey = `antd-message-${keyIndex}`;
      }
      const contextConfig = {
        ...messageConfig,
        ...config
      };
      const contextClassNames = resolveStyleOrClass(rawContextClassNames, {
        props: contextConfig
      });
      const semanticClassNames = resolveStyleOrClass(configClassNames, {
        props: contextConfig
      });
      const contextStyles = resolveStyleOrClass(rawContextStyles, {
        props: contextConfig
      });
      const semanticStyles = resolveStyleOrClass(styles, {
        props: contextConfig
      });
      const mergedClassNames = mergeClassNames(void 0, contextClassNames, semanticClassNames, originClassNames);
      const mergedStyles = mergeStyles(contextStyles, semanticStyles, originStyles);
      return wrapPromiseFn((resolve) => {
        originOpen({
          ...restConfig,
          key: mergedKey,
          content: /* @__PURE__ */ reactExports.createElement(PureContent, {
            prefixCls,
            type,
            icon,
            classNames: mergedClassNames,
            styles: mergedStyles
          }, content),
          placement: "top",
          className: clsx({
            [`${noticePrefixCls}-${type}`]: type
          }, className, contextClassName, mergedClassNames.root),
          style: {
            ...mergedStyles.root,
            ...contextStyle,
            ...style
          },
          onClose: () => {
            onClose?.();
            resolve();
          }
        });
        return () => {
          close(mergedKey);
        };
      });
    };
    const destroy2 = (key) => {
      if (key !== void 0) {
        close(key);
      } else {
        holderRef.current?.destroy();
      }
    };
    const clone = {
      open: open2,
      destroy: destroy2
    };
    const keys = ["info", "success", "warning", "error", "loading"];
    keys.forEach((type) => {
      const typeOpen2 = (jointContent, duration, onClose) => {
        let config;
        if (jointContent && typeof jointContent === "object" && "content" in jointContent) {
          config = jointContent;
        } else {
          config = {
            content: jointContent
          };
        }
        let mergedDuration;
        let mergedOnClose;
        if (typeof duration === "function") {
          mergedOnClose = duration;
        } else {
          mergedDuration = duration;
          mergedOnClose = onClose;
        }
        const mergedConfig = {
          onClose: mergedOnClose,
          duration: mergedDuration,
          ...config,
          type
        };
        return open2(mergedConfig);
      };
      clone[type] = typeOpen2;
    });
    return clone;
  }, []);
  return [wrapAPI, /* @__PURE__ */ reactExports.createElement(Holder, {
    key: "message-holder",
    ...messageConfig,
    ref: holderRef
  })];
}
function useMessage(messageConfig) {
  return useInternalMessage(messageConfig);
}
const getCollapsedHeight = () => ({
  height: 0,
  opacity: 0
});
const getRealHeight = (node) => {
  const {
    scrollHeight
  } = node;
  return {
    height: scrollHeight,
    opacity: 1
  };
};
const getCurrentHeight = (node) => ({
  height: node ? node.offsetHeight : 0
});
const skipOpacityTransition = (_, event) => event?.deadline === true || event.propertyName === "height";
const initCollapseMotion = (rootCls = defaultPrefixCls) => ({
  motionName: `${rootCls}-motion-collapse`,
  onAppearStart: getCollapsedHeight,
  onEnterStart: getCollapsedHeight,
  onAppearActive: getRealHeight,
  onEnterActive: getRealHeight,
  onLeaveStart: getCurrentHeight,
  onLeaveActive: getCollapsedHeight,
  onAppearEnd: skipOpacityTransition,
  onEnterEnd: skipOpacityTransition,
  onLeaveEnd: skipOpacityTransition,
  motionDeadline: 500
});
const getTransitionName = (rootPrefixCls, motion, transitionName) => {
  if (transitionName !== void 0) {
    return transitionName;
  }
  return `${rootPrefixCls}-${motion}`;
};
const genWaveStyle = (token) => {
  const {
    componentCls,
    colorPrimary,
    motionDurationSlow,
    motionEaseInOut,
    motionEaseOutCirc,
    antCls
  } = token;
  const [, varRef] = genCssVar(antCls, "wave");
  return {
    [componentCls]: {
      position: "absolute",
      background: "transparent",
      pointerEvents: "none",
      boxSizing: "border-box",
      color: varRef("color", colorPrimary),
      boxShadow: `0 0 0 0 currentcolor`,
      opacity: 0.2,
      // =================== Motion ===================
      "&.wave-motion-appear": {
        transition: [`box-shadow 0.4s`, `opacity 2s`].map((prop) => `${prop} ${motionEaseOutCirc}`).join(","),
        "&-active": {
          boxShadow: `0 0 0 6px currentcolor`,
          opacity: 0
        },
        "&.wave-quick": {
          transition: [`box-shadow`, `opacity`].map((prop) => `${prop} ${motionDurationSlow} ${motionEaseInOut}`).join(",")
        }
      }
    }
  };
};
const useStyle$k = genComponentStyleHook("Wave", genWaveStyle);
const TARGET_CLS = `${defaultPrefixCls}-wave-target`;
function isValidWaveColor(color) {
  return color && typeof color === "string" && color !== "#fff" && color !== "#ffffff" && color !== "rgb(255, 255, 255)" && color !== "rgba(255, 255, 255, 1)" && !/rgba\((?:\d*, ){3}0\)/.test(color) && // any transparent rgba color
  color !== "transparent" && color !== "canvastext";
}
function getTargetWaveColor(node, colorSource = null) {
  const style = getComputedStyle(node);
  const {
    borderTopColor,
    borderColor,
    backgroundColor
  } = style;
  if (colorSource && isValidWaveColor(style[colorSource])) {
    return style[colorSource];
  }
  return [borderTopColor, borderColor, backgroundColor].find(isValidWaveColor) ?? null;
}
function validateNum(value) {
  return Number.isNaN(value) ? 0 : value;
}
const WaveEffect = (props) => {
  const {
    className,
    target,
    component,
    colorSource
  } = props;
  const divRef = reactExports.useRef(null);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const [varName] = genCssVar(rootPrefixCls, "wave");
  const [color, setWaveColor] = reactExports.useState(null);
  const [borderRadius, setBorderRadius] = reactExports.useState([]);
  const [left, setLeft] = reactExports.useState(0);
  const [top, setTop] = reactExports.useState(0);
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const [enabled, setEnabled] = reactExports.useState(false);
  const waveStyle = {
    left,
    top,
    width,
    height,
    borderRadius: borderRadius.map((radius) => `${radius}px`).join(" ")
  };
  if (color) {
    waveStyle[varName("color")] = color;
  }
  function syncPos() {
    const nodeStyle = getComputedStyle(target);
    setWaveColor(getTargetWaveColor(target, colorSource));
    const isStatic = nodeStyle.position === "static";
    const {
      borderLeftWidth,
      borderTopWidth
    } = nodeStyle;
    setLeft(isStatic ? target.offsetLeft : validateNum(-Number.parseFloat(borderLeftWidth)));
    setTop(isStatic ? target.offsetTop : validateNum(-Number.parseFloat(borderTopWidth)));
    setWidth(target.offsetWidth);
    setHeight(target.offsetHeight);
    const {
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius
    } = nodeStyle;
    setBorderRadius([borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius].map((radius) => validateNum(Number.parseFloat(radius))));
  }
  reactExports.useEffect(() => {
    if (target) {
      const id = wrapperRaf(() => {
        syncPos();
        setEnabled(true);
      });
      let resizeObserver;
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(syncPos);
        resizeObserver.observe(target);
      }
      return () => {
        wrapperRaf.cancel(id);
        resizeObserver?.disconnect();
      };
    }
  }, [target]);
  if (!enabled) {
    return null;
  }
  const isSmallComponent = (component === "Checkbox" || component === "Radio") && target?.classList.contains(TARGET_CLS);
  return /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    visible: true,
    motionAppear: true,
    motionName: "wave-motion",
    motionDeadline: 5e3,
    onAppearEnd: (_, event) => {
      if (event.deadline || event.propertyName === "opacity") {
        const holder = divRef.current?.parentElement;
        unmount(holder).then(() => {
          holder?.remove();
        });
      }
      return false;
    }
  }, ({
    className: motionClassName
  }, ref) => /* @__PURE__ */ reactExports.createElement("div", {
    ref: composeRef(divRef, ref),
    className: clsx(className, motionClassName, {
      "wave-quick": isSmallComponent
    }),
    style: waveStyle
  }));
};
const showWaveEffect = (target, info) => {
  const {
    component
  } = info;
  if (component === "Checkbox" && !target.querySelector("input")?.checked) {
    return;
  }
  const holder = document.createElement("div");
  holder.style.position = "absolute";
  holder.style.left = "0px";
  holder.style.top = "0px";
  target?.insertBefore(holder, target?.firstChild);
  render(/* @__PURE__ */ reactExports.createElement(WaveEffect, {
    ...info,
    target
  }), holder);
};
const useWave = (nodeRef, className, component, colorSource) => {
  const {
    wave
  } = reactExports.useContext(ConfigContext);
  const [, token, hashId] = useToken();
  const showWave = useEvent((event) => {
    const node = nodeRef.current;
    if (wave?.disabled || !node) {
      return;
    }
    const targetNode = node.querySelector(`.${TARGET_CLS}`) || node;
    const {
      showEffect
    } = wave || {};
    (showEffect || showWaveEffect)(targetNode, {
      className,
      token,
      component,
      event,
      hashId,
      colorSource
    });
  });
  const rafId = reactExports.useRef(null);
  reactExports.useEffect(() => () => {
    wrapperRaf.cancel(rafId.current);
  }, []);
  const showDebounceWave = (event) => {
    wrapperRaf.cancel(rafId.current);
    rafId.current = wrapperRaf(() => {
      showWave(event);
    });
  };
  return showDebounceWave;
};
const Wave = (props) => {
  const {
    children,
    disabled,
    component,
    colorSource
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const containerRef = reactExports.useRef(null);
  const prefixCls = getPrefixCls("wave");
  const hashId = useStyle$k(prefixCls);
  const showWave = useWave(containerRef, clsx(prefixCls, hashId), component, colorSource);
  React.useEffect(() => {
    const node = containerRef.current;
    if (!node || node.nodeType !== window.Node.ELEMENT_NODE || disabled) {
      return;
    }
    const onClick = (e2) => {
      if (!isVisible(e2.target) || // No need wave
      !node.getAttribute || node.getAttribute("disabled") || node.disabled || node.className.includes("disabled") && !node.className.includes("disabled:") || node.getAttribute("aria-disabled") === "true" || node.className.includes("-leave")) {
        return;
      }
      showWave(e2);
    };
    node.addEventListener("click", onClick, true);
    return () => {
      node.removeEventListener("click", onClick, true);
    };
  }, [disabled]);
  if (!/* @__PURE__ */ React.isValidElement(children)) {
    return children ?? null;
  }
  const ref = supportRef(children) ? composeRef(getNodeRef(children), containerRef) : containerRef;
  return cloneElement(children, {
    ref
  });
};
const useSize = (customSize) => {
  const size = React.useContext(SizeContext);
  const mergedSize = React.useMemo(() => {
    if (!customSize) {
      return size;
    }
    if (typeof customSize === "string") {
      return customSize ?? size;
    }
    if (typeof customSize === "function") {
      return customSize(size);
    }
    return size;
  }, [customSize, size]);
  return mergedSize;
};
const genSpaceCompactStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      display: "inline-flex",
      "&-block": {
        display: "flex",
        width: "100%"
      },
      "&-vertical": {
        flexDirection: "column"
      },
      "&-rtl": {
        direction: "rtl"
      }
    }
  };
};
const useStyle$j = genStyleHooks(["Space", "Compact"], (token) => [genSpaceCompactStyle(token)], () => ({}), {
  // Space component don't apply extra font style
  // https://github.com/ant-design/ant-design/issues/40315
  resetStyle: false
});
const SpaceCompactItemContext = /* @__PURE__ */ reactExports.createContext(null);
const useCompactItemContext = (prefixCls, direction) => {
  const compactItemContext = reactExports.useContext(SpaceCompactItemContext);
  const compactItemClassnames = reactExports.useMemo(() => {
    if (!compactItemContext) {
      return "";
    }
    const {
      compactDirection,
      isFirstItem,
      isLastItem
    } = compactItemContext;
    const separator = compactDirection === "vertical" ? "-vertical-" : "-";
    return clsx(`${prefixCls}-compact${separator}item`, {
      [`${prefixCls}-compact${separator}first-item`]: isFirstItem,
      [`${prefixCls}-compact${separator}last-item`]: isLastItem,
      [`${prefixCls}-compact${separator}item-rtl`]: direction === "rtl"
    });
  }, [prefixCls, direction, compactItemContext]);
  return {
    compactSize: compactItemContext?.compactSize,
    compactDirection: compactItemContext?.compactDirection,
    compactItemClassnames
  };
};
const NoCompactStyle = (props) => {
  const {
    children
  } = props;
  return /* @__PURE__ */ reactExports.createElement(SpaceCompactItemContext.Provider, {
    value: null
  }, children);
};
const CompactItem = (props) => {
  const {
    children,
    ...others
  } = props;
  return /* @__PURE__ */ reactExports.createElement(SpaceCompactItemContext.Provider, {
    value: reactExports.useMemo(() => others, [others])
  }, children);
};
const Compact$1 = (props) => {
  const {
    getPrefixCls,
    direction: directionConfig
  } = reactExports.useContext(ConfigContext);
  const {
    size,
    direction,
    orientation,
    block,
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    vertical,
    ...restProps
  } = props;
  const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, direction);
  const mergedSize = useSize((ctx) => size ?? ctx);
  const prefixCls = getPrefixCls("space-compact", customizePrefixCls);
  const [hashId] = useStyle$j(prefixCls);
  const clx = clsx(prefixCls, hashId, {
    [`${prefixCls}-rtl`]: directionConfig === "rtl",
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-vertical`]: mergedVertical
  }, className, rootClassName);
  const compactItemContext = reactExports.useContext(SpaceCompactItemContext);
  const childNodes = toArray$1(children);
  const nodes = reactExports.useMemo(() => childNodes.map((child, i) => {
    const key = child?.key || `${prefixCls}-item-${i}`;
    return /* @__PURE__ */ reactExports.createElement(CompactItem, {
      key,
      compactSize: mergedSize,
      compactDirection: mergedOrientation,
      isFirstItem: i === 0 && (!compactItemContext || compactItemContext?.isFirstItem),
      isLastItem: i === childNodes.length - 1 && (!compactItemContext || compactItemContext?.isLastItem)
    }, child);
  }), [childNodes, compactItemContext, mergedOrientation, mergedSize, prefixCls]);
  if (childNodes.length === 0) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: clx,
    ...restProps
  }, nodes);
};
const GroupSizeContext = /* @__PURE__ */ reactExports.createContext(void 0);
const ButtonGroup = (props) => {
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    size,
    className,
    ...others
  } = props;
  const prefixCls = getPrefixCls("btn-group", customizePrefixCls);
  const [, , hashId] = useToken();
  const sizeCls = reactExports.useMemo(() => {
    switch (size) {
      case "large":
        return "lg";
      case "small":
        return "sm";
      default:
        return "";
    }
  }, [size]);
  const classes = clsx(prefixCls, {
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, hashId);
  return /* @__PURE__ */ reactExports.createElement(GroupSizeContext.Provider, {
    value: size
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ...others,
    className: classes
  }));
};
const rxTwoCNChar = /^[\u4E00-\u9FA5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function convertLegacyProps(type) {
  if (type === "danger") {
    return {
      danger: true
    };
  }
  return {
    type
  };
}
function isString(str) {
  return typeof str === "string";
}
function isUnBorderedButtonVariant(type) {
  return type === "text" || type === "link";
}
function splitCNCharsBySpace(child, needInserted, style, className) {
  if (!isNonNullable(child) || child === "") {
    return;
  }
  const SPACE = needInserted ? " " : "";
  if (typeof child !== "string" && typeof child !== "number" && isString(child.type) && isTwoCNChar(child.props.children)) {
    return cloneElement(child, (oriProps) => {
      const mergedCls = clsx(oriProps.className, className) || void 0;
      const mergedStyle = {
        ...style,
        ...oriProps.style
      };
      return {
        ...oriProps,
        children: oriProps.children.split("").join(SPACE),
        className: mergedCls,
        style: mergedStyle
      };
    });
  }
  if (isString(child)) {
    return /* @__PURE__ */ React.createElement("span", {
      className,
      style
    }, isTwoCNChar(child) ? child.split("").join(SPACE) : child);
  }
  if (isFragment(child)) {
    return /* @__PURE__ */ React.createElement("span", {
      className,
      style
    }, child);
  }
  return cloneElement(child, (oriProps) => ({
    ...oriProps,
    className: clsx(oriProps.className, className) || void 0,
    style: {
      ...oriProps.style,
      ...style
    }
  }));
}
function spaceChildren(children, needInserted, style, className) {
  let isPrevChildPure = false;
  const childList = [];
  React.Children.forEach(children, (child) => {
    const type = typeof child;
    const isCurrentChildPure = type === "string" || type === "number";
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1;
      const lastChild = childList[lastIndex];
      childList[lastIndex] = `${lastChild}${child}`;
    } else {
      childList.push(child);
    }
    isPrevChildPure = isCurrentChildPure;
  });
  return React.Children.map(childList, (child) => splitCNCharsBySpace(child, needInserted, style, className));
}
["default", "primary", "danger"].concat(_toConsumableArray(PresetColors));
const IconWrapper = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    className,
    style,
    children,
    prefixCls
  } = props;
  const iconWrapperCls = clsx(`${prefixCls}-icon`, className);
  return /* @__PURE__ */ React.createElement("span", {
    ref,
    className: iconWrapperCls,
    style
  }, children);
});
const InnerLoadingIcon = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls,
    className,
    style,
    iconClassName
  } = props;
  const mergedIconCls = clsx(`${prefixCls}-loading-icon`, className);
  return /* @__PURE__ */ React.createElement(IconWrapper, {
    prefixCls,
    className: mergedIconCls,
    style,
    ref
  }, /* @__PURE__ */ React.createElement(RefIcon$1, {
    className: iconClassName
  }));
});
const getCollapsedWidth = () => ({
  width: 0,
  opacity: 0,
  transform: "scale(0)"
});
const getRealWidth = (node) => ({
  width: node.scrollWidth,
  opacity: 1,
  transform: "scale(1)"
});
const DefaultLoadingIcon = (props) => {
  const {
    prefixCls,
    loading,
    existIcon,
    className,
    style,
    mount
  } = props;
  const visible = !!loading;
  if (existIcon) {
    return /* @__PURE__ */ React.createElement(InnerLoadingIcon, {
      prefixCls,
      className,
      style
    });
  }
  return /* @__PURE__ */ React.createElement(CSSMotion, {
    visible,
    // Used for minus flex gap style only
    motionName: `${prefixCls}-loading-icon-motion`,
    motionAppear: !mount,
    motionEnter: !mount,
    motionLeave: !mount,
    removeOnLeave: true,
    onAppearStart: getCollapsedWidth,
    onAppearActive: getRealWidth,
    onEnterStart: getCollapsedWidth,
    onEnterActive: getRealWidth,
    onLeaveStart: getRealWidth,
    onLeaveActive: getCollapsedWidth
  }, ({
    className: motionCls,
    style: motionStyle
  }, ref) => {
    const mergedStyle = {
      ...style,
      ...motionStyle
    };
    return /* @__PURE__ */ React.createElement(InnerLoadingIcon, {
      prefixCls,
      className: clsx(className, motionCls),
      style: mergedStyle,
      ref
    });
  });
};
const genButtonBorderStyle = (buttonTypeCls, borderColor) => ({
  // Border
  [`> span, > ${buttonTypeCls}`]: {
    "&:not(:last-child)": {
      [`&, & > ${buttonTypeCls}`]: {
        "&:not(:disabled)": {
          borderInlineEndColor: borderColor
        }
      }
    },
    "&:not(:first-child)": {
      [`&, & > ${buttonTypeCls}`]: {
        "&:not(:disabled)": {
          borderInlineStartColor: borderColor
        }
      }
    }
  }
});
const genGroupStyle$1 = (token) => {
  const {
    componentCls,
    fontSize,
    lineWidth,
    groupBorderColor,
    colorErrorHover
  } = token;
  return {
    [`${componentCls}-group`]: [
      {
        position: "relative",
        display: "inline-flex",
        // Border
        [`> span, > ${componentCls}`]: {
          "&:not(:last-child)": {
            [`&, & > ${componentCls}`]: {
              borderStartEndRadius: 0,
              borderEndEndRadius: 0
            }
          },
          "&:not(:first-child)": {
            marginInlineStart: token.calc(lineWidth).mul(-1).equal(),
            [`&, & > ${componentCls}`]: {
              borderStartStartRadius: 0,
              borderEndStartRadius: 0
            }
          }
        },
        [componentCls]: {
          position: "relative",
          zIndex: 1,
          "&:hover, &:focus, &:active": {
            zIndex: 2
          },
          "&[disabled]": {
            zIndex: 0
          }
        },
        [`${componentCls}-icon-only`]: {
          fontSize
        }
      },
      // Border Color
      genButtonBorderStyle(`${componentCls}-primary`, groupBorderColor),
      genButtonBorderStyle(`${componentCls}-danger`, colorErrorHover)
    ]
  };
};
const toHexFormat = (value, alpha) => value?.replace(/[^0-9a-f]/gi, "").slice(0, alpha ? 8 : 6) || "";
const getHex = (value, alpha) => value ? toHexFormat(value, alpha) : "";
let AggregationColor = /* @__PURE__ */ (function() {
  function AggregationColor2(color) {
    _classCallCheck(this, AggregationColor2);
    this.cleared = false;
    if (color instanceof AggregationColor2) {
      this.metaColor = color.metaColor.clone();
      this.colors = color.colors?.map((info) => ({
        color: new AggregationColor2(info.color),
        percent: info.percent
      }));
      this.cleared = color.cleared;
      return;
    }
    const isArray = Array.isArray(color);
    if (isArray && color.length) {
      this.colors = color.map(({
        color: c,
        percent
      }) => ({
        color: new AggregationColor2(c),
        percent
      }));
      this.metaColor = new Color(this.colors[0].color.metaColor);
    } else {
      this.metaColor = new Color(isArray ? "" : color);
    }
    if (!color || isArray && !this.colors) {
      this.metaColor = this.metaColor.setA(0);
      this.cleared = true;
    }
  }
  return _createClass(AggregationColor2, [{
    key: "toHsb",
    value: function toHsb() {
      return this.metaColor.toHsb();
    }
  }, {
    key: "toHsbString",
    value: function toHsbString() {
      return this.metaColor.toHsbString();
    }
  }, {
    key: "toHex",
    value: function toHex() {
      return getHex(this.toHexString(), this.metaColor.a < 1);
    }
  }, {
    key: "toHexString",
    value: function toHexString() {
      return this.metaColor.toHexString();
    }
  }, {
    key: "toRgb",
    value: function toRgb() {
      return this.metaColor.toRgb();
    }
  }, {
    key: "toRgbString",
    value: function toRgbString() {
      return this.metaColor.toRgbString();
    }
  }, {
    key: "isGradient",
    value: function isGradient() {
      return !!this.colors && !this.cleared;
    }
  }, {
    key: "getColors",
    value: function getColors() {
      return this.colors || [{
        color: this,
        percent: 0
      }];
    }
  }, {
    key: "toCssString",
    value: function toCssString() {
      const {
        colors
      } = this;
      if (colors) {
        const colorsStr = colors.map((c) => `${c.color.toRgbString()} ${c.percent}%`).join(", ");
        return `linear-gradient(90deg, ${colorsStr})`;
      }
      return this.metaColor.toRgbString();
    }
  }, {
    key: "equals",
    value: function equals(color) {
      if (!color || this.isGradient() !== color.isGradient()) {
        return false;
      }
      if (!this.isGradient()) {
        return this.toHexString() === color.toHexString();
      }
      return this.colors.length === color.colors.length && this.colors.every((c, i) => {
        const target = color.colors[i];
        return c.percent === target.percent && c.color.equals(target.color);
      });
    }
  }]);
})();
const genCollapseMotion = (token) => {
  const {
    componentCls,
    antCls,
    motionDurationMid,
    motionEaseInOut
  } = token;
  return {
    [componentCls]: {
      // For common/openAnimation
      [`${antCls}-motion-collapse-legacy`]: {
        overflow: "hidden",
        "&-active": {
          transition: `${["height", "opacity"].map((prop) => `${prop} ${motionDurationMid} ${motionEaseInOut}`).join(", ")} !important`
        }
      },
      [`${antCls}-motion-collapse`]: {
        overflow: "hidden",
        transition: `${["height", "opacity"].map((prop) => `${prop} ${motionDurationMid} ${motionEaseInOut}`).join(", ")} !important`
      }
    }
  };
};
const initMotionCommon = (duration) => ({
  animationDuration: duration,
  animationFillMode: "both"
});
const initMotionCommonLeave = (duration) => ({
  animationDuration: duration,
  animationFillMode: "both"
});
const initMotion = (motionCls, inKeyframes, outKeyframes, duration, sameLevel = false) => {
  const sameLevelPrefix = sameLevel ? "&" : "";
  return {
    [`
      ${sameLevelPrefix}${motionCls}-enter,
      ${sameLevelPrefix}${motionCls}-appear
    `]: {
      ...initMotionCommon(duration),
      animationPlayState: "paused"
    },
    [`${sameLevelPrefix}${motionCls}-leave`]: {
      ...initMotionCommonLeave(duration),
      animationPlayState: "paused"
    },
    [`
      ${sameLevelPrefix}${motionCls}-enter${motionCls}-enter-active,
      ${sameLevelPrefix}${motionCls}-appear${motionCls}-appear-active
    `]: {
      animationName: inKeyframes,
      animationPlayState: "running"
    },
    [`${sameLevelPrefix}${motionCls}-leave${motionCls}-leave-active`]: {
      animationName: outKeyframes,
      animationPlayState: "running",
      pointerEvents: "none"
    }
  };
};
const fadeIn = new Keyframe("antFadeIn", {
  "0%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
});
const fadeOut = new Keyframe("antFadeOut", {
  "0%": {
    opacity: 1
  },
  "100%": {
    opacity: 0
  }
});
const initFadeMotion = (token, sameLevel = false) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-fade`;
  const sameLevelPrefix = sameLevel ? "&" : "";
  return [initMotion(motionCls, fadeIn, fadeOut, token.motionDurationMid, sameLevel), {
    [`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
      opacity: 0,
      animationTimingFunction: "linear"
    },
    [`${sameLevelPrefix}${motionCls}-leave`]: {
      animationTimingFunction: "linear"
    }
  }];
};
const moveDownIn = new Keyframe("antMoveDownIn", {
  "0%": {
    transform: "translate3d(0, 100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
const moveDownOut = new Keyframe("antMoveDownOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(0, 100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
const moveLeftIn = new Keyframe("antMoveLeftIn", {
  "0%": {
    transform: "translate3d(-100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
const moveLeftOut = new Keyframe("antMoveLeftOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(-100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
const moveRightIn = new Keyframe("antMoveRightIn", {
  "0%": {
    transform: "translate3d(100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
const moveRightOut = new Keyframe("antMoveRightOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(100%, 0, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
const moveUpIn = new Keyframe("antMoveUpIn", {
  "0%": {
    transform: "translate3d(0, -100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  }
});
const moveUpOut = new Keyframe("antMoveUpOut", {
  "0%": {
    transform: "translate3d(0, 0, 0)",
    transformOrigin: "0 0",
    opacity: 1
  },
  "100%": {
    transform: "translate3d(0, -100%, 0)",
    transformOrigin: "0 0",
    opacity: 0
  }
});
const moveMotion = {
  "move-up": {
    inKeyframes: moveUpIn,
    outKeyframes: moveUpOut
  },
  "move-down": {
    inKeyframes: moveDownIn,
    outKeyframes: moveDownOut
  },
  "move-left": {
    inKeyframes: moveLeftIn,
    outKeyframes: moveLeftOut
  },
  "move-right": {
    inKeyframes: moveRightIn,
    outKeyframes: moveRightOut
  }
};
const initMoveMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = moveMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
    [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
      opacity: 0,
      animationTimingFunction: token.motionEaseOutCirc
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInOutCirc
    }
  }];
};
const slideUpIn = new Keyframe("antSlideUpIn", {
  "0%": {
    transform: "scaleY(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleY(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  }
});
const slideUpOut = new Keyframe("antSlideUpOut", {
  "0%": {
    transform: "scaleY(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleY(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  }
});
const slideDownIn = new Keyframe("antSlideDownIn", {
  "0%": {
    transform: "scaleY(0.8)",
    transformOrigin: "100% 100%",
    opacity: 0
  },
  "100%": {
    transform: "scaleY(1)",
    transformOrigin: "100% 100%",
    opacity: 1
  }
});
const slideDownOut = new Keyframe("antSlideDownOut", {
  "0%": {
    transform: "scaleY(1)",
    transformOrigin: "100% 100%",
    opacity: 1
  },
  "100%": {
    transform: "scaleY(0.8)",
    transformOrigin: "100% 100%",
    opacity: 0
  }
});
const slideLeftIn = new Keyframe("antSlideLeftIn", {
  "0%": {
    transform: "scaleX(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleX(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  }
});
const slideLeftOut = new Keyframe("antSlideLeftOut", {
  "0%": {
    transform: "scaleX(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleX(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  }
});
const slideRightIn = new Keyframe("antSlideRightIn", {
  "0%": {
    transform: "scaleX(0.8)",
    transformOrigin: "100% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleX(1)",
    transformOrigin: "100% 0%",
    opacity: 1
  }
});
const slideRightOut = new Keyframe("antSlideRightOut", {
  "0%": {
    transform: "scaleX(1)",
    transformOrigin: "100% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleX(0.8)",
    transformOrigin: "100% 0%",
    opacity: 0
  }
});
const slideMotion = {
  "slide-up": {
    inKeyframes: slideUpIn,
    outKeyframes: slideUpOut
  },
  "slide-down": {
    inKeyframes: slideDownIn,
    outKeyframes: slideDownOut
  },
  "slide-left": {
    inKeyframes: slideLeftIn,
    outKeyframes: slideLeftOut
  },
  "slide-right": {
    inKeyframes: slideRightIn,
    outKeyframes: slideRightOut
  }
};
const initSlideMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = slideMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
    [`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
      transform: "scale(0)",
      transformOrigin: "0% 0%",
      opacity: 0,
      animationTimingFunction: token.motionEaseOutQuint,
      "&-prepare": {
        transform: "scale(1)"
      }
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInQuint
    }
  }];
};
const zoomIn = new Keyframe("antZoomIn", {
  "0%": {
    transform: "scale(0.2)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
const zoomOut = new Keyframe("antZoomOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.2)",
    opacity: 0
  }
});
const zoomBigIn = new Keyframe("antZoomBigIn", {
  "0%": {
    transform: "scale(0.8)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
const zoomBigOut = new Keyframe("antZoomBigOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.8)",
    opacity: 0
  }
});
const zoomUpIn = new Keyframe("antZoomUpIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  }
});
const zoomUpOut = new Keyframe("antZoomUpOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  }
});
const zoomLeftIn = new Keyframe("antZoomLeftIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  }
});
const zoomLeftOut = new Keyframe("antZoomLeftOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  }
});
const zoomRightIn = new Keyframe("antZoomRightIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  }
});
const zoomRightOut = new Keyframe("antZoomRightOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  }
});
const zoomDownIn = new Keyframe("antZoomDownIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  }
});
const zoomDownOut = new Keyframe("antZoomDownOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  }
});
const zoomMotion = {
  zoom: {
    inKeyframes: zoomIn,
    outKeyframes: zoomOut
  },
  "zoom-big": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-big-fast": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-left": {
    inKeyframes: zoomLeftIn,
    outKeyframes: zoomLeftOut
  },
  "zoom-right": {
    inKeyframes: zoomRightIn,
    outKeyframes: zoomRightOut
  },
  "zoom-up": {
    inKeyframes: zoomUpIn,
    outKeyframes: zoomUpOut
  },
  "zoom-down": {
    inKeyframes: zoomDownIn,
    outKeyframes: zoomDownOut
  }
};
const initZoomMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = zoomMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token.motionDurationFast : token.motionDurationMid), {
    [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
      transform: "scale(0)",
      opacity: 0,
      animationTimingFunction: token.motionEaseOutCirc,
      "&-prepare": {
        transform: "none"
      }
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInOutCirc
    }
  }];
};
const generateColor = (color) => {
  if (color instanceof AggregationColor) {
    return color;
  }
  return new AggregationColor(color);
};
const isBright = (value, bgColorToken) => {
  const {
    r,
    g,
    b,
    a
  } = value.toRgb();
  const hsv = new Color(value.toRgbString()).onBackground(bgColorToken).toHsv();
  if (a <= 0.5) {
    return hsv.v > 0.5;
  }
  return r * 0.299 + g * 0.587 + b * 0.114 > 192;
};
const prepareToken$3 = (token) => {
  const {
    paddingInline,
    onlyIconSize,
    borderColorDisabled
  } = token;
  const buttonToken = merge$1(token, {
    buttonPaddingHorizontal: paddingInline,
    buttonPaddingVertical: 0,
    buttonIconOnlyFontSize: onlyIconSize,
    colorBorderDisabled: borderColorDisabled
  });
  return buttonToken;
};
const prepareComponentToken$b = (token) => {
  const contentFontSize = token.contentFontSize ?? token.fontSize;
  const contentFontSizeSM = token.contentFontSizeSM ?? token.fontSize;
  const contentFontSizeLG = token.contentFontSizeLG ?? token.fontSizeLG;
  const contentLineHeight = token.contentLineHeight ?? getLineHeight(contentFontSize);
  const contentLineHeightSM = token.contentLineHeightSM ?? getLineHeight(contentFontSizeSM);
  const contentLineHeightLG = token.contentLineHeightLG ?? getLineHeight(contentFontSizeLG);
  const solidTextColor = isBright(new AggregationColor(token.colorBgSolid), "#fff") ? "#000" : "#fff";
  const shadowColorTokens = PresetColors.reduce((prev, colorKey) => ({
    ...prev,
    [`${colorKey}ShadowColor`]: `0 ${unit(token.controlOutlineWidth)} 0 ${getAlphaColor(token[`${colorKey}1`], token.colorBgContainer)}`
  }), {});
  const defaultBgDisabled = token.colorBgContainerDisabled;
  const dashedBgDisabled = token.colorBgContainerDisabled;
  return {
    ...shadowColorTokens,
    fontWeight: 400,
    iconGap: token.marginXS,
    defaultShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlTmpOutline}`,
    primaryShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlOutline}`,
    dangerShadow: `0 ${token.controlOutlineWidth}px 0 ${token.colorErrorOutline}`,
    primaryColor: token.colorTextLightSolid,
    dangerColor: token.colorTextLightSolid,
    borderColorDisabled: token.colorBorderDisabled,
    defaultGhostColor: token.colorBgContainer,
    ghostBg: "transparent",
    defaultGhostBorderColor: token.colorBgContainer,
    paddingInline: token.paddingContentHorizontal - token.lineWidth,
    paddingInlineLG: token.paddingContentHorizontal - token.lineWidth,
    paddingInlineSM: 8 - token.lineWidth,
    onlyIconSize: "inherit",
    onlyIconSizeSM: "inherit",
    onlyIconSizeLG: "inherit",
    groupBorderColor: token.colorPrimaryHover,
    linkHoverBg: "transparent",
    textTextColor: token.colorText,
    textTextHoverColor: token.colorText,
    textTextActiveColor: token.colorText,
    textHoverBg: token.colorFillTertiary,
    defaultColor: token.colorText,
    defaultBg: token.colorBgContainer,
    defaultBorderColor: token.colorBorder,
    defaultBorderColorDisabled: token.colorBorder,
    defaultHoverBg: token.colorBgContainer,
    defaultHoverColor: token.colorPrimaryHover,
    defaultHoverBorderColor: token.colorPrimaryHover,
    defaultActiveBg: token.colorBgContainer,
    defaultActiveColor: token.colorPrimaryActive,
    defaultActiveBorderColor: token.colorPrimaryActive,
    solidTextColor,
    contentFontSize,
    contentFontSizeSM,
    contentFontSizeLG,
    contentLineHeight,
    contentLineHeightSM,
    contentLineHeightLG,
    paddingBlock: Math.max((token.controlHeight - contentFontSize * contentLineHeight) / 2 - token.lineWidth, 0),
    paddingBlockSM: Math.max((token.controlHeightSM - contentFontSizeSM * contentLineHeightSM) / 2 - token.lineWidth, 0),
    paddingBlockLG: Math.max((token.controlHeightLG - contentFontSizeLG * contentLineHeightLG) / 2 - token.lineWidth, 0),
    defaultBgDisabled,
    dashedBgDisabled
  };
};
const genVariantStyle = (token) => {
  const {
    componentCls,
    antCls,
    lineWidth
  } = token;
  const [varName, varRef] = genCssVar(antCls, "btn");
  return {
    [componentCls]: [
      // ==============================================================
      // ==                         Variable                         ==
      // ==============================================================
      {
        // Border
        [varName("border-width")]: lineWidth,
        [varName("border-color")]: "#000",
        [varName("border-color-hover")]: varRef("border-color"),
        [varName("border-color-active")]: varRef("border-color"),
        [varName("border-color-disabled")]: varRef("border-color"),
        [varName("border-style")]: "solid",
        // Text
        [varName("text-color")]: "#000",
        [varName("text-color-hover")]: varRef("text-color"),
        [varName("text-color-active")]: varRef("text-color"),
        [varName("text-color-disabled")]: varRef("text-color"),
        // Background
        [varName("bg-color")]: "#ddd",
        [varName("bg-color-hover")]: varRef("bg-color"),
        [varName("bg-color-active")]: varRef("bg-color"),
        [varName("bg-color-disabled")]: token.colorBgContainerDisabled,
        [varName("bg-color-container")]: token.colorBgContainer,
        // Shadow
        [varName("shadow")]: "none"
      },
      // ==============================================================
      // ==                         Template                         ==
      // ==============================================================
      {
        // Basic
        border: [varRef("border-width"), varRef("border-style"), varRef("border-color")].join(" "),
        color: varRef("text-color"),
        backgroundColor: varRef("bg-color"),
        // Status
        [`&:not(:disabled):not(${componentCls}-disabled)`]: {
          // Hover
          "&:hover": {
            border: [varRef("border-width"), varRef("border-style"), varRef("border-color-hover")].join(" "),
            color: varRef("text-color-hover"),
            backgroundColor: varRef("bg-color-hover")
          },
          // Active
          "&:active": {
            border: [varRef("border-width"), varRef("border-style"), varRef("border-color-active")].join(" "),
            color: varRef("text-color-active"),
            backgroundColor: varRef("bg-color-active")
          }
        }
      },
      // ==============================================================
      // ==                         Variants                         ==
      // ==============================================================
      {
        // >>>>> Solid
        [`&${componentCls}-variant-solid`]: {
          // Solid Variables
          [varName("solid-bg-color")]: varRef("color-base"),
          [varName("solid-bg-color-hover")]: varRef("color-hover"),
          [varName("solid-bg-color-active")]: varRef("color-active"),
          // Variables
          [varName("border-color")]: "transparent",
          [varName("text-color")]: token.colorTextLightSolid,
          [varName("bg-color")]: varRef("solid-bg-color"),
          [varName("bg-color-hover")]: varRef("solid-bg-color-hover"),
          [varName("bg-color-active")]: varRef("solid-bg-color-active"),
          // Box Shadow
          boxShadow: varRef("shadow")
        },
        // >>>>> Outlined & Dashed
        [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
          [varName("border-color")]: varRef("color-base"),
          [varName("border-color-hover")]: varRef("color-hover"),
          [varName("border-color-active")]: varRef("color-active"),
          [varName("bg-color")]: varRef("bg-color-container"),
          [varName("text-color")]: varRef("color-base"),
          [varName("text-color-hover")]: varRef("color-hover"),
          [varName("text-color-active")]: varRef("color-active"),
          // Box Shadow
          boxShadow: varRef("shadow")
        },
        // >>>>> Dashed
        [`&${componentCls}-variant-dashed`]: {
          [varName("border-style")]: "dashed",
          [varName("bg-color-disabled")]: token.dashedBgDisabled
        },
        // >>>>> Filled
        [`&${componentCls}-variant-filled`]: {
          [varName("border-color")]: "transparent",
          [varName("text-color")]: varRef("color-base"),
          [varName("bg-color")]: varRef("color-light"),
          [varName("bg-color-hover")]: varRef("color-light-hover"),
          [varName("bg-color-active")]: varRef("color-light-active")
        },
        // >>>>> Text & Link
        [`&${componentCls}-variant-text, &${componentCls}-variant-link`]: {
          [varName("border-color")]: "transparent",
          [varName("text-color")]: varRef("color-base"),
          [varName("text-color-hover")]: varRef("color-hover"),
          [varName("text-color-active")]: varRef("color-active"),
          [varName("bg-color")]: "transparent",
          [varName("bg-color-hover")]: "transparent",
          [varName("bg-color-active")]: "transparent",
          [`&:disabled, &${token.componentCls}-disabled`]: {
            background: "transparent",
            borderColor: "transparent"
          }
        },
        // >>>>> Text
        [`&${componentCls}-variant-text`]: {
          [varName("bg-color-hover")]: varRef("color-light"),
          [varName("bg-color-active")]: varRef("color-light-active")
        }
      },
      // ==============================================================
      // ==                          Colors                          ==
      // ==============================================================
      {
        // ======================== By Default ========================
        // >>>>> Link
        [`&${componentCls}-variant-link`]: {
          [varName("color-base")]: token.colorLink,
          [varName("color-hover")]: token.colorLinkHover,
          [varName("color-active")]: token.colorLinkActive,
          [varName("bg-color-hover")]: token.linkHoverBg
        },
        // ======================== Compatible ========================
        // >>>>> Primary
        [`&${componentCls}-color-primary`]: {
          [varName("color-base")]: token.colorPrimary,
          [varName("color-hover")]: token.colorPrimaryHover,
          [varName("color-active")]: token.colorPrimaryActive,
          [varName("color-light")]: token.colorPrimaryBg,
          [varName("color-light-hover")]: token.colorPrimaryBgHover,
          [varName("color-light-active")]: token.colorPrimaryBorder,
          [varName("shadow")]: token.primaryShadow,
          [`&${componentCls}-variant-solid`]: {
            [varName("text-color")]: token.primaryColor,
            [varName("text-color-hover")]: varRef("text-color"),
            [varName("text-color-active")]: varRef("text-color")
          }
        },
        // >>>>> Danger
        [`&${componentCls}-color-dangerous`]: {
          [varName("color-base")]: token.colorError,
          [varName("color-hover")]: token.colorErrorHover,
          [varName("color-active")]: token.colorErrorActive,
          [varName("color-light")]: token.colorErrorBg,
          [varName("color-light-hover")]: token.colorErrorBgFilledHover,
          [varName("color-light-active")]: token.colorErrorBgActive,
          [varName("shadow")]: token.dangerShadow,
          [`&${componentCls}-variant-solid`]: {
            [varName("text-color")]: token.dangerColor,
            [varName("text-color-hover")]: varRef("text-color"),
            [varName("text-color-active")]: varRef("text-color")
          }
        },
        // >>>>> Default
        [`&${componentCls}-color-default`]: {
          [varName("solid-bg-color")]: token.colorBgSolid,
          [varName("solid-bg-color-hover")]: token.colorBgSolidHover,
          [varName("solid-bg-color-active")]: token.colorBgSolidActive,
          [varName("color-base")]: token.defaultBorderColor,
          [varName("color-hover")]: token.defaultHoverBorderColor,
          [varName("color-active")]: token.defaultActiveBorderColor,
          [varName("color-light")]: token.colorFillTertiary,
          [varName("color-light-hover")]: token.colorFillSecondary,
          [varName("color-light-active")]: token.colorFill,
          [varName("text-color")]: token.defaultColor,
          [varName("text-color-hover")]: token.defaultHoverColor,
          [varName("text-color-active")]: token.defaultActiveColor,
          [varName("shadow")]: token.defaultShadow,
          [`&${componentCls}-variant-outlined`]: {
            [varName("bg-color-disabled")]: token.defaultBgDisabled
          },
          [`&${componentCls}-variant-solid`]: {
            [varName("text-color")]: token.solidTextColor,
            [varName("text-color-hover")]: varRef("text-color"),
            [varName("text-color-active")]: varRef("text-color")
          },
          [`&${componentCls}-variant-filled, &${componentCls}-variant-text`]: {
            [varName("text-color-hover")]: varRef("text-color"),
            [varName("text-color-active")]: varRef("text-color")
          },
          [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
            [varName("text-color")]: token.defaultColor,
            [varName("text-color-hover")]: token.defaultHoverColor,
            [varName("text-color-active")]: token.defaultActiveColor,
            [varName("bg-color-container")]: token.defaultBg,
            [varName("bg-color-hover")]: token.defaultHoverBg,
            [varName("bg-color-active")]: token.defaultActiveBg
          },
          [`&${componentCls}-variant-text`]: {
            [varName("text-color")]: token.textTextColor,
            [varName("text-color-hover")]: token.textTextHoverColor,
            [varName("text-color-active")]: token.textTextActiveColor,
            [varName("bg-color-hover")]: token.textHoverBg
          },
          [`&${componentCls}-background-ghost`]: {
            [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
              [varName("text-color")]: token.defaultGhostColor,
              [varName("border-color")]: token.defaultGhostBorderColor
            }
          }
        }
      },
      // >>>>> Preset Colors
      PresetColors.map((colorKey) => {
        const darkColor = token[`${colorKey}6`];
        const lightColor = token[`${colorKey}1`];
        const hoverColor = token[`${colorKey}Hover`];
        const lightHoverColor = token[`${colorKey}2`];
        const lightActiveColor = token[`${colorKey}3`];
        const activeColor = token[`${colorKey}Active`];
        const shadowColor = token[`${colorKey}ShadowColor`];
        return {
          [`&${componentCls}-color-${colorKey}`]: {
            [varName("color-base")]: darkColor,
            [varName("color-hover")]: hoverColor,
            [varName("color-active")]: activeColor,
            [varName("color-light")]: lightColor,
            [varName("color-light-hover")]: lightHoverColor,
            [varName("color-light-active")]: lightActiveColor,
            [varName("shadow")]: shadowColor
          }
        };
      }),
      // ==============================================================
      // ==                         Disabled                         ==
      // ==============================================================
      {
        // Disabled
        [`&:disabled, &${token.componentCls}-disabled`]: {
          cursor: "not-allowed",
          borderColor: token.colorBorderDisabled,
          background: varRef("bg-color-disabled"),
          color: token.colorTextDisabled,
          boxShadow: "none"
        }
      },
      // ==============================================================
      // ==                          Ghost                           ==
      // ==============================================================
      {
        // Ghost
        [`&${componentCls}-background-ghost`]: {
          [varName("bg-color")]: token.ghostBg,
          [varName("bg-color-hover")]: token.ghostBg,
          [varName("bg-color-active")]: token.ghostBg,
          [varName("shadow")]: "none",
          [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
            [varName("bg-color-hover")]: token.ghostBg,
            [varName("bg-color-active")]: token.ghostBg
          }
        }
      }
    ]
  };
};
const genSharedButtonStyle = (token) => {
  const {
    componentCls,
    iconCls,
    fontWeight,
    opacityLoading,
    motionDurationSlow,
    motionEaseInOut,
    iconGap,
    calc
  } = token;
  return {
    [componentCls]: {
      outline: "none",
      position: "relative",
      display: "inline-flex",
      gap: iconGap,
      alignItems: "center",
      justifyContent: "center",
      fontWeight,
      whiteSpace: "nowrap",
      textAlign: "center",
      backgroundImage: "none",
      cursor: "pointer",
      transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
      userSelect: "none",
      touchAction: "manipulation",
      "&:disabled > *": {
        pointerEvents: "none"
      },
      // https://github.com/ant-design/ant-design/issues/51380
      [`${componentCls}-icon > svg`]: resetIcon(),
      "> a": {
        color: "currentColor"
      },
      "&:not(:disabled)": genFocusStyle(token),
      [`&${componentCls}-two-chinese-chars::first-letter`]: {
        letterSpacing: "0.34em"
      },
      [`&${componentCls}-two-chinese-chars > *:not(${iconCls})`]: {
        marginInlineEnd: "-0.34em",
        letterSpacing: "0.34em"
      },
      [`&${componentCls}-icon-only`]: {
        paddingInline: 0,
        // make `btn-icon-only` not too narrow
        [`&${componentCls}-compact-item`]: {
          flex: "none"
        }
      },
      // Loading
      [`&${componentCls}-loading`]: {
        opacity: opacityLoading,
        cursor: "default"
      },
      [`${componentCls}-loading-icon`]: {
        transition: ["width", "opacity", "margin"].map((transition) => `${transition} ${motionDurationSlow} ${motionEaseInOut}`).join(",")
      },
      // iconPlacement
      [`&:not(${componentCls}-icon-end)`]: {
        [`${componentCls}-loading-icon-motion`]: {
          "&-appear-start, &-enter-start": {
            marginInlineEnd: calc(iconGap).mul(-1).equal()
          },
          "&-appear-active, &-enter-active": {
            marginInlineEnd: 0
          },
          "&-leave-start": {
            marginInlineEnd: 0
          },
          "&-leave-active": {
            marginInlineEnd: calc(iconGap).mul(-1).equal()
          }
        }
      },
      "&-icon-end": {
        flexDirection: "row-reverse",
        [`${componentCls}-loading-icon-motion`]: {
          "&-appear-start, &-enter-start": {
            marginInlineStart: calc(iconGap).mul(-1).equal()
          },
          "&-appear-active, &-enter-active": {
            marginInlineStart: 0
          },
          "&-leave-start": {
            marginInlineStart: 0
          },
          "&-leave-active": {
            marginInlineStart: calc(iconGap).mul(-1).equal()
          }
        }
      }
    }
  };
};
const genCircleButtonStyle = (token) => ({
  minWidth: token.controlHeight,
  paddingInline: 0,
  borderRadius: "50%"
});
const genButtonStyle = (token, prefixCls = "") => {
  const {
    componentCls,
    controlHeight,
    fontSize,
    borderRadius,
    buttonPaddingHorizontal,
    iconCls,
    buttonPaddingVertical,
    buttonIconOnlyFontSize
  } = token;
  return [
    {
      [prefixCls]: {
        fontSize,
        height: controlHeight,
        padding: `${unit(buttonPaddingVertical)} ${unit(buttonPaddingHorizontal)}`,
        borderRadius,
        [`&${componentCls}-icon-only`]: {
          width: controlHeight,
          [iconCls]: {
            fontSize: buttonIconOnlyFontSize
          }
        }
      }
    },
    // Shape - patch prefixCls again to override solid border radius style
    {
      [`${componentCls}${componentCls}-circle${prefixCls}`]: genCircleButtonStyle(token)
    },
    {
      [`${componentCls}${componentCls}-round${prefixCls}`]: {
        borderRadius: token.controlHeight,
        [`&:not(${componentCls}-icon-only)`]: {
          paddingInline: token.buttonPaddingHorizontal
        }
      }
    }
  ];
};
const genSizeBaseButtonStyle = (token) => {
  const baseToken = merge$1(token, {
    fontSize: token.contentFontSize
  });
  return genButtonStyle(baseToken, token.componentCls);
};
const genSizeSmallButtonStyle = (token) => {
  const smallToken = merge$1(token, {
    controlHeight: token.controlHeightSM,
    fontSize: token.contentFontSizeSM,
    padding: token.paddingXS,
    buttonPaddingHorizontal: token.paddingInlineSM,
    buttonPaddingVertical: 0,
    borderRadius: token.borderRadiusSM,
    buttonIconOnlyFontSize: token.onlyIconSizeSM
  });
  return genButtonStyle(smallToken, `${token.componentCls}-sm`);
};
const genSizeLargeButtonStyle = (token) => {
  const largeToken = merge$1(token, {
    controlHeight: token.controlHeightLG,
    fontSize: token.contentFontSizeLG,
    buttonPaddingHorizontal: token.paddingInlineLG,
    buttonPaddingVertical: 0,
    borderRadius: token.borderRadiusLG,
    buttonIconOnlyFontSize: token.onlyIconSizeLG
  });
  return genButtonStyle(largeToken, `${token.componentCls}-lg`);
};
const genBlockButtonStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      [`&${componentCls}-block`]: {
        width: "100%"
      }
    }
  };
};
const useStyle$i = genStyleHooks("Button", (token) => {
  const buttonToken = prepareToken$3(token);
  return [
    // Shared
    genSharedButtonStyle(buttonToken),
    // Size
    genSizeBaseButtonStyle(buttonToken),
    genSizeSmallButtonStyle(buttonToken),
    genSizeLargeButtonStyle(buttonToken),
    // Block
    genBlockButtonStyle(buttonToken),
    // Variant
    genVariantStyle(buttonToken),
    // Button Group
    genGroupStyle$1(buttonToken)
  ];
}, prepareComponentToken$b, {
  unitless: {
    fontWeight: true,
    contentLineHeight: true,
    contentLineHeightSM: true,
    contentLineHeightLG: true
  }
});
function compactItemBorder(token, parentCls, options, prefixCls) {
  const {
    focusElCls,
    focus,
    borderElCls
  } = options;
  const childCombinator = borderElCls ? "> *" : "";
  const hoverEffects = ["hover", focus ? "focus" : null, "active"].filter(Boolean).map((n) => `&:${n} ${childCombinator}`).join(",");
  return {
    [`&-item:not(${parentCls}-last-item)`]: {
      marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal()
    },
    [`&-item:not(${prefixCls}-status-success)`]: {
      zIndex: 2
    },
    "&-item": {
      [hoverEffects]: {
        zIndex: 3
      },
      ...focusElCls ? {
        [`&${focusElCls}`]: {
          zIndex: 3
        }
      } : {},
      [`&[disabled] ${childCombinator}`]: {
        zIndex: 0
      }
    }
  };
}
function compactItemBorderRadius(prefixCls, parentCls, options) {
  const {
    borderElCls
  } = options;
  const childCombinator = borderElCls ? `> ${borderElCls}` : "";
  return {
    [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item) ${childCombinator}`]: {
      borderRadius: 0
    },
    [`&-item:not(${parentCls}-last-item)${parentCls}-first-item`]: {
      [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`&-item:not(${parentCls}-first-item)${parentCls}-last-item`]: {
      [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    }
  };
}
function genCompactItemStyle(token, options = {
  focus: true
}) {
  const {
    componentCls
  } = token;
  const {
    componentCls: customizePrefixCls
  } = options;
  const mergedComponentCls = customizePrefixCls || componentCls;
  const compactCls = `${mergedComponentCls}-compact`;
  return {
    [compactCls]: {
      ...compactItemBorder(token, compactCls, options, mergedComponentCls),
      ...compactItemBorderRadius(mergedComponentCls, compactCls, options)
    }
  };
}
function compactItemVerticalBorder(token, parentCls, prefixCls) {
  return {
    // border collapse
    [`&-item:not(${parentCls}-last-item)`]: {
      marginBottom: token.calc(token.lineWidth).mul(-1).equal()
    },
    [`&-item:not(${prefixCls}-status-success)`]: {
      zIndex: 2
    },
    "&-item": {
      "&:hover,&:focus,&:active": {
        zIndex: 3
      },
      "&[disabled]": {
        zIndex: 0
      }
    }
  };
}
function compactItemBorderVerticalRadius(prefixCls, parentCls) {
  return {
    [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item)`]: {
      borderRadius: 0
    },
    [`&-item${parentCls}-first-item:not(${parentCls}-last-item)`]: {
      [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
        borderEndEndRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`&-item${parentCls}-last-item:not(${parentCls}-first-item)`]: {
      [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
        borderStartStartRadius: 0,
        borderStartEndRadius: 0
      }
    }
  };
}
function genCompactItemVerticalStyle(token) {
  const compactCls = `${token.componentCls}-compact-vertical`;
  return {
    [compactCls]: {
      ...compactItemVerticalBorder(token, compactCls, token.componentCls),
      ...compactItemBorderVerticalRadius(token.componentCls, compactCls)
    }
  };
}
const genButtonCompactStyle = (token) => {
  const {
    antCls,
    componentCls,
    lineWidth,
    calc,
    colorBgContainer
  } = token;
  const solidSelector = `${componentCls}-variant-solid:not([disabled])`;
  const insetOffset = calc(lineWidth).mul(-1).equal();
  const [varName, varRef] = genCssVar(antCls, "btn");
  const getCompactBorderStyle = (vertical) => {
    const itemCls = `${componentCls}-compact${vertical ? "-vertical" : ""}-item`;
    return {
      // TODO: Border color transition should be not cover when has color.
      [itemCls]: {
        [varName("compact-connect-border-color")]: varRef("bg-color-hover"),
        [`&${solidSelector}`]: {
          transition: `none`,
          [`& + ${solidSelector}:before`]: [{
            position: "absolute",
            backgroundColor: varRef("compact-connect-border-color"),
            content: '""'
          }, vertical ? {
            top: insetOffset,
            insetInline: insetOffset,
            height: lineWidth
          } : {
            insetBlock: insetOffset,
            insetInlineStart: insetOffset,
            width: lineWidth
          }],
          "&:hover:before": {
            display: "none"
          }
        }
      }
    };
  };
  return [getCompactBorderStyle(), getCompactBorderStyle(true), {
    [`${solidSelector}${componentCls}-color-default`]: {
      [varName("compact-connect-border-color")]: `color-mix(in srgb, ${varRef("bg-color-hover")} 75%, ${colorBgContainer})`
    }
  }];
};
const Compact = genSubStyleComponent(["Button", "compact"], (token) => {
  const buttonToken = prepareToken$3(token);
  return [
    // Space Compact
    genCompactItemStyle(buttonToken),
    genCompactItemVerticalStyle(buttonToken),
    genButtonCompactStyle(buttonToken)
  ];
}, prepareComponentToken$b);
function getLoadingConfig(loading) {
  if (typeof loading === "object" && loading) {
    let delay = loading?.delay;
    delay = !Number.isNaN(delay) && typeof delay === "number" ? delay : 0;
    return {
      loading: delay <= 0,
      delay
    };
  }
  return {
    loading: !!loading,
    delay: 0
  };
}
const ButtonTypeMap = {
  default: ["default", "outlined"],
  primary: ["primary", "solid"],
  dashed: ["default", "dashed"],
  // `link` is not a real color but we should compatible with it
  link: ["link", "link"],
  text: ["default", "text"]
};
const InternalCompoundedButton = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    _skipSemantic,
    loading = false,
    prefixCls: customizePrefixCls,
    color,
    variant,
    type,
    danger = false,
    shape: customizeShape,
    size: customizeSize,
    disabled: customDisabled,
    className,
    rootClassName,
    children,
    icon,
    iconPosition,
    iconPlacement,
    ghost = false,
    block = false,
    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    htmlType = "button",
    classNames,
    styles,
    style,
    autoInsertSpace,
    autoFocus,
    ...rest
  } = props;
  const childNodes = toArray$1(children);
  const mergedType = type || "default";
  const {
    getPrefixCls,
    direction,
    autoInsertSpace: contextAutoInsertSpace,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    loadingIcon: contextLoadingIcon,
    shape: contextShape,
    color: contextColor,
    variant: contextVariant
  } = useComponentConfig("button");
  const mergedShape = customizeShape || contextShape || "default";
  const [parsedColor, parsedVariant] = reactExports.useMemo(() => {
    if (color && variant) {
      return [color, variant];
    }
    if (type || danger) {
      const colorVariantPair = ButtonTypeMap[mergedType] || [];
      if (danger) {
        return ["danger", colorVariantPair[1]];
      }
      return colorVariantPair;
    }
    if (contextColor && contextVariant) {
      return [contextColor, contextVariant];
    }
    return ["default", "outlined"];
  }, [color, variant, type, danger, contextColor, contextVariant, mergedType]);
  const [mergedColor, mergedVariant] = reactExports.useMemo(() => {
    if (ghost && parsedVariant === "solid") {
      return [parsedColor, "outlined"];
    }
    return [parsedColor, parsedVariant];
  }, [parsedColor, parsedVariant, ghost]);
  const isDanger = mergedColor === "danger";
  const mergedColorText = isDanger ? "dangerous" : mergedColor;
  const mergedInsertSpace = autoInsertSpace ?? contextAutoInsertSpace ?? true;
  const prefixCls = getPrefixCls("btn", customizePrefixCls);
  const [hashId, cssVarCls] = useStyle$i(prefixCls);
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;
  const groupSize = reactExports.useContext(GroupSizeContext);
  const loadingOrDelay = reactExports.useMemo(() => getLoadingConfig(loading), [loading]);
  const [innerLoading, setLoading] = reactExports.useState(loadingOrDelay.loading);
  const [hasTwoCNChar, setHasTwoCNChar] = reactExports.useState(false);
  const buttonRef = reactExports.useRef(null);
  const mergedRef = useComposeRef(ref, buttonRef);
  const needInserted = childNodes.length === 1 && !icon && !isUnBorderedButtonVariant(mergedVariant);
  const isMountRef = reactExports.useRef(true);
  React.useEffect(() => {
    isMountRef.current = false;
    return () => {
      isMountRef.current = true;
    };
  }, []);
  useLayoutEffect(() => {
    let delayTimer = null;
    if (loadingOrDelay.delay > 0) {
      delayTimer = setTimeout(() => {
        delayTimer = null;
        setLoading(true);
      }, loadingOrDelay.delay);
    } else {
      setLoading(loadingOrDelay.loading);
    }
    function cleanupTimer() {
      if (delayTimer) {
        clearTimeout(delayTimer);
        delayTimer = null;
      }
    }
    return cleanupTimer;
  }, [loadingOrDelay.delay, loadingOrDelay.loading]);
  reactExports.useEffect(() => {
    if (!buttonRef.current || !mergedInsertSpace) {
      return;
    }
    const buttonText = buttonRef.current.textContent || "";
    if (needInserted && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true);
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false);
    }
  });
  reactExports.useEffect(() => {
    if (autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);
  const handleClick = React.useCallback((e2) => {
    if (innerLoading || mergedDisabled) {
      e2.preventDefault();
      return;
    }
    props.onClick?.("href" in props ? e2 : e2);
  }, [props.onClick, innerLoading, mergedDisabled]);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const sizeClassNameMap = {
    large: "lg",
    small: "sm",
    middle: void 0,
    medium: void 0
  };
  const sizeFullName = useSize((ctxSize) => customizeSize ?? compactSize ?? groupSize ?? ctxSize);
  const sizeCls = sizeFullName ? sizeClassNameMap[sizeFullName] ?? "" : "";
  const iconType = innerLoading ? "loading" : icon;
  const mergedIconPlacement = iconPlacement ?? iconPosition ?? "start";
  const linkButtonRestProps = omit(rest, ["navigate"]);
  const mergedProps = {
    ...props,
    type: mergedType,
    color: mergedColor,
    variant: mergedVariant,
    danger: isDanger,
    shape: mergedShape,
    size: sizeFullName,
    disabled: mergedDisabled,
    loading: innerLoading,
    iconPlacement: mergedIconPlacement
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([_skipSemantic ? void 0 : contextClassNames, classNames], [_skipSemantic ? void 0 : contextStyles, styles], {
    props: mergedProps
  });
  const classes = clsx(prefixCls, hashId, cssVarCls, {
    [`${prefixCls}-${mergedShape}`]: mergedShape !== "default" && mergedShape !== "square" && mergedShape,
    // Compatible with versions earlier than 5.21.0
    [`${prefixCls}-${mergedType}`]: mergedType,
    [`${prefixCls}-dangerous`]: danger,
    [`${prefixCls}-color-${mergedColorText}`]: mergedColorText,
    [`${prefixCls}-variant-${mergedVariant}`]: mergedVariant,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
    [`${prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonVariant(mergedVariant),
    [`${prefixCls}-loading`]: innerLoading,
    [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && mergedInsertSpace && !innerLoading,
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-icon-end`]: mergedIconPlacement === "end"
  }, compactItemClassnames, className, rootClassName, contextClassName, mergedClassNames.root);
  const fullStyle = {
    ...mergedStyles.root,
    ...contextStyle,
    ...style
  };
  const iconSharedProps = {
    className: mergedClassNames.icon,
    style: mergedStyles.icon
  };
  const iconWrapperElement = (child) => /* @__PURE__ */ React.createElement(IconWrapper, {
    prefixCls,
    ...iconSharedProps
  }, child);
  const defaultLoadingIconElement = /* @__PURE__ */ React.createElement(DefaultLoadingIcon, {
    existIcon: !!icon,
    prefixCls,
    loading: innerLoading,
    mount: isMountRef.current,
    ...iconSharedProps
  });
  const mergedLoadingIcon = loading && typeof loading === "object" ? loading.icon || contextLoadingIcon : contextLoadingIcon;
  let iconNode;
  if (icon && !innerLoading) {
    iconNode = iconWrapperElement(icon);
  } else if (loading && mergedLoadingIcon) {
    iconNode = iconWrapperElement(mergedLoadingIcon);
  } else {
    iconNode = defaultLoadingIconElement;
  }
  const contentNode = isNonNullable(children) ? spaceChildren(children, needInserted && mergedInsertSpace, mergedStyles.content, mergedClassNames.content) : null;
  if (linkButtonRestProps.href !== void 0) {
    return /* @__PURE__ */ React.createElement("a", {
      ...linkButtonRestProps,
      className: clsx(classes, {
        [`${prefixCls}-disabled`]: mergedDisabled
      }),
      href: mergedDisabled ? void 0 : linkButtonRestProps.href,
      style: fullStyle,
      onClick: handleClick,
      ref: mergedRef,
      tabIndex: mergedDisabled ? -1 : 0,
      "aria-disabled": mergedDisabled
    }, iconNode, contentNode);
  }
  let buttonNode = /* @__PURE__ */ React.createElement("button", {
    ...rest,
    type: htmlType,
    className: classes,
    style: fullStyle,
    onClick: handleClick,
    disabled: mergedDisabled,
    ref: mergedRef
  }, iconNode, contentNode, compactItemClassnames && /* @__PURE__ */ React.createElement(Compact, {
    prefixCls
  }));
  if (!isUnBorderedButtonVariant(mergedVariant)) {
    buttonNode = /* @__PURE__ */ React.createElement(Wave, {
      component: "Button",
      disabled: innerLoading
    }, buttonNode);
  }
  return buttonNode;
});
const Button$1 = InternalCompoundedButton;
Button$1.Group = ButtonGroup;
Button$1.__ANT_BUTTON = true;
const isThenable = (thing) => {
  return typeof thing?.then === "function";
};
const ActionButton = (props) => {
  const {
    type,
    children,
    prefixCls,
    buttonProps,
    close,
    autoFocus,
    emitEvent,
    isSilent,
    quitOnNullishReturnValue,
    actionFn
  } = props;
  const clickedRef = reactExports.useRef(false);
  const buttonRef = reactExports.useRef(null);
  const [loading, setLoading] = useSafeState(false);
  const onInternalClose = (...args) => {
    close?.(...args);
  };
  reactExports.useEffect(() => {
    let timeoutId = null;
    if (autoFocus) {
      timeoutId = setTimeout(() => {
        buttonRef.current?.focus({
          preventScroll: true
        });
      });
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [autoFocus]);
  const handlePromiseOnOk = (returnValueOfOnOk) => {
    if (!isThenable(returnValueOfOnOk)) {
      return;
    }
    setLoading(true);
    returnValueOfOnOk.then((...args) => {
      setLoading(false, true);
      onInternalClose.apply(void 0, args);
      clickedRef.current = false;
    }, (e2) => {
      setLoading(false, true);
      clickedRef.current = false;
      if (isSilent?.()) {
        return;
      }
      return Promise.reject(e2);
    });
  };
  const onClick = (e2) => {
    if (clickedRef.current) {
      return;
    }
    clickedRef.current = true;
    if (!actionFn) {
      onInternalClose();
      return;
    }
    let returnValueOfOnOk;
    if (emitEvent) {
      returnValueOfOnOk = actionFn(e2);
      if (quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
        clickedRef.current = false;
        onInternalClose(e2);
        return;
      }
    } else if (actionFn.length) {
      returnValueOfOnOk = actionFn(close);
      clickedRef.current = false;
    } else {
      returnValueOfOnOk = actionFn();
      if (!isThenable(returnValueOfOnOk)) {
        onInternalClose();
        return;
      }
    }
    handlePromiseOnOk(returnValueOfOnOk);
  };
  return /* @__PURE__ */ reactExports.createElement(Button$1, {
    ...convertLegacyProps(type),
    onClick,
    loading,
    prefixCls,
    ...buttonProps,
    ref: buttonRef
  }, children);
};
const ModalContext = /* @__PURE__ */ React.createContext({});
const {
  Provider: ModalContextProvider
} = ModalContext;
const ConfirmCancelBtn = () => {
  const {
    autoFocusButton,
    cancelButtonProps,
    cancelTextLocale,
    isSilent,
    mergedOkCancel,
    rootPrefixCls,
    close,
    onCancel,
    onConfirm,
    onClose
  } = reactExports.useContext(ModalContext);
  return mergedOkCancel ? /* @__PURE__ */ React.createElement(ActionButton, {
    isSilent,
    actionFn: onCancel,
    close: (...args) => {
      close?.(...args);
      onConfirm?.(false);
      onClose?.();
    },
    autoFocus: autoFocusButton === "cancel",
    buttonProps: cancelButtonProps,
    prefixCls: `${rootPrefixCls}-btn`
  }, cancelTextLocale) : null;
};
const ConfirmOkBtn = () => {
  const {
    autoFocusButton,
    close,
    isSilent,
    okButtonProps,
    rootPrefixCls,
    okTextLocale,
    okType,
    onConfirm,
    onOk,
    onClose
  } = reactExports.useContext(ModalContext);
  return /* @__PURE__ */ React.createElement(ActionButton, {
    isSilent,
    type: okType || "primary",
    actionFn: onOk,
    close: (...args) => {
      close?.(...args);
      onConfirm?.(true);
      onClose?.();
    },
    autoFocus: autoFocusButton === "ok",
    buttonProps: okButtonProps,
    prefixCls: `${rootPrefixCls}-btn`
  }, okTextLocale);
};
const FormContext = /* @__PURE__ */ reactExports.createContext({
  labelAlign: "right",
  layout: "horizontal",
  itemRef: () => {
  }
});
const NoStyleItemContext = /* @__PURE__ */ reactExports.createContext(null);
const FormProvider = (props) => {
  const providerProps = omit(props, ["prefixCls"]);
  return /* @__PURE__ */ reactExports.createElement(FormProvider$1, {
    ...providerProps
  });
};
const FormItemPrefixContext = /* @__PURE__ */ reactExports.createContext({
  prefixCls: ""
});
const FormItemInputContext = /* @__PURE__ */ reactExports.createContext({});
const NoFormStyle = ({
  children,
  status,
  override
}) => {
  const formItemInputContext = reactExports.useContext(FormItemInputContext);
  const newFormItemInputContext = reactExports.useMemo(() => {
    const newContext = {
      ...formItemInputContext
    };
    if (override) {
      delete newContext.isFormItemInput;
    }
    if (status) {
      delete newContext.status;
      delete newContext.hasFeedback;
      delete newContext.feedbackIcon;
    }
    return newContext;
  }, [status, override, formItemInputContext]);
  return /* @__PURE__ */ reactExports.createElement(FormItemInputContext.Provider, {
    value: newFormItemInputContext
  }, children);
};
const VariantContext = /* @__PURE__ */ reactExports.createContext(void 0);
const ContextIsolator = (props) => {
  const {
    space,
    form,
    children
  } = props;
  if (!isNonNullable(children)) {
    return null;
  }
  let result = children;
  if (form) {
    result = /* @__PURE__ */ React.createElement(NoFormStyle, {
      override: true,
      status: true
    }, result);
  }
  if (space) {
    result = /* @__PURE__ */ React.createElement(NoCompactStyle, null, result);
  }
  return result;
};
const canUseDocElement = () => canUseDom() && window.document.documentElement;
function useFocusable(focusable, defaultTrap, legacyFocusTriggerAfterClose) {
  return reactExports.useMemo(() => {
    const ret = {
      trap: defaultTrap ?? true,
      focusTriggerAfterClose: legacyFocusTriggerAfterClose ?? true
    };
    return {
      ...ret,
      ...focusable
    };
  }, [focusable, defaultTrap, legacyFocusTriggerAfterClose]);
}
const Element = (props) => {
  const {
    prefixCls,
    className,
    style,
    size,
    shape
  } = props;
  const sizeCls = clsx({
    [`${prefixCls}-lg`]: size === "large",
    [`${prefixCls}-sm`]: size === "small"
  });
  const shapeCls = clsx({
    [`${prefixCls}-circle`]: shape === "circle",
    [`${prefixCls}-square`]: shape === "square",
    [`${prefixCls}-round`]: shape === "round"
  });
  const sizeStyle = reactExports.useMemo(() => typeof size === "number" ? {
    width: size,
    height: size,
    lineHeight: `${size}px`
  } : {}, [size]);
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: clsx(prefixCls, sizeCls, shapeCls, className),
    style: {
      ...sizeStyle,
      ...style
    }
  });
};
const skeletonClsLoading = new Keyframe(`ant-skeleton-loading`, {
  "0%": {
    backgroundPosition: "100% 50%"
  },
  "100%": {
    backgroundPosition: "0 50%"
  }
});
const genSkeletonElementCommonSize = (size) => ({
  height: size,
  lineHeight: unit(size)
});
const genSkeletonElementSize = (size) => ({
  width: size,
  ...genSkeletonElementCommonSize(size)
});
const genSkeletonColor = (token) => ({
  background: token.skeletonLoadingBackground,
  backgroundSize: "400% 100%",
  animationName: skeletonClsLoading,
  animationDuration: token.skeletonLoadingMotionDuration,
  animationTimingFunction: "ease",
  animationIterationCount: "infinite"
});
const genSkeletonElementInputSize = (size, calc) => ({
  width: calc(size).mul(5).equal(),
  minWidth: calc(size).mul(5).equal(),
  ...genSkeletonElementCommonSize(size)
});
const genSkeletonElementAvatar = (token) => {
  const {
    skeletonAvatarCls,
    gradientFromColor,
    controlHeight,
    controlHeightLG,
    controlHeightSM
  } = token;
  return {
    [skeletonAvatarCls]: {
      display: "inline-block",
      verticalAlign: "top",
      background: gradientFromColor,
      ...genSkeletonElementSize(controlHeight)
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-circle`]: {
      borderRadius: "50%"
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-lg`]: {
      ...genSkeletonElementSize(controlHeightLG)
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-sm`]: {
      ...genSkeletonElementSize(controlHeightSM)
    }
  };
};
const genSkeletonElementInput = (token) => {
  const {
    controlHeight,
    borderRadiusSM,
    skeletonInputCls,
    controlHeightLG,
    controlHeightSM,
    gradientFromColor,
    calc
  } = token;
  return {
    [skeletonInputCls]: {
      display: "inline-block",
      verticalAlign: "top",
      background: gradientFromColor,
      borderRadius: borderRadiusSM,
      ...genSkeletonElementInputSize(controlHeight, calc)
    },
    [`${skeletonInputCls}-lg`]: {
      ...genSkeletonElementInputSize(controlHeightLG, calc)
    },
    [`${skeletonInputCls}-sm`]: {
      ...genSkeletonElementInputSize(controlHeightSM, calc)
    }
  };
};
const genSkeletonElementShape = (token) => {
  const {
    gradientFromColor,
    borderRadiusSM,
    imageSizeBase,
    calc
  } = token;
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    background: gradientFromColor,
    borderRadius: borderRadiusSM,
    ...genSkeletonElementSize(calc(imageSizeBase).mul(2).equal())
  };
};
const genSkeletonElementNode = (token) => {
  return {
    [token.skeletonNodeCls]: {
      ...genSkeletonElementShape(token)
    }
  };
};
const genSkeletonElementImage = (token) => {
  const {
    skeletonImageCls,
    imageSizeBase,
    calc
  } = token;
  return {
    [skeletonImageCls]: {
      ...genSkeletonElementShape(token),
      [`${skeletonImageCls}-path`]: {
        fill: "#bfbfbf"
      },
      [`${skeletonImageCls}-svg`]: {
        ...genSkeletonElementSize(imageSizeBase),
        maxWidth: calc(imageSizeBase).mul(4).equal(),
        maxHeight: calc(imageSizeBase).mul(4).equal()
      },
      [`${skeletonImageCls}-svg${skeletonImageCls}-svg-circle`]: {
        borderRadius: "50%"
      }
    },
    [`${skeletonImageCls}${skeletonImageCls}-circle`]: {
      borderRadius: "50%"
    }
  };
};
const genSkeletonElementButtonShape = (token, size, buttonCls) => {
  const {
    skeletonButtonCls
  } = token;
  return {
    [`${buttonCls}${skeletonButtonCls}-circle`]: {
      width: size,
      minWidth: size,
      borderRadius: "50%"
    },
    [`${buttonCls}${skeletonButtonCls}-round`]: {
      borderRadius: size
    }
  };
};
const genSkeletonElementButtonSize = (size, calc) => ({
  width: calc(size).mul(2).equal(),
  minWidth: calc(size).mul(2).equal(),
  ...genSkeletonElementCommonSize(size)
});
const genSkeletonElementButton = (token) => {
  const {
    borderRadiusSM,
    skeletonButtonCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    gradientFromColor,
    calc
  } = token;
  return {
    [skeletonButtonCls]: {
      display: "inline-block",
      verticalAlign: "top",
      background: gradientFromColor,
      borderRadius: borderRadiusSM,
      width: calc(controlHeight).mul(2).equal(),
      minWidth: calc(controlHeight).mul(2).equal(),
      ...genSkeletonElementButtonSize(controlHeight, calc)
    },
    ...genSkeletonElementButtonShape(token, controlHeight, skeletonButtonCls),
    [`${skeletonButtonCls}-lg`]: {
      ...genSkeletonElementButtonSize(controlHeightLG, calc)
    },
    ...genSkeletonElementButtonShape(token, controlHeightLG, `${skeletonButtonCls}-lg`),
    [`${skeletonButtonCls}-sm`]: {
      ...genSkeletonElementButtonSize(controlHeightSM, calc)
    },
    ...genSkeletonElementButtonShape(token, controlHeightSM, `${skeletonButtonCls}-sm`)
  };
};
const genBaseStyle$1 = (token) => {
  const {
    componentCls,
    skeletonAvatarCls,
    skeletonTitleCls,
    skeletonParagraphCls,
    skeletonButtonCls,
    skeletonInputCls,
    skeletonNodeCls,
    skeletonImageCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    gradientFromColor,
    padding,
    marginSM,
    borderRadius,
    titleHeight,
    blockRadius,
    paragraphLiHeight,
    controlHeightXS,
    paragraphMarginTop
  } = token;
  return {
    [componentCls]: {
      display: "table",
      width: "100%",
      [`${componentCls}-header`]: {
        display: "table-cell",
        paddingInlineEnd: padding,
        verticalAlign: "top",
        // Avatar
        [skeletonAvatarCls]: {
          display: "inline-block",
          verticalAlign: "top",
          background: gradientFromColor,
          ...genSkeletonElementSize(controlHeight)
        },
        [`${skeletonAvatarCls}-circle`]: {
          borderRadius: "50%"
        },
        [`${skeletonAvatarCls}-lg`]: {
          ...genSkeletonElementSize(controlHeightLG)
        },
        [`${skeletonAvatarCls}-sm`]: {
          ...genSkeletonElementSize(controlHeightSM)
        }
      },
      [`${componentCls}-section`]: {
        display: "table-cell",
        width: "100%",
        verticalAlign: "top",
        // Title
        [skeletonTitleCls]: {
          width: "100%",
          height: titleHeight,
          background: gradientFromColor,
          borderRadius: blockRadius,
          [`+ ${skeletonParagraphCls}`]: {
            marginBlockStart: controlHeightSM
          }
        },
        // paragraph
        [skeletonParagraphCls]: {
          padding: 0,
          "> li": {
            width: "100%",
            height: paragraphLiHeight,
            listStyle: "none",
            background: gradientFromColor,
            borderRadius: blockRadius,
            "+ li": {
              marginBlockStart: controlHeightXS
            }
          }
        },
        [`${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))`]: {
          width: "61%"
        }
      },
      [`&-round ${componentCls}-section`]: {
        [`${skeletonTitleCls}, ${skeletonParagraphCls} > li`]: {
          borderRadius
        }
      }
    },
    [`${componentCls}-with-avatar ${componentCls}-section`]: {
      // Title
      [skeletonTitleCls]: {
        marginBlockStart: marginSM,
        [`+ ${skeletonParagraphCls}`]: {
          marginBlockStart: paragraphMarginTop
        }
      }
    },
    // Skeleton with element
    [`${componentCls}${componentCls}-element`]: {
      display: "inline-block",
      width: "auto",
      ...genSkeletonElementButton(token),
      ...genSkeletonElementAvatar(token),
      ...genSkeletonElementInput(token),
      ...genSkeletonElementNode(token),
      ...genSkeletonElementImage(token)
    },
    // Skeleton Block Button, Input
    [`${componentCls}${componentCls}-block`]: {
      width: "100%",
      [skeletonButtonCls]: {
        width: "100%"
      },
      [skeletonInputCls]: {
        width: "100%"
      }
    },
    // With active animation
    [`${componentCls}${componentCls}-active`]: {
      [`
        ${skeletonTitleCls},
        ${skeletonParagraphCls} > li,
        ${skeletonAvatarCls},
        ${skeletonButtonCls},
        ${skeletonInputCls},
        ${skeletonNodeCls},
        ${skeletonImageCls}
      `]: {
        ...genSkeletonColor(token)
      }
    }
  };
};
const prepareComponentToken$a = (token) => {
  const {
    colorFillContent,
    colorFill
  } = token;
  const gradientFromColor = colorFillContent;
  const gradientToColor = colorFill;
  return {
    color: gradientFromColor,
    colorGradientEnd: gradientToColor,
    gradientFromColor,
    gradientToColor,
    titleHeight: token.controlHeight / 2,
    blockRadius: token.borderRadiusSM,
    paragraphMarginTop: token.marginLG + token.marginXXS,
    paragraphLiHeight: token.controlHeight / 2
  };
};
const useStyle$h = genStyleHooks("Skeleton", (token) => {
  const {
    componentCls,
    calc
  } = token;
  const skeletonToken = merge$1(token, {
    skeletonAvatarCls: `${componentCls}-avatar`,
    skeletonTitleCls: `${componentCls}-title`,
    skeletonParagraphCls: `${componentCls}-paragraph`,
    skeletonButtonCls: `${componentCls}-button`,
    skeletonInputCls: `${componentCls}-input`,
    skeletonNodeCls: `${componentCls}-node`,
    skeletonImageCls: `${componentCls}-image`,
    imageSizeBase: calc(token.controlHeight).mul(1.5).equal(),
    borderRadius: 100,
    // Large number to make capsule shape
    skeletonLoadingBackground: `linear-gradient(90deg, ${token.gradientFromColor} 25%, ${token.gradientToColor} 37%, ${token.gradientFromColor} 63%)`,
    skeletonLoadingMotionDuration: "1.4s"
  });
  return genBaseStyle$1(skeletonToken);
}, prepareComponentToken$a, {
  deprecatedTokens: [["color", "gradientFromColor"], ["colorGradientEnd", "gradientToColor"]]
});
const SkeletonAvatar = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    classNames,
    rootClassName,
    active,
    style,
    styles,
    shape = "circle",
    size = "default",
    ...rest
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
  const [hashId, cssVarCls] = useStyle$h(prefixCls);
  const cls = clsx(prefixCls, `${prefixCls}-element`, {
    [`${prefixCls}-active`]: active
  }, classNames?.root, className, rootClassName, hashId, cssVarCls);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: cls,
    style: styles?.root
  }, /* @__PURE__ */ reactExports.createElement(Element, {
    prefixCls: `${prefixCls}-avatar`,
    className: classNames?.content,
    style: {
      ...styles?.content,
      ...style
    },
    shape,
    size,
    ...rest
  }));
};
const SkeletonButton = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    classNames,
    active,
    style,
    styles,
    block = false,
    size = "default",
    ...rest
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
  const [hashId, cssVarCls] = useStyle$h(prefixCls);
  const cls = clsx(prefixCls, `${prefixCls}-element`, {
    [`${prefixCls}-active`]: active,
    [`${prefixCls}-block`]: block
  }, classNames?.root, className, rootClassName, hashId, cssVarCls);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: cls,
    style: styles?.root
  }, /* @__PURE__ */ reactExports.createElement(Element, {
    prefixCls: `${prefixCls}-button`,
    className: classNames?.content,
    style: {
      ...styles?.content,
      ...style
    },
    size,
    ...rest
  }));
};
const SkeletonNode = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    classNames,
    rootClassName,
    internalClassName,
    style,
    styles,
    active,
    children
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
  const [hashId, cssVarCls] = useStyle$h(prefixCls);
  const cls = clsx(prefixCls, `${prefixCls}-element`, {
    [`${prefixCls}-active`]: active
  }, hashId, classNames?.root, className, rootClassName, cssVarCls);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: cls,
    style: styles?.root
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(classNames?.content, internalClassName || `${prefixCls}-node`),
    style: {
      ...styles?.content,
      ...style
    }
  }, children));
};
const SkeletonImage = (props) => {
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("skeleton", props.prefixCls);
  return /* @__PURE__ */ reactExports.createElement(SkeletonNode, {
    ...props,
    internalClassName: `${prefixCls}-image`
  }, /* @__PURE__ */ reactExports.createElement("svg", {
    viewBox: "0 0 1098 1024",
    xmlns: "http://www.w3.org/2000/svg",
    className: `${prefixCls}-image-svg`
  }, /* @__PURE__ */ reactExports.createElement("title", null, "Image placeholder"), /* @__PURE__ */ reactExports.createElement("path", {
    d: "M365.7 329.1q0 45.8-32 77.7t-77.7 32-77.7-32-32-77.7 32-77.6 77.7-32 77.7 32 32 77.6M951 548.6v256H146.3V694.9L329 512l91.5 91.4L713 311zm54.8-402.3H91.4q-7.4 0-12.8 5.4T73 164.6v694.8q0 7.5 5.5 12.9t12.8 5.4h914.3q7.5 0 12.9-5.4t5.4-12.9V164.6q0-7.5-5.4-12.9t-12.9-5.4m91.4 18.3v694.8q0 37.8-26.8 64.6t-64.6 26.9H91.4q-37.7 0-64.6-26.9T0 859.4V164.6q0-37.8 26.8-64.6T91.4 73h914.3q37.8 0 64.6 26.9t26.8 64.6",
    className: `${prefixCls}-image-path`
  })));
};
const SkeletonInput = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    classNames,
    rootClassName,
    active,
    block,
    style,
    styles,
    size = "default",
    ...rest
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
  const [hashId, cssVarCls] = useStyle$h(prefixCls);
  const cls = clsx(prefixCls, `${prefixCls}-element`, {
    [`${prefixCls}-active`]: active,
    [`${prefixCls}-block`]: block
  }, classNames?.root, className, rootClassName, hashId, cssVarCls);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: cls,
    style: styles?.root
  }, /* @__PURE__ */ reactExports.createElement(Element, {
    prefixCls: `${prefixCls}-input`,
    className: classNames?.content,
    style: {
      ...styles?.content,
      ...style
    },
    size,
    ...rest
  }));
};
const getWidth = (index, props) => {
  const {
    width,
    rows = 2
  } = props;
  if (Array.isArray(width)) {
    return width[index];
  }
  if (rows - 1 === index) {
    return width;
  }
  return void 0;
};
const Paragraph = (props) => {
  const {
    prefixCls,
    className,
    style,
    rows = 0
  } = props;
  const rowList = Array.from({
    length: rows
  }).map((_, index) => (
    // eslint-disable-next-line react/no-array-index-key
    /* @__PURE__ */ reactExports.createElement("li", {
      key: index,
      style: {
        width: getWidth(index, props)
      }
    })
  ));
  return /* @__PURE__ */ reactExports.createElement("ul", {
    className: clsx(prefixCls, className),
    style
  }, rowList);
};
const Title = ({
  prefixCls,
  className,
  width,
  style
}) => (
  // biome-ignore lint/a11y/useHeadingContent: HOC here
  /* @__PURE__ */ reactExports.createElement("h3", {
    className: clsx(prefixCls, className),
    style: {
      width,
      ...style
    }
  })
);
function getComponentProps(prop) {
  if (prop && typeof prop === "object") {
    return prop;
  }
  return {};
}
function getAvatarBasicProps(hasTitle, hasParagraph) {
  if (hasTitle && !hasParagraph) {
    return {
      size: "large",
      shape: "square"
    };
  }
  return {
    size: "large",
    shape: "circle"
  };
}
function getTitleBasicProps(hasAvatar, hasParagraph) {
  if (!hasAvatar && hasParagraph) {
    return {
      width: "38%"
    };
  }
  if (hasAvatar && hasParagraph) {
    return {
      width: "50%"
    };
  }
  return {};
}
function getParagraphBasicProps(hasAvatar, hasTitle) {
  const basicProps = {};
  if (!hasAvatar || !hasTitle) {
    basicProps.width = "61%";
  }
  if (!hasAvatar && hasTitle) {
    basicProps.rows = 3;
  } else {
    basicProps.rows = 2;
  }
  return basicProps;
}
const Skeleton = (props) => {
  const {
    prefixCls: customizePrefixCls,
    loading,
    className,
    rootClassName,
    classNames,
    style,
    styles,
    children,
    avatar = false,
    title = true,
    paragraph = true,
    active,
    round
  } = props;
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("skeleton");
  const prefixCls = getPrefixCls("skeleton", customizePrefixCls);
  const [hashId, cssVarCls] = useStyle$h(prefixCls);
  const mergedProps = {
    ...props,
    avatar,
    title,
    paragraph
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps
  });
  if (loading || !("loading" in props)) {
    const hasAvatar = !!avatar;
    const hasTitle = !!title;
    const hasParagraph = !!paragraph;
    let avatarNode;
    if (hasAvatar) {
      const avatarProps = {
        className: mergedClassNames.avatar,
        prefixCls: `${prefixCls}-avatar`,
        ...getAvatarBasicProps(hasTitle, hasParagraph),
        ...getComponentProps(avatar),
        style: mergedStyles.avatar
      };
      avatarNode = /* @__PURE__ */ reactExports.createElement("div", {
        className: clsx(mergedClassNames.header, `${prefixCls}-header`),
        style: mergedStyles.header
      }, /* @__PURE__ */ reactExports.createElement(Element, {
        ...avatarProps
      }));
    }
    let contentNode;
    if (hasTitle || hasParagraph) {
      let $title;
      if (hasTitle) {
        const titleProps = {
          className: mergedClassNames.title,
          prefixCls: `${prefixCls}-title`,
          ...getTitleBasicProps(hasAvatar, hasParagraph),
          ...getComponentProps(title),
          style: mergedStyles.title
        };
        $title = /* @__PURE__ */ reactExports.createElement(Title, {
          ...titleProps
        });
      }
      let paragraphNode;
      if (hasParagraph) {
        const paragraphProps = {
          className: mergedClassNames.paragraph,
          prefixCls: `${prefixCls}-paragraph`,
          ...getParagraphBasicProps(hasAvatar, hasTitle),
          ...getComponentProps(paragraph),
          style: mergedStyles.paragraph
        };
        paragraphNode = /* @__PURE__ */ reactExports.createElement(Paragraph, {
          ...paragraphProps
        });
      }
      contentNode = /* @__PURE__ */ reactExports.createElement("div", {
        className: clsx(mergedClassNames.section, `${prefixCls}-section`),
        style: mergedStyles.section
      }, $title, paragraphNode);
    }
    const cls = clsx(prefixCls, {
      [`${prefixCls}-with-avatar`]: hasAvatar,
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-rtl`]: direction === "rtl",
      [`${prefixCls}-round`]: round
    }, mergedClassNames.root, contextClassName, className, rootClassName, hashId, cssVarCls);
    return /* @__PURE__ */ reactExports.createElement("div", {
      className: cls,
      style: {
        ...mergedStyles.root,
        ...contextStyle,
        ...style
      }
    }, avatarNode, contentNode);
  }
  return children ?? null;
};
Skeleton.Button = SkeletonButton;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;
Skeleton.Node = SkeletonNode;
function voidFunc() {
}
const WatermarkContext = /* @__PURE__ */ reactExports.createContext({
  add: voidFunc,
  remove: voidFunc
});
function usePanelRef(panelSelector) {
  const watermark = reactExports.useContext(WatermarkContext);
  const panelEleRef = reactExports.useRef(null);
  const panelRef = useEvent((ele) => {
    if (ele) {
      const innerContentEle = panelSelector ? ele.querySelector(panelSelector) : ele;
      if (innerContentEle) {
        watermark.add(innerContentEle);
        panelEleRef.current = innerContentEle;
      }
    } else {
      watermark.remove(panelEleRef.current);
    }
  });
  return panelRef;
}
const NormalCancelBtn = () => {
  const {
    cancelButtonProps,
    cancelTextLocale,
    onCancel
  } = reactExports.useContext(ModalContext);
  return /* @__PURE__ */ React.createElement(Button$1, {
    onClick: onCancel,
    ...cancelButtonProps
  }, cancelTextLocale);
};
const NormalOkBtn = () => {
  const {
    confirmLoading,
    okButtonProps,
    okType,
    okTextLocale,
    onOk
  } = reactExports.useContext(ModalContext);
  return /* @__PURE__ */ React.createElement(Button$1, {
    ...convertLegacyProps(okType),
    loading: confirmLoading,
    onClick: onOk,
    ...okButtonProps
  }, okTextLocale);
};
function renderCloseIcon(prefixCls, closeIcon) {
  return /* @__PURE__ */ React.createElement("span", {
    className: `${prefixCls}-close-x`
  }, closeIcon || /* @__PURE__ */ React.createElement(RefIcon, {
    className: `${prefixCls}-close-icon`
  }));
}
const Footer$1 = (props) => {
  const {
    okText,
    okType = "primary",
    cancelText,
    confirmLoading,
    onOk,
    onCancel,
    okButtonProps,
    cancelButtonProps,
    footer
  } = props;
  const [locale2] = useLocale("Modal", getConfirmLocale());
  const okTextLocale = okText || locale2?.okText;
  const cancelTextLocale = cancelText || locale2?.cancelText;
  const memoizedValue = React.useMemo(() => {
    return {
      confirmLoading,
      okButtonProps,
      cancelButtonProps,
      okTextLocale,
      cancelTextLocale,
      okType,
      onOk,
      onCancel
    };
  }, [confirmLoading, okButtonProps, cancelButtonProps, okTextLocale, cancelTextLocale, okType, onOk, onCancel]);
  let footerNode;
  if (typeof footer === "function" || typeof footer === "undefined") {
    footerNode = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(NormalCancelBtn, null), /* @__PURE__ */ React.createElement(NormalOkBtn, null));
    if (typeof footer === "function") {
      footerNode = footer(footerNode, {
        OkBtn: NormalOkBtn,
        CancelBtn: NormalCancelBtn
      });
    }
    footerNode = /* @__PURE__ */ React.createElement(ModalContextProvider, {
      value: memoizedValue
    }, footerNode);
  } else {
    footerNode = footer;
  }
  return /* @__PURE__ */ React.createElement(DisabledContextProvider, {
    disabled: false
  }, footerNode);
};
const genGridRowStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    // Grid system
    [componentCls]: {
      display: "flex",
      flexFlow: "row wrap",
      minWidth: 0,
      "&::before, &::after": {
        display: "flex"
      },
      "&-no-wrap": {
        flexWrap: "nowrap"
      },
      // The origin of the X-axis
      "&-start": {
        justifyContent: "flex-start"
      },
      // The center of the X-axis
      "&-center": {
        justifyContent: "center"
      },
      // The opposite of the X-axis
      "&-end": {
        justifyContent: "flex-end"
      },
      "&-space-between": {
        justifyContent: "space-between"
      },
      "&-space-around": {
        justifyContent: "space-around"
      },
      "&-space-evenly": {
        justifyContent: "space-evenly"
      },
      // Align at the top
      "&-top": {
        alignItems: "flex-start"
      },
      // Align at the center
      "&-middle": {
        alignItems: "center"
      },
      "&-bottom": {
        alignItems: "flex-end"
      }
    }
  };
};
const genGridColStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    // Grid system
    [componentCls]: {
      position: "relative",
      maxWidth: "100%",
      // Prevent columns from collapsing when empty
      minHeight: 1
    }
  };
};
const genLoopGridColumnsStyle = (token, sizeCls) => {
  const {
    componentCls,
    gridColumns,
    antCls
  } = token;
  const [gridVarName, gridVarRef] = genCssVar(antCls, "grid");
  const [, colVarRef] = genCssVar(antCls, "col");
  const gridColumnsStyle = {};
  for (let i = gridColumns; i >= 0; i--) {
    if (i === 0) {
      gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = {
        display: "none"
      };
      gridColumnsStyle[`${componentCls}-push-${i}`] = {
        insetInlineStart: "auto"
      };
      gridColumnsStyle[`${componentCls}-pull-${i}`] = {
        insetInlineEnd: "auto"
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
        insetInlineStart: "auto"
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
        insetInlineEnd: "auto"
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
        marginInlineStart: 0
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
        order: 0
      };
    } else {
      gridColumnsStyle[`${componentCls}${sizeCls}-${i}`] = [
        // https://github.com/ant-design/ant-design/issues/44456
        // Form set `display: flex` on Col which will override `display: block`.
        // Let's get it from css variable to support override.
        {
          [gridVarName("display")]: "block",
          // Fallback to display if variable not support
          display: "block"
        },
        {
          display: gridVarRef("display"),
          flex: `0 0 ${i / gridColumns * 100}%`,
          maxWidth: `${i / gridColumns * 100}%`
        }
      ];
      gridColumnsStyle[`${componentCls}${sizeCls}-push-${i}`] = {
        insetInlineStart: `${i / gridColumns * 100}%`
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-pull-${i}`] = {
        insetInlineEnd: `${i / gridColumns * 100}%`
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-offset-${i}`] = {
        marginInlineStart: `${i / gridColumns * 100}%`
      };
      gridColumnsStyle[`${componentCls}${sizeCls}-order-${i}`] = {
        order: i
      };
    }
  }
  gridColumnsStyle[`${componentCls}${sizeCls}-flex`] = {
    flex: colVarRef(`${sizeCls.replace(/-/, "")}-flex`)
  };
  return gridColumnsStyle;
};
const genGridStyle = (token, sizeCls) => genLoopGridColumnsStyle(token, sizeCls);
const genGridMediaStyle = (token, screenSize, sizeCls) => ({
  [`@media (min-width: ${unit(screenSize)})`]: {
    ...genGridStyle(token, sizeCls)
  }
});
const prepareRowComponentToken = () => ({});
const prepareColComponentToken = () => ({});
const useRowStyle = genStyleHooks("Grid", genGridRowStyle, prepareRowComponentToken);
const getMediaSize = (token) => {
  const mediaSizesMap = {
    xs: token.screenXSMin,
    sm: token.screenSMMin,
    md: token.screenMDMin,
    lg: token.screenLGMin,
    xl: token.screenXLMin,
    xxl: token.screenXXLMin
  };
  return mediaSizesMap;
};
const useColStyle = genStyleHooks("Grid", (token) => {
  const gridToken = merge$1(token, {
    gridColumns: 24
    // Row is divided into 24 parts in Grid
  });
  const gridMediaSizesMap = getMediaSize(gridToken);
  delete gridMediaSizesMap.xs;
  return [genGridColStyle(gridToken), genGridStyle(gridToken, ""), genGridStyle(gridToken, "-xs"), Object.keys(gridMediaSizesMap).map((key) => genGridMediaStyle(gridToken, gridMediaSizesMap[key], `-${key}`)).reduce((pre, cur) => ({
    ...pre,
    ...cur
  }), {})];
}, prepareColComponentToken);
function box(position) {
  return {
    position,
    inset: 0
  };
}
const genModalMaskStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  return [{
    [`${componentCls}-root`]: {
      [`${componentCls}${antCls}-zoom-enter, ${componentCls}${antCls}-zoom-appear`]: {
        // reset scale avoid mousePosition bug
        transform: "none",
        opacity: 0,
        animationDuration: token.motionDurationSlow,
        // https://github.com/ant-design/ant-design/issues/11777
        userSelect: "none"
      },
      // https://github.com/ant-design/ant-design/issues/37329
      // https://github.com/ant-design/ant-design/issues/40272
      [`${componentCls}${antCls}-zoom-leave ${componentCls}-container`]: {
        pointerEvents: "none"
      },
      [`${componentCls}-mask`]: {
        ...box("fixed"),
        zIndex: token.zIndexPopupBase,
        height: "100%",
        backgroundColor: token.colorBgMask,
        pointerEvents: "none",
        [`&${componentCls}-mask-blur`]: {
          backdropFilter: "blur(4px)"
        },
        [`${componentCls}-hidden`]: {
          display: "none"
        }
      },
      [`${componentCls}-wrap`]: {
        ...box("fixed"),
        zIndex: token.zIndexPopupBase,
        overflow: "auto",
        outline: 0,
        WebkitOverflowScrolling: "touch"
      }
    }
  }, {
    [`${componentCls}-root`]: initFadeMotion(token)
  }];
};
const genModalStyle = (token) => {
  const {
    componentCls,
    motionDurationMid
  } = token;
  return [
    // ======================== Root =========================
    {
      [`${componentCls}-root`]: {
        [`${componentCls}-wrap-rtl`]: {
          direction: "rtl"
        },
        [`${componentCls}-centered`]: {
          textAlign: "center",
          "&::before": {
            display: "inline-block",
            width: 0,
            height: "100%",
            verticalAlign: "middle",
            content: '""'
          },
          [componentCls]: {
            top: 0,
            display: "inline-block",
            paddingBottom: 0,
            textAlign: "start",
            verticalAlign: "middle"
          }
        },
        [`@media (max-width: ${token.screenSMMax}px)`]: {
          [componentCls]: {
            maxWidth: "calc(100vw - 16px)",
            margin: `${unit(token.marginXS)} auto`
          },
          [`${componentCls}-centered`]: {
            [componentCls]: {
              flex: 1
            }
          }
        }
      }
    },
    // ======================== Modal ========================
    {
      [componentCls]: {
        ...resetComponent(token),
        pointerEvents: "none",
        position: "relative",
        top: 100,
        width: "auto",
        maxWidth: `calc(100vw - ${unit(token.calc(token.margin).mul(2).equal())})`,
        margin: "0 auto",
        "&:focus-visible": {
          borderRadius: token.borderRadiusLG,
          ...genFocusOutline(token)
        },
        [`${componentCls}-title`]: {
          margin: 0,
          color: token.titleColor,
          fontWeight: token.fontWeightStrong,
          fontSize: token.titleFontSize,
          lineHeight: token.titleLineHeight,
          wordWrap: "break-word"
        },
        [`${componentCls}-container`]: {
          position: "relative",
          backgroundColor: token.contentBg,
          backgroundClip: "padding-box",
          border: 0,
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadow,
          pointerEvents: "auto",
          padding: token.contentPadding
        },
        [`${componentCls}-close`]: {
          position: "absolute",
          top: token.calc(token.modalHeaderHeight).sub(token.modalCloseBtnSize).div(2).equal(),
          insetInlineEnd: token.calc(token.modalHeaderHeight).sub(token.modalCloseBtnSize).div(2).equal(),
          zIndex: token.calc(token.zIndexPopupBase).add(10).equal(),
          padding: 0,
          color: token.modalCloseIconColor,
          fontWeight: token.fontWeightStrong,
          lineHeight: 1,
          textDecoration: "none",
          background: "transparent",
          borderRadius: token.borderRadiusSM,
          width: token.modalCloseBtnSize,
          height: token.modalCloseBtnSize,
          border: 0,
          outline: 0,
          cursor: "pointer",
          transition: ["color", "background-color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
          "&-x": {
            display: "flex",
            fontSize: token.fontSizeLG,
            fontStyle: "normal",
            lineHeight: unit(token.modalCloseBtnSize),
            justifyContent: "center",
            textTransform: "none",
            textRendering: "auto"
          },
          "&:disabled": {
            pointerEvents: "none"
          },
          "&:hover": {
            color: token.modalCloseIconHoverColor,
            backgroundColor: token.colorBgTextHover,
            textDecoration: "none"
          },
          "&:active": {
            backgroundColor: token.colorBgTextActive
          },
          ...genFocusStyle(token)
        },
        [`${componentCls}-header`]: {
          color: token.colorText,
          background: token.headerBg,
          borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`,
          marginBottom: token.headerMarginBottom,
          padding: token.headerPadding,
          borderBottom: token.headerBorderBottom
        },
        [`${componentCls}-body`]: {
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          wordWrap: "break-word",
          padding: token.bodyPadding,
          [`${componentCls}-body-skeleton`]: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: `${unit(token.margin)} auto`
          }
        },
        [`${componentCls}-footer`]: {
          textAlign: "end",
          background: token.footerBg,
          marginTop: token.footerMarginTop,
          padding: token.footerPadding,
          borderTop: token.footerBorderTop,
          borderRadius: token.footerBorderRadius,
          [`> ${token.antCls}-btn + ${token.antCls}-btn`]: {
            marginInlineStart: token.marginXS
          }
        },
        [`${componentCls}-open`]: {
          overflow: "hidden"
        }
      }
    },
    // ======================== Pure =========================
    {
      [`${componentCls}-pure-panel`]: {
        top: "auto",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        [`${componentCls}-container,
          ${componentCls}-body,
          ${componentCls}-confirm-body-wrapper`]: {
          display: "flex",
          flexDirection: "column",
          flex: "auto"
        },
        [`${componentCls}-confirm-body`]: {
          marginBottom: "auto"
        }
      }
    }
  ];
};
const genRTLStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-root`]: {
      [`${componentCls}-wrap-rtl`]: {
        direction: "rtl",
        [`${componentCls}-confirm-body`]: {
          direction: "rtl"
        }
      }
    }
  };
};
const genResponsiveWidthStyle = (token) => {
  const {
    componentCls
  } = token;
  const oriGridMediaSizesMap = getMediaSize(token);
  const gridMediaSizesMap = {
    ...oriGridMediaSizesMap
  };
  delete gridMediaSizesMap.xs;
  const cssVarPrefix = `--${componentCls.replace(".", "")}-`;
  const responsiveStyles = Object.keys(gridMediaSizesMap).map((key) => ({
    [`@media (min-width: ${unit(gridMediaSizesMap[key])})`]: {
      width: `var(${cssVarPrefix}${key}-width)`
    }
  }));
  return {
    [`${componentCls}-root`]: {
      [componentCls]: [].concat(_toConsumableArray(Object.keys(oriGridMediaSizesMap).map((currentKey, index) => {
        const previousKey = Object.keys(oriGridMediaSizesMap)[index - 1];
        return previousKey ? {
          [`${cssVarPrefix}${currentKey}-width`]: `var(${cssVarPrefix}${previousKey}-width)`
        } : null;
      })), [{
        width: `var(${cssVarPrefix}xs-width)`
      }], _toConsumableArray(responsiveStyles))
    }
  };
};
const prepareToken$2 = (token) => {
  const headerPaddingVertical = token.padding;
  const headerFontSize = token.fontSizeHeading5;
  const headerLineHeight = token.lineHeightHeading5;
  const modalToken = merge$1(token, {
    modalHeaderHeight: token.calc(token.calc(headerLineHeight).mul(headerFontSize).equal()).add(token.calc(headerPaddingVertical).mul(2).equal()).equal(),
    modalFooterBorderColorSplit: token.colorSplit,
    modalFooterBorderStyle: token.lineType,
    modalFooterBorderWidth: token.lineWidth,
    modalCloseIconColor: token.colorIcon,
    modalCloseIconHoverColor: token.colorIconHover,
    modalCloseBtnSize: token.controlHeight,
    modalConfirmIconSize: token.fontHeight,
    modalTitleHeight: token.calc(token.titleFontSize).mul(token.titleLineHeight).equal()
  });
  return modalToken;
};
const prepareComponentToken$9 = (token) => ({
  footerBg: "transparent",
  headerBg: "transparent",
  titleLineHeight: token.lineHeightHeading5,
  titleFontSize: token.fontSizeHeading5,
  contentBg: token.colorBgElevated,
  titleColor: token.colorTextHeading,
  // internal
  contentPadding: token.wireframe ? 0 : `${unit(token.paddingMD)} ${unit(token.paddingContentHorizontalLG)}`,
  headerPadding: token.wireframe ? `${unit(token.padding)} ${unit(token.paddingLG)}` : 0,
  headerBorderBottom: token.wireframe ? `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}` : "none",
  headerMarginBottom: token.wireframe ? 0 : token.marginXS,
  bodyPadding: token.wireframe ? token.paddingLG : 0,
  footerPadding: token.wireframe ? `${unit(token.paddingXS)} ${unit(token.padding)}` : 0,
  footerBorderTop: token.wireframe ? `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}` : "none",
  footerBorderRadius: token.wireframe ? `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}` : 0,
  footerMarginTop: token.wireframe ? 0 : token.marginSM,
  confirmBodyPadding: token.wireframe ? `${unit(token.padding * 2)} ${unit(token.padding * 2)} ${unit(token.paddingLG)}` : 0,
  confirmIconMarginInlineEnd: token.wireframe ? token.margin : token.marginSM,
  confirmBtnsMarginTop: token.wireframe ? token.marginLG : token.marginSM,
  mask: true
});
const useStyle$g = genStyleHooks("Modal", (token) => {
  const modalToken = prepareToken$2(token);
  return [genModalStyle(modalToken), genRTLStyle(modalToken), genModalMaskStyle(modalToken), initZoomMotion(modalToken, "zoom"), genResponsiveWidthStyle(modalToken)];
}, prepareComponentToken$9, {
  unitless: {
    titleLineHeight: true
  }
});
let mousePosition;
const getClickPosition = (e2) => {
  mousePosition = {
    x: e2.pageX,
    y: e2.pageY
  };
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};
if (canUseDocElement()) {
  document.documentElement.addEventListener("click", getClickPosition, true);
}
const Modal$1 = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    open: open2,
    wrapClassName,
    centered,
    getContainer,
    style,
    width = 520,
    footer,
    classNames,
    styles,
    children,
    loading,
    confirmLoading,
    zIndex: customizeZIndex,
    mousePosition: customizeMousePosition,
    onOk,
    onCancel,
    okButtonProps,
    cancelButtonProps,
    destroyOnHidden,
    destroyOnClose,
    panelRef = null,
    closable,
    mask: modalMask,
    modalRender,
    maskClosable,
    // Focusable
    focusTriggerAfterClose,
    focusable,
    ...restProps
  } = props;
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    centered: contextCentered,
    cancelButtonProps: contextCancelButtonProps,
    okButtonProps: contextOkButtonProps,
    mask: contextMask
  } = useComponentConfig("modal");
  const {
    modal: modalContext
  } = reactExports.useContext(ConfigContext);
  const [closableAfterClose, onClose] = reactExports.useMemo(() => {
    if (typeof closable === "boolean") {
      return [void 0, void 0];
    }
    return [closable?.afterClose, closable?.onClose];
  }, [closable]);
  const prefixCls = getPrefixCls("modal", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [mergedMask, maskBlurClassName, mergeMaskClosable] = useMergedMask(modalMask, contextMask, prefixCls, maskClosable);
  const mergedFocusable = useFocusable(focusable, mergedMask, focusTriggerAfterClose);
  const handleCancel = (e2) => {
    if (confirmLoading) {
      return;
    }
    onCancel?.(e2);
    onClose?.();
  };
  const handleOk = (e2) => {
    onOk?.(e2);
    onClose?.();
  };
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle$g(prefixCls, rootCls);
  const wrapClassNameExtended = clsx(wrapClassName, {
    [`${prefixCls}-centered`]: centered ?? contextCentered,
    [`${prefixCls}-wrap-rtl`]: direction === "rtl"
  });
  const dialogFooter = footer !== null && !loading ? /* @__PURE__ */ reactExports.createElement(Footer$1, {
    ...props,
    okButtonProps: {
      ...contextOkButtonProps,
      ...okButtonProps
    },
    onOk: handleOk,
    cancelButtonProps: {
      ...contextCancelButtonProps,
      ...cancelButtonProps
    },
    onCancel: handleCancel
  }) : null;
  const [rawClosable, mergedCloseIcon, closeBtnIsDisabled, ariaProps] = useClosable(pickClosable(props), pickClosable(modalContext), {
    closable: true,
    closeIcon: /* @__PURE__ */ reactExports.createElement(RefIcon, {
      className: `${prefixCls}-close-icon`
    }),
    closeIconRender: (icon) => renderCloseIcon(prefixCls, icon)
  });
  const mergedClosable = rawClosable ? {
    disabled: closeBtnIsDisabled,
    closeIcon: mergedCloseIcon,
    afterClose: closableAfterClose,
    ...ariaProps
  } : false;
  const mergedModalRender = modalRender ? (node) => /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-render`
  }, modalRender(node)) : void 0;
  const panelClassName = `.${prefixCls}-${modalRender ? "render" : "container"}`;
  const innerPanelRef = usePanelRef(panelClassName);
  const mergedPanelRef = composeRef(panelRef, innerPanelRef);
  const [zIndex, contextZIndex] = useZIndex("Modal", customizeZIndex);
  const mergedProps = {
    ...props,
    width,
    panelRef,
    focusTriggerAfterClose: mergedFocusable.focusTriggerAfterClose,
    focusable: mergedFocusable,
    mask: mergedMask,
    maskClosable: mergeMaskClosable,
    zIndex
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames, maskBlurClassName], [contextStyles, styles], {
    props: mergedProps
  });
  const [numWidth, responsiveWidth] = reactExports.useMemo(() => {
    if (width && typeof width === "object") {
      return [void 0, width];
    }
    return [width, void 0];
  }, [width]);
  const responsiveWidthVars = reactExports.useMemo(() => {
    const vars = {};
    if (responsiveWidth) {
      Object.keys(responsiveWidth).forEach((breakpoint) => {
        const breakpointWidth = responsiveWidth[breakpoint];
        if (breakpointWidth !== void 0) {
          vars[`--${prefixCls}-${breakpoint}-width`] = typeof breakpointWidth === "number" ? `${breakpointWidth}px` : breakpointWidth;
        }
      });
    }
    return vars;
  }, [prefixCls, responsiveWidth]);
  return /* @__PURE__ */ reactExports.createElement(ContextIsolator, {
    form: true,
    space: true
  }, /* @__PURE__ */ reactExports.createElement(ZIndexContext.Provider, {
    value: contextZIndex
  }, /* @__PURE__ */ reactExports.createElement(DialogWrap, {
    width: numWidth,
    ...restProps,
    zIndex,
    getContainer: getContainer === void 0 ? getContextPopupContainer : getContainer,
    prefixCls,
    rootClassName: clsx(hashId, rootClassName, cssVarCls, rootCls, mergedClassNames.root),
    rootStyle: mergedStyles.root,
    footer: dialogFooter,
    visible: open2,
    mousePosition: customizeMousePosition ?? mousePosition,
    onClose: handleCancel,
    closable: mergedClosable,
    closeIcon: mergedCloseIcon,
    transitionName: getTransitionName(rootPrefixCls, "zoom", props.transitionName),
    maskTransitionName: getTransitionName(rootPrefixCls, "fade", props.maskTransitionName),
    mask: mergedMask,
    maskClosable: mergeMaskClosable,
    className: clsx(hashId, className, contextClassName),
    style: {
      ...contextStyle,
      ...style,
      ...responsiveWidthVars
    },
    classNames: {
      ...mergedClassNames,
      wrapper: clsx(mergedClassNames.wrapper, wrapClassNameExtended)
    },
    styles: mergedStyles,
    panelRef: mergedPanelRef,
    destroyOnHidden: destroyOnHidden ?? destroyOnClose,
    modalRender: mergedModalRender,
    // Focusable
    focusTriggerAfterClose: mergedFocusable.focusTriggerAfterClose,
    focusTrap: mergedFocusable.trap
  }, loading ? /* @__PURE__ */ reactExports.createElement(Skeleton, {
    active: true,
    title: false,
    paragraph: {
      rows: 4
    },
    className: `${prefixCls}-body-skeleton`
  }) : children)));
};
const genModalConfirmStyle = (token) => {
  const {
    componentCls,
    titleFontSize,
    titleLineHeight,
    modalConfirmIconSize,
    fontSize,
    lineHeight,
    modalTitleHeight,
    fontHeight,
    confirmBodyPadding
  } = token;
  const confirmComponentCls = `${componentCls}-confirm`;
  return {
    [confirmComponentCls]: {
      "&-rtl": {
        direction: "rtl"
      },
      [`${token.antCls}-modal-header`]: {
        display: "none"
      },
      [`${confirmComponentCls}-body-wrapper`]: {
        ...clearFix()
      },
      [`&${componentCls} ${componentCls}-body`]: {
        padding: confirmBodyPadding
      },
      // ====================== Body ======================
      [`${confirmComponentCls}-body`]: {
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "start",
        [`> ${token.iconCls}`]: {
          flex: "none",
          fontSize: modalConfirmIconSize,
          marginInlineEnd: token.confirmIconMarginInlineEnd,
          marginTop: token.calc(token.calc(fontHeight).sub(modalConfirmIconSize).equal()).div(2).equal()
        },
        [`&-has-title > ${token.iconCls}`]: {
          marginTop: token.calc(token.calc(modalTitleHeight).sub(modalConfirmIconSize).equal()).div(2).equal()
        }
      },
      [`${confirmComponentCls}-paragraph`]: {
        display: "flex",
        flexDirection: "column",
        flex: "auto",
        rowGap: token.marginXS,
        // https://github.com/ant-design/ant-design/issues/51912
        maxWidth: `calc(100% - ${unit(token.marginSM)})`
      },
      // https://github.com/ant-design/ant-design/issues/48159
      [`${token.iconCls} + ${confirmComponentCls}-paragraph`]: {
        maxWidth: `calc(100% - ${unit(token.calc(token.modalConfirmIconSize).add(token.marginSM).equal())})`
      },
      [`${confirmComponentCls}-title`]: {
        color: token.colorTextHeading,
        fontWeight: token.fontWeightStrong,
        fontSize: titleFontSize,
        lineHeight: titleLineHeight
      },
      [`${confirmComponentCls}-container`]: {
        color: token.colorText,
        fontSize,
        lineHeight
      },
      // ===================== Footer =====================
      [`${confirmComponentCls}-btns`]: {
        textAlign: "end",
        marginTop: token.confirmBtnsMarginTop,
        [`${token.antCls}-btn + ${token.antCls}-btn`]: {
          marginBottom: 0,
          marginInlineStart: token.marginXS
        }
      }
    },
    [`${confirmComponentCls}-error ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorError
    },
    [`${confirmComponentCls}-warning ${confirmComponentCls}-body > ${token.iconCls},
        ${confirmComponentCls}-confirm ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorWarning
    },
    [`${confirmComponentCls}-info ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorInfo
    },
    [`${confirmComponentCls}-success ${confirmComponentCls}-body > ${token.iconCls}`]: {
      color: token.colorSuccess
    }
  };
};
const Confirm = genSubStyleComponent(["Modal", "confirm"], (token) => {
  const modalToken = prepareToken$2(token);
  return genModalConfirmStyle(modalToken);
}, prepareComponentToken$9, {
  // confirm is weak than modal since no conflict here
  order: -1e3
});
const ConfirmContent = (props) => {
  const {
    prefixCls,
    icon,
    okText,
    cancelText,
    confirmPrefixCls,
    type,
    okCancel,
    footer,
    // Legacy for static function usage
    locale: staticLocale,
    autoFocusButton,
    focusable,
    ...restProps
  } = props;
  let mergedIcon = icon;
  if (!icon && icon !== null) {
    switch (type) {
      case "info":
        mergedIcon = /* @__PURE__ */ reactExports.createElement(RefIcon$5, null);
        break;
      case "success":
        mergedIcon = /* @__PURE__ */ reactExports.createElement(RefIcon$4, null);
        break;
      case "error":
        mergedIcon = /* @__PURE__ */ reactExports.createElement(RefIcon$3, null);
        break;
      default:
        mergedIcon = /* @__PURE__ */ reactExports.createElement(RefIcon$2, null);
    }
  }
  const mergedOkCancel = okCancel ?? type === "confirm";
  const mergedAutoFocusButton = reactExports.useMemo(() => {
    const base = focusable?.autoFocusButton || autoFocusButton;
    return base || base === null ? base : "ok";
  }, [autoFocusButton, focusable?.autoFocusButton]);
  const [locale2] = useLocale("Modal");
  const mergedLocale = staticLocale || locale2;
  const okTextLocale = okText || (mergedOkCancel ? mergedLocale?.okText : mergedLocale?.justOkText);
  const cancelTextLocale = cancelText || mergedLocale?.cancelText;
  const {
    closable
  } = restProps;
  const {
    onClose
  } = closable && typeof closable === "object" ? closable : {};
  const memoizedValue = reactExports.useMemo(() => {
    return {
      autoFocusButton: mergedAutoFocusButton,
      cancelTextLocale,
      okTextLocale,
      mergedOkCancel,
      onClose,
      ...restProps
    };
  }, [mergedAutoFocusButton, cancelTextLocale, okTextLocale, mergedOkCancel, onClose, restProps]);
  const footerOriginNode = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ConfirmCancelBtn, null), /* @__PURE__ */ reactExports.createElement(ConfirmOkBtn, null));
  const hasTitle = props.title !== void 0 && props.title !== null;
  const bodyCls = `${confirmPrefixCls}-body`;
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: `${confirmPrefixCls}-body-wrapper`
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(bodyCls, {
      [`${bodyCls}-has-title`]: hasTitle
    })
  }, mergedIcon, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${confirmPrefixCls}-paragraph`
  }, hasTitle && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${confirmPrefixCls}-title`
  }, props.title), /* @__PURE__ */ reactExports.createElement("div", {
    className: `${confirmPrefixCls}-content`
  }, props.content))), footer === void 0 || typeof footer === "function" ? /* @__PURE__ */ reactExports.createElement(ModalContextProvider, {
    value: memoizedValue
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${confirmPrefixCls}-btns`
  }, typeof footer === "function" ? footer(footerOriginNode, {
    OkBtn: ConfirmOkBtn,
    CancelBtn: ConfirmCancelBtn
  }) : footerOriginNode)) : footer, /* @__PURE__ */ reactExports.createElement(Confirm, {
    prefixCls
  }));
};
const ConfirmDialog = (props) => {
  const {
    close,
    zIndex,
    maskStyle,
    direction,
    prefixCls,
    wrapClassName,
    rootPrefixCls,
    bodyStyle,
    closable = false,
    onConfirm,
    styles,
    title,
    mask,
    maskClosable,
    okButtonProps,
    cancelButtonProps
  } = props;
  const {
    cancelButtonProps: contextCancelButtonProps,
    okButtonProps: contextOkButtonProps
  } = useComponentConfig("modal");
  const confirmPrefixCls = `${prefixCls}-confirm`;
  const width = props.width || 416;
  const style = props.style || {};
  const classString = clsx(confirmPrefixCls, `${confirmPrefixCls}-${props.type}`, {
    [`${confirmPrefixCls}-rtl`]: direction === "rtl"
  }, props.className);
  const mergedMask = reactExports.useMemo(() => {
    const nextMaskConfig = normalizeMaskConfig(mask, maskClosable);
    nextMaskConfig.closable ?? (nextMaskConfig.closable = false);
    return nextMaskConfig;
  }, [mask, maskClosable]);
  const [, token] = useToken();
  const mergedZIndex = reactExports.useMemo(() => {
    if (zIndex !== void 0) {
      return zIndex;
    }
    return token.zIndexPopupBase + CONTAINER_MAX_OFFSET;
  }, [zIndex, token]);
  return /* @__PURE__ */ reactExports.createElement(Modal$1, {
    ...props,
    className: classString,
    wrapClassName: clsx({
      [`${confirmPrefixCls}-centered`]: !!props.centered
    }, wrapClassName),
    onCancel: () => {
      close?.({
        triggerCancel: true
      });
      onConfirm?.(false);
    },
    title,
    footer: null,
    transitionName: getTransitionName(rootPrefixCls || "", "zoom", props.transitionName),
    maskTransitionName: getTransitionName(rootPrefixCls || "", "fade", props.maskTransitionName),
    mask: mergedMask,
    style,
    styles: {
      body: bodyStyle,
      mask: maskStyle,
      ...styles
    },
    width,
    zIndex: mergedZIndex,
    closable
  }, /* @__PURE__ */ reactExports.createElement(ConfirmContent, {
    ...props,
    confirmPrefixCls,
    okButtonProps: {
      ...contextOkButtonProps,
      ...okButtonProps
    },
    cancelButtonProps: {
      ...contextCancelButtonProps,
      ...cancelButtonProps
    }
  }));
};
const ConfirmDialogWrapper$1 = (props) => {
  const {
    rootPrefixCls,
    iconPrefixCls,
    direction,
    theme
  } = props;
  return /* @__PURE__ */ reactExports.createElement(ConfigProvider, {
    prefixCls: rootPrefixCls,
    iconPrefixCls,
    direction,
    theme
  }, /* @__PURE__ */ reactExports.createElement(ConfirmDialog, {
    ...props
  }));
};
const destroyFns = [];
let defaultRootPrefixCls = "";
function getRootPrefixCls() {
  return defaultRootPrefixCls;
}
const ConfirmDialogWrapper = (props) => {
  const {
    prefixCls: customizePrefixCls,
    getContainer,
    direction
  } = props;
  const runtimeLocale2 = getConfirmLocale();
  const config = reactExports.useContext(ConfigContext);
  const rootPrefixCls = getRootPrefixCls() || config.getPrefixCls();
  const prefixCls = customizePrefixCls || `${rootPrefixCls}-modal`;
  let mergedGetContainer = getContainer;
  if (mergedGetContainer === false) {
    mergedGetContainer = void 0;
  }
  return /* @__PURE__ */ React.createElement(ConfirmDialogWrapper$1, {
    ...props,
    rootPrefixCls,
    prefixCls,
    iconPrefixCls: config.iconPrefixCls,
    theme: config.theme,
    direction: direction ?? config.direction,
    locale: config.locale?.Modal ?? runtimeLocale2,
    getContainer: mergedGetContainer
  });
};
function confirm(config) {
  const global = globalConfig();
  const container = document.createDocumentFragment();
  let currentConfig = {
    ...config,
    close,
    open: true
  };
  let timeoutId;
  function destroy2(...args) {
    const triggerCancel = args.some((param) => param?.triggerCancel);
    if (triggerCancel) {
      config.onCancel?.(() => {
      }, ...args.slice(1));
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
    unmount(container).then(() => {
    });
  }
  const scheduleRender = (props) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const rootPrefixCls = global.getPrefixCls(void 0, getRootPrefixCls());
      const iconPrefixCls = global.getIconPrefixCls();
      const theme = global.getTheme();
      const dom = /* @__PURE__ */ React.createElement(ConfirmDialogWrapper, {
        ...props
      });
      render(/* @__PURE__ */ React.createElement(ConfigProvider, {
        prefixCls: rootPrefixCls,
        iconPrefixCls,
        theme
      }, typeof global.holderRender === "function" ? global.holderRender(dom) : dom), container);
    });
  };
  function close(...args) {
    currentConfig = {
      ...currentConfig,
      open: false,
      afterClose: () => {
        if (typeof config.afterClose === "function") {
          config.afterClose();
        }
        destroy2.apply(this, args);
      }
    };
    scheduleRender(currentConfig);
  }
  function update(configUpdate) {
    if (typeof configUpdate === "function") {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate
      };
    }
    scheduleRender(currentConfig);
  }
  scheduleRender(currentConfig);
  destroyFns.push(close);
  return {
    destroy: close,
    update
  };
}
function withWarn(props) {
  return {
    ...props,
    type: "warning"
  };
}
function withInfo(props) {
  return {
    ...props,
    type: "info"
  };
}
function withSuccess(props) {
  return {
    ...props,
    type: "success"
  };
}
function withError(props) {
  return {
    ...props,
    type: "error"
  };
}
function withConfirm(props) {
  return {
    ...props,
    type: "confirm"
  };
}
function modalGlobalConfig({
  rootPrefixCls
}) {
  defaultRootPrefixCls = rootPrefixCls;
}
const HookModal = ({
  afterClose: hookAfterClose,
  config,
  ...restProps
}, ref) => {
  const [open2, setOpen] = reactExports.useState(true);
  const [innerConfig, setInnerConfig] = reactExports.useState(config);
  const {
    direction,
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("modal");
  const rootPrefixCls = getPrefixCls();
  const afterClose = () => {
    hookAfterClose();
    innerConfig.afterClose?.();
  };
  const close = (...args) => {
    setOpen(false);
    const triggerCancel = args.some((param) => param?.triggerCancel);
    if (triggerCancel) {
      innerConfig.onCancel?.(() => {
      }, ...args.slice(1));
    }
  };
  reactExports.useImperativeHandle(ref, () => ({
    destroy: close,
    update: (newConfig) => {
      setInnerConfig((originConfig) => {
        const nextConfig = typeof newConfig === "function" ? newConfig(originConfig) : newConfig;
        return {
          ...originConfig,
          ...nextConfig
        };
      });
    }
  }));
  const mergedOkCancel = innerConfig.okCancel ?? innerConfig.type === "confirm";
  const [contextLocale] = useLocale("Modal", localeValues.Modal);
  return /* @__PURE__ */ reactExports.createElement(ConfirmDialogWrapper$1, {
    prefixCls,
    rootPrefixCls,
    ...innerConfig,
    close,
    open: open2,
    afterClose,
    okText: innerConfig.okText || (mergedOkCancel ? contextLocale?.okText : contextLocale?.justOkText),
    direction: innerConfig.direction || direction,
    cancelText: innerConfig.cancelText || contextLocale?.cancelText,
    ...restProps
  });
};
const HookModal$1 = /* @__PURE__ */ reactExports.forwardRef(HookModal);
let uuid = 0;
const ElementsHolder = /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef((_props, ref) => {
  const [elements, patchElement] = usePatchElement();
  reactExports.useImperativeHandle(ref, () => ({
    patchElement
  }), [patchElement]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, elements);
}));
function useModal() {
  const holderRef = reactExports.useRef(null);
  const [actionQueue, setActionQueue] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (actionQueue.length) {
      const cloneQueue = _toConsumableArray(actionQueue);
      cloneQueue.forEach((action) => {
        action();
      });
      setActionQueue([]);
    }
  }, [actionQueue]);
  const getConfirmFunc = reactExports.useCallback((withFunc) => function hookConfirm(config) {
    uuid += 1;
    const modalRef = /* @__PURE__ */ reactExports.createRef();
    let resolvePromise;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    let silent = false;
    let closeFunc;
    const modal = /* @__PURE__ */ reactExports.createElement(HookModal$1, {
      key: `modal-${uuid}`,
      config: withFunc(config),
      ref: modalRef,
      afterClose: () => {
        closeFunc?.();
      },
      isSilent: () => silent,
      onConfirm: (confirmed) => {
        resolvePromise(confirmed);
      }
    });
    closeFunc = holderRef.current?.patchElement(modal);
    if (closeFunc) {
      destroyFns.push(closeFunc);
    }
    const instance = {
      destroy: () => {
        function destroyAction() {
          modalRef.current?.destroy();
        }
        if (modalRef.current) {
          destroyAction();
        } else {
          setActionQueue((prev) => [].concat(_toConsumableArray(prev), [destroyAction]));
        }
      },
      update: (newConfig) => {
        function updateAction() {
          modalRef.current?.update(newConfig);
        }
        if (modalRef.current) {
          updateAction();
        } else {
          setActionQueue((prev) => [].concat(_toConsumableArray(prev), [updateAction]));
        }
      },
      then: (resolve) => {
        silent = true;
        return promise.then(resolve);
      }
    };
    return instance;
  }, []);
  const fns = reactExports.useMemo(() => ({
    info: getConfirmFunc(withInfo),
    success: getConfirmFunc(withSuccess),
    error: getConfirmFunc(withError),
    warning: getConfirmFunc(withWarn),
    confirm: getConfirmFunc(withConfirm)
  }), [getConfirmFunc]);
  return [fns, /* @__PURE__ */ reactExports.createElement(ElementsHolder, {
    key: "modal-holder",
    ref: holderRef
  })];
}
const AppConfigContext = /* @__PURE__ */ React.createContext({});
function withPureRenderTheme(Component) {
  return (props) => /* @__PURE__ */ reactExports.createElement(ConfigProvider, {
    theme: {
      token: {
        motion: false,
        zIndexPopupBase: 0
      }
    }
  }, /* @__PURE__ */ reactExports.createElement(Component, {
    ...props
  }));
}
const genPurePanel = (Component, alignPropName, postProps, defaultPrefixCls2, getDropdownCls) => {
  const PurePanel2 = (props) => {
    const {
      prefixCls: customizePrefixCls,
      style
    } = props;
    const holderRef = reactExports.useRef(null);
    const [popupHeight, setPopupHeight] = reactExports.useState(0);
    const [popupWidth, setPopupWidth] = reactExports.useState(0);
    const [open2, setOpen] = useControlledState(false, props.open);
    const {
      getPrefixCls
    } = reactExports.useContext(ConfigContext);
    const prefixCls = getPrefixCls("select", customizePrefixCls);
    reactExports.useEffect(() => {
      setOpen(true);
      if (typeof ResizeObserver !== "undefined") {
        const resizeObserver = new ResizeObserver((entries) => {
          const element = entries[0].target;
          setPopupHeight(element.offsetHeight + 8);
          setPopupWidth(element.offsetWidth);
        });
        const interval = setInterval(() => {
          const dropdownCls = `.${prefixCls}-dropdown`;
          const popup = holderRef.current?.querySelector(dropdownCls);
          if (popup) {
            clearInterval(interval);
            resizeObserver.observe(popup);
          }
        }, 10);
        return () => {
          clearInterval(interval);
          resizeObserver.disconnect();
        };
      }
    }, [prefixCls]);
    let mergedProps = {
      ...props,
      style: {
        ...style,
        margin: 0
      },
      open: open2,
      getPopupContainer: () => holderRef.current
    };
    {
      Object.assign(mergedProps, {
        [alignPropName]: {
          overflow: {
            adjustX: false,
            adjustY: false
          }
        }
      });
    }
    const mergedStyle = {
      paddingBottom: popupHeight,
      position: "relative",
      minWidth: popupWidth
    };
    return /* @__PURE__ */ reactExports.createElement("div", {
      ref: holderRef,
      style: mergedStyle
    }, /* @__PURE__ */ reactExports.createElement(Component, {
      ...mergedProps
    }));
  };
  return withPureRenderTheme(PurePanel2);
};
const getStatusClassNames = (prefixCls, status, hasFeedback) => {
  return clsx({
    [`${prefixCls}-status-success`]: status === "success",
    [`${prefixCls}-status-warning`]: status === "warning",
    [`${prefixCls}-status-error`]: status === "error",
    [`${prefixCls}-status-validating`]: status === "validating",
    [`${prefixCls}-has-feedback`]: hasFeedback
  });
};
const getMergedStatus = (contextStatus, customStatus) => customStatus || contextStatus;
const Empty$1 = () => {
  const [, token] = useToken();
  const [locale2] = useLocale("Empty");
  const bgColor = new FastColor(token.colorBgBase);
  const themeStyle = bgColor.toHsl().l < 0.5 ? {
    opacity: 0.65
  } : {};
  return /* @__PURE__ */ reactExports.createElement("svg", {
    style: themeStyle,
    width: "184",
    height: "152",
    viewBox: "0 0 184 152",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ reactExports.createElement("title", null, locale2?.description || "Empty"), /* @__PURE__ */ reactExports.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ reactExports.createElement("g", {
    transform: "translate(24 31.7)"
  }, /* @__PURE__ */ reactExports.createElement("ellipse", {
    fillOpacity: ".8",
    fill: "#F5F5F7",
    cx: "67.8",
    cy: "106.9",
    rx: "67.8",
    ry: "12.7"
  }), /* @__PURE__ */ reactExports.createElement("path", {
    fill: "#aeb8c2",
    d: "M122 69.7 98.1 40.2a6 6 0 0 0-4.6-2.2H42.1a6 6 0 0 0-4.6 2.2l-24 29.5V85H122z"
  }), /* @__PURE__ */ reactExports.createElement("path", {
    fill: "#f5f5f7",
    d: "M33.8 0h68a4 4 0 0 1 4 4v93.3a4 4 0 0 1-4 4h-68a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4"
  }), /* @__PURE__ */ reactExports.createElement("path", {
    fill: "#dce0e6",
    d: "M42.7 10h50.2a2 2 0 0 1 2 2v25a2 2 0 0 1-2 2H42.7a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2m.2 39.8h49.8a2.3 2.3 0 1 1 0 4.5H42.9a2.3 2.3 0 0 1 0-4.5m0 11.7h49.8a2.3 2.3 0 1 1 0 4.6H42.9a2.3 2.3 0 0 1 0-4.6m79 43.5a7 7 0 0 1-6.8 5.4H20.5a7 7 0 0 1-6.7-5.4l-.2-1.8V69.7h26.3c2.9 0 5.2 2.4 5.2 5.4s2.4 5.4 5.3 5.4h34.8c2.9 0 5.3-2.4 5.3-5.4s2.3-5.4 5.2-5.4H122v33.5q0 1-.2 1.8"
  })), /* @__PURE__ */ reactExports.createElement("path", {
    fill: "#dce0e6",
    d: "m149.1 33.3-6.8 2.6a1 1 0 0 1-1.3-1.2l2-6.2q-4.1-4.5-4.2-10.4c0-10 10.1-18.1 22.6-18.1S184 8.1 184 18.1s-10.1 18-22.6 18q-6.8 0-12.3-2.8"
  }), /* @__PURE__ */ reactExports.createElement("g", {
    fill: "#fff",
    transform: "translate(149.7 15.4)"
  }, /* @__PURE__ */ reactExports.createElement("circle", {
    cx: "20.7",
    cy: "3.2",
    r: "2.8"
  }), /* @__PURE__ */ reactExports.createElement("path", {
    d: "M5.7 5.6H0L2.9.7zM9.3.7h5v5h-5z"
  }))));
};
const Simple = () => {
  const [, token] = useToken();
  const [locale2] = useLocale("Empty");
  const {
    colorFill,
    colorFillTertiary,
    colorFillQuaternary,
    colorBgContainer
  } = token;
  const {
    borderColor,
    shadowColor,
    contentColor
  } = reactExports.useMemo(() => ({
    borderColor: new FastColor(colorFill).onBackground(colorBgContainer).toHexString(),
    shadowColor: new FastColor(colorFillTertiary).onBackground(colorBgContainer).toHexString(),
    contentColor: new FastColor(colorFillQuaternary).onBackground(colorBgContainer).toHexString()
  }), [colorFill, colorFillTertiary, colorFillQuaternary, colorBgContainer]);
  return /* @__PURE__ */ reactExports.createElement("svg", {
    width: "64",
    height: "41",
    viewBox: "0 0 64 41",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ reactExports.createElement("title", null, locale2?.description || "Empty"), /* @__PURE__ */ reactExports.createElement("g", {
    transform: "translate(0 1)",
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ reactExports.createElement("ellipse", {
    fill: shadowColor,
    cx: "32",
    cy: "33",
    rx: "32",
    ry: "7"
  }), /* @__PURE__ */ reactExports.createElement("g", {
    fillRule: "nonzero",
    stroke: borderColor
  }, /* @__PURE__ */ reactExports.createElement("path", {
    d: "M55 12.8 44.9 1.3Q44 0 42.9 0H21.1q-1.2 0-2 1.3L9 12.8V22h46z"
  }), /* @__PURE__ */ reactExports.createElement("path", {
    d: "M41.6 16c0-1.7 1-3 2.2-3H55v18.1c0 2.2-1.3 3.9-3 3.9H12c-1.7 0-3-1.7-3-3.9V13h11.2c1.2 0 2.2 1.3 2.2 3s1 2.9 2.2 2.9h14.8c1.2 0 2.2-1.4 2.2-3",
    fill: contentColor
  }))));
};
const genSharedEmptyStyle = (token) => {
  const {
    componentCls,
    margin,
    marginXS,
    marginXL,
    fontSize,
    lineHeight
  } = token;
  return {
    [componentCls]: {
      marginInline: marginXS,
      fontSize,
      lineHeight,
      textAlign: "center",
      // 原来 &-image 没有父子结构，现在为了外层承担我们的 hashId，改成父子结构
      [`${componentCls}-image`]: {
        height: token.emptyImgHeight,
        marginBottom: marginXS,
        opacity: token.opacityImage,
        img: {
          height: "100%"
        },
        svg: {
          maxWidth: "100%",
          height: "100%",
          margin: "auto"
        }
      },
      [`${componentCls}-description`]: {
        color: token.colorTextDescription
      },
      // 原来 &-footer 没有父子结构，现在为了外层承担我们的 hashId，改成父子结构
      [`${componentCls}-footer`]: {
        marginTop: margin
      },
      "&-normal": {
        marginBlock: marginXL,
        color: token.colorTextDescription,
        [`${componentCls}-description`]: {
          color: token.colorTextDescription
        },
        [`${componentCls}-image`]: {
          height: token.emptyImgHeightMD
        }
      },
      "&-small": {
        marginBlock: marginXS,
        color: token.colorTextDescription,
        [`${componentCls}-image`]: {
          height: token.emptyImgHeightSM
        }
      }
    }
  };
};
const useStyle$f = genStyleHooks("Empty", (token) => {
  const {
    componentCls,
    controlHeightLG,
    calc
  } = token;
  const emptyToken = merge$1(token, {
    emptyImgCls: `${componentCls}-img`,
    emptyImgHeight: calc(controlHeightLG).mul(2.5).equal(),
    emptyImgHeightMD: controlHeightLG,
    emptyImgHeightSM: calc(controlHeightLG).mul(0.875).equal()
  });
  return genSharedEmptyStyle(emptyToken);
});
const defaultEmptyImg = /* @__PURE__ */ reactExports.createElement(Empty$1, null);
const simpleEmptyImg = /* @__PURE__ */ reactExports.createElement(Simple, null);
const Empty = (props) => {
  const {
    className,
    rootClassName,
    prefixCls: customizePrefixCls,
    image,
    description,
    children,
    imageStyle,
    style,
    classNames,
    styles,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    image: contextImage
  } = useComponentConfig("empty");
  const prefixCls = getPrefixCls("empty", customizePrefixCls);
  const [hashId, cssVarCls] = useStyle$f(prefixCls);
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props
  });
  const [locale2] = useLocale("Empty");
  const des = typeof description !== "undefined" ? description : locale2?.description;
  const alt = typeof des === "string" ? des : "empty";
  const mergedImage = image ?? contextImage ?? defaultEmptyImg;
  let imageNode = null;
  if (typeof mergedImage === "string") {
    imageNode = /* @__PURE__ */ reactExports.createElement("img", {
      draggable: false,
      alt,
      src: mergedImage
    });
  } else {
    imageNode = mergedImage;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(hashId, cssVarCls, prefixCls, contextClassName, {
      [`${prefixCls}-normal`]: mergedImage === simpleEmptyImg,
      [`${prefixCls}-rtl`]: direction === "rtl"
    }, className, rootClassName, mergedClassNames.root),
    style: {
      ...mergedStyles.root,
      ...contextStyle,
      ...style
    },
    ...restProps
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(`${prefixCls}-image`, mergedClassNames.image),
    style: {
      ...imageStyle,
      ...mergedStyles.image
    }
  }, imageNode), des && /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(`${prefixCls}-description`, mergedClassNames.description),
    style: mergedStyles.description
  }, des), children && /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(`${prefixCls}-footer`, mergedClassNames.footer),
    style: mergedStyles.footer
  }, children));
};
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
const DefaultRenderEmpty = (props) => {
  const {
    componentName
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefix = getPrefixCls("empty");
  switch (componentName) {
    case "Table":
    case "List":
      return /* @__PURE__ */ React.createElement(Empty, {
        image: Empty.PRESENTED_IMAGE_SIMPLE
      });
    case "Select":
    case "TreeSelect":
    case "Cascader":
    case "Transfer":
    case "Mentions":
      return /* @__PURE__ */ React.createElement(Empty, {
        image: Empty.PRESENTED_IMAGE_SIMPLE,
        className: `${prefix}-small`
      });
    /**
     * This type of component should satisfy the nullish coalescing operator(??) on the left-hand side.
     * to let the component itself implement the logic.
     * For example `Table.filter`.
     */
    case "Table.filter":
      return null;
    default:
      return /* @__PURE__ */ React.createElement(Empty, null);
  }
};
const useVariant = (component, variant, legacyBordered) => {
  const {
    variant: configVariant,
    [component]: componentConfig
  } = reactExports.useContext(ConfigContext);
  const ctxVariant = reactExports.useContext(VariantContext);
  const configComponentVariant = componentConfig?.variant;
  let mergedVariant;
  if (typeof variant !== "undefined") {
    mergedVariant = variant;
  } else if (legacyBordered === false) {
    mergedVariant = "borderless";
  } else {
    mergedVariant = ctxVariant ?? configComponentVariant ?? configVariant ?? "outlined";
  }
  const enableVariantCls = Variants.includes(mergedVariant);
  return [mergedVariant, enableVariantCls];
};
const getBuiltInPlacements = (popupOverflow) => {
  const htmlRegion = popupOverflow === "scroll" ? "scroll" : "visible";
  const sharedConfig = {
    overflow: {
      adjustX: true,
      adjustY: true,
      shiftY: true
    },
    htmlRegion,
    dynamicInset: true
  };
  return {
    bottomLeft: {
      ...sharedConfig,
      points: ["tl", "bl"],
      offset: [0, 4]
    },
    bottomRight: {
      ...sharedConfig,
      points: ["tr", "br"],
      offset: [0, 4]
    },
    topLeft: {
      ...sharedConfig,
      points: ["bl", "tl"],
      offset: [0, -4]
    },
    topRight: {
      ...sharedConfig,
      points: ["br", "tr"],
      offset: [0, -4]
    }
  };
};
function mergedBuiltinPlacements(buildInPlacements, popupOverflow) {
  return buildInPlacements || getBuiltInPlacements(popupOverflow);
}
const genItemStyle = (token) => {
  const {
    optionHeight,
    optionFontSize,
    optionLineHeight,
    optionPadding
  } = token;
  return {
    position: "relative",
    display: "block",
    minHeight: optionHeight,
    padding: optionPadding,
    color: token.colorText,
    fontWeight: "normal",
    fontSize: optionFontSize,
    lineHeight: optionLineHeight,
    boxSizing: "border-box"
  };
};
const genSingleStyle = (token) => {
  const {
    antCls,
    componentCls
  } = token;
  const selectItemCls = `${componentCls}-item`;
  const slideUpEnterActive = `&${antCls}-slide-up-enter${antCls}-slide-up-enter-active`;
  const slideUpAppearActive = `&${antCls}-slide-up-appear${antCls}-slide-up-appear-active`;
  const slideUpLeaveActive = `&${antCls}-slide-up-leave${antCls}-slide-up-leave-active`;
  const dropdownPlacementCls = `${componentCls}-dropdown-placement-`;
  const selectedItemCls = `${selectItemCls}-option-selected`;
  return [
    {
      [`${componentCls}-dropdown`]: {
        // ========================== Popup ==========================
        ...resetComponent(token),
        position: "absolute",
        top: -9999,
        zIndex: token.zIndexPopup,
        boxSizing: "border-box",
        padding: token.paddingXXS,
        overflow: "hidden",
        fontSize: token.fontSize,
        // Fix select render lag of long text in chrome
        // https://github.com/ant-design/ant-design/issues/11456
        // https://github.com/ant-design/ant-design/issues/11843
        fontVariant: "initial",
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        outline: "none",
        boxShadow: token.boxShadowSecondary,
        [`
          ${slideUpEnterActive}${dropdownPlacementCls}bottomLeft,
          ${slideUpAppearActive}${dropdownPlacementCls}bottomLeft
        `]: {
          animationName: slideUpIn
        },
        [`
          ${slideUpEnterActive}${dropdownPlacementCls}topLeft,
          ${slideUpAppearActive}${dropdownPlacementCls}topLeft,
          ${slideUpEnterActive}${dropdownPlacementCls}topRight,
          ${slideUpAppearActive}${dropdownPlacementCls}topRight
        `]: {
          animationName: slideDownIn
        },
        [`${slideUpLeaveActive}${dropdownPlacementCls}bottomLeft`]: {
          animationName: slideUpOut
        },
        [`
          ${slideUpLeaveActive}${dropdownPlacementCls}topLeft,
          ${slideUpLeaveActive}${dropdownPlacementCls}topRight
        `]: {
          animationName: slideDownOut
        },
        "&-hidden": {
          display: "none"
        },
        [selectItemCls]: {
          ...genItemStyle(token),
          cursor: "pointer",
          transition: `background-color ${token.motionDurationSlow} ease`,
          borderRadius: token.borderRadiusSM,
          // =========== Group ============
          "&-group": {
            color: token.colorTextDescription,
            fontSize: token.fontSizeSM,
            cursor: "default"
          },
          // =========== Option ===========
          "&-option": {
            display: "flex",
            "&-content": {
              flex: "auto",
              ...textEllipsis
            },
            "&-state": {
              flex: "none",
              display: "flex",
              alignItems: "center"
            },
            [`&-active:not(${selectItemCls}-option-disabled)`]: {
              backgroundColor: token.optionActiveBg
            },
            [`&-selected:not(${selectItemCls}-option-disabled)`]: {
              color: token.optionSelectedColor,
              fontWeight: token.optionSelectedFontWeight,
              backgroundColor: token.optionSelectedBg,
              [`${selectItemCls}-option-state`]: {
                color: token.colorPrimary
              }
            },
            "&-disabled": {
              [`&${selectItemCls}-option-selected`]: {
                backgroundColor: token.colorBgContainerDisabled
              },
              color: token.colorTextDisabled,
              cursor: "not-allowed"
            },
            "&-grouped": {
              paddingInlineStart: token.calc(token.controlPaddingHorizontal).mul(2).equal()
            }
          },
          "&-empty": {
            ...genItemStyle(token),
            color: token.colorTextDisabled
          }
        },
        // https://github.com/ant-design/ant-design/pull/46646
        [`${selectedItemCls}:has(+ ${selectedItemCls})`]: {
          borderEndStartRadius: 0,
          borderEndEndRadius: 0,
          [`& + ${selectedItemCls}`]: {
            borderStartStartRadius: 0,
            borderStartEndRadius: 0
          }
        },
        // =========================== RTL ===========================
        "&-rtl": {
          direction: "rtl"
        }
      }
    },
    // Follow code may reuse in other components
    initSlideMotion(token, "slide-up"),
    initSlideMotion(token, "slide-down"),
    initMoveMotion(token, "move-up"),
    initMoveMotion(token, "move-down")
  ];
};
const genSelectInputCustomizeStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`&${componentCls}-customize`]: {
      border: 0,
      padding: 0,
      fontSize: "inherit",
      lineHeight: "inherit",
      [`${componentCls}-placeholder`]: {
        display: "none"
      },
      [`${componentCls}-content`]: {
        margin: 0,
        padding: 0,
        "&-value": {
          display: "none"
        }
      }
    }
  };
};
const FIXED_INPUT_MIN_WIDTH = 4;
const genSelectInputMultipleStyle = (token) => {
  const {
    componentCls,
    calc,
    iconCls,
    paddingXS,
    paddingXXS,
    INTERNAL_FIXED_ITEM_MARGIN,
    lineWidth,
    colorIcon,
    colorIconHover,
    inputPaddingHorizontalBase,
    antCls
  } = token;
  const [varName, varRef] = genCssVar(antCls, "select");
  return {
    "&-multiple": {
      [varName("multi-item-background")]: token.multipleItemBg,
      [varName("multi-item-border-color")]: "transparent",
      [varName("multi-item-border-radius")]: token.borderRadiusSM,
      [varName("multi-item-height")]: token.multipleItemHeight,
      [varName("multi-padding-base")]: `calc((${varRef("height")} - ${varRef("multi-item-height")}) / 2)`,
      [varName("multi-padding-vertical")]: `calc(${varRef("multi-padding-base")} - ${INTERNAL_FIXED_ITEM_MARGIN} - ${lineWidth})`,
      [varName("multi-item-padding-horizontal")]: `calc(${inputPaddingHorizontalBase} - ${varRef("multi-padding-vertical")} - ${lineWidth} * 2)`,
      // ========================================================
      // ==                        Base                        ==
      // ========================================================
      // ========================= Root =========================
      paddingBlock: varRef("multi-padding-vertical"),
      paddingInlineStart: `calc(${varRef("multi-padding-base")} - ${lineWidth})`,
      // ======================== Prefix ========================
      [`${componentCls}-prefix`]: {
        marginInlineStart: varRef("multi-item-padding-horizontal")
      },
      [`${componentCls}-prefix + ${componentCls}-content`]: {
        [`${componentCls}-placeholder`]: {
          insetInlineStart: 0
        },
        [`${componentCls}-content-item${componentCls}-content-item-suffix`]: {
          marginInlineStart: 0
        }
      },
      // ===================== Placeholder ======================
      [`${componentCls}-placeholder`]: {
        position: "absolute",
        lineHeight: varRef("line-height"),
        insetInlineStart: varRef("multi-item-padding-horizontal"),
        width: `calc(100% - ${varRef("multi-item-padding-horizontal")})`,
        top: "50%",
        transform: "translateY(-50%)"
      },
      // ======================= Content ========================
      [`${componentCls}-content`]: {
        flexWrap: "wrap",
        alignItems: "center",
        lineHeight: 1,
        "&-item-prefix": {
          height: varRef("font-size")
        },
        "&-item": {
          lineHeight: 1,
          maxWidth: `calc(100% - ${FIXED_INPUT_MIN_WIDTH}px)`
        },
        [`${componentCls}-content-item-prefix + ${componentCls}-content-item-suffix,
          ${componentCls}-content-item-suffix:first-child`]: {
          marginInlineStart: varRef("multi-item-padding-horizontal")
        },
        [`${componentCls}-selection-item`]: {
          lineHeight: `calc(${varRef("multi-item-height")} - ${lineWidth} * 2)`,
          border: `${lineWidth} solid ${varRef("multi-item-border-color")}`,
          display: "flex",
          marginBlock: INTERNAL_FIXED_ITEM_MARGIN,
          marginInlineEnd: calc(INTERNAL_FIXED_ITEM_MARGIN).mul(2).equal(),
          background: varRef("multi-item-background"),
          borderRadius: varRef("multi-item-border-radius"),
          paddingInlineStart: paddingXS,
          paddingInlineEnd: paddingXXS,
          transition: ["height", "line-height", "padding"].map((key) => `${key} ${token.motionDurationSlow}`).join(","),
          // >>> Content
          "&-content": {
            ...textEllipsis,
            marginInlineEnd: paddingXXS
          },
          // >>> Remove
          "&-remove": {
            ...resetIcon(),
            display: "inline-flex",
            alignItems: "center",
            color: colorIcon,
            fontWeight: "bold",
            fontSize: 10,
            lineHeight: "inherit",
            cursor: "pointer",
            [`> ${iconCls}`]: {
              verticalAlign: "-0.2em"
            },
            "&:hover": {
              color: colorIconHover
            }
          }
        },
        [`${componentCls}-input`]: {
          lineHeight: calc(INTERNAL_FIXED_ITEM_MARGIN).mul(2).add(varRef("multi-item-height")).equal(),
          width: `calc(var(--select-input-width, 0) * 1px)`,
          minWidth: FIXED_INPUT_MIN_WIDTH,
          maxWidth: "100%",
          transition: `line-height ${token.motionDurationSlow}`
        }
      },
      // ========================================================
      // ==                        Size                        ==
      // ========================================================
      [`&${componentCls}-sm`]: {
        [varName("multi-item-height")]: token.multipleItemHeightSM,
        [varName("multi-item-border-radius")]: token.borderRadiusXS
      },
      [`&${componentCls}-lg`]: {
        [varName("multi-item-height")]: token.multipleItemHeightLG,
        [varName("multi-item-border-radius")]: token.borderRadius
      },
      // ========================================================
      // ==                      Variants                      ==
      // ========================================================
      [`&${componentCls}-filled`]: {
        [varName("multi-item-border-color")]: token.colorSplit,
        [varName("multi-item-background")]: token.colorBgContainer,
        [`&${componentCls}-disabled`]: {
          [varName("multi-item-border-color")]: "transparent"
        }
      }
    }
  };
};
const genSelectInputVariableStyle = (token, colors) => {
  const {
    componentCls,
    antCls
  } = token;
  const [varName] = genCssVar(antCls, "select");
  const {
    border,
    borderHover,
    borderActive,
    borderOutline
  } = colors;
  const baseBG = colors.background || token.selectorBg || token.colorBgContainer;
  return {
    [varName("border-color")]: border,
    [varName("background-color")]: baseBG,
    [varName("color")]: colors.color || token.colorText,
    [`&:not(${componentCls}-disabled)`]: {
      "&:hover": {
        [varName("border-color")]: borderHover,
        [varName("background-color")]: colors.backgroundHover || baseBG
      },
      [`&${componentCls}-focused`]: {
        [varName("border-color")]: borderActive,
        [varName("background-color")]: colors.backgroundActive || baseBG,
        boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${borderOutline}`
      }
    },
    [`&${componentCls}-disabled`]: {
      [varName("border-color")]: colors.borderDisabled || colors.border,
      [varName("background-color")]: colors.backgroundDisabled || colors.background
    }
  };
};
const genSelectInputVariantStyle = (token, variant, colors, errorColors = {}, warningColors = {}, patchStyle) => {
  const {
    componentCls
  } = token;
  return {
    [`&${componentCls}-${variant}`]: [genSelectInputVariableStyle(token, colors), {
      [`&${componentCls}-status-error`]: genSelectInputVariableStyle(token, {
        ...colors,
        color: errorColors.color || token.colorError,
        ...errorColors
      }),
      [`&${componentCls}-status-warning`]: genSelectInputVariableStyle(token, {
        ...colors,
        color: warningColors.color || token.colorWarning,
        ...warningColors
      })
    }, patchStyle]
  };
};
const genSelectInputStyle = (token) => {
  const {
    componentCls,
    fontHeight,
    controlHeight,
    iconCls,
    antCls,
    calc
  } = token;
  const [varName, varRef] = genCssVar(antCls, "select");
  return {
    [componentCls]: [
      {
        // Border
        [varName("border-radius")]: token.borderRadius,
        [varName("border-color")]: "#000",
        [varName("border-size")]: token.lineWidth,
        // Background
        [varName("background-color")]: token.colorBgContainer,
        // Font
        [varName("font-size")]: token.fontSize,
        [varName("line-height")]: token.lineHeight,
        [varName("font-height")]: fontHeight,
        [varName("color")]: token.colorText,
        // Size
        [varName("height")]: controlHeight,
        [varName("padding-horizontal")]: calc(token.paddingSM).sub(token.lineWidth).equal(),
        [varName("padding-vertical")]: `calc((${varRef("height")} - ${varRef("font-height")}) / 2 - ${varRef("border-size")})`,
        // ==========================================================
        // ==                         Base                         ==
        // ==========================================================
        ...resetComponent(token, true),
        display: "inline-flex",
        // gap: calc(token.paddingXXS).mul(1.5).equal(),
        flexWrap: "nowrap",
        position: "relative",
        transition: `all ${token.motionDurationSlow}`,
        alignItems: "flex-start",
        outline: 0,
        cursor: "pointer",
        // Border
        borderRadius: varRef("border-radius"),
        borderWidth: varRef("border-size"),
        borderStyle: token.lineType,
        borderColor: varRef("border-color"),
        // Background
        background: varRef("background-color"),
        // Font
        fontSize: varRef("font-size"),
        lineHeight: varRef("line-height"),
        color: varRef("color"),
        // Padding
        paddingInline: varRef("padding-horizontal"),
        paddingBlock: varRef("padding-vertical"),
        // ========================= Prefix =========================
        [`${componentCls}-prefix`]: {
          flex: "none",
          lineHeight: 1
        },
        // ====================== Placeholder =======================
        [`${componentCls}-placeholder`]: {
          ...textEllipsis,
          color: token.colorTextPlaceholder,
          pointerEvents: "none",
          zIndex: 1
        },
        // ======================== Content =========================
        [`${componentCls}-content`]: {
          flex: "auto",
          minWidth: 0,
          position: "relative",
          display: "flex",
          marginInlineEnd: calc(token.paddingXXS).mul(1.5).equal(),
          "&:before": {
            content: '"\\a0"',
            width: 0,
            overflow: "hidden"
          },
          // >>> Input: should only take effect for not customize mode
          // input element with readOnly use cursor pointer
          "input[readonly]": {
            cursor: "inherit",
            caretColor: "transparent"
          }
        },
        // ========================= Suffix =========================
        [`${componentCls}-suffix`]: {
          flex: "none",
          color: token.colorTextQuaternary,
          fontSize: token.fontSizeIcon,
          lineHeight: 1,
          "> :not(:last-child)": {
            marginInlineEnd: token.marginXS
          }
        },
        [`${componentCls}-prefix, ${componentCls}-suffix`]: {
          alignSelf: "center",
          [iconCls]: {
            verticalAlign: "top"
          }
        },
        // ==========================================================
        // ==                       Disabled                       ==
        // ==========================================================
        "&-disabled": {
          background: token.colorBgContainerDisabled,
          color: token.colorTextDisabled,
          cursor: "not-allowed",
          input: {
            cursor: "not-allowed"
          }
        },
        // ==========================================================
        // ==                         Size                         ==
        // ==========================================================
        "&-sm": {
          [varName("height")]: token.controlHeightSM,
          [varName("padding-horizontal")]: calc(token.paddingXS).sub(token.lineWidth).equal(),
          [varName("border-radius")]: token.borderRadiusSM,
          [`${componentCls}-clear`]: {
            insetInlineEnd: varRef("padding-horizontal")
          }
        },
        "&-lg": {
          [varName("height")]: token.controlHeightLG,
          [varName("font-size")]: token.fontSizeLG,
          [varName("line-height")]: token.lineHeightLG,
          [varName("font-height")]: token.fontHeightLG,
          [varName("border-radius")]: token.borderRadiusLG
        }
      },
      // ============================================================
      // ==                         Input                          ==
      // ============================================================
      {
        [`&:not(${componentCls}-customize)`]: {
          [`${componentCls}-input`]: {
            outline: "none",
            background: "transparent",
            appearance: "none",
            border: 0,
            margin: 0,
            padding: 0,
            color: varRef("color"),
            "&::-webkit-search-cancel-button": {
              display: "none",
              appearance: "none"
            }
          }
        }
      },
      // ============================================================
      // ==                         Single                         ==
      // ============================================================
      {
        [`&-single:not(${componentCls}-customize)`]: {
          [`${componentCls}-input`]: {
            position: "absolute",
            insetInline: 0,
            insetBlock: `calc(${varRef("padding-vertical")} * -1)`,
            lineHeight: `calc(${varRef("font-height")} + ${varRef("padding-vertical")} * 2)`
          },
          // Content center align
          [`${componentCls}-content`]: {
            ...textEllipsis,
            alignSelf: "center",
            "&-has-value": {
              display: "block",
              "&:before": {
                display: "none"
              }
            },
            "&-has-search-value": {
              color: "transparent"
            },
            // >>> Value
            "&-value": {
              transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
              zIndex: 1
            }
          },
          [`&${componentCls}-open ${componentCls}-content`]: {
            color: token.colorTextPlaceholder
          }
        }
      },
      // ======================== Show Search =======================
      {
        [`&-show-search:not(${componentCls}-customize-input):not(${componentCls}-disabled)`]: {
          cursor: "text"
        }
      },
      // ============================================================
      // ==                        Multiple                        ==
      // ============================================================
      genSelectInputMultipleStyle(token),
      // ========================= Variant ==========================
      // >>> Outlined
      genSelectInputVariantStyle(
        token,
        "outlined",
        {
          border: token.colorBorder,
          borderHover: token.hoverBorderColor,
          borderActive: token.activeBorderColor,
          borderOutline: token.activeOutlineColor,
          borderDisabled: token.colorBorderDisabled
        },
        // Error
        {
          border: token.colorError,
          borderHover: token.colorErrorHover,
          borderActive: token.colorError,
          borderOutline: token.colorErrorOutline
        },
        // Warning
        {
          border: token.colorWarning,
          borderHover: token.colorWarningHover,
          borderActive: token.colorWarning,
          borderOutline: token.colorWarningOutline
        }
      ),
      // >>> Filled
      genSelectInputVariantStyle(
        token,
        "filled",
        {
          border: "transparent",
          borderHover: "transparent",
          borderActive: token.activeBorderColor,
          borderOutline: "transparent",
          borderDisabled: token.colorBorderDisabled,
          background: token.colorFillTertiary,
          backgroundHover: token.colorFillSecondary,
          backgroundActive: token.colorBgContainer
        },
        // Error
        {
          background: token.colorErrorBg,
          backgroundHover: token.colorErrorBgHover,
          borderActive: token.colorError
        },
        // Warning
        {
          background: token.colorWarningBg,
          backgroundHover: token.colorWarningBgHover,
          borderActive: token.colorWarning
        }
      ),
      // >>> Borderless
      genSelectInputVariantStyle(token, "borderless", {
        border: "transparent",
        borderHover: "transparent",
        borderActive: "transparent",
        borderOutline: "transparent",
        background: "transparent"
      }),
      // Underlined
      genSelectInputVariantStyle(
        token,
        "underlined",
        {
          border: token.colorBorder,
          borderHover: token.hoverBorderColor,
          borderActive: token.activeBorderColor,
          borderOutline: "transparent"
        },
        // Error
        {
          border: token.colorError,
          borderHover: token.colorErrorHover,
          borderActive: token.colorError
        },
        // Warning
        {
          border: token.colorWarning,
          borderHover: token.colorWarningHover,
          borderActive: token.colorWarning
        },
        {
          borderRadius: 0,
          borderTopColor: "transparent",
          borderRightColor: "transparent",
          borderLeftColor: "transparent"
        }
      ),
      // ============================================================
      // ==                         Custom                         ==
      // ============================================================
      genSelectInputCustomizeStyle(token)
    ]
  };
};
const prepareComponentToken$8 = (token) => {
  const {
    fontSize,
    lineHeight,
    lineWidth,
    controlHeight,
    controlHeightSM,
    controlHeightLG,
    paddingXXS,
    controlPaddingHorizontal,
    zIndexPopupBase,
    colorText,
    fontWeightStrong,
    controlItemBgActive,
    controlItemBgHover,
    colorBgContainer,
    colorFillSecondary,
    colorBgContainerDisabled,
    colorTextDisabled,
    colorPrimaryHover,
    colorPrimary,
    controlOutline
  } = token;
  const dblPaddingXXS = paddingXXS * 2;
  const dblLineWidth = lineWidth * 2;
  const multipleItemHeight = Math.min(controlHeight - dblPaddingXXS, controlHeight - dblLineWidth);
  const multipleItemHeightSM = Math.min(controlHeightSM - dblPaddingXXS, controlHeightSM - dblLineWidth);
  const multipleItemHeightLG = Math.min(controlHeightLG - dblPaddingXXS, controlHeightLG - dblLineWidth);
  const INTERNAL_FIXED_ITEM_MARGIN = Math.floor(paddingXXS / 2);
  return {
    INTERNAL_FIXED_ITEM_MARGIN,
    zIndexPopup: zIndexPopupBase + 50,
    optionSelectedColor: colorText,
    optionSelectedFontWeight: fontWeightStrong,
    optionSelectedBg: controlItemBgActive,
    optionActiveBg: controlItemBgHover,
    optionPadding: `${(controlHeight - fontSize * lineHeight) / 2}px ${controlPaddingHorizontal}px`,
    optionFontSize: fontSize,
    optionLineHeight: lineHeight,
    optionHeight: controlHeight,
    selectorBg: colorBgContainer,
    clearBg: colorBgContainer,
    singleItemHeightLG: controlHeightLG,
    multipleItemBg: colorFillSecondary,
    multipleItemBorderColor: "transparent",
    multipleItemHeight,
    multipleItemHeightSM,
    multipleItemHeightLG,
    multipleSelectorBgDisabled: colorBgContainerDisabled,
    multipleItemColorDisabled: colorTextDisabled,
    multipleItemBorderColorDisabled: "transparent",
    showArrowPaddingInlineEnd: Math.ceil(token.fontSize * 1.25),
    hoverBorderColor: colorPrimaryHover,
    activeBorderColor: colorPrimary,
    activeOutlineColor: controlOutline,
    selectAffixPadding: paddingXXS
  };
};
const genBaseStyle = (token) => {
  const {
    antCls,
    componentCls,
    motionDurationMid,
    inputPaddingHorizontalBase
  } = token;
  const hoverShowClearStyle = {
    [`${componentCls}-clear`]: {
      opacity: 1,
      background: token.colorBgBase,
      borderRadius: "50%"
    }
  };
  return {
    [componentCls]: {
      ...resetComponent(token),
      // ======================== Selection ========================
      [`${componentCls}-selection-item`]: {
        flex: 1,
        fontWeight: "normal",
        position: "relative",
        userSelect: "none",
        ...textEllipsis,
        // https://github.com/ant-design/ant-design/issues/40421
        [`> ${antCls}-typography`]: {
          display: "inline"
        }
      },
      // ========================= Prefix ==========================
      [`${componentCls}-prefix`]: {
        flex: "none",
        marginInlineEnd: token.selectAffixPadding
      },
      // ========================== Clear ==========================
      [`${componentCls}-clear`]: {
        position: "absolute",
        top: "50%",
        insetInlineStart: "auto",
        insetInlineEnd: inputPaddingHorizontalBase,
        zIndex: 1,
        display: "inline-block",
        width: token.fontSizeIcon,
        height: token.fontSizeIcon,
        marginTop: token.calc(token.fontSizeIcon).mul(-1).div(2).equal(),
        color: token.colorTextQuaternary,
        fontSize: token.fontSizeIcon,
        fontStyle: "normal",
        lineHeight: 1,
        textAlign: "center",
        textTransform: "none",
        cursor: "pointer",
        opacity: 0,
        transition: ["color", "opacity"].map((prop) => `${prop} ${motionDurationMid} ease`).join(", "),
        textRendering: "auto",
        // https://github.com/ant-design/ant-design/issues/54205
        // Force GPU compositing on Safari to prevent flickering on opacity/transform transitions
        transform: "translateZ(0)",
        "&:before": {
          display: "block"
        },
        "&:hover": {
          color: token.colorIcon
        }
      },
      "@media(hover:none)": hoverShowClearStyle,
      "&:hover": hoverShowClearStyle
    },
    // ========================= Feedback ==========================
    [`${componentCls}-status`]: {
      "&-error, &-warning, &-success, &-validating": {
        [`&${componentCls}-has-feedback`]: {
          [`${componentCls}-clear`]: {
            insetInlineEnd: token.calc(inputPaddingHorizontalBase).add(token.fontSize).add(token.paddingXS).equal()
          }
        }
      }
    }
  };
};
const genSelectStyle = (token) => {
  const {
    componentCls
  } = token;
  return [
    {
      [componentCls]: {
        // ==================== In Form ====================
        [`&${componentCls}-in-form-item`]: {
          width: "100%"
        }
      }
    },
    // =====================================================
    // ==                       LTR                       ==
    // =====================================================
    // Base
    genBaseStyle(token),
    // Dropdown
    genSingleStyle(token),
    // =====================================================
    // ==                       RTL                       ==
    // =====================================================
    {
      [`${componentCls}-rtl`]: {
        direction: "rtl"
      }
    },
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(token, {
      focusElCls: `${componentCls}-focused`
    })
  ];
};
const useSelectStyle = genStyleHooks("Select", (token, {
  rootPrefixCls
}) => {
  const selectToken = merge$1(token, {
    rootPrefixCls,
    inputPaddingHorizontalBase: token.calc(token.paddingSM).sub(token.lineWidth).equal(),
    multipleSelectItemHeight: token.multipleItemHeight,
    selectHeight: token.controlHeight
  });
  return [genSelectStyle(selectToken), genSelectInputStyle(selectToken)];
}, prepareComponentToken$8, {
  unitless: {
    optionLineHeight: true,
    optionSelectedFontWeight: true
  }
});
function useIcons({
  suffixIcon,
  clearIcon,
  menuItemSelectedIcon,
  removeIcon,
  loading,
  loadingIcon,
  multiple,
  hasFeedback,
  showSuffixIcon,
  feedbackIcon,
  showArrow,
  componentName
}) {
  const mergedClearIcon = clearIcon ?? /* @__PURE__ */ reactExports.createElement(RefIcon$3, null);
  const getSuffixIconNode = (arrowIcon) => {
    if (suffixIcon === null && !hasFeedback && !showArrow) {
      return null;
    }
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, showSuffixIcon !== false && arrowIcon, hasFeedback && feedbackIcon);
  };
  let mergedSuffixIcon = null;
  if (suffixIcon !== void 0) {
    mergedSuffixIcon = getSuffixIconNode(suffixIcon);
  } else if (loading) {
    mergedSuffixIcon = getSuffixIconNode(loadingIcon ?? /* @__PURE__ */ reactExports.createElement(RefIcon$1, {
      spin: true
    }));
  } else {
    mergedSuffixIcon = ({
      open: open2,
      showSearch
    }) => {
      if (open2 && showSearch) {
        return getSuffixIconNode(/* @__PURE__ */ reactExports.createElement(RefIcon$7, null));
      }
      return getSuffixIconNode(/* @__PURE__ */ reactExports.createElement(RefIcon$8, null));
    };
  }
  let mergedItemIcon = null;
  if (menuItemSelectedIcon !== void 0) {
    mergedItemIcon = menuItemSelectedIcon;
  } else if (multiple) {
    mergedItemIcon = /* @__PURE__ */ reactExports.createElement(RefIcon$6, null);
  } else {
    mergedItemIcon = null;
  }
  let mergedRemoveIcon = null;
  if (removeIcon !== void 0) {
    mergedRemoveIcon = removeIcon;
  } else {
    mergedRemoveIcon = /* @__PURE__ */ reactExports.createElement(RefIcon, null);
  }
  return {
    // TODO: remove as when all the deps bumped
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon
  };
}
function usePopupRender(renderFn) {
  return React.useMemo(() => {
    if (!renderFn) {
      return void 0;
    }
    return (...args) => /* @__PURE__ */ React.createElement(ContextIsolator, {
      space: true
    }, renderFn.apply(void 0, args));
  }, [renderFn]);
}
function useShowArrow(suffixIcon, showArrow) {
  return showArrow !== void 0 ? showArrow : suffixIcon !== null;
}
const SECRET_COMBOBOX_MODE_DO_NOT_USE = "SECRET_COMBOBOX_MODE_DO_NOT_USE";
const InternalSelect = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    bordered,
    className,
    rootClassName,
    getPopupContainer,
    popupClassName,
    dropdownClassName,
    listHeight = 256,
    placement,
    listItemHeight: customListItemHeight,
    size: customizeSize,
    disabled: customDisabled,
    notFoundContent,
    status: customStatus,
    builtinPlacements,
    dropdownMatchSelectWidth,
    popupMatchSelectWidth,
    direction: propDirection,
    style,
    allowClear,
    variant: customizeVariant,
    popupStyle,
    dropdownStyle,
    transitionName,
    tagRender,
    maxCount,
    prefix,
    dropdownRender,
    /**
     * @since 5.25.0
     */
    popupRender,
    onDropdownVisibleChange,
    onOpenChange,
    styles,
    classNames,
    ...rest
  } = props;
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction: contextDirection,
    virtual,
    popupMatchSelectWidth: contextPopupMatchSelectWidth,
    popupOverflow
  } = reactExports.useContext(ConfigContext);
  const {
    showSearch,
    style: contextStyle,
    styles: contextStyles,
    className: contextClassName,
    classNames: contextClassNames
  } = useComponentConfig("select");
  const [, token] = useToken();
  const listItemHeight = customListItemHeight ?? token?.controlHeight;
  const prefixCls = getPrefixCls("select", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const direction = propDirection ?? contextDirection;
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const [variant, enableVariantCls] = useVariant("select", customizeVariant, bordered);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useSelectStyle(prefixCls, rootCls);
  const mode = reactExports.useMemo(() => {
    const {
      mode: m
    } = props;
    if (m === "combobox") {
      return void 0;
    }
    if (m === SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return "combobox";
    }
    return m;
  }, [props.mode]);
  const isMultiple = mode === "multiple" || mode === "tags";
  const showSuffixIcon = useShowArrow(props.suffixIcon, props.showArrow);
  const mergedPopupMatchSelectWidth = popupMatchSelectWidth ?? dropdownMatchSelectWidth ?? contextPopupMatchSelectWidth;
  const mergedPopupRender = usePopupRender(popupRender || dropdownRender);
  const mergedOnOpenChange = onOpenChange || onDropdownVisibleChange;
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon
  } = reactExports.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  let mergedNotFound;
  if (notFoundContent !== void 0) {
    mergedNotFound = notFoundContent;
  } else if (mode === "combobox") {
    mergedNotFound = null;
  } else {
    mergedNotFound = renderEmpty?.("Select") || /* @__PURE__ */ reactExports.createElement(DefaultRenderEmpty, {
      componentName: "Select"
    });
  }
  const {
    suffixIcon,
    itemIcon,
    removeIcon,
    clearIcon
  } = useIcons({
    ...rest,
    multiple: isMultiple,
    hasFeedback,
    feedbackIcon,
    showSuffixIcon,
    componentName: "Select"
  });
  const mergedAllowClear = allowClear === true ? {
    clearIcon
  } : allowClear;
  const selectProps = omit(rest, ["suffixIcon", "itemIcon"]);
  const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;
  const mergedProps = {
    ...props,
    variant,
    status: mergedStatus,
    disabled: mergedDisabled,
    size: mergedSize
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps
  }, {
    popup: {
      _default: "root"
    }
  });
  const mergedPopupClassName = clsx(mergedClassNames.popup?.root, popupClassName, dropdownClassName, {
    [`${prefixCls}-dropdown-${direction}`]: direction === "rtl"
  }, rootClassName, cssVarCls, rootCls, hashId);
  const mergedPopupStyle = {
    ...mergedStyles.popup?.root,
    ...popupStyle ?? dropdownStyle
  };
  const mergedClassName = clsx({
    [`${prefixCls}-lg`]: mergedSize === "large",
    [`${prefixCls}-sm`]: mergedSize === "small",
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-${variant}`]: enableVariantCls,
    [`${prefixCls}-in-form-item`]: isFormItemInput
  }, getStatusClassNames(prefixCls, mergedStatus, hasFeedback), compactItemClassnames, contextClassName, className, mergedClassNames.root, rootClassName, cssVarCls, rootCls, hashId);
  const memoPlacement = reactExports.useMemo(() => {
    if (placement !== void 0) {
      return placement;
    }
    return direction === "rtl" ? "bottomRight" : "bottomLeft";
  }, [placement, direction]);
  const [zIndex] = useZIndex("SelectLike", mergedStyles.popup?.root?.zIndex ?? mergedPopupStyle?.zIndex);
  return /* @__PURE__ */ reactExports.createElement(TypedSelect, {
    ref,
    virtual,
    classNames: mergedClassNames,
    styles: mergedStyles,
    showSearch,
    ...selectProps,
    style: {
      ...mergedStyles.root,
      ...contextStyle,
      ...style
    },
    popupMatchSelectWidth: mergedPopupMatchSelectWidth,
    transitionName: getTransitionName(rootPrefixCls, "slide-up", transitionName),
    builtinPlacements: mergedBuiltinPlacements(builtinPlacements, popupOverflow),
    listHeight,
    listItemHeight,
    mode,
    prefixCls,
    placement: memoPlacement,
    direction,
    prefix,
    suffixIcon,
    menuItemSelectedIcon: itemIcon,
    removeIcon,
    allowClear: mergedAllowClear,
    notFoundContent: mergedNotFound,
    className: mergedClassName,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    popupClassName: mergedPopupClassName,
    disabled: mergedDisabled,
    popupStyle: {
      ...mergedStyles.popup?.root,
      ...mergedPopupStyle,
      zIndex
    },
    maxCount: isMultiple ? maxCount : void 0,
    tagRender: isMultiple ? tagRender : void 0,
    popupRender: mergedPopupRender,
    onPopupVisibleChange: mergedOnOpenChange
  });
};
const Select = /* @__PURE__ */ reactExports.forwardRef(InternalSelect);
const PurePanel$3 = genPurePanel(Select, "popupAlign");
Select.SECRET_COMBOBOX_MODE_DO_NOT_USE = SECRET_COMBOBOX_MODE_DO_NOT_USE;
Select.Option = Option;
Select.OptGroup = OptGroup;
Select._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$3;
const responsiveArray = ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs"];
const responsiveArrayReversed = [].concat(responsiveArray).reverse();
const getResponsiveMap = (token) => ({
  xs: `(max-width: ${token.screenXSMax}px)`,
  sm: `(min-width: ${token.screenSM}px)`,
  md: `(min-width: ${token.screenMD}px)`,
  lg: `(min-width: ${token.screenLG}px)`,
  xl: `(min-width: ${token.screenXL}px)`,
  xxl: `(min-width: ${token.screenXXL}px)`,
  xxxl: `(min-width: ${token.screenXXXL}px)`
});
const validateBreakpoints = (token) => {
  const indexableToken = token;
  const revBreakpoints = [].concat(responsiveArray).reverse();
  revBreakpoints.forEach((breakpoint, i) => {
    const breakpointUpper = breakpoint.toUpperCase();
    const screenMin = `screen${breakpointUpper}Min`;
    const screen = `screen${breakpointUpper}`;
    if (!(indexableToken[screenMin] <= indexableToken[screen])) {
      throw new Error(`${screenMin}<=${screen} fails : !(${indexableToken[screenMin]}<=${indexableToken[screen]})`);
    }
    if (i < revBreakpoints.length - 1) {
      const screenMax = `screen${breakpointUpper}Max`;
      if (!(indexableToken[screen] <= indexableToken[screenMax])) {
        throw new Error(`${screen}<=${screenMax} fails : !(${indexableToken[screen]}<=${indexableToken[screenMax]})`);
      }
      const nextBreakpointUpperMin = revBreakpoints[i + 1].toUpperCase();
      const nextScreenMin = `screen${nextBreakpointUpperMin}Min`;
      if (!(indexableToken[screenMax] <= indexableToken[nextScreenMin])) {
        throw new Error(`${screenMax}<=${nextScreenMin} fails : !(${indexableToken[screenMax]}<=${indexableToken[nextScreenMin]})`);
      }
    }
  });
  return token;
};
const useResponsiveObserver = () => {
  const [, token] = useToken();
  const responsiveMap = getResponsiveMap(validateBreakpoints(token));
  return React.useMemo(() => {
    const subscribers = /* @__PURE__ */ new Map();
    let subUid = -1;
    let screens = {};
    return {
      responsiveMap,
      matchHandlers: {},
      dispatch(pointMap) {
        screens = pointMap;
        subscribers.forEach((func) => func(screens));
        return subscribers.size >= 1;
      },
      subscribe(func) {
        if (!subscribers.size) {
          this.register();
        }
        subUid += 1;
        subscribers.set(subUid, func);
        func(screens);
        return subUid;
      },
      unsubscribe(paramToken) {
        subscribers.delete(paramToken);
        if (!subscribers.size) {
          this.unregister();
        }
      },
      register() {
        Object.entries(responsiveMap).forEach(([screen, mediaQuery]) => {
          const listener = ({
            matches
          }) => {
            this.dispatch({
              ...screens,
              [screen]: matches
            });
          };
          const mql = window.matchMedia(mediaQuery);
          if (typeof mql?.addEventListener === "function") {
            mql.addEventListener("change", listener);
          }
          this.matchHandlers[mediaQuery] = {
            mql,
            listener
          };
          listener(mql);
        });
      },
      unregister() {
        Object.values(responsiveMap).forEach((mediaQuery) => {
          const handler = this.matchHandlers[mediaQuery];
          if (typeof handler?.mql?.removeEventListener === "function") {
            handler.mql.removeEventListener("change", handler?.listener);
          }
        });
        subscribers.clear();
      }
    };
  }, [responsiveMap]);
};
function useBreakpoint(refreshOnChange = true, defaultScreens = {}) {
  const screensRef = reactExports.useRef(defaultScreens);
  const [, forceUpdate] = useForceUpdate();
  const responsiveObserver = useResponsiveObserver();
  useLayoutEffect(() => {
    const token = responsiveObserver.subscribe((supportScreens) => {
      screensRef.current = supportScreens;
      if (refreshOnChange) {
        forceUpdate();
      }
    });
    return () => responsiveObserver.unsubscribe(token);
  }, []);
  return screensRef.current;
}
function getArrowToken(token) {
  const {
    sizePopupArrow,
    borderRadiusXS,
    borderRadiusOuter
  } = token;
  const unitWidth = sizePopupArrow / 2;
  const ax = 0;
  const ay = unitWidth;
  const bx = borderRadiusOuter * 1 / Math.sqrt(2);
  const by = unitWidth - borderRadiusOuter * (1 - 1 / Math.sqrt(2));
  const cx = unitWidth - borderRadiusXS * (1 / Math.sqrt(2));
  const cy = borderRadiusOuter * (Math.sqrt(2) - 1) + borderRadiusXS * (1 / Math.sqrt(2));
  const dx = 2 * unitWidth - cx;
  const dy = cy;
  const ex = 2 * unitWidth - bx;
  const ey = by;
  const fx = 2 * unitWidth - ax;
  const fy = ay;
  const shadowWidth = unitWidth * Math.sqrt(2) + borderRadiusOuter * (Math.sqrt(2) - 2);
  const polygonOffset = borderRadiusOuter * (Math.sqrt(2) - 1);
  const arrowPolygon = `polygon(${polygonOffset}px 100%, 50% ${polygonOffset}px, ${2 * unitWidth - polygonOffset}px 100%, ${polygonOffset}px 100%)`;
  const arrowPath = `path('M ${ax} ${ay} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${borderRadiusXS} ${borderRadiusXS} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${borderRadiusOuter} ${borderRadiusOuter} 0 0 0 ${fx} ${fy} Z')`;
  return {
    arrowShadowWidth: shadowWidth,
    arrowPath,
    arrowPolygon
  };
}
const genRoundedArrow = (token, bgColor, boxShadow) => {
  const {
    sizePopupArrow,
    arrowPolygon,
    arrowPath,
    arrowShadowWidth,
    borderRadiusXS,
    calc
  } = token;
  return {
    pointerEvents: "none",
    width: sizePopupArrow,
    height: sizePopupArrow,
    overflow: "hidden",
    "&::before": {
      position: "absolute",
      bottom: 0,
      insetInlineStart: 0,
      width: sizePopupArrow,
      height: calc(sizePopupArrow).div(2).equal(),
      background: bgColor,
      clipPath: {
        _multi_value_: true,
        value: [arrowPolygon, arrowPath]
      },
      content: '""'
    },
    "&::after": {
      content: '""',
      position: "absolute",
      width: arrowShadowWidth,
      height: arrowShadowWidth,
      bottom: 0,
      insetInline: 0,
      margin: "auto",
      borderRadius: {
        _skip_check_: true,
        value: `0 0 ${unit(borderRadiusXS)} 0`
      },
      transform: "translateY(50%) rotate(-135deg)",
      boxShadow,
      zIndex: 0,
      background: "transparent"
    }
  };
};
const MAX_VERTICAL_CONTENT_RADIUS = 8;
function getArrowOffsetToken(options) {
  const {
    contentRadius,
    limitVerticalRadius
  } = options;
  const arrowOffset = contentRadius > 12 ? contentRadius + 2 : 12;
  const arrowOffsetVertical = limitVerticalRadius ? MAX_VERTICAL_CONTENT_RADIUS : arrowOffset;
  return {
    arrowOffsetHorizontal: arrowOffset,
    arrowOffsetVertical
  };
}
function isInject(valid, code) {
  if (!valid) {
    return {};
  }
  return code;
}
const getArrowStyle = (token, colorBg, options) => {
  const {
    componentCls,
    boxShadowPopoverArrow,
    arrowOffsetVertical,
    arrowOffsetHorizontal,
    antCls
  } = token;
  const [varName] = genCssVar(antCls, "tooltip");
  const {
    arrowDistance = 0,
    arrowPlacement = {
      left: true,
      right: true,
      top: true,
      bottom: true
    }
  } = {};
  return {
    [componentCls]: {
      // ============================ Basic ============================
      [`${componentCls}-arrow`]: [{
        position: "absolute",
        zIndex: 1,
        // lift it up so the menu wouldn't cask shadow on it
        display: "block",
        ...genRoundedArrow(token, colorBg, boxShadowPopoverArrow),
        "&:before": {
          background: colorBg
        }
      }],
      // ========================== Placement ==========================
      // Here handle the arrow position and rotate stuff
      // >>>>> Top
      ...isInject(!!arrowPlacement.top, {
        [[`&-placement-top > ${componentCls}-arrow`, `&-placement-topLeft > ${componentCls}-arrow`, `&-placement-topRight > ${componentCls}-arrow`].join(",")]: {
          bottom: arrowDistance,
          transform: "translateY(100%) rotate(180deg)"
        },
        [`&-placement-top > ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: "50%"
          },
          transform: "translateX(-50%) translateY(100%) rotate(180deg)"
        },
        "&-placement-topLeft": {
          [varName("arrow-offset-x")]: arrowOffsetHorizontal,
          [`> ${componentCls}-arrow`]: {
            left: {
              _skip_check_: true,
              value: arrowOffsetHorizontal
            }
          }
        },
        "&-placement-topRight": {
          [varName("arrow-offset-x")]: `calc(100% - ${unit(arrowOffsetHorizontal)})`,
          [`> ${componentCls}-arrow`]: {
            right: {
              _skip_check_: true,
              value: arrowOffsetHorizontal
            }
          }
        }
      }),
      // >>>>> Bottom
      ...isInject(!!arrowPlacement.bottom, {
        [[`&-placement-bottom > ${componentCls}-arrow`, `&-placement-bottomLeft > ${componentCls}-arrow`, `&-placement-bottomRight > ${componentCls}-arrow`].join(",")]: {
          top: arrowDistance,
          transform: `translateY(-100%)`
        },
        [`&-placement-bottom > ${componentCls}-arrow`]: {
          left: {
            _skip_check_: true,
            value: "50%"
          },
          transform: `translateX(-50%) translateY(-100%)`
        },
        "&-placement-bottomLeft": {
          [varName("arrow-offset-x")]: arrowOffsetHorizontal,
          [`> ${componentCls}-arrow`]: {
            left: {
              _skip_check_: true,
              value: arrowOffsetHorizontal
            }
          }
        },
        "&-placement-bottomRight": {
          [varName("arrow-offset-x")]: `calc(100% - ${unit(arrowOffsetHorizontal)})`,
          [`> ${componentCls}-arrow`]: {
            right: {
              _skip_check_: true,
              value: arrowOffsetHorizontal
            }
          }
        }
      }),
      // >>>>> Left
      ...isInject(!!arrowPlacement.left, {
        [[`&-placement-left > ${componentCls}-arrow`, `&-placement-leftTop > ${componentCls}-arrow`, `&-placement-leftBottom > ${componentCls}-arrow`].join(",")]: {
          right: {
            _skip_check_: true,
            value: arrowDistance
          },
          transform: "translateX(100%) rotate(90deg)"
        },
        [`&-placement-left > ${componentCls}-arrow`]: {
          top: {
            _skip_check_: true,
            value: "50%"
          },
          transform: "translateY(-50%) translateX(100%) rotate(90deg)"
        },
        [`&-placement-leftTop > ${componentCls}-arrow`]: {
          top: arrowOffsetVertical
        },
        [`&-placement-leftBottom > ${componentCls}-arrow`]: {
          bottom: arrowOffsetVertical
        }
      }),
      // >>>>> Right
      ...isInject(!!arrowPlacement.right, {
        [[`&-placement-right > ${componentCls}-arrow`, `&-placement-rightTop > ${componentCls}-arrow`, `&-placement-rightBottom > ${componentCls}-arrow`].join(",")]: {
          left: {
            _skip_check_: true,
            value: arrowDistance
          },
          transform: "translateX(-100%) rotate(-90deg)"
        },
        [`&-placement-right > ${componentCls}-arrow`]: {
          top: {
            _skip_check_: true,
            value: "50%"
          },
          transform: "translateY(-50%) translateX(-100%) rotate(-90deg)"
        },
        [`&-placement-rightTop > ${componentCls}-arrow`]: {
          top: arrowOffsetVertical
        },
        [`&-placement-rightBottom > ${componentCls}-arrow`]: {
          bottom: arrowOffsetVertical
        }
      })
    }
  };
};
function getOverflowOptions(placement, arrowOffset, arrowWidth, autoAdjustOverflow) {
  if (autoAdjustOverflow === false) {
    return {
      adjustX: false,
      adjustY: false
    };
  }
  const overflow = autoAdjustOverflow && typeof autoAdjustOverflow === "object" ? autoAdjustOverflow : {};
  const baseOverflow = {};
  switch (placement) {
    case "top":
    case "bottom":
      baseOverflow.shiftX = arrowOffset.arrowOffsetHorizontal * 2 + arrowWidth;
      baseOverflow.shiftY = true;
      baseOverflow.adjustY = true;
      break;
    case "left":
    case "right":
      baseOverflow.shiftY = arrowOffset.arrowOffsetVertical * 2 + arrowWidth;
      baseOverflow.shiftX = true;
      baseOverflow.adjustX = true;
      break;
  }
  const mergedOverflow = {
    ...baseOverflow,
    ...overflow
  };
  if (!mergedOverflow.shiftX) {
    mergedOverflow.adjustX = true;
  }
  if (!mergedOverflow.shiftY) {
    mergedOverflow.adjustY = true;
  }
  return mergedOverflow;
}
const PlacementAlignMap = {
  left: {
    points: ["cr", "cl"]
  },
  right: {
    points: ["cl", "cr"]
  },
  top: {
    points: ["bc", "tc"]
  },
  bottom: {
    points: ["tc", "bc"]
  },
  topLeft: {
    points: ["bl", "tl"]
  },
  leftTop: {
    points: ["tr", "tl"]
  },
  topRight: {
    points: ["br", "tr"]
  },
  rightTop: {
    points: ["tl", "tr"]
  },
  bottomRight: {
    points: ["tr", "br"]
  },
  rightBottom: {
    points: ["bl", "br"]
  },
  bottomLeft: {
    points: ["tl", "bl"]
  },
  leftBottom: {
    points: ["br", "bl"]
  }
};
const ArrowCenterPlacementAlignMap = {
  topLeft: {
    points: ["bl", "tc"]
  },
  leftTop: {
    points: ["tr", "cl"]
  },
  topRight: {
    points: ["br", "tc"]
  },
  rightTop: {
    points: ["tl", "cr"]
  },
  bottomRight: {
    points: ["tr", "bc"]
  },
  rightBottom: {
    points: ["bl", "cr"]
  },
  bottomLeft: {
    points: ["tl", "bc"]
  },
  leftBottom: {
    points: ["br", "cl"]
  }
};
const DisableAutoArrowList = /* @__PURE__ */ new Set(["topLeft", "topRight", "bottomLeft", "bottomRight", "leftTop", "leftBottom", "rightTop", "rightBottom"]);
function getPlacements(config) {
  const {
    arrowWidth,
    autoAdjustOverflow,
    arrowPointAtCenter,
    offset,
    borderRadius
  } = config;
  const halfArrowWidth = arrowWidth / 2;
  const placementMap = {};
  const arrowOffset = getArrowOffsetToken({
    contentRadius: borderRadius,
    limitVerticalRadius: true
  });
  Object.keys(PlacementAlignMap).forEach((key) => {
    const template = arrowPointAtCenter && ArrowCenterPlacementAlignMap[key] || PlacementAlignMap[key];
    const placementInfo = {
      ...template,
      offset: [0, 0],
      dynamicInset: true
    };
    placementMap[key] = placementInfo;
    if (DisableAutoArrowList.has(key)) {
      placementInfo.autoArrow = false;
    }
    switch (key) {
      case "top":
      case "topLeft":
      case "topRight":
        placementInfo.offset[1] = -halfArrowWidth - offset;
        break;
      case "bottom":
      case "bottomLeft":
      case "bottomRight":
        placementInfo.offset[1] = halfArrowWidth + offset;
        break;
      case "left":
      case "leftTop":
      case "leftBottom":
        placementInfo.offset[0] = -halfArrowWidth - offset;
        break;
      case "right":
      case "rightTop":
      case "rightBottom":
        placementInfo.offset[0] = halfArrowWidth + offset;
        break;
    }
    if (arrowPointAtCenter) {
      switch (key) {
        case "topLeft":
        case "bottomLeft":
          placementInfo.offset[0] = -arrowOffset.arrowOffsetHorizontal - halfArrowWidth;
          break;
        case "topRight":
        case "bottomRight":
          placementInfo.offset[0] = arrowOffset.arrowOffsetHorizontal + halfArrowWidth;
          break;
        case "leftTop":
        case "rightTop":
          placementInfo.offset[1] = -arrowOffset.arrowOffsetHorizontal * 2 + halfArrowWidth;
          break;
        case "leftBottom":
        case "rightBottom":
          placementInfo.offset[1] = arrowOffset.arrowOffsetHorizontal * 2 - halfArrowWidth;
          break;
      }
    }
    placementInfo.overflow = getOverflowOptions(key, arrowOffset, arrowWidth, autoAdjustOverflow);
    {
      placementInfo.htmlRegion = "visibleFirst";
    }
  });
  return placementMap;
}
const useMergedArrow = (providedArrow, providedContextArrow) => {
  const toConfig = (arrow) => typeof arrow === "boolean" ? {
    show: arrow
  } : arrow || {};
  return React.useMemo(() => {
    const arrowConfig = toConfig(providedArrow);
    const contextArrowConfig = toConfig(providedContextArrow);
    return {
      ...contextArrowConfig,
      ...arrowConfig,
      show: arrowConfig.show ?? contextArrowConfig.show ?? true
    };
  }, [providedArrow, providedContextArrow]);
};
const FALL_BACK_ORIGIN = "50%";
const genTooltipStyle = (token) => {
  const {
    calc,
    componentCls,
    // ant-tooltip
    tooltipMaxWidth,
    tooltipColor,
    tooltipBg,
    tooltipBorderRadius,
    zIndexPopup,
    controlHeight,
    boxShadowSecondary,
    paddingSM,
    paddingXS,
    arrowOffsetHorizontal,
    sizePopupArrow,
    antCls
  } = token;
  const [varName, varRef] = genCssVar(antCls, "tooltip");
  const edgeAlignMinWidth = calc(tooltipBorderRadius).add(sizePopupArrow).add(arrowOffsetHorizontal).equal();
  const centerAlignMinWidth = calc(tooltipBorderRadius).mul(2).add(sizePopupArrow).equal();
  const sharedBodyStyle = {
    minWidth: centerAlignMinWidth,
    minHeight: controlHeight,
    padding: `${unit(token.calc(paddingSM).div(2).equal())} ${unit(paddingXS)}`,
    color: varRef("overlay-color", tooltipColor),
    textAlign: "start",
    textDecoration: "none",
    wordWrap: "break-word",
    backgroundColor: tooltipBg,
    borderRadius: tooltipBorderRadius,
    boxShadow: boxShadowSecondary,
    boxSizing: "border-box"
  };
  const sharedTransformOrigin = {
    // When use `autoArrow`, origin will follow the arrow position
    [varName("valid-offset-x")]: varRef("arrow-offset-x", "var(--arrow-x)"),
    transformOrigin: [varRef("valid-offset-x", FALL_BACK_ORIGIN), `var(--arrow-y, ${FALL_BACK_ORIGIN})`].join(" ")
  };
  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        position: "absolute",
        zIndex: zIndexPopup,
        display: "block",
        width: "max-content",
        maxWidth: tooltipMaxWidth,
        visibility: "visible",
        ...sharedTransformOrigin,
        "&-hidden": {
          display: "none"
        },
        [varName("arrow-background-color")]: tooltipBg,
        // Wrapper for the tooltip content
        [`${componentCls}-container`]: [sharedBodyStyle, initFadeMotion(token, true)],
        [`&:has(~ ${componentCls}-unique-container)`]: {
          [`${componentCls}-container`]: {
            border: "none",
            background: "transparent",
            boxShadow: "none"
          }
        },
        // Align placement should have another min width
        [[`&-placement-topLeft`, `&-placement-topRight`, `&-placement-bottomLeft`, `&-placement-bottomRight`].join(",")]: {
          minWidth: edgeAlignMinWidth
        },
        // Limit left and right placement radius
        [[`&-placement-left`, `&-placement-leftTop`, `&-placement-leftBottom`, `&-placement-right`, `&-placement-rightTop`, `&-placement-rightBottom`].join(",")]: {
          [`${componentCls}-inner`]: {
            borderRadius: token.min(tooltipBorderRadius, MAX_VERTICAL_CONTENT_RADIUS)
          }
        },
        [`${componentCls}-content`]: {
          position: "relative"
        },
        // generator for preset color
        ...genPresetColor(token, (colorKey, {
          darkColor
        }) => ({
          [`&${componentCls}-${colorKey}`]: {
            [`${componentCls}-container`]: {
              backgroundColor: darkColor
            },
            [`${componentCls}-arrow`]: {
              [varName("arrow-background-color")]: darkColor
            }
          }
        })),
        // RTL
        "&-rtl": {
          direction: "rtl"
        }
      }
    },
    // Arrow Style
    getArrowStyle(token, varRef("arrow-background-color")),
    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: "relative",
        maxWidth: "none",
        margin: token.sizePopupArrow
      }
    },
    // Unique Body
    {
      [`${componentCls}-unique-container`]: {
        ...sharedBodyStyle,
        ...sharedTransformOrigin,
        position: "absolute",
        zIndex: calc(zIndexPopup).sub(1).equal(),
        "&-hidden": {
          display: "none"
        },
        "&-visible": {
          transition: `all ${token.motionDurationSlow}`
        }
      }
    }
  ];
};
const prepareComponentToken$7 = (token) => ({
  zIndexPopup: token.zIndexPopupBase + 70,
  maxWidth: 250,
  ...getArrowOffsetToken({
    contentRadius: token.borderRadius,
    limitVerticalRadius: true
  }),
  ...getArrowToken(merge$1(token, {
    borderRadiusOuter: Math.min(token.borderRadiusOuter, 4)
  }))
});
const useStyle$e = (prefixCls, rootCls, injectStyle = true) => {
  const useStyle2 = genStyleHooks("Tooltip", (token) => {
    const {
      borderRadius,
      colorTextLightSolid,
      colorBgSpotlight,
      maxWidth
    } = token;
    const TooltipToken = merge$1(token, {
      // default variables
      tooltipMaxWidth: maxWidth,
      tooltipColor: colorTextLightSolid,
      tooltipBorderRadius: borderRadius,
      tooltipBg: colorBgSpotlight
    });
    return [genTooltipStyle(TooltipToken), initZoomMotion(token, "zoom-big-fast")];
  }, prepareComponentToken$7, {
    resetStyle: false,
    // Popover use Tooltip as internal component. We do not need to handle this.
    injectStyle
  });
  return useStyle2(prefixCls, rootCls);
};
const inverseColors = PresetColors.map((color) => `${color}-inverse`);
function isPresetColor(color, includeInverse = true) {
  if (includeInverse) {
    return [].concat(_toConsumableArray(inverseColors), _toConsumableArray(PresetColors)).includes(color);
  }
  return PresetColors.includes(color);
}
const parseColor = (rootPrefixCls, prefixCls, color) => {
  const isInternalColor = isPresetColor(color);
  const [varName] = genCssVar(rootPrefixCls, "tooltip");
  const className = clsx({
    [`${prefixCls}-${color}`]: color && isInternalColor
  });
  const overlayStyle = {};
  const arrowStyle = {};
  const rgb = generateColor(color).toRgb();
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  const textColor = luminance < 0.5 ? "#FFF" : "#000";
  if (color && !isInternalColor) {
    overlayStyle.background = color;
    overlayStyle[varName("overlay-color")] = textColor;
    arrowStyle[varName("arrow-background-color")] = color;
  }
  return {
    className,
    overlayStyle,
    arrowStyle
  };
};
const PurePanel$2 = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    placement = "top",
    title,
    color,
    overlayInnerStyle,
    classNames,
    styles
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle$e(prefixCls, rootCls);
  const colorInfo = parseColor(rootPrefixCls, prefixCls, color);
  const arrowContentStyle = colorInfo.arrowStyle;
  const innerStyles = reactExports.useMemo(() => {
    const mergedStyle = {
      ...overlayInnerStyle,
      ...colorInfo.overlayStyle
    };
    return {
      container: mergedStyle
    };
  }, [overlayInnerStyle, colorInfo.overlayStyle]);
  const mergedProps = {
    ...props,
    placement
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([classNames], [innerStyles, styles], {
    props: mergedProps
  });
  const rootClassName = clsx(rootCls, hashId, cssVarCls, prefixCls, `${prefixCls}-pure`, `${prefixCls}-placement-${placement}`, className, colorInfo.className);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: rootClassName,
    style: arrowContentStyle
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-arrow`
  }), /* @__PURE__ */ reactExports.createElement(Popup, {
    ...props,
    className: hashId,
    prefixCls,
    classNames: mergedClassNames,
    styles: mergedStyles
  }, title));
};
const InternalTooltip = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    openClassName,
    getTooltipContainer,
    color,
    children,
    afterOpenChange,
    arrow: tooltipArrow,
    destroyTooltipOnHide,
    destroyOnHidden,
    title,
    overlay,
    trigger,
    builtinPlacements,
    autoAdjustOverflow = true,
    motion,
    getPopupContainer,
    placement = "top",
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    rootClassName,
    styles,
    classNames,
    onOpenChange,
    // Legacy
    overlayInnerStyle,
    overlayStyle,
    overlayClassName,
    ...restProps
  } = props;
  const [, token] = useToken();
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    arrow: contextArrow,
    trigger: contextTrigger
  } = useComponentConfig("tooltip");
  const mergedArrow = useMergedArrow(tooltipArrow, contextArrow);
  const mergedShowArrow = mergedArrow.show;
  const mergedTrigger = trigger || contextTrigger || "hover";
  const tooltipRef = reactExports.useRef(null);
  const forceAlign = () => {
    tooltipRef.current?.forceAlign();
  };
  reactExports.useImperativeHandle(ref, () => ({
    forceAlign,
    nativeElement: tooltipRef.current?.nativeElement,
    popupElement: tooltipRef.current?.popupElement
  }));
  const [open2, setOpen] = useControlledState(props.defaultOpen ?? false, props.open);
  const noTitle = !title && !overlay && title !== 0;
  const onInternalOpenChange = (vis) => {
    setOpen(noTitle ? false : vis);
    if (!noTitle && onOpenChange) {
      onOpenChange(vis);
    }
  };
  const tooltipPlacements = reactExports.useMemo(() => {
    return builtinPlacements || getPlacements({
      arrowPointAtCenter: mergedArrow?.pointAtCenter ?? false,
      autoAdjustOverflow,
      arrowWidth: mergedShowArrow ? token.sizePopupArrow : 0,
      borderRadius: token.borderRadius,
      offset: token.marginXXS
    });
  }, [mergedArrow, builtinPlacements, token, mergedShowArrow, autoAdjustOverflow]);
  const memoOverlay = reactExports.useMemo(() => {
    if (title === 0) {
      return title;
    }
    return overlay || title || "";
  }, [overlay, title]);
  const memoOverlayWrapper = /* @__PURE__ */ reactExports.createElement(ContextIsolator, {
    space: true,
    form: true
  }, typeof memoOverlay === "function" ? memoOverlay() : memoOverlay);
  const mergedProps = {
    ...props,
    trigger: mergedTrigger,
    color,
    placement,
    builtinPlacements,
    openClassName,
    arrow: tooltipArrow,
    autoAdjustOverflow,
    getPopupContainer,
    children,
    destroyTooltipOnHide,
    destroyOnHidden
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps
  });
  const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const injectFromPopover = props["data-popover-inject"];
  let tempOpen = open2;
  if (!("open" in props) && noTitle) {
    tempOpen = false;
  }
  const child = /* @__PURE__ */ reactExports.isValidElement(children) && !isFragment(children) ? children : /* @__PURE__ */ reactExports.createElement("span", null, children);
  const childProps = child.props;
  const childCls = !childProps.className || typeof childProps.className === "string" ? clsx(childProps.className, openClassName || `${prefixCls}-open`) : childProps.className;
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle$e(prefixCls, rootCls, !injectFromPopover);
  const colorInfo = parseColor(rootPrefixCls, prefixCls, color);
  const arrowContentStyle = colorInfo.arrowStyle;
  const themeCls = clsx(rootCls, hashId, cssVarCls);
  const rootClassNames = clsx(overlayClassName, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, colorInfo.className, rootClassName, themeCls, contextClassName, mergedClassNames.root);
  const [zIndex, contextZIndex] = useZIndex("Tooltip", restProps.zIndex);
  const containerStyle = {
    ...mergedStyles.container,
    ...overlayInnerStyle,
    ...colorInfo.overlayStyle
  };
  const content = /* @__PURE__ */ reactExports.createElement(Tooltip$1, {
    unique: true,
    ...restProps,
    trigger: mergedTrigger,
    zIndex,
    showArrow: mergedShowArrow,
    placement,
    mouseEnterDelay,
    mouseLeaveDelay,
    prefixCls,
    classNames: {
      root: rootClassNames,
      container: mergedClassNames.container,
      arrow: mergedClassNames.arrow,
      uniqueContainer: clsx(themeCls, mergedClassNames.container)
    },
    styles: {
      root: {
        ...arrowContentStyle,
        ...mergedStyles.root,
        ...contextStyle,
        ...overlayStyle
      },
      container: containerStyle,
      uniqueContainer: containerStyle,
      arrow: mergedStyles.arrow
    },
    getTooltipContainer: getPopupContainer || getTooltipContainer || getContextPopupContainer,
    ref: tooltipRef,
    builtinPlacements: tooltipPlacements,
    overlay: memoOverlayWrapper,
    visible: tempOpen,
    onVisibleChange: onInternalOpenChange,
    afterVisibleChange: afterOpenChange,
    arrowContent: /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-arrow-content`
    }),
    motion: {
      motionName: getTransitionName(rootPrefixCls, "zoom-big-fast", typeof motion?.motionName === "string" ? motion?.motionName : void 0),
      motionDeadline: 1e3
    },
    destroyOnHidden: destroyOnHidden ?? !!destroyTooltipOnHide
  }, tempOpen ? cloneElement(child, {
    className: childCls
  }) : child);
  return /* @__PURE__ */ reactExports.createElement(ZIndexContext.Provider, {
    value: contextZIndex
  }, content);
});
const Tooltip = InternalTooltip;
Tooltip._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$2;
Tooltip.UniqueProvider = UniqueProvider;
const UnitNumber = (props) => {
  const {
    prefixCls,
    value,
    current,
    offset = 0
  } = props;
  let style;
  if (offset) {
    style = {
      position: "absolute",
      top: `${offset}00%`,
      left: 0
    };
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    style,
    className: clsx(`${prefixCls}-only-unit`, {
      current
    })
  }, value);
};
function getOffset(start, end, unit2) {
  let index = start;
  let offset = 0;
  while ((index + 10) % 10 !== end) {
    index += unit2;
    offset += unit2;
  }
  return offset;
}
const SingleNumber = (props) => {
  const {
    prefixCls,
    count: originCount,
    value: originValue
  } = props;
  const value = Number(originValue);
  const count = Math.abs(originCount);
  const [prevValue, setPrevValue] = reactExports.useState(value);
  const [prevCount, setPrevCount] = reactExports.useState(count);
  const onTransitionEnd = () => {
    setPrevValue(value);
    setPrevCount(count);
  };
  reactExports.useEffect(() => {
    const timer = setTimeout(onTransitionEnd, 1e3);
    return () => clearTimeout(timer);
  }, [value]);
  let unitNodes;
  let offsetStyle;
  if (prevValue === value || Number.isNaN(value) || Number.isNaN(prevValue)) {
    unitNodes = [/* @__PURE__ */ reactExports.createElement(UnitNumber, {
      ...props,
      key: value,
      current: true
    })];
    offsetStyle = {
      transition: "none"
    };
  } else {
    unitNodes = [];
    const end = value + 10;
    const unitNumberList = [];
    for (let index = value; index <= end; index += 1) {
      unitNumberList.push(index);
    }
    const unit2 = prevCount < count ? 1 : -1;
    const prevIndex = unitNumberList.findIndex((n) => n % 10 === prevValue);
    const cutUnitNumberList = unit2 < 0 ? unitNumberList.slice(0, prevIndex + 1) : unitNumberList.slice(prevIndex);
    unitNodes = cutUnitNumberList.map((n, index) => {
      const singleUnit = n % 10;
      return /* @__PURE__ */ reactExports.createElement(UnitNumber, {
        ...props,
        key: n,
        value: singleUnit,
        offset: unit2 < 0 ? index - prevIndex : index,
        current: index === prevIndex
      });
    });
    offsetStyle = {
      transform: `translateY(${-getOffset(prevValue, value, unit2)}00%)`
    };
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-only`,
    style: offsetStyle,
    onTransitionEnd
  }, unitNodes);
};
const ScrollNumber = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    count,
    className,
    motionClassName,
    style,
    title,
    show,
    component: Component = "sup",
    children,
    ...restProps
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("scroll-number", customizePrefixCls);
  const newProps = {
    ...restProps,
    "data-show": show,
    style,
    className: clsx(prefixCls, className, motionClassName),
    title
  };
  let numberNodes = count;
  if (count && Number(count) % 1 === 0) {
    const numberList = String(count).split("");
    numberNodes = /* @__PURE__ */ reactExports.createElement("bdi", null, numberList.map((num, i) => /* @__PURE__ */ reactExports.createElement(SingleNumber, {
      prefixCls,
      count: Number(count),
      value: num,
      // eslint-disable-next-line react/no-array-index-key
      key: numberList.length - i
    })));
  }
  if (style?.borderColor) {
    newProps.style = {
      ...style,
      boxShadow: `0 0 0 1px ${style.borderColor} inset`
    };
  }
  if (children) {
    return cloneElement(children, (oriProps) => ({
      className: clsx(`${prefixCls}-custom-component`, oriProps?.className, motionClassName)
    }));
  }
  return /* @__PURE__ */ reactExports.createElement(Component, {
    ...newProps,
    ref
  }, numberNodes);
});
const antStatusProcessing = new Keyframe("antStatusProcessing", {
  "0%": {
    transform: "scale(0.8)",
    opacity: 0.5
  },
  "100%": {
    transform: "scale(2.4)",
    opacity: 0
  }
});
const antZoomBadgeIn = new Keyframe("antZoomBadgeIn", {
  "0%": {
    transform: "scale(0) translate(50%, -50%)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1) translate(50%, -50%)"
  }
});
const antZoomBadgeOut = new Keyframe("antZoomBadgeOut", {
  "0%": {
    transform: "scale(1) translate(50%, -50%)"
  },
  "100%": {
    transform: "scale(0) translate(50%, -50%)",
    opacity: 0
  }
});
const antNoWrapperZoomBadgeIn = new Keyframe("antNoWrapperZoomBadgeIn", {
  "0%": {
    transform: "scale(0)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)"
  }
});
const antNoWrapperZoomBadgeOut = new Keyframe("antNoWrapperZoomBadgeOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0)",
    opacity: 0
  }
});
const antBadgeLoadingCircle = new Keyframe("antBadgeLoadingCircle", {
  "0%": {
    transformOrigin: "50%"
  },
  "100%": {
    transform: "translate(50%, -50%) rotate(360deg)",
    transformOrigin: "50%"
  }
});
const genSharedBadgeStyle = (token) => {
  const {
    componentCls,
    iconCls,
    antCls,
    badgeShadowSize,
    textFontSize,
    textFontSizeSM,
    statusSize,
    dotSize,
    textFontWeight,
    indicatorHeight,
    indicatorHeightSM,
    marginXS,
    calc
  } = token;
  const numberPrefixCls = `${antCls}-scroll-number`;
  const colorPreset = genPresetColor(token, (colorKey, {
    darkColor
  }) => ({
    [`&${componentCls} ${componentCls}-color-${colorKey}`]: {
      background: darkColor,
      [`&:not(${componentCls}-count)`]: {
        color: darkColor
      },
      "a:hover &": {
        background: darkColor
      }
    }
  }));
  return {
    [componentCls]: {
      ...resetComponent(token),
      position: "relative",
      display: "inline-block",
      width: "fit-content",
      lineHeight: 1,
      [`${componentCls}-count`]: {
        display: "inline-flex",
        justifyContent: "center",
        zIndex: token.indicatorZIndex,
        minWidth: indicatorHeight,
        height: indicatorHeight,
        color: token.badgeTextColor,
        fontWeight: textFontWeight,
        fontSize: textFontSize,
        lineHeight: unit(indicatorHeight),
        whiteSpace: "nowrap",
        textAlign: "center",
        background: token.badgeColor,
        borderRadius: calc(indicatorHeight).div(2).equal(),
        boxShadow: `0 0 0 ${unit(badgeShadowSize)} ${token.badgeShadowColor}`,
        transition: `background-color ${token.motionDurationMid}`,
        a: {
          color: token.badgeTextColor
        },
        "a:hover": {
          color: token.badgeTextColor
        },
        "a:hover &": {
          background: token.badgeColorHover
        }
      },
      [`${componentCls}-count-sm`]: {
        minWidth: indicatorHeightSM,
        height: indicatorHeightSM,
        fontSize: textFontSizeSM,
        lineHeight: unit(indicatorHeightSM),
        borderRadius: calc(indicatorHeightSM).div(2).equal()
      },
      [`${componentCls}-multiple-words`]: {
        padding: `0 ${unit(token.paddingXS)}`,
        bdi: {
          unicodeBidi: "plaintext"
        }
      },
      [`${componentCls}-dot`]: {
        zIndex: token.indicatorZIndex,
        width: dotSize,
        minWidth: dotSize,
        height: dotSize,
        background: token.badgeColor,
        borderRadius: "100%",
        boxShadow: `0 0 0 ${unit(badgeShadowSize)} ${token.badgeShadowColor}`
      },
      [`${componentCls}-count, ${componentCls}-dot, ${numberPrefixCls}-custom-component`]: {
        position: "absolute",
        top: 0,
        insetInlineEnd: 0,
        transform: "translate(50%, -50%)",
        transformOrigin: "100% 0%",
        [`&${iconCls}-spin`]: {
          animationName: antBadgeLoadingCircle,
          animationDuration: "1s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear"
        }
      },
      [`&${componentCls}-status`]: {
        lineHeight: "inherit",
        verticalAlign: "baseline",
        [`${componentCls}-status-dot`]: {
          position: "relative",
          top: -1,
          // Magic number, but seems better experience
          display: "inline-block",
          width: statusSize,
          height: statusSize,
          verticalAlign: "middle",
          borderRadius: "50%"
        },
        [`${componentCls}-status-success`]: {
          backgroundColor: token.colorSuccess
        },
        [`${componentCls}-status-processing`]: {
          overflow: "visible",
          color: token.colorInfo,
          backgroundColor: token.colorInfo,
          borderColor: "currentcolor",
          "&::after": {
            position: "absolute",
            top: 0,
            insetInlineStart: 0,
            width: "100%",
            height: "100%",
            borderWidth: badgeShadowSize,
            borderStyle: "solid",
            borderColor: "inherit",
            borderRadius: "50%",
            animationName: antStatusProcessing,
            animationDuration: token.badgeProcessingDuration,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            content: '""'
          }
        },
        [`${componentCls}-status-default`]: {
          backgroundColor: token.colorTextPlaceholder
        },
        [`${componentCls}-status-error`]: {
          backgroundColor: token.colorError
        },
        [`${componentCls}-status-warning`]: {
          backgroundColor: token.colorWarning
        },
        [`${componentCls}-status-text`]: {
          marginInlineStart: marginXS,
          color: token.colorText,
          fontSize: token.fontSize
        }
      },
      ...colorPreset,
      [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
        animationName: antZoomBadgeIn,
        animationDuration: token.motionDurationSlow,
        animationTimingFunction: token.motionEaseOutBack,
        animationFillMode: "both"
      },
      [`${componentCls}-zoom-leave`]: {
        animationName: antZoomBadgeOut,
        animationDuration: token.motionDurationSlow,
        animationTimingFunction: token.motionEaseOutBack,
        animationFillMode: "both"
      },
      [`&${componentCls}-not-a-wrapper`]: {
        [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
          animationName: antNoWrapperZoomBadgeIn,
          animationDuration: token.motionDurationSlow,
          animationTimingFunction: token.motionEaseOutBack
        },
        [`${componentCls}-zoom-leave`]: {
          animationName: antNoWrapperZoomBadgeOut,
          animationDuration: token.motionDurationSlow,
          animationTimingFunction: token.motionEaseOutBack
        },
        [`&:not(${componentCls}-status)`]: {
          verticalAlign: "middle"
        },
        [`${numberPrefixCls}-custom-component, ${componentCls}-count`]: {
          transform: "none"
        },
        [`${numberPrefixCls}-custom-component, ${numberPrefixCls}`]: {
          position: "relative",
          top: "auto",
          display: "block",
          transformOrigin: "50% 50%"
        }
      },
      [numberPrefixCls]: {
        overflow: "hidden",
        transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack}`,
        [`${numberPrefixCls}-only`]: {
          position: "relative",
          display: "inline-block",
          height: indicatorHeight,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseOutBack}`,
          WebkitTransformStyle: "preserve-3d",
          WebkitBackfaceVisibility: "hidden",
          [`> p${numberPrefixCls}-only-unit`]: {
            height: indicatorHeight,
            margin: 0,
            WebkitTransformStyle: "preserve-3d",
            WebkitBackfaceVisibility: "hidden"
          }
        },
        [`${numberPrefixCls}-symbol`]: {
          verticalAlign: "top"
        }
      },
      // ====================== RTL =======================
      "&-rtl": {
        direction: "rtl",
        [`${componentCls}-count, ${componentCls}-dot, ${numberPrefixCls}-custom-component`]: {
          transform: "translate(-50%, -50%)"
        }
      }
    }
  };
};
const prepareToken$1 = (token) => {
  const {
    fontHeight,
    lineWidth,
    marginXS,
    colorBorderBg
  } = token;
  const badgeFontHeight = fontHeight;
  const badgeShadowSize = lineWidth;
  const badgeTextColor = token.colorTextLightSolid;
  const badgeColor = token.colorError;
  const badgeColorHover = token.colorErrorHover;
  const badgeToken = merge$1(token, {
    badgeFontHeight,
    badgeShadowSize,
    badgeTextColor,
    badgeColor,
    badgeColorHover,
    badgeShadowColor: colorBorderBg,
    badgeProcessingDuration: "1.2s",
    badgeRibbonOffset: marginXS,
    // Follow token just by Design. Not related with token
    badgeRibbonCornerTransform: "scaleY(0.75)",
    badgeRibbonCornerFilter: `brightness(75%)`
  });
  return badgeToken;
};
const prepareComponentToken$6 = (token) => {
  const {
    fontSize,
    lineHeight,
    fontSizeSM,
    lineWidth
  } = token;
  return {
    indicatorZIndex: "auto",
    indicatorHeight: Math.round(fontSize * lineHeight) - 2 * lineWidth,
    indicatorHeightSM: fontSize,
    dotSize: fontSizeSM / 2,
    textFontSize: fontSizeSM,
    textFontSizeSM: fontSizeSM,
    textFontWeight: "normal",
    statusSize: fontSizeSM / 2
  };
};
const useStyle$d = genStyleHooks("Badge", (token) => {
  const badgeToken = prepareToken$1(token);
  return genSharedBadgeStyle(badgeToken);
}, prepareComponentToken$6);
const Badge$1 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    scrollNumberPrefixCls: customizeScrollNumberPrefixCls,
    children,
    status,
    text,
    color,
    count = null,
    overflowCount = 99,
    dot = false,
    size = "default",
    title,
    offset,
    style,
    className,
    rootClassName,
    classNames,
    styles,
    showZero = false,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("badge");
  const prefixCls = getPrefixCls("badge", customizePrefixCls);
  const [hashId, cssVarCls] = useStyle$d(prefixCls);
  const mergedProps = {
    ...props,
    overflowCount,
    size,
    dot,
    showZero
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps
  });
  const numberedDisplayCount = count > overflowCount ? `${overflowCount}+` : count;
  const isZero = numberedDisplayCount === "0" || numberedDisplayCount === 0 || text === "0" || text === 0;
  const ignoreCount = count === null || isZero && !showZero;
  const hasStatus = (isNonNullable(status) || isNonNullable(color)) && ignoreCount;
  const hasStatusValue = isNonNullable(status) || !isZero;
  const showAsDot = dot && !isZero;
  const mergedCount = showAsDot ? "" : numberedDisplayCount;
  const isHidden = reactExports.useMemo(() => {
    const isEmpty = (!isNonNullable(mergedCount) || mergedCount === "") && (!isNonNullable(text) || text === "");
    return (isEmpty || isZero && !showZero) && !showAsDot;
  }, [mergedCount, isZero, showZero, showAsDot, text]);
  const countRef = reactExports.useRef(count);
  if (!isHidden) {
    countRef.current = count;
  }
  const livingCount = countRef.current;
  const displayCountRef = reactExports.useRef(mergedCount);
  if (!isHidden) {
    displayCountRef.current = mergedCount;
  }
  const displayCount = displayCountRef.current;
  const isDotRef = reactExports.useRef(showAsDot);
  if (!isHidden) {
    isDotRef.current = showAsDot;
  }
  const mergedStyle = reactExports.useMemo(() => {
    if (!offset) {
      return {
        ...contextStyle,
        ...style
      };
    }
    const horizontalOffset = Number.parseInt(offset[0], 10);
    const offsetStyle = {
      marginTop: offset[1],
      insetInlineEnd: -horizontalOffset
    };
    return {
      ...offsetStyle,
      ...contextStyle,
      ...style
    };
  }, [offset, style, contextStyle]);
  const titleNode = title ?? (typeof livingCount === "string" || typeof livingCount === "number" ? livingCount : void 0);
  const showStatusTextNode = !isHidden && (text === 0 ? showZero : !!text && text !== true);
  const statusTextNode = !showStatusTextNode ? null : /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-status-text`
  }, text);
  const displayNode = !livingCount || typeof livingCount !== "object" ? void 0 : cloneElement(livingCount, (oriProps) => ({
    style: {
      ...mergedStyle,
      ...oriProps.style
    }
  }));
  const isInternalColor = isPresetColor(color, false);
  const statusCls = clsx(mergedClassNames.indicator, {
    [`${prefixCls}-status-dot`]: hasStatus,
    [`${prefixCls}-status-${status}`]: !!status,
    [`${prefixCls}-color-${color}`]: isInternalColor
  });
  const statusStyle = {};
  if (color && !isInternalColor) {
    statusStyle.color = color;
    statusStyle.background = color;
  }
  const badgeClassName = clsx(prefixCls, {
    [`${prefixCls}-status`]: hasStatus,
    [`${prefixCls}-not-a-wrapper`]: !children,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName, contextClassName, mergedClassNames.root, hashId, cssVarCls);
  if (!children && hasStatus && (text || hasStatusValue || !ignoreCount)) {
    const statusTextColor = mergedStyle.color;
    return /* @__PURE__ */ reactExports.createElement("span", {
      ref,
      ...restProps,
      className: badgeClassName,
      style: {
        ...mergedStyles.root,
        ...mergedStyle
      }
    }, /* @__PURE__ */ reactExports.createElement("span", {
      className: statusCls,
      style: {
        ...mergedStyles.indicator,
        ...statusStyle
      }
    }), showStatusTextNode && /* @__PURE__ */ reactExports.createElement("span", {
      style: {
        color: statusTextColor
      },
      className: `${prefixCls}-status-text`
    }, text));
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    ref,
    ...restProps,
    className: badgeClassName,
    style: mergedStyles.root
  }, children, /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    visible: !isHidden,
    motionName: `${prefixCls}-zoom`,
    motionAppear: false,
    motionDeadline: 1e3
  }, ({
    className: motionClassName
  }) => {
    const scrollNumberPrefixCls = getPrefixCls("scroll-number", customizeScrollNumberPrefixCls);
    const isDot = isDotRef.current;
    const scrollNumberCls = clsx(mergedClassNames.indicator, {
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
      [`${prefixCls}-count-sm`]: size === "small",
      [`${prefixCls}-multiple-words`]: !isDot && displayCount && displayCount.toString().length > 1,
      [`${prefixCls}-status-${status}`]: !!status,
      [`${prefixCls}-color-${color}`]: isInternalColor
    });
    let scrollNumberStyle = {
      ...mergedStyles.indicator,
      ...mergedStyle
    };
    if (color && !isInternalColor) {
      scrollNumberStyle = scrollNumberStyle || {};
      scrollNumberStyle.background = color;
    }
    return /* @__PURE__ */ reactExports.createElement(ScrollNumber, {
      prefixCls: scrollNumberPrefixCls,
      show: !isHidden,
      motionClassName,
      className: scrollNumberCls,
      count: displayCount,
      title: titleNode,
      style: scrollNumberStyle,
      key: "scrollNumber"
    }, displayNode);
  }), statusTextNode);
});
const genRibbonStyle = (token) => {
  const {
    antCls,
    badgeFontHeight,
    marginXS,
    badgeRibbonOffset,
    calc
  } = token;
  const ribbonPrefixCls = `${antCls}-ribbon`;
  const ribbonWrapperPrefixCls = `${antCls}-ribbon-wrapper`;
  const statusRibbonPreset = genPresetColor(token, (colorKey, {
    darkColor
  }) => ({
    [`&${ribbonPrefixCls}-color-${colorKey}`]: {
      background: darkColor,
      color: darkColor
    }
  }));
  return {
    [ribbonWrapperPrefixCls]: {
      position: "relative"
    },
    [ribbonPrefixCls]: {
      ...resetComponent(token),
      position: "absolute",
      top: marginXS,
      padding: `0 ${unit(token.paddingXS)}`,
      color: token.colorPrimary,
      lineHeight: unit(badgeFontHeight),
      whiteSpace: "nowrap",
      backgroundColor: token.colorPrimary,
      borderRadius: token.borderRadiusSM,
      [`${ribbonPrefixCls}-content`]: {
        color: token.badgeTextColor
      },
      [`${ribbonPrefixCls}-corner`]: {
        position: "absolute",
        top: "100%",
        width: badgeRibbonOffset,
        height: badgeRibbonOffset,
        color: "currentcolor",
        border: `${unit(calc(badgeRibbonOffset).div(2).equal())} solid`,
        transform: token.badgeRibbonCornerTransform,
        transformOrigin: "top",
        filter: token.badgeRibbonCornerFilter
      },
      ...statusRibbonPreset,
      [`&${ribbonPrefixCls}-placement-end`]: {
        insetInlineEnd: calc(badgeRibbonOffset).mul(-1).equal(),
        borderEndEndRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineEnd: 0,
          borderInlineEndColor: "transparent",
          borderBlockEndColor: "transparent"
        }
      },
      [`&${ribbonPrefixCls}-placement-start`]: {
        insetInlineStart: calc(badgeRibbonOffset).mul(-1).equal(),
        borderEndStartRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineStart: 0,
          borderBlockEndColor: "transparent",
          borderInlineStartColor: "transparent"
        }
      },
      // ====================== RTL =======================
      "&-rtl": {
        direction: "rtl"
      }
    }
  };
};
const useStyle$c = genStyleHooks(["Badge", "Ribbon"], (token) => {
  const badgeToken = prepareToken$1(token);
  return genRibbonStyle(badgeToken);
}, prepareComponentToken$6);
const Ribbon = (props) => {
  const {
    className,
    prefixCls: customizePrefixCls,
    style,
    color,
    children,
    text,
    placement = "end",
    rootClassName,
    styles,
    classNames: ribbonClassNames
  } = props;
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("ribbon");
  const prefixCls = getPrefixCls("ribbon", customizePrefixCls);
  const wrapperCls = `${prefixCls}-wrapper`;
  const [hashId, cssVarCls] = useStyle$c(prefixCls, wrapperCls);
  const mergedProps = {
    ...props,
    placement
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, ribbonClassNames], [contextStyles, styles], {
    props: mergedProps
  });
  const colorInPreset = isPresetColor(color, false);
  const ribbonCls = clsx(prefixCls, `${prefixCls}-placement-${placement}`, {
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-color-${color}`]: colorInPreset
  }, className, contextClassName, mergedClassNames.indicator);
  const colorStyle = {};
  const cornerColorStyle = {};
  if (color && !colorInPreset) {
    colorStyle.background = color;
    cornerColorStyle.color = color;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(wrapperCls, rootClassName, hashId, cssVarCls, mergedClassNames.root),
    style: mergedStyles.root
  }, children, /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(ribbonCls, hashId),
    style: {
      ...colorStyle,
      ...mergedStyles.indicator,
      ...contextStyle,
      ...style
    }
  }, /* @__PURE__ */ reactExports.createElement("span", {
    className: clsx(`${prefixCls}-content`, mergedClassNames.content),
    style: mergedStyles.content
  }, text), /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-corner`,
    style: cornerColorStyle
  })));
};
const Badge = Badge$1;
Badge.Ribbon = Ribbon;
const LayoutContext = /* @__PURE__ */ reactExports.createContext({
  siderHook: {
    addSider: () => null,
    removeSider: () => null
  }
});
const genLayoutStyle = (token) => {
  const {
    antCls,
    // .ant
    componentCls,
    // .ant-layout
    colorText,
    footerBg,
    headerHeight,
    headerPadding,
    headerColor,
    footerPadding,
    fontSize,
    bodyBg,
    headerBg
  } = token;
  return {
    [componentCls]: {
      display: "flex",
      flex: "auto",
      flexDirection: "column",
      /* fix firefox can't set height smaller than content on flex item */
      minHeight: 0,
      background: bodyBg,
      "&, *": {
        boxSizing: "border-box"
      },
      [`&${componentCls}-has-sider`]: {
        flexDirection: "row",
        [`> ${componentCls}, > ${componentCls}-content`]: {
          // https://segmentfault.com/a/1190000019498300
          width: 0
        }
      },
      [`${componentCls}-header, &${componentCls}-footer`]: {
        flex: "0 0 auto"
      },
      // RTL
      "&-rtl": {
        direction: "rtl"
      }
    },
    // ==================== Header ====================
    [`${componentCls}-header`]: {
      height: headerHeight,
      padding: headerPadding,
      color: headerColor,
      lineHeight: unit(headerHeight),
      background: headerBg,
      // Other components/menu/style/index.less line:686
      // Integration with header element so menu items have the same height
      [`${antCls}-menu`]: {
        lineHeight: "inherit"
      }
    },
    // ==================== Footer ====================
    [`${componentCls}-footer`]: {
      padding: footerPadding,
      color: colorText,
      fontSize,
      background: footerBg
    },
    // =================== Content ====================
    [`${componentCls}-content`]: {
      flex: "auto",
      color: colorText,
      // fix firefox can't set height smaller than content on flex item
      minHeight: 0
    }
  };
};
const prepareComponentToken$5 = (token) => {
  const {
    colorBgLayout,
    controlHeight,
    controlHeightLG,
    colorText,
    controlHeightSM,
    marginXXS,
    colorTextLightSolid,
    colorBgContainer
  } = token;
  const paddingInline = controlHeightLG * 1.25;
  return {
    // Deprecated
    colorBgHeader: "#001529",
    colorBgBody: colorBgLayout,
    colorBgTrigger: "#002140",
    bodyBg: colorBgLayout,
    headerBg: "#001529",
    headerHeight: controlHeight * 2,
    headerPadding: `0 ${paddingInline}px`,
    headerColor: colorText,
    footerPadding: `${controlHeightSM}px ${paddingInline}px`,
    footerBg: colorBgLayout,
    siderBg: "#001529",
    triggerHeight: controlHeightLG + marginXXS * 2,
    triggerBg: "#002140",
    triggerColor: colorTextLightSolid,
    zeroTriggerWidth: controlHeightLG,
    zeroTriggerHeight: controlHeightLG,
    lightSiderBg: colorBgContainer,
    lightTriggerBg: colorBgContainer,
    lightTriggerColor: colorText
  };
};
const DEPRECATED_TOKENS = [["colorBgBody", "bodyBg"], ["colorBgHeader", "headerBg"], ["colorBgTrigger", "triggerBg"]];
const useStyle$b = genStyleHooks("Layout", genLayoutStyle, prepareComponentToken$5, {
  deprecatedTokens: DEPRECATED_TOKENS
});
const genSiderStyle = (token) => {
  const {
    componentCls,
    siderBg,
    motionDurationMid,
    motionDurationSlow,
    antCls,
    triggerHeight,
    triggerColor,
    triggerBg,
    headerHeight,
    zeroTriggerWidth,
    zeroTriggerHeight,
    borderRadiusLG,
    lightSiderBg,
    lightTriggerColor,
    lightTriggerBg,
    bodyBg
  } = token;
  return {
    [componentCls]: {
      position: "relative",
      // fix firefox can't set width smaller than content on flex item
      minWidth: 0,
      background: siderBg,
      transition: `all ${motionDurationMid}, background 0s`,
      "&-has-trigger": {
        paddingBottom: triggerHeight
      },
      "&-right": {
        order: 1
      },
      [`${componentCls}-children`]: {
        height: "100%",
        // Hack for fixing margin collapse bug
        // https://github.com/ant-design/ant-design/issues/7967
        // solution from https://stackoverflow.com/a/33132624/3040605
        marginTop: -0.1,
        paddingTop: 0.1,
        [`${antCls}-menu${antCls}-menu-inline-collapsed`]: {
          width: "auto"
        }
      },
      [`&-zero-width ${componentCls}-children`]: {
        overflow: "hidden"
      },
      [`${componentCls}-trigger`]: {
        position: "fixed",
        bottom: 0,
        zIndex: 1,
        height: triggerHeight,
        color: triggerColor,
        lineHeight: unit(triggerHeight),
        textAlign: "center",
        background: triggerBg,
        cursor: "pointer",
        transition: `all ${motionDurationMid}`
      },
      [`${componentCls}-zero-width-trigger`]: {
        position: "absolute",
        top: headerHeight,
        insetInlineEnd: token.calc(zeroTriggerWidth).mul(-1).equal(),
        zIndex: 1,
        width: zeroTriggerWidth,
        height: zeroTriggerHeight,
        color: triggerColor,
        fontSize: token.fontSizeXL,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: siderBg,
        borderRadius: `0 ${unit(borderRadiusLG)} ${unit(borderRadiusLG)} 0`,
        cursor: "pointer",
        transition: `background-color ${motionDurationSlow} ease`,
        "&::after": {
          position: "absolute",
          inset: 0,
          background: "transparent",
          transition: `all ${motionDurationSlow}`,
          content: '""'
        },
        "&:hover::after": {
          background: `rgba(255, 255, 255, 0.2)`
        },
        "&-right": {
          insetInlineStart: token.calc(zeroTriggerWidth).mul(-1).equal(),
          borderRadius: `${unit(borderRadiusLG)} 0 0 ${unit(borderRadiusLG)}`
        }
      },
      // Light
      "&-light": {
        background: lightSiderBg,
        [`${componentCls}-trigger`]: {
          color: lightTriggerColor,
          background: lightTriggerBg
        },
        [`${componentCls}-zero-width-trigger`]: {
          color: lightTriggerColor,
          background: lightTriggerBg,
          border: `1px solid ${bodyBg}`,
          // Safe to modify to any other color
          borderInlineStart: 0
        }
      }
    }
  };
};
const useStyle$a = genStyleHooks(["Layout", "Sider"], genSiderStyle, prepareComponentToken$5, {
  deprecatedTokens: DEPRECATED_TOKENS
});
const dimensionMaxMap = {
  xs: "479.98px",
  sm: "575.98px",
  md: "767.98px",
  lg: "991.98px",
  xl: "1199.98px",
  xxl: "1599.98px",
  xxxl: `1839.98px`
};
const isNumeric = (val) => !Number.isNaN(Number.parseFloat(val)) && Number.isFinite(Number(val));
const SiderContext = /* @__PURE__ */ reactExports.createContext({});
const generateId = /* @__PURE__ */ (() => {
  let i = 0;
  return (prefix = "") => {
    i += 1;
    return `${prefix}${i}`;
  };
})();
const Sider = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    trigger,
    children,
    defaultCollapsed = false,
    theme = "dark",
    style = {},
    collapsible = false,
    reverseArrow = false,
    width = 200,
    collapsedWidth = 80,
    zeroWidthTriggerStyle,
    breakpoint,
    onCollapse,
    onBreakpoint,
    ...otherProps
  } = props;
  const {
    siderHook
  } = reactExports.useContext(LayoutContext);
  const [collapsed, setCollapsed] = reactExports.useState("collapsed" in props ? props.collapsed : defaultCollapsed);
  const [below, setBelow] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if ("collapsed" in props) {
      setCollapsed(props.collapsed);
    }
  }, [props.collapsed]);
  const handleSetCollapsed = (value, type) => {
    if (!("collapsed" in props)) {
      setCollapsed(value);
    }
    onCollapse?.(value, type);
  };
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("layout-sider", customizePrefixCls);
  const [hashId, cssVarCls] = useStyle$a(prefixCls);
  const responsiveHandlerRef = reactExports.useRef(null);
  responsiveHandlerRef.current = (mql) => {
    setBelow(mql.matches);
    onBreakpoint?.(mql.matches);
    if (collapsed !== mql.matches) {
      handleSetCollapsed(mql.matches, "responsive");
    }
  };
  reactExports.useEffect(() => {
    function responsiveHandler(mql2) {
      return responsiveHandlerRef.current?.(mql2);
    }
    let mql;
    if (typeof window?.matchMedia !== "undefined" && breakpoint && breakpoint in dimensionMaxMap) {
      mql = window.matchMedia(`screen and (max-width: ${dimensionMaxMap[breakpoint]})`);
      if (typeof mql?.addEventListener === "function") {
        mql.addEventListener("change", responsiveHandler);
      }
      responsiveHandler(mql);
    }
    return () => {
      if (typeof mql?.removeEventListener === "function") {
        mql.removeEventListener("change", responsiveHandler);
      }
    };
  }, [breakpoint]);
  reactExports.useEffect(() => {
    const uniqueId = generateId("ant-sider-");
    siderHook.addSider(uniqueId);
    return () => siderHook.removeSider(uniqueId);
  }, []);
  const toggle = () => {
    handleSetCollapsed(!collapsed, "clickTrigger");
  };
  const divProps = omit(otherProps, ["collapsed"]);
  const rawWidth = collapsed ? collapsedWidth : width;
  const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
  const zeroWidthTrigger = Number.parseFloat(String(collapsedWidth || 0)) === 0 ? /* @__PURE__ */ reactExports.createElement("span", {
    onClick: toggle,
    className: clsx(`${prefixCls}-zero-width-trigger`, `${prefixCls}-zero-width-trigger-${reverseArrow ? "right" : "left"}`),
    style: zeroWidthTriggerStyle
  }, trigger || /* @__PURE__ */ reactExports.createElement(RefIcon$9, null)) : null;
  const reverseIcon = direction === "rtl" === !reverseArrow;
  const iconObj = {
    expanded: reverseIcon ? /* @__PURE__ */ reactExports.createElement(RefIcon$b, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$a, null),
    collapsed: reverseIcon ? /* @__PURE__ */ reactExports.createElement(RefIcon$a, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$b, null)
  };
  const status = collapsed ? "collapsed" : "expanded";
  const defaultTrigger = iconObj[status];
  const triggerDom = trigger !== null ? zeroWidthTrigger || /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-trigger`,
    onClick: toggle,
    style: {
      width: siderWidth
    }
  }, trigger || defaultTrigger) : null;
  const divStyle = {
    ...style,
    flex: `0 0 ${siderWidth}`,
    maxWidth: siderWidth,
    // Fix width transition bug in IE11
    minWidth: siderWidth,
    // https://github.com/ant-design/ant-design/issues/6349
    width: siderWidth
  };
  const siderCls = clsx(prefixCls, `${prefixCls}-${theme}`, {
    [`${prefixCls}-collapsed`]: !!collapsed,
    [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
    [`${prefixCls}-below`]: !!below,
    [`${prefixCls}-zero-width`]: Number.parseFloat(siderWidth) === 0
  }, className, hashId, cssVarCls);
  const contextValue = reactExports.useMemo(() => ({
    siderCollapsed: collapsed
  }), [collapsed]);
  return /* @__PURE__ */ reactExports.createElement(SiderContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement("aside", {
    className: siderCls,
    ...divProps,
    style: divStyle,
    ref
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-children`
  }, children), collapsible || below && zeroWidthTrigger ? triggerDom : null));
});
const MenuContext = /* @__PURE__ */ reactExports.createContext({
  prefixCls: "",
  firstLevel: true,
  inlineCollapsed: false,
  styles: null,
  classNames: null
});
const MenuDivider = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    dashed,
    ...restProps
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("menu", customizePrefixCls);
  const classString = clsx({
    [`${prefixCls}-item-divider-dashed`]: !!dashed
  }, className);
  return /* @__PURE__ */ reactExports.createElement(Divider, {
    className: classString,
    ...restProps
  });
};
const MenuItem = (props) => {
  const {
    className,
    children,
    icon,
    title,
    danger,
    extra
  } = props;
  const {
    prefixCls,
    firstLevel,
    direction,
    disableMenuItemTitleTooltip,
    tooltip,
    inlineCollapsed: isInlineCollapsed,
    styles,
    classNames
  } = reactExports.useContext(MenuContext);
  const renderItemChildren = (inlineCollapsed) => {
    const label = children?.[0];
    const wrapNode = /* @__PURE__ */ reactExports.createElement("span", {
      className: clsx(`${prefixCls}-title-content`, firstLevel ? classNames?.itemContent : classNames?.subMenu?.itemContent, {
        [`${prefixCls}-title-content-with-extra`]: !!extra || extra === 0
      }),
      style: firstLevel ? styles?.itemContent : styles?.subMenu?.itemContent
    }, children);
    if (!icon || /* @__PURE__ */ reactExports.isValidElement(children) && children.type === "span") {
      if (children && inlineCollapsed && firstLevel && typeof label === "string") {
        return /* @__PURE__ */ reactExports.createElement("div", {
          className: `${prefixCls}-inline-collapsed-noicon`
        }, label.charAt(0));
      }
    }
    return wrapNode;
  };
  const {
    siderCollapsed
  } = reactExports.useContext(SiderContext);
  let tooltipTitle = title;
  if (typeof title === "undefined") {
    tooltipTitle = firstLevel ? children : "";
  } else if (title === false) {
    tooltipTitle = "";
  }
  const tooltipConfig = tooltip === false ? void 0 : tooltip;
  const mergedTooltipTitle = tooltipConfig && tooltipConfig.title !== void 0 ? tooltipConfig.title : tooltipTitle;
  const tooltipProps = {
    ...tooltipConfig ?? null,
    title: mergedTooltipTitle
  };
  if (!siderCollapsed && !isInlineCollapsed) {
    tooltipProps.title = null;
    tooltipProps.open = false;
  }
  const childrenLength = toArray$1(children).length;
  let returnNode = /* @__PURE__ */ reactExports.createElement(MenuItem$1, {
    ...omit(props, ["title", "icon", "danger"]),
    className: clsx(firstLevel ? classNames?.item : classNames?.subMenu?.item, {
      [`${prefixCls}-item-danger`]: danger,
      [`${prefixCls}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1
    }, className),
    style: {
      ...firstLevel ? styles?.item : styles?.subMenu?.item,
      ...props.style
    },
    title: typeof title === "string" ? title : void 0
  }, cloneElement(icon, (oriProps) => ({
    className: clsx(`${prefixCls}-item-icon`, firstLevel ? classNames?.itemIcon : classNames?.subMenu?.itemIcon, oriProps.className),
    style: {
      ...firstLevel ? styles?.itemIcon : styles?.subMenu?.itemIcon,
      ...oriProps.style
    }
  })), renderItemChildren(isInlineCollapsed));
  if (!disableMenuItemTitleTooltip && tooltip !== false) {
    const mergedTooltipPlacement = tooltipConfig && tooltipConfig.placement ? tooltipConfig.placement : direction === "rtl" ? "left" : "right";
    const baseTooltipClassName = `${prefixCls}-inline-collapsed-tooltip`;
    const mergeTooltipRootClassName = (classNames2) => ({
      ...classNames2,
      root: clsx(baseTooltipClassName, classNames2?.root)
    });
    const mergedTooltipClassNames = tooltipConfig && typeof tooltipConfig.classNames === "function" ? (info) => {
      const resolvedClassNames = tooltipConfig.classNames(info);
      return mergeTooltipRootClassName(resolvedClassNames);
    } : mergeTooltipRootClassName(tooltipConfig?.classNames);
    returnNode = /* @__PURE__ */ reactExports.createElement(Tooltip, {
      ...tooltipProps,
      placement: mergedTooltipPlacement,
      classNames: mergedTooltipClassNames
    }, returnNode);
  }
  return returnNode;
};
const OverrideContext = /* @__PURE__ */ reactExports.createContext(null);
const getHorizontalStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    horizontalLineHeight,
    colorSplit,
    lineWidth,
    lineType,
    itemPaddingInline
  } = token;
  return {
    [`${componentCls}-horizontal`]: {
      lineHeight: horizontalLineHeight,
      border: 0,
      borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      boxShadow: "none",
      "&::after": {
        display: "block",
        clear: "both",
        height: 0,
        content: '"\\20"'
      },
      // ======================= Item =======================
      [`${componentCls}-item, ${componentCls}-submenu`]: {
        position: "relative",
        display: "inline-block",
        verticalAlign: "bottom",
        paddingInline: itemPaddingInline
      },
      [`> ${componentCls}-item:hover,
        > ${componentCls}-item-active,
        > ${componentCls}-submenu ${componentCls}-submenu-title:hover`]: {
        backgroundColor: "transparent"
      },
      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        transition: [`border-color`, `background-color`].map((prop) => `${prop} ${motionDurationSlow}`).join(",")
      },
      // ===================== Sub Menu =====================
      [`${componentCls}-submenu-arrow`]: {
        display: "none"
      }
    }
  };
};
const getRTLStyle = ({
  componentCls,
  menuArrowOffset,
  calc
}) => ({
  [`${componentCls}-rtl`]: {
    direction: "rtl"
  },
  [`${componentCls}-submenu-rtl`]: {
    transformOrigin: "100% 0"
  },
  // Vertical Arrow
  [`${componentCls}-rtl${componentCls}-vertical,
    ${componentCls}-submenu-rtl ${componentCls}-vertical`]: {
    [`${componentCls}-submenu-arrow`]: {
      "&::before": {
        transform: `rotate(-45deg) translateY(${unit(calc(menuArrowOffset).mul(-1).equal())})`
      },
      "&::after": {
        transform: `rotate(45deg) translateY(${unit(menuArrowOffset)})`
      }
    }
  }
});
const accessibilityFocus = (token) => genFocusOutline(token);
const getThemeStyle = (token, themeSuffix) => {
  const {
    componentCls,
    itemColor,
    itemSelectedColor,
    subMenuItemSelectedColor,
    groupTitleColor,
    itemBg,
    subMenuItemBg,
    itemSelectedBg,
    activeBarHeight,
    activeBarWidth,
    activeBarBorderWidth,
    motionDurationSlow,
    motionEaseInOut,
    motionEaseOut,
    itemPaddingInline,
    motionDurationMid,
    itemHoverColor,
    lineType,
    colorSplit,
    // Disabled
    itemDisabledColor,
    // Danger
    dangerItemColor,
    dangerItemHoverColor,
    dangerItemSelectedColor,
    dangerItemActiveBg,
    dangerItemSelectedBg,
    // Bg
    popupBg,
    itemHoverBg,
    itemActiveBg,
    menuSubMenuBg,
    // Horizontal
    horizontalItemSelectedColor,
    horizontalItemSelectedBg,
    horizontalItemBorderRadius,
    horizontalItemHoverBg
  } = token;
  return {
    [`${componentCls}-${themeSuffix}, ${componentCls}-${themeSuffix} > ${componentCls}`]: {
      color: itemColor,
      background: itemBg,
      [`&${componentCls}-root:focus-visible`]: {
        ...accessibilityFocus(token)
      },
      // ======================== Item ========================
      [`${componentCls}-item`]: {
        "&-group-title, &-extra": {
          color: groupTitleColor
        }
      },
      [`${componentCls}-submenu-selected > ${componentCls}-submenu-title`]: {
        color: subMenuItemSelectedColor
      },
      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        color: itemColor,
        [`&:not(${componentCls}-item-disabled):focus-visible`]: {
          ...accessibilityFocus(token)
        }
      },
      // Disabled
      [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
        color: `${itemDisabledColor} !important`
      },
      // Hover
      [`${componentCls}-item:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
        [`&:hover, > ${componentCls}-submenu-title:hover`]: {
          color: itemHoverColor
        }
      },
      [`&:not(${componentCls}-horizontal)`]: {
        [`${componentCls}-item:not(${componentCls}-item-selected)`]: {
          "&:hover": {
            backgroundColor: itemHoverBg
          },
          "&:active": {
            backgroundColor: itemActiveBg
          }
        },
        [`${componentCls}-submenu-title`]: {
          "&:hover": {
            backgroundColor: itemHoverBg
          },
          "&:active": {
            backgroundColor: itemActiveBg
          }
        }
      },
      // Danger - only Item has
      [`${componentCls}-item-danger`]: {
        color: dangerItemColor,
        [`&${componentCls}-item:hover`]: {
          [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
            color: dangerItemHoverColor
          }
        },
        [`&${componentCls}-item:active`]: {
          background: dangerItemActiveBg
        }
      },
      [`${componentCls}-item a`]: {
        "&, &:hover": {
          color: "inherit"
        }
      },
      [`${componentCls}-item-selected`]: {
        color: itemSelectedColor,
        // Danger
        [`&${componentCls}-item-danger`]: {
          color: dangerItemSelectedColor
        },
        "a, a:hover": {
          color: "inherit"
        }
      },
      [`& ${componentCls}-item-selected`]: {
        backgroundColor: itemSelectedBg,
        // Danger
        [`&${componentCls}-item-danger`]: {
          backgroundColor: dangerItemSelectedBg
        }
      },
      [`&${componentCls}-submenu > ${componentCls}`]: {
        backgroundColor: menuSubMenuBg
      },
      // ===== 设置浮层的颜色 =======
      // ！dark 模式会被popupBg 会被rest 为 darkPopupBg
      [`&${componentCls}-popup > ${componentCls}`]: {
        backgroundColor: popupBg
      },
      [`&${componentCls}-submenu-popup > ${componentCls}`]: {
        backgroundColor: popupBg
      },
      // ===== 设置浮层的颜色 end =======
      // ====================== Horizontal ======================
      [`&${componentCls}-horizontal`]: {
        ...themeSuffix === "dark" ? {
          borderBottom: 0
        } : {},
        [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
          top: activeBarBorderWidth,
          marginTop: token.calc(activeBarBorderWidth).mul(-1).equal(),
          marginBottom: 0,
          borderRadius: horizontalItemBorderRadius,
          "&::after": {
            position: "absolute",
            insetInline: itemPaddingInline,
            bottom: 0,
            borderBottom: `${unit(activeBarHeight)} solid transparent`,
            transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""'
          },
          "&:hover, &-active, &-open": {
            background: horizontalItemHoverBg,
            "&::after": {
              borderBottomWidth: activeBarHeight,
              borderBottomColor: horizontalItemSelectedColor
            }
          },
          "&-selected": {
            color: horizontalItemSelectedColor,
            backgroundColor: horizontalItemSelectedBg,
            "&:hover": {
              backgroundColor: horizontalItemSelectedBg
            },
            "&::after": {
              borderBottomWidth: activeBarHeight,
              borderBottomColor: horizontalItemSelectedColor
            }
          }
        }
      },
      // ================== Inline & Vertical ===================
      //
      [`&${componentCls}-root`]: {
        [`&${componentCls}-inline, &${componentCls}-vertical`]: {
          borderInlineEnd: `${unit(activeBarBorderWidth)} ${lineType} ${colorSplit}`
        }
      },
      // ======================== Inline ========================
      [`&${componentCls}-inline`]: {
        // Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          background: subMenuItemBg
        },
        [`${componentCls}-item`]: {
          position: "relative",
          "&::after": {
            position: "absolute",
            insetBlock: 0,
            insetInlineEnd: 0,
            borderInlineEnd: `${unit(activeBarWidth)} solid ${itemSelectedColor}`,
            transform: "scaleY(0.0001)",
            opacity: 0,
            transition: [`transform`, `opacity`].map((prop) => `${prop} ${motionDurationMid} ${motionEaseOut}`).join(","),
            content: '""'
          },
          // Danger
          [`&${componentCls}-item-danger`]: {
            "&::after": {
              borderInlineEndColor: dangerItemSelectedColor
            }
          }
        },
        [`${componentCls}-selected, ${componentCls}-item-selected`]: {
          "&::after": {
            transform: "scaleY(1)",
            opacity: 1,
            transition: [`transform`, `opacity`].map((prop) => `${prop} ${motionDurationMid} ${motionEaseInOut}`).join(",")
          }
        }
      }
    }
  };
};
const getVerticalInlineStyle = (token) => {
  const {
    componentCls,
    itemHeight,
    itemMarginInline,
    padding,
    menuArrowSize,
    marginXS,
    itemMarginBlock,
    itemWidth,
    itemPaddingInline
  } = token;
  const paddingWithArrow = token.calc(menuArrowSize).add(padding).add(marginXS).equal();
  return {
    [`${componentCls}-item`]: {
      position: "relative",
      overflow: "hidden"
    },
    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      height: itemHeight,
      lineHeight: unit(itemHeight),
      paddingInline: itemPaddingInline,
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginInline: itemMarginInline,
      marginBlock: itemMarginBlock,
      width: itemWidth
    },
    [`> ${componentCls}-item,
            > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
      height: itemHeight,
      lineHeight: unit(itemHeight)
    },
    [`${componentCls}-item-group-list ${componentCls}-submenu-title,
            ${componentCls}-submenu-title`]: {
      paddingInlineEnd: paddingWithArrow
    }
  };
};
const getVerticalStyle = (token) => {
  const {
    componentCls,
    iconCls,
    itemHeight,
    colorTextLightSolid,
    dropdownWidth,
    controlHeightLG,
    motionEaseOut,
    paddingXL,
    itemMarginInline,
    fontSizeLG,
    motionDurationFast,
    motionDurationSlow,
    paddingXS,
    boxShadowSecondary,
    collapsedWidth,
    collapsedIconSize
  } = token;
  const inlineItemStyle = {
    height: itemHeight,
    lineHeight: unit(itemHeight),
    listStylePosition: "inside",
    listStyleType: "disc"
  };
  return [
    {
      [componentCls]: {
        "&-inline, &-vertical": {
          [`&${componentCls}-root`]: {
            boxShadow: "none"
          },
          ...getVerticalInlineStyle(token)
        }
      },
      [`${componentCls}-submenu-popup`]: {
        [`${componentCls}-vertical`]: {
          ...getVerticalInlineStyle(token),
          boxShadow: boxShadowSecondary
        }
      }
    },
    // Vertical only
    {
      [`${componentCls}-submenu-popup ${componentCls}-vertical${componentCls}-sub`]: {
        minWidth: dropdownWidth,
        maxHeight: `calc(100vh - ${unit(token.calc(controlHeightLG).mul(2.5).equal())})`,
        padding: "0",
        overflow: "hidden",
        borderInlineEnd: 0,
        // https://github.com/ant-design/ant-design/issues/22244
        // https://github.com/ant-design/ant-design/issues/26812
        "&:not([class*='-active'])": {
          overflowX: "hidden",
          overflowY: "auto"
        }
      }
    },
    // Inline Only
    {
      [`${componentCls}-inline`]: {
        width: "100%",
        // Motion enhance for first level
        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu-title`]: {
            display: "flex",
            alignItems: "center",
            transition: [`border-color ${motionDurationSlow}`, `background-color ${motionDurationSlow}`, `padding ${motionDurationFast} ${motionEaseOut}`].join(","),
            [`> ${componentCls}-title-content`]: {
              flex: "auto",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            "> *": {
              flex: "none"
            }
          }
        },
        // >>>>> Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          padding: 0,
          border: 0,
          borderRadius: 0,
          boxShadow: "none",
          [`& > ${componentCls}-submenu > ${componentCls}-submenu-title`]: inlineItemStyle,
          [`& ${componentCls}-item-group-title`]: {
            paddingInlineStart: paddingXL
          }
        },
        // >>>>> Item
        [`${componentCls}-item`]: inlineItemStyle
      }
    },
    // Inline Collapse Only
    {
      [`${componentCls}-inline-collapsed`]: {
        width: collapsedWidth,
        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu ${componentCls}-submenu-title`]: {
            [`> ${componentCls}-inline-collapsed-noicon`]: {
              fontSize: fontSizeLG,
              textAlign: "center"
            }
          }
        },
        [`> ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-submenu > ${componentCls}-submenu-title,
          > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
          insetInlineStart: 0,
          paddingInline: `calc(50% - ${unit(token.calc(collapsedIconSize).div(2).equal())} - ${unit(itemMarginInline)})`,
          textOverflow: "clip",
          [`
            ${componentCls}-submenu-arrow,
            ${componentCls}-submenu-expand-icon
          `]: {
            opacity: 0
          },
          [`${componentCls}-item-icon, ${iconCls}`]: {
            margin: 0,
            fontSize: collapsedIconSize,
            lineHeight: unit(itemHeight),
            "+ span": {
              display: "inline-block",
              opacity: 0
            }
          }
        },
        [`${componentCls}-item-icon, ${iconCls}`]: {
          display: "inline-block"
        },
        "&-tooltip": {
          pointerEvents: "none",
          [`${componentCls}-item-icon, ${iconCls}`]: {
            display: "none"
          },
          "a, a:hover": {
            color: colorTextLightSolid
          }
        },
        [`${componentCls}-item-group-title`]: {
          ...textEllipsis,
          paddingInline: paddingXS
        }
      }
    }
  ];
};
const genMenuItemStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    motionEaseOut,
    iconCls,
    iconSize,
    iconMarginInlineEnd
  } = token;
  return {
    // >>>>> Item
    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      position: "relative",
      display: "block",
      margin: 0,
      whiteSpace: "nowrap",
      cursor: "pointer",
      transition: [`border-color ${motionDurationSlow}`, `background-color ${motionDurationSlow}`, `padding calc(${motionDurationSlow} + 0.1s) ${motionEaseInOut}`].join(","),
      [`${componentCls}-item-icon, ${iconCls}`]: {
        minWidth: iconSize,
        fontSize: iconSize,
        transition: [`font-size ${motionDurationMid} ${motionEaseOut}`, `margin ${motionDurationSlow} ${motionEaseInOut}`, `color ${motionDurationSlow}`].join(","),
        "+ span": {
          marginInlineStart: iconMarginInlineEnd,
          opacity: 1,
          transition: [`opacity ${motionDurationSlow} ${motionEaseInOut}`, `margin ${motionDurationSlow}`, `color ${motionDurationSlow}`].join(",")
        }
      },
      [`${componentCls}-item-icon`]: {
        ...resetIcon()
      },
      [`&${componentCls}-item-only-child`]: {
        [`> ${iconCls}, > ${componentCls}-item-icon`]: {
          marginInlineEnd: 0
        }
      }
    },
    // Disabled state sets text to gray and nukes hover/tab effects
    [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
      background: "none !important",
      cursor: "not-allowed",
      "&::after": {
        borderColor: "transparent !important"
      },
      a: {
        color: "inherit !important",
        cursor: "not-allowed",
        pointerEvents: "none"
      },
      [`> ${componentCls}-submenu-title`]: {
        color: "inherit !important",
        cursor: "not-allowed"
      }
    }
  };
};
const genSubMenuArrowStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    motionEaseInOut,
    borderRadius,
    menuArrowSize,
    menuArrowOffset
  } = token;
  return {
    [`${componentCls}-submenu`]: {
      "&-expand-icon, &-arrow": {
        position: "absolute",
        top: "50%",
        insetInlineEnd: token.margin,
        width: menuArrowSize,
        color: "currentcolor",
        transform: "translateY(-50%)",
        transition: ["transform", "opacity"].map((prop) => `${prop} ${motionDurationSlow}`).join(",")
      },
      "&-arrow": {
        // →
        "&::before, &::after": {
          position: "absolute",
          width: token.calc(menuArrowSize).mul(0.6).equal(),
          height: token.calc(menuArrowSize).mul(0.15).equal(),
          backgroundColor: "currentcolor",
          borderRadius,
          transition: [`background-color`, `transform`, `top`, `color`].map((prop) => `${prop} ${motionDurationSlow} ${motionEaseInOut}`).join(","),
          content: '""'
        },
        "&::before": {
          transform: `rotate(45deg) translateY(${unit(token.calc(menuArrowOffset).mul(-1).equal())})`
        },
        "&::after": {
          transform: `rotate(-45deg) translateY(${unit(menuArrowOffset)})`
        }
      }
    }
  };
};
const getBaseStyle = (token) => {
  const {
    antCls,
    componentCls,
    fontSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    paddingXS,
    padding,
    colorSplit,
    lineWidth,
    zIndexPopup,
    borderRadiusLG,
    subMenuItemBorderRadius,
    menuArrowSize,
    menuArrowOffset,
    lineType,
    groupTitleLineHeight,
    groupTitleFontSize
  } = token;
  return [
    // Misc
    {
      "": {
        [componentCls]: {
          ...clearFix(),
          // Hidden
          "&-hidden": {
            display: "none"
          }
        }
      },
      [`${componentCls}-submenu-hidden`]: {
        display: "none"
      }
    },
    {
      [componentCls]: {
        ...resetComponent(token),
        ...clearFix(),
        marginBottom: 0,
        paddingInlineStart: 0,
        // Override default ul/ol
        fontSize,
        lineHeight: 0,
        // Fix display inline-block gap
        listStyle: "none",
        outline: "none",
        // Magic cubic here but smooth transition
        transition: `width ${motionDurationSlow} cubic-bezier(0.2, 0, 0, 1) 0s`,
        "ul, ol": {
          margin: 0,
          padding: 0,
          listStyle: "none"
        },
        // Overflow ellipsis
        "&-overflow": {
          display: "flex",
          [`${componentCls}-item`]: {
            flex: "none"
          }
        },
        [`${componentCls}-item, ${componentCls}-submenu, ${componentCls}-submenu-title`]: {
          borderRadius: token.itemBorderRadius
        },
        [`${componentCls}-item-group-title`]: {
          padding: `${unit(paddingXS)} ${unit(padding)}`,
          fontSize: groupTitleFontSize,
          lineHeight: groupTitleLineHeight,
          transition: `all ${motionDurationSlow}`
        },
        [`&-horizontal ${componentCls}-submenu`]: {
          transition: [`border-color`, `background-color`].map((prop) => `${prop} ${motionDurationSlow} ${motionEaseInOut}`).join(",")
        },
        [`${componentCls}-submenu, ${componentCls}-submenu-inline`]: {
          transition: [`border-color ${motionDurationSlow}`, `background-color ${motionDurationSlow}`, `padding ${motionDurationMid}`].map((prop) => `${prop} ${motionEaseInOut}`).join(",")
        },
        [`${componentCls}-submenu ${componentCls}-sub`]: {
          cursor: "initial",
          transition: [`background-color`, `padding`].map((prop) => `${prop} ${motionDurationSlow} ${motionEaseInOut}`).join(",")
        },
        [`${componentCls}-title-content`]: {
          transition: `color ${motionDurationSlow}`,
          "&-with-extra": {
            display: "inline-flex",
            alignItems: "center",
            width: "100%"
          },
          // https://github.com/ant-design/ant-design/issues/41143
          [`> ${antCls}-typography-ellipsis-single-line`]: {
            display: "inline",
            verticalAlign: "unset"
          },
          [`${componentCls}-item-extra`]: {
            marginInlineStart: "auto",
            paddingInlineStart: token.padding
          }
        },
        [`${componentCls}-item a`]: {
          "&::before": {
            position: "absolute",
            inset: 0,
            backgroundColor: "transparent",
            content: '""'
          }
        },
        // Removed a Badge related style seems it's safe
        // https://github.com/ant-design/ant-design/issues/19809
        // >>>>> Divider
        [`${componentCls}-item-divider`]: {
          overflow: "hidden",
          lineHeight: 0,
          borderColor: colorSplit,
          borderStyle: lineType,
          borderWidth: 0,
          borderTopWidth: lineWidth,
          marginBlock: lineWidth,
          padding: 0,
          "&-dashed": {
            borderStyle: "dashed"
          }
        },
        // Item
        ...genMenuItemStyle(token),
        [`${componentCls}-item-group`]: {
          [`${componentCls}-item-group-list`]: {
            margin: 0,
            padding: 0,
            [`${componentCls}-item, ${componentCls}-submenu-title`]: {
              paddingInline: `${unit(token.calc(fontSize).mul(2).equal())} ${unit(padding)}`
            }
          }
        },
        // ======================= Sub Menu =======================
        "&-submenu": {
          "&-popup": {
            position: "absolute",
            zIndex: zIndexPopup,
            borderRadius: borderRadiusLG,
            boxShadow: "none",
            transformOrigin: "0 0",
            [`&${componentCls}-submenu`]: {
              background: "transparent"
            },
            // https://github.com/ant-design/ant-design/issues/13955
            "&::before": {
              position: "absolute",
              inset: 0,
              zIndex: -1,
              width: "100%",
              height: "100%",
              opacity: 0,
              content: '""'
            },
            [`> ${componentCls}`]: {
              borderRadius: borderRadiusLG,
              ...genMenuItemStyle(token),
              ...genSubMenuArrowStyle(token),
              [`${componentCls}-item, ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
                borderRadius: subMenuItemBorderRadius
              },
              [`${componentCls}-submenu-title::after`]: {
                transition: `transform ${motionDurationSlow} ${motionEaseInOut}`
              }
            }
          },
          [`
          &-placement-leftTop,
          &-placement-bottomRight,
          `]: {
            transformOrigin: "100% 0"
          },
          [`
          &-placement-leftBottom,
          &-placement-topRight,
          `]: {
            transformOrigin: "100% 100%"
          },
          [`
          &-placement-rightBottom,
          &-placement-topLeft,
          `]: {
            transformOrigin: "0 100%"
          },
          [`
          &-placement-bottomLeft,
          &-placement-rightTop,
          `]: {
            transformOrigin: "0 0"
          },
          [`
          &-placement-leftTop,
          &-placement-leftBottom
          `]: {
            paddingInlineEnd: token.paddingXS
          },
          [`
          &-placement-rightTop,
          &-placement-rightBottom
          `]: {
            paddingInlineStart: token.paddingXS
          },
          [`
          &-placement-topRight,
          &-placement-topLeft
          `]: {
            paddingBottom: token.paddingXS
          },
          [`
          &-placement-bottomRight,
          &-placement-bottomLeft
          `]: {
            paddingTop: token.paddingXS
          }
        },
        ...genSubMenuArrowStyle(token),
        [`&-inline-collapsed ${componentCls}-submenu-arrow,
        &-inline ${componentCls}-submenu-arrow`]: {
          // ↓
          "&::before": {
            transform: `rotate(-45deg) translateX(${unit(menuArrowOffset)})`
          },
          "&::after": {
            transform: `rotate(45deg) translateX(${unit(token.calc(menuArrowOffset).mul(-1).equal())})`
          }
        },
        [`${componentCls}-submenu-open${componentCls}-submenu-inline > ${componentCls}-submenu-title > ${componentCls}-submenu-arrow`]: {
          // ↑
          transform: `translateY(${unit(token.calc(menuArrowSize).mul(0.2).mul(-1).equal())})`,
          "&::after": {
            transform: `rotate(-45deg) translateX(${unit(token.calc(menuArrowOffset).mul(-1).equal())})`
          },
          "&::before": {
            transform: `rotate(45deg) translateX(${unit(menuArrowOffset)})`
          }
        }
      }
    },
    // Integration with header element so menu items have the same height
    {
      [`${antCls}-layout-header`]: {
        [componentCls]: {
          lineHeight: "inherit"
        }
      }
    }
  ];
};
const prepareComponentToken$4 = (token) => {
  const {
    colorPrimary,
    colorError,
    colorTextDisabled,
    colorErrorBg,
    colorText,
    colorTextDescription,
    colorBgContainer,
    colorFillAlter,
    colorFillContent,
    lineWidth,
    lineWidthBold,
    controlItemBgActive,
    colorBgTextHover,
    controlHeightLG,
    lineHeight,
    colorBgElevated,
    marginXXS,
    padding,
    fontSize,
    controlHeightSM,
    fontSizeLG,
    colorTextLightSolid,
    colorErrorHover
  } = token;
  const activeBarWidth = token.activeBarWidth ?? 0;
  const activeBarBorderWidth = token.activeBarBorderWidth ?? lineWidth;
  const itemMarginInline = token.itemMarginInline ?? token.marginXXS;
  const colorTextDark = new FastColor(colorTextLightSolid).setA(0.65).toRgbString();
  return {
    dropdownWidth: 160,
    zIndexPopup: token.zIndexPopupBase + 50,
    radiusItem: token.borderRadiusLG,
    itemBorderRadius: token.borderRadiusLG,
    radiusSubMenuItem: token.borderRadiusSM,
    subMenuItemBorderRadius: token.borderRadiusSM,
    colorItemText: colorText,
    itemColor: colorText,
    colorItemTextHover: colorText,
    itemHoverColor: colorText,
    colorItemTextHoverHorizontal: colorPrimary,
    horizontalItemHoverColor: colorPrimary,
    colorGroupTitle: colorTextDescription,
    groupTitleColor: colorTextDescription,
    colorItemTextSelected: colorPrimary,
    itemSelectedColor: colorPrimary,
    subMenuItemSelectedColor: colorPrimary,
    colorItemTextSelectedHorizontal: colorPrimary,
    horizontalItemSelectedColor: colorPrimary,
    colorItemBg: colorBgContainer,
    itemBg: colorBgContainer,
    colorItemBgHover: colorBgTextHover,
    itemHoverBg: colorBgTextHover,
    colorItemBgActive: colorFillContent,
    itemActiveBg: controlItemBgActive,
    colorSubItemBg: colorFillAlter,
    subMenuItemBg: colorFillAlter,
    colorItemBgSelected: controlItemBgActive,
    itemSelectedBg: controlItemBgActive,
    colorItemBgSelectedHorizontal: "transparent",
    horizontalItemSelectedBg: "transparent",
    colorActiveBarWidth: 0,
    activeBarWidth,
    colorActiveBarHeight: lineWidthBold,
    activeBarHeight: lineWidthBold,
    colorActiveBarBorderSize: lineWidth,
    activeBarBorderWidth,
    // Disabled
    colorItemTextDisabled: colorTextDisabled,
    itemDisabledColor: colorTextDisabled,
    // Danger
    colorDangerItemText: colorError,
    dangerItemColor: colorError,
    colorDangerItemTextHover: colorError,
    dangerItemHoverColor: colorError,
    colorDangerItemTextSelected: colorError,
    dangerItemSelectedColor: colorError,
    colorDangerItemBgActive: colorErrorBg,
    dangerItemActiveBg: colorErrorBg,
    colorDangerItemBgSelected: colorErrorBg,
    dangerItemSelectedBg: colorErrorBg,
    itemMarginInline,
    horizontalItemBorderRadius: 0,
    horizontalItemHoverBg: "transparent",
    itemHeight: controlHeightLG,
    groupTitleLineHeight: lineHeight,
    collapsedWidth: controlHeightLG * 2,
    popupBg: colorBgElevated,
    itemMarginBlock: marginXXS,
    itemPaddingInline: padding,
    horizontalLineHeight: `${controlHeightLG * 1.15}px`,
    iconSize: fontSize,
    iconMarginInlineEnd: controlHeightSM - fontSize,
    collapsedIconSize: fontSizeLG,
    groupTitleFontSize: fontSize,
    // Disabled
    darkItemDisabledColor: new FastColor(colorTextLightSolid).setA(0.25).toRgbString(),
    // Dark
    darkItemColor: colorTextDark,
    darkDangerItemColor: colorError,
    darkItemBg: "#001529",
    darkPopupBg: "#001529",
    darkSubMenuItemBg: "#000c17",
    darkItemSelectedColor: colorTextLightSolid,
    darkItemSelectedBg: colorPrimary,
    darkDangerItemSelectedBg: colorError,
    darkItemHoverBg: "transparent",
    darkGroupTitleColor: colorTextDark,
    darkItemHoverColor: colorTextLightSolid,
    darkDangerItemHoverColor: colorErrorHover,
    darkDangerItemSelectedColor: colorTextLightSolid,
    darkDangerItemActiveBg: colorError,
    // internal
    itemWidth: activeBarWidth ? `calc(100% + ${activeBarBorderWidth}px)` : `calc(100% - ${itemMarginInline * 2}px)`
  };
};
const useStyle$9 = (prefixCls, rootCls = prefixCls, injectStyle = true) => {
  const useStyle2 = genStyleHooks("Menu", (token) => {
    const {
      colorBgElevated,
      controlHeightLG,
      fontSize,
      darkItemColor,
      darkDangerItemColor,
      darkItemBg,
      darkSubMenuItemBg,
      darkItemSelectedColor,
      darkItemSelectedBg,
      darkDangerItemSelectedBg,
      darkItemHoverBg,
      darkGroupTitleColor,
      darkItemHoverColor,
      darkItemDisabledColor,
      darkDangerItemHoverColor,
      darkDangerItemSelectedColor,
      darkDangerItemActiveBg,
      popupBg,
      darkPopupBg
    } = token;
    const menuArrowSize = token.calc(fontSize).div(7).mul(5).equal();
    const menuToken = merge$1(token, {
      menuArrowSize,
      menuHorizontalHeight: token.calc(controlHeightLG).mul(1.15).equal(),
      menuArrowOffset: token.calc(menuArrowSize).mul(0.25).equal(),
      menuSubMenuBg: colorBgElevated,
      calc: token.calc,
      popupBg
    });
    const menuDarkToken = merge$1(menuToken, {
      itemColor: darkItemColor,
      itemHoverColor: darkItemHoverColor,
      groupTitleColor: darkGroupTitleColor,
      itemSelectedColor: darkItemSelectedColor,
      subMenuItemSelectedColor: darkItemSelectedColor,
      itemBg: darkItemBg,
      popupBg: darkPopupBg,
      subMenuItemBg: darkSubMenuItemBg,
      itemActiveBg: "transparent",
      itemSelectedBg: darkItemSelectedBg,
      activeBarHeight: 0,
      activeBarBorderWidth: 0,
      itemHoverBg: darkItemHoverBg,
      // Disabled
      itemDisabledColor: darkItemDisabledColor,
      // Danger
      dangerItemColor: darkDangerItemColor,
      dangerItemHoverColor: darkDangerItemHoverColor,
      dangerItemSelectedColor: darkDangerItemSelectedColor,
      dangerItemActiveBg: darkDangerItemActiveBg,
      dangerItemSelectedBg: darkDangerItemSelectedBg,
      menuSubMenuBg: darkSubMenuItemBg,
      // Horizontal
      horizontalItemSelectedColor: darkItemSelectedColor,
      horizontalItemSelectedBg: darkItemSelectedBg
    });
    return [
      // Basic
      getBaseStyle(menuToken),
      // Horizontal
      getHorizontalStyle(menuToken),
      // Hard code for some light style
      // Vertical
      getVerticalStyle(menuToken),
      // Hard code for some light style
      // Theme
      getThemeStyle(menuToken, "light"),
      getThemeStyle(menuDarkToken, "dark"),
      // RTL
      getRTLStyle(menuToken),
      // Motion
      genCollapseMotion(menuToken),
      initSlideMotion(menuToken, "slide-up"),
      initSlideMotion(menuToken, "slide-down"),
      initZoomMotion(menuToken, "zoom-big")
    ];
  }, prepareComponentToken$4, {
    deprecatedTokens: [["colorGroupTitle", "groupTitleColor"], ["radiusItem", "itemBorderRadius"], ["radiusSubMenuItem", "subMenuItemBorderRadius"], ["colorItemText", "itemColor"], ["colorItemTextHover", "itemHoverColor"], ["colorItemTextHoverHorizontal", "horizontalItemHoverColor"], ["colorItemTextSelected", "itemSelectedColor"], ["colorItemTextSelectedHorizontal", "horizontalItemSelectedColor"], ["colorItemTextDisabled", "itemDisabledColor"], ["colorDangerItemText", "dangerItemColor"], ["colorDangerItemTextHover", "dangerItemHoverColor"], ["colorDangerItemTextSelected", "dangerItemSelectedColor"], ["colorDangerItemBgActive", "dangerItemActiveBg"], ["colorDangerItemBgSelected", "dangerItemSelectedBg"], ["colorItemBg", "itemBg"], ["colorItemBgHover", "itemHoverBg"], ["colorSubItemBg", "subMenuItemBg"], ["colorItemBgActive", "itemActiveBg"], ["colorItemBgSelectedHorizontal", "horizontalItemSelectedBg"], ["colorActiveBarWidth", "activeBarWidth"], ["colorActiveBarHeight", "activeBarHeight"], ["colorActiveBarBorderSize", "activeBarBorderWidth"], ["colorItemBgSelected", "itemSelectedBg"]],
    // Dropdown will handle menu style self. We do not need to handle this.
    injectStyle,
    unitless: {
      groupTitleLineHeight: true
    }
  });
  return useStyle2(prefixCls, rootCls);
};
const SubMenu = (props) => {
  const {
    popupClassName,
    icon,
    title,
    theme: customTheme
  } = props;
  const context = reactExports.useContext(MenuContext);
  const {
    prefixCls,
    inlineCollapsed,
    theme: contextTheme,
    classNames,
    styles
  } = context;
  const parentPath = useFullPath();
  let titleNode;
  if (!icon) {
    titleNode = inlineCollapsed && !parentPath.length && title && typeof title === "string" ? /* @__PURE__ */ reactExports.createElement("div", {
      className: `${prefixCls}-inline-collapsed-noicon`
    }, title.charAt(0)) : /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-title-content`
    }, title);
  } else {
    const titleIsSpan = /* @__PURE__ */ reactExports.isValidElement(title) && title.type === "span";
    titleNode = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, cloneElement(icon, (oriProps) => ({
      className: clsx(oriProps.className, `${prefixCls}-item-icon`, classNames?.itemIcon),
      style: {
        ...oriProps.style,
        ...styles?.itemIcon
      }
    })), titleIsSpan ? title : /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-title-content`
    }, title));
  }
  const contextValue = reactExports.useMemo(() => ({
    ...context,
    firstLevel: false
  }), [context]);
  const [zIndex] = useZIndex("Menu");
  return /* @__PURE__ */ reactExports.createElement(MenuContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement(SubMenu$1, {
    ...omit(props, ["icon"]),
    title: titleNode,
    classNames: {
      list: classNames?.subMenu?.list,
      listTitle: classNames?.subMenu?.itemTitle
    },
    styles: {
      list: styles?.subMenu?.list,
      listTitle: styles?.subMenu?.itemTitle
    },
    popupClassName: clsx(prefixCls, popupClassName, classNames?.popup?.root, `${prefixCls}-${customTheme || contextTheme}`),
    popupStyle: {
      zIndex,
      // fix: https://github.com/ant-design/ant-design/issues/47826#issuecomment-2360737237
      ...props.popupStyle,
      ...styles?.popup?.root
    }
  }));
};
function isEmptyIcon(icon) {
  return icon === null || icon === false;
}
const MENU_COMPONENTS = {
  item: MenuItem,
  submenu: SubMenu,
  divider: MenuDivider
};
const InternalMenu = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const override = reactExports.useContext(OverrideContext);
  const overrideObj = override || {};
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    theme = "light",
    expandIcon,
    _internalDisableMenuItemTitleTooltip,
    tooltip,
    inlineCollapsed,
    siderCollapsed,
    rootClassName,
    mode,
    selectable,
    onClick,
    overflowedIndicatorPopupClassName,
    classNames,
    styles,
    ...restProps
  } = props;
  const {
    menu
  } = reactExports.useContext(ConfigContext);
  const {
    getPrefixCls,
    getPopupContainer,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("menu");
  const rootPrefixCls = getPrefixCls();
  const passedProps = omit(restProps, ["collapsedWidth"]);
  overrideObj.validator?.({
    mode
  });
  const onItemClick = useEvent((...args) => {
    onClick?.(...args);
    overrideObj.onClick?.();
  });
  const mergedMode = overrideObj.mode || mode;
  const mergedSelectable = selectable ?? overrideObj.selectable;
  const mergedInlineCollapsed = inlineCollapsed ?? siderCollapsed;
  const mergedProps = {
    ...props,
    mode: mergedMode,
    inlineCollapsed: mergedInlineCollapsed,
    selectable: mergedSelectable,
    theme
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps
  }, {
    popup: {
      _default: "root"
    },
    subMenu: {
      _default: "item"
    }
  });
  const defaultMotions = {
    horizontal: {
      motionName: `${rootPrefixCls}-slide-up`
    },
    inline: initCollapseMotion(rootPrefixCls),
    other: {
      motionName: `${rootPrefixCls}-zoom-big`
    }
  };
  const prefixCls = getPrefixCls("menu", customizePrefixCls || overrideObj.prefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle$9(prefixCls, rootCls, !override);
  const menuClassName = clsx(`${prefixCls}-${theme}`, contextClassName, className);
  const mergedExpandIcon = reactExports.useMemo(() => {
    if (typeof expandIcon === "function" || isEmptyIcon(expandIcon)) {
      return expandIcon || null;
    }
    if (typeof overrideObj.expandIcon === "function" || isEmptyIcon(overrideObj.expandIcon)) {
      return overrideObj.expandIcon || null;
    }
    if (typeof menu?.expandIcon === "function" || isEmptyIcon(menu?.expandIcon)) {
      return menu?.expandIcon || null;
    }
    const mergedIcon = expandIcon ?? overrideObj?.expandIcon ?? menu?.expandIcon;
    return cloneElement(mergedIcon, {
      className: clsx(`${prefixCls}-submenu-expand-icon`, /* @__PURE__ */ reactExports.isValidElement(mergedIcon) ? mergedIcon.props?.className : void 0)
    });
  }, [expandIcon, overrideObj?.expandIcon, menu?.expandIcon, prefixCls]);
  const contextValue = reactExports.useMemo(() => ({
    prefixCls,
    inlineCollapsed: mergedInlineCollapsed || false,
    direction,
    firstLevel: true,
    theme,
    mode: mergedMode,
    disableMenuItemTitleTooltip: _internalDisableMenuItemTitleTooltip,
    tooltip,
    classNames: mergedClassNames,
    styles: mergedStyles
  }), [prefixCls, mergedInlineCollapsed, direction, _internalDisableMenuItemTitleTooltip, theme, mergedMode, mergedClassNames, mergedStyles, tooltip]);
  return /* @__PURE__ */ reactExports.createElement(OverrideContext.Provider, {
    value: null
  }, /* @__PURE__ */ reactExports.createElement(MenuContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement(ExportMenu, {
    getPopupContainer,
    overflowedIndicator: /* @__PURE__ */ reactExports.createElement(RefIcon$c, null),
    overflowedIndicatorPopupClassName: clsx(prefixCls, `${prefixCls}-${theme}`, overflowedIndicatorPopupClassName),
    classNames: {
      list: mergedClassNames.list,
      listTitle: mergedClassNames.itemTitle
    },
    styles: {
      list: mergedStyles.list,
      listTitle: mergedStyles.itemTitle
    },
    mode: mergedMode,
    selectable: mergedSelectable,
    onClick: onItemClick,
    ...passedProps,
    inlineCollapsed: mergedInlineCollapsed,
    style: {
      ...mergedStyles.root,
      ...contextStyle,
      ...style
    },
    className: menuClassName,
    prefixCls,
    direction,
    defaultMotions,
    expandIcon: mergedExpandIcon,
    ref,
    rootClassName: clsx(rootClassName, hashId, overrideObj.rootClassName, cssVarCls, rootCls, mergedClassNames.root),
    _internalComponents: MENU_COMPONENTS
  })));
});
const Menu = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const menuRef = reactExports.useRef(null);
  const context = reactExports.useContext(SiderContext);
  reactExports.useImperativeHandle(ref, () => ({
    menu: menuRef.current,
    focus: (options) => {
      menuRef.current?.focus(options);
    }
  }));
  return /* @__PURE__ */ reactExports.createElement(InternalMenu, {
    ref: menuRef,
    ...props,
    ...context
  });
});
Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.Divider = MenuDivider;
Menu.ItemGroup = MenuItemGroup;
const formItemNameBlackList = ["parentNode"];
const defaultItemNamePrefixCls = "form_item";
function toArray(candidate) {
  if (candidate === void 0 || candidate === false) {
    return [];
  }
  return Array.isArray(candidate) ? candidate : [candidate];
}
function getFieldId(namePath, formName) {
  if (!namePath.length) {
    return void 0;
  }
  const mergedId = namePath.join("_");
  if (formName) {
    return `${formName}_${mergedId}`;
  }
  const isIllegalName = formItemNameBlackList.includes(mergedId);
  return isIllegalName ? `${defaultItemNamePrefixCls}_${mergedId}` : mergedId;
}
function getStatus(errors, warnings, meta, defaultValidateStatus, hasFeedback, validateStatus) {
  let status = defaultValidateStatus;
  if (validateStatus !== void 0) {
    status = validateStatus;
  } else if (meta.validating) {
    status = "validating";
  } else if (errors.length) {
    status = "error";
  } else if (warnings.length) {
    status = "warning";
  } else if (meta.touched || hasFeedback && meta.validated) {
    status = "success";
  }
  return status;
}
function toNamePathStr(name) {
  const namePath = toArray(name);
  return namePath.join("_");
}
function getFieldDOMNode(name, wrapForm) {
  const field = wrapForm.getFieldInstance(name);
  const fieldDom = getDOM(field);
  if (fieldDom) {
    return fieldDom;
  }
  const fieldId = getFieldId(toArray(name), wrapForm.__INTERNAL__.name);
  if (fieldId) {
    return document.getElementById(fieldId);
  }
}
function useForm(form) {
  const [rcForm] = useForm$1();
  const itemsRef = reactExports.useRef({});
  const wrapForm = reactExports.useMemo(() => form ?? {
    ...rcForm,
    __INTERNAL__: {
      itemRef: (name) => (node) => {
        const namePathStr = toNamePathStr(name);
        if (node) {
          itemsRef.current[namePathStr] = node;
        } else {
          delete itemsRef.current[namePathStr];
        }
      }
    },
    scrollToField: (name, options = {}) => {
      const {
        focus,
        ...restOpt
      } = options;
      const node = getFieldDOMNode(name, wrapForm);
      if (node) {
        e(node, {
          scrollMode: "if-needed",
          block: "nearest",
          ...restOpt
        });
        if (focus) {
          wrapForm.focusField(name);
        }
      }
    },
    focusField: (name) => {
      const itemRef = wrapForm.getFieldInstance(name);
      if (typeof itemRef?.focus === "function") {
        itemRef.focus();
      } else {
        getFieldDOMNode(name, wrapForm)?.focus?.();
      }
    },
    getFieldInstance: (name) => {
      const namePathStr = toNamePathStr(name);
      return itemsRef.current[namePathStr];
    }
  }, [form, rcForm]);
  return [wrapForm];
}
const RadioGroupContext = /* @__PURE__ */ reactExports.createContext(void 0);
const RadioGroupContextProvider = RadioGroupContext.Provider;
const RadioOptionTypeContext = /* @__PURE__ */ reactExports.createContext(void 0);
const RadioOptionTypeContextProvider = RadioOptionTypeContext.Provider;
function useBubbleLock(onOriginInputClick) {
  const labelClickLockRef = React.useRef(null);
  const clearLock = () => {
    wrapperRaf.cancel(labelClickLockRef.current);
    labelClickLockRef.current = null;
  };
  const onLabelClick = () => {
    clearLock();
    labelClickLockRef.current = wrapperRaf(() => {
      labelClickLockRef.current = null;
    });
  };
  const onInputClick = (e2) => {
    if (labelClickLockRef.current) {
      e2.stopPropagation();
      clearLock();
    }
    onOriginInputClick?.(e2);
  };
  return [onLabelClick, onInputClick];
}
const getGroupRadioStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  const groupPrefixCls = `${componentCls}-group`;
  return {
    [groupPrefixCls]: {
      ...resetComponent(token),
      display: "inline-block",
      fontSize: 0,
      // RTL
      [`&${groupPrefixCls}-rtl`]: {
        direction: "rtl"
      },
      [`&${groupPrefixCls}-block`]: {
        display: "flex"
      },
      [`${antCls}-badge ${antCls}-badge-count`]: {
        zIndex: 1
      },
      [`> ${antCls}-badge:not(:first-child) > ${antCls}-button-wrapper`]: {
        borderInlineStart: "none"
      },
      "&-vertical": {
        display: "flex",
        flexDirection: "column",
        rowGap: token.marginXS,
        [`${componentCls}-wrapper`]: {
          marginInlineEnd: 0
        }
      }
    }
  };
};
const getRadioBasicStyle = (token) => {
  const {
    componentCls,
    wrapperMarginInlineEnd,
    colorPrimary,
    colorPrimaryHover,
    radioSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOutCirc,
    colorBgContainer,
    colorBorder,
    lineWidth,
    colorBgContainerDisabled,
    colorTextDisabled,
    paddingXS,
    dotColorDisabled,
    dotSize,
    lineType,
    radioColor,
    radioBgColor
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      ...resetComponent(token),
      display: "inline-flex",
      alignItems: "baseline",
      marginInlineStart: 0,
      marginInlineEnd: wrapperMarginInlineEnd,
      cursor: "pointer",
      "&:last-child": {
        marginInlineEnd: 0
      },
      // RTL
      [`&${componentCls}-wrapper-rtl`]: {
        direction: "rtl"
      },
      "&-disabled": {
        cursor: "not-allowed",
        color: token.colorTextDisabled
      },
      "&::after": {
        display: "inline-block",
        width: 0,
        overflow: "hidden",
        content: '"\\a0"'
      },
      "&-block": {
        flex: 1,
        justifyContent: "center"
      },
      // ===================== Radio =====================
      [componentCls]: {
        ...resetComponent(token),
        position: "relative",
        whiteSpace: "nowrap",
        lineHeight: 1,
        cursor: "pointer",
        alignSelf: "center",
        // Styles moved from inner
        boxSizing: "border-box",
        display: "block",
        width: `calc(${radioSize} * 1px)`,
        height: `calc(${radioSize} * 1px)`,
        backgroundColor: colorBgContainer,
        border: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
        borderRadius: "50%",
        transition: `all ${motionDurationMid}`,
        // Dot
        "&:after": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0)",
          width: `calc(${dotSize} * 1px)`,
          height: `calc(${dotSize} * 1px)`,
          backgroundColor: radioColor,
          borderRadius: "50%",
          transformOrigin: "50% 50%",
          opacity: 0,
          transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`
        },
        // Wrapper > Radio > input
        [`${componentCls}-input`]: {
          position: "absolute",
          inset: 0,
          zIndex: 1,
          cursor: "pointer",
          opacity: 0,
          margin: 0
        },
        // Focus outline on radio when input is focus-visible
        [`&:has(${componentCls}-input:focus-visible)`]: genFocusOutline(token)
      },
      // ===================== Hover =====================
      [`&:hover ${componentCls}`]: {
        borderColor: colorPrimary
      },
      [`&:hover ${componentCls}-checked:not(${componentCls}-disabled)`]: {
        backgroundColor: colorPrimaryHover,
        borderColor: "transparent"
      },
      // ==================== Checked ====================
      [`${componentCls}-checked`]: {
        backgroundColor: radioBgColor,
        borderColor: colorPrimary,
        "&::after": {
          transform: `translate(-50%, -50%)`,
          opacity: 1
        }
      },
      // ==================== Disable ====================
      [`${componentCls}-disabled`]: {
        // Wrapper > Radio > input
        [`&, ${componentCls}-input`]: {
          cursor: "not-allowed",
          // Disabled for native input to enable Tooltip event handler
          pointerEvents: "none"
        },
        // Disabled radio styles
        background: colorBgContainerDisabled,
        borderColor: colorBorder,
        "&::after": {
          backgroundColor: dotColorDisabled
        }
      },
      [`${componentCls}-disabled + span`]: {
        color: colorTextDisabled,
        cursor: "not-allowed"
      },
      [`span${componentCls} + *`]: {
        paddingInlineStart: paddingXS,
        paddingInlineEnd: paddingXS
      }
    }
  };
};
const getRadioButtonStyle = (token) => {
  const {
    buttonColor,
    controlHeight,
    componentCls,
    lineWidth,
    lineType,
    colorBorder,
    motionDurationMid,
    buttonPaddingInline,
    fontSize,
    buttonBg,
    fontSizeLG,
    controlHeightLG,
    controlHeightSM,
    paddingXS,
    borderRadius,
    borderRadiusSM,
    borderRadiusLG,
    buttonCheckedBg,
    buttonSolidCheckedColor,
    colorTextDisabled,
    colorBgContainerDisabled,
    buttonCheckedBgDisabled,
    buttonCheckedColorDisabled,
    colorPrimary,
    colorPrimaryHover,
    colorPrimaryActive,
    buttonSolidCheckedBg,
    buttonSolidCheckedHoverBg,
    buttonSolidCheckedActiveBg,
    calc
  } = token;
  return {
    [`${componentCls}-button-wrapper`]: {
      position: "relative",
      display: "inline-block",
      height: controlHeight,
      margin: 0,
      paddingInline: buttonPaddingInline,
      paddingBlock: 0,
      color: buttonColor,
      fontSize,
      lineHeight: unit(calc(controlHeight).sub(calc(lineWidth).mul(2)).equal()),
      background: buttonBg,
      border: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
      // strange align fix for chrome but works
      // https://gw.alipayobjects.com/zos/rmsportal/VFTfKXJuogBAXcvfAUWJ.gif
      borderBlockStartWidth: calc(lineWidth).add(0.02).equal(),
      borderInlineEndWidth: lineWidth,
      cursor: "pointer",
      transition: [`color`, `background-color`, `box-shadow`].map((prop) => `${prop} ${motionDurationMid}`).join(","),
      a: {
        color: buttonColor
      },
      [`> ${componentCls}-button`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: -1,
        width: "100%",
        height: "100%"
      },
      "&:not(:last-child)": {
        marginInlineEnd: calc(lineWidth).mul(-1).equal()
      },
      "&:first-child": {
        borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
        borderStartStartRadius: borderRadius,
        borderEndStartRadius: borderRadius
      },
      "&:last-child": {
        borderStartEndRadius: borderRadius,
        borderEndEndRadius: borderRadius
      },
      "&:first-child:last-child": {
        borderRadius
      },
      [`${componentCls}-group-large &`]: {
        height: controlHeightLG,
        fontSize: fontSizeLG,
        lineHeight: unit(calc(controlHeightLG).sub(calc(lineWidth).mul(2)).equal()),
        "&:first-child": {
          borderStartStartRadius: borderRadiusLG,
          borderEndStartRadius: borderRadiusLG
        },
        "&:last-child": {
          borderStartEndRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG
        }
      },
      [`${componentCls}-group-small &`]: {
        height: controlHeightSM,
        paddingInline: calc(paddingXS).sub(lineWidth).equal(),
        paddingBlock: 0,
        lineHeight: unit(calc(controlHeightSM).sub(calc(lineWidth).mul(2)).equal()),
        "&:first-child": {
          borderStartStartRadius: borderRadiusSM,
          borderEndStartRadius: borderRadiusSM
        },
        "&:last-child": {
          borderStartEndRadius: borderRadiusSM,
          borderEndEndRadius: borderRadiusSM
        }
      },
      "&:hover": {
        position: "relative",
        color: colorPrimary
      },
      "&:has(:focus-visible)": genFocusOutline(token),
      [`${componentCls}, input[type='checkbox'], input[type='radio']`]: {
        width: 0,
        height: 0,
        opacity: 0,
        pointerEvents: "none"
      },
      [`&-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        zIndex: 1,
        color: colorPrimary,
        background: buttonCheckedBg,
        borderColor: colorPrimary,
        "&::before": {
          backgroundColor: colorPrimary
        },
        "&:first-child": {
          borderColor: colorPrimary
        },
        "&:hover": {
          color: colorPrimaryHover,
          borderColor: colorPrimaryHover,
          "&::before": {
            backgroundColor: colorPrimaryHover
          }
        },
        "&:active": {
          color: colorPrimaryActive,
          borderColor: colorPrimaryActive,
          "&::before": {
            backgroundColor: colorPrimaryActive
          }
        }
      },
      [`${componentCls}-group-solid &-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        color: buttonSolidCheckedColor,
        background: buttonSolidCheckedBg,
        borderColor: buttonSolidCheckedBg,
        "&:hover": {
          color: buttonSolidCheckedColor,
          background: buttonSolidCheckedHoverBg,
          borderColor: buttonSolidCheckedHoverBg
        },
        "&:active": {
          color: buttonSolidCheckedColor,
          background: buttonSolidCheckedActiveBg,
          borderColor: buttonSolidCheckedActiveBg
        }
      },
      "&-disabled": {
        color: colorTextDisabled,
        backgroundColor: colorBgContainerDisabled,
        borderColor: colorBorder,
        cursor: "not-allowed",
        "&:first-child, &:hover": {
          color: colorTextDisabled,
          backgroundColor: colorBgContainerDisabled,
          borderColor: colorBorder
        }
      },
      [`&-disabled${componentCls}-button-wrapper-checked`]: {
        color: buttonCheckedColorDisabled,
        backgroundColor: buttonCheckedBgDisabled,
        borderColor: colorBorder,
        boxShadow: "none"
      },
      "&-block": {
        flex: 1,
        textAlign: "center"
      }
    }
  };
};
const prepareComponentToken$3 = (token) => {
  const {
    wireframe,
    padding,
    marginXS,
    lineWidth,
    fontSizeLG,
    colorText,
    colorBgContainer,
    colorTextDisabled,
    controlItemBgActiveDisabled,
    colorTextLightSolid,
    colorPrimary,
    colorPrimaryHover,
    colorPrimaryActive,
    colorWhite
  } = token;
  const dotPadding = 4;
  const radioSize = fontSizeLG;
  const radioDotSize = wireframe ? radioSize - dotPadding * 2 : radioSize - (dotPadding + lineWidth) * 2;
  return {
    // Radio
    radioSize,
    dotSize: radioDotSize,
    dotColorDisabled: colorTextDisabled,
    // Radio buttons
    buttonSolidCheckedColor: colorTextLightSolid,
    buttonSolidCheckedBg: colorPrimary,
    buttonSolidCheckedHoverBg: colorPrimaryHover,
    buttonSolidCheckedActiveBg: colorPrimaryActive,
    buttonBg: colorBgContainer,
    buttonCheckedBg: colorBgContainer,
    buttonColor: colorText,
    buttonCheckedBgDisabled: controlItemBgActiveDisabled,
    buttonCheckedColorDisabled: colorTextDisabled,
    buttonPaddingInline: padding - lineWidth,
    wrapperMarginInlineEnd: marginXS,
    // internal
    radioColor: wireframe ? colorPrimary : colorWhite,
    radioBgColor: wireframe ? colorBgContainer : colorPrimary
  };
};
const useStyle$8 = genStyleHooks("Radio", (token) => {
  const {
    controlOutline,
    controlOutlineWidth
  } = token;
  const radioFocusShadow = `0 0 0 ${unit(controlOutlineWidth)} ${controlOutline}`;
  const radioButtonFocusShadow = radioFocusShadow;
  const radioToken = merge$1(token, {
    radioFocusShadow,
    radioButtonFocusShadow
  });
  return [getGroupRadioStyle(radioToken), getRadioBasicStyle(radioToken), getRadioButtonStyle(radioToken)];
}, prepareComponentToken$3, {
  unitless: {
    radioSize: true,
    dotSize: true
  }
});
const InternalRadio = (props, ref) => {
  const groupContext = reactExports.useContext(RadioGroupContext);
  const radioOptionTypeContext = reactExports.useContext(RadioOptionTypeContext);
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("radio");
  const innerRef = reactExports.useRef(null);
  const mergedRef = composeRef(ref, innerRef);
  const {
    isFormItemInput
  } = reactExports.useContext(FormItemInputContext);
  const onChange = (e2) => {
    props.onChange?.(e2);
    groupContext?.onChange?.(e2);
  };
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    style,
    title,
    classNames,
    styles,
    ...restProps
  } = props;
  const radioPrefixCls = getPrefixCls("radio", customizePrefixCls);
  const isButtonType = (groupContext?.optionType || radioOptionTypeContext) === "button";
  const prefixCls = isButtonType ? `${radioPrefixCls}-button` : radioPrefixCls;
  const rootCls = useCSSVarCls(radioPrefixCls);
  const [hashId, cssVarCls] = useStyle$8(radioPrefixCls, rootCls);
  const radioProps = {
    ...restProps
  };
  const disabled = reactExports.useContext(DisabledContext);
  let mergedChecked = radioProps.checked;
  if (groupContext) {
    radioProps.name = groupContext.name;
    radioProps.onChange = onChange;
    mergedChecked = props.value === groupContext.value;
    radioProps.disabled = radioProps.disabled ?? groupContext.disabled;
  }
  radioProps.disabled = radioProps.disabled ?? disabled;
  const mergedProps = {
    ...props,
    ...radioProps,
    checked: mergedChecked
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps
  });
  const wrapperClassString = clsx(`${prefixCls}-wrapper`, {
    [`${prefixCls}-wrapper-checked`]: mergedChecked,
    [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    [`${prefixCls}-wrapper-rtl`]: direction === "rtl",
    [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput,
    [`${prefixCls}-wrapper-block`]: !!groupContext?.block
  }, contextClassName, className, rootClassName, mergedClassNames.root, hashId, cssVarCls, rootCls);
  const [onLabelClick, onInputClick] = useBubbleLock(radioProps.onClick);
  return /* @__PURE__ */ reactExports.createElement(Wave, {
    component: "Radio",
    disabled: radioProps.disabled
  }, /* @__PURE__ */ reactExports.createElement("label", {
    className: wrapperClassString,
    style: {
      ...mergedStyles.root,
      ...contextStyle,
      ...style
    },
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    title,
    onClick: onLabelClick
  }, /* @__PURE__ */ reactExports.createElement(Checkbox, {
    ...radioProps,
    checked: mergedChecked,
    className: clsx(mergedClassNames.icon, {
      [TARGET_CLS]: !isButtonType
    }),
    style: mergedStyles.icon,
    type: "radio",
    prefixCls,
    ref: mergedRef,
    onClick: onInputClick
  }), children !== void 0 ? /* @__PURE__ */ reactExports.createElement("span", {
    className: clsx(`${prefixCls}-label`, mergedClassNames.label),
    style: mergedStyles.label
  }, children) : null));
};
const Radio$1 = /* @__PURE__ */ reactExports.forwardRef(InternalRadio);
const RadioGroup = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    name: formItemName
  } = reactExports.useContext(FormItemInputContext);
  const defaultName = useId(toNamePathStr(formItemName));
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    options,
    buttonStyle = "outline",
    disabled,
    children,
    size: customizeSize,
    style,
    id,
    optionType,
    name = defaultName,
    defaultValue,
    value: customizedValue,
    block = false,
    onChange,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    orientation,
    vertical,
    role = "radiogroup"
  } = props;
  const [value, setValue] = useControlledState(defaultValue, customizedValue);
  const onRadioChange = reactExports.useCallback((event) => {
    const lastValue = value;
    const val = event.target.value;
    if (!("value" in props)) {
      setValue(val);
    }
    if (val !== lastValue) {
      onChange?.(event);
    }
  }, [value, setValue, onChange]);
  const prefixCls = getPrefixCls("radio", customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle$8(prefixCls, rootCls);
  let childrenToRender = children;
  if (options && options.length > 0) {
    childrenToRender = options.map((option) => {
      if (typeof option === "string" || typeof option === "number") {
        return /* @__PURE__ */ reactExports.createElement(Radio$1, {
          key: option.toString(),
          prefixCls,
          disabled,
          value: option,
          checked: value === option
        }, option);
      }
      return /* @__PURE__ */ reactExports.createElement(Radio$1, {
        key: `radio-group-value-options-${option.value}`,
        prefixCls,
        disabled: option.disabled || disabled,
        value: option.value,
        checked: value === option.value,
        title: option.title,
        style: option.style,
        className: option.className,
        id: option.id,
        required: option.required
      }, option.label);
    });
  }
  const mergedSize = useSize(customizeSize);
  const [, mergedVertical] = useOrientation(orientation, vertical);
  const classString = clsx(groupPrefixCls, `${groupPrefixCls}-${buttonStyle}`, {
    [`${groupPrefixCls}-${mergedSize}`]: mergedSize,
    [`${groupPrefixCls}-rtl`]: direction === "rtl",
    [`${groupPrefixCls}-block`]: block
  }, className, rootClassName, hashId, cssVarCls, rootCls);
  const memoizedValue = reactExports.useMemo(() => ({
    onChange: onRadioChange,
    value,
    disabled,
    name,
    optionType,
    block
  }), [onRadioChange, value, disabled, name, optionType, block]);
  return /* @__PURE__ */ reactExports.createElement("div", {
    ...pickAttrs(props, {
      aria: true,
      data: true
    }),
    role,
    className: clsx(classString, {
      [`${prefixCls}-group-vertical`]: mergedVertical
    }),
    style,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    id,
    ref
  }, /* @__PURE__ */ reactExports.createElement(RadioGroupContextProvider, {
    value: memoizedValue
  }, childrenToRender));
});
const Group$1 = /* @__PURE__ */ reactExports.memo(RadioGroup);
const RadioButton = (props, ref) => {
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    ...radioProps
  } = props;
  const prefixCls = getPrefixCls("radio", customizePrefixCls);
  return /* @__PURE__ */ reactExports.createElement(RadioOptionTypeContextProvider, {
    value: "button"
  }, /* @__PURE__ */ reactExports.createElement(Radio$1, {
    prefixCls,
    ...radioProps,
    type: "radio",
    ref
  }));
};
const Button = /* @__PURE__ */ reactExports.forwardRef(RadioButton);
const Radio = Radio$1;
Radio.Button = Button;
Radio.Group = Group$1;
Radio.__ANT_RADIO = true;
const YEAR_SELECT_OFFSET = 10;
const YEAR_SELECT_TOTAL = 20;
function YearSelect(props) {
  const {
    fullscreen,
    validRange,
    generateConfig: generateConfig2,
    locale: locale2,
    prefixCls,
    value,
    onChange,
    divRef
  } = props;
  const year = generateConfig2.getYear(value || generateConfig2.getNow());
  let start = year - YEAR_SELECT_OFFSET;
  let end = start + YEAR_SELECT_TOTAL;
  if (validRange) {
    start = generateConfig2.getYear(validRange[0]);
    end = generateConfig2.getYear(validRange[1]) + 1;
  }
  const suffix = locale2 && locale2.year === "年" ? "年" : "";
  const options = [];
  for (let index = start; index < end; index++) {
    options.push({
      label: `${index}${suffix}`,
      value: index
    });
  }
  return /* @__PURE__ */ reactExports.createElement(Select, {
    size: fullscreen ? void 0 : "small",
    options,
    value: year,
    className: `${prefixCls}-year-select`,
    onChange: (numYear) => {
      let newDate = generateConfig2.setYear(value, numYear);
      if (validRange) {
        const [startDate, endDate] = validRange;
        const newYear = generateConfig2.getYear(newDate);
        const newMonth = generateConfig2.getMonth(newDate);
        if (newYear === generateConfig2.getYear(endDate) && newMonth > generateConfig2.getMonth(endDate)) {
          newDate = generateConfig2.setMonth(newDate, generateConfig2.getMonth(endDate));
        }
        if (newYear === generateConfig2.getYear(startDate) && newMonth < generateConfig2.getMonth(startDate)) {
          newDate = generateConfig2.setMonth(newDate, generateConfig2.getMonth(startDate));
        }
      }
      onChange(newDate);
    },
    getPopupContainer: () => divRef.current
  });
}
function MonthSelect(props) {
  const {
    prefixCls,
    fullscreen,
    validRange,
    value,
    generateConfig: generateConfig2,
    locale: locale2,
    onChange,
    divRef
  } = props;
  const month = generateConfig2.getMonth(value || generateConfig2.getNow());
  let start = 0;
  let end = 11;
  if (validRange) {
    const [rangeStart, rangeEnd] = validRange;
    const currentYear = generateConfig2.getYear(value);
    if (generateConfig2.getYear(rangeEnd) === currentYear) {
      end = generateConfig2.getMonth(rangeEnd);
    }
    if (generateConfig2.getYear(rangeStart) === currentYear) {
      start = generateConfig2.getMonth(rangeStart);
    }
  }
  const months = locale2.shortMonths || generateConfig2.locale.getShortMonths(locale2.locale);
  const options = [];
  for (let index = start; index <= end; index += 1) {
    options.push({
      label: months[index],
      value: index
    });
  }
  return /* @__PURE__ */ reactExports.createElement(Select, {
    size: fullscreen ? void 0 : "small",
    className: `${prefixCls}-month-select`,
    value: month,
    options,
    onChange: (newMonth) => {
      onChange(generateConfig2.setMonth(value, newMonth));
    },
    getPopupContainer: () => divRef.current
  });
}
function ModeSwitch(props) {
  const {
    prefixCls,
    locale: locale2,
    mode,
    fullscreen,
    onModeChange
  } = props;
  return /* @__PURE__ */ reactExports.createElement(Group$1, {
    onChange: ({
      target: {
        value
      }
    }) => {
      onModeChange(value);
    },
    value: mode,
    size: fullscreen ? void 0 : "small",
    className: `${prefixCls}-mode-switch`
  }, /* @__PURE__ */ reactExports.createElement(Button, {
    value: "month"
  }, locale2.month), /* @__PURE__ */ reactExports.createElement(Button, {
    value: "year"
  }, locale2.year));
}
function CalendarHeader(props) {
  const {
    prefixCls,
    fullscreen,
    mode,
    onChange,
    onModeChange,
    className,
    style
  } = props;
  const divRef = reactExports.useRef(null);
  const formItemInputContext = reactExports.useContext(FormItemInputContext);
  const mergedFormItemInputContext = reactExports.useMemo(() => ({
    ...formItemInputContext,
    isFormItemInput: false
  }), [formItemInputContext]);
  const sharedProps = {
    ...props,
    fullscreen,
    divRef
  };
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(`${prefixCls}-header`, className),
    style,
    ref: divRef
  }, /* @__PURE__ */ reactExports.createElement(FormItemInputContext.Provider, {
    value: mergedFormItemInputContext
  }, /* @__PURE__ */ reactExports.createElement(YearSelect, {
    ...sharedProps,
    onChange: (v) => {
      onChange(v, "year");
    }
  }), mode === "month" && /* @__PURE__ */ reactExports.createElement(MonthSelect, {
    ...sharedProps,
    onChange: (v) => {
      onChange(v, "month");
    }
  })), /* @__PURE__ */ reactExports.createElement(ModeSwitch, {
    ...sharedProps,
    onModeChange
  }));
}
function initInputToken(token) {
  return merge$1(token, {
    inputAffixPadding: token.paddingXXS
  });
}
const initComponentToken = (token) => {
  const {
    controlHeight,
    fontSize,
    lineHeight,
    lineWidth,
    controlHeightSM,
    controlHeightLG,
    fontSizeLG,
    lineHeightLG,
    paddingSM,
    controlPaddingHorizontalSM,
    controlPaddingHorizontal,
    colorFillAlter,
    colorPrimaryHover,
    colorPrimary,
    controlOutlineWidth,
    controlOutline,
    colorErrorOutline,
    colorWarningOutline,
    colorBgContainer,
    inputFontSize,
    inputFontSizeLG,
    inputFontSizeSM
  } = token;
  const mergedFontSize = inputFontSize || fontSize;
  const mergedFontSizeSM = inputFontSizeSM || mergedFontSize;
  const mergedFontSizeLG = inputFontSizeLG || fontSizeLG;
  const paddingBlock = Math.round((controlHeight - mergedFontSize * lineHeight) / 2 * 10) / 10 - lineWidth;
  const paddingBlockSM = Math.round((controlHeightSM - mergedFontSizeSM * lineHeight) / 2 * 10) / 10 - lineWidth;
  const paddingBlockLG = Math.ceil((controlHeightLG - mergedFontSizeLG * lineHeightLG) / 2 * 10) / 10 - lineWidth;
  return {
    paddingBlock: Math.max(paddingBlock, 0),
    paddingBlockSM: Math.max(paddingBlockSM, 0),
    paddingBlockLG: Math.max(paddingBlockLG, 0),
    paddingInline: paddingSM - lineWidth,
    paddingInlineSM: controlPaddingHorizontalSM - lineWidth,
    paddingInlineLG: controlPaddingHorizontal - lineWidth,
    addonBg: colorFillAlter,
    activeBorderColor: colorPrimary,
    hoverBorderColor: colorPrimaryHover,
    activeShadow: `0 0 0 ${controlOutlineWidth}px ${controlOutline}`,
    errorActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorErrorOutline}`,
    warningActiveShadow: `0 0 0 ${controlOutlineWidth}px ${colorWarningOutline}`,
    hoverBg: colorBgContainer,
    activeBg: colorBgContainer,
    inputFontSize: mergedFontSize,
    inputFontSizeLG: mergedFontSizeLG,
    inputFontSizeSM: mergedFontSizeSM
  };
};
const genHoverStyle = (token) => ({
  borderColor: token.hoverBorderColor,
  backgroundColor: token.hoverBg
});
const genDisabledStyle = (token) => ({
  color: token.colorTextDisabled,
  backgroundColor: token.colorBgContainerDisabled,
  borderColor: token.colorBorder,
  boxShadow: "none",
  cursor: "not-allowed",
  opacity: 1,
  "input[disabled], textarea[disabled]": {
    cursor: "not-allowed"
  },
  "&:hover:not([disabled])": {
    ...genHoverStyle(merge$1(token, {
      hoverBorderColor: token.colorBorder,
      hoverBg: token.colorBgContainerDisabled
    }))
  }
});
const genBaseOutlinedStyle = (token, options) => ({
  background: token.colorBgContainer,
  borderWidth: token.lineWidth,
  borderStyle: token.lineType,
  borderColor: options.borderColor,
  "&:hover": {
    borderColor: options.hoverBorderColor,
    backgroundColor: token.hoverBg
  },
  "&:focus, &:focus-within": {
    borderColor: options.activeBorderColor,
    boxShadow: options.activeShadow,
    outline: 0,
    backgroundColor: token.activeBg
  }
});
const genOutlinedStatusStyle = (token, options) => ({
  [`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
    ...genBaseOutlinedStyle(token, options),
    [`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: {
      color: options.affixColor
    }
  },
  [`&${token.componentCls}-status-${options.status}${token.componentCls}-disabled`]: {
    borderColor: options.borderColor
  }
});
const genOutlinedStyle = (token, extraStyles) => ({
  "&-outlined": {
    ...genBaseOutlinedStyle(token, {
      borderColor: token.colorBorder,
      hoverBorderColor: token.hoverBorderColor,
      activeBorderColor: token.activeBorderColor,
      activeShadow: token.activeShadow
    }),
    [`&${token.componentCls}-disabled, &[disabled]`]: {
      ...genDisabledStyle(token)
    },
    ...genOutlinedStatusStyle(token, {
      status: "error",
      borderColor: token.colorError,
      hoverBorderColor: token.colorErrorBorderHover,
      activeBorderColor: token.colorError,
      activeShadow: token.errorActiveShadow,
      affixColor: token.colorError
    }),
    ...genOutlinedStatusStyle(token, {
      status: "warning",
      borderColor: token.colorWarning,
      hoverBorderColor: token.colorWarningBorderHover,
      activeBorderColor: token.colorWarning,
      activeShadow: token.warningActiveShadow,
      affixColor: token.colorWarning
    }),
    ...extraStyles
  }
});
const genOutlinedGroupStatusStyle = (token, options) => ({
  [`&${token.componentCls}-group-wrapper-status-${options.status}`]: {
    [`${token.componentCls}-group-addon`]: {
      borderColor: options.addonBorderColor,
      color: options.addonColor
    }
  }
});
const genOutlinedGroupStyle = (token) => ({
  "&-outlined": {
    [`${token.componentCls}-group`]: {
      "&-addon": {
        background: token.addonBg,
        border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
      },
      "&-addon:first-child": {
        borderInlineEnd: 0
      },
      "&-addon:last-child": {
        borderInlineStart: 0
      }
    },
    ...genOutlinedGroupStatusStyle(token, {
      status: "error",
      addonBorderColor: token.colorError,
      addonColor: token.colorErrorText
    }),
    ...genOutlinedGroupStatusStyle(token, {
      status: "warning",
      addonBorderColor: token.colorWarning,
      addonColor: token.colorWarningText
    }),
    [`&${token.componentCls}-group-wrapper-disabled`]: {
      [`${token.componentCls}-group-addon`]: {
        ...genDisabledStyle(token)
      }
    }
  }
});
const genBorderlessStyle = (token, extraStyles) => {
  const {
    componentCls
  } = token;
  return {
    "&-borderless": {
      background: "transparent",
      border: "none",
      "&:focus, &:focus-within": {
        outline: "none"
      },
      // >>>>> Disabled
      [`&${componentCls}-disabled, &[disabled]`]: {
        color: token.colorTextDisabled,
        cursor: "not-allowed"
      },
      // >>>>> Status
      [`&${componentCls}-status-error`]: {
        "&, & input, & textarea": {
          color: token.colorError
        }
      },
      [`&${componentCls}-status-warning`]: {
        "&, & input, & textarea": {
          color: token.colorWarning
        }
      },
      ...extraStyles
    }
  };
};
const genBaseFilledStyle = (token, options) => ({
  background: options.bg,
  borderWidth: token.lineWidth,
  borderStyle: token.lineType,
  borderColor: "transparent",
  "input&, & input, textarea&, & textarea": {
    color: options?.inputColor ?? "unset"
  },
  "&:hover": {
    background: options.hoverBg
  },
  "&:focus, &:focus-within": {
    outline: 0,
    borderColor: options.activeBorderColor,
    backgroundColor: token.activeBg
  }
});
const genFilledStatusStyle = (token, options) => ({
  [`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
    ...genBaseFilledStyle(token, options),
    [`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: {
      color: options.affixColor
    }
  }
});
const genFilledStyle = (token, extraStyles) => ({
  "&-filled": {
    ...genBaseFilledStyle(token, {
      bg: token.colorFillTertiary,
      hoverBg: token.colorFillSecondary,
      activeBorderColor: token.activeBorderColor,
      inputColor: token.colorText
    }),
    [`&${token.componentCls}-disabled, &[disabled]`]: {
      ...genDisabledStyle(token)
    },
    ...genFilledStatusStyle(token, {
      status: "error",
      bg: token.colorErrorBg,
      hoverBg: token.colorErrorBgHover,
      activeBorderColor: token.colorError,
      inputColor: token.colorErrorText,
      affixColor: token.colorError
    }),
    ...genFilledStatusStyle(token, {
      status: "warning",
      bg: token.colorWarningBg,
      hoverBg: token.colorWarningBgHover,
      activeBorderColor: token.colorWarning,
      inputColor: token.colorWarningText,
      affixColor: token.colorWarning
    }),
    ...extraStyles
  }
});
const genFilledGroupStatusStyle = (token, options) => ({
  [`&${token.componentCls}-group-wrapper-status-${options.status}`]: {
    [`${token.componentCls}-group-addon`]: {
      background: options.addonBg,
      color: options.addonColor
    }
  }
});
const genFilledGroupStyle = (token) => ({
  "&-filled": {
    [`${token.componentCls}-group-addon`]: {
      background: token.colorFillTertiary,
      "&:last-child": {
        position: "static"
      }
    },
    ...genFilledGroupStatusStyle(token, {
      status: "error",
      addonBg: token.colorErrorBg,
      addonColor: token.colorErrorText
    }),
    ...genFilledGroupStatusStyle(token, {
      status: "warning",
      addonBg: token.colorWarningBg,
      addonColor: token.colorWarningText
    }),
    [`&${token.componentCls}-group-wrapper-disabled`]: {
      [`${token.componentCls}-group`]: {
        "&-addon": {
          background: token.colorFillTertiary,
          color: token.colorTextDisabled
        },
        "&-addon:first-child": {
          borderInlineStart: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
        },
        "&-addon:last-child": {
          borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
        }
      }
    }
  }
});
const genBaseUnderlinedStyle = (token, options) => ({
  background: token.colorBgContainer,
  borderWidth: `${unit(token.lineWidth)} 0`,
  borderStyle: `${token.lineType} none`,
  borderColor: `transparent transparent ${options.borderColor} transparent`,
  borderRadius: 0,
  "&:hover": {
    borderColor: `transparent transparent ${options.hoverBorderColor} transparent`,
    backgroundColor: token.hoverBg
  },
  "&:focus, &:focus-within": {
    borderColor: `transparent transparent ${options.activeBorderColor} transparent`,
    outline: 0,
    backgroundColor: token.activeBg
  }
});
const genUnderlinedStatusStyle = (token, options) => ({
  [`&${token.componentCls}-status-${options.status}:not(${token.componentCls}-disabled)`]: {
    ...genBaseUnderlinedStyle(token, options),
    [`${token.componentCls}-prefix, ${token.componentCls}-suffix`]: {
      color: options.affixColor
    }
  },
  [`&${token.componentCls}-status-${options.status}${token.componentCls}-disabled`]: {
    borderColor: `transparent transparent ${options.borderColor} transparent`
  }
});
const genUnderlinedStyle = (token, extraStyles) => ({
  "&-underlined": {
    ...genBaseUnderlinedStyle(token, {
      borderColor: token.colorBorder,
      hoverBorderColor: token.hoverBorderColor,
      activeBorderColor: token.activeBorderColor,
      activeShadow: token.activeShadow
    }),
    // >>>>> Disabled
    [`&${token.componentCls}-disabled, &[disabled]`]: {
      color: token.colorTextDisabled,
      boxShadow: "none",
      cursor: "not-allowed",
      "&:hover": {
        borderColor: `transparent transparent ${token.colorBorder} transparent`
      }
    },
    "input[disabled], textarea[disabled]": {
      cursor: "not-allowed"
    },
    ...genUnderlinedStatusStyle(token, {
      status: "error",
      borderColor: token.colorError,
      hoverBorderColor: token.colorErrorBorderHover,
      activeBorderColor: token.colorError,
      activeShadow: token.errorActiveShadow,
      affixColor: token.colorError
    }),
    ...genUnderlinedStatusStyle(token, {
      status: "warning",
      borderColor: token.colorWarning,
      hoverBorderColor: token.colorWarningBorderHover,
      activeBorderColor: token.colorWarning,
      activeShadow: token.warningActiveShadow,
      affixColor: token.colorWarning
    }),
    ...extraStyles
  }
});
const genPlaceholderStyle = (color) => ({
  // Firefox
  "&::-moz-placeholder": {
    opacity: 1
  },
  "&::placeholder": {
    color,
    userSelect: "none"
    // https://github.com/ant-design/ant-design/pull/32639
  },
  "&:placeholder-shown": {
    textOverflow: "ellipsis"
  }
});
const genInputLargeStyle = (token) => {
  const {
    paddingBlockLG,
    lineHeightLG,
    borderRadiusLG,
    paddingInlineLG
  } = token;
  return {
    padding: `${unit(paddingBlockLG)} ${unit(paddingInlineLG)}`,
    fontSize: token.inputFontSizeLG,
    lineHeight: lineHeightLG,
    borderRadius: borderRadiusLG
  };
};
const genInputSmallStyle = (token) => ({
  padding: `${unit(token.paddingBlockSM)} ${unit(token.paddingInlineSM)}`,
  fontSize: token.inputFontSizeSM,
  borderRadius: token.borderRadiusSM
});
const genBasicInputStyle = (token, option = {}) => ({
  position: "relative",
  display: "inline-block",
  width: "100%",
  minWidth: 0,
  padding: `${unit(token.paddingBlock)} ${unit(token.paddingInline)}`,
  color: token.colorText,
  fontSize: token.inputFontSize,
  lineHeight: token.lineHeight,
  borderRadius: token.borderRadius,
  transition: `all ${token.motionDurationMid}`,
  ...genPlaceholderStyle(token.colorTextPlaceholder),
  // Size
  "&-lg": {
    ...genInputLargeStyle(token),
    ...option.largeStyle
  },
  "&-sm": {
    ...genInputSmallStyle(token),
    ...option.smallStyle
  },
  // RTL
  "&-rtl, &-textarea-rtl": {
    direction: "rtl"
  }
});
const genInputGroupStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  return {
    position: "relative",
    display: "table",
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    // Undo padding and float of grid classes
    "&[class*='col-']": {
      paddingInlineEnd: token.paddingXS,
      "&:last-child": {
        paddingInlineEnd: 0
      }
    },
    // Sizing options
    [`&-lg ${componentCls}, &-lg > ${componentCls}-group-addon`]: {
      ...genInputLargeStyle(token)
    },
    [`&-sm ${componentCls}, &-sm > ${componentCls}-group-addon`]: {
      ...genInputSmallStyle(token)
    },
    // Fix https://github.com/ant-design/ant-design/issues/5754
    [`&-lg ${antCls}-select-single`]: {
      height: token.controlHeightLG
    },
    [`&-sm ${antCls}-select-single`]: {
      height: token.controlHeightSM
    },
    [`> ${componentCls}`]: {
      display: "table-cell",
      "&:not(:first-child):not(:last-child)": {
        borderRadius: 0
      }
    },
    [`${componentCls}-group`]: {
      "&-addon, &-wrap": {
        display: "table-cell",
        width: 1,
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        "&:not(:first-child):not(:last-child)": {
          borderRadius: 0
        }
      },
      "&-wrap > *": {
        display: "block !important"
      },
      "&-addon": {
        position: "relative",
        padding: `0 ${unit(token.paddingInline)}`,
        color: token.colorText,
        fontWeight: "normal",
        fontSize: token.inputFontSize,
        textAlign: "center",
        borderRadius: token.borderRadius,
        transition: `all ${token.motionDurationSlow}`,
        lineHeight: 1,
        // Reset Select's style in addon
        [`${antCls}-select`]: {
          margin: `${unit(token.calc(token.paddingBlock).add(1).mul(-1).equal())} ${unit(token.calc(token.paddingInline).mul(-1).equal())}`,
          [`&${antCls}-select-single:not(${antCls}-select-customize-input):not(${antCls}-pagination-size-changer)`]: {
            backgroundColor: "inherit",
            border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
            boxShadow: "none"
          }
        },
        // https://github.com/ant-design/ant-design/issues/31333
        [`${antCls}-cascader-picker`]: {
          margin: `-9px ${unit(token.calc(token.paddingInline).mul(-1).equal())}`,
          backgroundColor: "transparent",
          [`${antCls}-cascader-input`]: {
            textAlign: "start",
            border: 0,
            boxShadow: "none"
          }
        }
      }
    },
    [componentCls]: {
      width: "100%",
      marginBottom: 0,
      textAlign: "inherit",
      "&:focus": {
        zIndex: 1,
        // Fix https://gw.alipayobjects.com/zos/rmsportal/DHNpoqfMXSfrSnlZvhsJ.png
        borderInlineEndWidth: 1
      },
      "&:hover": {
        zIndex: 1,
        borderInlineEndWidth: 1
      }
    },
    // Reset rounded corners
    [`> ${componentCls}:first-child, ${componentCls}-group-addon:first-child`]: {
      borderStartEndRadius: 0,
      borderEndEndRadius: 0,
      // Reset Select's style in addon
      [`${antCls}-select`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`> ${componentCls}-affix-wrapper`]: {
      [`&:not(:first-child) ${componentCls}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      },
      [`&:not(:last-child) ${componentCls}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      }
    },
    [`> ${componentCls}:last-child, ${componentCls}-group-addon:last-child`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
      // Reset Select's style in addon
      [`${antCls}-select`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`${componentCls}-affix-wrapper`]: {
      "&:not(:last-child)": {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0
      },
      "&:not(:first-child)": {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0
      }
    },
    [`&${componentCls}-group-compact`]: {
      display: "block",
      ...clearFix(),
      [`${componentCls}-group-addon, ${componentCls}-group-wrap, > ${componentCls}`]: {
        "&:not(:first-child):not(:last-child)": {
          borderInlineEndWidth: token.lineWidth,
          "&:hover, &:focus": {
            zIndex: 1
          }
        }
      },
      "& > *": {
        display: "inline-flex",
        float: "none",
        verticalAlign: "top",
        // https://github.com/ant-design/ant-design-pro/issues/139
        borderRadius: 0
      },
      [`
        & > ${componentCls}-affix-wrapper,
        & > ${componentCls}-number-affix-wrapper,
        & > ${antCls}-picker-range
      `]: {
        display: "inline-flex"
      },
      "& > *:not(:last-child)": {
        marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal(),
        borderInlineEndWidth: token.lineWidth
      },
      // Undo float for .ant-input-group .ant-input
      [componentCls]: {
        float: "none"
      },
      // reset border for Select, DatePicker, AutoComplete, Cascader, Mention, TimePicker, Input
      [`& > ${antCls}-select,
      & > ${antCls}-select-auto-complete ${componentCls},
      & > ${antCls}-cascader-picker ${componentCls},
      & > ${componentCls}-group-wrapper ${componentCls}`]: {
        borderInlineEndWidth: token.lineWidth,
        borderRadius: 0,
        "&:hover, &:focus": {
          zIndex: 1
        }
      },
      [`& > ${antCls}-select-focused`]: {
        zIndex: 1
      },
      // update z-index for arrow icon
      [`& > ${antCls}-select > ${antCls}-select-arrow`]: {
        zIndex: 1
        // https://github.com/ant-design/ant-design/issues/20371
      },
      [`& > *:first-child,
      & > ${antCls}-select:first-child,
      & > ${antCls}-select-auto-complete:first-child ${componentCls},
      & > ${antCls}-cascader-picker:first-child ${componentCls}`]: {
        borderStartStartRadius: token.borderRadius,
        borderEndStartRadius: token.borderRadius
      },
      [`& > *:last-child,
      & > ${antCls}-select:last-child,
      & > ${antCls}-cascader-picker:last-child ${componentCls},
      & > ${antCls}-cascader-picker-focused:last-child ${componentCls}`]: {
        borderInlineEndWidth: token.lineWidth,
        borderStartEndRadius: token.borderRadius,
        borderEndEndRadius: token.borderRadius
      },
      // https://github.com/ant-design/ant-design/issues/12493
      [`& > ${antCls}-select-auto-complete ${componentCls}`]: {
        verticalAlign: "top"
      },
      [`${componentCls}-group-wrapper + ${componentCls}-group-wrapper`]: {
        marginInlineStart: token.calc(token.lineWidth).mul(-1).equal(),
        [`${componentCls}-affix-wrapper`]: {
          // borderRadius: 0,
        }
      }
    }
  };
};
const genInputStyle = (token) => {
  const {
    componentCls,
    controlHeightSM,
    lineWidth,
    calc
  } = token;
  const FIXED_CHROME_COLOR_HEIGHT = 16;
  const colorSmallPadding = calc(controlHeightSM).sub(calc(lineWidth).mul(2)).sub(FIXED_CHROME_COLOR_HEIGHT).div(2).equal();
  return {
    [componentCls]: {
      ...resetComponent(token),
      ...genBasicInputStyle(token),
      // Variants
      ...genOutlinedStyle(token),
      ...genFilledStyle(token),
      ...genBorderlessStyle(token),
      ...genUnderlinedStyle(token),
      '&[type="color"]': {
        height: token.controlHeight,
        [`&${componentCls}-lg`]: {
          height: token.controlHeightLG
        },
        [`&${componentCls}-sm`]: {
          height: controlHeightSM,
          paddingTop: colorSmallPadding,
          paddingBottom: colorSmallPadding
        }
      },
      '&[type="search"]::-webkit-search-cancel-button, &[type="search"]::-webkit-search-decoration': {
        appearance: "none"
      }
    }
  };
};
const genAllowClearStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    // ========================= Input =========================
    [`${componentCls}-clear-icon`]: {
      margin: 0,
      padding: 0,
      lineHeight: 0,
      color: token.colorTextQuaternary,
      fontSize: token.fontSizeIcon,
      verticalAlign: -1,
      // https://github.com/ant-design/ant-design/pull/18151
      // https://codesandbox.io/s/wizardly-sun-u10br
      cursor: "pointer",
      transition: `color ${token.motionDurationSlow}`,
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      "&:hover": {
        color: token.colorIcon
      },
      "&:active": {
        color: token.colorText
      },
      "&-hidden": {
        visibility: "hidden"
      },
      "&-has-suffix": {
        margin: `0 ${unit(token.inputAffixPadding)}`
      }
    }
  };
};
const genAffixStyle = (token) => {
  const {
    componentCls,
    inputAffixPadding,
    colorTextDescription,
    motionDurationSlow,
    colorIcon,
    colorIconHover,
    iconCls
  } = token;
  const affixCls = `${componentCls}-affix-wrapper`;
  const affixClsDisabled = `${componentCls}-affix-wrapper-disabled`;
  return {
    [affixCls]: {
      ...genBasicInputStyle(token),
      display: "inline-flex",
      "&-focused, &:focus": {
        zIndex: 1
      },
      [`> input${componentCls}`]: {
        padding: 0
      },
      [`> input${componentCls}, > textarea${componentCls}`]: {
        fontSize: "inherit",
        border: "none",
        borderRadius: 0,
        outline: "none",
        background: "transparent",
        color: "inherit",
        "&::-ms-reveal": {
          display: "none"
        },
        "&:focus": {
          boxShadow: "none !important"
        }
      },
      "&::before": {
        display: "inline-block",
        width: 0,
        visibility: "hidden",
        content: '"\\a0"'
      },
      [componentCls]: {
        "&-prefix, &-suffix": {
          display: "flex",
          flex: "none",
          alignItems: "center",
          "> *:not(:last-child)": {
            marginInlineEnd: token.paddingXS
          }
        },
        "&-show-count-suffix": {
          color: colorTextDescription,
          direction: "ltr"
        },
        "&-show-count-has-suffix": {
          marginInlineEnd: token.paddingXXS
        },
        "&-prefix": {
          marginInlineEnd: inputAffixPadding
        },
        "&-suffix": {
          marginInlineStart: inputAffixPadding
        }
      },
      ...genAllowClearStyle(token),
      // password
      [`${iconCls}${componentCls}-password-icon`]: {
        color: colorIcon,
        cursor: "pointer",
        transition: `all ${motionDurationSlow}`,
        "&:hover": {
          color: colorIconHover
        }
      }
    },
    // 覆盖 affix-wrapper borderRadius！
    [`${componentCls}-underlined`]: {
      borderRadius: 0
    },
    [affixClsDisabled]: {
      // password disabled
      [`${iconCls}${componentCls}-password-icon`]: {
        color: colorIcon,
        cursor: "not-allowed",
        "&:hover": {
          color: colorIcon
        }
      }
    }
  };
};
const genGroupStyle = (token) => {
  const {
    componentCls,
    borderRadiusLG,
    borderRadiusSM
  } = token;
  return {
    [`${componentCls}-group`]: {
      // Style for input-group: input with label, with button or dropdown...
      ...resetComponent(token),
      ...genInputGroupStyle(token),
      "&-rtl": {
        direction: "rtl"
      },
      "&-wrapper": {
        display: "inline-block",
        width: "100%",
        textAlign: "start",
        verticalAlign: "top",
        // https://github.com/ant-design/ant-design/issues/6403
        "&-rtl": {
          direction: "rtl"
        },
        // Size
        "&-lg": {
          [`${componentCls}-group-addon`]: {
            borderRadius: borderRadiusLG,
            fontSize: token.inputFontSizeLG
          }
        },
        "&-sm": {
          [`${componentCls}-group-addon`]: {
            borderRadius: borderRadiusSM
          }
        },
        // Variants
        ...genOutlinedGroupStyle(token),
        ...genFilledGroupStyle(token),
        // '&-disabled': {
        //   [`${componentCls}-group-addon`]: {
        //     ...genDisabledStyle(token),
        //   },
        // },
        // Fix the issue of using icons in Space Compact mode
        // https://github.com/ant-design/ant-design/issues/42122
        [`&:not(${componentCls}-compact-first-item):not(${componentCls}-compact-last-item)${componentCls}-compact-item`]: {
          [`${componentCls}, ${componentCls}-group-addon`]: {
            borderRadius: 0
          }
        },
        [`&:not(${componentCls}-compact-last-item)${componentCls}-compact-first-item`]: {
          [`${componentCls}, ${componentCls}-group-addon`]: {
            borderStartEndRadius: 0,
            borderEndEndRadius: 0
          }
        },
        [`&:not(${componentCls}-compact-first-item)${componentCls}-compact-last-item`]: {
          [`${componentCls}, ${componentCls}-group-addon`]: {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0
          }
        },
        // Fix the issue of input use show-count param in space compact mode
        // https://github.com/ant-design/ant-design/issues/46872
        [`&:not(${componentCls}-compact-last-item)${componentCls}-compact-item`]: {
          [`${componentCls}-affix-wrapper`]: {
            borderStartEndRadius: 0,
            borderEndEndRadius: 0
          }
        },
        // Fix the issue of input use `addonAfter` param in space compact mode
        // https://github.com/ant-design/ant-design/issues/52483
        [`&:not(${componentCls}-compact-first-item)${componentCls}-compact-item`]: {
          [`${componentCls}-affix-wrapper`]: {
            borderStartStartRadius: 0,
            borderEndStartRadius: 0
          }
        }
      }
    }
  };
};
const genRangeStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-out-of-range`]: {
      [`&, & input, & textarea, ${componentCls}-show-count-suffix, ${componentCls}-data-count`]: {
        color: token.colorError
      }
    }
  };
};
const useSharedStyle = genStyleHooks(["Input", "Shared"], (token) => {
  const inputToken = merge$1(token, initInputToken(token));
  return [genInputStyle(inputToken), genAffixStyle(inputToken)];
}, initComponentToken, {
  resetFont: false
});
const useStyle$7 = genStyleHooks(["Input", "Component"], (token) => {
  const inputToken = merge$1(token, initInputToken(token));
  return [
    genGroupStyle(inputToken),
    genRangeStyle(inputToken),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(inputToken, {
      focus: true,
      focusElCls: `${inputToken.componentCls}-affix-wrapper-focused`
    })
  ];
}, initComponentToken, {
  resetFont: false
});
const getMultipleSelectorUnit = (token) => {
  const {
    multipleSelectItemHeight,
    paddingXXS,
    lineWidth,
    INTERNAL_FIXED_ITEM_MARGIN
  } = token;
  const basePadding = token.max(token.calc(paddingXXS).sub(lineWidth).equal(), 0);
  const containerPadding = token.max(token.calc(basePadding).sub(INTERNAL_FIXED_ITEM_MARGIN).equal(), 0);
  return {
    basePadding,
    containerPadding,
    itemHeight: unit(multipleSelectItemHeight),
    itemLineHeight: unit(token.calc(multipleSelectItemHeight).sub(token.calc(token.lineWidth).mul(2)).equal())
  };
};
const genOverflowStyle = (token) => {
  const {
    componentCls,
    iconCls,
    borderRadiusSM,
    motionDurationSlow,
    paddingXS,
    multipleItemColorDisabled,
    multipleItemBorderColorDisabled,
    colorIcon,
    colorIconHover,
    INTERNAL_FIXED_ITEM_MARGIN
  } = token;
  const selectOverflowPrefixCls = `${componentCls}-selection-overflow`;
  return {
    /**
     * Do not merge `height` & `line-height` under style with `selection` & `search`, since chrome
     * may update to redesign with its align logic.
     */
    // =========================== Overflow ===========================
    [selectOverflowPrefixCls]: {
      position: "relative",
      display: "flex",
      flex: "auto",
      flexWrap: "wrap",
      maxWidth: "100%",
      "&-item": {
        flex: "none",
        alignSelf: "center",
        // https://github.com/ant-design/ant-design/issues/54179
        maxWidth: "calc(100% - 4px)",
        display: "inline-flex"
      },
      // ======================== Selections ==========================
      [`${componentCls}-selection-item`]: {
        display: "flex",
        alignSelf: "center",
        flex: "none",
        boxSizing: "border-box",
        maxWidth: "100%",
        marginBlock: INTERNAL_FIXED_ITEM_MARGIN,
        borderRadius: borderRadiusSM,
        cursor: "default",
        transition: [`font-size`, `line-height`, `height`].map((prop) => `${prop} ${motionDurationSlow}`).join(", "),
        marginInlineEnd: token.calc(INTERNAL_FIXED_ITEM_MARGIN).mul(2).equal(),
        paddingInlineStart: paddingXS,
        paddingInlineEnd: token.calc(paddingXS).div(2).equal(),
        [`${componentCls}-disabled&`]: {
          color: multipleItemColorDisabled,
          borderColor: multipleItemBorderColorDisabled,
          cursor: "not-allowed"
        },
        // It's ok not to do this, but 24px makes bottom narrow in view should adjust
        "&-content": {
          display: "inline-block",
          marginInlineEnd: token.calc(paddingXS).div(2).equal(),
          overflow: "hidden",
          whiteSpace: "pre",
          // fix whitespace wrapping. custom tags display all whitespace within.
          textOverflow: "ellipsis"
        },
        "&-remove": {
          ...resetIcon(),
          display: "inline-flex",
          alignItems: "center",
          color: colorIcon,
          fontWeight: "bold",
          fontSize: 10,
          lineHeight: "inherit",
          cursor: "pointer",
          [`> ${iconCls}`]: {
            verticalAlign: "-0.2em"
          },
          "&:hover": {
            color: colorIconHover
          }
        }
      }
    }
  };
};
const genSize = (token, suffix) => {
  const {
    componentCls,
    controlHeight
  } = token;
  const suffixCls = suffix ? `${componentCls}-${suffix}` : "";
  const multipleSelectorUnit = getMultipleSelectorUnit(token);
  return [
    // genSelectionStyle(token, suffix),
    {
      [`${componentCls}-multiple${suffixCls}`]: {
        paddingBlock: multipleSelectorUnit.containerPadding,
        paddingInlineStart: multipleSelectorUnit.basePadding,
        minHeight: controlHeight,
        // ======================== Selections ========================
        [`${componentCls}-selection-item`]: {
          height: multipleSelectorUnit.itemHeight,
          lineHeight: unit(multipleSelectorUnit.itemLineHeight)
        }
      }
    }
  ];
};
const genPickerMultipleStyle = (token) => {
  const {
    componentCls,
    calc,
    lineWidth
  } = token;
  const smallToken = merge$1(token, {
    fontHeight: token.fontSize,
    selectHeight: token.controlHeightSM,
    multipleSelectItemHeight: token.multipleItemHeightSM,
    borderRadius: token.borderRadiusSM,
    borderRadiusSM: token.borderRadiusXS,
    controlHeight: token.controlHeightSM
  });
  const largeToken = merge$1(token, {
    fontHeight: calc(token.multipleItemHeightLG).sub(calc(lineWidth).mul(2).equal()).equal(),
    fontSize: token.fontSizeLG,
    selectHeight: token.controlHeightLG,
    multipleSelectItemHeight: token.multipleItemHeightLG,
    borderRadius: token.borderRadiusLG,
    borderRadiusSM: token.borderRadius,
    controlHeight: token.controlHeightLG
  });
  return [
    // ======================== Size ========================
    genSize(smallToken, "small"),
    genSize(token),
    genSize(largeToken, "large"),
    // ====================== Selection ======================
    {
      [`${componentCls}${componentCls}-multiple`]: {
        width: "100%",
        cursor: "text",
        // ==================== Selector =====================
        [`${componentCls}-selector`]: {
          flex: "auto",
          padding: 0,
          position: "relative",
          "&:after": {
            margin: 0
          },
          // ================== placeholder ==================
          [`${componentCls}-selection-placeholder`]: {
            position: "absolute",
            top: "50%",
            insetInlineStart: token.inputPaddingHorizontalBase,
            insetInlineEnd: 0,
            transform: "translateY(-50%)",
            transition: `all ${token.motionDurationSlow}`,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            flex: 1,
            color: token.colorTextPlaceholder,
            pointerEvents: "none"
          }
        },
        // ===================== Overflow ====================
        ...genOverflowStyle(token),
        // ====================== Input ======================
        // Input is `readonly`, which is used for a11y only
        [`${componentCls}-multiple-input`]: {
          width: 0,
          height: 0,
          border: 0,
          visibility: "hidden",
          position: "absolute",
          zIndex: -1
        }
      }
    }
  ];
};
const genPickerCellInnerStyle = (token) => {
  const {
    pickerCellCls,
    pickerCellInnerCls,
    cellHeight,
    borderRadiusSM,
    motionDurationMid,
    cellHoverBg,
    lineWidth,
    lineType,
    colorPrimary,
    cellActiveWithRangeBg,
    colorTextLightSolid,
    colorTextDisabled,
    cellBgDisabled,
    colorFillSecondary
  } = token;
  return {
    "&::before": {
      position: "absolute",
      top: "50%",
      insetInlineStart: 0,
      insetInlineEnd: 0,
      zIndex: 1,
      height: cellHeight,
      transform: "translateY(-50%)",
      content: '""',
      pointerEvents: "none"
    },
    // >>> Default
    [pickerCellInnerCls]: {
      position: "relative",
      zIndex: 2,
      display: "inline-block",
      minWidth: cellHeight,
      height: cellHeight,
      lineHeight: unit(cellHeight),
      borderRadius: borderRadiusSM,
      transition: `background-color ${motionDurationMid}`
    },
    // >>> Hover
    [`&:hover:not(${pickerCellCls}-in-view):not(${pickerCellCls}-disabled),
    &:hover:not(${pickerCellCls}-selected):not(${pickerCellCls}-range-start):not(${pickerCellCls}-range-end):not(${pickerCellCls}-disabled)`]: {
      [pickerCellInnerCls]: {
        background: cellHoverBg
      }
    },
    // >>> Today
    [`&-in-view${pickerCellCls}-today ${pickerCellInnerCls}`]: {
      "&::before": {
        position: "absolute",
        top: 0,
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: 1,
        border: `${unit(lineWidth)} ${lineType} ${colorPrimary}`,
        borderRadius: borderRadiusSM,
        content: '""'
      }
    },
    // >>> In Range
    [`&-in-view${pickerCellCls}-in-range,
      &-in-view${pickerCellCls}-range-start,
      &-in-view${pickerCellCls}-range-end`]: {
      position: "relative",
      [`&:not(${pickerCellCls}-disabled):before`]: {
        background: cellActiveWithRangeBg
      }
    },
    // >>> Selected
    [`&-in-view${pickerCellCls}-selected,
      &-in-view${pickerCellCls}-range-start,
      &-in-view${pickerCellCls}-range-end`]: {
      [`&:not(${pickerCellCls}-disabled) ${pickerCellInnerCls}`]: {
        color: colorTextLightSolid,
        background: colorPrimary
      },
      [`&${pickerCellCls}-disabled ${pickerCellInnerCls}`]: {
        background: colorFillSecondary
      }
    },
    [`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-disabled):before`]: {
      insetInlineStart: "50%"
    },
    [`&-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-disabled):before`]: {
      insetInlineEnd: "50%"
    },
    // range start border-radius
    [`&-in-view${pickerCellCls}-range-start:not(${pickerCellCls}-range-end) ${pickerCellInnerCls}`]: {
      borderStartStartRadius: borderRadiusSM,
      borderEndStartRadius: borderRadiusSM,
      borderStartEndRadius: 0,
      borderEndEndRadius: 0
    },
    // range end border-radius
    [`&-in-view${pickerCellCls}-range-end:not(${pickerCellCls}-range-start) ${pickerCellInnerCls}`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
      borderStartEndRadius: borderRadiusSM,
      borderEndEndRadius: borderRadiusSM
    },
    // >>> Disabled
    "&-disabled": {
      color: colorTextDisabled,
      cursor: "not-allowed",
      [pickerCellInnerCls]: {
        background: "transparent"
      },
      "&::before": {
        background: cellBgDisabled
      }
    },
    [`&-disabled${pickerCellCls}-today ${pickerCellInnerCls}::before`]: {
      borderColor: colorTextDisabled
    }
  };
};
const genPanelStyle = (token) => {
  const {
    componentCls,
    pickerCellCls,
    pickerCellInnerCls,
    pickerYearMonthCellWidth,
    pickerControlIconSize,
    cellWidth,
    paddingSM,
    paddingXS,
    paddingXXS,
    colorBgContainer,
    lineWidth,
    lineType,
    borderRadiusLG,
    colorPrimary,
    colorTextHeading,
    colorSplit,
    pickerControlIconBorderWidth,
    colorIcon,
    textHeight,
    motionDurationMid,
    colorIconHover,
    fontWeightStrong,
    cellHeight,
    pickerCellPaddingVertical,
    colorTextDisabled,
    colorText,
    fontSize,
    motionDurationSlow,
    withoutTimeCellHeight,
    pickerQuarterPanelContentHeight,
    borderRadiusSM,
    colorTextLightSolid,
    cellHoverBg,
    timeColumnHeight,
    timeColumnWidth,
    timeCellHeight,
    controlItemBgActive,
    marginXXS,
    pickerDatePanelPaddingHorizontal,
    pickerControlIconMargin
  } = token;
  const pickerPanelWidth = token.calc(cellWidth).mul(7).add(token.calc(pickerDatePanelPaddingHorizontal).mul(2)).equal();
  return {
    [componentCls]: {
      "&-panel": {
        display: "inline-flex",
        flexDirection: "column",
        textAlign: "center",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        outline: "none",
        "&-focused": {
          borderColor: colorPrimary
        },
        "&-rtl": {
          [`${componentCls}-prev-icon,
              ${componentCls}-super-prev-icon`]: {
            transform: "rotate(45deg)"
          },
          [`${componentCls}-next-icon,
              ${componentCls}-super-next-icon`]: {
            transform: "rotate(-135deg)"
          },
          [`${componentCls}-time-panel`]: {
            [`${componentCls}-content`]: {
              direction: "ltr",
              "> *": {
                direction: "rtl"
              }
            }
          }
        }
      },
      // ========================================================
      // =                     Shared Panel                     =
      // ========================================================
      [`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel,
        &-week-panel,
        &-date-panel,
        &-time-panel`]: {
        display: "flex",
        flexDirection: "column",
        width: pickerPanelWidth
      },
      // ======================= Header =======================
      "&-header": {
        display: "flex",
        padding: `0 ${unit(paddingXS)}`,
        color: colorTextHeading,
        borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
        "> *": {
          flex: "none"
        },
        button: {
          padding: 0,
          color: colorIcon,
          lineHeight: unit(textHeight),
          background: "transparent",
          border: 0,
          cursor: "pointer",
          transition: `color ${motionDurationMid}`,
          fontSize: "inherit",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          "&:empty": {
            display: "none"
          }
        },
        "> button": {
          minWidth: "1.6em",
          fontSize,
          "&:hover": {
            color: colorIconHover
          },
          "&:disabled": {
            opacity: 0.25,
            pointerEvents: "none"
          }
        },
        "&-view": {
          flex: "auto",
          fontWeight: fontWeightStrong,
          lineHeight: unit(textHeight),
          "> button": {
            color: "inherit",
            fontWeight: "inherit",
            verticalAlign: "top",
            "&:not(:first-child)": {
              marginInlineStart: paddingXS
            },
            "&:hover": {
              color: colorPrimary
            }
          }
        }
      },
      // Arrow button
      [`&-prev-icon,
        &-next-icon,
        &-super-prev-icon,
        &-super-next-icon`]: {
        position: "relative",
        width: pickerControlIconSize,
        height: pickerControlIconSize,
        "&::before": {
          position: "absolute",
          top: 0,
          insetInlineStart: 0,
          width: pickerControlIconSize,
          height: pickerControlIconSize,
          border: `0 solid currentcolor`,
          borderBlockStartWidth: pickerControlIconBorderWidth,
          borderInlineStartWidth: pickerControlIconBorderWidth,
          content: '""'
        }
      },
      [`&-super-prev-icon,
        &-super-next-icon`]: {
        "&::after": {
          position: "absolute",
          top: pickerControlIconMargin,
          insetInlineStart: pickerControlIconMargin,
          display: "inline-block",
          width: pickerControlIconSize,
          height: pickerControlIconSize,
          border: "0 solid currentcolor",
          borderBlockStartWidth: pickerControlIconBorderWidth,
          borderInlineStartWidth: pickerControlIconBorderWidth,
          content: '""'
        }
      },
      "&-prev-icon, &-super-prev-icon": {
        transform: "rotate(-45deg)"
      },
      "&-next-icon, &-super-next-icon": {
        transform: "rotate(135deg)"
      },
      // ======================== Body ========================
      "&-content": {
        width: "100%",
        tableLayout: "fixed",
        borderCollapse: "collapse",
        "th, td": {
          position: "relative",
          minWidth: cellHeight,
          fontWeight: "normal"
        },
        th: {
          height: token.calc(cellHeight).add(token.calc(pickerCellPaddingVertical).mul(2)).equal(),
          color: colorText,
          verticalAlign: "middle"
        }
      },
      "&-cell": {
        padding: `${unit(pickerCellPaddingVertical)} 0`,
        color: colorTextDisabled,
        cursor: "pointer",
        // In view
        "&-in-view": {
          color: colorText
        },
        ...genPickerCellInnerStyle(token)
      },
      [`&-decade-panel,
        &-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
        [`${componentCls}-content`]: {
          height: token.calc(withoutTimeCellHeight).mul(4).equal()
        },
        [pickerCellInnerCls]: {
          padding: `0 ${unit(paddingXS)}`
        }
      },
      "&-quarter-panel": {
        [`${componentCls}-content`]: {
          height: pickerQuarterPanelContentHeight
        }
      },
      // ========================================================
      // =                       Special                        =
      // ========================================================
      // ===================== Decade Panel =====================
      "&-decade-panel": {
        [pickerCellInnerCls]: {
          padding: `0 ${unit(token.calc(paddingXS).div(2).equal())}`
        },
        [`${componentCls}-cell::before`]: {
          display: "none"
        }
      },
      // ============= Year & Quarter & Month Panel =============
      [`&-year-panel,
        &-quarter-panel,
        &-month-panel`]: {
        [`${componentCls}-body`]: {
          padding: `0 ${unit(paddingXS)}`
        },
        [pickerCellInnerCls]: {
          width: pickerYearMonthCellWidth
        }
      },
      // ====================== Date Panel ======================
      "&-date-panel": {
        [`${componentCls}-body`]: {
          padding: `${unit(paddingXS)} ${unit(pickerDatePanelPaddingHorizontal)}`
        },
        [`${componentCls}-content th`]: {
          boxSizing: "border-box",
          padding: 0
        }
      },
      // ====================== Week Panel ======================
      "&-week-panel-row": {
        td: {
          "&:before": {
            transition: `background-color ${motionDurationMid}`
          },
          "&:first-child:before": {
            borderStartStartRadius: borderRadiusSM,
            borderEndStartRadius: borderRadiusSM
          },
          "&:last-child:before": {
            borderStartEndRadius: borderRadiusSM,
            borderEndEndRadius: borderRadiusSM
          }
        },
        "&:hover td:before": {
          background: cellHoverBg
        },
        "&-range-start td, &-range-end td, &-selected td, &-hover td": {
          // Rise priority to override hover style
          [`&${pickerCellCls}`]: {
            "&:before": {
              background: colorPrimary
            },
            [`&${componentCls}-cell-week`]: {
              color: new FastColor(colorTextLightSolid).setA(0.5).toHexString()
            },
            [pickerCellInnerCls]: {
              color: colorTextLightSolid
            }
          }
        },
        "&-range-hover td:before": {
          background: controlItemBgActive
        }
      },
      // >>> ShowWeek
      "&-week-panel, &-date-panel-show-week": {
        [`${componentCls}-body`]: {
          padding: `${unit(paddingXS)} ${unit(paddingSM)}`
        },
        [`${componentCls}-content th`]: {
          width: "auto"
        }
      },
      // ==================== Datetime Panel ====================
      "&-datetime-panel": {
        display: "flex",
        [`${componentCls}-time-panel`]: {
          borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorSplit}`
        },
        [`${componentCls}-date-panel,
          ${componentCls}-time-panel`]: {
          transition: `opacity ${motionDurationSlow}`
        },
        // Keyboard
        "&-active": {
          [`${componentCls}-date-panel,
            ${componentCls}-time-panel`]: {
            opacity: 0.3,
            "&-active": {
              opacity: 1
            }
          }
        }
      },
      // ====================== Time Panel ======================
      "&-time-panel": {
        width: "auto",
        minWidth: "auto",
        [`${componentCls}-content`]: {
          display: "flex",
          flex: "auto",
          height: timeColumnHeight
        },
        "&-column": {
          flex: "1 0 auto",
          width: timeColumnWidth,
          margin: `${unit(paddingXXS)} 0`,
          padding: 0,
          overflowY: "hidden",
          textAlign: "start",
          listStyle: "none",
          transition: `background-color ${motionDurationMid}`,
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: 8,
            backgroundColor: "transparent"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: token.colorTextTertiary,
            borderRadius: token.borderRadiusSM
          },
          // For Firefox
          "&": {
            scrollbarWidth: "thin",
            scrollbarColor: `${token.colorTextTertiary} transparent`
          },
          "&::after": {
            display: "block",
            height: `calc(100% - ${unit(timeCellHeight)})`,
            content: '""'
          },
          "&:not(:first-child)": {
            borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorSplit}`
          },
          "&-active": {
            background: new FastColor(controlItemBgActive).setA(0.2).toHexString()
          },
          "&:hover": {
            overflowY: "auto"
          },
          "> li": {
            margin: 0,
            padding: 0,
            [`&${componentCls}-time-panel-cell`]: {
              marginInline: marginXXS,
              [`${componentCls}-time-panel-cell-inner`]: {
                display: "block",
                width: token.calc(timeColumnWidth).sub(token.calc(marginXXS).mul(2)).equal(),
                height: timeCellHeight,
                margin: 0,
                paddingBlock: 0,
                paddingInlineEnd: 0,
                paddingInlineStart: token.calc(timeColumnWidth).sub(timeCellHeight).div(2).equal(),
                color: colorText,
                lineHeight: unit(timeCellHeight),
                borderRadius: borderRadiusSM,
                cursor: "pointer",
                transition: `background-color ${motionDurationMid}`,
                "&:hover": {
                  background: cellHoverBg
                }
              },
              "&-selected": {
                [`${componentCls}-time-panel-cell-inner`]: {
                  background: controlItemBgActive
                }
              },
              "&-disabled": {
                [`${componentCls}-time-panel-cell-inner`]: {
                  color: colorTextDisabled,
                  background: "transparent",
                  cursor: "not-allowed"
                }
              }
            }
          }
        }
      }
    }
  };
};
const genPickerPanelStyle = (token) => {
  const {
    componentCls,
    textHeight,
    lineWidth,
    paddingSM,
    antCls,
    colorPrimary,
    cellActiveWithRangeBg,
    colorPrimaryBorder,
    lineType,
    colorSplit
  } = token;
  return {
    [`${componentCls}-dropdown`]: {
      // ======================== Footer ========================
      [`${componentCls}-footer`]: {
        borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
        "&-extra": {
          padding: `0 ${unit(paddingSM)}`,
          lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
          textAlign: "start",
          "&:not(:last-child)": {
            borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`
          }
        }
      },
      // ==================== Footer > Ranges ===================
      [`${componentCls}-panels + ${componentCls}-footer ${componentCls}-ranges`]: {
        justifyContent: "space-between"
      },
      [`${componentCls}-ranges`]: {
        marginBlock: 0,
        paddingInline: unit(paddingSM),
        overflow: "hidden",
        textAlign: "start",
        listStyle: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "> li": {
          lineHeight: unit(token.calc(textHeight).sub(token.calc(lineWidth).mul(2)).equal()),
          display: "inline-block"
        },
        [`${componentCls}-now-btn-disabled`]: {
          pointerEvents: "none",
          color: token.colorTextDisabled
        },
        // https://github.com/ant-design/ant-design/issues/23687
        [`${componentCls}-preset > ${antCls}-tag-blue`]: {
          color: colorPrimary,
          background: cellActiveWithRangeBg,
          borderColor: colorPrimaryBorder,
          cursor: "pointer"
        },
        [`${componentCls}-ok`]: {
          paddingBlock: token.calc(lineWidth).mul(2).equal(),
          marginInlineStart: "auto"
        }
      }
    }
  };
};
const initPickerPanelToken = (token) => {
  const {
    componentCls,
    controlHeightLG,
    paddingXXS,
    padding
  } = token;
  return {
    pickerCellCls: `${componentCls}-cell`,
    pickerCellInnerCls: `${componentCls}-cell-inner`,
    pickerYearMonthCellWidth: token.calc(controlHeightLG).mul(1.5).equal(),
    pickerQuarterPanelContentHeight: token.calc(controlHeightLG).mul(1.4).equal(),
    pickerCellPaddingVertical: token.calc(paddingXXS).add(token.calc(paddingXXS).div(2)).equal(),
    pickerCellBorderGap: 2,
    // Magic for gap between cells
    pickerControlIconSize: 7,
    pickerControlIconMargin: 4,
    pickerControlIconBorderWidth: 1.5,
    pickerDatePanelPaddingHorizontal: token.calc(padding).add(token.calc(paddingXXS).div(2)).equal()
    // 18 in normal
  };
};
const initPanelComponentToken = (token) => {
  const {
    colorBgContainerDisabled,
    controlHeight,
    controlHeightSM,
    controlHeightLG,
    paddingXXS,
    lineWidth
  } = token;
  const dblPaddingXXS = paddingXXS * 2;
  const dblLineWidth = lineWidth * 2;
  const multipleItemHeight = Math.min(controlHeight - dblPaddingXXS, controlHeight - dblLineWidth);
  const multipleItemHeightSM = Math.min(controlHeightSM - dblPaddingXXS, controlHeightSM - dblLineWidth);
  const multipleItemHeightLG = Math.min(controlHeightLG - dblPaddingXXS, controlHeightLG - dblLineWidth);
  const INTERNAL_FIXED_ITEM_MARGIN = Math.floor(paddingXXS / 2);
  const filledToken = {
    INTERNAL_FIXED_ITEM_MARGIN,
    cellHoverBg: token.controlItemBgHover,
    cellActiveWithRangeBg: token.controlItemBgActive,
    cellHoverWithRangeBg: new FastColor(token.colorPrimary).lighten(35).toHexString(),
    cellRangeBorderColor: new FastColor(token.colorPrimary).lighten(20).toHexString(),
    cellBgDisabled: colorBgContainerDisabled,
    timeColumnWidth: controlHeightLG * 1.4,
    timeColumnHeight: 28 * 8,
    timeCellHeight: 28,
    cellWidth: controlHeightSM * 1.5,
    cellHeight: controlHeightSM,
    textHeight: controlHeightLG,
    withoutTimeCellHeight: controlHeightLG * 1.65,
    multipleItemBg: token.colorFillSecondary,
    multipleItemBorderColor: "transparent",
    multipleItemHeight,
    multipleItemHeightSM,
    multipleItemHeightLG,
    multipleSelectorBgDisabled: colorBgContainerDisabled,
    multipleItemColorDisabled: token.colorTextDisabled,
    multipleItemBorderColorDisabled: "transparent"
  };
  return filledToken;
};
const prepareComponentToken$2 = (token) => ({
  ...initComponentToken(token),
  ...initPanelComponentToken(token),
  ...getArrowToken(token),
  presetsWidth: 120,
  presetsMaxWidth: 200,
  zIndexPopup: token.zIndexPopupBase + 50
});
const genVariantsStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: [
      {
        ...genOutlinedStyle(token),
        ...genUnderlinedStyle(token),
        ...genFilledStyle(token),
        ...genBorderlessStyle(token)
      },
      // ========================= Multiple =========================
      {
        "&-outlined": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
          }
        },
        "&-filled": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.colorBgContainer,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
          }
        },
        "&-borderless": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
          }
        },
        "&-underlined": {
          [`&${componentCls}-multiple ${componentCls}-selection-item`]: {
            background: token.multipleItemBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${token.multipleItemBorderColor}`
          }
        }
      }
    ]
  };
};
const genPickerPadding = (paddingBlock, paddingInline) => {
  return {
    padding: `${unit(paddingBlock)} ${unit(paddingInline)}`
  };
};
const genPickerStatusStyle = (token) => {
  const {
    componentCls,
    colorError,
    colorWarning
  } = token;
  return {
    [`${componentCls}:not(${componentCls}-disabled):not([disabled])`]: {
      [`&${componentCls}-status-error`]: {
        [`${componentCls}-active-bar`]: {
          background: colorError
        }
      },
      [`&${componentCls}-status-warning`]: {
        [`${componentCls}-active-bar`]: {
          background: colorWarning
        }
      }
    }
  };
};
const genPickerStyle = (token) => {
  const {
    componentCls,
    antCls,
    paddingInline,
    lineWidth,
    lineType,
    colorBorder,
    borderRadius,
    motionDurationMid,
    colorTextDisabled,
    colorTextPlaceholder,
    colorTextQuaternary,
    fontSizeLG,
    inputFontSizeLG,
    fontSizeSM,
    inputFontSizeSM,
    controlHeightSM,
    paddingInlineSM,
    paddingXS,
    marginXS,
    colorIcon,
    lineWidthBold,
    colorPrimary,
    motionDurationSlow,
    zIndexPopup,
    paddingXXS,
    sizePopupArrow,
    colorBgElevated,
    borderRadiusLG,
    boxShadowSecondary,
    borderRadiusSM,
    colorSplit,
    cellHoverBg,
    presetsWidth,
    presetsMaxWidth,
    boxShadowPopoverArrow,
    fontHeight,
    lineHeightLG
  } = token;
  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        ...genPickerPadding(token.paddingBlock, token.paddingInline),
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 1,
        borderRadius,
        transition: [`border`, `box-shadow`, `background-color`].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
        [`${componentCls}-prefix`]: {
          flex: "0 0 auto",
          marginInlineEnd: token.inputAffixPadding
        },
        // ======================== Input =========================
        [`${componentCls}-input`]: {
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          width: "100%",
          "> input": {
            position: "relative",
            display: "inline-block",
            width: "100%",
            color: "inherit",
            fontSize: token.inputFontSize ?? token.fontSize,
            lineHeight: token.lineHeight,
            transition: `all ${motionDurationMid}`,
            ...genPlaceholderStyle(colorTextPlaceholder),
            flex: "auto",
            // Fix Firefox flex not correct:
            // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
            minWidth: 1,
            height: "auto",
            padding: 0,
            background: "transparent",
            border: 0,
            fontFamily: "inherit",
            "&:focus": {
              boxShadow: "none",
              outline: 0
            },
            "&[disabled]": {
              background: "transparent",
              color: colorTextDisabled,
              cursor: "not-allowed"
            }
          },
          "&-placeholder": {
            "> input": {
              color: colorTextPlaceholder
            }
          }
        },
        // Size
        "&-large": {
          ...genPickerPadding(token.paddingBlockLG, token.paddingInlineLG),
          borderRadius: token.borderRadiusLG,
          [`${componentCls}-input > input`]: {
            fontSize: inputFontSizeLG ?? fontSizeLG,
            lineHeight: lineHeightLG
          }
        },
        "&-small": {
          ...genPickerPadding(token.paddingBlockSM, token.paddingInlineSM),
          borderRadius: token.borderRadiusSM,
          [`${componentCls}-input > input`]: {
            fontSize: inputFontSizeSM ?? fontSizeSM
          }
        },
        [`${componentCls}-suffix`]: {
          display: "flex",
          flex: "none",
          alignSelf: "center",
          marginInlineStart: token.calc(paddingXS).div(2).equal(),
          color: colorTextQuaternary,
          lineHeight: 1,
          pointerEvents: "none",
          transition: ["opacity", "color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
          "> *": {
            verticalAlign: "top",
            "&:not(:last-child)": {
              marginInlineEnd: marginXS
            }
          }
        },
        [`${componentCls}-clear`]: {
          position: "absolute",
          top: "50%",
          insetInlineEnd: 0,
          color: colorTextQuaternary,
          lineHeight: 1,
          transform: "translateY(-50%)",
          cursor: "pointer",
          opacity: 0,
          transition: ["opacity", "color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
          "> *": {
            verticalAlign: "top"
          },
          "&:hover": {
            color: colorIcon
          }
        },
        "&:hover": {
          [`${componentCls}-clear`]: {
            opacity: 1
          },
          // Should use the following selector, but since `:has` has poor compatibility,
          // we use `:not(:last-child)` instead, which may cause some problems in some cases.
          // [`${componentCls}-suffix:has(+ ${componentCls}-clear)`]: {
          [`${componentCls}-suffix:not(:last-child)`]: {
            opacity: 0
          }
        },
        [`${componentCls}-separator`]: {
          position: "relative",
          display: "inline-block",
          width: "1em",
          height: fontSizeLG,
          color: colorTextQuaternary,
          fontSize: fontSizeLG,
          verticalAlign: "top",
          cursor: "default",
          [`${componentCls}-focused &`]: {
            color: colorIcon
          },
          [`${componentCls}-range-separator &`]: {
            [`${componentCls}-disabled &`]: {
              cursor: "not-allowed"
            }
          }
        },
        // ======================== Range =========================
        "&-range": {
          position: "relative",
          display: "inline-flex",
          // Active bar
          [`${componentCls}-active-bar`]: {
            bottom: token.calc(lineWidth).mul(-1).equal(),
            height: lineWidthBold,
            background: colorPrimary,
            opacity: 0,
            transition: `all ${motionDurationSlow} ease-out`,
            pointerEvents: "none"
          },
          [`&${componentCls}-focused`]: {
            [`${componentCls}-active-bar`]: {
              opacity: 1
            }
          },
          [`${componentCls}-range-separator`]: {
            alignItems: "center",
            padding: `0 ${unit(paddingXS)}`,
            lineHeight: 1
          }
        },
        // ======================== Clear =========================
        "&-range, &-multiple": {
          // Clear
          [`${componentCls}-clear`]: {
            insetInlineEnd: paddingInline
          },
          [`&${componentCls}-small`]: {
            [`${componentCls}-clear`]: {
              insetInlineEnd: paddingInlineSM
            }
          }
        },
        // ======================= Dropdown =======================
        "&-dropdown": {
          ...resetComponent(token),
          ...genPanelStyle(token),
          pointerEvents: "none",
          position: "absolute",
          // Fix incorrect position of picker popup
          // https://github.com/ant-design/ant-design/issues/35590
          top: -9999,
          left: {
            _skip_check_: true,
            value: -9999
          },
          zIndex: zIndexPopup,
          [`&${componentCls}-dropdown-hidden`]: {
            display: "none"
          },
          "&-rtl": {
            direction: "rtl"
          },
          [`&${componentCls}-dropdown-placement-bottomLeft,
            &${componentCls}-dropdown-placement-bottomRight`]: {
            [`${componentCls}-range-arrow`]: {
              top: 0,
              display: "block",
              transform: "translateY(-100%)"
            }
          },
          [`&${componentCls}-dropdown-placement-topLeft,
            &${componentCls}-dropdown-placement-topRight`]: {
            [`${componentCls}-range-arrow`]: {
              bottom: 0,
              display: "block",
              transform: "translateY(100%) rotate(180deg)"
            }
          },
          [`&${antCls}-slide-up-appear, &${antCls}-slide-up-enter`]: {
            [`${componentCls}-range-arrow${componentCls}-range-arrow`]: {
              transition: "none"
            }
          },
          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topRight`]: {
            animationName: slideDownIn
          },
          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomRight`]: {
            animationName: slideUpIn
          },
          // https://github.com/ant-design/ant-design/issues/48727
          [`&${antCls}-slide-up-leave ${componentCls}-panel-container`]: {
            pointerEvents: "none"
          },
          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topRight`]: {
            animationName: slideDownOut
          },
          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomRight`]: {
            animationName: slideUpOut
          },
          // Time picker with additional style
          [`${componentCls}-panel > ${componentCls}-time-panel`]: {
            paddingTop: paddingXXS
          },
          // ======================== Ranges ========================
          [`${componentCls}-range-wrapper`]: {
            display: "flex",
            position: "relative"
          },
          [`${componentCls}-range-arrow`]: {
            position: "absolute",
            zIndex: 1,
            display: "none",
            paddingInline: token.calc(paddingInline).mul(1.5).equal(),
            boxSizing: "content-box",
            transition: `all ${motionDurationSlow} ease-out`,
            ...genRoundedArrow(token, colorBgElevated, boxShadowPopoverArrow),
            "&:before": {
              insetInlineStart: token.calc(paddingInline).mul(1.5).equal()
            }
          },
          [`${componentCls}-panel-container`]: {
            overflow: "hidden",
            verticalAlign: "top",
            background: colorBgElevated,
            borderRadius: borderRadiusLG,
            boxShadow: boxShadowSecondary,
            transition: `margin ${motionDurationSlow}`,
            display: "inline-block",
            pointerEvents: "auto",
            // ======================== Layout ========================
            [`${componentCls}-panel-layout`]: {
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "stretch"
            },
            // ======================== Preset ========================
            [`${componentCls}-presets`]: {
              display: "flex",
              flexDirection: "column",
              minWidth: presetsWidth,
              maxWidth: presetsMaxWidth,
              ul: {
                height: 0,
                flex: "auto",
                listStyle: "none",
                overflow: "auto",
                margin: 0,
                padding: paddingXS,
                borderInlineEnd: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
                li: {
                  ...textEllipsis,
                  borderRadius: borderRadiusSM,
                  paddingInline: paddingXS,
                  paddingBlock: token.calc(controlHeightSM).sub(fontHeight).div(2).equal(),
                  cursor: "pointer",
                  transition: `all ${motionDurationSlow}`,
                  "+ li": {
                    marginTop: marginXS
                  },
                  "&:hover": {
                    background: cellHoverBg
                  }
                }
              }
            },
            // ======================== Panels ========================
            [`${componentCls}-panels`]: {
              display: "inline-flex",
              flexWrap: "nowrap",
              // [`${componentCls}-panel`]: {
              //   borderWidth: `0 0 ${unit(lineWidth)}`,
              // },
              "&:last-child": {
                [`${componentCls}-panel`]: {
                  borderWidth: 0
                }
              }
            },
            [`${componentCls}-panel`]: {
              verticalAlign: "top",
              background: "transparent",
              borderRadius: 0,
              borderWidth: 0,
              [`${componentCls}-content, table`]: {
                textAlign: "center"
              },
              "&-focused": {
                borderColor: colorBorder
              }
            }
          }
        },
        "&-dropdown-range": {
          padding: `${unit(token.calc(sizePopupArrow).mul(2).div(3).equal())} 0`,
          "&-hidden": {
            display: "none"
          }
        },
        "&-rtl": {
          direction: "rtl",
          [`${componentCls}-separator`]: {
            transform: "scale(-1, 1)"
          },
          [`${componentCls}-footer`]: {
            "&-extra": {
              direction: "rtl"
            }
          }
        }
      }
    },
    // Follow code may reuse in other components
    initSlideMotion(token, "slide-up"),
    initSlideMotion(token, "slide-down"),
    initMoveMotion(token, "move-up"),
    initMoveMotion(token, "move-down")
  ];
};
genStyleHooks("DatePicker", (token) => {
  const pickerToken = merge$1(initInputToken(token), initPickerPanelToken(token), {
    inputPaddingHorizontalBase: token.calc(token.paddingSM).sub(1).equal(),
    multipleSelectItemHeight: token.multipleItemHeight,
    selectHeight: token.controlHeight
  });
  return [
    genPickerPanelStyle(pickerToken),
    genPickerStyle(pickerToken),
    genVariantsStyle(pickerToken),
    genPickerStatusStyle(pickerToken),
    genPickerMultipleStyle(pickerToken),
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(token, {
      focusElCls: `${token.componentCls}-focused`
    })
  ];
}, prepareComponentToken$2);
const genCalendarStyles = (token) => {
  const {
    calendarCls,
    componentCls,
    fullBg,
    fullPanelBg,
    itemActiveBg
  } = token;
  return {
    [calendarCls]: {
      ...genPanelStyle(token),
      ...resetComponent(token),
      background: fullBg,
      "&-rtl": {
        direction: "rtl"
      },
      [`${calendarCls}-header`]: {
        display: "flex",
        justifyContent: "flex-end",
        padding: `${unit(token.paddingSM)} 0`,
        [`${calendarCls}-year-select`]: {
          minWidth: token.yearControlWidth
        },
        [`${calendarCls}-month-select`]: {
          minWidth: token.monthControlWidth,
          marginInlineStart: token.marginXS
        },
        [`${calendarCls}-mode-switch`]: {
          marginInlineStart: token.marginXS
        }
      }
    },
    [`${calendarCls} ${componentCls}-panel`]: {
      background: fullPanelBg,
      border: 0,
      borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
      borderRadius: 0,
      [`${componentCls}-month-panel, ${componentCls}-date-panel`]: {
        width: "auto"
      },
      [`${componentCls}-body`]: {
        padding: `${unit(token.paddingXS)} 0`
      },
      [`${componentCls}-content`]: {
        width: "100%"
      }
    },
    [`${calendarCls}-mini`]: {
      borderRadius: token.borderRadiusLG,
      [`${calendarCls}-header`]: {
        paddingInlineEnd: token.paddingXS,
        paddingInlineStart: token.paddingXS
      },
      [`${componentCls}-panel`]: {
        borderRadius: `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}`
      },
      [`${componentCls}-content`]: {
        height: token.miniContentHeight,
        th: {
          height: "auto",
          padding: 0,
          lineHeight: unit(token.weekHeight)
        }
      },
      [`${componentCls}-cell::before`]: {
        pointerEvents: "none"
      }
    },
    [`${calendarCls}${calendarCls}-full`]: {
      [`${componentCls}-panel`]: {
        display: "block",
        width: "100%",
        textAlign: "end",
        background: fullBg,
        border: 0,
        [`${componentCls}-body`]: {
          "th, td": {
            padding: 0
          },
          th: {
            height: "auto",
            paddingInlineEnd: token.paddingSM,
            paddingBottom: token.paddingXXS,
            lineHeight: unit(token.weekHeight)
          }
        }
      },
      [`${componentCls}-cell-week ${componentCls}-cell-inner`]: {
        display: "block",
        borderRadius: 0,
        borderTop: `${unit(token.lineWidthBold)} ${token.lineType} ${token.colorSplit}`,
        width: "100%",
        height: token.calc(token.dateValueHeight).add(token.dateContentHeight).add(token.calc(token.paddingXS).div(2)).add(token.lineWidthBold).equal()
      },
      [`${componentCls}-cell`]: {
        "&::before": {
          display: "none"
        },
        "&:hover": {
          [`${calendarCls}-date`]: {
            background: token.controlItemBgHover
          }
        },
        [`${calendarCls}-date-today::before`]: {
          display: "none"
        },
        // >>> Selected
        [`&-in-view${componentCls}-cell-selected`]: {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            background: itemActiveBg
          }
        },
        "&-selected, &-selected:hover": {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            [`${calendarCls}-date-value`]: {
              color: token.colorPrimary
            }
          }
        }
      },
      [`${calendarCls}-date`]: {
        display: "block",
        width: "auto",
        height: "auto",
        margin: `0 ${unit(token.calc(token.marginXS).div(2).equal())}`,
        padding: `${unit(token.calc(token.paddingXS).div(2).equal())} ${unit(token.paddingXS)} 0`,
        border: 0,
        borderTop: `${unit(token.lineWidthBold)} ${token.lineType} ${token.colorSplit}`,
        borderRadius: 0,
        transition: `background-color ${token.motionDurationSlow}`,
        "&-value": {
          lineHeight: unit(token.dateValueHeight),
          transition: `color ${token.motionDurationSlow}`
        },
        "&-content": {
          position: "static",
          width: "auto",
          height: token.dateContentHeight,
          overflowY: "auto",
          color: token.colorText,
          lineHeight: token.lineHeight,
          textAlign: "start"
        },
        "&-today": {
          borderColor: token.colorPrimary,
          [`${calendarCls}-date-value`]: {
            color: token.colorText
          }
        }
      }
    },
    [`@media only screen and (max-width: ${unit(token.screenXS)}) `]: {
      [calendarCls]: {
        [`${calendarCls}-header`]: {
          display: "block",
          [`${calendarCls}-year-select`]: {
            width: "50%"
          },
          [`${calendarCls}-month-select`]: {
            width: `calc(50% - ${unit(token.paddingXS)})`
          },
          [`${calendarCls}-mode-switch`]: {
            width: "100%",
            marginTop: token.marginXS,
            marginInlineStart: 0,
            "> label": {
              width: "50%",
              textAlign: "center"
            }
          }
        }
      }
    }
  };
};
const prepareComponentToken$1 = (token) => ({
  fullBg: token.colorBgContainer,
  fullPanelBg: token.colorBgContainer,
  itemActiveBg: token.controlItemBgActive,
  yearControlWidth: 80,
  monthControlWidth: 70,
  miniContentHeight: 256,
  ...initPanelComponentToken(token)
});
const useStyle$6 = genStyleHooks("Calendar", (token) => {
  const calendarCls = `${token.componentCls}-calendar`;
  const calendarToken = merge$1(token, initPickerPanelToken(token), {
    calendarCls,
    pickerCellInnerCls: `${token.componentCls}-cell-inner`,
    dateValueHeight: token.controlHeightSM,
    weekHeight: token.calc(token.controlHeightSM).mul(0.75).equal(),
    dateContentHeight: token.calc(token.calc(token.fontHeightSM).add(token.marginXS)).mul(3).add(token.calc(token.lineWidth).mul(2)).equal()
  });
  return genCalendarStyles(calendarToken);
}, prepareComponentToken$1);
const isSameYear = (date1, date2, config) => {
  const {
    getYear
  } = config;
  return date1 && date2 && getYear(date1) === getYear(date2);
};
const isSameMonth = (date1, date2, config) => {
  const {
    getMonth
  } = config;
  return isSameYear(date1, date2, config) && getMonth(date1) === getMonth(date2);
};
const isSameDate = (date1, date2, config) => {
  const {
    getDate
  } = config;
  return isSameMonth(date1, date2, config) && getDate(date1) === getDate(date2);
};
const generateCalendar = (generateConfig2) => {
  const Calendar2 = (props) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      style,
      dateFullCellRender,
      dateCellRender,
      monthFullCellRender,
      monthCellRender,
      cellRender,
      fullCellRender,
      headerRender,
      value,
      defaultValue,
      disabledDate,
      mode,
      validRange,
      fullscreen = true,
      showWeek,
      onChange,
      onPanelChange,
      onSelect,
      styles,
      classNames
    } = props;
    const {
      getPrefixCls,
      direction,
      className: contextClassName,
      style: contextStyle,
      classNames: contextClassNames,
      styles: contextStyles
    } = useComponentConfig("calendar");
    const mergedProps = {
      ...props,
      mode,
      fullscreen,
      showWeek
    };
    const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
      props: mergedProps
    });
    const [rootCls, headerCls, panelClassNames, rootStyle, headerStyle, panelStyles] = reactExports.useMemo(() => {
      const {
        root: nextRootClassName,
        header: nextHeaderClassName,
        ...nextPanelClassNames
      } = mergedClassNames;
      const {
        root: nextRootStyle,
        header: nextHeaderStyle,
        ...nextPanelStyles
      } = mergedStyles;
      return [nextRootClassName, nextHeaderClassName, nextPanelClassNames, nextRootStyle, nextHeaderStyle, nextPanelStyles];
    }, [mergedClassNames, mergedStyles]);
    const prefixCls = getPrefixCls("picker", customizePrefixCls);
    const calendarPrefixCls = `${prefixCls}-calendar`;
    const [hashId, cssVarCls] = useStyle$6(prefixCls, calendarPrefixCls);
    const today = generateConfig2.getNow();
    const [mergedValue, setMergedValue] = useControlledState(() => defaultValue || generateConfig2.getNow(), value);
    const [mergedMode, setMergedMode] = useControlledState("month", mode);
    const panelMode = reactExports.useMemo(() => mergedMode === "year" ? "month" : "date", [mergedMode]);
    const mergedDisabledDate = reactExports.useCallback((date) => {
      const notInRange = validRange ? generateConfig2.isAfter(validRange[0], date) || generateConfig2.isAfter(date, validRange[1]) : false;
      return notInRange || !!disabledDate?.(date);
    }, [disabledDate, validRange]);
    const triggerPanelChange = (date, newMode) => {
      onPanelChange?.(date, newMode);
    };
    const triggerChange = (date) => {
      setMergedValue(date);
      if (!isSameDate(date, mergedValue, generateConfig2)) {
        if (panelMode === "date" && !isSameMonth(date, mergedValue, generateConfig2) || panelMode === "month" && !isSameYear(date, mergedValue, generateConfig2)) {
          triggerPanelChange(date, mergedMode);
        }
        onChange?.(date);
      }
    };
    const triggerModeChange = (newMode) => {
      setMergedMode(newMode);
      triggerPanelChange(mergedValue, newMode);
    };
    const onInternalSelect = (date, source) => {
      triggerChange(date);
      onSelect?.(date, {
        source
      });
    };
    const dateRender = reactExports.useCallback((date, info) => {
      if (fullCellRender) {
        return fullCellRender(date, info);
      }
      if (dateFullCellRender) {
        return dateFullCellRender(date);
      }
      return /* @__PURE__ */ reactExports.createElement("div", {
        className: clsx(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, {
          [`${calendarPrefixCls}-date-today`]: isSameDate(today, date, generateConfig2)
        })
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-value`
      }, String(generateConfig2.getDate(date)).padStart(2, "0")), /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-content`
      }, typeof cellRender === "function" ? cellRender(date, info) : dateCellRender?.(date)));
    }, [today, prefixCls, calendarPrefixCls, fullCellRender, dateFullCellRender, cellRender, dateCellRender]);
    const monthRender = reactExports.useCallback((date, info) => {
      if (fullCellRender) {
        return fullCellRender(date, info);
      }
      if (monthFullCellRender) {
        return monthFullCellRender(date);
      }
      const months = info.locale.shortMonths || generateConfig2.locale.getShortMonths(info.locale.locale);
      return /* @__PURE__ */ reactExports.createElement("div", {
        className: clsx(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, {
          [`${calendarPrefixCls}-date-today`]: isSameMonth(today, date, generateConfig2)
        })
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-value`
      }, months[generateConfig2.getMonth(date)]), /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-content`
      }, typeof cellRender === "function" ? cellRender(date, info) : monthCellRender?.(date)));
    }, [today, prefixCls, calendarPrefixCls, fullCellRender, monthFullCellRender, cellRender, monthCellRender]);
    const [contextLocale] = useLocale("Calendar", locale);
    const locale$12 = merge(contextLocale, props.locale || {});
    const mergedCellRender = (current, info) => {
      if (info.type === "date") {
        return dateRender(current, info);
      }
      if (info.type === "month") {
        return monthRender(current, {
          ...info,
          locale: locale$12?.lang
        });
      }
    };
    return /* @__PURE__ */ reactExports.createElement("div", {
      className: clsx(calendarPrefixCls, {
        [`${calendarPrefixCls}-full`]: fullscreen,
        [`${calendarPrefixCls}-mini`]: !fullscreen,
        [`${calendarPrefixCls}-rtl`]: direction === "rtl"
      }, contextClassName, className, rootClassName, rootCls, hashId, cssVarCls),
      style: {
        ...rootStyle,
        ...contextStyle,
        ...style
      }
    }, headerRender ? headerRender({
      value: mergedValue,
      type: mergedMode,
      onChange: (nextDate) => {
        onInternalSelect(nextDate, "customize");
      },
      onTypeChange: triggerModeChange
    }) : /* @__PURE__ */ reactExports.createElement(CalendarHeader, {
      className: headerCls,
      style: headerStyle,
      prefixCls: calendarPrefixCls,
      value: mergedValue,
      generateConfig: generateConfig2,
      mode: mergedMode,
      fullscreen,
      locale: locale$12?.lang,
      validRange,
      onChange: onInternalSelect,
      onModeChange: triggerModeChange
    }), /* @__PURE__ */ reactExports.createElement(RefPanelPicker, {
      classNames: panelClassNames,
      styles: panelStyles,
      value: mergedValue,
      prefixCls,
      locale: locale$12?.lang,
      generateConfig: generateConfig2,
      cellRender: mergedCellRender,
      onSelect: (nextDate) => {
        onInternalSelect(nextDate, panelMode);
      },
      mode: panelMode,
      picker: panelMode,
      disabledDate: mergedDisabledDate,
      hideHeader: true,
      showWeek
    }));
  };
  return Calendar2;
};
const Calendar = generateCalendar(generateConfig);
Calendar.generateCalendar = generateCalendar;
const RowContext = /* @__PURE__ */ reactExports.createContext({});
const isNumber = (value) => {
  return typeof value === "number" && !Number.isNaN(value);
};
function parseFlex(flex) {
  if (flex === "auto") {
    return "1 1 auto";
  }
  if (isNumber(flex)) {
    return `${flex} ${flex} auto`;
  }
  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`;
  }
  return flex;
}
const Col = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    gutter,
    wrap
  } = reactExports.useContext(RowContext);
  const {
    prefixCls: customizePrefixCls,
    span,
    order,
    offset,
    push,
    pull,
    className,
    children,
    flex,
    style,
    ...others
  } = props;
  const prefixCls = getPrefixCls("col", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [hashId, cssVarCls] = useColStyle(prefixCls);
  const [varName] = genCssVar(rootPrefixCls, "col");
  const sizeStyle = {};
  let sizeClassObj = {};
  responsiveArrayReversed.forEach((size) => {
    let sizeProps = {};
    const propSize = props[size];
    if (typeof propSize === "number") {
      sizeProps.span = propSize;
    } else if (typeof propSize === "object") {
      sizeProps = propSize || {};
    }
    delete others[size];
    sizeClassObj = {
      ...sizeClassObj,
      [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== void 0,
      [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
      [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
      [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
      [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
      [`${prefixCls}-rtl`]: direction === "rtl"
    };
    if (sizeProps.flex) {
      sizeClassObj[`${prefixCls}-${size}-flex`] = true;
      sizeStyle[varName(`${size}-flex`)] = parseFlex(sizeProps.flex);
    }
  });
  const classes = clsx(prefixCls, {
    [`${prefixCls}-${span}`]: span !== void 0,
    [`${prefixCls}-order-${order}`]: order,
    [`${prefixCls}-offset-${offset}`]: offset,
    [`${prefixCls}-push-${push}`]: push,
    [`${prefixCls}-pull-${pull}`]: pull
  }, className, sizeClassObj, hashId, cssVarCls);
  const mergedStyle = {};
  if (gutter?.[0]) {
    const horizontalGutter = typeof gutter[0] === "number" ? `${gutter[0] / 2}px` : `calc(${gutter[0]} / 2)`;
    mergedStyle.paddingInline = horizontalGutter;
  }
  if (flex) {
    mergedStyle.flex = parseFlex(flex);
    if (wrap === false && !mergedStyle.minWidth) {
      mergedStyle.minWidth = 0;
    }
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    ...others,
    style: {
      ...mergedStyle,
      ...style,
      ...sizeStyle
    },
    className: classes,
    ref
  }, children);
});
function useGutter(gutter, screens) {
  const results = [void 0, void 0];
  const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, void 0];
  const mergedScreens = screens || {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
    xxxl: true
  };
  normalizedGutter.forEach((g, index) => {
    if (typeof g === "object" && g !== null) {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint = responsiveArray[i];
        if (mergedScreens[breakpoint] && g[breakpoint] !== void 0) {
          results[index] = g[breakpoint];
          break;
        }
      }
    } else {
      results[index] = g;
    }
  });
  return results;
}
function useMergedPropByScreen(oriProp, screen) {
  const [prop, setProp] = reactExports.useState(typeof oriProp === "string" ? oriProp : "");
  const calcMergedAlignOrJustify = () => {
    if (typeof oriProp === "string") {
      setProp(oriProp);
    }
    if (typeof oriProp !== "object") {
      return;
    }
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint = responsiveArray[i];
      if (!screen || !screen[breakpoint]) {
        continue;
      }
      const curVal = oriProp[breakpoint];
      if (curVal !== void 0) {
        setProp(curVal);
        return;
      }
    }
  };
  reactExports.useEffect(() => {
    calcMergedAlignOrJustify();
  }, [JSON.stringify(oriProp), screen]);
  return prop;
}
const Row = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    justify,
    align,
    className,
    style,
    children,
    gutter = 0,
    wrap,
    ...others
  } = props;
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const screens = useBreakpoint(true, null);
  const mergedAlign = useMergedPropByScreen(align, screens);
  const mergedJustify = useMergedPropByScreen(justify, screens);
  const prefixCls = getPrefixCls("row", customizePrefixCls);
  const [hashId, cssVarCls] = useRowStyle(prefixCls);
  const gutters = useGutter(gutter, screens);
  const classes = clsx(prefixCls, {
    [`${prefixCls}-no-wrap`]: wrap === false,
    [`${prefixCls}-${mergedJustify}`]: mergedJustify,
    [`${prefixCls}-${mergedAlign}`]: mergedAlign,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, hashId, cssVarCls);
  const rowStyle = {};
  if (gutters?.[0]) {
    const horizontalGutter = typeof gutters[0] === "number" ? `${gutters[0] / -2}px` : `calc(${gutters[0]} / -2)`;
    rowStyle.marginInline = horizontalGutter;
  }
  const [gutterH, gutterV] = gutters;
  rowStyle.rowGap = gutterV;
  const rowContext = reactExports.useMemo(() => ({
    gutter: [gutterH, gutterV],
    wrap
  }), [gutterH, gutterV, wrap]);
  return /* @__PURE__ */ reactExports.createElement(RowContext.Provider, {
    value: rowContext
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ...others,
    className: classes,
    style: {
      ...rowStyle,
      ...style
    },
    ref
  }, children));
});
const genSpaceAddonStyle = (token) => {
  const {
    componentCls,
    borderRadius,
    paddingSM,
    colorBorder,
    paddingXS,
    fontSizeLG,
    fontSizeSM,
    borderRadiusLG,
    borderRadiusSM,
    colorBgContainerDisabled,
    lineWidth,
    antCls
  } = token;
  const [varName, varRef] = genCssVar(antCls, "space");
  return {
    [componentCls]: [
      // ==========================================================
      // ==                         Base                         ==
      // ==========================================================
      {
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        paddingInline: paddingSM,
        margin: 0,
        borderWidth: lineWidth,
        borderStyle: "solid",
        borderRadius,
        "&:hover": {
          zIndex: 0
        },
        [`&${componentCls}-disabled`]: {
          color: token.colorTextDisabled
        },
        "&-large": {
          fontSize: fontSizeLG,
          borderRadius: borderRadiusLG
        },
        "&-small": {
          paddingInline: paddingXS,
          borderRadius: borderRadiusSM,
          fontSize: fontSizeSM
        },
        "&-compact-last-item": {
          borderEndStartRadius: 0,
          borderStartStartRadius: 0
        },
        "&-compact-first-item": {
          borderEndEndRadius: 0,
          borderStartEndRadius: 0
        },
        "&-compact-item:not(:first-child):not(:last-child)": {
          borderRadius: 0
        },
        "&-compact-item:not(:last-child)": {
          borderInlineEndWidth: 0
        },
        "&-compact-item:not(:first-child)": {
          borderInlineStartWidth: 0
        }
      },
      // ==========================================================
      // ==                       Variants                       ==
      // ==========================================================
      {
        [varName("addon-border-color")]: colorBorder,
        [varName("addon-background")]: colorBgContainerDisabled,
        // Filled
        [varName("addon-border-color-outlined")]: colorBorder,
        [varName("addon-background-filled")]: colorBgContainerDisabled,
        borderColor: varRef("addon-border-color"),
        background: varRef("addon-background"),
        // ======================= Outlined =======================
        "&-variant-outlined": {
          [varName("addon-border-color")]: varRef("addon-border-color-outlined")
        },
        // ======================== Filled ========================
        "&-variant-filled": {
          [varName("addon-border-color")]: "transparent",
          [varName("addon-background")]: varRef("addon-background-filled"),
          // Disabled
          [`&${componentCls}-disabled`]: {
            [varName("addon-border-color")]: colorBorder,
            [varName("addon-background")]: colorBgContainerDisabled
          }
        },
        // ====================== Borderless ======================
        "&-variant-borderless": {
          border: "none",
          background: "transparent"
        },
        // ====================== Underlined ======================
        "&-variant-underlined": {
          border: "none",
          background: "transparent"
        }
      },
      // ==========================================================
      // ==                        Status                        ==
      // ==========================================================
      {
        "&-status-error": {
          [varName("addon-border-color-outlined")]: token.colorError,
          [varName("addon-background-filled")]: token.colorErrorBg,
          color: token.colorError
        },
        "&-status-warning": {
          [varName("addon-border-color-outlined")]: token.colorWarning,
          [varName("addon-background-filled")]: token.colorWarningBg,
          color: token.colorWarning
        }
      }
    ]
  };
};
const useStyle$5 = genStyleHooks(["Space", "Addon"], (token) => [genSpaceAddonStyle(token), genCompactItemStyle(token, {
  focus: false
})]);
const SpaceAddon = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    className,
    children,
    style,
    prefixCls: customizePrefixCls,
    variant = "outlined",
    disabled,
    status,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    direction: directionConfig
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls("space-addon", customizePrefixCls);
  const [hashId, cssVarCls] = useStyle$5(prefixCls);
  const {
    compactItemClassnames,
    compactSize
  } = useCompactItemContext(prefixCls, directionConfig);
  const statusCls = getStatusClassNames(prefixCls, status);
  const classes = clsx(prefixCls, hashId, compactItemClassnames, cssVarCls, `${prefixCls}-variant-${variant}`, statusCls, {
    [`${prefixCls}-${compactSize}`]: compactSize,
    [`${prefixCls}-disabled`]: disabled
  }, className);
  return /* @__PURE__ */ React.createElement("div", {
    ref,
    className: classes,
    style,
    ...restProps
  }, children);
});
const getAllowClear = (allowClear) => {
  let mergedAllowClear;
  if (typeof allowClear === "object" && allowClear?.clearIcon) {
    mergedAllowClear = allowClear;
  } else if (allowClear) {
    mergedAllowClear = {
      clearIcon: /* @__PURE__ */ React.createElement(RefIcon$3, null)
    };
  }
  return mergedAllowClear;
};
function useRemovePasswordTimeout(inputRef, triggerOnMount) {
  const removePasswordTimeoutRef = reactExports.useRef([]);
  const removePasswordTimeout = () => {
    removePasswordTimeoutRef.current.push(setTimeout(() => {
      if (inputRef.current?.input && inputRef.current?.input.getAttribute("type") === "password" && inputRef.current?.input.hasAttribute("value")) {
        inputRef.current?.input.removeAttribute("value");
      }
    }));
  };
  reactExports.useEffect(() => {
    if (triggerOnMount) {
      removePasswordTimeout();
    }
    return () => removePasswordTimeoutRef.current.forEach((timer) => {
      if (timer) {
        clearTimeout(timer);
      }
    });
  }, []);
  return removePasswordTimeout;
}
function hasPrefixSuffix(props) {
  return !!(props.prefix || props.suffix || props.allowClear || props.showCount);
}
const Input$1 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    bordered = true,
    status: customStatus,
    size: customSize,
    disabled: customDisabled,
    onBlur,
    onFocus,
    suffix,
    allowClear,
    addonAfter,
    addonBefore,
    className,
    style,
    styles,
    rootClassName,
    onChange,
    classNames,
    variant: customVariant,
    ...rest
  } = props;
  const {
    getPrefixCls,
    direction,
    allowClear: contextAllowClear,
    autoComplete: contextAutoComplete,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("input");
  const prefixCls = getPrefixCls("input", customizePrefixCls);
  const inputRef = reactExports.useRef(null);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useSharedStyle(prefixCls, rootClassName);
  useStyle$7(prefixCls, rootCls);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const mergedSize = useSize((ctx) => customSize ?? compactSize ?? ctx);
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;
  const mergedProps = {
    ...props,
    size: mergedSize,
    disabled: mergedDisabled
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps
  });
  const {
    status: contextStatus,
    hasFeedback,
    feedbackIcon
  } = reactExports.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  const inputHasPrefixSuffix = hasPrefixSuffix(props) || !!hasFeedback;
  reactExports.useRef(inputHasPrefixSuffix);
  const removePasswordTimeout = useRemovePasswordTimeout(inputRef, true);
  const handleBlur = (e2) => {
    removePasswordTimeout();
    onBlur?.(e2);
  };
  const handleFocus = (e2) => {
    removePasswordTimeout();
    onFocus?.(e2);
  };
  const handleChange = (e2) => {
    removePasswordTimeout();
    onChange?.(e2);
  };
  const suffixNode = (hasFeedback || suffix) && /* @__PURE__ */ React.createElement(React.Fragment, null, suffix, hasFeedback && feedbackIcon);
  const mergedAllowClear = getAllowClear(allowClear ?? contextAllowClear);
  const [variant, enableVariantCls] = useVariant("input", customVariant, bordered);
  return /* @__PURE__ */ React.createElement(Input$2, {
    ref: composeRef(ref, inputRef),
    prefixCls,
    autoComplete: contextAutoComplete,
    ...rest,
    disabled: mergedDisabled,
    onBlur: handleBlur,
    onFocus: handleFocus,
    style: {
      ...mergedStyles.root,
      ...contextStyle,
      ...style
    },
    styles: mergedStyles,
    suffix: suffixNode,
    allowClear: mergedAllowClear,
    className: clsx(className, rootClassName, cssVarCls, rootCls, compactItemClassnames, contextClassName, mergedClassNames.root),
    onChange: handleChange,
    addonBefore: addonBefore && /* @__PURE__ */ React.createElement(ContextIsolator, {
      form: true,
      space: true
    }, addonBefore),
    addonAfter: addonAfter && /* @__PURE__ */ React.createElement(ContextIsolator, {
      form: true,
      space: true
    }, addonAfter),
    classNames: {
      ...mergedClassNames,
      input: clsx({
        [`${prefixCls}-sm`]: mergedSize === "small",
        [`${prefixCls}-lg`]: mergedSize === "large",
        [`${prefixCls}-rtl`]: direction === "rtl"
      }, mergedClassNames.input, hashId),
      variant: clsx({
        [`${prefixCls}-${variant}`]: enableVariantCls
      }, getStatusClassNames(prefixCls, mergedStatus)),
      affixWrapper: clsx({
        [`${prefixCls}-affix-wrapper-sm`]: mergedSize === "small",
        [`${prefixCls}-affix-wrapper-lg`]: mergedSize === "large",
        [`${prefixCls}-affix-wrapper-rtl`]: direction === "rtl"
      }, hashId),
      wrapper: clsx({
        [`${prefixCls}-group-rtl`]: direction === "rtl"
      }, hashId),
      groupWrapper: clsx({
        [`${prefixCls}-group-wrapper-sm`]: mergedSize === "small",
        [`${prefixCls}-group-wrapper-lg`]: mergedSize === "large",
        [`${prefixCls}-group-wrapper-rtl`]: direction === "rtl",
        [`${prefixCls}-group-wrapper-${variant}`]: enableVariantCls
      }, getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback), hashId)
    }
  });
});
function isPresetSize(size) {
  return ["small", "middle", "large"].includes(size);
}
function isValidGapNumber(size) {
  if (!size) {
    return false;
  }
  return typeof size === "number" && !Number.isNaN(size);
}
const SpaceContext = /* @__PURE__ */ React.createContext({
  latestIndex: 0
});
const SpaceContextProvider = SpaceContext.Provider;
const Item = (props) => {
  const {
    className,
    prefix,
    index,
    children,
    separator,
    style,
    classNames,
    styles
  } = props;
  const {
    latestIndex
  } = reactExports.useContext(SpaceContext);
  if (!isNonNullable(children)) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("div", {
    className,
    style
  }, children), index < latestIndex && separator && /* @__PURE__ */ reactExports.createElement("span", {
    className: clsx(`${prefix}-item-separator`, classNames?.separator),
    style: styles?.separator
  }, separator));
};
const genSpaceStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  return {
    [componentCls]: {
      display: "inline-flex",
      "&-rtl": {
        direction: "rtl"
      },
      "&-vertical": {
        flexDirection: "column"
      },
      "&-align": {
        flexDirection: "column",
        "&-center": {
          alignItems: "center"
        },
        "&-start": {
          alignItems: "flex-start"
        },
        "&-end": {
          alignItems: "flex-end"
        },
        "&-baseline": {
          alignItems: "baseline"
        }
      },
      [`${componentCls}-item:empty`]: {
        display: "none"
      },
      // https://github.com/ant-design/ant-design/issues/47875
      [`${componentCls}-item > ${antCls}-badge-not-a-wrapper:only-child`]: {
        display: "block"
      }
    }
  };
};
const genSpaceGapStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      "&-gap-row-small": {
        rowGap: token.spaceGapSmallSize
      },
      "&-gap-row-middle": {
        rowGap: token.spaceGapMiddleSize
      },
      "&-gap-row-large": {
        rowGap: token.spaceGapLargeSize
      },
      "&-gap-col-small": {
        columnGap: token.spaceGapSmallSize
      },
      "&-gap-col-middle": {
        columnGap: token.spaceGapMiddleSize
      },
      "&-gap-col-large": {
        columnGap: token.spaceGapLargeSize
      }
    }
  };
};
const useStyle$4 = genStyleHooks("Space", (token) => {
  const spaceToken = merge$1(token, {
    spaceGapSmallSize: token.paddingXS,
    spaceGapMiddleSize: token.padding,
    spaceGapLargeSize: token.paddingLG
  });
  return [genSpaceStyle(spaceToken), genSpaceGapStyle(spaceToken)];
}, () => ({}), {
  // Space component don't apply extra font style
  // https://github.com/ant-design/ant-design/issues/40315
  resetStyle: false
});
const InternalSpace = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction: directionConfig,
    size: contextSize,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("space");
  const {
    size = contextSize ?? "small",
    align,
    className,
    rootClassName,
    children,
    direction,
    orientation,
    prefixCls: customizePrefixCls,
    split,
    separator,
    style,
    vertical,
    wrap = false,
    classNames,
    styles,
    ...restProps
  } = props;
  const [horizontalSize, verticalSize] = Array.isArray(size) ? size : [size, size];
  const isPresetVerticalSize = isPresetSize(verticalSize);
  const isPresetHorizontalSize = isPresetSize(horizontalSize);
  const isValidVerticalSize = isValidGapNumber(verticalSize);
  const isValidHorizontalSize = isValidGapNumber(horizontalSize);
  const childNodes = toArray$1(children, {
    keepEmpty: true
  });
  const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, direction);
  const mergedAlign = align === void 0 && !mergedVertical ? "center" : align;
  const mergedSeparator = separator ?? split;
  const prefixCls = getPrefixCls("space", customizePrefixCls);
  const [hashId, cssVarCls] = useStyle$4(prefixCls);
  const mergedProps = {
    ...props,
    size,
    orientation: mergedOrientation,
    align: mergedAlign
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps
  });
  const rootClassNames = clsx(prefixCls, contextClassName, hashId, `${prefixCls}-${mergedOrientation}`, {
    [`${prefixCls}-rtl`]: directionConfig === "rtl",
    [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
    [`${prefixCls}-gap-row-${verticalSize}`]: isPresetVerticalSize,
    [`${prefixCls}-gap-col-${horizontalSize}`]: isPresetHorizontalSize
  }, className, rootClassName, cssVarCls, mergedClassNames.root);
  const itemClassName = clsx(`${prefixCls}-item`, mergedClassNames.item);
  const renderedItems = childNodes.map((child, i) => {
    const key = child?.key || `${itemClassName}-${i}`;
    return /* @__PURE__ */ reactExports.createElement(Item, {
      prefix: prefixCls,
      classNames: mergedClassNames,
      styles: mergedStyles,
      className: itemClassName,
      key,
      index: i,
      separator: mergedSeparator,
      style: mergedStyles.item
    }, child);
  });
  const memoizedSpaceContext = reactExports.useMemo(() => {
    const calcLatestIndex = childNodes.reduce((latest, child, i) => isNonNullable(child) ? i : latest, 0);
    return {
      latestIndex: calcLatestIndex
    };
  }, [childNodes]);
  if (childNodes.length === 0) {
    return null;
  }
  const gapStyle = {};
  if (wrap) {
    gapStyle.flexWrap = "wrap";
  }
  if (!isPresetHorizontalSize && isValidHorizontalSize) {
    gapStyle.columnGap = horizontalSize;
  }
  if (!isPresetVerticalSize && isValidVerticalSize) {
    gapStyle.rowGap = verticalSize;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    ref,
    className: rootClassNames,
    style: {
      ...gapStyle,
      ...mergedStyles.root,
      ...contextStyle,
      ...style
    },
    ...restProps
  }, /* @__PURE__ */ reactExports.createElement(SpaceContextProvider, {
    value: memoizedSpaceContext
  }, renderedItems));
});
const Space = InternalSpace;
Space.Compact = Compact$1;
Space.Addon = SpaceAddon;
const convertToTooltipProps = (tooltip, context) => {
  if (!isNonNullable(tooltip)) {
    return null;
  }
  if (typeof tooltip === "object" && !/* @__PURE__ */ reactExports.isValidElement(tooltip)) {
    return {
      ...context,
      ...tooltip
    };
  }
  return {
    ...context,
    title: tooltip
  };
};
function useDebounce(value) {
  const [cacheValue, setCacheValue] = reactExports.useState(value);
  reactExports.useEffect(() => {
    const timeout = setTimeout(() => {
      setCacheValue(value);
    }, value.length ? 0 : 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);
  return cacheValue;
}
const genFormValidateMotionStyle = (token) => {
  const {
    componentCls,
    motionDurationFast,
    motionEaseInOut
  } = token;
  const helpCls = `${componentCls}-show-help`;
  const helpItemCls = `${componentCls}-show-help-item`;
  return {
    [helpCls]: {
      // Explain holder
      transition: `opacity ${motionDurationFast} ${motionEaseInOut}`,
      "&-appear, &-enter": {
        opacity: 0,
        "&-active": {
          opacity: 1
        }
      },
      "&-leave": {
        opacity: 1,
        "&-active": {
          opacity: 0
        }
      },
      // Explain
      [helpItemCls]: {
        overflow: "hidden",
        transition: `${["height", "opacity", "transform"].map((prop) => `${prop} ${motionDurationFast} ${motionEaseInOut}`).join(", ")} !important`,
        [`&${helpItemCls}-appear, &${helpItemCls}-enter`]: {
          transform: `translateY(-5px)`,
          opacity: 0,
          "&-active": {
            transform: "translateY(0)",
            opacity: 1
          }
        },
        [`&${helpItemCls}-leave-active`]: {
          transform: `translateY(-5px)`
        }
      }
    }
  };
};
const resetForm = (token) => ({
  legend: {
    display: "block",
    width: "100%",
    marginBottom: token.marginLG,
    padding: 0,
    color: token.colorTextDescription,
    fontSize: token.fontSizeLG,
    lineHeight: "inherit",
    border: 0,
    borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
  },
  'input[type="search"]': {
    boxSizing: "border-box"
  },
  // Position radios and checkboxes better
  'input[type="radio"], input[type="checkbox"]': {
    lineHeight: "normal"
  },
  'input[type="file"]': {
    display: "block"
  },
  // Make range inputs behave like textual form controls
  'input[type="range"]': {
    display: "block",
    width: "100%"
  },
  // Make multiple select elements height not fixed
  "select[multiple], select[size]": {
    height: "auto"
  },
  // Focus for file, radio, and checkbox
  [`input[type='file']:focus,
  input[type='radio']:focus,
  input[type='checkbox']:focus`]: {
    outline: 0,
    boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${token.controlOutline}`
  },
  // Adjust output element
  output: {
    display: "block",
    paddingTop: 15,
    color: token.colorText,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight
  }
});
const genFormSize = (token, height) => {
  const {
    formItemCls
  } = token;
  return {
    [formItemCls]: {
      [`${formItemCls}-label > label`]: {
        height
      },
      [`${formItemCls}-control-input`]: {
        minHeight: height
      }
    }
  };
};
const genFormStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [token.componentCls]: {
      ...resetComponent(token),
      ...resetForm(token),
      [`${componentCls}-text`]: {
        display: "inline-block",
        paddingInlineEnd: token.paddingSM
      },
      // ================================================================
      // =                             Size                             =
      // ================================================================
      "&-small": {
        ...genFormSize(token, token.controlHeightSM)
      },
      "&-large": {
        ...genFormSize(token, token.controlHeightLG)
      }
    }
  };
};
const genFormItemStyle = (token) => {
  const {
    formItemCls,
    iconCls,
    rootPrefixCls,
    antCls,
    labelRequiredMarkColor,
    labelColor,
    labelFontSize,
    labelHeight,
    labelColonMarginInlineStart,
    labelColonMarginInlineEnd,
    itemMarginBottom
  } = token;
  const [varName] = genCssVar(antCls, "grid");
  return {
    [formItemCls]: {
      ...resetComponent(token),
      marginBottom: itemMarginBottom,
      verticalAlign: "top",
      "&-with-help": {
        transition: "none"
      },
      [`&-hidden,
        &-hidden${antCls}-row`]: {
        // https://github.com/ant-design/ant-design/issues/26141
        display: "none"
      },
      "&-has-warning": {
        [`${formItemCls}-split`]: {
          color: token.colorError
        }
      },
      "&-has-error": {
        [`${formItemCls}-split`]: {
          color: token.colorWarning
        }
      },
      // ==============================================================
      // =                            Label                           =
      // ==============================================================
      [`${formItemCls}-label`]: {
        flexGrow: 0,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textAlign: "end",
        verticalAlign: "middle",
        "&-left": {
          textAlign: "start"
        },
        "&-wrap": {
          overflow: "unset",
          lineHeight: token.lineHeight,
          whiteSpace: "unset",
          "> label": {
            verticalAlign: "middle",
            textWrap: "balance"
          }
        },
        "> label": {
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          maxWidth: "100%",
          height: labelHeight,
          color: labelColor,
          fontSize: labelFontSize,
          [`> ${iconCls}`]: {
            fontSize: token.fontSize,
            verticalAlign: "top"
          },
          [`&${formItemCls}-required`]: {
            "&::before": {
              display: "inline-block",
              marginInlineEnd: token.marginXXS,
              color: labelRequiredMarkColor,
              fontSize: token.fontSize,
              fontFamily: "SimSun, sans-serif",
              lineHeight: 1,
              content: '"*"'
            },
            [`&${formItemCls}-required-mark-hidden, &${formItemCls}-required-mark-optional`]: {
              "&::before": {
                display: "none"
              }
            }
          },
          // Optional mark
          [`${formItemCls}-optional`]: {
            display: "inline-block",
            marginInlineStart: token.marginXXS,
            color: token.colorTextDescription,
            [`&${formItemCls}-required-mark-hidden`]: {
              display: "none"
            }
          },
          // Optional mark
          [`${formItemCls}-tooltip`]: {
            color: token.colorTextDescription,
            cursor: "help",
            writingMode: "horizontal-tb",
            marginInlineStart: token.marginXXS
          },
          "&::after": {
            content: '":"',
            position: "relative",
            marginBlock: 0,
            marginInlineStart: labelColonMarginInlineStart,
            marginInlineEnd: labelColonMarginInlineEnd
          },
          [`&${formItemCls}-no-colon::after`]: {
            content: '"\\a0"'
          }
        }
      },
      // ==============================================================
      // =                            Input                           =
      // ==============================================================
      [`${formItemCls}-control`]: {
        [varName("display")]: "flex",
        flexDirection: "column",
        flexGrow: 1,
        [`&:first-child:not([class^="'${rootPrefixCls}-col-'"]):not([class*="' ${rootPrefixCls}-col-'"])`]: {
          width: "100%"
        },
        "&-input": {
          position: "relative",
          display: "flex",
          alignItems: "center",
          minHeight: token.controlHeight,
          "&-content": {
            flex: "auto",
            maxWidth: "100%",
            // Fix https://github.com/ant-design/ant-design/issues/54042
            // Remove impact of whitespaces
            [`&:has(> ${antCls}-switch:only-child, > ${antCls}-rate:only-child)`]: {
              display: "flex",
              alignItems: "center"
            }
          }
        }
      },
      // ==============================================================
      // =                           Explain                          =
      // ==============================================================
      [formItemCls]: {
        "&-additional": {
          display: "flex",
          flexDirection: "column"
        },
        "&-explain, &-extra": {
          clear: "both",
          color: token.colorTextDescription,
          fontSize: token.fontSize,
          lineHeight: token.lineHeight
        },
        "&-explain-connected": {
          width: "100%"
        },
        "&-extra": {
          minHeight: token.controlHeightSM,
          transition: `color ${token.motionDurationMid} ${token.motionEaseOut}`
          // sync input color transition
        },
        "&-explain": {
          "&-error": {
            color: token.colorError
          },
          "&-warning": {
            color: token.colorWarning
          }
        }
      },
      [`&-with-help ${formItemCls}-explain`]: {
        height: "auto",
        opacity: 1
      },
      // ==============================================================
      // =                        Feedback Icon                       =
      // ==============================================================
      [`${formItemCls}-feedback-icon`]: {
        fontSize: token.fontSize,
        textAlign: "center",
        visibility: "visible",
        animationName: zoomIn,
        animationDuration: token.motionDurationMid,
        animationTimingFunction: token.motionEaseOutBack,
        pointerEvents: "none",
        "&-success": {
          color: token.colorSuccess
        },
        "&-error": {
          color: token.colorError
        },
        "&-warning": {
          color: token.colorWarning
        },
        "&-validating": {
          color: token.colorPrimary
        }
      }
    }
  };
};
const makeVerticalLayoutLabel = (token) => ({
  padding: token.verticalLabelPadding,
  margin: token.verticalLabelMargin,
  whiteSpace: "initial",
  textAlign: "start",
  "> label": {
    margin: 0,
    "&::after": {
      // https://github.com/ant-design/ant-design/issues/43538
      visibility: "hidden"
    }
  }
});
const genHorizontalStyle = (token) => {
  const {
    antCls,
    formItemCls
  } = token;
  return {
    [`${formItemCls}-horizontal`]: {
      [`${formItemCls}-label`]: {
        flexGrow: 0
      },
      [`${formItemCls}-control`]: {
        flex: "1 1 0",
        // https://github.com/ant-design/ant-design/issues/32777
        // https://github.com/ant-design/ant-design/issues/33773
        minWidth: 0
      },
      // Do not change this to `ant-col-24`! `-24` match all the responsive rules
      // https://github.com/ant-design/ant-design/issues/32980
      // https://github.com/ant-design/ant-design/issues/34903
      // https://github.com/ant-design/ant-design/issues/44538
      [`${formItemCls}-label[class$='-24'], ${formItemCls}-label[class*='-24 ']`]: {
        [`& + ${formItemCls}-control`]: {
          minWidth: "unset"
        }
      },
      [`${antCls}-col-24${formItemCls}-label,
        ${antCls}-col-xl-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
    }
  };
};
const genInlineStyle = (token) => {
  const {
    componentCls,
    formItemCls,
    inlineItemMarginBottom
  } = token;
  return {
    [`${componentCls}-inline`]: {
      display: "flex",
      flexWrap: "wrap",
      [`${formItemCls}-inline`]: {
        flex: "none",
        marginInlineEnd: token.margin,
        marginBottom: inlineItemMarginBottom,
        "&-row": {
          flexWrap: "nowrap"
        },
        [`> ${formItemCls}-label,
        > ${formItemCls}-control`]: {
          display: "inline-block",
          verticalAlign: "top"
        },
        [`> ${formItemCls}-label`]: {
          flex: "none"
        },
        [`${componentCls}-text`]: {
          display: "inline-block"
        },
        [`${formItemCls}-has-feedback`]: {
          display: "inline-block"
        }
      }
    }
  };
};
const makeVerticalLayout = (token) => {
  const {
    componentCls,
    formItemCls,
    rootPrefixCls
  } = token;
  return {
    [`${formItemCls} ${formItemCls}-label`]: makeVerticalLayoutLabel(token),
    // ref: https://github.com/ant-design/ant-design/issues/45122
    [`${componentCls}:not(${componentCls}-inline)`]: {
      [formItemCls]: {
        flexWrap: "wrap",
        [`${formItemCls}-label, ${formItemCls}-control`]: {
          // When developer pass `xs: { span }`,
          // It should follow the `xs` screen config
          // ref: https://github.com/ant-design/ant-design/issues/44386
          [`&:not([class*=" ${rootPrefixCls}-col-xs"])`]: {
            flex: "0 0 100%",
            maxWidth: "100%"
          }
        }
      }
    }
  };
};
const genVerticalStyle = (token) => {
  const {
    componentCls,
    formItemCls,
    antCls
  } = token;
  return {
    [`${formItemCls}-vertical`]: {
      [`${formItemCls}-row`]: {
        flexDirection: "column"
      },
      [`${formItemCls}-label > label`]: {
        height: "auto"
      },
      [`${formItemCls}-control`]: {
        width: "100%"
      },
      [`${formItemCls}-label,
        ${antCls}-col-24${formItemCls}-label,
        ${antCls}-col-xl-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
    },
    [`@media (max-width: ${unit(token.screenXSMax)})`]: [makeVerticalLayout(token), {
      [componentCls]: {
        [`${formItemCls}:not(${formItemCls}-horizontal)`]: {
          [`${antCls}-col-xs-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
        }
      }
    }],
    [`@media (max-width: ${unit(token.screenSMMax)})`]: {
      [componentCls]: {
        [`${formItemCls}:not(${formItemCls}-horizontal)`]: {
          [`${antCls}-col-sm-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
        }
      }
    },
    [`@media (max-width: ${unit(token.screenMDMax)})`]: {
      [componentCls]: {
        [`${formItemCls}:not(${formItemCls}-horizontal)`]: {
          [`${antCls}-col-md-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
        }
      }
    },
    [`@media (max-width: ${unit(token.screenLGMax)})`]: {
      [componentCls]: {
        [`${formItemCls}:not(${formItemCls}-horizontal)`]: {
          [`${antCls}-col-lg-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
        }
      }
    }
  };
};
const prepareComponentToken = (token) => ({
  labelRequiredMarkColor: token.colorError,
  labelColor: token.colorTextHeading,
  labelFontSize: token.fontSize,
  labelHeight: token.controlHeight,
  labelColonMarginInlineStart: token.marginXXS / 2,
  labelColonMarginInlineEnd: token.marginXS,
  itemMarginBottom: token.marginLG,
  verticalLabelPadding: `0 0 ${token.paddingXS}px`,
  verticalLabelMargin: 0,
  inlineItemMarginBottom: 0
});
const prepareToken = (token, rootPrefixCls) => {
  const formToken = merge$1(token, {
    formItemCls: `${token.componentCls}-item`,
    rootPrefixCls
  });
  return formToken;
};
const useStyle$3 = genStyleHooks("Form", (token, {
  rootPrefixCls
}) => {
  const formToken = prepareToken(token, rootPrefixCls);
  return [genFormStyle(formToken), genFormItemStyle(formToken), genFormValidateMotionStyle(formToken), genHorizontalStyle(formToken), genInlineStyle(formToken), genVerticalStyle(formToken), genCollapseMotion(formToken), zoomIn];
}, prepareComponentToken, {
  // Let From style before the Grid
  // ref https://github.com/ant-design/ant-design/issues/44386
  order: -1e3
});
const EMPTY_LIST = [];
function toErrorEntity(error, prefix, errorStatus, index = 0) {
  return {
    key: typeof error === "string" ? error : `${prefix}-${index}`,
    error,
    errorStatus
  };
}
const ErrorList = ({
  help,
  helpStatus,
  errors = EMPTY_LIST,
  warnings = EMPTY_LIST,
  className: rootClassName,
  fieldId,
  onVisibleChanged
}) => {
  const {
    prefixCls
  } = reactExports.useContext(FormItemPrefixContext);
  const baseClassName = `${prefixCls}-item-explain`;
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle$3(prefixCls, rootCls);
  const collapseMotion = reactExports.useMemo(() => initCollapseMotion(prefixCls), [prefixCls]);
  const debounceErrors = useDebounce(errors);
  const debounceWarnings = useDebounce(warnings);
  const fullKeyList = reactExports.useMemo(() => {
    if (isNonNullable(help)) {
      return [toErrorEntity(help, "help", helpStatus)];
    }
    return [].concat(_toConsumableArray(debounceErrors.map((error, index) => toErrorEntity(error, "error", "error", index))), _toConsumableArray(debounceWarnings.map((warning, index) => toErrorEntity(warning, "warning", "warning", index))));
  }, [help, helpStatus, debounceErrors, debounceWarnings]);
  const filledKeyFullKeyList = reactExports.useMemo(() => {
    const keysCount = {};
    fullKeyList.forEach(({
      key
    }) => {
      keysCount[key] = (keysCount[key] || 0) + 1;
    });
    return fullKeyList.map((entity, index) => ({
      ...entity,
      key: keysCount[entity.key] > 1 ? `${entity.key}-fallback-${index}` : entity.key
    }));
  }, [fullKeyList]);
  const helpProps = {};
  if (fieldId) {
    helpProps.id = `${fieldId}_help`;
  }
  return /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    motionDeadline: collapseMotion.motionDeadline,
    motionName: `${prefixCls}-show-help`,
    visible: !!filledKeyFullKeyList.length,
    onVisibleChanged
  }, (holderProps) => {
    const {
      className: holderClassName,
      style: holderStyle
    } = holderProps;
    return /* @__PURE__ */ reactExports.createElement("div", {
      ...helpProps,
      className: clsx(baseClassName, holderClassName, cssVarCls, rootCls, rootClassName, hashId),
      style: holderStyle
    }, /* @__PURE__ */ reactExports.createElement(CSSMotionList, {
      keys: filledKeyFullKeyList,
      ...initCollapseMotion(prefixCls),
      motionName: `${prefixCls}-show-help-item`,
      component: false
    }, (itemProps) => {
      const {
        key,
        error,
        errorStatus,
        className: itemClassName,
        style: itemStyle
      } = itemProps;
      return /* @__PURE__ */ reactExports.createElement("div", {
        key,
        className: clsx(itemClassName, {
          [`${baseClassName}-${errorStatus}`]: errorStatus
        }),
        style: itemStyle
      }, error);
    }));
  });
};
const InternalForm = (props, ref) => {
  const contextDisabled = reactExports.useContext(DisabledContext);
  const {
    getPrefixCls,
    direction,
    requiredMark: contextRequiredMark,
    colon: contextColon,
    scrollToFirstError: contextScrollToFirstError,
    className: contextClassName,
    style: contextStyle,
    styles: contextStyles,
    classNames: contextClassNames,
    tooltip: contextTooltip
  } = useComponentConfig("form");
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    size,
    disabled = contextDisabled,
    form,
    colon,
    labelAlign,
    labelWrap,
    labelCol,
    wrapperCol,
    layout = "horizontal",
    scrollToFirstError,
    requiredMark,
    onFinishFailed,
    name,
    style,
    feedbackIcons,
    variant,
    classNames,
    styles,
    tooltip,
    ...restFormProps
  } = props;
  const mergedSize = useSize(size);
  const contextValidateMessages = reactExports.useContext(ValidateMessagesContext);
  const mergedRequiredMark = reactExports.useMemo(() => {
    if (requiredMark !== void 0) {
      return requiredMark;
    }
    if (contextRequiredMark !== void 0) {
      return contextRequiredMark;
    }
    return true;
  }, [requiredMark, contextRequiredMark]);
  const mergedColon = colon ?? contextColon;
  const mergedTooltip = {
    ...contextTooltip,
    ...tooltip
  };
  const prefixCls = getPrefixCls("form", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle$3(prefixCls, rootCls);
  const mergedProps = {
    ...props,
    size: mergedSize,
    disabled,
    layout,
    colon: mergedColon,
    requiredMark: mergedRequiredMark
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps
  });
  const formClassName = clsx(prefixCls, `${prefixCls}-${layout}`, {
    [`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false,
    // todo: remove in next major version
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-${mergedSize}`]: mergedSize
  }, cssVarCls, rootCls, hashId, contextClassName, className, rootClassName, mergedClassNames.root);
  const [wrapForm] = useForm(form);
  const {
    __INTERNAL__
  } = wrapForm;
  __INTERNAL__.name = name;
  const formContextValue = reactExports.useMemo(() => ({
    name,
    labelAlign,
    labelCol,
    labelWrap,
    wrapperCol,
    layout,
    colon: mergedColon,
    requiredMark: mergedRequiredMark,
    itemRef: __INTERNAL__.itemRef,
    form: wrapForm,
    feedbackIcons,
    tooltip: mergedTooltip,
    classNames: mergedClassNames,
    styles: mergedStyles
  }), [name, labelAlign, labelCol, wrapperCol, layout, mergedColon, mergedRequiredMark, wrapForm, feedbackIcons, mergedClassNames, mergedStyles, mergedTooltip]);
  const nativeElementRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => ({
    ...wrapForm,
    nativeElement: nativeElementRef.current?.nativeElement
  }));
  const scrollToField = (options, fieldName) => {
    if (options) {
      let defaultScrollToFirstError = {
        block: "nearest"
      };
      if (typeof options === "object") {
        defaultScrollToFirstError = {
          ...defaultScrollToFirstError,
          ...options
        };
      }
      wrapForm.scrollToField(fieldName, defaultScrollToFirstError);
    }
  };
  const onInternalFinishFailed = (errorInfo) => {
    onFinishFailed?.(errorInfo);
    if (errorInfo.errorFields.length) {
      const fieldName = errorInfo.errorFields[0].name;
      if (scrollToFirstError !== void 0) {
        scrollToField(scrollToFirstError, fieldName);
        return;
      }
      if (contextScrollToFirstError !== void 0) {
        scrollToField(contextScrollToFirstError, fieldName);
      }
    }
  };
  return /* @__PURE__ */ reactExports.createElement(VariantContext.Provider, {
    value: variant
  }, /* @__PURE__ */ reactExports.createElement(DisabledContextProvider, {
    disabled
  }, /* @__PURE__ */ reactExports.createElement(SizeContext.Provider, {
    value: mergedSize
  }, /* @__PURE__ */ reactExports.createElement(FormProvider, {
    // This is not list in API, we pass with spread
    validateMessages: contextValidateMessages
  }, /* @__PURE__ */ reactExports.createElement(FormContext.Provider, {
    value: formContextValue
  }, /* @__PURE__ */ reactExports.createElement(NoFormStyle, {
    status: true
  }, /* @__PURE__ */ reactExports.createElement(RefForm, {
    id: name,
    ...restFormProps,
    name,
    onFinishFailed: onInternalFinishFailed,
    form: wrapForm,
    ref: nativeElementRef,
    style: {
      ...mergedStyles?.root,
      ...contextStyle,
      ...style
    },
    className: formClassName
  })))))));
};
const Form$1 = /* @__PURE__ */ reactExports.forwardRef(InternalForm);
function useChildren(children) {
  if (typeof children === "function") {
    return children;
  }
  const childList = toArray$1(children);
  return childList.length <= 1 ? childList[0] : childList;
}
const useFormItemStatus = () => {
  const {
    status,
    errors = [],
    warnings = []
  } = reactExports.useContext(FormItemInputContext);
  return {
    status,
    errors,
    warnings
  };
};
useFormItemStatus.Context = FormItemInputContext;
function useFrameState(defaultValue) {
  const [value, setValue] = reactExports.useState(defaultValue);
  const frameRef = reactExports.useRef(null);
  const batchRef = reactExports.useRef([]);
  const destroyRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    destroyRef.current = false;
    return () => {
      destroyRef.current = true;
      wrapperRaf.cancel(frameRef.current);
      frameRef.current = null;
    };
  }, []);
  function setFrameValue(updater) {
    if (destroyRef.current) {
      return;
    }
    if (frameRef.current === null) {
      batchRef.current = [];
      frameRef.current = wrapperRaf(() => {
        frameRef.current = null;
        setValue((prevValue) => {
          let current = prevValue;
          batchRef.current.forEach((func) => {
            current = func(current);
          });
          return current;
        });
      });
    }
    batchRef.current.push(updater);
  }
  return [value, setFrameValue];
}
function useItemRef() {
  const {
    itemRef
  } = reactExports.useContext(FormContext);
  const cacheRef = reactExports.useRef({});
  function getRef(name, children) {
    const childrenRef = children && typeof children === "object" && getNodeRef(children);
    const nameStr = name.join("_");
    if (cacheRef.current.name !== nameStr || cacheRef.current.originRef !== childrenRef) {
      cacheRef.current.name = nameStr;
      cacheRef.current.originRef = childrenRef;
      cacheRef.current.ref = composeRef(itemRef(name), childrenRef);
    }
    return cacheRef.current.ref;
  }
  return getRef;
}
const genFallbackStyle = (token) => {
  const {
    formItemCls
  } = token;
  return {
    "@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)": {
      // Fallback for IE, safe to remove we not support it anymore
      [`${formItemCls}-control`]: {
        display: "flex"
      }
    }
  };
};
const FallbackCmp = genSubStyleComponent(["Form", "item-item"], (token, {
  rootPrefixCls
}) => {
  const formToken = prepareToken(token, rootPrefixCls);
  return genFallbackStyle(formToken);
});
const GRID_MAX = 24;
const FormItemInput = (props) => {
  const {
    prefixCls,
    status,
    labelCol,
    wrapperCol,
    children,
    errors,
    warnings,
    _internalItemRender: formItemRender,
    extra,
    help,
    fieldId,
    marginBottom,
    onErrorVisibleChanged,
    label
  } = props;
  const baseClassName = `${prefixCls}-item`;
  const formContext = reactExports.useContext(FormContext);
  const {
    classNames: contextClassNames,
    styles: contextStyles
  } = formContext;
  const mergedWrapperCol = reactExports.useMemo(() => {
    let mergedWrapper = {
      ...wrapperCol || formContext.wrapperCol || {}
    };
    if (label === null && !labelCol && !wrapperCol && formContext.labelCol) {
      const list = [void 0].concat(_toConsumableArray(responsiveArrayReversed));
      list.forEach((size) => {
        const _size = size ? [size] : [];
        const formLabel = get(formContext.labelCol, _size);
        const formLabelObj = typeof formLabel === "object" ? formLabel : {};
        const wrapper = get(mergedWrapper, _size);
        const wrapperObj = typeof wrapper === "object" ? wrapper : {};
        if ("span" in formLabelObj && !("offset" in wrapperObj) && formLabelObj.span < GRID_MAX) {
          mergedWrapper = set(mergedWrapper, [].concat(_size, ["offset"]), formLabelObj.span);
        }
      });
    }
    return mergedWrapper;
  }, [wrapperCol, formContext.wrapperCol, formContext.labelCol, label, labelCol]);
  const className = clsx(`${baseClassName}-control`, mergedWrapperCol.className);
  const subFormContext = reactExports.useMemo(() => {
    const {
      labelCol: _labelCol,
      wrapperCol: _wrapperCol,
      ...rest
    } = formContext;
    return rest;
  }, [formContext]);
  const extraRef = reactExports.useRef(null);
  const [extraHeight, setExtraHeight] = reactExports.useState(0);
  useLayoutEffect(() => {
    if (extra && extraRef.current) {
      setExtraHeight(extraRef.current.clientHeight);
    } else {
      setExtraHeight(0);
    }
  }, [extra]);
  const inputDom = /* @__PURE__ */ reactExports.createElement("div", {
    className: `${baseClassName}-control-input`
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(`${baseClassName}-control-input-content`, contextClassNames?.content),
    style: contextStyles?.content
  }, children));
  const formItemContext = reactExports.useMemo(() => ({
    prefixCls,
    status
  }), [prefixCls, status]);
  const errorListDom = marginBottom !== null || errors.length || warnings.length ? /* @__PURE__ */ reactExports.createElement(FormItemPrefixContext.Provider, {
    value: formItemContext
  }, /* @__PURE__ */ reactExports.createElement(ErrorList, {
    fieldId,
    errors,
    warnings,
    help,
    helpStatus: status,
    className: `${baseClassName}-explain-connected`,
    onVisibleChanged: onErrorVisibleChanged
  })) : null;
  const extraProps = {};
  if (fieldId) {
    extraProps.id = `${fieldId}_extra`;
  }
  const extraDom = extra ? /* @__PURE__ */ reactExports.createElement("div", {
    ...extraProps,
    className: `${baseClassName}-extra`,
    ref: extraRef
  }, extra) : null;
  const additionalDom = errorListDom || extraDom ? /* @__PURE__ */ reactExports.createElement("div", {
    className: `${baseClassName}-additional`,
    style: marginBottom ? {
      minHeight: marginBottom + extraHeight
    } : {}
  }, errorListDom, extraDom) : null;
  const dom = formItemRender && formItemRender.mark === "pro_table_render" && formItemRender.render ? formItemRender.render(props, {
    input: inputDom,
    errorList: errorListDom,
    extra: extraDom
  }) : /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, inputDom, additionalDom);
  return /* @__PURE__ */ reactExports.createElement(FormContext.Provider, {
    value: subFormContext
  }, /* @__PURE__ */ reactExports.createElement(Col, {
    ...mergedWrapperCol,
    className
  }, dom), /* @__PURE__ */ reactExports.createElement(FallbackCmp, {
    prefixCls
  }));
};
const FormItemLabel = ({
  prefixCls,
  label,
  htmlFor,
  labelCol,
  labelAlign,
  colon,
  required,
  requiredMark,
  tooltip,
  vertical
}) => {
  const [formLocale] = useLocale("Form");
  const {
    labelAlign: contextLabelAlign,
    labelCol: contextLabelCol,
    labelWrap,
    colon: contextColon,
    classNames: contextClassNames,
    styles: contextStyles,
    tooltip: contextTooltip
  } = reactExports.useContext(FormContext);
  if (!label) {
    return null;
  }
  const mergedLabelCol = labelCol || contextLabelCol || {};
  const mergedLabelAlign = labelAlign || contextLabelAlign;
  const labelClsBasic = `${prefixCls}-item-label`;
  const labelColClassName = clsx(labelClsBasic, mergedLabelAlign === "left" && `${labelClsBasic}-left`, mergedLabelCol.className, {
    [`${labelClsBasic}-wrap`]: !!labelWrap
  });
  let labelChildren = label;
  const computedColon = colon === true || contextColon !== false && colon !== false;
  const haveColon = computedColon && !vertical;
  if (haveColon && typeof label === "string" && label.trim()) {
    labelChildren = label.replace(/[:|：]\s*$/, "");
  }
  const tooltipProps = convertToTooltipProps(tooltip, contextTooltip);
  if (tooltipProps) {
    const tooltipNode = /* @__PURE__ */ reactExports.createElement(Tooltip, {
      ...tooltipProps
    }, /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-item-tooltip`,
      onClick: (e2) => {
        e2.preventDefault();
      },
      tabIndex: -1
    }, tooltipProps.icon || tooltipProps.children || /* @__PURE__ */ reactExports.createElement(RefIcon$d, null)));
    labelChildren = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, labelChildren, tooltipNode);
  }
  const isOptionalMark = requiredMark === "optional";
  const isRenderMark = typeof requiredMark === "function";
  const hideRequiredMark = requiredMark === false;
  if (isRenderMark) {
    labelChildren = requiredMark(labelChildren, {
      required: !!required
    });
  } else if (isOptionalMark && !required) {
    labelChildren = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, labelChildren, /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-item-optional`,
      title: ""
    }, formLocale?.optional || localeValues.Form?.optional));
  }
  let markType;
  if (hideRequiredMark) {
    markType = "hidden";
  } else if (isOptionalMark || isRenderMark) {
    markType = "optional";
  }
  const labelClassName = clsx(contextClassNames?.label, {
    [`${prefixCls}-item-required`]: required,
    [`${prefixCls}-item-required-mark-${markType}`]: markType,
    [`${prefixCls}-item-no-colon`]: !computedColon
  });
  return /* @__PURE__ */ reactExports.createElement(Col, {
    ...mergedLabelCol,
    className: labelColClassName
  }, /* @__PURE__ */ reactExports.createElement("label", {
    htmlFor,
    className: labelClassName,
    style: contextStyles?.label,
    title: typeof label === "string" ? label : ""
  }, labelChildren));
};
const iconMap = {
  success: RefIcon$4,
  warning: RefIcon$2,
  error: RefIcon$3,
  validating: RefIcon$1
};
function StatusProvider({
  children,
  errors,
  warnings,
  hasFeedback,
  validateStatus,
  prefixCls,
  meta,
  noStyle,
  name
}) {
  const itemPrefixCls = `${prefixCls}-item`;
  const {
    feedbackIcons
  } = reactExports.useContext(FormContext);
  const mergedValidateStatus = getStatus(errors, warnings, meta, null, !!hasFeedback, validateStatus);
  const {
    isFormItemInput: parentIsFormItemInput,
    status: parentStatus,
    hasFeedback: parentHasFeedback,
    feedbackIcon: parentFeedbackIcon,
    name: parentName
  } = reactExports.useContext(FormItemInputContext);
  const formItemStatusContext = reactExports.useMemo(() => {
    let feedbackIcon;
    if (hasFeedback) {
      const customIcons = hasFeedback !== true && hasFeedback.icons || feedbackIcons;
      const customIconNode = mergedValidateStatus && customIcons?.({
        status: mergedValidateStatus,
        errors,
        warnings
      })?.[mergedValidateStatus];
      const IconNode = mergedValidateStatus ? iconMap[mergedValidateStatus] : null;
      feedbackIcon = customIconNode !== false && IconNode ? /* @__PURE__ */ reactExports.createElement("span", {
        className: clsx(`${itemPrefixCls}-feedback-icon`, `${itemPrefixCls}-feedback-icon-${mergedValidateStatus}`)
      }, customIconNode || /* @__PURE__ */ reactExports.createElement(IconNode, null)) : null;
    }
    const context = {
      status: mergedValidateStatus || "",
      errors,
      warnings,
      hasFeedback: !!hasFeedback,
      feedbackIcon,
      isFormItemInput: true,
      name
    };
    if (noStyle) {
      context.status = (mergedValidateStatus ?? parentStatus) || "";
      context.isFormItemInput = parentIsFormItemInput;
      context.hasFeedback = !!(hasFeedback ?? parentHasFeedback);
      context.feedbackIcon = hasFeedback !== void 0 ? context.feedbackIcon : parentFeedbackIcon;
      context.name = name ?? parentName;
    }
    return context;
  }, [mergedValidateStatus, hasFeedback, noStyle, parentIsFormItemInput, parentStatus]);
  return /* @__PURE__ */ reactExports.createElement(FormItemInputContext.Provider, {
    value: formItemStatusContext
  }, children);
}
function ItemHolder(props) {
  const {
    prefixCls,
    className,
    rootClassName,
    style,
    help,
    errors,
    warnings,
    validateStatus,
    meta,
    hasFeedback,
    hidden,
    children,
    fieldId,
    required,
    isRequired,
    onSubItemMetaChange,
    layout: propsLayout,
    name,
    ...restProps
  } = props;
  const itemPrefixCls = `${prefixCls}-item`;
  const {
    requiredMark,
    layout: formLayout
  } = reactExports.useContext(FormContext);
  const layout = propsLayout || formLayout;
  const vertical = layout === "vertical";
  const itemRef = reactExports.useRef(null);
  const debounceErrors = useDebounce(errors);
  const debounceWarnings = useDebounce(warnings);
  const hasHelp = isNonNullable(help);
  const hasError = !!(hasHelp || errors.length || warnings.length);
  const isOnScreen = !!itemRef.current && isVisible(itemRef.current);
  const [marginBottom, setMarginBottom] = reactExports.useState(null);
  useLayoutEffect(() => {
    if (hasError && itemRef.current) {
      const itemStyle = getComputedStyle(itemRef.current);
      setMarginBottom(Number.parseInt(itemStyle.marginBottom, 10));
    }
  }, [hasError, isOnScreen]);
  const onErrorVisibleChanged = (nextVisible) => {
    if (!nextVisible) {
      setMarginBottom(null);
    }
  };
  const getValidateState = (isDebounce = false) => {
    const _errors = isDebounce ? debounceErrors : meta.errors;
    const _warnings = isDebounce ? debounceWarnings : meta.warnings;
    return getStatus(_errors, _warnings, meta, "", !!hasFeedback, validateStatus);
  };
  const mergedValidateStatus = getValidateState();
  const itemClassName = clsx(itemPrefixCls, className, rootClassName, {
    [`${itemPrefixCls}-with-help`]: hasHelp || debounceErrors.length || debounceWarnings.length,
    // Status
    [`${itemPrefixCls}-has-feedback`]: mergedValidateStatus && hasFeedback,
    [`${itemPrefixCls}-has-success`]: mergedValidateStatus === "success",
    [`${itemPrefixCls}-has-warning`]: mergedValidateStatus === "warning",
    [`${itemPrefixCls}-has-error`]: mergedValidateStatus === "error",
    [`${itemPrefixCls}-is-validating`]: mergedValidateStatus === "validating",
    [`${itemPrefixCls}-hidden`]: hidden,
    // Layout
    [`${itemPrefixCls}-${layout}`]: layout
  });
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: itemClassName,
    style,
    ref: itemRef
  }, /* @__PURE__ */ reactExports.createElement(Row, {
    className: `${itemPrefixCls}-row`,
    ...omit(restProps, [
      "_internalItemRender",
      "colon",
      "dependencies",
      "extra",
      "fieldKey",
      "getValueFromEvent",
      "getValueProps",
      "htmlFor",
      "id",
      // It is deprecated because `htmlFor` is its replacement.
      "initialValue",
      "isListField",
      "label",
      "labelAlign",
      "labelCol",
      "labelWrap",
      "messageVariables",
      "name",
      "normalize",
      "noStyle",
      "preserve",
      "requiredMark",
      "rules",
      "shouldUpdate",
      "trigger",
      "tooltip",
      "validateFirst",
      "validateTrigger",
      "valuePropName",
      "wrapperCol",
      "validateDebounce"
    ])
  }, /* @__PURE__ */ reactExports.createElement(FormItemLabel, {
    htmlFor: fieldId,
    ...props,
    requiredMark,
    required: required ?? isRequired,
    prefixCls,
    vertical
  }), /* @__PURE__ */ reactExports.createElement(FormItemInput, {
    ...props,
    ...meta,
    errors: debounceErrors,
    warnings: debounceWarnings,
    prefixCls,
    status: mergedValidateStatus,
    help,
    marginBottom,
    onErrorVisibleChanged
  }, /* @__PURE__ */ reactExports.createElement(NoStyleItemContext.Provider, {
    value: onSubItemMetaChange
  }, /* @__PURE__ */ reactExports.createElement(StatusProvider, {
    prefixCls,
    meta,
    errors: meta.errors,
    warnings: meta.warnings,
    hasFeedback,
    // Already calculated
    validateStatus: mergedValidateStatus,
    name
  }, children)))), !!marginBottom && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${itemPrefixCls}-margin-offset`,
    style: {
      marginBottom: -marginBottom
    }
  }));
}
const NAME_SPLIT = "__SPLIT__";
function isSimilarControl(a, b) {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  return keysA.length === keysB.length && keysA.every((key) => {
    const propValueA = a[key];
    const propValueB = b[key];
    return propValueA === propValueB || typeof propValueA === "function" || typeof propValueB === "function";
  });
}
const MemoInput = /* @__PURE__ */ reactExports.memo((props) => props.children, (prev, next) => isSimilarControl(prev.control, next.control) && prev.update === next.update && prev.childProps.length === next.childProps.length && prev.childProps.every((value, index) => value === next.childProps[index]));
function genEmptyMeta() {
  return {
    errors: [],
    warnings: [],
    touched: false,
    validating: false,
    name: [],
    validated: false
  };
}
function InternalFormItem(props) {
  const {
    name,
    noStyle,
    className,
    dependencies,
    prefixCls: customizePrefixCls,
    shouldUpdate,
    rules,
    children,
    required,
    label,
    messageVariables,
    trigger = "onChange",
    validateTrigger,
    hidden,
    help,
    layout
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const {
    name: formName
  } = reactExports.useContext(FormContext);
  const mergedChildren = useChildren(children);
  const isRenderProps = typeof mergedChildren === "function";
  const notifyParentMetaChange = reactExports.useContext(NoStyleItemContext);
  const {
    validateTrigger: contextValidateTrigger
  } = reactExports.useContext(Context);
  const mergedValidateTrigger = isNonNullable(validateTrigger) ? validateTrigger : contextValidateTrigger;
  const hasName = isNonNullable(name);
  const prefixCls = getPrefixCls("form", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle$3(prefixCls, rootCls);
  const listContext = reactExports.useContext(ListContext);
  const fieldKeyPathRef = reactExports.useRef(null);
  const [subFieldErrors, setSubFieldErrors] = useFrameState({});
  const [meta, setMeta] = useSafeState(() => genEmptyMeta());
  const onMetaChange = (nextMeta) => {
    const keyInfo = listContext?.getKey(nextMeta.name);
    setMeta(nextMeta.destroy ? genEmptyMeta() : nextMeta, true);
    if (noStyle && help !== false && notifyParentMetaChange) {
      let namePath = nextMeta.name;
      if (!nextMeta.destroy) {
        if (keyInfo !== void 0) {
          const [fieldKey, restPath] = keyInfo;
          namePath = [fieldKey].concat(_toConsumableArray(restPath));
          fieldKeyPathRef.current = namePath;
        }
      } else {
        namePath = fieldKeyPathRef.current || namePath;
      }
      notifyParentMetaChange(nextMeta, namePath);
    }
  };
  const onSubItemMetaChange = (subMeta, uniqueKeys) => {
    setSubFieldErrors((prevSubFieldErrors) => {
      const clone = {
        ...prevSubFieldErrors
      };
      const mergedNamePath = [].concat(_toConsumableArray(subMeta.name.slice(0, -1)), _toConsumableArray(uniqueKeys));
      const mergedNameKey = mergedNamePath.join(NAME_SPLIT);
      if (subMeta.destroy) {
        delete clone[mergedNameKey];
      } else {
        clone[mergedNameKey] = subMeta;
      }
      return clone;
    });
  };
  const [mergedErrors, mergedWarnings] = reactExports.useMemo(() => {
    const errorList = _toConsumableArray(meta.errors);
    const warningList = _toConsumableArray(meta.warnings);
    Object.values(subFieldErrors).forEach((subFieldError) => {
      errorList.push.apply(errorList, _toConsumableArray(subFieldError.errors || []));
      warningList.push.apply(warningList, _toConsumableArray(subFieldError.warnings || []));
    });
    return [errorList, warningList];
  }, [subFieldErrors, meta.errors, meta.warnings]);
  const getItemRef = useItemRef();
  function renderLayout(baseChildren, fieldId, isRequired) {
    if (noStyle && !hidden) {
      return /* @__PURE__ */ reactExports.createElement(StatusProvider, {
        prefixCls,
        hasFeedback: props.hasFeedback,
        validateStatus: props.validateStatus,
        meta,
        errors: mergedErrors,
        warnings: mergedWarnings,
        noStyle: true,
        name
      }, baseChildren);
    }
    return /* @__PURE__ */ reactExports.createElement(ItemHolder, {
      key: "row",
      ...props,
      className: clsx(className, cssVarCls, rootCls, hashId),
      prefixCls,
      fieldId,
      isRequired,
      errors: mergedErrors,
      warnings: mergedWarnings,
      meta,
      onSubItemMetaChange,
      layout,
      name
    }, baseChildren);
  }
  if (!hasName && !isRenderProps && !dependencies) {
    return renderLayout(mergedChildren);
  }
  let variables = {};
  if (typeof label === "string") {
    variables.label = label;
  } else if (name) {
    variables.label = String(name);
  }
  if (messageVariables) {
    variables = {
      ...variables,
      ...messageVariables
    };
  }
  return /* @__PURE__ */ reactExports.createElement(WrapperField, {
    ...props,
    messageVariables: variables,
    trigger,
    validateTrigger: mergedValidateTrigger,
    onMetaChange
  }, (control, renderMeta, context) => {
    const mergedName = toArray(name).length && renderMeta ? renderMeta.name : [];
    const fieldId = getFieldId(mergedName, formName);
    const isRequired = required !== void 0 ? required : !!rules?.some((rule) => {
      if (rule && typeof rule === "object" && rule.required && !rule.warningOnly) {
        return true;
      }
      if (typeof rule === "function") {
        const ruleEntity = rule(context);
        return ruleEntity?.required && !ruleEntity?.warningOnly;
      }
      return false;
    });
    const mergedControl = {
      ...control
    };
    let childNode = null;
    if (Array.isArray(mergedChildren) && hasName) {
      childNode = mergedChildren;
    } else if (isRenderProps && (!(shouldUpdate || dependencies) || hasName)) ;
    else if (dependencies && !isRenderProps && !hasName) ;
    else if (/* @__PURE__ */ reactExports.isValidElement(mergedChildren)) {
      const childProps = {
        ...mergedChildren.props,
        ...mergedControl
      };
      if (!childProps.id) {
        childProps.id = fieldId;
      }
      if (help || mergedErrors.length > 0 || mergedWarnings.length > 0 || props.extra) {
        const describedbyArr = [];
        if (help || mergedErrors.length > 0) {
          describedbyArr.push(`${fieldId}_help`);
        }
        if (props.extra) {
          describedbyArr.push(`${fieldId}_extra`);
        }
        childProps["aria-describedby"] = describedbyArr.join(" ");
      }
      if (mergedErrors.length > 0) {
        childProps["aria-invalid"] = "true";
      }
      if (isRequired) {
        childProps["aria-required"] = "true";
      }
      if (supportRef(mergedChildren)) {
        childProps.ref = getItemRef(mergedName, mergedChildren);
      }
      const triggers = new Set([].concat(_toConsumableArray(toArray(trigger)), _toConsumableArray(toArray(mergedValidateTrigger))));
      triggers.forEach((eventName) => {
        childProps[eventName] = (...args) => {
          mergedControl[eventName]?.(...args);
          mergedChildren.props[eventName]?.(...args);
        };
      });
      const watchingChildProps = [childProps["aria-required"], childProps["aria-invalid"], childProps["aria-describedby"]];
      childNode = /* @__PURE__ */ reactExports.createElement(MemoInput, {
        control: mergedControl,
        update: mergedChildren,
        childProps: watchingChildProps
      }, cloneElement(mergedChildren, childProps));
    } else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) {
      childNode = mergedChildren(context);
    } else {
      childNode = mergedChildren;
    }
    return renderLayout(childNode, fieldId, isRequired);
  });
}
const FormItem = InternalFormItem;
FormItem.useStatus = useFormItemStatus;
const FormList = ({
  prefixCls: customizePrefixCls,
  children,
  ...props
}) => {
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("form", customizePrefixCls);
  const contextValue = reactExports.useMemo(() => ({
    prefixCls,
    status: "error"
  }), [prefixCls]);
  return /* @__PURE__ */ reactExports.createElement(List, {
    ...props
  }, (fields, operation, meta) => /* @__PURE__ */ reactExports.createElement(FormItemPrefixContext.Provider, {
    value: contextValue
  }, children(fields.map((field) => ({
    ...field,
    fieldKey: field.key
  })), operation, {
    errors: meta.errors,
    warnings: meta.warnings
  })));
};
function useFormInstance() {
  const {
    form
  } = reactExports.useContext(FormContext);
  return form;
}
const Form = Form$1;
Form.Item = FormItem;
Form.List = FormList;
Form.ErrorList = ErrorList;
Form.useForm = useForm;
Form.useFormInstance = useFormInstance;
Form.useWatch = useWatch;
Form.Provider = FormProvider;
const Group = (props) => {
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className
  } = props;
  const prefixCls = getPrefixCls("input-group", customizePrefixCls);
  const inputPrefixCls = getPrefixCls("input");
  const [hashId, cssVarCls] = useStyle$7(inputPrefixCls);
  const cls = clsx(prefixCls, cssVarCls, {
    [`${prefixCls}-lg`]: props.size === "large",
    [`${prefixCls}-sm`]: props.size === "small",
    [`${prefixCls}-compact`]: props.compact,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, hashId, className);
  const formItemContext = reactExports.useContext(FormItemInputContext);
  const groupFormItemContext = reactExports.useMemo(() => ({
    ...formItemContext,
    isFormItemInput: false
  }), [formItemContext]);
  return /* @__PURE__ */ reactExports.createElement(FormItemInputContext.Provider, {
    value: groupFormItemContext
  }, /* @__PURE__ */ reactExports.createElement(Space.Compact, {
    className: cls,
    style: props.style,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    onFocus: props.onFocus,
    onBlur: props.onBlur
  }, props.children));
};
const genOTPStyle = (token) => {
  const {
    componentCls,
    paddingXS
  } = token;
  return {
    [componentCls]: {
      display: "inline-flex",
      alignItems: "center",
      flexWrap: "nowrap",
      columnGap: paddingXS,
      [`${componentCls}-input-wrapper`]: {
        position: "relative",
        [`${componentCls}-mask-icon`]: {
          position: "absolute",
          zIndex: "1",
          top: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
          pointerEvents: "none"
        },
        [`${componentCls}-mask-input`]: {
          color: "transparent",
          caretColor: token.colorText
        },
        [`${componentCls}-mask-input[type=number]::-webkit-inner-spin-button`]: {
          "-webkit-appearance": "none",
          margin: 0
        },
        [`${componentCls}-mask-input[type=number]`]: {
          "-moz-appearance": "textfield"
        }
      },
      "&-rtl": {
        direction: "rtl"
      },
      [`${componentCls}-input`]: {
        textAlign: "center",
        paddingInline: token.paddingXXS
      },
      // ================= Size =================
      [`&${componentCls}-sm ${componentCls}-input`]: {
        paddingInline: token.calc(token.paddingXXS).div(2).equal()
      },
      [`&${componentCls}-lg ${componentCls}-input`]: {
        paddingInline: token.paddingXS
      }
    }
  };
};
const useStyle$2 = genStyleHooks(["Input", "OTP"], (token) => {
  const inputToken = merge$1(token, initInputToken(token));
  return genOTPStyle(inputToken);
}, initComponentToken);
const OTPInput = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    className,
    value,
    onChange,
    onActiveChange,
    index,
    mask,
    onFocus,
    ...restProps
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("otp");
  const maskValue = typeof mask === "string" ? mask : value;
  const inputRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => inputRef.current);
  const onInternalChange = (e2) => {
    onChange(index, e2.target.value);
  };
  const syncSelection = () => {
    wrapperRaf(() => {
      const inputEle = inputRef.current?.input;
      if (document.activeElement === inputEle && inputEle) {
        inputEle.select();
      }
    });
  };
  const onInternalFocus = (e2) => {
    onFocus?.(e2);
    syncSelection();
  };
  const onInternalKeyDown = (event) => {
    const {
      key,
      ctrlKey,
      metaKey
    } = event;
    if (key === "ArrowLeft") {
      onActiveChange(index - 1);
    } else if (key === "ArrowRight") {
      onActiveChange(index + 1);
    } else if (key === "z" && (ctrlKey || metaKey)) {
      event.preventDefault();
    } else if (key === "Backspace" && !value) {
      onActiveChange(index - 1);
    }
    syncSelection();
  };
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-input-wrapper`,
    role: "presentation"
  }, mask && value !== "" && value !== void 0 && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-mask-icon`,
    "aria-hidden": "true"
  }, maskValue), /* @__PURE__ */ reactExports.createElement(Input$1, {
    "aria-label": `OTP Input ${index + 1}`,
    type: mask === true ? "password" : "text",
    ...restProps,
    ref: inputRef,
    value,
    onInput: onInternalChange,
    onFocus: onInternalFocus,
    onKeyDown: onInternalKeyDown,
    onMouseDown: syncSelection,
    onMouseUp: syncSelection,
    className: clsx(className, {
      [`${prefixCls}-mask-input`]: mask
    })
  }));
});
function strToArr(str) {
  return (str || "").split("");
}
const Separator = (props) => {
  const {
    index,
    prefixCls,
    separator,
    className: semanticClassName,
    style: semanticStyle
  } = props;
  const separatorNode = typeof separator === "function" ? separator(index) : separator;
  if (!separatorNode) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: clsx(`${prefixCls}-separator`, semanticClassName),
    style: semanticStyle
  }, separatorNode);
};
const OTP = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    length = 6,
    size: customSize,
    defaultValue,
    value,
    onChange,
    formatter,
    separator,
    variant,
    disabled,
    status: customStatus,
    autoFocus,
    mask,
    type,
    autoComplete,
    onInput,
    onFocus,
    inputMode,
    classNames,
    styles,
    className,
    style,
    ...restProps
  } = props;
  const {
    classNames: contextClassNames,
    styles: contextStyles,
    getPrefixCls,
    direction,
    style: contextStyle,
    className: contextClassName
  } = useComponentConfig("otp");
  const prefixCls = getPrefixCls("otp", customizePrefixCls);
  const mergedProps = {
    ...props,
    length
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps
  });
  const domAttrs = pickAttrs(restProps, {
    aria: true,
    data: true,
    attr: true
  });
  const [hashId, cssVarCls] = useStyle$2(prefixCls);
  const mergedSize = useSize((ctx) => customSize ?? ctx);
  const formContext = reactExports.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(formContext.status, customStatus);
  const proxyFormContext = reactExports.useMemo(() => ({
    ...formContext,
    status: mergedStatus,
    hasFeedback: false,
    feedbackIcon: null
  }), [formContext, mergedStatus]);
  const containerRef = reactExports.useRef(null);
  const refs = reactExports.useRef({});
  reactExports.useImperativeHandle(ref, () => ({
    focus: () => {
      refs.current[0]?.focus();
    },
    blur: () => {
      for (let i = 0; i < length; i += 1) {
        refs.current[i]?.blur();
      }
    },
    nativeElement: containerRef.current
  }));
  const internalFormatter = (txt) => formatter ? formatter(txt) : txt;
  const [valueCells, setValueCells] = reactExports.useState(() => strToArr(internalFormatter(defaultValue || "")));
  reactExports.useEffect(() => {
    if (value !== void 0) {
      setValueCells(strToArr(value));
    }
  }, [value]);
  const triggerValueCellsChange = useEvent((nextValueCells) => {
    setValueCells(nextValueCells);
    if (onInput) {
      onInput(nextValueCells);
    }
    if (onChange && nextValueCells.length === length && nextValueCells.every((c) => c) && nextValueCells.some((c, index) => valueCells[index] !== c)) {
      onChange(nextValueCells.join(""));
    }
  });
  const patchValue = useEvent((index, txt) => {
    let nextCells = _toConsumableArray(valueCells);
    for (let i = 0; i < index; i += 1) {
      if (!nextCells[i]) {
        nextCells[i] = "";
      }
    }
    if (txt.length <= 1) {
      nextCells[index] = txt;
    } else {
      nextCells = nextCells.slice(0, index).concat(strToArr(txt));
    }
    nextCells = nextCells.slice(0, length);
    for (let i = nextCells.length - 1; i >= 0; i -= 1) {
      if (nextCells[i]) {
        break;
      }
      nextCells.pop();
    }
    const formattedValue = internalFormatter(nextCells.map((c) => c || " ").join(""));
    nextCells = strToArr(formattedValue).map((c, i) => {
      if (c === " " && !nextCells[i]) {
        return nextCells[i];
      }
      return c;
    });
    return nextCells;
  });
  const onInputChange = (index, txt) => {
    const nextCells = patchValue(index, txt);
    const nextIndex = Math.min(index + txt.length, length - 1);
    if (nextIndex !== index && nextCells[index] !== void 0) {
      refs.current[nextIndex]?.focus();
    }
    triggerValueCellsChange(nextCells);
  };
  const onInputActiveChange = (nextIndex) => {
    refs.current[nextIndex]?.focus();
  };
  const onInputFocus = (event, index) => {
    for (let i = 0; i < index; i += 1) {
      if (!refs.current[i]?.input?.value) {
        refs.current[i]?.focus();
        break;
      }
    }
    onFocus?.(event);
  };
  const inputSharedProps = {
    variant,
    disabled,
    status: mergedStatus,
    mask,
    type,
    inputMode,
    autoComplete
  };
  return /* @__PURE__ */ reactExports.createElement("div", {
    ...domAttrs,
    ref: containerRef,
    className: clsx(className, prefixCls, {
      [`${prefixCls}-sm`]: mergedSize === "small",
      [`${prefixCls}-lg`]: mergedSize === "large",
      [`${prefixCls}-rtl`]: direction === "rtl"
    }, cssVarCls, hashId, contextClassName, mergedClassNames.root),
    style: {
      ...mergedStyles.root,
      ...contextStyle,
      ...style
    },
    role: "group"
  }, /* @__PURE__ */ reactExports.createElement(FormItemInputContext.Provider, {
    value: proxyFormContext
  }, Array.from({
    length
  }).map((_, index) => {
    const key = `otp-${index}`;
    const singleValue = valueCells[index] || "";
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, {
      key
    }, /* @__PURE__ */ reactExports.createElement(OTPInput, {
      ref: (inputEle) => {
        refs.current[index] = inputEle;
      },
      index,
      size: mergedSize,
      htmlSize: 1,
      className: clsx(mergedClassNames.input, `${prefixCls}-input`),
      style: mergedStyles.input,
      onChange: onInputChange,
      value: singleValue,
      onActiveChange: onInputActiveChange,
      autoFocus: index === 0 && autoFocus,
      onFocus: (event) => onInputFocus(event, index),
      ...inputSharedProps
    }), index < length - 1 && /* @__PURE__ */ reactExports.createElement(Separator, {
      separator,
      index,
      prefixCls,
      className: clsx(mergedClassNames.separator),
      style: mergedStyles.separator
    }));
  })));
});
const defaultIconRender = (visible) => visible ? /* @__PURE__ */ reactExports.createElement(RefIcon$e, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$f, null);
const actionMap = {
  click: "onClick",
  hover: "onMouseOver"
};
const Password = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    disabled: customDisabled,
    action = "click",
    visibilityToggle = true,
    iconRender = defaultIconRender,
    suffix
  } = props;
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;
  const visibilityControlled = typeof visibilityToggle === "object" && visibilityToggle.visible !== void 0;
  const [visible, setVisible] = reactExports.useState(() => visibilityControlled ? visibilityToggle.visible : false);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (visibilityControlled) {
      setVisible(visibilityToggle.visible);
    }
  }, [visibilityControlled, visibilityToggle]);
  const removePasswordTimeout = useRemovePasswordTimeout(inputRef);
  const onVisibleChange = () => {
    if (mergedDisabled) {
      return;
    }
    if (visible) {
      removePasswordTimeout();
    }
    const nextVisible = !visible;
    setVisible(nextVisible);
    if (typeof visibilityToggle === "object") {
      visibilityToggle.onVisibleChange?.(nextVisible);
    }
  };
  const getIcon = (prefixCls2) => {
    const iconTrigger = actionMap[action] || "";
    const icon = iconRender(visible);
    const iconProps = {
      [iconTrigger]: onVisibleChange,
      className: `${prefixCls2}-icon`,
      key: "passwordIcon",
      onMouseDown: (e2) => {
        e2.preventDefault();
      },
      onMouseUp: (e2) => {
        e2.preventDefault();
      }
    };
    return /* @__PURE__ */ reactExports.cloneElement(/* @__PURE__ */ reactExports.isValidElement(icon) ? icon : /* @__PURE__ */ reactExports.createElement("span", null, icon), iconProps);
  };
  const {
    className,
    prefixCls: customizePrefixCls,
    inputPrefixCls: customizeInputPrefixCls,
    size,
    ...restProps
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const inputPrefixCls = getPrefixCls("input", customizeInputPrefixCls);
  const prefixCls = getPrefixCls("input-password", customizePrefixCls);
  const suffixIcon = visibilityToggle && getIcon(prefixCls);
  const inputClassName = clsx(prefixCls, className, {
    [`${prefixCls}-${size}`]: !!size
  });
  const omittedProps = {
    ...omit(restProps, ["suffix", "iconRender", "visibilityToggle"]),
    type: visible ? "text" : "password",
    className: inputClassName,
    prefixCls: inputPrefixCls,
    suffix: /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, suffixIcon, suffix)
  };
  if (size) {
    omittedProps.size = size;
  }
  return /* @__PURE__ */ reactExports.createElement(Input$1, {
    ref: composeRef(ref, inputRef),
    ...omittedProps
  });
});
const genSearchStyle = (token) => {
  const {
    componentCls
  } = token;
  const btnCls = `${componentCls}-btn`;
  return {
    [componentCls]: {
      width: "100%",
      // =========================== Button ===========================
      [btnCls]: {
        "&-filled": {
          background: token.colorFillTertiary,
          "&:not(:disabled)": {
            "&:hover": {
              background: token.colorFillSecondary
            },
            "&:active": {
              background: token.colorFill
            }
          }
        }
      }
    }
  };
};
const useStyle$1 = genStyleHooks(["Input", "Search"], (token) => {
  return [genSearchStyle(token)];
});
const Search = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    inputPrefixCls: customizeInputPrefixCls,
    className,
    size: customizeSize,
    style,
    enterButton = false,
    addonAfter,
    loading,
    disabled,
    onSearch: customOnSearch,
    onChange: customOnChange,
    onCompositionStart,
    onCompositionEnd,
    variant,
    onPressEnter: customOnPressEnter,
    classNames,
    styles,
    hidden,
    ...restProps
  } = props;
  const {
    direction,
    getPrefixCls,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("inputSearch");
  const mergedProps = {
    ...props,
    enterButton
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps
  }, {
    button: {
      _default: "root"
    }
  });
  const composedRef = reactExports.useRef(false);
  const prefixCls = getPrefixCls("input-search", customizePrefixCls);
  const inputPrefixCls = getPrefixCls("input", customizeInputPrefixCls);
  const [hashId, cssVarCls] = useStyle$1(prefixCls);
  const {
    compactSize
  } = useCompactItemContext(prefixCls, direction);
  const size = useSize((ctx) => customizeSize ?? compactSize ?? ctx);
  const inputRef = reactExports.useRef(null);
  const onChange = (e2) => {
    if (e2?.target && e2.type === "click" && customOnSearch) {
      customOnSearch(e2.target.value, e2, {
        source: "clear"
      });
    }
    customOnChange?.(e2);
  };
  const onMouseDown = (e2) => {
    if (document.activeElement === inputRef.current?.input) {
      e2.preventDefault();
    }
  };
  const onSearch = (e2) => {
    if (customOnSearch) {
      customOnSearch(inputRef.current?.input?.value, e2, {
        source: "input"
      });
    }
  };
  const onPressEnter = (e2) => {
    if (composedRef.current || loading) {
      return;
    }
    customOnPressEnter?.(e2);
    onSearch(e2);
  };
  const searchIcon = typeof enterButton === "boolean" ? /* @__PURE__ */ reactExports.createElement(RefIcon$7, null) : null;
  const btnPrefixCls = `${prefixCls}-btn`;
  const btnClassName = clsx(btnPrefixCls, {
    [`${btnPrefixCls}-${variant}`]: variant
  });
  let button;
  const enterButtonAsElement = enterButton || {};
  const isAntdButton = enterButtonAsElement.type && enterButtonAsElement.type.__ANT_BUTTON === true;
  if (isAntdButton || enterButtonAsElement.type === "button") {
    button = cloneElement(enterButtonAsElement, {
      onMouseDown,
      onClick: (e2) => {
        enterButtonAsElement?.props?.onClick?.(e2);
        onSearch(e2);
      },
      key: "enterButton",
      ...isAntdButton ? {
        className: btnClassName,
        size
      } : {}
    });
  } else {
    button = /* @__PURE__ */ reactExports.createElement(Button$1, {
      classNames: mergedClassNames.button,
      styles: mergedStyles.button,
      className: btnClassName,
      color: enterButton ? "primary" : "default",
      size,
      disabled,
      key: "enterButton",
      onMouseDown,
      onClick: onSearch,
      loading,
      icon: searchIcon,
      variant: variant === "borderless" || variant === "filled" || variant === "underlined" ? "text" : enterButton ? "solid" : void 0
    }, enterButton);
  }
  if (addonAfter) {
    button = [button, cloneElement(addonAfter, {
      key: "addonAfter"
    })];
  }
  const mergedClassName = clsx(prefixCls, cssVarCls, {
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-${size}`]: !!size,
    [`${prefixCls}-with-button`]: !!enterButton
  }, className, hashId, mergedClassNames.root);
  const handleOnCompositionStart = (e2) => {
    composedRef.current = true;
    onCompositionStart?.(e2);
  };
  const handleOnCompositionEnd = (e2) => {
    composedRef.current = false;
    onCompositionEnd?.(e2);
  };
  const rootProps = pickAttrs(restProps, {
    data: true
  });
  const inputProps = omit({
    ...restProps,
    classNames: omit(mergedClassNames, ["button", "root"]),
    styles: omit(mergedStyles, ["button", "root"]),
    prefixCls: inputPrefixCls,
    type: "search",
    size,
    variant,
    onPressEnter,
    onCompositionStart: handleOnCompositionStart,
    onCompositionEnd: handleOnCompositionEnd,
    onChange,
    disabled
  }, Object.keys(rootProps));
  return /* @__PURE__ */ reactExports.createElement(Compact$1, {
    className: mergedClassName,
    style: {
      ...style,
      ...mergedStyles.root
    },
    ...rootProps,
    hidden
  }, /* @__PURE__ */ reactExports.createElement(Input$1, {
    ref: composeRef(inputRef, ref),
    ...inputProps
  }), button);
});
const genTextAreaStyle = (token) => {
  const {
    componentCls,
    paddingLG
  } = token;
  const textareaPrefixCls = `${componentCls}-textarea`;
  return {
    // Raw Textarea
    [`textarea${componentCls}`]: {
      maxWidth: "100%",
      // prevent textarea resize from coming out of its container
      height: "auto",
      minHeight: token.controlHeight,
      lineHeight: token.lineHeight,
      verticalAlign: "bottom",
      transition: `all ${token.motionDurationSlow}`,
      resize: "vertical",
      [`&${componentCls}-mouse-active`]: {
        transition: `all ${token.motionDurationSlow}, height 0s, width 0s`
      }
    },
    // Wrapper for resize
    [`${componentCls}-textarea-affix-wrapper-resize-dirty`]: {
      width: "auto"
    },
    [textareaPrefixCls]: {
      position: "relative",
      "&-show-count": {
        [`${componentCls}-data-count`]: {
          position: "absolute",
          bottom: token.calc(token.fontSize).mul(token.lineHeight).mul(-1).equal(),
          insetInlineEnd: 0,
          color: token.colorTextDescription,
          whiteSpace: "nowrap",
          pointerEvents: "none"
        }
      },
      [`
        &-allow-clear > ${componentCls},
        &-affix-wrapper${textareaPrefixCls}-has-feedback ${componentCls}
      `]: {
        paddingInlineEnd: paddingLG
      },
      [`&-affix-wrapper${componentCls}-affix-wrapper`]: {
        padding: 0,
        [`> textarea${componentCls}`]: {
          fontSize: "inherit",
          border: "none",
          outline: "none",
          background: "transparent",
          minHeight: token.calc(token.controlHeight).sub(token.calc(token.lineWidth).mul(2)).equal(),
          "&:focus": {
            boxShadow: "none !important"
          }
        },
        [`${componentCls}-suffix`]: {
          margin: 0,
          "> *:not(:last-child)": {
            marginInline: 0
          },
          // Clear Icon
          [`${componentCls}-clear-icon`]: {
            position: "absolute",
            insetInlineEnd: token.paddingInline,
            insetBlockStart: token.paddingXS
          },
          // Feedback Icon
          [`${textareaPrefixCls}-suffix`]: {
            position: "absolute",
            top: 0,
            insetInlineEnd: token.paddingInline,
            bottom: 0,
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            margin: "auto",
            pointerEvents: "none"
          }
        }
      },
      [`&-affix-wrapper${componentCls}-affix-wrapper-rtl`]: {
        [`${componentCls}-suffix`]: {
          [`${componentCls}-data-count`]: {
            direction: "ltr",
            insetInlineStart: 0
          }
        }
      },
      [`&-affix-wrapper${componentCls}-affix-wrapper-sm`]: {
        [`${componentCls}-suffix`]: {
          [`${componentCls}-clear-icon`]: {
            insetInlineEnd: token.paddingInlineSM
          }
        }
      }
    }
  };
};
const useStyle = genStyleHooks(["Input", "TextArea"], (token) => {
  const inputToken = merge$1(token, initInputToken(token));
  return genTextAreaStyle(inputToken);
}, initComponentToken, {
  resetFont: false
});
const TextArea = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    bordered = true,
    size: customizeSize,
    disabled: customDisabled,
    status: customStatus,
    allowClear,
    classNames,
    rootClassName,
    className,
    style,
    styles,
    variant: customVariant,
    showCount,
    onMouseDown,
    onResize,
    ...rest
  } = props;
  const {
    getPrefixCls,
    direction,
    allowClear: contextAllowClear,
    autoComplete: contextAutoComplete,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("textArea");
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;
  const {
    status: contextStatus,
    hasFeedback,
    feedbackIcon
  } = reactExports.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props
  });
  const innerRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => ({
    resizableTextArea: innerRef.current?.resizableTextArea,
    focus: (option) => {
      triggerFocus(innerRef.current?.resizableTextArea?.textArea, option);
    },
    blur: () => innerRef.current?.blur(),
    nativeElement: innerRef.current?.nativeElement || null
  }));
  const prefixCls = getPrefixCls("input", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useSharedStyle(prefixCls, rootClassName);
  useStyle(prefixCls, rootCls);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);
  const [variant, enableVariantCls] = useVariant("textArea", customVariant, bordered);
  const mergedAllowClear = getAllowClear(allowClear ?? contextAllowClear);
  const [isMouseDown, setIsMouseDown] = reactExports.useState(false);
  const [resizeDirty, setResizeDirty] = reactExports.useState(false);
  const onInternalMouseDown = (e2) => {
    setIsMouseDown(true);
    onMouseDown?.(e2);
    const onMouseUp = () => {
      setIsMouseDown(false);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mouseup", onMouseUp);
  };
  const onInternalResize = (size) => {
    onResize?.(size);
    if (isMouseDown && typeof getComputedStyle === "function") {
      const ele = innerRef.current?.nativeElement?.querySelector("textarea");
      if (ele && getComputedStyle(ele).resize === "both") {
        setResizeDirty(true);
      }
    }
  };
  return /* @__PURE__ */ reactExports.createElement(TextArea$1, {
    autoComplete: contextAutoComplete,
    ...rest,
    style: {
      ...mergedStyles.root,
      ...contextStyle,
      ...style
    },
    styles: mergedStyles,
    disabled: mergedDisabled,
    allowClear: mergedAllowClear,
    className: clsx(
      cssVarCls,
      rootCls,
      className,
      rootClassName,
      compactItemClassnames,
      contextClassName,
      mergedClassNames.root,
      // Only for wrapper
      {
        [`${prefixCls}-textarea-affix-wrapper-resize-dirty`]: resizeDirty
      }
    ),
    classNames: {
      ...mergedClassNames,
      textarea: clsx({
        [`${prefixCls}-sm`]: mergedSize === "small",
        [`${prefixCls}-lg`]: mergedSize === "large"
      }, hashId, mergedClassNames.textarea, isMouseDown && `${prefixCls}-mouse-active`),
      variant: clsx({
        [`${prefixCls}-${variant}`]: enableVariantCls
      }, getStatusClassNames(prefixCls, mergedStatus)),
      affixWrapper: clsx(`${prefixCls}-textarea-affix-wrapper`, {
        [`${prefixCls}-affix-wrapper-rtl`]: direction === "rtl",
        [`${prefixCls}-affix-wrapper-sm`]: mergedSize === "small",
        [`${prefixCls}-affix-wrapper-lg`]: mergedSize === "large",
        [`${prefixCls}-textarea-show-count`]: showCount || props.count?.show
      }, hashId)
    },
    prefixCls,
    suffix: hasFeedback && /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-textarea-suffix`
    }, feedbackIcon),
    showCount,
    ref: innerRef,
    onResize: onInternalResize,
    onMouseDown: onInternalMouseDown
  });
});
const Input = Input$1;
Input.Group = Group;
Input.Search = Search;
Input.TextArea = TextArea;
Input.Password = Password;
Input.OTP = OTP;
function useHasSider(siders, children, hasSider) {
  if (typeof hasSider === "boolean") {
    return hasSider;
  }
  if (siders.length) {
    return true;
  }
  const childNodes = toArray$1(children);
  return childNodes.some((node) => node.type === Sider);
}
const generator = ({
  suffixCls,
  tagName,
  displayName
}) => {
  return (Component) => {
    const Adapter = /* @__PURE__ */ reactExports.forwardRef((props, ref) => /* @__PURE__ */ reactExports.createElement(Component, {
      ref,
      suffixCls,
      tagName,
      ...props
    }));
    return Adapter;
  };
};
const Basic = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    suffixCls,
    className,
    tagName: TagName,
    ...others
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("layout", customizePrefixCls);
  const [hashId] = useStyle$b(prefixCls);
  const prefixWithSuffixCls = suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
  return /* @__PURE__ */ reactExports.createElement(TagName, {
    className: clsx(customizePrefixCls || prefixWithSuffixCls, className, hashId),
    ref,
    ...others
  });
});
const BasicLayout = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    direction
  } = reactExports.useContext(ConfigContext);
  const [siders, setSiders] = reactExports.useState([]);
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    hasSider,
    tagName: Tag,
    style,
    ...others
  } = props;
  const passedProps = omit(others, ["suffixCls"]);
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("layout");
  const prefixCls = getPrefixCls("layout", customizePrefixCls);
  const mergedHasSider = useHasSider(siders, children, hasSider);
  const [hashId, cssVarCls] = useStyle$b(prefixCls);
  const classString = clsx(prefixCls, {
    [`${prefixCls}-has-sider`]: mergedHasSider,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, contextClassName, className, rootClassName, hashId, cssVarCls);
  const contextValue = reactExports.useMemo(() => ({
    siderHook: {
      addSider: (id) => {
        setSiders((prev) => [].concat(_toConsumableArray(prev), [id]));
      },
      removeSider: (id) => {
        setSiders((prev) => prev.filter((currentId) => currentId !== id));
      }
    }
  }), []);
  return /* @__PURE__ */ reactExports.createElement(LayoutContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement(Tag, {
    ref,
    className: classString,
    style: {
      ...contextStyle,
      ...style
    },
    ...passedProps
  }, children));
});
const Layout$1 = generator({
  tagName: "div",
  displayName: "Layout"
})(BasicLayout);
const Header = generator({
  suffixCls: "header",
  tagName: "header",
  displayName: "Header"
})(Basic);
const Footer = generator({
  suffixCls: "footer",
  tagName: "footer",
  displayName: "Footer"
})(Basic);
const Content = generator({
  suffixCls: "content",
  tagName: "main",
  displayName: "Content"
})(Basic);
const Layout = Layout$1;
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;
Layout._InternalSiderContext = SiderContext;
let message = null;
let act = (callback) => callback();
let taskQueue = [];
let defaultGlobalConfig = {};
function getGlobalContext() {
  const {
    getContainer,
    duration,
    rtl,
    maxCount,
    top
  } = defaultGlobalConfig;
  const mergedContainer = getContainer?.() || document.body;
  return {
    getContainer: () => mergedContainer,
    duration,
    rtl,
    maxCount,
    top
  };
}
const GlobalHolder = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    messageConfig,
    sync
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = defaultGlobalConfig.prefixCls || getPrefixCls("message");
  const appConfig = reactExports.useContext(AppConfigContext);
  const [api, holder] = useInternalMessage({
    ...messageConfig,
    prefixCls,
    ...appConfig.message
  });
  React.useImperativeHandle(ref, () => {
    const instance = {
      ...api
    };
    Object.keys(instance).forEach((method) => {
      instance[method] = (...args) => {
        sync();
        return api[method].apply(api, args);
      };
    });
    return {
      instance,
      sync
    };
  });
  return holder;
});
const GlobalHolderWrapper = /* @__PURE__ */ React.forwardRef((_, ref) => {
  const [messageConfig, setMessageConfig] = React.useState(getGlobalContext);
  const sync = () => {
    setMessageConfig(getGlobalContext);
  };
  React.useEffect(sync, []);
  const global = globalConfig();
  const rootPrefixCls = global.getRootPrefixCls();
  const rootIconPrefixCls = global.getIconPrefixCls();
  const theme = global.getTheme();
  const dom = /* @__PURE__ */ React.createElement(GlobalHolder, {
    ref,
    sync,
    messageConfig
  });
  return /* @__PURE__ */ React.createElement(ConfigProvider, {
    prefixCls: rootPrefixCls,
    iconPrefixCls: rootIconPrefixCls,
    theme
  }, global.holderRender ? global.holderRender(dom) : dom);
});
const flushMessageQueue = () => {
  if (!message) {
    const holderFragment = document.createDocumentFragment();
    const newMessage = {
      fragment: holderFragment
    };
    message = newMessage;
    act(() => {
      render(/* @__PURE__ */ React.createElement(GlobalHolderWrapper, {
        ref: (node) => {
          const {
            instance,
            sync
          } = node || {};
          Promise.resolve().then(() => {
            if (!newMessage.instance && instance) {
              newMessage.instance = instance;
              newMessage.sync = sync;
              flushMessageQueue();
            }
          });
        }
      }), holderFragment);
    });
    return;
  }
  if (!message.instance) {
    return;
  }
  taskQueue.forEach((task) => {
    const {
      type,
      skipped
    } = task;
    if (!skipped) {
      switch (type) {
        case "open": {
          act(() => {
            const closeFn = message.instance.open({
              ...defaultGlobalConfig,
              ...task.config
            });
            closeFn?.then(task.resolve);
            task.setCloseFn(closeFn);
          });
          break;
        }
        case "destroy":
          act(() => {
            message?.instance.destroy(task.key);
          });
          break;
        // Other type open
        default: {
          act(() => {
            var _message$instance;
            const closeFn = (_message$instance = message.instance)[type].apply(_message$instance, _toConsumableArray(task.args));
            closeFn?.then(task.resolve);
            task.setCloseFn(closeFn);
          });
        }
      }
    }
  });
  taskQueue = [];
};
function setMessageGlobalConfig(config) {
  defaultGlobalConfig = {
    ...defaultGlobalConfig,
    ...config
  };
  act(() => {
    message?.sync?.();
  });
}
function open(config) {
  const result = wrapPromiseFn((resolve) => {
    let closeFn;
    const task = {
      type: "open",
      config,
      resolve,
      setCloseFn: (fn) => {
        closeFn = fn;
      }
    };
    taskQueue.push(task);
    return () => {
      if (closeFn) {
        act(() => {
          closeFn();
        });
      } else {
        task.skipped = true;
      }
    };
  });
  flushMessageQueue();
  return result;
}
function typeOpen(type, args) {
  const result = wrapPromiseFn((resolve) => {
    let closeFn;
    const task = {
      type,
      args,
      resolve,
      setCloseFn: (fn) => {
        closeFn = fn;
      }
    };
    taskQueue.push(task);
    return () => {
      if (closeFn) {
        act(() => {
          closeFn();
        });
      } else {
        task.skipped = true;
      }
    };
  });
  flushMessageQueue();
  return result;
}
const destroy = (key) => {
  taskQueue.push({
    type: "destroy",
    key
  });
  flushMessageQueue();
};
const methods = ["success", "info", "warning", "error", "loading"];
const baseStaticMethods = {
  open,
  destroy,
  config: setMessageGlobalConfig,
  useMessage,
  _InternalPanelDoNotUseOrYouWillBeFired: PurePanel$4
};
const staticMethods = baseStaticMethods;
methods.forEach((type) => {
  staticMethods[type] = (...args) => typeOpen(type, args);
});
const PurePanel = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    closeIcon,
    closable,
    type,
    title,
    children,
    footer,
    classNames,
    styles,
    ...restProps
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const {
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("modal");
  const rootPrefixCls = getPrefixCls();
  const prefixCls = customizePrefixCls || getPrefixCls("modal");
  const rootCls = useCSSVarCls(rootPrefixCls);
  const [hashId, cssVarCls] = useStyle$g(prefixCls, rootCls);
  const [mergedClassNames, mergedStyles] = useMergeSemantic([contextClassNames, classNames], [contextStyles, styles], {
    props
  });
  const confirmPrefixCls = `${prefixCls}-confirm`;
  let additionalProps = {};
  if (type) {
    additionalProps = {
      closable: closable ?? false,
      title: "",
      footer: "",
      children: /* @__PURE__ */ reactExports.createElement(ConfirmContent, {
        ...props,
        prefixCls,
        confirmPrefixCls,
        rootPrefixCls,
        content: children
      })
    };
  } else {
    additionalProps = {
      closable: closable ?? true,
      title,
      footer: footer !== null && /* @__PURE__ */ reactExports.createElement(Footer$1, {
        ...props
      }),
      children
    };
  }
  return /* @__PURE__ */ reactExports.createElement(Panel, {
    prefixCls,
    className: clsx(hashId, `${prefixCls}-pure-panel`, type && confirmPrefixCls, type && `${confirmPrefixCls}-${type}`, className, contextClassName, cssVarCls, rootCls, mergedClassNames.root),
    style: {
      ...contextStyle,
      ...mergedStyles.root
    },
    ...restProps,
    closeIcon: renderCloseIcon(prefixCls, closeIcon),
    closable,
    classNames: mergedClassNames,
    styles: mergedStyles,
    ...additionalProps
  });
};
const PurePanel$1 = withPureRenderTheme(PurePanel);
function modalWarn(props) {
  return confirm(withWarn(props));
}
const Modal = Modal$1;
Modal.useModal = useModal;
Modal.info = function infoFn(props) {
  return confirm(withInfo(props));
};
Modal.success = function successFn(props) {
  return confirm(withSuccess(props));
};
Modal.error = function errorFn(props) {
  return confirm(withError(props));
};
Modal.warning = modalWarn;
Modal.warn = modalWarn;
Modal.confirm = function confirmFn(props) {
  return confirm(withConfirm(props));
};
Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};
Modal.config = modalGlobalConfig;
Modal._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$1;
export {
  Button$1 as B,
  Calendar as C,
  Form as F,
  Input as I,
  Layout as L,
  Menu as M,
  Select as S,
  Modal as a,
  Badge as b,
  staticMethods as s
};
