import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Email } from './email.model';
import { EmailService } from './email.provider';

@IonicPage({
    segment: 'email-detail/:id',
    defaultHistory: ['EntityPage', 'emailPage']
})
@Component({
    selector: 'page-email-detail',
    templateUrl: 'email-detail.html'
})
export class EmailDetailPage {
    email: Email;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private emailService: EmailService, private toastCtrl: ToastController) {
        this.email = new Email();
        this.email.id = params.get('id');
    }

    ionViewDidLoad() {
        this.emailService.find(this.email.id).subscribe(data => this.email = data);
    }

    open(item: Email) {
        let modal = this.modalCtrl.create('EmailDialogPage', {item: item});
        modal.onDidDismiss(email => {
            if (email) {
                this.emailService.update(email).subscribe(data => {
                    this.email = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Email updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
