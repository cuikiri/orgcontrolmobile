import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Endereco } from './endereco.model';
import { EnderecoService } from './endereco.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-endereco',
    templateUrl: 'endereco.html'
})
export class EnderecoPage {
    enderecos: Endereco[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private enderecoService: EnderecoService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.enderecos = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.enderecoService.query().subscribe(
            (response) => {
                this.enderecos = response;
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

    trackId(index: number, item: Endereco) {
        return item.id;
    }

    open(slidingItem: any, item: Endereco) {
        let modal = this.modalCtrl.create('EnderecoDialogPage', {item: item});
        modal.onDidDismiss(endereco => {
            if (endereco) {
                if (endereco.id) {
                    this.enderecoService.update(endereco).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Endereco updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.enderecoService.create(endereco).subscribe(data => {
                        this.enderecos.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Endereco added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(endereco) {
        this.enderecoService.delete(endereco.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Endereco deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(endereco: Endereco) {
        this.navCtrl.push('EnderecoDetailPage', {id: endereco.id});
    }
}
