import React, { Fragment, useRef, useState } from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, Tag, Input, Modal, Alert, message } from 'antd';
import { Tabs } from 'antd';
import img3 from './img3.png';
// 假数据
function generateMockData(numEntries: number) {
  const mockData = [];
  const auditorNames = [
    '张伟',
    '王芳',
    '李娜',
    '陈伟',
    '杨秀英',
    '刘强',
    '赵敏',
    '周军',
    '黄丽',
    '吴勇',
    '徐丽华',
    '孙宇',
    '马杰',
    '朱红',
    '胡鑫',
    '郭静',
    '何建国',
    '林婷',
    '梁鹏',
    '韩婷婷',
  ]; // 示例审核人姓名数组

  for (let i = 0; i < numEntries; i++) {
    const statusOptions = ['已通过', '待审核', '已驳回'];
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    // 随机生成手机号
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    const phoneNumber = `183${randomNumber}`;

    // 随机生成申请日期和审核日期
    const applyDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
    const auditDate = new Date(
      applyDate.getTime() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000,
    );
    const applyDateString = applyDate.toISOString().replace('T', ' ').substring(0, 19);
    const auditDateString = auditDate.toISOString().replace('T', ' ').substring(0, 19);

    // 随机选择审核人
    const randomAuditor = auditorNames[Math.floor(Math.random() * auditorNames.length)];

    mockData.push({
      id: i + 1,
      phoneNumber: phoneNumber,
      entryMode: '门店入驻',
      source: '小程序',
      status: randomStatus,
      applyDate: applyDateString,
      auditor: randomStatus === '待审核' ? '' : randomAuditor,
      auditTime: randomStatus === '待审核' ? '' : auditDateString,
    });
  }

  return mockData;
}

const mockData = generateMockData(100);

