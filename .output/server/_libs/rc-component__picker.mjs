import { d as dayjs, c as customParseFormat, a as advancedFormat, w as weekday, l as localeData, b as weekOfYear, e as weekYear } from "./dayjs.mjs";
import { c as clsx } from "./clsx.mjs";
import { r as reactExports, a as React } from "./react.mjs";
import { b as useEvent, w as wrapperRaf, d as isVisible, f as useLayoutEffect, k as useControlledState } from "./rc-component__util.mjs";
var commonLocale = {
  yearFormat: "YYYY",
  dayFormat: "D",
  cellMeridiemFormat: "A",
  monthBeforeYear: true
};
function _typeof$d(o) {
  "@babel/helpers - typeof";
  return _typeof$d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$d(o);
}
function ownKeys$6(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$6(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$6(Object(t), true).forEach(function(r2) {
      _defineProperty$d(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$d(obj, key, value) {
  key = _toPropertyKey$d(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$d(t) {
  var i = _toPrimitive$d(t, "string");
  return "symbol" == _typeof$d(i) ? i : String(i);
}
function _toPrimitive$d(t, r) {
  if ("object" != _typeof$d(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$d(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var locale = _objectSpread$6(_objectSpread$6({}, commonLocale), {}, {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "OK",
  clear: "Clear",
  week: "Week",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
});
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(function(o, c) {
  var proto = c.prototype;
  var oldFormat = proto.format;
  proto.format = function f(formatStr) {
    var str = (formatStr || "").replace("Wo", "wo");
    return oldFormat.bind(this)(str);
  };
});
var localeMap = {
  // ar_EG:
  // az_AZ:
  // bg_BG:
  bn_BD: "bn-bd",
  by_BY: "be",
  // ca_ES:
  // cs_CZ:
  // da_DK:
  // de_DE:
  // el_GR:
  en_GB: "en-gb",
  en_US: "en",
  // es_ES:
  // et_EE:
  // fa_IR:
  // fi_FI:
  fr_BE: "fr",
  // todo: dayjs has no fr_BE locale, use fr at present
  fr_CA: "fr-ca",
  // fr_FR:
  // ga_IE:
  // gl_ES:
  // he_IL:
  // hi_IN:
  // hr_HR:
  // hu_HU:
  hy_AM: "hy-am",
  // id_ID:
  // is_IS:
  // it_IT:
  // ja_JP:
  // ka_GE:
  // kk_KZ:
  // km_KH:
  kmr_IQ: "ku",
  // kn_IN:
  // ko_KR:
  // ku_IQ: // previous ku in antd
  // lt_LT:
  // lv_LV:
  // mk_MK:
  // ml_IN:
  // mn_MN:
  // ms_MY:
  // nb_NO:
  // ne_NP:
  nl_BE: "nl-be",
  // nl_NL:
  // pl_PL:
  pt_BR: "pt-br",
  // pt_PT:
  // ro_RO:
  // ru_RU:
  // sk_SK:
  // sl_SI:
  // sr_RS:
  // sv_SE:
  // ta_IN:
  // th_TH:
  // tr_TR:
  // uk_UA:
  // ur_PK:
  // vi_VN:
  zh_CN: "zh-cn",
  zh_HK: "zh-hk",
  zh_TW: "zh-tw"
};
var parseLocale = function parseLocale2(locale2) {
  var mapLocale = localeMap[locale2];
  return mapLocale || locale2.split("_")[0];
};
var generateConfig = {
  // get
  getNow: function getNow() {
    var now = dayjs();
    if (typeof now.tz === "function") {
      return now.tz();
    }
    return now;
  },
  getFixedDate: function getFixedDate(string) {
    return dayjs(string, ["YYYY-M-DD", "YYYY-MM-DD"]);
  },
  getEndDate: function getEndDate(date) {
    return date.endOf("month");
  },
  getWeekDay: function getWeekDay(date) {
    var clone = date.locale("en");
    return clone.weekday() + clone.localeData().firstDayOfWeek();
  },
  getYear: function getYear(date) {
    return date.year();
  },
  getMonth: function getMonth(date) {
    return date.month();
  },
  getDate: function getDate(date) {
    return date.date();
  },
  getHour: function getHour(date) {
    return date.hour();
  },
  getMinute: function getMinute(date) {
    return date.minute();
  },
  getSecond: function getSecond(date) {
    return date.second();
  },
  getMillisecond: function getMillisecond(date) {
    return date.millisecond();
  },
  // set
  addYear: function addYear(date, diff) {
    return date.add(diff, "year");
  },
  addMonth: function addMonth(date, diff) {
    return date.add(diff, "month");
  },
  addDate: function addDate(date, diff) {
    return date.add(diff, "day");
  },
  setYear: function setYear(date, year) {
    return date.year(year);
  },
  setMonth: function setMonth(date, month) {
    return date.month(month);
  },
  setDate: function setDate(date, num) {
    return date.date(num);
  },
  setHour: function setHour(date, hour) {
    return date.hour(hour);
  },
  setMinute: function setMinute(date, minute) {
    return date.minute(minute);
  },
  setSecond: function setSecond(date, second) {
    return date.second(second);
  },
  setMillisecond: function setMillisecond(date, milliseconds) {
    return date.millisecond(milliseconds);
  },
  // Compare
  isAfter: function isAfter(date1, date2) {
    return date1.isAfter(date2);
  },
  isValidate: function isValidate(date) {
    return date.isValid();
  },
  locale: {
    getWeekFirstDay: function getWeekFirstDay(locale2) {
      return dayjs().locale(parseLocale(locale2)).localeData().firstDayOfWeek();
    },
    getWeekFirstDate: function getWeekFirstDate(locale2, date) {
      return date.locale(parseLocale(locale2)).weekday(0);
    },
    getWeek: function getWeek(locale2, date) {
      return date.locale(parseLocale(locale2)).week();
    },
    getShortWeekDays: function getShortWeekDays(locale2) {
      return dayjs().locale(parseLocale(locale2)).localeData().weekdaysMin();
    },
    getShortMonths: function getShortMonths(locale2) {
      return dayjs().locale(parseLocale(locale2)).localeData().monthsShort();
    },
    format: function format(locale2, date, _format) {
      return date.locale(parseLocale(locale2)).format(_format);
    },
    parse: function parse(locale2, text, formats) {
      var localeStr = parseLocale(locale2);
      for (var i = 0; i < formats.length; i += 1) {
        var format2 = formats[i];
        var formatText = text;
        if (format2.includes("wo") || format2.includes("Wo")) {
          var year = formatText.split("-")[0];
          var weekStr = formatText.split("-")[1];
          var firstWeek = dayjs(year, "YYYY").startOf("year").locale(localeStr);
          for (var j = 0; j <= 52; j += 1) {
            var nextWeek = firstWeek.add(j, "week");
            if (nextWeek.format("Wo") === weekStr) {
              return nextWeek;
            }
          }
          return null;
        }
        var date = dayjs(formatText, format2, true).locale(localeStr);
        if (date.isValid()) {
          return date;
        }
      }
      return null;
    }
  }
};
var PickerContext = /* @__PURE__ */ reactExports.createContext(null);
function leftPad(str, length) {
  var fill = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  var current = String(str);
  while (current.length < length) {
    current = "".concat(fill).concat(current);
  }
  return current;
}
function toArray(val) {
  if (val === null || val === void 0) {
    return [];
  }
  return Array.isArray(val) ? val : [val];
}
function pickProps(props, keys) {
  var clone = {};
  var mergedKeys = keys || Object.keys(props);
  mergedKeys.forEach(function(key) {
    if (props[key] !== void 0) {
      clone[key] = props[key];
    }
  });
  return clone;
}
function getRowFormat(picker, locale2, format2) {
  switch (picker) {
    // All from the `locale.fieldXXXFormat` first
    case "time":
      return locale2.fieldTimeFormat;
    case "datetime":
      return locale2.fieldDateTimeFormat;
    case "month":
      return locale2.fieldMonthFormat;
    case "year":
      return locale2.fieldYearFormat;
    case "quarter":
      return locale2.fieldQuarterFormat;
    case "week":
      return locale2.fieldWeekFormat;
    default:
      return locale2.fieldDateFormat;
  }
}
function _typeof$c(o) {
  "@babel/helpers - typeof";
  return _typeof$c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$c(o);
}
function ownKeys$5(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$5(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$5(Object(t), true).forEach(function(r2) {
      _defineProperty$c(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$c(obj, key, value) {
  key = _toPropertyKey$c(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$c(t) {
  var i = _toPrimitive$c(t, "string");
  return "symbol" == _typeof$c(i) ? i : String(i);
}
function _toPrimitive$c(t, r) {
  if ("object" != _typeof$c(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$c(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function useCellRender(cellRender, dateRender, monthCellRender, range) {
  var mergedCellRender = reactExports.useMemo(function() {
    if (cellRender) {
      return cellRender;
    }
    return function(current, info) {
      var date = current;
      if (dateRender && info.type === "date") {
        return dateRender(date, info.today);
      }
      if (monthCellRender && info.type === "month") {
        return monthCellRender(date, info.locale);
      }
      return info.originNode;
    };
  }, [cellRender, monthCellRender, dateRender]);
  var onInternalCellRender = reactExports.useCallback(function(date, info) {
    return mergedCellRender(date, _objectSpread$5(_objectSpread$5({}, info), {}, {
      range
    }));
  }, [mergedCellRender, range]);
  return onInternalCellRender;
}
function _typeof$b(o) {
  "@babel/helpers - typeof";
  return _typeof$b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$b(o);
}
function ownKeys$4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t), true).forEach(function(r2) {
      _defineProperty$b(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$b(obj, key, value) {
  key = _toPropertyKey$b(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$b(t) {
  var i = _toPrimitive$b(t, "string");
  return "symbol" == _typeof$b(i) ? i : String(i);
}
function _toPrimitive$b(t, r) {
  if ("object" != _typeof$b(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$b(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, showMeridiem) {
  var timeFormat = "";
  var cells = [];
  if (showHour) {
    cells.push(showMeridiem ? "hh" : "HH");
  }
  if (showMinute) {
    cells.push("mm");
  }
  if (showSecond) {
    cells.push("ss");
  }
  timeFormat = cells.join(":");
  if (showMillisecond) {
    timeFormat += ".SSS";
  }
  if (showMeridiem) {
    timeFormat += " A";
  }
  return timeFormat;
}
function fillLocale(locale2, showHour, showMinute, showSecond, showMillisecond, use12Hours) {
  var fieldDateTimeFormat = locale2.fieldDateTimeFormat, fieldDateFormat = locale2.fieldDateFormat, fieldTimeFormat = locale2.fieldTimeFormat, fieldMonthFormat = locale2.fieldMonthFormat, fieldYearFormat = locale2.fieldYearFormat, fieldWeekFormat = locale2.fieldWeekFormat, fieldQuarterFormat = locale2.fieldQuarterFormat, yearFormat = locale2.yearFormat, cellYearFormat = locale2.cellYearFormat, cellQuarterFormat = locale2.cellQuarterFormat, dayFormat = locale2.dayFormat, cellDateFormat = locale2.cellDateFormat;
  var timeFormat = fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, use12Hours);
  return _objectSpread$4(_objectSpread$4({}, locale2), {}, {
    fieldDateTimeFormat: fieldDateTimeFormat || "YYYY-MM-DD ".concat(timeFormat),
    fieldDateFormat: fieldDateFormat || "YYYY-MM-DD",
    fieldTimeFormat: fieldTimeFormat || timeFormat,
    fieldMonthFormat: fieldMonthFormat || "YYYY-MM",
    fieldYearFormat: fieldYearFormat || "YYYY",
    fieldWeekFormat: fieldWeekFormat || "gggg-wo",
    fieldQuarterFormat: fieldQuarterFormat || "YYYY-[Q]Q",
    yearFormat: yearFormat || "YYYY",
    cellYearFormat: cellYearFormat || "YYYY",
    cellQuarterFormat: cellQuarterFormat || "[Q]Q",
    cellDateFormat: cellDateFormat || dayFormat || "D"
  });
}
function useLocale(locale2, showProps) {
  var showHour = showProps.showHour, showMinute = showProps.showMinute, showSecond = showProps.showSecond, showMillisecond = showProps.showMillisecond, use12Hours = showProps.use12Hours;
  return React.useMemo(function() {
    return fillLocale(locale2, showHour, showMinute, showSecond, showMillisecond, use12Hours);
  }, [locale2, showHour, showMinute, showSecond, showMillisecond, use12Hours]);
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty$a(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$a(obj, key, value) {
  key = _toPropertyKey$a(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$a(t) {
  var i = _toPrimitive$a(t, "string");
  return "symbol" == _typeof$a(i) ? i : String(i);
}
function _toPrimitive$a(t, r) {
  if ("object" != _typeof$a(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$a(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$d(arr, i) {
  return _arrayWithHoles$d(arr) || _iterableToArrayLimit$d(arr, i) || _unsupportedIterableToArray$f(arr, i) || _nonIterableRest$d();
}
function _nonIterableRest$d() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$f(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$f(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$f(o, minLen);
}
function _arrayLikeToArray$f(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$d(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$d(arr) {
  if (Array.isArray(arr)) return arr;
}
function _typeof$a(o) {
  "@babel/helpers - typeof";
  return _typeof$a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$a(o);
}
function checkShow(format2, keywords, show) {
  return show !== null && show !== void 0 ? show : keywords.some(function(keyword) {
    return format2.includes(keyword);
  });
}
var showTimeKeys = [
  // 'format',
  "showNow",
  "showHour",
  "showMinute",
  "showSecond",
  "showMillisecond",
  "use12Hours",
  "hourStep",
  "minuteStep",
  "secondStep",
  "millisecondStep",
  "hideDisabledOptions",
  "defaultValue",
  "disabledHours",
  "disabledMinutes",
  "disabledSeconds",
  "disabledMilliseconds",
  "disabledTime",
  "changeOnScroll",
  "defaultOpenValue"
];
function pickTimeProps(props) {
  var timeProps = pickProps(props, showTimeKeys);
  var format2 = props.format, picker = props.picker;
  var propFormat = null;
  if (format2) {
    propFormat = format2;
    if (Array.isArray(propFormat)) {
      propFormat = propFormat[0];
    }
    propFormat = _typeof$a(propFormat) === "object" ? propFormat.format : propFormat;
  }
  if (picker === "time") {
    timeProps.format = propFormat;
  }
  return [timeProps, propFormat];
}
function isStringFormat(format2) {
  return format2 && typeof format2 === "string";
}
function existShowConfig(showHour, showMinute, showSecond, showMillisecond) {
  return [showHour, showMinute, showSecond, showMillisecond].some(function(show) {
    return show !== void 0;
  });
}
function fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond) {
  var parsedShowHour = showHour;
  var parsedShowMinute = showMinute;
  var parsedShowSecond = showSecond;
  if (!hasShowConfig && !parsedShowHour && !parsedShowMinute && !parsedShowSecond && !showMillisecond) {
    parsedShowHour = true;
    parsedShowMinute = true;
    parsedShowSecond = true;
  } else if (hasShowConfig) {
    var _parsedShowHour, _parsedShowMinute, _parsedShowSecond;
    var existFalse = [parsedShowHour, parsedShowMinute, parsedShowSecond].some(function(show) {
      return show === false;
    });
    var existTrue = [parsedShowHour, parsedShowMinute, parsedShowSecond].some(function(show) {
      return show === true;
    });
    var defaultShow = existFalse ? true : !existTrue;
    parsedShowHour = (_parsedShowHour = parsedShowHour) !== null && _parsedShowHour !== void 0 ? _parsedShowHour : defaultShow;
    parsedShowMinute = (_parsedShowMinute = parsedShowMinute) !== null && _parsedShowMinute !== void 0 ? _parsedShowMinute : defaultShow;
    parsedShowSecond = (_parsedShowSecond = parsedShowSecond) !== null && _parsedShowSecond !== void 0 ? _parsedShowSecond : defaultShow;
  }
  return [parsedShowHour, parsedShowMinute, parsedShowSecond, showMillisecond];
}
function getTimeProps(componentProps) {
  var showTime = componentProps.showTime;
  var _pickTimeProps = pickTimeProps(componentProps), _pickTimeProps2 = _slicedToArray$d(_pickTimeProps, 2), pickedProps = _pickTimeProps2[0], propFormat = _pickTimeProps2[1];
  var showTimeConfig = showTime && _typeof$a(showTime) === "object" ? showTime : {};
  var timeConfig = _objectSpread$3(_objectSpread$3({
    defaultOpenValue: showTimeConfig.defaultOpenValue || showTimeConfig.defaultValue
  }, pickedProps), showTimeConfig);
  var showMillisecond = timeConfig.showMillisecond;
  var showHour = timeConfig.showHour, showMinute = timeConfig.showMinute, showSecond = timeConfig.showSecond;
  var hasShowConfig = existShowConfig(showHour, showMinute, showSecond, showMillisecond);
  var _fillShowConfig = fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond);
  var _fillShowConfig2 = _slicedToArray$d(_fillShowConfig, 3);
  showHour = _fillShowConfig2[0];
  showMinute = _fillShowConfig2[1];
  showSecond = _fillShowConfig2[2];
  return [timeConfig, _objectSpread$3(_objectSpread$3({}, timeConfig), {}, {
    showHour,
    showMinute,
    showSecond,
    showMillisecond
  }), timeConfig.format, propFormat];
}
function fillShowTimeConfig(picker, showTimeFormat, propFormat, timeConfig, locale2) {
  var isTimePicker = picker === "time";
  if (picker === "datetime" || isTimePicker) {
    var pickedProps = timeConfig;
    var defaultLocaleFormat = getRowFormat(picker, locale2);
    var baselineFormat = defaultLocaleFormat;
    var formatList = [showTimeFormat, propFormat];
    for (var i = 0; i < formatList.length; i += 1) {
      var format2 = toArray(formatList[i])[0];
      if (isStringFormat(format2)) {
        baselineFormat = format2;
        break;
      }
    }
    var showHour = pickedProps.showHour, showMinute = pickedProps.showMinute, showSecond = pickedProps.showSecond, showMillisecond = pickedProps.showMillisecond;
    var use12Hours = pickedProps.use12Hours;
    var showMeridiem = checkShow(baselineFormat, ["a", "A", "LT", "LLL", "LTS"], use12Hours);
    var hasShowConfig = existShowConfig(showHour, showMinute, showSecond, showMillisecond);
    if (!hasShowConfig) {
      showHour = checkShow(baselineFormat, ["H", "h", "k", "LT", "LLL"]);
      showMinute = checkShow(baselineFormat, ["m", "LT", "LLL"]);
      showSecond = checkShow(baselineFormat, ["s", "LTS"]);
      showMillisecond = checkShow(baselineFormat, ["SSS"]);
    }
    var _fillShowConfig3 = fillShowConfig(hasShowConfig, showHour, showMinute, showSecond, showMillisecond);
    var _fillShowConfig4 = _slicedToArray$d(_fillShowConfig3, 3);
    showHour = _fillShowConfig4[0];
    showMinute = _fillShowConfig4[1];
    showSecond = _fillShowConfig4[2];
    var timeFormat = showTimeFormat || fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, showMeridiem);
    return _objectSpread$3(_objectSpread$3({}, pickedProps), {}, {
      // Format
      format: timeFormat,
      // Show Config
      showHour,
      showMinute,
      showSecond,
      showMillisecond,
      use12Hours: showMeridiem
    });
  }
  return null;
}
var WEEK_DAY_COUNT = 7;
function nullableCompare(value1, value2, oriCompareFn) {
  if (!value1 && !value2 || value1 === value2) {
    return true;
  }
  if (!value1 || !value2) {
    return false;
  }
  return oriCompareFn();
}
function isSameDecade(generateConfig2, decade1, decade2) {
  return nullableCompare(decade1, decade2, function() {
    var num1 = Math.floor(generateConfig2.getYear(decade1) / 10);
    var num2 = Math.floor(generateConfig2.getYear(decade2) / 10);
    return num1 === num2;
  });
}
function isSameYear(generateConfig2, year1, year2) {
  return nullableCompare(year1, year2, function() {
    return generateConfig2.getYear(year1) === generateConfig2.getYear(year2);
  });
}
function getQuarter(generateConfig2, date) {
  var quota = Math.floor(generateConfig2.getMonth(date) / 3);
  return quota + 1;
}
function isSameQuarter(generateConfig2, quarter1, quarter2) {
  return nullableCompare(quarter1, quarter2, function() {
    return isSameYear(generateConfig2, quarter1, quarter2) && getQuarter(generateConfig2, quarter1) === getQuarter(generateConfig2, quarter2);
  });
}
function isSameMonth(generateConfig2, month1, month2) {
  return nullableCompare(month1, month2, function() {
    return isSameYear(generateConfig2, month1, month2) && generateConfig2.getMonth(month1) === generateConfig2.getMonth(month2);
  });
}
function isSameDate(generateConfig2, date1, date2) {
  return nullableCompare(date1, date2, function() {
    return isSameYear(generateConfig2, date1, date2) && isSameMonth(generateConfig2, date1, date2) && generateConfig2.getDate(date1) === generateConfig2.getDate(date2);
  });
}
function isSameTime(generateConfig2, time1, time2) {
  return nullableCompare(time1, time2, function() {
    return generateConfig2.getHour(time1) === generateConfig2.getHour(time2) && generateConfig2.getMinute(time1) === generateConfig2.getMinute(time2) && generateConfig2.getSecond(time1) === generateConfig2.getSecond(time2);
  });
}
function isSameTimestamp(generateConfig2, time1, time2) {
  return nullableCompare(time1, time2, function() {
    return isSameDate(generateConfig2, time1, time2) && isSameTime(generateConfig2, time1, time2) && generateConfig2.getMillisecond(time1) === generateConfig2.getMillisecond(time2);
  });
}
function isSameWeek(generateConfig2, locale2, date1, date2) {
  return nullableCompare(date1, date2, function() {
    var weekStartDate1 = generateConfig2.locale.getWeekFirstDate(locale2, date1);
    var weekStartDate2 = generateConfig2.locale.getWeekFirstDate(locale2, date2);
    return isSameYear(generateConfig2, weekStartDate1, weekStartDate2) && generateConfig2.locale.getWeek(locale2, date1) === generateConfig2.locale.getWeek(locale2, date2);
  });
}
function isSame(generateConfig2, locale2, source, target, type) {
  switch (type) {
    case "date":
      return isSameDate(generateConfig2, source, target);
    case "week":
      return isSameWeek(generateConfig2, locale2.locale, source, target);
    case "month":
      return isSameMonth(generateConfig2, source, target);
    case "quarter":
      return isSameQuarter(generateConfig2, source, target);
    case "year":
      return isSameYear(generateConfig2, source, target);
    case "decade":
      return isSameDecade(generateConfig2, source, target);
    case "time":
      return isSameTime(generateConfig2, source, target);
    default:
      return isSameTimestamp(generateConfig2, source, target);
  }
}
function isInRange(generateConfig2, startDate, endDate, current) {
  if (!startDate || !endDate || !current) {
    return false;
  }
  return generateConfig2.isAfter(current, startDate) && generateConfig2.isAfter(endDate, current);
}
function isSameOrAfter(generateConfig2, locale2, date1, date2, type) {
  if (isSame(generateConfig2, locale2, date1, date2, type)) {
    return true;
  }
  return generateConfig2.isAfter(date1, date2);
}
function getWeekStartDate(locale2, generateConfig2, value) {
  var weekFirstDay = generateConfig2.locale.getWeekFirstDay(locale2);
  var monthStartDate = generateConfig2.setDate(value, 1);
  var startDateWeekDay = generateConfig2.getWeekDay(monthStartDate);
  var alignStartDate = generateConfig2.addDate(monthStartDate, weekFirstDay - startDateWeekDay);
  if (generateConfig2.getMonth(alignStartDate) === generateConfig2.getMonth(value) && generateConfig2.getDate(alignStartDate) > 1) {
    alignStartDate = generateConfig2.addDate(alignStartDate, -7);
  }
  return alignStartDate;
}
function formatValue(value, _ref) {
  var generateConfig2 = _ref.generateConfig, locale2 = _ref.locale, format2 = _ref.format;
  if (!value) {
    return "";
  }
  return typeof format2 === "function" ? format2(value) : generateConfig2.locale.format(locale2.locale, value, format2);
}
function fillTime(generateConfig2, date, time) {
  var tmpDate = date;
  var getFn = ["getHour", "getMinute", "getSecond", "getMillisecond"];
  var setFn = ["setHour", "setMinute", "setSecond", "setMillisecond"];
  setFn.forEach(function(fn, index) {
    if (time) {
      tmpDate = generateConfig2[fn](tmpDate, generateConfig2[getFn[index]](time));
    } else {
      tmpDate = generateConfig2[fn](tmpDate, 0);
    }
  });
  return tmpDate;
}
function _toConsumableArray$3(arr) {
  return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$e(arr) || _nonIterableSpread$3();
}
function _nonIterableSpread$3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$e(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$e(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$e(o, minLen);
}
function _iterableToArray$3(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$3(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$e(arr);
}
function _arrayLikeToArray$e(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function findValidateTime(date, getHourUnits, getMinuteUnits, getSecondUnits, getMillisecondUnits, generateConfig2) {
  var nextDate = date;
  function alignValidate(getUnitValue, setUnitValue, units) {
    var nextValue = generateConfig2[getUnitValue](nextDate);
    var nextUnit = units.find(function(unit) {
      return unit.value === nextValue;
    });
    if (!nextUnit || nextUnit.disabled) {
      var validateUnits = units.filter(function(unit) {
        return !unit.disabled;
      });
      var reverseEnabledUnits = _toConsumableArray$3(validateUnits).reverse();
      var validateUnit = reverseEnabledUnits.find(function(unit) {
        return unit.value <= nextValue;
      }) || validateUnits[0];
      if (validateUnit) {
        nextValue = validateUnit.value;
        nextDate = generateConfig2[setUnitValue](nextDate, nextValue);
      }
    }
    return nextValue;
  }
  var nextHour = alignValidate("getHour", "setHour", getHourUnits());
  var nextMinute = alignValidate("getMinute", "setMinute", getMinuteUnits(nextHour));
  var nextSecond = alignValidate("getSecond", "setSecond", getSecondUnits(nextHour, nextMinute));
  alignValidate("getMillisecond", "setMillisecond", getMillisecondUnits(nextHour, nextMinute, nextSecond));
  return nextDate;
}
function _typeof$9(o) {
  "@babel/helpers - typeof";
  return _typeof$9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$9(o);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$9(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$9(obj, key, value) {
  key = _toPropertyKey$9(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$9(t) {
  var i = _toPrimitive$9(t, "string");
  return "symbol" == _typeof$9(i) ? i : String(i);
}
function _toPrimitive$9(t, r) {
  if ("object" != _typeof$9(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$9(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$c(arr, i) {
  return _arrayWithHoles$c(arr) || _iterableToArrayLimit$c(arr, i) || _unsupportedIterableToArray$d(arr, i) || _nonIterableRest$c();
}
function _nonIterableRest$c() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$d(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$d(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$d(o, minLen);
}
function _arrayLikeToArray$d(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$c(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$c(arr) {
  if (Array.isArray(arr)) return arr;
}
function emptyDisabled() {
  return [];
}
function generateUnits(start, end) {
  var step = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  var hideDisabledOptions = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var disabledUnits = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
  var pad = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 2;
  var units = [];
  var integerStep = step >= 1 ? step | 0 : 1;
  for (var i = start; i <= end; i += integerStep) {
    var disabled = disabledUnits.includes(i);
    if (!disabled || !hideDisabledOptions) {
      units.push({
        label: leftPad(i, pad),
        value: i,
        disabled
      });
    }
  }
  return units;
}
function useTimeInfo(generateConfig2) {
  var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var date = arguments.length > 2 ? arguments[2] : void 0;
  var _ref = props || {}, use12Hours = _ref.use12Hours, _ref$hourStep = _ref.hourStep, hourStep = _ref$hourStep === void 0 ? 1 : _ref$hourStep, _ref$minuteStep = _ref.minuteStep, minuteStep = _ref$minuteStep === void 0 ? 1 : _ref$minuteStep, _ref$secondStep = _ref.secondStep, secondStep = _ref$secondStep === void 0 ? 1 : _ref$secondStep, _ref$millisecondStep = _ref.millisecondStep, millisecondStep = _ref$millisecondStep === void 0 ? 100 : _ref$millisecondStep, hideDisabledOptions = _ref.hideDisabledOptions, disabledTime = _ref.disabledTime, disabledHours = _ref.disabledHours, disabledMinutes = _ref.disabledMinutes, disabledSeconds = _ref.disabledSeconds;
  var mergedDate = reactExports.useMemo(function() {
    return date || generateConfig2.getNow();
  }, [date, generateConfig2]);
  var getDisabledTimes = reactExports.useCallback(function(targetDate) {
    var disabledConfig = (disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime(targetDate)) || {};
    return [disabledConfig.disabledHours || disabledHours || emptyDisabled, disabledConfig.disabledMinutes || disabledMinutes || emptyDisabled, disabledConfig.disabledSeconds || disabledSeconds || emptyDisabled, disabledConfig.disabledMilliseconds || emptyDisabled];
  }, [disabledTime, disabledHours, disabledMinutes, disabledSeconds]);
  var _React$useMemo = reactExports.useMemo(function() {
    return getDisabledTimes(mergedDate);
  }, [mergedDate, getDisabledTimes]), _React$useMemo2 = _slicedToArray$c(_React$useMemo, 4), mergedDisabledHours = _React$useMemo2[0], mergedDisabledMinutes = _React$useMemo2[1], mergedDisabledSeconds = _React$useMemo2[2], mergedDisabledMilliseconds = _React$useMemo2[3];
  var getAllUnits = reactExports.useCallback(function(getDisabledHours, getDisabledMinutes, getDisabledSeconds, getDisabledMilliseconds) {
    var hours = generateUnits(0, 23, hourStep, hideDisabledOptions, getDisabledHours());
    var rowHourUnits2 = use12Hours ? hours.map(function(unit) {
      return _objectSpread$2(_objectSpread$2({}, unit), {}, {
        label: leftPad(unit.value % 12 || 12, 2)
      });
    }) : hours;
    var getMinuteUnits2 = function getMinuteUnits3(nextHour) {
      return generateUnits(0, 59, minuteStep, hideDisabledOptions, getDisabledMinutes(nextHour));
    };
    var getSecondUnits2 = function getSecondUnits3(nextHour, nextMinute) {
      return generateUnits(0, 59, secondStep, hideDisabledOptions, getDisabledSeconds(nextHour, nextMinute));
    };
    var getMillisecondUnits2 = function getMillisecondUnits3(nextHour, nextMinute, nextSecond) {
      return generateUnits(0, 999, millisecondStep, hideDisabledOptions, getDisabledMilliseconds(nextHour, nextMinute, nextSecond), 3);
    };
    return [rowHourUnits2, getMinuteUnits2, getSecondUnits2, getMillisecondUnits2];
  }, [hideDisabledOptions, hourStep, use12Hours, millisecondStep, minuteStep, secondStep]);
  var _React$useMemo3 = reactExports.useMemo(function() {
    return getAllUnits(mergedDisabledHours, mergedDisabledMinutes, mergedDisabledSeconds, mergedDisabledMilliseconds);
  }, [getAllUnits, mergedDisabledHours, mergedDisabledMinutes, mergedDisabledSeconds, mergedDisabledMilliseconds]), _React$useMemo4 = _slicedToArray$c(_React$useMemo3, 4), rowHourUnits = _React$useMemo4[0], getMinuteUnits = _React$useMemo4[1], getSecondUnits = _React$useMemo4[2], getMillisecondUnits = _React$useMemo4[3];
  var getValidTime = function getValidTime2(nextTime, certainDate) {
    var getCheckHourUnits = function getCheckHourUnits2() {
      return rowHourUnits;
    };
    var getCheckMinuteUnits = getMinuteUnits;
    var getCheckSecondUnits = getSecondUnits;
    var getCheckMillisecondUnits = getMillisecondUnits;
    if (certainDate) {
      var _getDisabledTimes = getDisabledTimes(certainDate), _getDisabledTimes2 = _slicedToArray$c(_getDisabledTimes, 4), targetDisabledHours = _getDisabledTimes2[0], targetDisabledMinutes = _getDisabledTimes2[1], targetDisabledSeconds = _getDisabledTimes2[2], targetDisabledMilliseconds = _getDisabledTimes2[3];
      var _getAllUnits = getAllUnits(targetDisabledHours, targetDisabledMinutes, targetDisabledSeconds, targetDisabledMilliseconds), _getAllUnits2 = _slicedToArray$c(_getAllUnits, 4), targetRowHourUnits = _getAllUnits2[0], targetGetMinuteUnits = _getAllUnits2[1], targetGetSecondUnits = _getAllUnits2[2], targetGetMillisecondUnits = _getAllUnits2[3];
      getCheckHourUnits = function getCheckHourUnits2() {
        return targetRowHourUnits;
      };
      getCheckMinuteUnits = targetGetMinuteUnits;
      getCheckSecondUnits = targetGetSecondUnits;
      getCheckMillisecondUnits = targetGetMillisecondUnits;
    }
    var validateDate = findValidateTime(nextTime, getCheckHourUnits, getCheckMinuteUnits, getCheckSecondUnits, getCheckMillisecondUnits, generateConfig2);
    return validateDate;
  };
  return [
    // getValidTime
    getValidTime,
    // Units
    rowHourUnits,
    getMinuteUnits,
    getSecondUnits,
    getMillisecondUnits
  ];
}
function _toConsumableArray$2(arr) {
  return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$c(arr) || _nonIterableSpread$2();
}
function _nonIterableSpread$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$c(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$c(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen);
}
function _iterableToArray$2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$2(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$c(arr);
}
function _arrayLikeToArray$c(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function useToggleDates(generateConfig2, locale2, panelMode) {
  function toggleDates(list, target) {
    var index = list.findIndex(function(date) {
      return isSame(generateConfig2, locale2, date, target, panelMode);
    });
    if (index === -1) {
      return [].concat(_toConsumableArray$2(list), [target]);
    }
    var sliceList = _toConsumableArray$2(list);
    sliceList.splice(index, 1);
    return sliceList;
  }
  return toggleDates;
}
var SharedPanelContext = /* @__PURE__ */ reactExports.createContext(null);
var PanelContext = /* @__PURE__ */ reactExports.createContext(null);
function usePanelContext() {
  return reactExports.useContext(PanelContext);
}
function useInfo(props, panelType) {
  var prefixCls = props.prefixCls, generateConfig2 = props.generateConfig, locale2 = props.locale, disabledDate = props.disabledDate, minDate = props.minDate, maxDate = props.maxDate, cellRender = props.cellRender, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue, onHover = props.onHover, values = props.values, pickerValue = props.pickerValue, onSelect = props.onSelect, prevIcon = props.prevIcon, nextIcon = props.nextIcon, superPrevIcon = props.superPrevIcon, superNextIcon = props.superNextIcon;
  var _React$useContext = reactExports.useContext(SharedPanelContext), classNames = _React$useContext.classNames, styles = _React$useContext.styles;
  var now = generateConfig2.getNow();
  var info = {
    now,
    values,
    pickerValue,
    prefixCls,
    classNames,
    styles,
    disabledDate,
    minDate,
    maxDate,
    cellRender,
    hoverValue,
    hoverRangeValue,
    onHover,
    locale: locale2,
    generateConfig: generateConfig2,
    onSelect,
    panelType,
    // Icons
    prevIcon,
    nextIcon,
    superPrevIcon,
    superNextIcon
  };
  return [info, now];
}
var PickerHackContext = /* @__PURE__ */ reactExports.createContext({});
function _typeof$8(o) {
  "@babel/helpers - typeof";
  return _typeof$8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$8(o);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$8(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$8(obj, key, value) {
  key = _toPropertyKey$8(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$8(t) {
  var i = _toPrimitive$8(t, "string");
  return "symbol" == _typeof$8(i) ? i : String(i);
}
function _toPrimitive$8(t, r) {
  if ("object" != _typeof$8(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$8(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$b(arr, i) {
  return _arrayWithHoles$b(arr) || _iterableToArrayLimit$b(arr, i) || _unsupportedIterableToArray$b(arr, i) || _nonIterableRest$b();
}
function _nonIterableRest$b() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$b(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$b(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen);
}
function _arrayLikeToArray$b(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$b(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$b(arr) {
  if (Array.isArray(arr)) return arr;
}
function PanelBody(props) {
  var rowNum = props.rowNum, colNum = props.colNum, baseDate = props.baseDate, getCellDate = props.getCellDate, prefixColumn = props.prefixColumn, rowClassName = props.rowClassName, titleFormat = props.titleFormat, getCellText = props.getCellText, getCellClassName = props.getCellClassName, headerCells = props.headerCells, _props$cellSelection = props.cellSelection, cellSelection = _props$cellSelection === void 0 ? true : _props$cellSelection, disabledDate = props.disabledDate;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, classNames = _usePanelContext.classNames, styles = _usePanelContext.styles, type = _usePanelContext.panelType, now = _usePanelContext.now, contextDisabledDate = _usePanelContext.disabledDate, cellRender = _usePanelContext.cellRender, onHover = _usePanelContext.onHover, hoverValue = _usePanelContext.hoverValue, hoverRangeValue = _usePanelContext.hoverRangeValue, generateConfig2 = _usePanelContext.generateConfig, values = _usePanelContext.values, locale2 = _usePanelContext.locale, onSelect = _usePanelContext.onSelect;
  var mergedDisabledDate = disabledDate || contextDisabledDate;
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var _React$useContext = reactExports.useContext(PickerHackContext), onCellDblClick = _React$useContext.onCellDblClick;
  var matchValues = function matchValues2(date) {
    return values.some(function(singleValue) {
      return singleValue && isSame(generateConfig2, locale2, date, singleValue, type);
    });
  };
  var rows = [];
  for (var row = 0; row < rowNum; row += 1) {
    var rowNode = [];
    var rowStartDate = void 0;
    var _loop = function _loop2() {
      var offset = row * colNum + col;
      var currentDate = getCellDate(baseDate, offset);
      var disabled = mergedDisabledDate === null || mergedDisabledDate === void 0 ? void 0 : mergedDisabledDate(currentDate, {
        type
      });
      if (col === 0) {
        rowStartDate = currentDate;
        if (prefixColumn) {
          rowNode.push(prefixColumn(rowStartDate));
        }
      }
      var inRange = false;
      var rangeStart = false;
      var rangeEnd = false;
      if (cellSelection && hoverRangeValue) {
        var _hoverRangeValue = _slicedToArray$b(hoverRangeValue, 2), hoverStart = _hoverRangeValue[0], hoverEnd = _hoverRangeValue[1];
        inRange = isInRange(generateConfig2, hoverStart, hoverEnd, currentDate);
        rangeStart = isSame(generateConfig2, locale2, currentDate, hoverStart, type);
        rangeEnd = isSame(generateConfig2, locale2, currentDate, hoverEnd, type);
      }
      var title = titleFormat ? formatValue(currentDate, {
        locale: locale2,
        format: titleFormat,
        generateConfig: generateConfig2
      }) : void 0;
      var inner = /* @__PURE__ */ reactExports.createElement("div", {
        className: "".concat(cellPrefixCls, "-inner")
      }, getCellText(currentDate));
      rowNode.push(/* @__PURE__ */ reactExports.createElement("td", {
        key: col,
        title,
        className: clsx(cellPrefixCls, classNames.item, _objectSpread$1(_defineProperty$8(_defineProperty$8(_defineProperty$8(_defineProperty$8(_defineProperty$8(_defineProperty$8({}, "".concat(cellPrefixCls, "-disabled"), disabled), "".concat(cellPrefixCls, "-hover"), (hoverValue || []).some(function(date) {
          return isSame(generateConfig2, locale2, currentDate, date, type);
        })), "".concat(cellPrefixCls, "-in-range"), inRange && !rangeStart && !rangeEnd), "".concat(cellPrefixCls, "-range-start"), rangeStart), "".concat(cellPrefixCls, "-range-end"), rangeEnd), "".concat(prefixCls, "-cell-selected"), !hoverRangeValue && // WeekPicker use row instead
        type !== "week" && matchValues(currentDate)), getCellClassName(currentDate))),
        style: styles.item,
        onClick: function onClick() {
          if (!disabled) {
            onSelect(currentDate);
          }
        },
        onDoubleClick: function onDoubleClick() {
          if (!disabled && onCellDblClick) {
            onCellDblClick();
          }
        },
        onMouseEnter: function onMouseEnter() {
          if (!disabled) {
            onHover === null || onHover === void 0 || onHover(currentDate);
          }
        },
        onMouseLeave: function onMouseLeave() {
          if (!disabled) {
            onHover === null || onHover === void 0 || onHover(null);
          }
        }
      }, cellRender ? cellRender(currentDate, {
        prefixCls,
        originNode: inner,
        today: now,
        type,
        locale: locale2
      }) : inner));
    };
    for (var col = 0; col < colNum; col += 1) {
      _loop();
    }
    rows.push(/* @__PURE__ */ reactExports.createElement("tr", {
      key: row,
      className: rowClassName === null || rowClassName === void 0 ? void 0 : rowClassName(rowStartDate)
    }, rowNode));
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx("".concat(prefixCls, "-body"), classNames.body),
    style: styles.body
  }, /* @__PURE__ */ reactExports.createElement("table", {
    className: clsx("".concat(prefixCls, "-content"), classNames.content),
    style: styles.content
  }, headerCells && /* @__PURE__ */ reactExports.createElement("thead", null, /* @__PURE__ */ reactExports.createElement("tr", null, headerCells)), /* @__PURE__ */ reactExports.createElement("tbody", null, rows)));
}
var HIDDEN_STYLE = {
  visibility: "hidden"
};
function PanelHeader(props) {
  var offset = props.offset, superOffset = props.superOffset, onChange = props.onChange, getStart = props.getStart, getEnd = props.getEnd, children = props.children;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, classNames = _usePanelContext.classNames, styles = _usePanelContext.styles, _usePanelContext$prev = _usePanelContext.prevIcon, prevIcon = _usePanelContext$prev === void 0 ? "‹" : _usePanelContext$prev, _usePanelContext$next = _usePanelContext.nextIcon, nextIcon = _usePanelContext$next === void 0 ? "›" : _usePanelContext$next, _usePanelContext$supe = _usePanelContext.superPrevIcon, superPrevIcon = _usePanelContext$supe === void 0 ? "«" : _usePanelContext$supe, _usePanelContext$supe2 = _usePanelContext.superNextIcon, superNextIcon = _usePanelContext$supe2 === void 0 ? "»" : _usePanelContext$supe2, minDate = _usePanelContext.minDate, maxDate = _usePanelContext.maxDate, generateConfig2 = _usePanelContext.generateConfig, locale2 = _usePanelContext.locale, pickerValue = _usePanelContext.pickerValue, type = _usePanelContext.panelType;
  var headerPrefixCls = "".concat(prefixCls, "-header");
  var _React$useContext = reactExports.useContext(PickerHackContext), hidePrev = _React$useContext.hidePrev, hideNext = _React$useContext.hideNext, hideHeader = _React$useContext.hideHeader;
  var disabledOffsetPrev = reactExports.useMemo(function() {
    if (!minDate || !offset || !getEnd) {
      return false;
    }
    var prevPanelLimitDate = getEnd(offset(-1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, prevPanelLimitDate, minDate, type);
  }, [minDate, offset, pickerValue, getEnd, generateConfig2, locale2, type]);
  var disabledSuperOffsetPrev = reactExports.useMemo(function() {
    if (!minDate || !superOffset || !getEnd) {
      return false;
    }
    var prevPanelLimitDate = getEnd(superOffset(-1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, prevPanelLimitDate, minDate, type);
  }, [minDate, superOffset, pickerValue, getEnd, generateConfig2, locale2, type]);
  var disabledOffsetNext = reactExports.useMemo(function() {
    if (!maxDate || !offset || !getStart) {
      return false;
    }
    var nextPanelLimitDate = getStart(offset(1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, maxDate, nextPanelLimitDate, type);
  }, [maxDate, offset, pickerValue, getStart, generateConfig2, locale2, type]);
  var disabledSuperOffsetNext = reactExports.useMemo(function() {
    if (!maxDate || !superOffset || !getStart) {
      return false;
    }
    var nextPanelLimitDate = getStart(superOffset(1, pickerValue));
    return !isSameOrAfter(generateConfig2, locale2, maxDate, nextPanelLimitDate, type);
  }, [maxDate, superOffset, pickerValue, getStart, generateConfig2, locale2, type]);
  var onOffset = function onOffset2(distance) {
    if (offset) {
      onChange(offset(distance, pickerValue));
    }
  };
  var onSuperOffset = function onSuperOffset2(distance) {
    if (superOffset) {
      onChange(superOffset(distance, pickerValue));
    }
  };
  if (hideHeader) {
    return null;
  }
  var prevBtnCls = "".concat(headerPrefixCls, "-prev-btn");
  var nextBtnCls = "".concat(headerPrefixCls, "-next-btn");
  var superPrevBtnCls = "".concat(headerPrefixCls, "-super-prev-btn");
  var superNextBtnCls = "".concat(headerPrefixCls, "-super-next-btn");
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(headerPrefixCls, classNames.header),
    style: styles.header
  }, superOffset && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.previousYear,
    onClick: function onClick() {
      return onSuperOffset(-1);
    },
    tabIndex: -1,
    className: clsx(superPrevBtnCls, disabledSuperOffsetPrev && "".concat(superPrevBtnCls, "-disabled")),
    disabled: disabledSuperOffsetPrev,
    style: hidePrev ? HIDDEN_STYLE : {}
  }, superPrevIcon), offset && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.previousMonth,
    onClick: function onClick() {
      return onOffset(-1);
    },
    tabIndex: -1,
    className: clsx(prevBtnCls, disabledOffsetPrev && "".concat(prevBtnCls, "-disabled")),
    disabled: disabledOffsetPrev,
    style: hidePrev ? HIDDEN_STYLE : {}
  }, prevIcon), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(headerPrefixCls, "-view")
  }, children), offset && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.nextMonth,
    onClick: function onClick() {
      return onOffset(1);
    },
    tabIndex: -1,
    className: clsx(nextBtnCls, disabledOffsetNext && "".concat(nextBtnCls, "-disabled")),
    disabled: disabledOffsetNext,
    style: hideNext ? HIDDEN_STYLE : {}
  }, nextIcon), superOffset && /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.nextYear,
    onClick: function onClick() {
      return onSuperOffset(1);
    },
    tabIndex: -1,
    className: clsx(superNextBtnCls, disabledSuperOffsetNext && "".concat(superNextBtnCls, "-disabled")),
    disabled: disabledSuperOffsetNext,
    style: hideNext ? HIDDEN_STYLE : {}
  }, superNextIcon));
}
function _typeof$7(o) {
  "@babel/helpers - typeof";
  return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$7(o);
}
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
function _defineProperty$7(obj, key, value) {
  key = _toPropertyKey$7(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$7(t) {
  var i = _toPrimitive$7(t, "string");
  return "symbol" == _typeof$7(i) ? i : String(i);
}
function _toPrimitive$7(t, r) {
  if ("object" != _typeof$7(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$7(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$a(arr, i) {
  return _arrayWithHoles$a(arr) || _iterableToArrayLimit$a(arr, i) || _unsupportedIterableToArray$a(arr, i) || _nonIterableRest$a();
}
function _nonIterableRest$a() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$a(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$a(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen);
}
function _arrayLikeToArray$a(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$a(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$a(arr) {
  if (Array.isArray(arr)) return arr;
}
function DatePanel(props) {
  var prefixCls = props.prefixCls, _props$panelName = props.panelName, panelName = _props$panelName === void 0 ? "date" : _props$panelName, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange, _props$mode = props.mode, mode = _props$mode === void 0 ? "date" : _props$mode, disabledDate = props.disabledDate, onSelect = props.onSelect, onHover = props.onHover, showWeek = props.showWeek;
  var panelPrefixCls = "".concat(prefixCls, "-").concat(panelName, "-panel");
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var isWeek = mode === "week";
  var _useInfo = useInfo(props, mode), _useInfo2 = _slicedToArray$a(_useInfo, 2), info = _useInfo2[0], now = _useInfo2[1];
  var weekFirstDay = generateConfig2.locale.getWeekFirstDay(locale2.locale);
  var monthStartDate = generateConfig2.setDate(pickerValue, 1);
  var baseDate = getWeekStartDate(locale2.locale, generateConfig2, monthStartDate);
  var month = generateConfig2.getMonth(pickerValue);
  var showPrefixColumn = showWeek === void 0 ? isWeek : showWeek;
  var prefixColumn = showPrefixColumn ? function(date) {
    var disabled = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date, {
      type: "week"
    });
    return /* @__PURE__ */ reactExports.createElement("td", {
      key: "week",
      className: clsx(cellPrefixCls, "".concat(cellPrefixCls, "-week"), _defineProperty$7({}, "".concat(cellPrefixCls, "-disabled"), disabled)),
      onClick: function onClick() {
        if (!disabled) {
          onSelect(date);
        }
      },
      onMouseEnter: function onMouseEnter() {
        if (!disabled) {
          onHover === null || onHover === void 0 || onHover(date);
        }
      },
      onMouseLeave: function onMouseLeave() {
        if (!disabled) {
          onHover === null || onHover === void 0 || onHover(null);
        }
      }
    }, /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(cellPrefixCls, "-inner")
    }, generateConfig2.locale.getWeek(locale2.locale, date)));
  } : null;
  var headerCells = [];
  var weekDaysLocale = locale2.shortWeekDays || (generateConfig2.locale.getShortWeekDays ? generateConfig2.locale.getShortWeekDays(locale2.locale) : []);
  if (prefixColumn) {
    headerCells.push(/* @__PURE__ */ reactExports.createElement("th", {
      key: "empty"
    }, /* @__PURE__ */ reactExports.createElement("span", {
      style: {
        width: 0,
        height: 0,
        position: "absolute",
        overflow: "hidden",
        opacity: 0
      }
    }, locale2.week)));
  }
  for (var i = 0; i < WEEK_DAY_COUNT; i += 1) {
    headerCells.push(/* @__PURE__ */ reactExports.createElement("th", {
      key: i
    }, weekDaysLocale[(i + weekFirstDay) % WEEK_DAY_COUNT]));
  }
  var getCellDate = function getCellDate2(date, offset) {
    return generateConfig2.addDate(date, offset);
  };
  var getCellText = function getCellText2(date) {
    return formatValue(date, {
      locale: locale2,
      format: locale2.cellDateFormat,
      generateConfig: generateConfig2
    });
  };
  var getCellClassName = function getCellClassName2(date) {
    var classObj = _defineProperty$7(_defineProperty$7({}, "".concat(prefixCls, "-cell-in-view"), isSameMonth(generateConfig2, date, pickerValue)), "".concat(prefixCls, "-cell-today"), isSameDate(generateConfig2, date, now));
    return classObj;
  };
  var monthsLocale = locale2.shortMonths || (generateConfig2.locale.getShortMonths ? generateConfig2.locale.getShortMonths(locale2.locale) : []);
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.yearSelect,
    key: "year",
    onClick: function onClick() {
      onModeChange("year", pickerValue);
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-year-btn")
  }, formatValue(pickerValue, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  var monthNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    "aria-label": locale2.monthSelect,
    key: "month",
    onClick: function onClick() {
      onModeChange("month", pickerValue);
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-month-btn")
  }, locale2.monthFormat ? formatValue(pickerValue, {
    locale: locale2,
    format: locale2.monthFormat,
    generateConfig: generateConfig2
  }) : monthsLocale[month]);
  var monthYearNodes = locale2.monthBeforeYear ? [monthNode, yearNode] : [yearNode, monthNode];
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(panelPrefixCls, showWeek && "".concat(panelPrefixCls, "-show-week"))
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    offset: function offset(distance) {
      return generateConfig2.addMonth(pickerValue, distance);
    },
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance);
    },
    onChange: onPickerValueChange,
    getStart: function getStart(date) {
      return generateConfig2.setDate(date, 1);
    },
    getEnd: function getEnd(date) {
      var clone = generateConfig2.setDate(date, 1);
      clone = generateConfig2.addMonth(clone, 1);
      return generateConfig2.addDate(clone, -1);
    }
  }, monthYearNodes), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends$8({
    titleFormat: locale2.fieldDateFormat
  }, props, {
    colNum: WEEK_DAY_COUNT,
    rowNum: 6,
    baseDate,
    headerCells,
    getCellDate,
    getCellText,
    getCellClassName,
    prefixColumn,
    cellSelection: !isWeek
  }))));
}
var SPEED_PTG = 1 / 3;
function useScrollTo(ulRef, value) {
  var scrollingRef = reactExports.useRef(false);
  var scrollRafRef = reactExports.useRef(null);
  var scrollDistRef = reactExports.useRef(null);
  var isScrolling = function isScrolling2() {
    return scrollingRef.current;
  };
  var stopScroll = function stopScroll2() {
    wrapperRaf.cancel(scrollRafRef.current);
    scrollingRef.current = false;
  };
  var scrollRafTimesRef = reactExports.useRef();
  var startScroll = function startScroll2() {
    var ul = ulRef.current;
    scrollDistRef.current = null;
    scrollRafTimesRef.current = 0;
    if (ul) {
      var targetLi = ul.querySelector('[data-value="'.concat(value, '"]'));
      var firstLi = ul.querySelector("li");
      var doScroll = function doScroll2() {
        stopScroll();
        scrollingRef.current = true;
        scrollRafTimesRef.current += 1;
        var currentTop = ul.scrollTop;
        var firstLiTop = firstLi.offsetTop;
        var targetLiTop = targetLi.offsetTop;
        var targetTop = targetLiTop - firstLiTop;
        if (targetLiTop === 0 && targetLi !== firstLi || !isVisible(ul)) {
          if (scrollRafTimesRef.current <= 5) {
            scrollRafRef.current = wrapperRaf(doScroll2);
          }
          return;
        }
        var nextTop = currentTop + (targetTop - currentTop) * SPEED_PTG;
        var dist = Math.abs(targetTop - nextTop);
        if (scrollDistRef.current !== null && scrollDistRef.current < dist) {
          stopScroll();
          return;
        }
        scrollDistRef.current = dist;
        if (dist <= 1) {
          ul.scrollTop = targetTop;
          stopScroll();
          return;
        }
        ul.scrollTop = nextTop;
        scrollRafRef.current = wrapperRaf(doScroll2);
      };
      if (targetLi && firstLi) {
        doScroll();
      }
    }
  };
  var syncScroll = useEvent(startScroll);
  return [syncScroll, stopScroll, isScrolling];
}
function _typeof$6(o) {
  "@babel/helpers - typeof";
  return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$6(o);
}
function _defineProperty$6(obj, key, value) {
  key = _toPropertyKey$6(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$6(t) {
  var i = _toPrimitive$6(t, "string");
  return "symbol" == _typeof$6(i) ? i : String(i);
}
function _toPrimitive$6(t, r) {
  if ("object" != _typeof$6(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$6(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$9(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$9(arr);
}
function _slicedToArray$9(arr, i) {
  return _arrayWithHoles$9(arr) || _iterableToArrayLimit$9(arr, i) || _unsupportedIterableToArray$9(arr, i) || _nonIterableRest$9();
}
function _nonIterableRest$9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$9(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$9(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen);
}
function _arrayLikeToArray$9(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$9(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$9(arr) {
  if (Array.isArray(arr)) return arr;
}
var SCROLL_DELAY = 300;
function flattenUnits(units) {
  return units.map(function(_ref) {
    var value = _ref.value, label = _ref.label, disabled = _ref.disabled;
    return [value, label, disabled].join(",");
  }).join(";");
}
function TimeColumn(props) {
  var units = props.units, value = props.value, optionalValue = props.optionalValue, type = props.type, onChange = props.onChange, onHover = props.onHover, onDblClick = props.onDblClick, changeOnScroll = props.changeOnScroll;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, cellRender = _usePanelContext.cellRender, now = _usePanelContext.now, locale2 = _usePanelContext.locale, classNames = _usePanelContext.classNames, styles = _usePanelContext.styles;
  var panelPrefixCls = "".concat(prefixCls, "-time-panel");
  var cellPrefixCls = "".concat(prefixCls, "-time-panel-cell");
  var ulRef = reactExports.useRef(null);
  var checkDelayRef = reactExports.useRef();
  var clearDelayCheck = function clearDelayCheck2() {
    clearTimeout(checkDelayRef.current);
  };
  var _useScrollTo = useScrollTo(ulRef, value !== null && value !== void 0 ? value : optionalValue), _useScrollTo2 = _slicedToArray$9(_useScrollTo, 3), syncScroll = _useScrollTo2[0], stopScroll = _useScrollTo2[1], isScrolling = _useScrollTo2[2];
  useLayoutEffect(function() {
    syncScroll();
    clearDelayCheck();
    return function() {
      stopScroll();
      clearDelayCheck();
    };
  }, [value, optionalValue, flattenUnits(units)]);
  var onInternalScroll = function onInternalScroll2(event) {
    clearDelayCheck();
    var target = event.target;
    if (!isScrolling() && changeOnScroll) {
      checkDelayRef.current = setTimeout(function() {
        var ul = ulRef.current;
        var firstLiTop = ul.querySelector("li").offsetTop;
        var liList = Array.from(ul.querySelectorAll("li"));
        var liTopList = liList.map(function(li) {
          return li.offsetTop - firstLiTop;
        });
        var liDistList = liTopList.map(function(top, index) {
          if (units[index].disabled) {
            return Number.MAX_SAFE_INTEGER;
          }
          return Math.abs(top - target.scrollTop);
        });
        var minDist = Math.min.apply(Math, _toConsumableArray$1(liDistList));
        var minDistIndex = liDistList.findIndex(function(dist) {
          return dist === minDist;
        });
        var targetUnit = units[minDistIndex];
        if (targetUnit && !targetUnit.disabled) {
          onChange(targetUnit.value);
        }
      }, SCROLL_DELAY);
    }
  };
  var columnPrefixCls = "".concat(panelPrefixCls, "-column");
  return /* @__PURE__ */ reactExports.createElement("ul", {
    className: columnPrefixCls,
    ref: ulRef,
    "data-type": type,
    onScroll: onInternalScroll
  }, units.map(function(_ref2) {
    var label = _ref2.label, unitValue = _ref2.value, disabled = _ref2.disabled;
    var inner = /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(cellPrefixCls, "-inner")
    }, label);
    return /* @__PURE__ */ reactExports.createElement("li", {
      key: unitValue,
      style: styles.item,
      className: clsx(cellPrefixCls, classNames.item, _defineProperty$6(_defineProperty$6({}, "".concat(cellPrefixCls, "-selected"), value === unitValue), "".concat(cellPrefixCls, "-disabled"), disabled)),
      onClick: function onClick() {
        if (!disabled) {
          onChange(unitValue);
        }
      },
      onDoubleClick: function onDoubleClick() {
        if (!disabled && onDblClick) {
          onDblClick();
        }
      },
      onMouseEnter: function onMouseEnter() {
        onHover(unitValue);
      },
      onMouseLeave: function onMouseLeave() {
        onHover(null);
      },
      "data-value": unitValue
    }, cellRender ? cellRender(unitValue, {
      prefixCls,
      originNode: inner,
      today: now,
      type: "time",
      subType: type,
      locale: locale2
    }) : inner);
  }));
}
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
function _slicedToArray$8(arr, i) {
  return _arrayWithHoles$8(arr) || _iterableToArrayLimit$8(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$8();
}
function _nonIterableRest$8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$8(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$8(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen);
}
function _arrayLikeToArray$8(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$8(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$8(arr) {
  if (Array.isArray(arr)) return arr;
}
function isAM(hour) {
  return hour < 12;
}
function TimePanelBody(props) {
  var showHour = props.showHour, showMinute = props.showMinute, showSecond = props.showSecond, showMillisecond = props.showMillisecond, showMeridiem = props.use12Hours, changeOnScroll = props.changeOnScroll;
  var _usePanelContext = usePanelContext(), prefixCls = _usePanelContext.prefixCls, classNames = _usePanelContext.classNames, styles = _usePanelContext.styles, values = _usePanelContext.values, generateConfig2 = _usePanelContext.generateConfig, locale2 = _usePanelContext.locale, onSelect = _usePanelContext.onSelect, _usePanelContext$onHo = _usePanelContext.onHover, onHover = _usePanelContext$onHo === void 0 ? function() {
  } : _usePanelContext$onHo, pickerValue = _usePanelContext.pickerValue;
  var value = (values === null || values === void 0 ? void 0 : values[0]) || null;
  var _React$useContext = reactExports.useContext(PickerHackContext), onCellDblClick = _React$useContext.onCellDblClick;
  var _useTimeInfo = useTimeInfo(generateConfig2, props, value), _useTimeInfo2 = _slicedToArray$8(_useTimeInfo, 5), getValidTime = _useTimeInfo2[0], rowHourUnits = _useTimeInfo2[1], getMinuteUnits = _useTimeInfo2[2], getSecondUnits = _useTimeInfo2[3], getMillisecondUnits = _useTimeInfo2[4];
  var getUnitValue = function getUnitValue2(func) {
    var valueUnitVal = value && generateConfig2[func](value);
    var pickerUnitValue = pickerValue && generateConfig2[func](pickerValue);
    return [valueUnitVal, pickerUnitValue];
  };
  var _getUnitValue = getUnitValue("getHour"), _getUnitValue2 = _slicedToArray$8(_getUnitValue, 2), hour = _getUnitValue2[0], pickerHour = _getUnitValue2[1];
  var _getUnitValue3 = getUnitValue("getMinute"), _getUnitValue4 = _slicedToArray$8(_getUnitValue3, 2), minute = _getUnitValue4[0], pickerMinute = _getUnitValue4[1];
  var _getUnitValue5 = getUnitValue("getSecond"), _getUnitValue6 = _slicedToArray$8(_getUnitValue5, 2), second = _getUnitValue6[0], pickerSecond = _getUnitValue6[1];
  var _getUnitValue7 = getUnitValue("getMillisecond"), _getUnitValue8 = _slicedToArray$8(_getUnitValue7, 2), millisecond = _getUnitValue8[0], pickerMillisecond = _getUnitValue8[1];
  var meridiem = hour === null ? null : isAM(hour) ? "am" : "pm";
  var hourUnits = reactExports.useMemo(function() {
    if (!showMeridiem) {
      return rowHourUnits;
    }
    return isAM(hour) ? rowHourUnits.filter(function(h) {
      return isAM(h.value);
    }) : rowHourUnits.filter(function(h) {
      return !isAM(h.value);
    });
  }, [hour, rowHourUnits, showMeridiem]);
  var getEnabled = function getEnabled2(units, val) {
    var _enabledUnits$;
    var enabledUnits = units.filter(function(unit) {
      return !unit.disabled;
    });
    return val !== null && val !== void 0 ? val : (
      // Fallback to enabled value
      enabledUnits === null || enabledUnits === void 0 || (_enabledUnits$ = enabledUnits[0]) === null || _enabledUnits$ === void 0 ? void 0 : _enabledUnits$.value
    );
  };
  var validHour = getEnabled(rowHourUnits, hour);
  var minuteUnits = reactExports.useMemo(function() {
    return getMinuteUnits(validHour);
  }, [getMinuteUnits, validHour]);
  var validMinute = getEnabled(minuteUnits, minute);
  var secondUnits = reactExports.useMemo(function() {
    return getSecondUnits(validHour, validMinute);
  }, [getSecondUnits, validHour, validMinute]);
  var validSecond = getEnabled(secondUnits, second);
  var millisecondUnits = reactExports.useMemo(function() {
    return getMillisecondUnits(validHour, validMinute, validSecond);
  }, [getMillisecondUnits, validHour, validMinute, validSecond]);
  var validMillisecond = getEnabled(millisecondUnits, millisecond);
  var meridiemUnits = reactExports.useMemo(function() {
    if (!showMeridiem) {
      return [];
    }
    var base = generateConfig2.getNow();
    var amDate = generateConfig2.setHour(base, 6);
    var pmDate = generateConfig2.setHour(base, 18);
    var formatMeridiem = function formatMeridiem2(date, defaultLabel) {
      var cellMeridiemFormat = locale2.cellMeridiemFormat;
      return cellMeridiemFormat ? formatValue(date, {
        generateConfig: generateConfig2,
        locale: locale2,
        format: cellMeridiemFormat
      }) : defaultLabel;
    };
    return [{
      label: formatMeridiem(amDate, "AM"),
      value: "am",
      disabled: rowHourUnits.every(function(h) {
        return h.disabled || !isAM(h.value);
      })
    }, {
      label: formatMeridiem(pmDate, "PM"),
      value: "pm",
      disabled: rowHourUnits.every(function(h) {
        return h.disabled || isAM(h.value);
      })
    }];
  }, [rowHourUnits, showMeridiem, generateConfig2, locale2]);
  var triggerChange = function triggerChange2(nextDate) {
    var validateDate = getValidTime(nextDate);
    onSelect(validateDate);
  };
  var triggerDateTmpl = reactExports.useMemo(function() {
    var tmpl = value || pickerValue || generateConfig2.getNow();
    var isNotNull = function isNotNull2(num) {
      return num !== null && num !== void 0;
    };
    if (isNotNull(hour)) {
      tmpl = generateConfig2.setHour(tmpl, hour);
      tmpl = generateConfig2.setMinute(tmpl, minute);
      tmpl = generateConfig2.setSecond(tmpl, second);
      tmpl = generateConfig2.setMillisecond(tmpl, millisecond);
    } else if (isNotNull(pickerHour)) {
      tmpl = generateConfig2.setHour(tmpl, pickerHour);
      tmpl = generateConfig2.setMinute(tmpl, pickerMinute);
      tmpl = generateConfig2.setSecond(tmpl, pickerSecond);
      tmpl = generateConfig2.setMillisecond(tmpl, pickerMillisecond);
    } else if (isNotNull(validHour)) {
      tmpl = generateConfig2.setHour(tmpl, validHour);
      tmpl = generateConfig2.setMinute(tmpl, validMinute);
      tmpl = generateConfig2.setSecond(tmpl, validSecond);
      tmpl = generateConfig2.setMillisecond(tmpl, validMillisecond);
    }
    return tmpl;
  }, [value, pickerValue, hour, minute, second, millisecond, validHour, validMinute, validSecond, validMillisecond, pickerHour, pickerMinute, pickerSecond, pickerMillisecond, generateConfig2]);
  var fillColumnValue = function fillColumnValue2(val, func) {
    if (val === null) {
      return null;
    }
    return generateConfig2[func](triggerDateTmpl, val);
  };
  var getNextHourTime = function getNextHourTime2(val) {
    return fillColumnValue(val, "setHour");
  };
  var getNextMinuteTime = function getNextMinuteTime2(val) {
    return fillColumnValue(val, "setMinute");
  };
  var getNextSecondTime = function getNextSecondTime2(val) {
    return fillColumnValue(val, "setSecond");
  };
  var getNextMillisecondTime = function getNextMillisecondTime2(val) {
    return fillColumnValue(val, "setMillisecond");
  };
  var getMeridiemTime = function getMeridiemTime2(val) {
    if (val === null) {
      return null;
    }
    if (val === "am" && !isAM(hour)) {
      return generateConfig2.setHour(triggerDateTmpl, hour - 12);
    } else if (val === "pm" && isAM(hour)) {
      return generateConfig2.setHour(triggerDateTmpl, hour + 12);
    }
    return triggerDateTmpl;
  };
  var onHourChange = function onHourChange2(val) {
    triggerChange(getNextHourTime(val));
  };
  var onMinuteChange = function onMinuteChange2(val) {
    triggerChange(getNextMinuteTime(val));
  };
  var onSecondChange = function onSecondChange2(val) {
    triggerChange(getNextSecondTime(val));
  };
  var onMillisecondChange = function onMillisecondChange2(val) {
    triggerChange(getNextMillisecondTime(val));
  };
  var onMeridiemChange = function onMeridiemChange2(val) {
    triggerChange(getMeridiemTime(val));
  };
  var onHourHover = function onHourHover2(val) {
    onHover(getNextHourTime(val));
  };
  var onMinuteHover = function onMinuteHover2(val) {
    onHover(getNextMinuteTime(val));
  };
  var onSecondHover = function onSecondHover2(val) {
    onHover(getNextSecondTime(val));
  };
  var onMillisecondHover = function onMillisecondHover2(val) {
    onHover(getNextMillisecondTime(val));
  };
  var onMeridiemHover = function onMeridiemHover2(val) {
    onHover(getMeridiemTime(val));
  };
  var sharedColumnProps = {
    onDblClick: onCellDblClick,
    changeOnScroll
  };
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx("".concat(prefixCls, "-content"), classNames.content),
    style: styles.content
  }, showHour && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends$7({
    units: hourUnits,
    value: hour,
    optionalValue: pickerHour,
    type: "hour",
    onChange: onHourChange,
    onHover: onHourHover
  }, sharedColumnProps)), showMinute && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends$7({
    units: minuteUnits,
    value: minute,
    optionalValue: pickerMinute,
    type: "minute",
    onChange: onMinuteChange,
    onHover: onMinuteHover
  }, sharedColumnProps)), showSecond && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends$7({
    units: secondUnits,
    value: second,
    optionalValue: pickerSecond,
    type: "second",
    onChange: onSecondChange,
    onHover: onSecondHover
  }, sharedColumnProps)), showMillisecond && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends$7({
    units: millisecondUnits,
    value: millisecond,
    optionalValue: pickerMillisecond,
    type: "millisecond",
    onChange: onMillisecondChange,
    onHover: onMillisecondHover
  }, sharedColumnProps)), showMeridiem && /* @__PURE__ */ reactExports.createElement(TimeColumn, _extends$7({
    units: meridiemUnits,
    value: meridiem,
    type: "meridiem",
    onChange: onMeridiemChange,
    onHover: onMeridiemHover
  }, sharedColumnProps)));
}
function _slicedToArray$7(arr, i) {
  return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$7();
}
function _nonIterableRest$7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$7(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$7(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen);
}
function _arrayLikeToArray$7(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$7(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$7(arr) {
  if (Array.isArray(arr)) return arr;
}
function TimePanel(props) {
  var prefixCls = props.prefixCls, value = props.value, locale2 = props.locale, generateConfig2 = props.generateConfig, showTime = props.showTime;
  var _ref = showTime || {}, format2 = _ref.format;
  var panelPrefixCls = "".concat(prefixCls, "-time-panel");
  var _useInfo = useInfo(props, "time"), _useInfo2 = _slicedToArray$7(_useInfo, 1), info = _useInfo2[0];
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx(panelPrefixCls)
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, null, value ? formatValue(value, {
    locale: locale2,
    format: format2,
    generateConfig: generateConfig2
  }) : " "), /* @__PURE__ */ reactExports.createElement(TimePanelBody, showTime)));
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
function _slicedToArray$6(arr, i) {
  return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$6();
}
function _nonIterableRest$6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$6(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen);
}
function _arrayLikeToArray$6(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$6(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$6(arr) {
  if (Array.isArray(arr)) return arr;
}
function DateTimePanel(props) {
  var prefixCls = props.prefixCls, generateConfig2 = props.generateConfig, showTime = props.showTime, onSelect = props.onSelect, value = props.value, pickerValue = props.pickerValue, onHover = props.onHover;
  var panelPrefixCls = "".concat(prefixCls, "-datetime-panel");
  var _useTimeInfo = useTimeInfo(generateConfig2, showTime), _useTimeInfo2 = _slicedToArray$6(_useTimeInfo, 1), getValidTime = _useTimeInfo2[0];
  var mergeTime = function mergeTime2(date) {
    if (value) {
      return fillTime(generateConfig2, date, value);
    }
    return fillTime(generateConfig2, date, pickerValue);
  };
  var onDateHover = function onDateHover2(date) {
    onHover === null || onHover === void 0 || onHover(date ? mergeTime(date) : date);
  };
  var onDateSelect = function onDateSelect2(date) {
    var cloneDate = mergeTime(date);
    onSelect(getValidTime(cloneDate, cloneDate));
  };
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(DatePanel, _extends$6({}, props, {
    onSelect: onDateSelect,
    onHover: onDateHover
  })), /* @__PURE__ */ reactExports.createElement(TimePanel, props));
}
function _typeof$5(o) {
  "@babel/helpers - typeof";
  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$5(o);
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
function _defineProperty$5(obj, key, value) {
  key = _toPropertyKey$5(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$5(t) {
  var i = _toPrimitive$5(t, "string");
  return "symbol" == _typeof$5(i) ? i : String(i);
}
function _toPrimitive$5(t, r) {
  if ("object" != _typeof$5(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$5(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$5(arr, i) {
  return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$5();
}
function _nonIterableRest$5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$5(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen);
}
function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$5(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$5(arr) {
  if (Array.isArray(arr)) return arr;
}
function DecadePanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange;
  var panelPrefixCls = "".concat(prefixCls, "-decade-panel");
  var _useInfo = useInfo(props, "decade"), _useInfo2 = _slicedToArray$5(_useInfo, 1), info = _useInfo2[0];
  var getStartYear = function getStartYear2(date) {
    var startYear = Math.floor(generateConfig2.getYear(date) / 100) * 100;
    return generateConfig2.setYear(date, startYear);
  };
  var getEndYear = function getEndYear2(date) {
    var startYear = getStartYear(date);
    return generateConfig2.addYear(startYear, 99);
  };
  var startYearDate = getStartYear(pickerValue);
  var endYearDate = getEndYear(pickerValue);
  var baseDate = generateConfig2.addYear(startYearDate, -10);
  var getCellDate = function getCellDate2(date, offset) {
    return generateConfig2.addYear(date, offset * 10);
  };
  var getCellText = function getCellText2(date) {
    var cellYearFormat = locale2.cellYearFormat;
    var startYearStr = formatValue(date, {
      locale: locale2,
      format: cellYearFormat,
      generateConfig: generateConfig2
    });
    var endYearStr = formatValue(generateConfig2.addYear(date, 9), {
      locale: locale2,
      format: cellYearFormat,
      generateConfig: generateConfig2
    });
    return "".concat(startYearStr, "-").concat(endYearStr);
  };
  var getCellClassName = function getCellClassName2(date) {
    return _defineProperty$5({}, "".concat(prefixCls, "-cell-in-view"), isSameDecade(generateConfig2, date, startYearDate) || isSameDecade(generateConfig2, date, endYearDate) || isInRange(generateConfig2, startYearDate, endYearDate, date));
  };
  var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
    var baseStartDate = generateConfig2.setDate(currentDate, 1);
    var baseStartMonth = generateConfig2.setMonth(baseStartDate, 0);
    var baseStartYear = generateConfig2.setYear(baseStartMonth, Math.floor(generateConfig2.getYear(baseStartMonth) / 10) * 10);
    var baseEndYear = generateConfig2.addYear(baseStartYear, 10);
    var baseEndDate = generateConfig2.addDate(baseEndYear, -1);
    return disabledDate(baseStartYear, disabledInfo) && disabledDate(baseEndDate, disabledInfo);
  } : null;
  var yearNode = "".concat(formatValue(startYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }), "-").concat(formatValue(endYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance * 100);
    },
    onChange: onPickerValueChange,
    getStart: getStartYear,
    getEnd: getEndYear
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends$5({}, props, {
    disabledDate: mergedDisabledDate,
    colNum: 3,
    rowNum: 4,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
function _typeof$4(o) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$4(o);
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
function _defineProperty$4(obj, key, value) {
  key = _toPropertyKey$4(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$4(t) {
  var i = _toPrimitive$4(t, "string");
  return "symbol" == _typeof$4(i) ? i : String(i);
}
function _toPrimitive$4(t, r) {
  if ("object" != _typeof$4(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$4(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$4(arr, i) {
  return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$4(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$4(arr) {
  if (Array.isArray(arr)) return arr;
}
function MonthPanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
  var panelPrefixCls = "".concat(prefixCls, "-month-panel");
  var _useInfo = useInfo(props, "month"), _useInfo2 = _slicedToArray$4(_useInfo, 1), info = _useInfo2[0];
  var baseDate = generateConfig2.setMonth(pickerValue, 0);
  var monthsLocale = locale2.shortMonths || (generateConfig2.locale.getShortMonths ? generateConfig2.locale.getShortMonths(locale2.locale) : []);
  var getCellDate = function getCellDate2(date, offset) {
    return generateConfig2.addMonth(date, offset);
  };
  var getCellText = function getCellText2(date) {
    var month = generateConfig2.getMonth(date);
    return locale2.monthFormat ? formatValue(date, {
      locale: locale2,
      format: locale2.monthFormat,
      generateConfig: generateConfig2
    }) : monthsLocale[month];
  };
  var getCellClassName = function getCellClassName2() {
    return _defineProperty$4({}, "".concat(prefixCls, "-cell-in-view"), true);
  };
  var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
    var startDate = generateConfig2.setDate(currentDate, 1);
    var nextMonthStartDate = generateConfig2.setMonth(startDate, generateConfig2.getMonth(startDate) + 1);
    var endDate = generateConfig2.addDate(nextMonthStartDate, -1);
    return disabledDate(startDate, disabledInfo) && disabledDate(endDate, disabledInfo);
  } : null;
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    key: "year",
    "aria-label": locale2.yearSelect,
    onClick: function onClick() {
      onModeChange("year");
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-year-btn")
  }, formatValue(pickerValue, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance);
    },
    onChange: onPickerValueChange,
    getStart: function getStart(date) {
      return generateConfig2.setMonth(date, 0);
    },
    getEnd: function getEnd(date) {
      return generateConfig2.setMonth(date, 11);
    }
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends$4({}, props, {
    disabledDate: mergedDisabledDate,
    titleFormat: locale2.fieldMonthFormat,
    colNum: 3,
    rowNum: 4,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
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
function _defineProperty$3(obj, key, value) {
  key = _toPropertyKey$3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == _typeof$3(i) ? i : String(i);
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$3(arr, i) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$3(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$3(arr) {
  if (Array.isArray(arr)) return arr;
}
function QuarterPanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
  var panelPrefixCls = "".concat(prefixCls, "-quarter-panel");
  var _useInfo = useInfo(props, "quarter"), _useInfo2 = _slicedToArray$3(_useInfo, 1), info = _useInfo2[0];
  var baseDate = generateConfig2.setMonth(pickerValue, 0);
  var getCellDate = function getCellDate2(date, offset) {
    return generateConfig2.addMonth(date, offset * 3);
  };
  var getCellText = function getCellText2(date) {
    return formatValue(date, {
      locale: locale2,
      format: locale2.cellQuarterFormat,
      generateConfig: generateConfig2
    });
  };
  var getCellClassName = function getCellClassName2() {
    return _defineProperty$3({}, "".concat(prefixCls, "-cell-in-view"), true);
  };
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    key: "year",
    "aria-label": locale2.yearSelect,
    onClick: function onClick() {
      onModeChange("year");
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-year-btn")
  }, formatValue(pickerValue, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance);
    },
    onChange: onPickerValueChange,
    getStart: function getStart(date) {
      return generateConfig2.setMonth(date, 0);
    },
    getEnd: function getEnd(date) {
      return generateConfig2.setMonth(date, 11);
    }
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends$3({}, props, {
    titleFormat: locale2.fieldQuarterFormat,
    colNum: 4,
    rowNum: 1,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
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
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : String(i);
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$2(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr)) return arr;
}
function WeekPanel(props) {
  var prefixCls = props.prefixCls, generateConfig2 = props.generateConfig, locale2 = props.locale, value = props.value, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue;
  var localeName = locale2.locale;
  var rowPrefixCls = "".concat(prefixCls, "-week-panel-row");
  var rowClassName = function rowClassName2(currentDate) {
    var rangeCls = {};
    if (hoverRangeValue) {
      var _hoverRangeValue = _slicedToArray$2(hoverRangeValue, 2), rangeStart = _hoverRangeValue[0], rangeEnd = _hoverRangeValue[1];
      var isRangeStart = isSameWeek(generateConfig2, localeName, rangeStart, currentDate);
      var isRangeEnd = isSameWeek(generateConfig2, localeName, rangeEnd, currentDate);
      rangeCls["".concat(rowPrefixCls, "-range-start")] = isRangeStart;
      rangeCls["".concat(rowPrefixCls, "-range-end")] = isRangeEnd;
      rangeCls["".concat(rowPrefixCls, "-range-hover")] = !isRangeStart && !isRangeEnd && isInRange(generateConfig2, rangeStart, rangeEnd, currentDate);
    }
    if (hoverValue) {
      rangeCls["".concat(rowPrefixCls, "-hover")] = hoverValue.some(function(date) {
        return isSameWeek(generateConfig2, localeName, currentDate, date);
      });
    }
    return clsx(
      rowPrefixCls,
      _defineProperty$2({}, "".concat(rowPrefixCls, "-selected"), !hoverRangeValue && isSameWeek(generateConfig2, localeName, value, currentDate)),
      // Patch for hover range
      rangeCls
    );
  };
  return /* @__PURE__ */ reactExports.createElement(DatePanel, _extends$2({}, props, {
    mode: "week",
    panelName: "week",
    rowClassName
  }));
}
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
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
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : String(i);
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}
function YearPanel(props) {
  var prefixCls = props.prefixCls, locale2 = props.locale, generateConfig2 = props.generateConfig, pickerValue = props.pickerValue, disabledDate = props.disabledDate, onPickerValueChange = props.onPickerValueChange, onModeChange = props.onModeChange;
  var panelPrefixCls = "".concat(prefixCls, "-year-panel");
  var _useInfo = useInfo(props, "year"), _useInfo2 = _slicedToArray$1(_useInfo, 1), info = _useInfo2[0];
  var getStartYear = function getStartYear2(date) {
    var startYear = Math.floor(generateConfig2.getYear(date) / 10) * 10;
    return generateConfig2.setYear(date, startYear);
  };
  var getEndYear = function getEndYear2(date) {
    var startYear = getStartYear(date);
    return generateConfig2.addYear(startYear, 9);
  };
  var startYearDate = getStartYear(pickerValue);
  var endYearDate = getEndYear(pickerValue);
  var baseDate = generateConfig2.addYear(startYearDate, -1);
  var getCellDate = function getCellDate2(date, offset) {
    return generateConfig2.addYear(date, offset);
  };
  var getCellText = function getCellText2(date) {
    return formatValue(date, {
      locale: locale2,
      format: locale2.cellYearFormat,
      generateConfig: generateConfig2
    });
  };
  var getCellClassName = function getCellClassName2(date) {
    return _defineProperty$1({}, "".concat(prefixCls, "-cell-in-view"), isSameYear(generateConfig2, date, startYearDate) || isSameYear(generateConfig2, date, endYearDate) || isInRange(generateConfig2, startYearDate, endYearDate, date));
  };
  var mergedDisabledDate = disabledDate ? function(currentDate, disabledInfo) {
    var startMonth = generateConfig2.setMonth(currentDate, 0);
    var startDate = generateConfig2.setDate(startMonth, 1);
    var endMonth = generateConfig2.addYear(startDate, 1);
    var endDate = generateConfig2.addDate(endMonth, -1);
    return disabledDate(startDate, disabledInfo) && disabledDate(endDate, disabledInfo);
  } : null;
  var yearNode = /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    key: "decade",
    "aria-label": locale2.decadeSelect,
    onClick: function onClick() {
      onModeChange("decade");
    },
    tabIndex: -1,
    className: "".concat(prefixCls, "-decade-btn")
  }, formatValue(startYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }), "-", formatValue(endYearDate, {
    locale: locale2,
    format: locale2.yearFormat,
    generateConfig: generateConfig2
  }));
  return /* @__PURE__ */ reactExports.createElement(PanelContext.Provider, {
    value: info
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: panelPrefixCls
  }, /* @__PURE__ */ reactExports.createElement(PanelHeader, {
    superOffset: function superOffset(distance) {
      return generateConfig2.addYear(pickerValue, distance * 10);
    },
    onChange: onPickerValueChange,
    getStart: getStartYear,
    getEnd: getEndYear
  }, yearNode), /* @__PURE__ */ reactExports.createElement(PanelBody, _extends$1({}, props, {
    disabledDate: mergedDisabledDate,
    titleFormat: locale2.fieldYearFormat,
    colNum: 3,
    rowNum: 4,
    baseDate,
    getCellDate,
    getCellText,
    getCellClassName
  }))));
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
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
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
var DefaultComponents = {
  date: DatePanel,
  datetime: DateTimePanel,
  week: WeekPanel,
  month: MonthPanel,
  quarter: QuarterPanel,
  year: YearPanel,
  decade: DecadePanel,
  time: TimePanel
};
function PickerPanel(props, ref) {
  var panelClassNames = props.classNames, panelStyles = props.styles, locale2 = props.locale, generateConfig2 = props.generateConfig, direction = props.direction, prefixCls = props.prefixCls, _props$tabIndex = props.tabIndex, tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex, multiple = props.multiple, defaultValue = props.defaultValue, value = props.value, onChange = props.onChange, onSelect = props.onSelect, defaultPickerValue = props.defaultPickerValue, pickerValue = props.pickerValue, onPickerValueChange = props.onPickerValueChange, mode = props.mode, onPanelChange = props.onPanelChange, _props$picker = props.picker, picker = _props$picker === void 0 ? "date" : _props$picker, showTime = props.showTime, hoverValue = props.hoverValue, hoverRangeValue = props.hoverRangeValue, cellRender = props.cellRender, dateRender = props.dateRender, monthCellRender = props.monthCellRender, _props$components = props.components, components = _props$components === void 0 ? {} : _props$components, hideHeader = props.hideHeader;
  var _ref = reactExports.useContext(PickerContext) || {}, contextPrefixCls = _ref.prefixCls, pickerClassNames = _ref.classNames, pickerStyles = _ref.styles;
  var mergedPrefixCls = contextPrefixCls || prefixCls || "rc-picker";
  var rootRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    return {
      nativeElement: rootRef.current
    };
  });
  var _getTimeProps = getTimeProps(props), _getTimeProps2 = _slicedToArray(_getTimeProps, 4), timeProps = _getTimeProps2[0], localeTimeProps = _getTimeProps2[1], showTimeFormat = _getTimeProps2[2], propFormat = _getTimeProps2[3];
  var filledLocale = useLocale(locale2, localeTimeProps);
  var internalPicker = picker === "date" && showTime ? "datetime" : picker;
  var mergedShowTime = reactExports.useMemo(function() {
    return fillShowTimeConfig(internalPicker, showTimeFormat, propFormat, timeProps, filledLocale);
  }, [internalPicker, showTimeFormat, propFormat, timeProps, filledLocale]);
  var now = generateConfig2.getNow();
  var _useControlledState = useControlledState(picker || "date", mode), _useControlledState2 = _slicedToArray(_useControlledState, 2), mergedMode = _useControlledState2[0], setMergedMode = _useControlledState2[1];
  var internalMode = mergedMode === "date" && mergedShowTime ? "datetime" : mergedMode;
  var toggleDates = useToggleDates(generateConfig2, locale2, internalPicker);
  var _useControlledState3 = useControlledState(defaultValue, value), _useControlledState4 = _slicedToArray(_useControlledState3, 2), innerValue = _useControlledState4[0], setMergedValue = _useControlledState4[1];
  var mergedValue = reactExports.useMemo(function() {
    var values = toArray(innerValue).filter(function(val) {
      return val;
    });
    return multiple ? values : values.slice(0, 1);
  }, [innerValue, multiple]);
  var triggerChange = useEvent(function(nextValue) {
    setMergedValue(nextValue);
    if (onChange && (nextValue === null || mergedValue.length !== nextValue.length || mergedValue.some(function(ori, index) {
      return !isSame(generateConfig2, locale2, ori, nextValue[index], internalPicker);
    }))) {
      onChange === null || onChange === void 0 || onChange(multiple ? nextValue : nextValue[0]);
    }
  });
  var onInternalSelect = useEvent(function(newDate) {
    onSelect === null || onSelect === void 0 || onSelect(newDate);
    if (mergedMode === picker) {
      var nextValues = multiple ? toggleDates(mergedValue, newDate) : [newDate];
      triggerChange(nextValues);
    }
  });
  var _useControlledState5 = useControlledState(defaultPickerValue || mergedValue[0] || now, pickerValue), _useControlledState6 = _slicedToArray(_useControlledState5, 2), mergedPickerValue = _useControlledState6[0], setInternalPickerValue = _useControlledState6[1];
  reactExports.useEffect(function() {
    if (mergedValue[0] && !pickerValue) {
      setInternalPickerValue(mergedValue[0]);
    }
  }, [mergedValue[0]]);
  var triggerPanelChange = function triggerPanelChange2(viewDate, nextMode) {
    onPanelChange === null || onPanelChange === void 0 || onPanelChange(viewDate || pickerValue, nextMode || mergedMode);
  };
  var setPickerValue = function setPickerValue2(nextPickerValue) {
    var triggerPanelEvent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    setInternalPickerValue(nextPickerValue);
    onPickerValueChange === null || onPickerValueChange === void 0 || onPickerValueChange(nextPickerValue);
    if (triggerPanelEvent) {
      triggerPanelChange(nextPickerValue);
    }
  };
  var triggerModeChange = function triggerModeChange2(nextMode, viewDate) {
    setMergedMode(nextMode);
    if (viewDate) {
      setPickerValue(viewDate);
    }
    triggerPanelChange(viewDate, nextMode);
  };
  var onPanelValueSelect = function onPanelValueSelect2(nextValue) {
    onInternalSelect(nextValue);
    setPickerValue(nextValue);
    if (mergedMode !== picker) {
      var decadeYearQueue = ["decade", "year"];
      var decadeYearMonthQueue = [].concat(decadeYearQueue, ["month"]);
      var pickerQueue = {
        quarter: [].concat(decadeYearQueue, ["quarter"]),
        week: [].concat(_toConsumableArray(decadeYearMonthQueue), ["week"]),
        date: [].concat(_toConsumableArray(decadeYearMonthQueue), ["date"])
      };
      var queue = pickerQueue[picker] || decadeYearMonthQueue;
      var index = queue.indexOf(mergedMode);
      var nextMode = queue[index + 1];
      if (nextMode) {
        triggerModeChange(nextMode, nextValue);
      }
    }
  };
  var hoverRangeDate = reactExports.useMemo(function() {
    var start;
    var end;
    if (Array.isArray(hoverRangeValue)) {
      var _hoverRangeValue = _slicedToArray(hoverRangeValue, 2);
      start = _hoverRangeValue[0];
      end = _hoverRangeValue[1];
    } else {
      start = hoverRangeValue;
    }
    if (!start && !end) {
      return null;
    }
    start = start || end;
    end = end || start;
    return generateConfig2.isAfter(start, end) ? [end, start] : [start, end];
  }, [hoverRangeValue, generateConfig2]);
  var onInternalCellRender = useCellRender(cellRender, dateRender, monthCellRender);
  var PanelComponent = components[internalMode] || DefaultComponents[internalMode] || DatePanel;
  var sharedPanelContext = reactExports.useMemo(function() {
    var _ref2, _pickerClassNames$pop, _ref3, _pickerStyles$popup;
    return {
      classNames: (_ref2 = (_pickerClassNames$pop = pickerClassNames === null || pickerClassNames === void 0 ? void 0 : pickerClassNames.popup) !== null && _pickerClassNames$pop !== void 0 ? _pickerClassNames$pop : panelClassNames) !== null && _ref2 !== void 0 ? _ref2 : {},
      styles: (_ref3 = (_pickerStyles$popup = pickerStyles === null || pickerStyles === void 0 ? void 0 : pickerStyles.popup) !== null && _pickerStyles$popup !== void 0 ? _pickerStyles$popup : panelStyles) !== null && _ref3 !== void 0 ? _ref3 : {}
    };
  }, [pickerClassNames, panelClassNames, pickerStyles, panelStyles]);
  var parentHackContext = reactExports.useContext(PickerHackContext);
  var pickerPanelContext = reactExports.useMemo(function() {
    return _objectSpread(_objectSpread({}, parentHackContext), {}, {
      hideHeader
    });
  }, [parentHackContext, hideHeader]);
  var panelCls = "".concat(mergedPrefixCls, "-panel");
  var panelProps = pickProps(props, [
    // Week
    "showWeek",
    // Icons
    "prevIcon",
    "nextIcon",
    "superPrevIcon",
    "superNextIcon",
    // Disabled
    "disabledDate",
    "minDate",
    "maxDate",
    // Hover
    "onHover"
  ]);
  return /* @__PURE__ */ reactExports.createElement(SharedPanelContext.Provider, {
    value: sharedPanelContext
  }, /* @__PURE__ */ reactExports.createElement(PickerHackContext.Provider, {
    value: pickerPanelContext
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: rootRef,
    tabIndex,
    className: clsx(panelCls, _defineProperty({}, "".concat(panelCls, "-rtl"), direction === "rtl"))
  }, /* @__PURE__ */ reactExports.createElement(PanelComponent, _extends({}, panelProps, {
    // Time
    showTime: mergedShowTime,
    prefixCls: mergedPrefixCls,
    locale: filledLocale,
    generateConfig: generateConfig2,
    onModeChange: triggerModeChange,
    pickerValue: mergedPickerValue,
    onPickerValueChange: function onPickerValueChange2(nextPickerValue) {
      setPickerValue(nextPickerValue, true);
    },
    value: mergedValue[0],
    onSelect: onPanelValueSelect,
    values: mergedValue,
    cellRender: onInternalCellRender,
    hoverRangeValue: hoverRangeDate,
    hoverValue
  })))));
}
var RefPanelPicker = /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef(PickerPanel));
export {
  RefPanelPicker as R,
  generateConfig as g,
  locale as l
};
