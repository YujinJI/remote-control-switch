import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import React, {useEffect} from "react";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Console from "./components/console/console";
import Animation from "./components/animation/animation";
import Header from "./components/header/header";
 
function App({authService, deviceService}) {

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Header />
            <Animation />
          </Route>
          <Route path="/login">
            <Login authService={authService}/>
          </Route>
          <Route path="/signup">
            <Signup authService={authService}/>
          </Route>
          <Route path="/console">
            <Console authService={authService} deviceService={deviceService}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;