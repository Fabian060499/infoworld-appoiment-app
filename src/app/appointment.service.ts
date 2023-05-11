import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'https://localhost:7104/api/Appointment';

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl).pipe(
        map(res => {
          res = res.map((app) => {
            app.appointmentTime = new Date(app.appointmentTime)
            return app;
          })
          return res;
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

  addAppointment(appointment: Appointment): Observable<any> {
    return this.http.post(this.apiUrl, appointment);
  }
}