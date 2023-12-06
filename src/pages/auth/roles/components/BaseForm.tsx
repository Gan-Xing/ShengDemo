import useQueryList from '@/hooks/useQueryList';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Form, FormInstance, Tree } from 'antd';
import type { Key } from 'react';
import React, { useState } from 'react';

interface Props {
  form?: FormInstance<any>;
  permissions?: { id: number; name: string }[];
}
const BaseForm: React.FC<Props> = (props) => {
  const { form, permissions } = props;
  const intl = useIntl();
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<Key[] | { checked: Key[]; halfChecked: Key[] }>(
    permissions?.map((item) => `${item.id}${item.name}`) ?? [],
  );
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const { items: permission } = useQueryList('/permissions');
  const transformToTreeData = (
    data: Permissions.Entity[],
  ): { treeData: Common.TreeNode[]; nonLeafKeys: string[] } => {
    // 以key为索引的对象，用于查找和添加子节点
    let map: { [key: string]: Common.TreeNode } = {};
    let nonLeafKeys: string[] = [];

    // 首先将所有节点转换为正确的格式，并添加到map中
    for (let item of data) {
      let key = `${item.permissionGroup.id}${item.permissionGroup.name}`;
      let node = map[key];
      // 如果map中已经存在这个节点，就使用它，否则创建一个新的节点
      if (!node) {
        node = {
          key: key,
          title: item.permissionGroup.name,
          children: [],
        };
        map[key] = node;
      }

      // 添加子节点
      let childKey = `${item.id}${item.name}`;
      let childNode = {
        key: childKey,
        title: item.name,
      };
      node.children?.push(childNode);
      if (node.children && node.children?.length > 0 && !nonLeafKeys.includes(key)) {
        nonLeafKeys.push(key); // 如果节点有子节点，并且它的key不在nonLeafKeys中，将它的key添加到nonLeafKeys中
      }

      // 如果存在父节点，将当前节点添加到父节点的children中
      if (item.permissionGroup.parent) {
        let parentKey = `${item.permissionGroup.parent.id}${item.permissionGroup.parent.name}`;
        let parentNode = map[parentKey];
        if (!parentNode) {
          parentNode = {
            key: parentKey,
            title: item.permissionGroup.parent.name,
            children: [],
          };
          map[parentKey] = parentNode;
        }
        // 如果父节点的children数组中还没有这个节点，就添加进去
        if (!parentNode.children?.includes(node)) {
          parentNode.children?.push(node);
          if (
            parentNode.children &&
            parentNode.children.length > 0 &&
            !nonLeafKeys.includes(parentKey)
          ) {
            nonLeafKeys.push(parentKey); // 同样，如果父节点有子节点，并且它的key不在nonLeafKeys中，将它的key添加到nonLeafKeys中
          }
        }
      }
    }

    // 只将map中那些没有父节点的值添加到treeData
    let treeData = Object.values(map).filter(
      (node) =>
        !data.some(
          (item) =>
            item.permissionGroup.id + item.permissionGroup.name === node.key &&
            item.permissionGroup.parent,
        ),
    );
    return {
      treeData,
      nonLeafKeys,
    };
  };
  const { treeData, nonLeafKeys } = transformToTreeData(permission);

  const onExpand = (expandedKeysValue: Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
    let nonLeafKeysSet = new Set(nonLeafKeys.map((key) => key.toString()));
    setCheckedKeys(checkedKeysValue);
    let checkData;
    if (Array.isArray(checkedKeysValue)) {
      checkData = checkedKeysValue.filter((item) => !nonLeafKeysSet.has(item.toString()));
    }
    const permissions = (checkData as Key[]).map((item) => Number(parseInt(item.toString())));
    form?.setFieldsValue({
      permissions,
    });
  };

  const onSelect = (selectedKeysValue: Key[]) => {
    setSelectedKeys(selectedKeysValue);
  };
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
        <Form.Item name="permissions">
          <div>
            选择权限
            <Tree
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={treeData}
            />
          </div>
        </Form.Item>
      </ProForm.Group>
    </>
  );
};

export default BaseForm;
