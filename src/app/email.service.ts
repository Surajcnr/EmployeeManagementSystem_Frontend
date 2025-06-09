import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailApiUrl = 'http://localhost:8085/email/sendMail';

  constructor(private http: HttpClient) {}

  sendEmail(recipient: string, msgBody: string, subject: string): Observable<any> {
    const emailPayload = {
      recipient,
      msgBody,
      subject
    };

    console.log('Email Payload:', emailPayload); // Debugging

    return this.http.post(this.emailApiUrl, emailPayload, {
      headers: { 'Content-Type': 'application/json' }, // Ensure no Authorization header is sent
      responseType: 'text' // Specify response type as text
    });
  }
}
