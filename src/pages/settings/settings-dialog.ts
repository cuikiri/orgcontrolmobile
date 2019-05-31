import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

//import { FotoUser } from './foto-user.model';

@IonicPage()
@Component({
    selector: 'page-settings-dialog',
    templateUrl: 'settings-dialog.html'
})
export class SettingsDialogPage {

	settingsAccount: any;
    isReadyToSave: boolean;
	fotoUser: any;

    form: FormGroup;

    constructor(
		public navCtrl: NavController, 
		public viewCtrl: ViewController, 
		public toastCtrl: ToastController,
               formBuilder: FormBuilder, 
			   params: NavParams,
		private camera: Camera) {

		this.settingsAccount = params.get('item');
		
        this.form = formBuilder.group({
            id: [params.get('item') ? this.settingsAccount.id : null],
            firstName: [params.get('item') ? this.settingsAccount.firstName : '',  Validators.required],
			lastName: [params.get('item') ? this.settingsAccount.lastName : ''],
			login: [params.get('item') ? this.settingsAccount.login : ''],
			email: [params.get('item') ? this.settingsAccount.email : ''],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
		if (this.settingsAccount.foto) {
			this.fotoUser = 'data:' + this.settingsAccount.foto.conteudoContentType + ';base64,' + this.settingsAccount.foto.conteudo;
		}	
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the pessoa, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }
	
	clearImage() {
        this.fotoUser = null;
    }
	
	takePicture() {
		this.photo = '';
		alert("p0");
		const options: CameraOptions = {
		  quality: 100,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE,
		  allowEdit: true,
		  targetWidth: 100,
		  targetHeight: 100
		}
		alert("p1");
		this.camera.getPicture(options)
		  .then((imageData) => {
			let base64image = 'data:image/jpeg;base64,' + imageData;
			this.photo = base64image;
	 
		  }, (error) => {
			console.error(error);
		  })
		  .catch((error) => {
			console.error(error);
		   })
		 alert("p2");
	}

}
