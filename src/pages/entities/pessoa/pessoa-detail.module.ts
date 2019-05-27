import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PessoaDetailPage } from './pessoa-detail';
import { PessoaService } from './pessoa.provider';

@NgModule({
    declarations: [
        PessoaDetailPage
    ],
    imports: [
        IonicPageModule.forChild(PessoaDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        PessoaDetailPage
    ],
    providers: [PessoaService]
})
export class PessoaDetailPageModule {
}
