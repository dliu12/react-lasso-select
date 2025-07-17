import { Component } from 'react';
import { CSSProperties } from 'react';
import { default as default_2 } from 'prop-types';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { RefObject } from 'react';
import { SyntheticEvent } from 'react';

export declare function getCanvas(
  src: string,
  path: Point[],
  callback: (err: Error | null, canvas: HTMLCanvasElement) => void,
  crop?: boolean
): void;

declare enum pathActions {
  ADD = 'ADD',
  DELETE = 'DELETE',
  MODIFY = 'MODIFY',
  MOVE = 'MOVE',
  RESET = 'RESET',
  CHANGE = 'CHANGE'
}

declare type pathReducerAction =
  | {
      type: pathActions.ADD;
      payload: Point;
    }
  | {
      type: pathActions.DELETE;
      payload: number;
    }
  | {
      type: pathActions.MODIFY;
      payload: {
        index: number;
      } & Point;
    }
  | {
      type: pathActions.MOVE;
      payload: Point;
    }
  | {
      type: pathActions.RESET;
    }
  | {
      type: pathActions.CHANGE;
      payload: Point[];
    };

declare interface PathState {
  points: Point[];
  closed: boolean;
}

declare interface Point {
  x: number;
  y: number;
}

export declare interface ReactLassoProps {
  src: string;
  value: Point[];
  style: CSSProperties;
  viewBox: Size;
  disabled: boolean;
  disabledShapeChange: boolean;
  imageStyle: CSSProperties;
  onImageLoad: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  onImageError: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  onChange?: (path: Point[]) => void;
  onComplete?: (path: Point[]) => void;
  imageAlt?: string;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
}

export declare class ReactLassoSelect extends Component<ReactLassoProps, ReactLassoState> {
  state: ReactLassoState;
  imageRef: RefObject<HTMLImageElement>;
  svgRef: RefObject<SVGSVGElement>;
  svg: SVGHelper;
  angles: number[];
  path: PathState;
  lastEmittedPoints: Point[];
  lastUpdatedPoints: Point[];
  imgError: boolean;
  setPathFromPropsOnMediaLoad: boolean;
  constructor(props: ReactLassoProps);
  render(): JSX_2.Element;
  componentDidUpdate(prevProps: ReactLassoProps): void;
  convertPoints(points: Point[]): Point[];
  checkIfPathUpdated(wasClosedBefore: boolean): void;
  emitOnChange({ points }: PathState): void;
  emitOnComplete(convertedPoints: Point[]): void;
  setPointer({ x, y }: Point, force?: boolean): void;
  hidePointer: () => void;
  dispatchPathAction(
    action: pathReducerAction & {
      pointer?: Point;
    }
  ): void;
  isLoaded(): boolean;
  getAspectRatio(): Point;
  setPathStateFromProps(): void;
  getRoundedPoints(): Point[];
  getBorder(): Point[];
  getPolygonPoints(): Point[];
  getPolylinePoints(): Point[];
  getMousePosition(
    e: touchOrMouseEvent<SVGSVGElement>,
    lookupForNearlyPoints?: boolean,
    lookupForApproximation?: boolean
  ): [
    Point,
    {
      point: Point;
      index: number;
    }
  ];
  onShapeDrag: ({ dx, dy }: Vector) => void;
  onPointDrag: (idx: number, { dx, dy }: Vector) => void;
  onPointClick: (idx: number) => void;
  onDragEnd: () => void;
  onMediaLoaded: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onMediaError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onClickTouchEvent: (e: touchOrMouseEvent<SVGSVGElement>) => void;
  onClick: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onTouchEnd: (e: React.TouchEvent<SVGSVGElement>) => void;
  onMouseTouchMove: (e: touchOrMouseEvent<SVGSVGElement>) => void;
  onContextMenu: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  static propTypes: {
    value: default_2.Requireable<
      (
        | Required<
            default_2.InferProps<{
              x: default_2.Validator<number>;
              y: default_2.Validator<number>;
            }>
          >
        | null
        | undefined
      )[]
    >;
    style: default_2.Requireable<default_2.InferProps<{}>>;
    viewBox: default_2.Requireable<
      Required<
        default_2.InferProps<{
          width: default_2.Validator<number>;
          height: default_2.Validator<number>;
        }>
      >
    >;
    disabled: default_2.Requireable<boolean>;
    disabledShapeChange: default_2.Requireable<boolean>;
    onChange: default_2.Requireable<(...args: any[]) => any>;
    onComplete: default_2.Requireable<(...args: any[]) => any>;
    src: default_2.Validator<string>;
    imageAlt: default_2.Requireable<string>;
    crossOrigin: default_2.Requireable<string>;
    imageStyle: default_2.Requireable<default_2.InferProps<{}>>;
    onImageLoad: default_2.Requireable<(...args: any[]) => any>;
    onImageError: default_2.Requireable<(...args: any[]) => any>;
  };
  static defaultProps: {
    value: never[];
    style: {};
    imageStyle: {};
    viewBox: {
      width: number;
      height: number;
    };
    disabled: boolean;
    disabledShapeChange: boolean;
    onImageError: Function;
    onImageLoad: Function;
  };
}

export declare interface ReactLassoState {
  path: PathState;
  pointer: Point;
}

declare interface Size {
  width: number;
  height: number;
}

declare class SVGHelper {
  getSvgElement: () => SVGSVGElement | null | undefined;
  constructor(getSvgElement: () => SVGSVGElement | null | undefined);
  getSvg(): SVGSVGElement;
  getCTM(): DOMMatrix;
  getViewboxSize(): DOMRect;
  getRealSize(): Size;
  getViewboxOffset(): Point;
  convertViewboxPointsToReal(points: Point[]): Point[];
  convertRealPointsToViewbox(points: Point[]): Point[];
  getBorderPoints(repeatFirst?: boolean): Point[];
  isAboveTheBorder({ x, y }: Point): boolean;
  getMouseCoordinates(event: touchOrMouseEvent<SVGSVGElement>): Point;
}

declare type touchOrMouseEvent<T> = React.MouseEvent<T, MouseEvent> | React.TouchEvent<T>;

declare interface Vector {
  dx: number;
  dy: number;
}

export {};
