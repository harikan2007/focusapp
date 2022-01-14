import React,{useState} from "react";
import {View, StyleSheet,Text,Vibration,Platform} from 'react-native';
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import {Colors} from './Color';
import { fontSizes, Spacing } from "./Sizes";
import {Countdown} from './Countdown';
import { RoundedButton } from "./roundedButton";
import { Timing } from "./Timing";

export const Timer=({focusSubject, onTimerEnd,clearSubject})=>{
    useKeepAwake();
    const[minutes, setMinutes] = useState(0.1);
    const [isStarted,setIsStarted]=useState(false);
    const [progress,setProgress]=useState(1);

    const changeTime = (min) =>{
        setMinutes(min);
        setProgress(1);
        setIsStarted(false);
    };
    const onProgress =(progress)=>{
        setProgress(progress);
    };
    const onEnd = ()=>{
        setMinutes(1);
        setProgress(1);
        setIsStarted(false);
        vibrate();
        onTimerEnd();

    };
    const vibrate=()=>{
        if(Platform.OS === 'ios'){
            const interval = setInterval(() => Vibration.vibrate(),1000)
            setTimeout(()=> clearInterval(interval),10000);
        } else{
            Vibration.vibrate(50000);
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.countdown}>
            <Countdown 
            minutes={minutes} 
            isPaused={!isStarted} 
            onProgress={ onProgress}
            onEnd={onEnd}
            />
            </View>
            <View>
                <Text style={styles.title}> focusing on:</Text>
                <Text style={styles.task}> {focusSubject}</Text>
            </View>
            <View style={{paddingTop:Spacing.sm}}>
            <ProgressBar 
            progress={progress}
            color='#5E84E2'
            style={{height:10}}
            /> 
            </View>
            <View style={styles.buttuonwrapper}>
            <Timing onChangeTime={changeTime}/>
            </View>
            <View style={styles.buttuonwrapper}>
            {isStarted?(
            <RoundedButton title="pause"  onPress={() => setIsStarted(false)}/>
            ):(
            <RoundedButton title="start"  onPress={() => setIsStarted(true)}/>
            )}
            </View>
                <View style={styles.clearSubject}>
                <RoundedButton
                title="clear" 
                size={75} 
                onPress={() => clearSubject()}
                />
                </View>
        </View>)
}

const styles=StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
    
    },
    title:{
        color:Colors.white,
        textAlign:'center',
    },
    task:{
        color:Colors.white,
        textAlign:'center',
        fontWeight:'bold',

    },
    countdown:{
        flex:0.5,
        alignItems:'center',
        justifyContent:'center',

    },
    buttuonwrapper:{
        flex:0.3,
        padding:Spacing.md,
        justifyContent:'center',
        alignItems:'center'
    },
    clearSubject:{
        paddingBottom:Spacing.md,
        
        justifyContent:'center',
        alignItems:'center'
    },
})