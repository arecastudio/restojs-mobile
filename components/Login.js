import React from 'react';
import{
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    Button,
    Alert,
    Picker,
} from 'react-native';

//const ic_home='./images/logo.png';
//		<Picker.Item label="Pelayan" value="pelayan" />
export default class Login extends React.Component{

    constructor(props){
	super(props);
	this.state={
	    role:'pelayan',
	    userName:'',
	    passWord:'',
	    logIn:props.login,
	}
    }

    resetInput=()=>{
	this.setState({
	    role:'dapur',
	    userName:'',
	    passWord:'',
	});
    }

    loginAuth(user,pass){
	if(user=='admin'&&pass=='kevin'){
	    this.setState({logIn:true});
	}
    }
    
    render(){
	return(
		<View style={styles.container}>

		<Image  style={{width:250, height: 250}}
	    source={require('../images/logo.jpg')}/>

	    	<TextInput
	    style={styles.textInput}
	    placeholder="Username"	    
	    onChangeText={
		userName=>this.setState({userName})
	    }
	    value={this.state.userName}
		/>
		
		<TextInput
	    style={styles.textInput}
	    placeholder="Password"
	    secureTextEntry={true}
	    onChangeText={
		passWord=>this.setState({passWord})
	    }
	    value={this.state.passWord}
		/>
		
		<Picker
	    selectedValue={this.state.role}
	    style={{height: 50, width: 300,fontWeight:'bold'}}
	    onValueChange={(itemValue, itemIndex) =>
			   this.setState({role: itemValue})
			  }
	    value={this.state.role}
		>
		<Picker.Item label="Dapur" value="dapur" />
		</Picker>
		
		<View style={styles.buttonContainer}>
		<View style={{flex:1,margin:5,}}>
		<Button title="Reset" onPress={this.resetInput}/>
		</View>
		<View style={{flex:1,margin:5,}}>
		<Button title="Login"/>
		</View>
		</View>

	    
	    </View>	    
	);
    }
}


const styles=StyleSheet.create({
    container:{
	alignItems:'center',
	justifyContent:'center',
//	backgroundColor:'black',
    },
    containerxx: {
	//flex: 1,
	flexDirection: 'row',
	//alignItems: 'center',
	//justifyContent: 'center',
    },    
    buttonContainer:{
	flexDirection: 'row',
	marginTop:20,
    },

    textInput:{
	textAlign:'center',
	width:300,
	padding:2,
	marginTop:10,
	fontSize:20,
	fontWeight:'bold',
	backgroundColor:'#ddd',
    },
});

//export default Login;
