import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-pessoa',
    templateUrl: 'pessoa.html'
})
export class PessoaPage {
    pessoas: Pessoa[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private pessoaService: PessoaService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.pessoas = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.pessoaService.query().subscribe(
            (response) => {
                this.pessoas = response;
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

    trackId(index: number, item: Pessoa) {
        return item.id;
    }

    open(slidingItem: any, item: Pessoa) {
        let modal = this.modalCtrl.create('PessoaDialogPage', {item: item});
        modal.onDidDismiss(pessoa => {
            if (pessoa) {
                if (pessoa.id) {
                    this.pessoaService.update(pessoa).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Pessoa updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.pessoaService.create(pessoa).subscribe(data => {
                        this.pessoas.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Pessoa added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(pessoa) {
        this.pessoaService.delete(pessoa.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Pessoa deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(pessoa: Pessoa) {
        this.navCtrl.push('PessoaDetailPage', {id: pessoa.id});
    }
}
