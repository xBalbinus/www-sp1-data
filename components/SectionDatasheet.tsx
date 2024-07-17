import styles from '@components/SectionDatasheet.module.scss';

import * as React from 'react';

import Content from '@system/layouts/Content';

import LineChart from '@system/graphs/LineChart';
import Table from '@system/Table';

import Tag from '@system/documents/Tag';
import TextSwapper from '@system/animations/TextSwapper';

import { H2, H5, Lead } from '@system/typography';

export default function SectionDatasheet(props) {
  console.log(props.data);
  const containerStyles = { background: `var(--theme-text)`, borderRadius: 8, color: `var(--theme-background)`, minWidth: 228, padding: `8px 24px 8px 24px` };

  const formattedData = props.data.map((item, index) => ({
    id: index + 1,
    data: [
      <Tag>{item.program}</Tag>,
      <H5>{item.hashfn}</H5>,
      <H5>{item.shard_size}</H5>,
      <H5>{item.cycles}</H5>,
      <H5>{item.speed.toFixed(2)}</H5>,
      <H5>{item.execution_duration.toFixed(2)}</H5>,
      <H5>{item.prove_duration.toFixed(2)}</H5>,
      <H5>{item.verify_duration.toExponential(2)}</H5>,
    ],
  }));

  return (
    <div className={styles.root}>
      {props.hideContent ? null : (
        <Content>
          <H2>DemoBentoLayout</H2>
          <Lead style={{ marginTop: `1rem` }}>2 or 4 row sections that can be resized and viewed in any viewport.</Lead>
        </Content>
      )}

      <div className={styles.bento}>
        <div className={styles.row}>
          <div style={{ width: `100%` }}>
            <Table data={formattedData} headings={['Program', 'Hash Function', 'Shard Size', 'Cycles', 'Speed', 'Execution Duration', 'Prove Duration', 'Verify Duration']} />
          </div>
        </div>
      </div>
    </div>
  );
}
