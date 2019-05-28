import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailDialogPage } from './email-dialog';
import { EmailService } from './email.provider';

@NgModule({
    declarations: [
        EmailDialogPage
    ],
    imports: [
        IonicPageModule.forChild(EmailDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        EmailDialogPage
    ],
    providers: [
        EmailService
    ]
})
export class EmailDialogPageModule {
}
