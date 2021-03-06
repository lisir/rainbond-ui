import React, { PureComponent, Fragment } from 'react';
import {
  Button,
  Icon,
  Card,
  Modal,
  Row,
  Col,
  Switch,
  Table,
  Radio,
  Tabs,
  Affix,
  Input,
  Form,
  Tooltip
} from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import globalUtil from '../../utils/global';
import { Link } from 'dva/router';
import httpResponseUtil from '../../utils/httpResponse';
import styles from './setting.less';
import Port from '../../components/Port';
import {
  getMnt,
  addMnt,
  getRelationedApp,
  getUnRelationedApp,
  addRelationedApp,
  removeRelationedApp,
  batchAddRelationedApp,
} from '../../services/app';
import EditPortAlias from '../../components/EditPortAlias';
import ConfirmModal from '../../components/ConfirmModal';
import AddPort from '../../components/AddPort';
import AddOrEditEnv from '../../components/AddOrEditEnv';
import AddOrEditVolume from '../../components/AddOrEditVolume';
import AddRelationMnt from '../../components/AddRelationMnt';
import AddRelation from '../../components/AddRelation';
import ViewRelationInfo from '../../components/ViewRelationInfo';
import appUtil from '../../utils/app';
import { volumeTypeObj } from "../../utils/utils";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

//node.js
@connect(({ user, appControl, teamControl }) => ({ currUser: user.currentUser }), null, null, { withRef: true })
@Form.create()
class Nodejs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() { }
  isShowRuntime = () => {
    const runtimeInfo = this.props.runtimeInfo || {};
    return runtimeInfo.runtimes === false;
  }
  handleSubmit = (e) => {
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err)
        return;
      this.props.onSubmit && this
        .props
        .onSubmit({
          ...fieldsValue
        })
    });
  }
  getDefaultRuntime = () => {
    return "-1"
  }
  render() {

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 3,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 21,
        },
      },
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { userRunTimeInfo } = this.props;
    // if (!this.isShowRuntime())
    //   return null;
    return (
      <Card title="node版本支持" style={{
        marginBottom: 16
      }}>
        <Form.Item {...formItemLayout} label="版本">
          {getFieldDecorator('service_runtimes', {
            initialValue: userRunTimeInfo.runtimes,
            rules: [
              {
                required: true,
                message: '请选择'
              }
            ]
          })(
            <RadioGroup disabled className={styles.ant_radio_disabled}>
              <Radio value="5.12.0">5.12.0</Radio>
              <Radio value="6.14.4">6.14.4</Radio>
              <Radio value="7.10.1">7.10.1</Radio>
              <Radio value="8.12.0">8.12.0</Radio>
              <Radio value="9.11.2">9.11.2</Radio>
            </RadioGroup>
          )}
        </Form.Item>
        {/* <Form.Item {...formItemLayout} label="运行命令">
          {getFieldDecorator('service_runtimes', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请输入'
              }
            ]
          })(<TextArea placeholder="例如：node demo.js" />)}
        </Form.Item> */}
        {/* <Row>
          <Col span="5"></Col>
          <Col span="19">
            <Button onClick={this.handleSubmit} type={'primary'}>确认修改</Button>
          </Col>
        </Row> */}
      </Card>
    )
  }
}

//Golang
@connect(({ user, appControl, teamControl }) => ({ currUser: user.currentUser }), null, null, { withRef: true })
@Form.create()
class Golang extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    if (this.isShowRuntime()) {
      this.onChange({
        service_runtimes: this.getDefaultRuntime()
      })
    }
  }
  onChange = (value) => {
    this
      .props
      .dispatch({ type: 'createApp/saveRuntimeInfo', payload: value })
  }
  getDefaultRuntime = () => {
    return '1.11.2';
  }
  isShowRuntime = () => {
    const runtimeInfo = this.props.runtimeInfo || {};
    return runtimeInfo.runtimes === false;
  }
  handleSubmit = (e) => {
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err)
        return;
      this.props.onSubmit && this
        .props
        .onSubmit({
          ...fieldsValue
        })
    });
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 3,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 21,
        },
      },
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { userRunTimeInfo } = this.props;
    // if (!this.isShowRuntime())
    //   return null;
    return (
      <Card title="Golang版本支持" style={{
        marginBottom: 16
      }}>

        <Form.Item {...formItemLayout} label="版本">
          {getFieldDecorator('service_runtimes', {
            initialValue: userRunTimeInfo.runtimes||this.getDefaultRuntime(),
            rules: [
              {
                required: true,
                message: '请选择'
              }
            ]
          })(
            <RadioGroup disabled className={styles.ant_radio_disabled}>
              <Radio value="1.9.7">1.9.7</Radio>
              <Radio value="1.8.7">1.8.7</Radio>
              <Radio value="1.11.2">1.11.2(默认)</Radio>
              <Radio value="1.11">1.11</Radio>
              <Radio value="1.11.1">1.11.1</Radio>
              <Radio value="1.10.5">1.10.5</Radio>
              <Radio value="1.10.4">1.10.4</Radio>
            </RadioGroup>
          )}
        </Form.Item>
        {/* <Row>
          <Col span="5"></Col>
          <Col span="19">
            <Button onClick={this.handleSubmit} type={'primary'}>确认修改</Button>
          </Col>
        </Row> */}

      </Card>
    )
  }
}

