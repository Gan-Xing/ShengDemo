import React, { Fragment, useRef, useState } from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { Button, Tag, Input, Modal, Alert, message, Card } from 'antd';
import { Tabs } from 'antd';
import img1 from './img1.png';
import img2 from './img2.png';

// 假数据
function generateMockData(numEntries: number) {
  const mockData = [];

  const entryMethods = ['门店入驻'];
  const companyNames = [
    '企业A',
    '企业B',
    '企业C',
    '企业D',
    '企业E',
    '企业F',
    '企业G',
    '企业H',
    '企业I',
    '企业J',
  ];
  const legalPersons = [
    '法人A',
    '法人B',
    '法人C',
    '法人D',
    '法人E',
    '法人F',
    '法人G',
    '法人H',
    '法人I',
    '法人J',
  ];
  const contactNumbers = [
    '13911111111',
    '13922222222',
    '13933333333',
    '13944444444',
    '13955555555',
    '13966666666',
    '13977777777',
    '13988888888',
    '13999999999',
    '13900000000',
  ];

  for (let i = 0; i < numEntries; i++) {
    // 生成随机日期
    const entryDate = new Date();
    entryDate.setDate(entryDate.getDate() - Math.floor(Math.random() * 365));
    const formattedEntryDate = `${entryDate.toISOString().split('T')[0]} ${Math.floor(
      Math.random() * 24,
    )}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`;

    mockData.push({
      id: i + 1,
      companyNumber: `NO.000888${i + 1}`, // 随机企业编号
      entryMethod: entryMethods[0], // 固定门店入驻方式
      companyName: companyNames[Math.floor(Math.random() * companyNames.length)], // 随机企业名称
      legalPerson: legalPersons[Math.floor(Math.random() * legalPersons.length)], // 随机法人
      contactNumber: contactNumbers[Math.floor(Math.random() * contactNumbers.length)], // 随机联系电话
      entryTime: formattedEntryDate, // 随机入驻时间
    });
  }

  return mockData;
}

const mockData = generateMockData(100); // 生成100条假数据

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
      title: '企业编号',
      dataIndex: 'companyNumber', // 根据实际字段名调整
      key: 'companyNumber',
      ellipsis: true,
    },
    {
      title: '入驻方式',
      dataIndex: 'entryMethod', // 根据实际字段名调整
      key: 'entryMethod',
      ellipsis: true,
    },
    {
      title: '企业名称',
      dataIndex: 'companyName', // 根据实际字段名调整
      key: 'companyName',
      ellipsis: true,
    },
    {
      title: '法人',
      dataIndex: 'legalPerson', // 根据实际字段名调整
      key: 'legalPerson',
      ellipsis: true,
    },
    {
      title: '联系电话',
      dataIndex: 'contactNumber', // 根据实际字段名调整
      key: 'contactNumber',
      ellipsis: true,
    },
    {
      title: '入驻时间',
      dataIndex: 'entryTime', // 根据实际字段名调整
      key: 'entryTime',
      ellipsis: true,
      sorter: (a, b) => a.entryTime.localeCompare(b.entryTime), // 假设为字符串日期
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
                <span>企业总数（位）</span>
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
              <span>门店（个）</span>
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
              <span>生产企业（个）</span>
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
              <span>设备企业（个）</span>
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
              <span>物流企业（个）</span>
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
              <span>其他企业（个）</span>
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

function generateMockGoodsData(numEntries: number) {
  const mockData = [];

  const productNames = [
    '嵊州炒年糕',
    '嵊州年糕骨汤',
    '嵊州辣鸡',
    '嵊州酸汤鱼',
    '嵊州糯米糕',
    '嵊州酱鸭',
    '嵊州红烧肉',
    '嵊州炸酱面',
    '嵊州猪蹄',
    '嵊州豆腐乳',
  ];
  const productTypes = ['套餐', '单品'];

  for (let i = 0; i < numEntries; i++) {
    const productNumber = `S${new Date().getFullYear()}${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}01${Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, '0')}`;
    const monthlySalesVolume = Number(Math.floor(Math.random() * 1000));
    const monthlySalesAmount = `¥${(monthlySalesVolume * (10 + Math.random() * 40)).toFixed(2)}`;

    mockData.push({
      id: i + 1,
      productName: productNames[Math.floor(Math.random() * productNames.length)],
      productType: productTypes[Math.floor(Math.random() * productTypes.length)],
      productNumber: productNumber,
      monthlySalesVolume: monthlySalesVolume,
      monthlySalesAmount: monthlySalesAmount,
    });
  }

  return mockData;
}

const GoodDetail = ({ onClose }) => {
  const exampleImage1 = 'https://via.placeholder.com/500';
  const handleBack = () => {
    onClose();
  };
  return (
    <Fragment>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            margin: '1rem',
          }}
        >
          <Button type="default" onClick={handleBack}>
            返回
          </Button>
        </div>

        <img width="860" src={img1}></img>
        <img width="860" src={img2}></img>
      </div>
    </Fragment>
  );
};

