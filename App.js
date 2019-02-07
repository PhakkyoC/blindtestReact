import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './Views/Home';
import QuizzScreen from './Views/Quizz';

const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    Quizz: {screen: QuizzScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