const DetailView = ({ record, onClose }) => {
  // 弹框显示状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isApproved, setIsApproved] = useState(false); // 新增状态
  // 显示弹框
  const showRejectModal = () => {
    setIsModalVisible(true);
  };

  // 隐藏弹框
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 确认驳回操作
  const handleConfirmReject = () => {
    // 这里可以添加发送驳回原因的逻辑
    setIsApproved(true); // 更新状态
    message.success('审批成功'); // 显示成功消息
  };

  // 处理同意申请操作
  const handleApprove = () => {
    setIsApproved(true); // 更新状态
    message.success('审批成功'); // 显示成功消息
  };
  // 更新驳回原因
  const handleChange = (e) => {
    setRejectReason(e.target.value);
  };
  // 示例图片链接
  const exampleImage = 'https://via.placeholder.com/200';
  const exampleImage1 = 'https://via.placeholder.com/50';

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* 详细信息部分 */}
      <div style={{ flexBasis: '80%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <img src={exampleImage1} alt="门脸图" style={{ margin: '20px' }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <h3>企业入驻审核</h3>
            <span>请尽快审核企业入驻信息，以免造成客户流失</span>
          </div>
        </div>
        {/* 基础信息 */}
        <div style={{ fontWeight: 'bold' }}>基础信息</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <div style={{ flexBasis: '50%', padding: '10px' }}>
            <span
              style={{
                padding: '0.5rem',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#e0e0e0',
                border: '1px solid #ccc',
                boxShadow: '0px 0px 5px #aaa',
              }}
            >
              申请人手机号 183764593456
            </span>
          </div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>申请时间 2023-09-01 16:22:34</div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>来源 微信小程序</div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>邀请码 暂无</div>
        </div>

        {/* 空隙 */}
        <div style={{ marginTop: '20px' }}></div>

        {/* 入驻信息 */}
        <div style={{ fontWeight: 'bold' }}>入驻信息</div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flexBasis: '50%', padding: '10px' }}>联系人姓名 张乾坤</div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>联系人电话 183764593456</div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>
            <span
              style={{
                padding: '0.5rem',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#e0e0e0',
                border: '1px solid #ccc',
                boxShadow: '0px 0px 5px #aaa',
              }}
            >
              外卖电话 183764593456
            </span>
          </div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>
            <span
              style={{
                padding: '0.5rem',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#e0e0e0',
                border: '1px solid #ccc',
                boxShadow: '0px 0px 5px #aaa',
              }}
            >
              门店名称 百年老店·嵊州小吃
            </span>
          </div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>
            <span>门店地址 浙江省杭州市西湖区文三路888号</span>
          </div>
        </div>

        {/* 空隙 */}
        <div style={{ marginTop: '20px' }}></div>

        {/* 图片部分 */}
        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>门脸图</div>
          <img src={exampleImage} alt="门脸图" style={{ margin: '20px' }} />
        </div>

        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>店内环境图</div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <img src={exampleImage} alt="店内环境图1" style={{ margin: '20px' }} />
            <img src={exampleImage} alt="店内环境图2" style={{ margin: '20px' }} />
          </div>
        </div>

        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>营业执照</div>
          <img src={exampleImage} alt="营业执照" style={{ margin: '20px' }} />
        </div>

        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>食品许可证</div>
          <img src={exampleImage} alt="食品许可证" style={{ margin: '20px' }} />
        </div>

        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>身份证正反面</div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <img src={exampleImage} alt="身份证正面" style={{ margin: '20px' }} />
            <img src={exampleImage} alt="身份证反面" style={{ margin: '20px' }} />
          </div>
        </div>

        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>手持身份证正脸照</div>
          <img src={exampleImage} alt="手持身份证正脸照" style={{ margin: '20px' }} />
        </div>
      </div>

      {/* 操作按钮部分 */}
      {!isApproved && (
        <div style={{ flexBasis: '20%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button type="primary" onClick={handleApprove}>
            同意申请
          </Button>
          <Button type="default" onClick={showRejectModal}>
            驳回申请
          </Button>
        </div>
      )}

      {isApproved && (
        <div style={{ flexBasis: '20%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button type="primary">查看企业</Button>
        </div>
      )}

      {/* 驳回原因弹框 */}
      <Modal
        title="驳回原因"
        visible={isModalVisible}
        onOk={handleConfirmReject}
        onCancel={handleCancel}
      >
        <Alert
          message="请输入详细驳回原因，以便企业知晓申请失败原因！"
          type="warning"
          showIcon
          icon={<i style={{ color: 'orange' }} className="anticon anticon-exclamation-circle" />}
          style={{ marginBottom: '20px' }}
        />
        <Input.TextArea
          rows={10}
          maxLength={500}
          placeholder="请输入（0/500字符）"
          value={rejectReason}
          onChange={handleChange}
        />
      </Modal>
    </div>
  );
};

const DetailEnterprise = ({ hidddenButtons, onClose }) => {
  // 弹框显示状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isApproved, setIsApproved] = useState(false); // 新增状态
  // 显示弹框
  const showRejectModal = () => {
    setIsModalVisible(true);
  };

  console.log('===================hidddenButtons,isApproved', hidddenButtons, isApproved);
  // 隐藏弹框
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBack = () => {
    onClose();
  };

  // 确认驳回操作
  const handleConfirmReject = () => {
    // 这里可以添加发送驳回原因的逻辑
    setIsModalVisible(false);
    setIsApproved(true); // 更新状态
    message.success('审批成功'); // 显示成功消息
  };

  // 处理同意申请操作
  const handleApprove = () => {
    setIsApproved(true); // 更新状态
    message.success('审批成功'); // 显示成功消息
  };
  // 更新驳回原因
  const handleChange = (e) => {
    setRejectReason(e.target.value);
  };
  // 示例图片链接
  const exampleImage = 'https://via.placeholder.com/200';
  const exampleImage1 = 'https://via.placeholder.com/50';

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* 详细信息部分 */}
      <div style={{ flexBasis: '80%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <img src={exampleImage1} alt="门脸图" style={{ margin: '20px' }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <h3>企业入驻审核</h3>
            <span>请尽快审核企业入驻信息，以免造成客户流失</span>
          </div>
        </div>
        {/* 基础信息 */}
        <div style={{ fontWeight: 'bold' }}>基础信息</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <div style={{ flexBasis: '50%', padding: '10px' }}>
            <span
              style={{
                padding: '0.5rem',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#e0e0e0',
                border: '1px solid #ccc',
                boxShadow: '0px 0px 5px #aaa',
              }}
            >
              申请人手机号 183764593456
            </span>
          </div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>申请时间 2023-09-01 16:22:34</div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>来源 微信小程序</div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>邀请码 暂无</div>
        </div>

        {/* 空隙 */}
        <div style={{ marginTop: '20px' }}></div>

        {/* 入驻信息 */}
        <div style={{ fontWeight: 'bold' }}>入驻信息</div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flexBasis: '50%', padding: '10px' }}>联系人姓名 张乾坤</div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>联系人电话 183764593456</div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>
            <span
              style={{
                padding: '0.5rem',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#e0e0e0',
                border: '1px solid #ccc',
                boxShadow: '0px 0px 5px #aaa',
              }}
            >
              外卖电话 183764593456
            </span>
          </div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>
            <span
              style={{
                padding: '0.5rem',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#e0e0e0',
                border: '1px solid #ccc',
                boxShadow: '0px 0px 5px #aaa',
              }}
            >
              门店名称 百年老店·嵊州小吃
            </span>
          </div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>
            <span>门店地址 浙江省杭州市西湖区文三路888号</span>
          </div>
        </div>

        {/* 空隙 */}
        <div style={{ marginTop: '20px' }}></div>

        {/* 图片部分 */}
        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>门脸图</div>
          <img src={exampleImage} alt="门脸图" style={{ margin: '20px' }} />
        </div>

        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>店内环境图</div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <img src={exampleImage} alt="店内环境图1" style={{ margin: '20px' }} />
            <img src={exampleImage} alt="店内环境图2" style={{ margin: '20px' }} />
          </div>
        </div>

        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>营业执照</div>
          <img src={exampleImage} alt="营业执照" style={{ margin: '20px' }} />
        </div>

        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>食品许可证</div>
          <img src={exampleImage} alt="食品许可证" style={{ margin: '20px' }} />
        </div>

        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>身份证正反面</div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <img src={exampleImage} alt="身份证正面" style={{ margin: '20px' }} />
            <img src={exampleImage} alt="身份证反面" style={{ margin: '20px' }} />
          </div>
        </div>

        <div style={{ margin: '20px 20px 20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>手持身份证正脸照</div>
          <img src={exampleImage} alt="手持身份证正脸照" style={{ margin: '20px' }} />
        </div>
      </div>

      {/* 操作按钮部分 */}

      <div style={{ flexBasis: '20%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {hidddenButtons && !isApproved ? (
          <>
            <Button type="primary" onClick={handleApprove}>
              同意申请
            </Button>
            <Button type="default" onClick={showRejectModal}>
              驳回申请
            </Button>
          </>
        ) : (
          <>
            <Button type="primary">查看企业</Button>
            <img width="220" src={img3} alt="Some Image" />
          </>
        )}
        <Button type="default" onClick={handleBack}>
          返回
        </Button>
      </div>

      {/* 驳回原因弹框 */}
      <Modal
        title="驳回原因"
        visible={isModalVisible}
        onOk={handleConfirmReject}
        onCancel={handleCancel}
      >
        <Alert
          message="请输入详细驳回原因，以便企业知晓申请失败原因！"
          type="warning"
          showIcon
          icon={<i style={{ color: 'orange' }} className="anticon anticon-exclamation-circle" />}
          style={{ marginBottom: '20px' }}
        />
        <Input.TextArea
          rows={10}
          maxLength={500}
          placeholder="请输入（0/500字符）"
          value={rejectReason}
          onChange={handleChange}
        />
      </Modal>
    </div>
  );
};

const TableList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isHidden, setIsHideen] = useState(false);

  const actionRef = useRef();
  const { TabPane } = Tabs;

  const handleDetailClick = (record) => {
    setSelectedRecord(record);
    setShowDetails(true);
    setIsHideen(true);
  };

  const handleDetail = (record) => {
    setSelectedRecord(record);
    setShowDetails(true);
    setIsHideen(false);
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      ellipsis: true, // 添加文本溢出隐藏
      key: 'id',
    },
    {
      title: '申请人手机号',
      dataIndex: 'phoneNumber',
      ellipsis: true, // 添加文本溢出隐藏
      key: 'phoneNumber',
    },
    {
      title: '入驻方式',
      dataIndex: 'entryMode',
      ellipsis: true, // 添加文本溢出隐藏
      key: 'entryMode',
    },
    {
      title: '申请来源',
      dataIndex: 'source',
      ellipsis: true, // 添加文本溢出隐藏
      key: 'source',
    },
    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true, // 添加文本溢出隐藏
      key: 'status',
      render: (
        _: any,
        record: {
          status:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | null
            | undefined;
        },
      ) => {
        switch (record.status) {
          case '已通过':
            return <Tag color="green">已通过</Tag>;
          case '待审核':
            return <Tag color="orange">待审核</Tag>;
          case '已驳回':
            return <Tag color="red">已驳回</Tag>;
          default:
            return <Tag>{record.status}</Tag>;
        }
      },
    },
    {
      title: '申请日期',
      dataIndex: 'applyDate',
      ellipsis: true, // 添加文本溢出隐藏
      key: 'applyDate',
    },
    {
      title: '审核人',
      dataIndex: 'auditor',
      ellipsis: true, // 添加文本溢出隐藏
      key: 'auditor',
      render: (_: any, record: { status: string; auditor: any }) =>
        record.status === '待审核' ? '--' : record.auditor,
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',

      key: 'auditTime',
      render: (_: any, record: { status: string; auditTime: any }) =>
        record.status === '待审核' ? '--' : record.auditTime,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: { status: string }) => (
        <>
          <Button type="link" onClick={() => handleDetail(record)}>
            详情
          </Button>
          {record.status === '待审核' && (
            <Button type="link" onClick={() => handleDetailClick(record)}>
              审核
            </Button>
          )}
        </>
      ),
    },
  ];

  const [activeTabKey, setActiveTabKey] = useState('全部');

  const filteredData = mockData.filter((item) => {
    if (activeTabKey === '全部') return true;
    return item.status === activeTabKey;
  });

  // 处理搜索
  const handleSearch = (value: React.SetStateAction<string>) => {
    setSearchText(value);
  };

  // 处理重置
  const handleReset = () => {
    setSearchText('');
  };
  return (
    <PageContainer>
      {showDetails ? (
        <DetailEnterprise hidddenButtons={isHidden} onClose={() => setShowDetails(false)} />
      ) : (
        <Fragment>
          <Tabs defaultActiveKey="全部" onChange={(key) => setActiveTabKey(key)}>
            <TabPane tab="全部" key="全部" />
            <TabPane tab="待审核" key="待审核" />
            <TabPane tab="已通过" key="已通过" />
            <TabPane tab="已驳回" key="已驳回" />
          </Tabs>
          <ProTable
            columns={columns}
            pagination={{
              defaultPageSize: 10, // 默认每页10条数据
            }}
            dataSource={filteredData.filter((item) =>
              Object.values(item).some((val) =>
                val.toString().toLowerCase().includes(searchText.toLowerCase()),
              ),
            )}
            rowKey="id"
            actionRef={actionRef}
            search={false}
            className="EntryAudit"
            options={{ setting: false, density: false, reload: false }} // 隐藏配置选项
            toolBarRender={() => [
              // eslint-disable-next-line react/jsx-key
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <Input.Search
                  placeholder="输入关键字"
                  onSearch={handleSearch}
                  style={{ width: 300 }}
                />

                <Button onClick={handleReset}>重置</Button>
              </div>,
            ]}
          />
        </Fragment>
      )}
    </PageContainer>
  );
};

export default TableList;
