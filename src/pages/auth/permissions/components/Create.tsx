import { ModalForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Form } from 'antd';
import React from 'react';
import BaseForm from './BaseForm';
interface Props {
  open: boolean;
  onOpenChange: (visible: boolean) => void;
  onFinish: (formData: any) => Promise<void>;
}
const Create: React.FC<Props> = (props) => {
  const { open, onOpenChange, onFinish } = props;
  const intl = useIntl();
  const [form] = Form.useForm();

  return (
    <ModalForm
      form={form}
      title={intl.formatMessage({
        id: 'pages.searchTable.createForm.newPermission',
        defaultMessage: '新建权限',
      })}
      width="380px"
      open={open}
      onOpenChange={onOpenChange}
      onFinish={onFinish}
    >
      <BaseForm />
    </ModalForm>
  );
};

export default Create;
