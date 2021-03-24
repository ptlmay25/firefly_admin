import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import classes from './ImageUpdate.module.css'

const ImageUpdate = (props) => {
    const [ file, setFile ] = useState()
    const [ previewUrl, setPreviewUrl ] = useState()
    const [ imageChanged, setImageChanged ] = useState(false)
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
            setImageChanged(true)
        }
        props.onChange(pickedFile)
    }

    const pickImageHandler = () => {
        filePickerRef.current.click()
    }
    
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '400px' }}>
                <h5>{ props.title }</h5>
                <input 
                    ref={ filePickerRef } 
                    type="file" 
                    onChange={ pickedHandler } 
                    accept="image/*" 
                    style={{ display: 'none' }} />
                
                <Button 
                    style={{ width: '150px', marginTop: '-10px' }} 
                    onClick={ () => pickImageHandler() }
                    disabled={ props.imageSaved } >
                        Select Image
                </Button>
            </div>
            <div className={ classes.PreviewImage }>
               <img src={ !imageChanged ? props.imageURL : previewUrl } alt="" width="395px" height="295px"/>
            </div>
            <div className={ classes.UploadContainer }>
                {
                    props.imageSaved 
                        ?   <p style={{ fontSize: '16px', color: 'green', textDecoration: 'underline' }}>New image uploaded successfully!</p>
                        :   <Button 
                                variant="dark"
                                style={{ width: '200px', marginTop: '10px' }} 
                                disabled={ !imageChanged } 
                                onClick = {(e) => props.uploadImage(e)} >
                                    Upload Image
                            </Button>   
                }
            </div>
        </>
    )
}

export default ImageUpdate
