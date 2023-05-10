import { Component } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public appArray: Appointment[] = [];
  public selectedAppointment: Appointment | null = null;
<<<<<<< HEAD
  public isModalOpen = false;
  public newAppointment: Appointment = {
    id: 20,
    patientName: '',
    age: 0,
    phoneNumber: '',
    status: 'Scheduled',
    priority: 'Low',
    appointmentTime: new Date()
  };

=======
  
>>>>>>> main
  constructor(private appointmentService: AppointmentService) {
    this.appointmentService.getAppointments().subscribe({
      next: (response) => {
        console.log(response);
        this.appArray = response;
      },
      error: (err) => {
        console.warn(err)
      }
    });
  }

  // Function to handle the slot selection
  selectSlot(appointment: Appointment) {
    // Only allow selection of scheduled appointments
    if (appointment.status === 'Scheduled') {
      this.selectedAppointment = appointment;
    }
  }
  //Function to cancel appointment
  cancelAppointment(appointment: Appointment) {
    appointment.status = "Cancelled";
  }
  // Function to handle the appointment move
  /**
   * This function allows the user to move a scheduled appointment to a different time by swapping the
   * appointment times with another scheduled appointment.
   * @param {Appointment} targetAppointment - Appointment object representing the appointment that the
   * selected appointment will be swapped with.
   */
  moveAppointment(targetAppointment: Appointment) {
    // targetAppointment.appointmentTime=new Date(targetAppointment.appointmentTime);
    // Only allow move of scheduled appointments
    if (this.selectedAppointment && this.selectedAppointment.status === 'Scheduled') {
      // Swap the appointments
      const tempTime = this.selectedAppointment.appointmentTime;
      this.selectedAppointment.appointmentTime = targetAppointment.appointmentTime;
      targetAppointment.appointmentTime = tempTime;
      
      // Clear the selected appointment
      this.selectedAppointment = null;
      
      // Sort the appointments by time
      this.appArray.sort((a, b) => a.appointmentTime.getTime() - b.appointmentTime.getTime());
    }
  }
<<<<<<< HEAD

  addAppointment() {
    this.appointmentService.addAppointment(this.newAppointment).subscribe({
      next: (response) => {
        console.log(response);
        this.appArray.push(response);
        this.isModalOpen = false;
      },
      error: (err) => {
        console.warn(err)
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
=======
>>>>>>> main
}

