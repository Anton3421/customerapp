import * as React from "react";
import Button from "@mui/material/Button";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddTraining from './AddTraining';
import dayjs from "dayjs";


export default function Traininglist() {
  const [trainings, setTrainings] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const fetchTrainings = () => {
    fetch("http://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((responseData) => setTrainings(responseData))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    fetchTrainings();
  }, []);

  const deleteTraining = (id) => {
    if (window.confirm("Are u sure??")) {
      fetch("http://traineeapp.azurewebsites.net/api/trainings" + '/' + id, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Training deleted");
            setOpen(true);
            fetchTrainings();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.log("err"));
    }
  };


  const columns = [

    {
      field: "date", sortable: true, filter: true,
      cellRenderer: (trainings) => {
        return dayjs(trainings.value).format("DD-MM-YYYY HH:mm")
      }
    },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },

    { headerName: "Firstname", field: "customer.firstname", sortable: true, filter: true },
    { headerName: "Lastname", field: "customer.lastname", sortable: true, filter: true },
    {
      headerName: "",
      field: 'id',
      width: 200,
      cellRenderer: (params) => (
        <Button
          color="error"
          variant='outlined'
          onClick={() => deleteTraining(params.value)}
        > DELETE
        </Button>
      )
    }

  ];


  return (
    <div>
      
      <div className="ag-theme-material" style={{ height: 600, width: "90" }}>
        <AgGridReact
          columnDefs={columns}
          rowData={trainings}
          pagination={true}
        />
      </div>
    </div>
  );
}