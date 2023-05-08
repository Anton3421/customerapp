import * as React from "react";
import Button from "@mui/material/Button";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'

export default function Customerlist() {
  const [customers, setCustomers] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const fetchCustomers = () => {
    fetch("http://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((responseData) => setCustomers(responseData.content))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = (customer) => {
    fetch("https://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          fetchCustomers();

        }
      });
  };

  const updateCustomer = (updateCustomer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateCustomer),
    }).then((response) => {
      if (response.ok) {
        setMsg("Customer edit succesfully");
        setOpen(true);
        fetchCustomers();
      } else {
        alert("Something went wrong when editing the customer");
      }
    });
  };

  const deleteCustomer = (link) => {
    if (window.confirm("Are u sure??")) {
      fetch(link, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Customer deleted");
            setOpen(true);
            fetchCustomers();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.log("err"));
    }
  };

  const columns = [
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      headerName: "",
      width: 200,
      cellRenderer: (params) => (
        <EditCustomer updateCustomer={updateCustomer} params={params} />
      ),
    },
    {
      headerName: "",
      width: 200,
      cellRenderer: (params) => (
        <Button
          color="error"
          variant='outlined'
          onClick={() => deleteCustomer(params.data.links[0].href)}
        > DELETE
        </Button>
      )
    }
  ];


  return (
    <div>
      <AddCustomer addCustomer={addCustomer} />
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