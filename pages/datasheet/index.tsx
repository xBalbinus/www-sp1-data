import * as React from 'react';

import { resolveAirtablePerformanceMetricsList } from '@root/resolvers/airtable';

import DashboardWithSidebarLayout from '@system/layouts/DashboardWithSidebarLayout';
import DemoBentoLayout from '@demos/DemoBentoLayout';
import DemoSidebarLayout from '@demos/DemoSidebarLayout';
import GlobalModalManager from '@system/modals/GlobalModalManager';
import Navigation from '@system/Navigation';
import Page from '@components/Page';

function ExampleBase(props) {
  const sidebarElement = <DemoSidebarLayout />;

  return (
    <Page
      title="wireframes.internet.dev ➝ example"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples"
    >
      <Navigation />
      <DashboardWithSidebarLayout sidebar={sidebarElement}>
        <DemoBentoLayout hideContent />
      </DashboardWithSidebarLayout>
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  const protocol = process.env.NEXT_PUBLIC_PROTOCOL || 'http';
  const host = process.env.NEXT_PUBLIC_HOST || 'localhost:10000';
  const baseUrl = `${protocol}://${host}`;

  const evalsEndpoint = `${baseUrl}/api/airtable/evals`;

  console.log(evalsEndpoint);

  let evalsDataList = [];

  try {
    const evalsDataResponse = await fetch(evalsEndpoint);
    if (evalsDataResponse.ok) {
      evalsDataList = await evalsDataResponse.json();
    } else {
      console.error('Failed to fetch evals data:', evalsDataResponse.status);
    }
  } catch (error) {
    console.error('Error fetching evals data:', error);
  }

  console.log(evalsDataList);

  let formattedDataList = resolveAirtablePerformanceMetricsList({ performanceMetricsList: evalsDataList });

  return {
    props: {
      formattedDataList,
    },
  };
}

export default ExampleBase;
