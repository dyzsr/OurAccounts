import { React } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Accounts extends React.Component {
    render(props) {
        return (
            <View style={styles.mainContent}>
                <Text>Accounts</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '40px',
    },
});