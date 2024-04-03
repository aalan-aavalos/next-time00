import * as React from "react";

export const EmailTemplate = ({ firstName, description }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>

    <p>{description}</p>

    <button>
      <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0">
        Protege tu cuenta!!
      </a>
    </button>
  </div>
);
