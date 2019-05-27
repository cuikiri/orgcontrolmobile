import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailPage } from './email';
import { EmailService } from './email.provider';

@NgModule({
    declarations: [
        EmailPage
    ],
    imports: [
        IonicPageModule.forChild(EmailPage),
        TranslateModule.forChild()
    ],
    exports: [
        EmailPage
    ],
    providers: [EmailService]
})
export class EmailPageModule {
}
