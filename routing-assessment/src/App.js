import Welcome from './Components/welcome/Welcome.js';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Clock from './Components/clock/Clock.js';
import Contact from './Components/contact/Contact.js';
import Navigation from './Components/navigation/Navigation.js';


function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route
          exact path="/"
          render={(props) => <Welcome {...props} name="Zachary" />}
        />
        <Route
          path="/welcome/:name"
          render={(props) => <Welcome {...props} name={props.match.params.name} />}
        />
        <Route path="/clock" component={Clock} />
        <Route path="/contact" component={Contact} />
        <Route render={(props) => <h1>404 Page not found</h1>} />
      </Switch>
    </div>
  );
}

export default App;
