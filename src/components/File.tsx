import React, { useState } from 'react';
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
    let ext = name.split('.')[1];

    const fileCall = (path: string) => {
        getFile(path).then((res) => {
            setFile(res)
        });
    }
    const preview_file = (path: string) => {
        fileCall(path);
    }

    const download_file = (path: string, name: string) => {
        fileCall(path);
        try {
            if (file){
                downloader(file, name);
            }
        } catch(err) {
            console.log(`Error: ${err}`);
        }
        
    }

    return (
        <div className='file-wrapper'>
            { getFileIcon(ext) }
            <span> {name} </span>
            <button 
             className='button'
             onClick={() => preview_file(path)}
            >
                Preview
            </button>
            <button 
             className='button'
             onClick={() => download_file(path, name)} 
            >
                Download
            </button>
        </div>
    )
}