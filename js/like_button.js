'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
    this.text = '<h1>Hello World!</h1><h2>hello again!</h2>'
  }

  render() {
    return this.text;
    
    // if (this.state.liked) {
    //   return 'You liked this.';
    // }

    // return e(
    //   'button',
    //   { onClick: () => this.setState({ liked: true }) },
    //   'Like'
    // );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);