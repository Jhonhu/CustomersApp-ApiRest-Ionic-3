import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient }   from '@angular/common/http';

import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { CustomerDetailPage } from '../../pages/customer-detail/customer-detail';

@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html',
})
export class CustomerListPage {

  customers: any;
  customer: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public httpClient: HttpClient
  ) {
  }

  onFind(){
    this.httpClient.get("https://serverdraw2018.herokuapp.com/api/v1/customers?sort[ContactName]=1").subscribe((data)=>{
      console.log(data);
      this.customers = data;
    });
  }

  ionViewWillEnter(){
    this.onFind();
  }


  onNew(){
    this.navCtrl.push(CustomerDetailPage, { isEditable:true, customer: {}, isNew:true });
  }

  itemSelected(customer){
    console.log(customer);
    var actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'View',
            role: 'view',
            handler: () => {
              this.navCtrl.push(CustomerDetailPage, { isEditable:false, customer: customer });
            }
          },
          {
            text: 'Edit',
            role: 'edit',
            handler: () => {
              this.navCtrl.push(CustomerDetailPage, { isEditable:true, customer: customer});
            }
          },{
            text: 'Delete',
            handler: () => {
              this.customer = customer;
              this.showPrompt();
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
    actionSheet.present();
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Delete Customer',
      message: "Are you sure you want to delte this customer? ",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: data => {
            this.onDelete();
            console.log('Deleted');
          }
        }
      ]
    });
    prompt.present();
  }

  onDelete(){
    this.httpClient.delete("https://serverdraw2018.herokuapp.com/api/v1/customers/"+ this.customer._id).subscribe((data)=>{
      this.customer = {};
      this.onFind();
    });
  }

}
