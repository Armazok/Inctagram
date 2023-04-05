import React from 'react';
import Image from 'next/image'
import preloader from '../../../assets/gif/loadingGrey.gif';

const Preloader = () => {
    console.log(preloader)
    return (
        <div className={'flex flex-col items-center justify-center content-center'}>
            <Image style={{width: '100px'}} src={preloader} alt={'preloader'}/>
        </div>
    );
};


export default Preloader;