import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.provider';
import { Aviso } from '../aviso/aviso.model';
import { AvisoService } from '../aviso/aviso.service';
import { Responsavel } from '../responsavel/responsavel.model';
import { ResponsavelService } from '../responsavel/responsavel.service';

@IonicPage()
@Component({
    selector: 'page-pessoa-dialog',
    templateUrl: 'pessoa-dialog.html'
})
export class PessoaDialogPage {

    pessoa: any;
    avisos: Aviso[];
    responsavels: Responsavel[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private avisoService: AvisoService,
				private pessoaService: PessoaService,
                private responsavelService: ResponsavelService) {
        this.pessoa = params.get('item');
        if (this.pessoa && this.pessoa.id) {
            this.pessoaService.find(this.pessoa.id).subscribe(data => {
                this.pessoa = data;
            });
        } else {
            this.pessoa = new Pessoa();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.pessoa.id : null],
            nome: [params.get('item') ? this.pessoa.nome : '',  Validators.required],
            avisos: [params.get('item') ? this.pessoa.avisos : '',],
            responsavel: [params.get('item') ? this.pessoa.responsavel : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.avisoService.query()
            .subscribe(data => { this.avisos = data; }, (error) => this.onError(error));
        this.responsavelService.query()
            .subscribe(data => { this.responsavels = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the pessoa, so return it
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

    compareAviso(first: Aviso, second: Aviso): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackAvisoById(index: number, item: Aviso) {
        return item.id;
    }
    compareResponsavel(first: Responsavel, second: Responsavel): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackResponsavelById(index: number, item: Responsavel) {
        return item.id;
    }
}
