
import './App.css';
import {BrowserRouter as Router , Route} from "react-router-dom";
import Register from './Components/Register';
import Login from './Components/Login';

function App() {
  return (
    <Router>
    <div>
    <Route path="/signup" extract component={Register}/>
    <Route path ="/signin" extract component={Login}/>
    </div>
    </Router>
  );
}

export default App;
