import React from "react";
import {View, StyleSheet, Text, FlatList, SafeAreaView} from 'react-native';
import { fontSizes, Spacing } from "./Sizes";
import { RoundedButton } from "./roundedButton";
export const FocusHistory = ({ focusHistory, onClear})=>{
    const clearHistory=()=>{
        onClear();
    }
    const HistoryItem=({item, index})=>{
        return(
            <Text style={styles.historyItem(item.status)}>
                {JSON.stringify(item.subject)}
            </Text>
        )
    }
    return(
        <SafeAreaView style={{flex:1, alignItems:'center' }}>
            
            {!!focusHistory.length &&(<View>
                <Text style={styles.title}>
                things we've focused on :
            </Text>
            <FlatList
            style={{flex:1}}
            contentContainerStyle={{flex:1, alignItems:'center'}}
            data={focusHistory}
            renderItem={HistoryItem}
            />
            <View style={styles.clear}>
                <RoundedButton 
                size={70}
                title="Clear"
                onPress={()=>onClear()}
                />
        </View>
            </View>)}
        </SafeAreaView>
        
    );
}
const styles=StyleSheet.create({
    historyItem:(Status) =>({
        color:Status>1?'red':'green',
        fontSize:fontSizes.md
    }),
    title:{
        color:'white',
        fontSize:fontSizes.md
    },
    clear:{
        alignItems:'center',
        padding:Spacing.md
    },
})