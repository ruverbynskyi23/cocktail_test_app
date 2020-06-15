import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, RefreshControl } from 'react-native';


class DrinkList extends React.Component {
    constructor() {
        super();

        this.state = {
            isRefreshing: false,
        }
    }

    onRefresh() {
        const { refreshList, getMoreData } = this.props;
        this.setState({ isRefreshing: true }, () => {
            setTimeout(() => {
                this.setState({ isRefreshing: false });
                refreshList.bind(null);
                getMoreData.bind(null);
            }, 300);
        });
    }

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={({ item }) => {
                    if (!item.checked || item.drinks.length === 0) return;
                    return (
                        <View style={styles.category_container}>
                            <Text style={styles.category_title}>{item.category}</Text>
                            {item.drinks.map((drink, index) => {
                                return (
                                    <View key={drink.idDrink} style={index === item.drinks.length - 1 ? styles.item_noMargin : styles.category_item}>
                                        <Image style={styles.item_img} source={{ uri: `${drink.strDrinkThumb}` }} />
                                        <Text style={styles.item_title}>{drink.strDrink}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    )
                }}
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.7}
                onEndReached={({ distanceFromEnd }) => {
                    console.log('on end reached ', distanceFromEnd);
                    this.props.getMoreData();
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }
            />

        )
    }
}

export default DrinkList;

const styles = StyleSheet.create({
    category_container: {
        marginLeft: 20,
        marginVertical: 20,
    },
    category_title: {
        fontSize: 14,
        lineHeight: 16,
        color: '#7E7E7E',
        marginBottom: 20,
    },
    category_item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    item_noMargin: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    item_img: {
        width: 100,
        height: 100,
    },
    item_title: {
        marginLeft: 21,
        fontSize: 16,
        lineHeight: 19,
        color: '#7E7E7E',
    },
});
