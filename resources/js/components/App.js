import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from "./pages/Home";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Programming from './pages/Programming';
import DataScience from './pages/DataScience';
import DevOps from './pages/DevOps';
import Design from './pages/Design';
import appCss from '../../../public/css/style.css';
import TechList from '../components/pages/TechList';
// import TestList from './pages/TestList';
import {ProtectedRoute} from './ProtectedRoute';
import Profile from '../components/pages/Profile';
import AddCourse from './pages/AddCourse';
import Error from './Error';
import EditCourse from './pages/EditCourse';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateTechnologie from './pages/admin/CreateTechnologie';
import {AdminProtectedRoutes} from './pages/admin/AdminProtectedRoutes';

function App() {
    return (
        <div>
            <BrowserRouter >
                <Header />
                <Switch>
                    <Route exact path="/" component={Programming}/>
                    <Route exact path='/programming' component={Programming} />
                    <Route exact path='/data-science' component={DataScience} />
                    <Route exact path='/dev-ops' component={DevOps} />
                    <Route exact path='/design' component={Design} />
                    <ProtectedRoute exact path='/profile' component={Profile} />
                    <ProtectedRoute exact path="/add-course" component={AddCourse} />
                    <ProtectedRoute exact path="/edit-course/:id" component={EditCourse} />
                    <Route exact path="/admin-login" component={AdminLogin} />
                    <Route exact path="/admin-dashboard" component={AdminDashboard} />
                    {/* <AdminProtectedRoutes exact path="/create-technology" component={CreateTechnologie}/> */}
                    <Route exact path="/create-technology" component={CreateTechnologie} />

                    <Route exact path="/:slug"  component={TechList} />
                    <Route component={Error} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
