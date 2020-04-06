import * as React from 'react';
import AppDrawer from './components/AppDrawer';
import Container from '@material-ui/core/Container';
import Routes, {IAppRoute} from './AppRoutes';
import './App.css';
import {Route, Switch} from "react-router";

function App() {
  const routes = Routes.map((r: IAppRoute, index: number) => {
    return (
      <Route key={`route-${index}`} exact={true} path={r.to} component={r.component}/>
    );
  });

  return (
    <div>
      <AppDrawer
        title='Universal Scouter'
        routes={Routes}
        content={
          <div>
            <Container className='container' maxWidth={false}>
              <Switch>
                {routes}
              </Switch>
            </Container>
          </div>
        }
      />
    </div>
  );
}

export default App;
