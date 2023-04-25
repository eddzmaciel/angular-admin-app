import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/usuario.model';
import { catchError } from 'rxjs/operators';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public userProfile: User;
  public imageToUpload: File;
  //put an image type
  public imageTemp: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private fileUploadService: FileUploadService
  ) {
    //extracting the current user,
    //creating a user instance of the same userProfile Object that we are creating in the UsersService
    this.userProfile = usersService.userProfile;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.userProfile.name, [Validators.required]],
      email: [this.userProfile.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    console.log('form:', this.profileForm.value);
    this.usersService.updateUserProfile(this.profileForm.value).subscribe(
      () => {
        const { name, email } = this.profileForm.value;
        //we are changing the value in the current existing reference of the UserProfile Object
        this.userProfile.name = name;
        this.userProfile.email = email;
        //TODO: agregar sweetalert
      },
      (error) => {
        //TODO: agregar sweetalert
        console.log('--->error:', error);
      }
    );
  }

  onSelectImage(file: File) {
    console.log('---->onSelectImage:', file);
    this.imageToUpload = file;
    //read the selected Image
    //if doesn´t exist selected file, don´t do nothing
    if (!file) {
      this.imageTemp = null;
      return;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      //we use the selected image as temporal
      this.imageTemp = reader.result;
      console.log('---->ImageTem:', reader.result);
    };
  }

  updateImage() {
    //calling the service
    //it is a promise
    this.fileUploadService
      .updatePicture(this.imageToUpload, 'users', this.userProfile.uid)
      //TODO: show sweetalert
      .then((img) => {
        this.userProfile.img = img;
        this.imageTemp = null;
      });
  }
}
