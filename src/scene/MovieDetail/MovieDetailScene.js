

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
        return <Text>Mine</Text>
    }
}

//make this component available to the app
export default MovieDetailScene;
