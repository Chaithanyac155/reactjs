import React from "react";
import ListItems from "./ListItems";

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filterItem: [],
      currentItem: {
        text: "",
        flag: false
      },
      SearchItem: {
        text: ""
      }
    };
    this.addItem = this.addItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.favouriteItem = this.favouriteItem.bind(this);
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: "",
          flag: false
        }
      });
    }
  }
  searchItem(e) {
    e.preventDefault();
    let data = this.state.items.filter(
      (val, ind) =>
        val.text.toLowerCase() === this.state.SearchItem.text.toLowerCase()
    );
    this.setState({
      filterItem: data
    });
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        flag: false
      }
    });
  }

  handleInputSearch(e) {
    this.setState({
      SearchItem: {
        text: e.target.value
      }
    });
  }

  deleteItem(index) {
    const filteredItems = this.state.items.filter((item, ind) => ind !== index);
    this.setState({
      items: filteredItems
    });
  }

  favouriteItem(index, toggle) {
    let ToggleItems = this.state.items.map((item, ind) =>
      ind === index ? { ...item, flag: toggle } : item
    );
    const favItem = ToggleItems.filter((item, ind) => item.flag === true);
    const Notfav = ToggleItems.filter((item, ind) => item.flag === false);
    let Re_Arranged = [];
    Re_Arranged = [...favItem, ...Notfav];
    this.setState({
      items: [...Re_Arranged]
    });
  }

  render() {
    return (
      <div>
        <div className="content mx-auto mt-5">
          <h6 className="title">
            <b>Friends List</b>
          </h6>
          <form onSubmit={this.addItem}>
            <input
              type="text"
              className="add-section"
              placeholder="Enter your friend's name"
              value={this.state.currentItem.text}
              onChange={this.handleInput}
            />
          </form>

          <ListItems
            items={this.state.items}
            deleteItem={this.deleteItem}
            favouriteItem={this.favouriteItem}
          />
        </div>

        <div className="content mx-auto mt-5">
          <h6 className="title">
            <b>Search List</b>
          </h6>
          <form onSubmit={this.searchItem}>
            <input
              type="text"
              className="add-section"
              placeholder="Search your friend"
              value={this.state.SearchItem.text}
              onChange={this.handleInputSearch}
            />
          </form>

          <div className="search-items-div">
            {this.state.filterItem.length ? (
              <>
                {this.state.filterItem.map((name) => (
                  <p class="search-items">
                    <b className="mr-2">{name.text}</b>
                    <span>is your friend</span>
                  </p>
                ))}
              </>
            ) : (
              <>
                <p className="search-items">Not Found in Friends List</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FriendsList;
