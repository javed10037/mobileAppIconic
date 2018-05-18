import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetupService } from '../../providers/setup.services';
import { SendOption,SendDetail } from '../../interfaces/user-options';
import { UserData } from '../../providers/user-data';
import { NgForm } from '@angular/forms';
/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {
  responseData:any;
  user:any;
  public submitted = false;
   send: SendOption = { address: '', pin: '' };
  senddetails: SendDetail = { address: '', balance: '', pin: '' };
  constructor(public userData: UserData,
  public navCtrl: NavController,
  
   public navParams: NavParams,
   public _setupService: SetupService,
   ) {
   

  }
 
onsendpage(Form: NgForm){
  this.submitted = true; 
  if (Form.valid) {  
       this.userData.send(this.send.address);   
        
       
  
     this._setupService.createSendDetail(this.senddetails).subscribe((result) => { 
         
         console.log(result);
          if(result.statusCode== 200){
                       
             localStorage.setItem('senddetails',JSON.stringify(this.responseData));
              this.user=JSON.parse(localStorage.getItem('senddetails'));   
               
            
      }
    });
    }
}

 } 