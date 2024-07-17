import * as React from 'react';

const DEFAULT_FONT_SIZE = 14;

interface Props {
  drawGraph: (
    element: SVGSVGElement,
    width: number,
    height: number,
    fontSize: number
  ) => void;
  drawGraphDeps?: any[];
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disableAutoSize?: boolean;
  fontSize?: number;
}

export function AutoSizedGraph(props: Props) {
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [blockExport, setBlockExport] = React.useState(true);

  const pendingCount = React.useRef(0);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (!svgRef.current) return;
      setContainerWidth(svgRef.current.clientWidth);
      setContainerHeight(svgRef.current.clientHeight);
    };

    handleResize();
    const listener = new ResizeObserver(handleResize);
    if (svgRef.current) {
      listener.observe(svgRef.current);
    }
    return () => listener.disconnect();
  }, []);

  React.useEffect(() => {
    if (containerWidth === 0 || containerHeight === 0) {
      console.warn(
        `Container width (${containerWidth}) or height (${containerHeight}) is zero, skipping re-render`
      );
      return;
    }

    if (!svgRef.current) return;

    pendingCount.current++;
    setBlockExport(true);
    try {
      props.drawGraph(
        svgRef.current,
        containerWidth,
        containerHeight,
        props.fontSize || DEFAULT_FONT_SIZE
      );
    } finally {
      pendingCount.current--;
      if (!pendingCount.current) {
        if (!svgRef.current) return;
        setBlockExport(false);
      }
    }
  }, [
    ...(props.drawGraphDeps || []),
    containerWidth,
    containerHeight,
    props.fontSize,
  ]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      style={{
        fontFamily: 'Google Sans Flex',
        fontSize: props.fontSize,
        ...props.style,
      }}
      fill="var(--theme-graph-dark-text)"
    >
      {props.children}
    </svg>
  );
}
