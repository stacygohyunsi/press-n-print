import React, {Component} from 'react';
import AvatarEditor from 'react-avatar-editor';

class Pictures extends Component {
  constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
		this.state = {
			value: 1,
			preview: null
		}
	}
	
	componentDidMount() {
			
	}

	onChange (event) {
		this.setState({ value: event.target.value });
	}

  onClickSave = () => {
    if (this.editor) {
			const canvas = this.editor.getImage();
			const canvas2 = this.editor.getImage().toDataURL('image/png', 1);
			console.log('CANVAS 2', canvas2);
			this.setState({preview: canvas2});

			var fd = new FormData();
			canvas.toBlob((blob) => {OPTIONS
				console.log('blob image', blob);
				fd.append('upl', blob, 'blobby.txt');
				fetch('http://localhost:5000/api/upload',
				{
						method: 'post',
						body: fd
				}); 
        //this.props.uploadCroppedActionPhoto(blob);
      });	

    }
	}

  setEditorRef = (editor) => this.editor = editor;

	render() {
		return (
			<div>
				<input 
				id="typeinp" 
				type="range" 
				min="0" max="5" 
				value={this.state.value} 
				onChange={this.onChange}
				step="0.1"/>
				
				<AvatarEditor
					ref={this.setEditorRef}
					image="https://scontent.cdninstagram.com/vp/4fa2ddac9668c3af80776a0514f51674/5BEB50FD/t51.2885-15/s640x640/sh0.08/e35/34809866_2097050567284890_5946406170049642496_n.jpg"
					width={200}
					height={300}
					border={100}
					crossOrigin='anonymous'
					color={[0, 0, 0, 0.6]}
					scale={this.state.value}
					rotate={0}
				/>		
				Previewed image:
				<img src={this.state.preview}/>
				<button onClick={this.onClickSave}>Save</button>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
    pictures: state.pictures.pictures
	}
}

export default Pictures;