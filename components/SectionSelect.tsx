import styles from '@components/SectionSelect.module.scss';

import * as React from 'react';

import Content from '@system/layouts/Content';

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
            <div className={styles.full}>Crates.io Validation</div>
          </div>
          <div className={styles.columnWide}>
            <div className={styles.full}>Application Benchmarks</div>
          </div>
        </div>
        {/* 
            <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.full}>III</div>
            </div>
            <div className={styles.column}>
                <div className={styles.full}>IV</div>
            </div>
            <div className={styles.column}>
                <div className={styles.full}>V</div>
            </div>
            <div className={styles.column}>
                <div className={styles.full}>VI</div>
            </div>
            </div>
        */}
        <div className={styles.row}>
          <div className={styles.columnWide}>
            <div className={styles.full}>Benchmarks</div>
          </div>
          <div className={styles.columnWide}>
            <div className={styles.full}>Datasheet</div>
          </div>
        </div>
        {/* 
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.full}>VIIII</div>
          </div>
          <div className={styles.column}>
            <div className={styles.full}>IX</div>
          </div>
          <div className={styles.column}>
            <div className={styles.full}>X</div>
          </div>
          <div className={styles.column}>
            <div className={styles.full}>XI</div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
