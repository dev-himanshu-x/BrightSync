import { r as reactExports, a as React } from "./react.mjs";
import { r as reactDomExports } from "./react-dom.mjs";
import { c as clsx } from "./clsx.mjs";
import { a as CSSMotionList } from "./rc-component__motion.mjs";
import { p as pickAttrs, K as KeyCode, b as useEvent } from "./rc-component__util.mjs";
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
const Notify = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls,
    style,
    className,
    duration = 4.5,
    showProgress,
    pauseOnHover = true,
    eventKey,
    content,
    closable,
    props: divProps,
    onClick,
    onNoticeClose,
    times,
    hovering: forcedHovering
  } = props;
  const [hovering, setHovering] = reactExports.useState(false);
  const [percent, setPercent] = reactExports.useState(0);
  const [spentTime, setSpentTime] = reactExports.useState(0);
  const mergedHovering = forcedHovering || hovering;
  const mergedDuration = typeof duration === "number" ? duration : 0;
  const mergedShowProgress = mergedDuration > 0 && showProgress;
  const onInternalClose = () => {
    onNoticeClose(eventKey);
  };
  const onCloseKeyDown = (e) => {
    if (e.key === "Enter" || e.code === "Enter" || e.keyCode === KeyCode.ENTER) {
      onInternalClose();
    }
  };
  reactExports.useEffect(() => {
    if (!mergedHovering && mergedDuration > 0) {
      const start = Date.now() - spentTime;
      const timeout = setTimeout(() => {
        onInternalClose();
      }, mergedDuration * 1e3 - spentTime);
      return () => {
        if (pauseOnHover) {
          clearTimeout(timeout);
        }
        setSpentTime(Date.now() - start);
      };
    }
  }, [mergedDuration, mergedHovering, times]);
  reactExports.useEffect(() => {
    if (!mergedHovering && mergedShowProgress && (pauseOnHover || spentTime === 0)) {
      const start = performance.now();
      let animationFrame;
      const calculate = () => {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame((timestamp) => {
          const runtime = timestamp + spentTime - start;
          const progress = Math.min(runtime / (mergedDuration * 1e3), 1);
          setPercent(progress * 100);
          if (progress < 1) {
            calculate();
          }
        });
      };
      calculate();
      return () => {
        if (pauseOnHover) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [mergedDuration, spentTime, mergedHovering, mergedShowProgress, times]);
  const closableObj = reactExports.useMemo(() => {
    if (typeof closable === "object" && closable !== null) {
      return closable;
    }
    return {};
  }, [closable]);
  const ariaProps = pickAttrs(closableObj, true);
  const validPercent = 100 - (!percent || percent < 0 ? 0 : percent > 100 ? 100 : percent);
  const noticePrefixCls = `${prefixCls}-notice`;
  return /* @__PURE__ */ reactExports.createElement("div", _extends$1({}, divProps, {
    ref,
    className: clsx(noticePrefixCls, className, {
      [`${noticePrefixCls}-closable`]: closable
    }),
    style,
    onMouseEnter: (e) => {
      setHovering(true);
      divProps?.onMouseEnter?.(e);
    },
    onMouseLeave: (e) => {
      setHovering(false);
      divProps?.onMouseLeave?.(e);
    },
    onClick
  }), /* @__PURE__ */ reactExports.createElement("div", {
    className: `${noticePrefixCls}-content`
  }, content), closable && /* @__PURE__ */ reactExports.createElement("button", _extends$1({
    className: `${noticePrefixCls}-close`,
    onKeyDown: onCloseKeyDown,
    "aria-label": "Close"
  }, ariaProps, {
    onClick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      onInternalClose();
    }
  }), closableObj.closeIcon ?? "x"), mergedShowProgress && /* @__PURE__ */ reactExports.createElement("progress", {
    className: `${noticePrefixCls}-progress`,
    max: "100",
    value: validPercent
  }, validPercent + "%"));
});
const NotificationContext = /* @__PURE__ */ React.createContext({});
const NotificationProvider = ({
  children,
  classNames
}) => {
  return /* @__PURE__ */ React.createElement(NotificationContext.Provider, {
    value: {
      classNames
    }
  }, children);
};
const DEFAULT_OFFSET = 8;
const DEFAULT_THRESHOLD = 3;
const DEFAULT_GAP = 16;
const useStack = (config) => {
  const result = {
    offset: DEFAULT_OFFSET,
    threshold: DEFAULT_THRESHOLD,
    gap: DEFAULT_GAP
  };
  if (config && typeof config === "object") {
    result.offset = config.offset ?? DEFAULT_OFFSET;
    result.threshold = config.threshold ?? DEFAULT_THRESHOLD;
    result.gap = config.gap ?? DEFAULT_GAP;
  }
  return [!!config, result];
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
const NoticeList = (props) => {
  const {
    configList,
    placement,
    prefixCls,
    className,
    style,
    motion,
    onAllNoticeRemoved,
    onNoticeClose,
    stack: stackConfig
  } = props;
  const {
    classNames: ctxCls
  } = reactExports.useContext(NotificationContext);
  const dictRef = reactExports.useRef({});
  const [latestNotice, setLatestNotice] = reactExports.useState(null);
  const [hoverKeys, setHoverKeys] = reactExports.useState([]);
  const keys = configList.map((config) => ({
    config,
    key: String(config.key)
  }));
  const [stack, {
    offset,
    threshold,
    gap
  }] = useStack(stackConfig);
  const expanded = stack && (hoverKeys.length > 0 || keys.length <= threshold);
  const placementMotion = typeof motion === "function" ? motion(placement) : motion;
  reactExports.useEffect(() => {
    if (stack && hoverKeys.length > 1) {
      setHoverKeys((prev) => prev.filter((key) => keys.some(({
        key: dataKey
      }) => key === dataKey)));
    }
  }, [hoverKeys, keys, stack]);
  reactExports.useEffect(() => {
    if (stack && dictRef.current[keys[keys.length - 1]?.key]) {
      setLatestNotice(dictRef.current[keys[keys.length - 1]?.key]);
    }
  }, [keys, stack]);
  return /* @__PURE__ */ React.createElement(CSSMotionList, _extends({
    key: placement,
    className: clsx(prefixCls, `${prefixCls}-${placement}`, ctxCls?.list, className, {
      [`${prefixCls}-stack`]: !!stack,
      [`${prefixCls}-stack-expanded`]: expanded
    }),
    style,
    keys,
    motionAppear: true
  }, placementMotion, {
    onAllRemoved: () => {
      onAllNoticeRemoved(placement);
    }
  }), ({
    config,
    className: motionClassName,
    style: motionStyle,
    index: motionIndex
  }, nodeRef) => {
    const {
      key,
      times
    } = config;
    const strKey = String(key);
    const {
      className: configClassName,
      style: configStyle,
      classNames: configClassNames,
      styles: configStyles,
      ...restConfig
    } = config;
    const dataIndex = keys.findIndex((item) => item.key === strKey);
    const stackStyle = {};
    if (stack) {
      const index = keys.length - 1 - (dataIndex > -1 ? dataIndex : motionIndex - 1);
      const transformX = placement === "top" || placement === "bottom" ? "-50%" : "0";
      if (index > 0) {
        stackStyle.height = expanded ? dictRef.current[strKey]?.offsetHeight : latestNotice?.offsetHeight;
        let verticalOffset = 0;
        for (let i = 0; i < index; i++) {
          verticalOffset += dictRef.current[keys[keys.length - 1 - i].key]?.offsetHeight + gap;
        }
        const transformY = (expanded ? verticalOffset : index * offset) * (placement.startsWith("top") ? 1 : -1);
        const scaleX = !expanded && latestNotice?.offsetWidth && dictRef.current[strKey]?.offsetWidth ? (latestNotice?.offsetWidth - offset * 2 * (index < 3 ? index : 3)) / dictRef.current[strKey]?.offsetWidth : 1;
        stackStyle.transform = `translate3d(${transformX}, ${transformY}px, 0) scaleX(${scaleX})`;
      } else {
        stackStyle.transform = `translate3d(${transformX}, 0, 0)`;
      }
    }
    return /* @__PURE__ */ React.createElement("div", {
      ref: nodeRef,
      className: clsx(`${prefixCls}-notice-wrapper`, motionClassName, configClassNames?.wrapper),
      style: {
        ...motionStyle,
        ...stackStyle,
        ...configStyles?.wrapper
      },
      onMouseEnter: () => setHoverKeys((prev) => prev.includes(strKey) ? prev : [...prev, strKey]),
      onMouseLeave: () => setHoverKeys((prev) => prev.filter((k) => k !== strKey))
    }, /* @__PURE__ */ React.createElement(Notify, _extends({}, restConfig, {
      ref: (node) => {
        if (dataIndex > -1) {
          dictRef.current[strKey] = node;
        } else {
          delete dictRef.current[strKey];
        }
      },
      prefixCls,
      classNames: configClassNames,
      styles: configStyles,
      className: clsx(configClassName, ctxCls?.notice),
      style: configStyle,
      times,
      key,
      eventKey: key,
      onNoticeClose,
      hovering: stack && hoverKeys.length > 0
    })));
  });
};
const Notifications = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls = "rc-notification",
    container,
    motion,
    maxCount,
    className,
    style,
    onAllRemoved,
    stack,
    renderNotifications
  } = props;
  const [configList, setConfigList] = reactExports.useState([]);
  const onNoticeClose = (key) => {
    const config = configList.find((item) => item.key === key);
    const closable = config?.closable;
    const closableObj = closable && typeof closable === "object" ? closable : {};
    const {
      onClose: closableOnClose
    } = closableObj;
    closableOnClose?.();
    config?.onClose?.();
    setConfigList((list) => list.filter((item) => item.key !== key));
  };
  reactExports.useImperativeHandle(ref, () => ({
    open: (config) => {
      setConfigList((list) => {
        let clone = [...list];
        const index = clone.findIndex((item) => item.key === config.key);
        const innerConfig = {
          ...config
        };
        if (index >= 0) {
          innerConfig.times = (list[index]?.times || 0) + 1;
          clone[index] = innerConfig;
        } else {
          innerConfig.times = 0;
          clone.push(innerConfig);
        }
        if (maxCount > 0 && clone.length > maxCount) {
          clone = clone.slice(-maxCount);
        }
        return clone;
      });
    },
    close: (key) => {
      onNoticeClose(key);
    },
    destroy: () => {
      setConfigList([]);
    }
  }));
  const [placements, setPlacements] = reactExports.useState({});
  reactExports.useEffect(() => {
    const nextPlacements = {};
    configList.forEach((config) => {
      const {
        placement = "topRight"
      } = config;
      if (placement) {
        nextPlacements[placement] = nextPlacements[placement] || [];
        nextPlacements[placement].push(config);
      }
    });
    Object.keys(placements).forEach((placement) => {
      nextPlacements[placement] = nextPlacements[placement] || [];
    });
    setPlacements(nextPlacements);
  }, [configList]);
  const onAllNoticeRemoved = (placement) => {
    setPlacements((originPlacements) => {
      const clone = {
        ...originPlacements
      };
      const list = clone[placement] || [];
      if (!list.length) {
        delete clone[placement];
      }
      return clone;
    });
  };
  const emptyRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (Object.keys(placements).length > 0) {
      emptyRef.current = true;
    } else if (emptyRef.current) {
      onAllRemoved?.();
      emptyRef.current = false;
    }
  }, [placements]);
  if (!container) {
    return null;
  }
  const placementList = Object.keys(placements);
  return /* @__PURE__ */ reactDomExports.createPortal(/* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, placementList.map((placement) => {
    const placementConfigList = placements[placement];
    const list = /* @__PURE__ */ reactExports.createElement(NoticeList, {
      key: placement,
      configList: placementConfigList,
      placement,
      prefixCls,
      className: className?.(placement),
      style: style?.(placement),
      motion,
      onNoticeClose,
      onAllNoticeRemoved,
      stack
    });
    return renderNotifications ? renderNotifications(list, {
      prefixCls,
      key: placement
    }) : list;
  })), container);
});
const defaultGetContainer = () => document.body;
let uniqueKey = 0;
function mergeConfig(...objList) {
  const clone = {};
  objList.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (val !== void 0) {
          clone[key] = val;
        }
      });
    }
  });
  return clone;
}
function useNotification(rootConfig = {}) {
  const {
    getContainer = defaultGetContainer,
    motion,
    prefixCls,
    maxCount,
    className,
    style,
    onAllRemoved,
    stack,
    renderNotifications,
    ...shareConfig
  } = rootConfig;
  const [container, setContainer] = reactExports.useState();
  const notificationsRef = reactExports.useRef();
  const contextHolder = /* @__PURE__ */ reactExports.createElement(Notifications, {
    container,
    ref: notificationsRef,
    prefixCls,
    motion,
    maxCount,
    className,
    style,
    onAllRemoved,
    stack,
    renderNotifications
  });
  const [taskQueue, setTaskQueue] = reactExports.useState([]);
  const open = useEvent((config) => {
    const mergedConfig = mergeConfig(shareConfig, config);
    if (mergedConfig.key === null || mergedConfig.key === void 0) {
      mergedConfig.key = `rc-notification-${uniqueKey}`;
      uniqueKey += 1;
    }
    setTaskQueue((queue) => [...queue, {
      type: "open",
      config: mergedConfig
    }]);
  });
  const api = reactExports.useMemo(() => ({
    open,
    close: (key) => {
      setTaskQueue((queue) => [...queue, {
        type: "close",
        key
      }]);
    },
    destroy: () => {
      setTaskQueue((queue) => [...queue, {
        type: "destroy"
      }]);
    }
  }), []);
  reactExports.useEffect(() => {
    setContainer(getContainer());
  });
  reactExports.useEffect(() => {
    if (notificationsRef.current && taskQueue.length) {
      taskQueue.forEach((task) => {
        switch (task.type) {
          case "open":
            notificationsRef.current.open(task.config);
            break;
          case "close":
            notificationsRef.current.close(task.key);
            break;
          case "destroy":
            notificationsRef.current.destroy();
            break;
        }
      });
      let oriTaskQueue;
      let tgtTaskQueue;
      setTaskQueue((oriQueue) => {
        if (oriTaskQueue !== oriQueue || !tgtTaskQueue) {
          oriTaskQueue = oriQueue;
          tgtTaskQueue = oriQueue.filter((task) => !taskQueue.includes(task));
        }
        return tgtTaskQueue;
      });
    }
  }, [taskQueue]);
  return [api, contextHolder];
}
export {
  Notify as N,
  NotificationProvider as a,
  useNotification as u
};
