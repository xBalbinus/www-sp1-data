import * as d3 from 'd3';

export const COLOR_DESIRABLE = 'var(--color-google-graph-blue)';
export const COLOR_NEUTRAL = 'var(--color-google-graph-grey)';
export const COLOR_UNDESIRABLE = 'var(--color-google-graph-salmon)';

export function formatPercentage(d: number): string {
  return Math.round(d * 100) + '%';
}

export function formatChange(d: string | number): string {
  const s = d.toString();
  if (!s.startsWith('-') && !s.startsWith('+')) return '+' + s;
  return s;
}

export function styleVerticalCiMarkers<Data>(
  sel: d3.Selection<SVGGElement, Data, any, any>,
  params: {
    getX: (d: Data) => number;
    getYMin: (d: Data) => number;
    getYMax: (d: Data) => number;
    width: number;
  }
) {
  const getX = params.getX;
  const getXMin = (d: Data) => params.getX(d) - params.width * 0.5;
  const getXMax = (d: Data) => params.getX(d) + params.width * 0.5;
  const getYMin = params.getYMin;
  const getYMax = params.getYMax;

  // (xBalbinus) A lighter shade of grey that meets accessibility standards
  sel.attr('stroke', 'var(--theme-graph-sub-label)');

  // Clear children before render
  sel.selectAll('*').remove();

  // Top horizontal line
  sel
    .append('line')
    .attr('x1', getXMin)
    .attr('x2', getXMax)
    .attr('y1', getYMin)
    .attr('y2', getYMin);

  // Bottom horizontal line
  sel
    .append('line')
    .attr('x1', getXMin)
    .attr('x2', getXMax)
    .attr('y1', getYMax)
    .attr('y2', getYMax);

  // Vertical line
  sel
    .append('line')
    .attr('x1', getX)
    .attr('x2', getX)
    .attr('y1', getYMin)
    .attr('y2', getYMax);
}

export interface LegendItem {
  label: string;
  cssColor: string;
  boxText?: string;
}

export interface LegendSettings {
  itemSpacingEM: number;
  fontSize: number;
  iconMarginEM: number;
  boxShape?: boolean;
}

export function styleLegend(
  sel: d3.Selection<SVGGElement, any, any, any>,
  items: LegendItem[],
  settings?: Partial<LegendSettings>
) {
  const finalSettings: LegendSettings = {
    itemSpacingEM: 2,
    fontSize: 14,
    iconMarginEM: 0.5,
    ...settings,
  };

  sel.selectChildren().remove();
  const itemsSel = sel
    .selectChildren<SVGGElement, unknown>()
    .data(items)
    .join('g');

  // Draw icons
  let iconWidth: number;
  if (finalSettings.boxShape) {
    iconWidth = finalSettings.fontSize * 4;
    const iconHeight = iconWidth * 0.5;

    itemsSel
      .append('rect')
      .classed('legend-icon', true)
      .attr('width', iconWidth)
      .attr('height', iconHeight)
      .attr('x', 0)
      .attr('y', -iconHeight * 0.5)
      .attr('stroke', 'var(--theme-graph-cell-borders)')
      .attr('fill', (d) => d.cssColor);

    itemsSel.each(function (d) {
      if (d.boxText) {
        d3.select(this)
          .append('text')
          .attr('x', iconWidth * 0.5)
          .attr('y', 0)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('font-size', finalSettings.fontSize)
          .attr('fill', 'var(--theme-graph-text)')
          .text(d.boxText);
      }
    });
  } else {
    iconWidth = finalSettings.fontSize;
    itemsSel
      .append('circle')
      .classed('legend-icon', true)
      .attr('r', iconWidth * 0.5)
      .attr('cx', iconWidth * 0.5)
      .attr('cy', 0)
      .attr('fill', (d) => d.cssColor);
  }

  // Draw text
  itemsSel
    .append('g')
    .classed('legend-label', true)
    .attr('font-size', finalSettings.fontSize)
    .each(function (d) {
      styleWrappedText(d3.select(this), {
        dominantBaseline: 'hanging',
        textAlign: 'left',
        fontSize: finalSettings.fontSize,
        maxWidth: 175,
        x: 0,
        y: 0,
        text: d.label,
      });
    });

  itemsSel.each(function (d) {
    const itemSel = d3.select(this);
    const labelSel = itemSel.select<SVGGElement>('.legend-label');
    const iconSel = itemSel.select<SVGRectElement | SVGCircleElement>(
      '.legend-icon'
    );

    align(
      labelSel,
      Alignment.LEFT_CENTER,
      iconSel.node().getBBox().width +
        finalSettings.iconMarginEM * finalSettings.fontSize,
      0
    );
  });

  // Space out items
  let offset = 0;
  itemsSel.each(function (d, i) {
    const width = this.getBBox().width;

    const transform = `translate(${offset},0)`;
    d3.select(this).attr('transform', transform);

    offset += width + finalSettings.itemSpacingEM * finalSettings.fontSize;
  });
}

export enum Alignment {
  CENTER,
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  LEFT_CENTER,
  RIGHT_CENTER,
  TOP_CENTER,
  BOTTOM_CENTER,
}

