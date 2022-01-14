import React,{useState} from 'react';
import {View, Text, StyleSheet,Alert} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import {Colors} from './Color';
import { fontSizes,Spacing } from "./Sizes";
import { RoundedButton } from './roundedButton';
export const Focus = ({ addSubject }) => {
    const [subject, setSubject] = useState(null);
    return(
        <View >
            <Text style={styles.title}> what would you like to focus on ?</Text>
            <View style={styles.textInput}>
      <TextInput style={{flex:1,marginRight:Spacing.md}}
      
      label="work"
      onSubmitEditing={({ nativeEvent }) => {
        setSubject(nativeEvent.text);
      }}
      />
      <RoundedButton  title="+"
      size={Spacing.xxxl}
      onPress={() => {
        addSubject(subject);
      }}/>
        
      </View>
      
        </View>
    );
};

const styles = StyleSheet.create(
   { title:{
    fontWeight:'bold',
    fontSize:fontSizes.md,
    color:Colors.white,
    },
    textInput:{
        flexDirection:'row',
        marginHorizontal:Spacing.md,
        color:Colors.white,
        
      },
});
  