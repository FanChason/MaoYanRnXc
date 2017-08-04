/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { PureComponent } from 'react'
 import { AppRegistry } from 'react-native'

 import RootScene from './src/RootScene';

 export default class MeiTuan extends PureComponent {
     render() {
         return (
             <RootScene />
         );
     }
 }

 AppRegistry.registerComponent('MaoYanRnXc', () => MeiTuan);
