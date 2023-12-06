import { ModalForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Form, Input } from 'antd';
import React from 'react';
import BaseForm from './BaseForm';

export type UpdateFormProps = {
  onCancel: (visible: boolean) => void;
  onSubmit: (values: User.UpdateUserParams) => Promise<void>;
  updateModalOpen: boolean;
  values: User.UpdateUserParams;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalOpen, onCancel, onSubmit, values } = props;
  const intl = useIntl();
  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.searchTable.createForm.newUser',
        defaultMessage: '新建用户',
      })}
      width="70%"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      open={updateModalOpen}
      onOpenChange={onCancel}
      onFinish={onSubmit}
      initialValues={{
        ...values,
        password: undefined,
        roles: values.roles?.map((role: Roles.Entity) => role.id),
        gender: values.gender?.toString(), // 将gender值从数字转换为字符串
        status: values.status ? values.status?.toString() : '1', // 将gender值从数字转换为字符串
      }}
    >
      <BaseForm />
      <Form.Item name="id" label={false}>
        <Input type="hidden" />
      </Form.Item>
    </ModalForm>
  );
};

export default UpdateForm;
