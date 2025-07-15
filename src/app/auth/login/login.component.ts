import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrected from styleUrl to styleUrls
})
export class LoginComponent {
  isRegistering = false;
  loading: boolean = false;

  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.loading = true;

    // Sanitize and validate inputs
    const sanitizedEmail = this.sanitizeInput(this.email);
    const sanitizedPassword = this.sanitizeInput(this.password);

    if (!this.validateInputs(sanitizedEmail, sanitizedPassword)) {
      this.message = 'Invalid email or password format.';
      this.loading = false;
      return;
    }

    const LoginForm = {
      email: sanitizedEmail,
      password: sanitizedPassword,
    };

    this.http
      .post<any>(
        `${environment.baseUrl}/auth/login`, // Use baseUrl from environment
        LoginForm
      )
      .subscribe(
        (response) => {
          const token = response['token'];
          const role = response['role'];

          if (role !== 'ADMIN') {
            this.message = 'Access denied. Admins only.';
            this.loading = false;
            console.error('Access denied for role:', role);
            return;
          }

          // Store token and redirect to dashboard
          localStorage.setItem('token', token);
          window.location.href = '/dashboard';

          this.loading = false;
        },
        (error) => {
          this.message = 'Invalid credentials. Please try again.';
          this.loading = false;
          console.error('Login error:', error); // Log error for debugging
        }
      );
  }

  // Sanitize input to prevent XSS or other injections
  private sanitizeInput(input: string): string {
    return input.trim(); // Basic sanitization, can be extended as needed
  }

  // Validate inputs for proper format
  private validateInputs(email: string, password: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern
    return emailPattern.test(email) && password.length >= 6; // Check password length
  }
}
