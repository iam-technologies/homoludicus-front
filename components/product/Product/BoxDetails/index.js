import _ from 'lodash';
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { withWindowResize } from '../../../hoc';


class BoxDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      xsTab: -1
    };

    this.onChangeTab = this.onChangeTab.bind(this);
    this.onChangedSlide = this.onChangedSlide.bind(this);
  }

  onChangeTab(index) {
    let { xsTab } = this.state;

    xsTab = xsTab === index ? -1 : index;

    this.setState({ tab: index, xsTab });
  }

  onChangedSlide(index) {
    this.setState({ tab: index });
  }

  renderTabView(item, key) {
    const html = item[0] === '<' ? item : item.replace(/\n/g, '<br/>');
    return (
      (key === 'details') ? (
        <div
          className="tab"
          key={`item-${key}`}
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="description"
        />
      ) : (
        <div
          className="tab"
          key={`item-${key}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )

    );
  }

  render() {
    const { tab, xsTab } = this.state;
    const { item, refundsText, screen } = this.props;

    const details = _.get(item, 'longDesc.es', '');
    const detailsHtml = details[0] === '<' ? details : details.replace(/\n/g, '<br/>');
    const legal = _.get(refundsText, 'longDesc.es', '');

    const renderViews = [this.renderTabView(details, 'details')];

    if (legal) { renderViews.push(this.renderTabView(legal, 'legal')); }


    return (
      <div id="long_desc_product" className="a_p-box_details">
        <div className="a_p-box_details-top">
          <div className="details-top-content">
            <div
              className="details-top-content_btns"
              onClick={screen !== 'lg' ? () => this.onChangeTab(0) : undefined}
            >
              <p
                className={`title ${tab === 0 ? 'active' : ''}`}
                onClick={() => this.onChangeTab(0)}
              >Detalles
              </p>

              <img className={`btn_icon_bottom ${xsTab === 0 ? 'active' : ''}`} src="/images/icon_arrow_bottom.png" alt="Arrow bottom" />
            </div>

            {
              screen !== 'lg' && xsTab === 0 ? (
                <div
                  className="tab"
                  dangerouslySetInnerHTML={{ __html: detailsHtml }}
                />
              ) : null
            }
          </div>

          {
            legal && (
              <div className="details-top-content">
                <div
                  className="details-top-content_btns"
                  onClick={screen !== 'lg' ? () => this.onChangeTab(1) : undefined}
                >
                  <p
                    className={`title title_send ${tab === 1 ? 'active' : ''}`}
                    onClick={() => this.onChangeTab(1)}
                  >Envío y devoluciones
                  </p>

                  <img className={`btn_icon_bottom ${xsTab === 1 ? 'active' : ''}`} src="/images/icon_arrow_bottom.png" alt="Arrow bottom" />
                </div>
                {
                  screen !== 'lg' && xsTab === 1 ? (
                    <div
                      className="tab"
                      dangerouslySetInnerHTML={{ __html: legal }}
                    />
                  ) : null
                }
              </div>
            )
          }
        </div>

        {
          screen === 'lg' && (
            <div className="a_p-box_details-bottom">
              <SwipeableViews
                enableMouseEvents
                index={tab}
                onChangeIndex={this.onChangedSlide}
                resistance
              >
                {
                  renderViews
                }
              </SwipeableViews>
            </div>
          )
        }
      </div>
    );
  }
}

export default withWindowResize(BoxDetails);
