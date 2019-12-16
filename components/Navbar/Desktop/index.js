import React from 'react';
import _ from 'lodash';
import { Link } from '../../../routes';


import CartNavBtn from '../../shoppingCart/CartNavBtn';
import SearchNavBtn from '../../search/SearchNavBtn';
import MyAccountButton from './MyAccountButton';
import { LinkCategory } from '../../common';
import ListSubCategory from './ListSubCategory';
import infoSource from '../../../utils/infoSource';

export default class NavbarDesktop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHome: true,
      scroll: '',
      top: '',
      height: ''
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const el = document.querySelector('nav');
    this.setState({
      top: el.offsetTop,
      height: el.offsetHeight
    });
    window.addEventListener('scroll', this.handleScroll);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { items } = this.props;
    const { isHome } = this.state;

    if (items !== nextProps.items) return true;
    if (nextState.isHome !== isHome) return true;


    // Less updates than all the scroll
    const scrollStartUpdate = nextState.scroll > 125 && nextState.scroll < 200;
    const scrollFinishUpdate = nextState.scroll < 100;

    if ((isHome && scrollStartUpdate) || (isHome && scrollFinishUpdate)) return true;


    return false;
  }

  static getDerivedStateFromProps(props, state) {
    const isHome = props.pathname === '/';
    if (isHome !== state.isHome) return { isHome };

    return null;
  }

  handleScroll() {
    this.setState({ scroll: window.scrollY });
  }

  render() {
    const { isHome, scroll, top } = this.state;
    const { items } = this.props;
    const sticky = (scroll > top || !isHome) ? 'fixed-nav' : '';
    const navRelative = (isHome && sticky) || !isHome ? true : false; //eslint-disable-line

    return (
      <nav className={`nav_desk ${sticky} ${navRelative ? 'nav_relative' : ''}`}>

        <div className="nav_top">
          <div className="logo">
            <Link route="/">
              <a>
                <img src="../../../static/images/company/icon_logotipo_neutro.png" alt={infoSource.companyName} />
              </a>
            </Link>
          </div>

          <div className="right_btns">
            <SearchNavBtn className="right_btns-search" />

            <MyAccountButton />

            <CartNavBtn className="right_btns-link" />
          </div>
        </div>

        <div className="nav_bottom">
          <ul className="flex_box">
            {
              items.map(elem => (
                <li
                  className="item_link"
                  key={elem._id}
                >
                  <LinkCategory id={elem._id}>
                    {_.get(elem, 'name.es', '')}
                  </LinkCategory>
                  {
                    _.get(elem, 'childrens', []).length > 0 && (
                      <ListSubCategory items={elem.childrens} />
                    )
                  }
                </li>
              ))
            }
          </ul>
        </div>
      </nav>
    );
  }
}
