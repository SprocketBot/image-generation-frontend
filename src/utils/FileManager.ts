import { downloadProgress, downloadStatus, uploadProgress } from '$src/stores';

class FileManager {
  private _busy: boolean = false;
  public get busy(): boolean { return this._busy }

  async downloadFile(presignedURL: string, size: number): Promise<Blob> {
    if (this._busy) throw Error("File manager busy")

    this._busy = true;
    downloadProgress.set(0);

    downloadStatus.set("starting");

    const result = new Promise<Blob>((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("DOWNLOAD SUCCESSFUL");
            
          }
          else {
            console.log("DOWNLOAD FAILED");
            rej();
          }
        }
      };

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          downloadProgress.set(e.loaded / size);
        }
      };
      xhr.onload = (e) => {
        const blob = xhr.response;
        downloadStatus.set("finished");
        this._busy = false;
        res(blob);
      }
      xhr.open("GET", presignedURL);
      downloadStatus.set("in progress");
    })
    return result;

  }

  uploadFile(presignedURL: string, file: Blob) {
    if (this._busy) throw Error("File manager busy")

    this._busy = true;

    console.log(presignedURL, file);

    const result = new Promise<boolean>((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                console.log("UPLOAD SUCCESSFUL");
                this._busy = false;
                uploadProgress.set(0);
                res(true);
              }
              else {
                console.log("UPLOAD FAILED");
                this._busy = false;
                console.log(xhr.status, xhr.statusText)
                rej("UPLOAD FAILED");
              }
          }
      };
      xhr.onerror = (e) =>{console.log(e)}
      xhr.upload.onprogress = (e) => {
        console.log(e);
        if (e.lengthComputable) {
            
              uploadProgress.set(e.loaded / e.total);
          }
      };
      xhr.open("PUT", presignedURL);
      xhr.send(file);
  })

  return result
  }

}

const fileManager = new FileManager();

export { fileManager as FileManager };