import React, { Fragment } from "react";
import Metadata from "../layout/Metadata";
import { Link } from "react-router-dom";
import "./Subscription.css";

const Subscription = () => {
  return (
    <Fragment>
      <Metadata title={`Subscription Plans`} />
      <div className="subscriptionPage">
        <div className="subscriptionContainer">
          <h1 className="subscriptionHeading">Subscription Plans</h1>
          <div className="plansContainer">
            <div className="plan">
              <h1>Plan 1</h1>
              <p>Free One Time Trial</p>
              <Link to="/summary" className="pay-btn">
                Try Now!
              </Link>
            </div>
            <div className="plan">
              <h1>Plan 2</h1>
              <p>
                Monthly Paid Trial <strong>@$10</strong>
              </p>
              <Link to="/account" className="pay-btn">
                Pay Now!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Subscription;
