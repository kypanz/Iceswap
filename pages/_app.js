import '../styles/globals.css';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { MoralisProvider } from "react-moralis";
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
    >
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </MoralisProvider>
  )
}

export default MyApp
