import React from 'react';
import {Spin, Menu, Icon, Avatar, Dropdown} from 'antd';

import styles from './Header.module.less';

const HeaderRightContent = (props: any) => {
    const currentUser = {
        avatar: 'http://www.rologo.com/images/uploads/2015/09/G-symbol.png',
        name: 'Google',
    };

    const {onMenuClick} = props;

    const menu = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item key="logout">
                <Icon type="logout"/>
                退出登录
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={styles.right}>
            {currentUser.name ? (
                <Dropdown overlay={menu} className={styles.container}>
                    <span className={`${styles.action} ${styles.account}`}>
                      <Avatar
                          size="small"
                          className={styles.avatar}
                          src={currentUser.avatar}
                          alt="avatar"
                      />
                      <span className={styles.name}>{currentUser.name}</span>
                    </span>
                </Dropdown>
            ) : (
                <Spin size="small" style={{marginLeft: 8, marginRight: 8}}/>
            )}
        </div>
    )
};

export default HeaderRightContent;
