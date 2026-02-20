import { r as reactExports } from "./react.mjs";
import { j as canUseDom, w as wrapperRaf, h as useSafeState, D as useSyncState, b as useEvent, s as supportRef, g as getNodeRef, l as getDOM } from "./rc-component__util.mjs";
import { c as clsx } from "./clsx.mjs";
const Context = /* @__PURE__ */ reactExports.createContext({});
function MotionProvider({
  children,
  ...props
}) {
  return /* @__PURE__ */ reactExports.createElement(Context.Provider, {
    value: props
  }, children);
}
const STATUS_NONE = "none";
const STATUS_APPEAR = "appear";
const STATUS_ENTER = "enter";
const STATUS_LEAVE = "leave";
const STEP_NONE = "none";
const STEP_PREPARE = "prepare";
const STEP_START = "start";
const STEP_ACTIVE = "active";
const STEP_ACTIVATED = "end";
const STEP_PREPARED = "prepared";
function makePrefixMap(styleProp, eventName) {
  const prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes[`Webkit${styleProp}`] = `webkit${eventName}`;
  prefixes[`Moz${styleProp}`] = `moz${eventName}`;
  prefixes[`ms${styleProp}`] = `MS${eventName}`;
  prefixes[`O${styleProp}`] = `o${eventName.toLowerCase()}`;
  return prefixes;
}
function getVendorPrefixes(domSupport, win) {
  const prefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  };
  if (domSupport) {
    if (!("AnimationEvent" in win)) {
      delete prefixes.animationend.animation;
    }
    if (!("TransitionEvent" in win)) {
      delete prefixes.transitionend.transition;
    }
  }
  return prefixes;
}
const vendorPrefixes = getVendorPrefixes(canUseDom(), typeof window !== "undefined" ? window : {});
let style = {};
if (canUseDom()) {
  ({
    style
  } = document.createElement("div"));
}
const prefixedEventNames = {};
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) {
    return prefixedEventNames[eventName];
  }
  const prefixMap = vendorPrefixes[eventName];
  if (prefixMap) {
    const stylePropList = Object.keys(prefixMap);
    const len = stylePropList.length;
    for (let i = 0; i < len; i += 1) {
      const styleProp = stylePropList[i];
      if (Object.prototype.hasOwnProperty.call(prefixMap, styleProp) && styleProp in style) {
        prefixedEventNames[eventName] = prefixMap[styleProp];
        return prefixedEventNames[eventName];
      }
    }
  }
  return "";
}
const internalAnimationEndName = getVendorPrefixedEventName("animationend");
const internalTransitionEndName = getVendorPrefixedEventName("transitionend");
const supportTransition = !!(internalAnimationEndName && internalTransitionEndName);
const animationEndName = internalAnimationEndName || "animationend";
const transitionEndName = internalTransitionEndName || "transitionend";
function getTransitionName(transitionName, transitionType) {
  if (!transitionName) return null;
  if (typeof transitionName === "object") {
    const type = transitionType.replace(/-\w/g, (match) => match[1].toUpperCase());
    return transitionName[type];
  }
  return `${transitionName}-${transitionType}`;
}
const useDomMotionEvents = ((onInternalMotionEnd) => {
  const cacheElementRef = reactExports.useRef();
  function removeMotionEvents(element) {
    if (element) {
      element.removeEventListener(transitionEndName, onInternalMotionEnd);
      element.removeEventListener(animationEndName, onInternalMotionEnd);
    }
  }
  function patchMotionEvents(element) {
    if (cacheElementRef.current && cacheElementRef.current !== element) {
      removeMotionEvents(cacheElementRef.current);
    }
    if (element && element !== cacheElementRef.current) {
      element.addEventListener(transitionEndName, onInternalMotionEnd);
      element.addEventListener(animationEndName, onInternalMotionEnd);
      cacheElementRef.current = element;
    }
  }
  reactExports.useEffect(() => () => {
    removeMotionEvents(cacheElementRef.current);
    cacheElementRef.current = null;
  }, []);
  return [patchMotionEvents, removeMotionEvents];
});
const useIsomorphicLayoutEffect = canUseDom() ? reactExports.useLayoutEffect : reactExports.useEffect;
const useNextFrame = (() => {
  const nextFrameRef = reactExports.useRef(null);
  function cancelNextFrame() {
    wrapperRaf.cancel(nextFrameRef.current);
  }
  function nextFrame(callback, delay = 2) {
    cancelNextFrame();
    const nextFrameId = wrapperRaf(() => {
      if (delay <= 1) {
        callback({
          isCanceled: () => nextFrameId !== nextFrameRef.current
        });
      } else {
        nextFrame(callback, delay - 1);
      }
    });
    nextFrameRef.current = nextFrameId;
  }
  reactExports.useEffect(() => () => {
    cancelNextFrame();
  }, []);
  return [nextFrame, cancelNextFrame];
});
const FULL_STEP_QUEUE = [STEP_PREPARE, STEP_START, STEP_ACTIVE, STEP_ACTIVATED];
const SIMPLE_STEP_QUEUE = [STEP_PREPARE, STEP_PREPARED];
const SkipStep = false;
const DoStep = true;
function isActive(step) {
  return step === STEP_ACTIVE || step === STEP_ACTIVATED;
}
const useStepQueue = ((status, prepareOnly, callback) => {
  const [step, setStep] = useSafeState(STEP_NONE);
  const [nextFrame, cancelNextFrame] = useNextFrame();
  function startQueue() {
    setStep(STEP_PREPARE, true);
  }
  const STEP_QUEUE = prepareOnly ? SIMPLE_STEP_QUEUE : FULL_STEP_QUEUE;
  useIsomorphicLayoutEffect(() => {
    if (step !== STEP_NONE && step !== STEP_ACTIVATED) {
      const index = STEP_QUEUE.indexOf(step);
      const nextStep = STEP_QUEUE[index + 1];
      const result = callback(step);
      if (result === SkipStep) {
        setStep(nextStep, true);
      } else if (nextStep) {
        nextFrame((info) => {
          function doNext() {
            if (info.isCanceled()) return;
            setStep(nextStep, true);
          }
          if (result === true) {
            doNext();
          } else {
            Promise.resolve(result).then(doNext);
          }
        });
      }
    }
  }, [status, step]);
  reactExports.useEffect(() => () => {
    cancelNextFrame();
  }, []);
  return [startQueue, step];
});
function useStatus(supportMotion, visible, getElement, {
  motionEnter = true,
  motionAppear = true,
  motionLeave = true,
  motionDeadline,
  motionLeaveImmediately,
  onAppearPrepare,
  onEnterPrepare,
  onLeavePrepare,
  onAppearStart,
  onEnterStart,
  onLeaveStart,
  onAppearActive,
  onEnterActive,
  onLeaveActive,
  onAppearEnd,
  onEnterEnd,
  onLeaveEnd,
  onVisibleChanged
}) {
  const [asyncVisible, setAsyncVisible] = useSafeState();
  const [getStatus, setStatus] = useSyncState(STATUS_NONE);
  const [style2, setStyle] = useSafeState(null);
  const currentStatus = getStatus();
  const mountedRef = reactExports.useRef(false);
  const deadlineRef = reactExports.useRef(null);
  function getDomElement() {
    return getElement();
  }
  const activeRef = reactExports.useRef(false);
  function updateMotionEndStatus() {
    setStatus(STATUS_NONE);
    setStyle(null, true);
  }
  const onInternalMotionEnd = useEvent((event) => {
    const status = getStatus();
    if (status === STATUS_NONE) {
      return;
    }
    const element = getDomElement();
    if (event && !event.deadline && event.target !== element) {
      return;
    }
    const currentActive = activeRef.current;
    let canEnd;
    if (status === STATUS_APPEAR && currentActive) {
      canEnd = onAppearEnd?.(element, event);
    } else if (status === STATUS_ENTER && currentActive) {
      canEnd = onEnterEnd?.(element, event);
    } else if (status === STATUS_LEAVE && currentActive) {
      canEnd = onLeaveEnd?.(element, event);
    }
    if (currentActive && canEnd !== false) {
      updateMotionEndStatus();
    }
  });
  const [patchMotionEvents] = useDomMotionEvents(onInternalMotionEnd);
  const getEventHandlers = (targetStatus) => {
    switch (targetStatus) {
      case STATUS_APPEAR:
        return {
          [STEP_PREPARE]: onAppearPrepare,
          [STEP_START]: onAppearStart,
          [STEP_ACTIVE]: onAppearActive
        };
      case STATUS_ENTER:
        return {
          [STEP_PREPARE]: onEnterPrepare,
          [STEP_START]: onEnterStart,
          [STEP_ACTIVE]: onEnterActive
        };
      case STATUS_LEAVE:
        return {
          [STEP_PREPARE]: onLeavePrepare,
          [STEP_START]: onLeaveStart,
          [STEP_ACTIVE]: onLeaveActive
        };
      default:
        return {};
    }
  };
  const eventHandlers = reactExports.useMemo(() => getEventHandlers(currentStatus), [currentStatus]);
  const [startStep, step] = useStepQueue(currentStatus, !supportMotion, (newStep) => {
    if (newStep === STEP_PREPARE) {
      const onPrepare = eventHandlers[STEP_PREPARE];
      if (!onPrepare) {
        return SkipStep;
      }
      return onPrepare(getDomElement());
    }
    if (step in eventHandlers) {
      setStyle(eventHandlers[step]?.(getDomElement(), null) || null);
    }
    if (step === STEP_ACTIVE && currentStatus !== STATUS_NONE) {
      patchMotionEvents(getDomElement());
      if (motionDeadline > 0) {
        clearTimeout(deadlineRef.current);
        deadlineRef.current = setTimeout(() => {
          onInternalMotionEnd({
            deadline: true
          });
        }, motionDeadline);
      }
    }
    if (step === STEP_PREPARED) {
      updateMotionEndStatus();
    }
    return DoStep;
  });
  const active = isActive(step);
  activeRef.current = active;
  const visibleRef = reactExports.useRef(null);
  useIsomorphicLayoutEffect(() => {
    if (mountedRef.current && visibleRef.current === visible) {
      return;
    }
    setAsyncVisible(visible);
    const isMounted = mountedRef.current;
    mountedRef.current = true;
    let nextStatus;
    if (!isMounted && visible && motionAppear) {
      nextStatus = STATUS_APPEAR;
    }
    if (isMounted && visible && motionEnter) {
      nextStatus = STATUS_ENTER;
    }
    if (isMounted && !visible && motionLeave || !isMounted && motionLeaveImmediately && !visible && motionLeave) {
      nextStatus = STATUS_LEAVE;
    }
    const nextEventHandlers = getEventHandlers(nextStatus);
    if (nextStatus && (supportMotion || nextEventHandlers[STEP_PREPARE])) {
      setStatus(nextStatus);
      startStep();
    } else {
      setStatus(STATUS_NONE);
    }
    visibleRef.current = visible;
  }, [visible]);
  reactExports.useEffect(() => {
    if (
      // Cancel appear
      currentStatus === STATUS_APPEAR && !motionAppear || // Cancel enter
      currentStatus === STATUS_ENTER && !motionEnter || // Cancel leave
      currentStatus === STATUS_LEAVE && !motionLeave
    ) {
      setStatus(STATUS_NONE);
    }
  }, [motionAppear, motionEnter, motionLeave]);
  reactExports.useEffect(() => () => {
    mountedRef.current = false;
    clearTimeout(deadlineRef.current);
  }, []);
  const firstMountChangeRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (asyncVisible) {
      firstMountChangeRef.current = true;
    }
    if (asyncVisible !== void 0 && currentStatus === STATUS_NONE) {
      if (firstMountChangeRef.current || asyncVisible) {
        onVisibleChanged?.(asyncVisible);
      }
      firstMountChangeRef.current = true;
    }
  }, [asyncVisible, currentStatus]);
  let mergedStyle = style2;
  if (eventHandlers[STEP_PREPARE] && step === STEP_START) {
    mergedStyle = {
      transition: "none",
      ...mergedStyle
    };
  }
  return [getStatus, step, mergedStyle, asyncVisible ?? visible];
}
function genCSSMotion(config) {
  let transitionSupport = config;
  if (typeof config === "object") {
    ({
      transitionSupport
    } = config);
  }
  function isSupportTransition(props, contextMotion) {
    return !!(props.motionName && transitionSupport && contextMotion !== false);
  }
  const CSSMotion2 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
    const {
      // Default config
      visible = true,
      removeOnLeave = true,
      forceRender,
      children,
      motionName,
      leavedClassName,
      eventProps
    } = props;
    const {
      motion: contextMotion
    } = reactExports.useContext(Context);
    const supportMotion = isSupportTransition(props, contextMotion);
    const nodeRef = reactExports.useRef();
    function getDomElement() {
      return getDOM(nodeRef.current);
    }
    const [getStatus, statusStep, statusStyle, mergedVisible] = useStatus(supportMotion, visible, getDomElement, props);
    const status = getStatus();
    const renderedRef = reactExports.useRef(mergedVisible);
    if (mergedVisible) {
      renderedRef.current = true;
    }
    const refObj = reactExports.useMemo(() => {
      const obj = {};
      Object.defineProperties(obj, {
        nativeElement: {
          enumerable: true,
          get: getDomElement
        },
        inMotion: {
          enumerable: true,
          get: () => () => getStatus() !== STATUS_NONE
        },
        enableMotion: {
          enumerable: true,
          get: () => () => supportMotion
        }
      });
      return obj;
    }, []);
    reactExports.useImperativeHandle(ref, () => refObj, []);
    let motionChildren;
    const mergedProps = {
      ...eventProps,
      visible
    };
    if (!children) {
      motionChildren = null;
    } else if (status === STATUS_NONE) {
      if (mergedVisible) {
        motionChildren = children({
          ...mergedProps
        }, nodeRef);
      } else if (!removeOnLeave && renderedRef.current && leavedClassName) {
        motionChildren = children({
          ...mergedProps,
          className: leavedClassName
        }, nodeRef);
      } else if (forceRender || !removeOnLeave && !leavedClassName) {
        motionChildren = children({
          ...mergedProps,
          style: {
            display: "none"
          }
        }, nodeRef);
      } else {
        motionChildren = null;
      }
    } else {
      let statusSuffix;
      if (statusStep === STEP_PREPARE) {
        statusSuffix = "prepare";
      } else if (isActive(statusStep)) {
        statusSuffix = "active";
      } else if (statusStep === STEP_START) {
        statusSuffix = "start";
      }
      const motionCls = getTransitionName(motionName, `${status}-${statusSuffix}`);
      motionChildren = children({
        ...mergedProps,
        className: clsx(getTransitionName(motionName, status), {
          [motionCls]: motionCls && statusSuffix,
          [motionName]: typeof motionName === "string"
        }),
        style: statusStyle
      }, nodeRef);
    }
    if (/* @__PURE__ */ reactExports.isValidElement(motionChildren) && supportRef(motionChildren)) {
      const originNodeRef = getNodeRef(motionChildren);
      if (!originNodeRef) {
        motionChildren = /* @__PURE__ */ reactExports.cloneElement(motionChildren, {
          ref: nodeRef
        });
      }
    }
    return motionChildren;
  });
  CSSMotion2.displayName = "CSSMotion";
  return CSSMotion2;
}
const CSSMotion = genCSSMotion(supportTransition);
const STATUS_ADD = "add";
const STATUS_KEEP = "keep";
const STATUS_REMOVE = "remove";
const STATUS_REMOVED = "removed";
function wrapKeyToObject(key) {
  let keyObj;
  if (key && typeof key === "object" && "key" in key) {
    keyObj = key;
  } else {
    keyObj = {
      key
    };
  }
  return {
    ...keyObj,
    key: String(keyObj.key)
  };
}
function parseKeys(keys = []) {
  return keys.map(wrapKeyToObject);
}
function diffKeys(prevKeys = [], currentKeys = []) {
  let list = [];
  let currentIndex = 0;
  const currentLen = currentKeys.length;
  const prevKeyObjects = parseKeys(prevKeys);
  const currentKeyObjects = parseKeys(currentKeys);
  prevKeyObjects.forEach((keyObj) => {
    let hit = false;
    for (let i = currentIndex; i < currentLen; i += 1) {
      const currentKeyObj = currentKeyObjects[i];
      if (currentKeyObj.key === keyObj.key) {
        if (currentIndex < i) {
          list = list.concat(currentKeyObjects.slice(currentIndex, i).map((obj) => ({
            ...obj,
            status: STATUS_ADD
          })));
          currentIndex = i;
        }
        list.push({
          ...currentKeyObj,
          status: STATUS_KEEP
        });
        currentIndex += 1;
        hit = true;
        break;
      }
    }
    if (!hit) {
      list.push({
        ...keyObj,
        status: STATUS_REMOVE
      });
    }
  });
  if (currentIndex < currentLen) {
    list = list.concat(currentKeyObjects.slice(currentIndex).map((obj) => ({
      ...obj,
      status: STATUS_ADD
    })));
  }
  const keys = {};
  list.forEach(({
    key
  }) => {
    keys[key] = (keys[key] || 0) + 1;
  });
  const duplicatedKeys = Object.keys(keys).filter((key) => keys[key] > 1);
  duplicatedKeys.forEach((matchKey) => {
    list = list.filter(({
      key,
      status
    }) => key !== matchKey || status !== STATUS_REMOVE);
    list.forEach((node) => {
      if (node.key === matchKey) {
        node.status = STATUS_KEEP;
      }
    });
  });
  return list;
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
const MOTION_PROP_NAMES = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function genCSSMotionList(transitionSupport, CSSMotion$1 = CSSMotion) {
  class CSSMotionList2 extends reactExports.Component {
    static defaultProps = {
      component: "div"
    };
    state = {
      keyEntities: []
    };
    static getDerivedStateFromProps({
      keys
    }, {
      keyEntities
    }) {
      const parsedKeyObjects = parseKeys(keys);
      const mixedKeyEntities = diffKeys(keyEntities, parsedKeyObjects);
      return {
        keyEntities: mixedKeyEntities.filter((entity) => {
          const prevEntity = keyEntities.find(({
            key
          }) => entity.key === key);
          if (prevEntity && prevEntity.status === STATUS_REMOVED && entity.status === STATUS_REMOVE) {
            return false;
          }
          return true;
        })
      };
    }
    // ZombieJ: Return the count of rest keys. It's safe to refactor if need more info.
    removeKey = (removeKey) => {
      this.setState((prevState) => {
        const nextKeyEntities = prevState.keyEntities.map((entity) => {
          if (entity.key !== removeKey) return entity;
          return {
            ...entity,
            status: STATUS_REMOVED
          };
        });
        return {
          keyEntities: nextKeyEntities
        };
      }, () => {
        const {
          keyEntities
        } = this.state;
        const restKeysCount = keyEntities.filter(({
          status
        }) => status !== STATUS_REMOVED).length;
        if (restKeysCount === 0 && this.props.onAllRemoved) {
          this.props.onAllRemoved();
        }
      });
    };
    render() {
      const {
        keyEntities
      } = this.state;
      const {
        component,
        children,
        onVisibleChanged,
        onAllRemoved,
        ...restProps
      } = this.props;
      const Component = component || reactExports.Fragment;
      const motionProps = {};
      MOTION_PROP_NAMES.forEach((prop) => {
        motionProps[prop] = restProps[prop];
        delete restProps[prop];
      });
      delete restProps.keys;
      return /* @__PURE__ */ reactExports.createElement(Component, restProps, keyEntities.map(({
        status,
        ...eventProps
      }, index) => {
        const visible = status === STATUS_ADD || status === STATUS_KEEP;
        return /* @__PURE__ */ reactExports.createElement(CSSMotion$1, _extends({}, motionProps, {
          key: eventProps.key,
          visible,
          eventProps,
          onVisibleChanged: (changedVisible) => {
            onVisibleChanged?.(changedVisible, {
              key: eventProps.key
            });
            if (!changedVisible) {
              this.removeKey(eventProps.key);
            }
          }
        }), (props, ref) => children({
          ...props,
          index
        }, ref));
      }));
    }
  }
  return CSSMotionList2;
}
const CSSMotionList = genCSSMotionList();
export {
  CSSMotion as C,
  MotionProvider as M,
  CSSMotionList as a
};
