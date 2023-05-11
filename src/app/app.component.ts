import { Component } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment';
import { take } from 'rxjs';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { BtnCellDeleteRenderer } from './btn-renders/btn-cell-delete.render';
import { BtnCellCancelRenderer } from './btn-renders/btn-cell-cancel.render';

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
    { field: 'id', rowDrag: true, width: 80 },
    { field: 'patientName'},
    { field: 'age', width: 80 },
    { field: 'phoneNumber', width: 150 },
    { field: 'status' },
    { field: 'priority' },
    { field: 'appointmentTime' },
    {
      field: 'delete',
      cellRenderer: BtnCellDeleteRenderer,
      cellRendererParams: {
        clicked:  (appointment: Appointment) => {
         this.deleteAppointment(appointment);
        },
      },
      minWidth: 50,
    },
    {
      field: 'cancel',
      cellRenderer: BtnCellCancelRenderer,
      cellRendererParams: {
        clicked:  (appointment: Appointment) => {
         this.cancelAppointment(appointment);
        },
      },
      minWidth: 50,
    },
  ];
  public rowData!: Appointment[];
  public defaultColDef: ColDef = {
    width: 170,
    sortable: true,
    filter: true,
  };

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

  //Function to cancel appointment
  cancelAppointment(appointment: Appointment) {
    appointment.status = "Cancelled";
    this.appointmentService.updateAppointment(appointment).subscribe({
      next: () => {

        this.getAppointments();
      },
      error: (err) => {
        console.warn(err)
      }
    });
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

