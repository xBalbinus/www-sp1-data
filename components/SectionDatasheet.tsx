import styles from '@demos/DemoBentoLayout.module.scss';

import * as React from 'react';

import Content from '@system/layouts/Content';

import LineChart from '@system/graphs/LineChart';
import Table from '@system/Table';

import Tag from '@system/documents/Tag';
import TextSwapper from '@system/animations/TextSwapper';

import { H2, H3, Lead } from '@system/typography';

export default function DemoBentoLayout(props) {
  const containerStyles = { background: `var(--theme-text)`, borderRadius: 8, color: `var(--theme-background)`, minWidth: 228, padding: `8px 24px 8px 24px` };

  const EXAMPLE_DUMMY_DATA = [
    { value: 70, date: '2023-4-1', lower_ci: 63, upper_ci: 77 },
    { value: 100, date: '2023-5-1', lower_ci: 90, upper_ci: 110 },
    { value: 135, date: '2023-6-1', lower_ci: 121.5, upper_ci: 148.5 },
    { value: 145, date: '2023-7-1', lower_ci: 130.5, upper_ci: 159.5 },
    { value: 135, date: '2023-8-1', lower_ci: 121.5, upper_ci: 148.5 },
    { value: 100, date: '2023-9-1', lower_ci: 90, upper_ci: 110 },
    { value: 70, date: '2023-10-1', lower_ci: 63, upper_ci: 77 },
  ];

  const TABLE_DATA = [
    {
      id: 1,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Fade</Tag>,
        <H3>
          Even the best maps are <TextSwapper strings={['imperfect', 'flawed', 'unfinished']} />
        </H3>,
      ],
    },
    {
      id: 2,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Fade with container styles</Tag>,
        <H3>
          My lord, the great houses have <TextSwapper strings={['answered', 'returned', 'fought back']} style={containerStyles} />
        </H3>,
      ],
    },
    {
      id: 3,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Blur</Tag>,
        <H3>
          Almost everyone can anticipate the immediate <TextSwapper animationType="blur" strings={['impact', 'results', 'outcomes', 'changes']} /> of their actions
        </H3>,
      ],
    },
    {
      id: 4,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Blur with container styles</Tag>,
        <H3>
          If I push on a wall, physics tells me that the wall pushes <TextSwapper animationType="blur" strings={['back', 'as well', 'too', 'in unison']} style={containerStyles} />
        </H3>,
      ],
    },
    {
      id: 5,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Slide down</Tag>,
        <H3>
          When you are honest about where your knowledge is lacking, you know where you are vulnerable and where you can{' '}
          <TextSwapper animationType="slideDown" strings={['improve', 'grow', 'level up', 'change']} />
        </H3>,
      ],
    },
    {
      id: 6,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Slide down with container styles</Tag>,
        <H3>
          The Madhi is too&nbsp;
          <TextSwapper animationType="slideDown" strings={['humble', 'smart', 'naive', 'calculated']} style={containerStyles} /> to say He is the Madhi
        </H3>,
      ],
    },
    {
      id: 7,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Slide up</Tag>,
        <H3>
          First-principles thinking is one of the best ways to reverse-engineer <TextSwapper animationType="slideUp" strings={['complicated', 'messy', 'tangled', 'difficult']} />{' '}
          situations and unleash creative possibility
        </H3>,
      ],
    },
    {
      id: 8,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Slide up with container styles</Tag>,
        <H3>
          You are not <TextSwapper animationType="slideUp" strings={['prepared', 'interested', 'tested', 'capable']} style={containerStyles} /> for what is to come
        </H3>,
      ],
    },
    {
      id: 9,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Slide left</Tag>,
        <H3>
          Hanlon’s Razor states that we should not attribute to malice that which is more easily explained by{' '}
          <TextSwapper animationType="slideLeft" strings={['stupidity', 'obtuseness', 'negligence', 'apathy']} />
        </H3>,
      ],
    },
    {
      id: 10,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Slide left with container styles</Tag>,
        <H3>
          Take my life Usul, it is the <TextSwapper animationType="slideLeft" strings={['only', 'best', 'greatest', 'easiest']} style={containerStyles} /> way
        </H3>,
      ],
    },
    {
      id: 11,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Slide right</Tag>,
        <H3>
          I am pointing the <TextSwapper animationType="slideRight" strings={['way', 'direction', 'to the beginning', 'to the end']} />
        </H3>,
      ],
    },
    {
      id: 12,
      data: [
        ``,
        <Tag>H3</Tag>,
        <Tag>Slide right with container styles</Tag>,
        <H3>
          The visions are clear now. I see possible <TextSwapper animationType="slideRight" strings={['futures', 'meals', 'lovers', 'wars']} style={containerStyles} />, all at once
        </H3>,
      ],
    },
  ];

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
          <Table data={TABLE_DATA} headings={['Type', 'Updated date', 'URL', 'Description']} />
          <div className={styles.columnWide}>
            <div className={styles.full}>II</div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.columnWide}>
            <div className={styles.full}>VII</div>
          </div>
          <div className={styles.columnWide}>
            <div className={styles.full}>VIII</div>
          </div>
        </div>
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
      </div>
    </div>
  );
}
