import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signout',
  imports: [],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.scss'
})
export class SignoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.signout().subscribe({
      next: () => {
        console.log('Signed out successfully');
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Signout error:', err);
      }
    })
  }
}
