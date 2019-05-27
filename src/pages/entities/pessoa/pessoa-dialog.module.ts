import { AvisoService } from '../aviso';
import { ColaboradorService } from '../colaborador';
import { ResponsavelService } from '../responsavel';
import { AlunoService } from '../aluno';
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
        ColaboradorService,
        ResponsavelService,
        AlunoService,
    ]
})
export class PessoaDialogPageModule {
}
