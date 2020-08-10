import React from "react";
import {inject, observer} from "mobx-react";

@inject("session")
@observer
export default class Layout extends React.PureComponent<any, {}> {

    componentDidMount(): void {
        if (window.location.pathname != "/login") {
            this.props.session.getUserInfo();
        }
    }

    render() {
        const { children } = this.props;
        return <div className='container'>
                {children}
        </div>
    }
}