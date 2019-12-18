/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Picker,
    TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Kepala from './components/Kepala';
import Login from './components/Login';
import Routers from './components/Routers';
import Frontrouter from './components/Frontrouter';
import Orders from './components/Orders';
import Dapurs from './components/Dapurs';

export default class App extends React.Component{
    constructor(props){
	super(props);
	this.state={
	    userName:'',
	    passWord:'',
	    logIn:false,
	    userRole:'',
	}
    }

    _loginProcess=(uname,pass)=>{

	console.log('App.js - userName: '+uname);
	console.log('App.js - userPass: '+pass);
	
	if(uname=='A' && pass=='K'){
	    this.setState({logIn:true});
	}
	console.log('login status: '+this.state.logIn);

	//jika status false,login
	//<Login login={this.state.logIn} onLogin={this._loginProcess}/>
    }
    
    render(){
	if(this.state.logIn!=true){
	    return(
		    <Frontrouter/>
	    );
	}else{
	    return(
		    <Routers/>
	    );
	}
    }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

//export default App;
