import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Admin from './page/admin'
import Login from './page/login'
import UserQuestion from './page/user/userQuestion';
import EditSet from './page/sets/editSet'




class App extends React.Component
{
  render()
  {
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/admin" component={ Admin } />
          <Route path="/user/:setname" component={ Login } />
          <Route path="/test/:setname" component={ UserQuestion }/>
          <Route path="/edit/:id" component={ EditSet } />
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App;