//python
@connect(({ user, appControl, teamControl }) => ({ currUser: user.currentUser, appDetail: appControl.appDetail }), null, null, { withRef: true })
@Form.create()
class Python extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() { }
  onChange = (value) => {
    this
      .props
      .dispatch({ type: 'createApp/saveRuntimeInfo', payload: value })
  }
  getDefaultRuntime = () => {
    return '2.7.15';
  }
  isShowRuntime = () => {
    const runtimeInfo = this.props.runtimeInfo || {};
    return runtimeInfo.runtimes === false;
  }
  handleSubmit = (e) => {
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err)
        return;
      this.props.onSubmit && this
        .props
        .onSubmit({
          ...fieldsValue
        })
    });
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 3,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 21,
        },
      },
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { userRunTimeInfo } = this.props;
    // if (!this.isShowRuntime()) {
    //   return null;
    // }

    return (
      <Card title="Python版本支持">
        <Form.Item {...formItemLayout} label="版本">
          {getFieldDecorator('service_runtimes', {
            initialValue: userRunTimeInfo.runtimes || this.getDefaultRuntime(),
            rules: [
              {
                required: true,
                message: '请选择'
              }
            ]
          })(
            <RadioGroup disabled className={styles.ant_radio_disabled}>
              <Radio value='2.7.15'>2.7.15(默认)</Radio>
              <Radio value='3.6.6'>3.6.6</Radio>
              <Radio value='3.7.1'>3.7.1</Radio>
            </RadioGroup>
          )}
        </Form.Item>
        {/* <Row>
          <Col span="5"></Col>
          <Col span="19">
            <Button onClick={this.handleSubmit} type={'primary'}>确认修改</Button>
          </Col>
        </Row> */}
      </Card>
    )
  }
}

//java
@connect(({ user, appControl, teamControl }) => ({ currUser: user.currentUser, appDetail: appControl.appDetail }), null, null, { withRef: true })
@Form.create()
class JAVA extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() { }
  isShowJdk = () => {
    const runtimeInfo = this.props.runtimeInfo || {};

    const language = this.props.language;
    if ((language === 'java-jar' || language === 'java-war') && runtimeInfo.runtimes === false) {
      return true;
    }

    if (language === 'java-maven') {
      return true;
    }

    return false;
  }
  isShowService = () => {
    const runtimeInfo = this.props.runtimeInfo || {};
    const language = this.props.language;
    if ((language === 'java-jar' || language === 'java-war') && runtimeInfo.procfile === false) {
      return true;
    }
    return false;
  }
  getDefaultRuntime = () => {
    return '1.8'
  }
  getDefaultService = () => {
    return 'tomcat7'
  }
  handleSubmit = (e) => {
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err)
        return;
      this.props.onSubmit && this
        .props
        .onSubmit({
          ...fieldsValue
        })
    });
  }
  render() {
    const runtimeInfo = this.props.runtimeInfo || {};
    const language = this.props.language;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 3,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 21,
        },
      },
    };

    // if (!this.isShowJdk() && !this.isShowService()) {
    //   return null;
    // }

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { userRunTimeInfo } = this.props;
    return (
      <Card title="Java版本支持">

        {/* {this.isShowJdk() */}
        <Form.Item {...formItemLayout} label="JDK">
          {getFieldDecorator('service_runtimes', {
            initialValue: userRunTimeInfo.runtimes || this.getDefaultRuntime(),
            rules: [
              {
                required: true,
                message: '请选择应用类型'
              }
            ]
          })(
            <RadioGroup disabled className={styles.ant_radio_disabled}>
              <Radio value='1.8'>openjdk 1.8.0_40(默认)</Radio>
              <Radio value='1.6'>openjdk 1.6.0_27</Radio>
              <Radio value='1.7'>openjdk 1.7.0_79</Radio>
            </RadioGroup>
          )}
        </Form.Item>
        {/* : null
        } */}

        {/* {this.isShowService() */}
        <Form.Item {...formItemLayout} label="web服务器">
          {getFieldDecorator('service_server', {
            initialValue: userRunTimeInfo.procfile || this.getDefaultService(),
            rules: [
              {
                required: true,
                message: '请选择'
              }
            ]
          })(
            <RadioGroup disabled className={styles.ant_radio_disabled}>
              <Radio value="tomcat7">tomcat 7(默认)</Radio>
              <Radio value="tomcat8">tomcat 8</Radio>
              <Radio value="jetty7">jetty 7.5</Radio>
            </RadioGroup>
          )}
        </Form.Item>
        {/* : null
        } */}

        {/* <Row>
          <Col span="5"></Col>
          <Col span="19">
            <Button onClick={this.handleSubmit} type={'primary'}>确认修改</Button>
          </Col>
        </Row> */}

      </Card>
    )
  }
}

