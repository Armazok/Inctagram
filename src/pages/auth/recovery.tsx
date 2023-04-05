import React from 'react';
import { useQuery } from '@tanstack/react-query'
import {useRouter} from 'next/router'
import Preloader from '@/components/atoms/preloader/Preloader';
import {authAPI} from '@/services/api/auth/authAPI';
import CreateNewPassword from '@/pages/auth/create-new-password';

const Recovery = () => {
    const router = useRouter();

    const recoveryCode = router.query && router.query.code

    const {isError, isLoading, isSuccess, data } = useQuery({
            queryKey: 'recovery',

            queryFn: () => {
                authAPI.checkRecoveryCode({recoveryCode})
            },
        enabled: !!recoveryCode,
            retry: false
        }
    )
   if (isLoading) return <Preloader />
   if (isError) return <div>error</div>
   if (isSuccess) return <CreateNewPassword recoveryCode={recoveryCode}/>

    return (
        <div/>
    );
};

export default Recovery;