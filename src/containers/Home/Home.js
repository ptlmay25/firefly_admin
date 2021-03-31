import React, { useState, useEffect } from 'react'

import { Modal } from 'antd'

import AppLink from '../../components/Home/AppLink/AppLink';
import Benifits from '../../components/Home/Benifits/Benifits';
import Footer from '../../components/Home/Footer/Footer';
import Gallery from '../../components/Home/Gallery/Gallery';
import Header from '../../components/Home/Header/Header';
import Stats from '../../components/Home/Stats/Stats';
import ModalContent from './ModalContent/ModalContent';

const Home = (props) => {

    const [ isModalOpen , setIsModalOpen ] = useState(false)

    useEffect(() => {
        if(sessionStorage.getItem('onLogout')) {
            sessionStorage.setItem('onLogout', null)
            props.history.push('/admin2050')
        }      
    }, [props.history])

    return (
        <div>
            <Header />
            <Benifits />
            <Stats />
            <Gallery />
            <AppLink />
            <Footer id="footer" openModal={ () => setIsModalOpen(true) } />

            <Modal
                visible={ isModalOpen }
                footer={ null }
                onCancel={() => setIsModalOpen(false) }
                width={ 700 }>
                    <ModalContent />
            </Modal>
        </div>
    )
}

export default Home
