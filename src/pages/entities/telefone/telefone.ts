import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Telefone } from './telefone.model';
import { TelefoneService } from './telefone.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-telefone',
    templateUrl: 'telefone.html'
})
export class TelefonePage {
    telefones: Telefone[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private telefoneService: TelefoneService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.telefones = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.telefoneService.query().subscribe(
            (response) => {
                this.telefones = response;
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

    trackId(index: number, item: Telefone) {
        return item.id;
    }

    open(slidingItem: any, item: Telefone) {
        let modal = this.modalCtrl.create('TelefoneDialogPage', {item: item});
        modal.onDidDismiss(telefone => {
            if (telefone) {
                if (telefone.id) {
                    this.telefoneService.update(telefone).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Telefone updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.telefoneService.create(telefone).subscribe(data => {
                        this.telefones.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Telefone added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(telefone) {
        this.telefoneService.delete(telefone.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Telefone deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(telefone: Telefone) {
        this.navCtrl.push('TelefoneDetailPage', {id: telefone.id});
    }
}
