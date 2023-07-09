import React from "react";
import { ITodo } from "../models/dbTypes";

export default function TodoCard({ title, description, id, createdBy }: ITodo) {
  return (
    <div key={id}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{createdBy}</p>
    </div>
  );
}
