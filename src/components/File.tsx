import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faCss3, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { faFileText, faFileImage, faFile } from '@fortawesome/free-solid-svg-icons';
import {
    getFile
} from '../adapters/data'
import {
    downloader
} from '../utils/downloader';

import { AxiosResponse } from 'axios';
import MarkdownPreview from '@uiw/react-markdown-preview';


interface FileData {
    name: string;
    path: string;
}


const getFileIcon = (extension: string) => {
    switch (extension){
        case 'js': return <FontAwesomeIcon icon={faJs} />
        case 'md': return <FontAwesomeIcon icon={faFileText} /> 
        case 'txt' : return <FontAwesomeIcon icon={faFileText} /> 
        case 'css': return <FontAwesomeIcon icon={faCss3} /> 
        case 'html': return <FontAwesomeIcon icon={faHtml5} /> 
        case 'jpg': return <FontAwesomeIcon icon={faFileImage} /> 
        case 'png': return <FontAwesomeIcon icon={faFileImage} /> 
        case 'svg': return <FontAwesomeIcon icon={faFileImage} /> 

        default: return <FontAwesomeIcon icon={faFile} /> 
    }
        

}

export const File: React.FC<FileData> = ({name, path}) => {

    const [file, setFile] = useState< AxiosResponse | null | void>(null);
    const [preview, setPreview] = useState<boolean>(false);
    const [previewText, setPreviewText] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<boolean>(false);
    const ext = name.split('.')[1];

    useEffect(() => {
        let array_file = name.split('.')
        let ext = array_file[1]
        let allow_preview = ['css', 'html', 'js', 'ts', 'md', 'jpeg', 'jpg', 'svg', 'png']
        if (allow_preview.includes(ext) || array_file.length === 1 || array_file[0] === ''){
            setPreview(true);
        }
    }, [name]);
    
    const fileCall = (path: string) => {
        getFile(path).then((res) => {
            setFile(res)
        });
    }

    const preview_file = (path: string) => {
        fileCall(path);
        try {
            if (file){
                
                let content_type_general = file.headers['content-type'].split('/')[0];
                if ( content_type_general === 'text') {
                    setPreviewText(!previewText);   
                } else if (content_type_general === 'image') {
                    setPreviewImage(!previewImage);
                }

            } 
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }

    const download_file = (path: string, name: string) => {
        fileCall(path);
        try {
            if (file){
                downloader(file, name);
                setFile(null);
            }
        } catch(err) {
            console.log(`Error: ${err}`);
        }
        
    }

    return (
        <>
            <div className='file-wrapper'>
                { getFileIcon(ext) }
                <span> {name} </span>
                { preview &&
                    <button 
                    className='button'
                    onClick={() => preview_file(path)}
                    >
                        Preview
                    </button>
                }
                <button 
                className='button'
                onClick={() => download_file(path, name)} 
                >
                    Download
                </button>
            </div>
            
            { file && previewText && 
                <div className='previewer'>
                    <small>Preview</small>
                    <MarkdownPreview source={file.data} />
                </div>}
            { file && previewImage && 
                <div className='previewer'>
                    <small>Preview</small>
                    <img 
                    className="preview-img" 
                    src={`data:${file.headers['content-type']};base64,${file.data}`} 
                    />
                </div>
            }
            
        </>
    )
}