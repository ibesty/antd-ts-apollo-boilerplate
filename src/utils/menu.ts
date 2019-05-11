import { IRoute } from 'router';
import pathToRegexp from 'path-to-regexp';
import { urlToList } from './';

export interface IRouterMap {
    [key: string]: IRoute
}
/**
 * get SubMenu or Item
 */
const getSubMenu = (item: IRoute) : IRoute => {
    // doc: add hideChildrenInMenu
    if (item.routes && !item.hideInMenu && item.routes.some((child: IRoute) => child.name)) {
        return {
            ...item,
            path: item.path,
            component: item.component,
            routes: filterMenuData(item.routes), // eslint-disable-line
        };
    }
    return item;
};

/**
 * filter menuData
 */
export const filterMenuData = (menuData: IRoute[]): IRoute[] => {
    if (!menuData) {
        return [];
    }
    return menuData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => getSubMenu(item))
        .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
export const getBreadcrumbNameMap = (menuData: IRoute[]) => {
    const routerMap:IRouterMap = {};

    const flattenMenuData = (data: IRoute[]) => {
        data.forEach((menuItem: IRoute) => {
            if (menuItem.routes) {
                flattenMenuData(menuItem.routes);
            }
            // Reduce memory usage
            routerMap[menuItem.path] = menuItem;
        });
    };
    flattenMenuData(menuData);
    return routerMap;
};

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export const getFlatMenuKeys = (menuData:IRoute[]) => {
    let keys:string[] = [];
    menuData.forEach(item => {
        keys.push(item.path || '');
        if (item.routes) {
            keys = keys.concat(getFlatMenuKeys(item.routes));
        }
    });
    return keys;
};

export const getMenuMatches = (flatMenuKeys:string[], path:string) =>
    flatMenuKeys.filter(item => {
        if (item) {
            return pathToRegexp(item).test(path);
        }
        return false;
    });

// Get the currently selected menu
export const getSelectedMenuKeys = (pathname:string, flatMenuKeys:string[]):string[] => {
    // console.log(urlToList(pathname), pathname)
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop() || '');
};