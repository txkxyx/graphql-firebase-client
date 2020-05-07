import React from 'react';
import Users from './component/Users';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './component/SignUp';


const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Users}/>
        <Route exact paht='/signup' component={SignUp}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
