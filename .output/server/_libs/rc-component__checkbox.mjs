import { k as useControlledState } from "./rc-component__util.mjs";
import { c as clsx } from "./clsx.mjs";
import { r as reactExports } from "./react.mjs";
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
const Checkbox = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls = "rc-checkbox",
    className,
    style,
    checked,
    disabled,
    defaultChecked = false,
    type = "checkbox",
    title,
    onChange,
    ...inputProps
  } = props;
  const inputRef = reactExports.useRef(null);
  const holderRef = reactExports.useRef(null);
  const [rawValue, setRawValue] = useControlledState(defaultChecked, checked);
  reactExports.useImperativeHandle(ref, () => ({
    focus: (options) => {
      inputRef.current?.focus(options);
    },
    blur: () => {
      inputRef.current?.blur();
    },
    input: inputRef.current,
    nativeElement: holderRef.current
  }));
  const classString = clsx(prefixCls, className, {
    [`${prefixCls}-checked`]: rawValue,
    [`${prefixCls}-disabled`]: disabled
  });
  const handleChange = (e) => {
    if (disabled) {
      return;
    }
    if (!("checked" in props)) {
      setRawValue(e.target.checked);
    }
    onChange?.({
      target: {
        ...props,
        type,
        checked: e.target.checked
      },
      stopPropagation() {
        e.stopPropagation();
      },
      preventDefault() {
        e.preventDefault();
      },
      nativeEvent: e.nativeEvent
    });
  };
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classString,
    title,
    style,
    ref: holderRef
  }, /* @__PURE__ */ reactExports.createElement("input", _extends({}, inputProps, {
    className: `${prefixCls}-input`,
    ref: inputRef,
    onChange: handleChange,
    disabled,
    checked: !!rawValue,
    type
  })));
});
export {
  Checkbox as C
};