const GoodList = () => {
  const [searchText, setSearchText] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState(() => generateMockGoodsData(100)); // 将 mockData 转换为状态

  const actionRef = useRef();
  const { TabPane } = Tabs;

  const handleDetailClick = (record) => {
    setSelectedRecord(record);
    setShowDetails(true);
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'id', // 根据实际字段名调整
      key: 'id',
      ellipsis: true,
    },
    {
      title: '商品名称',
      dataIndex: 'productName', // 根据实际字段名调整
      key: 'productName',
      ellipsis: true,
    },
    {
      title: '商品类型',
      dataIndex: 'productType', // 根据实际字段名调整
      key: 'productType',
      ellipsis: true,
    },
    {
      title: '商品编号',
      dataIndex: 'productNumber', // 根据实际字段名调整
      key: 'productNumber',
      ellipsis: true,
    },
    {
      title: '本月销售量（份）',
      dataIndex: 'monthlySalesVolume', // 根据实际字段名调整
      key: 'monthlySalesVolume',
      ellipsis: true,
      render: (text) => <span style={{ color: 'lightgreen' }}>{text}</span>,
    },
    {
      title: '本月销售额',
      dataIndex: 'monthlySalesAmount', // 根据实际字段名调整
      key: 'monthlySalesAmount',
      ellipsis: true,
      render: (text) => <span style={{ color: 'crimson' }}>{text}</span>, // 绛红色
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

  // 处理重置
  const handleReset = () => {
    setSearchText('');
  };
  return (
    <Fragment>
      {showDetails ? (
        <GoodDetail record={selectedRecord} onClose={() => setShowDetails(false)} />
      ) : (
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
      )}
    </Fragment>
  );
};

const DetailView = ({ record, onClose }) => {
  // 弹框显示状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isApproved, setIsApproved] = useState(false); // 新增状态

  const { TabPane } = Tabs;
  // 显示弹框
  const showRejectModal = () => {
    setIsModalVisible(true);
  };

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
  function callback(key) {
    console.log(key);
  }
  // 示例图片链接
  const exampleImage = 'https://via.placeholder.com/200';
  const exampleImage1 = 'https://via.placeholder.com/50';

  const BaseInfo = () => {
    return (
      <Fragment>
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
      </Fragment>
    );
  };
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
            <h3>NO.00088888</h3>
            <span style={{ color: '#777', fontSize: '12px' }}>
              2023-09-04 17:34:46入驻 门店入驻
            </span>
          </div>
        </div>

        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="基本信息" key="1">
            <BaseInfo />
          </TabPane>
          <TabPane tab="经营信息" key="2">
            <BaseInfo />
          </TabPane>
          <TabPane tab="员工信息" key="3">
            <BaseInfo />
          </TabPane>
          <TabPane tab="商品信息" key="4">
            <GoodList />
          </TabPane>
          <TabPane tab="奖惩信息" key="5">
            <BaseInfo />
          </TabPane>
        </Tabs>
      </div>
      {/* 操作按钮部分 */}
      {/* {!isApproved && (
        <div style={{ flexBasis: '20%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button type="primary" onClick={handleApprove}>
            同意申请
          </Button>
          <Button type="default" onClick={showRejectModal}>
            驳回申请
          </Button>
        </div>
      )} */}
      <div style={{ flexBasis: '20%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3>操作</h3>
        <div style={{ flexBasis: '20%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button type="default" onClick={handleBack}>
            返回
          </Button>
        </div>
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

export default TableList;
