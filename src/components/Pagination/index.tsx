import React from 'react';
import { Pagination } from 'antd';

const customPagination = ({
  defaultCurrent,
  total,
  defaultPageSize,
  onChange,
}: {
  defaultCurrent: number;
  total: number;
  defaultPageSize: number;
  onChange: (page: number, pageSize: number) => Promise<void>;
}) => {
  return (
    <div
      className={`[&>ul>li>button]:!text-red [&>ul>li>a>div]:!text-red border-orange-600 [&>ul>li>button]:!flex [&>ul>li>button]:!h-full [&>ul>li>button]:!w-full [&>ul>li>button]:!items-center [&>ul>li>button]:!justify-center [&>ul>li>a>div]:!flex [&>ul>li>a>div]:!h-full [&>ul>li>a>div]:!w-full [&>ul>li>a>div]:!items-center [&>ul>li>a>div]:!justify-center [&>ul>.ant-pagination-item-active]:!border-orange-500 hover:[&>ul>.ant-pagination-item-active]:!invisible [&>ul>.ant-pagination-item-active>a]:!text-orange-500 hover:[&>ul>.ant-pagination-item-active>a]:!text-orange-600 [&>ul>li>a>div>span.anticon]:!text-orange-500 dark:[&_*]:!text-white`}
    >
      <Pagination
        defaultCurrent={defaultCurrent}
        total={total}
        defaultPageSize={defaultPageSize}
        onChange={onChange}
        hideOnSinglePage={true}
        showSizeChanger={false}
      />
    </div>
  );
};

export default customPagination;
