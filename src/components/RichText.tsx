import * as ReactDOM from "react-dom";
import { PortableText } from "@portabletext/react";
import React from "react";
import { Texercise } from "../../typings";

interface Props {
  exercise: Texercise;
}

function RichText({ exercise }: Props) {
  return <PortableText value={exercise.info} />;
}

export default RichText;

//
