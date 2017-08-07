

//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, ListView, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'

import { Heading1, Heading2, Paragraph } from '../../widget/Text'
import { screen, system, tool } from '../../common'
import api from '../../api'
import { color, DetailCell, RefreshListView, RefreshState, SpacingView } from '../../widget'

import MovieMenuItem from './MovieMenuItem'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'

// create a component
class MovieScene extends PureComponent {

    listView: ListView

    state: {
        dataSource: ListView.DataSource
    }

    static navigationOptions = ({ navigation }) => ({
        title: '电影',
        headerStyle: { backgroundColor: 'white' },
    })

    constructor(props: Object) {
        super(props)

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state = {
            dataSource: ds.cloneWithRows([]),
        }
    }

    componentDidMount() {
        this.listView.startHeaderRefreshing();
    }

    async requestData() {
        try {
          console.log('开始请求');

            let response = await fetch(api.recommend)
            let json = await response.json()

            // console.log('请求返回数据：' + JSON.stringify(json));

            let dataList = json.data.map((info) => {
                return {
                    id: info.id,
                    imageUrl: info.squareimgurl,
                    title: info.mname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                }
            })

            // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
            dataList.sort(() => { return 0.5 - Math.random() })

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(dataList)
            })
            setTimeout(() => {
                this.listView.endRefreshing(RefreshState.NoMoreData)
            }, 500)
        } catch (error) {
            this.listView.endRefreshing(RefreshState.Failure)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    ref={(e) => this.listView = e}
                    dataSource={this.state.dataSource}
                    renderHeader={() => this.renderHeader()}
                    renderRow={(rowData) =>
                        <GroupPurchaseCell
                            info={rowData}
                            onPress={() => {
                                StatusBar.setBarStyle('default', false)
                                this.props.navigation.navigate('GroupPurchase', { info: rowData })
                            }}
                        />
                    }
                    onHeaderRefresh={() => this.requestData()}
                />
            </View>
        );
    }


    renderHeader() {
        return (
            <View style={styles.container}>
                <DetailCell title='我的订单' subtitle='全部订单' style={{ height: 38 }} />

                <View style={styles.itemContainer}>
                    <MovieMenuItem title='待付款' icon={require('../../img/Order/order_tab_need_pay.png')} />
                    <MovieMenuItem title='待使用' icon={require('../../img/Order/order_tab_need_use.png')} />
                    <MovieMenuItem title='待评价' icon={require('../../img/Order/order_tab_need_review.png')} />
                    <MovieMenuItem title='退款/售后' icon={require('../../img/Order/order_tab_needoffer_aftersale.png')} />
                </View>

                <SpacingView />

                <DetailCell title='我的收藏' subtitle='查看全部' style={{ height: 38 }} />
            </View>
        )
    }


}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
    },
});

//make this component available to the app
export default MovieScene;
