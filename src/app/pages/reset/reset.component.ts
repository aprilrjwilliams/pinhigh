import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from "../../shared/auth-service";
import { RouterOutlet, RouterModule, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reset",
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: "./reset.component.html",
  styleUrl: "./reset.component.css",
})
export class ResetComponent implements OnInit {
  public token: string | null = "";
  resetForm: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get("token");
    console.log("this.token", this.token);
    const newToken = this.token?.replace(/,/g, ".");
    console.log("newToken ", newToken);

    this.resetForm = new FormGroup({
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(): void {

    console.log('in onsubmit ', this.resetForm)
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    }
    this.authService.resetPassword(resetObj);
  }
}
