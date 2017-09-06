

//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, InteractionManager } from 'react-native'
import { color, Button, NavigationItem, RefreshListView, RefreshState, Separator, SpacingView } from '../../widget'
import { Heading1, Heading2,Heading3, Paragraph, HeadingBig, Paragraph2 } from '../../widget/Text'
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
                <View style={styles.headerLeft}>
                    <View style={styles.topContainer}>
                        <Heading3>{info.nm}</Heading3>
                        <Paragraph2>{info.dir}</Paragraph2>
                        <Paragraph2 style={styles.movieType}>{info.ver}</Paragraph2>
                        <Paragraph2>{info.cat}</Paragraph2>
                        <Paragraph2>{info.src}/{info.dur}分钟</Paragraph2>
                        <Paragraph2>{info.rt}></Paragraph2>
                        <SpacingView />
                        <Paragraph2>观众评  <Paragraph2 style={styles.score}>{info.sc}</Paragraph2> </Paragraph2>
                        <Separator style={styles.scoreLine}/><Separator style={styles.percentage} />
                        <Paragraph2>{info.snum /10000} 万人></Paragraph2>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <View style={styles.rightTop}></View>
                    <Image style={styles.banner} source={{ uri: info.img}} />
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    movieType:{
        backgroundColor:'gray',
        fontSize:10,
        marginTop:5,
        marginBottom:5,
    },
    score:{
        color: '#FFD306',
    },
    scoreLine:{
        backgroundColor: 'white',
        width: 60,
    },
    percentage:{
        backgroundColor: '#FFD306',
        width: 48,
    },
    header:{
        backgroundColor: '#6e6e6e',
        flexDirection: 'row',
    },
    headerLeft:{
        flex: 2.8,
    },
    headerRight:{
        flex: 1,
        flexDirection:'column',
    },
    container: {
        backgroundColor: 'white',
    },
    rightTop:{
        flex: 1,
    },
    banner: {
        flex: 1,
        backgroundColor: 'red',
        width: 80,
        height: 60,
    },
    topContainer: {
        padding: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex:1,
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
