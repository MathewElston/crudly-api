export default function ProjectTable() {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection={false}
        sx={{ border: 1 }}
      />
    </Paper>
  );
}
