import React, { Component } from "react";
import ListContacts from "./ListContacts";
import { Route } from "react-router-dom";
import CreateContact from "./CreateContact";
import * as ContactsAPI from "./utils/ContactsAPI";

class App extends Component {
  state = {
    contacts: []
  };

  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));

    ContactsAPI.remove(contact);
  };

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts });
    });
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      console.log(contact);
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />}
        />
        <Route
          path="/create"
          render={({ history }) =>
            <CreateContact
              onCreateContact={contact => {
                this.createContact(contact);
                history.push("/");
              }}
            />}
        />
      </div>
    );
  }
}

export default App;
