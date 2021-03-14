import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import CustomCard from '../../components/HotelList/Card/CustomCard'

import NavigationBar from '../../components/Navigation/NavigationBar'
import Search from '../../components/Shared/Search/Search'
import classes from './BusinessList.module.css'
import { useHttpClient } from '../../resources/http-hook'
import { showErrorModal } from '../../resources/Utilities'
import { apiContext } from '../../resources/api-context'
import LoadingSpinner from '../../components/Shared/LoadingSpinner/LoadingSpinner'


const BusinessList = (props) => {

    const [ businessData, setBusinessData ] = useState([])
    const [ dataSource, setDataSource ] = useState([])
    const { isLoading, sendRequest } = useHttpClient()
    

    useEffect(() => {
        const fetchData = () => {
            sendRequest('/brand')
                .then((response) => {
                    setBusinessData(response.data)
                    setDataSource(response.data)
                })
                .catch((error) => showErrorModal(error.message))
        }
        fetchData()
    }, [sendRequest])

    const onSearch = e => {
        setDataSource(businessData.filter( entry =>  entry.brandName.includes(e.target.value) ))
    }

    return (
        <>
            <NavigationBar />
            { 
                isLoading 
                    ?   <LoadingSpinner />
                    :   <>
                            <div className={ classes.InfoContainer }>
                                <div className={ classes.InfoContainer1 }>
                                    <h5><u> Business List: </u></h5>
                                    <Button 
                                        variant="success" 
                                        className={ classes.Button }
                                        onClick={() => props.history.push('./business/add')}>
                                        + Add
                                    </Button>
                                </div>
                                <Search placeholder="Search By Name" onSearch={ onSearch } className={ classes.Search }/>
                            </div>
                            <Container className={ classes.ListContainer } fluid style={{ padding: '20px 100px' }}>
                                <Row>
                                    {
                                        dataSource.map((element) => (
                                            <CustomCard 
                                                brand={ element.brandName }
                                                alt={ element.brandName }
                                                products={ element.noOfProduct }
                                                brandImg={ apiContext.assetURL + element.brandImg }
                                            />
                                        ))
                                    }
                                </Row>
                            </Container>
                        </>
            }
            
        </>
    )
}

export default BusinessList
