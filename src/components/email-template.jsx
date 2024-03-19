import * as React from "react";

export const EmailTemplate = ({ firstName }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
      expedita. Sed, voluptatem enim optio amet reiciendis aut neque distinctio
      ducimus explicabo incidunt. Rem autem quaerat itaque quidem, ipsa
      quibusdam voluptates.
    </p>

    <button>
      <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0">Protege tu cuenta!!</a>
    </button>
  </div>
);
