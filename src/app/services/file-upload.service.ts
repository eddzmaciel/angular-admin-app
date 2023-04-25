import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  //otra forma de hacerlo
  //File es propio de javascript
  async updatePicture(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      //generate the data
      const formData = new FormData();
      formData.append('file', file);
      //from JavaScript,help us to make http request
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const dataResponse = await resp.json();
      console.log('---->dataResponse:', dataResponse);
      if (dataResponse.ok) {
        return dataResponse.fileName;
      } else {
        return false;
      }
    } catch (error) {
      console.log('---->error:', error);
    }
  }
}
