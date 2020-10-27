import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { pick } from 'lodash';

import { getList, create, update, remove } from 'services/products';

const ProductTableView = () => {
  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Company', field: 'company' },
    { title: 'Status', field: 'status' }
  ];

  useEffect(() => {
    getList();
  }, []);

  const fetchList = query => {
    return getList({
      ...query,
      page: query.page + 1,
      perPage: query.pageSize
    }).then(res => {
      const { current_page, total } = res.pagination;
      return {
        data: res.data,
        page: current_page - 1,
        totalCount: total
      };
    });
  };

  const onRowAdd = newData => create(newData);

  const onRowUpdate = (newData, oldData) => {
    return update(oldData._id, pick(newData, ['name', 'company', 'status']));
  };

  const onRowDelete = oldData => remove(oldData._id);

  return (
    <MaterialTable
      title="Product List"
      columns={columns}
      data={query => fetchList(query)}
      editable={{
        onRowAdd,
        onRowUpdate,
        onRowDelete
      }}
      options={{
        actionsColumnIndex: 3,
        addRowPosition: 'first'
      }}
    />
  );
};

export default ProductTableView;
