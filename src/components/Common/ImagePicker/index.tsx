/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { post } from '@utils/api';
import { Icon, IconProps as EIconProps } from 'react-native-elements';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // alignSelf: 'center',
    marginBottom: 24,
  },
  imgUploaded: {
    width: width - 84,
    // height: 100,
    borderRadius: 10,
  },
  desUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    flex: 1,
    borderRadius: 10,
    // top: '0%',
  },
  textDes: {
    fontSize: 14,
    color: '#012066',
  },
  uploadImageBtn: {
    flexDirection: 'column',
    // width: '100%',
    // height: 100,
    // borderWidth: 2,
    // borderRadius: 20,
  },
  imageInUploads: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  closeIcon: {
    // marginTop: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  wrapImgUpload: {
    position: 'absolute',
    width: '100%',
    alignItems: 'flex-end',
    zIndex: 10,
    // borderWidth: 1,
    padding: 10,
  },
});

interface Props {
  uploadImgContainer?: any;
  imgUploaded?: any;
  textDescription?: string;
  textDesStyle?: any;
  srcImg?: any;
  funcUpdate?: any;
  iconComponent?: any;
  multi?: boolean;
  // onChange: any;
  parent?: any;
  button?: boolean;
  icon?: EIconProps;
  containerStyle?: any;
  defaultImage?: string;
  loadingUpload?: boolean;
}
interface State {
  image: any;
  images: any;
  closeImage: boolean;
  srcImage: boolean;
  urlImage: any;
  urlImgages: any;
  loading: boolean;
}
export default class ImgPicker extends Component<Props, State> {
  static defaultProps = {
    icon: {
      name: 'plus', color: '#012066', size: 20, type: 'entypo',
    },
  };

  constructor(props: any) {
    super(props);
    const { srcImg } = this.props;
    this.state = {
      image: null,
      images: null,
      urlImage: null,
      urlImgages: [],
      closeImage: false,
      srcImage: !!srcImg,
      loading: false,
    };
    this.pickMultiple = this.pickMultiple.bind(this);
  }

  getValuePath() {
    const { srcImage, urlImage, urlImgages } = this.state;
    const { srcImg, multi } = this.props;
    if (srcImage) {
      return srcImg;
    }
    if (multi) {
      return urlImgages;
    }
    return urlImage;
  }

  uploadOne = async (index: number) => {
    const { images, urlImgages } = this.state;
    const arrUrl = [...urlImgages];
    const img = images[index];
    const item = {
      type: img.type,
      fileName: img.fileName,
      folderPrefix: 'identityCard',
    };
    const temp = await post('/medias/url-storage', item);
    const file = temp.url;
    const newUrl = file.slice(0, file.indexOf('?'));
    await fetch(file, {
      method: 'put',
      body: img,
    });
    arrUrl[index] = newUrl;
  };

  closeOne = (index: number) => {
    const { images, urlImgages } = this.state;
    const array = [...images];
    const arrayURL = [...urlImgages];
    if (index !== -1) {
      array.splice(index, 1);
      arrayURL.splice(index, 1);
      this.setState({ images: array, urlImgages: arrayURL });
    }
  };

  uploadMulti = async () => {
    const { images } = this.state;
    let arrTemp: any = [];
    if (images && images.length > 0) {
      arrTemp = await Promise.all(
        images.map(async (img: any) => {
          const file = {
            type: img.type,
            fileName: img.fileName,
            folderPrefix: 'identityCard',
          };
          const temp = await post('/medias/url-storage', file);
          const index = temp.url;
          const newUrl = index.slice(0, index.indexOf('?'));
          await fetch(index, {
            method: 'put',
            body: img,
          });
          return newUrl;
        }),
      );
    }
    this.setState({ urlImgages: arrTemp, loading: false });
  };

  uploadSingle = async (data: any) => {
    const item = {
      type: data.type,
      fileName: data.fileName,
      folderPrefix: data.folderPrefix || 'identityCard',
    };
    const temp = await post('/medias/url-storage', item);
    const index = temp.url;
    const newUrl = index.slice(0, index.indexOf('?'));
    await fetch(index, {
      method: 'put',
      body: data,
    });
    this.setState({
      urlImage: newUrl,
    });
  };

