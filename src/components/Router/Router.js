import React, { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Private from "./Private";
import Public from "./Public";
import Signin from "components/Login/Signin";
import Signup from "components/Login/Signup";
import Home from "components/Home";
import Loading from "components/UI/Loading";
import Password from "components/Login/Password";
import { verifyAuth } from "actions/auth";
import Socket from "components/Socket";

export default function Router() {
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);

    const isAuth = user !== null;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(verifyAuth());
    }, [dispatch]);

    if (loading) {
        return <Loading />;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Private isAuth={isAuth} exact path="/" >
                    <Socket>
                        <Home />
                    </Socket>
                </Private>
                <Public isAuth={isAuth} exact path="/signin" >
                    <Signin />
                </Public>
                <Public isAuth={isAuth} exact path="/signup" >
                    <Signup />
                </Public>
                <Public isAuth={isAuth} exact path="/password">
                    <Password />
                </Public>
            </Switch>
        </BrowserRouter>
    );
}