import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import Geolocation from 'react-native-geolocation-service';

import { AccountData } from '../models/AccountsReducer';

Geolocation.getCurrentPosition(
  (position) => {
    console.log(position);
  },
  (error) => {
    // See error code charts below.
    console.log(error.code, error.message);
  },
  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
);

const AccountEdit = ({
  accountData, index, navigation,
  onClickBack, onChangeDate, onChangeTime
}) => {

  let position;

  return (
    <View>
      <Icon.Button
        name="arrow-left"
        onPress={() => onClickBack(accountData, index, () => {
          navigation.navigate('accountList');
        })}
      >Back
      </Icon.Button>

      <Text>
        Account Edit
      </Text>

      <DatePicker
        mode="date"
        placehold="select date"
        format="LL"
        date = {accountData.date ? accountData.date : new Date()}
        minDate="1900-01-01"
        maxDate="2099-12-31"
        confirmBtnText="Confirm"
        cancelBtnTest="Cancel"
        onDateChange={(date) => onChangeDate(date)}
      />
      <DatePicker
        mode="time"
        placehold="select time"
        format="LTS"
        is24Hour={true}
        date = {accountData.time ? accountData.time : new Date()}
        confirmBtnText="Confirm"
        cancelBtnTest="Cancel"
        onDateChange={(time) => onChangeTime(time)}
      />
    </View>
  );
}

const mapStateToProps = ({ accountInfo }) => ({
  index: accountInfo.index,
  accountData: accountInfo.accountData,
});

const mapDispatchToProps = (dispatch) => ({
  onClickBack: (accountData, index, callBack) => {
    dispatch({type: 'account_save', accountData, index});
    dispatch({type: 'account_back', callBack});
  },
  onChangeDate: (date) => dispatch({type: 'account_edit_date', date}),
  onChangeTime: (time) => dispatch({type: 'account_edit_time', time}),
});

const AccountEditView = connect(mapStateToProps, mapDispatchToProps)(AccountEdit);

export default AccountEditView;