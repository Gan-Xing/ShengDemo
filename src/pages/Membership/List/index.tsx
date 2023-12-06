import React, { Fragment, useRef, useState } from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, Tag, Input, Modal, Alert, message, Card } from 'antd';
import { Tabs } from 'antd';

// 假数据
function generateMockData(numEntries: number) {
  const mockData = [];

  for (let i = 0; i < numEntries; i++) {
    // 生成随机日期
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));
    const formattedDate = date.toISOString().split('T')[0];

    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - Math.floor(Math.random() * 30));
    const formattedRecentDate = recentDate.toISOString().split('T')[0];

    mockData.push({
      id: i + 1,
      appName: `小程序${i + 1}`, // 随机小程序名称
      phoneNumber: `139${Math.floor(10000000 + Math.random() * 90000000)}`, // 随机手机号
      sourceChannel: ['门店码', '小程序'][Math.floor(Math.random() * 2)], // 随机来源渠道
      store: `NO.000888${i + 1}`, // 随机门店名称
      memberLevel: ['VIP1', 'VIP2', 'VIP3', 'VIP4', 'VIP5'][Math.floor(Math.random() * 5)], // 随机会员等级
      registrationTime: formattedDate, // 随机注册时间
      consumptionCount: Math.floor(Math.random() * 100), // 随机消费次数
      consumptionAmount: Math.floor(Math.random() * 10000), // 随机消费金额
      recentConsumption: formattedRecentDate, // 随机最近消费时间
    });
  }

  return mockData;
}

const mockData = generateMockData(100); // 生成100条假数据

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
    console.log(rejectReason);
    setIsModalVisible(false);
    onClose();
  };

  // 处理同意申请操作
  const handleApprove = () => {
    setIsApproved(true); // 更新状态
    message.success('审批成功'); // 显示成功消息
    setTimeout(() => {
      onClose();
    }, 1000);
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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flexBasis: '50%', padding: '10px' }}>申请人手机号 183764593456</div>
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
          <div style={{ flexBasis: '50%', padding: '10px' }}>外卖电话 183764593456</div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>门店名称 百年老店·嵊州小吃</div>
          <div style={{ flexBasis: '50%', padding: '10px' }}>
            门店地址 浙江省杭州市西湖区文三路888号
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

const TableList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState(() => generateMockData(100)); // 将 mockData 转换为状态

  const actionRef = useRef();
  const { TabPane } = Tabs;

  const handleDetailClick = (record) => {
    setSelectedRecord(record);
    setShowDetails(true);
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
    },
    {
      title: '会员小程序名称',
      dataIndex: 'appName', // 根据实际字段名调整
      key: 'appName',
      ellipsis: true,
    },
    {
      title: '会员注册手机号',
      dataIndex: 'phoneNumber', // 根据实际字段名调整
      key: 'phoneNumber',
      ellipsis: true,
    },
    {
      title: '来源渠道',
      dataIndex: 'sourceChannel', // 根据实际字段名调整
      key: 'sourceChannel',
      ellipsis: true,
    },
    {
      title: '归属门店',
      dataIndex: 'store', // 根据实际字段名调整
      key: 'store',
      ellipsis: true,
    },
    {
      title: '会员等级',
      dataIndex: 'memberLevel', // 根据实际字段名调整
      key: 'memberLevel',
      ellipsis: true,
    },
    {
      title: '注册时间',
      dataIndex: 'registrationTime', // 根据实际字段名调整
      key: 'registrationTime',
      ellipsis: true,
      sorter: (a, b) => a.registrationTime.localeCompare(b.registrationTime), // 假设为字符串日期
    },
    {
      title: '消费次数',
      dataIndex: 'consumptionCount', // 根据实际字段名调整
      key: 'consumptionCount',
      ellipsis: true,
      sorter: (a, b) => a.consumptionCount - b.consumptionCount,
    },
    {
      title: '消费金额',
      dataIndex: 'consumptionAmount', // 根据实际字段名调整
      key: 'consumptionAmount',
      ellipsis: true,
      sorter: (a, b) => Number(a.consumptionAmount) - Number(b.consumptionAmount),
    },
    {
      title: '最近消费',
      dataIndex: 'recentConsumption', // 根据实际字段名调整
      key: 'recentConsumption',
      ellipsis: true,
      sorter: (a, b) => a.recentConsumption.localeCompare(b.recentConsumption), // 假设为字符串日期
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleDetailClick(record)}>
          详情
        </Button>
      ),
      ellipsis: true,
    },
  ];

  const toggleStatus = (record) => {
    // 创建新数组并更新状态
    const newData = data.map((item) => {
      if (item.id === record.id) {
        return { ...item, status: item.status === '启用' ? '待启用' : '启用' };
      }
      return item;
    });
    setData(newData); // 更新数据状态
  };

  const filteredData = mockData.filter((item) => {
    return true;
  });

  // 处理搜索
  const handleSearch = (value: React.SetStateAction<string>) => {
    setSearchText(value);
  };

  const exampleImage1 = 'https://via.placeholder.com/50';

  // 处理重置
  const handleReset = () => {
    setSearchText('');
  };
  return (
    <PageContainer>
      {showDetails ? (
        <DetailView record={selectedRecord} onClose={() => setShowDetails(false)} />
      ) : (
        <Fragment>
          <div
            className="MemberCards"
            style={{
              marginBottom: '10px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              className="totalcards"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                width: '200px',
              }}
            >
              <img src={exampleImage1} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h2>1,215,124</h2>
                <span>全部会员（位）</span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h2>15,124</h2>
              <span>新增会员（位）</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h2>8,124</h2>
              <span>消费会员（位）</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h2>8,142</h2>
              <span>未消费会员（位）</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h2>898</h2>
              <span>沉睡会员（位）</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h2>0</h2>
              <span>其他</span>
            </div>
          </div>
          <ProTable
            columns={columns}
            pagination={{
              defaultPageSize: 10, // 默认每页10条数据
            }}
            dataSource={data.filter((item) =>
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
              <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <div
                  style={{
                    marginBottom: '10px',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Input.Search
                    placeholder="输入关键字"
                    onSearch={handleSearch}
                    style={{ width: 300 }}
                  />

                  <Button onClick={handleReset}>重置</Button>
                </div>
              </div>,
            ]}
          />
        </Fragment>
      )}
    </PageContainer>
  );
};

export default TableList;
