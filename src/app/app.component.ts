import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private httpClient: HttpClient){}

  form?: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      accessToken: new FormControl('', Validators.required),
      identifier: new FormControl('', Validators.required),
      amount: new FormControl('',Validators.required),
    });
    this.generateData();
  }
  title = 'captivlink-demo-client';

  generateData(){
    var orderNumber = makeid(10);
    var amount = (Math.random() * 150).toFixed(2);
    this.form?.controls["identifier"].setValue(orderNumber);
    this.form?.controls["amount"].setValue(amount);
  }

  submit(){
    this.form?.markAllAsTouched()

    if(this.form?.invalid){
      return;
    }
    var request = this.form?.getRawValue();
    request.accessToken = null;
    this.httpClient.post("https://e.captivlink.com/purchase", request, {headers: {"x-access-token": this.form?.controls["accessToken"].value}, withCredentials: true} ).subscribe(res=>{

    })
  }
}

function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

