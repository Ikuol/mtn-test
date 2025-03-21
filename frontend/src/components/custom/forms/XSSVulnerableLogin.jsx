import React, { useState } from "react";

export const XSSVulnerableLogin = () => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <h2>Messagerie interne</h2>
      <textarea
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Envoyez un message..."
      />
      <p>
        <strong>Message affiché :</strong>
      </p>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
};
