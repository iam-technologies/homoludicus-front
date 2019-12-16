import React, { Component } from 'react';

import { Link } from '../../routes';
import { ButtonInput } from '../common';

class Compare extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    // this.showCompare = this.showCompare.bind(this);
  }

  onClick() {
    const { onClickCompare } = this.props;
    onClickCompare();
  }

  // showCompare() {
  // }

  render() {
    const { clickCompare, selected, catName, selectedItems, category } = this.props;
    const showCompare = (selected && selected.length > 1) || false;
    const pathname = `/comparador-de-productos/${catName}`;
    // const idString = selectedItems.map(el => el._id).join('-'); // TODO
    const idString = JSON.stringify(selectedItems);

    return (
      <section className="compare_ui">
        <div className="compare_ui-header">
          {
            showCompare && (
              <React.Fragment>
                <Link route={{ pathname, query: { selectedItems: idString, catName } }}>
                  <a>
                    <ButtonInput
                      label="VER COMPARATIVA"
                      icon="../../../static/images/icon_compare.png"
                      className="compare_ui-button"
                      onClick={() => { }}
                    />
                  </a>
                </Link>
                { clickCompare && <span> Selecciona hasta 3 productos para comparar</span> }
              </React.Fragment>
            )
          }
          {
            !showCompare && (
              <React.Fragment>
                <ButtonInput
                  label="COMPARAR"
                  icon="./../../static/images/icon_compare.png"
                  className={`compare_ui-button ${clickCompare ? 'compare_ui-button-active' : 'compare_ui-button-inactive'}`}
                  onClick={this.onClick}
                />
                { clickCompare && <span> Selecciona hasta 3 productos para comparar</span> }
              </React.Fragment>
            )
          }

        </div>
      </section>
    );
  }
}

export default Compare;
