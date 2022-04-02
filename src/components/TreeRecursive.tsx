import React, { useState, useEffect, Suspense } from 'react';
import {Folder} from './Folder';
import {File} from './File';
import {
    getChildrens
} from '../adapters/data'

interface nodeData {
    path: string; 
    name: string;
    children: boolean;
}

interface path {
    path:string;
}

export const TreeRecursive: React.FC<path> = ({path}) => {

    const [children, setChildrens] = useState<nodeData[]>([]);

    useEffect(() => {
        getChildrens(path).then((res) => {
            setChildrens(
                res.data.children
            )
        });
    }, [path]);

    const recursion = children.map((item: nodeData) => {
        if (item.children) {
            return (
                <Folder 
                 key={item.path}
                 name={item.name} 
                 path={item.path}
                >
                    <TreeRecursive path={item.path} />
                </Folder>
            )
        } else {
            return <File key={item.path} name={item.name} path={item.path}/>;
        }
    })

    return (
        <>
            {recursion}
        </>
    )

};