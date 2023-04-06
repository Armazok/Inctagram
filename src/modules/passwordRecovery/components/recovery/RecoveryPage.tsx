import React from 'react';
import {useQuery} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import Preloader from '@/components/atoms/preloader/Preloader';
import {authAPI} from '@/services/api/auth/authAPI';
import RegistrationEmailResending from '@/modules/registration-email-resending';
import {useRecoveryEmailResending} from '@/services/api/auth/hoook';
import {useUserStore} from '@/store';
import {CreateNewPasswordPage} from '@/modules/passwordRecovery/components/createNewPassword/CreateNewPasswordPage';
import {noRefetch} from '@/helpers/no-refetch';


export const RecoveryPage = () => {
    const {email} = useUserStore();
    console.log(email);
    const router = useRouter();

    const recoveryCode = router.query && router.query.code as string;


    const {isError, status, isSuccess, data} = useQuery({
            queryKey: ['recovery'],
            queryFn: async () => {
                const response = await authAPI.checkRecoveryCode({recoveryCode})
                return response.data
            },
            enabled: !!recoveryCode,
            retry: false,
            ...noRefetch
        }
    )

    const {mutate, isLoading} = useRecoveryEmailResending(email);

    const onResendClick = async () => {
        await mutate()
        router.push('/')
    }

    debugger
    if (isLoading || status === 'loading') return <Preloader/>
    if (isError) return <RegistrationEmailResending callback={onResendClick}/>
    if (isSuccess) return <CreateNewPasswordPage recoveryCode={recoveryCode}/>

    return (
        <div/>
    );
};
