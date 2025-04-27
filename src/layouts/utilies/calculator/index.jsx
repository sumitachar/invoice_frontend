import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Divider, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const evalResult = eval(input).toFixed(2);
        setResult(evalResult);
        setHistory([...history, `${input} = ${evalResult}`]);
        setInput('');
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else {
      setInput(input + value);
    }
  };

  const buttonValues = ['C', 'GST', '=', '7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '/', '*', '%', '-', '+', 'Int'];

  const calculateGST = () => {
    try {
      const gst = (parseFloat(input) * 0.18).toFixed(2);
      setResult(gst);
      setHistory([...history, `GST (18%) on ${input} = ${gst}`]);
    } catch (error) {
      setResult('Error');
    }
  };

  const calculateInternational = () => {
    try {
      const international = (parseFloat(input) * 1.2).toFixed(2);
      setResult(international);
      setHistory([...history, `International Order (20%) on ${input} = ${international}`]);
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap',  minHeight: '100vh', alignItems: 'center', gap: 2 }}>
      <Paper elevation={10} sx={{ padding: 2, borderRadius: '12px', width: { xs: '100%', sm: '400px' }, background: '#ffffff', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)' }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#004d40', textAlign: 'center', fontWeight: 'bold' }}>
          Business Calculator
        </Typography>
        <TextField
          fullWidth
          value={input}
          variant="outlined"
          InputProps={{ style: { textAlign: 'right', fontSize: '20px', background: '#f1f8e9', borderRadius: '8px' } }}
          disabled
        />
        <Typography variant="h6" sx={{ margin: '12px 0', textAlign: 'right', color: '#004d40' }}>
          Result: {result}
        </Typography>
        <Grid container spacing={1}>
          {buttonValues.map((btn, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color={btn === '=' ? 'success' : 'primary'}
                  onClick={() => btn === 'GST' ? calculateGST() : btn === 'International' ? calculateInternational() : handleButtonClick(btn)}
                  sx={{ padding: '10px', fontSize: '16px', borderRadius: '8px', background: '#004d40', color: '#fff', '&:hover': { background: '#00251a' } }}
                >
                  {btn}
                </Button>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Paper elevation={10} sx={{ width: { xs: '100%', sm: '300px' }, minHeight:"30rem", padding: 2, borderRadius: '12px', background: '#ffffff', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)' }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', color: '#004d40', fontWeight: 'bold' }}>Calculation History</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {history.length > 0 ? history.map((item, index) => (
          <Typography key={index} sx={{ marginBottom: 1, fontSize: '14px', color: '#004d40' }}>{item}</Typography>
        )) : <Typography sx={{ color: '#999', textAlign: 'center' }}>No history available</Typography>}
      </Paper>
    </Box>
    </DashboardLayout>
  );
};

export default Calculator;
