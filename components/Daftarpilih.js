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

const SERVER_URL='http://10.0.2.2:8010/backend/?';
//const SERVER_URL='http://192.168.2.100:8010/backend/?';
//const SERVER_URL='http://192.168.0.1/restojs/backend/?';

export default class Daftarpilih extends React.Component{
    constructor(){
	super();
    }
    
    render(){
	return(
		<View>
		<Text>Daftarpilih</Text>

	    {
		this.props.data_menu.map(
		    dm=>{
			return(
				<Text key={'key'+dm.id}>{dm.nama}</Text>
			);
		    }
		)
	    }
	    
		</View>
	);
    }
}
