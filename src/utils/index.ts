import pathToRegexp from 'path-to-regexp';

import config from 'config';
import { IRouterMap } from 'utils/menu';

export const getPageTitle = (pathname:string, breadcrumbNameMap:IRouterMap):string => {
    const matchParamsPath = (pathname:string, breadcrumbNameMap:IRouterMap) => {
        const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname)) || '/';
        return breadcrumbNameMap[pathKey];
    };

    const currRouterData = matchParamsPath(pathname, breadcrumbNameMap);

    if (!currRouterData) {
        return '首页';
    }

    return `${currRouterData.name} - ${config.siteName}`;
}

export const urlToList = (url:string) => {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}