import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsDialogPage } from './settings-dialog';

@NgModule({
  declarations: [
    SettingsDialogPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsDialogPage),
    TranslateModule.forChild()
  ],
  exports: [
    SettingsDialogPage
  ]
})
export class SettingsDialogPageModule {
}
