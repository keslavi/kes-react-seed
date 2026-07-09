import { useEffect } from "react";
import { isEmpty } from "lodash";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Col, Row } from "components";
import { store } from "@/store";

const optionText = (option, key) => {
  const found = option.find((x) => x.key == key);
  return found ? found.text : key;
};

export const Tasks = () => {
  const option = store.use.option();
  const taskList = store.use.taskList();
  const items = store.use.tasks();

  useEffect(() => {
    taskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isEmpty(items) || isEmpty(option)) return <>Loading...</>;

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      renderCell: ({ value }) => <NavLink to={`/dev/tasks/${value}`}>{value}</NavLink>,
    },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "body", headerName: "Body", flex: 2 },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      valueGetter: (value) => optionText(option.task.status, value),
    },
    {
      field: "result",
      headerName: "Result",
      width: 140,
      valueGetter: (value) => optionText(option.task.result, value),
    },
    {
      field: "userAssigned",
      headerName: "Assigned To",
      width: 160,
      valueGetter: (value) => value || "Unassigned",
    },
  ];

  return (
    <Row>
      <Col size={12}>
        <h4>Tasks</h4>
        <DataGrid
          rows={items}
          columns={columns}
          autoHeight
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </Col>
    </Row>
  );
};
export default Tasks;
