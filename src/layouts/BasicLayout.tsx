import React, {useEffect, useState} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import DocumentTitle from 'react-document-title';
import {Link, withRouter} from "react-router-dom";

import {IRoute} from 'router';
import {getPageTitle} from 'utils';
import {getBreadcrumbNameMap, getFlatMenuKeys, getSelectedMenuKeys, IRouterMap} from "utils/menu";
import Header from './Header';
import logo from 'assets/images/logo.svg';
import styles from './BasicLayout.module.less';

const {
    Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

const getIcon = (icon: string | Element | undefined) => {
    if (!icon) return null;
    if (typeof icon === 'string') {
        return <Icon type={icon}/>;
    }
    return icon;
};

const BasicLayout = (props: any) => {
    const {
        location,
        location: {pathname},
        children,
        menuData
    } = props;

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [breadcrumbNameMap, setBreadcrumbNameMap] = useState<IRouterMap>({});

    const flatMenuKeys = getFlatMenuKeys(menuData);
    let selectedKeys: string[] = getSelectedMenuKeys(pathname, flatMenuKeys);
    if (!selectedKeys.length) {
        selectedKeys = ['/'];
    }
    console.log('selectedKeys', pathname, selectedKeys);

    useEffect(() => {
        setBreadcrumbNameMap(getBreadcrumbNameMap(menuData));
    }, [menuData])

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed)
    }

    /**
     * 获得菜单子节点
     * @memberof SiderMenu
     */
    const getNavMenuItems = (menusData: IRoute[]) => {
        if (!menusData) {
            return [];
        }
        return menusData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => getSubMenuOrItem(item))
            .filter(item => item);
    };

    /**
     * get SubMenu or Item
     */
    const getSubMenuOrItem = (item: IRoute) => {
        // doc: add hideChildrenInMenu
        if (item.routes && !item.hideInMenu && item.routes.some((child: IRoute) => child.name)) {
            const {name} = item;
            return (
                <SubMenu
                    title={
                        item.icon ? (
                            <span>{getIcon(item.icon)}<span>{name}</span></span>
                        ) : (
                            name
                        )
                    }
                    key={item.path}
                >
                    {getNavMenuItems(item.routes)}
                </SubMenu>
            );
        }
        return <Menu.Item key={item.path}>{getMenuItemPath(item)}</Menu.Item>;
    };

    /**
     * 判断是否是http链接.返回 Link 或 a
     * Judge whether it is http link.return a or Link
     * @memberof SiderMenu
     */
    const getMenuItemPath = (item: IRoute) => {
        const {name} = item;
        const itemPath = conversionPath(item.path);
        const icon = getIcon(item.icon);
        const {location} = props;
        return (
            <Link
                to={itemPath}
                replace={itemPath === location.pathname}
            >
                {icon}
                <span>{name}</span>
            </Link>
        );
    };

    const conversionPath = (path: string) => {
        return `/${path || ''}`.replace(/\/+/g, '/');
    };

    const pathSnippets = location.pathname.split('/').filter((i: string) => i);
    const extraBreadcrumbItems = pathSnippets.map((_: string, index: number) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        console.log(breadcrumbNameMap[url])
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>
                    {breadcrumbNameMap[url] && breadcrumbNameMap[url].name}
                </Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [(
        <Breadcrumb.Item key="/">
            <Link to="/">首页</Link>
        </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    const menuWidth = collapsed ? '80px' : '200px';

    return (
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={onCollapse}
                    className={styles.sider}
                    trigger={null}
                >
                    <div className={styles.logo} id="logo">
                        <Link to="/">
                            <img src={logo} alt="logo"/>
                            <h1>Ant Design Pro</h1>
                        </Link>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={selectedKeys} mode="inline">
                        {getNavMenuItems(menuData)}
                    </Menu>
                </Sider>
                <Layout style={{ width: ~`calc(100vw - ${menuWidth})`, marginLeft: menuWidth }}>
                    <Header onCollapse={onCollapse} collapsed={collapsed}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            {breadcrumbItems}
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </DocumentTitle>
    );
}

export default withRouter(BasicLayout);