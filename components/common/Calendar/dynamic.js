import React from 'react';
import dynamic from 'next/dynamic'

const DynamicCallendarWithNoSSR = dynamic(
  () => import('./index'),
  { ssr: false }
)

const DynamicCallendar = (props) => {
  return <DynamicCallendarWithNoSSR {...props} />;
}

export default DynamicCallendar;