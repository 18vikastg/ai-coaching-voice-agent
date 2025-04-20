import React from 'react'
import FeatureAssistants from './_components/FeatureAssistants'
import History from './_components/History'
import Feedback from './_components/Feedback'
import PaymentSuccessHandler from './_components/PaymentSuccessHandler';

function Dashboard() {
    return (
        <div>
            <FeatureAssistants />
            <PaymentSuccessHandler />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-20'>
                <History />
                <Feedback />
            </div>
        </div>
    )
}

export default Dashboard