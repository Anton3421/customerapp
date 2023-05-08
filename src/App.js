
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, {useState} from 'react';



function App() {
  const [value, setValue] = useState('one');
  
  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className="App">
       <AppBar position="static">
        <Toolbar>
        <Typography variant="h6">
            Personal Trainer company
          </Typography>
        <Tabs 
            value={value} 
            onChange={handleChange}
            TabIndicatorProps={{ style: { backgroundColor: 'white '}}}>
                 
            
            <Tab
              label="Customers"
              value="one"
              sx={{
                color: 'white',
              }}/>
            <Tab
              label="Trainings"
              value="two"
              sx={{
                 color: 'white',
              }}/>


        </Tabs>
        
        </Toolbar>
        </AppBar>
        {value==='one' && <div><Customerlist/></div>}
        {value==='two' && <div><Traininglist/></div>}
    </div>
  );
}

export default App;
