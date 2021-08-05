import styles from './app.module.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Home } from '@wawa-kiosk/ui/home/feature';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
