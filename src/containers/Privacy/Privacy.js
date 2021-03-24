import React from 'react'

import Section from '../../components/Home/Shared/Section/Section'

import classes from './Privacy.module.css'
import PrivacySheet from './PrivacySheet'
import Back from '../../components/Shared/Back/Back'

const Privacy = () => {
    return (
        <>
            <Back link="/" text="Home" />        
            <div className={ classes.Privacy }>
                <h4 style={{ marginBottom: '30px' }}>Privacy Policy</h4>
                <p>[MOBILE APP]</p>
                <p>Last updated [8/24/2020]</p>
                <p>[Saler’s club] (“we” or “us” or “our”) respects the privacy of our users (“user” or “you”). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our mobile application (the “Application”). Please read this Privacy Policy carefully. IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS THE APPLICATION.</p>
                <p>We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Application after the date such revised Privacy Policy is posted. </p>
                <p style={{ marginBottom: '30px' }}>This Privacy Policy does not apply to the third-party online/mobile store from which you install the Application or make payments, including any in-game virtual items, which may also collect and use data about you. We are not responsible for any of the data collected by any such third party.</p>

                {
                    PrivacySheet.map(element => 
                        <Section title={ element.title } content={ element.content } />    
                    )
                }
                
            </div>

        </>
    )
}

export default Privacy
