import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import Geolocation from 'react-native-geolocation-service';
import { HeaderBackButton } from 'react-navigation';
import { TextInput } from 'react-native-paper';
import styles from './style';

const MyDatePicker = ({date, onChangeDate}) => (
  <DatePicker
    mode="date"
    placehold="select date"
    format="YYYY-MM-DD"
    date={date ? date : new Date()}
    minDate="1900-01-01"
    maxDate="2099-12-31"
    confirmBtnText="Confirm"
    cancelBtnTest="Cancel"
    onDateChange={(date) => onChangeDate(date)}
  />
);

const MyTimePicker = ({time, onChangeTime}) => (
  <DatePicker
    mode="time"
    placehold="select time"
    format="LT"
    is24Hour={true}
    date={time ? time : new Date()}
    confirmBtnText="Confirm"
    cancelBtnTest="Cancel"
    onDateChange={(time) => onChangeTime(time)}
  />
);

class AccountEdit extends React.Component {
  static navigationOptions({navigation}) {
    return {
      title: 'Edit Account',
      headerLeft: (
        <HeaderBackButton onPress={navigation.getParam('onClickBack')} />
      ),
    };
  }

  componentDidMount() {
    const { navigation, onClickBack } = this.props;
    navigation.setParams({
      onClickBack: () => onClickBack(navigation.goBack)
    });
  }

  render() {
    const { accountData, onChangeDate, onChangeTime,
      onChangeAmount, onChangeItem, onChangeDesc } = this.props;

    return (
      <View>
        <Text style={styles.text}>
          Account Edit
        </Text>

        <MyDatePicker date={accountData.date} onChangeDate={onChangeDate}/>
        <MyTimePicker time={accountData.time} onChangeTime={onChangeTime}/>

        <TextInput title="amount" defaultValue={accountData.amount} onChangeText={onChangeAmount}/>
        <TextInput title="item" defaultValue={accountData.item} onChangeText={onChangeItem}/>
        <TextInput title="desc" defaultValue={accountData.desc} onChangeText={onChangeDesc}/>
      </View>
    );

    // let position;
    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     console.log(position);
    //   },
    //   (error) => {
    //     // See error code charts below.
    //     console.log(error.code, error.message);
    //   },
    //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // );
  }
}

const mapStateToProps = ({ accountInfo }) => ({
  index: accountInfo.index,
  accountData: accountInfo.accountData,
});

const mapDispatchToProps = (dispatch) => ({
  onClickBack: (callBack) => {
    dispatch({type: 'account_save'});
    dispatch({type: 'account_back', callBack});
    console.log('BACK');
  },
  onChangeDate: (date) => dispatch({type: 'account_edit_date', date}),
  onChangeTime: (time) => dispatch({type: 'account_edit_time', time}),
  onChangeAmount: (amount) => dispatch({type: 'account_edit_amount', amount}),
  onChangeItem: (item) => dispatch({type: 'account_edit_item', item}),
  onChangeDesc: (desc) => dispatch({type: 'account_edit_desc', desc}),
});

const AccountEditView = connect(mapStateToProps, mapDispatchToProps)(AccountEdit);

export default AccountEditView;