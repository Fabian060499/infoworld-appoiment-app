export interface Appointment {
    id: number;
    patientName: string;
    age: number;
    phoneNumber: string;
    status: 'Scheduled' | 'Received' | 'Ended' | 'Cancelled';
    priority: 'High' | 'Medium' | 'Low';
    appointmentTime: Date;
  }