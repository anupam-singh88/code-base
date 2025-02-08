import React from "react";
import { useParams, useLocation } from "react-router-dom";

const User = () => {
  const { fname, lname } = useParams();
  const location = useLocation();
  //   const history = useHistory(); //depracated

  //   console.log(location.pathname);
  return (
    <div>
      <div>
        <p>
          useParams hook - {fname} {lname}
        </p>
        <p>My Current URL :- {location.pathname}</p>
      </div>
    </div>
  );
};

export default User;
