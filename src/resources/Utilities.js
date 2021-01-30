import { Button } from 'antd'

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
        return <Button>Previous</Button>;
    }
    if (type === 'next') {
        return <Button>Next</Button>;
    }
    return originalElement;
} 

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}
