import React, { Fragment, useRef, useState } from 'react';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import {
  Tabs,
  Button,
  Tag,
  Input,
  Modal,
  Radio,
  Space,
  Form,
  Checkbox,
  Row,
  Col,
  message,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import img4 from './img4.png';
import img5 from './img5.png';
import img6 from './img6.png';

// 假数据
function generateMockData(numEntries: number) {
  const mockData = [];

  for (let i = 0; i < numEntries; i++) {
    // 生成随机日期
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));
    const formattedDate =
      date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];

    mockData.push({
      id: i + 1,
      planName: `方案${i + 1}`, // 随机方案名称
      memberType: ['付费会员', '免费会员'][Math.floor(Math.random() * 2)], // 随机会员类型
      status: Math.random() > 0.5 ? '启用' : '待启用', // 随机状态
      createTime: formattedDate, // 随机创建时间
    });
  }

  return mockData;
}

const mockData = generateMockData(100); // 生成100条假数据

const DetailView = ({ onClose, record }) => {
  const defaultData = [
    { key: '1', field: 'name', required: true },
    { key: '2', field: 'phone', required: false },
  ];

  const [planName, setPlanName] = useState(record?.planName || '');
  const [memberType, setMemberType] = useState(record?.memberType || 'free');
  const [status, setStatus] = useState(record?.status || 'active');
  const [registrationRequirement, setRegistrationRequirement] = useState(
    record?.registrationRequirement || 'required',
  );
  const [settingMethod, setSettingMethod] = useState(record?.settingMethod || 'growthValue');
  const [data, setData] = useState(record?.data || defaultData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSave = () => {
    // 实现保存逻辑
    onClose();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // 确认按钮的逻辑
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddField = () => {
    const newData = { key: Date.now().toString(), field: '', required: false };
    setData([...data, newData]);
  };

  const handleDeleteField = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const renderDataFields = () => {
    return data.map((item) => (
      <div
        key={item.key}
        className="Items"
        style={{
          paddingLeft: '120px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Form.Item label={item.field === 'name' ? '姓名' : '手机号'}></Form.Item>
        <Checkbox checked={item.required} onChange={(e) => handleRequiredChange(e, item.key)}>
          必填
        </Checkbox>
        <DeleteOutlined
          onClick={() => handleDeleteField(item.key)}
          style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
        />
      </div>
    ));
  };

  const handleRequiredChange = (e, key) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, required: e.target.checked };
      }
      return item;
    });
    setData(newData);
  };

  return (
    <div className="Plans" style={{ padding: '1rem', gap: '1rem' }}>
      <Form layout="vertical">
        <h3 style={{ padding: '1rem 0' }}>基本信息</h3>
        <Form.Item label="方案名称">
          <Input value={planName} onChange={(e) => setPlanName(e.target.value)} />
        </Form.Item>
        <Form.Item label="会员类型">
          <Radio.Group value={memberType} onChange={(e) => setMemberType(e.target.value)}>
            <Radio value="free">免费会员</Radio>
            <Radio value="paid">付费会员</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="状态">
          <Radio.Group value={status} onChange={(e) => setStatus(e.target.value)}>
            <Radio value="active">启用</Radio>
            <Radio value="inactive">停用</Radio>
          </Radio.Group>
        </Form.Item>

        <h3 style={{ padding: '1rem 0' }}>入会资料</h3>
        <Form.Item label="注册资料">
          <Radio.Group
            value={registrationRequirement}
            onChange={(e) => setRegistrationRequirement(e.target.value)}
          >
            <Radio value="required">需要填写资料</Radio>
            <Radio value="notRequired">无需填写资料</Radio>
          </Radio.Group>
        </Form.Item>
        {registrationRequirement === 'required' && renderDataFields()}
        <div style={{ paddingLeft: '120px', cursor: 'pointer' }} onClick={showModal}>
          <PlusOutlined />
          <span>添加资料项</span>
        </div>
        <Modal title="添加资料项" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <img width="480" style={{ margin: '1rem 0' }} src={img6} />
        </Modal>

        <h3 style={{ padding: '1rem 0' }}>等级方案</h3>
        <Form.Item label="设置方式">
          <Radio.Group value={settingMethod} onChange={(e) => setSettingMethod(e.target.value)}>
            <Radio value="growthValue">按累计成长值设置</Radio>
            <Radio value="consumerBehavior">按消费行为设置</Radio>
          </Radio.Group>
        </Form.Item>

        {settingMethod === 'growthValue' ? (
          <img width="816" style={{ margin: '1rem 0' }} src={img4} />
        ) : (
          <img width="816" style={{ margin: '1rem 0' }} src={img5} />
        )}
        <Space style={{ marginTop: '1rem' }}>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
          <Button onClick={onClose}>取消</Button>
        </Space>
      </Form>
    </div>
  );
};

const TableList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState(() => generateMockData(100)); // 将 mockData 转换为状态
  const confirmDelete = (record) => {
    Modal.confirm({
      title: '确认删除',
      content: '你确定要删除这条数据吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 执行删除操作
        handleDelete(record.id);
      },
    });
  };

  const handleDelete = (id) => {
    // 更新状态以移除数据
    setData(data.filter((item) => item.id !== id));
  };

  const actionRef = useRef();
  const { TabPane } = Tabs;

  const handleDetailClick = (record) => {
    console.log(record);
    if (!record) {
      const mockRecord = {
        memberType: 'paid',
        status: 'inactive',
        registrationRequirement: 'notRequired',
        settingMethod: 'consumerBehavior',
        data: [
          { key: '3', field: 'email', required: true },
          { key: '4', field: 'address', required: false },
        ],
      };
      setSelectedRecord(mockRecord);
    } else {
      const mockRecord = {
        planName: `${record.planName}`,
        memberType: 'paid',
        status: 'inactive',
        registrationRequirement: 'notRequired',
        settingMethod: 'consumerBehavior',
        data: [
          { key: '3', field: 'email', required: true },
          { key: '4', field: 'address', required: false },
        ],
      };
      setSelectedRecord(mockRecord);
    }
    setShowDetails(true);
  };
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
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      ellipsis: true,
      key: 'id',
    },
    {
      title: '方案名称',
      dataIndex: 'planName', // 根据实际字段名调整
      ellipsis: true,
      key: 'planName',
    },
    {
      title: '会员类型',
      dataIndex: 'memberType', // 根据实际字段名调整
      ellipsis: true,
      key: 'memberType',
    },
    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      key: 'status',
      render: (_, record) => (
        <Tag color={record.status === '启用' ? 'green' : 'orange'}>{record.status}</Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime', // 根据实际字段名调整
      ellipsis: true,
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: { status: string }) => (
        <>
          <Button type="link" onClick={() => handleDetailClick(record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => toggleStatus(record)}>
            {record.status === '启用' ? '停用' : '启用'}
          </Button>
          <Button type="link" onClick={() => confirmDelete(record)}>
            删除
          </Button>
        </>
      ),
    },
  ];

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
    <PageContainer>
      {showDetails ? (
        <DetailView record={selectedRecord} onClose={() => setShowDetails(false)} />
      ) : (
        <Fragment>
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
                <Button
                  type="primary"
                  style={{ display: 'flex', width: '115px', flexDirection: 'column' }}
                  onClick={handleDetailClick}
                >
                  新增会员方案
                </Button>
              </div>,
            ]}
          />
        </Fragment>
      )}
    </PageContainer>
  );
};

export default TableList;
