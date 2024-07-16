import React, { useState } from "react";

export default function OutboundResults() {
  const testTypeConfig = {
    phConResults: ["ph", "conductivity", "id"],
    tssResults: ["tssInMgl", "id"],
    icResults: [
      "anionsChlorideConcentration",
      "anionsSulfateConcentration",
      "determinationStart",
      "id",
      "ident",
      "sampleType",
      "infoOne",
      "methodName",
      "anionClCon",
      "anionSOCon",
    ],
    alkalinityResults: [
      "ID1value",
      "RS01name",
      "RS01unit",
      "RS01value",
      "RS02meanValue",
      "RS02name",
      "RS02unit",
      "RS02value",
      "determinationStart",
      "id",
      "methodName",
      "remarks",
      "sampleSizeValue",
      "unitValue",
    ],
    tictocResults: [
      "analogy",
      "id",
      "resultIC",
      "resultNPOC",
      "resultPOC",
      "resultTC",
      "resultTN",
      "resultTOC",
      "type",
      "unit",
      "vial",
    ],
  };
}
