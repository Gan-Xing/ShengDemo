import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { Drawer } from 'antd';
interface Props {
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
  open: boolean;
  currentRow: User.UsersEntity;
  columns: ProDescriptionsItemProps<User.UsersEntity>[];
}
const Show: React.FC<Props> = (props) => {
  const { onClose, open, currentRow, columns } = props;
  return (
    <Drawer width="70%" open={open} onClose={onClose} closable={false}>
      {currentRow?.username && (
        <ProDescriptions<User.UsersEntity>
          column={2}
          title={currentRow?.username}
          request={async () => ({
            data: currentRow || {},
          })}
          params={{
            id: currentRow?.username,
          }}
          columns={columns as ProDescriptionsItemProps<User.UsersEntity>[]}
        />
      )}
    </Drawer>
  );
};

export default Show;
