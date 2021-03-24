import React, { Component } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import CustomCard from '../../../components/HotelList/Card/CustomCard'

import NavigationBar from '../../../components/Navigation/NavigationBar'
import Search from '../../../components/Shared/Search/Search'
import classes from './BusinessList.module.css'
import { showErrorModal } from '../../../resources/Utilities'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner/LoadingSpinner'

import axios from 'axios'
import { apiContext } from '../../../resources/api-context'

export class BusinessList extends Component {
    state = {
        businessData: '',
        dataSource: '',
        isLoading: true
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        console.log(this.props.location.state)
        axios.get(apiContext.baseURL + '/brand')
            .then((response) => {
                const newData = response.data.data.map(element => {
                    return {
                        ...element,
                        key: element._id
                    }
                }) 
                this.setState({ isLoading: false, businessData: newData, dataSource: newData })
            })
            .catch((error) => {
                showErrorModal(error.message)
                this.setState({ isLoading: false })
            })
    }

    onSearch = e => {
        this.setState({ dataSource: this.state.businessData.filter( entry =>  entry.brandName.includes(e.target.value) ) })
    }

    onClick = id => {
        this.props.history.push(`./business/update/${ id }`, id)
    }


    render() {
        return (
            <>
                <NavigationBar />
                { 
                    this.state.isLoading 
                        ?   <LoadingSpinner />
                        :   <>
                                <div className={ classes.InfoContainer }>
                                    <div className={ classes.InfoContainer1 }>
                                        <h5><u> Business List: </u></h5>
                                        <Button 
                                            variant="success" 
                                            className={ classes.Button }
                                            onClick={() => this.props.history.push('./business/add')}>
                                            + Add
                                        </Button>
                                    </div>
                                    <Search placeholder="Search Brand" onSearch={ this.onSearch } className={ classes.Search }/>
                                </div>
                                <Container className={ classes.ListContainer } fluid style={{ padding: '20px 100px' }}>
                                    <Row>
                                        {
                                            this.state.dataSource.map((element) => (
                                                <CustomCard 
                                                    brand={ element.brandName }
                                                    key={ element.key }
                                                    alt={ element.brandName }
                                                    products={ element.noOfProduct }
                                                    brandImg={ element.brandImg }
                                                    onClick={ () => this.onClick(element._id) }
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
}

export default BusinessList

