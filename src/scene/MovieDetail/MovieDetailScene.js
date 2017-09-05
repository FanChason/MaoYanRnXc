

//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, InteractionManager } from 'react-native'
import { color, Button, NavigationItem, RefreshListView, RefreshState, Separator, SpacingView } from '../../widget'
import { Heading1, Heading2, Paragraph, HeadingBig } from '../../widget/Text'
import { screen, system, tool } from '../../common'
import api, { movieDetailWithId } from '../../api'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'

// create a component
class MovieDetailScene extends PureComponent {

    render() {
        return <Text>dfsdfgsdf</Text>
    }

    listView: ListView

    state: {
        info: Object,
        dataSource: ListView.DataSource
    }

    static navigationOptions = ({ navigation }) => ({
        title: '电影详情',
        headerStyle: { backgroundColor: 'gray' },
    })

    constructor(props: Object) {
          super(props);

          let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

          this.state = {
              info: {},
              dataSource: ds.cloneWithRows([]),
          }
      }
    componentDidMount() {
        this.requestData();
        // InteractionManager.runAfterInteractions(() => {
        //     this.listView.startHeaderRefreshing();
        // });
    }


    render() {
        return (

            <View style={styles.container}>

                <RefreshListView
                    ref={(e) => this.listView = e}
                    dataSource={this.state.dataSource}
                    renderHeader={() => this.renderHeader()}
                    // renderRow={(rowData) =>
                    //     <GroupPurchaseCell
                    //         info={rowData}
                    //         onPress={() => this.props.navigation.navigate('GroupPurchase', { info: rowData })}
                    //     />
                    // }
                    onHeaderRefresh={() => this.requestData()}
                />
            </View>



        )
    }
    requestData() {
        this.requestMovieDetail()
    }

    async requestMovieDetail() {
        try {
            let info = this.props.navigation.state.params.info
            let response = await fetch(movieDetailWithId(info.id))
            let json = await response.json()

            //alert(JSON.stringify(json));

            let dataList = json.data.deals.map((info) => {
                return {
                    id: info.id,
                    imageUrl: info.img
                }
            })

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(dataList)
            })
            setTimeout(() => {
                this.listView.endRefreshing(RefreshState.NoMoreData)
            }, 500);
        } catch (error) {
            this.listView.endRefreshing(RefreshState.Failure)
        }
    }

    renderHeader() {
        let info = this.props.navigation.state.params.info

        return (
            <View style={styles.header}>
                <View>
                    <Image style={styles.banner} source={{ uri: info.imageUrl}} />

                    <View style={styles.topContainer}>
                        <Heading1>￥</Heading1>
                        <HeadingBig style={{ marginBottom: -8 }}>{info.price}</HeadingBig>
                        <Paragraph style={{ marginLeft: 10 }}>门市价：￥{(info.price * 1.1).toFixed(0)}</Paragraph>
                    </View>
                </View>

                {/*<Separator />*/}

                <View>
                    <View style={styles.tagContainer}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../img/Home/icon_deal_anytime_refund.png')} />
                        <Paragraph style={{ color: '#89B24F' }}>  随时退</Paragraph>
                        <View style={{ flex: 1 }} />
                        <Paragraph>已售{1234}</Paragraph>
                    </View>

                </View>

                {/*<SpacingView />*/}

                <View style={styles.tipHeader}>
                    <Heading2>看了本团购的用户还看了</Heading2>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    header:{
        backgroundColor: 'gray',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    banner: {
        width: screen.width,
        height: screen.width * 0.5
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 94,
        height: 36,
        borderRadius: 7,
    },
    tagContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    tipHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        paddingVertical: 8,
        paddingLeft: 20,
    }
});
//make this component available to the app
export default MovieDetailScene;
