import React from "react";
import {BrowserRouter, Route, Link, Redirect} from "react-router-dom";
import { Provider } from 'mobx-react';
import Home from '@/pages/home';
import Login from '@/pages/login';

import sessionStore from '@/stores/session';
import homeStore from '@/stores/home';

export default class Router extends React.PureComponent {
    render() {
        return <div className='container'>
            <Provider session={sessionStore} home={homeStore}>
                <BrowserRouter>
                    <Route exact={true} path="/" children={<Home />} />
                    <Route path="/login" children={<Login />} />
                </BrowserRouter>
            </Provider>
        </div>
    }
}