export enum AlignmentHorizontal {
  LEFT,
  RIGHT,
  CENTER,
}

export enum AlignmentVertical {
  TOP,
  BOTTOM,
  CENTER,
}

export function align(
  sel: d3.Selection<SVGGElement, unknown, d3.BaseType, unknown>,
  alignment: Alignment,
  x: number,
  y: number
) {
  const bbox = sel.node().getBBox();
  let dx = x - bbox.x;
  let dy = y - bbox.y;

  switch (alignment) {
    case Alignment.CENTER:
      dx -= bbox.width / 2;
      dy -= bbox.height / 2;
      break;
    case Alignment.LEFT:
      dy -= bbox.height / 2;
      break;
    case Alignment.RIGHT:
      dx -= bbox.width;
      dy -= bbox.height / 2;
      break;
    case Alignment.TOP:
      dx -= bbox.width / 2;
      break;
    case Alignment.BOTTOM:
      dx -= bbox.width / 2;
      dy -= bbox.height;
      break;
    case Alignment.TOP_LEFT:
      break;
    case Alignment.TOP_RIGHT:
      dx -= bbox.width;
      break;
    case Alignment.BOTTOM_LEFT:
      dy -= bbox.height;
      break;
    case Alignment.BOTTOM_RIGHT:
      dx -= bbox.width;
      dy -= bbox.height;
      break;
    case Alignment.LEFT_CENTER:
      dy -= bbox.height / 2;
      break;
    case Alignment.RIGHT_CENTER:
      dx -= bbox.width;
      dy -= bbox.height / 2;
      break;
    case Alignment.TOP_CENTER:
      dx -= bbox.width / 2;
      break;
    case Alignment.BOTTOM_CENTER:
      dx -= bbox.width / 2;
      dy -= bbox.height;
      break;
  }

  sel.attr('transform', `translate(${dx}, ${dy})`);
}

export function alignHorizontal(
  sel: d3.Selection<SVGGElement, unknown, d3.BaseType, unknown>,
  alignment: AlignmentHorizontal,
  x: number
) {
  const bbox = sel.node().getBBox();
  let dx = x - bbox.x;

  switch (alignment) {
    case AlignmentHorizontal.LEFT:
      break;
    case AlignmentHorizontal.RIGHT:
      dx -= bbox.width;
      break;
    case AlignmentHorizontal.CENTER:
      dx -= bbox.width / 2;
      break;
  }

  sel.attr('transform', `translate(${dx}, 0)`);
}

export function alignVertical(
  sel: d3.Selection<SVGGElement, unknown, d3.BaseType, unknown>,
  alignment: AlignmentVertical,
  y: number
) {
  const bbox = sel.node().getBBox();
  let dy = y - bbox.y;

  switch (alignment) {
    case AlignmentVertical.TOP:
      break;
    case AlignmentVertical.BOTTOM:
      dy -= bbox.height;
      break;
    case AlignmentVertical.CENTER:
      dy -= bbox.height / 2;
      break;
  }

  sel.attr('transform', `translate(0, ${dy})`);
}

export function styleWrappedText(
  sel: d3.Selection<SVGGElement, unknown, d3.BaseType, unknown>,
  params: {
    text: string;
    maxWidth: number;
    x: number;
    y: number;
    textAlign: 'left' | 'middle' | 'right';
    dominantBaseline: 'hanging' | 'middle' | 'normal';
    fontSize: number;
  }
) {
  if (!params.text?.length) {
    return;
  }

  const words = params.text.split(/\s/);

  sel.selectChildren().remove();
  sel.attr('font-size', params.fontSize).attr('dominant-baseline', 'hanging');

  let lineSel = sel.append('text').attr('x', params.x).attr('y', params.y);
  let lineText = '';
  let lineNum = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const extendedLineText = lineText + ' ' + word;
    lineSel.text(extendedLineText);

    const lineWidth = lineSel.node().getBBox().width;

    // lineText hasn't been updated yet, so if it's empty now, then it means
    // only 1 word will be in the line after this iteration
    const canWrap = lineText.length > 0;
    const isOverWidth = lineWidth > params.maxWidth;

    if (isOverWidth && canWrap) {
      // If wrapping, undo the last word that was added and start a new line
      // with just the current word

      lineNum++;

      lineSel.text(lineText);
      lineSel = sel
        .append('text')
        .text(word)
        .attr('x', params.x)
        .attr('y', params.y + lineNum * 1.1 * params.fontSize);

      lineText = word;
    } else {
      // Otherwise, save the theoretical change
      lineText = extendedLineText;
    }
  }

  switch (params.textAlign) {
    case 'left':
      sel.attr('text-anchor', 'start');
      break;
    case 'middle':
      sel.attr('text-anchor', 'middle');
      break;
    case 'right':
      sel.attr('text-anchor', 'end');
      break;
  }

  const height = sel.node().getBBox().height;
  switch (params.dominantBaseline) {
    case 'hanging':
      break;
    case 'middle':
      sel.attr('transform', `translate(0,${-height * 0.5})`);
      break;
    case 'normal':
      sel.attr('transform', `translate(0,${-height})`);
      break;
  }
}