//php
@connect(({ user, appControl, teamControl }) => ({ currUser: user.currentUser, appDetail: appControl.appDetail }), null, null, { withRef: true })
@Form.create()
class PHP extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enablePlugs: [
        {
          name: 'Bzip2',
          version: '1.0.6, 6-Sept-2010',
          url: 'http://docs.php.net/bzip2'
        }, {
          name: 'cURL',
          version: '7.35.0',
          url: 'http://docs.php.net/curl'
        }, {
          name: 'FPM',
          version: '',
          url: 'http://docs.php.net/fpm'
        }, {
          name: 'mcrypt',
          version: '2.5.8',
          url: 'http://docs.php.net/mcrypt'
        }, {
          name: 'MySQL(PDO)',
          version: 'mysqlnd 5.0.11-dev - 20120503',
          url: 'http://docs.php.net/pdo_mysql'
        }, {
          name: 'MySQLi',
          version: 'mysqlnd 5.0.11-dev - 20120503',
          url: 'http://docs.php.net/mysqli'
        }, {
          name: 'OPcache',
          version: 'Mosa',
          url: 'http://docs.php.net/opcache'
        }, {
          name: 'OpenSSL',
          version: 'Mosa',
          url: 'http://docs.php.net/pgsql'
        }, {
          name: 'PostgreSQL(PDO)',
          version: '9.3.6',
          url: 'http://docs.php.net/pdo_pgsql'
        }, {
          name: 'Readline',
          version: '6.3',
          url: 'http://docs.php.net/readline'
        }, {
          name: 'Sockets',
          version: '',
          url: 'http://docs.php.net/sockets'
        }, {
          name: 'Zip',
          version: '1.12.5',
          url: 'http://docs.php.net/zip'
        }, {
          name: 'Zlib',
          version: '1.2.8',
          url: 'http://docs.php.net/zlib'
        }
      ],
      unablePlugs: [
      ],
      //扩展
      dependencies: [],
      selected_dependency: this.props.selected_dependency || [],
      service_dependency: (this.props.selected_dependency || []).join(','),
      versions: [],
      default_version: ''
    }
  }
  componentDidMount() {
    this.getPhpConfig();
    const runtimeInfo = this.props.runtimeInfo || {};
    if (runtimeInfo.runtimes === false) {
      this.onChange({
        service_runtimes: this.getDefaultRuntime()
      })
    }

    if (runtimeInfo.procfile === false) {
      this.onChange({
        service_runtimes: this.getDefaultService()
      })
    }

  }
  getPhpConfig = () => {
    this.props.dispatch({
      type: 'appControl/getPhpConfig',
      callback: (data) => {
        this.setState({ versions: data.bean.versions, default_version: data.bean.default_version, unablePlugs: data.bean.extends })
      }
    })
  }
  onChange = (value) => {
    this
      .props
      .dispatch({ type: 'createApp/saveRuntimeInfo', payload: value })
  }
  getDefaultRuntime = () => {
    return '-1';
  }
  getDefaultService = () => {
    return '-1'
  }
  handleSubmit = (e) => {
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err)
        return;
      this.props.onSubmit && this
        .props
        .onSubmit({
          ...fieldsValue,
          service_dependency: this.state.service_dependency
        })
    });
  }
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };

    const rowSelection = {
      selectedRowKeys: this.state.selected_dependency,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          service_dependency: selectedRowKeys.join(','),
          selected_dependency: selectedRowKeys
        })
      }
    };

    const { getFieldDecorator, getFieldValue } = this.props.form;

    const runtimeInfo = this.props.runtimeInfo || {};
    const userRunTimeInfo = this.props.userRunTimeInfo;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 3,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 21,
        },
      },
    };

    // if (runtimeInfo.runtimes && runtimeInfo.procfile && runtimeInfo.dependencies) {
    //   return null;
    // }

    if (!this.state.versions.length) return null;

    return (
      <Fragment>
        <Card title="PHP版本支持" style={{
          marginBottom: 16
        }}>
          {/* {!runtimeInfo.runtimes */}
          <Form.Item {...formItemLayout} label="版本">
            {getFieldDecorator('service_runtimes', {
              initialValue: userRunTimeInfo.runtimes || this.state.default_version,
              rules: [
                {
                  required: true,
                  message: '请选择应用类型'
                }
              ]
            })(
              <RadioGroup disabled className={styles.ant_radio_disabled}>
                {
                  this.state.versions.map((item) => {
                    return <Radio value={item}>{item}</Radio>
                  })
                }
              </RadioGroup>
            )}
          </Form.Item>
          {/* : null
          } */}

          {/* {!runtimeInfo.procfile */}
          <Form.Item {...formItemLayout} label="web服务器">
            {getFieldDecorator('service_server', {
              initialValue: userRunTimeInfo.procfile ,
              rules: [
                {
                  required: true,
                  message: '请选择'
                }
              ]
            })(
              <RadioGroup disabled className={styles.ant_radio_disabled}>
                <Radio value="apache">apache</Radio>
                <Radio value="nginx">nginx</Radio>
              </RadioGroup>
            )}
          </Form.Item>
          {/* //   : null
          // } */}

          {/* {!runtimeInfo.dependencies */}
          <Form.Item {...formItemLayout} label="PHP扩展">
            <Tabs defaultActiveKey="1">
              <TabPane tab="已启用扩展" key="1">
                <Table
                  columns={[
                    {
                      title: '名称',
                      dataIndex: 'name',
                      render: (v, data) => {
                        return <a target="_blank" href={data.url}>{v}</a>
                      }
                    }, {
                      title: '版本',
                      dataIndex: 'version'
                    }
                  ]}
                  pagination={false}
                  dataSource={this.state.enablePlugs} />
              </TabPane>
              <TabPane tab="未启用扩展" key="2">
                <Table
                  rowKey='value'
                  columns={[
                    {
                      title: '名称',
                      dataIndex: 'name',
                      render: (v, data) => {
                        return <a target="_blank" href={data.url}>{v}</a>
                      }
                    }, {
                      title: '版本',
                      dataIndex: 'version'
                    }, {
                      title: "操作",
                      dataIndex: "action",
                    }
                  ]}
                  rowSelection={rowSelection}
                  pagination={false}
                  dataSource={this.state.unablePlugs} />
              </TabPane>
            </Tabs>
          </Form.Item>
          {/* : null
          } */}

          {/* <Row>
            <Col span="5"></Col>
            <Col span="19">
              <Button onClick={this.handleSubmit} type={'primary'}>确认修改</Button>
            </Col>
          </Row> */}
        </Card>

      </Fragment>
    )
  }
}

