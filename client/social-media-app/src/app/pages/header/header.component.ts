import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService ,private router: Router) {
  }

  ngOnInit() {
    // // Initialize the logged-in user
  }

  goToFeed() {
    this.router.navigate(['/home']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  logout() {
    // Implement your logout logic here (e.g., clearing session, removing tokens, etc.)
    this.auth.logout();

    this.router.navigate(['/login']);
  }
}