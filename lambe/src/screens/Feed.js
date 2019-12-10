import React, {Component} from 'react'
import {StyleSheet, FlatList, View} from 'react-native'

import Header from '../components/Header'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { getPosts } from '../store/actions/posts'

class Feed extends Component {
    componentDidMount = () => {
        this.props.onGetPosts()
    }

    render(){
        return(
            <View style={styles.container}>
                <Header />
                <FlatList data={this.props.posts} keyExtractor={i => `${i.id}`}
                        renderItem={({ item }) => 
                            <Post key={item.id} {...item} />
                        } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})

//export default Feed

const mapStateToProps = ({ posts }) => ({
      posts: posts.posts
});

//buscandoo o dispatch do action
const mapDispatchToProps = dispatch => {
    return {
        onGetPosts: () => dispatch(getPosts())
    }
}
  

export default connect(mapStateToProps,mapDispatchToProps)(Feed)