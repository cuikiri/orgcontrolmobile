import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TelefonePage } from './telefone';
import { TelefoneService } from './telefone.provider';

@NgModule({
    declarations: [
        TelefonePage
    ],
    imports: [
        IonicPageModule.forChild(TelefonePage),
        TranslateModule.forChild()
    ],
    exports: [
        TelefonePage
    ],
    providers: [TelefoneService]
})
export class TelefonePageModule {
}
