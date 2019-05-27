import { PessoaService } from '../pessoa';
import { UnidadeService } from '../unidade';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TelefoneDialogPage } from './telefone-dialog';
import { TelefoneService } from './telefone.provider';

@NgModule({
    declarations: [
        TelefoneDialogPage
    ],
    imports: [
        IonicPageModule.forChild(TelefoneDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        TelefoneDialogPage
    ],
    providers: [
        TelefoneService,
        PessoaService,
        UnidadeService,
    ]
})
export class TelefoneDialogPageModule {
}
