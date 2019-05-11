import React from 'react';
import {Icon, Layout} from 'antd';

import RightContent from './RightContent';
import styles from './Header.module.less';
import {withRouter} from "react-router";


const Header = (props: any) => {
    const {collapsed} = props;

    const triggerResizeEvent = () => {
        // eslint-disable-line
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }
    const toggle = () => {
        const {collapsed, onCollapse} = props;
        onCollapse(!collapsed);
        triggerResizeEvent();
    };

    const handleMenuClick = ({ key }: {key: string}) => {
        const { history } = props;
        if (key === 'logout') {
            history.replace('/user/login');
        }
    };


    return (
        <Layout.Header style={{ padding: 0 }}>
            <div className={styles.header}>
            <span className={styles.trigger} onClick={toggle}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
        </span>
                <RightContent onMenuClick={handleMenuClick} />
            </div>
        </Layout.Header>
    );
};

export default withRouter(Header);