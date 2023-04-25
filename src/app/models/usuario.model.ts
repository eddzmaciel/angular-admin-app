import { environment } from '../../environments/environment';

const base_url = environment.base_url;
export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {
    //this.img = this.imageUrl;
  }

  get imageUrl() {
    //api/upload/no-image
    // return if the image comes from the googleAuth Profile
    if (this.img.includes('https')) {
      return this.img;
    }

    if (this.img) {
      return `${base_url}/upload/users/${this.img}`;
    } else {
      return `${base_url}/upload/users/no-image`;
    }
  }
}
