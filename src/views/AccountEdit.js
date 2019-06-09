import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AccountEdit = ({ account, index, navigation, onClickBack }) => {
  return (
    <View>
      <Text>
        Account Edit
      </Text>
      <Icon.Button
        name="arrow-left"
        onPress={() => onClickBack(account, index, () => {
          navigation.navigate('accountList');
        })}
      >Back
      </Icon.Button>
    </View>
  );
}

const mapStateToProps = ({ accountInfo }) => ({
  account: accountInfo.accounts[accountInfo.index],
  index: accountInfo.index,
});

const mapDispatchToProps = (dispatch) => ({
  onClickBack: (account, index, callBack) => {
    dispatch({type: 'account_save', account, index});
    dispatch({type: 'account_back', callBack});
  }
});

const AccountEditView = connect(mapStateToProps, mapDispatchToProps)(AccountEdit);

export default AccountEditView;