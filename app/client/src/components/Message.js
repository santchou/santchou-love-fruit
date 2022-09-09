import React from "react";
import Ticker from "react-ticker";

function Message() {
  return (
    <div className="mx-1 lg:mx-96 border-1 text-xs rounded-lg shadow-lg shadow-lime-100 mb-4">
      <Ticker mode="await">
        {({ index }) => (
          <>
            <h1 className="font-montserrat text-green-700 font-bold">
              fruits and vegetables loved by the family.
            </h1>
          </>
        )}
      </Ticker>
    </div>
  );
}

export default Message;
