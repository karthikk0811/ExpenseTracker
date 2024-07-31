import {useEffect,useState} from 'react'

export default function useWindowSize() {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener('resize', updateSize)

        return () => window.removeEventListener('resize', updateSize)
    }, [])

    return {
        width: size[0],
        height: size[1]
    };
}
