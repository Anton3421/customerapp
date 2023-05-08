import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";


export default function Traininglist() {
  const [trainings, setTrainings] = React.useState([]);


  const fetchTrainings = () => {
    fetch("http://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((responseData) => setTrainings(responseData))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    fetchTrainings();
  }, []);


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