@connect(({ user, appControl, teamControl }) => ({ currUser: user.currentUser }), null, null, { withRef: true })
@Form.create()
class BaseInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      memoryList: [
        {
          text: '64M',
          value: 64
        },
        {
          text: '128M',
          value: 128
        },
        {
          text: '256M',
          value: 256
        },
        {
          text: '512M',
          value: 512
        }, {
          text: '1G',
          value: 1024
        }, {
          text: '2G',
          value: 1024 * 2
        }, {
          text: '4G',
          value: 1024 * 4
        }, {
          text: '8G',
          value: 1024 * 8
        }, {
          text: '16G',
          value: 1024 * 8
        }
      ]
    }
  }
  handleSubmit = (e) => {
    const form = this.props.form;
    form.validateFields((err, fieldsValue) => {
      if (err)
        return;
      this.props.onSubmit && this
        .props
        .onSubmit(fieldsValue)
    });
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    };
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 3,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 21,
        },
      },
    };
    const extend_method = this.props.appDetail.service.extend_method;
    const minMemory = this.props.appDetail.service.min_memory;
    const list = this.state.memoryList;
    return (
      <Card title="基本信息" style={{
        marginBottom: 16
      }}>

        <Form.Item {...formItemLayout} label="应用类型">

          {getFieldDecorator('extend_method', {
            initialValue: extend_method || 'stateless',
            rules: [
              {
                required: true,
                message: '请选择应用类型'
              }
            ]
          })(
            <RadioGroup>
              <Radio style={radioStyle} value="stateless">无状态应用（包括Web类，API类）</Radio>
              <Radio style={radioStyle} value={"state"}>有状态应用（包括DB类，集群类，消息中间件类，数据类）</Radio>
            </RadioGroup>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="内存">

          {getFieldDecorator('min_memory', {
            initialValue: minMemory || '',
            rules: [
              {
                required: true,
                message: '请选择内存'
              }
            ]
          })(
            <RadioGroup>
              {minMemory < list[0].value
                ? <RadioButton value={minMemory}>{minMemory}M</RadioButton>
                : null}
              {list.map((item, index) => {
                return <RadioButton key={index} value={item.value}>{item.text}</RadioButton>
              })
              }
            </RadioGroup>
          )}
        </Form.Item>
        <Row>
          <Col span="5"></Col>
          <Col span="19">
            <Button onClick={this.handleSubmit} type={'primary'}>确认修改</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}

@connect(({ user, appControl, teamControl }) => ({ currUser: user.currentUser }), null, null, { withRef: true })
class RenderDeploy extends PureComponent {
  constructor(arg) {
    super(arg);
    this.state = {
      runtimeInfo: null
    }
  }
  componentDidMount() {
    this.getRuntimeInfo();
  }
  handleEditRuntime = (val = {}) => {
    this
      .props
      .dispatch({
        type: 'appControl/editRuntimeInfo',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          ...val
        },
        callback: (data) => { }
      })
  }
  handleEditInfo = (val = {}) => {
    console.log(val)
    this
      .props
      .dispatch({
        type: 'appControl/editAppCreateInfo',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          ...val
        },
        callback: (data) => {
          if (data) {
            this.props.updateDetail()
          }
        }
      })
  }
  getRuntimeInfo = () => {
    this
      .props
      .dispatch({
        type: 'appControl/getRuntimeInfo',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias
        },
        callback: (data) => {
          this.setState({ runtimeInfo: data.bean })
        }
      })
  }
  render() {
    const language = appUtil.getLanguage(this.props.appDetail);
    const runtimeInfo = this.state.runtimeInfo;
    const visible = this.props.visible;
    if (!this.state.runtimeInfo)
      return null;
    const appDetail = this.props.appDetail;
    return (
      <div
        style={{
          display: visible
            ? 'block'
            : 'none'
        }}>
        <BaseInfo appDetail={appDetail} onSubmit={this.handleEditInfo} />
        {(language === 'php')
          ? <PHP
            appDetail={this.props.appDetail}
            onSubmit={this.handleEditRuntime}
            runtimeInfo={runtimeInfo.check_dependency || {}}
            userRunTimeInfo={runtimeInfo.user_dependency || {}}
            selected_dependency={runtimeInfo.selected_dependency || []}
          />
          : null
        }

        {appUtil.isJava(this.props.appDetail)
          ? <JAVA
            appDetail={this.props.appDetail}
            onSubmit={this.handleEditRuntime}
            language={language}
            userRunTimeInfo={runtimeInfo.user_dependency || {}}
            runtimeInfo={runtimeInfo.check_dependency || {}} />
          : null
        }

        {(language === 'python')
          ? <Python
            appDetail={this.props.appDetail}
            onSubmit={this.handleEditRuntime}
            userRunTimeInfo={runtimeInfo.user_dependency || {}}
            runtimeInfo={runtimeInfo.check_dependency || {}} />
          : null
        }

        {(language === 'go')
          ? <Golang
            appDetail={this.props.appDetail}
            onSubmit={this.handleEditRuntime}
            userRunTimeInfo={runtimeInfo.user_dependency || {}}
            runtimeInfo={runtimeInfo.check_dependency || {}}
          />
          : null
        }

        {(language === 'nodejs')
          ? <Nodejs
            appDetail={this.props.appDetail}
            onSubmit={this.handleEditRuntime}
            userRunTimeInfo={runtimeInfo.user_dependency || {}}
            runtimeInfo={runtimeInfo.check_dependency || {}} />
          : null
        }
      </div>
    )
  }
}

