import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import AddRecipe from './AddRecipe'
import ViewRecipe from './ViewRecipe'
import NotFound from './NotFound'
// import other components that will be routed to

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/add-recipe' component={AddRecipe}/>
      <Route path='/recipe' component={ViewRecipe}/>
      <Route component={NotFound}/>
    </Switch>
  </main>
)

export default Main