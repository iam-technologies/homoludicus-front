import React from 'react';
import Layout from '../components/Layout';
import SectionHeader from '../components/SectionHeader';

const ServicesPage = () => {
  const title = 'Serveis';
  const text = '';
  return (
    <Layout>
      <SectionHeader title={title} text={text} />
      <div style={{ height: '600px' }}>Próximamente...</div>
    </Layout>
  );
};

export default ServicesPage;
