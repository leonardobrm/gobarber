import { Router } from 'express';

import { startOfHour, parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRepository = new AppointmentRepository();

const appointmentsRouter = Router();

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();
  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointment = appointmentsRepository.findByDate(parsedDate);

  if (findAppointment)
    return res
      .status(400)
      .json({ message: 'This appointment is already booked' });

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return res.json(appointment);
});

export default appointmentsRouter;
