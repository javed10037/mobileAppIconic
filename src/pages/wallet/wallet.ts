import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { MenuController,ToastController,LoadingController,Events, AlertController} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { UserOptions,LoginDetail } from '../../interfaces/user-options';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { SignupPage } from '../signup/signup';
import { DashboardPage } from '../dashboard/dashboard';
import { SetupService } from '../../providers/setup.services';
import { SendPage } from '../send/send';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
  qrData = null;
  createdCode = null;
  scannedCode = null;

   responseData:any;
   public user:any;
   submitted = false;
   public userName:any;
   public email:any;
   public balance:any;
   public address:any;


constructor(public userData: UserData,
  public navCtrl: NavController,
  public nav: NavController,
  public toastCtrl: ToastController,
  public events: Events,
  public menuCtrl: MenuController,
   public navParams: NavParams,
   public setupService: SetupService,
   public loadingCtrl: LoadingController,
   public alertCtrl: AlertController,
    public barcodeScanner: BarcodeScanner
   ) {
this.nav = nav
var user =JSON.parse(localStorage.getItem('logindetail')); 
this.email = user.user.email;
this.getWallletBalance();
this.getAddress();

  }

 
  getWallletBalance(){
      this.setupService.createWalletDetail({userMailId:this.email}).subscribe((result) => { 
         this.balance = result.balance;
         
    });
  }

  getAddress(){
      this.setupService.createAddressDetail({email:this.email}).subscribe((result) => { 
        
         this.address = result.newaddress;
         return this.address;
    });

    }

  
    doPrompt() {
    let prompt = this.alertCtrl.create({

          title: 'Address',
          subTitle:'<img src="http://chart.apis.google.com/chart?chs=150x150&amp;cht=qr&amp;chl='+this.address+'&amp;choe=UTF-8" alt="my alt" />',
      
          inputs: [
        {
          name: 'address',
          placeholder: this.address?this.address:'address will come later'

        },
        
      ],
      buttons: [
        {  
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });

    prompt.present();
  }


 openSendPage() {
    this.nav.push(SendPage)
  }

 

} 

  
     



    




