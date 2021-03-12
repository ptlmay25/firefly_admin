import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'

import classes from './BusinessEntryForm.module.css'

const ImageUpload = (props) => {
    const [ file, setFile ] = useState()
    const [ previewUrl, setPreviewUrl ] = useState()
    const filePickerRef = useRef()

    useEffect(() => {
        if(!file)
            return
        const fileReader = new FileReader()
        fileReader.onload = () => setPreviewUrl(fileReader.result)
        fileReader.readAsDataURL(file)    
    }, [file])

    const pickedHandler = event => {
        let pickedFile
        if(event.target.files || event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
        }
        props.onChange(pickedFile)
    }

    const pickImageHandler = () => {
        filePickerRef.current.click()
    }
    
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>Business Image</h5>
                <input 
                    ref={ filePickerRef } 
                    type="file" 
                    onChange={ pickedHandler } 
                    accept="image/*" 
                    style={{ display: 'none' }} />
                
                <Button style={{ width: '150px', marginTop: '-10px' }} onClick={ () => pickImageHandler() }>
                    Upload
                </Button>
            </div>
            <div className={ classes.PreviewImage }>
                { previewUrl ? <img src={ previewUrl } alt="" width="395px" height="295px"/> : null }
            </div>
        </>
    )
}

export default ImageUpload
