import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import { 
  SAVE_PICTURES
} from './actions/types';
import Gallery from 'react-grid-gallery';

class Pictures extends Component {
  constructor(props) {
    super(props);
    this.selectPicturesToCrop = this.selectPicturesToCrop.bind(this);
  }

  componentDidMount() {
    let params = queryString.parse(this.props.location.search);
    fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST', 
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `client_id=700c80600a8040cda30166ee4e4f8cc2&client_secret=07bf8aee35a04aab9034aaecfd758c28&grant_type=authorization_code&redirect_uri=http://localhost:3000/pictures&code=${params.code}`
    })
    .then(res => {
      return res.json();
    })
    .then((resp) => {
      fetch(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${resp.access_token}`, {
        method: 'GET'
      })
      .then(res => {
          return res.json();
      })
      .then(resp => {
        console.log(resp);
        let pictureArray = [];
        if (resp.data) {
          console.log(resp.data);
          resp.data.forEach((picture) => {
            if (picture.carousel_media) {
              picture.carousel_media.forEach((carouselPicture) => {
                pictureArray.push({
                  src: carouselPicture.images.standard_resolution.url,
                  thumbnail: carouselPicture.images.standard_resolution.url,
                  isSelected: false
                })
              })
            }
            pictureArray.push({
              src: picture.images.standard_resolution.url,
              thumbnail: picture.images.standard_resolution.url,
              isSelected: false
            })
          })
        }
        this.props.saveSelectedPictures(pictureArray);
      });
    });
  }

  selectPicturesToCrop(picture) {
    const index = this.props.pictures.findIndex((pic) => pic.src === picture.src);
    const updatedPictures = update(this.props.pictures, {$splice: [[index, 1, {src: picture.src, thumbnail: picture.src, isSelected: !picture.isSelected}]]});  // array.splice(start, deleteCount, item1)
    this.props.saveSelectedPictures(updatedPictures);
  }

  render() {
    return (
      <div className="App">
        <div className='fixedCustomHeader'>
          <ul>
            <li>Choose photos to print:</li>
            <Link className='nextButtonWrapper' to ='/cropping'>
              <button className='nextButton'>Next</button>
            </Link>
          </ul>
        </div>
        <div className='content'>
          <Gallery images={this.props.pictures} onSelectImage={(index, image) => this.selectPicturesToCrop(image)}/>
        </div>
      </div>
    );
  }
}

export function saveSelectedPictures(pictures) {
	return {
		type: SAVE_PICTURES,
		pictures
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
    pictures: state.pictures.pictures
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveSelectedPictures: (pictures) => dispatch(saveSelectedPictures(pictures))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Pictures);