import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Layout from '../../components/Layout';

/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
      <Layout>
          <Jumbotron style={{margin: '5rem', background: "#fff"}}className="text-center">
              <h1>Welcome to Admin Dashboard</h1>
              <br />
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis fringilla sapien id luctus. Nulla nec turpis nibh. Quisque id urna magna. Ut tempor lectus ac neque venenatis pulvinar. Pellentesque vehicula diam a justo semper blandit. Donec augue purus, mollis sit amet eros gravida, bibendum pellentesque lacus. Sed ac gravida ante. Etiam pellentesque sagittis risus, id efficitur diam semper et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus ligula felis, elementum eu massa in, consequat finibus nisi. Suspendisse lacinia gravida condimentum. Curabitur posuere, magna ut bibendum hendrerit, est est consequat nisl, vitae viverra dui ante quis tortor. </p>
          </Jumbotron>
      </Layout>
  )

}

export default Home