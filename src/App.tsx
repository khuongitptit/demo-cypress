import 'styles/global.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from 'components/home';
import Products from 'components/products';

function App(): JSX.Element {
  const renderRoutes = () => {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/products" exact>
              <Products />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  };
  return <div className="App">{renderRoutes()}</div>;
}

export default App;
