import { m as murmur2 } from "./emotion__hash.mjs";
import { y as warning, j as canUseDom, z as updateCSS, A as removeCSS } from "./rc-component__util.mjs";
import { r as reactExports } from "./react.mjs";
import { u as unitlessKeys } from "./emotion__unitless.mjs";
import { s as serialize, c as compile, m as middleware, a as stringify, p as prefixer } from "./stylis.mjs";
const SPLIT = "%";
function pathKey(keys) {
  return keys.join(SPLIT);
}
let updateId = 0;
class Entity {
  instanceId;
  constructor(instanceId) {
    this.instanceId = instanceId;
  }
  /** @private Internal cache map. Do not access this directly */
  cache = /* @__PURE__ */ new Map();
  /** @private Record update times for each key */
  updateTimes = /* @__PURE__ */ new Map();
  extracted = /* @__PURE__ */ new Set();
  get(keys) {
    return this.opGet(pathKey(keys));
  }
  /** A fast get cache with `get` concat. */
  opGet(keyPathStr) {
    return this.cache.get(keyPathStr) || null;
  }
  update(keys, valueFn) {
    return this.opUpdate(pathKey(keys), valueFn);
  }
  /** A fast get cache with `get` concat. */
  opUpdate(keyPathStr, valueFn) {
    const prevValue = this.cache.get(keyPathStr);
    const nextValue = valueFn(prevValue);
    if (nextValue === null) {
      this.cache.delete(keyPathStr);
      this.updateTimes.delete(keyPathStr);
    } else {
      this.cache.set(keyPathStr, nextValue);
      this.updateTimes.set(keyPathStr, updateId);
      updateId += 1;
    }
  }
}
const ATTR_TOKEN = "data-token-hash";
const ATTR_MARK = "data-css-hash";
const CSS_IN_JS_INSTANCE = "__cssinjs_instance__";
function createCache() {
  const cssinjsInstanceId = Math.random().toString(12).slice(2);
  if (typeof document !== "undefined" && document.head && document.body) {
    const styles = document.body.querySelectorAll(`style[${ATTR_MARK}]`) || [];
    const {
      firstChild
    } = document.head;
    Array.from(styles).forEach((style) => {
      style[CSS_IN_JS_INSTANCE] ||= cssinjsInstanceId;
      if (style[CSS_IN_JS_INSTANCE] === cssinjsInstanceId) {
        document.head.insertBefore(style, firstChild);
      }
    });
    const styleHash = {};
    Array.from(document.querySelectorAll(`style[${ATTR_MARK}]`)).forEach((style) => {
      const hash = style.getAttribute(ATTR_MARK);
      if (styleHash[hash]) {
        if (style[CSS_IN_JS_INSTANCE] === cssinjsInstanceId) {
          style.parentNode?.removeChild(style);
        }
      } else {
        styleHash[hash] = true;
      }
    });
  }
  return new Entity(cssinjsInstanceId);
}
const StyleContext = /* @__PURE__ */ reactExports.createContext({
  hashPriority: "low",
  cache: createCache(),
  defaultCache: true,
  autoPrefix: false
});
function sameDerivativeOption(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
}
class ThemeCache {
  static MAX_CACHE_SIZE = 20;
  static MAX_CACHE_OFFSET = 5;
  cache;
  keys;
  cacheCallTimes;
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.keys = [];
    this.cacheCallTimes = 0;
  }
  size() {
    return this.keys.length;
  }
  internalGet(derivativeOption, updateCallTimes = false) {
    let cache = {
      map: this.cache
    };
    derivativeOption.forEach((derivative) => {
      if (!cache) {
        cache = void 0;
      } else {
        cache = cache?.map?.get(derivative);
      }
    });
    if (cache?.value && updateCallTimes) {
      cache.value[1] = this.cacheCallTimes++;
    }
    return cache?.value;
  }
  get(derivativeOption) {
    return this.internalGet(derivativeOption, true)?.[0];
  }
  has(derivativeOption) {
    return !!this.internalGet(derivativeOption);
  }
  set(derivativeOption, value) {
    if (!this.has(derivativeOption)) {
      if (this.size() + 1 > ThemeCache.MAX_CACHE_SIZE + ThemeCache.MAX_CACHE_OFFSET) {
        const [targetKey] = this.keys.reduce((result, key) => {
          const [, callTimes] = result;
          if (this.internalGet(key)[1] < callTimes) {
            return [key, this.internalGet(key)[1]];
          }
          return result;
        }, [this.keys[0], this.cacheCallTimes]);
        this.delete(targetKey);
      }
      this.keys.push(derivativeOption);
    }
    let cache = this.cache;
    derivativeOption.forEach((derivative, index) => {
      if (index === derivativeOption.length - 1) {
        cache.set(derivative, {
          value: [value, this.cacheCallTimes++]
        });
      } else {
        const cacheValue = cache.get(derivative);
        if (!cacheValue) {
          cache.set(derivative, {
            map: /* @__PURE__ */ new Map()
          });
        } else if (!cacheValue.map) {
          cacheValue.map = /* @__PURE__ */ new Map();
        }
        cache = cache.get(derivative).map;
      }
    });
  }
  deleteByPath(currentCache, derivatives) {
    const cache = currentCache.get(derivatives[0]);
    if (derivatives.length === 1) {
      if (!cache.map) {
        currentCache.delete(derivatives[0]);
      } else {
        currentCache.set(derivatives[0], {
          map: cache.map
        });
      }
      return cache.value?.[0];
    }
    const result = this.deleteByPath(cache.map, derivatives.slice(1));
    if ((!cache.map || cache.map.size === 0) && !cache.value) {
      currentCache.delete(derivatives[0]);
    }
    return result;
  }
  delete(derivativeOption) {
    if (this.has(derivativeOption)) {
      this.keys = this.keys.filter((item) => !sameDerivativeOption(item, derivativeOption));
      return this.deleteByPath(this.cache, derivativeOption);
    }
    return void 0;
  }
}
let uuid = 0;
class Theme {
  derivatives;
  id;
  constructor(derivatives) {
    this.derivatives = Array.isArray(derivatives) ? derivatives : [derivatives];
    this.id = uuid;
    if (derivatives.length === 0) {
      warning(derivatives.length > 0);
    }
    uuid += 1;
  }
  getDerivativeToken(token) {
    return this.derivatives.reduce((result, derivative) => derivative(token, result), void 0);
  }
}
const cacheThemes = new ThemeCache();
function createTheme(derivatives) {
  const derivativeArr = Array.isArray(derivatives) ? derivatives : [derivatives];
  if (!cacheThemes.has(derivativeArr)) {
    cacheThemes.set(derivativeArr, new Theme(derivativeArr));
  }
  return cacheThemes.get(derivativeArr);
}
const resultCache = /* @__PURE__ */ new WeakMap();
const RESULT_VALUE = {};
function memoResult(callback, deps) {
  let current = resultCache;
  for (let i = 0; i < deps.length; i += 1) {
    const dep = deps[i];
    if (!current.has(dep)) {
      current.set(dep, /* @__PURE__ */ new WeakMap());
    }
    current = current.get(dep);
  }
  if (!current.has(RESULT_VALUE)) {
    current.set(RESULT_VALUE, callback());
  }
  return current.get(RESULT_VALUE);
}
const flattenTokenCache = /* @__PURE__ */ new WeakMap();
function flattenToken(token) {
  let str = flattenTokenCache.get(token) || "";
  if (!str) {
    Object.keys(token).forEach((key) => {
      const value = token[key];
      str += key;
      if (value instanceof Theme) {
        str += value.id;
      } else if (value && typeof value === "object") {
        str += flattenToken(value);
      } else {
        str += value;
      }
    });
    str = murmur2(str);
    flattenTokenCache.set(token, str);
  }
  return str;
}
function token2key(token, salt) {
  return murmur2(`${salt}_${flattenToken(token)}`);
}
const isClientSide = canUseDom();
function unit(num) {
  if (typeof num === "number") {
    return `${num}px`;
  }
  return num;
}
function where(options) {
  const {
    hashCls,
    hashPriority = "low"
  } = options || {};
  if (!hashCls) {
    return "";
  }
  const hashSelector = `.${hashCls}`;
  return hashPriority === "low" ? `:where(${hashSelector})` : hashSelector;
}
const isNonNullable = (val) => {
  return val !== void 0 && val !== null;
};
const token2CSSVar = (token, prefix = "") => {
  return `--${prefix ? `${prefix}-` : ""}${token}`.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2").replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
};
const serializeCSSVar = (cssVars, hashId, options) => {
  const {
    hashCls,
    hashPriority = "low",
    scope
  } = options || {};
  if (!Object.keys(cssVars).length) {
    return "";
  }
  const baseSelector = `${where({
    hashCls,
    hashPriority
  })}.${hashId}`;
  const scopes = [scope].flat().filter(Boolean);
  const selector = scopes.length ? scopes.map((s) => `${baseSelector}.${s}`).join(", ") : baseSelector;
  return `${selector}{${Object.entries(cssVars).map(([key, value]) => `${key}:${value};`).join("")}}`;
};
const transformToken = (token, themeKey, config) => {
  const {
    hashCls,
    hashPriority = "low",
    prefix,
    unitless,
    ignore,
    preserve
  } = config || {};
  const cssVars = {};
  const result = {};
  Object.entries(token).forEach(([key, value]) => {
    if (preserve?.[key]) {
      result[key] = value;
    } else if ((typeof value === "string" || typeof value === "number") && !ignore?.[key]) {
      const cssVar = token2CSSVar(key, prefix);
      cssVars[cssVar] = typeof value === "number" && !unitless?.[key] ? `${value}px` : String(value);
      result[key] = `var(${cssVar})`;
    }
  });
  return [result, serializeCSSVar(cssVars, themeKey, {
    scope: config?.scope,
    hashCls,
    hashPriority
  })];
};
const effectMap = /* @__PURE__ */ new Map();
function useGlobalCache(prefix, keyPath, cacheFn, onCacheRemove, onCacheEffect) {
  const {
    cache: globalCache
  } = reactExports.useContext(StyleContext);
  const fullPath = [prefix, ...keyPath];
  const fullPathStr = pathKey(fullPath);
  const buildCache = (updater) => {
    globalCache.opUpdate(fullPathStr, (prevCache) => {
      const [times = 0, cache] = prevCache || [void 0, void 0];
      let tmpCache = cache;
      const mergedCache = tmpCache || cacheFn();
      const data = [times, mergedCache];
      return updater ? updater(data) : data;
    });
  };
  reactExports.useMemo(
    () => {
      buildCache();
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [fullPathStr]
    /* eslint-enable */
  );
  let cacheEntity = globalCache.opGet(fullPathStr);
  const cacheContent = cacheEntity[1];
  reactExports.useInsertionEffect(() => {
    buildCache(([times, cache]) => [times + 1, cache]);
    if (!effectMap.has(fullPathStr)) {
      onCacheEffect?.(cacheContent);
      effectMap.set(fullPathStr, true);
      Promise.resolve().then(() => {
        effectMap.delete(fullPathStr);
      });
    }
    return () => {
      globalCache.opUpdate(fullPathStr, (prevCache) => {
        const [times = 0, cache] = prevCache || [];
        const nextCount = times - 1;
        if (nextCount === 0) {
          onCacheRemove?.(cache, false);
          effectMap.delete(fullPathStr);
          return null;
        }
        return [times - 1, cache];
      });
    };
  }, [fullPathStr]);
  return cacheContent;
}
const EMPTY_OVERRIDE = {};
const hashPrefix = "css";
const tokenKeys = /* @__PURE__ */ new Map();
function recordCleanToken(tokenKey) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) + 1);
}
function removeStyleTags(key, instanceId) {
  if (typeof document !== "undefined") {
    const styles = document.querySelectorAll(`style[${ATTR_TOKEN}="${key}"]`);
    styles.forEach((style) => {
      if (style[CSS_IN_JS_INSTANCE] === instanceId) {
        style.parentNode?.removeChild(style);
      }
    });
  }
}
const TOKEN_THRESHOLD = -1;
function cleanTokenStyle(tokenKey, instanceId) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) - 1);
  const cleanableKeyList = /* @__PURE__ */ new Set();
  tokenKeys.forEach((value, key) => {
    if (value <= 0) cleanableKeyList.add(key);
  });
  if (tokenKeys.size - cleanableKeyList.size > TOKEN_THRESHOLD) {
    cleanableKeyList.forEach((key) => {
      removeStyleTags(key, instanceId);
      tokenKeys.delete(key);
    });
  }
}
const getComputedToken = (originToken, overrideToken, theme, format) => {
  const derivativeToken = theme.getDerivativeToken(originToken);
  let mergedDerivativeToken = {
    ...derivativeToken,
    ...overrideToken
  };
  if (format) {
    mergedDerivativeToken = format(mergedDerivativeToken);
  }
  return mergedDerivativeToken;
};
const TOKEN_PREFIX = "token";
function useCacheToken(theme, tokens, option) {
  const {
    cache: {
      instanceId
    },
    container,
    hashPriority
  } = reactExports.useContext(StyleContext);
  const {
    salt = "",
    override = EMPTY_OVERRIDE,
    formatToken,
    getComputedToken: compute,
    cssVar
  } = option;
  const mergedToken = memoResult(() => Object.assign({}, ...tokens), tokens);
  const tokenStr = flattenToken(mergedToken);
  const overrideTokenStr = flattenToken(override);
  const cssVarStr = flattenToken(cssVar);
  const cachedToken = useGlobalCache(TOKEN_PREFIX, [salt, theme.id, tokenStr, overrideTokenStr, cssVarStr], () => {
    const mergedDerivativeToken = compute ? compute(mergedToken, override, theme) : getComputedToken(mergedToken, override, theme, formatToken);
    const actualToken = {
      ...mergedDerivativeToken
    };
    const mergedSalt = `${salt}_${cssVar.prefix}`;
    const hashId = murmur2(mergedSalt);
    const hashCls = `${hashPrefix}-${hashId}`;
    actualToken._tokenKey = token2key(actualToken, mergedSalt);
    const [tokenWithCssVar, cssVarsStr] = transformToken(mergedDerivativeToken, cssVar.key, {
      prefix: cssVar.prefix,
      ignore: cssVar.ignore,
      unitless: cssVar.unitless,
      preserve: cssVar.preserve,
      hashPriority,
      hashCls: cssVar.hashed ? hashCls : void 0
    });
    tokenWithCssVar._hashId = hashId;
    recordCleanToken(cssVar.key);
    return [tokenWithCssVar, hashCls, actualToken, cssVarsStr, cssVar.key];
  }, ([, , , , themeKey]) => {
    cleanTokenStyle(themeKey, instanceId);
  }, ([, , , cssVarsStr, themeKey]) => {
    if (!cssVarsStr) {
      return;
    }
    const style = updateCSS(cssVarsStr, murmur2(`css-var-${themeKey}`), {
      mark: ATTR_MARK,
      prepend: "queue",
      attachTo: container,
      priority: -999
    });
    style[CSS_IN_JS_INSTANCE] = instanceId;
    style.setAttribute(ATTR_TOKEN, themeKey);
  });
  return cachedToken;
}
const ATTR_CACHE_MAP = "data-ant-cssinjs-cache-path";
const CSS_FILE_STYLE = "_FILE_STYLE__";
let cachePathMap;
let fromCSSFile = true;
function prepare() {
  if (!cachePathMap) {
    cachePathMap = {};
    if (canUseDom()) {
      const div = document.createElement("div");
      div.className = ATTR_CACHE_MAP;
      div.style.position = "fixed";
      div.style.visibility = "hidden";
      div.style.top = "-9999px";
      document.body.appendChild(div);
      let content = getComputedStyle(div).content || "";
      content = content.replace(/^"/, "").replace(/"$/, "");
      content.split(";").forEach((item) => {
        const [path, hash] = item.split(":");
        cachePathMap[path] = hash;
      });
      const inlineMapStyle = document.querySelector(`style[${ATTR_CACHE_MAP}]`);
      if (inlineMapStyle) {
        fromCSSFile = false;
        inlineMapStyle.parentNode?.removeChild(inlineMapStyle);
      }
      document.body.removeChild(div);
    }
  }
}
function existPath(path) {
  prepare();
  return !!cachePathMap[path];
}
function getStyleAndHash(path) {
  const hash = cachePathMap[path];
  let styleStr = null;
  if (hash && canUseDom()) {
    if (fromCSSFile) {
      styleStr = CSS_FILE_STYLE;
    } else {
      const style = document.querySelector(`style[${ATTR_MARK}="${cachePathMap[path]}"]`);
      if (style) {
        styleStr = style.innerHTML;
      } else {
        delete cachePathMap[path];
      }
    }
  }
  return [styleStr, hash];
}
const SKIP_CHECK = "_skip_check_";
const MULTI_VALUE = "_multi_value_";
function normalizeStyle(styleStr, autoPrefix) {
  const serialized = autoPrefix ? serialize(compile(styleStr), middleware([prefixer, stringify])) : serialize(compile(styleStr), stringify);
  return serialized.replace(/\{%%%\:[^;];}/g, ";");
}
function isCompoundCSSProperty(value) {
  return typeof value === "object" && value && (SKIP_CHECK in value || MULTI_VALUE in value);
}
function injectSelectorHash(key, hashId, hashPriority = "high") {
  if (!hashId) {
    return key;
  }
  const hashSelector = where({
    hashCls: hashId,
    hashPriority
  });
  const keys = key.split(",").map((k) => {
    const fullPath = k.trim().split(/\s+/);
    let firstPath = fullPath[0] || "";
    const htmlElement = firstPath.match(/^\w+/)?.[0] || "";
    firstPath = `${htmlElement}${hashSelector}${firstPath.slice(htmlElement.length)}`;
    return [firstPath, ...fullPath.slice(1)].join(" ");
  });
  return keys.join(",");
}
const parseStyle = (interpolation, config = {}, {
  root,
  injectHash,
  parentSelectors
} = {
  root: true,
  parentSelectors: []
}) => {
  const {
    hashId,
    layer,
    path,
    hashPriority,
    transformers = [],
    linters = []
  } = config;
  let styleStr = "";
  let effectStyle = {};
  function parseKeyframes(keyframes) {
    const animationName = keyframes.getName(hashId);
    if (!effectStyle[animationName]) {
      const [parsedStr] = parseStyle(keyframes.style, config, {
        root: false,
        parentSelectors
      });
      effectStyle[animationName] = `@keyframes ${keyframes.getName(hashId)}${parsedStr}`;
    }
  }
  function flattenList(list, fullList = []) {
    list.forEach((item) => {
      if (Array.isArray(item)) {
        flattenList(item, fullList);
      } else if (item) {
        fullList.push(item);
      }
    });
    return fullList;
  }
  const flattenStyleList = flattenList(Array.isArray(interpolation) ? interpolation : [interpolation]);
  flattenStyleList.forEach((originStyle) => {
    const style = typeof originStyle === "string" && !root ? {} : originStyle;
    if (typeof style === "string") {
      styleStr += `${style}
`;
    } else if (style._keyframe) {
      parseKeyframes(style);
    } else {
      const mergedStyle = transformers.reduce((prev, trans) => trans?.visit?.(prev) || prev, style);
      Object.keys(mergedStyle).forEach((key) => {
        const value = mergedStyle[key];
        if (typeof value === "object" && value && (key !== "animationName" || !value._keyframe) && !isCompoundCSSProperty(value)) {
          let subInjectHash = false;
          let mergedKey = key.trim();
          let nextRoot = false;
          if ((root || injectHash) && hashId) {
            if (mergedKey.startsWith("@")) {
              subInjectHash = true;
            } else if (mergedKey === "&") {
              mergedKey = injectSelectorHash("", hashId, hashPriority);
            } else {
              mergedKey = injectSelectorHash(key, hashId, hashPriority);
            }
          } else if (root && !hashId && (mergedKey === "&" || mergedKey === "")) {
            mergedKey = "";
            nextRoot = true;
          }
          const [parsedStr, childEffectStyle] = parseStyle(value, config, {
            root: nextRoot,
            injectHash: subInjectHash,
            parentSelectors: [...parentSelectors, mergedKey]
          });
          effectStyle = {
            ...effectStyle,
            ...childEffectStyle
          };
          styleStr += `${mergedKey}${parsedStr}`;
        } else {
          let appendStyle = function(cssKey, cssValue) {
            const styleName = cssKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
            let formatValue = cssValue;
            if (!unitlessKeys[cssKey] && typeof formatValue === "number" && formatValue !== 0) {
              formatValue = `${formatValue}px`;
            }
            if (cssKey === "animationName" && cssValue?._keyframe) {
              parseKeyframes(cssValue);
              formatValue = cssValue.getName(hashId);
            }
            styleStr += `${styleName}:${formatValue};`;
          };
          const actualValue = value?.value ?? value;
          if (typeof value === "object" && value?.[MULTI_VALUE] && Array.isArray(actualValue)) {
            actualValue.forEach((item) => {
              appendStyle(key, item);
            });
          } else {
            if (isNonNullable(actualValue)) {
              appendStyle(key, actualValue);
            }
          }
        }
      });
    }
  });
  if (!root) {
    styleStr = `{${styleStr}}`;
  } else if (layer) {
    if (styleStr) {
      styleStr = `@layer ${layer.name} {${styleStr}}`;
    }
    if (layer.dependencies) {
      effectStyle[`@layer ${layer.name}`] = layer.dependencies.map((deps) => `@layer ${deps}, ${layer.name};`).join("\n");
    }
  }
  return [styleStr, effectStyle];
};
function uniqueHash(path, styleStr) {
  return murmur2(`${path.join("%")}${styleStr}`);
}
const STYLE_PREFIX = "style";
function useStyleRegister(info, styleFn) {
  const {
    path,
    hashId,
    layer,
    nonce,
    clientOnly,
    order = 0
  } = info;
  const {
    mock,
    hashPriority,
    container,
    transformers,
    linters,
    cache,
    layer: enableLayer,
    autoPrefix
  } = reactExports.useContext(StyleContext);
  const fullPath = [hashId || ""];
  if (enableLayer) {
    fullPath.push("layer");
  }
  fullPath.push(...path);
  let isMergedClientSide = isClientSide;
  useGlobalCache(
    STYLE_PREFIX,
    fullPath,
    // Create cache if needed
    () => {
      const cachePath = fullPath.join("|");
      if (existPath(cachePath)) {
        const [inlineCacheStyleStr, styleHash] = getStyleAndHash(cachePath);
        if (inlineCacheStyleStr) {
          return [inlineCacheStyleStr, styleHash, {}, clientOnly, order];
        }
      }
      const styleObj = styleFn();
      const [parsedStyle, effectStyle] = parseStyle(styleObj, {
        hashId,
        hashPriority,
        layer: enableLayer ? layer : void 0,
        path: path.join("-"),
        transformers,
        linters
      });
      const styleStr = normalizeStyle(parsedStyle, autoPrefix || false);
      const styleId = uniqueHash(fullPath, styleStr);
      return [styleStr, styleId, effectStyle, clientOnly, order];
    },
    // Remove cache if no need
    (cacheValue, fromHMR) => {
      const [, styleId] = cacheValue;
      if (fromHMR && isClientSide) {
        removeCSS(styleId, {
          mark: ATTR_MARK,
          attachTo: container
        });
      }
    },
    // Effect: Inject style here
    (cacheValue) => {
      const [styleStr, styleId, effectStyle, , priority] = cacheValue;
      if (isMergedClientSide && styleStr !== CSS_FILE_STYLE) {
        const mergedCSSConfig = {
          mark: ATTR_MARK,
          prepend: enableLayer ? false : "queue",
          attachTo: container,
          priority
        };
        const nonceStr = typeof nonce === "function" ? nonce() : nonce;
        if (nonceStr) {
          mergedCSSConfig.csp = {
            nonce: nonceStr
          };
        }
        const effectLayerKeys = [];
        const effectRestKeys = [];
        Object.keys(effectStyle).forEach((key) => {
          if (key.startsWith("@layer")) {
            effectLayerKeys.push(key);
          } else {
            effectRestKeys.push(key);
          }
        });
        effectLayerKeys.forEach((effectKey) => {
          updateCSS(normalizeStyle(effectStyle[effectKey], autoPrefix || false), `_layer-${effectKey}`, {
            ...mergedCSSConfig,
            prepend: true
          });
        });
        const style = updateCSS(styleStr, styleId, mergedCSSConfig);
        style[CSS_IN_JS_INSTANCE] = cache.instanceId;
        effectRestKeys.forEach((effectKey) => {
          updateCSS(normalizeStyle(effectStyle[effectKey], autoPrefix || false), `_effect-${effectKey}`, mergedCSSConfig);
        });
      }
    }
  );
}
const CSS_VAR_PREFIX = "cssVar";
const useCSSVarRegister = (config, fn) => {
  const {
    key,
    prefix,
    unitless,
    ignore,
    token,
    hashId,
    scope
  } = config;
  const {
    cache: {
      instanceId
    },
    container,
    hashPriority
  } = reactExports.useContext(StyleContext);
  const {
    _tokenKey: tokenKey
  } = token;
  const scopeKey = Array.isArray(scope) ? scope.join("@@") : scope;
  const stylePath = [...config.path, key, scopeKey, tokenKey];
  const cache = useGlobalCache(CSS_VAR_PREFIX, stylePath, () => {
    const originToken = fn();
    const [mergedToken, cssVarsStr] = transformToken(originToken, key, {
      prefix,
      unitless,
      ignore,
      scope,
      hashPriority,
      hashCls: hashId
    });
    const styleId = uniqueHash(stylePath, cssVarsStr);
    return [mergedToken, cssVarsStr, styleId, key];
  }, ([, , styleId]) => {
    if (isClientSide) {
      removeCSS(styleId, {
        mark: ATTR_MARK,
        attachTo: container
      });
    }
  }, ([, cssVarsStr, styleId]) => {
    if (!cssVarsStr) {
      return;
    }
    const style = updateCSS(cssVarsStr, styleId, {
      mark: ATTR_MARK,
      prepend: "queue",
      attachTo: container,
      priority: -999
    });
    style[CSS_IN_JS_INSTANCE] = instanceId;
    style.setAttribute(ATTR_TOKEN, key);
  });
  return cache;
};
class Keyframe {
  name;
  style;
  constructor(name, style) {
    this.name = name;
    this.style = style;
  }
  getName(hashId = "") {
    return hashId ? `${hashId}-${this.name}` : this.name;
  }
  _keyframe = true;
}
export {
  Keyframe as K,
  StyleContext as S,
  unit as a,
  useStyleRegister as b,
  createTheme as c,
  useCSSVarRegister as d,
  token2CSSVar as t,
  useCacheToken as u
};
