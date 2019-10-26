import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { IdentityServerService } from 'src/app/shared/services/auth-service/identity-server.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(
      public router: Router,
      private identityService: IdentityServerService
    ) {}

    ngOnInit() {}

    onLoggedin() {
        this.identityService.login('demouser@microsoft.com', 'Pass@word1', true).subscribe(resp => {
            console.log(resp);
        });
        localStorage.setItem('isLoggedin', 'true');
    }
}
