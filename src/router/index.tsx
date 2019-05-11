import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import PageLoading from 'components/PageLoading';

export interface IRoute {
    path: string,
    component: string|any,
    routes?: any,
    name?: string,
    icon?: string,
    redirect?: string,
    hideInMenu?: boolean,
    exact?: boolean
}

export let routes: IRoute[] = [
    {
        path: '/user',
        component: lazy(() => import('../layouts/UserLayout')),
        routes: [
            {
                path: '/user',
                redirect: '/user/login',
            },
            {
                path: '/user/login',
                component: lazy(() => import('../pages/login_ts')),
            },
        ],
    },
    {
        path: '/',
        component: lazy(() => import('../layouts/BasicLayout')),
        name: '首页',
        // exact: true,
        routes: [
            {
                name: '首页',
                path: '/',
                redirect: '/welcome',
            },
            // dashboard
            {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: lazy(() => import('../pages/Welcome')),
            },
            {
                name: '我的抖音号',
                icon: 'smile',
                path: '/track_account',
                component: lazy(() => import('../pages/track_account')),
            },
            {
                name: '视频监控',
                icon: 'smile',
                path: '/track_video',
                component: lazy(() => import('../pages/track')),
            },
        ],
    },
];

function RouteWithSubRoutes(route:IRoute) {
    const children = (
        <Switch>
            <Suspense fallback={<PageLoading/>}>
                {
                    route.routes.map((route:IRoute) => (
                        <Route key={route.path} {...route} render={props => !route.redirect ? <route.component {...props} /> : <Redirect to={route.redirect} />} exact={true}/>
                    ))
                }
            </Suspense>
        </Switch>
    );

    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} children={children} menuData={route.routes} />
            )}
        />
    );
}

export default () => (
    <Router>
        <Switch>
            {
                routes.map((route, index) => {
                    return (<RouteWithSubRoutes key={route.path} {...route} />)
                    }
                )
            }
        </Switch>
    </Router>
)

