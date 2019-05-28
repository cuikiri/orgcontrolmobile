import { AvisoService } from '../aviso';
import { ResponsavelService } from '../responsavel';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PessoaDialogPage } from './pessoa-dialog';
import { PessoaService } from './pessoa.provider';

@NgModule({
    declarations: [
        PessoaDialogPage
    ],
    imports: [
        IonicPageModule.forChild(PessoaDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        PessoaDialogPage
    ],
    providers: [
        PessoaService,
        AvisoService,
        ResponsavelService,
    ]
})
export class PessoaDialogPageModule {
}
