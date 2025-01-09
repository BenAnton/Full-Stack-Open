import { useState, useEffect } from "react";
import Persons from "../components/persons";
import Filter from "../components/filter";
import PersonForm from "../components/personForm";
import phonebookService from "./services/phonebook";
import Notification from "../components/Notification";

const App = () => {
  // State variables
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [notifyStyle, setNotifyStyle] = useState("success");

  // Load the DB
  useEffect(() => {
    phonebookService
      .getAll()
      .then((Initialpersons) => {
        setPersons(Initialpersons);
      })
      .catch((error) => {
        alert("Error getting contacts", error);
      });
  }, []);

  // filter persons DB
  const searchFilter = () => {
    if (!newFilter) {
      return persons;
    }
    return persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    );
  };

  //  add or update
  const addorUpdatePerson = (event) => {
    event.preventDefault();

    // check if existing
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    // if existing
    if (existingPerson) {
      //  if window is confirmed
      if (
        window.confirm(`${newName} already exists, replace the old number?`)
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        // update the number
        phonebookService
          .numberUpdate(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotifyStyle("error");
            setErrorMessage(error.response?.data?.error || "An Error Occurred");
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });
      }

      // if not existing create new number
    } else {
      const newPerson = { name: newName, number: newNumber };
      phonebookService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setNotifyStyle("success");
          setErrorMessage(`${newPerson.name} added successfully`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error);
        });
    }
  };

  // delete contact
  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (person && window.confirm(`Delete ${person.name}?`)) {
      phonebookService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));

        setNotifyStyle("success");
        setErrorMessage(`${person.name} deleted successfully`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} notifyStyle={notifyStyle} />

      <Filter filterValue={newFilter} onFilterChange={setNewFilter} />

      <h2>add a new</h2>

      <PersonForm
        onSubmit={addorUpdatePerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons deleteFunc={deletePerson} contacts={searchFilter()} />
    </div>
  );
};

export default App;
