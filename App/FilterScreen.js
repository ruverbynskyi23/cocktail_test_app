import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';


class FilterScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Main')}>
                        <Image style={styles.filter_img} source={require('./imgs/arrow_icon.png')} />
                    </TouchableOpacity>
                    <Text style={styles.header_title}>Filters</Text>
                </View>

                <FlatList
                    data={this.props.data}
                    keyExtractor={(item => item.id)}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.list_item} onPress={this.props.filter.bind(null, index)}>
                                <Text style={styles.category_title}>{item.category}</Text>
                                <Image source={item.checked ? require('./imgs/checked.png') : null} style={styles.checked_img} />
                            </TouchableOpacity>
                        )
                    }}
                />

                <TouchableOpacity style={styles.btn} onPress={() => { this.props.navigation.navigate('Main'); this.props.updateFilter.bind(null); }}>
                    <Text style={styles.btn_text}>APPLY</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default FilterScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    header: {
        height: 70,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 21,
        paddingLeft: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 8,
    },
    filter_img: {
        marginRight: 40,
    },
    header_title: {
        fontWeight: "500",
        fontSize: 24,
        lineHeight: 28,
        color: '#000000',
    },
    list_item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 30,
        paddingHorizontal: 35,
    },
    category_title: {
        fontSize: 16,
        lineHeight: 19,
        color: '#7E7E7E',
    },
    checked_img: {
        width: 25,
        height: 25,
    },
    btn: {
        backgroundColor: 'black',
        paddingHorizontal: 156,
        paddingVertical: 17,
    },
    btn_text: {
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: 19,
        color: '#FFFFFF',
    }

});
