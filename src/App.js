
import './App.css';
import Product from './Components/product'
import {BrowserRouter as Router,Route ,Switch} from 'react-router-dom'
import Homepage from './Components/Homepage'

function App() {
  return (
    <Router>
      <Switch>
   <Route path="/product/:id" exact component={Product}/>
   <Route path="/" exact component={Homepage}/>
   </Switch>
   </Router>
   
  );
}

export default App;
