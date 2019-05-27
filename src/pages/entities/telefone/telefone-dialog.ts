import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Telefone } from './telefone.model';
import { TelefoneService } from './telefone.provider';
import { Pessoa, PessoaService } from '../pessoa';
import { Unidade, UnidadeService } from '../unidade';

@IonicPage()
@Component({
    selector: 'page-telefone-dialog',
    templateUrl: 'telefone-dialog.html'
})
export class TelefoneDialogPage {

    telefone: Telefone;
    pessoas: Pessoa[];
    unidades: Unidade[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private pessoaService: PessoaService,
                private unidadeService: UnidadeService,
                private telefoneService: TelefoneService) {
        this.telefone = params.get('item');
        if (this.telefone && this.telefone.id) {
            this.telefoneService.find(this.telefone.id).subscribe(data => {
                this.telefone = data;
            });
        } else {
            this.telefone = new Telefone();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.telefone.id : null],
            tipoTelefone: [params.get('item') ? this.telefone.tipoTelefone : '',  Validators.required],
            numero: [params.get('item') ? this.telefone.numero : '',  Validators.required],
            pessoa: [params.get('item') ? this.telefone.pessoa : '',],
            unidade: [params.get('item') ? this.telefone.unidade : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.pessoaService.query()
            .subscribe(data => { this.pessoas = data; }, (error) => this.onError(error));
        this.unidadeService.query()
            .subscribe(data => { this.unidades = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the telefone, so return it
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

    comparePessoa(first: Pessoa, second: Pessoa): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackPessoaById(index: number, item: Pessoa) {
        return item.id;
    }
    compareUnidade(first: Unidade, second: Unidade): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUnidadeById(index: number, item: Unidade) {
        return item.id;
    }
}
