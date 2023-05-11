import { Component } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment';
import { take } from 'rxjs';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { BtnCellRenderer } from './btn-cell.render';

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public appArray: Appointment[] = [];
  public selectedAppointment: Appointment | null = null;
  public isModalOpen = false;
  public newAppointment: Appointment = {
    id: 0,
    patientName: '',
    age: 0,
    phoneNumber: '',
    status: 'Scheduled',
    priority: 'Low',
    appointmentTime: new Date()
  };

  public columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'patientName', rowDrag: true },
    { field: 'age' },
    { field: 'phoneNumber', width: 100 },
    { field: 'status' },
    { field: 'priority' },
    { field: 'appointmentTime' },
    {
      field: 'delete',
      cellRenderer: BtnCellRenderer,
      cellRendererParams: {
        clicked:  (appointment: Appointment) => {
          console.log(appointment);
         this.deleteAppointment(appointment);
        },
      },
      minWidth: 150,
    },
  ];
  public rowData!: Appointment[];
  // public columnDefs: ColDef[] = [
  //   { field: 'athlete', rowDrag: true },
  //   { field: 'country' },
  //   { field: 'year', width: 100 },
  //   { field: 'date' },
  //   { field: 'sport' },
  //   { field: 'gold' },
  //   { field: 'silver' },
  //   { field: 'bronze' },
  // ];
  public defaultColDef: ColDef = {
    width: 170,
    sortable: true,
    filter: true,
  };
  // public rowData!: IOlympicData[];

  constructor(private appointmentService: AppointmentService,private http: HttpClient) {
    this.getAppointments();
  }

  getAppointments(){
    this.appointmentService.getAppointments().pipe(take(1)).subscribe({
      next: (response) => {
        console.log(response);
        this.appArray = response;
        this.rowData = response;
        console.warn(this.rowData);
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

  addAppointment() {
    this.appointmentService.addAppointment(this.newAppointment).subscribe({
      next: (response) => {
        console.log(response);
        this.appArray.push(response);
        this.isModalOpen = false;
        this.getAppointments();
      },
      error: (err) => {
        console.warn(err)
      }
    });
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentService.deleteAppointment(appointment.id).subscribe({
      next: () => {
        this.getAppointments();
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
  
    onGridReady(params: GridReadyEvent<Appointment>) {
      this.getAppointments();
    }
    // onGridReady(params: GridReadyEvent<IOlympicData>) {
    //   this.http
    //     .get<IOlympicData[]>(
    //       'https://www.ag-grid.com/example-assets/olympic-winners.json'
    //     )
    //     .subscribe((data) => (this.rowData = data));
    // }
}

