import React,{useState,useEffect} from "react";
import {Text, StyleSheet,View} from 'react-native';
import { fontSizes, Spacing } from "./Sizes";
import {Colors} from './Color';


const minutesToMillis =(min )=>min* 1000*60;
const formatTime=(time)=>time<10?`0${time}` : time;
     

export const Countdown =({
  minutes=1,
  isPaused,
  onProgress,
  onEnd
}) => {
    const interval =React.useRef(null);
    const countDown=()=>{
        setMillis((time)=>{
            if(time===0){
                clearInterval(interval.current);
                onEnd();
                return time;
            }
            const timeLeft = time - 1000;
            onProgress(timeLeft/minutesToMillis(minutes))
            return timeLeft;
        })
    }

    const [millis,setMillis]=useState(null);
    useEffect(()=>{setMillis(minutesToMillis(minutes))},[minutes])
    
    useEffect(()=>{
        if(isPaused){
            if(interval.current) clearInterval(interval.current);
            return;
        }
        interval.current=setInterval(countDown,1000);

        return () => clearInterval(interval.current)
    },[isPaused])


    const minute = Math.floor(millis/1000/60)%60;
    const seconds= Math.floor(millis/1000)%60;
    return(
        <View>
            <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
        </View>)
}

const styles = StyleSheet.create({
    text:{
        
        fontSize:fontSizes.xxl,
        fontWeight:'bold',
        color:Colors.white,
        padding:Spacing.lg,
        backgroundColor:'rgba(94, 132, 226, 0.3)'


    },
})