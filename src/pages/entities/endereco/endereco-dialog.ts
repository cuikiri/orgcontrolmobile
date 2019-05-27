import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Endereco } from './endereco.model';
import { EnderecoService } from './endereco.provider';
import { Uf, UfService } from '../uf';
import { Localizacao, LocalizacaoService } from '../localizacao';
import { Unidade, UnidadeService } from '../unidade';
import { Pessoa, PessoaService } from '../pessoa';

@IonicPage()
@Component({
    selector: 'page-endereco-dialog',
    templateUrl: 'endereco-dialog.html'
})
export class EnderecoDialogPage {

    endereco: Endereco;
    estados: Uf[];
    localizacaos: Localizacao[];
    unidades: Unidade[];
    pessoas: Pessoa[];
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private ufService: UfService,
                private localizacaoService: LocalizacaoService,
                private unidadeService: UnidadeService,
                private pessoaService: PessoaService,
                private enderecoService: EnderecoService) {
        this.endereco = params.get('item');
        if (this.endereco && this.endereco.id) {
            this.enderecoService.find(this.endereco.id).subscribe(data => {
                this.endereco = data;
            });
        } else {
            this.endereco = new Endereco();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.endereco.id : null],
            tipoResidencia: [params.get('item') ? this.endereco.tipoResidencia : '', ],
            tipoEndereco: [params.get('item') ? this.endereco.tipoEndereco : '', ],
            tipoLogradouro: [params.get('item') ? this.endereco.tipoLogradouro : '', ],
            nome: [params.get('item') ? this.endereco.nome : '', ],
            numero: [params.get('item') ? this.endereco.numero : '', ],
            bairro: [params.get('item') ? this.endereco.bairro : '',  Validators.required],
            tipoBairoo: [params.get('item') ? this.endereco.tipoBairoo : '',  Validators.required],
            zona: [params.get('item') ? this.endereco.zona : '',  Validators.required],
            cep: [params.get('item') ? this.endereco.cep : '', ],
            bloco: [params.get('item') ? this.endereco.bloco : '', ],
            apto: [params.get('item') ? this.endereco.apto : '', ],
            complemento: [params.get('item') ? this.endereco.complemento : '', ],
            cidade: [params.get('item') ? this.endereco.cidade : '', ],
            uf: [params.get('item') ? this.endereco.uf : '',],
            localizacao: [params.get('item') ? this.endereco.localizacao : '',],
            unidade: [params.get('item') ? this.endereco.unidade : '',],
            pessoa: [params.get('item') ? this.endereco.pessoa : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.ufService
            .query({filter: 'endereco-is-null'})
            .subscribe(data => {
                if (!this.endereco.estado || !this.endereco.estado.id) {
                    this.estados = data;
                } else {
                    this.ufService
                        .find(this.endereco.estado.id)
                        .subscribe((subData: Uf) => {
                            this.estados = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.localizacaoService
            .query({filter: 'endereco-is-null'})
            .subscribe(data => {
                if (!this.endereco.localizacao || !this.endereco.localizacao.id) {
                    this.localizacaos = data;
                } else {
                    this.localizacaoService
                        .find(this.endereco.localizacao.id)
                        .subscribe((subData: Localizacao) => {
                            this.localizacaos = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.unidadeService.query()
            .subscribe(data => { this.unidades = data; }, (error) => this.onError(error));
        this.pessoaService.query()
            .subscribe(data => { this.pessoas = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the endereco, so return it
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

    compareUf(first: Uf, second: Uf): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUfById(index: number, item: Uf) {
        return item.id;
    }
    compareLocalizacao(first: Localizacao, second: Localizacao): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackLocalizacaoById(index: number, item: Localizacao) {
        return item.id;
    }
    compareUnidade(first: Unidade, second: Unidade): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackUnidadeById(index: number, item: Unidade) {
        return item.id;
    }
    comparePessoa(first: Pessoa, second: Pessoa): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackPessoaById(index: number, item: Pessoa) {
        return item.id;
    }
}
