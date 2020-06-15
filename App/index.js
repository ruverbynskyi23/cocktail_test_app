import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './MainScreen';
import FilterScreen from './FilterScreen';

const Stack = createStackNavigator();

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            categories: [],
            renderCategory: 0,
            filterOn: false,
        }
    }

    async componentDidMount() {
        const { categories } = this.state;
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

        const data = await response.json();
        data.drinks.forEach((item, index) => {
            categories.push({
                id: index.toString(),
                category: item.strCategory,
                checked: true,
                drinks: [],
            });
        });
        this.setState({ categories });
        this.getDrinks();
    }

    updateDrinkList() {
        this.setState({ renderCategory: 0 });
    }

    async getDrinks() {
        const { categories, renderCategory } = this.state;
        const choosen = [];
        const length = choosen.length;

        categories.forEach(item => {
            if (item.checked) {
                choosen.push(item);
            }
        })

        if (renderCategory > choosen.length - 1) {
            this.setState({ renderCategory: length });
        }

        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${choosen[renderCategory].category}`);
            const data = await response.json();
            choosen[renderCategory].drinks = data.drinks;
            this.setState({ renderCategory: renderCategory + 1 });
        } catch (error) {
            console.log(error);
        }
    }

    changeFilter(index) {
        const { categories } = this.state;
        categories[index].checked = !categories[index].checked;
        this.setState({ categories });
    }

    render() {
        const { categories } = this.state;
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Main">
                        {(props) => <MainScreen  {...props} data={categories} getMoreData={this.getDrinks.bind(this)} refreshList={this.updateDrinkList.bind(this)} />}
                    </Stack.Screen>
                    <Stack.Screen name="Filter">
                        {(props) => <FilterScreen  {...props} data={categories} updateFilter={this.getDrinks.bind(this)} filter={this.changeFilter.bind(this)} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App;