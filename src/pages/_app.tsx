import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layouts/Layout';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}