//存储管理
@connect(({ user, appControl }) => ({ currUser: user.currentUser }), null, null, { withRef: true })
class Mnt extends PureComponent {
  constructor(arg) {
    super(arg);
    this.state = {
      showAddVar: null,
      showAddRelation: false,
      selfPathList: [],
      mntList: [],
      toDeleteMnt: null,
      toDeleteVolume: null,
      volumes: []
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.loadMntList();
    this.fetchVolumes();
  }
  fetchVolumes = () => {
    this
      .props
      .dispatch({
        type: 'appControl/fetchVolumes',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias
        },
        callback: (data) => {
          this.setState({
            volumes: data.list || []
          })
        }
      })
  }
  loadMntList = () => {
    getMnt({
      team_name: globalUtil.getCurrTeamName(),
      app_alias: this.props.appDetail.service.service_alias,
      page: 1,
      page_size: 1000
    }).then((data) => {
      if (data) {
        this.setState({
          mntList: data.list || []
        })
      }
    })
  }
  handleAddVar = () => {
    this.setState({
      showAddVar: {
        new: true
      }
    })
  }
  handleCancelAddVar = () => {
    this.setState({ showAddVar: null })
  }
  handleSubmitAddVar = (vals) => {
    this
      .props
      .dispatch({
        type: 'appControl/addVolume',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          ...vals
        },
        callback: () => {
          this.fetchVolumes();
          this.handleCancelAddVar();
        }
      })
  }
  showAddRelation = () => {
    this.setState({ showAddRelation: true })
  }
  handleCancelAddRelation = () => {
    this.setState({ showAddRelation: false })
  }
  handleSubmitAddMnt = (mnts) => {
    addMnt({
      team_name: globalUtil.getCurrTeamName(),
      app_alias: this.props.appDetail.service.service_alias,
      body: mnts
    }).then((data) => {
      if (data) {
        this.handleCancelAddRelation();
        this.loadMntList()
      }
    })
  }
  onDeleteMnt = (mnt) => {
    this.setState({ toDeleteMnt: mnt })
  }
  onDeleteVolume = (data) => {
    console.log(data)
    this.setState({ toDeleteVolume: data })
  }
  onCancelDeleteVolume = () => {
    this.setState({ toDeleteVolume: null })
  }
  handleDeleteVolume = () => {
    this
      .props
      .dispatch({
        type: 'appControl/deleteVolume',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          volume_id: this.state.toDeleteVolume.ID
        },
        callback: () => {
          this.onCancelDeleteVolume();
          this.fetchVolumes();
        }
      })
  }
  handleDeleteMnt = () => {
    this
      .props
      .dispatch({
        type: 'appControl/deleteMnt',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          dep_vol_id: this.state.toDeleteMnt.dep_vol_id
        },
        callback: () => {
          this.cancelDeleteMnt();
          this.loadMntList();
        }
      })
  }
  cancelDeleteMnt = () => {
    this.setState({ toDeleteMnt: null })
  }
  render() {
    const { mntList } = this.state;
    const { volumes } = this.state;
    const columns = [
      {
        title: '存储名称',
        dataIndex: 'volume_name'
      }, {
        title: '挂载路径',
        dataIndex: 'volume_path'
      }, {
        title: '存储类型',
        dataIndex: 'volume_type'
      }, {
        title: '操作',
        dataIndex: 'action',
        render: (val, data) => {
          return <a
            onClick={() => {
              this.onDeleteVolume(data)
            }}
            href="javascript:;">删除</a>
        }
      }
    ]
    return (
      <Fragment>
        <Card style={{
          marginBottom: 16
        }} title={"存储设置"}>
          <Table pagination={false} dataSource={volumes} columns={columns} />
          <div
            style={{
              marginTop: 10,
              textAlign: 'right'
            }}>
            <Button onClick={this.handleAddVar}><Icon type="plus" />
              添加存储</Button>
          </div>
        </Card>
        <Card style={{
          marginBottom: 16
        }} title={"共享存储"}>
          <Table
            pagination={false}
            columns={[
              {
                title: '本地挂载路径',
                dataIndex: 'local_vol_path'
              }, {
                title: '目标存储名称',
                dataIndex: 'dep_vol_name'
              }, {
                title: '目标挂载路径',
                dataIndex: 'dep_vol_path'
              }, {
                title: '目标存储类型',
                dataIndex: 'dep_vol_type',
                render: (text, record) => {
                  return <span>{volumeTypeObj[text]}</span>;
                }
              }, {
                title: '目标所属服务',
                dataIndex: 'dep_app_name',
                render: (v, data) => {
                  return <Link to={`/team/${globalUtil.getCurrTeamName()}/region/${globalUtil.getCurrRegionName()}/app/${data.dep_app_alias}/overview`}>{v}</Link>
                }
              }, {
                title: '目标服务所属应用',
                dataIndex: 'dep_app_group',
                render: (v, data) => {
                  return <Link to={`/team/${globalUtil.getCurrTeamName()}/region/${globalUtil.getCurrRegionName()}/groups/${data.dep_group_id}`}>{v}</Link>
                }
              }, {
                title: '操作',
                dataIndex: 'action',
                render: (val, data) => {
                  return <a
                    onClick={() => {
                      this.onDeleteMnt(data)
                    }}
                    href="javascript:;">取消挂载</a>
                }
              }
            ]}
            dataSource={mntList} />
          <div
            style={{
              marginTop: 10,
              textAlign: 'right'
            }}>
            <Button onClick={this.showAddRelation}><Icon type="plus" />
              挂载共享存储</Button>
          </div>
        </Card>
        {this.state.showAddVar && <AddOrEditVolume
          appBaseInfo={this.props.appDetail.service}
          onCancel={this.handleCancelAddVar}
          onSubmit={this.handleSubmitAddVar}
          data={this.state.showAddVar} />}
        {this.state.showAddRelation && <AddRelationMnt
          appAlias={this.props.appDetail.service.service_alias}
          onCancel={this.handleCancelAddRelation}
          onSubmit={this.handleSubmitAddMnt} />}
        {this.state.toDeleteMnt && <ConfirmModal
          title="取消挂载"
          desc="确定要取消此挂载目录吗?"
          onCancel={this.cancelDeleteMnt}
          onOk={this.handleDeleteMnt} />}
        {this.state.toDeleteVolume && <ConfirmModal
          title="删除存储目录"
          desc="确定要删除此存储目录吗?"
          onCancel={this.onCancelDeleteVolume}
          onOk={this.handleDeleteVolume} />}
      </Fragment>
    );
  }
}

