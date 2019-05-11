import React, { Fragment, useState } from 'react';
import { Button, Switch, Input, Card, Radio, Divider, Checkbox, Tabs } from 'antd';
import styles from './index.module.less';
import topIcon from 'assets/images/monitor.svg';
// import TrackHistory from './components/track-history';

const RadioGroup = Radio.Group;

const { TabPane } = Tabs;

const { Search } = Input;

export default () => {
  const [diggSwitchStatus, setDiggSwitchStatus] = useState(false);

  const onWatchTypeChange = (e:any) => {
    console.log(`radio checked:${e.target.value}`);
  };

  const onWatchDiggChange = (checked:boolean) => {
    setDiggSwitchStatus(checked);
  };

  const onWatchDurationChange = (e:any) => {
    console.log(`radio checked:${e.target.value}`);
  };

  return (
    <Tabs defaultActiveKey="1" tabBarStyle={{ marginBottom: 0 }}>
      <TabPane tab="视频监控" key="1">
        <Card
          bordered={false}
          style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}
        >
          <div className={styles.track}>
            <img src={topIcon} alt="top icon" />
            <div className={styles.desc}>
              <h3>视频监控</h3>
              <span>
                可对抖音视频进行监控，提供分钟级的视频点赞数、评论数、转发数监测，掌握抖音号视频热度走向。
              </span>
            </div>
            <RadioGroup
              className={styles.radio_group}
              onChange={onWatchTypeChange}
              defaultValue="a"
            >
              <Radio value="a">
                <div className={styles.radio_btn}>
                  <h4>即时监控</h4>
                  <span>已发布，输入推文链接地址开始监控</span>
                </div>
              </Radio>
              <Radio value="b" disabled>
                <div className={styles.radio_btn}>
                  <h4>预约监控</h4>
                  <span>发布时间已确定尚未发送，设置时间预约监控</span>
                </div>
              </Radio>
            </RadioGroup>
            <Divider />
            <div className={styles.small_title}>
              <h4>视频链接</h4>
            </div>
            <Search
              placeholder="请输入抖音视频地址"
              onSearch={value => console.log(value)}
              enterButton
            />
            <div className={styles.watch_digg_switch}>
              点赞数提醒: <Switch onChange={onWatchDiggChange} checked={diggSwitchStatus} />
              {diggSwitchStatus ? (
                <Fragment>
                  <div style={{ marginTop: '20px' }}>
                    <Input placeholder="" style={{ width: '100px' }} />{' '}
                    开启后点赞数达到该值时，将通过公众号给您发送通知。
                  </div>
                </Fragment>
              ) : null}
            </div>
            <div className={styles.watch_duration_select}>
              <div className={styles.small_title}>
                <h4>监控时长</h4>
              </div>
              <RadioGroup onChange={onWatchDurationChange} defaultValue={1}>
                <Radio value={1}>24小时</Radio>
                <Radio value={2}>48小时</Radio>
                <Radio value={3}>72小时</Radio>
                <Radio value={7}>7天</Radio>
              </RadioGroup>
            </div>
            <div className={styles.watch_other_option}>
              <div className={styles.small_title}>
                <h4>更多数据监控</h4>
                <span>（选择同步监控粉丝数，关联商品浏览量和销售量，将消耗更多的监控次数）</span>
              </div>
              <Checkbox>粉丝数监控</Checkbox>
              <Checkbox>关联商品监控</Checkbox>
            </div>
            <Divider />
            <Button size="large" block type="primary">
              开始监控
            </Button>
            <span>本次监控共需消耗6次视频监控次数，本月剩余3次视频监控次数</span>
          </div>
        </Card>
      </TabPane>
      <TabPane tab="监控历史" key="2">
        <Card
          bordered={false}
          style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}
          bodyStyle={{ width: '100%' }}
        >
          {/*<TrackHistory />*/}
        </Card>
      </TabPane>
    </Tabs>
  );
};
