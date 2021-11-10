import './App.css';
import LoginPage from "./components/loginPage"
import RegisterPage from "./components/register"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <LoginPage/>
                </Route>
                <Route path="/regitration">
                    <RegisterPage/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