@connect(({ user, appControl, teamControl }) => ({}), null, null, { withRef: true })
class Relation extends PureComponent {
  constructor(arg) {
    super(arg);
    this.state = {
      showAddRelation: false,
      linkList: [],
      relationList: [],
      viewRelationInfo: null
    }
  }
  componentDidMount() {
    this.loadRelationedApp();
  }
  loadRelationedApp = () => {
    getRelationedApp({
      team_name: globalUtil.getCurrTeamName(),
      app_alias: this.props.appDetail.service.service_alias
    }).then((data) => {
      if (data) {
        this.setState({
          relationList: data.list || []
        })
      }
    })
  }
  showAddRelation = () => {
    this.setState({ showAddRelation: true })
  }
  handleCancelAddRelation = () => {
    this.setState({ showAddRelation: false })
  }
  handleSubmitAddRelation = (ids) => {
    batchAddRelationedApp({
      team_name: globalUtil.getCurrTeamName(),
      app_alias: this.props.appDetail.service.service_alias,
      dep_service_ids: ids
    }).then((data) => {
      if (data) {
        notification.info({ message: "需要更新才能生效" })
        this.loadRelationedApp();
        this.handleCancelAddRelation();
      }
    })
  }
  handleRemoveRelationed = (app) => {
    removeRelationedApp({
      team_name: globalUtil.getCurrTeamName(),
      app_alias: this.props.appDetail.service.service_alias,
      dep_service_id: app.service_id
    }).then((data) => {
      if (data) {
        this.loadRelationedApp();
      }
    })
  }
  onViewRelationInfo = (data) => {
    this.setState({ viewRelationInfo: data })
  }
  cancelViewRelationInfo = (data) => {
    this.setState({ viewRelationInfo: null })
  }
  render() {
    const { linkList, relationList } = this.state;
    return (
      <Card title={"服务依赖"}>
        <Table
          pagination={false}
          columns={[
            {
              title: '应用名',
              dataIndex: 'service_cname',
              render: (val, data) => {
                return <Link to={`/team/${globalUtil.getCurrTeamName()}/region/${globalUtil.getCurrRegionName()}/app/${data.service_alias}/overview`}>{val}</Link>
              }
            }, {
              title: '所属组',
              dataIndex: 'group_name'
            }, {
              title: '应用说明',
              dataIndex: 'describe',
              render: (val, data) => { }
            }, {
              title: '操作',
              dataIndex: 'var',
              render: (val, data) => {
                return (
                  <Fragment>
                    <a
                      onClick={() => this.onViewRelationInfo(data)}
                      href="javascript:;"
                      style={{
                        marginRight: 8
                      }}>查看链接信息</a>
                    <a
                      onClick={() => {
                        this.handleRemoveRelationed(data)
                      }}
                      href="javascript:;">取消依赖</a>
                  </Fragment>
                )
              }
            }
          ]}
          dataSource={relationList} />
        <div style={{
          marginTop: 10,
          textAlign: 'right'
        }}>
          <Button onClick={this.showAddRelation}><Icon type="plus" />
            添加依赖</Button>
        </div>
        {this.state.showAddRelation && <AddRelation
          appAlias={this.props.appDetail.service.service_alias}
          onCancel={this.handleCancelAddRelation}
          onSubmit={this.handleSubmitAddRelation} />}
        {this.state.viewRelationInfo && <ViewRelationInfo
          appAlias={this.state.viewRelationInfo.service_alias}
          onCancel={this.cancelViewRelationInfo} />}
      </Card>
    )
  }
}

