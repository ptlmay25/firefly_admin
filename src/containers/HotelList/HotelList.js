import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import CustomCard from '../../components/HotelList/Card/CustomCard'

import NavigationBar from '../../components/Navigation/NavigationBar'
import Search from '../../components/Shared/Search/Search'
import classes from './HotelList.module.css'
import { useHttpClient } from '../../resources/http-hook'
import { showErrorModal } from '../../resources/Utilities'

const HotelList = (props) => {

    const [ hotelData, setHotelData ] = useState([])
    // eslint-disable-next-line
    const [ dataSource, setDataSource ] = useState([])
    // eslint-disable-next-line
    const { isLoading, sendRequest } = useHttpClient()
    

    useEffect(() => {
        const fetchData = () => {
            sendRequest('/hotels')
                .then((response) => {
                    setHotelData(response.data)
                })
                .catch((error) => showErrorModal(error.message))
        }
        fetchData()
    }, [sendRequest])

    const onSearch = e => {
        setDataSource(hotelData.filter( entry =>  entry.city.includes(e.target.value) ))
    }

    return (
        <>
            <NavigationBar />
            <div className={ classes.InfoContainer }>
                <div className={ classes.InfoContainer1 }>
                    <h5><u> Hotel List: </u></h5>
                    <Button 
                        variant="success" 
                        className={ classes.Button }
                        onClick={() => props.history.push('./hotels/add')}>
                        + Add
                    </Button>
                </div>
                <Search placeholder="Search By City" onSearch={ onSearch } className={ classes.Search }/>
            </div>
            <Container className={ classes.ListContainer } fluid style={{ padding: '20px 100px' }}>
                <Row>
                    {
                        hotelData.map((element) => (
                            <CustomCard 
                                city={element.city}
                                rooms={element.rooms}
                                src={element.imageURL}
                                />
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default HotelList
