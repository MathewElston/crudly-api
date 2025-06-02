"use strict";
class FileEnforcer {
  constructor({ allowedContentTypes, allowedExtensionTypes, maxFileSize }) {
    this.allowedContentTypes = allowedContentTypes;
    this.allowedExtensionTypes = allowedExtensionTypes;
    this.maxFileSize = maxFileSize; // in bytes
  }
  enforce(file) {
    // if (!this.allowedContentTypes.includes(file.typ)) {
    //   throw new Error(`Invalid content type: ${file.mimetype}`);
    // }

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!this.allowedExtensionTypes.includes(fileExtension)) {
      throw new Error(`Invalid file extension: .${fileExtension}`);
    }

    if (file.size > this.maxFileSize) {
      throw new Error(
        `Invalid file size. Size: ${file.size} Max: ${this.maxFileSize}`
      );
    }
    return true;
  }
}

export default FileEnforcer;