//环境变量
@connect(({ user, appControl, teamControl }) => ({}), null, null, { withRef: true })
class Env extends PureComponent {
  constructor(arg) {
    super(arg);
    this.state = {
      showAddVar: false,
      showEditVar: null,
      deleteVar: null,
      innerEnvs: []
    }
  }
  componentDidMount() {
    this.fetchInnerEnvs();
  }
  fetchInnerEnvs = () => {
    this
      .props
      .dispatch({
        type: 'appControl/fetchInnerEnvs',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias
        },
        callback: (data) => {
          this.setState({
            innerEnvs: data.list || []
          })
        }
      })
  }
  handleAddVar = () => {
    this.setState({ showAddVar: true })
  }
  handleCancelAddVar = () => {
    this.setState({ showAddVar: false })
  }
  handleSubmitAddVar = (vals) => {
    this
      .props
      .dispatch({
        type: 'appControl/addInnerEnvs',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          attr_name: vals.attr_name,
          attr_value: vals.attr_value,
          name: vals.name
        },
        callback: () => {
          this.handleCancelAddVar();
          this.fetchInnerEnvs();
        }
      })
  }
  onEditVar = (data) => {
    this.setState({ showEditVar: data });
  }
  cancelEditVar = () => {
    this.setState({ showEditVar: null });
  }
  handleEditVar = (vals) => {
    this
      .props
      .dispatch({
        type: 'appControl/editEvns',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          attr_name: vals.attr_name,
          attr_value: vals.attr_value,
          name: vals.name
        },
        callback: () => {
          this.cancelEditVar();
          this.fetchInnerEnvs();
        }
      })
  }
  onDeleteVar = (data) => {
    this.setState({ deleteVar: data });
  }
  cancelDeleteVar = () => {
    this.setState({ deleteVar: null });
  }
  handleDeleteVar = () => {
    this
      .props
      .dispatch({
        type: 'appControl/deleteEnvs',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          attr_name: this.state.deleteVar.attr_name
        },
        callback: () => {
          this.cancelDeleteVar();
          this.fetchInnerEnvs();
        }
      })
  }
  render() {
    const innerEnvs = this.state.innerEnvs;
    return (
      <Card title="环境变量" style={{
        marginBottom: 16
      }}>
        <Table
          columns={[
            {
              title: '变量名',
              dataIndex: 'attr_name'
            }, {
              title: '变量值',
              dataIndex: 'attr_value',
              width: '20%'
            }, {
              title: '说明',
              dataIndex: 'name'
            }, {
              title: '操作',
              dataIndex: 'action',
              render: (val, data) => {
                return (
                  <Fragment>
                    {data.is_change
                      ? <a
                        href="javascript:;"
                        style={{
                          marginRight: 8
                        }}
                        onClick={() => {
                          this.onDeleteVar(data)
                        }}>删除</a>
                      : ''}
                    {data.is_change
                      ? <a
                        href="javascript:;"
                        onClick={() => {
                          this.onEditVar(data)
                        }}>修改</a>
                      : ''}
                  </Fragment>
                )
              }
            }
          ]}
          pagination={false}
          dataSource={innerEnvs} />
        <div style={{
          textAlign: 'right',
          paddingTop: 20
        }}>
          <Button type="default" onClick={this.handleAddVar}><Icon type="plus" />添加变量</Button>
        </div>
        {this.state.showAddVar && <AddOrEditEnv
          onCancel={this.handleCancelAddVar}
          onSubmit={this.handleSubmitAddVar} />}
        {this.state.showEditVar && <AddOrEditEnv
          onCancel={this.cancelEditVar}
          onSubmit={this.handleEditVar}
          data={this.state.showEditVar} />}
        {this.state.deleteVar && <ConfirmModal
          onOk={this.handleDeleteVar}
          onCancel={this.cancelDeleteVar}
          title="删除变量"
          desc="确定要删除此变量吗？"
          subDesc="此操作不可恢复" />}
      </Card>
    )
  }
}

