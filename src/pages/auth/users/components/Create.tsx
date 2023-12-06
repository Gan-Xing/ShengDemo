import { ModalForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
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
  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.searchTable.createForm.newUser',
        defaultMessage: '新建用户',
      })}
      width="70%"
      open={open}
      onOpenChange={onOpenChange}
      onFinish={onFinish}
    >
      <BaseForm newRecord />
    </ModalForm>
  );
};

export default Create;
