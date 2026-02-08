import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Container from './components/layout/Container';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';

function App() {
  return (
    <Router>

      <ul>
        <Link to='/'>Home</Link>
        <Link to='/newproject'>New Project</Link>
        <Link to='/company'>Company</Link>
        <Link to='/contact'>Contact</Link>
      </ul>

      <Container customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/newproject' element={<NewProject />} />
          <Route path='/company' element={<Company />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Container>

      <p>Footer</p>

    </Router>
  );
}

export default App;
