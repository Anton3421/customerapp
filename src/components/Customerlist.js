import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


export default function Customerlist() {
  const [customers, setCustomers] = React.useState([]);
 

  const fetchCustomers = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((responseData) => setCustomers(responseData.links.customers))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    fetchCustomers();
  }, []);


  const columns = [
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
  ];


  return (
    <div>
     
      <div className="ag-theme-material" style={{ height: 600, width: "90" }}>
        <AgGridReact
          columnDefs={columns}
          rowData={customers}
          pagination={true}
        />
      </div>
    </div>
  );
}