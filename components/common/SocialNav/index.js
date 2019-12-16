import React, { Component } from 'react';
import infoSource from '../../../utils/infoSource';

export default class SocialNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      subject: '',
      itemText: ''
    };
  }

  componentDidMount() {
    const location = window.location.pathname;
    const subject = location.split('/').slice(-1)[0].replace(/-/g, '%20');
    const itemText = `${infoSource.itemText}%20-%20${subject}%0D%0A`;

    this.setState({ location, subject, itemText });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.location && nextState.subject) return true;

    return false;
  }

  render() {
    const { location, subject, itemText } = this.state;

    return (
      <div className="social_ui">
        <a
          className="social_ui-link facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=http://${infoSource.socialUrl}${location}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="link_icon" src="../../../static/images/icon_facebook.png" alt="Facebook" />
          <img className="link_icon_hover" src="../../../static/images/icon_facebook_hover.png" alt="Facebook" />
        </a>
        <a
          className="social_ui-link twitter"
          href={`https://twitter.com/intent/tweet?url=http://${infoSource.socialUrl}${location}&text=${itemText}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="link_icon" src="../../../static/images/icon_twitter.png" alt="Twitter" />
          <img className="link_icon_hover" src="../../../static/images/icon_twitter_hover.png" alt="Twitter" />
        </a>
        {/* <a
          className="social_ui-link instagram"
          href="#"
          target="_blank"
        >
          <img className="link_icon" src="/images/icon_instagram.png" alt="Instagram" />
          <img className="link_icon_hover" src="/images/icon_instagram_hover.png" alt="Instagram" />
        </a> */}
        <a
          className="social_ui-link email"
          href={`mailto:?subject=${subject}&body=https://${infoSource.socialUrl}${location}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="link_icon" src="/../../../static/images/icon_email.png" alt="Email" />
          <img className="link_icon_hover" src="../../../static/images/icon_email_hover.png" alt="Email" />
        </a>
      </div>
    );
  }
}
