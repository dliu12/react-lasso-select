var V = Object.defineProperty;
var I = (i, s, t) =>
  s in i ? V(i, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (i[s] = t);
var a = (i, s, t) => I(i, typeof s != 'symbol' ? s + '' : s, t);
import { jsx as g, jsxs as M } from 'react/jsx-runtime';
import { Component as T, createRef as y, forwardRef as b } from 'react';
import l from 'prop-types';
const k = (i) =>
    Object.keys(i)
      .filter((s) => i[s])
      .join(' '),
  f = (i, s) => i.x === s.x && i.y === s.y,
  m = (i, s) =>
    (!i && s) || (i && !s) || i.length !== s.length ? !1 : i.every((t, e) => f(t, s[e])),
  u = ({ x: i, y: s }, t = 1) => ({
    x: Math.round((i + Number.EPSILON) * t) / t,
    y: Math.round((s + Number.EPSILON) * t) / t
  }),
  B = (i, s, t = 0) => {
    const e = i.findIndex((o) => Math.max(Math.abs(o.x - s.x), Math.abs(o.y - s.y)) <= t);
    return { point: { ...(i[e] || { x: NaN, y: NaN }) }, index: e };
  },
  D = (i, s) => Math.hypot(s.x - i.x, s.y - i.y),
  S = (i, s) => Math.atan2(s.y - i.y, s.x - i.x),
  N = (i, s, t) => {
    const e = D(i, s),
      o = S(i, s),
      n = Math.round(o / t) * t;
    return {
      x: i.x + e * Math.cos(n),
      y: i.y + e * Math.sin(n)
    };
  },
  F = (i, s, t) => {
    const e = D(i, s),
      o = S(i, s),
      n = t.reduce((r, h) => (Math.abs(h - o) < Math.abs(r - o) ? h : r), 1 / 0);
    return (n !== 1 / 0 && ((s.x = i.x + e * Math.cos(n)), (s.y = i.y + e * Math.sin(n))), s);
  },
  G = (i) => {
    const s = [];
    for (let t = 1; t < i.length; t++) {
      const e = Math.atan2(i[t].y - i[t - 1].y, i[t].x - i[t - 1].x),
        o = e + Math.PI;
      s.push(e, o > Math.PI ? o - 2 * Math.PI : o);
    }
    return s.filter((t, e, o) => o.indexOf(t) === e);
  };
function X(i, s, t, e = !0) {
  const o = new Image();
  o.crossOrigin = 'Anonymous';
  const n = document.createElement('canvas'),
    r = n.getContext('2d');
  if (!r) return t(new Error('CTX is null'), n);
  ((o.onerror = () => {
    t(new Error('Failed to load image'), n);
  }),
    (o.onload = () => {
      try {
        if (
          ((n.width = o.naturalWidth + 2),
          (n.height = o.naturalHeight + 2),
          r.drawImage(o, 0, 0),
          s.length < 3)
        ) {
          t(null, n);
          return;
        }
        if (
          (r.beginPath(),
          r.moveTo(0, 0),
          r.lineTo(n.width, 0),
          r.lineTo(n.width, n.height),
          r.lineTo(0, n.height),
          r.lineTo(0, 0),
          r.lineTo(s[0].x + 1, s[0].y + 1),
          s.slice(1).forEach(({ x: h, y: c }) => r.lineTo(h + 1, c + 1)),
          r.lineTo(s[0].x + 1, s[0].y + 1),
          r.lineTo(0, 0),
          r.closePath(),
          r.clip('evenodd'),
          (r.globalCompositeOperation = 'destination-out'),
          r.fill(),
          e)
        ) {
          const h = s.map(({ x: v }) => v + 1),
            c = s.map(({ y: v }) => v + 1),
            [d, P] = [Math.min.apply(null, h), Math.min.apply(null, c)],
            [R, O] = [Math.max.apply(null, h), Math.max.apply(null, c)],
            [x, w] = [R - d, O - P],
            A = r.getImageData(d, P, x, w);
          ((n.width = x), (n.height = w), r.putImageData(A, 0, 0));
        }
        t(null, n);
      } catch (h) {
        t(h instanceof Error ? h : new Error(String(h)), n);
      }
    }),
    (o.src = i));
}
class C {
  constructor(s) {
    a(this, 'getSvgElement');
    this.getSvgElement = s;
  }
  getSvg() {
    const s = this.getSvgElement();
    if (!s) throw new Error('SVG is null');
    return s;
  }
  getCTM() {
    const s = this.getSvg();
    let t = s.getCTM();
    if ((t === null && (t = s.querySelector('rect[visibility="hidden"]').getCTM()), !t))
      throw new Error('CTM is null');
    return t;
  }
  getViewboxSize() {
    return this.getSvg().viewBox.baseVal;
  }
  getRealSize() {
    const s = this.getSvg();
    return {
      width: s.clientWidth,
      height: s.clientHeight
    };
  }
  getViewboxOffset() {
    const s = this.getSvg(),
      { width: t, height: e } = this.getRealSize(),
      { width: o, height: n } = this.getViewboxSize(),
      r = Object.assign(s.createSVGPoint(), {
        x: t,
        y: e
      }),
      h = this.getCTM(),
      { x: c, y: d } = r.matrixTransform(h.inverse());
    return {
      x: c - o,
      y: d - n
    };
  }
  convertViewboxPointsToReal(s) {
    const t = this.getSvg(),
      e = this.getCTM();
    return s.map(({ x: o, y: n }) => {
      const r = Object.assign(t.createSVGPoint(), { x: o, y: n }).matrixTransform(e);
      return u(r);
    });
  }
  convertRealPointsToViewbox(s) {
    const t = this.getSvg(),
      e = this.getCTM().inverse();
    return s.map(({ x: o, y: n }) => {
      const r = Object.assign(t.createSVGPoint(), { x: o, y: n }).matrixTransform(e);
      return u(r, 1e3);
    });
  }
  getBorderPoints(s = !0) {
    const { width: t, height: e } = this.getViewboxSize(),
      { x: o, y: n } = this.getViewboxOffset(),
      r = [
        { x: -o, y: -n },
        { x: t + o, y: -n },
        { x: t + o, y: e + n },
        { x: -o, y: e + n }
      ];
    return (s && r.push({ x: -o, y: -n }), r);
  }
  isAboveTheBorder({ x: s, y: t }) {
    const { width: e, height: o } = this.getViewboxSize(),
      { x: n, y: r } = this.getViewboxOffset();
    return s < -n || s > e + n || t < -r || t > o + r;
  }
  getMouseCoordinates(s) {
    const t = s,
      { clientX: e, clientY: o } =
        t.changedTouches && t.touches ? t.changedTouches[0] || t.touches[0] : t,
      n = this.getSvg(),
      r = n.getScreenCTM();
    if (!r) throw new Error('ScreenCTM is null');
    const h = n.createSVGPoint();
    ((h.x = e), (h.y = o));
    const { x: c, y: d } = h.matrixTransform(r.inverse());
    return { x: c, y: d };
  }
}
const L = (i) =>
    class extends T {
      constructor() {
        super(...arguments);
        a(this, 'ref', y());
        a(
          this,
          'svg',
          new C(() => {
            var e, o;
            return (o = (e = this.ref) == null ? void 0 : e.current) == null
              ? void 0
              : o.ownerSVGElement;
          })
        );
        a(this, 'dragLastPosition', null);
        a(this, 'wasMoved', !1);
        a(this, 'onMouseTouchDown', (e) => {
          if (e.target === this.ref.current && this.props.draggable) {
            (e.stopImmediatePropagation(), e.preventDefault());
            const o = e.target;
            ((this.dragLastPosition = this.getMousePosition(e)),
              o.ownerSVGElement && o.ownerSVGElement.focus({ preventScroll: !0 }));
          }
        });
        a(this, 'onMouseTouchMove', (e) => {
          if (this.dragLastPosition) {
            (e.stopImmediatePropagation(), e.preventDefault());
            const { x: o, y: n } = this.getMousePosition(e),
              r = o - this.dragLastPosition.x,
              h = n - this.dragLastPosition.y;
            (!this.wasMoved &&
              this.props.onDragStart &&
              this.props.onDragStart({
                x: this.dragLastPosition.x,
                y: this.dragLastPosition.y,
                dx: r,
                dy: h
              }),
              this.props.onDrag && this.props.onDrag({ dx: r, dy: h }),
              (this.dragLastPosition = { x: o, y: n }),
              (this.wasMoved = !0));
          }
        });
        a(this, 'onMouseTouchUp', (e) => {
          (this.dragLastPosition &&
            this.wasMoved &&
            (e.stopImmediatePropagation(),
            e.preventDefault(),
            (e instanceof MouseEvent || !e.touches) &&
              window.addEventListener('click', (o) => o.stopPropagation(), {
                capture: !0,
                once: !0
              }),
            this.props.onDragEnd &&
              this.props.onDragEnd({
                x: this.dragLastPosition.x,
                y: this.dragLastPosition.y
              })),
            (this.dragLastPosition = null),
            (this.wasMoved = !1));
        });
      }
      render() {
        const { draggable: e, onDrag: o, onDragStart: n, onDragEnd: r, ...h } = this.props;
        return /* @__PURE__ */ g(i, { ref: this.ref, ...h, draggable: e });
      }
      componentDidUpdate(e) {
        e.draggable &&
          !this.props.draggable &&
          this.dragLastPosition &&
          this.wasMoved &&
          (this.props.onDragEnd &&
            this.props.onDragEnd({
              x: this.dragLastPosition.x,
              y: this.dragLastPosition.y
            }),
          (this.dragLastPosition = null),
          (this.wasMoved = !1));
      }
      componentDidMount() {
        (window.addEventListener('mousedown', this.onMouseTouchDown, !0),
          window.addEventListener('mousemove', this.onMouseTouchMove, !0),
          window.addEventListener('mouseup', this.onMouseTouchUp, !0),
          window.addEventListener('touchstart', this.onMouseTouchDown, !0),
          window.addEventListener('touchmove', this.onMouseTouchMove, !0),
          window.addEventListener('touchend', this.onMouseTouchUp, !0));
      }
      componentWillUnmount() {
        (window.removeEventListener('mousedown', this.onMouseTouchDown),
          window.removeEventListener('mousemove', this.onMouseTouchMove),
          window.removeEventListener('mouseup', this.onMouseTouchUp),
          window.removeEventListener('touchstart', this.onMouseTouchDown),
          window.removeEventListener('touchmove', this.onMouseTouchMove),
          window.removeEventListener('touchend', this.onMouseTouchUp));
      }
      getMousePosition(e) {
        const o = e;
        return this.svg.getMouseCoordinates(o);
      }
    },
  U = L(
    b(function ({ path: s, animate: t, draggable: e }, o) {
      return /* @__PURE__ */ g('polyline', {
        ref: o,
        style: { cursor: e ? 'move' : '' },
        points: s.map(({ x: n, y: r }) => `${n},${r}`).join(' '),
        fill: 'rgba(0,0,0,0)',
        stroke: 'white',
        strokeWidth: '1.5',
        shapeRendering: 'geometricPrecision',
        strokeDasharray: '3',
        strokeDashoffset: '0',
        vectorEffect: 'non-scaling-stroke',
        children:
          t &&
          /* @__PURE__ */ g('animate', {
            attributeName: 'stroke-dashoffset',
            values: '0;1000;0',
            dur: '100s',
            repeatCount: 'indefinite'
          })
      });
    })
  );
function H({ path: i }) {
  return /* @__PURE__ */ g('polygon', {
    style: {
      pointerEvents: 'none',
      transform: 'translate(-1px, -1px)'
    },
    points: i.map(({ x: s, y: t }) => `${s},${t}`).join(' '),
    fill: 'rgba(0, 0, 0, 0.5)',
    fillRule: 'evenodd',
    stroke: 'null',
    shapeRendering: 'geometricPrecision'
  });
}
const Y = L(
  b(function ({ x: s, y: t, onClickTouchEvent: e, draggable: o, style: n }, r) {
    const { cursor: h = o ? 'move' : 'default', ...c } = n;
    return /* @__PURE__ */ g('rect', {
      style: {
        cursor: h,
        ...c
      },
      ref: r,
      x: s - 10,
      y: t - 10,
      onClick: (d) => {
        (d.stopPropagation(), d.preventDefault(), e(d));
      },
      onTouchEnd: (d) => {
        (d.stopPropagation(), d.preventDefault(), e(d));
      },
      width: '20px',
      height: '20',
      fill: 'rgba(0, 0, 0, 0)',
      stroke: 'white',
      strokeWidth: '1.25',
      vectorEffect: 'non-scaling-stroke'
    });
  })
);
var p = /* @__PURE__ */ ((i) => (
  (i.ADD = 'ADD'),
  (i.DELETE = 'DELETE'),
  (i.MODIFY = 'MODIFY'),
  (i.MOVE = 'MOVE'),
  (i.RESET = 'RESET'),
  (i.CHANGE = 'CHANGE'),
  i
))(p || {});
function j(i, s) {
  const t = i.points.length;
  switch (s.type) {
    case 'ADD':
      return i.closed
        ? [i, !1]
        : (t > 0 && f(i.points[t - 1], s.payload)) || (t > 1 && f(i.points[t - 2], s.payload))
          ? [i, !1]
          : t > 2 && f(i.points[0], s.payload)
            ? [{ points: [...i.points], closed: !0 }, !0]
            : [{ points: [...i.points, s.payload], closed: !1 }, !0];
    case 'DELETE':
      return [
        {
          points: [...i.points.filter((e, o) => s.payload !== o)],
          closed: t > 4 && i.closed
        },
        !0
      ];
    case 'MODIFY': {
      const { x: e, y: o } = i.points[s.payload.index];
      return [
        {
          points: i.points.map(({ x: r, y: h }) =>
            r === e && h === o
              ? {
                  x: s.payload.x,
                  y: s.payload.y
                }
              : { x: r, y: h }
          ),
          closed: i.closed
        },
        !!(s.payload.x || s.payload.y)
      ];
    }
    case 'MOVE':
      return [
        {
          points: i.points.map(({ x: e, y: o }) => ({
            x: e + s.payload.x,
            y: o + s.payload.y
          })),
          closed: i.closed
        },
        !!(s.payload.x || s.payload.y)
      ];
    case 'CHANGE': {
      const e = !m(s.payload, i.points);
      return [
        {
          points: s.payload,
          closed: e ? s.payload.length > 2 : i.closed
        },
        e
      ];
    }
    case 'RESET':
      return [{ points: [], closed: !1 }, !!i.points.length];
    default:
      return [i, !1];
  }
}
class E extends T {
  constructor(t) {
    super(t);
    a(this, 'state');
    a(this, 'imageRef', y());
    a(this, 'svgRef', y());
    a(
      this,
      'svg',
      new C(() => {
        var t;
        return (t = this.svgRef) == null ? void 0 : t.current;
      })
    );
    a(this, 'angles', []);
    a(this, 'path', {
      points: [],
      closed: !1
    });
    a(this, 'lastEmittedPoints', []);
    a(this, 'lastUpdatedPoints', []);
    a(this, 'imgError', !1);
    a(this, 'setPathFromPropsOnMediaLoad', !0);
    a(this, 'hidePointer', () => {
      const t = this.path.points[this.path.points.length - 1] || {
        x: 0,
        y: 0
      };
      this.setPointer({ ...t }, !0);
    });
    // Events
    a(this, 'onShapeDrag', ({ dx: t, dy: e }) => {
      this.path.points
        .map(({ x: n, y: r }) => ({
          x: n + t,
          y: r + e
        }))
        .some((n) => this.svg.isAboveTheBorder(n)) ||
        this.dispatchPathAction({
          type: p.MOVE,
          payload: { x: t, y: e }
        });
    });
    a(this, 'onPointDrag', (t, { dx: e, dy: o }) => {
      const n = { ...this.path.points[t] };
      ((n.x += e),
        (n.y += o),
        this.svg.isAboveTheBorder(n) ||
          this.dispatchPathAction({
            type: p.MODIFY,
            payload: { ...n, index: t }
          }));
    });
    a(this, 'onPointClick', (t) => {
      this.isLoaded() &&
        !this.props.disabled &&
        !this.path.closed &&
        this.dispatchPathAction({
          type: p.ADD,
          payload: this.path.points[t]
        });
    });
    a(this, 'onDragEnd', () => {
      this.checkIfPathUpdated(!1);
    });
    a(this, 'onMediaLoaded', (t) => {
      (this.setPathFromPropsOnMediaLoad &&
        (this.setPathStateFromProps(), (this.setPathFromPropsOnMediaLoad = !1)),
        (this.imgError = !1),
        this.props.onImageLoad(t));
    });
    a(this, 'onMediaError', (t) => {
      (this.dispatchPathAction({ type: p.RESET }),
        (this.imgError = !0),
        this.props.onImageError(t));
    });
    a(this, 'onClickTouchEvent', (t) => {
      if (this.isLoaded() && !this.props.disabled) {
        if (this.path.closed) {
          t.target === this.svgRef.current &&
            this.dispatchPathAction({
              type: p.RESET
            });
          return;
        }
        const [e] = this.getMousePosition(t);
        this.svg.isAboveTheBorder(e)
          ? this.hidePointer()
          : this.dispatchPathAction({
              type: p.ADD,
              payload: u(e, 1e3),
              pointer: e
            });
      }
    });
    a(this, 'onClick', (t) => {
      this.onClickTouchEvent(t);
    });
    a(this, 'onTouchEnd', (t) => {
      (t.cancelable && (t.preventDefault(), this.onClickTouchEvent(t)), this.hidePointer());
    });
    a(this, 'onMouseTouchMove', (t) => {
      if (this.isLoaded()) {
        const [e] = this.getMousePosition(t);
        this.setPointer(e);
      }
    });
    a(this, 'onContextMenu', (t) => {
      if (this.isLoaded() && (t.preventDefault(), !this.props.disabled && !this.path.closed)) {
        const [e, { index: o }] = this.getMousePosition(t);
        o > -1
          ? this.dispatchPathAction({
              type: p.DELETE,
              payload: o,
              pointer: e
            })
          : this.setPointer(e);
      }
    });
    this.state = {
      path: {
        points: [],
        closed: !1
      },
      pointer: {
        x: t.viewBox.width / 2,
        y: t.viewBox.width / 2
      }
    };
  }
  render() {
    return /* @__PURE__ */ M('div', {
      className: k({
        ReactFreeSelect__Component: !0,
        ReactFreeSelect__Closed: this.state.path.closed,
        ReactFreeSelect__Disabled: this.props.disabled
      }),
      style: {
        display: 'inline-block',
        position: 'relative',
        margin: '0',
        padding: '0',
        fontSize: '0',
        cursor: this.props.disabled ? 'not-allowed' : 'default',
        ...this.props.style
      },
      children: [
        /* @__PURE__ */ g('img', {
          ref: this.imageRef,
          src: this.props.src,
          alt: this.props.imageAlt,
          crossOrigin: this.props.crossOrigin,
          style: this.props.imageStyle,
          onLoad: this.onMediaLoaded,
          onError: this.onMediaError
        }),
        /* @__PURE__ */ M('svg', {
          ref: this.svgRef,
          style: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            userSelect: 'none',
            touchAction: 'none'
          },
          viewBox: `0 0 ${this.props.viewBox.width} ${this.props.viewBox.height}`,
          onMouseMove: this.onMouseTouchMove,
          onTouchMove: this.onMouseTouchMove,
          onClick: this.onClick,
          onTouchEnd: this.onTouchEnd,
          onContextMenu: this.onContextMenu,
          onMouseLeave: this.hidePointer,
          children: [
            /* @__PURE__ */ g('rect', { visibility: 'hidden' }),
            !!this.state.path.points.length &&
              /* @__PURE__ */ g(H, { path: this.getPolygonPoints() }),
            /* @__PURE__ */ g(U, {
              draggable: this.state.path.closed && !this.props.disabled,
              onDrag: this.onShapeDrag,
              onDragEnd: this.onDragEnd,
              animate: !this.props.disabled,
              path: this.getPolylinePoints()
            }),
            this.getRoundedPoints().map(({ x: t, y: e }, o) =>
              /* @__PURE__ */ g(
                Y,
                {
                  x: t,
                  y: e,
                  draggable: !this.props.disabled && !this.props.disabledShapeChange,
                  style: {
                    cursor:
                      !o && this.state.path.points.length > 2 && !this.state.path.closed
                        ? 'pointer'
                        : void 0
                  },
                  onDrag: ({ dx: n, dy: r }) => this.onPointDrag(o, { dx: n, dy: r }),
                  onDragEnd: this.onDragEnd,
                  onClickTouchEvent: () => this.onPointClick(o)
                },
                o
              )
            )
          ]
        })
      ]
    });
  }
  componentDidUpdate(t) {
    (!t.disabled && this.props.disabled && !this.path.closed && this.hidePointer(),
      t.src && t.src !== this.props.src
        ? this.dispatchPathAction({ type: p.RESET })
        : m(t.value, this.props.value) ||
          (this.isLoaded()
            ? this.setPathStateFromProps()
            : (this.setPathFromPropsOnMediaLoad = !0)));
  }
  convertPoints(t) {
    const e = this.getAspectRatio();
    return this.svg.convertViewboxPointsToReal(t).map(({ x: o, y: n }) => ({
      x: Math.round(o / e.x),
      y: Math.round(n / e.y)
    }));
  }
  checkIfPathUpdated(t) {
    if (this.path.closed || t) {
      const e = this.convertPoints(this.path.points);
      m(e, this.lastUpdatedPoints) ||
        (this.emitOnComplete(e),
        (this.lastUpdatedPoints = e.map(({ x: o, y: n }) => ({ x: o, y: n }))));
    }
  }
  emitOnChange({ points: t }) {
    if (this.props.onChange) {
      const e = this.convertPoints(t);
      ((this.lastEmittedPoints = e), this.props.onChange(e));
    }
  }
  emitOnComplete(t) {
    this.props.onComplete && this.props.onComplete(t);
  }
  setPointer({ x: t, y: e }, o = !1) {
    (o || !this.props.disabled) &&
      this.setState({
        path: this.path,
        pointer: { x: t, y: e }
      });
  }
  dispatchPathAction(t) {
    const e = this.path.closed,
      [o, n] = j(this.path, t);
    ((o.points = o.points.map((r) => u(r, 1e3))),
      n &&
        ((this.path = o),
        this.setState({
          pointer: t.pointer || this.path.points[this.path.points.length - 1] || { x: 0, y: 0 },
          path: o
        }),
        (this.angles = G(o.points)),
        this.emitOnChange(o),
        [p.MODIFY, p.MOVE].includes(t.type) || this.checkIfPathUpdated(e)));
  }
  isLoaded() {
    if (this.imgError || !this.svgRef.current) return !1;
    const t = this.svgRef.current;
    return !!(t.width.baseVal.value && t.height.baseVal.value);
  }
  getAspectRatio() {
    return this.imageRef.current
      ? {
          x: this.imageRef.current.clientWidth / this.imageRef.current.naturalWidth,
          y: this.imageRef.current.clientHeight / this.imageRef.current.naturalHeight
        }
      : { x: NaN, y: NaN };
  }
  setPathStateFromProps() {
    if (m(this.lastEmittedPoints, this.props.value)) return;
    const t = this.getAspectRatio(),
      e = this.svg.convertRealPointsToViewbox(
        this.props.value.map(({ x: o, y: n }) => ({
          x: o * t.x,
          y: n * t.y
        }))
      );
    this.dispatchPathAction({
      type: p.CHANGE,
      payload: e
    });
  }
  getRoundedPoints() {
    return this.state.path.points.map((t) => u(t));
  }
  getBorder() {
    return this.svg
      .getBorderPoints()
      .map((t) => u(t))
      .map(({ x: t, y: e }) => ({ x: t - 1, y: e + 1 }));
  }
  getPolygonPoints() {
    const t = this.getRoundedPoints(),
      e = this.getBorder();
    return this.state.path.closed ? [...e, ...t, t[0], e[0]] : e;
  }
  getPolylinePoints() {
    const t = this.getRoundedPoints();
    return t.concat(this.state.path.closed ? t[0] : u(this.state.pointer));
  }
  getMousePosition(t, e = !0, o = !0) {
    let n = this.svg.getMouseCoordinates(t);
    if (o) {
      const c = navigator.platform.includes('Mac') ? t.metaKey : t.ctrlKey,
        d = this.path.points[this.path.points.length - 1];
      c && d && (t.shiftKey ? (n = F(d, n, this.angles)) : (n = N(d, n, Math.PI / 12)));
    }
    const { point: r, index: h } = B(this.path.points, n, 10);
    return (e && h > -1 && (n = { ...r }), [n, { point: r, index: h }]);
  }
}
(a(E, 'propTypes', {
  value: l.arrayOf(
    l.exact({
      x: l.number.isRequired,
      y: l.number.isRequired
    })
  ),
  style: l.shape({}),
  viewBox: l.exact({
    width: l.number.isRequired,
    height: l.number.isRequired
  }),
  disabled: l.bool,
  disabledShapeChange: l.bool,
  onChange: l.func,
  onComplete: l.func,
  src: l.string.isRequired,
  imageAlt: l.string,
  crossOrigin: l.string,
  imageStyle: l.shape({}),
  onImageLoad: l.func,
  onImageError: l.func
}),
  a(E, 'defaultProps', {
    value: [],
    style: {},
    imageStyle: {},
    viewBox: { width: 1e3, height: 1e3 },
    disabled: !1,
    disabledShapeChange: !1,
    onImageError: Function.prototype,
    onImageLoad: Function.prototype
  }));
export { E as ReactLassoSelect, X as getCanvas };
