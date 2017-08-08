import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import { Heading1, Heading2, Paragraph, Tip } from '../../widget/Text'
import { screen } from '../../common'
import { color } from '../../widget'


let count = 0;
// create a component
class HomeCell extends PureComponent {

    render() {
        let { info } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={{ uri: info.img }} style={styles.icon} />
                {/*<Image source={require('../../img/zhanlang.png')} style={styles.icon} />*/}

                <View style={styles.rightContainer}>
                    <View style={styles.titleContainer}>
                        <Heading1>{info.nm}</Heading1>
                        <Text style={styles.movieStyle1}>{'3D'}</Text>
                        <Text style={styles.movieStyle2}>IMAX</Text>
                    </View>

                    <Tip style={styles.subtitle}>{ '观众评  '} <Text style={styles.score}>{info.sc}</Text></Tip>
                    <Tip style={styles.subtitle}>{ '主演：' + info.star}</Tip>
                    <Tip style={styles.subtitle}>{info.showInfo}</Tip>
                </View>

                <TouchableWithoutFeedback
                    onPress={()=> {
                        this.setState({count: this.state.count+1})
                    }}
                >
                    <View style={styles.buybutton}>
                        <Text style={styles.buttonText}>
                            购买
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: screen.onePixel,
        // borderColor: color.border,
        backgroundColor: 'white',
    },
    icon: {
        width: 60,
        height: 80,
        borderRadius: 5,
        // backgroundColor: 'red',
    },
    subtitle:{
        marginTop: 6,
    },
    score:{
        color: '#FFD306',
    },
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },

    titleContainer :{
        flex: 1,
        flexDirection : 'row',
        alignItems:'center',
    },

    movieStyle1:{
        fontSize: 11,
        color: 'white',
        marginLeft: 15,
        backgroundColor: 'gray',
        borderRadius: 2,
    },

    movieStyle2:{
        fontSize: 10,
        color: 'gray',
        marginLeft: 0.5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 2,
    },
    buybutton:{
        borderRadius: 10,
        alignItems:'center',
    },

    buttonText:{
        color:'white',
        width: 30,
        height: 20,
        backgroundColor:'red',
    },

    price: {
        // color: color.theme
    }
});

//make this component available to the app
export default HomeCell;
