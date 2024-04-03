import * as React from "react";

export const EmailTemplate = ({ firstName, description }) => (
  <div>
    <h1>Atencion, {firstName}!</h1>

    <p>{description}</p>
  </div>
);
