import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import { Provider } from 'mobx-react';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Layout from '@/components/Layout';

import sessionStore from '@/stores/session';
import homeStore from '@/stores/home';

export default class Router extends React.PureComponent {
    render() {
        return <Provider session={sessionStore} home={homeStore}>
            <Layout>

                <BrowserRouter>
                    <Route exact={true} path="/" children={<Home />} />
                    <Route path="/login" children={<Login />} />
                </BrowserRouter>
            </Layout>
        </Provider>
    }
}