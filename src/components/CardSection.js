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
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 0,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: '#ddd',
        position: 'relative'
    }
}

export default CardSection;