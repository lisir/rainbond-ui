import React, { PureComponent, Fragment } from "react";
import globalUtil from "../../utils/global";
import MarketAppDetailShow from "../../components/MarketAppDetailShow";
import BasicListStyles from "../List/BasicList.less";
import { Card, List, Avatar, Input, Radio, notification } from "antd";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

export default class CloudApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 10,
      total: 0,
      page: 1,
      sync: false,
      loading: false,
      showMarketAppDetail: false,
      showApp: {}
    };
  }
  componentDidMount = () => {
    this.handleSync();
  };
  handleClose = () => {
    this.props.onClose && this.props.onClose();
  };
  handleSync = () => {
    this.loadApps();
  };
  handleSearch = app_name => {
    this.setState(
      {
        app_name: app_name,
        page: 1
      },
      () => {
        this.loadApps();
      }
    );
  };
  loadApps = () => {
    this.setState(
      {
        loading: true
      },
      () => {
        this.props.dispatch({
          type: "global/getMarketApp",
          payload: {
            app_name: this.state.app_name,
            page: this.state.page,
            pageSize: this.state.pageSize
          },
          callback: data => {
            this.setState({
              apps: data.list || [],
              loading: false,
              total: data.total
            });
          }
        });
      }
    );
  };
  handleLoadAppDetail = data => {
    this.props.dispatch({
      type: "global/syncMarketAppDetail",
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        body: [
          {
            group_key: data.group_key,
            version: data.version,
            template_version: data.template_version
          }
        ]
      },
      callback: data => {
        notification.success({ message: "操作成功" });
        this.loadApps();
        this.props.onSyncSuccess && this.props.onSyncSuccess();
      }
    });
  };
  handlePageChange = page => {
    this.setState(
      {
        page: page
      },
      () => {
        this.loadApps();
      }
    );
  };
  showMarketAppDetail = app => {
    this.setState({
      showApp: app,
      showMarketAppDetail: true
    });
  };
  hideMarketAppDetail = () => {
    this.setState({
      showApp: {},
      showMarketAppDetail: false
    });
  };
  getAction = item => {
    if (item.is_complete) {
      if (item.is_upgrade === 0) {
        return (
          <Fragment>
            <span>已下载,无更新</span>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <a
              href="javascript:;"
              onClick={() => {
                this.handleLoadAppDetail(item);
              }}
            >
              更新新版本
            </a>
          </Fragment>
        );
      }
    } else {
      return (
        <a
          href="javascript:;"
          onClick={() => {
            this.handleLoadAppDetail(item);
          }}
        >
          下载
        </a>
      );
    }
  };
  render() {
    const paginationProps = {
      pageSize: this.state.pageSize,
      total: this.state.total,
      current: this.state.page,
      onChange: pageSize => {
        this.handlePageChange(pageSize);
      }
    };

    return (
      <Card
        className={BasicListStyles.listCard}
        bordered={false}
        title={
          <div>
            云端{" "}
            <Search
              className={BasicListStyles.extraContentSearch}
              placeholder="请输入名称进行搜索"
              onSearch={this.handleSearch}
            />
          </div>
        }
        style={{}}
        bodyStyle={{
          padding: "0 32px 40px 32px"
        }}
        extra={
          <div className={BasicListStyles.extraContent}>
            <RadioGroup>
              <RadioButton onClick={this.handleClose}>关闭</RadioButton>
            </RadioGroup>
          </div>
        }
      >
        <List
          size="large"
          rowKey="id"
          loading={this.state.loading}
          pagination={paginationProps}
          dataSource={this.state.apps}
          renderItem={item => (
            <List.Item actions={[this.getAction(item)]}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      item.pic || require("../../../public/images/app_icon.jpg")
                    }
                    onClick={() => {
                      this.showMarketAppDetail(item);
                    }}
                    shape="square"
                    size="large"
                  />
                }
                title={
                  <a
                    style={{ color: "#1890ff" }}
                    href="javascript:;"
                    onClick={() => {
                      this.showMarketAppDetail(item);
                    }}
                  >
                    {item.group_name}
                    {item.is_official && "(官方发布)"}
                  </a>
                }
                description={
                  <div>
                    <p>版本: {item.version}</p>
                    {item.describe || "-"}
                  </div>
                }
              />
            </List.Item>
          )}
        />
        {this.state.showMarketAppDetail && (
          <MarketAppDetailShow
            onOk={this.hideMarketAppDetail}
            onCancel={this.hideMarketAppDetail}
            app={this.state.showApp}
          />
        )}
      </Card>
    );
  }
}
