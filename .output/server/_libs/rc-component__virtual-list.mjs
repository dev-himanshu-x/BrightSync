import { k as _extends } from "./babel__runtime.mjs";
import { c as clsx } from "./clsx.mjs";
import { R as RefResizeObserver } from "./rc-component__resize-observer.mjs";
import { w as wrapperRaf, f as useLayoutEffect, b as useEvent } from "./rc-component__util.mjs";
import { r as reactExports } from "./react.mjs";
import { r as reactDomExports } from "./react-dom.mjs";
const Filler = /* @__PURE__ */ reactExports.forwardRef(({
  height,
  offsetY,
  offsetX,
  children,
  prefixCls,
  onInnerResize,
  innerProps,
  rtl,
  extra
}, ref) => {
  let outerStyle = {};
  let innerStyle = {
    display: "flex",
    flexDirection: "column"
  };
  if (offsetY !== void 0) {
    outerStyle = {
      height,
      position: "relative",
      overflow: "hidden"
    };
    innerStyle = {
      ...innerStyle,
      transform: `translateY(${offsetY}px)`,
      [rtl ? "marginRight" : "marginLeft"]: -offsetX,
      position: "absolute",
      left: 0,
      right: 0,
      top: 0
    };
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    style: outerStyle
  }, /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize: ({
      offsetHeight
    }) => {
      if (offsetHeight && onInnerResize) {
        onInnerResize();
      }
    }
  }, /* @__PURE__ */ reactExports.createElement("div", _extends({
    style: innerStyle,
    className: clsx({
      [`${prefixCls}-holder-inner`]: prefixCls
    }),
    ref
  }, innerProps), children, extra)));
});
Filler.displayName = "Filler";
function Item({
  children,
  setRef
}) {
  const refFunc = reactExports.useCallback((node) => {
    setRef(node);
  }, []);
  return /* @__PURE__ */ reactExports.cloneElement(children, {
    ref: refFunc
  });
}
function useChildren(list, startIndex, endIndex, scrollWidth, offsetX, setNodeRef, renderFunc, {
  getKey
}) {
  return list.slice(startIndex, endIndex + 1).map((item, index) => {
    const eleIndex = startIndex + index;
    const node = renderFunc(item, eleIndex, {
      style: {
        width: scrollWidth
      },
      offsetX
    });
    const key = getKey(item);
    return /* @__PURE__ */ reactExports.createElement(Item, {
      key,
      setRef: (ele) => setNodeRef(item, ele)
    }, node);
  });
}
function findListDiffIndex(originList, targetList, getKey) {
  const originLen = originList.length;
  const targetLen = targetList.length;
  let shortList;
  let longList;
  if (originLen === 0 && targetLen === 0) {
    return null;
  }
  if (originLen < targetLen) {
    shortList = originList;
    longList = targetList;
  } else {
    shortList = targetList;
    longList = originList;
  }
  const notExistKey = {
    __EMPTY_ITEM__: true
  };
  function getItemKey(item) {
    if (item !== void 0) {
      return getKey(item);
    }
    return notExistKey;
  }
  let diffIndex = null;
  let multiple = Math.abs(originLen - targetLen) !== 1;
  for (let i = 0; i < longList.length; i += 1) {
    const shortKey = getItemKey(shortList[i]);
    const longKey = getItemKey(longList[i]);
    if (shortKey !== longKey) {
      diffIndex = i;
      multiple = multiple || shortKey !== getItemKey(longList[i + 1]);
      break;
    }
  }
  return diffIndex === null ? null : {
    index: diffIndex,
    multiple
  };
}
function useDiffItem(data, getKey, onDiff) {
  const [prevData, setPrevData] = reactExports.useState(data);
  const [diffItem, setDiffItem] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const diff = findListDiffIndex(prevData || [], data || [], getKey);
    if (diff?.index !== void 0) {
      setDiffItem(data[diff.index]);
    }
    setPrevData(data);
  }, [data]);
  return [diffItem];
}
const isFF = typeof navigator === "object" && /Firefox/i.test(navigator.userAgent);
const useOriginScroll = ((isScrollAtTop, isScrollAtBottom, isScrollAtLeft, isScrollAtRight) => {
  const lockRef = reactExports.useRef(false);
  const lockTimeoutRef = reactExports.useRef(null);
  function lockScroll() {
    clearTimeout(lockTimeoutRef.current);
    lockRef.current = true;
    lockTimeoutRef.current = setTimeout(() => {
      lockRef.current = false;
    }, 50);
  }
  const scrollPingRef = reactExports.useRef({
    top: isScrollAtTop,
    bottom: isScrollAtBottom,
    left: isScrollAtLeft,
    right: isScrollAtRight
  });
  scrollPingRef.current.top = isScrollAtTop;
  scrollPingRef.current.bottom = isScrollAtBottom;
  scrollPingRef.current.left = isScrollAtLeft;
  scrollPingRef.current.right = isScrollAtRight;
  return (isHorizontal, delta, smoothOffset = false) => {
    const originScroll = isHorizontal ? (
      // Pass origin wheel when on the left
      delta < 0 && scrollPingRef.current.left || // Pass origin wheel when on the right
      delta > 0 && scrollPingRef.current.right
    ) : delta < 0 && scrollPingRef.current.top || // Pass origin wheel when on the bottom
    delta > 0 && scrollPingRef.current.bottom;
    if (smoothOffset && originScroll) {
      clearTimeout(lockTimeoutRef.current);
      lockRef.current = false;
    } else if (!originScroll || lockRef.current) {
      lockScroll();
    }
    return !lockRef.current && originScroll;
  };
});
function useFrameWheel(inVirtual, isScrollAtTop, isScrollAtBottom, isScrollAtLeft, isScrollAtRight, horizontalScroll, onWheelDelta) {
  const offsetRef = reactExports.useRef(0);
  const nextFrameRef = reactExports.useRef(null);
  const wheelValueRef = reactExports.useRef(null);
  const isMouseScrollRef = reactExports.useRef(false);
  const originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom, isScrollAtLeft, isScrollAtRight);
  function onWheelY(e, deltaY) {
    wrapperRaf.cancel(nextFrameRef.current);
    if (originScroll(false, deltaY)) return;
    const event = e;
    if (!event._virtualHandled) {
      event._virtualHandled = true;
    } else {
      return;
    }
    offsetRef.current += deltaY;
    wheelValueRef.current = deltaY;
    if (!isFF) {
      event.preventDefault();
    }
    nextFrameRef.current = wrapperRaf(() => {
      const patchMultiple = isMouseScrollRef.current ? 10 : 1;
      onWheelDelta(offsetRef.current * patchMultiple, false);
      offsetRef.current = 0;
    });
  }
  function onWheelX(event, deltaX) {
    onWheelDelta(deltaX, true);
    if (!isFF) {
      event.preventDefault();
    }
  }
  const wheelDirectionRef = reactExports.useRef(null);
  const wheelDirectionCleanRef = reactExports.useRef(null);
  function onWheel(event) {
    if (!inVirtual) return;
    wrapperRaf.cancel(wheelDirectionCleanRef.current);
    wheelDirectionCleanRef.current = wrapperRaf(() => {
      wheelDirectionRef.current = null;
    }, 2);
    const {
      deltaX,
      deltaY,
      shiftKey
    } = event;
    let mergedDeltaX = deltaX;
    let mergedDeltaY = deltaY;
    if (wheelDirectionRef.current === "sx" || !wheelDirectionRef.current && (shiftKey || false) && deltaY && !deltaX) {
      mergedDeltaX = deltaY;
      mergedDeltaY = 0;
      wheelDirectionRef.current = "sx";
    }
    const absX = Math.abs(mergedDeltaX);
    const absY = Math.abs(mergedDeltaY);
    if (wheelDirectionRef.current === null) {
      wheelDirectionRef.current = horizontalScroll && absX > absY ? "x" : "y";
    }
    if (wheelDirectionRef.current === "y") {
      onWheelY(event, mergedDeltaY);
    } else {
      onWheelX(event, mergedDeltaX);
    }
  }
  function onFireFoxScroll(event) {
    if (!inVirtual) return;
    isMouseScrollRef.current = event.detail === wheelValueRef.current;
  }
  return [onWheel, onFireFoxScroll];
}
function useGetSize(mergedData, getKey, heights, itemHeight) {
  const [key2Index, bottomList] = reactExports.useMemo(() => [/* @__PURE__ */ new Map(), []], [mergedData, heights.id, itemHeight]);
  const getSize = (startKey, endKey = startKey) => {
    let startIndex = key2Index.get(startKey);
    let endIndex = key2Index.get(endKey);
    if (startIndex === void 0 || endIndex === void 0) {
      const dataLen = mergedData.length;
      for (let i = bottomList.length; i < dataLen; i += 1) {
        const item = mergedData[i];
        const key = getKey(item);
        key2Index.set(key, i);
        const cacheHeight = heights.get(key) ?? itemHeight;
        bottomList[i] = (bottomList[i - 1] || 0) + cacheHeight;
        if (key === startKey) {
          startIndex = i;
        }
        if (key === endKey) {
          endIndex = i;
        }
        if (startIndex !== void 0 && endIndex !== void 0) {
          break;
        }
      }
    }
    return {
      top: bottomList[startIndex - 1] || 0,
      bottom: bottomList[endIndex]
    };
  };
  return getSize;
}
class CacheMap {
  maps;
  // Used for cache key
  // `useMemo` no need to update if `id` not change
  id = 0;
  diffRecords = /* @__PURE__ */ new Map();
  constructor() {
    this.maps = /* @__PURE__ */ Object.create(null);
  }
  set(key, value) {
    this.diffRecords.set(key, this.maps[key]);
    this.maps[key] = value;
    this.id += 1;
  }
  get(key) {
    return this.maps[key];
  }
  /**
   * CacheMap will record the key changed.
   * To help to know what's update in the next render.
   */
  resetRecord() {
    this.diffRecords.clear();
  }
  getRecord() {
    return this.diffRecords;
  }
}
function parseNumber(value) {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}
function useHeights(getKey, onItemAdd, onItemRemove) {
  const [updatedMark, setUpdatedMark] = reactExports.useState(0);
  const instanceRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const heightsRef = reactExports.useRef(new CacheMap());
  const promiseIdRef = reactExports.useRef(0);
  function cancelRaf() {
    promiseIdRef.current += 1;
  }
  function collectHeight(sync = false) {
    cancelRaf();
    const doCollect = () => {
      let changed = false;
      instanceRef.current.forEach((element, key) => {
        if (element && element.offsetParent) {
          const {
            offsetHeight
          } = element;
          const {
            marginTop,
            marginBottom
          } = getComputedStyle(element);
          const marginTopNum = parseNumber(marginTop);
          const marginBottomNum = parseNumber(marginBottom);
          const totalHeight = offsetHeight + marginTopNum + marginBottomNum;
          if (heightsRef.current.get(key) !== totalHeight) {
            heightsRef.current.set(key, totalHeight);
            changed = true;
          }
        }
      });
      if (changed) {
        setUpdatedMark((c) => c + 1);
      }
    };
    if (sync) {
      doCollect();
    } else {
      promiseIdRef.current += 1;
      const id = promiseIdRef.current;
      Promise.resolve().then(() => {
        if (id === promiseIdRef.current) {
          doCollect();
        }
      });
    }
  }
  function setInstanceRef(item, instance) {
    const key = getKey(item);
    instanceRef.current.get(key);
    if (instance) {
      instanceRef.current.set(key, instance);
      collectHeight();
    } else {
      instanceRef.current.delete(key);
    }
  }
  reactExports.useEffect(() => {
    return cancelRaf;
  }, []);
  return [setInstanceRef, collectHeight, heightsRef.current, updatedMark];
}
const SMOOTH_PTG = 14 / 15;
function useMobileTouchMove(inVirtual, listRef, callback) {
  const touchedRef = reactExports.useRef(false);
  const touchXRef = reactExports.useRef(0);
  const touchYRef = reactExports.useRef(0);
  const elementRef = reactExports.useRef(null);
  const intervalRef = reactExports.useRef(null);
  let cleanUpEvents;
  const onTouchMove = (e) => {
    if (touchedRef.current) {
      const currentX = Math.ceil(e.touches[0].pageX);
      const currentY = Math.ceil(e.touches[0].pageY);
      let offsetX = touchXRef.current - currentX;
      let offsetY = touchYRef.current - currentY;
      const isHorizontal = Math.abs(offsetX) > Math.abs(offsetY);
      if (isHorizontal) {
        touchXRef.current = currentX;
      } else {
        touchYRef.current = currentY;
      }
      const scrollHandled = callback(isHorizontal, isHorizontal ? offsetX : offsetY, false, e);
      if (scrollHandled) {
        e.preventDefault();
      }
      clearInterval(intervalRef.current);
      if (scrollHandled) {
        intervalRef.current = setInterval(() => {
          if (isHorizontal) {
            offsetX *= SMOOTH_PTG;
          } else {
            offsetY *= SMOOTH_PTG;
          }
          const offset = Math.floor(isHorizontal ? offsetX : offsetY);
          if (!callback(isHorizontal, offset, true) || Math.abs(offset) <= 0.1) {
            clearInterval(intervalRef.current);
          }
        }, 16);
      }
    }
  };
  const onTouchEnd = () => {
    touchedRef.current = false;
    cleanUpEvents();
  };
  const onTouchStart = (e) => {
    cleanUpEvents();
    if (e.touches.length === 1 && !touchedRef.current) {
      touchedRef.current = true;
      touchXRef.current = Math.ceil(e.touches[0].pageX);
      touchYRef.current = Math.ceil(e.touches[0].pageY);
      elementRef.current = e.target;
      elementRef.current.addEventListener("touchmove", onTouchMove, {
        passive: false
      });
      elementRef.current.addEventListener("touchend", onTouchEnd, {
        passive: true
      });
    }
  };
  cleanUpEvents = () => {
    if (elementRef.current) {
      elementRef.current.removeEventListener("touchmove", onTouchMove);
      elementRef.current.removeEventListener("touchend", onTouchEnd);
    }
  };
  useLayoutEffect(() => {
    if (inVirtual) {
      listRef.current.addEventListener("touchstart", onTouchStart, {
        passive: true
      });
    }
    return () => {
      listRef.current?.removeEventListener("touchstart", onTouchStart);
      cleanUpEvents();
      clearInterval(intervalRef.current);
    };
  }, [inVirtual]);
}
function smoothScrollOffset(offset) {
  return Math.floor(offset ** 0.5);
}
function getPageXY(e, horizontal) {
  const obj = "touches" in e ? e.touches[0] : e;
  return obj[horizontal ? "pageX" : "pageY"] - window[horizontal ? "scrollX" : "scrollY"];
}
function useScrollDrag(inVirtual, componentRef, onScrollOffset) {
  reactExports.useEffect(() => {
    const ele = componentRef.current;
    if (inVirtual && ele) {
      let mouseDownLock = false;
      let rafId;
      let offset;
      const stopScroll = () => {
        wrapperRaf.cancel(rafId);
      };
      const continueScroll = () => {
        stopScroll();
        rafId = wrapperRaf(() => {
          onScrollOffset(offset);
          continueScroll();
        });
      };
      const clearDragState = () => {
        mouseDownLock = false;
        stopScroll();
      };
      const onMouseDown = (e) => {
        if (e.target.draggable || e.button !== 0) {
          return;
        }
        const event = e;
        if (!event._virtualHandled) {
          event._virtualHandled = true;
          mouseDownLock = true;
        }
      };
      const onMouseMove = (e) => {
        if (mouseDownLock) {
          const mouseY = getPageXY(e, false);
          const {
            top,
            bottom
          } = ele.getBoundingClientRect();
          if (mouseY <= top) {
            const diff = top - mouseY;
            offset = -smoothScrollOffset(diff);
            continueScroll();
          } else if (mouseY >= bottom) {
            const diff = mouseY - bottom;
            offset = smoothScrollOffset(diff);
            continueScroll();
          } else {
            stopScroll();
          }
        }
      };
      ele.addEventListener("mousedown", onMouseDown);
      ele.ownerDocument.addEventListener("mouseup", clearDragState);
      ele.ownerDocument.addEventListener("mousemove", onMouseMove);
      ele.ownerDocument.addEventListener("dragend", clearDragState);
      return () => {
        ele.removeEventListener("mousedown", onMouseDown);
        ele.ownerDocument.removeEventListener("mouseup", clearDragState);
        ele.ownerDocument.removeEventListener("mousemove", onMouseMove);
        ele.ownerDocument.removeEventListener("dragend", clearDragState);
        stopScroll();
      };
    }
  }, [inVirtual]);
}
const MAX_TIMES = 10;
function useScrollTo(containerRef, data, heights, itemHeight, getKey, collectHeight, syncScrollTop, triggerFlash) {
  const scrollRef = reactExports.useRef();
  const [syncState, setSyncState] = reactExports.useState(null);
  useLayoutEffect(() => {
    if (syncState && syncState.times < MAX_TIMES) {
      if (!containerRef.current) {
        setSyncState((ori) => ({
          ...ori
        }));
        return;
      }
      collectHeight();
      const {
        targetAlign,
        originAlign,
        index,
        offset
      } = syncState;
      const height = containerRef.current.clientHeight;
      let needCollectHeight = false;
      let newTargetAlign = targetAlign;
      let targetTop = null;
      if (height) {
        const mergedAlign = targetAlign || originAlign;
        let stackTop = 0;
        let itemTop = 0;
        let itemBottom = 0;
        const maxLen = Math.min(data.length - 1, index);
        for (let i = 0; i <= maxLen; i += 1) {
          const key = getKey(data[i]);
          itemTop = stackTop;
          const cacheHeight = heights.get(key);
          itemBottom = itemTop + (cacheHeight === void 0 ? itemHeight : cacheHeight);
          stackTop = itemBottom;
        }
        let leftHeight = mergedAlign === "top" ? offset : height - offset;
        for (let i = maxLen; i >= 0; i -= 1) {
          const key = getKey(data[i]);
          const cacheHeight = heights.get(key);
          if (cacheHeight === void 0) {
            needCollectHeight = true;
            break;
          }
          leftHeight -= cacheHeight;
          if (leftHeight <= 0) {
            break;
          }
        }
        switch (mergedAlign) {
          case "top":
            targetTop = itemTop - offset;
            break;
          case "bottom":
            targetTop = itemBottom - height + offset;
            break;
          default: {
            const {
              scrollTop
            } = containerRef.current;
            const scrollBottom = scrollTop + height;
            if (itemTop < scrollTop) {
              newTargetAlign = "top";
            } else if (itemBottom > scrollBottom) {
              newTargetAlign = "bottom";
            }
          }
        }
        if (targetTop !== null) {
          syncScrollTop(targetTop);
        }
        if (targetTop !== syncState.lastTop) {
          needCollectHeight = true;
        }
      }
      if (needCollectHeight) {
        setSyncState({
          ...syncState,
          times: syncState.times + 1,
          targetAlign: newTargetAlign,
          lastTop: targetTop
        });
      }
    }
  }, [syncState, containerRef.current]);
  return (arg) => {
    if (arg === null || arg === void 0) {
      triggerFlash();
      return;
    }
    wrapperRaf.cancel(scrollRef.current);
    if (typeof arg === "number") {
      syncScrollTop(arg);
    } else if (arg && typeof arg === "object") {
      let index;
      const {
        align
      } = arg;
      if ("index" in arg) {
        ({
          index
        } = arg);
      } else {
        index = data.findIndex((item) => getKey(item) === arg.key);
      }
      const {
        offset = 0
      } = arg;
      setSyncState({
        times: 0,
        index,
        offset,
        originAlign: align
      });
    }
  };
}
const ScrollBar = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls,
    rtl,
    scrollOffset,
    scrollRange,
    onStartMove,
    onStopMove,
    onScroll,
    horizontal,
    spinSize,
    containerSize,
    style,
    thumbStyle: propsThumbStyle,
    showScrollBar
  } = props;
  const [dragging, setDragging] = reactExports.useState(false);
  const [pageXY, setPageXY] = reactExports.useState(null);
  const [startTop, setStartTop] = reactExports.useState(null);
  const isLTR = !rtl;
  const scrollbarRef = reactExports.useRef();
  const thumbRef = reactExports.useRef();
  const [visible, setVisible] = reactExports.useState(showScrollBar);
  const visibleTimeoutRef = reactExports.useRef();
  const delayHidden = () => {
    if (showScrollBar === true || showScrollBar === false) return;
    clearTimeout(visibleTimeoutRef.current);
    setVisible(true);
    visibleTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 3e3);
  };
  const enableScrollRange = scrollRange - containerSize || 0;
  const enableOffsetRange = containerSize - spinSize || 0;
  const top = reactExports.useMemo(() => {
    if (scrollOffset === 0 || enableScrollRange === 0) {
      return 0;
    }
    const ptg = scrollOffset / enableScrollRange;
    return ptg * enableOffsetRange;
  }, [scrollOffset, enableScrollRange, enableOffsetRange]);
  const onContainerMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const stateRef = reactExports.useRef({
    top,
    dragging,
    pageY: pageXY,
    startTop
  });
  stateRef.current = {
    top,
    dragging,
    pageY: pageXY,
    startTop
  };
  const onThumbMouseDown = (e) => {
    setDragging(true);
    setPageXY(getPageXY(e, horizontal));
    setStartTop(stateRef.current.top);
    onStartMove();
    e.stopPropagation();
    e.preventDefault();
  };
  reactExports.useEffect(() => {
    const onScrollbarTouchStart = (e) => {
      e.preventDefault();
    };
    const scrollbarEle = scrollbarRef.current;
    const thumbEle = thumbRef.current;
    scrollbarEle.addEventListener("touchstart", onScrollbarTouchStart, {
      passive: false
    });
    thumbEle.addEventListener("touchstart", onThumbMouseDown, {
      passive: false
    });
    return () => {
      scrollbarEle.removeEventListener("touchstart", onScrollbarTouchStart);
      thumbEle.removeEventListener("touchstart", onThumbMouseDown);
    };
  }, []);
  const enableScrollRangeRef = reactExports.useRef();
  enableScrollRangeRef.current = enableScrollRange;
  const enableOffsetRangeRef = reactExports.useRef();
  enableOffsetRangeRef.current = enableOffsetRange;
  reactExports.useEffect(() => {
    if (dragging) {
      let moveRafId;
      const onMouseMove = (e) => {
        const {
          dragging: stateDragging,
          pageY: statePageY,
          startTop: stateStartTop
        } = stateRef.current;
        wrapperRaf.cancel(moveRafId);
        const rect = scrollbarRef.current.getBoundingClientRect();
        const scale = containerSize / (horizontal ? rect.width : rect.height);
        if (stateDragging) {
          const offset = (getPageXY(e, horizontal) - statePageY) * scale;
          let newTop = stateStartTop;
          if (!isLTR && horizontal) {
            newTop -= offset;
          } else {
            newTop += offset;
          }
          const tmpEnableScrollRange = enableScrollRangeRef.current;
          const tmpEnableOffsetRange = enableOffsetRangeRef.current;
          const ptg = tmpEnableOffsetRange ? newTop / tmpEnableOffsetRange : 0;
          let newScrollTop = Math.ceil(ptg * tmpEnableScrollRange);
          newScrollTop = Math.max(newScrollTop, 0);
          newScrollTop = Math.min(newScrollTop, tmpEnableScrollRange);
          moveRafId = wrapperRaf(() => {
            onScroll(newScrollTop, horizontal);
          });
        }
      };
      const onMouseUp = () => {
        setDragging(false);
        onStopMove();
      };
      window.addEventListener("mousemove", onMouseMove, {
        passive: true
      });
      window.addEventListener("touchmove", onMouseMove, {
        passive: true
      });
      window.addEventListener("mouseup", onMouseUp, {
        passive: true
      });
      window.addEventListener("touchend", onMouseUp, {
        passive: true
      });
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("touchmove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("touchend", onMouseUp);
        wrapperRaf.cancel(moveRafId);
      };
    }
  }, [dragging]);
  reactExports.useEffect(() => {
    delayHidden();
    return () => {
      clearTimeout(visibleTimeoutRef.current);
    };
  }, [scrollOffset]);
  reactExports.useImperativeHandle(ref, () => ({
    delayHidden
  }));
  const scrollbarPrefixCls = `${prefixCls}-scrollbar`;
  const containerStyle = {
    position: "absolute",
    visibility: visible ? null : "hidden"
  };
  const thumbStyle = {
    position: "absolute",
    borderRadius: 99,
    background: "var(--rc-virtual-list-scrollbar-bg, rgba(0, 0, 0, 0.5))",
    cursor: "pointer",
    userSelect: "none"
  };
  if (horizontal) {
    Object.assign(containerStyle, {
      height: 8,
      left: 0,
      right: 0,
      bottom: 0
    });
    Object.assign(thumbStyle, {
      height: "100%",
      width: spinSize,
      [isLTR ? "left" : "right"]: top
    });
  } else {
    Object.assign(containerStyle, {
      width: 8,
      top: 0,
      bottom: 0,
      [isLTR ? "right" : "left"]: 0
    });
    Object.assign(thumbStyle, {
      width: "100%",
      height: spinSize,
      top
    });
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    ref: scrollbarRef,
    className: clsx(scrollbarPrefixCls, {
      [`${scrollbarPrefixCls}-horizontal`]: horizontal,
      [`${scrollbarPrefixCls}-vertical`]: !horizontal,
      [`${scrollbarPrefixCls}-visible`]: visible
    }),
    style: {
      ...containerStyle,
      ...style
    },
    onMouseDown: onContainerMouseDown,
    onMouseMove: delayHidden
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: thumbRef,
    className: clsx(`${scrollbarPrefixCls}-thumb`, {
      [`${scrollbarPrefixCls}-thumb-moving`]: dragging
    }),
    style: {
      ...thumbStyle,
      ...propsThumbStyle
    },
    onMouseDown: onThumbMouseDown
  }));
});
const MIN_SIZE = 20;
function getSpinSize(containerSize = 0, scrollRange = 0) {
  let baseSize = containerSize / scrollRange * containerSize;
  if (isNaN(baseSize)) {
    baseSize = 0;
  }
  baseSize = Math.max(baseSize, MIN_SIZE);
  return Math.floor(baseSize);
}
const EMPTY_DATA = [];
const ScrollStyle = {
  overflowY: "auto",
  overflowAnchor: "none"
};
function RawList(props, ref) {
  const {
    prefixCls = "rc-virtual-list",
    className,
    height,
    itemHeight,
    fullHeight = true,
    style,
    data,
    children,
    itemKey,
    virtual,
    direction,
    scrollWidth,
    component: Component = "div",
    onScroll,
    onVirtualScroll,
    onVisibleChange,
    innerProps,
    extraRender,
    styles,
    showScrollBar = "optional",
    ...restProps
  } = props;
  const getKey = reactExports.useCallback((item) => {
    if (typeof itemKey === "function") {
      return itemKey(item);
    }
    return item?.[itemKey];
  }, [itemKey]);
  const [setInstanceRef, collectHeight, heights, heightUpdatedMark] = useHeights(getKey);
  const useVirtual = !!(virtual !== false && height && itemHeight);
  const containerHeight = reactExports.useMemo(() => Object.values(heights.maps).reduce((total, curr) => total + curr, 0), [heights.id, heights.maps]);
  const inVirtual = useVirtual && data && (Math.max(itemHeight * data.length, containerHeight) > height || !!scrollWidth);
  const isRTL = direction === "rtl";
  const mergedClassName = clsx(prefixCls, {
    [`${prefixCls}-rtl`]: isRTL
  }, className);
  const mergedData = data || EMPTY_DATA;
  const componentRef = reactExports.useRef();
  const fillerInnerRef = reactExports.useRef();
  const containerRef = reactExports.useRef();
  const [offsetTop, setOffsetTop] = reactExports.useState(0);
  const [offsetLeft, setOffsetLeft] = reactExports.useState(0);
  const [scrollMoving, setScrollMoving] = reactExports.useState(false);
  const onScrollbarStartMove = () => {
    setScrollMoving(true);
  };
  const onScrollbarStopMove = () => {
    setScrollMoving(false);
  };
  const sharedConfig = {
    getKey
  };
  function syncScrollTop(newTop) {
    setOffsetTop((origin) => {
      let value;
      if (typeof newTop === "function") {
        value = newTop(origin);
      } else {
        value = newTop;
      }
      const alignedTop = keepInRange(value);
      componentRef.current.scrollTop = alignedTop;
      return alignedTop;
    });
  }
  const rangeRef = reactExports.useRef({
    start: 0,
    end: mergedData.length
  });
  const diffItemRef = reactExports.useRef();
  const [diffItem] = useDiffItem(mergedData, getKey);
  diffItemRef.current = diffItem;
  const {
    scrollHeight,
    start,
    end,
    offset: fillerOffset
  } = reactExports.useMemo(() => {
    if (!useVirtual) {
      return {
        scrollHeight: void 0,
        start: 0,
        end: mergedData.length - 1,
        offset: void 0
      };
    }
    if (!inVirtual) {
      return {
        scrollHeight: fillerInnerRef.current?.offsetHeight || 0,
        start: 0,
        end: mergedData.length - 1,
        offset: void 0
      };
    }
    let itemTop = 0;
    let startIndex;
    let startOffset;
    let endIndex;
    const dataLen = mergedData.length;
    for (let i = 0; i < dataLen; i += 1) {
      const item = mergedData[i];
      const key = getKey(item);
      const cacheHeight = heights.get(key);
      const currentItemBottom = itemTop + (cacheHeight === void 0 ? itemHeight : cacheHeight);
      if (currentItemBottom >= offsetTop && startIndex === void 0) {
        startIndex = i;
        startOffset = itemTop;
      }
      if (currentItemBottom > offsetTop + height && endIndex === void 0) {
        endIndex = i;
      }
      itemTop = currentItemBottom;
    }
    if (startIndex === void 0) {
      startIndex = 0;
      startOffset = 0;
      endIndex = Math.ceil(height / itemHeight);
    }
    if (endIndex === void 0) {
      endIndex = mergedData.length - 1;
    }
    endIndex = Math.min(endIndex + 1, mergedData.length - 1);
    return {
      scrollHeight: itemTop,
      start: startIndex,
      end: endIndex,
      offset: startOffset
    };
  }, [inVirtual, useVirtual, offsetTop, mergedData, heightUpdatedMark, height]);
  rangeRef.current.start = start;
  rangeRef.current.end = end;
  reactExports.useLayoutEffect(() => {
    const changedRecord = heights.getRecord();
    if (changedRecord.size === 1) {
      const recordKey = Array.from(changedRecord.keys())[0];
      const prevCacheHeight = changedRecord.get(recordKey);
      const startItem = mergedData[start];
      if (startItem && prevCacheHeight === void 0) {
        const startIndexKey = getKey(startItem);
        if (startIndexKey === recordKey) {
          const realStartHeight = heights.get(recordKey);
          const diffHeight = realStartHeight - itemHeight;
          syncScrollTop((ori) => {
            return ori + diffHeight;
          });
        }
      }
    }
    heights.resetRecord();
  }, [scrollHeight]);
  const [size, setSize] = reactExports.useState({
    width: 0,
    height
  });
  const onHolderResize = (sizeInfo) => {
    setSize({
      width: sizeInfo.offsetWidth,
      height: sizeInfo.offsetHeight
    });
  };
  const verticalScrollBarRef = reactExports.useRef();
  const horizontalScrollBarRef = reactExports.useRef();
  const horizontalScrollBarSpinSize = reactExports.useMemo(() => getSpinSize(size.width, scrollWidth), [size.width, scrollWidth]);
  const verticalScrollBarSpinSize = reactExports.useMemo(() => getSpinSize(size.height, scrollHeight), [size.height, scrollHeight]);
  const maxScrollHeight = scrollHeight - height;
  const maxScrollHeightRef = reactExports.useRef(maxScrollHeight);
  maxScrollHeightRef.current = maxScrollHeight;
  function keepInRange(newScrollTop) {
    let newTop = newScrollTop;
    if (!Number.isNaN(maxScrollHeightRef.current)) {
      newTop = Math.min(newTop, maxScrollHeightRef.current);
    }
    newTop = Math.max(newTop, 0);
    return newTop;
  }
  const isScrollAtTop = offsetTop <= 0;
  const isScrollAtBottom = offsetTop >= maxScrollHeight;
  const isScrollAtLeft = offsetLeft <= 0;
  const isScrollAtRight = offsetLeft >= scrollWidth;
  const originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom, isScrollAtLeft, isScrollAtRight);
  const getVirtualScrollInfo = () => ({
    x: isRTL ? -offsetLeft : offsetLeft,
    y: offsetTop
  });
  const lastVirtualScrollInfoRef = reactExports.useRef(getVirtualScrollInfo());
  const triggerScroll = useEvent((params) => {
    if (onVirtualScroll) {
      const nextInfo = {
        ...getVirtualScrollInfo(),
        ...params
      };
      if (lastVirtualScrollInfoRef.current.x !== nextInfo.x || lastVirtualScrollInfoRef.current.y !== nextInfo.y) {
        onVirtualScroll(nextInfo);
        lastVirtualScrollInfoRef.current = nextInfo;
      }
    }
  });
  function onScrollBar(newScrollOffset, horizontal) {
    const newOffset = newScrollOffset;
    if (horizontal) {
      reactDomExports.flushSync(() => {
        setOffsetLeft(newOffset);
      });
      triggerScroll();
    } else {
      syncScrollTop(newOffset);
    }
  }
  function onFallbackScroll(e) {
    const {
      scrollTop: newScrollTop
    } = e.currentTarget;
    if (newScrollTop !== offsetTop) {
      syncScrollTop(newScrollTop);
    }
    onScroll?.(e);
    triggerScroll();
  }
  const keepInHorizontalRange = (nextOffsetLeft) => {
    let tmpOffsetLeft = nextOffsetLeft;
    const max = !!scrollWidth ? scrollWidth - size.width : 0;
    tmpOffsetLeft = Math.max(tmpOffsetLeft, 0);
    tmpOffsetLeft = Math.min(tmpOffsetLeft, max);
    return tmpOffsetLeft;
  };
  const onWheelDelta = useEvent((offsetXY, fromHorizontal) => {
    if (fromHorizontal) {
      reactDomExports.flushSync(() => {
        setOffsetLeft((left) => {
          const nextOffsetLeft = left + (isRTL ? -offsetXY : offsetXY);
          return keepInHorizontalRange(nextOffsetLeft);
        });
      });
      triggerScroll();
    } else {
      syncScrollTop((top) => {
        const newTop = top + offsetXY;
        return newTop;
      });
    }
  });
  const [onRawWheel, onFireFoxScroll] = useFrameWheel(useVirtual, isScrollAtTop, isScrollAtBottom, isScrollAtLeft, isScrollAtRight, !!scrollWidth, onWheelDelta);
  useMobileTouchMove(useVirtual, componentRef, (isHorizontal, delta, smoothOffset, e) => {
    const event = e;
    if (originScroll(isHorizontal, delta, smoothOffset)) {
      return false;
    }
    if (!event || !event._virtualHandled) {
      if (event) {
        event._virtualHandled = true;
      }
      onRawWheel({
        preventDefault() {
        },
        deltaX: isHorizontal ? delta : 0,
        deltaY: isHorizontal ? 0 : delta
      });
      return true;
    }
    return false;
  });
  useScrollDrag(inVirtual, componentRef, (offset) => {
    syncScrollTop((top) => top + offset);
  });
  useLayoutEffect(() => {
    function onMozMousePixelScroll(e) {
      const scrollingUpAtTop = isScrollAtTop && e.detail < 0;
      const scrollingDownAtBottom = isScrollAtBottom && e.detail > 0;
      if (useVirtual && !scrollingUpAtTop && !scrollingDownAtBottom) {
        e.preventDefault();
      }
    }
    const componentEle = componentRef.current;
    componentEle.addEventListener("wheel", onRawWheel, {
      passive: false
    });
    componentEle.addEventListener("DOMMouseScroll", onFireFoxScroll, {
      passive: true
    });
    componentEle.addEventListener("MozMousePixelScroll", onMozMousePixelScroll, {
      passive: false
    });
    return () => {
      componentEle.removeEventListener("wheel", onRawWheel);
      componentEle.removeEventListener("DOMMouseScroll", onFireFoxScroll);
      componentEle.removeEventListener("MozMousePixelScroll", onMozMousePixelScroll);
    };
  }, [useVirtual, isScrollAtTop, isScrollAtBottom]);
  useLayoutEffect(() => {
    if (scrollWidth) {
      const newOffsetLeft = keepInHorizontalRange(offsetLeft);
      setOffsetLeft(newOffsetLeft);
      triggerScroll({
        x: newOffsetLeft
      });
    }
  }, [size.width, scrollWidth]);
  const delayHideScrollBar = () => {
    verticalScrollBarRef.current?.delayHidden();
    horizontalScrollBarRef.current?.delayHidden();
  };
  const scrollTo = useScrollTo(componentRef, mergedData, heights, itemHeight, getKey, () => collectHeight(true), syncScrollTop, delayHideScrollBar);
  reactExports.useImperativeHandle(ref, () => ({
    nativeElement: containerRef.current,
    getScrollInfo: getVirtualScrollInfo,
    scrollTo: (config) => {
      function isPosScroll(arg) {
        return arg && typeof arg === "object" && ("left" in arg || "top" in arg);
      }
      if (isPosScroll(config)) {
        if (config.left !== void 0) {
          setOffsetLeft(keepInHorizontalRange(config.left));
        }
        scrollTo(config.top);
      } else {
        scrollTo(config);
      }
    }
  }));
  useLayoutEffect(() => {
    if (onVisibleChange) {
      const renderList = mergedData.slice(start, end + 1);
      onVisibleChange(renderList, mergedData);
    }
  }, [start, end, mergedData]);
  const getSize = useGetSize(mergedData, getKey, heights, itemHeight);
  const extraContent = extraRender?.({
    start,
    end,
    virtual: inVirtual,
    offsetX: offsetLeft,
    offsetY: fillerOffset,
    rtl: isRTL,
    getSize
  });
  const listChildren = useChildren(mergedData, start, end, scrollWidth, offsetLeft, setInstanceRef, children, sharedConfig);
  let componentStyle = null;
  if (height) {
    componentStyle = {
      [fullHeight ? "height" : "maxHeight"]: height,
      ...ScrollStyle
    };
    if (useVirtual) {
      componentStyle.overflowY = "hidden";
      if (scrollWidth) {
        componentStyle.overflowX = "hidden";
      }
      if (scrollMoving) {
        componentStyle.pointerEvents = "none";
      }
    }
  }
  const containerProps = {};
  if (isRTL) {
    containerProps.dir = "rtl";
  }
  return /* @__PURE__ */ reactExports.createElement("div", _extends({
    ref: containerRef,
    style: {
      ...style,
      position: "relative"
    },
    className: mergedClassName
  }, containerProps, restProps), /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize: onHolderResize
  }, /* @__PURE__ */ reactExports.createElement(Component, {
    className: `${prefixCls}-holder`,
    style: componentStyle,
    ref: componentRef,
    onScroll: onFallbackScroll,
    onMouseEnter: delayHideScrollBar
  }, /* @__PURE__ */ reactExports.createElement(Filler, {
    prefixCls,
    height: scrollHeight,
    offsetX: offsetLeft,
    offsetY: fillerOffset,
    scrollWidth,
    onInnerResize: collectHeight,
    ref: fillerInnerRef,
    innerProps,
    rtl: isRTL,
    extra: extraContent
  }, listChildren))), inVirtual && scrollHeight > height && /* @__PURE__ */ reactExports.createElement(ScrollBar, {
    ref: verticalScrollBarRef,
    prefixCls,
    scrollOffset: offsetTop,
    scrollRange: scrollHeight,
    rtl: isRTL,
    onScroll: onScrollBar,
    onStartMove: onScrollbarStartMove,
    onStopMove: onScrollbarStopMove,
    spinSize: verticalScrollBarSpinSize,
    containerSize: size.height,
    style: styles?.verticalScrollBar,
    thumbStyle: styles?.verticalScrollBarThumb,
    showScrollBar
  }), inVirtual && scrollWidth > size.width && /* @__PURE__ */ reactExports.createElement(ScrollBar, {
    ref: horizontalScrollBarRef,
    prefixCls,
    scrollOffset: offsetLeft,
    scrollRange: scrollWidth,
    rtl: isRTL,
    onScroll: onScrollBar,
    onStartMove: onScrollbarStartMove,
    onStopMove: onScrollbarStopMove,
    spinSize: horizontalScrollBarSpinSize,
    containerSize: size.width,
    horizontal: true,
    style: styles?.horizontalScrollBar,
    thumbStyle: styles?.horizontalScrollBarThumb,
    showScrollBar
  }));
}
const List = /* @__PURE__ */ reactExports.forwardRef(RawList);
List.displayName = "List";
export {
  List as L
};
