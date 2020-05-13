import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

const IconSettings = () =>{
    const navigation = useNavigation();
    return(
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Settings')}>
            <Icon style={{marginLeft: 20}} name="ios-notifications-outline" size={40} color="#fcba03" solid />
        </TouchableOpacity>
    )
};

export default IconSettings;