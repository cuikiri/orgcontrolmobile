import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Email } from './email.model';
import { EmailService } from './email.provider';

@IonicPage()
@Component({
    selector: 'page-email-dialog',
    templateUrl: 'email-dialog.html'
})
export class EmailDialogPage {

    email: Email;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private emailService: EmailService) {
        this.email = params.get('item');
        if (this.email && this.email.id) {
            this.emailService.find(this.email.id).subscribe(data => {
                this.email = data;
            });
        } else {
            this.email = new Email();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.email.id : null],
            tipoEmail: [params.get('item') ? this.email.tipoEmail : '',  Validators.required],
            descricao: [params.get('item') ? this.email.descricao : '',  Validators.required],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {

    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the email, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

}
