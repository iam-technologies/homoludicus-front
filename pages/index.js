import React, { useEffect } from 'react';
import _get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { api, getImageUrl } from '../serverServices';
import { Home, Layout } from '../components';
import { SEO } from '../components/common';
import getGeneric from '../redux/actions/genericActs';

const HomePage = ({ content = {}, selection = {}, loaded = true, imgUrl = '' }) => {
  const title = _get(content, 'seoTitle.es', '');
  const desc = _get(content, 'seoDesc.es', '');
  const attachment = _get(content, 'seoImg.attachment', '');
  const pathname = '/';

  const genericLoad = useSelector(state => state.generic.load);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!genericLoad) {
      dispatch(getGeneric());
    }
  }, [genericLoad]);

  return (
    <Layout pathname={pathname}>
      <SEO
        title={title}
        description={desc}
        image={attachment}
      />
      <Home
        content={content}
        selection={selection}
        loaded={loaded}
        imgUrl={imgUrl}
      />
      <MessengerCustomerChat
        pageId="184615748241837"
        appId="324538924791012"
        themeColor="#97DECC"
        loggedInGreeting="¡Hola! ¿Cómo podemos ayudarte?"
        loggedOutGreeting="¡Hola! ¿Cómo podemos ayudarte?"
        minimized
      />
    </Layout>
  );
};

HomePage.getInitialProps = async () => {
  const content = await api.contents.getByKey('home', (err, res) => {
    return res ? res.data : null;
  });

  const imgUrl = await getImageUrl(content);

  return { content, loaded: true, imgUrl };
};

export default HomePage;
