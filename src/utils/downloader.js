import download from 'js-file-download';

export const downloader = (file, fileName) => {
    let content_type = file.headers['content-type'];
    let isImage = content_type.split('/')[0] === 'image';
    let isPDF = content_type === 'application/json';

    if (isImage) {
        let a = document.createElement("a"); 
        a.href = `data:${content_type};base64,${file.data}`; 
        a.download = fileName; 
        a.click();
    } else if (isPDF) {
        const a = document.createElement('a')
        a.download = fileName
        a.href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(file.data))}`
        a.click();
    } else {
        let hasMimetype = fileName.split('.').lenght > 1;
        if (hasMimetype) {
            download(
                file.data,
                fileName,
                content_type
            )
        } else {
            download(
                file.data,
                fileName
            )
        }

    }

}
