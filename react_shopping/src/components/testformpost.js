import React, { useEffect, useState } from 'react';

export const TestFormPost = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        const formData = {
            name: name,
            email: email
        }

        fetch('https://react-shopping-flask.vercel.app/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {console.log(data);})
        .catch((error) => {
            console.error(error);
        })
    };


  return (
    <div>
        <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
    </form>
    </div>
  )
}
