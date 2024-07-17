import * as d3 from 'd3';
import { AutoSizedGraph } from './AutoSizedGraph';
import {
  formatPercentage,
  styleWrappedText,
} from './graphs-common';
import { GraphValue } from '@root/common/graph';
import { getCommit } from '@root/common/utilities';

const RANGE_MARGIN_TOP_EM = 4;
const RANGE_MARGIN_BOTTOM_EM = 1.5;
const VALUE_LABEL_MARGIN_EM = 0.5;
const RANGE_MARGIN_LEFT_EM = 4;
const POINT_RADIUS_EM = 4;

interface Data {
  label: string;
  group?: string;
  value: GraphValue;
  deemphasized?: boolean;
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
    const svg = d3.select(element).attr('fill', 'var(--theme-graph-dark-text)');

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

      const meanColor = data[0].deemphasized
        ? 'var(--color-google-yellow-light)'
        : 'var(--theme-graph-line-mean)';
      const ciColor = data[0].deemphasized
        ? 'none'
        : 'var(--theme-graph-line-ci)';
      const areaColor = data[0].deemphasized
        ? 'none'
        : 'var(--theme-graph-line-area)';

      // Area under mean line
      const meanArea = d3.area<Data>(
        (d) => xScale(d.label),
        (d) => yScale(d.value.mean),
        (d) => yScale(0)
      );
      sel
        .select('.mean-area')
        .attr('d', meanArea(data))
        .attr('stroke', 'none')
        .attr('fill', areaColor);

      // CI area
      const ciArea = d3.area<Data>(
        (d) => xScale(d.label),
        (d) => yScale(d.value.lowerCI),
        (d) => yScale(d.value.upperCI)
      );
      sel
        .select('.ci-area')
        .attr('d', ciArea(data))
        .attr('stroke', 'none')
        .attr('fill', ciColor);

      // Mean line
      const meanLine = d3.line<Data>(
        (d) => xScale(d.label),
        (d) => yScale(d.value.mean)
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
        .attr('cy', (d) => yScale(d.value.mean))
        .attr('fill', meanColor);

      // Value labels
      sel
        .select('.value-labels')
        .selectChildren()
        .data(data)
        .join('text')
        .attr('x', (d) => xScale(d.label))
        .attr(
          'y',
          (d) => yScale(d.value.mean) - VALUE_LABEL_MARGIN_EM * fontSize
        )
        .attr('text-anchor', 'middle')
        .text((d) => formatPercentage(d.value.mean));
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
      .attr('dominant-baseline', 'middle');

    const groups = d3.group(props.data, (d) => d.group);
    svg
      .select('.lines')
      .selectChildren()
      .data(groups.values())
      .join((enter) => {
        const g = enter.append('g');
        g.append('path').classed('mean-area', true);
        g.append('path').classed('ci-area', true);
        g.append('path').classed('mean-line', true);
        g.append('g').classed('value-markers', true);
        g.append('g').classed('ci-markers', true);
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
      .attr('fill', 'var(--theme-graph-sub-label)')
      .text((d) => {
        const commit = '1234567890abcdef';
        return commit ? commit.slice(0, 16) : d.slice(0, 16);
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
