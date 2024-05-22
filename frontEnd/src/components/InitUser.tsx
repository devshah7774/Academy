import {useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/userState";
import axios from "axios";
import {BASE_URL} from "../config.js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { location } from "../store/atoms/location";

function InitUser(){
    const setUser = useSetRecoilState(userState);
    const init = async()=>{
        try{
            const response = await axios.get(`${BASE_URL}/me`,{
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("AcaToken")
                }
            });
            
            if(response.data.username){
                setUser({
                    userRole: response.data.role,
                    isLoading: false,
                    userEmail: response.data.username,
                    name: response.data.name
                });
            } else {
                setUser({
                    userRole: "",
                    isLoading: false,
                    userEmail: null,
                    name:""
                });
            }
        } catch(e){
            setUser({
                userRole:"",
                isLoading: false,
                userEmail: null,
                name:""
            });
            return<></>
        }
    };

    const loca = useLocation();
    const setlocn = useSetRecoilState(location);

    useEffect(()=>{
        init();
        setlocn(loca);
    }, [loca]);
    
    return<></>
}

export default InitUser;