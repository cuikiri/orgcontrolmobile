import { UfService } from '../uf';
import { LocalizacaoService } from '../localizacao';
import { UnidadeService } from '../unidade';
import { PessoaService } from '../pessoa';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { EnderecoDialogPage } from './endereco-dialog';
import { EnderecoService } from './endereco.provider';

@NgModule({
    declarations: [
        EnderecoDialogPage
    ],
    imports: [
        IonicPageModule.forChild(EnderecoDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        EnderecoDialogPage
    ],
    providers: [
        EnderecoService,
        UfService,
        LocalizacaoService,
        UnidadeService,
        PessoaService,
    ]
})
export class EnderecoDialogPageModule {
}
