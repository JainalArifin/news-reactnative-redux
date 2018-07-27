import React, { Component } from 'react';
import { Image, FlatList,StyleSheet, View, ActivityIndicator } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import axios from 'axios'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setNews } from '../../store/actions'

// style
import styles from './style'

const API_NEWS = `https://newsapi.org/v2/top-headlines?country=us&apiKey=bed55e63078b41cf87108bfb00b5d203`

// import './style.css'
class Home extends Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(){
        super()
        this.state = {
            animating: true,
        }
    }

    getData () {
        axios.get(API_NEWS)
        .then(({data})=>{
            this.props.setNews(data.articles)
        })
        .catch((err)=> console.log(err))
    }

    closeActivityIndicator = () => {
        setTimeout(() =>
            this.setState({
                animating: false }), 6000)

    }

    componentDidMount(){
        this.getData()
        this.closeActivityIndicator()
    }

  render() {
      const { animating } = this.state
      const { news } = this.props.dataNews
    //   console.log(this.props)
    return (
       <View style={[styles.container, styles.horizontal]}>
            <Content style={styles.articleStyle}>
            {animating == true && (
                <ActivityIndicator size="large" color="#0000ff"/>
            )}
            <FlatList
                data={news}
                renderItem={({item})=> (
                    <Card>
                    <CardItem>
                        <Left>
                        <Thumbnail source={{uri: 'https://image.flaticon.com/icons/png/512/235/235298.png'}} />
                        <Body>
                            <Text>{item.title}</Text>
                            <Text note>{item.author}</Text>
                        </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{uri: item.urlToImage}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                {item.description}
                            </Text>
                            <Left>
                                <Button bordered success
                                    onPress={()=> this.props.navigation.navigate('Detail', { text: item })}
                                >
                                    <Text>Detail</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Text>{item.publishedAt.substring(0, 50)}</Text>
                            </Right>
                        </Body>
                    </CardItem>
                    </Card>
                )}
            />
        </Content>
       </View>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        dataNews: state
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({setNews}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Home)

