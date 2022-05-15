export default {
  async newStorage() {
    return new Promise(async (resolve, reject) => {
      window.requestFileSystem =
        window.requestFileSystem || window.webkitRequestFileSystem;
      let type = TEMPORARY;
      let targetBytes = 1024 * 1024 * 500; //500MB
      if (type == TEMPORARY) {
        window.requestFileSystem(
          TEMPORARY,
          targetBytes,
          (success) => {
            resolve(success);
          },
          (errp) => {
            reject(errp);
          }
        );
      } else {
        window.webkitStorageInfo.requestQuota(
          window.TEMPORARY,
          targetBytes,
          function (grantedBytes) {
            window.requestFileSystem(
              PERSISTENT,
              grantedBytes,
              (success) => {
                resolve(success);
              },
              (errp) => {
                reject(errp);
              }
            );
          },
          function (e) {
            console.log("Error", e);
            reject(e);
          }
        );
      }
    });
  },
  async createDir(fs, dirName) {
    return new Promise((resolve, reject) => {
      fs.root.getDirectory(
        dirName,
        { create: true },
        (dirEntry) => {
          resolve(dirEntry);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  async writeFile(fs, filename, data) {
    return new Promise((resolve, reject) => {
      fs.root.getFile(
        filename,
        { create: true },
        (fileEntry) => {
          fileEntry.createWriter(
            (fileWriter) => {
              fileWriter.onwriteend = function (e) {
                resolve(e);
              };
              fileWriter.onerror = function (e) {
                reject(e);
              };
              fileWriter.write(data);
            },
            (err) => {
              reject(err);
            }
          );
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  async readFile(fs, filename) {
    return new Promise((resolve, reject) => {
      fs.root.getFile(
        filename,
        { create: false },
        (fileEntry) => {
          fileEntry.file(
            (file) => {
              var reader = new FileReader();
              reader.onloadend = function (e) {
                resolve(this.result);
              };
              reader.readAsArrayBuffer(file); // Read the file as plaintext.
            },
            (err) => {
              reject(err);
            }
          );
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  async readAsFile(fs, filename) {
    return new Promise((resolve, reject) => {
      fs.root.getFile(
        filename,
        { create: false },
        (fileEntry) => {
          fileEntry.file(
            (file) => {
              resolve(file);
            },
            (err) => {
              reject(err);
            }
          );
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  async removeFile(fs, filename) {
    return new Promise((resolve, reject) => {
      fs.root.getFile(
        filename,
        { create: false },
        (fileEntry) => {
          fileEntry.remove(
            (success) => {
              resolve();
            },
            (err) => {
              reject(err);
            }
          );
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  async getURL(fs, filename) {
    return new Promise((resolve, reject) => {
      fs.root.getFile(
        filename,
        (fileEntry) => {
          resolve(fileEntry.toURL());
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
};
