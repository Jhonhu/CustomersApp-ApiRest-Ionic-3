import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient }   from '@angular/common/http';

@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage {

  customer:any;
  isEditable: boolean;
  isNew: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient
  ){
    this.isEditable = this.navParams.get('isEditable');
    this.customer = this.navParams.get('customer');
    this.isNew = this.navParams.get('isNew');
  }

  onSave(){
    if(this.isNew){
      // send post method to save
      this.httpClient.post("https://serverdraw2018.herokuapp.com/api/v1/customers", this.customer ).subscribe((data)=>{
        this.navCtrl.pop();
      }, (error)=>{
        console.log(error);
      });
    }else{
      //sent put method to update
      this.httpClient.put("https://serverdraw2018.herokuapp.com/api/v1/customers", this.customer ).subscribe((data)=>{
        this.navCtrl.pop();
      }, (error)=>{
        console.log(error);
      });
    }
  }

}
