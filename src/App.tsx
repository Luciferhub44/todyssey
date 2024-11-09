import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import Layout from './components/Layout';
import Routes from './Routes';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Layout>
            <Routes />
          </Layout>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;