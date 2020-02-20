import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Personagem from './../pages/initpg/index';


export default function Routes() {
  return (
      <Switch>
        <Route path="/" exact component={Personagem} />
      </Switch>
  )
}