import React, { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Private from "./Private";
import Public from "./Public";
import Signin from "components/Login/Signin";
import Signup from "components/Login/Signup";
import Home from "components/Home";
import Loading from "components/UI/Loading";
import Socket from "components/Socket";
import Password from "components/Login/Password";
import { verifyAuth } from "actions/auth";

export default function Router() {
    const { user, loading } = useSelector((state) => state.auth);
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
                <Private isAuth={user !== null} exact path='/' >
                    <Socket>
                        <Home />
                    </Socket>
                </Private>
                <Public isAuth={user !== null} exact path='/signin' >
                    <Signin />
                </Public>
                <Public isAuth={user !== null} exact path='/signup' >
                    <Signup />
                </Public>
                <Public isAuth={user !== null} exact path='/password'>
                    <Password />
                </Public>
            </Switch>
        </BrowserRouter>
    );
}