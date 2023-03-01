import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { chapterType } from '~/common/types';
import { diffDate, formatView } from '~/common/helpers/formatData';

const columns: ColumnsType<chapterType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (value) => <p className="font-bold">{value}</p>,
  },
  {
    title: 'Update',
    dataIndex: 'updateDate',
    key: 'updateDate',
    render: (value) => <p>{diffDate(value, Date.now())}</p>,
  },
  {
    title: 'Views',
    dataIndex: 'views',
    key: 'views',
    render: (value) => <p>{formatView(value, true)}</p>,
  },
];

const ColumnTable: React.FC<{ data: chapterType[] }> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="small"
      tableLayout="fixed"
      scroll={{ y: 800 }}
      rowKey="_id"
      className="[&_.ant-table]:!bg-transparent [&_.ant-table-thead>tr>th]:!bg-transparent dark:[&_*]:!text-white"
      onRow={(chapter) => {
        return {
          onClick: () => {
            navigate(`/${chapter.hashName}`);
          },
        };
      }}
      onHeaderRow={() => {
        return {
          onClick: () => {},
        };
      }}
    />
  );
};

export default ColumnTable;
