import useQueryList from '@/hooks/useQueryList';
import { ProForm, ProFormSelect, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';

const BaseForm: React.FC = () => {
  const intl = useIntl();

  function transformData(data: any) {
    return data.map((item: any) => ({
      title: item.name,
      value: item.id,
      key: item.id,
      children: item.children ? transformData(item.children) : [],
    }));
  }

  const { items: data } = useQueryList('/permissiongroups');
  const permissiongroups = transformData(data);
  console.log('permissiongroups', permissiongroups);

  return (
    <>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.name.placeholder"
                  defaultMessage="请输入名称"
                />
              ),
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.roles.name',
            defaultMessage: '名称',
          })}
          width="md"
          name="name"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.path.placeholder"
                  defaultMessage="请输入路径"
                />
              ),
            },
          ]}
          label={intl.formatMessage({
            id: 'pages.permissions.path',
            defaultMessage: '请求路径',
          })}
          width="md"
          name="path"
        />
        <ProFormSelect
          name="action"
          label={intl.formatMessage({
            id: 'pages.permissions.method',
            defaultMessage: '请求方法',
          })}
          valueEnum={{
            GET: 'GET',
            POST: 'POST',
            DELETE: 'DELETE',
            PUT: 'PUT',
            Patch: 'PATCH',
          }}
          width="md"
          placeholder={intl.formatMessage({
            id: 'pages.searchTable.select.placeholder',
            defaultMessage: '请选择',
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.placeholder" defaultMessage="请输入！" />,
            },
          ]}
        />
        <ProFormTreeSelect
          name="permissionGroupId"
          placeholder={intl.formatMessage({
            id: 'pages.searchTable.select.placeholder',
            defaultMessage: '请选择',
          })}
          allowClear
          width="md"
          secondary
          label={intl.formatMessage({
            id: 'pages.permissions.permissionGroup',
            defaultMessage: ' 选择权限组',
          })}
          // tree-select args
          fieldProps={{
            showArrow: false,
            filterTreeNode: true,
            showSearch: true,
            treeDefaultExpandAll: true,
            autoClearSearchValue: true,
            // multiple: true,
            treeNodeFilterProp: 'title',
            fieldNames: {
              label: 'title',
            },
            treeData: permissiongroups,
          }}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.placeholder" defaultMessage="请输入！" />,
            },
          ]}
        />
      </ProForm.Group>
    </>
  );
};

export default BaseForm;
