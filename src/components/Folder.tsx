import React, { MouseEventHandler, ReactChild,  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

interface FolderData {
    name: string; 
    path: string; 
    children: ReactChild;
}

export const Folder: React.FC<FolderData> = ( props ) => { 
  
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    
    const toggleHandler = ( e: React.MouseEvent<HTMLDivElement> ) => {
      e.preventDefault();
      setIsOpen(!isOpen);
    };

    return (
      <div className='folder-wrapper' key={props.name}>
        <div className="folder--label" onClick={toggleHandler}>

          { isOpen
            ? <FontAwesomeIcon icon={faFolderOpen} />
            : <FontAwesomeIcon icon={faFolder} />
          }
          
          <span>{props.name}</span>

        </div>
        <div
         className={`collapsible ${isOpen ? 'collapse-open' : 'collapse-close'}`}
        >
            { isOpen &&
              props.children
            }
        </div>
      </div>
    );
  };