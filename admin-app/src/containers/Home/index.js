import React, { useEffect } from 'react';
// eslint-disable-next-line
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../actions';
import './style.css';

/**
 * @author
 * @function Home
 * @param  {} props
 **/

const Home = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  // eslint-disable-next-line
  }, []);

  return (
    <Layout sidebar>
    </Layout>
  );
};

export default Home;
