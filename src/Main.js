import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import AddRecipe from './AddRecipe'
// import other components that will be routed to

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/add-recipe' component={AddRecipe}/>
    </Switch>
  </main>
)

export default Main