//端口
@connect(({ user, appControl, teamControl }) => ({}), null, null, { withRef: true })
class Ports extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showEditAlias: null,
      showDeleteDomain: null,
      showDeletePort: null,
      showDeleteDomain: null,
      showAddPort: false,
      ports: []
    }
  }
  componentDidMount() {
    this.fetchPorts();
  }
  fetchPorts = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'appControl/fetchPorts',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        app_alias: this.props.appDetail.service.service_alias
      },
      callback: (data) => {
        this.setState({
          ports: data.list || []
        })
      }
    })
  }
  handleSubmitProtocol = (protocol, port, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'appControl/changeProtocol',
      payload: {
        team_name: globalUtil.getCurrTeamName(),
        app_alias: this.props.appDetail.service.service_alias,
        port: port,
        protocol: protocol
      },
      callback: () => {
        this.fetchPorts();
        callback();
      }
    })
  }
  showEditAlias = (port) => {
    this.setState({ showEditAlias: port })
  }
  hideEditAlias = () => {
    this.setState({ showEditAlias: null })
  }
  handleEditAlias = (vals) => {
    this
      .props
      .dispatch({
        type: 'appControl/editPortAlias',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          port: this.state.showEditAlias.container_port,
          port_alias: vals.alias
        },
        callback: () => {
          this.fetchPorts();
          this.hideEditAlias();
        }
      })
  }
  handleOpenInner = (port) => {
    this
      .props
      .dispatch({
        type: 'appControl/openPortInner',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          port: port
        },
        callback: () => {
          this.fetchPorts();
        }
      })
  }
  onCloseInner = (port) => {
    this
      .props
      .dispatch({
        type: 'appControl/closePortInner',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          port: port
        },
        callback: () => {
          this.fetchPorts();
        }
      })
  }
  handleOpenOuter = (port) => {
    this
      .props
      .dispatch({
        type: 'appControl/openPortOuter',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          port: port
        },
        callback: () => {
          this.fetchPorts();
        }
      })
  }
  onCloseOuter = (port) => {
    this
      .props
      .dispatch({
        type: 'appControl/closePortOuter',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          port: port
        },
        callback: () => {
          this.fetchPorts();
        }
      })
  }
  handleDeletePort = (port) => {
    this.setState({ showDeletePort: port })
  }
  cancalDeletePort = () => {
    this.setState({ showDeletePort: null })
  }
  handleSubmitDeletePort = () => {
    this
      .props
      .dispatch({
        type: 'appControl/deletePort',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          port: this.state.showDeletePort
        },
        callback: () => {
          this.cancalDeletePort();
          this.fetchPorts();
        }
      })
  }
  showAddPort = () => {
    this.setState({ showAddPort: true })
  }

  onCancelAddPort = () => {
    this.setState({ showAddPort: false })
  }
  handleAddPort = (val) => {

    this
      .props
      .dispatch({
        type: 'appControl/addPort',
        payload: {
          team_name: globalUtil.getCurrTeamName(),
          app_alias: this.props.appDetail.service.service_alias,
          protocol: val.protocol,
          port: val.port
        },
        callback: () => {
          this.onCancelAddPort();
          this.fetchPorts();
        }
      })
  }
  render() {
    const ports = this.state.ports || [];
    const isImageApp = appUtil.isImageApp(this.props.appDetail);
    const isDockerfile = appUtil.isDockerfile(this.props.appDetail);
    return (
      <Card title="端口管理" style={{
        marginBottom: 16
      }}>
        <div className={styles.ports}>
          {ports.map((port) => {
            return <Port
              key={port.ID}
              showOuterUrl={false}
              showDomain={false}
              port={port}
              onDelete={this.handleDeletePort}
              onEditAlias={this.showEditAlias}
              onSubmitProtocol={this.handleSubmitProtocol}
              onOpenInner={this.handleOpenInner}
              onCloseInner={this.onCloseInner}
              onOpenOuter={this.handleOpenOuter}
              onCloseOuter={this.onCloseOuter} />
          })
          }
          {!ports.length
            ? <p style={{
              textAlign: 'center'
            }}>暂无端口</p>
            : ''
          }
        </div>
        <div style={{
          textAlign: 'right',
          paddingTop: 20
        }}>

          <Button type="default" onClick={this.showAddPort}><Icon type="plus" />添加端口</Button>
        </div>
        {this.state.showEditAlias && <EditPortAlias
          port={this.state.showEditAlias}
          onOk={this.handleEditAlias}
          onCancel={this.hideEditAlias} />}
        {this.state.showDeletePort && <ConfirmModal
          title="端口删除"
          desc="确定要删除此端口吗？"
          subDesc="此操作不可恢复"
          onOk={this.handleSubmitDeletePort}
          onCancel={this.cancalDeletePort} />}
        {this.state.showDeleteDomain && <ConfirmModal
          title="域名解绑"
          desc="确定要解绑此域名吗？"
          subDesc={this.state.showDeleteDomain.domain}
          onOk={this.handleSubmitDeleteDomain}
          onCancel={this.cancalDeleteDomain} />}
        {this.state.showAddPort && <AddPort isImageApp={isImageApp} isDockerfile={isDockerfile} onCancel={this.onCancelAddPort} onOk={this.handleAddPort} />}
      </Card>
    )
  }
}

class RenderProperty extends PureComponent {
  render() {
    const visible = this.props.visible;
    const appDetail = this.props.appDetail;
    return (
      <div
        style={{
          display: visible
            ? 'block'
            : 'none'
        }}>
        <Ports appDetail={appDetail} />
        <Env appDetail={appDetail} />
        <Mnt appDetail={appDetail} />
        <Relation appDetail={appDetail} />
      </div>
    )
  }
}

@connect(({ user, appControl }) => ({ currUser: user.currentUser }), null, null, { withRef: true })
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      //property、deploy
      type: 'property'
    }
  }
  getAppAlias() {
    return this.props.match.params.appAlias;
  }
  handleType = (type) => {
    if (this.state.type !== type) {
      this.setState({ type: type });
    }
  }
  render() {
    const appDetail = this.props.appDetail || {};
    const type = this.state.type;

    return (
      <div>
        <div style={{
          overflow: 'hidden'
        }}>
          <div className={styles.typeBtnWrap}>
            <Affix offsetTop={0}>
              <div>
                <span
                  className={styles.typeBtn + ' ' + (type === 'property'
                    ? styles.active
                    : '')}
                  onClick={() => {
                    this.handleType('property')
                  }}>
                  基本属性
                  <Icon type="right" />
                </span>
                <span
                  className={styles.typeBtn + ' ' + (type === 'deploy'
                    ? styles.active
                    : '')}
                  onClick={() => {
                    this.handleType('deploy')
                  }}>
                  部署属性
                  <Icon type="right" />
                </span>
              </div>
            </Affix>
          </div>

          <div
            className={styles.content}
            style={{
              overflow: 'hidden',
              marginBottom: 90
            }}>
            <RenderDeploy updateDetail={this.props.updateDetail} appDetail={appDetail} visible={type === 'deploy'} />
            <RenderProperty appDetail={appDetail} visible={type !== 'deploy'} />
          </div>
        </div>
      </div>
    )
  }
}