import React from "react";
import users from "./mock-db.json";

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Gender</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Ip Address</th>
        </tr>
      </thead>
      <tbody>
        {users.map(
          ({ id, gender, first_name, last_name, email, ip_address }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{gender}</td>
              <td>{first_name}</td>
              <td>{last_name}</td>
              <td>{email}</td>
              <td>{ip_address}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default Table;
