import React, {useEffect, useState} from 'react'

function LoadingFetch() {
    const [detik, setDetik] = useState(0)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDetik(detik => detik + 1);
            // console.log('LoadingFetch')
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <>
            Loading... [{detik}s]
        </>
    )
}

export default LoadingFetch