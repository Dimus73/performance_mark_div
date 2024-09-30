
import {Link, Route, Switch} from "react-router-dom";
import Main from "./pages/Main/Main";
import PageTwo from "./pages/PageTwo/PageTwo";
import PageOne from "./pages/PageOne/PageOne";

function App() {
  return (
      <div style={{"display":"flex", "flexDirection":"column", "height": "100vh"}}>
          <ul className={'menu'}>
              <li className={'menu-item'}>
                  <Link to="/">Home Page</Link>
              </li>
              <li className={'menu-item'}>
                  <Link to={'/page_one'}>Page one</Link>
              </li>
              <li className={'menu-item'}>
                  <Link to={'/page_two'}>Page two</Link>
              </li>
          </ul>
          <Switch>
              <Route exact path={'/'} component={Main}/>
              <Route path={'/page_one'} component={PageOne}/>
              <Route path={'/page_two'} component={PageTwo}/>
          </Switch>
      </div>
  );
}

export default App;
