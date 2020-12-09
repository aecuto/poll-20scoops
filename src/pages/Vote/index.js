import React, { useEffect, useState } from 'react';

import ComponentView from './index.view';

import Layout from 'components/Layout';

import { db } from 'services/share-poll';

const Component = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    db.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        list.push(doc.data());
      });
      setList(list);
    });
  }, []);

  console.log(list);

  return (
    <Layout>
      <ComponentView />
    </Layout>
  );
};

export default Component;
