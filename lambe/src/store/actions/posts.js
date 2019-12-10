import { 
    SET_POSTS,
    ADD_COMMENT,
    CREATING_POSTS,
    POST_CREATED
} from './actionsTypes'
import { setMessage } from './message'
import axios from 'axios'

//action creator
export const addPost = post => {
    return (dispatch, getState) => {
        dispatch(creatingPost())
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambe-2b22d.cloudfunctions.net',
            method: 'post',
            data:{
                image: post.image.base64
            }
        })
        
           .catch(err => {
                dispatch(setMessage({
                    title:'Erro',
                    text: 'Ocorreu um erro inesperado!'
                 }));
           })
           //then do upload da imagem
           .then(resp => {
             post.image = resp.data.imageUrl
             //o firebase espera receber um JSON, por isso da extenção .json             
             axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
                 .catch(err => {
                    dispatch(setMessage({
                        title:'Erro',
                        text: err
                    }));
                 })
                 .then(res => {
                     dispatch(getPosts());
                     dispatch(postCreated());
                 })
            })
              /*.then(res => {
                dispatch({
                    type: ...,
                    payload: post
                })
              })*/
    }
}

export const addComment = payload => {
      return (dispatch, getState) => {
        axios.get(`/posts/${payload.postId}.json`)
             .catch(err => {
                dispatch(setMessage({
                    title:'Erro',
                    text: 'Ocorreu um erro inesperado!'
                 }));
             })
             .then(res => {
                 const comments = res.data.comments || []
                 comments.push(payload.comment)
                 //atualizando somente o comentário do post definido pelo postID
                 axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
                      .catch(err => {
                        dispatch(setMessage({
                            title:'Erro',
                            text: 'Ocorreu um erro inesperado!'
                         }));
                      })
                      .then(res => {
                          dispatch(getPosts())
                      })   
             })
      }
    /* return {
        type: ADD_COMMENT,
        payload: payload
    } */
}

//Action dos posts
export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

//Action que busca os posts no backend
export const getPosts = () => {
      return dispatch => {
          axios.get('/posts.json')
                .catch(err => {
                    dispatch(setMessage({
                        title:'Erro',
                        text: 'Ocorreu um erro inesperado!'
                     }));
                })
                .then(res => {
                    //buscando os objetos do firebase
                    const rawPosts = res.data
                    const posts = []
                    //adicionando em uma lista os objetos
                    for(let item in rawPosts){
                        posts.push({
                            ...rawPosts[item],
                            id: item
                        })
                    }
                    dispatch(setPosts(posts.reverse()))
                })
      }
}

export const creatingPost = () => {
    return{
        type: CREATING_POSTS
    }
}

export const postCreated = () => {
    return{
        type: POST_CREATED
    }
}