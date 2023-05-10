import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DialogTitle } from '@mui/material';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import dayjs from "dayjs";



export default function AddTraining({ addTraining, data }) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(dayjs());

    const [training, setTraining] = React.useState({
        duration: 0,
        activity: '',
        customer: {
            ...data.customer
        }
    });



    const handleClickOpen = () => {
        setOpen(true);
    };

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    const saveTraining = () => {
        const dateString = date.format("DD-MM-YYYY HH-mm")

        addTraining(training);
        setTraining({...training, dateString: ''})
        setTraining({...training, duration: ''})
        setTraining({...training, activity: ''})
        setTraining({...training, customer: ''})
        
    }
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false)
        }
    };

    const handleDateChange = (event) => {
        setDate(dayjs(event.target.value));
    }

    return (
        <div>
            <Button onClick={handleClickOpen} variant="outlined">
                Add training
            </Button>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus={true}
                        name="date"
                        type="date"
                        value={date.format("DD-MM-YYYY HH-mm")}
                        onChange={handleDateChange}
                        margin="dense"
                        label="Date"
                        fullWidth={true}
                        variant="standard"
                    />
                    <TextField
                        autoFocus={true}
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="Duration"
                        fullWidth={true}
                        variant="standard"
                    />
                    <TextField
                        autoFocus={true}
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label="Activity"
                        fullWidth={true}
                        variant="standard"
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={saveTraining}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}