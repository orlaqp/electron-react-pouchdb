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

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { contentStatusSelector, setupContentSync } from '@wawa-kiosk/ui/data-storage';
import { environment } from '../environments/environment';

export function App() {
  const dispatch = useDispatch();
  const contentStatus = useSelector(contentStatusSelector);

  useEffect(() => {
    dispatch(setupContentSync(environment.db));
  }, [dispatch]);


  if (contentStatus !== 'completed') {
    return (<h2>Syncing data</h2>)
  }

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
