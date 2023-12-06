import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '非线数联技术部出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '非线数联 Pro',
          title: '非线数联 Pro',
          href: 'http://www.fline88.com',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'http://www.fline88.com/',
          blankTarget: true,
        },
        {
          key: '非线数联',
          title: '非线数联',
          href: 'http://www.fline88.com/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
