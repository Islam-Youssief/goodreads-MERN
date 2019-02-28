
import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class ThemeSwitcher extends Component {

  state = { theme: null, dropdownOpen: false }
  
  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }
  
  resetTheme = evt => {
    evt.preventDefault();
    this.setState({ theme: null });
  }
  
  chooseTheme = (theme, evt) => {
    evt.preventDefault();
    this.setState({ theme });
  }
  
  render() {
  
    const { theme, dropdownOpen } = this.state;
    const themeClass = theme ? theme.toLowerCase() : 'secondary';
    
    return (
      <div className="d-flex flex-wrap justify-content-left position-absolute w-100 h-100 align-items-left align-content-center">
      
        
        <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggleDropdown}>
          <Button id="caret" >{theme || 'Read'} </Button>
          <DropdownToggle caret size="lg"  />
          <DropdownMenu>
            <DropdownItem onClick={e => this.chooseTheme('Reading', e)}>Reading</DropdownItem>
            <DropdownItem onClick={e => this.chooseTheme('Want To Read', e)}>Want To Read</DropdownItem>
            <DropdownItem onClick={this.resetTheme}>Read</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        
      </div>
    );
    
  }
  
}

export default ThemeSwitcher;