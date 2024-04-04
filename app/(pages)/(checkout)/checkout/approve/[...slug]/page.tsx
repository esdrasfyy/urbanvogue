import React from "react";

function Approve({ params }: any) {
  console.log(params.slug[0]);

  return <div>Approve
<br />
    <p>order id: {params.slug[0]}</p>
    <br />
    <p>payment id: {params.slug[1]}</p>
  </div>;
}

export default Approve;
