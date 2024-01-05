import {React,useState,useEffect} from 'react'
import { FaWifi } from "react-icons/fa";
import { CiWifiOff } from "react-icons/ci";

function OnlineStatus() {
    const [isOnline, setIsOnline] = useState(true)
    useEffect(()=>{
        function handleOnlineStatus(){
            setIsOnline(true)
        }
        function handleOfflineStatus(){
            setIsOnline(false)
        }

        window.addEventListener("online", handleOnlineStatus)
        window.addEventListener("offline", handleOfflineStatus)
        return () =>{
            window.removeEventListener("online", handleOnlineStatus)
            window.removeEventListener("offline", handleOfflineStatus)
        }
    },[])
  return (
    <>
        {isOnline === true ?
        <div>
            <FaWifi />
        </div>
        :
        <div>
            <CiWifiOff />
            
        </div>    
    }
    </>
  )
}

export default OnlineStatus;