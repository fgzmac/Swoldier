import React from 'react';
import {Text as NativeText, type TextProps} from 'react-native';

export const midnight = {
  background:'#1B1F2D', surface:'#273246', primary:'#245BCD', selected:'#8BBBFF',
  text:'#F1F4FA', muted:'#B4C1D3', divider:'#3A4961',
};
export function Text({style,...props}:TextProps){
  return <NativeText {...props} style={[{color:midnight.text},style]}/>;
}
