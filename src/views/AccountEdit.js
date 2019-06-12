import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Header, Content, View,
  Left, Body, Right, Title, Item, Text,
  Row, Form, Label, Button, Input, Icon
} from 'native-base';

import { Image, Picker, PermissionsAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { HeaderBackButton } from 'react-navigation';
import { } from 'react-native-paper';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import {
  Menu, MenuOptions, MenuOption,
  MenuTrigger, MenuProvider
} from 'react-native-popup-menu';

import { init, Geolocation } from 'react-native-amap-geolocation';

import styles from './style';

// 对于 Android 需要自行根据需要申请权限
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

// 使用自己申请的高德 App Key 进行初始化
/*
init({
  android: "d1472587fae499ae25c6ab8c8ba34ec8"
});
*/


const MyDatePicker = ({date, onChangeDate, style}) => (
  <DatePicker
    style={style}
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

const MyTimePicker = ({time, onChangeTime, style}) => (
  <DatePicker
    style={style}
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

const Images = ({imgPaths, onDeleteImage}) => {
  console.log(imgPaths);
  const images = imgPaths.map((imgPath, index) => (
    imgPath ?
      (
        <View key={index+''}>
          <Menu>
            <MenuTrigger triggerOnLongPress={true}>
              <Image source={{ uri: imgPath }} style={{ width: 100, height: 100 }} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption text='delete' onSelect={() => onDeleteImage(index, imgPath)} />
            </MenuOptions>
          </Menu>
        </View>
      ) : (
        <View key={index+''}/>
      )
  ));
  const imgMat = [];
  for (i = 0; i * 3 < images.length; i++) {
    imgMat.push(<Row key={'r'+i}>{images.slice(i * 3, i * 3 + 3)}</Row>);
  }
  return (
    <MenuProvider>
      {imgMat}
    </MenuProvider>
  );
}

class AccountEdit extends React.Component {
  static navigationOptions({navigation}) {
    return {
      title: 'Edit Account',
			header: (
				<Header>
          <Left>
            <Button transparent
              onPress={navigation.getParam('onClickBack')}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
					<Body>
						<Title>账单</Title>
					</Body>
					<Right />
				</Header>
			)
    };
  }

  componentDidMount() {
    const { navigation, onClickBack } = this.props;
    navigation.setParams({
      onClickBack: () => onClickBack(navigation.goBack)
    });
  }

  onAddImage() {
    const options = {
      title: 'Select Image',
      customButtons: [{ name: 'photo', title: 'Choose Image' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };

    const { onAddImage } = this.props;
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        onAddImage(source.uri);
      }
    });
  }

  onGetPosition() {
    const { onChangePosition } = this.props;
    Geolocation.getCurrentPosition(
      (position) => onChangePosition(position),
      (error) => console.log(error),
      {enableHighAccuracy: true}
    );
    // pw: dy-niabby
  }

  getAddress() {
    const {accountData} = this.props;
    const {position} = accountData;
    if (position) {
      const { address } = position.location;
      return address;
    }
    return '';
  }

  render() {
    const { accountData, onChangeDate, onChangeTime, onChangeType,
      onChangeAmount, onChangeItem, onChangeDesc, onDelImage, onSave } = this.props;

    return (
      <Container padder>
        <Content>
          <Form>

            <Item fixedLabel>
              <Label>日期</Label>
              <MyDatePicker style={styles.accountDataValue}
                date={accountData.date} onChangeDate={onChangeDate} />
            </Item>

            <Item fixedLabel>
              <Label>时间</Label>
              <MyTimePicker style={styles.accountDataValue}
                time={accountData.time} onChangeTime={onChangeTime} />
            </Item>

            <Item fixedLabel>
              <Label>账目类型</Label>
              <Picker
                style={styles.accountDataValue}
                selectedValue={
                  accountData.isIncome === 'undefined' ? true : accountData.isIncome
                }
                onValueChange={(itemValue) => onChangeType(itemValue)}>
                <Picker.Item label='income' value={true} />
                <Picker.Item label='expense' value={false} />
              </Picker>
            </Item>

            <Item fixedLabel>
              <Label>效费种类</Label>
              <Input
                title="item" defaultValue={accountData.item}
                onChangeText={onChangeItem} onEndEditing={onSave} />
            </Item>

            <Item fixedLabel>
              <Label>金额</Label>
              <Input
                keyboardType="number-pad"
                title="amount" defaultValue={accountData.amount}
                onChangeText={onChangeAmount} onEndEditing={onSave} />
            </Item>

            <Item fixedLabel>
              <Label>描述</Label>
              <Input
                title="desc" defaultValue={accountData.desc}
                onChangeText={onChangeDesc} onEndEditing={onSave} />
            </Item>

            <Item fixedLabel>
              <Label>图片</Label>
              <Button
                iconLeft
                style={{width: 120, marginTop: 5, marginBottom: 5, marginRight: 30}}
                onPress={() => this.onAddImage()}>
                <Icon type="MaterialIcons" name='add-a-photo'/>
                <Text>添加图片</Text>
              </Button>
            </Item>

            <Images
              imgPaths={accountData.imgPaths}
              onDeleteImage={(index, imgPath) => onDelImage(index, imgPath)}
            />

            <Item fixedLabel>
              <Label>位置</Label>
              <Button
                iconLeft
                style={{width: 120, marginTop: 5, marginBottom: 5, marginRight: 30}}
                onPress={() => this.onGetPosition()}>
                <Icon type="MaterialIcons" name='add-location'/>
                <Text>添加位置</Text>
              </Button>
            </Item>

            <Label>
              {this.getAddress()}
            </Label>

          </Form>
        </Content>

      </Container>
    );
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
  onSave: () => dispatch({type: "account_save"}),

  onChangeDate: (date) => {
    dispatch({type: 'account_edit_date', date});
    dispatch({type: 'account_save'});
  },
  onChangeTime: (time) => {
    dispatch({type: 'account_edit_time', time});
    dispatch({type: 'account_save'});
  },
  onChangeType: (isIncome) => {
    dispatch({type: 'account_edit_type', isIncome});
    dispatch({type: 'account_save'});
  },
  onChangeAmount: (amount) => dispatch({type: 'account_edit_amount', amount}),
  onChangeItem: (item) => dispatch({type: 'account_edit_item', item}),
  onChangeDesc: (desc) => dispatch({type: 'account_edit_desc', desc}),
  onAddImage: (imgPath) => {
    dispatch({type: 'account_add_img', imgPath});
    dispatch({type: 'account_save'});
  },
  onDelImage: (index, imgPath) => {
    dispatch({type: 'account_del_img', imgPath, index});
    dispatch({type: 'account_save'});
  },
  onChangePosition: (position) => {
    dispatch({type: 'account_edit_pos', position});
    dispatch({type: 'account_save'});
  },
});

const AccountEditView = connect(mapStateToProps, mapDispatchToProps)(AccountEdit);

export default AccountEditView;