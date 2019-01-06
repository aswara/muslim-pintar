import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Question from './pages/Question';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/soal/:category" component={Question} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
