import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { EnderecoDetailPage } from './endereco-detail';
import { EnderecoService } from './endereco.provider';

@NgModule({
    declarations: [
        EnderecoDetailPage
    ],
    imports: [
        IonicPageModule.forChild(EnderecoDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        EnderecoDetailPage
    ],
    providers: [EnderecoService]
})
export class EnderecoDetailPageModule {
}
