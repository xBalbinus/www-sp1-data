import styles from '@components/SectionBenchmarks.module.scss';

import * as React from 'react';

import Content from '@system/layouts/Content';

import LineChart from '@system/graphs/LineChart';

import { H2, H3, Lead } from '@system/typography';

export default function SectionBenchmarks(props) {
  const containerStyles = { background: `var(--theme-text)`, borderRadius: 8, color: `var(--theme-background)`, minWidth: 228, padding: `8px 24px 8px 24px` };

  const EXAMPLE_DUMMY_DATA = [
    { label: 'aesf2e', value: 70 },
    { label: 'f2fe24', value: 100 },
    { label: 'b3c4d5', value: 85 },
    { label: 'd4e5f6', value: 95 },
    { label: 'e5f6g7', value: 60 },
    { label: 'g7h8i9', value: 75 },
    { label: 'h8i9j0', value: 50 },
  ];

  return (
    <div className={styles.root}>
      {props.hideContent ? null : (
        <Content>
          <H2>SSZ</H2>
          <Lead style={{ marginTop: `1rem` }}>2 or 4 row sections that can be resized and viewed in any viewport.</Lead>
        </Content>
      )}
      <div className={styles.bento}>
        <div className={styles.row}>
          <LineChart data={EXAMPLE_DUMMY_DATA} title="Benchmarks" fontSize={12} />
        </div>
      </div>
    </div>
  );
}
