"use client";
import { UseNoteContext } from "@/contexts/useContextState";
import React from "react";

const page = () => {
  const { name } = UseNoteContext();
  console.log(name);
  return <h1>Hello {name}</h1>;
};

export default page;
