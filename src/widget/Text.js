import React from 'react';
import ReactNative, { StyleSheet, Dimensions, Text ,ReactElement} from 'react-native'
import color from './color'

export function HeadingBig({style, ...props}: Object): ReactElement {
    return <Text style={[styles.h0, style]} {...props} />
}

export function Heading1({style, ...props}: Object): ReactElement {
    return <Text style={[styles.h1, style]} {...props} />
}

export function Heading2({style, ...props}: Object): ReactElement {
    return <Text style={[styles.h2, style]} {...props} />
}

export function Heading3({style, ...props}: Object): ReactElement {
    return <Text style={[styles.h3, style]} {...props} />
}
export function Paragraph({style, ...props}: Object): ReactElement {
    return <Text style={[styles.p, style]} {...props} />
}

export function Tip({style, ...props}: Object): ReactElement {
    return <Text style={[styles.tip, style]} {...props} />
}

export function Paragraph2({style, ...props}: Object): ReactElement {
    return <Text style={[styles.p2, style]} {...props} />
}


const styles = StyleSheet.create({
    h0: {
        fontSize: 40,
        color: color.theme,
    },
    h1: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
        flexDirection:'row',
    },
    h2: {
        fontSize: 14,
        color: '#222222',
    },
    h3: {
        fontSize: 16,
        color: 'white',
    },
    p: {
        fontSize: 13,
        color: '#777777',
    },
    p2: {
        fontSize: 12,
        color: 'white',
    },
    tip: {
        fontSize: 13,
        color: '#999999',
        flexWrap: 'nowrap',
    }
});
