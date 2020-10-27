import { Repository, EntityRepository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointmentInSameDate = await this.findOne({
      where: { date },
    });

    return findAppointmentInSameDate || null;
  }
}

export default AppointmentsRepository;
