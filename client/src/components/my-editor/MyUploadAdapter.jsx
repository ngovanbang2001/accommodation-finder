import React from 'react';
import {convertBase64} from "../../utils/uploadImage";
import {getToken} from "../../utils/auth";

// import { ENV } from '../constants/variables'
class MyUploadAdapter {
  constructor(props) {
    this.loader = props;
    this.url = `http://localhost:8006/uploadImage`;
    // this.url = `${ENV}/uploadXenforo`;
  }
  
  onDone(cb) {
    if (cb)
      this.onDoneCallBack = cb
  }
  
  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }
  
  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
  
  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();
    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
    const {accessToken} = getToken();
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}` || 'ssr')
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  }
  
  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = 'Couldn\'t upload file:' + ` ${loader.file.name}.`;
    
    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }
      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // this.onDoneCallBack(response.attachment, response.key)
      resolve({
        default: response
      });
    });
    
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', evt => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }
  
  // Prepares the data and sends the request.
  _sendRequest() {
    this.loader.file.then(async (result) => {
        const base64 = await convertBase64(result)
        
        this.xhr.send(JSON.stringify({base64}));
      }
    )
  }
}

export default MyUploadAdapter;
