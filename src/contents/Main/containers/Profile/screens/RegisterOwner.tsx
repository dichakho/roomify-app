/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Container, Header, Body, Input, Image, ImagePicker, Button,
} from '@components';
// import { Alert } from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
import { cloudinaryUpload } from '@utils/functions';

const list = [
  {
    name: 'Amy Farha',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
];

class RegisterOwner extends PureComponent {
  imgs : any;

  // cloudinaryUpload = async () => {
  //   const img = this.imgs.getDataImage();
  //   const photo = {
  //     uri: img.uri,
  //     type: img.mime,
  //     name: img.fileName,
  //   };
  //   photo.uri.replace('file:///', '').replace('file://', '');
  //   const data = new FormData();
  //   data.append('file', photo);
  //   data.append('upload_preset', 'roomify');
  //   data.append('cloud_name', 'roomify');
  //   fetch('https://api.cloudinary.com/v1_1/ogcodes/upload', {
  //     method: 'post',
  //     body: data,
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log('data', data);

  //       // setPhoto(data.secure_url);
  //     }).catch((err) => {
  //       Alert.alert('An Error Occured While Uploading');
  //     });
  // };

  render() {
    return (
      <Container>
        <Header backIcon title="Đăng ký làm chủ nhà" />
        <Body>
          <Input marginTop={10} label="Số chứng minh nhân dân" />
          <Image source={{ uri: 'https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg' }} />
          <QuickView height={150} marginTop={10}>
            <ImagePicker
              uploadImgContainer={{
                width: '35%',
                height: 120,
                backgroundColor: '#E6E9F0',
              }}
              imgUploaded={{ width: 120, height: 120 }}
              ref={(ref) => {
                this.imgs = ref;
              }}
            />
          </QuickView>
          <Button title="Gửi" onPress={() => cloudinaryUpload(this.imgs.getDataImage())} />
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOwner);
