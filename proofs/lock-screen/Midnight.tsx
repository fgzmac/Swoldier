import React from 'react';
import {Image, Pressable, Text as NativeText, type TextProps, type ButtonProps} from 'react-native';

export const midnight = {
  background:'#1B1F2D', surface:'#273246', primary:'#245BCD', selected:'#8BBBFF',
  text:'#F1F4FA', muted:'#B4C1D3', divider:'#3A4961',
};
export function Text({style,...props}:TextProps){
  return <NativeText {...props} style={[{color:midnight.text},style]}/>;
}

// Raster exports of the approved Midnight reference symbols.
const icons = {
  workout: require('./assets/midnight/today.png'),
  routines: require('./assets/midnight/routines.png'),
  week: require('./assets/midnight/cal.png'),
  right: require('./assets/midnight/right.png'),
  water: require('./assets/midnight/drop.png'),
  supplements: require('./assets/midnight/pill.png'),
};
export const calendarArt = require('./assets/midnight/calendar-planner.png');
export const journalArt = require('./assets/midnight/training-journal.png');
export const benchArt = require('./assets/midnight/bench.png');

export function Icon({name, color = midnight.selected, size = 20}: {
  name: keyof typeof icons; color?: string; size?: number;
}) {
  return <Image accessible={false} source={icons[name]} resizeMode="contain"
    style={{width:size,height:size,tintColor:color}}/>;
}

export function Control({title, onPress, disabled, accessibilityLabel, primary = false, pill = false}: ButtonProps & {primary?:boolean;pill?:boolean}) {
  return <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel ?? title}
    accessibilityState={{disabled:!!disabled}} disabled={disabled} onPress={onPress}
    style={({pressed})=>({minHeight:44,minWidth:44,maxWidth:'100%',paddingHorizontal:12,
      alignItems:'center',justifyContent:'center',borderRadius:pill?22:10,opacity:disabled?0.5:1,
      backgroundColor:primary?midnight.primary:pressed?midnight.divider:pill?'#25324A':'#34435B'})}>
    <Text style={{color:primary?midnight.text:midnight.selected,fontWeight:'700',textAlign:'center'}}>{title}</Text>
  </Pressable>;
}
