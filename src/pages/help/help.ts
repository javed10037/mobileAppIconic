import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams,MenuController,ToastController,LoadingController,Events} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { HelpOption,HelpDetails } from '../../interfaces/user-options';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { SignupPage } from '../signup/signup';
import { DashboardPage } from '../dashboard/dashboard';
import { SetupService } from '../../providers/setup.services';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})

export class HelpPage {
  user:any;
  public subject:any;
  public message:any;
  submitted = false;
  responseData:any;
  help: HelpOption = { subject: '', message: '' };
  helpdetails: HelpDetails = { subject: '', message: '' };
   
    
constructor(public userData: UserData,
  public navCtrl: NavController,
  public toastCtrl: ToastController,
  public events: Events,
  public menuCtrl: MenuController,
   public navParams: NavParams,
   public _setupService: SetupService,
   public loadingCtrl: LoadingController) {
   

  }
 
onsend(Form: NgForm){
  this.submitted = true; 
  if (Form.valid) {  
       this.userData.help(this.help.subject);   
        let loading = this.loadingCtrl.create({
       content: 'Sending please wait...'
      }); 
        loading.present(); 
  
     this._setupService.createHelpDetail(this.helpdetails).subscribe((result) => { 
         
         console.log(result);
          if(result.statusCode== 200){
            this.responseData = result;             
             localStorage.setItem('helpdetails',JSON.stringify(this.responseData));
              this.user=JSON.parse(localStorage.getItem('helpdetails'));   
              this.subject=this.responseData.trader.message; 
              this.events.publish("shareObject", this.subject);         
             loading.dismiss();  
        this.navCtrl.setRoot(DashboardPage);
      }else{
                     this.responseData = result;
                     loading.dismiss();
                     let toast = this.toastCtrl.create({
                     message: this.responseData.message,
                     showCloseButton: true,
                     closeButtonText: 'Ok',
                     duration: 5000
                });
                toast.present(); 
          } 
    });
    }
}
onsend1(form: NgForm) {   
    this.submitted = true; 
    if (form.valid) {  
      this.userData.help(this.help.subject);  
      this.subject=this.helpdetails.message;   
      this.events.publish("shareObject", this.subject);         
      this.navCtrl.setRoot(DashboardPage);
    }
  }
 } 