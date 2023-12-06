import { queryList } from '@/services/ant-design-pro/api';
import { useEffect, useState } from 'react';
const useQueryList = (url: string) => {
  const [items, setItems] = useState([]);
  const query = async () => {
    const response = (await queryList(url, { pageSize: 10000 })) as any;
    if (response.success) {
      setItems(response.data);
    }
  };
  useEffect(() => {
    query().catch(console.error);
  }, []);
  return { items, setItems };
};

export default useQueryList;
