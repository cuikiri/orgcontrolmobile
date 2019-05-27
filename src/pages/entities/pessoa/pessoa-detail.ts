import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.provider';

@IonicPage({
    segment: 'pessoa-detail/:id',
    defaultHistory: ['EntityPage', 'pessoaPage']
})
@Component({
    selector: 'page-pessoa-detail',
    templateUrl: 'pessoa-detail.html'
})
export class PessoaDetailPage {
    pessoa: Pessoa;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private pessoaService: PessoaService, private toastCtrl: ToastController) {
        this.pessoa = new Pessoa();
        this.pessoa.id = params.get('id');
    }

    ionViewDidLoad() {
        this.pessoaService.find(this.pessoa.id).subscribe(data => this.pessoa = data);
    }

    open(item: Pessoa) {
        let modal = this.modalCtrl.create('PessoaDialogPage', {item: item});
        modal.onDidDismiss(pessoa => {
            if (pessoa) {
                this.pessoaService.update(pessoa).subscribe(data => {
                    this.pessoa = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Pessoa updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
