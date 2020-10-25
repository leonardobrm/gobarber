import { isEqual } from 'date-fns';
import Appointment from '../model/Appointment';

// DTO => Data Transfer Object
interface CreateApoointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  findByDate(date: Date): Appointment | null {
    const findAppointmentInSameDate = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointmentInSameDate || null;
  }

  all(): Appointment[] {
    return this.appointments;
  }

  create({ provider, date }: CreateApoointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
