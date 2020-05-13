import React from 'react';
import {View} from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle:{
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 0,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: '#ddd',
        position: 'relative'
    }
}

export default CardSection;