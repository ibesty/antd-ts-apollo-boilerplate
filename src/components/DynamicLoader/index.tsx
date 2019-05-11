import React, {FunctionComponent, Suspense} from 'react';
import PageLoading from 'components/PageLoading';
import {RouteComponentProps} from "react-router";

interface route {
    name?: string,
    icon?: string,
    path: string,
    component: string,
}

const DynamicLoader: React.SFC<any> = (props) => {
    const LazyComponent = React.lazy(() => import(`${props.component}`));
    return (
        <div>
            <Suspense fallback={<PageLoading />}>
                <LazyComponent/>
            </Suspense>
        </div>
    );
};

export default DynamicLoader;