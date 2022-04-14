import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Buyer from '../page/Buyer';
import Landing from '../page/Landing';
import Seller from '../page/Seller';

const Layout = () => {
  return (
    <Router fallback={<span />}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/seller" component={Seller}/>
        <Route path="/buyer" component={Buyer} />
      </Switch>
    </Router>
  )
}

export default Layout