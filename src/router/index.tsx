import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from 'pages/home';

export default class Router extends React.PureComponent {
    render() {
        return <>
            <BrowserRouter>
                <Route path="/"  />
            </BrowserRouter>
        </>
    }
}