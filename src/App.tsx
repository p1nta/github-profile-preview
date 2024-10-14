import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import Home from './pages/home';
import Profile from './pages/profile';
import client from './apolloClient';

import './i18n.ts'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;