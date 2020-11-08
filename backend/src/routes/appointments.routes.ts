import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticate from '../middleware/ensureAuthenticate';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parseDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parseDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
