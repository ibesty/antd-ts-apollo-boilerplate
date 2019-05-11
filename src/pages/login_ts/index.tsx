import React, {useState} from 'react';
import {Icon, Tabs, Row, Col, Button, Input} from 'antd';

import styles from './index.module.less';
import qrcode from 'assets/images/qrcode.png';

const {TabPane} = Tabs;

const Login = (props: any) => {
    const [loginType, setLoginType] = useState<string>('wechat');
    const [count, setCount] = useState<number>(0);

    const onTabChange = (key: string) => {
        console.log(key);
        setLoginType(key);
    }

    const onGetCaptcha = () => {
        console.log('get captcha');
        runGetCaptchaCountDown();
    }

    const runGetCaptchaCountDown = () => {
        let count = 59;
        setCount(count);
        const interval = setInterval(() => {
            count -= 1;
            setCount(count);
            if (count === 0) {
                clearInterval(interval);
            }
        }, 1000);
    };

    return (
        <div className={styles.main}>
            <Tabs defaultActiveKey={"1"} onChange={onTabChange} activeKey={loginType}>
                <TabPane tab={"微信扫码登陆"} key={"wechat"}>
                    <Col className={styles.form_item}>
                        <Row gutter={8}>
                            <Col offset={5} span={14}>
                                <div className={styles.qrcode_wrapper}>
                                    <img src={qrcode} alt="微信扫码登陆"/>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </TabPane>
                <TabPane tab={"手机登陆"} key={"mobile"} disabled>
                    <Col className={styles.form_item}>
                        <Row gutter={8}>
                            <Col span={24}>
                                <Input size='large' prefix={<Icon type="mobile" className={styles.prefixIcon}/>}
                                       placeholder='手机号'/>
                            </Col>
                        </Row>
                    </Col>
                    <Col className={styles.form_item}>
                        <Row gutter={8}>
                            <Col span={16}>
                                <Input size='large' prefix={<Icon type="mail" className={styles.prefixIcon}/>}
                                       placeholder='验证码'/>
                            </Col>
                            <Col span={8}>
                                <Button
                                    disabled={count !== 0}
                                    className={styles.getCaptcha}
                                    size="large"
                                    onClick={onGetCaptcha}
                                >
                                    {count ? `${count} 秒` : '获取验证码'}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className={styles.form_item}>
                        <Button block type="primary" size="large">登陆</Button>
                    </Col>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Login;
