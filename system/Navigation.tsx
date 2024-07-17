'use client';

import styles from '@system/Navigation.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import { Succinct } from '@root/components/svgs/SuccinctBlack';
import { useModal } from '@system/providers/ModalContextProvider';

export default function Navigation() {
  const { showModal } = useModal();

  return (
    <nav className={styles.root}>
      <section className={styles.left}>
        <a href="/" className={styles.item}>
          <Succinct />
        </a>
      </section>
      <section className={styles.stretch}>
        <span className={styles.item} onClick={() => Utilities.onHandleThemeChange()}>
          Theme
        </span>
        <a className={styles.item} href="https://forms.gle/aB5Ux5qXx5YYYM7F9">
          Schedule a Demo
        </a>
        <a className={styles.item} href="https://docs.succinct.xyz/">
          Create Your First Program
        </a>
      </section>
      <section className={styles.right}>
        <a
          className={styles.item}
          id="site-navigation-button"
          href="https://github.com/xBalbinus/www-sp1-data"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </section>
    </nav>
  );
}
