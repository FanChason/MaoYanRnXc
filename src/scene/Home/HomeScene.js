import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

import HomeCell from './HomeCell'

export default class HomeScene extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {imageUrl:'../../img/zhanlang.png',title:"战狼2-0",subtitle:"1111111111", price:"39"},
        {imageUrl:'../../img/zhanlang.png',title:"战狼2-1",subtitle:"1111111111", price:"39"},
        {imageUrl:'../../img/zhanlang.png',title:"战狼2-2",subtitle:"1111111111", price:"39"},
        {imageUrl:'../../img/zhanlang.png',title:"战狼2-1",subtitle:"1111111111", price:"39"},
        {imageUrl:'../../img/zhanlang.png',title:"战狼2-1",subtitle:"1111111111", price:"39"},
        {imageUrl:'../../img/zhanlang.png',title:"战狼2-1",subtitle:"1111111111", price:"39"},
        {imageUrl:'../../img/zhanlang.png',title:"战狼2-1",subtitle:"1111111111", price:"39"},
        {imageUrl:'../../img/zhanlang.png',title:"战狼2-1",subtitle:"1111111111", price:"39"},
        {imageUrl:'../../img/zhanlang.png',title:"战狼2-1",subtitle:"1111111111", price:"39"},
        {imageUrl:'../../img/zhanlang.png',title:"战狼2-1",subtitle:"1111111111", price:"39"}
        ])
    };
  }

  render() {
    return (
      /*<View style={styles.container}>*/
        <View>

        <ListView
          showsVerticalScrollIndicator={false}
          dataSource={this.state.dataSource}
          // renderRow={(rowData,rowId) => <CellView source={{uri:rowData.logo}} rowD={rowData.name} />}
          renderRow={(rowData) =>
              <HomeCell
                  info={rowData}
              />
          }
        />


      </View>
    );
  }
}
