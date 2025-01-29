import { useState, useEffect } from "react";
import axios from "axios"



const useFetchData = (url)=>{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                setLoading(true);
                const response = await axios.get(url);
                setData(response.data);

            }catch(err){
                setError(err.message);
            }
        finally{
            setLoading(false);

        }

        };
        fetchData()
    }, [url])
    




    return {
        data, loading, error
    }
}
export default useFetchData;
