import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback} from 'react-native'
import {Heading1, Heading2, Paragraph, Tip} from '../../widget/Text'
import {screen} from '../../common'
import {color} from '../../widget'


let count = 0;

// create a component
class HomeCell extends PureComponent {

    render() {
        let {info} = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <View style={styles.leftContainer}>
                    <Image source={{uri: info.img}} style={styles.icon}/>
                    {/*<Image source={require('../../img/zhanlang.png')} style={styles.icon} />*/}
                </View>

                <View style={styles.centerContainer}>
                    <View style={styles.titleContainer}>
                        <Heading1>{info.nm}</Heading1>
                        <Text style={styles.movieStyle1}>3D</Text>
                        {info.imax ? <Text style={styles.movieStyle2}>IMAX</Text> : null}
                    </View>
                    {
                        info.sc == 0 ? <Text style={styles.score}>{info.wish}<Tip style={styles.subtitle}>{' 人想看'} </Tip></Text> : <Tip style={styles.subtitle}>{'观众评  '} <Text style={styles.score}>{info.sc}</Text></Tip>
                    }
                    <Tip style={styles.subtitle}>{'主演：' + info.star}</Tip>
                    <Tip style={styles.subtitle}>{info.showInfo}</Tip>
                </View>

                <View style={styles.rightContainer}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({count: this.state.count + 1})
                        }}
                    >
                        {
                            info.sc != 0 ?
                                <View style={styles.button}>
                                    <Text style={styles.buyButtonText}>
                                        购票
                                    </Text>
                                </View> :

                                <View style={styles.button}>
                                    <Text style={styles.preSaleButtonText}>
                                        预售
                                    </Text>
                                </View>
                        }


                    </TouchableWithoutFeedback>
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: screen.onePixel,
        // borderColor: color.border,
        backgroundColor: 'white',
    },
    leftContainer: {
        flex: 1,
    },
    icon: {
        width: 60,
        height: 90,
        borderRadius: 2,
        backgroundColor: 'gray',
    },
    subtitle: {
        marginTop: 6,
    },
    score: {
        marginTop: 6,
        color: '#FFD306',
    },
    centerContainer: {
        flex: 2.5,
        // backgroundColor: 'green',
    },

    titleContainer: {
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },

    movieStyle1: {
        fontSize: 11,
        color: 'white',
        marginLeft: 15,
        backgroundColor: 'gray',
        borderRadius: 2,
        paddingHorizontal: 2,
        flexWrap: 'nowrap',
    },

    movieStyle2: {
        fontSize: 10,
        color: 'gray',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 2,
        paddingHorizontal: 4,
        flexWrap: 'nowrap',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'center',
        // backgroundColor: 'blue',
    },

    preSaleButtonText: {
        fontSize: 12,
        color: 'white',
        backgroundColor: '#0080FF',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 2,
        flexWrap: 'nowrap',

    },

    buyButtonText: {
        fontSize: 12,
        color: 'white',
        backgroundColor: 'red',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 2,
        flexWrap: 'nowrap',

    },

    price: {
        // color: color.theme
    }
});

//make this component available to the app
export default HomeCell;
