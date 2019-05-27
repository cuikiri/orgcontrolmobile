import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Email } from './email.model';
import { EmailService } from './email.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-email',
    templateUrl: 'email.html'
})
export class EmailPage {
    emails: Email[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private emailService: EmailService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.emails = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.emailService.query().subscribe(
            (response) => {
                this.emails = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Email) {
        return item.id;
    }

    open(slidingItem: any, item: Email) {
        let modal = this.modalCtrl.create('EmailDialogPage', {item: item});
        modal.onDidDismiss(email => {
            if (email) {
                if (email.id) {
                    this.emailService.update(email).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Email updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.emailService.create(email).subscribe(data => {
                        this.emails.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Email added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(email) {
        this.emailService.delete(email.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Email deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(email: Email) {
        this.navCtrl.push('EmailDetailPage', {id: email.id});
    }
}
