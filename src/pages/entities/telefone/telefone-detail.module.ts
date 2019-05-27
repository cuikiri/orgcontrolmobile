import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TelefoneDetailPage } from './telefone-detail';
import { TelefoneService } from './telefone.provider';

@NgModule({
    declarations: [
        TelefoneDetailPage
    ],
    imports: [
        IonicPageModule.forChild(TelefoneDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        TelefoneDetailPage
    ],
    providers: [TelefoneService]
})
export class TelefoneDetailPageModule {
}
