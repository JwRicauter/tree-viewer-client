import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faCss3, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { faFileText, faFileImage, faFile } from '@fortawesome/free-solid-svg-icons';


interface FileData {
    name: string;
    path: string;
}


const getFileIcon = (extension: string) => {
    switch (extension){
        case 'js': return <FontAwesomeIcon icon={faJs} />
        case 'md' || 'txt' : return <FontAwesomeIcon icon={faFileText} /> 
        case 'css': return <FontAwesomeIcon icon={faCss3} /> 
        case 'html': return <FontAwesomeIcon icon={faHtml5} /> 
        case 'jpg' || 'png' || 'svg': return <FontAwesomeIcon icon={faFileImage} /> 
        default: return <FontAwesomeIcon icon={faFile} /> 
    }
        

}


export const File: React.FC<FileData> = ({name, path}) => {

    let ext = name.split('.')[1];

    return (
        <div className='file-wrapper'>
            { getFileIcon(ext) }
            <span> {name} </span>
        </div>
    )
}