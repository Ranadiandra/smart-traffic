import React from 'react';
import './mobile.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from '../homepage.jsx';
import GamePage from '../gamepage.jsx';
import ModePage from '../modepage.jsx';
import StudyPage from '../studypage.jsx';
import QuisRandom from '../QuisRandom.jsx';
import Find1 from '../find1.jsx';
import Find2 from '../find2.jsx';
import Find3 from '../find3.jsx';

const AppMobile = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/game" component={GamePage} />
                <Route path="/mode" component={ModePage} />
                <Route path="/study" component={StudyPage} />
                <Route path="/quis" component={QuisRandom} />
                <Route path="/find1" component={Find1} />
                <Route path="/find2" component={Find2} />
                <Route path="/find3" component={Find3} />
            </Switch>
        </Router>
    );
};

export default AppMobile;