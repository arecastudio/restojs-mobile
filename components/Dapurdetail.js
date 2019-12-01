import React from 'react';
import{
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert,
    RefreshControl,
} from 'react-native';

//const ic_home='./images/logo.png';
import { Actions } from 'react-native-router-flux';

export default class Dapurdetail extends React.Component{

    constructor(props){
	super(props);
	this.state={
	    role:'pelayan',
	    userName:'',
	    passWord:'',
	    dipilih:props.meja,
	    SERVER_URL:props.url,
	    menus:[],
	    retval:[],
	    refreshing:false,
	}

	this._isReady=this._isReady.bind(this);
    }


    componentDidMount(){
	fetch(this.state.SERVER_URL+'data=meja-tampil-di-dapur&nomor='+this.state.dipilih+'', {
            method: 'GET'
	})
	    .then((response) => response.json())
	    .then((menus) => this.setState({menus}))
	    .catch((error) => {
		//console.error(error);
		Alert.alert('Terjadi kesalahan. Periksa koneksi anda !');
	    });
    }

    _isReady(key,pid,id,bungkus,jumlah,nama){
	let msg='Apakah data ini sudah siap?';
	msg+='\n\nNama: '+nama;
	msg+='\nJumlah: '+jumlah;
	msg+='\nBungkus: '+bungkus;
	Alert.alert(
	    'Konfirmasi',
	    msg,
	    [
		{text: 'Sudah', onPress: () => this._setSudah(pid,id,bungkus)},
		{text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
	    ],
	    {cancelable: false},
	);
    }

    _setSudah(pid,id,bungkus){
	let meja=this.state.dipilih;
	let msg='pesanan_id: '+pid;
	msg+='\nproduk_id: '+id;
	msg+='\nbungkus: '+bungkus;
	//console.log('ini yang sudah: \n'+msg);

	let fdata=new FormData();
	fdata.append('mod','pesan-dapur-list');
	fdata.append('act','ubah');
	fdata.append('produk_id',id);
	fdata.append('pesanan_id',pid);
	fdata.append('meja',meja);
	fdata.append('bungkus',bungkus);
	fdata.append('batal','TIDAK');
	fdata.append('siap','SDH');

	//BOF API
	//'http://192.168.2.100:8010/backend/?'
	fetch(this.state.SERVER_URL, {
	    method: 'POST',
	    headers: {
		//Accept: 'application/json',
		//'Content-Type': 'application/json',
		//'Content-Type': false,
	    },
	    body: fdata,
	})
	    .then((response) => response.json())
	    .then(this.setState({menus:[]}))	    
	    .catch((error) => {
		//console.error(error);
		console.log(error);
		Alert.alert('Terjadi kesalahan!');
	    })
	    .done();	

	//EOF API

	//this.setState({menus:[]});
	this.componentDidMount();
	
	//Actions.pop();//kembali ke awal

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
		<View style={styles.container}>
		
		<Text>Nomor Meja: {this.state.dipilih}</Text>


		<ScrollView
	    refreshControl={
		    <RefreshControl
		refreshing={this.state.refreshing}
		onRefresh={this._onRefresh}
		    />
            }
		>
		
		{this.state.menus.map(menus => (
			<TouchableOpacity
		    key={menus.key}
		    style={styles.menurow}
			>
			<Text
		    key={menus.key}
		    onPress={()=>this._isReady(menus.key,menus.pid,menus.id,menus.bungkus,menus.jumlah,menus.nama)}
		    style={styles.menuitem}
			>
			{menus.jumlah} x {menus.nama} # Bgks:{menus.bungkus}
		    </Text>
		    
			</TouchableOpacity>
		))}
	    
		</ScrollView>
	    
	    
	    </View>	    
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
	//flexWrap:'wrap',	
	//alignItems:'center',
	//justifyContent:'center',
    },
    menurow:{	
	flex:1,	
	flexDirection:'row',
	
	marginTop:20,
	padding:5,
	backgroundColor:'#009900',	
	//alignItems:'center',
	//justifyContent:'center',
    },    
    menuitem:{
	color:'white',
	textAlign:'left',
	fontWeight:'bold',
	fontSize:15,
    },
});

//export default Login;
