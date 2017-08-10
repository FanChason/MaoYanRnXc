import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image
} from 'react-native';

// import {
//     AppRegistry,
//     StyleSheet,
//     View,
//     Text,
//     TouchableOpacity,
//     ToastAndroid,
//     Image,
//     ListView,
// } from 'react-native';

import HomeCell from './HomeCell'
import api, { moviesListWithParameter } from '../../api'

Dimensions = require('Dimensions');
width = Dimensions.get('window').width;
height = Dimensions.get('window').height;

export default class HomeScene extends Component {
    /*
  }
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
  */

    /*
        render() {
        return (
          /*<View style={styles.container}>*/

    /*
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
    */

    /**
     * 初始化数据
     */
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: ((row1, row2) => row1 !== row2)
            }),
            load: false
        }
    }

    /**
     * 渲染界面
     */
    render() {
        /**
         * 因为数据时异步加载， 用load判断是否正在加载 如果加载完毕重新刷新界面改变load值
         */
        // if (!this.state.load) {
        //     return <Text>加载中...</Text>
        // }

        return (this.renderView(this.state.dataSource))
    }


    renderView() {
        return (
            <ListView
                showsVerticalScrollIndicator={false}
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                    <HomeCell
                        info={rowData}
                        onPress={() => this.props.navigation.navigate('MovieDetail', { info: rowData })}
                    />
                }
            />
        )
    }

    // /**
    //  * 重写renderRow
    //  */
    // renderRow(rowData) {
    //     return (
    //         <View style={{ flex: 1 }}>
    //           <Image source={{ uri: rowData.url }}
    //                  style={{ width: width, height: height / 2, marginTop: 5 }}
    //           />
    //
    //         </View>
    //     )
    // }


    /**
     * 加载耗时操作
     */
    componentDidMount() {
        this.getDataFromFetch();
    }

    getDataFromFetch() {

        fetch(moviesListWithParameter('hot', 0, 20))//请求地址
            .then((response) => response.json())//取数据
            .then((responseText) => {//处理数据
                //通过setState()方法重新渲染界面
                this.setState({
                    //改变加载ListView
                    load: true,
                    //设置数据源刷新界面
                    dataSource: this.state.dataSource.cloneWithRows(responseText.data.movies),
                })

            })
            .catch((error) => {
                console.warn(error);
            }).done();
    }


}
