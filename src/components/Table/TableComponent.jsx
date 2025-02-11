import React,{ useEffect } from 'react'

//Mterial ui
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

function TableComponent({ columns,rows }) {

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows.data}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  )
}

export default TableComponent