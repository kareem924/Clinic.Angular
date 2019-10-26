import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { IdentityServerService } from 'src/app/shared/services/auth-service/identity-server.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(public router: Router, private identityService: IdentityServerService, private toastr: ToastrService) {}
    public model: LoginModel = {
        userName: '',
        passWord: '',
        rememberMe: false
    };
    ngOnInit() {}

    onLoggedin() {
        this.identityService.login(this.model).subscribe(
            resp => {
                this.toastr.success('Hello world!', 'Toastr fun!');
                this.router.navigate(['/']);
                console.log(resp);
            },
            (error: any) => {
                this.toastr.error('Hello world!', 'Toastr fun!');
            }
        );
        localStorage.setItem('isLoggedin', 'true');
    }
}
