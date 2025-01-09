/* eslint-disable react/prop-types */
const Persons = ({ contacts, deleteFunc }) => {
  if (!Array.isArray(contacts)) {
    console.log("Contacts received: ", contacts);
  }

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name} : {contact.number}
          <button
            onClick={() => {
              console.log("Deleting contact with id:", contact.id);
              deleteFunc(contact.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
