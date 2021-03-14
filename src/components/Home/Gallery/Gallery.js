import React from 'react'
import { Container, Row } from 'react-bootstrap'

import classes from './Gallery.module.css'

import Item from './Item/Item'

import fashion from '../../../assets/images/Gallery/fashion.png'
import footwear from '../../../assets/images/Gallery/footwear.png'
import grocery from '../../../assets/images/Gallery/grocery.png'
import homeDecor from '../../../assets/images/Gallery/home_decor.png'
import jewellery from '../../../assets/images/Gallery/jewellery.png'
import skinCare from '../../../assets/images/Gallery/skin_care.png'

const Gallery = () => {
    return (
        <Container fluid className={ classes.Gallery }>
            <h3 style={{ textAlign: 'center' }}>Top Wholesale Categories</h3>
            <Row className={ classes.GalleryItems }>
                <Item image={ fashion } alt="Fashion" />
                <Item image={ grocery } alt="Grocery" />
                <Item image={ footwear } alt="Footwear" />
                <Item image={ homeDecor } alt="Home Decor" />
                <Item image={ skinCare } alt="Skin Care" />
                <Item image={ jewellery } alt="Jewellery" />
            </Row>
        </Container>
    )
}

export default Gallery
