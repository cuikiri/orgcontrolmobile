import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';

import { Principal } from '../../providers/auth/principal.service';

import { FotoUser } from './foto-user.model';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {
  // Our local settings object
  settingsAccount: any;
  settingsReady = true;
  
  fotoUser: any;
  pessoa: any;

  form: FormGroup;

  constructor(private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    private principal: Principal,
	public toastCtrl: ToastController,
    public translate: TranslateService) {
        //this.languageHelper.getAll().then(languages => {
        //    this.languages = languages;
        //});
  }

  ionViewDidLoad() {
	this.principal.identity(true).then(account => {
            this.settingsAccount = this.copyAccount(account);
			if (this.settingsAccount.foto) {
				this.fotoUser = 'data:' + this.settingsAccount.foto.conteudoContentType + ';base64,' + this.settingsAccount.foto.conteudo;
			}
			if (this.settingsAccount.pessoa) {
				this.pessoa = this.settingsAccount.pessoa;
			}
     });
  }
  
  copyAccount(account) {
        return {
			id: account.id,
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl,
            foto: account.foto,
            pessoa: account.pessoa
        };
    }
	
	open(item) {
        let modal = this.modalCtrl.create('SettingsDialogPage', {item: item});
        modal.onDidDismiss(item => {
            if (item) {
                this.emailService.update(item).subscribe(data => {
                    this.item = data;
					alert("p1");
                    let toast = this.toastCtrl.create(
                        {message: 'Settings updated successfully.', duration: 3000, position: 'middle'});
					alert("p2");
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
