import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Content from './Content'
import AddRecipe from './AddRecipe'
// import other components that will be routed to

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Content}/>
      <Route path='/add-recipe' component={AddRecipe}/>
    </Switch>
  </main>
)

export default Main