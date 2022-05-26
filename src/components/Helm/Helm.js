import { Button, Form, Input, Radio, Space, Icon, Alert } from 'antd'
import { PlusCircleOutlined, CopyOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import LayoutProviders from '@theme/LayoutProviders';
import React, { Component } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios'
import copy from 'copy-to-clipboard'
import DAinputs from '../DAinput/DAinput'
import BuildInput from '../DAinput/BuildInput'
import Etcd from '../DAinput/Etcd'
import Hint from '../DAinput/Hint'
import tippy from 'tippy.js';
import Item from 'antd/lib/list/Item'
import './index.css'
import 'tippy.js/dist/tippy.css';


var dataObj = {
    enableHA: false,
    gatewayIngressIPs: '',
    imageHub: {
        enable: false,
        domain: '',
        namespace: '',
        username: '',
        password: ''
    },
    etcd: {
        enable: false,
        endpoints: [],
        secretName: ''
    },
    estorage: {
        enable: false,
        RWX: {
            enable: false,
            config:{
                storageClassName: ''
            }
        },
        RWO: {
            enable: false,
            storageClassName: ''
        }    
    },
    database: {
        enable: false,
        uiDatabase: {
            host: '',
            port: '',
            username: '',
            password: '',
            dbname: '',
            enable: false
        },
        regionDatabase: {
            host: '',
            port: '',
            username: '',
            password: '',
            dbname: '',
            enable: false
        }
    },
    nodesForChaos: {
        enable: false,
        nodes: []
    },
    nodesForGateway: {
        enable: true,
        nodes: []
    }
}
export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            enableHA: false,
            repositories: false,
            etcd: false,
            storage: false,
            database: false,
            build: false,
            gateway: false,
            copyColor: false,
            btnFlog: false,
            btnLoading: false,
            command: '',
            resCommand: [],
            copyCommand: '',
            btnLoading: false,
            disabled: false,
            btnFlag:true,
            btnFlags:false
        };
    }
    //高可用
    onChangeha = e => {
        this.setState({
            enableHA: e.target.value,
            etcd: e.target.value,
            storage: e.target.value,
            database: e.target.value,
            disabled: e.target.value,
        });
        dataObj.enableHA = e.target.value
        dataObj.etcd.enable = e.target.value
        dataObj.estorage.enable = e.target.value
        dataObj.estorage.RWX.enable = e.target.value
        dataObj.estorage.RWO.enable = e.target.value
        dataObj.database.enable = e.target.value
        dataObj.database.uiDatabase.enable = e.target.value
        dataObj.database.regionDatabase.enable = e.target.value
    };
    //镜像仓库
    onRepositories = e => {
        this.setState({
            repositories: e.target.value,
        });
        dataObj.imageHub.enable = e.target.value
        
    }
    //etcd
    onEtcd = e => {
        this.setState({
            etcd: e.target.value,
        });
        dataObj.etcd.enable = e.target.value
    }
    //存储
    onStorage = e => {
        this.setState({
            storage: e.target.value,
        });
        dataObj.estorage.enable = e.target.value
        dataObj.estorage.RWX.enable = e.target.value
        dataObj.estorage.RWO.enable = e.target.value
    }
    //数据库
    onDatabase = e => {
        this.setState({
            database: e.target.value,
        });

        dataObj.database.enable = e.target.value
        dataObj.database.uiDatabase.enable = e.target.value
        dataObj.database.regionDatabase.enable = e.target.value
    }
    //构建节点
    onBuild = e => {
        this.setState({
            build: e.target.value,
        });
        dataObj.nodesForChaos.enable = e.target.value
    }
    //网关节点
    onGateway = e => {
        this.setState({
            gateway: e.target.value,
        });
        dataObj.nodesForGateway.enable = e.target.value
    }
    reminder = (e)=>{
        const { btnFlag, btnFlags} = this.state
        if(e.gatewayIngressIPs || e.nodesForGateway){ 
            Swal.fire({
                position: 'center-center',
                icon: 'success',
                title: 'HELM命令生成成功',
                showConfirmButton: false,
                timer: 1500,
                heightAuto:true
            })
            this.setState({btnFlags:false})
        }else{
            Swal.fire({
                position: 'center-center',
                icon: 'error',
                title: '信息没有填写完整',
                showConfirmButton: false,
                timer: 2000
            })
            this.setState({
                command:'',
                copyCommand:'',
                btnFlog:false
            })
        }     
    }
    //表单事件
    onFinish = (e) => {
        this.setState({ 
            btnLoading: true ,
            btnFlags: true
        },()=>{
            this.reminder(e)
        })
        if (e) {
            dataObj.gatewayIngressIPs = e.gatewayIngressIPs || ''
            dataObj.imageHub.domain = e.domain || ''
            dataObj.imageHub.namespace = e.namespace || ''
            dataObj.imageHub.username = e.username || ''
            dataObj.imageHub.password = e.password || ''
            dataObj.etcd.endpoints = e.endpoints || []
            dataObj.etcd.secretName = e.secretName || ''
            dataObj.estorage.RWX.config.storageClassName = e.storageClassName1 || ''
            dataObj.estorage.RWO.storageClassName = e.storageClassName2 || ''
            dataObj.database.uiDatabase.host = e.host1 || ''
            dataObj.database.uiDatabase.port = e.port1 || ''
            dataObj.database.uiDatabase.username = e.username1 || ''
            dataObj.database.uiDatabase.password = e.password1 || ''
            dataObj.database.uiDatabase.dbname = e.dbname1 || ''
            dataObj.database.regionDatabase.host = e.host2 || ''
            dataObj.database.regionDatabase.port = e.port2 || ''
            dataObj.database.regionDatabase.username = e.username2 || ''
            dataObj.database.regionDatabase.password = e.password2 || ''
            dataObj.database.regionDatabase.dbname = e.dbname2 || ''
            dataObj.nodesForChaos.nodes = e.nodesForChaos || []
            dataObj.nodesForGateway.nodes = e.nodesForGateway || []
            axios({
                method: 'post',
                url: 'https://cloud.goodrain.com/enterprise-server/api/v1/helm/chart',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dataObj
            }).then((res) => {
                if (res.status == 200) {
                    const resArr = res.data.command.split(' & ')
                    const resArrCopy = resArr.join('\n ')
                    this.setState({
                        command: res.data.command,
                        resCommand: resArr,
                        copyCommand: resArrCopy,
                        btnFlog: true,
                        btnLoading: false,
                        btnFlag:false,
                        
                    })
                }
            })
        }
    }
    render() {
        const {
            enableHA,
            repositories,
            etcd,
            storage,
            database,
            build,
            gateway,
            copyColor,
            btnFlog,
            command,
            resCommand,
            copyCommand,
            btnLoading,
            disabled
        } = this.state
        return (
            <LayoutProviders>
                <div className="rainbond_box">
                    {/* 头部标题 */}
                    <header>
                        <div className="rainbond_helmTop">
                            <h2 className="rainbond_heard">Helm安装命令生成工具</h2>
                        </div>
                    </header>
                    {/* 中间内容 */}
                    <div className="rainbond_content">
                        <Form onFinish={this.onFinish}>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">高可用安装</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onChangeha} value={enableHA}>
                                        <Space direction="vertical">
                                            <Radio value={false}>否</Radio>
                                            <div className="rainbond_has">
                                                <Radio value={true}>是</Radio>
                                                <div className="hint">
                                                <Hint idName='myButton' placement="left" titleName='高可用安装时，Rainbond 集群的 pod 实例调整为2（默认为1），高可用模式下必须提供外部数据库、外部 Etcd 、外部共享存储（RWX）' />
                                                </div>
                                            </div>
                                        </Space>
                                    </Radio.Group>
                                    
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">网关地址</h4>
                                <div className="rainbond_gateway">
                                    <div className="rainbond_rows">
                                        <span style={{color:'red'}}>*</span>
                                        <span className="rainbond_spanTitle">IP地址</span>
                                        <Form.Item
                                            name="gatewayIngressIPs"
                                            rules={[
                                                { required: true, message: '内容不能为空' },
                                                {
                                                    pattern: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
                                                    message: "请输入正确的IP地址"
                                                }
                                            ]}
                                        >
                                            <Input
                                                className="rainbond_inputs"
                                                placeholder="请输入IP地址  例：1.2.3.4"
                                            />
                                            
                                        </Form.Item>
                                        <div className="ipHint">
                                                <Hint
                                                    idName='IP'
                                                    placement="bottom"
                                                    titleName='网关地址用于后期在 Rainbond 部署的服务与外界进行通信的地址  1. 如果网关节点存在负载均衡器，则填写负载均衡的 IP 地址
                                                2. 如果网关节点存在浮动 IP , 则填写 VIP 的 IP 地址
                                                3. 以上两种情况都不存在时，直接填写网关节点的外部 IP'
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rainbond_lines">
                                <h4 className="rainbond_title">网关节点</h4>
                                <div className="rainbond_ha">
                                    <Form.Item
                                        name="nodesForGateway"
                                        rules={[
                                            { required: true, message: '内容不能为空' }
                                        ]}
                                    >   
                                        <DAinputs />  
                                    </Form.Item>
                                </div>
                                <div className="hints">
                                    <Hint
                                        idName='nodesGateway'
                                        placement="bottom"
                                        titleName='1. 内部IP 填写内网 IP（INTERNAL-IP） 2. 当节点存在外部 IP (EXTERNAL-IP)时，则填写对应的外部 IP ，当不存在时，可填写 内部 IP
                                        （INTERNAL-IP） 3. 节点名称则填写 对应节点的 kubernetes 集群node name 即可'
                                    />
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">Etcd</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onEtcd} value={etcd}>
                                        <Space direction="vertical">
                                            <Radio value={false} disabled={disabled}>内置Etcd</Radio>
                                            <div className="rainbond_has">
                                            <Radio value={true}>
                                                外部Etcd
                                                {etcd ?
                                                    <div className="rainbond_rowsLeft">
                                                        <Form.Item
                                                            name="endpoints"
                                                            rules={[
                                                                { required: true, message: '内容不能为空' }
                                                            ]}
                                                        >
                                                            <Etcd />
                                                        </Form.Item>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">secret名称</span>
                                                            <Form.Item
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' }
                                                                ]}
                                                                name='secretName'
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入secret名称  例：rbd-etcd-secret" />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                    : null}
                                                
                                                <div className="hintBox">
                                                <Hint
                                                    idName='etcd'
                                                    placement="bottom"
                                                    titleName='1. endpoints 地址为 ETCD集群的 endpoints
                                                2. secret名称为通过 ETCD 集群的证书创建的 secret 资源，创建时需要指定和 Rainbond 集群相同的
                                                namespace'
                                                />
                                                </div> 
                                            </Radio>
                                            </div>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">存储</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onStorage} value={storage}>
                                        <Space direction="vertical">
                                            <Radio value={false} disabled={disabled}>内置存储</Radio>
                                            <div className="rainbond_has">
                                            <Radio value={true}>
                                                外部存储
                                                {storage ?
                                                    <div className="rainbond_rowsLeft">
                                                        <div className="rainbond_rows_rwx">
                                                            { disabled && <span style={{color:'red',marginLeft:'-8px'}}>*</span> }
                                                            <span className="rainbond_spanTitle">RWX 所用存储 storageClass 名称</span>
                                                            <Form.Item
                                                                name="storageClassName1"
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' }
                                                                ]}
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入存储名称  例：glusterfs-simple" />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="links">
                                                            <a href="https://www.rainbond.com/docs/installation/install-with-helm/vaules-config">
                                                            如需自定义挂载参数，或采用其他挂载，请参考values.yaml 详解
                                                            </a>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">RWO 所用存储 storageClass 名称</span>
                                                            <Form.Item
                                                                name="storageClassName2"
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入存储名称  例：glusterfs-simple" />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                    : null}
                                                <div className="hintBox">
                                                    <Hint
                                                        idName='storage'
                                                        placement="bottom"
                                                        titleName='此项为外部共享存储的 storageClass 名称'
                                                    />
                                                </div>
                                            </Radio>
                                            </div>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">数据库</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onDatabase} value={database}>
                                        <Space direction="vertical">
                                            <Radio value={false} disabled={disabled}>内置数据库</Radio>
                                            <div className="rainbond_has">
                                            <Radio value={true}>
                                                外部数据库
                                                {database ?
                                                    <div className="rainbond_rowsLeft">
                                                        <div className="rainbond_rowsTitle">
                                                            <h5 className="rainbond_console">控制台数据库:</h5>
                                                            <h5 className="rainbond_region">数据中心数据库:</h5>
                                                        </div>
                                                        <div className="rainbond_rows" style={{ marginTop: '10px' }}>
                                                            <span className="rainbond_dataTitle">连接地址</span>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="host1"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入数据库连接地址" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="host2"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入数据库连接地址" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_dataTitle">连接端口</span>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="port1"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入连接端口  例：3306" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="port2"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入连接端口  例：3306" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_dataTitle">用户名</span>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="username1"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入用户名  例：root" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="username2"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入用户名  例：root" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_dataTitle">密码</span>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="password1"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入密码" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="password2"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入密码" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_dataTitle">数据库名称</span>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="dbname1"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入数据库库名称  例：console" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="rainbond_databaseBox">
                                                                <Form.Item
                                                                    name="dbname2"
                                                                    rules={[
                                                                        { required: true, message: '内容不能为空' }
                                                                    ]}
                                                                >
                                                                    <Input className="rainbond_dataInput" placeholder="请输入数据库库名称  例：region" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null}
                                                <div className="hintDatabase">
                                                <Hint
                                                    idName='database'
                                                    placement="bottom"
                                                    titleName='控制台数据库以及数据中心数据库，可以使用同一个，但要提前创建 “console” 以及 “region” 库，
                                                如不使用 root 用户，需要做好用户授权'
                                                />
                                                </div>
                                            </Radio>
                                            
                                            </div>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">镜像仓库</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onRepositories} value={repositories}>
                                        <Space direction="vertical">
                                            <Radio value={false}>内置镜像仓库</Radio>
                                            <div className="rainbond_has">
                                            <Radio value={true}>
                                                外部镜像仓库
                                                {repositories ?
                                                    <div className="rainbond_rowsLeft">
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">镜像仓库域名</span>
                                                            <Form.Item
                                                                name="domain"
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' },
                                                                    {
                                                                        pattern: /^(?=^.{3,255}$)[a-zA-Z0-9*][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
                                                                        message: '请输入正确的域名格式'
                                                                    }
                                                                ]}
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入镜像仓库域名" />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">命名空间</span>
                                                            <Form.Item
                                                                name="namespace"
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入命名空间" />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">用户名</span>
                                                            <Form.Item
                                                                name="username"
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' }
                                                                ]}
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入用户名" />
                                                            </Form.Item>
                                                        </div>
                                                        <div className="rainbond_rows">
                                                            <span className="rainbond_spanTitle">密码</span>
                                                            <Form.Item
                                                                name="password"
                                                                rules={[
                                                                    { required: true, message: '内容不能为空' }
                                                                ]}
                                                            >
                                                                <Input className="rainbond_inputs" placeholder="请输入密码" />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                    : null}
                                                <div className="hintWarehouse">
                                                <Hint
                                                    idName='warehouse'
                                                    placement="bottom"
                                                    titleName='镜像仓库主要用于存放，集群上部署的业务组件的镜像，仓库地址保证可以被正常推拉镜像即可'
                                                />
                                                </div>
                                            </Radio>
                                            </div>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="rainbond_line">
                                <h4 className="rainbond_title">构建节点</h4>
                                <div className="rainbond_ha">
                                    <Radio.Group size="large" onChange={this.onBuild} value={build}>
                                        <Space direction="vertical">
                                            <Radio value={false}>默认配置</Radio>
                                            <div className="rainbond_has">
                                            <Radio value={true}>
                                                自定义配置
                                                {build ?
                                                    <Form.Item
                                                        name="nodesForChaos"
                                                        rules={[
                                                            { required: true, message: '内容不能为空' }
                                                        ]}
                                                    >
                                                        <BuildInput />
                                                    </Form.Item>
                                                    : null}
                                            <div className="hintDatabase">
                                                <Hint
                                                    idName='nodesForChaos'
                                                    placement="bottom"
                                                    titleName='主要用于定义源码构建的操作节点，节点名称输入 kubernetes 集群的 node name 即可'
                                                />
                                            </div>
                                            </Radio>
                                            </div>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </div>
                            {/* 生成命令框 */}
                            {btnFlog && (
                                <div className="rainbond_copyContent">
                                    <CopyOutlined
                                        className={`${copyColor ? 'rainbond_iconCopys' : 'rainbond_iconCopy'}`}
                                        onClick={() => {
                                            this.setState({
                                                copyColor: true
                                            })
                                            copy(copyCommand)
                                            Swal.fire({
                                                position: 'center-center',
                                                icon: 'success',
                                                title: '复制成功',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        }}
                                    />
                                    {resCommand.length > 0 && resCommand.map((item, index) => {
                                        return (
                                            <span key={index} className="rainbond_spanCommand">
                                                {item}
                                            </span>
                                        )
                                    })}
                                </div>
                            )}

                            <div className="rainbond_btnBox">
                                <Form.Item wrapperCol={{ offset: 0, span: 20 }}>
                                    <Button className="rainbond_btn" loading={btnLoading} type="primary" htmlType="submit" onClick={this.reminder} >一键生成安装命令</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            </LayoutProviders>
        )
    }
}
