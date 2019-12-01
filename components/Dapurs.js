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
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

//const ic_home='./images/logo.png';
const SERVER_URL='http://192.168.2.100:8010/backend/?';

export default class Dapurs extends React.Component{
    constructor(){
	super();
	this.state={
	    role:'dapur',
	    userName:'admin',
	    passWord:'kevin',
	    mejas:[],
	    pilih:'',
	    refreshing:false,
	}
    }


    componentDidMount(){
	/*fetch('http://192.168.2.100:8010/backend/?data=meja-tampil-di-dapur', {
            method: 'GET'
	})
	    .then((response) => response.json())
	    .then((mejas) => this.setState({mejas}))
	    .catch((error) => {
		//console.error(error);
		Alert.alert('Terjadi kesalahan. Periksa koneksi anda !');
		});*/


	let fdata=new FormData();
	fdata.append('mod','dapur');
	fdata.append('act','show');

	//BOF API
	fetch(SERVER_URL, {
	    method: 'POST',
	    headers: {
		//Accept: 'application/json',
		//'Content-Type': 'application/json',
		//'Content-Type': false,
	    },
	    body: fdata,
	})
	    .then((response) => response.json())
	    .then((mejas) => this.setState({mejas}))
	    .catch((error) => {
		//console.error(error);
		console.log(error);
		Alert.alert('Terjadi kesalahan. Periksa koneksi ke Kasir!');
	    })
	    .done();
	//EOF API
    }

    _onPress(nox){

	//untuk refresh
	this.componentDidMount();
	
	console.log('Meja: '+nox);
	this.setState({pilih:nox});

	Actions.detail({meja:nox,url:SERVER_URL});
    }


    _onRefresh = () => {
	//this.setState({refreshing: true});
	//this.fetchData().then(() => {
	//    this.setState({refreshing: false});
	//});
	this.componentDidMount();
    }
    
    render(){
	
	return(	    
		<ScrollView
	    refreshControl={
		    <RefreshControl
		refreshing={this.state.refreshing}
		onRefresh={this._onRefresh}
		    />
            }
		>
		<Text>Swipe ke bawah untuk refresh !</Text>
		<View style={styles.baris}>
		{
		    this.state.mejas.map(
			mejas =>{
			    if(mejas.antri.length>0){
				return (
			    		<TouchableOpacity
				    key={mejas.meja}
				    style={styles.mejabox}
				    onPress={()=>this._onPress(mejas.meja)}
					>
					<Text key={mejas.meja} style={styles.mejano}>{mejas.meja}</Text>
					</TouchableOpacity>
				)
			    }
			}
			    
			
			    
		    )		    
		}
		</View>

	    
	    
		
	    </ScrollView>	    
	);
    }
}


const styles=StyleSheet.create({
    container:{	
	alignItems:'center',
	justifyContent:'center',
    },
    baris:{
	flex:1,	
	flexDirection:'row',
	flexWrap:'wrap',	
	alignItems:'center',
	justifyContent:'center',
    },
    mejabox:{	
	margin:3,
	width:150,
	height:150,
	backgroundColor:'#005500',	
	alignItems:'center',
	justifyContent:'center',
	borderRadius:20,
	borderWidth: 1,
	borderColor: '#fff'
    },
    mejano:{
	color:'white',
	textAlign:'center',
	fontWeight:'bold',
	fontSize:20,
    },
});


