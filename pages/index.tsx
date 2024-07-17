import * as React from 'react';

import Content from '@system/layouts/Content';
import GlobalModalManager from '@system/modals/GlobalModalManager';
import Navigation from '@system/Navigation';
import Page from '@components/Page';
import SectionFullHeight from '@system/sections/SectionFullHeight';

import SectionSelect from '@components/SectionSelect';

function ExampleBase(props) {
  return (
    <Page
      title="wireframes.internet.dev ➝ example"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples"
    >
      <Navigation />
      <SectionFullHeight>
        <Content>
          <SectionSelect hideContent />
        </Content>
      </SectionFullHeight>
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleBase;
