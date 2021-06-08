import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ChevronRight , ChevronDown} from "react-feather";
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import {Bell} from "react-feather"
import pokerConfig from "../../../configs/pokerConfig";

export class Pokernavheader extends Component {

  state = {
    isOPen : null,
  }

  changeStatus(e){
    this.setState({isOPen : (e===this.state.isOPen?null:e)})
  }

  render() {
    return (
      <div className="lobby-filter-p">
      <div className="lobby-top-row-p">
        <div className = "sg-category-filters">
          <div className = "dropdown-f-container">
            <ul>
            {
              pokerConfig.navData.map((item, key)=>(
                <li key={key} className = "ng-star-inserted" >
                  <div className = "dropdown-n-box">
                    <div className={ this.state.isOPen ===key ? "d-filter-item-v active" : "d-filter-item-v"} onClick = {() => this.changeStatus(key)} >
                      {item.icon}
                      <p className="name-filter-item-p">{item.name}</p>
                      <span className="filter-value">
                        <b className="ng-star-inserted"> Show All </b>
                      </span>
                      {
                        this.state.isOPen ===key ? <ChevronDown className = "poker-navheader-icon2" /> : <ChevronRight className = "poker-navheader-icon2" />
                      }
                    </div>
                    <div className="open-d-filter-view">
                      <ul>

                        <li className="ng-star-inserted">
                          <label className="checkbox-contain-p">
                            <Checkbox
                              color="primary"
                              icon={<Check className="vx-icon" size={16} />}
                              label={item.name}
                            />
                          </label>
                        </li>
                        <li className="ng-star-inserted passive_checkboxes">
                          <label className="checkbox-contain-p">
                            <Checkbox
                              color="primary"
                              icon={<Check className="vx-icon" size={16} />}
                              label={item.name}
                            />
                          </label>
                        </li>
                        <li className="ng-star-inserted passive_checkboxes">
                          <label className="checkbox-contain-p">
                            <Checkbox
                              color="primary"
                              icon={<Check className="vx-icon" size={16} />}
                              label={item.name}
                            />
                          </label>
                        </li>

                      </ul>
                    </div>
                  </div>
                </li>
              ))
            }
            </ul>
          </div>
          <div className="refresh-icon-p">
            <Bell className = "mt-1" />
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokernavheader)
