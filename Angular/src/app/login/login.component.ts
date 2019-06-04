import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {first} from 'rxjs/operators';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private return: string;

  constructor(public formBuilder: FormBuilder, public authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    // Form creation
    this.loginForm = this.formBuilder.group({
      emailAddress: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    AuthenticationService.logout();
    this.route.queryParams.subscribe(params => this.return = params['return'] || '/students');
  }

  public logIn() {
    const formControls = this.loginForm.controls;
    this.authenticationService.login(formControls.emailAddress.value, formControls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.return]);
        },
        error => {
          this.loginForm.reset();
          document.getElementById('errorMessage').innerHTML
            = 'Le nom d’utilisateur entré n’appartient à aucun compte. Veuillez le vérifier et réessayer.';
        }
      );
      // .then(success => {
      //   this.router.navigateByUrl(this.return);
      //   document.getElementById('errorMessage').innerHTML = '';
      // })
      // .catch(err => {
      //   this.loginForm.reset();
      //   document.getElementById('errorMessage').innerHTML =
    //   'Le nom d’utilisateur entré n’appartient à aucun compte. Veuillez le vérifier et réessayer.';
      // });
  }
}
