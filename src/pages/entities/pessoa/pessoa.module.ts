import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PessoaPage } from './pessoa';
import { PessoaService } from './pessoa.provider';

@NgModule({
    declarations: [
        PessoaPage
    ],
    imports: [
        IonicPageModule.forChild(PessoaPage),
        TranslateModule.forChild()
    ],
    exports: [
        PessoaPage
    ],
    providers: [PessoaService]
})
export class PessoaPageModule {
}
