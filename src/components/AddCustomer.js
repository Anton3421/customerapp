import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import { DialogTitle } from '@mui/material'
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';



export default function AddCustomer({ addCustomer }) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const saveCustomer = () => {
        addCustomer(customer);
        setCustomer({...customer, firstname: ''})
        setCustomer({...customer, lastname: ''})
        setCustomer({...customer, streetaddress: ''})
        setCustomer({...customer, postcode: ''})
        setCustomer({...customer, city: ''})
        setCustomer({...customer, email: ''})
        setCustomer({...customer, phone: ''})
        setOpen(false)
    }
    const handleClose = (event, reason) => {
        if(reason !== 'backdropClick'){
        setOpen(false)
        }
    };

    return (
        <div>
            <Button onClick={handleClickOpen} variant="outlined">
                Add customer
            </Button>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Add Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus={true}
                        name="firstname"
                        value={customer.firstname}
                        onChange={inputChanged}
                        margin="dense"
                        label="Firstname"
                        fullWidth={true}
                        variant="standard"
                    />
                    <TextField
                        autoFocus={true}
                        name="lastname"
                        value={customer.lastname}
                        onChange={inputChanged}
                        margin="dense"
                        label="Lastname"
                        fullWidth={true}
                        variant="standard"
                    />
                    <TextField
                        autoFocus={true}
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        margin="dense"
                        label="Streetaddress"
                        fullWidth={true}
                        variant="standard"
                    />
                    <TextField
                        autoFocus={true}
                        name="postcode"
                        value={customer.postcode}
                        onChange={inputChanged}
                        margin="dense"
                        label="Postcode"
                        fullWidth={true}
                        variant="standard"
                    />
                    <TextField
                        autoFocus={true}
                        name="city"
                        value={customer.city}
                        onChange={inputChanged}
                        margin="dense"
                        label="City"
                        fullWidth={true}
                        variant="standard"
                    />
                    <TextField
                        autoFocus={true}
                        name="email"
                        value={customer.email}
                        onChange={inputChanged}
                        margin="dense"
                        label="Email"
                        fullWidth={true}
                        variant="standard"
                    />
                     <TextField
                        autoFocus={true}
                        name="phone"
                        value={customer.phone}
                        onChange={inputChanged}
                        margin="dense"
                        label="Phone"
                        fullWidth={true}
                        variant="standard"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={saveCustomer}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}