import React, { useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { Input } from 'antd'

import NavigationBar from '../../components/Navigation/NavigationBar'
import InputDiv from '../../components/TokenPrice/InputDiv/InputDiv'
import classes from './TokenPrice.module.css'
import CustomTable from '../../components/Shared/CustomTable/CustomTable'
import columns from '../../resources/TableColumns'

const TokenPrice = () => {
    const [ allowUpdate, setAllowUpdate ] = useState(false)
    const [ isOtpSent, setIsOtpSent ] = useState(false)
    return (
        <>
            <NavigationBar />
            <div className={ classes.FormContainer }>
                <h6><u>Dividend Calculation</u></h6>
                <Container fluid style={{ marginTop: '40px' }}>
                    <Row>
                        <Col md={5}>
                            <InputDiv label="Month + Year" type="month" />
                            <InputDiv label="Date" type="date" />
                            <InputDiv label="Total Revenue" type="number" />
                            <InputDiv label="Operating Expenses" type="number" />
                            <InputDiv label="Interest and tax" type="number" />
                            <InputDiv label="15% Service fee" type="number" />
                        </Col>
                        <Col md={1}></Col>
                        <Col md={5}>
                            <InputDiv label="Net Profit" type="number" />
                            <InputDiv label="Total Outstanding tokens" type="number" />
                            <div style={{ padding: '40px 50px 0' }}>
                                <Table borderless size="sm">
                                    <tbody>
                                        <tr>
                                            <td style={{ fontWeight: '500' }}>Date: </td>
                                            <td style={{ fontWeight: '500' }}>05/01/21</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: '500' }}>Last Dividend: </td>
                                            <td style={{ fontWeight: '500' }}>$250.20</td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: '500' }}>Today's Dividend per token: </td>
                                            <td style={{ fontWeight: '500' }}>$250.20</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div style={{ padding: '20px 70px' }}>
                                <Button variant="primary" style={{ width: '150px' }}>Calculate</Button>
                                <Button variant="success" style={{ width: '150px' }} disabled={ !allowUpdate }>Update</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={ classes.TableContainer }>
                <h6>Dividend History</h6>
                <CustomTable columns={ columns.DIVIDEND_HISTORY } data={ null } />
            </div>
            
            <Container as="div" className={ classes.LoginContainer }>
                <h6>Confirm your ID to update Token price</h6>
                <Input maxLength="10" minLength="10" placeholder="Admin Phone Number" className={ classes.Input } style={{ width: '350px', marginTop: '40px' }}/>
                {
                    !isOtpSent 
                        ?   <Button variant="success" onClick={() => setIsOtpSent(true)} className={ classes.OTP }>Get OTP</Button> 
                        :   <>
                                <Input.Password placeholder="OTP" style={{ width: '350px', marginTop: '15px' }} />
                                <div>
                                    <Button variant="success" className={ classes.LoginButton }>Update</Button>
                                    <Button variant="danger" className={ classes.LoginButton } onClick={() => setIsOtpSent(false)}>Cancel</Button>    
                                </div>  
                            </>
                }
            </Container>
            <br />
            <br />
        </>
    )
}

export default TokenPrice
