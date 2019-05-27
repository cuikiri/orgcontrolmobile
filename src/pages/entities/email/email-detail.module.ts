import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailDetailPage } from './email-detail';
import { EmailService } from './email.provider';

@NgModule({
    declarations: [
        EmailDetailPage
    ],
    imports: [
        IonicPageModule.forChild(EmailDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        EmailDetailPage
    ],
    providers: [EmailService]
})
export class EmailDetailPageModule {
}
