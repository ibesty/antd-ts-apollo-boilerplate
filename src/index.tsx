import React from 'react';
import ReactDOM from 'react-dom';
import {LocaleProvider, message} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient} from 'apollo-client'
import {ApolloLink} from 'apollo-link';
import {BatchHttpLink} from 'apollo-link-batch-http';
import {onError} from 'apollo-link-error';
import {ApolloProvider} from 'react-apollo'
import NProgress from 'nprogress';

import config from 'config';
import Router from 'router';

import PageLoading from 'components/PageLoading';

import * as serviceWorker from './serviceWorker';

let loadingInstance: { done: () => void; } | null = null;

const httpLink = new BatchHttpLink({
    uri: config.apiUri,
    headers: {}
});

const loadingLink = new ApolloLink((operation: any, forward: any) => {
    loadingInstance = NProgress.start()
    return forward(operation)
})

const afterwareLink = new ApolloLink((operation: any, forward: any) => {
    return forward(operation).map((response: any) => {
        if (loadingInstance) {
            loadingInstance.done()
        }
        // console.log('[Afterware] response:', response)
        return response
    })
})

const errorLink = onError((errRes: any) => {
    if (errRes.graphQLErrors) {
        let msgList = errRes.graphQLErrors.map((data: any) => {
                return data.Msg
            }
        );
        if (loadingInstance) {
            loadingInstance.done()
        }
        message.error(`错误提示全局：${msgList.join('<br>')}`);
    }
});

const link = ApolloLink.from([loadingLink, afterwareLink, errorLink, httpLink]);

const cache = new InMemoryCache({addTypename: false});

const client = new ApolloClient({
    link,
    cache
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <LocaleProvider locale={zhCN}>
            <React.Suspense fallback={<PageLoading/>}>
                <Router/>
            </React.Suspense>
        </LocaleProvider>
    </ApolloProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
