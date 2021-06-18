import React from "react";
import Button from "../Button";

const FetchMoreButton = ({ fetchMore, text }) => <Button onClick={fetchMore}>{text}</Button>


export default FetchMoreButton;
