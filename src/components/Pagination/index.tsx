import React from 'react';
import { Pagination } from 'antd';

const customPagination = ({
  defaultCurrent,
  total,
  defaultPageSize,
  onChange,
  colorActive,
  colorHover,
}: {
  defaultCurrent: number;
  total: number;
  defaultPageSize: number;
  onChange: (page: number, pageSize: number) => Promise<void>;
  colorActive: string;
  colorHover: string;
}) => {
  console.log({ defaultCurrent, total, defaultPageSize });
  return (
    <div
      className={`[&>ul>li>button]:!text-red [&>ul>li>a>div]:!text-red [&>ul>li>button]:!flex [&>ul>li>button]:!h-full [&>ul>li>button]:!w-full [&>ul>li>button]:!items-center [&>ul>li>button]:!justify-center [&>ul>li>a>div]:!flex [&>ul>li>a>div]:!h-full [&>ul>li>a>div]:!w-full [&>ul>li>a>div]:!items-center [&>ul>li>a>div]:!justify-center [&>ul>.ant-pagination-item-active]:border-${colorActive} hover:[&>ul>.ant-pagination-item-active]:border-${colorHover} [&>ul>.ant-pagination-item-active>a]:text-${colorActive} hover:[&>ul>.ant-pagination-item-active>a]:text-${colorHover} [&>ul>li>a>div>span.anticon]:!text-${colorActive}`}
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
