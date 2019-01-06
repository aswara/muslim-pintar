import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../config';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginAction } from '../../actions';
import './home.scss';
import GoogleLogin from 'react-google-login';
import { clientId } from '../../key';
  
import Header from '../../components/Header';

class index extends Component {
    state = {
        categories: [],
        loading: true,
        login: false,
        user: {
            photo : 'https://res.cloudinary.com/aguzs/image/upload/v1545460485/default-user-photo.png',
            name : 'Tamu',
            email : 'muslimpintar@gmail.com'
        }
    }

    componentDidMount(){
        this.fetchCategory()
        const { data } = this.props.user
        if(data){
            this.setState({ user: data })
        }
    }

    fetchCategory = () => {
        axios.get( url + "/api/category" )
        .then(res=>{
            this.setState({ categories: res.data, loading: false })
        })
        .catch(err=>{
            this.setState({ loading: false })
        });
    }

    responseGoogle = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'})
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };

        fetch( url + '/api/auth/google', options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ login:true, user: data.user })
                this.props.loginAction(data.token, data.user)
            });
    }

    render() {
        const { categories, user, login } = this.state
        return (
            <div className="home">
                <Header />
                <div className="wrapper">
                    <div className="left">
                        <h1>Kategori Soal</h1>
                        <div>
                        {
                            categories.map((category, i)=>
                                <Link style={{textDecoration: 'none'}} to={{ pathname: "/soal/" + category.name, state: { categoryId: category._id } }}>
                                    <div className="category" key={i}>
                                        {category.name}
                                    </div>
                                </Link>
                            )
                        }
                        </div>
                    </div>
                    <div className="right">
                        <div className="profile">
                            <div><img src={user.photo} alt=""/></div>
                            <div className="name">{user.name}</div>
                            <div className="email">{user.email}</div>
                        </div>

                        <div className="login">
                            <div style={{backgroundColor: '#67AC00', marginBottom: '10px'}}>Buat profil</div>
                            <div style={{backgroundColor: '#3498db'}}>Masuk</div>
                            <GoogleLogin
                                className="google"
                                clientId={clientId}
                                buttonText="Masuk dengan Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        user: state.userReducer
    })
  }
  
export default connect(mapStateToProps,{loginAction})(index);