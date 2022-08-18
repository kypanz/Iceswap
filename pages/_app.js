import '../styles/globals.css';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
