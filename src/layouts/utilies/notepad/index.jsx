import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

const Notepad = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = () => {
    if (note.trim() === '') return;
    const newNote = { text: note, date: new Date().toLocaleString() };

    if (editingIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = newNote;
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, newNote]);
    }
    setNote('');
  };

  const handleEdit = (index) => {
    setNote(notes[index].text);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4, gap: 4, background: '#f3f3f3', minHeight: '100vh' }}>
        <Paper elevation={10} sx={{ padding: 4, width: { xs: '100%', sm: '100%' }, borderRadius: '16px', background: '#ffffff', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)', position: 'sticky', top: "5rem", zIndex: 1 }}>
          <motion.div whileHover={{ scale: 1.05 }} />
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#004d40' }}>Modern Notepad</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Write your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleSave} sx={{ background: '#004d40', '&:hover': { background: '#00251a' } }}>
            {editingIndex !== null ? 'Update Note' : 'Save Note'}
          </Button>
        </Paper>
        <Grid container spacing={2} sx={{ width: '100%', maxWidth: '800px' }}>
          {notes.map((note, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Paper elevation={6} sx={{ padding: 2, borderRadius: '12px', background: '#ffffff', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', position: 'relative' }}>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>{note.text}</Typography>
                  <Typography variant="caption" sx={{ color: '#999', display: 'block', marginBottom: 2 }}>{note.date}</Typography>
                  <Button size="small" onClick={() => handleEdit(index)} sx={{ marginRight: 1, background: '#004d40', color: '#fff', '&:hover': { background: '#00251a', color: '#fff' } }}>Edit</Button>
                  <Button size="small" onClick={() => handleDelete(index)} sx={{ background: '#d32f2f', color: '#fff', '&:hover': { background: '#b71c1c' } }}>Delete</Button>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Notepad;
