import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Button, TextField, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';

const ModalContainer = styled(motion.div)(({ theme }) => ({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
  width: '90%',
  maxWidth: 500,
  background: 'linear-gradient(135deg,rgb(190, 253, 219),rgb(62, 89, 95))',
  padding: '40px',
  borderRadius: '16px',
  boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.4)',
  textAlign: 'center',
  color: '#fff'
}));

const SaveButton = styled(Button)(({ theme }) => ({
  marginRight: '10px',
  padding: '12px 24px',
  borderRadius: '12px',
  textTransform: 'uppercase',
  background: '#1976d2',
  color: '#fff',
  '&:hover': {
    background: '#1565c0'
  }
}));

const CalenderSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState('');
  const [events, setEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);

  // useEffect(() => {
  //   fetchHolidays();
  // }, []);

  // const fetchHolidays = async () => {
  //   try {
  //     const response = await axios.get('https://date.nager.at/api/v3/PublicHolidays/2025/IN');
  //     // const holidayDates = response.data.map((holiday) => holiday.date);
  //     console.log('Holidays:', response.data);
  //     setHolidays(holidayDates);
  //   } catch (error) {
  //     console.error('Error fetching holidays:', error);
  //   }
  // };

  const handleDateClick = (info) => {
    const today = new Date().toISOString().split('T')[0];
    if (info.dateStr >= today) {
      setSelectedDate(info.dateStr);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNote('');
  };

  const handleSave = () => {
    if (note.trim() !== '') {
      setEvents([...events, { title: note, start: selectedDate, allDay: true, color: '#1976d2' }]);
    }
    handleClose();
  };

  const renderDayCell = (info) => {
    const day = new Date(info.date).getDay();
    const today = new Date().toISOString().split('T')[0];
    if (day === 0) {
      info.el.style.color = 'red';
    }
    if (holidays.includes(info.dateStr)) {
      info.el.style.backgroundColor = '#ffcccc';
      info.el.style.color = 'red';
    }
    if (info.dateStr < today) {
      info.el.style.backgroundColor = '#f5f5f5';
      info.el.style.pointerEvents = 'none';
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ padding: '20px', background: '#eef2f3', minHeight: '100vh', borderRadius: '12px' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#333', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Calendar Notes
        </Typography>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
          height="auto"
          dayCellDidMount={renderDayCell}
          eventBackgroundColor="#1976d2"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
          contentHeight="auto"
          aspectRatio={1.35}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <ModalContainer initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h5" gutterBottom>
            Add Note for {selectedDate}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Note"
            variant="outlined"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{ marginBottom: '20px', background: '#fff', borderRadius: '8px' }}
          />
          <MDBox sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <MDButton variant="outlined" color="black" onClick={handleClose}>
              Cancel
            </MDButton>
            <MDButton variant="contained" color="primary" onClick={handleSave}>
              Submit
            </MDButton>
          </MDBox>
        </ModalContainer>
      </Modal>
    </DashboardLayout>
  );
};

export default CalenderSection;
