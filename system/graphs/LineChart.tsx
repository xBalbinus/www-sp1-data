import * as d3 from 'd3';
import { AutoSizedGraph } from './AutoSizedGraph';
import {
  styleWrappedText,
} from './graphs-common';

const RANGE_MARGIN_TOP_EM = 4;
const RANGE_MARGIN_BOTTOM_EM = 1.5;
const VALUE_LABEL_MARGIN_EM = 0.5;
const RANGE_MARGIN_LEFT_EM = 4;
const POINT_RADIUS_EM = 4;

interface Data {
  label: string;
  value: number;
}

export interface LineGraphProps {
  data: Data[];
  title: string;
  fontSize?: number;
}

export default function LineGraph(props: LineGraphProps) {
  function drawGraph(
    element: SVGSVGElement,
    width: number,
    height: number,
    fontSize: number,
  ) {
    const svg = d3.select(element).attr('fill', 'var(--color-white)');

    const labels = props.data.map((data) => data.label);

    const titleSel = svg.select<SVGGElement>('.title');
    styleWrappedText(titleSel, {
      dominantBaseline: 'hanging',
      fontSize,
      maxWidth: width / 1.5,
      text: props.title,
      textAlign: 'middle',
      x: width / 2,
      y: 0,
    });
    titleSel.attr('font-style', 'normal');

    const rangeLeft = RANGE_MARGIN_LEFT_EM * fontSize;
    const rangeRight = width;
    const rangeTop = RANGE_MARGIN_TOP_EM * fontSize;
    const rangeBottom = height - RANGE_MARGIN_BOTTOM_EM * fontSize;

    const yScale = d3.scaleLinear(
      [0, d3.max(props.data, (d) => d.value)],
      [rangeBottom, rangeTop]
    );
    const xScale = d3.scalePoint(labels, [rangeLeft, rangeRight]).padding(1);

    const ticks = yScale.ticks(5);

    function styleLine(data: Data[]) {
      if (!data?.length) return;

      const sel = d3.select(this);

      const meanColor = 'var(--theme-text)';
      const areaColor = 'var(--theme-foreground)';

      // Area under mean line
      const meanArea = d3.area<Data>(
        (d) => xScale(d.label),
        (d) => yScale(d.value),
        (d) => yScale(0)
      );
      sel
        .select('.mean-area')
        .attr('d', meanArea(data))
        .attr('stroke', 'none')
        .attr('fill', areaColor);

      // Mean line
      const meanLine = d3.line<Data>(
        (d) => xScale(d.label),
        (d) => yScale(d.value)
      );
      sel
        .select('.mean-line')
        .attr('d', meanLine(data))
        .attr('stroke', meanColor)
        .attr('fill', 'none')
        .attr('stroke-width', 2);

      // Value point markers
      sel
        .select('.value-markers')
        .selectChildren()
        .data(data)
        .join('circle')
        .attr('r', POINT_RADIUS_EM)
        .attr('cx', (d) => xScale(d.label))
        .attr('cy', (d) => yScale(d.value))
        .attr('fill', meanColor);
    }

    // Ticks
    svg
      .select('.ticks')
      .selectChildren()
      .data(ticks)
      .join('line')
      .attr('x1', rangeLeft)
      .attr('x2', rangeRight)
      .attr('y1', (d) => yScale(d))
      .attr('y2', (d) => yScale(d))
      .attr('stroke', 'var(--theme-graph-tick)')
      .attr('stroke-dasharray', '2,2')
      .attr('opacity', '0.5');

    // Tick value labels
    svg
      .select('.tick-values')
      .selectChildren()
      .data(ticks)
      .join('text')
      .text((d) => d)
      .attr(
        'x',
        RANGE_MARGIN_LEFT_EM * fontSize - VALUE_LABEL_MARGIN_EM * fontSize
      )
      .attr('y', (d) => yScale(d))
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'var(--color-white)');

    const groups = d3.group(props.data, (d) => d.group);
    svg
      .select('.lines')
      .selectChildren()
      .data(groups.values())
      .join((enter) => {
        const g = enter.append('g');
        g.append('path').classed('mean-area', true);
        g.append('path').classed('mean-line', true);
        g.append('g').classed('value-markers', true);
        g.append('g').classed('value-labels', true);
        return g;
      })
      .each(styleLine);

    // Bottom labels
    svg
      .select('.labels')
      .selectAll('.label')
      .data(new Set(labels))
      .join('text')
      .classed('label', true)
      .attr('x', (d) => xScale(d) + xScale.bandwidth() * 0.5)
      .attr('y', height)
      .attr('dominant-baseline', 'normal')
      .attr('text-anchor', 'middle')
      .attr('font-style', 'italic')
      .attr('fill', 'var(--color-white)')
      .text((d) => {
        return d.slice(0, 16);
      });
  }

  return (
    <AutoSizedGraph drawGraph={drawGraph} fontSize={props.fontSize} drawGraphDeps={[
      props.fontSize
    ]}>
      <g className="title">{props.title}</g>
      <g className="ticks"></g>
      <g className="tick-values"></g>
      <g className="lines"></g>
      <g className="labels"></g>
    </AutoSizedGraph>
  );
}
