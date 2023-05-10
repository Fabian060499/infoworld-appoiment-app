import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<{response:Appointment[]}>(this.apiUrl).pipe(
        map(res => {
          res.response = res.response.map((app) => {
            app.appointmentTime = new Date(app.appointmentTime)
            return app;
          })
          return res.response;
        })
    );
  }

  updateAppointment(appointment: Appointment): Observable<any> {
    const url = `${this.apiUrl}/${appointment.id}`;
    return this.http.put(url, appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}