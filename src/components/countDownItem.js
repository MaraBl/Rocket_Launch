import React from "react";

const CountDownItem = (props) => {
  return (
    <div className="col-sm-12 col-md-2 col-lg-1 d-flex justify-content-center">
      <div className="countdown-item bg-green">
        <span className="number">{props.number}</span>
        <div className="description text-white">{props.countItem}</div>
      </div>
    </div>
  );
};

export default CountDownItem;
