import React from 'react'
import Head from 'next/head'
import {RecoveryPage} from '@/modules'

const PageRecovery = () => {
    return (
        <div>
            <Head>
                <title>Password recovery</title>
            </Head>
            <RecoveryPage />
        </div>
    )
}

export default PageRecovery
