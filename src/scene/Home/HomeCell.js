import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Heading1, Heading2, Paragraph, Tip } from '../../widget/Text'
import { screen } from '../../common'
import { color } from '../../widget'


let count = 0;
// create a component
class HomeCell extends PureComponent {

    render() {
        let { info } = this.props
        let imageUrl = info.imageUrl.replace('w.h', '160.0')
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={require('../../img/zhanlang.png')} style={styles.icon} />

                <View style={styles.rightContainer}>
                    <Heading1>{info.title}</Heading1>

                    <Tip style={styles.subtitle}>{info.subtitle}</Tip>
                    <Tip style={styles.subtitle}>{info.subtitle}</Tip>
                    <Tip style={styles.subtitle}>{info.subtitle}</Tip>
                </View>

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
    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },
    price: {
        // color: color.theme
    }
});

//make this component available to the app
export default HomeCell;
