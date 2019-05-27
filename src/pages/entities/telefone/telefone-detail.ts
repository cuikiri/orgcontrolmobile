import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Telefone } from './telefone.model';
import { TelefoneService } from './telefone.provider';

@IonicPage({
    segment: 'telefone-detail/:id',
    defaultHistory: ['EntityPage', 'telefonePage']
})
@Component({
    selector: 'page-telefone-detail',
    templateUrl: 'telefone-detail.html'
})
export class TelefoneDetailPage {
    telefone: Telefone;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private telefoneService: TelefoneService, private toastCtrl: ToastController) {
        this.telefone = new Telefone();
        this.telefone.id = params.get('id');
    }

    ionViewDidLoad() {
        this.telefoneService.find(this.telefone.id).subscribe(data => this.telefone = data);
    }

    open(item: Telefone) {
        let modal = this.modalCtrl.create('TelefoneDialogPage', {item: item});
        modal.onDidDismiss(telefone => {
            if (telefone) {
                this.telefoneService.update(telefone).subscribe(data => {
                    this.telefone = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Telefone updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
