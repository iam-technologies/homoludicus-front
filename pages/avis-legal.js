import React from 'react';
import { Layout } from '../components';
import SectionHeader from '../components/SectionHeader';

const title = 'Avís Legal';

const avisLegal = () => (
  <Layout>
    <SectionHeader title={title} />
    <div>Próximamente...</div>
    <div className="white-space" />
  </Layout>
);


export default avisLegal;
