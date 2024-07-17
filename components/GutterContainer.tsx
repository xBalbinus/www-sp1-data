import * as React from 'react';

import styles from './GutterContainer.module.scss';

export default function GutterContainer(props: { children: React.ReactNode }) {
  return (
    <div className={styles.gutterContainer}>
      {props.children}
    </div>
  );
};