  updateOne = async (index: number) => {
    await ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: false,
      cropperCircleOverlay: false,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      includeExif: true,
    }).then((img: any) => {
      this.setState((prevState: any) => prevState.images.map((item: any) => {
        if (item.uri === prevState.images[index].uri) {
          item.uri = img.path;
          item.fileName = img.path.split('/').pop();
          item.mime = img.mime;
        }

        return item;
      }));
      this.uploadOne(index);
    });
  };

  getDataImage = () => {
    const { image, images } = this.state;
    const { multi } = this.props;
    if (multi) {
      return images;
    }
    return image;
    // if (image === null) {
    //   return {
    //     type: null,
    //     file: null,
    //     folderPrefix: null,
    //   };
    // }
    // return {
    //   type: image.mime,
    //   fileName: image.path.split('/').pop(),
    //   folderPrefix: 'appImage',
    // };
  };

  pickSingle(cropit: any, circular = false) {
    this.setState({
      closeImage: false,
    });
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      includeExif: true,
      mediaType: 'photo',
    })
      .then((img: any) => {
        this.setState({
          image: {
            uri: img.path,
            width: img.width,
            height: img.height,
            mime: img.mime,
            fileName: img.path.split('/').pop(),
          },
          images: null,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = {
          type: img.mime,
          fileName: img.path.split('/').pop(),
          folderPrefix: 'identityCard',
        };
        // this.uploadSingle(data);
      })
      .catch((e: any) => e);
  }

  pickSingleWithCamera(cropping: any) {
    ImagePicker.openCamera({
      cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType: 'photo',
    })
      .then((img: any) => {
        this.setState({
          image: {
            uri: img.path,
            width: img.width,
            height: img.height,
            mime: img.mime,
            fileName: img.path.split('/').pop(),
          },
          images: null,
        });
        const data = {
          type: img.mime,
          fileName: img.path.split('/').pop(),
          folderPrefix: 'identityCard',
        };
        this.uploadSingle(data);
      })
      .catch((e: any) => e);
  }

  pickMultiple() {
    const { parent } = this.props;
    this.setState({
      loading: true,
    });
    ImagePicker.openPicker({
      multiple: true,
      includeExif: true,
    })
      .then((imgs: any) => {
        this.setState({
          image: null,
          images: imgs.map((i: any) => ({
            uri: i.path,
            width: i.width,
            height: i.height,
            type: i.mime,
            fileName: i.path.split('/').pop(),
          })),
        });
        this.setState({ loading: false });
        // this.uploadMulti();
        // parent.deleteNotification();
      })
      .catch((e) => {
        this.setState({ loading: false });
        return e;
      });
  }

  // cleanupImages() {
  //   ImagePicker.clean().then(() => {
  //     console.log('removed tmp images from tmp directory');
  //   }).catch((e) => {
  //     console.log(e);
  //   });
  // }

  // cleanupSingleImage() {
  //   const image = this.state.image ||
  //   (this.state.images && this.state.images.length ? this.state.images[0] : null);
  //   console.log('will cleanup image', image);

  //   ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
  //     console.log(`removed tmp image ${image.uri} from tmp directory`);
  //   }).catch((e) => {
  //     console.log(e);
  //   });
  // }

  // renderImage(image: any) {
  //   return (
  //     <Image
  //       style={{ width: 100, height: 100, resizeMode: 'contain' }}
  //       source={image}
  //     />
  //   );
  // }

  renderItemImage = ({ item, index }: { item: any, index: number}) => {
    const { imgUploaded } = this.props;
    const imgUploadeds = StyleSheet.flatten([styles.imgUploaded, imgUploaded]);
    return (
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity
          onPress={() => this.closeOne(index)}
          style={styles.wrapImgUpload}
        >
          <View style={styles.closeIcon}>
            <Icon name="close" size={12} color="#315DF7" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.updateOne(index)}
          style={styles.uploadImageBtn}
        >
          <Image
            style={imgUploadeds}
            source={item}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderMultiImage = () => {
    const { images } = this.state;
    console.log('ImgPicker -> images', images);

    return (
      <FlatList horizontal data={images} renderItem={this.renderItemImage} keyExtractor={(item, index) => index.toString()} />
    );
  };

  render() {
    const {
      image, images, closeImage, loading,
    } = this.state;
    const {
      multi,
      textDesStyle,
      uploadImgContainer,
      imgUploaded,
      iconComponent,
      textDescription,
      icon,
      containerStyle,
      defaultImage,
      loadingUpload,
    } = this.props;
    const textDesStyles = StyleSheet.flatten([styles.textDes, textDesStyle]);
    const uploadImgContainers = StyleSheet.flatten([
      styles.uploadImageBtn,
      uploadImgContainer,
    ]);
    const imgUploadeds = StyleSheet.flatten([styles.imgUploaded, imgUploaded]);
    return (
      <View style={[styles.container, containerStyle]}>
        {multi ? (
          images && images.length > 0 ? (
            // upload multi
            // images
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                position: 'relative',
              }}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                this.renderMultiImage()

              )}
            </View>
          ) : (
            // !images
            <TouchableOpacity
              onPress={this.pickMultiple}
              style={[uploadImgContainers]}
            >
              <View style={styles.desUpload}>
                {iconComponent || (
                  <Icon name="plus" type="entypo" color="#000" size={30} />
                  // <Image source={require('@src/assets/images/upload.png')} />
                )}
                {/* <Image
                style={styles.imageInUploads}
                source={require('@src/assets/images/arrow-up.png')}
              /> */}
                <Text style={textDesStyles}>{textDescription}</Text>
              </View>
            </TouchableOpacity>
            // Upload single
          )
        ) : image && !closeImage ? (
          // show selected image and show close icon
          !loadingUpload ? (
            <View>
              <TouchableOpacity
                onPress={() => this.setState({
                  closeImage: true,
                  urlImage: null,
                  image: null,
                })}
                style={styles.wrapImgUpload}
              >
                <View style={styles.closeIcon}>
                  <Icon name="close" size={12} color="#012066" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.pickSingle(false)}
                style={styles.uploadImageBtn}
              >
                <Image style={imgUploadeds} source={image} />
                {/* <Image
              style={{ width: 100, height: 50, resizeMode: 'contain' }}
              source={image}
            /> */}
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={[
                uploadImgContainers,
                {
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <ActivityIndicator />
            </View>
          )
        ) : (
          <TouchableOpacity
            onPress={() => this.pickSingle(false)}
            style={[uploadImgContainers, { borderRadius: 10 }]}
          >
            {defaultImage ? (
              <>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <Image
                    // defaultSource={require('@assets/images/defaultImage.png')}
                    source={{ uri: defaultImage }}
                    style={{
                      borderRadius: 10,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                    }}
                  />
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    // justifyContent: 'center',
                    height: '100%',
                    alignItems: 'flex-start',
                    padding: 5,
                    // opacity: 0.5,
                    // backgroundColor: '#000000',
                  }}
                >
                  {/* <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                      // backgroundColor: 'black',
                      color: 'white',
                    }}>
                    Cập nhật
                  </Text> */}
                  <Icon name="camera" type="entypo" />
                </View>
              </>
            ) : (
              <View style={styles.desUpload}>
                {iconComponent
                  || (icon ? (
                    <Icon
                      name={icon.name}
                      size={icon.size}
                      color={icon.color}
                      type={icon.type}
                    />
                  ) : null)}

                <Text style={textDesStyles}>{textDescription}</Text>
              </View>
            )}

            {/* <View style={styles.desUpload}>
              {iconComponent ||
                (icon ? (
                  <Icon
                    name={icon.name}
                    size={icon.size}
                    color={icon.color}
                    type={icon.type}
                  />
                ) : null)}

              <Text style={textDesStyles}>{textDescription}</Text>
            </View> */}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
