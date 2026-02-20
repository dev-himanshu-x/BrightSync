import { j as canUseDom, f as useLayoutEffect, E as getTargetScrollBarSize, z as updateCSS, A as removeCSS, n as useId, b as useEvent, s as supportRef, g as getNodeRef, e as useComposeRef } from "./rc-component__util.mjs";
import { r as reactExports } from "./react.mjs";
import { r as reactDomExports } from "./react-dom.mjs";
const OrderContext = /* @__PURE__ */ reactExports.createContext(null);
let inline = false;
function inlineMock(nextInline) {
  return inline;
}
const EMPTY_LIST = [];
function useDom(render, debug) {
  const [ele] = reactExports.useState(() => {
    if (!canUseDom()) {
      return null;
    }
    const defaultEle = document.createElement("div");
    return defaultEle;
  });
  const appendedRef = reactExports.useRef(false);
  const queueCreate = reactExports.useContext(OrderContext);
  const [queue, setQueue] = reactExports.useState(EMPTY_LIST);
  const mergedQueueCreate = queueCreate || (appendedRef.current ? void 0 : (appendFn) => {
    setQueue((origin) => {
      const newQueue = [appendFn, ...origin];
      return newQueue;
    });
  });
  function append() {
    if (!ele.parentElement) {
      document.body.appendChild(ele);
    }
    appendedRef.current = true;
  }
  function cleanup() {
    ele.parentElement?.removeChild(ele);
    appendedRef.current = false;
  }
  useLayoutEffect(() => {
    if (render) {
      if (queueCreate) {
        queueCreate(append);
      } else {
        append();
      }
    } else {
      cleanup();
    }
    return cleanup;
  }, [render]);
  useLayoutEffect(() => {
    if (queue.length) {
      queue.forEach((appendFn) => appendFn());
      setQueue(EMPTY_LIST);
    }
  }, [queue]);
  return [ele, mergedQueueCreate];
}
function isBodyOverflowing() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
const UNIQUE_ID = `rc-util-locker-${Date.now()}`;
let uuid = 0;
function useScrollLocker(lock) {
  const mergedLock = !!lock;
  const [id] = reactExports.useState(() => {
    uuid += 1;
    return `${UNIQUE_ID}_${uuid}`;
  });
  useLayoutEffect(() => {
    if (mergedLock) {
      const scrollbarSize = getTargetScrollBarSize(document.body).width;
      const isOverflow = isBodyOverflowing();
      updateCSS(`
html body {
  overflow-y: hidden;
  ${isOverflow ? `width: calc(100% - ${scrollbarSize}px);` : ""}
}`, id);
    } else {
      removeCSS(id);
    }
    return () => {
      removeCSS(id);
    };
  }, [mergedLock, id]);
}
let stack = [];
const IME_LOCK_DURATION = 200;
let lastCompositionEndTime = 0;
const onGlobalKeyDown = (event) => {
  if (event.key === "Escape" && !event.isComposing) {
    const now = Date.now();
    if (now - lastCompositionEndTime < IME_LOCK_DURATION) {
      return;
    }
    const len = stack.length;
    for (let i = len - 1; i >= 0; i -= 1) {
      stack[i].onEsc({
        top: i === len - 1,
        event
      });
    }
  }
};
const onGlobalCompositionEnd = () => {
  lastCompositionEndTime = Date.now();
};
function attachGlobalEventListeners() {
  window.addEventListener("keydown", onGlobalKeyDown);
  window.addEventListener("compositionend", onGlobalCompositionEnd);
}
function detachGlobalEventListeners() {
  if (stack.length === 0) {
    window.removeEventListener("keydown", onGlobalKeyDown);
    window.removeEventListener("compositionend", onGlobalCompositionEnd);
  }
}
function useEscKeyDown(open, onEsc) {
  const id = useId();
  const onEventEsc = useEvent(onEsc);
  const ensure = () => {
    if (!stack.find((item) => item.id === id)) {
      stack.push({
        id,
        onEsc: onEventEsc
      });
    }
  };
  const clear = () => {
    stack = stack.filter((item) => item.id !== id);
  };
  reactExports.useMemo(() => {
    if (open) {
      ensure();
    } else if (!open) {
      clear();
    }
  }, [open]);
  reactExports.useEffect(() => {
    if (open) {
      ensure();
      attachGlobalEventListeners();
      return () => {
        clear();
        detachGlobalEventListeners();
      };
    }
  }, [open]);
}
const getPortalContainer = (getContainer) => {
  if (getContainer === false) {
    return false;
  }
  if (!canUseDom() || !getContainer) {
    return null;
  }
  if (typeof getContainer === "string") {
    return document.querySelector(getContainer);
  }
  if (typeof getContainer === "function") {
    return getContainer();
  }
  return getContainer;
};
const Portal = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    open,
    autoLock,
    getContainer,
    debug,
    autoDestroy = true,
    children,
    onEsc
  } = props;
  const [shouldRender, setShouldRender] = reactExports.useState(open);
  const mergedRender = shouldRender || open;
  reactExports.useEffect(() => {
    if (autoDestroy || open) {
      setShouldRender(open);
    }
  }, [open, autoDestroy]);
  const [innerContainer, setInnerContainer] = reactExports.useState(() => getPortalContainer(getContainer));
  reactExports.useEffect(() => {
    const customizeContainer = getPortalContainer(getContainer);
    setInnerContainer(() => (
      // React do the state update even the value is the same,
      // Use function call to force React to compare update
      customizeContainer ?? null
    ));
  });
  const [defaultContainer, queueCreate] = useDom(mergedRender && !innerContainer);
  const mergedContainer = innerContainer ?? defaultContainer;
  useScrollLocker(autoLock && open && canUseDom() && (mergedContainer === defaultContainer || mergedContainer === document.body));
  useEscKeyDown(open, onEsc);
  let childRef = null;
  if (children && supportRef(children) && ref) {
    childRef = getNodeRef(children);
  }
  const mergedRef = useComposeRef(childRef, ref);
  if (!mergedRender || !canUseDom() || innerContainer === void 0) {
    return null;
  }
  const renderInline = mergedContainer === false || inlineMock();
  let reffedChildren = children;
  if (ref) {
    reffedChildren = /* @__PURE__ */ reactExports.cloneElement(children, {
      ref: mergedRef
    });
  }
  return /* @__PURE__ */ reactExports.createElement(OrderContext.Provider, {
    value: queueCreate
  }, renderInline ? reffedChildren : /* @__PURE__ */ reactDomExports.createPortal(reffedChildren, mergedContainer));
});
export {
  Portal as P
};
