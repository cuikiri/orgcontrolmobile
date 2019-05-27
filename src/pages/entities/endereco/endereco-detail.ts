import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Endereco } from './endereco.model';
import { EnderecoService } from './endereco.provider';

@IonicPage({
    segment: 'endereco-detail/:id',
    defaultHistory: ['EntityPage', 'enderecoPage']
})
@Component({
    selector: 'page-endereco-detail',
    templateUrl: 'endereco-detail.html'
})
export class EnderecoDetailPage {
    endereco: Endereco;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private enderecoService: EnderecoService, private toastCtrl: ToastController) {
        this.endereco = new Endereco();
        this.endereco.id = params.get('id');
    }

    ionViewDidLoad() {
        this.enderecoService.find(this.endereco.id).subscribe(data => this.endereco = data);
    }

    open(item: Endereco) {
        let modal = this.modalCtrl.create('EnderecoDialogPage', {item: item});
        modal.onDidDismiss(endereco => {
            if (endereco) {
                this.enderecoService.update(endereco).subscribe(data => {
                    this.endereco = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Endereco updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
