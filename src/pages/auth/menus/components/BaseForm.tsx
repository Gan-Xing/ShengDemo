import useQueryList from '@/hooks/useQueryList';
import { ProForm, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
// import { FormInstance } from 'antd';
import React from 'react';

interface Props {
  // form: FormInstance<any>;
  permissions?: { id: number }[];
}
const BaseForm: React.FC<Props> = () => {
  // const { form, permissions } = props;
  const intl = useIntl();
  // const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  // const [checkedKeys, setCheckedKeys] = useState<Key[] | { checked: Key[]; halfChecked: Key[] }>(
  //   permissions?.map((permission) => `permission-${permission.id}`) ?? [],
  // );
  // const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  // const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  function transformData(data: any) {
    return data.map((item: any) => ({
      title: item.name,
      value: item.id,
      key: item.id,
      children: item.children ? transformData(item.children) : [],
    }));
  }

  const { items: menusdata } = useQueryList('/menus');
  const menus = transformData(menusdata);

  // const { items: permission_groups } = useQueryList('/permission_groups');
  // const onExpand = (expandedKeysValue: Key[]) => {
  //   console.log('onExpand', expandedKeysValue);
  //   // if not set autoExpandParent to false, if children expanded, parent can not collapse.
  //   // or, you can remove all expanded children keys.
  //   setExpandedKeys(expandedKeysValue);
  //   setAutoExpandParent(false);
  // };

  // const onCheck = (checkedKeysValue: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
  //   console.log('onCheck', checkedKeysValue);
  //   setCheckedKeys(checkedKeysValue);
  //   const permissions = (checkedKeysValue as Key[]).filter((key: Key) =>
  //     key.toString().startsWith('permission'),
  //   );
  //   const permissionIds = permissions.map((key: Key) =>
  //     Number(key.toString().replace('permission-', '')),
  //   );
  //   form.setFieldsValue({
  //     permissionIds,
  //   });
  // };

  // const onSelect = (selectedKeysValue: Key[], info: any) => {
  //   console.log('onSelect', info);
  //   setSelectedKeys(selectedKeysValue);
  // };
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
        <ProFormTreeSelect
          name="parentId"
          placeholder={intl.formatMessage({
            id: 'pages.searchTable.select.placeholder',
            defaultMessage: '请选择',
          })}
          allowClear
          width="md"
          secondary
          label={intl.formatMessage({
            id: 'pages.menus.parentid',
            defaultMessage: '上级菜单',
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
            treeData: menus,
          }}
        />
      </ProForm.Group>
    </>
  );
};

export default BaseForm;
