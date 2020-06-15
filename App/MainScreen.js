import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import DrinkList from './DrinkList';


class MainScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.header_title}>Drinks</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Filter')}>
                        <Image source={require('./imgs/filter_icon2.png')} style={styles.filter_img} />
                    </TouchableOpacity>
                </View>

                <DrinkList data={this.props.data} getMoreData={this.props.getMoreData} refreshList={this.props.refreshList} />
            </View>
        )
    }
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    header: {
        height: 70,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 21,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 8,
    },
    header_title: {
        fontFamily: 'Roboto',
        fontWeight: "500",
        fontSize: 24,
        lineHeight: 28,
        color: '#000000',
        marginLeft: 30,
    },
    filter_img: {
        width: 29,
        height: 29,
        marginRight: 20,
    }

});
