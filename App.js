import React from "react";
import Expo from "expo";
import { Container } from 'native-base';

// redux
import { Provider } from 'react-redux'
import store from './src/store'

// routes
import Routes from './routes'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store}>
        <Container>
          <Routes />
        </Container>
      </Provider>
    );
  }
}
