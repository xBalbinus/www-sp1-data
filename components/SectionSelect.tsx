import styles from '@components/SectionSelect.module.scss';

import * as React from 'react';

import Content from '@system/layouts/Content';

import LineChart from '@root/system/graphs/LineChart';

import { H2, Lead } from '@system/typography';

export default function SectionSelect(props) {
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
          <div className={styles.columnWide}>
            <a href="/benchmarks" className={styles.full}>
              Benchmarks
            </a>
          </div>
          <div className={styles.columnWide}>
            <a href="/datasheets" className={styles.full}>
              Datasheet
            </a>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.columnWide}>
            <div className={styles.fullDisabled}>Crates.io Validation</div>
          </div>
          <div className={styles.columnWide}>
            <div className={styles.fullDisabled}>Application Benchmarks</div>
          </div>
        </div>
      </div>
    </div>
  );
}
