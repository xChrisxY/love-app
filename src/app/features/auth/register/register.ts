import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  error = signal('');

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]], 
    email: ['', [Validators.required, Validators.minLength(5)]]
  });

  onSubmit(){
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value as any).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        console.log(err)
        this.error.set('Hubo un error en el registro, intentalo de nuevo.')
      }
    })
  }

}
