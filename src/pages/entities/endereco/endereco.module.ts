import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { EnderecoPage } from './endereco';
import { EnderecoService } from './endereco.provider';

@NgModule({
    declarations: [
        EnderecoPage
    ],
    imports: [
        IonicPageModule.forChild(EnderecoPage),
        TranslateModule.forChild()
    ],
    exports: [
        EnderecoPage
    ],
    providers: [EnderecoService]
})
export class EnderecoPageModule {
}
