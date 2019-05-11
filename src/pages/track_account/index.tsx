import React, {Fragment} from 'react';
import {Menu, Avatar} from 'antd';

const TrackAccount = (props: any) => {

    const handleClick = (e: any) => {
        console.log('click ', e);
    }

    return (
        <Fragment>
            <Menu
                onClick={handleClick}
                style={{width: 180, height: '100%'}}
                defaultSelectedKeys={['9']}
                mode="vertical"
            >
                <Menu.Item key="9"><Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> <span>Option 9</span></Menu.Item>
                <Menu.Item key="10"><Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> <span>Option 10</span></Menu.Item>
                <Menu.Item key="11"><Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> <span>Option 11</span></Menu.Item>
                <Menu.Item key="12"><Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> <span>Option 12</span></Menu.Item>
            </Menu>
            <div>

            </div>
        </Fragment>
    )
};

export default TrackAccount;